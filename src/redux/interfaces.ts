import { State as PhotosState } from './photos/interfaces';

export interface RootState {
  router: object;
  photos: PhotosState;
}
