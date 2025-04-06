import React from 'react';

import { AlbumDirectory } from '../../types';
import config from '../../config';
import css from './AlbumList.module.css';

const PLACEHOLDER_IMAGE_URL = 'albums/highlights/1920/pacific-coast-highway.jpg';

type Props = {
  albumDirectory: AlbumDirectory;
};

const AlbumList = ({ albumDirectory }: Props) => {
  return (
    <div className={css.Container}>
      {albumDirectory.map((album, index) => (
        <a href={`${config.PUBLIC_URL}/#${album.name}`} key={`${album.name}-${index}`} className={css.Album}>
          <img src={PLACEHOLDER_IMAGE_URL} alt="placeholder" className={css.Thumbnail} />
          <p className={css.Caption}>
            {album.title} ({album.location} - {album.date})
          </p>
        </a>
      ))}
    </div>
  );
};

export default AlbumList;
