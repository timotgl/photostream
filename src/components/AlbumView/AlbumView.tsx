import css from './AlbumView.module.css';
import { buildPhotoThumbnailUrl } from '../../utils/urls';
import GridContainer from '../GridContainer';
import ThumbnailLink from '../ThumbnailLink';
import Button from '../Button';
import useAlbumStore from '../../store/useAlbumStore.ts';
import { PhotoItem } from '../../types.ts';
import useAlbumAndFileHashLocation from '../../hooks/useAlbumAndFileHashLocation.ts';
import useAlbumContent from '../../store/hooks/useAlbumContent.ts';

const hasLocation = (location: string) =>
  location && location !== 'Unbekannter Ort';
const hasDate = (date: string) => date && date !== 'Unbekanntes Datum';

const formatCaption = ({
  title,
  location,
  date,
  caption,
}: PhotoItem): string => {
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
  if (caption) {
    segments.push(` ${caption}`);
  }
  return segments.join('');
};

const AlbumView = () => {
  const { albumName: name } = useAlbumAndFileHashLocation();
  const album = useAlbumStore((state) => state.albumByName[name]);
  const content = useAlbumContent(name);

  return (
    <div className={css.Container}>
      <header className={css.Header}>
        {/* TODO: use i18n */}
        <Button href="" text="← Alle Alben" />
        {/* TODO: use i18n */}
        <h1 className={css.Title}>{album?.title || 'Lade Album...'}</h1>
      </header>
      <GridContainer>
        {content.map((photoItem) => (
          <ThumbnailLink
            key={photoItem.file}
            href={`${name}/${photoItem.file}`}
            imageSrc={buildPhotoThumbnailUrl(name, photoItem.file)}
            title={photoItem.title}
            caption={formatCaption(photoItem)}
            captionOnHoverOnly
          />
        ))}
      </GridContainer>
    </div>
  );
};

export default AlbumView;
