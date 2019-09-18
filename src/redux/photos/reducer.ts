import actionTypes from '../actionTypes';
import { AnyAction } from 'redux';

import { PhotoItem, State } from './interfaces';

const initialState: State = {
  currentIndex: 0,
  items: [],
};

const findPhotoIndexForFile = (items: Array<PhotoItem>, file: string, currentIndex: number): number => {
  let newIndex: number = currentIndex;
  items.find((photo: PhotoItem, index: number) => {
    if (photo.file === file) {
      newIndex = index;
      return true;
    }
    return false;
  });
  return newIndex;
};

const photosReducer = (state: State = initialState, action: AnyAction): State => {
  let newIndex: number;
  if (action.type === actionTypes.PHOTOS.SHOW_NEXT) {
    newIndex = state.currentIndex === initialState.currentIndex ? state.items.length - 1 : state.currentIndex - 1;
    return {
      ...state,
      currentIndex: newIndex,
    };
  }

  if (action.type === actionTypes.PHOTOS.SHOW_PREVIOUS) {
    newIndex = state.currentIndex === state.items.length - 1 ? initialState.currentIndex : state.currentIndex + 1;
    return {
      ...state,
      currentIndex: newIndex,
    };
  }

  if (action.type === actionTypes.PHOTOS.FETCH_ALBUM_SUCCESS) {
    const { album, switchToPhoto } = action.payload;
    return {
      ...state,
      currentIndex: findPhotoIndexForFile(album, switchToPhoto, state.currentIndex),
      items: album,
    };
  }

  return state;
};

export default photosReducer;
