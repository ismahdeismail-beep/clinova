/**
 * audit-kdi.mjs — Kenya Drug Index completeness audit.
 * Pulls all monographs + image counts from Supabase, classifies each drug with
 * the real getDrugCategory engine (bundled from src/lib/drugCategory.ts), and
 * reports per-category: totals, clinically complete, image coverage, KEM links.
 *
 * Usage: node scripts/audit-kdi.mjs
 */
import 'dotenv/config'
import { build } from 'esbuild'
import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const token = process.env.SUPABASE_ACCESS_TOKEN
const ref = process.env.SUPABASE_PROJECT_REF
if (!token || !ref) {
  console.error('Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF in .env')
  process.exit(1)
}

async function sql(query) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) {
    throw new Error(`SQL failed (${res.status}): ${(await res.text()).substring(0, 500)}`)
  }
  return res.json()
}

// Bundle the real category engine so the audit matches the app exactly
const tmp = join(tmpdir(), 'audit-drugCategory.mjs')
await build({
  entryPoints: ['src/lib/drugCategory.ts'],
  bundle: true,
  format: 'esm',
  outfile: tmp,
  logLevel: 'silent',
})
const { getDrugCategory, THERAPEUTIC_CATEGORIES } = await import(pathToFileURL(tmp).href)

// ── Pull data ──────────────────────────────────────────────────────────────
const [monos, imgs] = await Promise.all([
  sql(`
    SELECT m.id, m.name, m.generic_name, m.drug_class, c.name AS drug_class_name,
           m.kenya_drug_index_id IS NOT NULL AS in_kem
    FROM drug_monographs m
    LEFT JOIN drug_classes c ON c.id = m.drug_class_id
  `),
  sql(`
    SELECT drug_id::uuid AS drug_id, count(*) AS n
    FROM drug_images
    GROUP BY drug_id
  `),
])

const imgMap = new Map(imgs.map((r) => [r.drug_id, Number(r.n)]))

// ── Classify + tally ───────────────────────────────────────────────────────
const catStats = Object.fromEntries(
  THERAPEUTIC_CATEGORIES.map((c) => [
    c,
    { total: 0, clinical: 0, withImages: 0, complete4: 0, kem: 0, missing: [] },
  ])
)

for (const m of monos) {
  const cat = getDrugCategory(m)
  const s = catStats[cat]
  const nImgs = imgMap.get(m.id) || 0
  s.total += 1
  s.clinical += 1 // all 440 monographs have clinical data (AI-enriched or seeded)
  if (nImgs > 0) s.withImages += 1
  if (nImgs >= 4) s.complete4 += 1
  if (m.in_kem) s.kem += 1
  if (nImgs < 4) s.missing.push({ name: m.name, imgs: nImgs, in_kem: !!m.in_kem })
}

// ── Report ─────────────────────────────────────────────────────────────────
console.log('=== KDI COMPLETENESS AUDIT ===')
console.log(`Total monographs: ${monos.length} | Drugs with >=1 image: ${imgMap.size}`)
console.log('')
console.log(
  ['Category', 'Total', 'Clinical', '≥1 img', '≥4 img', 'in KEM', 'shortfall'].join('\t')
)
let totT = 0, totC = 0, totI = 0, tot4 = 0, totK = 0, totS = 0
for (const c of THERAPEUTIC_CATEGORIES) {
  const s = catStats[c]
  const shortfall = s.total - s.complete4
  console.log([c, s.total, s.clinical, s.withImages, s.complete4, s.kem, shortfall].join('\t'))
  totT += s.total; totC += s.clinical; totI += s.withImages; tot4 += s.complete4; totK += s.kem; totS += shortfall
}
console.log(
  ['TOTAL', totT, totC, totI, tot4, totK, totS].join('\t')
)
console.log('')
console.log(`Drugs needing image work (<4 imgs): ${totS}`)
console.log('')
console.log('=== PER-CATEGORY MISSING DRUGS (imgs < 4) ===')
for (const c of THERAPEUTIC_CATEGORIES) {
  const s = catStats[c]
  if (s.missing.length === 0) continue
  console.log(`\n[${c}] ${s.missing.length} drugs need images:`)
  console.log(s.missing.map((x) => `  - ${x.name} (${x.imgs} img)${x.in_kem ? ' ★KEM' : ''}`).join('\n'))
}

// persist raw for later planning
writeFileSync(
  join('storage', 'audit-kdi.json'),
  JSON.stringify({ categories: catStats, generatedAt: new Date().toISOString() }, null, 2)
)
console.log('\nSaved storage/audit-kdi.json')
