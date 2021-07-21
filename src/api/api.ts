import type { IPosts, IUser } from "../types/types";

import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";

const text =
  "React (иногда React.js или ReactJS) — JavaScript-библиотека[4] с открытым исходным кодом для разработки пользовательских интерфейсов. React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций[5][6][7]. React может использоваться для разработки одностраничных и мобильных приложений. Его цель — предоставить высокую скорость, простоту и масштабируемость. В качестве библиотеки для разработки пользовательских интерфейсов React часто используется с другими библиотеками, такими как MobX, Redux и GraphQL[8].";

const fakePosts: IPosts[] = new Array(3).fill(0).map((_, i) => ({
  id: `postid${i}`,
  title: `post #${i}`,
  text: text,
  headPhoto: image1,
  photoURLs: [image1, image2],
  date: '20 Июля 2021',
}));

const fakeUser = {
  id: "user1",
  username: "Самурай Нгуен",
  avatar: image2,
  role: "admin",
};

export const api = {
  getUser(): Promise<IUser> {
    return new Promise((resolve) => resolve(fakeUser));
  },
  getPosts(): Promise<IPosts[]> {
    return new Promise((resolve) => resolve(fakePosts));
  },
};
