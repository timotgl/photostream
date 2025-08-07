import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useAlbumAndFileHashLocation from '../../hooks/useAlbumAndFileHashLocation.ts';
import useAlbumStore from '../../store/useAlbumStore.ts';
import AlbumList from '../AlbumList';
import Album from '../AlbumView';
import Slideshow from '../Slideshow';

const App = () => {
  const { t } = useTranslation();
  const { albumName, file } = useAlbumAndFileHashLocation();

  const albumNamesInOrder = useAlbumStore((state) => state.albumNamesInOrder);
  const fetchAlbumDirectory = useAlbumStore(
    (state) => state.fetchAlbumDirectory,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: effect supposed to run only once
  useEffect(() => {
    if (!albumNamesInOrder.length) {
      // noinspection JSIgnoredPromiseFromCall
      fetchAlbumDirectory();
    }
  }, []);

  if (!albumNamesInOrder.length) {
    return <div>{t('App.loadingDirectory')}</div>;
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
