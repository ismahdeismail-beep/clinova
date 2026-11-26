-- Phase 4 — Firebase is the sole authentication authority.
-- Supabase Auth is not used by app clients, so `auth.uid()`/`auth.role()`
-- can never identify a Clinova user. Profiles are mirrored from verified
-- Firebase ID tokens by the server's service-role client instead.
--
-- RLS is enabled with deliberately NO policies: anon/authenticated clients
-- cannot read or write profiles; all access goes through server endpoints.

create table if not exists public.profiles (
  firebase_uid text primary key,
  email text,
  display_name text,
  photo_url text,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create index if not exists idx_profiles_email on public.profiles (email);
