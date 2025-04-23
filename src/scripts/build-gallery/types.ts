export type FileToPrepare = {
  // The name of the file including the extension
  nameExt: string;

  // The name of the file excluding the extension
  name: string;

  // The file's extension in lowercase
  ext: string;

  // The parent directory containing the file
  dir: string;

  // Full absolute path to the file
  pathAbs: string;

  // Path to the file, relative to the source dir
  pathRel: string;
};

export type Album = {
  // Name of the directory containing the album's images and album.json.
  name: string;

  // Displayed title of the album
  title: string;

  // Optional location
  location: string;

  // Optional date
  date: string;

  // Name of an image file within the album that is used as a thumbnail in the album overview.
  file: string;
};

export type AlbumDirectory = Array<Album>;

export interface PhotoItem {
  readonly file: string;
  readonly title: string;
  readonly location: string;
  readonly date: string;
  readonly caption?: string;
}
