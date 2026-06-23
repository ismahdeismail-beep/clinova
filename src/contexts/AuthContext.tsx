import { createContext, useContext, useEffect, useState, useMemo, useCallback, type ReactNode } from 'react';
import { type User, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { UserData, UserRole } from '../types';
import { useClinicalStore } from '../store/clinicalStore';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const setStoreUser = useClinicalStore((s) => s.setUser);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            if (isMounted) {
              setUserData(data);
              setStoreUser({ uid: data.uid, email: data.email, displayName: data.displayName, role: data.role });
            }
          } else {
            const newUserData: UserData = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              role: 'student',
              createdAt: Date.now(),
            };
            await setDoc(userDocRef, newUserData);
            if (isMounted) {
              setUserData(newUserData);
              setStoreUser({ uid: newUserData.uid, email: newUserData.email, displayName: newUserData.displayName, role: newUserData.role });
            }
          }
        } catch (err) {
          console.error("Error fetching user from Firestore:", err);
        } finally {
          if (isMounted) setLoading(false);
        }
      } else {
        if (isMounted) {
          setUserData(null);
          setStoreUser(null);
          setLoading(false);
        }
      }
    }, () => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [setStoreUser]);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const value = useMemo(() => ({ user, userData, loading, signInWithGoogle, logout }), [user, userData, loading, signInWithGoogle, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
