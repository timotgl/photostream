import { Store, createStore, applyMiddleware } from 'redux';
import { History, createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer from './rootReducer';

export const history: History = createBrowserHistory();

const configureStore = (): Store =>
  createStore(
    createRootReducer(history),
    {}, // preloadedState
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunkMiddleware)),
  );

export default configureStore;
