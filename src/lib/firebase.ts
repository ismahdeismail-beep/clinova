import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, setLogLevel } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBOXVvQm2JxW7JT9CXlFeZqC23iSrX3GoA',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'nakurubnb-b99f2.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'nakurubnb-b99f2',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'nakurubnb-b99f2.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '234989018252',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:234989018252:web:3547fa5f00d7ed6d9eefa9',
};

export const app = initializeApp(firebaseConfig);

// ── Config transparency ───────────────────────────────────────────────────────
const usingEnvConfig = !!import.meta.env.VITE_FIREBASE_API_KEY;
if (!usingEnvConfig) {
  console.warn('[Firebase] VITE_FIREBASE_* env vars are not set — using bundled default project config. Set them in .env to override.');
}
console.info(`[Firebase] Firebase initialized for project "${firebaseConfig.projectId}" (storageBucket: ${firebaseConfig.storageBucket}).`);

// Suppress Firestore connection warnings when offline or using dummy credentials
setLogLevel('error');

let dbInstance;
try {
  dbInstance = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
    experimentalAutoDetectLongPolling: true,
  }, '(default)');
} catch (e) {
  console.warn('Firestore advanced initialization failed (likely due to iframe sandboxing or disabled third-party cookies). Falling back to basic Firestore:', e);
  try {
    dbInstance = getFirestore(app);
  } catch (err) {
    console.error('Critical: Standard Firestore fallback also failed', err);
    throw err;
  }
}

export const db = dbInstance;
export const storage = getStorage(app);
