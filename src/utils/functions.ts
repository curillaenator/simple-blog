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
    "Иногда долго думаю...",
    "Калькулирую в уме...",
    "Сервер в панике, но справится...",
    "Посмотрите какая крутилка...",
    "Расчитываю траекторию до марса...",
    "Cекундочку...",
  ];

  const randomize = Math.floor(Math.random() * titles.length);

  return titles[randomize];
};

export const urlFromStringOrFile = (value: string | File | null): string => {
  return typeof value === "string" ? value : URL.createObjectURL(value);
};
