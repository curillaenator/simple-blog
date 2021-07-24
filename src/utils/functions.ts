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

export const timestampToDate = (date: string | number) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const d = new Date(+date);
  //@ts-ignore
  return d.toLocaleString("ru-RU", options);
};

export const loaderTitleGenerator = () => {
  const titles = [
    "Думаю...",
    "Вычисляю...",
    "Сервер томозит...",
    "Кручу крутилку...",
    "Расчитываю траекторию до марса...",
    'Еще секундочку...'
  ];

  const randomize = Math.floor(Math.random() * titles.length)

  return titles[randomize]
};
