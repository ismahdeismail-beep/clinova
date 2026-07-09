import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, setLogLevel } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import config from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
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
  }, config.firestoreDatabaseId || '(default)');
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


