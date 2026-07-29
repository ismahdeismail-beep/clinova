import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { getBrowserClient } from '../lib/supabaseOptimized';
import type { SupabaseClient } from '@supabase/supabase-js';
import { buildUserData, upsertUserProfile } from '../lib/supabaseAuth';
import type { UserData, UserRole } from '../lib/supabaseAuth';

// ── Types ──────────────────────────────────────────────────────────────────────

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
}

// ── Context ────────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ── Logging ────────────────────────────────────────────────────────────────────

const authLog = (event: string, detail?: string) => {
  console.info(`%c[Auth] ${event}${detail ? ` — ${detail}` : ''}`, 'color:#6366f1;font-weight:bold;');
};

// ── Provider ───────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  // Lazy init — fails gracefully if Supabase env vars are missing
  const [supabase] = useState<SupabaseClient | null>(() => {
    try {
      return getBrowserClient();
    } catch {
      return null;
    }
  });

  // ── Auth state listener ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!active) return;

        if (session?.user) {
          const user = session.user;
          const meta = user.user_metadata || {};
          const provisionalName = meta.name || meta.full_name || user.email?.split('@')[0] || 'Guest';
          const wasCompleted = localStorage.getItem(`clinova_onboarding_completed_${user.id}`) === 'true';

          // Set provisional user data immediately to unblock rendering
          setUserData({
            id: user.id,
            name: provisionalName,
            email: user.email || '',
            role: 'user',
            photoURL: meta.avatar_url || undefined,
            onboardingCompleted: wasCompleted,
          });
          setLoading(false);

          // Fetch enriched profile from public.users table (may not exist yet)
          try {
            const enriched = await buildUserData(user);
            if (active) {
              localStorage.removeItem('clinova-mock-user');
              setUserData(enriched);

              if (enriched.onboardingCompleted) {
                localStorage.setItem(`clinova_onboarding_completed_${user.id}`, 'true');
              }

              // Touch last_login
              try {
                await supabase.from('users').upsert(
                  { id: user.id, last_login: new Date().toISOString() },
                  { onConflict: 'id', ignoreDuplicates: false },
                );
              } catch { /* non-fatal */ }

              authLog(`${event} — ${user.id} (${enriched.role})`);
            }
          } catch (e) {
            console.error('[Auth] Error loading enriched profile:', e);
            // Keep provisional data — good enough for initial render
          }
        } else {
          // No session — signed out
          if (active && !localStorage.getItem('clinova-mock-user')) {
            setUserData(null);
          }
          if (active) {
            setLoading(false);
          }
        }
      },
    );

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  // ── Auth methods ─────────────────────────────────────────────────────────────

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      if (!supabase) throw new Error('Supabase client not initialized');
      setLoading(true);
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        authLog('Email sign-in success');
      } catch (error) {
        authLog('Email sign-in failed');
        console.error('[Auth] Email sign-in failed:', error);
        setLoading(false);
        throw error;
      }
    },
    [supabase],
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string, name: string) => {
      if (!supabase) throw new Error('Supabase client not initialized');
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) throw error;

        // If session is null, email confirmation is required
        if (!data.session) {
          throw new Error('Please check your email for a confirmation link before signing in.');
        }

        authLog('Email sign-up success');

        // Create initial user profile
        const user = data.user;
        if (user) {
          try {
            await upsertUserProfile({
              id: user.id,
              name: name || email.split('@')[0],
              email,
              role: 'user',
              onboardingCompleted: false,
            });
          } catch { /* non-fatal */ }
        }
      } catch (error) {
        authLog('Email sign-up failed');
        console.error('[Auth] Email sign-up failed:', error);
        setLoading(false);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [supabase],
  );

  const loginWithGoogle = useCallback(async () => {
    if (!supabase) throw new Error('Supabase client not initialized');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
      // OAuth redirects browser — session picked up by onAuthStateChange on return
    } catch (error) {
      authLog('Google sign-in failed');
      console.error('[Auth] Google sign-in failed:', error);
      setLoading(false);
      throw error;
    }
  }, [supabase]);

  const loginAs = useCallback(
    async (role: UserRole) => {
      if (!supabase) throw new Error('Supabase client not initialized');
      setLoading(true);
      try {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) throw error;

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          try {
            await upsertUserProfile({
              id: user.id,
              name: role === 'admin' ? 'Dr. Sarah K.' : 'Nurse John D.',
              email: role === 'admin' ? 'dr.sarah.k@clinova.health' : 'john.d@clinova.health',
              role,
            });
          } catch { /* non-fatal */ }
        }
        authLog('Anonymous demo sign-in');
      } catch (error: any) {
        authLog('Anonymous sign-in failed');
        console.error(
          '[Auth] Anonymous sign-in failed. Enable Anonymous Auth in Supabase (Authentication → Providers → Anonymous).',
          error,
        );
        setLoading(false);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [supabase],
  );

  const loginReturning = useCallback(
    async (_name: string, role: UserRole) => {
      await loginAs(role);
    },
    [loginAs],
  );

  const logout = useCallback(async () => {
    if (!supabase) {
      setUserData(null);
      return;
    }
    localStorage.removeItem('clinova-mock-user');
    setUserData(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      authLog('Signed out');
    } catch (e) {
      console.error('[Auth] Sign out failed:', e);
    }
  }, [supabase]);

  const updatePreferences = useCallback(
    async (interests: string[]) => {
      if (!userData || !supabase) return;

      const updated: UserData = {
        ...userData,
        clinicalInterests: interests,
        onboardingCompleted: true,
      };

      setUserData(updated);
      localStorage.setItem(`clinova_onboarding_completed_${userData.id}`, 'true');

      try {
        await upsertUserProfile({
          id: userData.id,
          clinicalInterests: interests,
          onboardingCompleted: true,
        });
      } catch (e) {
        console.warn('Could not save preferences to Supabase, using local state', e);
      }
    },
    [userData, supabase],
  );

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <AuthContext.Provider
      value={{
        userData,
        loading,
        logout,
        loginAs,
        loginWithGoogle,
        loginReturning,
        loginWithEmail,
        signUpWithEmail,
        updatePreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────────

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
      updatePreferences: async (_interests: string[]) => {},
    };
  }
  return context;
}
