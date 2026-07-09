import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, setLogLevel } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import jsonConfig from '../../firebase-applet-config.json';

// Firebase config: use VITE_FIREBASE_* env vars if available, otherwise fall back
// to the local JSON config (which is gitignored to prevent credential leaks).
const envApiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;

const firebaseConfig = envApiKey
  ? {
      apiKey: envApiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string ?? '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string ?? '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string ?? '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string ?? '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID as string ?? '',
    }
  : {
      apiKey: jsonConfig.apiKey ?? '',
      authDomain: jsonConfig.authDomain ?? '',
      projectId: jsonConfig.projectId ?? '',
      storageBucket: jsonConfig.storageBucket ?? '',
      messagingSenderId: jsonConfig.messagingSenderId ?? '',
      appId: jsonConfig.appId ?? '',
    };

export const app = initializeApp(firebaseConfig);

// Suppress Firestore connection warnings when offline or using dummy credentials
setLogLevel('error');

let dbInstance;
try {
  dbInstance = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    }),
    experimentalAutoDetectLongPolling: true
  }, jsonConfig.firestoreDatabaseId || '(default)');
} catch (e) {
  console.warn("Firestore advanced initialization failed (likely due to iframe sandboxing or disabled third-party cookies). Falling back to basic Firestore:", e);
  try {
    dbInstance = getFirestore(app);
  } catch (err) {
    console.error("Critical: Standard Firestore fallback also failed", err);
    throw err;
  }
}

export const db = dbInstance;
export const auth = getAuth(app);
export const storage = getStorage(app);


