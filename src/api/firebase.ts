import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/analytics";

const config = {
  apiKey: "AIzaSyAI4aAnIH3r3Rit1HVZVwQl1-yFTlKttQ4",
  authDomain: "simple-blog-cf1d2.firebaseapp.com",
  projectId: "simple-blog-cf1d2",
  storageBucket: "simple-blog-cf1d2.appspot.com",
  messagingSenderId: "789591358386",
  appId: "1:789591358386:web:8f21cb85f3f45da03c02ab",
  measurementId: "G-BJJV1QYCT4",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();
