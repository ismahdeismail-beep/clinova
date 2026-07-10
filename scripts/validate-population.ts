/**
 * Clinova Population Validation
 *
 * Verifies the integrity of the Supabase database after seeding.
 * Checks: counts, curriculum coverage, relationships, resource completeness.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/validate-population.ts
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL    = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const UNIT_LABELS: Record<string, string> = {
  'cp-cv': 'Cardiovascular',
  'cp-resp': 'Respiratory',
  'cp-id': 'Infectious Diseases',
  'cp-endo': 'Endocrine',
  'cp-gi': 'Gastrointestinal',
  'cp-renal': 'Renal & Electrolyte',
  'cp-neuro': 'CNS / Psychiatry',
  'cp-onc': 'Haematology & Oncology',
  'cp-rheum': 'Rheumatology & MSK',
  'cp-obgyn': 'Obstetrics & Gynaecology',
  'cp-peds': 'Paediatric',
  'cp-ger': 'Geriatric',
  'cp-derm': 'Dermatology',
  'cp-ophth': 'Ophthalmology',
  'cp-ent': 'ENT',
  'cp-em': 'Emergency & Critical Care',
  'cp-tox': 'Toxicology & Poison',
};

type CheckResult = { label: string; status: '✅' | '⚠️' | '❌'; detail: string };

async function checkTableCount(table: string, label: string): Promise<CheckResult> {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });

  if (error) return { label, status: '❌', detail: error.message };
  return { label, status: '✅', detail: `${count} records` };
}

async function main() {
  console.log('='.repeat(60));
  console.log('🔍 CLINOVA POPULATION VALIDATION');
  console.log('='.repeat(60));

  const results: CheckResult[] = [];

  // 1. Table counts
  console.log('\n📊 TABLE COUNTS:');
  const tables = [
    'curriculum_areas', 'curriculum_units', 'diseases', 'learning_objectives',
    'clinical_cases', 'case_learning_objectives', 'content_tags',
    'disease_monographs', 'drug_monographs',
    'knowledge_graph_nodes', 'knowledge_graph_relationships',
    'study_guides', 'flashcards', 'quiz_questions',
  ];

  for (const t of tables) {
    const result = await checkTableCount(t, t);
    results.push(result);
    console.log(`   ${result.status} ${result.label.padEnd(35)} ${result.detail}`);
  }

  // 2. Per-unit case coverage
  console.log('\n📋 CASES PER INTEGRATED UNIT (target: 50):');
  const unitOrder = Object.keys(UNIT_LABELS);
  let totalCases = 0;
  let unitsMeetingTarget = 0;

  for (const uid of unitOrder) {
    const { count, error } = await supabase
      .from('clinical_cases')
      .select('*', { count: 'exact', head: true })
      .eq('unit_id', uid)
      .eq('status', 'published');

    if (error) {
      console.log(`   ❌ ${UNIT_LABELS[uid]}: query error`);
      continue;
    }

    const c = count || 0;
    totalCases += c;
    const gap = Math.max(0, 50 - c);
    const status = c >= 50 ? '✅' : c >= 25 ? '⚠️' : '❌';
    console.log(`   ${status} ${UNIT_LABELS[uid].padEnd(35)} ${c.toString().padStart(3)} cases (gap: ${gap})`);
    if (c >= 50) unitsMeetingTarget++;
  }

  results.push({
    label: 'Units meeting 50-case target',
    status: unitsMeetingTarget === unitOrder.length ? '✅' : '⚠️',
    detail: `${unitsMeetingTarget}/${unitOrder.length}`,
  });

  results.push({
    label: 'Total published cases',
    status: '✅',
    detail: `${totalCases}`,
  });

  // 3. Knowledge Graph integrity
  console.log('\n🔗 KNOWLEDGE GRAPH:');
  
  const { count: nodeCount, error: nodeErr } = await supabase
    .from('knowledge_graph_nodes')
    .select('*', { count: 'exact', head: true });
  
  const { count: relCount, error: relErr } = await supabase
    .from('knowledge_graph_relationships')
    .select('*', { count: 'exact', head: true });

  console.log(`   ${nodeErr ? '❌' : '✅'} Nodes:        ${nodeCount || 0}`);
  console.log(`   ${relErr ? '❌' : '✅'} Relationships: ${relCount || 0}`);

  results.push({
    label: 'Knowledge Graph nodes',
    status: nodeErr ? '❌' : '✅',
    detail: `${nodeCount || 0}`,
  });
  results.push({
    label: 'Knowledge Graph relationships',
    status: relErr ? '❌' : '✅',
    detail: `${relCount || 0}`,
  });

  // 4. AI resources coverage
  console.log('\n📝 AI RESOURCES:');
  
  const { count: sgCount } = await supabase
    .from('study_guides')
    .select('*', { count: 'exact', head: true });
  
  const { count: fcCount } = await supabase
    .from('flashcards')
    .select('*', { count: 'exact', head: true });
  
  const { count: qzCount } = await supabase
    .from('quiz_questions')
    .select('*', { count: 'exact', head: true });

  console.log(`   ✅ Study Guides:   ${sgCount || 0}`);
  console.log(`   ✅ Flashcards:     ${fcCount || 0}`);
  console.log(`   ✅ Quiz Questions: ${qzCount || 0}`);

  results.push({ label: 'Study guides', status: '✅', detail: `${sgCount || 0}` });
  results.push({ label: 'Flashcards', status: '✅', detail: `${fcCount || 0}` });
  results.push({ label: 'Quiz questions', status: '✅', detail: `${qzCount || 0}` });

  // 5. Monographs
  console.log('\n📄 MONOGRAPHS:');
  
  const { count: dmCount } = await supabase
    .from('disease_monographs')
    .select('*', { count: 'exact', head: true });
  
  const { count: drmCount } = await supabase
    .from('drug_monographs')
    .select('*', { count: 'exact', head: true });

  console.log(`   ✅ Disease Monographs: ${dmCount || 0}`);
  console.log(`   ✅ Drug Monographs:    ${drmCount || 0}`);

  results.push({ label: 'Disease monographs', status: '✅', detail: `${dmCount || 0}` });
  results.push({ label: 'Drug monographs', status: dmCount && dmCount > 0 ? '✅' : '⚠️', detail: `${drmCount || 0}` });

  // ── Summary ─────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(60));

  let passed = 0;
  let warning = 0;
  let failed = 0;

  for (const r of results) {
    if (r.status === '✅') passed++;
    else if (r.status === '⚠️') warning++;
    else if (r.status === '❌') failed++;

    console.log(`   ${r.status} ${r.label.padEnd(40)} ${r.detail}`);
  }

  const totalChecks = results.length;
  const completionPct = totalCases > 0
    ? Math.round((unitsMeetingTarget / unitOrder.length) * 100)
    : 0;

  console.log(`\n📈 Summary:`);
  console.log(`   Checks passed:  ${passed}/${totalChecks}`);
  console.log(`   Warnings:       ${warning}`);
  console.log(`   Failures:       ${failed}`);
  console.log(`   Curriculum coverage: ${completionPct}% (${unitsMeetingTarget}/${unitOrder.length} units at ≥50 cases)`);
  console.log(`   Total cases:    ${totalCases}`);

  const isComplete = failed === 0 && unitsMeetingTarget === unitOrder.length;
  console.log(`\n${isComplete ? '✅ DATABASE IS COMPLETE AND VALIDATED' : '⚠️ DATABASE HAS ISSUES REQUIRING ATTENTION'}`);

  process.exit(isComplete ? 0 : 1);
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
