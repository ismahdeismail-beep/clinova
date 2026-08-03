// Last-chance fill for the remaining zero-image monographs:
//  - biologics/mAbs → RCSB PDB full-text search → PDBe static ribbon image
//  - small molecules that slipped through → PubChem retry with alternate names
//  - Nebulised Saline → sodium chloride structure
// Resumable via storage/pdb_state.json.
//
// Usage: npx tsx scripts/_pdb-fill.ts [--limit N]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import { validateImage, optimizeImage, scoreQuality } from '../src/services/crawler/imageProcessor'

const STATE_FILE = 'storage/pdb_state.json'
const BUCKET = 'medicine-images'
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : 0

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

const UA = 'Clinova/1.0 (educational app)'

const PUBCH_ALT: Record<string, string> = {
  'Rapacurium': 'Rapacuronium',
  'Protamine Sulfate': 'Protamine',
  'Nebulised Saline': 'Sodium Chloride',
  'PCSK9 Inhibitor': 'PCSK9',
  'Nepidemnib': 'Ritlecitinib',
}

// For mAbs with no direct PDB entry, fall back to the target protein the drug
// binds (visually represents the drug's biology).
const PDB_TARGET: Record<string, string> = {
  'Alirocumab': 'PCSK9',
  'Evolocumab': 'PCSK9',
  'Tildrakizumab': 'IL-23',
  'Risankizumab': 'IL-23',
  'Mepolizumab': 'IL-5',
  'Benralizumab': 'IL-5 receptor',
  'Satralizumab': 'IL-6 receptor',
  'Concizumab': 'TFPI',
  'Idarucizumab': 'dabigatran',
  'Abatacept': 'CTLA-4',
  'Somatrogon': 'growth hormone',
  'Fitusiran': 'antithrombin',
}

async function pdbIdFor(name: string): Promise<string | null> {
  try {
    const res = await fetch('https://search.rcsb.org/rcsbsearch/v2/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': UA },
      body: JSON.stringify({
        query: { type: 'terminal', service: 'full_text', parameters: { value: name } },
        return_type: 'entry',
        request_options: { paginate: { start: 0, rows: 1 } },
      }),
    })
    if (!res.ok) return null
    const data: any = await res.json()
    return data?.result_set?.[0]?.identifier?.toLowerCase() || null
  } catch {
    return null
  }
}

async function pdbeImage(pdbId: string): Promise<Buffer | null> {
  try {
    const url = `https://www.ebi.ac.uk/pdbe/static/entry/${pdbId}_deposited_chain_front_image-800x800.png`
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    return buf.length > 5000 ? buf : null
  } catch {
    return null
  }
}

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
    const size = record === '2d' ? 'image_size=600x600' : 'image_size=large'
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?record_type=${record}&${size}`
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    return buf.length > 1000 ? buf : null
  } catch {
    return null
  }
}

// Decode + upscale structure renders; skip photo-only blur/color checks.
async function prepareStructure(buf: Buffer, minSize = 600): Promise<Buffer | null> {
  try {
    const sharp = (await import('sharp')).default
    const meta = await sharp(buf).metadata()
    const w = meta.width || 0
    const h = meta.height || 0
    if (w < 300 || h < 300) return null
    if (w < minSize || h < minSize) {
      return sharp(buf).resize(minSize, minSize, { fit: 'inside' }).png().toBuffer()
    }
    return buf
  } catch {
    return null
  }
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
  const folder = (drug.generic_name || drug.name).replace(/[^a-z0-9]/gi, '_').toLowerCase()
  const safeName = `${folder}-${meta.kind}-${Date.now()}`

  const uploads = [
    { path: `${folder}/${safeName}.webp`, buf: optimized.original, key: 'image_url' },
    { path: `${folder}/${safeName}_large.webp`, buf: optimized.large, key: 'large_url' },
    { path: `${folder}/${safeName}_medium.webp`, buf: optimized.medium, key: 'medium_url' },
    { path: `${folder}/${safeName}_thumb.webp`, buf: optimized.thumbnail, key: 'thumbnail_url' },
  ]
  const urls: Record<string, string> = {}
  for (const u of uploads) {
    const { error } = await admin.storage.from(BUCKET).upload(u.path, u.buf, { contentType: 'image/webp', upsert: false })
    if (error) {
      console.log(`    [upload-err] ${u.path}: ${error.message}`)
      return false
    }
    const { data } = admin.storage.from(BUCKET).getPublicUrl(u.path)
    urls[u.key] = data.publicUrl
  }

  const { error } = await admin.from('drug_images').insert({
    drug_id: drug.id,
    generic_name: drug.generic_name || drug.name,
    dosage_form: '',
    strength: '',
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
  console.log(`    [ok] ${meta.kind} q=${q} ${meta.source}`)
  return true
}

function pdbName(name: string): string {
  let n = name
    .replace(/\s*(Intravitreal|Biosimilar|Long-Acting|Ophthalmic|Topical)\b.*$/i, '')
    .replace(/\s*\/.*$/, '')
  if (n === 'Trastuzumab Deruxtecan') n = 'Trastuzumab'
  if (n === 'Sacituzumab Govitecan') n = 'Sacituzumab'
  if (n === 'Infliximab Biosimilar') n = 'Infliximab'
  return n
}

async function main() {
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
      const { data } = await admin.from('drug_monographs').select('id, generic_name, name').range(from, from + 999)
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

    // 1) PDB protein structure for biologics (own name, then binding target)
    const pdbN = pdbName(name)
    let pdbId = await pdbIdFor(pdbN)
    let pdbIsTarget = false
    if (!pdbId && PDB_TARGET[name]) {
      pdbId = await pdbIdFor(PDB_TARGET[name])
      pdbIsTarget = true
    }
    if (pdbId) {
      const img = await pdbeImage(pdbId)
      if (img) {
        const prep = await prepareStructure(img, 700)
        if (prep && (await saveAndInsert(d, prep, {
          source: pdbIsTarget ? `RCSB PDB (target: ${PDB_TARGET[name]})` : 'RCSB PDB / PDBe ribbon structure',
          license: 'PDBe (EMBL-EBI)', license_url: `https://www.ebi.ac.uk/pdbe/entry/${pdbId}`,
          author: 'PDBe (EMBL-EBI)', page_url: `https://www.ebi.ac.uk/pdbe/entry/${pdbId}`, kind: 'structure',
        }))) added++
      } else {
        console.log(`    [no-pdbe-img] ${pdbId}`)
      }
    } else {
      console.log('    [no-pdb] no PDB full-text match')
    }
    await new Promise((r) => setTimeout(r, 350))

    // 2) PubChem structure for small molecules / saline
    const pcName = PUBCH_ALT[name] || name
    const cid = await pubchemCid(pcName)
    if (cid) {
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
      console.log('    [no-cid] no PubChem entry')
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
