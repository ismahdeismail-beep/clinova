import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
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
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
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
          let name = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Guest';
          
          if (userDoc.exists()) {
            role = userDoc.data().role as UserRole;
            name = userDoc.data().name || name;
          } else {
            // New user, save them
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              name,
              email: firebaseUser.email || '',
              role: 'user',
            });
          }
          
          setUserData({
            id: firebaseUser.uid,
            name,
            email: firebaseUser.email || '',
            role,
            photoURL: firebaseUser.photoURL || undefined
          });
        } catch (e) {
          console.error("Error fetching user role", e);
          // Fallback
          setUserData({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Guest',
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
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', res.user.uid), {
        name: name || email.split('@')[0],
        email: email,
        role: 'user',
      });
    } catch (error) {
      setLoading(false);
      throw error;
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
    <AuthContext.Provider value={{ 
      userData, 
      loading, 
      logout, 
      loginAs, 
      loginWithGoogle, 
      loginReturning,
      loginWithEmail,
      signUpWithEmail
    }}>
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
      loginReturning: async () => {},
      loginWithEmail: async () => {},
      signUpWithEmail: async () => {}
    };
  }
  return context;
}
