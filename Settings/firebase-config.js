// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyAZ_dO1gt-7pbpQFl92ED6SQzsl9fcJOTQ",
  authDomain: "pelisinfo-8388b.firebaseapp.com",
  projectId: "pelisinfo-8388b",
  storageBucket: "pelisinfo-8388b.appspot.com",
  messagingSenderId: "565318937387",
  appId: "1:565318937387:web:4bd733a6a9aa5b1fa1b36e"
};

// Initialize Firebase
export const Firebase_app = initializeApp(firebaseConfig);
export const Firebase_Auth = getAuth(Firebase_app);
export const Firestore_DB = getFirestore(Firebase_app);
