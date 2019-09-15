import actionTypes from '../actionTypes';
import { AnyAction } from 'redux';

import { State } from './interfaces';

const initialState: State = {
  currentIndex: 0,
  items: [],
};

const photosReducer = (state: State = initialState, action: AnyAction): State => {
  if (action.type === actionTypes.PHOTOS.SHOW_NEXT) {
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
    };
  }

  if (action.type === actionTypes.PHOTOS.FETCH_ALBUM_SUCCESS) {
    return {
      ...state,
      items: action.payload,
    };
  }

  return state;
};

export default photosReducer;
