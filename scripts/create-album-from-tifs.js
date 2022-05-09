const fs = require('fs');
const parseArgs = require('minimist');
const graphicsMagick = require('gm');

const ALBUM_FILE_NAME = 'album.json';
const IMAGE_WIDTHS = [1920, 3840];

const args = parseArgs(process.argv.slice(2));
const { source, target, date, location } = args;

const createAlbumEntry = (fileName) => ({
  file: fileName,
  title: fileName.split('.')[0],
  location,
  date,
});

let fileCounter = 0;
let gmFile;
let resizedFileName;
let targetResized;
let makeCallback;
const albumEntries = [];

fs.readdir(source, (err, files) => {
  if (err) {
    throw err;
  }

  const tifFiles = files.filter((file) => /\.[tT][iI][fF][fF]?$/.test(file));

  tifFiles.forEach((file) => {
    resizedFileName = `${file}.jpg`;
    albumEntries.push(createAlbumEntry(resizedFileName));
    gmFile = graphicsMagick(`${source}/${file}`);
    IMAGE_WIDTHS.forEach((imageWidth) => {
      targetResized = `${target}/${imageWidth}/${resizedFileName}`;

      makeCallback = (path) => (err) => {
        if (err) {
          console.log(err);
        }
        fileCounter += 1;
        console.log(path, `${fileCounter}/${tifFiles.length * IMAGE_WIDTHS.length}`);
      };

      gmFile.resizeExact(imageWidth).quality(90).write(targetResized, makeCallback(targetResized));
    });
  });

  fs.writeFile(`${target}/${ALBUM_FILE_NAME}`, JSON.stringify(albumEntries), (err) => {
    if (err) {
      console.error(err);
    }
  });
});
