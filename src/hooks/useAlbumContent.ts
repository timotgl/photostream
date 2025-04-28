import { useEffect } from 'react';
import { AlbumContent } from '../types.ts';
import useAlbumStore from '../store/useAlbumStore.ts';

/**
 * Fetch an album's content (the array of photo items) once the component is mounted,
 * unless the album store already contains it.
 */
const useAlbumContent = (albumName: string): AlbumContent => {
  const { content } = useAlbumStore((state) => state.albumByName[albumName]);
  const fetchAlbumContent = useAlbumStore((state) => state.fetchAlbumContent);

  useEffect(() => {
    if (!content.length) {
      // noinspection JSIgnoredPromiseFromCall
      fetchAlbumContent(albumName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return content;
};

export default useAlbumContent;
