/**
 * seedExistingDb.ts
 * ----------------------------------------------------------------------------
 * Seeds the ALREADY-DEPLOYED Clinova Supabase schema (discovered, not created
 * by us). Schema: clinical_cases(id uuid, curriculum_unit_id uuid, title,
 * case_body jsonb, difficulty text). curriculum_units(id uuid, name, slug).
 *
 * Uses the Supabase Management API database-query endpoint (superuser) because
 * the local environment cannot open a direct Postgres TCP connection
 * (DB host is IPv6-only here). Idempotent: truncates then re-inserts.
 *
 * Run:  npx tsx scripts/seedExistingDb.ts
 * Env:  SUPABASE_ACCESS_TOKEN, SUPABASE_PROJECT_REF
 */
import 'dotenv/config';
import { ALL_CLINICAL_CASES } from '../src/data/clinicalCasesData';
import { GENERATED_CASES } from '../src/data/clinicalCases';
import type { ClinicalCase } from '../src/data/clinicalCasesData';

const token = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF ?? 'bveztrtykjburdhewcdy';
if (!token) {
  console.error('[seed] Missing SUPABASE_ACCESS_TOKEN');
  process.exit(1);
}

const API = `https://api.supabase.com/v1/projects/${ref}/database/query`;

async function runSql(sql: string): Promise<any[]> {
  const res = await fetch(API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
  if (!text) return [];
  try {
    const j = JSON.parse(text);
    return Array.isArray(j) ? j : [j];
  } catch {
    return [];
  }
}

function esc(s: unknown): string {
  if (s === null || s === undefined) return 'NULL';
  return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;
}

function sqlArr(arr?: string[]): string {
  if (!arr || arr.length === 0) return 'NULL';
  return `array[${arr.map((a) => esc(a)).join(', ')}]`;
}

// Build case_body via jsonb_build_object so Postgres does the JSON encoding
// natively (avoids hand-escaping a JSON string inside a SQL string literal).
function buildBody(c: ClinicalCase): string {
  return `jsonb_build_object(
    'id', ${esc(c.id)},
    'pharmacologySubject', ${esc((c as any).pharmacologySubject)},
    'unit', ${esc((c as any).unit)},
    'learningObjectives', ${sqlArr((c as any).learningObjectives)},
    'specialty', ${esc(c.specialty)},
    'disease', ${esc(c.disease)},
    'title', ${esc(c.title)},
    'difficulty', ${esc(c.difficulty)},
    'demographics', ${esc(c.demographics)},
    'chiefComplaint', ${esc(c.chiefComplaint)},
    'hpi', ${esc(c.hpi)},
    'pmh', ${esc(c.pmh)},
    'medHx', ${esc(c.medHx)},
    'allergies', ${esc(c.allergies)},
    'pe', ${esc(c.pe)},
    'vitals', ${esc(c.vitals)},
    'labs', ${esc(c.labs)},
    'imaging', ${esc(c.imaging)},
    'diagnosis', ${esc(c.diagnosis)},
    'ddx', ${sqlArr(c.ddx)},
    'goals', ${esc(c.goals)},
    'pharm', ${esc(c.pharm)},
    'nonPharm', ${esc(c.nonPharm)},
    'carePlan', ${esc(c.carePlan)},
    'dtps', ${esc(c.dtps)},
    'monitoring', ${esc(c.monitoring)},
    'counselling', ${esc(c.counselling)},
    'followUp', ${esc(c.followUp)},
    'pearls', ${esc(c.pearls)},
    'references', ${sqlArr(c.references)},
    'createdAt', ${esc(c.createdAt)},
    'status', ${esc(c.status)},
    'createdBy', ${esc(c.createdBy)},
    'createdByName', ${esc(c.createdByName)},
    'originalId', ${esc(c.id)}
  )`;
}

const SPECIALTIES: Record<string, string> = {
  'Cardiovascular Pharmacotherapy': 'cardiovascular-pharmacotherapy',
  'Respiratory Pharmacotherapy': 'respiratory-pharmacotherapy',
  'Infectious Diseases & Antimicrobial Pharmacotherapy': 'infectious-antimicrobial-pharmacotherapy',
  'Endocrine Pharmacotherapy': 'endocrine-pharmacotherapy',
  'Gastrointestinal Pharmacotherapy': 'gastrointestinal-pharmacotherapy',
  'Renal & Electrolyte Pharmacotherapy': 'renal-electrolyte-pharmacotherapy',
  'Central Nervous System Pharmacotherapy': 'cns-pharmacotherapy',
  'Haematology & Oncology Pharmacotherapy': 'haematology-oncology-pharmacotherapy',
  'Rheumatology & Musculoskeletal Pharmacotherapy': 'rheumatology-musculoskeletal-pharmacotherapy',
  'Obstetrics & Gynaecology Pharmacotherapy': 'obstetrics-gynaecology-pharmacotherapy',
  'Paediatric Pharmacotherapy': 'paediatric-pharmacotherapy',
  'Geriatric Pharmacotherapy': 'geriatric-pharmacotherapy',
  'Dermatology Pharmacotherapy': 'dermatology-pharmacotherapy',
  'Ophthalmology Pharmacotherapy': 'ophthalmology-pharmacotherapy',
  'ENT Pharmacotherapy': 'ent-pharmacotherapy',
  'Emergency & Critical Care': 'emergency-critical-care',
  'Toxicology & Poison Management': 'toxicology-poison-management',
};

// Map a free-text clinical specialty to an integrated curriculum unit name.
function unitForSpecialty(spec?: string): string | undefined {
  if (!spec) return undefined;
  const s = spec.toLowerCase();
  const rules: [string, string][] = [
    ['cardiov', 'Cardiovascular Pharmacotherapy'],
    ['cardiology', 'Cardiovascular Pharmacotherapy'],
    ['pediatric cardi', 'Cardiovascular Pharmacotherapy'],
    ['respirat', 'Respiratory Pharmacotherapy'],
    ['pulmon', 'Respiratory Pharmacotherapy'],
    ['infectious', 'Infectious Diseases & Antimicrobial Pharmacotherapy'],
    ['antimicrobial', 'Infectious Diseases & Antimicrobial Pharmacotherapy'],
    ['steward', 'Infectious Diseases & Antimicrobial Pharmacotherapy'],
    ['endocrin', 'Endocrine Pharmacotherapy'],
    ['gastroenter', 'Gastrointestinal Pharmacotherapy'],
    ['gastrointestinal', 'Gastrointestinal Pharmacotherapy'],
    ['hepat', 'Gastrointestinal Pharmacotherapy'],
    ['nephro', 'Renal & Electrolyte Pharmacotherapy'],
    ['renal', 'Renal & Electrolyte Pharmacotherapy'],
    ['neurol', 'Central Nervous System Pharmacotherapy'],
    ['psychiat', 'Central Nervous System Pharmacotherapy'],
    ['cns', 'Central Nervous System Pharmacotherapy'],
    ['haemat', 'Haematology & Oncology Pharmacotherapy'],
    ['hemat', 'Haematology & Oncology Pharmacotherapy'],
    ['oncolog', 'Haematology & Oncology Pharmacotherapy'],
    ['rheumat', 'Rheumatology & Musculoskeletal Pharmacotherapy'],
    ['orthop', 'Rheumatology & Musculoskeletal Pharmacotherapy'],
    ['musculoskeletal', 'Rheumatology & Musculoskeletal Pharmacotherapy'],
['obstet', 'Obstetrics & Gynaecology Pharmacotherapy'],
  ['gynaec', 'Obstetrics & Gynaecology Pharmacotherapy'],
  ['gynec', 'Obstetrics & Gynaecology Pharmacotherapy'],
  ['paediat', 'Paediatric Pharmacotherapy'],
  ['pediat', 'Paediatric Pharmacotherapy'],
  ['geriat', 'Geriatric Pharmacotherapy'],
  ['dermat', 'Dermatology Pharmacotherapy'],
  ['ophthal', 'Ophthalmology Pharmacotherapy'],
  ['ent', 'ENT Pharmacotherapy'],
  ['otolaryng', 'ENT Pharmacotherapy'],
  ['toxic', 'Toxicology & Poison Management'],
  ['poison', 'Toxicology & Poison Management'],
  ['emergency', 'Emergency & Critical Care'],
  ['critical care', 'Emergency & Critical Care'],
  ];
  for (const [kw, unit] of rules) if (s.includes(kw)) return unit;
  return undefined;
}

async function main() {
  const source: ClinicalCase[] = ALL_CLINICAL_CASES.length ? ALL_CLINICAL_CASES : GENERATED_CASES;
  console.log(`[seed] Loaded ${source.length} cases from seed library`);

  // 1. Seed curriculum units (table has no unique constraint on name in this schema)
  const existing = await runSql('select count(*)::int as n from public.curriculum_units;');
  if (existing?.[0]?.n > 0) {
    console.log(`[seed] curriculum_units already populated (${existing[0].n}); skipping insert.`);
  } else {
    const unitRows = Object.entries(SPECIALTIES)
      .map(([name, slug]) => `(${esc(name)}, ${esc(slug)})`)
      .join(', ');
    await runSql(`insert into public.curriculum_units (name, slug) values ${unitRows};`);
  }
  const units = await runSql('select id, name from public.curriculum_units;');
  const unitIdByName = new Map<string, string>();
  for (const u of units) unitIdByName.set(u.name, u.id);
  console.log(`[seed] curriculum_units ready: ${units.length}`);

  // 2. Build case_body JSON per case
  const seen = new Set<string>();
  const unique = source.filter((c) => (seen.has(c.id) ? false : (seen.add(c.id), true)));
  console.log(`[seed] unique cases: ${unique.length}`);

  // Clear any partial prior load, then reload fully (idempotent).
  await runSql('delete from public.clinical_cases;');

  const BATCH = 60;
  let inserted = 0;
  for (let i = 0; i < unique.length; i += BATCH) {
    const chunk = unique.slice(i, i + BATCH);
    const values = chunk
      .map((c) => {
        const unitName = unitForSpecialty(c.specialty);
        const unitId = unitName ? unitIdByName.get(unitName) : undefined;
        const unitSql = unitId ? `${esc(unitId)}::uuid` : 'NULL::uuid';
        return `(gen_random_uuid(), ${unitSql}, ${esc(c.title)}, ${buildBody(c)}, ${esc((c.difficulty ?? 'Intermediate').toLowerCase())})`;
      })
      .join(', ');
    const sql = `insert into public.clinical_cases (id, curriculum_unit_id, title, case_body, difficulty) values ${values};`;
    await runSql(sql);
    inserted += chunk.length;
    console.log(`[seed] inserted ${inserted}/${unique.length}`);
  }

  const cnt = await runSql('select count(*)::int as count from public.clinical_cases;');
  console.log(`[seed] Done. clinical_cases now has ${cnt?.[0]?.count ?? inserted} rows.`);
}

main().catch((e) => {
  console.error('[seed] Fatal:', e.message);
  process.exit(1);
});
