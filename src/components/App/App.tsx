import React from 'react';
import logo from '../../logo.svg';
import './App.css';

type Props = {
  showNextPhoto: () => void;
  fetchAlbum: () => void;
};

const App: React.FC<Props> = ({ showNextPhoto, fetchAlbum }) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={fetchAlbum}>fetch album</button>
        <button onClick={showNextPhoto}>show next photo</button>
      </header>
    </div>
  );
};

export default App;
