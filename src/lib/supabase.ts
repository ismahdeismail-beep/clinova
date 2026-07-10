/**
 * Supabase browser client (Vite/React equivalent of the Next.js ssr helpers).
 * Clinova is a Vite SPA, not Next.js, so there is no middleware/cookies server
 * client — the browser client handles session refresh automatically.
 *
 * Env: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (see .env.example)
 */
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail soft so the app still boots where Supabase isn't configured (e.g. Firebase-only mode).
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set; client disabled.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createBrowserClient(supabaseUrl, supabaseAnonKey)
  : null;
