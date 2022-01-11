import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { configureStore } from '@reduxjs/toolkit';

import PhotosReducer from './photos/reducer';

export const history = createBrowserHistory();

const reducer = {
  router: connectRouter(history),
  photos: PhotosReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
});

export default store;
