import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/interfaces';
import Album from '../AlbumView';
import Slideshow from '../Slideshow';
import { AlbumDirectory } from '../../types';
import AlbumList from '../AlbumList';
import { fetchAlbumDirectory } from '../../utils/fetch';

const App = () => {
  const { hash } = useSelector((state: RootState) => state.router.location);
  const [albumName, file] = hash.replace('#', '').split('/');

  const [albums, setAlbums] = useState<AlbumDirectory>([]);

  useEffect(() => {
    fetchAlbumDirectory().then((albums) =>
      setAlbums([
        ...albums,
        ...albums,
        ...albums,
        ...albums,
        ...albums,
        ...albums,
        ...albums,
        ...albums,
        ...albums,
        ...albums,
        ...albums,
      ]),
    );
  }, []);

  if (!albums.length) {
    return <div>Fetching album directory</div>;
  }

  if (!albumName) {
    return <AlbumList albumDirectory={albums} />;
  }

  if (!file) {
    return <Album name={albumName} />;
  }

  return <Slideshow />;
};

export default App;
