import React from 'react';

import './Counter.css';

interface Props {
  counter: number;
}

const Counter: React.FC<Props> = ({ counter }) => <div id="counter">{counter}</div>;

export default Counter;
