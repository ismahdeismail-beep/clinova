// Restore contraindications (and other core arrays) from the seed batch files
// for rows where the gap-fill pass left a single-item / placeholder value that
// fails the audit's 2-item quality bar.
// Source of truth: scripts/seed-drug-monographs-batch{1..27}.ts
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

function realCount(v: any): number {
  if (!Array.isArray(v)) return 0
  return v.filter(
    (x) => typeof x === 'string' && x.trim().length > 10 && !/^(n\/a|none|tbd|todo|placeholder|unknown|pending|refer to current|consult current)/i.test(x.trim()),
  ).length
}

interface BatchMono {
  name: string
  generic_name?: string
  contraindications?: string[]
  interactions?: string[]
  side_effects?: string[]
  indications?: string[]
}

function loadBatchFiles(): Map<string, BatchMono> {
  const map = new Map<string, BatchMono>()
  for (let b = 1; b <= 27; b++) {
    const f = `scripts/seed-drug-monographs-batch${b}.ts`
    if (!fs.existsSync(f)) continue
    // Extract MONOGRAPHS array literal via a quick regex-based walk of name + fields.
    const src = fs.readFileSync(f, 'utf8')
    const chunks = src.split(/\{\s*name:/)
    for (const chunk of chunks.slice(1)) {
      const m = chunk.match(/^\s*"([^"]+)"/)
      if (!m) continue
      const name = m[1]
      const grab = (field: string): string[] | undefined => {
        const re = new RegExp(`${field}:\\s*\\[([^\\]]*)\\]`)
        const fm = chunk.match(re)
        if (!fm) return undefined
        const items = [...fm[1].matchAll(/"((?:[^"\\\\]|\\\\.)*)"/g)].map((x) =>
          x[1].replace(/\\n/g, '\n').replace(/\\\\/g, '\\').replace(/\\"/g, '"'),
        )
        return items.length ? items : undefined
      }
      map.set(name.toLowerCase(), {
        name,
        generic_name: chunk.match(/generic_name:\s*"([^"]+)"/)?.[1],
        contraindications: grab('contraindications'),
        interactions: grab('interactions'),
        side_effects: grab('side_effects'),
        indications: grab('indications'),
      })
    }
  }
  return map
}

async function main() {
  const batch = loadBatchFiles()
  console.log(`batch monographs loaded: ${batch.size}`)

  const all: any[] = []
  let from = 0
  for (let i = 0; i < 60; i++) {
    const { data } = await admin.from('drug_monographs').select('id, name, generic_name, contraindications, interactions, side_effects, indications').range(from, from + 999)
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
  }

  const FIELDS = ['contraindications', 'interactions', 'side_effects', 'indications'] as const
  let updated = 0
  let checked = 0

  for (const r of all) {
    const bm = batch.get((r.generic_name || r.name || '').toLowerCase()) || batch.get((r.name || '').toLowerCase())
    if (!bm) continue
    const update: Record<string, any> = {}
    for (const f of FIELDS) {
      const current = r[f]
      const want = (bm as any)[f]
      if (!want) continue
      // Only restore when current is placeholder-ish or has fewer real items
      // than the seed source (never clobber genuinely richer content).
      if (realCount(current) < 2 && realCount(want) >= 2) {
        update[f] = want
      }
    }
    if (Object.keys(update).length) {
      checked++
      const { error } = await admin.from('drug_monographs').update(update).eq('id', r.id)
      if (error) {
        console.log(`ERR ${r.name}: ${error.message}`)
      } else {
        updated++
        console.log(`restored ${r.name}: ${Object.keys(update).join(',')}`)
      }
    }
  }
  console.log(`\nchecked ${checked}, updated ${updated}`)
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
