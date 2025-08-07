import config from '../config';
import { PHOTO_WIDTH_TN } from '../constants';

export const buildPhotoThumbnailUrl = (albumName: string, file: string) =>
  `${config.ALBUM_ROOT}/${albumName}/${PHOTO_WIDTH_TN}/${file}`;
