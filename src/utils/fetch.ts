import config from '../config';
import { AlbumDirectory } from '../types';

const ALBUM_DIRECTORY_URL = `${process.env.PUBLIC_URL}/${config.ALBUM_ROOT}/${config.ALBUM_DIRECTORY_FILENAME}`;

export const fetchAlbumDirectory = async (): Promise<AlbumDirectory> => {
  try {
    const res = await fetch(ALBUM_DIRECTORY_URL);
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
