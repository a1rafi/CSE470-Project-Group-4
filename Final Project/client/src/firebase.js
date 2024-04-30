// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cse470-ffd6c.firebaseapp.com",
  projectId: "cse470-ffd6c",
  storageBucket: "cse470-ffd6c.appspot.com",
  messagingSenderId: "440119239659",
  appId: "1:440119239659:web:875a82ab5d820d1518efae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);