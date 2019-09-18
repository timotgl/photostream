import { RouterState } from 'connected-react-router';

import { State as PhotosState } from './photos/interfaces';

export interface RootState {
  router: RouterState;
  photos: PhotosState;
}
