// Fill zero-image monographs from a second source: PubChem (NIH) renders
// (2D skeletal + 3D conformer) plus a Wikipedia REST lead-image as a
// photo/packaging chance. Resumable via storage/pubchem_state.json.
//
// Usage: npx tsx scripts/_pubchem-fill.ts [--limit N] [--dry-run]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import {
  downloadImage,
  validateImage,
  optimizeImage,
  scoreQuality,
  computeDHash,
} from '../src/services/crawler/imageProcessor'

const STATE_FILE = 'storage/pubchem_state.json'
const BUCKET = 'medicine-images'
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : 0
const dryRun = process.argv.includes('--dry-run')

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

const UA = 'Clinova/1.0 (educational app; contact: admin@clinova.app)'

async function pubchemCid(name: string): Promise<string | null> {
  try {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(name)}/cids/TXT`
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) return null
    const txt = (await res.text()).trim()
    return txt.split('\n')[0] || null
  } catch {
    return null
  }
}

async function pubchemPng(cid: string, record: '2d' | '3d'): Promise<Buffer | null> {
  try {
    // 2D supports explicit WxH; 3D renders at 300x300 (upscaled later)
    const size = record === '2d' ? 'image_size=600x600' : 'image_size=large'
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?record_type=${record}&${size}`
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 1000) return null // error XML
    return buf
  } catch {
    return null
  }
}

// Structure renderings are thin line-art on white/transparent — the photo
// validator's blur/color checks don't apply. Decode, upscale to >=600px, and
// check dimensions only.
async function prepareStructure(buf: Buffer): Promise<Buffer | null> {
  try {
    const sharp = (await import('sharp')).default
    const meta = await sharp(buf).metadata()
    const w = meta.width || 0
    const h = meta.height || 0
    if (w < 300 || h < 300) return null
    if (w < 600 || h < 600) {
      return sharp(buf)
        .resize(600, 600, { fit: 'inside' })
        .png()
        .toBuffer()
    }
    return buf
  } catch {
    return null
  }
}

async function wikiLeadImage(name: string): Promise<{ url: string; title: string } | null> {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })
    if (!res.ok) return null
    const data: any = await res.json()
    const img = data?.originalimage?.source || data?.thumbnail?.source
    if (!img) return null
    return { url: img, title: data.title || name }
  } catch {
    return null
  }
}

function kindOfTitle(title: string): 'structure' | 'product' | 'packaging' {
  const t = title.toLowerCase()
  if (/(structure|skeletal|ball.?and.?stick|3d|conformer|formula|chemical|molecular|graphical|abstract)/.test(t)) return 'structure'
  if (/(box|pack|vial|bottle|blister|carton|label|tablet|tab|cap|capsule|ampoule|injection|syringe)/.test(t)) return 'packaging'
  return 'product'
}

async function existingHashes(drugId: string): Promise<Set<string>> {
  const { data } = await admin.from('drug_images').select('hash').eq('drug_id', drugId)
  return new Set((data || []).map((r: any) => r.hash))
}

async function saveAndInsert(
  drug: any,
  buf: Buffer,
  meta: { source: string; license: string; license_url: string; author: string; page_url: string; kind: 'structure' | 'product' | 'packaging' },
): Promise<boolean> {
  let width = 0
  let height = 0
  let format = 'unknown'
  if (meta.kind === 'structure') {
    // prepared by prepareStructure: decoded + >=600px
    const sharp = (await import('sharp')).default
    const m = await sharp(buf).metadata()
    width = m.width || 0
    height = m.height || 0
    format = m.format || 'unknown'
  } else {
    const validation = await validateImage(buf)
    if (!validation.valid) {
      console.log(`    [reject] ${meta.kind}: ${validation.reason}`)
      return false
    }
    width = validation.width
    height = validation.height
    format = validation.format
  }
  const optimized = await optimizeImage(buf)
  const existing = await existingHashes(drug.id)
  if (existing.has(optimized.hash)) {
    console.log(`    [dup] ${meta.kind}: hash collision`)
    return false
  }

  const q = scoreQuality(width, height, format)
  const safeName = `${drug.generic_name || drug.name}-${meta.kind}-pubchem`.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  const ts = Date.now()
  const folder = (drug.generic_name || drug.name).replace(/[^a-z0-9]/gi, '_').toLowerCase()

  const uploads = [
    { path: `${folder}/${safeName}_${ts}.webp`, buf: optimized.original, key: 'image_url' },
    { path: `${folder}/${safeName}_large_${ts}.webp`, buf: optimized.large, key: 'large_url' },
    { path: `${folder}/${safeName}_medium_${ts}.webp`, buf: optimized.medium, key: 'medium_url' },
    { path: `${folder}/${safeName}_thumb_${ts}.webp`, buf: optimized.thumbnail, key: 'thumbnail_url' },
  ]
  const urls: Record<string, string> = {}
  for (const u of uploads) {
    if (dryRun) continue
    const { error } = await admin.storage.from(BUCKET).upload(u.path, u.buf, { contentType: 'image/webp', upsert: false })
    if (error) {
      console.log(`    [upload-err] ${u.path}: ${error.message}`)
      return false
    }
    const { data } = admin.storage.from(BUCKET).getPublicUrl(u.path)
    urls[u.key] = data.publicUrl
  }

  if (!dryRun) {
    const { error } = await admin.from('drug_images').insert({
      drug_id: drug.id,
      generic_name: drug.generic_name || drug.name,
      dosage_form: drug.dosage_form || '',
      strength: drug.strength || '',
      image_url: urls.image_url,
      thumbnail_url: urls.thumbnail_url,
      large_url: urls.large_url,
      medium_url: urls.medium_url,
      source: meta.source,
      license: meta.license,
      license_url: meta.license_url,
      author: meta.author,
      page_url: meta.page_url,
      hash: optimized.hash,
      verified: false,
      quality_score: q,
      rejection_reason: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    if (error) {
      console.log(`    [insert-err] ${error.message}`)
      return false
    }
  }
  console.log(`    [ok] ${meta.kind} q=${q} ${meta.source}`)
  return true
}

const MANUAL_COMBO: Record<string, string> = {
  'Netupitant Palonosetron': 'Netupitant',
}

// Turn a monograph name into PubChem lookup candidates: strip dosage/suffix
// qualifiers, split slash combos, and handle known space-separated combos.
function lookupCandidates(name: string): string[] {
  if (MANUAL_COMBO[name]) return [MANUAL_COMBO[name]]
  let n = name.trim().replace(
    /\s*(Topical|Eye Drops|Ophthalmic|Long-Acting|LA|Intravitreal|Biosimilar|Prophylaxis|Nebulised|Nebulized|Injection|Injectable|Oral|Topical|Cream|Ointment|Gel|Lotion|Tablets?|Capsules?|Solution|Drops|Suspension|Syrup|Powder|Patch|Suppository|Inhaler|Spray|Infusion)\b.*$/i,
    '',
  )
  if (!n) n = name.trim()
  const out: string[] = [n]
  for (const part of n.split('/').map((s) => s.trim()).filter(Boolean)) out.push(part)
  return Array.from(new Set(out))
}

async function findCid(name: string): Promise<{ cid: string; label: string } | null> {
  for (const cand of lookupCandidates(name)) {
    const cid = await pubchemCid(cand)
    if (cid) return { cid, label: cand }
  }
  return null
}

async function main() {
  // zero-image monographs
  const withImg = new Set<string>()
  {
    let from = 0
    for (let i = 0; i < 80; i++) {
      const { data } = await admin.from('drug_images').select('drug_id').range(from, from + 999)
      if (!data || data.length === 0) break
      for (const r of data) withImg.add(r.drug_id)
      from += 1000
      if (data.length < 1000) break
    }
  }
  const drugs: any[] = []
  {
    let from = 0
    for (let i = 0; i < 80; i++) {
      const { data } = await admin
        .from('drug_monographs')
        .select('id, generic_name, name')
        .range(from, from + 999)
      if (!data || data.length === 0) break
      drugs.push(...data)
      from += 1000
      if (data.length < 1000) break
    }
  }
  const targets = drugs.filter((d) => !withImg.has(d.id))
  console.log(`zero-image monographs: ${targets.length}`)

  const state: { done: string[]; ok: string[] } = fs.existsSync(STATE_FILE)
    ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
    : { done: [], ok: [] }
  const done = new Set(state.done)

  let ok = 0
  const slice = targets.slice(0, LIMIT || undefined)
  for (const d of slice) {
    const name = d.generic_name || d.name
    if (done.has(d.id)) continue
    console.log(`\n== ${name} ==`)
    let added = 0

    const found = await findCid(name)
    if (found) {
      const { cid } = found
      const p3 = await pubchemPng(cid, '3d')
      const p3b = p3 && (await prepareStructure(p3))
      if (p3b && (await saveAndInsert(d, p3b, {
        source: 'PubChem (NIH) 3D conformer', license: 'Public domain (NIH)', license_url: 'https://pubchem.ncbi.nlm.nih.gov',
        author: 'PubChem (NIH)', page_url: `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`, kind: 'structure',
      }))) added++
      await new Promise((r) => setTimeout(r, 300))
      const p2 = await pubchemPng(cid, '2d')
      const p2b = p2 && (await prepareStructure(p2))
      if (p2b && (await saveAndInsert(d, p2b, {
        source: 'PubChem (NIH) 2D structure', license: 'Public domain (NIH)', license_url: 'https://pubchem.ncbi.nlm.nih.gov',
        author: 'PubChem (NIH)', page_url: `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`, kind: 'structure',
      }))) added++
    } else {
      console.log('    [no-cid] PubChem has no entry for this name')
    }

    // Wikipedia lead image as a photo/packaging second chance
    const wiki = await wikiLeadImage(name)
    if (wiki) {
      try {
        const buf = await downloadImage(wiki.url)
        const kind = kindOfTitle(wiki.title)
        if (kind !== 'structure' || added === 0) {
          if (await saveAndInsert(d, buf, {
            source: 'Wikipedia (lead image)', license: 'See page', license_url: wiki.url,
            author: 'Wikipedia', page_url: wiki.url, kind,
          })) added++
        } else {
          console.log('    [skip] Wikipedia lead is another structure')
        }
      } catch {
        console.log('    [dl-err] Wikipedia image download failed')
      }
    } else {
      console.log('    [no-wiki] no Wikipedia article/lead image')
    }

    if (added > 0) ok++
    done.add(d.id)
    state.done = Array.from(done)
    if (added > 0) state.ok.push(d.id)
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
    await new Promise((r) => setTimeout(r, 400))
  }
  console.log(`\n[done] drugs_with_new_images=${ok}/${slice.length}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
