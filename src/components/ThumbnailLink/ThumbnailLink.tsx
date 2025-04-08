import React from 'react';
import { push } from 'connected-react-router';

import css from './ThumbnailLink.module.css';

type Props = {
  href: string;
  imageSrc: string;
  title: string;
  caption: string;
  captionOnHoverOnly?: boolean;
  push: typeof push;
};

const ThumbnailLink = ({ href, imageSrc, title, caption, captionOnHoverOnly = false, push }: Props) => {
  const onClick = (clickEvent: React.MouseEvent<HTMLAnchorElement>) => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    push(href);
  };
  return (
    <a href={href} className={css.Link} onClick={onClick}>
      <img src={imageSrc} alt={title} className={css.Image} />
      <p className={[css.Caption, ...[captionOnHoverOnly ? css.OnHoverOnly : '']].join(' ')}>{caption}</p>
    </a>
  );
};

export default ThumbnailLink;
