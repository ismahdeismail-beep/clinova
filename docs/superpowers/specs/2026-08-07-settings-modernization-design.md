# Settings Screen Modernization — Design (APPROVED 2026-08-07)

## Goal

Rebuild the Settings screen as a modern, fully responsive grouped-list UI
(iOS/Android-style rows with icons, labels, and chevrons), removing everything
the user deemed irrelevant. Every kept feature must keep working exactly as it
does today.

## Current State

- Single file: `src/screens/SettingsScreen.tsx` (415 lines).
- Sections today: Profile card, Clinical Focus Areas (search + custom-add +
  multi-select grid), Push Notifications toggle, Recent Notifications feed,
  Account (Sign Out), plus a redundant "Save Changes" button.
- Clinical Focus Areas **auto-save** on every toggle (300ms debounce via
  `updatePreferences`) — the manual Save button is functionally redundant.
- Unused imports: `Sparkles`, `BellOff` (plus `Search`, `X`, `PlusCircle`,
  `ChevronRight`, `Save`, `CheckCircle2` become unused after removal).

## Scope Decision (user-approved)

**Keep:** Profile card · Push Notifications toggle · Recent Notifications feed · Sign Out.
**Remove:** Clinical Focus Areas block (search/chips/grid + auto-save effect + `ALL_CLINICAL_SYSTEMS`) · "Save Changes" button + "Saved successfully" flash · all imports/state that only served those (`clinicalInterests`, `searchQuery`, `saved`).

## Design

Consistent with the app's existing header pattern (back arrow + "Settings" title). Content is a vertical stack of rounded-2xl card sections with hairline dividers (`divide-y`); section headers are small uppercase muted labels. All colors come from existing CSS vars (`--surface`, `--border`, `--primary`, `--text`, `--text-muted`, `--destructive`) — fully dark-mode ready via the existing `ThemeContext`; no new theming code.

### 1 · Profile
- One display row: gradient initials avatar (existing logic), name, email (Mail icon), role (Shield icon, capitalized). Not tappable — no edit-profile feature exists.

### 2 · Notifications
- Row "Push Notifications": Bell icon, description ("Browser alerts for drug of the day and reminders"), iOS-style switch on the right. Reuses the existing permission flow (`requestNotificationPermission`, `handleTogglePush` incl. unsupported/denied hints). Hint text renders beneath the row when set.
- Row "Recent Notifications": BellRing icon, unread-count badge on the right, ChevronRight. Tap toggles an inline expandable panel (accordion) containing the existing feed: "Mark all read" (shown when `unreadCount > 0`), notification rows with read/unread styling, `max-h` + scroll, first 10 shown. Chevron rotates when open. Collapsed by default.
  - Inline accordion chosen over a sub-screen: single screen, no new routes.

### 3 · Account
- Row "Sign Out": destructive red text, LogOut icon, existing spinner-while-signing-out behavior.

## Responsiveness (hard requirement)

- Same shell as today: `max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6`.
- Rows: `flex items-center gap-3 px-4 py-3.5 min-w-0` — truncate labels/messages so nothing overflows on narrow screens.
- Switch + badge use `shrink-0`; text containers use `min-w-0 flex-1 truncate`.
- Works at 320px width and desktop without horizontal scroll.

## Untouched

- `AuthContext` (`updatePreferences` stays as the persistence API; `clinicalInterests` remains in userData for Dashboard chips — Dashboard auto-hides its chips section when the array is empty, verified).
- `NotificationContext` (upgraded separately in the notification plan).
- No API/backend changes.

## Acceptance Criteria

1. Settings shows exactly: Profile · Notifications (push toggle + recent feed accordion) · Account (sign out).
2. No Clinical Focus Areas, no Save button, no saved-flash.
3. Push toggle persists permission; hints still show for unsupported/denied.
4. Feed accordion shows unread badge, expands/collapses, mark-all-read works, unread dot styling intact.
5. Sign out works with spinner.
6. Responsive from 320px up; dark mode correct.
7. `npx tsc --noEmit` clean; `npx vite build` succeeds; manual route check on `/settings`.

## Out of Scope

- Notification system architecture (separate plan: `docs/superpowers/plans/2026-08-07-notifications-system-plan.md`).
- Removing `updatePreferences` from AuthContext (zero user benefit, touches auth plumbing).
