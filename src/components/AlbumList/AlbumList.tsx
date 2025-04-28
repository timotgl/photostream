import { Album } from '../../types';
import { buildPhotoThumbnailUrl } from '../../utils/urls';
import GridContainer from '../GridContainer';
import ThumbnailLink from '../ThumbnailLink';
import useAlbumStore from '../../store/useAlbumStore.ts';

const hasLocation = (location: string) =>
  location && location !== 'Unbekannter Ort';
const hasDate = (date: string) => date && date !== 'Unbekanntes Datum';

const formatCaption = ({ title, location, date }: Album): string => {
  const segments = [title];
  if (hasLocation(location) || hasDate(date)) {
    segments.push(' (');
    if (hasLocation(location)) {
      segments.push(location);
    }
    if (hasDate(date)) {
      segments.push(` - ${date}`);
    }
    segments.push(')');
  }
  return segments.join('');
};

const AlbumList = () => {
  const albumNamesInOrder = useAlbumStore((state) => state.albumNamesInOrder);
  const albumsByName = useAlbumStore((state) => state.albumByName);
  return (
    <GridContainer>
      {albumNamesInOrder.map((albumName) => {
        const album = albumsByName[albumName];
        return (
          <ThumbnailLink
            key={album.name}
            href={album.name}
            imageSrc={buildPhotoThumbnailUrl(album.name, album.file)}
            title={album.title}
            caption={formatCaption(album)}
          />
        );
      })}
    </GridContainer>
  );
};

export default AlbumList;
