import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBOXVvQm2JxW7JT9CXlFeZqC23iSrX3GoA",
  authDomain: "nakurubnb-b99f2.firebaseapp.com",
  projectId: "nakurubnb-b99f2",
  storageBucket: "nakurubnb-b99f2.firebasestorage.app",
  messagingSenderId: "234989018252",
  appId: "1:234989018252:web:3547fa5f00d7ed6d9eefa9"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
