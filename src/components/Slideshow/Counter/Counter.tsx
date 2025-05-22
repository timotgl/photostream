import React, { useEffect, useState } from 'react';

import './Counter.css';
import useAlbumAndFileHashLocation from '../../../hooks/useAlbumAndFileHashLocation.ts';
import useAlbumStore from '../../../store/useAlbumStore.ts';

interface CounterProps {
  currentPhotoIndex: number;
  showAfter: number;
}

const Counter: React.FC<CounterProps> = ({ currentPhotoIndex, showAfter }) => {
  const counter = currentPhotoIndex + 1;
  const { albumName } = useAlbumAndFileHashLocation();
  const total = useAlbumStore(
    (state) => state.albumByName[albumName].content.length,
  );

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
