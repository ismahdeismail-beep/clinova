/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyBOXVvQm2JxW7JT9CXlFeZqC23iSrX3GoA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "nakurubnb-b99f2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "nakurubnb-b99f2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "nakurubnb-b99f2.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "234989018252",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:234989018252:web:3547fa5f00d7ed6d9eefa9"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
