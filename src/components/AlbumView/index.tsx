import React, { useEffect, useState } from 'react';

import loadJsonFile from '../../utils/loadJsonFile';
import { PhotoItem } from '../../redux/photos/interfaces';
import getAlbumUrl from '../../utils/getAlbumUrl';
import config from '../../config';
import css from './AlbumView.module.css';

type Props = {
  name: string;
};

const fetchAlbum = (name: string): Promise<Array<PhotoItem>> => loadJsonFile<Array<PhotoItem>>(getAlbumUrl(name));

const Album = ({ name }: Props) => {
  const [photoItems, setPhotoItems] = useState<Array<PhotoItem>>([]);

  useEffect(() => {
    fetchAlbum(name).then((photoItems) => setPhotoItems(photoItems));
  }, []);

  return (
    <div>
      <a href={`${config.PUBLIC_URL}/`}>Back to album list</a>
      <h1>Album name: {name}</h1>
      <ul>
        {photoItems.map((photoItem) => (
          <li key={photoItem.file} className={css.PhotoContainer}>
            <a href={`${config.PUBLIC_URL}/#${name}/${photoItem.file}`}>
              <img
                src={`${config.ALBUM_ROOT}/${name}/1920/${photoItem.file}`}
                alt={photoItem.title}
                className={css.Thumbnail}
              />
              {/*
              <h2>{photoItem.title}</h2>
              <p>
                {photoItem.location} - {photoItem.date}
                <br />
                {photoItem.caption}
              </p>
              */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Album;
