## 2026-10-06

### Fixed

- **AI/library routes were never registered on Vercel (and local prod): route-ordering bug** — the whole `CLINOVA ACADEMIC ENGINE` block (through oral practice) plus `/api/library/crawl|crawl-many|search` was declared **inside** `startServer()`, which is skipped entirely when `VERCEL=1`. Production deployments therefore never served `/api/gemini/module-tutor|case-tutor|generate-full-case|hub-tutor`, `/api/gemini/oral-practice/*`, `/api/ai/skills`, `/api/ai/orchestrate` or `/api/library/*` — even though the SPA calls `hub-tutor` and all three library routes. These routes are now registered at module level; `startServer()` only wires Vite/static assets, the SPA fallback and `listen`.
- **`/api/ai/skills`, tutor and oral-practice routes returned 404 in dev** — the JSON API 404 catch-all was registered before them (they lived inside `startServer`), so it shadowed every one of them. With the routes hoisted to module level the ordering is correct. Verified live: `/api/ai/skills` 200, tutor/library validation 400s, SPA routes 200, unknown `/api/*` JSON 404, plus `tsc --noEmit`, vitest 6/6 and the production build.
- **Backend API error/validation consistency pass (audit Phase 9)**: unmatched `/api/*` requests now return JSON `{ error: 'Not found' }` instead of Express' HTML 404 (matters on Vercel, where every `/api/*` rewrite lands in Express); a centralized error handler normalizes malformed JSON bodies (400 `Invalid JSON body`), oversized payloads (413) and multer failures (400) into the same `{ error }` envelope used by every route, and 5xx responses no longer leak raw internal messages. Input validation added: `POST /api/admin/config` whitelists load-balancing modes (`Priority|Weighted|Latency|Cost|Health|RoundRobin`) and the provider override, `PUT`/`DELETE /api/admin/clinical-cases/:id` require a UUID, and `POST /api/upload/chunk` validates `uploadId` (charset/length) plus chunk indices — closing a path traversal that could write chunk files outside `uploads/` and `rmSync` the project root from the failure-cleanup path. Verified live with curl, `tsc --noEmit`, vitest and the production build.

### Changed

- **Backend audit: `/api/gemini/*` routes are in use, not legacy** — the SPA calls 7 of them via relative paths (`search-drug`, `generate-unit-summary`, `hub-tutor`, `generate-unit-flashcards`, `generate-unit-quiz`, `assistant`, `assistant/stream`), so the "remove unused endpoints" TODO is closed as confirmed-necessary (`BACKEND_AUDIT_TODO.md`).

## 2026-08-09

### Added

- **Exam Prep — 3-paper minimum coverage across all 33 units (99 papers)**: a comprehensive gap-fill brought every exam-prep unit to the 3-paper standard (was 72 papers, 32/33 units). 24 units were filled — 23 generated via Mistral (`scripts/generate-old-extras.ts`) plus a hand-written `pharm-veterinary` v1 — and 3 real second-sitting papers were curated (PHAM 3306 July 2019, PHAM 5111 Special, PHAM 5112 regular via `scripts/fix-second-sittings.mjs`). `scripts/merge-papers.ts` now preserves ALL old variants while merging `scripts/out/old-extras/*.json`; `getPaperCount` is fully variant-derived (3→2→1→0) and `ExamPrepScreen` renders `Array.from({ length: getPaperCount(unit) })`. Verified: 33/33 units, 99 papers, 0 issues (`npx tsx scripts/validate-papers.ts`).
- **Board Exam Prep — 5 prediction sets (sets 4 & 5, 60 new questions → 151 total)**: Set 4 "Clinical Case Scenarios & Patient Cases" (30 Qs, `ppb-*-091..120`) and Set 5 "Regulatory, Practice & Grand Review" (30 Qs, `ppb-*-121..150`) appended to `src/data/boardExams.ts`. `BoardExamScreen` SET_INFO now carries literal Tailwind classes (`bg-blue-500/15`/rose) via `SET_NUMBER`; set-grid is `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (5 cards: 3+2) and the set-count chip derives `{SET_INFO.length} Prediction Sets` (was hardcoded "3").
- **Exam Prep — curriculum tracks (Traditional vs Revised)**: `ExamModuleSpec` gains `tracks` (Traditional = verbatim past papers incl. Pharmacology I–XIV + Clinical Pharmacy I–XI; Revised = standard-format mock papers with PHAM codes), with track-first routing `/knowledge/exam/prep/:moduleId/:trackId/:unitId/:variant` plus legacy-URL fallback. Old units got Kabarak-aligned `year`/`trimester` placement metadata (Y3T1→Y5T3) and `pharm-veterinary` (Pharmacology XIII) was registered with topics. All counts derived at render time.

### Fixed

- **Responsive exam layout**: paper headers no longer squeeze and content fits screens at all widths.

## 2026-08-08

### Fixed

- **KDI endless loading**: `getCatalog()` now has a 10s fetch timeout and the thumbnail loop was cut from 80 to 20 pages so a stalled Supabase catalog response can no longer hang the Drug Index forever.
- **Vercel cron config**: `vercel.json` cron entries dropped unsupported `method`/`timezone` properties (deploy validation errors) and the daily Drug-of-the-Day push now takes the secret as a query param (`?secret=…`) because Vercel crons don't send headers — `POST /api/push/daily` verifies it before computing the Drug of the Day and pushing.

## 2026-08-07

### Added

- **Per-user synced notification feed (Phase 3)**: the in-app feed now lives in a new Supabase `notifications` table (RLS deny-by-default, server API only — same model as `push_subscriptions`) instead of `localStorage`. New endpoints: `GET /api/notifications`, `POST /api/notifications` (create), `/read`, `/read-all`, and `/welcome` (idempotent per-user onboarding rows). `NotificationContext` hydrates from the feed on login, refreshes on window focus + a 60s poll, keeps `localStorage` only as an offline cache, and persists client-created notifications (medication reminders) to the feed so they sync across devices.
- **Daily Drug-of-the-Day push completes (Phase 4)**: `POST /api/push/daily` (Vercel cron `0 5 * * *` = 08:00 EAT, guarded by `PUSH_CRON_SECRET`) now computes the Drug of the Day server-side (day-of-year index over `drug_monographs` — no more 1,000-row cap issue), writes one feed row per user per day (deduped via `user_id` + `dedupe_key`), pushes to every valid subscription, and prunes dead endpoints (404/403/410).

### Changed

- Removed the client-side Drug-of-the-Day 60s interval and the `DEFAULT_NOTIFICATIONS` / `FEATURE_ANNOUNCEMENTS` / `clinova_seen_announcements` mechanism — onboarding rows come from the server (`/welcome`, once per user), and the daily spotlights come from the cron.
- `scheduleMedicationReminder` is **kept** (the plan assumed zero callers, but `PatientQuickSummary` schedules medication-administration reminders through it — they now also persist to the server feed when signed in).

## 2026-08-06

### Fixed

- **Image-coverage reporting was wrong (100% → looked like 28%)**: `scripts/show-image-progress.mjs` and `drugImageService.getImageStats()/getMissingDrugs()` used `.limit(5000)` / `.limit(10000)`, which PostgREST silently caps at 1,000 rows — so the tools reported ~304/1,072 drugs covered when the real figure is **1,072/1,072 (3,525 rows)**. All three now paginate with `.range()`; the admin stats endpoint returns correct totals (3,525 images, 1,072 unique drugs).
- **Admin Image Manager re-wired (was 100% broken)**: commit `0233100` removed the `/api/admin/images/*` endpoints but left `MedicineImageManager` + `AdminImageManagerScreen` orphaned and calling eight endpoints that 404'd (stats, missing, schedule, report, crawl, refresh, verify, delete, reindex). The endpoints are restored in `server.ts` behind the existing `requireAdmin` guard, and the `/admin/images` route is back in `App.tsx`.
- **`GET /api/admin/images/report` crashed with "require is not defined"**: `schedulerService.getCrawlReport()` used CJS `require` in an ESM bundle — now ESM `fs`/`path` imports.
- **Thumbnail quality tiebreak**: `loadThumbnails()` prefers the higher-`quality_score` image within the same source tier, so weak generic photos (score 0.5) no longer win over clean structure renders of the same tier.
- **Drug icons for every drug (incl. broken/absent images)**: new `DrugIcon` component renders the real gallery image when present and falls back to a deterministic class-colored monogram tile otherwise; used across the KDI grid/suggestions, monograph header, saved library and gallery empty state, with `onError` fallback for dead URLs.

### Audit (Aug 2026 image pipeline)

- Data: **100% coverage** — 1,072/1,072 monographs have ≥1 image (3,525 rows); no orphan `drug_id`s, no true duplicate rows, all Supabase-storage URLs return 200 (external Wikimedia URLs are valid; they return 429 to this IP only due to rate limiting).
- Data quality gaps (not blocking): `strength` empty in all 3,525 rows; `dosage_form` missing/`unknown` in ~75% of rows (structure renders predominate — not derivable from filenames); 284 rows score <65 (weak generic photos — kept as last-resort); `verified` never set (verify workflow previously unreachable — now restored).
- Tooling: `scripts/_audit-urls.ts` added — bounded URL-liveness checker for `drug_images` thumbnails.

## 2026-08-05

### Added

- **Pharmacology subclass layer in the Kenya Drug Index**: every browse category now breaks down into ATC-style subclasses (Anti-infectives → Penicillins / Cephalosporins / Carbapenems / Macrolides / Antimalarials…, Cardiovascular → ACE inhibitors / Beta-blockers / Statins…, etc.) via a new `src/lib/drugSubclass.ts` keyword engine mirroring `drugCategory.ts`. Subclass chips with live counts (derived at render, never hardcoded) filter the drug grid, the breadcrumb reads "Drug Index › Category › Subclass", and each card shows its subclass badge. `scripts/audit_subclasses.ts` classifies all 1,072 drugs with a 0% "Other" rate.
- **Fixed category routing**: antiretrovirals/carbapenems (dolutegravir, meropenem, remdesivir…) now classify as Anti-infectives, antihistamines as Respiratory, and ophthalmic drops before systemic corticosteroids so eye preparations land under Ophthalmology.

### Fixed

- **Scoped "search within class" now actually filters**: typing in the in-category search bar previously updated the query but the grid ignored it; it now composes with category, subclass and A–Z filters.
- **Live site showing the old build (missing drug icons/subclass chips)**: the Vercel project had Deployment Protection (Vercel Authentication) set to `all_except_custom_domains`, which auth-walled every `*.vercel.app` URL and left the production alias serving a stale edge-cached HTML from a pre-image-pipeline deployment. Fixed on the Vercel side: protection is now preview-only, and a fresh production deployment from `main` (`78b562f`) was pushed so the alias serves the current build (verified: new `drugMonograph.service` chunk contains the `drug_images` pipeline, `DrugIndexScreen` chunk contains the subclass UI, and `sw.js` now precaches the new hashes with `skipWaiting` so existing service workers self-update).
- **PWA not installable — "Install app" prompt never appeared**: the three manifest icons (`public/pwa-192x192.png`, `public/pwa-512x512.png`, `public/apple-touch-icon.png`) were 852 KB files that were actually JPEG bytes with a UTF-8 BOM misnamed `.png`, so Chrome's installability check (which requires valid PNG icons) failed and `beforeinstallprompt` never fired. All icons were regenerated as genuine PNGs (192×192 / 512×512 / 180×180 apple-touch-icon, plus a new 512×512 **maskable** variant padded for the safe zone) from the real `clinova_logo.jpg`, the manifest now lists proper PNG entries with `purpose: any`/`maskable`, `index.html` points favicon + apple-touch-icon at the real files, and the service worker precaches every icon for offline installs.
- **Notification fixes**: browser push notifications used a broken `/vite.svg` icon (file doesn't exist) — now uses the real `pwa-192x192.png`. Removed the page-load `Notification.requestPermission()` call that modern browsers silently ignore (permission is only requested on the user gesture in Settings). The Settings push toggle now explains "blocked in browser settings" / "not supported" instead of failing silently, and notification state is persisted via the effect (not inside state updaters).
- **Enrichment pipeline depth (scripts)**: `enrich-monographs.ts` now falls back to the `clinical_pharmacology` section for old SPL-format labels that store PK there, retries OpenFDA with a `pharmacokinetics:[* TO *]` filter to skip OTC Drug-Facts labels, and pulls warnings from `warnings` → `warnings_and_cautions` → `precautions` (fixed a truthiness bug where the fallback chain never triggered). `monographToMarkdown.ts` strips numbered `CLINICAL PHARMACOLOGY` headers the same way, keeping exports consistent. New maintainable scripts: `seed-drug-gap.ts` (seeds bundled catalogue drugs missing from Supabase), `refill-parallel.ts`/`refill-worker.ts` (parallel image-crawl refill with per-drug state), `cleanup-pk.ts`, `fill-curated-moa.ts`, `extract-new-drugs.mjs`.

## 2026-08-04

### Added

- **Auto-update on deploy**: the app now checks for a freshly deployed build every 15 minutes (and whenever the tab regains focus/visibility) and, when an update is found, posts an "update" notification then auto-refreshes to apply it — no manual reload needed. The old flow only checked at page load and reloaded silently.

## 2026-08-03

### Added

- **849 new 3D/2D structure icons**: 697 drugs got PubChem 3D conformer renders + 152 got 2D skeletal structures (salt-stripping fallback + CID-to-parent fallback for compounds like Ertapenem Sodium where the salt CID lacks a 3D render). Total structure icons: 929/1072 drugs. Remaining 135 are biologics (mAbs) that keep their PDB ribbon or photo icons.
- **Fast KDI catalog load**: `getCatalog()` fetches only the fields needed for the browse grid (name/class/content flags) with thumbnails loaded in parallel — no more waiting for full monograph text fields at startup.

### Fixed

- **Navigation returns to where you came from**: KDI `closeView` is now layered — closing a monograph returns to its category or search results (not Level 1); the pushed history entry is only popped when closing the layer that owns it, so browser back works correctly through nested views.
- **ClinovaSupport back button**: returns to the previous page via `navigate(-1)` instead of always navigating to dashboard (`navigate('/')`). Same fix applied to AdminImageManager.
- **Drug icon prominence**: monograph header icon enlarged (w-14 h-14 sm:w-16 sm:h-16, rounded-2xl, border-2, shadow-md); KDI grid DrugThumb enlarged (w-12 h-12); packaging photos ranked above 2D skeletal in `thumbPriority` so the icon shows the actual drug name when possible.

### Added

- **Second-source drug images — 100% coverage**: monographs with no Wikimedia/DailyMed photos are now filled from NIH PubChem (2D + 3D structure renderings), RCSB PDB/PDBe (ribbon structures for biologics, falling back to the drug's binding target e.g. Alirocumab→PCSK9), Wikipedia REST lead images, plus 8 images extracted from the B.Pharm pharmacology lecture notes. **1,072/1,072 monographs now have images** (2,542 rows: 1,676 Wikimedia, 616 DailyMed, 147 PubChem, 28 Kenyan brands, 25 PDB/PDBe, 14 Wikipedia, 8 lecture notes).
- **Real FDA indications**: the generic "Management of … as per approved indications" template on **346 monographs replaced with real FDA `indications_and_usage`** parsed from OpenFDA (50 skipped — no FDA label on file).
- **Simplified therapeutic classification**: 40 `drug_classes` renamed to short scannable names ("Aminoglycoside antibiotic", "Benzodiazepine", "Statin"…); the verbose detail moved to the `description` column. The UI now prefers the specific class name over the root category.
- **3D structure icons in the Drug Index**: every drug card and search suggestion shows its best image as an icon — 3D structures preferred (PubChem conformers / PDB ribbons), then 2D structures, then product photos.
- **Class colors everywhere**: the 16 root therapeutic classes + 44 granular class names added to the color map — no drug class badge renders grey anymore; in-class drug cards get the category's colored wash and hover tint.

### Fixed

- **Flickering / stale counts**: landing and dashboard stat cards render a skeleton while the live Supabase counts load (no fallback-number flash), the KDI category grid shows skeleton cards instead of bundled-seed counts, and cached stats expire after 24h so stale numbers never reappear.
- **Hardcoded support-screen numbers**: "1000 monographs", "1,100+ simulations" and "92 NANDA/NIC/NOC" quick-nav descriptions now derive from live data.

### Fixed (earlier same day)

- **Enrichment columns lost in a failed type migration**: an attempt to convert `clinical_pearls` (text) and `pharmacokinetics` (jsonb) to the interface types ended up dropping both columns. Re-added with the correct types (`text[]`, `text`) and regenerated all data — **440/440 monographs now carry MOA, pharmacokinetics, overdose, pregnancy category and clinical pearls** (was 22%/19%/19%/19%/0%).
- **Gap-fill pass clobbered seed contraindications**: a placeholder-first-item regex replaced richer multi-item contraindications with a single FDA item that failed the content audit's 2-item bar. Restored 62 rows from the seed batch files (`scripts/restore-core-seeds.ts`) and made the gap-fill only touch fields below the audit's quality bar.
- **FDA label search returning the wrong drug**: several monographs picked up a different drug's label (Artemether–Lumefantrine → olanzapine, Rifampicin → clarithromycin, N-acetylcysteine → oxycodone/paracetamol, Thiopental → lidocaine, Benzyl Benzoate → Dove deodorant, Dextrose → ACD anticoagulant). Replaced with accurate mechanisms and added a mechanism-like guard so the `description` section (excipients/appearance) is never used as MOA.
- **Placeholder text counted as real content**: `"Mechanism of action for X. Refer to current…"` satisfied the hasReal check, so FDA's real MOA never overwrote it. The enrich/gap-fill scripts now treat "refer to current prescribing information" boilerplate as empty.

### Changed

- **Monographs are now colour-coded and bulleted for faster scanning**: MOA renders as a "How it works" callout plus mechanism bullets with key verbs bolded (inhibits, binds, blocks…); pharmacokinetics renders as structured ADME bullets (curated rows) or graceful pending notes; every section gets a distinct emoji header (⚙️ MOA, ⏱ PK, 🎯 Indications, ⛔ Contraindications, 🚨 Black Box, 💊 Dosage, ⚠️ Warnings, 😖 Adverse Effects, 💎 Clinical Pearls) so sections are easy to spot while reading.
- **Each therapeutic class now has its own icon** instead of the same pill everywhere: 🦠 Bug (Anti-infectives), HeartPulse (Cardiovascular), Brain (CNS), Utensils (GI), Gauge (Endocrine), Wind (Respiratory), Droplets (Anticoagulants), Ribbon (Oncology), Shield (Immunology), Hand (Dermatology), Filter (Renal), Apple (Nutrition), Moon (Anaesthesia), Eye (Ophthalmology), FlaskConical (Toxicology).

### Added

- `scripts/enrich-monographs.ts` — resumable FDA-first enrichment of all 8 enrichment fields + missing core fields (state in `storage/enrich_state.json`).
- `scripts/gapfill-partials.ts` — targeted gap-fill for PARTIAL monographs, fills only fields below the audit quality bar with real FDA label content.
- `scripts/restore-core-seeds.ts` — restores core array fields (CI/interactions/SE/indications) from the seed batch files when the live value is placeholder-ish.
- `scripts/audit-monograph-content.ts` — scores all content fields and classifies each monograph FULL/PARTIAL/THIN/EMPTY.
- `supabase/migrations/000013_fix_monograph_column_types.sql` — correct column types for `clinical_pearls`/`pharmacokinetics`.

## 2026-08-02

### Fixed

- **Zero-image drugs refilled**: 27 monographs (Paracetamol, Aspirin, Amoxicillin, Fluconazole, etc.) left empty by the earlier cleanup-refill re-crawl were re-crawled; **440/440 drugs now have images** (1,826 total: 1,572 Wikimedia, 152 DailyMed, 73 structure, 29 Kenyan-brand).
- **Kenyan-brand matcher matched combo drugs**: `amoxicillin/clavulanate` normalized to `amoxicillin clavulanate` and passed the word-boundary check, so plain-amoxicillin Kemoxyl packaging landed on both co-amoxiclav monographs. Added a `COMBINATION_PARTNERS` blocklist (clavulanate, sulbactam, lumefantrine, artemether, trimethoprim…) so fixed-dose combinations never get a single-ingredient brand image.
- **Duplicate image rows from concurrent refresh runs**: the cleanup refill's re-crawl step and the follow-up refresh ran concurrently with empty per-drug hash sets, double-inserting 200 rows (same drug_id + hash). New `dedupe-images.ts` deletes duplicates keeping the earliest and removes the orphaned storage files (832 removed).
- **Supabase 1000-row cap silently truncating hash/count fetches**: `refresh-images.ts`, `refresh-parallel.ts` and `crawlAllMissing` read `drug_images` without pagination, so drugs beyond the first 1000 rows were seen as empty — the top-up pass would have re-inserted the same images. All three now paginate with `.range()`.

### Added

- `scripts/refill-zero-images.ts` — resumable refill for monographs with no images (state in `storage/refill_state.json`).
- `scripts/dedupe-images.ts` — removes duplicate `drug_images` rows (keep earliest) plus their orphaned storage files, and strips Kenyan-brand rows from drugs the current matcher excludes.

## 2026-07-22

### Added

- **Nursing Care Plans module**: 19 specialties, 47 fully detailed care plans with NANDA/NIC/NOC structure, 3-level navigation (specialty → disease → full care plan with 5 tabs). Routes: `/care-plan`, `/care-plan/:specialtyId`, `/care-plan/:specialtyId/:disease`.
- **Fundamental Nursing specialty**: 9 comprehensive care plans for essential nursing procedures — Wound Dressing, IV Therapy, Urinary Catheter Care, Oxygen Therapy, Post-Operative Care, Blood Transfusion, NG Tube Care, Pressure Injury Prevention, Chest Drain Management.
- **Critical Care & ICU specialty**: 4 care plans — Mechanical Ventilation, ARDS, Sepsis Management, Multi-Organ Dysfunction.
- **Burns Care specialty**: 4 care plans — Minor Burns, Major Burns, Inhalation Injury, Burn Wound Sepsis.
- **Community & Public Health specialty**: 3 care plans — Immunisation Programme, Community Chronic Disease Management, Health Promotion & Disease Prevention.
- **Perioperative & Surgical Nursing specialty**: 4 care plans — Pre-Operative Assessment, Intra-Operative Care, Post-Anaesthesia Recovery, Surgical Site Infection Prevention.
- **Mobile bottom navigation bar**: 5-tab bottom nav (Home, Education Hub, Drug Index, Exam, Care Plan) with active route detection, backdrop blur, and safe-area-inset support. Mobile-only (`md:hidden`).
- **Landing page upgrade**: Updated to reflect current module structure — Education Hub, Exam & Board Exam, Nursing Care Plans. Added "Nursing & Allied Health" audience card.
- **Settings — Notifications section**: Push notification toggle, recent notifications list with read/unread status, mark-all-read button.
- **Settings — Account section**: Sign out button with loading spinner.
- **Vercel Analytics + Speed Insights**: Privacy-friendly web analytics and Core Web Vitals tracking integrated at app root.

### Changed

- **Dashboard**: Replaced "Exam Papers" stat with "Care Plans" (47). Added Care Plan to Continue Learning quick actions.
- **Education Hub**: Removed Exam Prep module (now lives in dedicated Exam tab). Removed `ExamPrepView` import and dead `exam-prep` tab code from `EducationHubScreen`.
- **Navigation**: Exam is now a single sidebar nav link (no collapsible group). `EXAM_SUB_ITEMS` removed from `navigationConfig.ts`.
- **README.md**: Comprehensive rewrite reflecting all current modules, tech stack updates (PWA, Analytics), and project structure.

### Removed

- Exam Prep module from Education Hub (`curriculum.ts` EDUCATION_MODULES).
- Unused imports: `EXAM_PREP_UNITS`, `ScrollText`, `Clock`, `ExamPrepView` from DashboardScreen, EducationHubScreen, curriculum.

## 2026-07-12

### Fixed

- **Drug monograph text encoding (mojibake)**: 315 of 358 drug monographs (88%) had corrupted special characters across up to 12 text fields each (em-dashes, arrows, µg, Mg²⁺, K⁺, etc. displaying as garbled sequences like `â€"`). Root cause: text had been double-encoded (UTF-8 bytes misread as Windows-1252) at some point in the ingestion pipeline. Fixed via a reversible encoding round-trip; two rows (Gentamicin, Ibuprofen) needed a secondary pass due to an embedded unmappable control character. Verified zero remaining corruption across all fields on all 358 rows after the fix.
- **Acetazolamide misclassification**: was labeled `drug_class = 'Ophthalmic agent'`, which describes a route/indication, not a pharmacological class. Corrected to `Carbonic anhydrase inhibitor` (its actual class), applied consistently to both the legacy text field and the new relational classification.

### Added

- **`drug_classes` reference table**: new two-level relational taxonomy (16 broad categories → 50 specific pharmacological classes, self-referencing `parent_id`) replacing the free-text-only `drug_monographs.drug_class` field, consistent with the project's "relational lookup tables over enums" architecture principle.
  - `drug_monographs.drug_class_id` (uuid, FK) added and backfilled — 358/358 monographs linked, 0 unlinked.
  - RLS enabled, public-read policy matching the existing lookup-table pattern (`clinical_settings`, `case_types`, `acuity_levels`, `patient_age_groups`). Verified with a live cross-user `SET LOCAL ROLE authenticated` test.
  - `updated_at` wired to the shared `set_updated_at()` trigger (same one used by `kenya_drug_index`), not a duplicate.
  - Indexes added on both sides of the FK (`drug_classes.parent_id`, `drug_monographs.drug_class_id`).
  - `sort_order` and `is_active` columns added for future UI use, matching the convention on other taxonomy tables.
  - Legacy `drug_monographs.drug_class` text column intentionally kept (not dropped) as a safe fallback until the frontend is updated to read `drug_class_id`.
  - Migration recorded at `supabase/migrations/000004_drug_classes.sql` (applied live first, file added retroactively to keep repo and database in sync).

### Changed

- **Frontend migrated from `drug_class` to `drug_class_id`**: `DrugMonograph` interface now includes `drug_class_id` and `drug_class_name` (resolved via FK join). All service queries include `drug_classes(name)` join. UI components (`DrugIndexScreen`, `SavedMonographsPanel`) read `drug_class_name` with fallback to legacy `drug_class`. Internal consumers (`ragRouter`, `knowledgeEngine`, `monographToMarkdown`, `drugInformation` skill) use `drug_class_name || drug_class` for backward compatibility.
- **Category filter now uses relational `drug_classes` tree**: Instead of the static shorthand `CATEGORIES` array and string `includes()` matching, categories are loaded dynamically from `drug_classes` (16 broad categories) and filtered by resolving `drug_class_id` → broad parent via the FK tree.
- **`firebase.json`**: Added `functions.source` config for Firebase Cloud Functions deployment.

### Added

- **Firebase blocking Cloud Functions** (`functions/src/setAuthenticatedRole.ts`): Two Gen 2 identity functions (`beforecreated`, `beforesignedin`) that assign the `role: 'authenticated'` custom claim on every sign-up/sign-in, required by Supabase's Third-Party Auth integration for RLS.
- **Backfill script** (`scripts/backfill-role-claim.js`): One-time script to retroactively assign `role: 'authenticated'` to all existing Firebase Auth users. Requires a service account key.

### Known open items

- `drug_class` legacy text column still needs to be dropped once frontend migration is verified stable.
- Firebase OIDC provider must be configured in the Supabase Dashboard (project settings > Authentication > Third-Party Auth) for the custom claims to take effect.
- `functions/` directory needs `npm install` before deploying blocking functions.
