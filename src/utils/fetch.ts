import config from '../config';
import { AlbumDirectory } from '../types';

export const fetchAlbumDirectory = async (): Promise<AlbumDirectory> => {
  try {
    const res = await fetch(config.ALBUM_DIRECTORY_URL);
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
