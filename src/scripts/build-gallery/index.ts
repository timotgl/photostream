import fs from 'node:fs/promises';

import path from 'node:path';
import { ALBUM_DIRECTORY_FILENAME, ALBUM_FILENAME } from '../../constants.ts';
import type { Album, AlbumContent } from '../../types.ts';
import env from './env';
import {
  getFileExtension,
  getFilenameWithoutExtension,
  identifyImageDimensions,
  isImageFile,
} from './helpers.ts';
import type { PhotoFile } from './types.ts';
import processPhotoFile from './processPhotoFile.ts';

console.log(`Scanning for photo albums in\n${env.SOURCE_DIR}`);
const sourceDirEntries = await fs.readdir(env.SOURCE_DIR, {
  withFileTypes: true,
});
const albumDirEntries = sourceDirEntries.filter((file) => file.isDirectory());
console.log(`Found ${albumDirEntries.length} albums.`);

const albumNamesInOrder = albumDirEntries.map((entry) => entry.name);
const albumByName: Record<string, Album> = {};
const albumContentByAlbumName: Record<string, AlbumContent> = {};

for (const [albumIndex, albumDirEntry] of albumDirEntries.entries()) {
  console.log(
    `Preparing album "${albumDirEntry.name}" ` +
      `(${albumIndex + 1}/${albumDirEntries.length})`,
  );
  const { name: albumName } = albumDirEntry;
  albumByName[albumName] = {
    name: albumName,
    title: albumName,
    location: 'Unbekannter Ort',
    date: 'Unbekanntes Datum',
    file: '',
  };

  const albumDirAbsPath = path.resolve(env.SOURCE_DIR, albumName);
  const albumContent = (
    await fs.readdir(albumDirAbsPath, {
      withFileTypes: true,
    })
  ).filter((dirEntry) => isImageFile(dirEntry));

  for (const [photoIndex, photoDirEntry] of albumContent.entries()) {
    const photoAbsPath = `${photoDirEntry.parentPath}/${photoDirEntry.name}`;
    const { width, height } = await identifyImageDimensions(photoAbsPath);

    console.log(
      `  Preparing photo "${photoDirEntry.name}" ` +
        `in ${width}x${height} ` +
        `(${photoIndex + 1}/${albumContent.length})"`,
    );

    const photoFile: PhotoFile = {
      nameExt: photoDirEntry.name,
      name: getFilenameWithoutExtension(photoDirEntry.name),
      ext: getFileExtension(photoDirEntry.name).toLowerCase(),
      dir: photoDirEntry.parentPath,
      pathAbs: photoAbsPath,
      pathRel: photoAbsPath.replace(env.SOURCE_DIR, ''),
      width,
    };

    const photoItem = await processPhotoFile(photoFile);
    console.log('    photoItem:', JSON.stringify(photoItem));
  }
}

console.log(`Writing album directory to "${ALBUM_DIRECTORY_FILENAME}".`);
try {
  const albumDirFileAbsPath = `${env.DESTINATION_DIR}/${ALBUM_DIRECTORY_FILENAME}`;
  const albums = albumNamesInOrder.map((albumName) => albumByName[albumName]);
  await fs.writeFile(
    albumDirFileAbsPath,
    JSON.stringify(albums, null, 2),
    'utf8',
  );
  console.log('File written successfully.');
} catch (err) {
  console.error('Error writing file:', err);
}

process.exit(0);

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
