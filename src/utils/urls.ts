import config from '../config';

// TODO: handle different resolutions
export const buildPhotoThumbnailUrl = (albumName: string, file: string) =>
  `${config.ALBUM_ROOT}/${albumName}/480/${file}`;
