import {
  ALBUM_DIRECTORY_FILENAME,
  ALBUM_FILENAME,
  PHOTO_WIDTH_4K,
  PHOTO_WIDTH_HD,
} from './constants';

type Config = {
  // Relative URL segment that is appended to the hostname. Entry point to view the list of albums.
  // Example: If this app is hosted on example.com, and VITE_PUBLIC_URL is "/photos", this app is expected under
  // http(s)://example.com/photos
  // Use an empty string here to expect the app under http(s)://example.com/ without any additional path.
  VITE_PUBLIC_URL: string;

  // Locale for the application (en-US, de-DE)
  LOCALE: string;

  // Relative URL of the directory containing photo albums, each in different widths
  ALBUM_ROOT: string;

  // Name of the json file listing all available albums
  ALBUM_DIRECTORY_FILENAME: string;

  // Name of the json file listing all photos in an album
  ALBUM_FILENAME: string;

  // Name of the default album to be shown when the ALBUM_ROOT URL is used
  ALBUM_DEFAULT_NAME: string;

  // Animation duration to show and hide elements (navigation help, counter, etc.)
  FADE_IN_DURATION: number;

  // Photo width to be used based on screen's pixel density
  PHOTO_WIDTH: number;

  // Relative URL to the album directory file
  ALBUM_DIRECTORY_URL: string;
};

const config: Config = {
  VITE_PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL,
  LOCALE: import.meta.env.VITE_LOCALE,
  ALBUM_ROOT: 'albums',
  ALBUM_DIRECTORY_FILENAME,
  ALBUM_FILENAME,
  ALBUM_DEFAULT_NAME: 'highlights',
  FADE_IN_DURATION: 0, // 3000
  PHOTO_WIDTH:
    window.screen.width * window.devicePixelRatio >= PHOTO_WIDTH_HD
      ? PHOTO_WIDTH_4K
      : PHOTO_WIDTH_HD,
  ALBUM_DIRECTORY_URL: '',
};

config.ALBUM_DIRECTORY_URL = `${config.VITE_PUBLIC_URL}/${config.ALBUM_ROOT}/${config.ALBUM_DIRECTORY_FILENAME}`;

export default config;
