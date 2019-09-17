import React from 'react';

import NavigationHelp from '../NavigationHelp/NavigationHelp';
import Counter from '../Counter';
import PhotoDetails from '../PhotoDetails';
import { whileZoomedOut, onSingleTouchPoint } from '../../utils/touchEvents';

import './App.css';

interface Props {
  currentPhotoUrl?: string;
  showNextPhoto: () => void;
  showPreviousPhoto: () => void;
  fetchAlbum: () => void;
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
    this.props.fetchAlbum();

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

  onTouchMove = (touch: Touch): void => {
    const swipeX = touch.clientX;

    if (this.state.swipeDir === Direction.Start) {
      if (swipeX > this.state.swipeX) {
        this.setState({ swipeDir: Direction.Right });
      } else if (swipeX < this.state.swipeX) {
        this.setState({ swipeDir: Direction.Left });
      }
      this.setState({ swipeX });
      return;
    }

    if (this.state.swipeDir === Direction.Right) {
      if (swipeX > this.state.swipeX) {
        // Swiping to the right continues
        this.setState(
          {
            swipeX,
            swipeOpacity: this.state.swipeOpacity - 0.05,
          },
          () => {
            document.body.style['opacity'] = String(this.state.swipeOpacity);
          },
        );
        return;
      } else if (swipeX < this.state.swipeX) {
        // Direction has changed to left, abort
        this.resetSwiping();
        return;
      }
    }

    if (this.state.swipeDir === Direction.Left) {
      if (swipeX < this.state.swipeX) {
        // Swiping to the left continues
        this.setState(
          {
            swipeX,
            swipeOpacity: this.state.swipeOpacity - 0.05,
          },
          () => {
            document.body.style['opacity'] = String(this.state.swipeOpacity);
          },
        );
      } else if (swipeX > this.state.swipeX) {
        // Direction has changed to right, abort
        this.resetSwiping();
      }
    }
  };

  onTouchEnd = (): void => {
    if (this.state.swipeDir === Direction.Right) {
      this.resetSwiping();
      this.props.showNextPhoto();
    } else if (this.state.swipeDir === Direction.Left) {
      this.resetSwiping();
      this.props.showPreviousPhoto();
    }
  };

  resetSwiping = (): void => {
    this.setState(initialState, () => {
      document.body.style['opacity'] = this.state.swipeOpacity.toString();
    });
  };

  render(): React.ReactNode {
    const { currentPhotoUrl } = this.props;
    const url = `https://timotaglieber.de/photos/photos/1920/${currentPhotoUrl || ''}`;
    const style = currentPhotoUrl ? { backgroundImage: `url('${url}')` } : {};

    // TODO: use different fade out effect on NavigationHelp, it shouldn't be rendered at all.
    return (
      <div className="App" style={style}>
        <NavigationHelp />
        <Counter />
        <PhotoDetails />
      </div>
    );
  }
}

export default App;
