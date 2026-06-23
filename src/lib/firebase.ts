import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const required = (key: string): string => {
  const val = import.meta.env[`VITE_${key}`];
  if (!val) throw new Error(`Missing required environment variable: VITE_${key}`);
  return val;
};

const firebaseConfig = {
  apiKey: required('FIREBASE_API_KEY'),
  authDomain: required('FIREBASE_AUTH_DOMAIN'),
  projectId: required('FIREBASE_PROJECT_ID'),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy-bucket",
  messagingSenderId: required('FIREBASE_MESSAGING_SENDER_ID'),
  appId: required('FIREBASE_APP_ID'),
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
