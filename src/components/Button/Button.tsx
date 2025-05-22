import type React from 'react';
import { useHashLocation } from 'wouter/use-hash-location';

import css from './Button.module.css';

type Props = {
  href: string;
  text: string;
  className?: string;
};

const Button = ({ href, text, className = '' }: Props) => {
  const [, navigate] = useHashLocation();
  const onClick = (clickEvent: React.MouseEvent<HTMLAnchorElement>) => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    navigate(href);
  };
  return (
    <a
      href={href}
      className={[css.Button, className].join(' ')}
      onClick={onClick}
    >
      {text}
    </a>
  );
};

export default Button;
