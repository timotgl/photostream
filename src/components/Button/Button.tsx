import React from 'react';

import css from './Button.module.css';

type Props = {
  href: string;
  text: string;
  className?: string;
};

const Button = ({ href, text, className = '' }: Props) => (
  <a href={href} className={[css.Button, className].join(' ')}>
    {text}
  </a>
);

export default Button;
