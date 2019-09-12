import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import photosReducer from './photos/reducer';

const store = createStore(
  photosReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
