import React from 'react';
import { push } from 'connected-react-router';

import css from './Button.module.css';

type Props = {
  href: string;
  text: string;
  className?: string;
  push: typeof push;
};

const Button = ({ href, text, className = '', push }: Props) => {
  const onClick = (clickEvent: React.MouseEvent<HTMLAnchorElement>) => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    push(href);
  };
  return (
    <a href={href} className={[css.Button, className].join(' ')} onClick={onClick}>
      {text}
    </a>
  );
};

export default Button;
