import firebase from "firebase/app";
import { auth, db } from "./firebase";

import type { IPosts, IUser } from "../types/types";

import image1 from "../assets/images/image1.jpg";
// import image2 from "../assets/images/image2.jpg";

const text =
  "React (иногда React.js или ReactJS) — JavaScript-библиотека[4] с открытым исходным кодом для разработки пользовательских интерфейсов. React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций[5][6][7]. React может использоваться для разработки одностраничных и мобильных приложений. Его цель — предоставить высокую скорость, простоту и масштабируемость. В качестве библиотеки для разработки пользовательских интерфейсов React часто используется с другими библиотеками, такими как MobX, Redux и GraphQL[8].";

const fakePosts: IPosts[] = new Array(3).fill(0).map((_, i) => ({
  id: `postid${i}`,
  title: `post #${i}`,
  text: text,
  headPhoto: image1,
  date: "20 Июля 2021",
}));

// FIREBASE API

export const api = {
  getPosts(): Promise<IPosts[]> {
    return new Promise((resolve) => resolve(fakePosts));
  },

  signInWithGoogle(): Promise<IUser> {
    return new Promise(async (resolve) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const user = await auth.signInWithPopup(provider).then((res) => res.user);

      const newUser = {
        id: user!.uid,
        username: user!.displayName,
        avatar: user!.photoURL,
        role: "user",
      };

      // @ts-ignore
      resolve(newUser);
    });
  },

  isUserAuthed(): Promise<IUser> {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userDB = await db.ref(`users/${user.uid}`).once("value");
          return resolve(userDB.val());
        }

        if (!user) {
          return resolve({ id: "", username: "", avatar: "", role: "guest" });
        }
      });
    });
  },

  createUserInDB(user: IUser): Promise<boolean> {
    return new Promise(async (resolve) => {
      const userDB = await db.ref(`users/${user.id}`).once("value");

      if (!userDB.exists()) {
        db.ref(`users/${user.id}`).set(user);
        return resolve(true);
      }

      return resolve(false);
    });
  },
};
