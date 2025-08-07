import { useTranslation } from 'react-i18next';

import useAlbumStore from '../../store/useAlbumStore.ts';
import type { Album } from '../../types';
import { buildPhotoThumbnailUrl } from '../../utils/urls';
import GridContainer from '../GridContainer';
import ThumbnailLink from '../ThumbnailLink';

const hasLocation = (location: string, t: (key: string) => string) =>
  location && location !== t('PhotoData.unknownLocation');
const hasDate = (date: string, t: (key: string) => string) =>
  date && date !== t('PhotoData.unknownDate');

const formatCaption = (
  { title, location, date }: Album,
  t: (key: string) => string,
): string => {
  const segments = [title];
  if (hasLocation(location, t) || hasDate(date, t)) {
    segments.push(' (');
    if (hasLocation(location, t)) {
      segments.push(location);
    }
    if (hasDate(date, t)) {
      segments.push(` - ${date}`);
    }
    segments.push(')');
  }
  return segments.join('');
};

const AlbumList = () => {
  const { t } = useTranslation();
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
            caption={formatCaption(album, t)}
          />
        );
      })}
    </GridContainer>
  );
};

export default AlbumList;
