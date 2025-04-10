import React, { useEffect, useState } from 'react';

import loadJsonFile from '../../utils/loadJsonFile';
import { PhotoItem } from '../../redux/photos/interfaces';
import getAlbumUrl from '../../utils/getAlbumUrl';
import config from '../../config';
import css from './AlbumView.module.css';
import { buildPhotoThumbnailUrl, buildPhotoUrl } from '../../utils/urls';
import GridContainer from '../GridContainer';
import ThumbnailLink from '../ThumbnailLink';
import Button from '../Button';
import { Album } from '../../types';

type Props = {
  name: string;
  title: string;
};

// TODO: cache album.json, don't fetch it again every time this component is mounted
const fetchAlbum = (name: string): Promise<Array<PhotoItem>> => loadJsonFile<Array<PhotoItem>>(getAlbumUrl(name));

const hasLocation = (location: string) => location && location !== 'Unbekannter Ort';
const hasDate = (date: string) => date && date !== 'Unbekanntes Datum';

const formatCaption = ({ title, location, date, caption }: PhotoItem): string => {
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
  if (caption) {
    segments.push(` ${caption}`);
  }
  return segments.join('');
};

const AlbumView = ({ name, title }: Props) => {
  const [photoItems, setPhotoItems] = useState<Array<PhotoItem>>([]);

  useEffect(() => {
    fetchAlbum(name).then((photoItems) => setPhotoItems(photoItems));
  }, []);

  return (
    <div className={css.Container}>
      <header className={css.Header}>
        <Button href={`${config.PUBLIC_URL}/`} text="← All Albums" />
        <h1 className={css.Title}>{title}</h1>
      </header>
      <GridContainer>
        {photoItems.map((photoItem) => (
          <ThumbnailLink
            key={photoItem.file}
            href={buildPhotoUrl(name, photoItem.file)}
            imageSrc={buildPhotoThumbnailUrl(name, photoItem.file)}
            title={photoItem.title}
            caption={formatCaption(photoItem)}
            captionOnHoverOnly
          />
        ))}
      </GridContainer>
    </div>
  );
};

export default AlbumView;
