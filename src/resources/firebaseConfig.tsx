import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "boxcube-33f6d.firebaseapp.com",
  databaseURL: "https://boxcube-33f6d-default-rtdb.firebaseio.com",
  projectId: "boxcube-33f6d",
  storageBucket: "boxcube-33f6d.appspot.com",
  messagingSenderId: "513370484191",
  appId: "1:513370484191:web:0fe77ba525ecec5b1de86a",
  measurementId: "G-DFW2RS61XR"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);