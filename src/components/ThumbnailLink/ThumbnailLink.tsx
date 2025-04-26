import React from 'react';

import css from './ThumbnailLink.module.css';
import { useHashLocation } from 'wouter/use-hash-location';

type Props = {
  href: string;
  imageSrc: string;
  title: string;
  caption: string;
  captionOnHoverOnly?: boolean;
};

const ThumbnailLink = ({
  href,
  imageSrc,
  title,
  caption,
  captionOnHoverOnly = false,
}: Props) => {
  const [, navigate] = useHashLocation();
  const onClick = (clickEvent: React.MouseEvent<HTMLAnchorElement>) => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    navigate(href);
  };
  return (
    <a href={href} className={css.Link} onClick={onClick}>
      <img src={imageSrc} alt={title} className={css.Image} />
      <p
        className={[
          css.Caption,
          ...[captionOnHoverOnly ? css.OnHoverOnly : ''],
        ].join(' ')}
      >
        {caption}
      </p>
    </a>
  );
};

export default ThumbnailLink;
