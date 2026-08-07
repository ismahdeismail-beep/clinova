// Purge junk / wrong-drug images from the KDI galleries.
//
// Deletes rows whose image is NOT drug imagery (logos, charts, disease
// photos, hair-salon business cards, Roman-bath scenery, lecture PDF page
// placeholders, mechanism diagrams) or that show a different product than the
// monograph (Takamine enzyme jar, "assorted pharmaceuticals" collage, historic
// drug kits). Storage objects are removed too, so the bucket stays clean.
//
// Usage: npx tsx scripts/purge-junk-images.ts [--dry-run]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const dryRun = process.argv.includes('--dry-run')

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

// Filename junk heuristics (plain Wikimedia rows).
const JUNK_RE =
  /(logo|chart|graph|diagram|flowchart|figure\s*\d|scheme\s*\d|graphical abstract|qr[_ ]?code|barcode|infographic|\btable[_ ]?\d|timeline|business card|eczema|psoriasis|biopsy|histolog|microscop|scan|ultrasound|x[ -]?ray|mri|ct[_ ]?scan|poster|cover|title page|screenshot|drawing by|banner)/i

// Wrong-drug / non-drug-specific files that pass the filename heuristics but
// are still not the drug: enzyme jars, assorted-pharmaceutical collages,
// historic nursing kits, city scenery.
const WRONG_DRUG_RE =
  /(takamine|assorted_pharmaceuticals|park_davis|roman_baths|nursing_drug_kit|german_hair)/i

const LECTURE_RE = /example\.local\/lectures|LECTURE\s*\d/i

function isJunk(r: any): boolean {
  const s = String(r.source || '')
  if (LECTURE_RE.test(String(r.page_url || ''))) return true
  if (s.includes('Lecture Notes')) return true
  const name = decodeURIComponent((r.page_url || '').split('/').pop() || '')
    .toLowerCase()
    .replace(/^file:/, '')
    .replace(/\.[a-z0-9]+$/i, '')
  if (WRONG_DRUG_RE.test(name)) return true
  if (JUNK_RE.test(name)) return true
  return false
}

async function fetchAll(table: string, cols: string, step = 1000): Promise<any[]> {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 80; i++) {
    const { data, error } = await admin.from(table as any).select(cols).range(from, from + step - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += step
    if (data.length < step) break
  }
  return all
}

async function deleteRows(rows: any[]): Promise<void> {
  // storage objects first (extract keys from the public URLs)
  const keys = new Set<string>()
  for (const r of rows) {
    for (const col of ['image_url', 'large_url', 'medium_url', 'thumbnail_url']) {
      const u = r[col]
      if (!u) continue
      const marker = '/object/public/medicine-images/'
      const idx = u.indexOf(marker)
      if (idx >= 0) keys.add(u.slice(idx + marker.length).split('?')[0])
    }
  }
  if (keys.size > 0) {
    const list = [...keys]
    for (let i = 0; i < list.length; i += 100) {
      const { error } = await admin.storage.from('medicine-images').remove(list.slice(i, i + 100))
      if (error) console.error('  storage remove error:', error.message)
    }
    console.log(`  removed ${list.length} storage object(s)`)
  }
  const ids = rows.map((r) => r.id)
  for (let i = 0; i < ids.length; i += 500) {
    const { error } = await admin.from('drug_images').delete().in('id', ids.slice(i, i + 500))
    if (error) console.error('  db delete error:', error.message)
  }
  console.log(`  removed ${ids.length} row(s)`)
}

async function main() {
  const images = await fetchAll('drug_images', 'id, drug_id, generic_name, source, image_url, large_url, medium_url, thumbnail_url, page_url')
  const junk = images.filter(isJunk)
  console.log(`total rows: ${images.length}  junk candidates: ${junk.length}  dryRun=${dryRun}`)

  for (const r of junk) {
    console.log(`  [junk] ${String(r.generic_name).padEnd(20)} ${String(r.page_url).slice(0, 95)}`)
  }

  if (junk.length === 0) return

  const affectedDrugs = new Set(junk.map((r) => r.drug_id))
  const remaining = new Map<string, number>()
  for (const r of images) {
    if (junk.some((j) => j.id === r.id)) continue
    remaining.set(r.drug_id, (remaining.get(r.drug_id) || 0) + 1)
  }

  console.log('\n--- drugs affected (images left after purge) ---')
  for (const r of junk) {
    const left = remaining.get(r.drug_id) || 0
    console.log(`  ${String(r.generic_name).padEnd(22)} ${left} image(s) remain`)
  }
  const nowEmpty = [...affectedDrugs].filter((d) => (remaining.get(d) || 0) === 0)
  if (nowEmpty.length > 0) {
    console.log('\nWARNING — drugs that would end up with ZERO images:')
    for (const d of nowEmpty) console.log('  ', d)
  }

  if (!dryRun) {
    await deleteRows(junk)
    console.log('\n[done] purge complete')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
