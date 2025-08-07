# Photostream

![Screenshot of app](public/screenshot.png 'Screenshot of app')

A photo gallery JavaScript single page app built with React and Typescript. Live demo available at [https://timotaglieber.de/photos](https://timotaglieber.de/photos).

## Prerequisites

 1. [Node.js](https://nodejs.org/) 23+
 2. [ GraphicsMagick](http://www.graphicsmagick.org/) if you want to use the `build-gallery` script. GraphicsMagick can be installed via `brew install graphicsmagick` if you're on macOS and use [Homebrew](https://brew.sh/).

## Install dependencies

```
npm install
```

## Configure gallery

Create a copy of the file `.env.example` and name it `.env`. Edit it and insert correct values for all env vars. The first two are used by the `build-gallery` script, `VITE_PUBLIC_URL` is relevant for the single page app.

 1. `SOURCE_DIR`: Source directory containing all albums of the gallery as subdirectories.
 1. `DESTINATION_DIR`: Destination directory where album metadata and compressed images will be created. *Warning*: This directory is assumed to be empty. If not, its contents could be overwritten.
 1. `VITE_PUBLIC_URL`: Relative URL segment that is appended to the hostname. Entry point to view the list of albums.
    * Example: If this app is hosted on `example.com`, and `VITE_PUBLIC_URL` is `"/photos"`, this app is expected under
`http(s)://example.com/photos`. Use an empty string (`""`) here to expect the app under `http(s)://example.com/` without any additional path. 

## npm Scripts

### For development

 1. `npm start` launches the React app with vite dev server locally
 1. `npm run lint` lints the codebase with [biome](https://biomejs.dev/).
 1. `npm run check` lints, formats, and auto-fixes minor issues in the codebase with [biome](https://biomejs.dev/).
 1. `npm run types` check codebase for typescript errors. 

### To build and deploy

 1. `npm run build:gallery` invokes a script that creates an image gallery with metadata. This gallery is the basis for the React app.
 1. `npm run build:app` builds the React app (including the image gallery) for deployment to your web host.
 1. `npm run preview` locally serves the app build.

## Automatic image gallery creation

The `build-gallery` script automatically processes a directory structure of photos to create a web-ready gallery. It scans the source directory for album subdirectories, processes all images within each album, and generates the necessary metadata files and optimized images for the React app.

The script converts and resizes images to multiple sizes using GraphicsMagick, supporting a subset of common [image formats that GraphicsMagick can read](http://www.graphicsmagick.org/formats.html) (TIFF, BMP, JPEG, PNG, WebP, HEIC). All images are converted to JPEG with compression for optimal web delivery. For each album, it creates an `album.json` metadata file containing photo information, and generates an `albums.json` file listing all available albums.

Run the script with `npm run build:gallery` after configuring the environment variables as described in the "Configure gallery" section. The source directory should contain subdirectories (one per album) with your original photos, and the destination directory will be populated with the processed gallery structure ready for deployment.

## Manual image gallery creation

If you're not using the `build-gallery` script, the following steps set up everything manually.

1. Create an `albums` directory inside the `./public` folder.
1. For each album you'd like to host, create a directory inside `./public/albums`, for example `./public/albums/album1`.
1. Create `./public/albums.json` to list all your albums:
   ```
   [
     {
       "name": "album1",
       "title": "My First Album",
       "location": "New York",
       "date": "January 2024",
       "file": "thumbnail-image.jpg"
     },
     {
       "name": "album2", 
       "title": "My Second Album",
       "location": "Paris",
       "date": "March 2024",
       "file": "another-thumbnail.jpg"
     }
   ]
   ```
   - `name`: Must match the album directory name
   - `title`: Display name for the album
   - `location`: Where the photos were taken (optional)
   - `date`: When the photos were taken (optional)
   - `file`: Filename of the image to use as album thumbnail
1. Create a .json file listing the album content: `./public/albums/album1/album.json`.
1. List your photos in `album.json` by using the following structure:
   ```
   [
     {
       "file": "file-name-of-first-photo.jpg",
       "title": "Title of first photo",
       "location": "Location where first photo was taken",
       "date": "Month Year",
       "caption": "Optional caption, one line rendered below location and date"
     },
     {
       "file": "file-name-of-second-photo.jpg",
       "title": "Title of second photo",
       "location": "Location where second photo was taken",
       "date": "Month Year",
       "caption": "Optional caption, one line rendered below location and date"
     }
   ]
   ```
   - The first element of the array is the first photo that is shown in the app (the counter in the upper right corner will show `1/X`).
1. Create directories for the three supported maximum image widths in `./public/albums/album1`:
   1. `./public/albums/album1/480` (for thumbnails)
   1. `./public/albums/album1/1920` and
   1. `./public/albums/album1/3840`
1. `480`, `1920` and `3840` are expected to contain the same number of files and the same file names, but each has the images scaled down:
   1. Every image in `./public/albums/album1/480` has a maximum width of 480 pixels (used for thumbnails).
   1. Every image in `./public/albums/album1/1920` has a maximum width of 1920 pixels.
   1. Every image in `./public/albums/album1/3840` has a maximum width of 3840 pixels.
   1. The file names must match the `file` property from `album.json`.
   1. Image height is not considered, since I'm assuming that most photos of an album will have "landscape" aspect ratio. This is of course a simplification and might not apply to your case.
   1. There is no restriction on image file types/extension, anything your target browser supports works.
1. Following the given examples, the final directory content should be:

   ```
   public
       albums
           album1
               album.json
               480
                   file-name-of-first-photo.jpg
                   file-name-of-second-photo.jpg
               1920
                   file-name-of-first-photo.jpg
                   file-name-of-second-photo.jpg
               3840
                   file-name-of-first-photo.jpg
                   file-name-of-second-photo.jpg
   ```

## Build and deploy

1. Create a production bundle with `npm run build` and deploy the entire content of `./build` to your web host. Note that your photos from `./public/albums` are *copied* into the `./build` directory.
1. The app path is configured via the `VITE_PUBLIC_URL` environment variable as described in the "Configure gallery" section.


## Using the React app

1. Loading `http[s]://yourdomaingoeshere.com/photos` shows an album overview page with thumbnail links to all available albums.
1. Clicking on an album thumbnail takes you to that album's page, which displays thumbnails of all photos in the album.
1. Clicking on a photo thumbnail opens the slideshow view for that specific photo.
1. In the slideshow view, you can use a number of ways to cycle through the photos:
    * Arrow keys
    * Mouse wheel
    * Clicking or tapping in the left or right half of the page
    * Swiping left or right with touch gestures (swipe navigation is paused when pinch-to-zoom is detected)
1. The album will update the hash URL if you cycle to another photo. Examples:
    * `http[s]://yourdomaingoeshere.com/photos/#album1/file-name-of-first-photo.jpg`
    * `http[s]://yourdomaingoeshere.com/photos/#album1/file-name-of-second-photo.jpg`
    * This allows sharing the URL to a specific photo
1. The app will load the `1920` or `3840` version of a photo depending on `window.screen.width` and `window.devicePixelRatio`. The `480` version is always used for thumbnails. It's not the most sophisticated mechanism, but will at least ensure that small mobile screens will only load the HD version and not 4k.

