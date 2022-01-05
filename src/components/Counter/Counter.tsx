import React, { useEffect, useState } from 'react';

import { Props } from './index';

import './Counter.css';

interface CounterProps extends Props {
  showAfter: number;
}

const Counter: React.FC<CounterProps> = ({ counter, total, showAfter }) => {
  const [className, setClassName] = useState('willFadeIn');
  useEffect(() => {
    setTimeout(() => {
      setClassName((cn) => `${cn} fadeIn`);
    }, showAfter);
  }, [showAfter]);
  return (
    <div id="counter" className={className}>
      {counter}/{total}
    </div>
  );
};

export default Counter;
