/**
 * Supabase browser client (Vite/React equivalent of the Next.js ssr helpers).
 * Clinova is a Vite SPA, not Next.js, so there is no middleware/cookies server
 * client — the browser client handles session refresh automatically.
 *
 * Env: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (see .env.example)
 */
import { createBrowserClient } from '@supabase/ssr';

// Resolve env safely across both the Vite browser build (import.meta.env) and the
// CJS server build (process.env), where `import.meta` is undefined/empty.
const _meta: any = (typeof import.meta !== 'undefined') ? import.meta : {};
const _viteEnv: any = _meta && _meta.env ? _meta.env : {};
const _processEnv: any = (typeof process !== 'undefined' && process.env) ? process.env : {};

const supabaseUrl = (_viteEnv.VITE_SUPABASE_URL || _processEnv.VITE_SUPABASE_URL) as string | undefined;
const supabaseAnonKey = (_viteEnv.VITE_SUPABASE_ANON_KEY || _processEnv.VITE_SUPABASE_ANON_KEY) as string | undefined;

const isBrowser = typeof window !== 'undefined';

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail soft so the app still boots where Supabase isn't configured (e.g. Firebase-only mode).
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set; client disabled.');
}

// Only instantiate the browser client in a browser context. In the Node server
// build this stays null (the service-role client in server.ts handles writes).
export const supabase = (isBrowser && supabaseUrl && supabaseAnonKey)
  ? createBrowserClient(supabaseUrl, supabaseAnonKey)
  : null;
