import { icons } from "../assets/icons/icons";

export const guest = { id: "", username: "", avatar: "", role: "guest" };

export const userMenu = [
  {
    id: "menu1",
    title: "Редактировать профиль",
    icon: icons.pencil,
    handler: () => {},
  },
  {
    id: "menu2",
    title: "Открыть мой чат",
    icon: icons.chat,
    handler: () => {},
  },
  {
    id: "menu3",
    title: "Выйти из аккаунта",
    icon: icons.logout,
    handler: () => {},
  },
];
