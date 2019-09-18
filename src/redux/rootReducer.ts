import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import PhotosReducer from './photos/reducer';

const createRootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    photos: PhotosReducer,
  });

export default createRootReducer;
