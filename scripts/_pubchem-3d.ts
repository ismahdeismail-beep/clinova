// Generate a PubChem 3D conformer image for every monograph that doesn't
// already have a 3D/PDB render, so the 3D structure is the universal drug
// icon. Parallel-friendly: WORKER_INDEX / WORKER_COUNT shard the drug list;
// each worker writes its own resumable state file (drugs are disjoint, so no
// merge step is needed).
//
// Usage: WORKER_INDEX=0 WORKER_COUNT=4 npx tsx scripts/_pubchem-3d.ts
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import { optimizeImage, scoreQuality } from '../src/services/crawler/imageProcessor'

const WORKER_INDEX = Number(process.env.WORKER_INDEX || '0')
const WORKER_COUNT = Number(process.env.WORKER_COUNT || '1')
const STATE_FILE = `storage/pubchem3d_w${WORKER_INDEX}.json`
const BUCKET = 'medicine-images'
const dryRun = process.argv.includes('--dry-run')
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : 0

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

async function pubchem3d(cid: string): Promise<Buffer | null> {
  try {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?record_type=3d&image_size=large`
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 1000) return null // error XML
    return buf
  } catch {
    return null
  }
}

async function pubchem2d(cid: string): Promise<Buffer | null> {
  try {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?record_type=2d&image_size=600x600`
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 1000) return null
    return buf
  } catch {
    return null
  }
}

// Structure renderings are thin line-art — decode, upscale to >=600px, and
// check dimensions only (photo blur/color checks don't apply).
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

async function existingHashes(drugId: string): Promise<Set<string>> {
  const { data } = await admin.from('drug_images').select('hash').eq('drug_id', drugId)
  return new Set((data || []).map((r: any) => r.hash))
}

async function saveAndInsert(drug: any, buf: Buffer, is3d: boolean): Promise<boolean> {
  const sharp = (await import('sharp')).default
  const m = await sharp(buf).metadata()
  const width = m.width || 0
  const height = m.height || 0
  const format = m.format || 'unknown'
  const optimized = await optimizeImage(buf)
  const existing = await existingHashes(drug.id)
  if (existing.has(optimized.hash)) {
    console.log('    [dup] hash collision')
    return false
  }

  const q = scoreQuality(width, height, format)
  const folder = (drug.generic_name || drug.name).replace(/[^a-z0-9]/gi, '_').toLowerCase()
  const safeName = `${drug.generic_name || drug.name}-3d`.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  const ts = Date.now()
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
      source: is3d ? 'PubChem (NIH) 3D conformer' : 'PubChem (NIH) 2D skeletal',
      license: 'Public domain (NIH)',
      license_url: 'https://pubchem.ncbi.nlm.nih.gov',
      author: 'PubChem (NIH)',
      page_url: 'https://pubchem.ncbi.nlm.nih.gov',
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
  console.log(`    [ok] 3D conformer q=${q} ${width}x${height}`)
  return true
}

const MANUAL_COMBO: Record<string, string> = {
  'Netupitant Palonosetron': 'Netupitant',
}

const SALT_SUFFIX =
  /\s+(Sodium|Potassium|Calcium|Magnesium|Zinc|Ferrous|Hydrochloride|Hydrobromide|HCl|Sulfate|Sulphate|Phosphate|Tartrate|Maleate|Fumarate|Mesylate|Besylate|Tosylate|Citrate|Acetate|Lactate|Oxalate|Succinate|Nitrate|Carbonate|Bicarbonate|Hydroxide|Stearate|Pamoate|Gluconate|Edetate|Sennosides?)\b.*$/i

function lookupCandidates(name: string): string[] {
  if (MANUAL_COMBO[name]) return [MANUAL_COMBO[name]]
  let n = name.trim().replace(
    /\s*(Topical|Eye Drops|Ophthalmic|Long-Acting|LA|Intravitreal|Biosimilar|Prophylaxis|Nebulised|Nebulized|Injection|Injectable|Oral|Cream|Ointment|Gel|Lotion|Tablets?|Capsules?|Solution|Drops|Suspension|Syrup|Powder|Patch|Suppository|Inhaler|Spray|Infusion)\b.*$/i,
    '',
  )
  if (!n) n = name.trim()
  const out: string[] = [n]
  // salt forms (X Sodium → X) often lack a 3D render while the parent has one
  const stripped = n.replace(SALT_SUFFIX, '').trim()
  if (stripped && stripped !== n) out.push(stripped)
  for (const part of n.split(/\s*[+/]\s*/).map((s) => s.trim()).filter(Boolean)) out.push(part)
  return Array.from(new Set(out))
}

// First candidate whose CID yields a structure render wins. Tries 3D first;
// if PubChem has no 3D conformer for the compound, falls back to the 2D
// skeletal so the icon is a structure (priority 1) rather than a photo (2).
async function findStructure(name: string): Promise<{ cid: string; label: string; buf: Buffer; is3d: boolean } | null> {
  for (const cand of lookupCandidates(name)) {
    const cid = await pubchemCid(cand)
    if (!cid) continue
    const p3 = await pubchem3d(cid)
    if (p3) return { cid, label: cand, buf: p3, is3d: true }
    const p2 = await pubchem2d(cid)
    if (p2) return { cid, label: cand, buf: p2, is3d: false }
  }
  return null
}

// Deterministic shard so parallel workers never touch the same drug.
function shard(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % WORKER_COUNT
}

async function main() {
  // Drugs that already have a 3D/PDB render (priority-0 sources)
  const has3d = new Set<string>()
  {
    let from = 0
    for (let i = 0; i < 80; i++) {
      const { data } = await admin
        .from('drug_images')
        .select('drug_id, source')
        .range(from, from + 999)
      if (!data || data.length === 0) break
      for (const r of data) {
        const s = (r.source || '').toLowerCase()
        if (/(3d|pdbe|pdb|ribbon|conformer)/.test(s)) has3d.add(r.drug_id)
      }
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

  const targets = drugs.filter((d) => !has3d.has(d.id) && shard(d.id) === WORKER_INDEX)
  console.log(`worker ${WORKER_INDEX}/${WORKER_COUNT}: ${targets.length} drugs need a 3D render`)

  const state: { done: string[]; ok: string[]; nocid: string[] } = fs.existsSync(STATE_FILE)
    ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
    : { done: [], ok: [], nocid: [] }
  const done = new Set(state.done)

  let ok = 0
  let nocid = 0
  const slice = targets.slice(0, LIMIT || undefined)
  for (const d of slice) {
    const name = d.generic_name || d.name
    if (done.has(d.id)) continue
    console.log(`\n== ${name} ==`)
    const found = await findStructure(name)
    if (!found) {
      console.log('    [no-3d] PubChem has no entry / 3D render')
      nocid++
      done.add(d.id)
      state.nocid.push(d.id)
    } else {
      const p3b = await prepareStructure(found.buf)
      if (p3b && (await saveAndInsert(d, p3b, found.is3d))) {
        ok++
        state.ok.push(d.id)
      } else {
        console.log('    [no-3d] render rejected')
        nocid++
        state.nocid.push(d.id)
      }
      done.add(d.id)
    }
    state.done = Array.from(done)
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
    await new Promise((r) => setTimeout(r, 300))
  }
  console.log(`\n[worker ${WORKER_INDEX} done] inserted=${ok} no3d=${nocid} total_done=${done.size}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
