-- Per-user notification feed (Phase 3 of the notifications system).
-- user_id is the FIREBASE uid (text), same convention as push_subscriptions.
-- RLS is enabled with NO policies (deny-by-default): all reads/writes go
-- through the Express API (service role), which verifies a Firebase ID token
-- per request. Realtime via postgres_changes is not used (it respects RLS);
-- the client polls GET /api/notifications instead.
--
-- dedupe_key lets the daily cron insert one Drug-of-the-Day row per user per
-- day idempotently (UNIQUE (user_id, dedupe_key)); client-generated rows leave
-- it NULL, and Postgres treats NULLs as distinct in unique indexes so they
-- never collide. The index is deliberately non-partial so the server's
-- upsert ON CONFLICT (user_id, dedupe_key) can infer it.

CREATE TABLE IF NOT EXISTS notifications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    text NOT NULL,
  type       text NOT NULL DEFAULT 'info',
  title      text NOT NULL,
  message    text NOT NULL,
  link       text,
  icon_name  text,
  color      text,
  bg         text,
  read       boolean NOT NULL DEFAULT false,
  dedupe_key text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_created
  ON notifications (user_id, created_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS idx_notifications_user_dedupe
  ON notifications (user_id, dedupe_key);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Deliberately NO policies: the table is only reachable via the server API.
-- Direct anon/authenticated supabase-js access is denied by default.
