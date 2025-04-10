import React from 'react';

import { Album, AlbumDirectory } from '../../types';
import config from '../../config';
// import css from './AlbumList.module.css';
import { buildPhotoThumbnailUrl } from '../../utils/urls';
import GridContainer from '../GridContainer';
import ThumbnailLink from '../ThumbnailLink';

type Props = {
  albumDirectory: AlbumDirectory;
};

const hasLocation = (location: string) => location && location !== 'Unbekannter Ort';
const hasDate = (date: string) => date && date !== 'Unbekanntes Datum';

const formatCaption = ({ title, location, date }: Album): string => {
  const segments = [title];
  if (hasLocation(location) || hasDate(date)) {
    segments.push(' (');
    if (hasLocation(location)) {
      segments.push(location);
    }
    if (hasDate(date)) {
      segments.push(` - ${date}`);
    }
    segments.push(')');
  }
  return segments.join('');
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
          caption={formatCaption(album)}
        />
      ))}
    </GridContainer>
  );
};

export default AlbumList;
