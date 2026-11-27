import type { SupabaseClient } from '@supabase/supabase-js'

export interface FirebaseIdentity {
  uid: string
  email: string | null
  displayName: string | null
  photoUrl: string | null
}

export interface FirebaseProfileRow {
  firebase_uid: string
  email: string | null
  display_name: string | null
  avatar_url: string | null
  updated_at: string
}

const LOOKUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup'

export async function lookupFirebaseIdentity(
  token: string,
  apiKey: string,
): Promise<FirebaseIdentity | null> {
  if (!token || !apiKey) return null
  try {
    const resp = await fetch(`${LOOKUP_URL}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    })
    if (!resp.ok) return null
    const data: any = await resp.json()
    const user = data?.users?.[0]
    if (!user?.localId) return null
    return {
      uid: String(user.localId),
      email: user.email ? String(user.email) : null,
      displayName: user.displayName ? String(user.displayName) : null,
      photoUrl: user.photoUrl ? String(user.photoUrl) : null,
    }
  } catch (error) {
    console.error('[firebase-auth] token lookup failed:', error)
    return null
  }
}

export function toProfileRow(
  identity: FirebaseIdentity,
  now = new Date().toISOString(),
): FirebaseProfileRow {
  return {
    firebase_uid: identity.uid,
    email: identity.email,
    display_name: identity.displayName,
    avatar_url: identity.photoUrl,
    updated_at: now,
  }
}

export async function upsertFirebaseProfile(
  client: SupabaseClient,
  identity: FirebaseIdentity,
): Promise<{ error: string | null }> {
  const { error } = await client
    .from('profiles')
    .upsert(toProfileRow(identity), { onConflict: 'firebase_uid' })
  return { error: error?.message ?? null }
}
