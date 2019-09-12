import actionTypes from '../actionTypes';
import { AnyAction } from 'redux';

type State = {
  readonly currentIndex: number;
};

const initialState: State = {
  currentIndex: 0,
};

const photosReducer = (state: State = initialState, action: AnyAction): State => {
  if (action.type === actionTypes.PHOTOS.SHOW_NEXT) {
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
    };
  }

  return state;
};

export default photosReducer;
