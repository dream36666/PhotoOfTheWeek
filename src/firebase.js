import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {   apiKey: "AIzaSyDjBgFiAAPzYOoie6iUikzpCFGXLsAo4Mk",   authDomain: "photooftheweek-a7023.firebaseapp.com",   projectId: "photooftheweek-a7023",   storageBucket: "photooftheweek-a7023.firebasestorage.app",   messagingSenderId: "914100513247",   appId: "1:914100513247:web:1ca9d6ac9b6ae79e067c6a" };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
