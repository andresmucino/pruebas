import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYY0pcAVg_-YkMK-8hxJADiukK1KDBMeM",
  authDomain: "quickship-f9a78.firebaseapp.com",
  projectId: "quickship-f9a78",
  storageBucket: "quickship-f9a78.appspot.com",
  messagingSenderId: "835028634970",
  appId: "1:835028634970:web:1d45813507bc10073db763",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
