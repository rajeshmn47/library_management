import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCFbsnGxFGzA7AHISdn7trrSDD6X1k5Bzc",
  authDomain: "library-acb10.firebaseapp.com",
  projectId: "library-acb10",
  storageBucket: "library-acb10.appspot.com",
  messagingSenderId: "424923270243",
  appId: "1:424923270243:web:421fd9d70391941e9cbc56",
  measurementId: "G-17HSKPBBE2",
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export default storage;
