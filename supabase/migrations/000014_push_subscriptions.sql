-- Push notification subscriptions (web-push / VAPID).
-- NOTE: user_id is the FIREBASE uid (the app's primary identity — Supabase Auth
-- sessions do not exist for app users). RLS is enabled with NO policies:
-- deny-by-default for direct client access. All reads/writes go through the
-- Express API (service role), which verifies a Firebase ID token per request.

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      text NOT NULL,                    -- Firebase uid
  endpoint     text NOT NULL UNIQUE,             -- push endpoint (unique per device)
  p256dh       text NOT NULL,                    -- subscription keys.p256dh (base64url)
  auth         text NOT NULL,                    -- subscription keys.auth (base64url)
  created_at   timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user ON push_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_endpoint ON push_subscriptions(endpoint);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Deliberately NO policies: the table is only reachable via the server API.
-- Direct anon/authenticated supabase-js access is denied by default.
