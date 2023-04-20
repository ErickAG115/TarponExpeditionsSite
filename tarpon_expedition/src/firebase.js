// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW-gwwAjZE_wGc_NrbF0B9DumtWrqIkAQ",
  authDomain: "tarponbooking.firebaseapp.com",
  projectId: "tarponbooking",
  storageBucket: "tarponbooking.appspot.com",
  messagingSenderId: "1066275617786",
  appId: "1:1066275617786:web:e416e296c47d0c580d4243",
  measurementId: "G-NB0SG6V894"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);