import React from 'react';

import './PhotoDetails.css';
import { PhotoItem } from '../../redux/photos/interfaces';

const PhotoDetails: React.FC<PhotoItem> = ({ title, location, date, caption }) => (
  <div id="PhotoDetails">
    <h1 id="title">{title}</h1>
    <h2 id="locationAndDate">
      {location} &middot; {date}
    </h2>
    <p id="caption">{caption}</p>
  </div>
);

export default PhotoDetails;
