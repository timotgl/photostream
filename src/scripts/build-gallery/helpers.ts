import { spawn } from 'node:child_process';
import type { Dirent } from 'node:fs';
import fs from 'node:fs/promises';
import type { ImageDimensions } from './types.ts';

export const IMAGE_FILE_EXTENSIONS = new Set<string>([
  'tif',
  'tiff',
  'bmp',
  'jpg',
  'jpeg',
  'png',
  'webp',
  'heic',
  'heif',
]);

export const isImageFile = (dirEnt: Dirent): boolean => {
  if (!dirEnt.isFile()) {
    return false;
  }
  const fileExtension = getFileExtension(dirEnt.name).toLowerCase();
  return IMAGE_FILE_EXTENSIONS.has(fileExtension);
};

export const getFileExtension = (fileName: string): string => {
  // Find the last occurrence of a dot (.)
  const lastDotIndex = fileName.lastIndexOf('.');

  // No dot found, or the dot is at the start (hidden files) or end
  // (invalid case)
  if (lastDotIndex <= 0 || lastDotIndex === fileName.length - 1) {
    return '';
  }

  // Return the extension (everything after the last dot)
  return fileName.slice(lastDotIndex + 1);
};

export const getFilenameWithoutExtension = (fileName: string): string => {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return fileName;
  }
  return fileName.slice(0, lastDotIndex);
};

export const removeSuffix = (str: string, suffix: string) =>
  str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;

/**
 * Convert and resize an image using GraphicsMagick.
 */
export const convertImage = (
  input: string,
  output: string,
  width?: number,
): Promise<string> =>
  new Promise((resolve, reject) => {
    const resizeArgs = width ? ['-resize', width.toString()] : [];
    const args = [
      'convert',
      input,
      ...resizeArgs,
      '-quality',
      '90',
      '-auto-orient',
      output,
    ];
    const gmProcess = spawn('gm', args);

    gmProcess.stdout.on('data', (data) => {
      console.log(`Output: ${data}`);
    });

    gmProcess.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
    });

    gmProcess.on('close', (code) => {
      if (code === 0) {
        resolve(`Image converted: ${output}`);
      } else {
        reject(new Error(`GraphicsMagick process exited with code ${code}`));
      }
    });

    gmProcess.on('error', (error) => {
      reject(error);
    });
  });

/**
 * Extract width and height as numbers from a string like "3840x2160".
 */
const parseDimensionsOutput = (output: string): ImageDimensions => {
  const dimensions = output.trim().split('x');
  if (dimensions.length !== 2) {
    throw new Error(`Invalid dimensions output: ${output}`);
  }
  const width = Number.parseInt(dimensions[0], 10);
  const height = Number.parseInt(dimensions[1], 10);
  if (Number.isNaN(width) || Number.isNaN(height)) {
    throw new Error(`Invalid dimensions: ${output}`);
  }
  return { width, height };
};

/**
 * Identify the dimensions of an image using GraphicsMagick.
 */
export const identifyImageDimensions = (
  absImageFilePath: string,
): Promise<ImageDimensions> =>
  new Promise((resolve, reject) => {
    const args = ['identify', '-format', '%wx%h', absImageFilePath];
    const gmProcess = spawn('gm', args);

    let output = '';

    gmProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    gmProcess.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
    });

    gmProcess.on('close', (code) => {
      if (code === 0) {
        resolve(parseDimensionsOutput(output));
      } else {
        reject(new Error(`GraphicsMagick process exited with code ${code}`));
      }
    });

    gmProcess.on('error', (error) => {
      reject(error);
    });
  });

export const ensureDirectoryExists = async (dirPath: string): Promise<void> => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error(`Error creating directory: ${(err as Error).message}`);
  }
};
