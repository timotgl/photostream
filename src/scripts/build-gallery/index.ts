import fs from 'fs/promises';
import path from 'path';

import env from './env';
import type {
  Album,
  AlbumDirectory,
  FileToPrepare,
  PhotoItem,
} from './types.ts';
import {
  getFileExtension,
  removeSuffix,
  convertImage,
  ensureDirectoryExists,
  extractLastPathSegment,
} from './helpers.ts';
import {
  ALBUM_DIRECTORY_FILENAME,
  ALBUM_FILENAME,
  PHOTO_WIDTHS,
} from '../../constants.ts';

export const IGNORE_FILES = new Set(['.DS_Store']);

const getFiles = async (dir: string): Promise<Array<FileToPrepare>> => {
  const files = await fs.readdir(dir, { withFileTypes: true });
  let filesToPrepare: Array<FileToPrepare> = [];

  const filteredFiles = files.filter((f) => !IGNORE_FILES.has(f.name));

  for (const file of filteredFiles) {
    const absolutePath = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      filesToPrepare = filesToPrepare.concat(await getFiles(absolutePath));
    } else {
      const ext = getFileExtension(file.name);
      const fileToPrepare: FileToPrepare = {
        name: removeSuffix(file.name, `.${ext}`),
        nameExt: file.name,
        ext: ext.toLowerCase(),
        dir: extractLastPathSegment(file.parentPath),
        pathAbs: absolutePath,
        pathRel: absolutePath.replace(env.SOURCE_DIR, ''),
      };
      filesToPrepare.push(fileToPrepare);
    }
  }
  return filesToPrepare;
};

console.log(
  `Scanning ${env.SOURCE_DIR} for files to prepare for webspace upload.`,
);
const filesToPrepare = await getFiles(env.SOURCE_DIR);

console.log(`Found ${filesToPrepare.length} files to process.`);

/**
 * TODO: this attempts to convert *every* file to JPG.
 * Check if file is actually an image (or do this filtering inside getFiles() above)
 * and if it is already a JPG, check if it needs resizing first.
 */
const processFile = async (fileToPrepare: FileToPrepare): Promise<void> => {
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

const albums: AlbumDirectory = [];
const albumsSeen = new Set<string>();
const photoItemsByAlbumName: Record<string, Array<PhotoItem>> = {};

/**
 * Loop over all files in source dir
 * if a file has the extension .tif, convert to jpg and compress it and copy it to the dest dir
 * otherwise, simply copy the file to dest dir.
 */
for (const [index, fileToPrepare] of filesToPrepare.entries()) {
  await processFile(fileToPrepare);
  if (index + 1 < filesToPrepare.length) {
    const numFilesLeft = filesToPrepare.length - index - 1;
    console.log(`${numFilesLeft} files left to process.`);
  }
}

if (!albums.length) {
  console.log(`No albums found.`);
  process.exit(0);
}

console.log(
  `Found ${albums.length} album(s). Writing "${ALBUM_DIRECTORY_FILENAME}".`,
);
try {
  const albumDirFileAbsPath = `${env.DESTINATION_DIR}/${ALBUM_DIRECTORY_FILENAME}`;
  await fs.writeFile(
    albumDirFileAbsPath,
    JSON.stringify(albums, null, 2),
    'utf8',
  );
  console.log('File written successfully.');
} catch (err) {
  console.error('Error writing file:', err);
}

for (const albumName of Object.keys(photoItemsByAlbumName)) {
  console.log(`Writing ${ALBUM_FILENAME} for album "${albumName}".`);
  try {
    const albumFileAbsPath = `${env.DESTINATION_DIR}/${albumName}/${ALBUM_FILENAME}`;
    console.log('albumFileAbsPath:', albumFileAbsPath);
    await fs.writeFile(
      albumFileAbsPath,
      JSON.stringify(photoItemsByAlbumName[albumName], null, 2),
      'utf8',
    );
    console.log('File written successfully.');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}
