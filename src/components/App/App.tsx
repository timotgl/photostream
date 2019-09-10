import React, { MouseEvent } from 'react';
import logo from '../../logo.svg';
import './App.css';

type Props = {
  showNextPhoto: () => void;
};

const App: React.FC<Props> = ({ showNextPhoto }) => {
  const handleClick = (clickEvent: MouseEvent) => {
    clickEvent.preventDefault();
    showNextPhoto();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button onClick={handleClick}>show next photo</button>
        </a>
      </header>
    </div>
  );
};

export default App;
