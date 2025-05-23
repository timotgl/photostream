import { PHOTO_WIDTHS } from '../../constants.ts';
import env from './env.ts';
import {
  convertImage,
  ensureDirectoryExists,
  removeSuffix,
} from './helpers.ts';
import type { PhotoFile } from './types.ts';
import type { PhotoItem } from '../../types.ts';
import fs from 'node:fs/promises';

/**
 * Convert and resize a given photo file. Return a PhotoItem object.
 */
const processPhotoFile = async (
  fileToPrepare: PhotoFile,
): Promise<PhotoItem> => {
  const parentDirPathRel = removeSuffix(
    fileToPrepare.pathRel,
    fileToPrepare.nameExt,
  );
  const parentDirPathAbs = `${env.DESTINATION_DIR}${parentDirPathRel}`;
  await ensureDirectoryExists(parentDirPathAbs);

  const convertedFileName = `${fileToPrepare.name}.jpg`;
  for (const photoWidth of PHOTO_WIDTHS) {
    console.log(`    ${photoWidth}`);
    const photoWidthAbsPath = `${parentDirPathAbs}/${photoWidth}`;
    await ensureDirectoryExists(photoWidthAbsPath);
    const convertedFileAbsPath = `${photoWidthAbsPath}/${convertedFileName}`;

    /*
    await convertImage(
      fileToPrepare.pathAbs,
      convertedFileAbsPath,
      photoWidth,
    );
    */

    // ----> CONTINUE HERE
    if (fileToPrepare.width > photoWidth) {
      console.log(`      Need to scale down to width ${photoWidth}`);
      if (fileToPrepare.ext === 'jpg') {
        console.log('      file is a jpg');
      } else {
        console.log('      file is not a jpg and will need conversion');
      }
    } else {
      console.log(`      No need to scale width down to ${photoWidth} `);
      if (fileToPrepare.ext === 'jpg') {
        console.log('      file is a jpg');
      } else {
        console.log('      file is not a jpg and will need conversion');
      }
    }
  }

  return {
    file: convertedFileName,
    title: fileToPrepare.nameExt,
    location: 'Unbekannter Ort',
    date: 'Unbekanntes Datum',
  };
};

export default processPhotoFile;
