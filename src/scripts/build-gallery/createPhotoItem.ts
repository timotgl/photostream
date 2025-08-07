import fs from 'node:fs/promises';
import { PHOTO_WIDTHS } from '../../constants.ts';
import type { PhotoItem } from '../../types.ts';
import env from './env.ts';
import {
  convertImage,
  ensureDirectoryExists,
  removeSuffix,
} from './helpers.ts';
import type { PhotoFile } from './types.ts';

/**
 * Convert and resize a given photo file. Return a PhotoItem object.
 * Only resize if the width of the original file is larger than the target width.
 * If the file is already a JPG and smaller than the target width, it will be
 * copied directly.
 */
const createPhotoItem = async (
  fileToPrepare: PhotoFile,
): Promise<PhotoItem> => {
  const parentDirPathRel = removeSuffix(
    fileToPrepare.pathRel,
    fileToPrepare.nameExt,
  );
  const parentDirPathAbs = `${env.DESTINATION_DIR}${parentDirPathRel}`;
  await ensureDirectoryExists(parentDirPathAbs);

  const convertedFileName = `${fileToPrepare.name}.jpg`;
  for (const targetWidth of PHOTO_WIDTHS) {
    const photoWidthAbsPath = `${parentDirPathAbs}${targetWidth}`;
    await ensureDirectoryExists(photoWidthAbsPath);
    const targetFileAbsPath = `${photoWidthAbsPath}/${convertedFileName}`;

    if (fileToPrepare.width > targetWidth) {
      await convertImage(fileToPrepare.pathAbs, targetFileAbsPath, targetWidth);
    } else {
      if (fileToPrepare.ext === 'jpg') {
        await fs.copyFile(fileToPrepare.pathAbs, targetFileAbsPath);
      } else {
        await convertImage(fileToPrepare.pathAbs, targetFileAbsPath);
      }

      break; // no need to handle larger widths
    }
  }

  return {
    file: convertedFileName,
    title: fileToPrepare.nameExt,
    location: 'Unknown Location',
    date: 'Unknown Date',
    width: fileToPrepare.width,
  };
};

export default createPhotoItem;
