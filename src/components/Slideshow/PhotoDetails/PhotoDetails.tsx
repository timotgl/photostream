import type React from 'react';
import { useEffect, useState } from 'react';

import './PhotoDetails.css';
import useAlbumAndFileHashLocation from '../../../hooks/useAlbumAndFileHashLocation.ts';
import { useNavigationHelpState } from '../../../hooks/useNavigationHelpState.ts';
import useAlbumStore from '../../../store/useAlbumStore.ts';
import type { PhotoItem } from '../../../types.ts';

interface PhotoDetailsProps {
  currentPhotoIndex: number;
}

const PlaceholderPhotoItem: PhotoItem = {
  file: '',
  title: 'Loading image...',
  location: '',
  date: '',
  caption: '',
  width: 0,
};

const PhotoDetails: React.FC<PhotoDetailsProps> = ({ currentPhotoIndex }) => {
  const { fadeInDelay } = useNavigationHelpState();
  const { albumName } = useAlbumAndFileHashLocation();
  const { title, location, date, caption } = useAlbumStore((state) => {
    const { content } = state.albumByName[albumName];
    return content.length ? content[currentPhotoIndex] : PlaceholderPhotoItem;
  });

  const [className, setClassName] = useState('willFadeIn');
  useEffect(() => {
    setTimeout(() => {
      setClassName((cn) => `${cn} fadeIn`);
    }, fadeInDelay);
  }, [fadeInDelay]);
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
