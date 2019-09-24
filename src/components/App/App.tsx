import React from 'react';

import config from '../../config';
import NavigationHelp from '../NavigationHelp/NavigationHelp';
import Counter from '../Counter';
import PhotoDetails from '../PhotoDetails';
import { whileZoomedOut, onSingleTouchPoint } from '../../utils/touchEvents';

import './App.css';

interface Props {
  currentPhotoUrl?: string;
  albumName: string;
  file: string;
  showNextPhoto: () => void;
  showPreviousPhoto: () => void;
  fetchAlbum: (albumName: string, switchToPhoto: string) => void;
}

enum Direction {
  None,
  Start,
  Right,
  Left,
}

interface State {
  swipeX: number;
  swipeDir: Direction;
  swipeOpacity: number;
}

interface StringToFunctionMap {
  [key: string]: () => void;
}

const initialState = Object.freeze({
  swipeX: 0,
  swipeDir: Direction.None,
  swipeOpacity: 1,
});

class App extends React.PureComponent<Props, State> {
  actionsForKeyDown: StringToFunctionMap = {};

  state = initialState;

  constructor(props: Props) {
    super(props);
    const { showNextPhoto, showPreviousPhoto } = props;
    this.actionsForKeyDown = {
      ArrowRight: showPreviousPhoto,
      ArrowLeft: showNextPhoto,
      ArrowUp: showNextPhoto,
      ArrowDown: showPreviousPhoto,
    };
  }

  componentDidMount(): void {
    this.props.fetchAlbum(this.props.albumName || config.ALBUM_DEFAULT_NAME, this.props.file);

    // Arrow key navigation
    document.addEventListener('keydown', this.onKeyDown);

    // Mouse wheel navigation
    document.addEventListener('mousewheel', this.onMouseWheel); // IE9, Chrome, Safari, Opera
    document.addEventListener('DOMMouseScroll', this.onMouseWheel); // Firefox

    // Swipe left/right navigation
    document.addEventListener('touchstart', whileZoomedOut(onSingleTouchPoint(this.onTouchStart, this.resetSwiping)));
    document.addEventListener('touchmove', whileZoomedOut(onSingleTouchPoint(this.onTouchMove, this.resetSwiping)));
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('touchcancel', this.resetSwiping);

    // Click navigation
    document.addEventListener('click', this.onClick);

    // Note: there is no componentWillUnmount or removeEventListener since the entire <App> never unmounts.
  }

  onKeyDown = (keyDownEvent: KeyboardEvent): void => {
    const { key } = keyDownEvent;
    const action = this.actionsForKeyDown[key];
    if (action) {
      action();
    }
  };

  onMouseWheel = (wheelEvent: Event): void => {
    const delta = Math.max(-1, Math.min(1, (wheelEvent as WheelEvent).deltaY));
    if (delta <= 0) {
      this.props.showNextPhoto();
    } else {
      this.props.showPreviousPhoto();
    }
  };

  onTouchStart = (touch: Touch): void => {
    this.setState({
      swipeX: touch.clientX,
      swipeDir: Direction.Start,
    });
  };

  updateSwipingState = (clientX: number): void =>
    this.setState(
      {
        swipeX: clientX,
        swipeOpacity: this.state.swipeOpacity - 0.05,
      },
      () => {
        document.body.style['opacity'] = String(this.state.swipeOpacity);
      },
    );

  onSwipeStart = (clientX: number): void => {
    if (clientX > this.state.swipeX) {
      // Swiping to the right has just started
      this.setState({ swipeDir: Direction.Right });
    } else if (clientX < this.state.swipeX) {
      // Swiping to the left has just started
      this.setState({ swipeDir: Direction.Left });
    }
    this.setState({ swipeX: clientX });
  };

  onSwipeRight = (clientX: number): void => {
    if (clientX > this.state.swipeX) {
      // Swiping to the right continues
      this.updateSwipingState(clientX);
    } else if (clientX < this.state.swipeX) {
      // Direction has changed to left, abort
      this.resetSwiping();
    }
  };

  onSwipeLeft = (clientX: number): void => {
    if (clientX < this.state.swipeX) {
      // Swiping to the left continues
      this.updateSwipingState(clientX);
    } else if (clientX > this.state.swipeX) {
      // Direction has changed to right, abort
      this.resetSwiping();
    }
  };

  onTouchMove = (touch: Touch): void => {
    const { clientX } = touch;

    switch (this.state.swipeDir) {
      case Direction.Start:
        this.onSwipeStart(clientX);
        break;
      case Direction.Right:
        this.onSwipeRight(clientX);
        break;
      case Direction.Left:
        this.onSwipeLeft(clientX);
    }
  };

  onTouchEnd = (): void => {
    switch (this.state.swipeDir) {
      case Direction.Right:
        this.resetSwiping();
        this.props.showNextPhoto();
        break;
      case Direction.Left:
        this.resetSwiping();
        this.props.showPreviousPhoto();
    }
  };

  resetSwiping = (): void => {
    this.setState(initialState, () => {
      document.body.style['opacity'] = this.state.swipeOpacity.toString();
    });
  };

  onClick = (event: Event): void => {
    const isInLeftHalf: boolean = window.innerWidth / 2 > (event as MouseEvent).clientX;
    if (isInLeftHalf) {
      this.props.showNextPhoto();
    } else {
      this.props.showPreviousPhoto();
    }
  };

  render(): React.ReactNode {
    const { currentPhotoUrl, albumName } = this.props;
    const url = `${config.ALBUM_ROOT}/${albumName}/${config.PHOTO_WIDTH}/${currentPhotoUrl || ''}`;
    const style = currentPhotoUrl ? { backgroundImage: `url('${url}')` } : {};

    return (
      <div className="App" style={style}>
        <NavigationHelp hideAfter={config.FADE_IN_DURATION} />
        <Counter showAfter={config.FADE_IN_DURATION} />
        <PhotoDetails showAfter={config.FADE_IN_DURATION} />
      </div>
    );
  }
}

export default App;
