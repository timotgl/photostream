export interface State {
  readonly currentIndex: number;
  items: Array<PhotoItem>;
}

export interface PhotoItem {
  readonly file: string;
  readonly title: string;
  readonly location: string;
  readonly date: string;
  readonly caption?: string;
}

export const isPhotoItem = (item: PhotoItem): item is PhotoItem => {
  return (item as PhotoItem).file !== undefined;
};
