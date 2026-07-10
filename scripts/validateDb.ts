/**
 * validateDb.ts
 * ----------------------------------------------------------------------------
 * Post-seed / post-migration validation report (AGENTS.md "Database Validation").
 * Uses the Supabase Management API database-query endpoint (superuser) because
 * the local environment cannot open a direct Postgres TCP connection.
 *
 * Run:  npx tsx scripts/validateDb.ts
 * Env:  SUPABASE_ACCESS_TOKEN, SUPABASE_PROJECT_REF
 */
import 'dotenv/config';

const token = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF ?? 'bveztrtykjburdhewcdy';
if (!token) {
  console.error('[validate] Missing SUPABASE_ACCESS_TOKEN');
  process.exit(1);
}
const API = `https://api.supabase.com/v1/projects/${ref}/database/query`;

async function q(sql: string): Promise<any[]> {
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

const issues: string[] = [];

async function main() {
  console.log('=== Clinova Database Validation Report ===\n');

  const total = (await q('select count(*)::int as n from public.clinical_cases;'))[0].n;
  console.log(`clinical_cases rows: ${total}`);
  if (total < 50 * 17) issues.push(`Clinical cases (${total}) below 50/unit x 17 = 850 guideline.`);

  const units = (await q('select count(*)::int as n from public.curriculum_units;'))[0].n;
  console.log(`curriculum_units rows: ${units}`);
  if (units < 17) issues.push(`Only ${units} curriculum units (expected 17).`);

  const withUnit = (await q('select count(*)::int as n from public.clinical_cases where curriculum_unit_id is not null;'))[0].n;
  console.log(`cases linked to a curriculum unit: ${withUnit} (${((withUnit / total) * 100).toFixed(1)}%)`);
  if (withUnit < total) issues.push(`${total - withUnit} cases have no curriculum_unit_id.`);

  const nullBody = (await q('select count(*)::int as n from public.clinical_cases where case_body is null;'))[0].n;
  console.log(`cases with null case_body: ${nullBody}`);
  if (nullBody > 0) issues.push(`${nullBody} cases have a null case_body.`);

  const badDiff = (await q(
    `select count(*)::int as n from public.clinical_cases
     where difficulty not in ('beginner','intermediate','advanced');`
  ))[0].n;
  console.log(`cases with invalid difficulty: ${badDiff}`);
  if (badDiff > 0) issues.push(`${badDiff} cases have an invalid difficulty value.`);

  const rls = (await q(
    `select relrowsecurity as rls from pg_class where relname='clinical_cases' and relnamespace='public'::regnamespace;`
  ))[0]?.rls;
  console.log(`clinical_cases RLS enabled: ${rls}`);
  if (rls !== true) issues.push('RLS is not enabled on clinical_cases.');

  console.log('\n--- Cases per curriculum unit ---');
  const perUnit = await q(
    `select cu.name, count(cc.id)::int as cases
     from public.curriculum_units cu
     left join public.clinical_cases cc on cc.curriculum_unit_id = cu.id
     group by cu.name, cu.slug order by cases desc;`
  );
  for (const row of perUnit) {
    const flag = row.cases < 50 ? '  <-- below 50' : '';
    if (row.cases < 50) issues.push(`Unit "${row.name}" has ${row.cases} cases (<50).`);
    console.log(`  ${row.name.padEnd(48)} ${row.cases}${flag}`);
  }

  console.log('\n=== Issues ===');
  if (issues.length === 0) console.log('None. Validation passed.');
  else issues.forEach((i) => console.log(`  - ${i}`));

  console.log(`\nResult: ${issues.length === 0 ? 'PASS' : 'REVIEW'}`);
  process.exit(0);
}

main().catch((e) => {
  console.error('[validate] Fatal:', e.message);
  process.exit(1);
});
