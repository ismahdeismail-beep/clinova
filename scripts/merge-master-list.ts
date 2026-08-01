/**
 * merge-master-list.ts — Phase 1 of the 1,000–1,200 drug build.
 * Unions the user's master list with scripts/drug-registry-canonical.json,
 * marks already-seeded drugs (from the DB) as 'seeded' so the generator skips them,
 * and writes the updated registry. Run with: npx tsx scripts/merge-master-list.ts
 */
import 'dotenv/config'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'
import { MASTER_DRUG_LIST } from './templates/masterDrugList'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REGISTRY_PATH = path.join(__dirname, 'drug-registry-canonical.json')

interface CanonicalDrug {
  name: string
  therapeuticClass: string
  sourceMentions: number
  status: 'seeded' | 'new'
  source?: string
  priority?: string
}

function norm(s: string): string {
  return (s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[–—]/g, '-')
}

function significantTokens(s: string): Set<string> {
  return new Set(
    norm(s)
      .split(/[\s/]+/)
      .filter((t) => t.length > 3 && !['acid', 'sodium', 'chloride', 'sulfate', 'sulphate'].includes(t))
  )
}

async function main() {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  })

  const registry: CanonicalDrug[] = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'))

  const { data: dbDrugs, error } = await supabase
    .from('drug_monographs')
    .select('id, generic_name, name')
    .limit(5000)
  if (error) throw new Error(`Failed to load DB drugs: ${error.message}`)

  const dbGenericSet = new Set((dbDrugs || []).map((d) => norm(d.generic_name)))
  const dbAliasSet = new Set((dbDrugs || []).map((d) => norm(d.name)))

  // ── 1. Mark registry entries already seeded in the DB ─────────────
  let markedSeeded = 0
  for (const entry of registry) {
    if (dbGenericSet.has(norm(entry.name)) || dbAliasSet.has(norm(entry.name))) {
      if (entry.status !== 'seeded') markedSeeded++
      entry.status = 'seeded'
    }
  }

  // ── 2. Add master-list names missing from the registry ────────────
  const registrySet = new Set(registry.map((e) => norm(e.name)))
  let addedFromMaster = 0
  for (const name of MASTER_DRUG_LIST) {
    const key = norm(name)
    if (!key) continue
    if (registrySet.has(key)) continue
    // Skip if already in the DB under this exact generic/alias name
    if (dbGenericSet.has(key) || dbAliasSet.has(key)) {
      continue
    }
    registry.push({
      name,
      therapeuticClass: 'Unclassified',
      sourceMentions: 0,
      status: 'new',
      source: 'Master List',
      priority: 'complementary',
    })
    registrySet.add(key)
    addedFromMaster++
  }

  // ── 3. Dedupe registry by normalized name (keep first occurrence) ──
  const seen = new Set<string>()
  const deduped = registry.filter((e) => {
    const k = norm(e.name)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })

  // ── 4. Flag suspected duplicates (combo drugs already in DB under another name) ──
  const suspected = []
  for (const e of deduped) {
    if (e.status === 'seeded') continue
    const tokens = significantTokens(e.name)
    if (tokens.size < 2) continue
    for (const db of dbDrugs || []) {
      const dbTokens = significantTokens(db.generic_name)
      const overlap = [...tokens].filter((t) => dbTokens.has(t)).length
      if (overlap >= 2) {
        suspected.push(`${e.name}  ~  DB: ${db.generic_name}`)
        break
      }
    }
  }

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(deduped, null, 2))

  const statuses: Record<string, number> = {}
  for (const e of deduped) statuses[e.status] = (statuses[e.status] || 0) + 1
  const masterUnique = new Set(MASTER_DRUG_LIST.map(norm).filter(Boolean)).size

  console.log('=== Merge complete ===')
  console.log(`Master list (unique): ${masterUnique}`)
  console.log(`Registry total: ${deduped.length}`)
  console.log(`  seeded (in DB): ${statuses.seeded || 0}`)
  console.log(`  new (to generate): ${statuses.new || 0}`)
  console.log(`Added from master list: ${addedFromMaster}`)
  console.log(`Marked seeded from DB: ${markedSeeded}`)
  console.log(`Duplicate registry entries removed: ${registry.length - deduped.length}`)
  console.log(`\nSuspected duplicates (combo names already in DB): ${suspected.length}`)
  for (const s of suspected.slice(0, 30)) console.log(`  ${s}`)
  console.log('\nSample of new entries to generate:')
  for (const e of deduped.filter((x) => x.status === 'new').slice(0, 15)) console.log(`  - ${e.name}`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
