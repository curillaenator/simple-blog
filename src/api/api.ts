import firebase from "firebase/app";
import { auth, db, storage } from "./firebase";

import { guest } from "../fixedcontent/fixedcontent";

import type { INewPost, IPosts, IUser } from "../types/types";

// FIREBASE API

export const authApi = {
  logOut(): Promise<boolean> {
    return new Promise((resolve) => {
      auth.signOut();
      resolve(true);
    });
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
          return resolve(guest);
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

export const storageApi = {
  uploadImage(path: string, image: File): Promise<string> {
    return new Promise((resolve) => {
      const imageMeta = { cacheControl: "public,max-age=7200" };

      const uploadTask = storage.ref().child(path).put(image, imageMeta);

      uploadTask.on(
        "state_changed",
        (progress) => {},
        (error) => resolve("error"),
        () => resolve("success")
      );
    });
  },

  getImage(path: string): Promise<string> {
    return new Promise(async (resolve) => {
      const url: string = await storage.ref().child(path).getDownloadURL();
      resolve(url);
    });
  },
};

export const postsApi = {
  createNewPost(userID: string, payload: INewPost): Promise<IPosts | null> {
    return new Promise((resolve) => {
      const postID = db.ref("posts").push().key;
      //@ts-ignore
      const image = payload.headPhoto;
      //@ts-ignore
      const path = `${userID}/posts/${postID}/images/head/${payload.headPhoto.name}`;

      const newPost: IPosts = {
        //@ts-ignore
        id: postID,
        title: payload.title,
        text: payload.text,
        headPhoto: path,
        date: `${Date.now()}`,
      };

      // UPLOAD IMAGE TO STORAGE
      //@ts-ignore
      const imagePromise = storageApi.uploadImage(path, image);

      // CREATE POST IN DB
      const postPromise: Promise<string> = new Promise((rslv) => {
        const onUpd = (err: any) => (err ? rslv("error") : rslv("success"));

        db.ref(`posts/${postID}`).update(newPost, onUpd);
      });

      // RESOLVE NEW POST FOR STATE UPDATE
      Promise.all([imagePromise, postPromise]).then((result: string[]) => {
        result.includes("error") ? resolve(null) : resolve(newPost);
      });
    });
  },

  getPosts(): Promise<IPosts[]> {
    return new Promise(async (resolve) => {
      const postsSnap = await db.ref("posts").once("value");

      //@ts-ignore
      const postsArray: IPosts[] = Object.values(postsSnap.val()).reverse();

      const postsPromises = postsArray.map(async (post: IPosts) => ({
        ...post,
        headPhoto: await storageApi.getImage(post.headPhoto),
      }));

      Promise.all(postsPromises).then((posts) => resolve(posts));
    });
  },
};
