import { useState, useEffect } from 'react';

import './NavigationHelp.css';

type Props = {
  hideAfter: number;
};

const NavigationHelp = ({ hideAfter }: Props) => {
  const [className, setClassName] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setClassName('fadeOut');
    }, hideAfter);
  }, [hideAfter]);
  return (
    <div id="navigationHelp" className={className}>
      <h1>
        Use click, swipe left/right, arrow keys, or mouse wheel to browse photos
      </h1>
    </div>
  );
};

export default NavigationHelp;
