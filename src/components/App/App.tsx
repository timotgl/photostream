import React from 'react';

import NavigationHelp from '../NavigationHelp/NavigationHelp';
import Counter from '../Counter';
import PhotoDetails from '../PhotoDetails';

import './App.css';

interface Props {
  currentPhotoUrl?: string;
  showNextPhoto: () => void;
  showPreviousPhoto: () => void;
  fetchAlbum: () => void;
}

interface StringToFunctionMap {
  [key: string]: () => void;
}

class App extends React.PureComponent<Props> {
  actionsForKeyDown: StringToFunctionMap = {};

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

  render(): React.ReactNode {
    const { currentPhotoUrl } = this.props;
    const url = `https://timotaglieber.de/photos/photos/1920/${currentPhotoUrl || ''}`;
    const style = currentPhotoUrl ? { backgroundImage: `url('${url}')` } : {};
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
