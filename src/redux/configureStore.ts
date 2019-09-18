import { Store, createStore, applyMiddleware } from 'redux';
import { History, createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer from './rootReducer';

export const history: History = createBrowserHistory();

const configureStore = (): Store => {
  /*
  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }
  */

  return createStore(
    createRootReducer(history), // root reducer with router state
    {}, // preloadedState
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware,
      ),
    ),
  );
};

export default configureStore;
