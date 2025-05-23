# Photostream

![Screenshot of app](public/screenshot.png 'Screenshot of app')

A photo gallery JavaScript single page app built with React and Typescript. Live demo available at [https://timotaglieber.de/photos](https://timotaglieber.de/photos).

## Prerequisites

 1. [Node.js](https://nodejs.org/) 23+
 2. [ GraphicsMagick](http://www.graphicsmagick.org/) if you want to use the `build-gallery` script. GraphicsMagick be installed via `brew install graphicsmagick` if you're on macOS and use [Homebrew](https://brew.sh/).

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

 1. `npm start` launches the vite dev server locally.
 1. `npm run build-gallery` invokes a script that creates an image gallery with metadata. This gallery is the basis for the React app.
 1. `npm run build-app` builds the React app (including the image gallery) for deployment to your web host.
 1. `npm run preview` locally serves the app build.
 1. `npm run lint` lints the codebase with [biome](https://biomejs.dev/).
 1. `npm run check` lints, formats, and auto-fixes minor issues with [biome](https://biomejs.dev/).  

## Automatic image gallery creation

Create a gallery with multiple albums from a directory containing sub-directories with images. TODO.

## Manual image gallery creation

If you're not using the `build-gallery` script, the following steps set up everything manually.

1. Create an `albums` directory inside the `./public` folder.
1. For each album you'd like to host, create a directory inside `./public/albums`, for example `./public/albums/album1`.
1. TODO explain how to create `albums.json`.
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
1. Create directories for the two supported maximum image widths in `./public/albums/album1`:
   1. `./public/albums/album1/1920` and
   1. `./public/albums/album1/3840`
1. `1920` and `3840` are expected to contain the same number of files and the same file names, but each has the images scaled down:
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
               1920
                   file-name-of-first-photo.jpg
                   file-name-of-second-photo.jpg
               3840
                   file-name-of-first-photo.jpg
                   file-name-of-second-photo.jpg
   ```

1. Create a production bundle with `npm run build` and deploy the entire content of `./build` to your web host. Note that your photos from `./public/albums` are *copied* into the `./build` directory.
1. The default path for the app is `yourdomaingoeshere.com/photos`, this can be configured in `package.json` (`homepage` property).
1. Loading `http[s]://yourdomaingoeshere.com/photos` will jump into the default album configured in `./src/config.ts`.
1. Once any album is loaded, you can use a number of ways to cycle through the photos:
    * Arrow keys
    * Mouse wheel
    * Clicking or tapping in the left or right half of the page
    * Swiping left or right with touch gestures
1. The album will update the hash URL if you cycle to another photo. Examples:
    * `http[s]://yourdomaingoeshere.com/photos/#album1/file-name-of-first-photo.jpg`
    * `http[s]://yourdomaingoeshere.com/photos/#album1/file-name-of-second-photo.jpg`
    * This allows sharing the URL to a specific photo
1. The app will load the `1920` or `3840` version of a photo depending on `window.screen.width` and `window.devicePixelRatio`. It's not the most sophisticated mechanism, but will at least ensure that small mobile screens will only load the HD version and not 4k.

