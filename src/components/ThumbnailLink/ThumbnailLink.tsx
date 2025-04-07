import React from 'react';

import css from './ThumbnailLink.module.css';

type Props = {
  href: string;
  imageSrc: string;
  title: string;
  caption: string;
  captionOnHoverOnly?: boolean;
};

const ThumbnailLink = ({ href, imageSrc, title, caption, captionOnHoverOnly = false }: Props) => {
  return (
    <a href={href} className={css.Link}>
      <img src={imageSrc} alt={title} className={css.Image} />
      <p className={[css.Caption, ...[captionOnHoverOnly ? css.OnHoverOnly : '']].join(' ')}>{caption}</p>
    </a>
  );
};

export default ThumbnailLink;
