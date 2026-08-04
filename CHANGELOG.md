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
