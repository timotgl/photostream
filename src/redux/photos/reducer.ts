import actionTypes from '../actionTypes';
import { ReduxAction } from '../types';

const initialState = {
  currentIndex: 0,
};

const photosReducer = (state = initialState, action: ReduxAction) => {
  if (action.type === actionTypes.PHOTOS.SHOW_NEXT) {
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
    };
  }

  return state;
};

export default photosReducer;
