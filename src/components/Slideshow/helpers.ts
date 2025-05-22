import type { PhotoItem } from '../../types.ts';

/**
 * Try to find the index of a photo item in the given array based on that photo's filename.
 * Return the previously known index (currentIndex) if this fails.
 * currentIndex is maintained while the app cycles through the photos of an album.
 */
export const findPhotoIndexForFile = (
  items: Array<PhotoItem>,
  file: string,
  currentIndex: number,
): number => {
  let newIndex: number = currentIndex;
  items.find((photo: PhotoItem, index: number) => {
    if (photo.file === file) {
      newIndex = index;
      return true;
    }
    return false;
  });
  return newIndex;
};
