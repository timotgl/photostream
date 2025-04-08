import React, { useEffect, useState } from 'react';

import Album from '../AlbumView';
import Slideshow from '../Slideshow';
import { AlbumDirectory } from '../../types';
import AlbumList from '../AlbumList';
import { fetchAlbumDirectory } from '../../utils/fetch';

type Props = {
  albumName: string;
  file: string;
};

const App = ({ albumName, file }: Props) => {
  const [albums, setAlbums] = useState<AlbumDirectory>([]);

  useEffect(() => {
    fetchAlbumDirectory().then((albums) => setAlbums(albums));
  }, []);

  if (!albums.length) {
    return <div>Fetching album directory</div>;
  }

  if (!albumName) {
    return <AlbumList albumDirectory={albums} />;
  }

  if (!file) {
    const album = albums.find((album) => album.name === albumName);
    if (!album) {
      throw new Error('Album not found!');
    }
    return <Album name={albumName} title={album.title} />;
  }

  return <Slideshow />;
};

export default App;
