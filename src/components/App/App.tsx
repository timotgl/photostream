import { useEffect } from 'react';

import Album from '../AlbumView';
import Slideshow from '../Slideshow';
import AlbumList from '../AlbumList';
import useAlbumStore from '../../store/useAlbumStore.ts';
import useAlbumAndFileHashLocation from '../../hooks/useAlbumAndFileHashLocation.ts';

const App = () => {
  const { albumName, file } = useAlbumAndFileHashLocation();

  const albumNamesInOrder = useAlbumStore((state) => state.albumNamesInOrder);
  const fetchAlbumDirectory = useAlbumStore(
    (state) => state.fetchAlbumDirectory,
  );

  useEffect(() => {
    if (!albumNamesInOrder.length) {
      // noinspection JSIgnoredPromiseFromCall
      fetchAlbumDirectory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!albumNamesInOrder.length) {
    return <div>Fetching album directory</div>;
  }

  if (!albumName) {
    return <AlbumList />;
  }

  if (!file) {
    return <Album />;
  }

  return <Slideshow />;
};

export default App;
