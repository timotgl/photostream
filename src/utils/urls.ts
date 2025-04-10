import config from '../config';

export const buildPhotoUrl = (albumName: string, file: string) => `${config.PUBLIC_URL}/#${albumName}/${file}`;

// TODO: handle different resolutions
export const buildPhotoThumbnailUrl = (albumName: string, file: string) =>
  `${config.ALBUM_ROOT}/${albumName}/480/${file}`;
