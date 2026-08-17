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
  updatePreferences: (interests: string[]) => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Structured, non-technical auth diagnostics (Phase 12). Detailed errors go to console.error.
const authLog = (event: string, detail?: string) => {
  console.info(`%c[Auth] ${event}${detail ? ` — ${detail}` : ''}`, 'color:#6366f1;font-weight:bold;');
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Set provisional/default user state immediately so the app can render and not hang
        const provisionalName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Guest';
        const wasCompleted = localStorage.getItem(`clinova_onboarding_completed_${firebaseUser.uid}`) === 'true';
        if (active) {
          setUserData(prev => prev && prev.id === firebaseUser.uid ? prev : {
            id: firebaseUser.uid,
            name: provisionalName,
            email: firebaseUser.email || '',
            role: 'user', // default provisional role
            photoURL: firebaseUser.photoURL || undefined,
            onboardingCompleted: wasCompleted
          });
          setLoading(false); // Unblock the loading screen immediately!
        }

        // Provision / refresh the application profile in Firestore (idempotent, exactly once per user).
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userRef);
          let role: UserRole = 'user';
          let name = provisionalName;
          let clinicalInterests: string[] = [];
          let onboardingCompleted = false;

          if (userDoc.exists()) {
            const data = userDoc.data();
            role = (data.role as UserRole) || 'user';
            name = data.name || name;
            clinicalInterests = data.clinicalInterests || [];
            onboardingCompleted = !!data.onboardingCompleted;
            if (onboardingCompleted) {
              localStorage.setItem(`clinova_onboarding_completed_${firebaseUser.uid}`, 'true');
            }
            // Refresh last-login without clobbering existing data
            try {
              await setDoc(userRef, { lastLogin: new Date().toISOString() }, { merge: true });
            } catch { /* non-fatal */ }
            authLog('Profile loaded', `${firebaseUser.uid} (${role})`);
          } else {
            // First sign-in: create the full profile once
            const newProfile = {
              name,
              email: firebaseUser.email || '',
              role: 'user' as UserRole,
              photoURL: firebaseUser.photoURL || null,
              clinicalInterests: [],
              onboardingCompleted: false,
              settings: { theme: 'system', emailNotifications: true, pushNotifications: false },
              preferences: {},
              notifications: { caseReminders: true, weeklyDigest: false },
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
              provider: firebaseUser.providerData?.[0]?.providerId || 'firebase',
            };
            try {
              await setDoc(userRef, newProfile, { merge: true });
              authLog('Profile created', firebaseUser.uid);
            } catch (fsWriteError) {
              authLog('Profile creation FAILED', (fsWriteError as Error)?.message || 'Firestore write blocked');
              console.error('[Auth] Firestore profile creation failed (check Firestore rules for /users):', fsWriteError);
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
              onboardingCompleted
            });
          }
        } catch (e) {
          console.error('[Auth] Error fetching/creating user profile:', e);
          authLog('Profile sync error', (e as Error)?.message);
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
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          provider: 'anonymous',
        }, { merge: true });
        authLog('Anonymous demo sign-in', res.user.uid);
      } catch (fsError) {
        console.error('[Auth] Firestore write during loginAs failed:', fsError);
      }
    } catch (e) {
      console.error('[Auth] Anonymous sign-in failed. Enable Anonymous Auth in the Firebase console (Authentication → Sign-in method).', e);
      setLoading(false);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      authLog('Google sign-in success', cred.user.uid);
    } catch (error) {
      authLog('Google sign-in failed', (error as Error)?.message);
      console.error('[Auth] Google sign in failed:', error);
      setLoading(false);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      authLog('Email sign-in success', cred.user.uid);
    } catch (error) {
      authLog('Email sign-in failed', (error as Error)?.message);
      console.error('[Auth] Email sign-in failed:', error);
      setLoading(false);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      authLog('Email sign-up success', res.user.uid);
      try {
        await setDoc(doc(db, 'users', res.user.uid), {
          name: name || email.split('@')[0],
          email: email,
          role: 'user',
          onboardingCompleted: false,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        }, { merge: true });
      } catch (fsErr) {
        console.error('[Auth] Firestore write during signup failed:', fsErr);
      }
    } catch (error) {
      authLog('Email sign-up failed', (error as Error)?.message);
      console.error('[Auth] Email sign-up failed:', error);
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginReturning = async (_name: string, role: UserRole) => {
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

  // Fresh Firebase ID token for server-verified endpoints (e.g. push subscribe).
  // `true` forces a token refresh so revoked/expired sessions are rejected.
  const getIdToken = async (): Promise<string | null> => {
    try {
      if (!auth.currentUser) return null;
      return await auth.currentUser.getIdToken(true);
    } catch (e) {
      console.error('getIdToken failed', e);
      return null;
    }
  };

  const updatePreferences = async (interests: string[]) => {
    if (!userData) return;
    const updated: UserData = {
      ...userData,
      clinicalInterests: interests,
      onboardingCompleted: true,
    };
    
    setUserData(updated);
    localStorage.setItem(`clinova_onboarding_completed_${userData.id}`, 'true');
    
    // Save to Firestore if user logged in
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          clinicalInterests: interests,
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
      updatePreferences,
      getIdToken
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
      updatePreferences: async () => {},
      getIdToken: async () => null
    };
  }
  return context;
}
