import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import photosReducer from './photos/reducer';

const dummyMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log('dummyMiddleware action:', action);
  return next(action);
};

const store = createStore(
  photosReducer,
  composeWithDevTools(applyMiddleware(dummyMiddleware)),
);

export default store;
