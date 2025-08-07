import fs from 'node:fs/promises';

import path from 'node:path';
import { ALBUM_DIRECTORY_FILENAME, ALBUM_FILENAME } from '../../constants.ts';
import type { Album, AlbumContent } from '../../types.ts';
import createPhotoItem from './createPhotoItem.ts';
import env from './env';
import {
  getFileExtension,
  getFilenameWithoutExtension,
  identifyImageDimensions,
  isImageFile,
} from './helpers.ts';
import type { PhotoFile } from './types.ts';

console.log(`Scanning for photo albums in\n${env.SOURCE_DIR}`);
const sourceDirEntries = await fs.readdir(env.SOURCE_DIR, {
  withFileTypes: true,
});
const albumDirEntries = sourceDirEntries.filter((file) => file.isDirectory());
console.log(`Found ${albumDirEntries.length} albums.`);

const albumNamesInOrder = albumDirEntries.map((entry) => entry.name);
const albumByName: Record<string, Album> = {};

for (const [albumIndex, albumDirEntry] of albumDirEntries.entries()) {
  console.log(
    `Preparing album "${albumDirEntry.name}" ` +
      `(${albumIndex + 1}/${albumDirEntries.length})`,
  );
  const { name: albumName } = albumDirEntry;
  albumByName[albumName] = {
    name: albumName,
    title: albumName,
    location: 'Unknown Location',
    date: 'Unknown Date',
    file: '',
  };

  const albumDirAbsPath = path.resolve(env.SOURCE_DIR, albumName);
  const albumDirContent = (
    await fs.readdir(albumDirAbsPath, {
      withFileTypes: true,
    })
  ).filter((dirEntry) => isImageFile(dirEntry));

  const albumContent: AlbumContent = [];
  for (const [photoIndex, photoDirEntry] of albumDirContent.entries()) {
    const photoAbsPath = `${photoDirEntry.parentPath}/${photoDirEntry.name}`;
    const { width, height } = await identifyImageDimensions(photoAbsPath);

    console.log(
      `  Preparing photo "${photoDirEntry.name}" ` +
        `in ${width}x${height} ` +
        `(${photoIndex + 1}/${albumDirContent.length})"`,
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

    const photoItem = await createPhotoItem(photoFile);
    albumContent.push(photoItem);

    if (photoIndex === 0) {
      // Use the album's first image as thumbnail for the album overview.
      albumByName[albumName].file = photoItem.file;
    }
  }

  console.log(`Writing ${ALBUM_FILENAME} for album "${albumName}".`);
  try {
    const albumFileAbsPath = `${env.DESTINATION_DIR}/${albumName}/${ALBUM_FILENAME}`;
    await fs.writeFile(
      albumFileAbsPath,
      JSON.stringify(albumContent, null, 2),
      'utf8',
    );
    console.log('File written successfully.');
  } catch (err) {
    console.error('Error writing file:', err);
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
