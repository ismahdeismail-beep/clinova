-- The live project already had public.profiles before migration
-- 20261126095000, so that migration's CREATE TABLE IF NOT EXISTS was a no-op
-- there. Align the Firebase profile mirror with the live schema: the avatar
-- column is `avatar_url`, not `photo_url`. Both statements are no-ops when the
-- live schema is already aligned, and no RLS policies are changed.

alter table public.profiles add column if not exists avatar_url text;

create index if not exists idx_profiles_firebase_uid on public.profiles (firebase_uid);
