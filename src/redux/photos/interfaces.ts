export interface State {
  readonly albumName: string;
  readonly currentIndex: number;
  readonly items: Array<PhotoItem>;
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
