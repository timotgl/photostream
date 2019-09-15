import React from 'react';
import logo from '../../logo.svg';
import './App.css';

interface Props {
  currentPhotoUrl?: string;
  showNextPhoto: () => void;
  showPreviousPhoto: () => void;
  fetchAlbum: () => void;
}

const App: React.FC<Props> = ({ currentPhotoUrl, showNextPhoto, showPreviousPhoto, fetchAlbum }) => {
  const url = `https://timotaglieber.de/photos/photos/3840/${currentPhotoUrl || ''}`;
  const style = currentPhotoUrl ? { backgroundImage: `url('${url}')` } : {};
  return (
    <div className="App" style={style}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={fetchAlbum}>fetch album</button>
        <button onClick={showNextPhoto}>show next photo</button>
        <button onClick={showPreviousPhoto}>show previous photo</button>
        <p>
          current photo url: {currentPhotoUrl}
        </p>
      </header>
    </div>
  );
};

export default App;
