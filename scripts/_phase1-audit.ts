import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const B = (msg: string) => console.log(`\n### ${msg} ###`);
const P = (msg: string, ok: boolean) => console.log(`  ${ok ? '✅' : '❌'} ${msg}`);

async function main() {
  console.log('=== PHASE 1 — CLINICAL CASE COVERAGE AUDIT ===\n');

  // ── 1. Total counts ──
  B('OVERVIEW');
  const { count: total } = await supabase.from('clinical_cases').select('*', { count: 'exact', head: true });
  console.log(`  Total clinical cases: ${total}`);
  const { count: published } = await supabase.from('clinical_cases').select('*', { count: 'exact', head: true }).eq('status', 'published');
  console.log(`  Published: ${published}`);
  const { data: diseases } = await supabase.from('clinical_cases').select('disease');
  const uniqueDiseases = [...new Set(diseases?.map(d => d.disease) ?? [])].sort();
  console.log(`  Unique diseases represented: ${uniqueDiseases.length}`);

  const { data: units } = await supabase.from('clinical_cases').select('unit_id').not('unit_id', 'is', null);
  const uniqueUnits = [...new Set(units?.map(u => u.unit_id) ?? [])].sort();
  console.log(`  Integrated units: ${uniqueUnits.length}`);

  // ── 2. Cases per Disease ──
  B('CASES PER DISEASE');
  const disCounts: Record<string, number> = {};
  diseases?.forEach(d => { disCounts[d.disease] = (disCounts[d.disease] || 0) + 1; });
  const sorted = Object.entries(disCounts).sort((a, b) => b[1] - a[1]);
  for (const [d, c] of sorted) {
    const flag = c < 6 ? '⚠️' : '✅';
    console.log(`  ${flag} ${c} × ${d}`);
  }
  const belowMin = sorted.filter(([_, c]) => c < 6);
  console.log(`\n  Diseases below 6-case minimum: ${belowMin.length}`);
  belowMin.forEach(([d, c]) => console.log(`    - ${c} × ${d}`));

  // ── 3. Cases per Integrated Unit ──
  B('CASES PER INTEGRATED UNIT');
  const unitCounts: Record<string, number> = {};
  units?.forEach(u => { unitCounts[u.unit_id] = (unitCounts[u.unit_id] || 0) + 1; });
  for (const [uid, c] of Object.entries(unitCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${c} × ${uid}`);
  }

  // ── 4. Cases per Specialty ──
  B('CASES PER SPECIALTY');
  const { data: specialties } = await supabase.from('clinical_cases').select('specialty');
  const specCounts: Record<string, number> = {};
  specialties?.forEach(s => { specCounts[s.specialty] = (specCounts[s.specialty] || 0) + 1; });
  for (const [s, c] of Object.entries(specCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${c} × ${s}`);
  }

  // ── 5. Cases per Difficulty ──
  B('CASES PER DIFFICULTY');
  const diffs: Record<string, number> = {};
  diseases?.forEach(d => {
    const key = (d as any).difficulty || 'unknown';
    diffs[key] = (diffs[key] || 0) + 1;
  });
  // Actually we need explicit difficulty query
  const { data: diffData } = await supabase.from('clinical_cases').select('difficulty');
  const diffCounts: Record<string, number> = {};
  diffData?.forEach(d => { const v = d.difficulty || 'unknown'; diffCounts[v] = (diffCounts[v] || 0) + 1; });
  for (const [d, c] of Object.entries(diffCounts)) {
    console.log(`  ${c} × ${d}`);
  }

  // ── 6. Cases missing disease_id ──
  B('MISSING DISEASE MAPPING');
  const { count: noDiseaseId } = await supabase.from('clinical_cases').select('*', { count: 'exact', head: true }).is('disease_id', null);
  P(`Cases missing disease_id: ${noDiseaseId}`, noDiseaseId === 0);

  // ── 7. Cases with disease_id = clinical topic diseases ──
  if (noDiseaseId > 0) {
    B('CASES WITH NULL DISEASE_ID (Clinical Topics)');
    const { data: clinicalTopicCases } = await supabase.from('clinical_cases').select('disease, title').is('disease_id', null).limit(30);
    clinicalTopicCases?.forEach(c => console.log(`  - ${c.disease}: ${c.title?.slice(0, 80)}`));
  }

  // ── 8. Full disease catalog ──
  B('FULL DISEASE CATALOG');
  const { data: catalog } = await supabase.from('diseases').select('id, name').order('name');
  const catalogDiseases = catalog?.map(d => d.name) ?? [];
  console.log(`  Total diseases in catalog: ${catalogDiseases.length}`);
  const missing = catalogDiseases.filter(d => !uniqueDiseases.includes(d));
  console.log(`  Diseases with ZERO cases: ${missing.length}`);
  missing.forEach(d => console.log(`    ❌ ${d}`));

  // ── 9. Duplicate title check ──
  B('DUPLICATE CHECK');
  const { data: allCases } = await supabase.from('clinical_cases').select('id, title, disease, unit_id');
  const titles = allCases?.map(c => c.title?.trim().toLowerCase()) ?? [];
  const dupes = titles.filter((t, i) => t && titles.indexOf(t) !== i);
  P(`Exact duplicate titles: ${new Set(dupes).size}`, dupes.length === 0);

  // ── 10. Facility setting distribution ──
  B('CASES PER CLINICAL SETTING');
  const { data: settings } = await supabase.from('clinical_cases').select('facility_setting');
  const settingCounts: Record<string, number> = {};
  const nullSettings: string[] = [];
  settings?.forEach(s => {
    const v = s.facility_setting || s.facility_setting === null ? (s.facility_setting || '').toLowerCase() : 'not_specified';
    if (v === '' || v === 'not_specified') {
      nullSettings.push('x');
      settingCounts['not_specified'] = (settingCounts['not_specified'] || 0) + 1;
    } else {
      settingCounts[v] = (settingCounts[v] || 0) + 1;
    }
  });
  for (const [s, c] of Object.entries(settingCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${c} × ${s}`);
  }

  // ── 11. Patient name diversity (first names) ──
  B('PATIENT NAME DIVERSITY (SAMPLE)');
  const { data: names } = await supabase.from('clinical_cases').select('patient_name').not('patient_name', 'is', null).limit(200);
  const firstNameCounts: Record<string, number> = {};
  names?.forEach(n => {
    const name = n.patient_name || '';
    const first = name.split(/\s+/)[0];
    if (first) firstNameCounts[first] = (firstNameCounts[first] || 0) + 1;
  });
  const sortedNames = Object.entries(firstNameCounts).sort((a, b) => b[1] - a[1]);
  console.log(`  Unique first names: ${sortedNames.length}`);
  console.log(`  Top 20 most common:`);
  sortedNames.slice(0, 20).forEach(([n, c]) => console.log(`    ${c} × ${n}`));

  // ── 12. Cases per disease_id (mapped) ──
  B('CASES PER DISEASE (via disease_id)');
  const { data: mappedCases } = await supabase.from('clinical_cases').select('disease_id, disease').not('disease_id', 'is', null);
  const mappedCounts: Record<string, { name: string; count: number }> = {};
  mappedCases?.forEach(c => {
    const key = c.disease_id || 'null';
    if (!mappedCounts[key]) mappedCounts[key] = { name: c.disease, count: 0 };
    mappedCounts[key].count++;
  });
  for (const [id, info] of Object.entries(mappedCounts).sort((a, b) => b[1].count - a[1].count)) {
    console.log(`  ${info.count} × ${id} (${info.name})`);
  }

  // ── Summary ──
  B('AUDIT SUMMARY');
  const checks = [
    { label: `Total cases: ${total}`, ok: total >= 1000 },
    { label: `Unique diseases: ${uniqueDiseases.length}`, ok: uniqueDiseases.length >= 50 },
    { label: `Integrated units: ${uniqueUnits.length}`, ok: uniqueUnits.length >= 15 },
    { label: `Diseases below 6-case minimum: ${belowMin.length}`, ok: belowMin.length === 0 },
    { label: `Missing disease_id: ${noDiseaseId}`, ok: noDiseaseId === 0 },
    { label: `Duplicate titles: ${new Set(dupes).size}`, ok: dupes.length === 0 },
  ];
  checks.forEach(c => P(c.label, c.ok));
  const passed = checks.filter(c => c.ok).length;
  console.log(`\n  Result: ${passed}/${checks.length} checks passed`);
}

main().catch(console.error);
