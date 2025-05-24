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

export type PhotoItem = {
  file: string;
  title: string;
  location: string;
  date: string;
  caption?: string;
  width: number;
};

export type AlbumContent = Array<PhotoItem>;

export type AlbumWithContent = Album & {
  content: AlbumContent;
};
