import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import actionTypes from '../actionTypes';

const sleep = (delay: number) => new Promise((resolve) => window.setTimeout(() => resolve(['photo1', 'photo2']), delay));

export const showNextPhoto = (): AnyAction => ({ type: actionTypes.PHOTOS.SHOW_NEXT });

export const fetchAlbumRequest = (): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_REQUEST });

export const fetchAlbumSuccess = (album: any): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_SUCCESS, payload: album });

export const fetchAlbumFailure = (): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_REQUEST });

export const fetchAlbum = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
  dispatch(fetchAlbumRequest());

  try {
    const album = await sleep(2000);
    dispatch(fetchAlbumSuccess(album));
  } catch {
    dispatch(fetchAlbumFailure());
  }
};
