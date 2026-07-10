/**
 * generateGapCases.ts
 * ----------------------------------------------------------------------------
 * Clinical-Case Workflow → Gap Analysis + Generation phase (AGENTS.md).
 * 1. Queries the live DB for per-unit case counts.
 * 2. For each integrated unit below 50 cases, generates the deficit using the
 *    existing template engine (existing templates + new gap-unit templates).
 * 3. Writes new cases into src/data/clinicalCases/gap_<unit>.ts (seed library
 *    remains source of truth) and rebuilds the barrel index.ts.
 * 4. After this, run: npm run db:seed  (reloads Supabase) then npm run db:validate.
 *
 * Run:  npx tsx scripts/generateGapCases.ts
 * Env:  SUPABASE_ACCESS_TOKEN, SUPABASE_PROJECT_REF
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { generateCasesFromTemplate, writeBatchFile } from './generateCases';
import {
  CARDIOVASCULAR_PHARMACOLOGY_TEMPLATES,
  AUTONOMIC_PHARMACOLOGY_TEMPLATES,
} from './caseTemplates';
import { OPHTHALMOLOGY_TEMPLATES } from './templates/ophthalmology';
import { RENAL_TEMPLATES } from './templates/renal';
import { DERMATOLOGY_TEMPLATES } from './templates/dermatology';
import { TOXICOLOGY_TEMPLATES } from './templates/toxicology';
import { ENDOCRINE_TEMPLATES } from './templates/endocrine';
import { PAIN_INFLAMMATION_TEMPLATES } from './templates/painInflammation';
import {
  ENT_TEMPLATES,
  GERIATRIC_TEMPLATES,
  OBSTETRICS_GYNAECOLOGY_TEMPLATES,
  PAEDIATRIC_TEMPLATES,
} from './templates/gapUnits';

const token = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF ?? 'bveztrtykjburdhewcdy';
const API = `https://api.supabase.com/v1/projects/${ref}/database/query`;
const TARGET = 50;

async function q(sql: string): Promise<any[]> {
  const res = await fetch(API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
  if (!text) return [];
  const j = JSON.parse(text);
  return Array.isArray(j) ? j : [j];
}

const safeName = (unit: string) =>
  unit.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

// Existing barrel exports (preserved) — filenames without extension.
const EXISTING_FILES: [string, string][] = [
  ['generalPharmacology', 'GENERAL_PHARMACOLOGY_CASES'],
  ['autonomicPharmacology_a', 'AUTONOMIC_PHARMACOLOGY_CASES_A'],
  ['autonomicPharmacology_b', 'AUTONOMIC_PHARMACOLOGY_CASES_B'],
  ['cardiovascular_pharmacology', 'cardiovascular_pharmacology_cases'],
  ['respiratory_pharmacology', 'respiratory_pharmacology_cases'],
  ['gastrointestinal_pharmacology', 'gastrointestinal_pharmacology_cases'],
  ['endocrine_pharmacology', 'endocrine_pharmacology_cases'],
  ['vitamins_nutrition', 'vitamins_nutrition_cases'],
  ['central_nervous_system_pharmacology', 'central_nervous_system_pharmacology_cases'],
  ['pain_inflammation', 'pain_inflammation_cases'],
  ['chemotherapy_antimicrobial_pharmacology', 'chemotherapy_antimicrobial_pharmacology_cases'],
  ['oncology', 'oncology_cases'],
  ['hematology', 'hematology_cases'],
  ['renal_pharmacology', 'renal_pharmacology_cases'],
  ['dermatology', 'dermatology_cases'],
  ['ophthalmology', 'ophthalmology_cases'],
  ['toxicology', 'toxicology_cases'],
  ['clinical_pharmacy', 'clinical_pharmacy_cases'],
];

function planTemplates(unit: string) {
  switch (unit) {
    case 'Cardiovascular Pharmacotherapy':
      return CARDIOVASCULAR_PHARMACOLOGY_TEMPLATES;
    case 'Emergency & Critical Care':
      return AUTONOMIC_PHARMACOLOGY_TEMPLATES.filter((t) => /emergency/i.test(t.specialty));
    case 'Ophthalmology Pharmacotherapy':
      return OPHTHALMOLOGY_TEMPLATES;
    case 'Renal & Electrolyte Pharmacotherapy':
      return RENAL_TEMPLATES;
    case 'Dermatology Pharmacotherapy':
      return DERMATOLOGY_TEMPLATES;
    case 'Toxicology & Poison Management':
      return TOXICOLOGY_TEMPLATES;
    case 'Endocrine Pharmacotherapy':
      return ENDOCRINE_TEMPLATES;
    case 'Rheumatology & Musculoskeletal Pharmacotherapy':
      return PAIN_INFLAMMATION_TEMPLATES;
    case 'ENT Pharmacotherapy':
      return ENT_TEMPLATES;
    case 'Geriatric Pharmacotherapy':
      return GERIATRIC_TEMPLATES;
    case 'Obstetrics & Gynaecology Pharmacotherapy':
      return OBSTETRICS_GYNAECOLOGY_TEMPLATES;
    case 'Paediatric Pharmacotherapy':
      return PAEDIATRIC_TEMPLATES;
    default:
      return [];
  }
}

async function main() {
  const rows = await q(
    `select cu.name as unit, count(cc.id)::int as n
     from public.curriculum_units cu
     left join public.clinical_cases cc on cc.curriculum_unit_id = cu.id
     group by cu.name order by n asc;`
  );
  const counts = new Map<string, number>();
  for (const r of rows) counts.set(r.unit, r.n);

  const OUTPUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'clinicalCases');
  const newBarrel: [string, string][] = []; // [filename, exportName]
  let globalId = 6000;

  for (const unit of counts.keys()) {
    const have = counts.get(unit)!;
    const deficit = Math.max(0, TARGET - have);
    if (deficit === 0) {
      console.log(`✓ ${unit}: ${have} (>=${TARGET})`);
      continue;
    }
    const templates = planTemplates(unit);
    if (templates.length === 0) {
      console.log(`! ${unit}: ${have} — no templates available, skipping`);
      continue;
    }
    // Distribute deficit across templates.
    const cases: string[] = [];
    let remaining = deficit;
    let gi = globalId;
    let i = 0;
    while (remaining > 0 && i < templates.length) {
      const n = Math.min(remaining, Math.ceil(remaining / (templates.length - i)));
      cases.push(...generateCasesFromTemplate(templates[i], n, gi));
      gi += n;
      remaining -= n;
      i++;
    }
    globalId = gi;

    const file = safeName(unit);
    const exportName = `gap_${file}_cases`;
    writeBatchFile(path.join(OUTPUT_DIR, `${file}.ts`), cases, exportName);
    newBarrel.push([file, exportName]);
    console.log(`+ ${unit}: ${have} -> +${cases.length} new (target ${TARGET})`);
  }

  if (newBarrel.length === 0) {
    console.log('\nNo gaps to fill.');
    return;
  }

  // Rebuild barrel index.ts (preserve existing + add gap files).
  const all = [...EXISTING_FILES, ...newBarrel];
  const imports = all.map(([f, e]) => `import { ${e} } from './${f}';`).join('\n');
  const spreads = all.map(([, e]) => `  ...${e},`).join('\n');
  const content = `// ================================================================
// Clinical Cases — Barrel Export (Auto-generated)
// Merges all subject-based case modules into a single array.
// Regenerated by scripts/generateGapCases.ts on: ${new Date().toISOString()}
// ================================================================

import type { ClinicalCase } from '../clinicalCasesData';

${imports}

// Merge all generated case batches
export const GENERATED_CASES: ClinicalCase[] = [
${spreads}
];

// Version tracking for cache invalidation
export const GENERATED_CASES_VERSION = '3.0.0';
export const GENERATED_CASES_COUNT = GENERATED_CASES.length;
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), content, 'utf-8');
  console.log(`\nBarrel index.ts rebuilt with ${all.length} modules (+${newBarrel.length} gap modules).`);
  console.log('Next: npm run db:seed  then  npm run db:validate');
}

main().catch((e) => {
  console.error('[gap] Fatal:', e.message);
  process.exit(1);
});
