import dotenv from 'dotenv';

dotenv.config();

const ENV_VARS = ['SOURCE_DIR', 'DESTINATION_DIR'];

const env: Record<string, string> = {};

for (const envVar of ENV_VARS) {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable "${envVar}" is missing.`);
  }
  const value = process.env[envVar];
  if (!value.length) {
    throw new Error(`Environment variable "${envVar}" is an empty string.`);
  }
  env[envVar] = value;
}

type Env = {
  /**
   * Source directory containing all albums of the gallery as subdirectories.
   */
  SOURCE_DIR: string;

  /**
   * Destination directory where album metadata and compressed images will be
   * created.
   *
   * WARNING: This directory is assumed to be empty. If not, its contents could
   * be overwritten.
   */
  DESTINATION_DIR: string;

  /**
   * Relative URL segment that is appended to the hostname. Entry point to view
   * the list of albums.
   *
   * Example: If this app is hosted on example.com, and VITE_PUBLIC_URL is
   * "/photos", this app is expected under http(s)://example.com/photos
   * Use an empty string here to expect the app under http(s)://example.com/
   * without any additional path.
   */
  VITE_PUBLIC_URL: string;
};

export default env as Env;
