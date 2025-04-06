import config from '../config';

const getAlbumUrl = (albumName: string): string => `${config.ALBUM_ROOT}/${albumName}/${config.ALBUM_FILENAME}`;

export default getAlbumUrl;
