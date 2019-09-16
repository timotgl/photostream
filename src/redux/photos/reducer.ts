import actionTypes from '../actionTypes';
import { AnyAction } from 'redux';

import { State } from './interfaces';

const initialState: State = {
  currentIndex: 0,
  items: [],
};

const photosReducer = (state: State = initialState, action: AnyAction): State => {
  let newIndex: number;
  if (action.type === actionTypes.PHOTOS.SHOW_NEXT) {
    newIndex = state.currentIndex === state.items.length - 1 ? initialState.currentIndex : state.currentIndex + 1;
    return {
      ...state,
      currentIndex: newIndex,
    };
  }

  if (action.type === actionTypes.PHOTOS.SHOW_PREVIOUS) {
    newIndex = state.currentIndex === initialState.currentIndex ? state.items.length - 1 : state.currentIndex - 1;
    return {
      ...state,
      currentIndex: newIndex,
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
