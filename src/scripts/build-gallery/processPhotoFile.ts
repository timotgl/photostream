import { PHOTO_WIDTHS } from '../../constants.ts';
import type { Album, AlbumDirectory, PhotoItem } from '../../types.ts';
import env from './env.ts';
import {
  convertImage,
  ensureDirectoryExists,
  removeSuffix,
} from './helpers.ts';
import type { PhotoFile } from './types.ts';

const albums: AlbumDirectory = [];
const albumsSeen = new Set<string>();
const photoItemsByAlbumName: Record<string, Array<PhotoItem>> = {};

/**
 * TODO: this attempts to convert *every* file to JPG.
 * Check if file is actually an image (or do this filtering inside getFiles() above)
 * and if it is already a JPG, check if it needs resizing first.
 */
const processPhotoFile = async (fileToPrepare: PhotoFile): Promise<void> => {
  const parentDirPathRel = removeSuffix(
    fileToPrepare.pathRel,
    fileToPrepare.nameExt,
  );
  const parentDirPathAbs = `${env.DESTINATION_DIR}${parentDirPathRel}`;
  await ensureDirectoryExists(parentDirPathAbs);

  const convertedFileName = `${fileToPrepare.name}.jpg`;
  console.log(`Converting ${fileToPrepare.pathAbs}`);
  for (const photoWidth of PHOTO_WIDTHS) {
    const photoWidthAbsPath = `${parentDirPathAbs}/${photoWidth}`;
    await ensureDirectoryExists(photoWidthAbsPath);
    const convertedFileAbsPath = `${photoWidthAbsPath}/${convertedFileName}`;
    await convertImage(fileToPrepare.pathAbs, convertedFileAbsPath, photoWidth);
  }

  // Add album to album directory if that hasn't happened yet.
  if (!albumsSeen.has(fileToPrepare.dir)) {
    const album: Album = {
      name: fileToPrepare.dir,
      title: fileToPrepare.dir,
      location: 'Unbekannter Ort',
      date: 'Unbekanntes Datum',
      file: convertedFileName,
    };
    albums.push(album);
    albumsSeen.add(album.name);
  }

  // Save photo item to list for later creation of individual album.json.
  if (!photoItemsByAlbumName[fileToPrepare.dir]) {
    photoItemsByAlbumName[fileToPrepare.dir] = [];
  }
  const photoItem: PhotoItem = {
    file: convertedFileName,
    title: fileToPrepare.nameExt,
    location: 'Unbekannter Ort',
    date: 'Unbekanntes Datum',
  };
  photoItemsByAlbumName[fileToPrepare.dir].push(photoItem);
};

export default processPhotoFile;
