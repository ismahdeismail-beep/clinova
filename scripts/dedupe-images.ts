// Post-refill cleanup: (1) remove duplicate drug_images rows (same drug_id +
// hash — the two concurrent refill runs both inserted copies), keeping the
// earliest; (2) remove Kenyan-brand rows attached to the wrong drug (combo
// products like amoxicillin/clavulanate that the current matcher excludes).
// Also deletes the orphaned storage files of removed rows.
// Usage: npx tsx scripts/dedupe-images.ts [--dry-run]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { kenyanBrandImagesFor } from '../src/services/crawler/kenyanBrandImages'

const dryRun = process.argv.includes('--dry-run')
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

async function fetchAll(table: string, cols: string): Promise<any[]> {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 60; i++) {
    const { data, error } = await admin.from(table as any).select(cols).range(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
  }
  return all
}

async function main() {
  const imgs = await fetchAll('drug_images', 'id, drug_id, generic_name, hash, source, image_url, large_url, medium_url, thumbnail_url, page_url, created_at')
  console.log(`total rows: ${imgs.length}`)

  // ── 1. duplicates by (drug_id, hash) ──
  const seen = new Map<string, any[]>()
  for (const r of imgs) {
    if (!r.hash) continue
    const k = `${r.drug_id}::${r.hash}`
    if (!seen.has(k)) seen.set(k, [])
    seen.get(k)!.push(r)
  }
  const dupRows: any[] = []
  for (const rows of seen.values()) {
    if (rows.length < 2) continue
    rows.sort((a, b) => (a.created_at || '').localeCompare(b.created_at || ''))
    dupRows.push(...rows.slice(1)) // keep earliest
  }
  console.log(`duplicate rows (keep earliest): ${dupRows.length}`)

  // ── 2. Kenyan rows on drugs the matcher now excludes ──
  const nameById = new Map<string, string>()
  for (const r of imgs) nameById.set(r.drug_id, r.generic_name)
  const wrongKe: any[] = []
  for (const r of imgs) {
    if (r.source !== 'Kenyan brand (Lab & Allied)') continue
    const name = r.generic_name || nameById.get(r.drug_id) || ''
    if (kenyanBrandImagesFor(name).length === 0) wrongKe.push(r)
  }
  console.log(`wrong-drug Kenyan rows: ${wrongKe.length}`)
  for (const r of wrongKe) console.log('   ', r.generic_name, '|', (r.page_url || '').split('/').pop()?.slice(0, 50))

  const toDelete = [...dupRows, ...wrongKe]
  // dedupe by id (a row could be in both lists)
  const byId = new Map<string, any>()
  for (const r of toDelete) if (!byId.has(r.id)) byId.set(r.id, r)
  const del = [...byId.values()]
  console.log(`\nrows to delete: ${del.length}${dryRun ? ' (DRY RUN)' : ''}`)

  // storage files for removed rows
  const keys = new Set<string>()
  for (const r of del) {
    for (const col of ['image_url', 'large_url', 'medium_url', 'thumbnail_url']) {
      const u = r[col]
      if (!u) continue
      const marker = '/object/public/medicine-images/'
      const idx = u.indexOf(marker)
      if (idx >= 0) keys.add(u.slice(idx + marker.length).split('?')[0])
    }
  }
  console.log(`orphaned storage files: ${keys.size}${dryRun ? ' (DRY RUN)' : ''}`)

  if (dryRun) return
  const list = [...keys]
  for (let i = 0; i < list.length; i += 100) {
    const { error } = await admin.storage.from('medicine-images').remove(list.slice(i, i + 100))
    if (error) console.error('storage remove:', error.message)
  }
  const ids = del.map((r) => r.id)
  for (let i = 0; i < ids.length; i += 500) {
    const { error } = await admin.from('drug_images').delete().in('id', ids.slice(i, i + 500))
    if (error) console.error('db delete:', error.message)
  }
  console.log('done')
}
main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
