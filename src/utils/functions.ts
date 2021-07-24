import Resizer from "react-image-file-resizer";

export const resizeImage = (file: File): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1280,
      1280,
      "WEBP",
      60,
      0,
      //@ts-ignore
      (file) => resolve(file),
      "file"
    );
  });
