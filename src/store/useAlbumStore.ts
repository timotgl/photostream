import { create } from 'zustand';

import { fetchAlbumContent, fetchAlbumDirectory } from '../utils/fetch.ts';
import { AlbumWithContent } from '../types.ts';

export type AlbumState = {
  albumNamesInOrder: Array<string>;
  albumByName: Record<string, AlbumWithContent>;

  isFetchingAlbumDirectory: boolean;
  albumsBeingFetched: Set<string>;

  fetchAlbumDirectory: () => Promise<void>;
  fetchAlbumContent: (albumName: string) => Promise<void>;
};

const useAlbumStore = create<AlbumState>((set, get) => ({
  albumNamesInOrder: [],
  albumByName: {},

  isFetchingAlbumDirectory: false,
  albumsBeingFetched: new Set<string>(),

  fetchAlbumDirectory: async (): Promise<void> => {
    // Avoid fetching the album directory again, in case a request might already be in progress.
    if (get().isFetchingAlbumDirectory) {
      return;
    }

    set(() => ({ isFetchingAlbumDirectory: true }));
    const albumDirectory = await fetchAlbumDirectory();
    set(() => {
      const albumNamesInOrder: Array<string> = [];
      const albumByName: Record<string, AlbumWithContent> = {};
      albumDirectory.forEach((album) => {
        albumNamesInOrder.push(album.name);
        albumByName[album.name] = { ...album, content: [] };
      });
      return {
        albumNamesInOrder,
        albumByName,
        isFetchingAlbumDirectory: false,
      };
    });
  },

  fetchAlbumContent: async (albumName: string) => {
    // Avoid fetching the same album again, in case a request might already be in progress.
    if (get().albumsBeingFetched.has(albumName)) {
      return;
    }

    // Remember the album we're about to fetch
    let albumsBeingFetched = new Set(get().albumsBeingFetched);
    albumsBeingFetched.add(albumName);
    set(() => ({ albumsBeingFetched }));

    const albumContent = await fetchAlbumContent(albumName);

    // Signal that we're done fetching this particular album.
    albumsBeingFetched = new Set(get().albumsBeingFetched);
    albumsBeingFetched.delete(albumName);

    set((state) => ({
      albumByName: {
        ...state.albumByName,
        [albumName]: { ...state.albumByName[albumName], content: albumContent },
      },
      albumsBeingFetched,
    }));
  },
}));

export default useAlbumStore;
