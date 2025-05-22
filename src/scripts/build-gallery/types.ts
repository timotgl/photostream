export type PhotoFile = {
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
