interface Config {
  // Relative URL segment that is appended to the hostname. Entry point to view the list of albums.
  // Example: If this app is hosted on example.com, and PUBLIC_URL is "/photos", this app is expected under
  // http(s)://example.com/photos
  PUBLIC_URL: string;

  // Name of the json file listing all available albums
  ALBUM_DIRECTORY_FILENAME: string;

  // Relative URL of the directory containing photo albums, each in different widths
  ALBUM_ROOT: string;

  // Name of the json file listing all photos in an album
  ALBUM_FILENAME: string;

  // Name of the default album to be shown when the ALBUM_ROOT URL is used
  ALBUM_DEFAULT_NAME: string;

  // Animation duration to show and hide elements (navigation help, counter, etc.)
  FADE_IN_DURATION: number;

  // Photo width to be used based on screen's pixel density
  PHOTO_WIDTH: number;
}

const PHOTO_WIDTH_HD = 1920;
const PHOTO_WIDTH_4K = 3840;

const config: Config = {
  PUBLIC_URL: '/photos',
  ALBUM_DIRECTORY_FILENAME: 'albums.json',
  ALBUM_ROOT: 'albums',
  ALBUM_FILENAME: 'album.json',
  ALBUM_DEFAULT_NAME: 'highlights',
  FADE_IN_DURATION: 3000,
  PHOTO_WIDTH: window.screen.width * window.devicePixelRatio >= PHOTO_WIDTH_HD ? PHOTO_WIDTH_4K : PHOTO_WIDTH_HD,
};

export default config;
