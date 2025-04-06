import React, { useState, useEffect } from 'react';

import './NavigationHelp.css';

const NavigationHelp: React.FC<{ hideAfter: number }> = ({ hideAfter }) => {
  const [className, setClassName] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setClassName('fadeOut');
    }, hideAfter);
  }, [hideAfter]);
  return (
    <div id="navigationHelp" className={className}>
      <h1>Use click, swipe left/right, arrow keys, or mouse wheel to browse photos</h1>
    </div>
  );
};

export default NavigationHelp;
