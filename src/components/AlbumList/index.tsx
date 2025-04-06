import React from 'react';

import { AlbumDirectory } from '../../types';
import config from '../../config';

type Props = {
  albumDirectory: AlbumDirectory;
};

const AlbumList = ({ albumDirectory }: Props) => {
  return (
    <ul>
      {albumDirectory.map((album) => (
        <li key={album.name}>
          <a href={`${config.PUBLIC_URL}/#${album.name}`}>
            <h2>{album.title}</h2>
            <p>
              {album.location} - {album.date}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default AlbumList;
