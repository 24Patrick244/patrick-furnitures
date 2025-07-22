// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // eslint-disable-next-line no-unused-vars
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKzLF0FhGuSIStewIsq035izXVzK_zJq4",
  authDomain: "patrick-furnitures-3e107.firebaseapp.com",
  projectId: "patrick-furnitures-3e107",
  storageBucket: "patrick-furnitures-3e107.appspot.com", // ✅ corrected from ".app" to ".com"
  messagingSenderId: "1093607725666",
  appId: "1:1093607725666:web:1e7ba88d5da13369448f3b",
  measurementId: "G-7PB333GL9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // eslint-disable-line no-unused-vars

// ✅ Export Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
