import { useHashLocation } from 'wouter/use-hash-location';

/**
 * Extract the current album's name and the current photo item's filename from the hash part of the current URL.
 *
 * Example: if the URL is "https://example.com/photos/#album1/photo1.jpg", this hook will return:
 * {
 *   albumName: 'album1',
 *   file: 'photo1.jpg'
 * }
 */
const useAlbumAndFileHashLocation = () => {
  const [hash] = useHashLocation();
  const [albumName, file] = hash.slice(1).split('/');

  return {
    albumName,
    file,
  };
};

export default useAlbumAndFileHashLocation;
