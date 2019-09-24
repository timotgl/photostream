import { RootState } from '../interfaces';
import { PhotoItem } from './interfaces';

const defaultPhotoItem: PhotoItem = {
  file: '',
  title: 'Loading image...',
  location: '',
  date: '',
  caption: '',
};

export const getCurrentPhoto = (state: RootState): PhotoItem => {
  const { items, currentIndex } = state.photos;
  return items.length ? items[currentIndex] : defaultPhotoItem;
};
