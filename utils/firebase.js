// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjENmr2_yttcI66Dn2Je7OCzh8_0yVxrI",
  authDomain: "projectfinal-c9962.firebaseapp.com",
  projectId: "projectfinal-c9962",
  storageBucket: "projectfinal-c9962.appspot.com",
  messagingSenderId: "380605915242",
  appId: "1:380605915242:web:1df1ffbf9a0498aae5aa13",
  measurementId: "G-P8RSSYRH2E"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
