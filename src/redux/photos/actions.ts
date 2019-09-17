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

export const fetchAlbumSuccess = (album: any): AnyAction => ({
  type: actionTypes.PHOTOS.FETCH_ALBUM_SUCCESS,
  payload: album,
});

export const fetchAlbumFailure = (): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_FAILURE });

export const fetchAlbum = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(fetchAlbumRequest());

    try {
      const album = (await loadJsonFile(ALBUM_URL)) as Array<PhotoItem>;
      if (album.every(item => isPhotoItem(item))) {
        dispatch(fetchAlbumSuccess(album));
      } else {
        dispatch(fetchAlbumFailure());
      }
    } catch {
      dispatch(fetchAlbumFailure());
    }
  };
};
