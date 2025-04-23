import { spawn } from 'child_process';
import fs from 'fs/promises';

export const getFileExtension = (fileName: string): string => {
  // Find the last occurrence of a dot (.)
  const lastDotIndex = fileName.lastIndexOf('.');

  // No dot found, or the dot is at the start (hidden files) or end (invalid case)
  if (lastDotIndex <= 0 || lastDotIndex === fileName.length - 1) {
    return '';
  }

  // Return the extension (everything after the last dot)
  return fileName.slice(lastDotIndex + 1);
};

export const removeSuffix = (str: string, suffix: string) =>
  str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;

export const convertImage = (input: string, output: string, width: number): Promise<string> =>
  new Promise((resolve, reject) => {
    const args = [
      'convert',
      input,
      '-resize',
      width.toString(),
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

export const ensureDirectoryExists = async (dirPath: string): Promise<void> => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error(`Error creating directory: ${(err as Error).message}`);
  }
};

export const extractLastPathSegment = (path: string): string => {
  const segments = path.split('/');
  if (!segments.length) {
    return '';
  }
  return segments[segments.length - 1];
};
