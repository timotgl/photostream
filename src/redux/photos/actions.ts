import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { push, CallHistoryMethodAction } from 'connected-react-router';

import config from '../../config';
import actionTypes from '../actionTypes';
import { RootState } from '../interfaces';
import { isPhotoItem, PhotoItem } from './interfaces';
import loadJsonFile from '../../utils/loadJsonFile';
import { getCurrentPhoto } from './selectors';

const pushCurrentPhotoHashUrl = (getState: () => RootState): CallHistoryMethodAction => {
  const state = getState();
  const currentPhoto = getCurrentPhoto(state);
  return push(`#${state.photos.albumName}/${currentPhoto.file}`);
};

const getAlbumUrl = (albumName: string): string => `${config.ALBUM_ROOT}/${albumName}/${config.ALBUM_FILENAME}`;

export const showNextPhoto = (): ThunkAction<Promise<void>, RootState, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState): Promise<void> => {
    dispatch({ type: actionTypes.PHOTOS.SHOW_NEXT });
    dispatch(pushCurrentPhotoHashUrl(getState));
  };
};

export const showPreviousPhoto = (): ThunkAction<Promise<void>, RootState, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState): Promise<void> => {
    dispatch({ type: actionTypes.PHOTOS.SHOW_PREVIOUS });
    dispatch(pushCurrentPhotoHashUrl(getState));
  };
};

export const fetchAlbumRequest = (): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_REQUEST });

export const fetchAlbumSuccess = (album: Array<PhotoItem>, albumName: string, switchToPhoto: string): AnyAction => ({
  type: actionTypes.PHOTOS.FETCH_ALBUM_SUCCESS,
  payload: { album, albumName, switchToPhoto },
});

export const fetchAlbumFailure = (): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_FAILURE });

export const fetchAlbum = (
  albumName: string,
  switchToPhoto: string,
): ThunkAction<Promise<void>, RootState, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState): Promise<void> => {
    dispatch(fetchAlbumRequest());

    try {
      const album = (await loadJsonFile(getAlbumUrl(albumName))) as Array<PhotoItem>;
      if (album.every(item => isPhotoItem(item))) {
        dispatch(fetchAlbumSuccess(album, albumName, switchToPhoto));
        dispatch(pushCurrentPhotoHashUrl(getState));
      } else {
        dispatch(fetchAlbumFailure());
      }
    } catch {
      dispatch(fetchAlbumFailure());
    }
  };
};
