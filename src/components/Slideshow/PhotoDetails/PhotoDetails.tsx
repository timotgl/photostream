import React, { useEffect, useState } from 'react';

import './PhotoDetails.css';
import useAlbumAndFileHashLocation from '../../../hooks/useAlbumAndFileHashLocation.ts';
import useAlbumStore from '../../../store/useAlbumStore.ts';
import { PhotoItem } from '../../../types.ts';

interface PhotoDetailsProps {
  currentPhotoIndex: number;
  showAfter: number;
}

const PlaceholderPhotoItem: PhotoItem = {
  file: '',
  title: 'Loading image...',
  location: '',
  date: '',
  caption: '',
};

const PhotoDetails: React.FC<PhotoDetailsProps> = ({
  currentPhotoIndex,
  showAfter,
}) => {
  const { albumName } = useAlbumAndFileHashLocation();
  const { title, location, date, caption } = useAlbumStore((state) => {
    const { content } = state.albumByName[albumName];
    return content.length ? content[currentPhotoIndex] : PlaceholderPhotoItem;
  });

  const [className, setClassName] = useState('willFadeIn');
  useEffect(() => {
    setTimeout(() => {
      setClassName((cn) => `${cn} fadeIn`);
    }, showAfter);
  }, [showAfter]);
  return (
    <div id="PhotoDetails" className={className}>
      <h1 id="title">{title}</h1>
      <h2 id="locationAndDate">
        {location || date ? (
          <span>
            {location} &middot; {date}
          </span>
        ) : (
          ''
        )}
      </h2>
      <p id="caption">{caption}</p>
    </div>
  );
};

export default PhotoDetails;
