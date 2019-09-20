interface Config {
  ALBUM_URL: string; // Relative URL of the json file listing all photos in the gallery
  IMAGES_URL: string; // Relative URL of the directory containing photos in different widths
  FADE_IN_DURATION: number; // Animation duration to show and hide elements (navigation help, counter, etc.)
  PHOTO_WIDTH: number; // Photo width to be used based on screen's pixel density
}

const PHOTO_WIDTH_HD = 1920;
const PHOTO_WIDTH_4K = 3840;

const config: Config = {
  ALBUM_URL: 'photos.json',
  IMAGES_URL: 'photos',
  FADE_IN_DURATION: 3000,
  PHOTO_WIDTH: window.screen.width * window.devicePixelRatio >= PHOTO_WIDTH_4K ? PHOTO_WIDTH_4K : PHOTO_WIDTH_HD,
};

export default config;
