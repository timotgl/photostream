import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './redux/store';
import App from './components/App';
import config from './config';

import './index.css';

const requiredPathname = `${config.PUBLIC_URL}/`;
const isCurrentUrlCorrect = window.location.pathname.indexOf(requiredPathname) >= 0;

if (process.env.NODE_ENV === 'development' && !isCurrentUrlCorrect) {
  // Ensure that the current URL matches what is defined as "homepage" in package.json (PUBLIC_URL).
  window.location = requiredPathname as unknown as Location;
} else {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
}
