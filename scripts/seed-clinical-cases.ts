/**
 * Clinova Clinical Cases — Supabase Seed Import
 *
 * Usage:
 *   SUPABASE_URL=https://xxxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=xxxx npx tsx scripts/seed-clinical-cases.ts
 *
 * Idempotent: uses seed_id upsert — safe to run multiple times.
 */

import { createClient } from '@supabase/supabase-js';
import { INITIAL_CASES, type ClinicalCase } from '../src/data/clinicalCasesData';
import { GENERATED_CASES } from '../src/data/clinicalCases/index';

// ── Config ──────────────────────────────────────────────────────────
const SUPABASE_URL    = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const BATCH_SIZE = 25;

// ── Integrated Unit ID Mapping ───────────────────────────────────────
const UNIT_IDS: Record<string, string> = {
  // Canonical integrated unit titles
  'Cardiovascular Pharmacotherapy': 'cp-cv',
  'Respiratory Pharmacotherapy': 'cp-resp',
  'Infectious Diseases & Antimicrobial Pharmacotherapy': 'cp-id',
  'Endocrine Pharmacotherapy': 'cp-endo',
  'Gastrointestinal Pharmacotherapy': 'cp-gi',
  'Renal & Electrolyte Pharmacotherapy': 'cp-renal',
  'Central Nervous System Pharmacotherapy': 'cp-neuro',
  'Haematology & Oncology Pharmacotherapy': 'cp-onc',
  'Haematology & Oncology': 'cp-onc',
  'Rheumatology & Musculoskeletal Pharmacotherapy': 'cp-rheum',
  'Obstetrics & Gynaecology Pharmacotherapy': 'cp-obgyn',
  'Paediatric Pharmacotherapy': 'cp-peds',
  'Geriatric Pharmacotherapy': 'cp-ger',
  'Dermatology Pharmacotherapy': 'cp-derm',
  'Ophthalmology Pharmacotherapy': 'cp-ophth',
  'ENT Pharmacotherapy': 'cp-ent',
  'Emergency & Critical Care': 'cp-em',
  'Toxicology & Poison Management': 'cp-tox',
  // Disorder-level specialty names from the case generator
  'Cardiovascular Disorders': 'cp-cv',
  'Respiratory Disorders': 'cp-resp',
  'Infectious Diseases': 'cp-id',
  'Endocrine Disorders': 'cp-endo',
  'Gastrointestinal Disorders': 'cp-gi',
  'Renal Disorders': 'cp-renal',
  'Neurological Disorders': 'cp-neuro',
  'Hematology & Oncology': 'cp-onc',
  'Rheumatology': 'cp-rheum',
  'Obstetrics & Gynecology': 'cp-obgyn',
  'Pediatrics': 'cp-peds',
  'Geriatrics': 'cp-ger',
  'Dermatology': 'cp-derm',
  'Ophthalmology': 'cp-ophth',
  'ENT': 'cp-ent',
  'Toxicology': 'cp-tox',
  // Raw clinical specialty names
  'Cardiology': 'cp-cv',
  'Endocrinology': 'cp-endo',
  'Gastroenterology': 'cp-gi',
  'Hepatology': 'cp-gi',
  'Haematology': 'cp-onc',
  'Oncology': 'cp-onc',
  'Nephrology': 'cp-renal',
  'Neurology': 'cp-neuro',
  'Neurology / Pain Medicine': 'cp-neuro',
  'Psychiatry': 'cp-neuro',
  'Orthopaedics': 'cp-rheum',
  'Rheumatology': 'cp-rheum',
  'Respiratory Medicine': 'cp-resp',
  'Internal Medicine': 'cp-cv',
  'Emergency Medicine / Toxicology': 'cp-tox',
  'Clinical Pharmacy / Antimicrobial Stewardship': 'cp-id',
  'Clinical Pharmacy / Pharmacokinetics': 'cp-renal',
  'Clinical Pharmacy / Polypharmacy': 'cp-ger',
  'Clinical Pharmacy / Transitions of Care': 'cp-ger',
  'Nutrition': 'cp-ger',
};

function inferUnitId(specialty: string): string | null {
  const exact = UNIT_IDS[specialty];
  if (exact) return exact;
  // Fuzzy: check if any key is contained in the specialty or vice versa
  for (const [key, value] of Object.entries(UNIT_IDS)) {
    if (specialty.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(specialty.toLowerCase())) {
      return value;
    }
  }
  return null;
}

// ── Slug / seed_id generator ────────────────────────────────────────
function toSeedId(title: string, specialty: string): string {
  const raw = `${title}-${specialty}`.toLowerCase();
  return raw
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 120);
}

// ── Validation ──────────────────────────────────────────────────────
function validateCase(c: ClinicalCase): string[] {
  const errors: string[] = [];
  if (!c.title) errors.push('missing title');
  if (!c.specialty) errors.push('missing specialty');
  if (!c.disease) errors.push('missing disease');
  if (!c.diagnosis) errors.push('missing diagnosis');
  if (!c.chiefComplaint) errors.push('missing chiefComplaint');
  if (!c.hpi) errors.push('missing hpi');
  if (!c.difficulty || !['Beginner','Intermediate','Advanced'].includes(c.difficulty)) errors.push('invalid difficulty');
  if (!inferUnitId(c.specialty)) errors.push(`unmapped specialty: "${c.specialty}"`);
  return errors;
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log('🔍 Preparing case data...');

  const allCases: ClinicalCase[] = [...INITIAL_CASES, ...GENERATED_CASES];
  console.log(`📦 Total cases loaded: ${allCases.length}`);

  // Deduplicate by seed_id
  const seen = new Set<string>();
  const unique: ClinicalCase[] = [];
  const skipped: string[] = [];

  for (const c of allCases) {
    const sid = toSeedId(c.title, c.specialty);
    if (seen.has(sid)) {
      skipped.push(sid);
      continue;
    }
    seen.add(sid);
    unique.push(c);
  }

  console.log(`✅ Unique cases: ${unique.length}`);
  console.log(`⏭️  Duplicates skipped: ${skipped.length}`);

  // Validate
  const validCases: ClinicalCase[] = [];
  const validationErrors: { seed_id: string; errors: string[] }[] = [];

  for (const c of unique) {
    const errs = validateCase(c);
    if (errs.length > 0) {
      validationErrors.push({ seed_id: toSeedId(c.title, c.specialty), errors: errs });
    } else {
      validCases.push(c);
    }
  }

  if (validationErrors.length > 0) {
    console.warn(`\n⚠️  Validation failures: ${validationErrors.length}`);
    validationErrors.slice(0, 5).forEach(v => {
      console.warn(`   ${v.seed_id}: ${v.errors.join(', ')}`);
    });
    if (validationErrors.length > 5) {
      console.warn(`   ... and ${validationErrors.length - 5} more`);
    }
  }

  // Import in batches
  console.log(`\n🚀 Importing ${validCases.length} cases in batches of ${BATCH_SIZE}...`);

  let imported = 0;
  let errors = 0;

  for (let i = 0; i < validCases.length; i += BATCH_SIZE) {
    const batch = validCases.slice(i, i + BATCH_SIZE);
    const records = batch.map(c => ({
      seed_id: toSeedId(c.title, c.specialty),
      title: c.title,
      specialty: c.specialty,
      disease: c.disease,
      unit_id: inferUnitId(c.specialty),
      difficulty: c.difficulty,
      patient_name: c.patientName,
      facility_setting: c.facilitySetting,
      demographics: c.demographics,
      chief_complaint: c.chiefComplaint,
      hpi: c.hpi,
      pmh: c.pmh,
      med_hx: c.medHx,
      allergies: c.allergies,
      pe: c.pe,
      vitals: c.vitals,
      labs: c.labs,
      imaging: c.imaging || null,
      diagnosis: c.diagnosis,
      ddx: c.ddx || [],
      goals: c.goals,
      pharm: c.pharm,
      non_pharm: c.nonPharm,
      care_plan: c.carePlan,
      dtps: c.dtps,
      monitoring: c.monitoring,
      counselling: c.counselling,
      follow_up: c.followUp,
      pearls: c.pearls,
      references: c.references || [],
      status: c.status || 'published',
      created_by: c.createdBy || 'system',
      created_by_name: c.createdByName || 'Clinical Faculty',
    }));

    const { error } = await supabase
      .from('clinical_cases')
      .upsert(records, { onConflict: 'seed_id', ignoreDuplicates: false })
      .select('id', { count: 'exact', head: false });

    if (error) {
      console.error(`❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
      errors += batch.length;
    } else {
      imported += records.length;
      console.log(`✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${records.length} cases upserted`);
    }

    // Brief pause between batches
    if (i + BATCH_SIZE < validCases.length) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  // ── Report ──────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('📊 IMPORT COMPLETE');
  console.log('='.repeat(60));
  console.log(`   Total loaded:      ${allCases.length}`);
  console.log(`   Unique to import:  ${unique.length}`);
  console.log(`   Successfully upserted: ${imported}`);
  console.log(`   Validation failures: ${validationErrors.length}`);
  console.log(`   Import errors:     ${errors}`);
  console.log(`   Duplicates skipped: ${skipped.length}`);

  // Per-unit breakdown
  console.log('\n📋 Cases per integrated unit:');
  const unitOrder = [
    'cp-cv', 'cp-resp', 'cp-id', 'cp-endo', 'cp-gi', 'cp-renal',
    'cp-neuro', 'cp-onc', 'cp-rheum', 'cp-obgyn', 'cp-peds', 'cp-ger',
    'cp-derm', 'cp-ophth', 'cp-ent', 'cp-em', 'cp-tox',
  ];
  for (const uid of unitOrder) {
    const count = unique.filter(c => inferUnitId(c.specialty) === uid).length;
    const label = Object.entries(UNIT_IDS).find(([, v]) => v === uid)?.[0] || uid;
    const gap = Math.max(0, 50 - count);
    console.log(`   ${label.padEnd(50)} ${count.toString().padStart(3)} cases  (gap: ${gap})`);
  }

  console.log('\n✅ Seed import complete.');
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
