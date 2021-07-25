import firebase from "firebase/app";
import { auth, db, storage } from "./firebase";

import { guest } from "../fixedcontent/fixedcontent";

import type { INewPost, IEditPost, IPosts, IUser } from "../types/types";

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

  removeImage(url: string): Promise<string> {
    return new Promise((resolve) => {
      storage
        .refFromURL(url)
        .delete()
        .then(() => {
          resolve("success");
        })
        .catch(() => resolve("error"));
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
      const postID = db.ref(`posts/${userID}`).push().key;
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
      const postPromise: Promise<string> = new Promise((res) => {
        const onUpd = (err: any) => (err ? res("error") : res("success"));

        db.ref(`posts/${userID}/${postID}`).update(newPost, onUpd);
      });

      // RESOLVE NEW POST FOR STATE UPDATE
      Promise.all([imagePromise, postPromise]).then((result: string[]) => {
        result.includes("error") ? resolve(null) : resolve(newPost);
      });
    });
  },

  removePost(userID: string, post: IPosts): Promise<string | null> {
    return new Promise(async (resolve) => {
      // remove headPhoto from storage
      const imgPromise = await storageApi.removeImage(post.headPhoto);

      // remove post from db
      const postPromise: Promise<string> = new Promise((res) => {
        const onSet = (err: any) => (err ? res("error") : res("success"));
        db.ref(`posts/${userID}/${post.id}`).set(null, onSet);
      });

      // resolve all removes
      Promise.all([imgPromise, postPromise]).then((res) => {
        if (res.includes("error")) return resolve(null);

        resolve("success");
      });
    });
  },

  editPost(userID: string, post: IEditPost): Promise<IPosts | null> {
    return new Promise(async (resolve) => {
      // GET HEADPHOTO PREV PATH
      const pathSnap = await db
        .ref(`posts/${userID}/${post.id}/headPhoto`)
        .once("value");

      // POST OBJ IF HEADPHOTO UNUPDATED
      const editPost: IPosts = { ...post, headPhoto: pathSnap.val() };

      // HANDLE HEADPHOTO IF IT UPDATED
      if (typeof post.headPhoto !== "string") {
        //@ts-ignore
        const newPath = `${userID}/posts/${post.id}/images/head/${post.headPhoto.name}`;
        //@ts-ignore
        await storageApi.uploadImage(newPath, post.headPhoto);

        editPost.headPhoto = newPath;
      }

      // UPDATE POST IN DB
      const onUpd = (err: any) => (err ? resolve(null) : resolve(editPost));
      db.ref(`posts/${userID}/${post.id}`).update(editPost, onUpd);
    });
  },

  getPosts(userID: string): Promise<IPosts[]> {
    return new Promise(async (resolve) => {
      const postsSnap = await db.ref(`posts/${userID}`).once("value");

      //@ts-ignore
      const postsArray: IPosts[] = postsSnap.exists()
        ? Object.values(postsSnap.val()).reverse()
        : [];

      const postsPromises = postsArray.map(async (post: IPosts) => ({
        ...post,
        headPhoto: await storageApi.getImage(post.headPhoto),
      }));

      Promise.all(postsPromises).then((posts) => resolve(posts));
    });
  },
};
