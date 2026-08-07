# Fully-Functional Notifications System — Plan (DRAFT for approval)

## Current State Assessment (verified 2026-08-07)

Everything is **client-side only** today — nothing survives app closure, nothing syncs across devices:

1. **In-app feed**: `NotificationContext` holds notifications in React state, persisted to `localStorage` (`clinova_notifications`). Seeded with 3 hardcoded welcome notifications + one-time `FEATURE_ANNOUNCEMENTS` injection (`clinova_seen_announcements`).
2. **Browser notifications**: `addNotification()` calls `new Notification(...)` — fires **only while the app is open**. There is no Service Worker push handler (PWA uses vite-plugin-pwa **generateSW**, which cannot host custom code).
3. **Drug of the Day**: a 60s `setInterval` checks if EAT time is exactly 08:00 — only works if the app is open on that device at that minute. Fragile and per-device.
4. **Medication reminders**: `scheduleMedicationReminder()` is a `setTimeout` with **zero callers** — dead code.
5. No `web-push` dependency; no push/VAPID code in `server.ts`; no `crons` in `vercel.json`; single serverless Express function (`api/index.ts`).

## Goal

Real push notifications that work **when the app is closed**, a feed that is **per-user and synced across devices** (Supabase, per AGENTS.md architecture), a scheduled daily Drug of the Day push at 08:00 EAT, correct permission flows, and removal of dead/legacy notification code.

## Architecture

```
Client (PWA)
  ├─ injectManifest SW (src/sw.ts): 'push' + 'notificationclick' handlers,
  │    precache via self.__WB_MANIFEST, cleanupOutdatedCaches (replaces generateSW)
  ├─ NotificationContext v2:
  │    pushManager.subscribe({userVisibleOnly, applicationServerKey: VAPID_PUBLIC})
  │    POST /api/push/subscribe (JWT-authed) → upsert subscription
  │    POST /api/push/unsubscribe on revoke/logout
  │    Feed from Supabase `notifications` table (user-scoped) + realtime
  └─ Settings: push toggle drives subscribe/unsubscribe; feed accordion unchanged

Server (Express in api/index.ts)
  ├─ POST /api/push/subscribe   — verify Supabase JWT → upsert {user_id, endpoint, p256dh, auth}
  ├─ POST /api/push/unsubscribe — remove by endpoint
  ├─ POST /api/notifications/read-all — mark feed rows read (user-scoped)
  ├─ POST /api/push/daily       — cron-guarded; computes Drug of the Day;
  │     sends web-push to all rows in push_subscriptions; creates feed rows;
  │     prunes dead endpoints (410/404 responses)
  └─ web-push lib + VAPID keys from env (VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY,
       VAPID_SUBJECT, PUSH_CRON_SECRET)

Supabase
  ├─ table push_subscriptions: id uuid pk, user_id uuid (FK users, indexed),
  │    endpoint text unique, p256dh text, auth text, created_at, last_seen_at
  │    RLS: select/delete own row (auth.uid() = user_id); insert with user_id = auth.uid()
  ├─ table notifications: id uuid pk, user_id uuid, type, title, message, link,
  │    icon_name, color, bg, read bool, created_at
  │    RLS: select/update own rows; insert via service role (server) or own user_id
  └─ realtime enabled on notifications for authenticated inserts

Vercel
  └─ vercel.json "crons": [{ "path": "/api/push/daily", "schedule": "0 5 * * *" }]
       (05:00 UTC = 08:00 EAT); endpoint requires X-Push-Cron-Secret header == PUSH_CRON_SECRET
```

## Phases

### Phase 1 — Service worker upgrade (PWA)
- Switch vite-plugin-pwa from `generateSW` to `injectManifest` with `src/sw.ts`.
- `sw.ts`: `import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'; precacheAndRoute(self.__WB_MANIFEST); cleanupOutdatedCaches();` + `self.addEventListener('push')` (showNotification with icon/link data) + `notificationclick` (focus/open target URL).
- Verify: local build emits sw.js containing push handlers; offline precache still works; app loads via sw.

### Phase 2 — Subscription plumbing (client + server)
- `npm i web-push`; generate VAPID keys; add env vars (local `.env` + Vercel).
- `POST /api/push/subscribe` / `unsubscribe` in `server.ts` with Supabase JWT verification (same pattern as existing authed routes).
- NotificationContext v2: on toggle-on → `Notification.requestPermission()` → `pushManager.subscribe()` → POST subscription; on toggle-off/revoked → unsubscribe; on app start → check existing permission + pushManager state.
- Supabase migration: `push_subscriptions` table + RLS.
- Verify: toggle in Settings creates a subscription row; revoked permission cleans it up.

### Phase 3 — Synced feed (Supabase replaces localStorage)
- Migration: `notifications` table + RLS + realtime.
- NotificationContext v2 reads feed from Supabase (with localStorage cache fallback for offline); inserts welcome notification on first login (server-side via service role, or client once per user).
- Remove: hardcoded `DEFAULT_NOTIFICATIONS`, `FEATURE_ANNOUNCEMENTS` mechanism, `clinova_seen_announcements`, localStorage-only feed.
- Verify: notification created on one device appears on another (realtime); mark-read syncs.

### Phase 4 — Daily scheduled push (Vercel cron)
- `POST /api/push/daily`: guard with `X-Push-Cron-Secret`; compute Drug of the Day (same day-of-year index logic moved server-side, using Supabase drug list); create feed row per user; send web-push to all valid subscriptions; prune 410/404 endpoints.
- `vercel.json` crons entry; env: `PUSH_CRON_SECRET`.
- Verify: manual authenticated curl to the endpoint delivers a push; cron fires at 05:00 UTC.

### Phase 5 — Cleanup + verification
- Remove `scheduleMedicationReminder` from context + interface (zero callers).
- Remove old client-side Drug-of-the-Day interval (superseded by cron push; the in-app check stays only if desired — recommendation: remove, feed comes from server).
- Full verify battery: `npx tsc --noEmit`, `npx vite build`, `npm run build` (esbuild), live checks (sw.js has push listener, subscribe endpoint 200, cron endpoint guard works), commit → push → deploy.

## Security / Decisions

- VAPID keys never exposed to client (only VAPID_PUBLIC in the Vite env); private key server-side only.
- Cron endpoint protected by shared secret header (Vercel cron + secret is the documented pattern).
- RLS ensures users can only read/update their own feed + subscriptions.
- **Vercel Hobby plan**: crons run at most once per day and only with daily schedules — `0 5 * * *` is fine. If the project is on Pro, minute-level scheduling is available.
- iOS Safari: push requires the app be added to Home Screen (PWA install); in-app feed still works regardless.

## Out of Scope (YAGNI)

- Per-user notification preferences (topic filters, quiet hours) — add later if requested.
- Analytics/tracking of push engagement.
- Push for medication reminders (no caller today; if a reminder feature ships, it reuses this pipeline).
