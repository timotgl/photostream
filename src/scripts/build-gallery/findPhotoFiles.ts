import fs from 'fs/promises';
import path from 'path';

import type { PhotoFile } from './types.ts';
import {
  extractLastPathSegment,
  getFileExtension,
  removeSuffix,
} from './helpers.ts';
import { Dirent } from 'node:fs';

/**
 * TODO: document
 */
const findPhotoFiles = async (
  albums: Array<Dirent>,
  sourceDir: string,
): Promise<Array<PhotoFile>> => {
  const photoFiles = [];

  for (const album of albums) {
    const albumDirAbsPath = path.resolve(sourceDir, album.name);
    const albumDirEntries = await fs.readdir(albumDirAbsPath, {
      withFileTypes: true,
    });
    const photosInsideAlbum = albumDirEntries.filter((file) => file.isFile());
    for (const photoInsideAlbum of photosInsideAlbum) {
      const ext = getFileExtension(photoInsideAlbum.name).toLowerCase();
      if (!IMAGE_FILE_EXTENSIONS.has(ext)) {
        continue;
      }
      const photoFile: PhotoFile = {
        name: removeSuffix(photoInsideAlbum.name, `.${ext}`),
        nameExt: photoInsideAlbum.name,
        ext,
        dir: extractLastPathSegment(photoInsideAlbum.parentPath),
        pathAbs: albumDirAbsPath,
        pathRel: albumDirAbsPath.replace(sourceDir, ''),
      };
      photoFiles.push(photoFile);
    }
  }

  return photoFiles;
};

export default findPhotoFiles;
