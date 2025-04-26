import Slideshow from './Slideshow';

type Props = {
  albumName: string;
  file: string;
};

const SlideShowWithHashLocation = ({ albumName, file }: Props) => {
  const showNextPhoto = () => {
    console.log('TODO: grab showNextPhoto from zustand store');
  };

  const showPreviousPhoto = () => {
    console.log('TODO: grab showPreviousPhoto from zustand store');
  };

  const fetchAlbumAndUpdateUrl = () => {
    console.log('TODO: grab fetchAlbumAndUpdateUrl from zustand store');
  };

  return (
    <Slideshow
      albumName={albumName}
      file={file}
      showNextPhoto={showNextPhoto}
      showPreviousPhoto={showPreviousPhoto}
      fetchAlbumAndUpdateUrl={fetchAlbumAndUpdateUrl}
    />
  );
};

export default SlideShowWithHashLocation;
