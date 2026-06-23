/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const required = (key: string): string => {
  const val = import.meta.env[`VITE_${key}`];
  if (!val) {
    if (typeof document !== 'undefined') {
      console.warn(`Clinova: VITE_${key} not set. Using demo mode.`);
      return `demo_${key.toLowerCase()}`;
    }
    throw new Error(`VITE_${key} environment variable is required`);
  }
  return val;
};

const firebaseConfig = {
  apiKey: required('FIREBASE_API_KEY'),
  authDomain: required('FIREBASE_AUTH_DOMAIN'),
  projectId: required('FIREBASE_PROJECT_ID'),
  storageBucket: required('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: required('FIREBASE_MESSAGING_SENDER_ID'),
  appId: required('FIREBASE_APP_ID'),
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
