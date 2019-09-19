import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App hash="" showNextPhoto={(): null => null} showPreviousPhoto={(): null => null} fetchAlbum={(): null => null} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
