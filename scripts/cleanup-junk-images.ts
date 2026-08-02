// cleanup-junk-images.ts — delete misplaced/non-drug images and re-crawl the
// affected drugs with the fixed crawler (stricter relevance filters + Kenyan
// brand tier). Drugs with a curated Kenyan-brand image get all stale images
// cleared so the local packaging lands first in the gallery.
// Usage: npx tsx scripts/cleanup-junk-images.ts [--dry-run] [--limit N]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { crawlDrug } from '../src/services/crawler/imageCrawler'
import { isSubjectJunkTitle } from '../src/services/crawler/kenyanBrands'
import { hasKenyanBrandImage } from '../src/services/crawler/kenyanBrandImages'

const dryRun = process.argv.includes('--dry-run')
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : 0

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

function fileTitleFromPageUrl(pageUrl: string): string {
  const name = decodeURIComponent((pageUrl || '').split('/').pop() || '')
  return name.replace(/^File:/, '').replace(/\.[a-z0-9]+$/i, '')
}

async function fetchAllImages(): Promise<any[]> {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 25; i++) {
    const { data, error } = await admin.from('drug_images').select('*').range(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
  }
  return all
}

async function deleteImages(rows: any[]): Promise<number> {
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
  let removed = 0
  if (keys.size > 0 && !dryRun) {
    const list = [...keys]
    for (let i = 0; i < list.length; i += 100) {
      const { error } = await admin.storage.from('medicine-images').remove(list.slice(i, i + 100))
      if (error) console.error('storage remove error:', error.message)
      removed += Math.min(100, list.length - i)
    }
  }
  const ids = rows.map((r) => r.id)
  if (ids.length > 0 && !dryRun) {
    for (let i = 0; i < ids.length; i += 500) {
      const { error } = await admin.from('drug_images').delete().in('id', ids.slice(i, i + 500))
      if (error) console.error('db delete error:', error.message)
    }
  }
  return removed
}

async function main() {
  const images = await fetchAllImages()
  console.log(`total images: ${images.length}${dryRun ? ' (DRY RUN — no changes)' : ''}`)

  const junkByDrug = new Map<string, any[]>()
  for (const img of images) {
    if (img.source === 'Kenyan brand (Lab & Allied)') continue
    const title = fileTitleFromPageUrl(img.page_url || img.image_url || '')
    if (isSubjectJunkTitle(title)) {
      if (!junkByDrug.has(img.drug_id)) junkByDrug.set(img.drug_id, [])
      junkByDrug.get(img.drug_id)!.push(img)
    }
  }
  console.log(`junk images: ${[...junkByDrug.values()].reduce((a, b) => a + b.length, 0)} across ${junkByDrug.size} drugs`)

  // Drugs with Kenyan brand availability: clear everything for a fresh crawl so
  // the local packaging becomes the primary (first) image.
  const kenyanDrugs = new Map<string, any[]>()
  const drugNames = new Map<string, string>()
  for (const img of images) drugNames.set(img.drug_id, img.generic_name)
  const { data: monographs } = await admin.from('drug_monographs').select('id, generic_name').limit(5000)
  for (const d of monographs || []) {
    if (!d.generic_name) continue
    drugNames.set(d.id, d.generic_name)
    if (hasKenyanBrandImage(d.generic_name)) {
      const rows = images.filter((i) => i.drug_id === d.id && i.source !== 'Kenyan brand (Lab & Allied)')
      if (rows.length > 0) kenyanDrugs.set(d.id, rows)
    }
  }
  console.log(`kenyan-brand drugs needing refresh: ${kenyanDrugs.size}`)

  // Merge targets: junk drugs ∪ kenyan drugs
  const targets = new Map<string, string>()
  const toDelete: any[] = []
  for (const [drugId, rows] of junkByDrug) {
    const name = drugNames.get(drugId) || rows[0]?.generic_name
    if (name) targets.set(drugId, name)
    toDelete.push(...rows)
  }
  for (const [drugId, rows] of kenyanDrugs) {
    const name = drugNames.get(drugId) || rows[0]?.generic_name
    if (name) targets.set(drugId, name)
    toDelete.push(...rows)
  }

  const list = [...targets.entries()].slice(0, LIMIT || undefined)
  console.log(`will delete ${toDelete.length} rows and re-crawl ${list.length} drugs`)

  const removedStorage = await deleteImages(toDelete)
  console.log(`deleted ${removedStorage} storage files, ${toDelete.length} db rows${dryRun ? ' (dry run)' : ''}`)
  if (dryRun) return

  // Re-crawl targets with the fixed crawler (Kenyan tier reserves slots).
  const { data: remaining } = await admin.from('drug_images').select('drug_id, hash').limit(10000)
  const hashesByDrug = new Map<string, Set<string>>()
  for (const r of remaining || []) {
    if (!r.hash) continue
    if (!hashesByDrug.has(r.drug_id)) hashesByDrug.set(r.drug_id, new Set())
    hashesByDrug.get(r.drug_id)!.add(r.hash)
  }

  let done = 0
  const failed: string[] = []
  for (const [drugId, genericName] of list) {
    const existing = hashesByDrug.get(drugId) || new Set<string>()
    try {
      const stats = await crawlDrug(drugId, genericName, undefined, '', existing, existing.size)
      done++
      console.log(
        `[${done}/${list.length}] ${genericName}: found=${stats.found} accepted=${stats.accepted} rejected=${stats.rejected} failures=${stats.failures.length}`,
      )
    } catch (e: any) {
      failed.push(`${genericName}: ${e.message}`)
      console.error(`[ERR] ${genericName}: ${e.message}`)
    }
  }
  console.log(`\ndone: ${done}/${list.length} re-crawled, failed: ${failed.length}`)
  if (failed.length) console.log('failures:', failed.join('\n'))
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
