export interface UploadedImage {
    name: string;
    size: number;
    url: string | ArrayBuffer | null;
    id: string;
    file:FileList;
  }
  