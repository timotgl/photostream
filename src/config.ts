interface Config {
  ALBUM_ROOT: string; // Relative URL of the directory containing photo albums, each in different widths
  ALBUM_FILENAME: string; // Name of the json file listing all photos in an album
  ALBUM_DEFAULT_NAME: string; // Name of the default album to be shown when the ALBUM_ROOT URL is used
  FADE_IN_DURATION: number; // Animation duration to show and hide elements (navigation help, counter, etc.)
  PHOTO_WIDTH: number; // Photo width to be used based on screen's pixel density
}

const PHOTO_WIDTH_HD = 1920;
const PHOTO_WIDTH_4K = 3840;

const config: Config = {
  ALBUM_ROOT: 'albums',
  ALBUM_FILENAME: 'album.json',
  ALBUM_DEFAULT_NAME: 'highlights',
  FADE_IN_DURATION: 3000,
  PHOTO_WIDTH: window.screen.width * window.devicePixelRatio >= PHOTO_WIDTH_4K ? PHOTO_WIDTH_4K : PHOTO_WIDTH_HD,
};

export default config;
