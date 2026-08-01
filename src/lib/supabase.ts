import { createBrowserClient } from '@supabase/ssr'

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : ({} as Record<string, any>)
const serverEnv = typeof process !== 'undefined' ? process.env : ({} as Record<string, string | undefined>)
const supabaseUrl = (env.VITE_SUPABASE_URL as string | undefined) ?? serverEnv.VITE_SUPABASE_URL
const supabaseAnonKey = (env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? serverEnv.VITE_SUPABASE_ANON_KEY
const isBrowser = typeof window !== 'undefined'

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set; client disabled.')
}

export const supabase = (isBrowser && supabaseUrl && supabaseAnonKey)
  ? createBrowserClient(supabaseUrl, supabaseAnonKey)
  : null
