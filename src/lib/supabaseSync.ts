import { createClient } from '@supabase/supabase-js';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Use optional chaining and fallback gracefully if environment variables are not set yet
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Detect generic or invalid placeholder values in env
const isPlaceholder = (val: string) => {
  const v = val.toLowerCase();
  return !v || 
         v.includes('placeholder') || 
         v.includes('your_') || 
         v.includes('your-') || 
         v === 'url' || 
         v === 'key' || 
         v.includes('<') || 
         v.includes('>');
};

export const supabase = (supabaseUrl && supabaseAnonKey && !isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseAnonKey) && supabaseUrl.startsWith('https://'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Track the current user ID to store their corresponding cloud backups
let currentUserId: string | null = null;
let isSyncingFromSupabase = false;
let isSyncDisabled = false;

// Keys we want to synchronize with Supabase (medical reflections, forms, triage, user preferences, etc.)
const SYNCABLE_KEYS = [
  'clinova_reflections',
  'clinova_revealed',
  'clinova_mastered',
  'clinova_pharma_review_form',
  'clinova_assistant_input',
  'clinova_theme',
  'clinova-role'
];

// Keep original localStorage methods
const originalGetItem = localStorage.getItem.bind(localStorage);
const originalSetItem = localStorage.setItem.bind(localStorage);
const originalRemoveItem = localStorage.removeItem.bind(localStorage);

// Check if error is related to authentication / API keys
function checkAuthError(error: any) {
  if (!error) return false;
  const msg = error.message || '';
  const status = error.status;
  if (
    msg.includes('API key') || 
    msg.includes('invalid') || 
    msg.includes('JWT') || 
    status === 401 || 
    status === 403
  ) {
    isSyncDisabled = true;
    console.warn('[Supabase Sync] Disabling cloud synchronization because the Supabase API key or URL is invalid or unauthorized. Local Storage will continue to work perfectly.');
    return true;
  }
  return false;
}

// Synchronizes a specific key-value pair to the Supabase database
async function syncToSupabase(key: string, value: string) {
  if (!supabase || !currentUserId || isSyncingFromSupabase || isSyncDisabled) return;
  if (!SYNCABLE_KEYS.includes(key)) return;

  try {
    const { error } = await supabase
      .from('user_local_storage')
      .upsert({
        user_id: currentUserId,
        key: key,
        value: value,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,key'
      });

    if (error) {
      if (!checkAuthError(error)) {
        console.warn('[Supabase Sync] Error upserting to Supabase:', error.message);
      }
    } else {
      console.log(`[Supabase Sync] Synced ${key} to Supabase`);
    }
  } catch (err: any) {
    if (!checkAuthError(err)) {
      console.error('[Supabase Sync] Failed to sync to Supabase:', err);
    }
  }
}

// Removes a key-value pair from Supabase when removed locally
async function removeFromSupabase(key: string) {
  if (!supabase || !currentUserId || isSyncingFromSupabase || isSyncDisabled) return;
  if (!SYNCABLE_KEYS.includes(key)) return;

  try {
    const { error } = await supabase
      .from('user_local_storage')
      .delete()
      .eq('user_id', currentUserId)
      .eq('key', key);

    if (error) {
      if (!checkAuthError(error)) {
        console.warn('[Supabase Sync] Error deleting from Supabase:', error.message);
      }
    } else {
      console.log(`[Supabase Sync] Removed ${key} from Supabase`);
    }
  } catch (err: any) {
    if (!checkAuthError(err)) {
      console.error('[Supabase Sync] Failed to delete from Supabase:', err);
    }
  }
}

// Pulls all synchronized keys from Supabase and restores them to localStorage
export async function pullFromSupabase(userId: string) {
  if (!supabase || isSyncDisabled) return;

  isSyncingFromSupabase = true;
  try {
    console.log(`[Supabase Sync] Restoring application state from Supabase for user: ${userId}...`);
    const { data, error } = await supabase
      .from('user_local_storage')
      .select('key, value')
      .eq('user_id', userId);

    if (error) {
      if (!checkAuthError(error)) {
        console.error('[Supabase Sync] Error loading cloud data:', error.message);
      }
      return;
    }

    if (data && data.length > 0) {
      let updatedAny = false;
      data.forEach((row: { key: string; value: string }) => {
        if (SYNCABLE_KEYS.includes(row.key)) {
          const currentLocal = originalGetItem(row.key);
          if (currentLocal !== row.value) {
            originalSetItem(row.key, row.value);
            updatedAny = true;
          }
        }
      });

      if (updatedAny) {
        console.log(`[Supabase Sync] Restored ${data.length} keys from Supabase cloud backup.`);
        // Dispatch event to update active React components
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('clinova-storage-synced'));
      }
    } else {
      console.log('[Supabase Sync] No existing cloud backup found. Syncing current states up.');
      // Push any current local storage states up to Supabase
      SYNCABLE_KEYS.forEach(key => {
        const localVal = originalGetItem(key);
        if (localVal) {
          syncToSupabase(key, localVal);
        }
      });
    }
  } catch (err) {
    console.error('[Supabase Sync] Failed to restore state from Supabase:', err);
  } finally {
    isSyncingFromSupabase = false;
  }
}

// Initializes the synchronization mechanism by hijacking localStorage
export function initSupabaseSync() {
  if (!supabase) {
    console.log('%c[Supabase Sync] Supabase client environment variables are not set. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env to enable synchronization.', 'color: #f59e0b; font-weight: bold;');
    return;
  }

  console.log('%c[Supabase Sync] Active! Listening and auto-syncing local storage data to Supabase.', 'color: #10b981; font-weight: bold;');

  // Override localStorage.setItem
  localStorage.setItem = function(key: string, value: string) {
    const oldValue = originalGetItem(key);
    if (oldValue === value) return; // Prevent unnecessary writes or feedback loops

    originalSetItem(key, value);
    if (SYNCABLE_KEYS.includes(key)) {
      syncToSupabase(key, value);
    }
  };

  // Override localStorage.removeItem
  localStorage.removeItem = function(key: string) {
    originalRemoveItem(key);
    if (SYNCABLE_KEYS.includes(key)) {
      removeFromSupabase(key);
    }
  };

  // Monitor user login changes (Firebase and Mock sessions)
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      currentUserId = firebaseUser.uid;
      await pullFromSupabase(firebaseUser.uid);
    } else {
      // Look for custom demo/mock sessions
      const mockSession = originalGetItem('clinova-mock-user');
      if (mockSession) {
        try {
          const parsed = JSON.parse(mockSession);
          if (parsed && parsed.id) {
            currentUserId = parsed.id;
            await pullFromSupabase(parsed.id);
            return;
          }
        } catch {
          // ignore parsing error
        }
      }
      currentUserId = null;
    }
  });

  // Keep synced across mock user logins or role transitions
  window.addEventListener('storage', async () => {
    const mockSession = originalGetItem('clinova-mock-user');
    if (mockSession) {
      try {
        const parsed = JSON.parse(mockSession);
        if (parsed && parsed.id && parsed.id !== currentUserId) {
          currentUserId = parsed.id;
          await pullFromSupabase(parsed.id);
        }
      } catch {
        // ignore parsing error
      }
    }
  });
}
