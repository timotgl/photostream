import { useTranslation } from 'react-i18next';

import useAlbumAndFileHashLocation from '../../hooks/useAlbumAndFileHashLocation.ts';
import useAlbumContent from '../../store/hooks/useAlbumContent.ts';
import useAlbumStore from '../../store/useAlbumStore.ts';
import type { PhotoItem } from '../../types.ts';
import { buildPhotoThumbnailUrl } from '../../utils/urls';
import Button from '../Button';
import GridContainer from '../GridContainer';
import ThumbnailLink from '../ThumbnailLink';
import css from './AlbumView.module.css';

const hasLocation = (location: string, t: (key: string) => string) =>
  location && location !== t('PhotoData.unknownLocation');
const hasDate = (date: string, t: (key: string) => string) =>
  date && date !== t('PhotoData.unknownDate');

const formatCaption = (
  { title, location, date, caption }: PhotoItem,
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
  if (caption) {
    segments.push(` ${caption}`);
  }
  return segments.join('');
};

const AlbumView = () => {
  const { t } = useTranslation();
  const { albumName: name } = useAlbumAndFileHashLocation();
  const album = useAlbumStore((state) => state.albumByName[name]);
  const content = useAlbumContent(name);

  return (
    <div>
      <header className={css.Header}>
        <Button href="" text={t('AlbumView.allAlbums')} />
        <h1 className={css.Title}>
          {album?.title || t('AlbumView.loadingAlbum')}
        </h1>
      </header>
      <GridContainer>
        {content.map((photoItem) => (
          <ThumbnailLink
            key={photoItem.file}
            href={`${name}/${photoItem.file}`}
            imageSrc={buildPhotoThumbnailUrl(name, photoItem.file)}
            title={photoItem.title}
            caption={formatCaption(photoItem, t)}
            captionOnHoverOnly
          />
        ))}
      </GridContainer>
    </div>
  );
};

export default AlbumView;
