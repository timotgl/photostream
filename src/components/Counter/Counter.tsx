import React from 'react';

import { Props } from './index';

import './Counter.css';

const Counter: React.FC<Props> = ({ counter, total }) => (
  <div id="counter">
    {counter}/{total}
  </div>
);

export default Counter;
