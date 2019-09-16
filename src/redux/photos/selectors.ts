import { State, PhotoItem } from './interfaces';

const defaultPhotoItem: PhotoItem = {
  file: '',
  title: 'Loading image&hellip;',
  location: '',
  date: '',
  caption: '',
};

export const getCurrentPhoto = (state: State): PhotoItem => {
  const { items, currentIndex } = state;
  return items.length ? items[currentIndex] : defaultPhotoItem;
};
