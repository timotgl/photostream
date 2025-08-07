import React from 'react';

import config from '../../config';
import { onSingleTouchPoint, whileZoomedOut } from '../../utils/touchEvents';
import Counter from './Counter';
import NavigationHelp from './NavigationHelp/NavigationHelp';
import PhotoDetails from './PhotoDetails';

import './Slideshow.css';
import Button from '../Button';

interface Props {
  albumName: string;
  file: string;
  maxAvailableWidth: number;
  currentPhotoIndex: number;
  showNextPhoto: () => void;
  showPreviousPhoto: () => void;
  t: (key: string) => string;
}

enum Direction {
  None = 0,
  Start = 1,
  Right = 2,
  Left = 3,
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

class Slideshow extends React.PureComponent<Props, State> {
  actionsForKeyDown: StringToFunctionMap = {};

  // Store wrapped touch event handlers for proper cleanup
  touchStartHandler!: (event: TouchEvent) => void;
  touchMoveHandler!: (event: TouchEvent) => void;

  state = initialState;

  componentDidMount(): void {
    // Arrow key navigation
    document.addEventListener('keydown', this.onKeyDown);

    // Mouse wheel navigation
    document.addEventListener('mousewheel', this.onMouseWheel); // IE9, Chrome, Safari, Opera
    document.addEventListener('DOMMouseScroll', this.onMouseWheel); // Firefox

    // Swipe left/right navigation - store wrapped handlers for proper cleanup
    this.touchStartHandler = whileZoomedOut(
      onSingleTouchPoint(this.onTouchStart, this.resetSwiping),
    );
    this.touchMoveHandler = whileZoomedOut(
      onSingleTouchPoint(this.onTouchMove, this.resetSwiping),
    );

    document.addEventListener('touchstart', this.touchStartHandler);
    document.addEventListener('touchmove', this.touchMoveHandler);
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('touchcancel', this.resetSwiping);

    // Click navigation
    document.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('mousewheel', this.onMouseWheel);
    document.removeEventListener('DOMMouseScroll', this.onMouseWheel);

    // Remove touch event listeners using stored wrapped handlers
    document.removeEventListener('touchstart', this.touchStartHandler);
    document.removeEventListener('touchmove', this.touchMoveHandler);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('touchcancel', this.resetSwiping);

    // Remove click navigation
    document.removeEventListener('click', this.onClick);
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
      (prevState) => ({
        swipeX: clientX,
        swipeOpacity: prevState.swipeOpacity - 0.05,
      }),
      () => {
        // eslint-disable-next-line react-x/no-access-state-in-setstate
        document.body.style.opacity = String(this.state.swipeOpacity);
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

    if (this.state.swipeDir === Direction.None) {
      // TS thinks swipeDir will never have the values we check in the switch statement below.
      // Explicitly check for None to prevent a false positive TS error here.
      return;
    }

    switch (this.state.swipeDir) {
      case Direction.Start:
        this.onSwipeStart(clientX);
        break;
      case Direction.Right:
        this.onSwipeRight(clientX);
        break;
      case Direction.Left:
        this.onSwipeLeft(clientX);
        break;
    }
  };

  onTouchEnd = (): void => {
    if (this.state.swipeDir === Direction.None) {
      // TS thinks swipeDir will never have the values we check in the switch statement below.
      // Explicitly check for None to prevent a false positive TS error here.
      return;
    }

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
      document.body.style.opacity = initialState.swipeOpacity.toString();
    });
  };

  onClick = (event: Event): void => {
    const isInLeftHalf: boolean =
      window.innerWidth / 2 > (event as MouseEvent).clientX;
    if (isInLeftHalf) {
      this.props.showNextPhoto();
    } else {
      this.props.showPreviousPhoto();
    }
  };

  render(): React.ReactNode {
    const {
      albumName,
      file,
      maxAvailableWidth,
      currentPhotoIndex,
      showNextPhoto,
      showPreviousPhoto,
      t,
    } = this.props;

    // next/previous functions are re-created after a new photo is shown,
    // so we need to overwrite this mapping on every render.
    this.actionsForKeyDown = {
      ArrowRight: showPreviousPhoto,
      ArrowLeft: showNextPhoto,
      ArrowUp: showNextPhoto,
      ArrowDown: showPreviousPhoto,
    };

    const url = `${config.ALBUM_ROOT}/${albumName}/${maxAvailableWidth}/${file}`;
    const style = file ? { backgroundImage: `url('${url}')` } : {};

    return (
      <div className="App" style={style}>
        <Button
          href={albumName}
          text={t('Slideshow.albumOverview')}
          className="BackButton"
        />
        <NavigationHelp />
        <Counter currentPhotoIndex={currentPhotoIndex} />
        <PhotoDetails currentPhotoIndex={currentPhotoIndex} />
      </div>
    );
  }
}

export default Slideshow;
