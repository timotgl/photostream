import React from 'react';
import './App.css';

interface Props {
  currentPhotoUrl?: string;
  showNextPhoto: () => void;
  showPreviousPhoto: () => void;
  fetchAlbum: () => void;
}

const App: React.FC<Props> = ({ currentPhotoUrl, showNextPhoto, showPreviousPhoto, fetchAlbum }) => {
  const url = `https://timotaglieber.de/photos/photos/1920/${currentPhotoUrl || ''}`;
  const style = currentPhotoUrl ? { backgroundImage: `url('${url}')` } : {};
  return (
    <div className="App" style={style}>
      <button onClick={fetchAlbum}>fetch album</button>
      <button onClick={showNextPhoto}>show next photo</button>
      <button onClick={showPreviousPhoto}>show previous photo</button>
      <p>
        current photo url: {currentPhotoUrl}
      </p>
    </div>
  );
};

export default App;
