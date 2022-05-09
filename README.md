# Photostream

![Screenshot of app](public/screenshot.png 'Screenshot of app')

A photo gallery JavaScript single page app built with React, Redux, and Typescript. Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Hosted at https://timotaglieber.de/photos.

## Installation

First download and install GraphicsMagick or ImageMagick. In Mac OS X, you can simply use Homebrew and do:

```
brew install imagemagick
brew install graphicsmagick
npm install
```

## Usage

1. Create an `albums` directory in `./public`
2. For each album you'd like to host, create a directory inside `./public/albums`, for example `./public/albums/album1`.
3. Create a .json file listing the album content: `./public/albums/album1/album.json`.
4. List your photos in `album.json` by using the following structure:
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
5. Create directories for the two supported maximum image widths in `./public/albums/album1`:
   1. `./public/albums/album1/1920` and
   2. `./public/albums/album1/3840`
6. `1920` and `3840` are expected to contain the same number of files and the same file names, but each has the images scaled down:
   1. Every image in `./public/albums/album1/1920` has a maximum width of 1920 pixels.
   2. Every image in `./public/albums/album1/3840` has a maximum width of 3840 pixels.
   3. The file names must match the `file` property from `album.json`.
   4. Image height is not considered, since I'm assuming that most photos of an album will have "landscape" aspect ratio. This is of course a simplification and might not apply to your case.
   5. There is no restriction on image file types/extension, anything your target browser supports works.
7. Following the given examples, the final directory content should be:

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

8. Create a production bundle with `npm run build` and deploy the entire content of `./build` to your web host. Note that your photos from `./public/albums` are *copied* into the `./build` directory.
9. The default path for the app is `yourdomaingoeshere.com/photos`, this can be configured in `package.json` (`homepage` property).
10. Loading `http[s]://yourdomaingoeshere.com/photos` will jump into the default album configured in `./src/config.ts`.
11. Once any album is loaded, you can use a number of ways to cycle through the photos:
    * Arrow keys
    * Mouse wheel
    * Clicking or tapping in the left or right half of the page
    * Swiping left or right with touch gestures
12. The album will update the hash URL if you cycle to another photo. Examples:
    * `http[s]://yourdomaingoeshere.com/photos/#album1/file-name-of-first-photo.jpg`
    * `http[s]://yourdomaingoeshere.com/photos/#album1/file-name-of-second-photo.jpg`
    * This allows sharing the URL to a specific photo
13. The app will load the `1920` or `3840` version of a photo depending on `window.screen.width` and `window.devicePixelRatio`. It's not the most sophisticated mechanism, but will at least ensure that small mobile screens will only load the HD version and not 4k.

### Create album from a directory containing .tif files

```
npm run create-album-from-tifs -- --source=<pathToDirWithTifFilesInside> --target=<albumOutputPath> --date="<date>" --location="<location>"
```

This will read all .tif files inside the source directory and convert them to .jpg with GraphicsMagick. An `album.json` will be created automatically. The same `date` and `location` is used for each photo. The title of each photo is the file name without extensions.

Make sure that the directory `albumOutputPath` exists and that it contains the empty sub-directories `1920` and `3840`.

## Questions and answers

### Why the whole frontend stack for such a simple app?

I'm using this project as a learning playground for frontend stuff. It works better for me to have an actual use case when doing that (hosting my own photos). There used to be a 200 line vanilla JS version, but it didn't support multiple albums.

### There are so many ways to host and share images, why create yet another app that does the same?

I didn't like the UI of any photo gallery I've come across and wanted to create something that is simple, clean, and focused. Plus the combination of a learning project and an actual personal use case.
