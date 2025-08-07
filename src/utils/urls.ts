import config from '../config';
import { PHOTOW_WIDTH_TN } from '../constants';

export const buildPhotoThumbnailUrl = (albumName: string, file: string) =>
  `${config.ALBUM_ROOT}/${albumName}/${PHOTOW_WIDTH_TN}/${file}`;
