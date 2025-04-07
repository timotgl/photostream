import React from 'react';

import { AlbumDirectory } from '../../types';
import config from '../../config';
// import css from './AlbumList.module.css';
import { buildPhotoThumbnailUrl } from '../../utils/urls';
import GridContainer from '../GridContainer';
import ThumbnailLink from '../ThumbnailLink';

type Props = {
  albumDirectory: AlbumDirectory;
};

const AlbumList = ({ albumDirectory }: Props) => {
  return (
    <GridContainer>
      {albumDirectory.map((album, index) => (
        <ThumbnailLink
          key={`${album.name}-${index}`}
          href={`${config.PUBLIC_URL}/#${album.name}`}
          imageSrc={buildPhotoThumbnailUrl(album.name, album.file)}
          title={album.title}
          caption={`${album.title} (${album.location} - ${album.date})`}
        />
      ))}
    </GridContainer>
  );
};

export default AlbumList;
