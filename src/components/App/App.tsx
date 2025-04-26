import { useEffect, useState } from 'react';
import { useHashLocation } from 'wouter/use-hash-location';

import Album from '../AlbumView';
import Slideshow from '../Slideshow';
import { AlbumDirectory } from '../../types';
import AlbumList from '../AlbumList';
import { fetchAlbumDirectory } from '../../utils/fetch';

const App = () => {
  const [hash] = useHashLocation();
  const [albumName, file] = hash.slice(1).split('/');

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

  return <Slideshow albumName={albumName} file={file} />;
};

export default App;
