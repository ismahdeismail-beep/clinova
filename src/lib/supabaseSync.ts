import { getBrowserClient } from './supabaseOptimized';
import type { SupabaseClient } from '@supabase/supabase-js';

// ── Supabase client (lazy, with graceful fallback) ────────────────────────────

let _supabase: SupabaseClient | null = null;

try {
  _supabase = getBrowserClient();
} catch {
  // Env vars not configured — sync disabled
}

export const supabase = _supabase;

// ── State ─────────────────────────────────────────────────────────────────────

let currentUserId: string | null = null;
let isSyncingFromSupabase = false;
let isSyncDisabled = false;

// Keys to synchronise with Supabase
const SYNCABLE_KEYS = [
  'clinova_reflections',
  'clinova_revealed',
  'clinova_mastered',
  'clinova_pharma_review_form',
  'clinova_assistant_input',
  'clinova_theme',
  'clinova-role',
];

const originalGetItem = localStorage.getItem.bind(localStorage);
const originalSetItem = localStorage.setItem.bind(localStorage);
const originalRemoveItem = localStorage.removeItem.bind(localStorage);

// ── Helpers ───────────────────────────────────────────────────────────────────

function checkAuthError(error: any) {
  if (!error) return false;
  const msg = error.message || '';
  const status = error.status;
  if (msg.includes('API key') || msg.includes('invalid') || msg.includes('JWT') || status === 401 || status === 403) {
    isSyncDisabled = true;
    console.warn(
      '[Supabase Sync] Disabling cloud sync: the Supabase API key or URL is invalid or unauthorized. Local Storage continues to work.',
    );
    return true;
  }
  return false;
}

async function syncToSupabase(key: string, value: string) {
  if (!supabase || !currentUserId || isSyncingFromSupabase || isSyncDisabled) return;
  if (!SYNCABLE_KEYS.includes(key)) return;

  try {
    const { error } = await supabase.from('user_local_storage').upsert(
      {
        user_id: currentUserId,
        key,
        value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,key' },
    );

    if (error) {
      if (!checkAuthError(error)) {
        console.warn('[Supabase Sync] Error upserting to Supabase:', error.message);
      }
    }
  } catch (err: any) {
    if (!checkAuthError(err)) {
      console.error('[Supabase Sync] Failed to sync to Supabase:', err);
    }
  }
}

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
    }
  } catch (err: any) {
    if (!checkAuthError(err)) {
      console.error('[Supabase Sync] Failed to delete from Supabase:', err);
    }
  }
}

export async function pullFromSupabase(userId: string) {
  if (!supabase || isSyncDisabled) return;

  isSyncingFromSupabase = true;
  try {
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
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('clinova-storage-synced'));
      }
    } else {
      // Push current local state up to Supabase
      SYNCABLE_KEYS.forEach((key) => {
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

// ── Init ──────────────────────────────────────────────────────────────────────

export function initSupabaseSync() {
  if (!supabase) {
    console.log(
      '%c[Supabase Sync] Supabase client unavailable. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env to enable sync.',
      'color: #f59e0b; font-weight: bold;',
    );
    return;
  }

  console.log(
    '%c[Supabase Sync] Active! Syncing local storage data to Supabase.',
    'color: #10b981; font-weight: bold;',
  );

  // Override localStorage.setItem
  localStorage.setItem = function (key: string, value: string) {
    const oldValue = originalGetItem(key);
    if (oldValue === value) return;
    originalSetItem(key, value);
    if (SYNCABLE_KEYS.includes(key)) {
      syncToSupabase(key, value);
    }
  } as typeof localStorage.setItem;

  // Override localStorage.removeItem
  localStorage.removeItem = function (key: string) {
    originalRemoveItem(key);
    if (SYNCABLE_KEYS.includes(key)) {
      removeFromSupabase(key);
    }
  } as typeof localStorage.removeItem;

  // Listen to Supabase auth state changes (replaces previous Firebase onAuthStateChanged)
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      currentUserId = session.user.id;
      pullFromSupabase(session.user.id);
    } else {
      // Check for mock/demo sessions in localStorage
      const mockSession = originalGetItem('clinova-mock-user');
      if (mockSession) {
        try {
          const parsed = JSON.parse(mockSession);
          if (parsed && parsed.id) {
            currentUserId = parsed.id;
            pullFromSupabase(parsed.id);
            return;
          }
        } catch {
          /* ignore */
        }
      }
      currentUserId = null;
    }
  });

  // Keep sync across mock user logins detected via storage events
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
        /* ignore */
      }
    }
  });

  // Unsubscribe on cleanup (stored for potential teardown)
  return () => {
    subscription.unsubscribe();
  };
}
