import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, signInAnonymously } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type UserRole = 'admin' | 'user';

interface UserData {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  photoURL?: string;
}

interface AuthContextType {
  userData: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
  loginAs: (role: UserRole) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginReturning: (name: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Try to fetch user role from firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          let role: UserRole = 'user';
          if (userDoc.exists()) {
            role = userDoc.data().role as UserRole;
          } else {
            // New user, save them
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              name: firebaseUser.displayName || 'Guest',
              email: firebaseUser.email || '',
              role: 'user',
            });
          }
          
          setUserData({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Guest',
            email: firebaseUser.email || '',
            role,
            photoURL: firebaseUser.photoURL || undefined
          });
        } catch (e) {
          console.error("Error fetching user role", e);
          // Fallback
          setUserData({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Guest',
            email: firebaseUser.email || '',
            role: 'user',
            photoURL: firebaseUser.photoURL || undefined
          });
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAs = async (role: UserRole) => {
    // For demo purposes with Firebase, we can use anonymous auth and set fake data
    try {
      setLoading(true);
      const res = await signInAnonymously(auth);
      // We don't need to await the firestore setDoc here because onAuthStateChanged handles it,
      // but we do want to overwrite their role
      await setDoc(doc(db, 'users', res.user.uid), {
        name: role === 'admin' ? 'Dr. Sarah K.' : 'Nurse John D.',
        email: role === 'admin' ? 'dr.sarah.k@clinova.health' : 'john.d@clinova.health',
        role,
      });
      // The onAuthStateChanged will pick up the update
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign in failed", error);
      setLoading(false);
    }
  };

  const loginReturning = async (name: string, role: UserRole) => {
    // For demo returning user, we will just use anonymous login
    await loginAs(role);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ userData, loading, logout, loginAs, loginWithGoogle, loginReturning }}>
      {/* We can show a simple loading state or just render children. Let's render children so app doesn't flash white heavily, 
          but if it's loading we could return null or a spinner. Let's just render children. */}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return { 
      userData: null, 
      loading: false,
      logout: async () => {}, 
      loginAs: async () => {},
      loginWithGoogle: async () => {},
      loginReturning: async () => {}
    };
  }
  return context;
}
