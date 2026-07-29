import { getBrowserClient } from './supabaseOptimized';
import type { SupabaseClient, User } from '@supabase/supabase-js';

// ── Types ──────────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'user';

export interface UserData {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  photoURL?: string;
  clinicalInterests?: string[];
  onboardingCompleted?: boolean;
}

// ── Client (singleton) ─────────────────────────────────────────────────────────

let _supabase: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_supabase) {
    _supabase = getBrowserClient();
  }
  return _supabase;
}

export { getClient as getSupabaseClient };

// Re-export the singleton supabase for convenience
export { getBrowserClient };

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Build a UserData object from a Supabase auth User session.
 * Attempts to read enriched profile from the `public.users` table,
 * falling back to auth metadata / localStorage if the table is unavailable.
 */
export async function buildUserData(supabaseUser: User): Promise<UserData> {
  const meta = supabaseUser.user_metadata || {};
  const provisionalName = meta.name || meta.full_name || supabaseUser.email?.split('@')[0] || 'Guest';
  const wasCompleted = localStorage.getItem(`clinova_onboarding_completed_${supabaseUser.id}`) === 'true';

  // Try loading profile from Supabase public.users table
  try {
    const client = getClient();
    const { data: profile, error } = await client
      .from('users')
      .select('*')
      .eq('id', supabaseUser.id)
      .maybeSingle();

    if (profile && !error) {
      return {
        id: supabaseUser.id,
        name: profile.name || provisionalName,
        email: supabaseUser.email || '',
        role: (profile.role as UserRole) || 'user',
        photoURL: profile.photo_url || meta.avatar_url || undefined,
        clinicalInterests: profile.clinical_interests || [],
        onboardingCompleted: profile.onboarding_completed || false,
      };
    }
  } catch {
    // Table may not exist yet — fall through to metadata-based profile
  }

  // Fallback: build from auth metadata
  return {
    id: supabaseUser.id,
    name: provisionalName,
    email: supabaseUser.email || '',
    role: 'user',
    photoURL: meta.avatar_url || undefined,
    onboardingCompleted: wasCompleted,
  };
}

/**
 * Upsert a user profile into the public.users table.
 * Silently fails if the table does not exist.
 */
export async function upsertUserProfile(data: Partial<UserData> & { id: string }): Promise<void> {
  try {
    const client = getClient();
    const { error } = await client.from('users').upsert(
      {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role || 'user',
        photo_url: data.photoURL,
        clinical_interests: data.clinicalInterests || [],
        onboarding_completed: data.onboardingCompleted || false,
        last_login: new Date().toISOString(),
      },
      { onConflict: 'id', ignoreDuplicates: false },
    );

    if (error) {
      console.warn('[Auth] Supabase profile upsert failed:', error.message);
    }
  } catch (e) {
    // Table may not exist yet — non-fatal
    console.warn('[Auth] Could not save profile to Supabase (table may not exist yet):', e);
  }
}

/**
 * Map common Supabase auth error messages to user-friendly strings.
 */
export function friendlySupabaseError(error: unknown): string {
  const msg = (error as any)?.message || (error as any)?.error_description || String(error) || '';

  if (msg.includes('User already registered')) return 'This email is already registered. Please sign in instead.';
  if (msg.includes('Password should be at least')) return 'Password must be at least 6 characters.';
  if (msg.includes('Invalid login credentials')) return 'Incorrect email or password.';
  if (msg.includes('Email not confirmed')) return 'Please confirm your email before signing in.';
  if (msg.includes('Invalid email')) return 'Please enter a valid email address.';
  if (msg.includes('Email link is invalid or expired')) return 'The verification link is invalid or has expired.';
  if (msg.includes('Anonymous sign-in is disabled')) return 'Anonymous sign-in is disabled. Please use email/password or Google.';
  if (msg.includes('popup')) return 'The sign-in popup was blocked. Please allow popups or try another method.';
  if (msg.includes('security')) return 'Sign-in was blocked by a security policy. Please try again.';

  return msg || 'Authentication failed. Please check your details.';
}
