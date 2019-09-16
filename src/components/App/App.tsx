import React from 'react';

import NavigationHelp from '../NavigationHelp/NavigationHelp';
import Counter from '../Counter/Counter';
import PhotoDetails from '../PhotoDetails/PhotoDetails';

import './App.css';

interface Props {
  currentPhotoUrl?: string;
  showNextPhoto: () => void;
  showPreviousPhoto: () => void;
  fetchAlbum: () => void;
}

class App extends React.PureComponent<Props> {
  componentDidMount(): void {
    this.props.fetchAlbum();
  }

  render(): React.ReactNode {
    const { currentPhotoUrl, showNextPhoto, showPreviousPhoto, fetchAlbum } = this.props;
    const url = `https://timotaglieber.de/photos/photos/1920/${currentPhotoUrl || ''}`;
    const style = currentPhotoUrl ? { backgroundImage: `url('${url}')` } : {};
    return (
      <div className="App" style={style}>
        <NavigationHelp />
        <Counter counter={1} />
        <PhotoDetails file="test.jpg" title="testTitle" location="testLocation" date="testDate" />
        <button onClick={fetchAlbum}>fetch album</button>
        <button onClick={showNextPhoto}>show next photo</button>
        <button onClick={showPreviousPhoto}>show previous photo</button>
        <p>current photo url: {currentPhotoUrl}</p>
      </div>
    );
  }
}

export default App;
