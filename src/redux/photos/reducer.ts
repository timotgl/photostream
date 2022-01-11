import { createReducer } from '@reduxjs/toolkit';

import actionTypes from '../actionTypes';
import { PhotoItem, State } from './interfaces';
import { fetchAlbum } from './actions';

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

const photosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionTypes.PHOTOS.SHOW_NEXT, (state) => {
      // Loop over to first photo if last photo was reached.
      state.currentIndex =
        state.currentIndex === initialState.currentIndex ? state.items.length - 1 : state.currentIndex - 1;
    })
    .addCase(actionTypes.PHOTOS.SHOW_PREVIOUS, (state) => {
      // Loop over to last photo if first photo was reached.
      state.currentIndex =
        state.currentIndex === state.items.length - 1 ? initialState.currentIndex : state.currentIndex + 1;
    })
    .addCase(fetchAlbum.fulfilled, (state, action) => {
      const { album, albumName, switchToPhoto } = action.payload;
      state.currentIndex = switchToPhoto
        ? findPhotoIndexForFile(album, switchToPhoto, state.currentIndex)
        : // Reset currentIndex if there is no photo to switch to via hash url;
          initialState.currentIndex;
      state.items = album;
      state.albumName = albumName;
    });
});

export default photosReducer;
