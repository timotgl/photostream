import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import actionTypes from '../actionTypes';
import { isPhotoItem, PhotoItem } from './interfaces';
import loadJsonFile from '../../utils/loadJsonFile';

// TODO should work with 'https://timotaglieber.de/photos/photos.json' later (CORS)
const ALBUM_URL = 'http://localhost:3000/photos.json'; // 'http://172.20.10.2:3000/photos.json' for real device

export const showNextPhoto = (): AnyAction => ({ type: actionTypes.PHOTOS.SHOW_NEXT });

export const showPreviousPhoto = (): AnyAction => ({ type: actionTypes.PHOTOS.SHOW_PREVIOUS });

export const fetchAlbumRequest = (): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_REQUEST });

export const fetchAlbumSuccess = (album: Array<PhotoItem>, switchToPhoto: string): AnyAction => ({
  type: actionTypes.PHOTOS.FETCH_ALBUM_SUCCESS,
  payload: { album, switchToPhoto },
});

export const fetchAlbumFailure = (): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_FAILURE });

export const fetchAlbum = (switchToPhoto: string): ThunkAction<Promise<void>, RootState, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState): Promise<void> => {
    dispatch(fetchAlbumRequest());

    try {
      const album = (await loadJsonFile(ALBUM_URL)) as Array<PhotoItem>;
      if (album.every(item => isPhotoItem(item))) {
        dispatch(fetchAlbumSuccess(album, switchToPhoto));
        dispatch(pushCurrentPhotoHashUrl(getState));
      } else {
        dispatch(fetchAlbumFailure());
      }
    } catch {
      dispatch(fetchAlbumFailure());
    }
  };
};
