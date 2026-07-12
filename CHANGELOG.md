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

### Known open items
- `drug_class` legacy text column still needs to be dropped once frontend queries move to `drug_class_id`.
- Firebase ↔ Supabase Third-Party Auth integration still needs to be added manually via the Supabase Dashboard (cannot be applied via SQL/migration tooling) — pending confirmation.
