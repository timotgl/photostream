import { useEffect, useState } from 'react';
import { useHashLocation } from 'wouter/use-hash-location';

import useAlbumAndFileHashLocation from '../../hooks/useAlbumAndFileHashLocation.ts';
import useAlbumContent from '../../store/hooks/useAlbumContent.ts';
import Slideshow from './Slideshow';
import { findPhotoIndexForFile } from './helpers.ts';

const SlideShowWithHashLocation = () => {
  const { albumName, file } = useAlbumAndFileHashLocation();
  const [, navigate] = useHashLocation();
  const albumContent = useAlbumContent(albumName);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  useEffect(() => {
    // Make sure the current index points to the currently shown photo.
    // Calling next/previous photo will first change the hash url and then we adjust the index accordingly.
    const newPhotoIndex = findPhotoIndexForFile(
      albumContent,
      file,
      currentPhotoIndex,
    );
    if (newPhotoIndex !== currentPhotoIndex) {
      setCurrentPhotoIndex(newPhotoIndex);
    }
  }, [albumContent, currentPhotoIndex, file]);

  const updateFileHashLocation = (newPhotoIndex: number) => {
    if (!albumContent.length) {
      return;
    }
    const updatedFile = albumContent[newPhotoIndex].file;
    navigate(`${albumName}/${updatedFile}`);
  };

  const showNextPhoto = () => {
    // Loop over to first photo if last photo was reached.
    const nextPhotoIndex =
      currentPhotoIndex === 0 ? albumContent.length - 1 : currentPhotoIndex - 1;
    updateFileHashLocation(nextPhotoIndex);
  };

  const showPreviousPhoto = () => {
    // Loop over to last photo if first photo was reached.
    const previousPhotoIndex =
      currentPhotoIndex === albumContent.length - 1 ? 0 : currentPhotoIndex + 1;
    updateFileHashLocation(previousPhotoIndex);
  };

  return (
    <Slideshow
      albumName={albumName}
      file={file}
      currentPhotoIndex={currentPhotoIndex}
      showNextPhoto={showNextPhoto}
      showPreviousPhoto={showPreviousPhoto}
    />
  );
};

export default SlideShowWithHashLocation;
