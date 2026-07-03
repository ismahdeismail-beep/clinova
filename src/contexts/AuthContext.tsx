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
  clinicalInterests?: string[];
  academicLevel?: string;
  onboardingCompleted?: boolean;
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
  updatePreferences: (interests: string[], level: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    // Check if there is a local mock session first
    const mockSession = localStorage.getItem('clinova-mock-user');
    if (mockSession) {
      try {
        setUserData(JSON.parse(mockSession));
        setLoading(false);
      } catch (e) {
        localStorage.removeItem('clinova-mock-user');
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Set provisional/default user state immediately so the app can render and not hang
        const provisionalName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Guest';
        if (active) {
          setUserData(prev => prev && prev.id === firebaseUser.uid ? prev : {
            id: firebaseUser.uid,
            name: provisionalName,
            email: firebaseUser.email || '',
            role: 'user', // default provisional role
            photoURL: firebaseUser.photoURL || undefined
          });
          setLoading(false); // Unblock the loading screen immediately!
        }

        // Try to fetch user role from firestore in the background
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          let role: UserRole = 'user';
          let name = provisionalName;
          let clinicalInterests: string[] = [];
          let academicLevel = '';
          let onboardingCompleted = false;
          
          if (userDoc.exists()) {
            role = userDoc.data().role as UserRole;
            name = userDoc.data().name || name;
            clinicalInterests = userDoc.data().clinicalInterests || [];
            academicLevel = userDoc.data().academicLevel || '';
            onboardingCompleted = !!userDoc.data().onboardingCompleted;
          } else {
            // New user, save them
            try {
              await setDoc(doc(db, 'users', firebaseUser.uid), {
                name,
                email: firebaseUser.email || '',
                role: 'user',
              });
            } catch (fsWriteError) {
              console.warn("Firestore user creation blocked by rules or network. Falling back to memory profile.", fsWriteError);
            }
          }
          
          if (active) {
            localStorage.removeItem('clinova-mock-user');
            setUserData({
              id: firebaseUser.uid,
              name,
              email: firebaseUser.email || '',
              role,
              photoURL: firebaseUser.photoURL || undefined,
              clinicalInterests,
              academicLevel,
              onboardingCompleted
            });
          }
        } catch (e) {
          console.warn("Error fetching user role (using safe default profile):", e);
          if (active) {
            setUserData({
              id: firebaseUser.uid,
              name: provisionalName,
              email: firebaseUser.email || '',
              role: 'user',
              photoURL: firebaseUser.photoURL || undefined
            });
          }
        }
      } else {
        if (active && !localStorage.getItem('clinova-mock-user')) {
          setUserData(null);
        }
        if (active) {
          setLoading(false);
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const loginAs = async (role: UserRole) => {
    setLoading(true);
    try {
      const res = await signInAnonymously(auth);
      try {
        await setDoc(doc(db, 'users', res.user.uid), {
          name: role === 'admin' ? 'Dr. Sarah K.' : 'Nurse John D.',
          email: role === 'admin' ? 'dr.sarah.k@clinova.health' : 'john.d@clinova.health',
          role,
        });
      } catch (fsError) {
        console.warn("Firestore write during loginAs failed", fsError);
      }
    } catch (e) {
      console.warn("Firebase Anonymous Sign-In is disabled or blocked. Falling back to local mock session.", e);
      const mockUser: UserData = {
        id: `mock-${role}-${Math.random().toString(36).substring(2, 9)}`,
        name: role === 'admin' ? 'Dr. Sarah K. (Demo)' : 'Nurse John D. (Demo)',
        email: role === 'admin' ? 'dr.sarah.k@clinova.health' : 'john.d@clinova.health',
        role,
      };
      localStorage.setItem('clinova-mock-user', JSON.stringify(mockUser));
      setUserData(mockUser);
    } finally {
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
      // First check for easy demo credential shortcut
      if (email.toLowerCase() === 'admin@clinova.health' && password === 'password') {
        const mockUser: UserData = {
          id: 'mock-admin-default',
          name: 'Dr. Sarah K. (Demo Admin)',
          email: 'admin@clinova.health',
          role: 'admin',
        };
        localStorage.setItem('clinova-mock-user', JSON.stringify(mockUser));
        setUserData(mockUser);
        setLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.warn("Firebase email sign-in failed. Checking if we can fallback to mock sign-in.", error);
      // Fallback for testing with random email
      if (password.length >= 6) {
        const mockUser: UserData = {
          id: `mock-user-${Math.random().toString(36).substring(2, 9)}`,
          name: email.split('@')[0].toUpperCase(),
          email: email,
          role: 'user',
        };
        localStorage.setItem('clinova-mock-user', JSON.stringify(mockUser));
        setUserData(mockUser);
        setLoading(false);
        return;
      }
      setLoading(false);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await setDoc(doc(db, 'users', res.user.uid), {
          name: name || email.split('@')[0],
          email: email,
          role: 'user',
        });
      } catch (fsErr) {
        console.warn("Firestore write during signup failed", fsErr);
      }
    } catch (error) {
      console.warn("Firebase email signup failed. Creating local mock account for seamless user experience.", error);
      const mockUser: UserData = {
        id: `mock-user-${Math.random().toString(36).substring(2, 9)}`,
        name: name || email.split('@')[0],
        email: email,
        role: 'user',
      };
      localStorage.setItem('clinova-mock-user', JSON.stringify(mockUser));
      setUserData(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const loginReturning = async (name: string, role: UserRole) => {
    await loginAs(role);
  };

  const logout = async () => {
    localStorage.removeItem('clinova-mock-user');
    setUserData(null);
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Firebase signOut failed", e);
    }
  };

  const updatePreferences = async (interests: string[], level: string) => {
    if (!userData) return;
    const updated: UserData = {
      ...userData,
      clinicalInterests: interests,
      academicLevel: level,
      onboardingCompleted: true,
    };
    
    setUserData(updated);
    
    // Save locally if mock session is running
    if (localStorage.getItem('clinova-mock-user')) {
      localStorage.setItem('clinova-mock-user', JSON.stringify(updated));
    }
    
    // Save to Firestore if user logged in
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          clinicalInterests: interests,
          academicLevel: level,
          onboardingCompleted: true,
        }, { merge: true });
      } catch (e) {
        console.warn("Could not save preferences to Firestore, using local state", e);
      }
    }
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
      signUpWithEmail,
      updatePreferences
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
      signUpWithEmail: async () => {},
      updatePreferences: async () => {}
    };
  }
  return context;
}
