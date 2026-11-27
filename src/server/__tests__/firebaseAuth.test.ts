import type { SupabaseClient } from '@supabase/supabase-js'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  lookupFirebaseIdentity,
  toProfileRow,
  upsertFirebaseProfile,
  type FirebaseIdentity,
} from '../firebaseAuth'

const identity: FirebaseIdentity = {
  uid: 'firebase-uid-1',
  email: 'student@example.com',
  displayName: 'Student',
  photoUrl: 'https://example.com/avatar.png',
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('lookupFirebaseIdentity', () => {
  it('maps a verified Firebase lookup response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        users: [
          {
            localId: identity.uid,
            email: identity.email,
            displayName: identity.displayName,
            photoUrl: identity.photoUrl,
          },
        ],
      }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await expect(lookupFirebaseIdentity('id-token', 'web-key')).resolves.toEqual(identity)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=web-key',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('returns null for missing tokens, failed lookups and unknown users', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    })
    vi.stubGlobal('fetch', fetchMock)

    await expect(lookupFirebaseIdentity('', 'web-key')).resolves.toBeNull()
    await expect(lookupFirebaseIdentity('id-token', '')).resolves.toBeNull()
    await expect(lookupFirebaseIdentity('id-token', 'web-key')).resolves.toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(1)

    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ users: [] }) })
    await expect(lookupFirebaseIdentity('id-token', 'web-key')).resolves.toBeNull()
  })
})

describe('toProfileRow', () => {
  it('maps identity fields into the profiles row', () => {
    expect(toProfileRow(identity, '2026-01-01T00:00:00.000Z')).toEqual({
      firebase_uid: identity.uid,
      email: identity.email,
      display_name: identity.displayName,
      avatar_url: identity.photoUrl,
      updated_at: '2026-01-01T00:00:00.000Z',
    })
  })
})

describe('upsertFirebaseProfile', () => {
  it('upserts on firebase_uid and surfaces Supabase errors', async () => {
    const upsert = vi.fn().mockResolvedValue({ error: null })
    const client = { from: () => ({ upsert }) } as unknown as SupabaseClient

    await expect(upsertFirebaseProfile(client, identity)).resolves.toEqual({ error: null })
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        firebase_uid: identity.uid,
        email: identity.email,
        display_name: identity.displayName,
        avatar_url: identity.photoUrl,
      }),
      { onConflict: 'firebase_uid' },
    )

    upsert.mockResolvedValue({ error: { message: 'permission denied' } })
    await expect(upsertFirebaseProfile(client, identity)).resolves.toEqual({
      error: 'permission denied',
    })
  })
})
