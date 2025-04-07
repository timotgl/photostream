import React from 'react';

import css from './ThumbnailLink.module.css';

type Props = {
  href: string;
  imageSrc: string;
  title: string;
  caption: string;
};

const ThumbnailLink = ({ href, imageSrc, title, caption }: Props) => {
  return (
    <a href={href} className={css.Link}>
      <img src={imageSrc} alt={title} className={css.Image} />
      <p className={css.Caption}>{caption}</p>
    </a>
  );
};

export default ThumbnailLink;
