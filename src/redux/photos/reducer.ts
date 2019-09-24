import actionTypes from '../actionTypes';
import { AnyAction } from 'redux';

import { PhotoItem, State } from './interfaces';

const initialState: State = {
  albumName: '',
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

  switch (action.type) {
    case actionTypes.PHOTOS.SHOW_NEXT:
      // Loop over to first photo if last photo was reached.
      newIndex = state.currentIndex === initialState.currentIndex ? state.items.length - 1 : state.currentIndex - 1;
      return {
        ...state,
        currentIndex: newIndex,
      };
    case actionTypes.PHOTOS.SHOW_PREVIOUS:
      // Loop over to last photo if first photo was reached.
      newIndex = state.currentIndex === state.items.length - 1 ? initialState.currentIndex : state.currentIndex + 1;
      return {
        ...state,
        currentIndex: newIndex,
      };
    case actionTypes.PHOTOS.FETCH_ALBUM_SUCCESS:
      const { album, albumName, switchToPhoto } = action.payload;
      return {
        ...state,
        currentIndex: switchToPhoto
          ? findPhotoIndexForFile(album, switchToPhoto, state.currentIndex)
          : initialState.currentIndex, // Reset currentIndex if there is no photo to switch to via hash url
        items: album,
        albumName,
      };
    default:
      return state;
  }
};

export default photosReducer;
