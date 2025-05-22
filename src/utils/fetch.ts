import config from '../config';
import { AlbumContent, AlbumDirectory } from '../types';

export const fetchAlbumDirectory = async (): Promise<AlbumDirectory> => {
  try {
    console.log('fetchAlbumDirectory');
    const res = await fetch(config.ALBUM_DIRECTORY_URL);
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchAlbumContent = async (
  albumName: string,
): Promise<AlbumContent> => {
  const url = `${config.ALBUM_ROOT}/${albumName}/${config.ALBUM_FILENAME}`;
  try {
    console.log('fetchAlbumContent name:', albumName);
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
