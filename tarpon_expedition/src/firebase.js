import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

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