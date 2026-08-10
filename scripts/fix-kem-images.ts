// fix-kem-images.ts — Phase 1 P0: bring the 7 KEM-linked drugs that are below
// the 4-image standard up to 4 images each. Uses the real crawler pipeline
// (search → download → validate → dedup → optimize → upload → insert) and the
// drug's existing hashes so nothing is re-inserted. Skips the refresh-state
// "done" check on purpose (these 7 are already marked done from the previous
// cap pass but still sit below 4 images).
//
// Usage: npx tsx scripts/fix-kem-images.ts   (env CRAWL_MAX_IMAGES, default 4)
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { crawlDrug } from '../src/services/crawler/imageCrawler'

const KEM_TARGETS = [
  'b0000000-0000-0000-0000-000000000006', // Amoxicillin-Clavulanate (1 img)
  '9fdafaaa-ee6c-4020-b2dc-eee5f5d25b83', // Artemether–Lumefantrine (2 img)
  '8adb3d7f-141f-48e0-936b-2641088ca58b', // Cephalexin (2 img)
  'd2f84d78-91b9-48c6-8f12-7e11e26ee9e0', // Insulin (Biphasic Isophane) (2 img)
  'b0000000-0000-0000-0000-000000000002', // Insulin (Regular/Soluble) (3 img)
  'b0000000-0000-0000-0000-000000000001', // Metformin (3 img)
  'b0000000-0000-0000-0000-000000000007', // Salbutamol (3 img)
]

const MAX = Number(process.env.CRAWL_MAX_IMAGES || '4')

async function main() {
  const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  })

  const { data: drugs } = await admin.from('drug_monographs').select('id, generic_name, name').in('id', KEM_TARGETS)
  if (!drugs || drugs.length === 0) throw new Error('No matching drugs found')

  const { data: images } = await admin
    .from('drug_images')
    .select('drug_id, hash, source')
    .in('drug_id', KEM_TARGETS)
  const perDrug = new Map<string, { count: number; hashes: Set<string> }>()
  for (const row of (images as any[]) || []) {
    const e = perDrug.get(row.drug_id) || { count: 0, hashes: new Set<string>() }
    e.count++
    if (row.hash) e.hashes.add(row.hash)
    perDrug.set(row.drug_id, e)
  }

  console.log(`[fix-kem] targets=${drugs.length} max_images=${MAX}`)
  let added = 0

  for (const drug of drugs as any[]) {
    const e = perDrug.get(drug.id) || { count: 0, hashes: new Set<string>() }
    const name = drug.generic_name || drug.name
    const need = Math.max(0, MAX - e.count)
    console.log(`\n[${name}] before=${e.count} need=${need}`)
    if (need === 0) {
      console.log('  already at cap, skipping')
      continue
    }
    try {
      const stats = await crawlDrug(drug.id, name, undefined, '', e.hashes, e.count)
      const after = (perDrug.get(drug.id)?.count || 0) + stats.accepted
      added += stats.accepted
      console.log(`  +${stats.accepted} accepted, -${stats.rejected} rejected (gallery ${e.count} → ${after})`)
      if (stats.failures.length > 0) console.log(`  failures: ${stats.failures.slice(0, 3).join(' | ')}`)
    } catch (err: any) {
      console.log(`  [err] ${err.message}`)
    }
  }

  console.log(`\n[done] images_added=${added}`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
