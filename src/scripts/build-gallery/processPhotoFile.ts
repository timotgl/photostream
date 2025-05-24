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

  // ----> CONTINUE HERE
  // case 1: jpg and not bigger than current width: copy
  // case 2: jpg and bigger than current width: resize
  // case 3: not a jpg and not bigger than current width: convert
  // case 4: not a jpg and bigger than current width: convert and resize

  // [480, 1920, 3840]

  // filteToPrepare.width = jpg, 479 width
  // --> copy to 480, exit loop, higher widths not relevant

  // filteToPrepare.width = jpg, 481 width
  // --> resize to 480, copy to 1920, exit loop, higher widths not relevant

  // filteToPrepare.width = tif, 479 width
  // --> convert to jpg, copy to 480, exit loop, higher widths not relevant

  // filteToPrepare.width = tif, 481 width
  // --> convert to jpg, resize to 480, copy to 1920, exit loop, higher widths not relevant

  for (const targetWidth of PHOTO_WIDTHS) {
    console.log(`    ${targetWidth}`);
    const photoWidthAbsPath = `${parentDirPathAbs}${targetWidth}`;
    await ensureDirectoryExists(photoWidthAbsPath);
    const targetFileAbsPath = `${photoWidthAbsPath}/${convertedFileName}`;

    if (fileToPrepare.width > targetWidth) {
      console.log(`      Need to scale down to width ${targetWidth}`);
      await convertImage(fileToPrepare.pathAbs, targetFileAbsPath, targetWidth);
    } else {
      if (fileToPrepare.ext === 'jpg') {
        console.log('      file is a jpg');
        console.log(
          `      No need to scale width down to ${targetWidth}. Simply copy file.`,
        );
        await fs.copyFile(fileToPrepare.pathAbs, targetFileAbsPath);
      } else {
        console.log('      file is not a jpg and will need conversion');
        console.log(`      No need to scale width down to ${targetWidth} `);
        await convertImage(fileToPrepare.pathAbs, targetFileAbsPath);
      }

      break; // no need to handle larger widths
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
