# Notes — Exam Office Papers Inventory, Coverage Gap & Excluded-Paper Knowledge

**Date:** 2026-08-09
**Source folder:** `C:\Users\ADMIN\Downloads\exam\EXAMination office` (Kabarak University PHAM
papers, by session folders `23, 31, 32, 33, 41, 42, 51, 53`)
**Purpose:** Coverage audit vs the **3-paper minimum per unit** (variants 1–3), source mapping
for gap-filling, and a knowledge record of the **3 excluded papers** (not added to the app).

---

## 1. Current coverage (verified via `npx tsx scripts/validate-papers.ts`)

`EXAM_PREP_PAPERS` has **32 of 33 units** (`pharm-veterinary` missing) = **72 paper variants**.

| Group | Units | Have | Gap to 3 |
|---|---|---|---|
| NEW pharmacology (`pharm-new-*`) | 7 | 3 each | **0** |
| NEW clinical pharmacy (`cp-new-*`) | 5 | 3 each | **0** |
| OLD clinical pharmacy (`exam-*`) | 8 | 3 each | **0** |
| OLD pharmacology (`pharm-*`) | 12 | 1 each (3 units now have v2) | **24** (need v2+v3) |
| Veterinary Pharmacology (`pharm-veterinary`) | 1 | 0 | **3** |
| **Total** | **33** | 72 + 3 second sittings = **75** | **27** |

## 2. Folder → unit mapping (OLD pharmacology; source of the existing v1)

| Session | Paper (PHAM) | Unit (existing v1) | Distinct papers in folder |
|---|---|---|---|
| 31 | 3101 Pharmacology I | pharm-gen-principles | 1 |
| 31 | 3102 Pharmacology II | pharm-autonomic | 1 |
| 32 | 3203 Pharmacology III (Autacoids) | pharm-autacoids | 1 |
| 33 | 3305 Pharmacology V (Sedative Hypnotics) | pharm-cns | 1 |
| 33 | 3306 Pharmacology VI | pharm-cardiovascular | **2** (regular + May-Aug 2021 sitting) |
| 33 | 3307 Pharmacology VII (Respiratory & Renal) | pharm-endocrine-resp | 1 |
| 41 | 4108 Pharmacology VIII (GIT) | pharm-gi | 1 |
| 41 | 4109 Pharmacology IX (Chemotherapeutic Agents) | pharm-chemo-agents | 1 |
| 42 | 4209 Pharmacology X (Chemotherapy II) | pharm-chemo-infections | 1 |
| 51 | 5111 Pharmacology XI (Anticancer, Derm & Ocular) | pharm-anticancer-derm-ocular | **2** (regular + May-Aug 2021) |
| 51 | 5112 Pharmacology XII (Vitamins & Endocrine) | pharm-vitamins-hormones | **2** (regular + draft May-Aug 2021) |
| 53 | 5314 Pharmacology XIV (Toxicology & Drug Discovery) | pharm-toxicology | 1 |

Clinical Pharmacy papers present (8): PHAM 3316 (CP II Resp & Renal), 4117 (CP III
Antimicrobial), 4118 (CP IV CV & Heme), 4219 (CP V Infections I), 4220 (CP VI Infections II),
5121 (CP VII CNS), 5122 (CP VIII Endocrine/Joint/Oncology), 5325 (CP XI post-external-examiner).
→ Map to `exam-*` units, which already meet the 3-paper minimum; keep as **future-improvement
knowledge** (real moderated papers to enrich/extend variants later).

**No PHAM paper exists for Pharmacology XIII (Veterinary)** — `pharm-veterinary` must be
**generated** (3 variants) from its registered topics; folder supplies nothing.

## 3. Fill plan (27 papers to reach the 3-paper minimum)

- **Variant 2 as REAL second sittings — DONE (3 papers, corrected picks)**: the first audit
  assumed the `Exam_MayAug2021` files for 3306/5111 were second sittings, but they are
  **byte-identical duplicates** of the v1 papers. The genuinely distinct papers in the
  archive were instead:
  - `3306.txt` (July 2019 regular, 20 MCQ / 8 SAQ / 3 LAQ, **0% overlap** with v1) →
    `pharm-cardiovascular` v2 (parsed as `3306b`)
  - `5111 (ANTICANCER, DERMATOLOGIC & OCULAR).txt` (Sept–Dec special, 60 MCQ) →
    `pharm-anticancer-derm-ocular` v2 (parsed as `5111b`)
  - `5112 (VITAMINS & ENDOCRINE).txt` (special exams, 60 MCQ) → `pharm-vitamins-hormones`
    v2 (parsed as `5112b`)
  Pipeline: `parse-old-papers.mjs <code>` → `fix-second-sittings.mjs` (curation:
  split merged MCQs, rebuild B/C) → `convert-parsed-papers.mjs` →
  `merge-answer-keys.mjs` (v2 keys in `pharm-cardiovascular-v2.json`,
  `pharm-cancer-derm-ocular-v2.json`, `pharm-vitamins-hormones-v2.json`) →
  `merge-papers.ts`. UI now derives paper counts from the registry
  (`getPaperCount` checks v3→v2→v1), so variant-2 cards render automatically.
- **Generated variants** (mock-style, standard A=30/B=40/C=30, grounded in real v1 + folder
  knowledge + unit topics):
  - 12 OLD pharm units: fill remaining v2/v3 (9 units need 2 each = 18; 3 units need 1 each = 3) → **21**
  - `pharm-veterinary`: 3 fresh variants → **3**
  - **Total generated: 24** (+ 3 real second sittings = **27** gap closed)
- Regenerate `src/data/examPrepPapers.ts` via `npx tsx scripts/merge-papers.ts`
  (OLD variant 1 kept; second sittings added as v2; generated as v2/v3).
- Answer keys for real papers generated separately (`scripts/merge-answer-keys.mjs` pattern).

## 4. The 3 EXCLUDED papers — knowledge record (do NOT add to exam prep)

These 3 papers sit in folder `23` and cover **subjects outside the Clinical Pharmacy /
Pharmacology exam-prep scope**. They are intentionally **not added** to `examPrepPapers.ts`.
Their knowledge is preserved here in case we later expand (e.g., future exam-prep modules or
curriculum content for these units):

1. **PHAM 2340 Social & Behavioral Pharmacy I** (2023)
   - Files (folder `23`): `kabarak university_PHAM 2340 SOCIAL & BEHAVIORAL PHARMACY.docx` +
   6 duplicate-named copies.
   - Knowledge scope: pharmacist–patient communication, behavioral aspects of medicine use,
     social determinants, patient counselling, ethics in practice, public health pharmacy.
   - If later incorporated: candidate module `Social & Behavioral Pharmacy` (Y1/Y2-level,
     revised curriculum "social pharmacy" strand).

2. **PHAM 2353 Pharmaceutical Chemistry II (Analytical Methods II)** (2023)
   - Files (folder `23`): `kabarak university_PHAM 2353 PHARMACEUTICAL CHEMISTRY II.docx`
    (+ `(1)..(5)` copies, one `.doc`).
   - Knowledge scope: analytical chemistry, titration methods, spectroscopy, drug purity
     testing, pharmacopoeial assays.
   - If later incorporated: candidate module `Pharmaceutical Chemistry` (analytical strand).

3. **PHAM 2364 Pharmacognosy I (Introduction to Pharmacognosy & Pharmaceutical Botany)** (2023)
   - Files (folder `23`): `kabarak university_PHAM 2364 PHARMACOGNOSY I.docx`
    (+ `(1)..(3)` copies, two `.doc`).
   - Knowledge scope: natural products, crude drugs, plant-based medicines, pharmaceutical
     botany, microscopy of vegetable drugs.
   - If later incorporated: candidate module `Pharmacognosy` (natural products strand).

**Reuse rule:** if these units are ever added to Exam Prep, parse via the same
`parse-old-papers.mjs` → `convert-parsed-papers.mjs` pipeline and follow the derived-counts
rule (counts must flow from data, never hardcoded).

## 5. Notes

- Folder `23` = earliest session (2023); folders 31–53 = later sessions; `42` has no
  PHARMACOLOGY IX/CP pair gaps — 4209 is X (Chemotherapy II); PHARMACOLOGY IV has no paper in
  the archive (content folded into III/V set); PHARMACOLOGY XIII (vet) has no paper in the
  archive.
- `.doc`/`.docx` copies with `(1)/(2)/(3)` suffixes are **duplicate files**, not separate
  sittings — only `Exam MayAug2021*`/`Exam draft*` files represent distinct papers.

---

## 4. RESOLVED � coverage completed (2026-08-09, same session)

**Final state: 33/33 units, 99 papers, 0 validation issues** (`npx tsx scripts/validate-papers.ts`).

What filled the 27-paper gap:
- **3 real second sittings** (curated with answer keys by the parallel fix-second-sittings pass):
  - `pharm-cardiovascular` v2 � PHAM 3306 Exam May�Aug 2021 (July 2019)
  - `pharm-anticancer-derm-ocular` v2 � PHAM 5111 Exam May�Aug 2021 (Special Exam)
  - `pharm-vitamins-hormones` v2 � PHAM 5112 regular sitting (vitamins & endocrine)
  - Pipeline: `parse-old-papers.mjs` (3306b/5111b/5112b) ? `fix-second-sittings.mjs` (split options + rebuild B/C) ? answer keys in `scripts/out/answer-keys/*-v2.json` ? `merge-answer-keys.mjs` (variant-2 support) ? `examPrepPapersOldPharm.ts`.
- **24 generated papers** (23 via Mistral + vet v1 hand-written):
  - `pharm-veterinary` v1-v3 (no real paper existed � hand-written v1 + Mistral v2/v3)
  - v2+v3 for 9 OLD units (gen-principles, autonomic, autacoids, cns, gi, endocrine-resp, chemo-agents, chemo-infections, toxicology)
  - v3 for the 3 units that got real v2 (cardiovascular, anticancer-derm-ocular, vitamins-hormones)
  - Generator: `scripts/generate-old-extras.ts` (Mistral, A=30 / B=6x40 / C=2x30, grounded on real v1/v2, retries/backoff, JSON mode). Output: `scripts/out/old-extras/<unitId>.json`.
- **Merge**: `merge-papers.ts` now keeps ALL OLD variants (`{ ...variants }`) + merges `scripts/out/old-extras/*.json` (creates missing units, e.g. pharm-veterinary).
- **UI**: `getPaperCount` (ExamPrepView) is fully variant-derived (3 ? 2 ? 1 ? 0); `ExamPrepScreen` renders `Array.from({ length: getPaperCount(unit) })` � no hardcoded 1-vs-3 logic. All counts update automatically (derived-counts rule).
- Verified: tsc clean, vite build OK (87 precache entries), runtime resolution of v1/v2/v3 for all 13 real OLD units.
- Committed + deployed: see git log / Vercel (clinova-main.vercel.app).
