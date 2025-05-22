import { useEffect } from 'react';

import type { AlbumContent } from '../../types.ts';
import useAlbumStore from '../useAlbumStore.ts';

/**
 * Fetch an album's content (the array of photo items) once the component is mounted,
 * unless the album store already contains it.
 */
const useAlbumContent = (albumName: string): AlbumContent => {
  const { content } = useAlbumStore((state) => state.albumByName[albumName]);
  const fetchAlbumContent = useAlbumStore((state) => state.fetchAlbumContent);

  // biome-ignore lint/correctness/useExhaustiveDependencies: effect only runs once
  useEffect(() => {
    if (!content.length) {
      // noinspection JSIgnoredPromiseFromCall
      fetchAlbumContent(albumName);
    }
  }, []);

  return content;
};

export default useAlbumContent;
