# Clinova UI / UX Simplification — TODO

## Definition of Done

The app is understandable at a glance: one navigation model, one obvious place for
every feature, no duplicated or conflicting entry points.

---

## Done — 2026-10-06 (navigation)

- [x] **One navigation model**: the sidebar and the bottom nav now render the exact same
      list, `PRIMARY_NAV` in `src/data/navigationConfig.ts` — Home, Learn, Drugs, Cases,
      More. They no longer diverge (previously the sidebar had 6 items + Settings while
      the bottom nav had 4 different ones, and Home was missing from the sidebar).
- [x] **Everything secondary lives behind one "More" screen** (`/more`, `src/screens/MoreScreen.tsx`):
      Care Plan, Clinova Support, Library, Industry, Settings, plus Image Manager for
      admins — each with a one-line description, then the user card and Sign Out.
      `/library` previously had no navigation entry at all.
- [x] **Top bar trimmed**: removed the "Clinova Support" pill. It is now logo, search,
      theme toggle, notification bell and avatar only.
- [x] **Single source of truth**: `PRIMARY_NAV` / `MORE_NAV` are the only nav definitions;
      `BottomNav`, the sidebar and `MoreScreen` import them.
- [x] Docs updated (`.opencode/project-context.md` nav sections + `MoreScreen` reference).
- [x] Verified: `npm run lint` (tsc), `npx eslint .`, `npm test` (6/6), `npm run build`.

## Done — 2026-10-06 (KDI opening screen)

- [x] **Drug Index opens on its modules only**: `/drugs` now renders just the KDI heading and
      the three module cards (Monographs, My Library, Interactions) — the global search bar,
      quick-search tags and category browse grid no longer show on the landing screen. Those
      moved into the Monographs module, under the module tab bar.
- [x] **No dead ends inside the KDI**: an "All modules" back link above the tab bar returns
      to the hub from any module; the tab bar switches modules.
- [x] **Deep links still work**: `/drugs/class/:category`, `/sub/:subclass` and `/drugs?q=…`
      now auto-enter the Monographs module instead of landing on the hub with content hidden.
- [x] Verified: `npm run lint` (tsc), `npx eslint .` (0 errors), `npm test` (6/6), `npm run build`.

## Open

- [ ] Unify in-page navigation: EducationHub tabs, DrugIndex breadcrumbs and Dashboard hub
      cards should use the same labels/icons as `PRIMARY_NAV`.
- [ ] Dashboard: reduce competing cards/sections to one primary call to action.
- [ ] No dead ends: every nested screen must have a visible back affordance.
- [ ] One page-header pattern (title + subtitle + back button) across all screens.
- [ ] Empty states: every list/grid says what it is and offers a single next action.
- [ ] Mobile audit: ≥44px hit targets, no horizontal scroll, legible bottom-nav labels.
