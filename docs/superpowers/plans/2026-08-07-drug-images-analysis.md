# Drug Images Analysis — Why They Don't Show, and Fix Plan

**Date:** 2026-08-07
**Status:** Analysis complete — implementation pending user approval
**Scope:** `drug_images` pipeline (crawler → storage → API → client → render)

---

## 1. Goal

The user reports drug images don't render in the app. `DrugIcon` is supposed to show each
drug's **3D structure image** (PubChem/PDB) when available, falling back to a class-colored
monogram. This plan documents the end-to-end audit, the verified live state, the ranked
root-cause candidates, and the fixes to apply.

## 2. Verified Live Evidence (all read-only, run 2026-08-07)

| Layer | Check | Result |
|---|---|---|
| DB coverage | `show-image-progress.mjs` | **1,072/1,072 drugs have images** (3,525 rows) |
| Thumbnail priority | `_verify-thumbs.ts` (anon key) | **790 drugs get a 3D/PDB-priority thumb**, 157 product, 82 2D, 43 generic; RLS allows public SELECT on `drug_images` |
| Schema | `_verify-thumbs.ts` select `drug_id, source, thumbnail_url, large_url, quality_score` | Query succeeds — no column drift |
| Storage URLs | `_audit-urls.ts` (300 storage + 80 external sample) | **306/306 storage thumbs → 200**. 74 non-200 = all `upload.wikimedia.org` **429 rate-limits** (external-URL legacy rows, ~273 total) |
| Deployed API | `GET /api/drugs/fd3d1349-…/images` on `clinova-main-jmw8l3wnc-…` (e19255b, PROMOTED) | **200**, returns all 4 rows, PubChem 3D conformer first |
| Client bundle | grep deployed chunks | `VITE_SUPABASE_URL` inlined (`bveztrtykjburdhewcdy` present); `DrugIndexScreen-vD_mUn0r.js` contains `thumbnail_url`, `ribbon`/`quality_score` priority logic (identical size 144,381 B to local build) |
| Headers | `curl -sI` deploy | **No CSP** blocking `img-src`; `Cache-Control: public, max-age=0, must-revalidate` |
| PWA | `sw.js` fetch + `vite.config.ts` | Current SW precaches current chunks; `registerType: 'autoUpdate'`, `skipWaiting`, `clientsClaim`, `cleanupOutdatedCaches` — self-heals on deploy |
| Components | `DrugIcon.tsx` (97 lines) | Correct: renders `thumbnailUrl` with `onError` → monogram fallback; sizes sm/md/lg |
| Service | `drugMonograph.service.ts` `loadThumbnails()` | 3D-first priority derived from `source` string; session-cached; paginates correctly |

## 3. Root-Cause Candidates (ranked)

1. **Stale browser/PWA cache (most likely for "no images anywhere").** The thumbnail
   pipeline is *new* — `06620e7` (monogram tiles + `DrugIcon`) and the KDI thumbnail wiring
   landed in the last deploys. A browser holding a pre-`06620e7` bundle (or a PWA install
   from before) shows monograms/no images until the SW updates. `autoUpdate` self-heals but
   only on a fresh page load after the deploy; installed-PWA users can sit on the old bundle.

2. **External Wikimedia URLs as stored thumbnails (273 rows) → 429 in-browser.** Legacy
   crawler rows (e.g. Allopurinol `b386bc1f…`) store `upload.wikimedia.org` as
   `thumbnail_url`/`image_url`. Wikimedia rate-limits unauthenticated browsers → broken
   images in the gallery grid → `ImageOff`/monogram. Storage copies of the same image exist
   and 200 fine — the tie-break doesn't prefer them.

3. **`mapRow()` never attaches `thumbnail_url`.** `getUserMonographs()`, `getById()`,
   `getByName()`, `search()`, `getByDrugClass()`, `getAll()` map rows through `mapRow()`
   (L145–171) which does **not** set `thumbnail_url` — only `getCatalog()` and
   `attachThumbnails()` (used by `getAll`/`search`/`searchByIndication`/`getByDrugClass`) do.
   Consequence: **Saved Monographs panel** (`SavedMonographsPanel.tsx` L170 passes
   `item.monograph?.thumbnail_url`) always renders monograms.

4. **Monogram fallback *looks* like "no images".** 282/1,072 drugs have no 3D render
   (priority 1–3) — those intentionally show photos or monograms. If the user expects a
   structure for every drug, 282 monograms look like failures.

## 4. Fix Plan (phased — no crawler/DB changes needed; data is complete)

### Phase 1 — Attach thumbnails everywhere `mapRow` is used (high value, low risk)
- `src/services/drugMonograph.service.ts`:
  - `mapRow()` — add `thumbnail_url: row.thumbnail_url ?? ''` passthrough, and
  - `getById()` / `getByName()` — attach via the thumbnail map (`getDrugThumbnail`) so
    monograph flows opened outside the KDI grid still show the 3D image.
  - `getUserMonographs()` — attach thumbs to `items[].monograph` (fixes Saved Monographs).
- Files: `src/services/drugMonograph.service.ts` (**user WIP — needs approval**),
  `src/components/SavedMonographsPanel.tsx` (verify only).

### Phase 2 — Prefer storage URLs over rate-limited external URLs
- `loadThumbnails()` tie-break: when equal priority, prefer a URL from the app's Supabase
  storage origin (`…/storage/v1/object/public/medicine-images/…`) over
  `upload.wikimedia.org` (429-prone in browsers).
- `MedicineImageGallery.tsx` lightbox/grid: prefer `blobUrl || thumbnail_url`, and in
  `onError`, fall back to `large_url`/`medium_url` (storage variants) before marking failed.

### Phase 3 — PWA freshness hardening (cheap insurance)
- Bump `cacheId: 'clinova-app-v1'` → `'clinova-app-v2'` in `vite.config.ts` so any stale
  precache is discarded immediately on next visit.
- Confirm `UpdateManager.tsx` calls `updateSW(true)` (reload on new version) — add if not.

### Phase 4 — Verification (per Iron Law, fresh evidence before any claim)
- `npx tsc --noEmit` → `npx vite build` (timeout 900000 ms) → explicit `git add` (never
  `-a`; never sweep user WIP) → commit → push → poll Vercel READY → live-verify:
  - chunk contains `thumbnail_url` + `ribbon` logic;
  - `GET /api/drugs/<id>/images` → 200;
  - sample storage thumb → 200; sample external thumb → now falls back to storage.
- Bump SW cacheId verified via `sw.js` fetch on the new deploy.

## 5. Explicitly Out of Scope / Do Not Touch
- `server.ts`, `src/services/crawler/*`, `scripts/*`, `CHANGELOG.md` — user WIP, read-only.
- No DB writes, no re-crawl, no storage changes — data is already 100% covered and live.
- No `git commit -a`.

## 6. Decision Needed
- Approve Phases 1–2 (touch `drugMonograph.service.ts`, user WIP)? If yes, execute
  Phases 1–4 in one pass. If no, ship only Phases 2–3, or stop here.
