import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import actionTypes from '../actionTypes';
import {isPhotoItem, PhotoItem} from './interfaces';
import loadJsonFile from '../../utils/loadJsonFile';

// TODO should work with 'https://timotaglieber.de/photos/photos.json' later (CORS)
const ALBUM_URL = 'http://localhost:3000/photos.json';

export const showNextPhoto = (): AnyAction => ({ type: actionTypes.PHOTOS.SHOW_NEXT });

export const fetchAlbumRequest = (): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_REQUEST });

export const fetchAlbumSuccess = (album: any): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_SUCCESS, payload: album });

export const fetchAlbumFailure = (): AnyAction => ({ type: actionTypes.PHOTOS.FETCH_ALBUM_FAILURE });

/*
 * ThunkAction<R, S, E A>
 * or
 * ThunkAction<ResultType, StateType, ExtraArgumentType, ActionType>
 *
 * R = return type of the action creator
 *
 * S = type of state returned by using getState() inside
 *
 * E = type of the extra argument the thunk middleware was created with.
 *     See https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
 *     The inner function has not only dispatch and getState, but a third argument in its scope.
 *
 * A = type of the actions dispatch()ed inside the inner function.
 *
 *
 * ThunkDispatch<S, E, A>  - same S, E, A as with ThunkAction.
 */

/*
 * R = type of Result - We use Promise<void> because that's what thunks return - a promise.
 * S = type of State - We use {} because getState is not used inside the thunk
 * E = type of extra argument - We use {} because there is no extra argument?
 * A = type of action - We use AnyAction because we dispatch simple actions inside.
 */
type FetchAlbumReturnType = ThunkAction<Promise<void>, {}, {}, AnyAction>;
type FetchAlbumThunkDispatchType = ThunkDispatch<{}, {}, AnyAction>;

/*
 * The inner function "return async () => {}" has the return type Promise<void> because it returns a
 * Promise (due to async/await), but never resolves anything (void).
 *
 * Thunks are functions that return a promise.
 */
export const fetchAlbum = (): FetchAlbumReturnType => {
  return async (dispatch: FetchAlbumThunkDispatchType): Promise<void> => {
    dispatch(fetchAlbumRequest());

    try {
      const album = await loadJsonFile(ALBUM_URL) as Array<PhotoItem>;
      if (album.every((item) => isPhotoItem(item))) {
        dispatch(fetchAlbumSuccess(album));
      } else {
        dispatch(fetchAlbumFailure());
      }
    } catch {
      dispatch(fetchAlbumFailure());
    }
  };
};
