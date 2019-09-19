import React, { useEffect, useState } from 'react';

import './PhotoDetails.css';
import { PhotoItem } from '../../redux/photos/interfaces';

interface PhotoDetailsProps extends PhotoItem {
  showAfter: number;
}

const PhotoDetails: React.FC<PhotoDetailsProps> = ({ title, location, date, caption, showAfter }) => {
  const [className, setClassName] = useState('willFadeIn');
  useEffect(() => {
    setTimeout(() => {
      setClassName(cn => `${cn} fadeIn`);
    }, showAfter);
  }, [showAfter]);
  return (
    <div id="PhotoDetails" className={className}>
      <h1 id="title">{title}</h1>
      <h2 id="locationAndDate">
        {location} &middot; {date}
      </h2>
      <p id="caption">{caption}</p>
    </div>
  );
};

export default PhotoDetails;
