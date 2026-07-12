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
