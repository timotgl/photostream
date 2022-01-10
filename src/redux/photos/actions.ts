import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { push, CallHistoryMethodAction } from 'connected-react-router';
import { createAsyncThunk } from '@reduxjs/toolkit';

import config from '../../config';
import actionTypes from '../actionTypes';
import { RootState } from '../interfaces';
import { isPhotoItem, PhotoItem } from './interfaces';
import loadJsonFile from '../../utils/loadJsonFile';
import { getCurrentPhoto } from './selectors';

/**
 * Persist current album und photo in URL. This allows to share the URL to a specific photo!
 */
const pushCurrentPhotoHashUrl = (getState: () => RootState): CallHistoryMethodAction => {
  const state = getState();
  const currentPhoto = getCurrentPhoto(state);
  return push(`#${state.photos.albumName}/${currentPhoto.file}`);
};

const getAlbumUrl = (albumName: string): string => `${config.ALBUM_ROOT}/${albumName}/${config.ALBUM_FILENAME}`;

export const showNextPhoto = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
    dispatch({ type: actionTypes.PHOTOS.SHOW_NEXT });
    dispatch(pushCurrentPhotoHashUrl(getState));
  };
};

export const showPreviousPhoto = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState): Promise<void> => {
    dispatch({ type: actionTypes.PHOTOS.SHOW_PREVIOUS });
    dispatch(pushCurrentPhotoHashUrl(getState));
  };
};

export const fetchAlbum = createAsyncThunk(
  actionTypes.PHOTOS.FETCH_ALBUM,
  async ({ albumName, switchToPhoto }: { albumName: string; switchToPhoto: string }, { rejectWithValue }) => {
    try {
      const album = (await loadJsonFile(getAlbumUrl(albumName))) as Array<PhotoItem>;
      if (!album.every((item) => isPhotoItem(item))) {
        return rejectWithValue('Invalid album');
      }
      return { album, albumName, switchToPhoto };
    } catch {
      return rejectWithValue('Request failed');
    }
  },
);

export const fetchAlbumAndUpdateUrl =
  (album: { albumName: string; switchToPhoto: string }) =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState) => {
    await dispatch(fetchAlbum(album));
    dispatch(pushCurrentPhotoHashUrl(getState));
  };
