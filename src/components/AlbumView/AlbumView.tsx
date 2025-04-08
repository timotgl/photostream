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

type Props = {
  name: string;
  title: string;
};

// TODO: cache album.json, don't fetch it again every time this component is mounted
const fetchAlbum = (name: string): Promise<Array<PhotoItem>> => loadJsonFile<Array<PhotoItem>>(getAlbumUrl(name));

const renderThumbnailCaption = ({ title, location, date, caption }: PhotoItem) => {
  const base = `${title} (${location} - ${date})`;
  return caption ? `${base}${caption}` : base;
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
            caption={renderThumbnailCaption(photoItem)}
            captionOnHoverOnly
          />
        ))}
      </GridContainer>
    </div>
  );
};

export default AlbumView;
