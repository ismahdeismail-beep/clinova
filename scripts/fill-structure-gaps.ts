// Structure-gap fill: give every monograph that lacks a 2D/3D structure
// render one. Pipeline per drug:
//   1. PubChem CID lookup on normalized name variants (handles en-dashes,
//      parenthetical qualifiers, salt forms, Topical/IV/Foam suffixes, combos)
//   2. PubChem 3D conformer PNG → falls back to the 2D skeletal PNG
//   3. Proteins/biologics with no small-molecule CID → RCSB PDB full-text
//      search → PDBe ribbon render
// Products that have no single chemical structure (mixtures, medical devices,
// electrolytes) are logged as `none` and left for the photo fill instead.
//
// Usage:
//   npx tsx scripts/fill-structure-gaps.ts [--limit N] [--dry-run]
//   WORKER_INDEX=0 WORKER_COUNT=4 npx tsx scripts/fill-structure-gaps.ts
// Resumable via storage/structure_fill_w{N}.json.
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import { uploadImages, insertImageRecord } from '../src/services/crawler/imageCrawler'
import { optimizeImage, scoreQuality } from '../src/services/crawler/imageProcessor'

const WORKER_INDEX = Number(process.env.WORKER_INDEX || '0')
const WORKER_COUNT = Number(process.env.WORKER_COUNT || '1')
const STATE_FILE = `storage/structure_fill_w${WORKER_INDEX}.json`
const dryRun = process.argv.includes('--dry-run')
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : 0

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

const UA = 'Clinova/1.0 (educational app)'

const PUBCH_ALT: Record<string, string> = {
  'Nebulised Saline': 'Sodium Chloride',
  'Sodium Polystyrene Sulfonate': 'Polystyrene Sulfonate',
  'Calcium Polystyrene': 'Polystyrene Sulfonate',
  'PCSK9 Inhibitor': 'PCSK9',
  'GnRH Agonist': 'Gonadorelin',
  'Multivitamin': 'Vitamin',
  'Multivitamins': 'Vitamin',
  'Emergency Contraception': 'Levonorgestrel',
  'Nicotine Replacement': 'Nicotine',
  'Insulin Pump Supplies': 'Insulin',
  'Water for Injection': 'Water',
  'Coal Tar': 'Tar',
  'Activated Charcoal': 'Charcoal',
  'Pancreatic Enzymes': 'Pancrelipase',
  'Oral Rehydration Salts': 'Sodium Chloride',
  'Omega-3 Fatty Acids': 'Omega-3',
  'Trace Elements': 'Zinc',
  'Amino Acids': 'Glycine',
  'Selenium': 'Selenium',
  'Fluoroquinolone': 'Ciprofloxacin',
  'Minocycline IV': 'Minocycline',
  'Minocycline Foam': 'Minocycline',
  'Dopamine Low-Dose': 'Dopamine',
  'Dexamethasone Implant': 'Dexamethasone',
  'Ivermectin Topical': 'Ivermectin',
  'Insulin Regular': 'Insulin',
  'Trimethoprim–Sulfamethoxazole (TMP–SMX)': 'Co-trimoxazole',
  'Colistimethate': 'Colistimethate Sodium',
  'Polyethylene Glycol': 'Ethylene Glycol',
  'Cetrimide': 'Cetrimonium',
  'Polymyxin B': 'Polymyxin B1a',
}

// PDB targets for biologics with no direct PDB entry (the drug binds this
// target — the ribbon visually represents the drug's biology).
const PDB_TARGET: Record<string, string> = {
  Alirocumab: 'PCSK9',
  Evolocumab: 'PCSK9',
  Tildrakizumab: 'IL-23',
  Risankizumab: 'IL-23',
  Mepolizumab: 'IL-5',
  Benralizumab: 'IL-5 receptor',
  Satralizumab: 'IL-6 receptor',
  Concizumab: 'TFPI',
  Idarucizumab: 'dabigatran',
  Abatacept: 'CTLA-4',
  Somatrogon: 'growth hormone',
  Fitusiran: 'antithrombin',
  Guselkumab: 'IL-23',
  Infliximab: 'TNF-alpha',
  Adalimumab: 'TNF-alpha',
  Etanercept: 'TNF-alpha',
  Rituximab: 'CD20',
  Tocilizumab: 'IL-6 receptor',
  Pembrolizumab: 'PD-1',
  Nivolumab: 'PD-1',
  Atezolizumab: 'PD-L1',
  Durvalumab: 'PD-L1',
  Avelumab: 'PD-L1',
  Trastuzumab: 'HER2',
  Pertuzumab: 'HER2',
  Cetuximab: 'EGFR',
  Panitumumab: 'EGFR',
  Bevacizumab: 'VEGF',
  Ranibizumab: 'VEGF',
  Denosumab: 'RANKL',
  Omalizumab: 'IgE',
  Secukinumab: 'IL-17A',
  Dupilumab: 'IL-4 receptor',
  Ustekinumab: 'IL-12',
  Vedolizumab: 'integrin',
  Natalizumab: 'integrin',
  Belimumab: 'BLyS',
  Eculizumab: 'C5',
  Ravulizumab: 'C5',
  Ofatumumab: 'CD20',
  Ocrelizumab: 'CD20',
  Ipilimumab: 'CTLA-4',
  'Belantamab Mafodotin': 'BCMA',
  'Enfortumab Vedotin': 'Nectin-4',
  'Tisotumab Vedotin': 'tissue factor',
  'Sacituzumab Govitecan': 'TROP-2',
  'Trastuzumab Deruxtecan': 'HER2',
  'Polatuzumab Vedotin': 'CD79b',
  Anakinra: 'IL-1 receptor',
  Filgrastim: 'G-CSF',
  Pegfilgrastim: 'G-CSF',
  Romiplostim: 'TPO receptor',
  'Darbepoetin Alfa': 'erythropoietin',
  'Epoetin Alfa': 'erythropoietin',
  Pegloticase: 'urate oxidase',
  Rasburicase: 'urate oxidase',
  Asparaginase: 'asparaginase',
  Tenecteplase: 'tissue plasminogen activator',
  Alteplase: 'tissue plasminogen activator',
  Reteplase: 'tissue plasminogen activator',
  Streptokinase: 'streptokinase',
  Dalteparin: 'antithrombin',
  Enoxaparin: 'antithrombin',
  Heparin: 'antithrombin',
  'Andexanet Alfa': 'factor Xa',
  Emicizumab: 'factor IXa',
  Metreleptin: 'leptin',
  'Digoxin Immune Fab': 'digoxin antibody',
  Antivenom: 'immunoglobulin',
  'Interferon Alfa': 'interferon',
  'Interferon Beta': 'interferon',
  'Peginterferon Alfa-2A': 'interferon',
  'PEGINTERFERON ALFA-2A': 'interferon',
  Ibalizumab: 'CD4',
  IBALIZUMAB: 'CD4',
  'Bevacizumab Intravitreal': 'VEGF',
  'Rituximab Biosimilar': 'CD20',
  'Infliximab Biosimilar': 'TNF-alpha',
  'Etanercept Biosimilar': 'TNF-alpha',
  'Insulin Glargine': 'insulin',
  'Insulin Lispro': 'insulin',
  'Insulin Aspart': 'insulin',
  'Insulin Detemir': 'insulin',
  'Insulin Degludec': 'insulin',
  'Insulin Glulisine': 'insulin',
  'Insulin Regular': 'insulin',
  'Insulin NPH': 'insulin',
  'Glucagon': 'glucagon',
  'Dulaglutide': 'GLP-1',
  'Semaglutide': 'GLP-1',
  'Liraglutide': 'GLP-1',
  'Tirzepatide': 'GLP-1',
  'Retatrutide': 'GLP-1',
  'Survodutide': 'GLP-1',
  'Pramlintide': 'amylin',
  'Inclisiran': 'PCSK9',
  'Somatropin': 'growth hormone',
  'Octreotide': 'somatostatin',
  'Pasireotide': 'somatostatin',
  'Teriparatide': 'parathyroid hormone',
  'Buserelin': 'GnRH receptor',
  'GnRH Agonist': 'GnRH receptor',
}

async function pubchemCid(name: string): Promise<string | null> {
  try {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(name)}/cids/TXT`
    const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) })
    if (!res.ok) return null
    const txt = (await res.text()).trim()
    return txt.split('\n')[0] || null
  } catch {
    return null
  }
}

async function pubchemPng(cid: string, record: '3d' | '2d'): Promise<Buffer | null> {
  try {
    const size = record === '3d' ? 'image_size=large' : 'image_size=600x600'
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?record_type=${record}&${size}`
    const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) })
    if (!res.ok) return null
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('image/')) return null
    const buf = Buffer.from(await res.arrayBuffer())
    return buf.length > 100 ? buf : null
  } catch {
    return null
  }
}

// PubChem's name→CID resolver 404s on some valid compounds (Ivermectin,
// Sucralfate…) even though autocomplete finds them. Fall back to the
// autocomplete endpoint's top canonical names and retry the CID lookup.
async function pubchemAutocomplete(name: string): Promise<string[]> {
  try {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${encodeURIComponent(name)}/json`
    const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(15000) })
    if (!res.ok) return []
    const d: any = await res.json()
    return (d?.dictionary_terms?.compound || []).slice(0, 3).map((n: string) => n)
  } catch {
    return []
  }
}

async function pdbIdFor(name: string): Promise<string | null> {
  try {
    const res = await fetch('https://search.rcsb.org/rcsbsearch/v2/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': UA },
      signal: AbortSignal.timeout(20000),
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
    const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    return buf.length > 5000 ? buf : null
  } catch {
    return null
  }
}

// Structure renders are line-art — decode, upscale to >=600px, dimension check
// only (photo blur/color checks don't apply). Tiny 2D icons (a single atom,
// 200px+) are upscaled rather than rejected.
async function prepareStructure(buf: Buffer): Promise<Buffer | null> {
  try {
    const sharp = (await import('sharp')).default
    const meta = await sharp(buf).metadata()
    const w = meta.width || 0
    const h = meta.height || 0
    if (w < 200 || h < 200) return null
    if (w < 600 || h < 600) {
      return sharp(buf).resize(600, 600, { fit: 'inside' }).png().toBuffer()
    }
    return buf
  } catch {
    return null
  }
}

const SALT_SUFFIX =
  /\s+(Sodium|Potassium|Calcium|Magnesium|Zinc|Ferrous|Hydrochloride|Hydrobromide|HCl|Sulfate|Sulphate|Phosphate|Tartrate|Maleate|Fumarate|Mesylate|Besylate|Tosylate|Citrate|Acetate|Lactate|Oxalate|Succinate|Nitrate|Carbonate|Bicarbonate|Hydroxide|Stearate|Pamoate|Gluconate|Edetate)\b.*$/i

// Unicode sub/superscripts in drug names (Vitamin B₉, Fe₂O₃) break PubChem
// lookups — fold them to plain digits.
const SUBSCRIPT_MAP: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
}
function normalizeSubscripts(s: string): string {
  return s.replace(/[₀-₉⁰-⁹]/g, (c) => SUBSCRIPT_MAP[c] || c)
}

// Build the ordered list of PubChem lookup candidates for a drug name.
// Parenthetical content is BOTH removed from the primary name and added as
// its own candidates, so both of these resolve:
//   "Paracetamol (Acetaminophen)"  → paracetamol, acetaminophen
//   "Trimethoprim–Sulfamethoxazole (TMP–SMX)" → trimethoprim sulfamethoxazole, tmp smx
//   "Folic Acid (Vitamin B₉)"      → folic acid, vitamin b9
// Suffix modifiers (Topical/IV/Foam/…) are stripped for the primary lookup.
function lookupCandidates(name: string): string[] {
  if (PUBCH_ALT[name]) return [PUBCH_ALT[name]]
  const parens = [...name.matchAll(/\(([^)]+)\)/g)].map((m) => m[1])
  let primary = name
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[\u2013\u2014\u2012\u2011\u2212-]/g, ' ') // en/em dashes → space
    .replace(/\s*&amp;\s*/gi, ' ')
    .replace(/\s*&\s*/gi, ' ')
  primary = primary
    .replace(/\s+(Topical|Eye Drops|Ophthalmic|Long-Acting|LA|IV|Intravitreal|Biosimilar|Prophylaxis|Nebulised|Nebulized|Injectable|Oral|Cream|Ointment|Gel|Lotion|Tablets?|Capsules?|Solution|Drops|Suspension|Syrup|Powder|Patch|Suppository|Inhaler|Spray|Infusion|Implant|Foam|Low-Dose|Regular|NPH|Acetate)\b.*$/i, '')
  const clean = (s: string): string =>
    normalizeSubscripts(s).replace(/\s+/g, ' ').trim()
  const out: string[] = []
  const add = (s: string) => {
    if (!s) return
    const c = clean(s)
    if (c && !out.includes(c)) out.push(c)
  }
  add(primary)
  for (const p of parens) add(p)
  const stripped = clean(primary).replace(SALT_SUFFIX, '')
  if (stripped && !out.includes(stripped)) out.push(stripped)
  // Split combos on /, + and " and "
  for (const part of primary.split(/\s*[+/]\s*/).map((s) => s.trim()).filter(Boolean)) add(part)
  const combo = primary.split(/\s+and\s+/i)
  if (combo.length > 1) for (const c of combo) add(c)
  return out
}

// PDB ribbon renders are only meaningful for proteins/peptides — a small
// molecule must never get a protein ribbon image.
const BIOLOGIC_RE =
  /(mab\b|mabs|alfa|beta|glargine|lispro|aspart|detemir|degludec|glulisine|filgrastim|pegfilgrastim|interferon|epoetin|eptoetin|stokinase|plase\b|glucagon|insulin|dulaglutide|semaglutide|liraglutide|tirzepatide|retatrutide|survodutide|pramlintide|peptide|enzyme|immune fab|antivenom|toxoid|conjugat|biosimilar|somatropin|somatrogon|metreleptin|romiplostim|anakinra|rasburicase|pegloticase|asparaginase|octreotide|pasireotide|teriparatide|buserelin|leuprolide|goserelin|degarelix|histrelin|triptorelin|protamine|heparin|dalteparin|enoxaparin|leptin)/i

// Try 3D then 2D renders for a resolved CID; returns true when one was stored.
async function tryPubchemRenders(drug: any, cid: string): Promise<boolean> {
  const p3 = await pubchemPng(cid, '3d')
  if (p3) {
    const ready = await prepareStructure(p3)
    if (ready) {
      const ok = await saveAndInsert(drug, ready, 'PubChem (NIH) 3D conformer', 'PubChem (NIH)', 'https://pubchem.ncbi.nlm.nih.gov')
      if (ok) return true
    }
  }
  const p2 = await pubchemPng(cid, '2d')
  if (p2) {
    const ready = await prepareStructure(p2)
    if (ready) {
      return saveAndInsert(drug, ready, 'PubChem (NIH) 2D skeletal', 'PubChem (NIH)', 'https://pubchem.ncbi.nlm.nih.gov')
    }
  }
  return false
}

async function saveAndInsert(
  drug: any,
  buf: Buffer,
  source: string,
  author: string,
  pageUrl: string,
): Promise<boolean> {
  const sharp = (await import('sharp')).default
  const m = await sharp(buf).metadata()
  const width = m.width || 0
  const height = m.height || 0
  const format = m.format || 'unknown'
  const optimized = await optimizeImage(buf)
  const q = scoreQuality(width, height, format)

  // dup check against THIS drug's existing images only (the same PDB ribbon
  // legitimately serves multiple drugs that bind the same target)
  const { data: drugImgs } = await admin
    .from('drug_images')
    .select('hash')
    .eq('drug_id', drug.id)
  const hashes = new Set((drugImgs || []).map((r: any) => r.hash).filter(Boolean))
  if (hashes.has(optimized.hash)) {
    console.log('    [dup] hash collision for this drug')
    return false
  }

  if (dryRun) {
    console.log(`    [dry-run] would insert ${source} q=${q} ${width}x${height}`)
    return true
  }

  const folder = (drug.generic_name || drug.name).replace(/[^a-z0-9]/gi, '_').toLowerCase()
  const safeName = `${folder}-${source.toLowerCase().includes('rcsb') ? '3d' : 'structure'}`.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  const urls = await uploadImages(folder, 'structure', safeName, optimized)
  await insertImageRecord(drug.id, {
    generic_name: drug.generic_name || drug.name,
    dosage_form: 'structure',
    strength: '',
    image_url: urls.image_url,
    thumbnail_url: urls.thumbnail_url,
    large_url: urls.large_url,
    medium_url: urls.medium_url,
    source,
    license: 'Public domain (NIH)',
    license_url: 'https://pubchem.ncbi.nlm.nih.gov',
    author,
    page_url: pageUrl,
    hash: optimized.hash,
    quality_score: q,
  })
  console.log(`    [ok] ${source} q=${q} ${width}x${height}`)
  return true
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

function shard(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % WORKER_COUNT
}

async function main() {
  const images = await fetchAll('drug_images', 'drug_id, source')
  const hasStructure = new Set<string>()
  for (const r of images) {
    const s = String(r.source || '').toLowerCase()
    if (s.includes('pubchem') || s.includes('rcsb') || s.includes('pdbe') || s.includes('structure')) hasStructure.add(r.drug_id)
  }

  const drugs = await fetchAll('drug_monographs', 'id, generic_name, name')
  const targets = drugs.filter((d: any) => !hasStructure.has(d.id) && shard(d.id) === WORKER_INDEX)
  console.log(`worker ${WORKER_INDEX}/${WORKER_COUNT}: ${targets.length} drugs need a structure render`)

  const state: { done: string[]; ok: string[]; none: string[] } = fs.existsSync(STATE_FILE)
    ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
    : { done: [], ok: [], none: [] }
  const done = new Set(state.done)

  let ok = 0
  let none = 0
  for (const d of targets.slice(0, LIMIT || undefined)) {
    const name = d.generic_name || d.name
    if (!name || done.has(d.id)) continue
    console.log(`\n== ${name} ==`)
    const candidates = lookupCandidates(name)
    let inserted = false

    // 1) PubChem 3D → 2D
    for (const cand of candidates) {
      if (inserted) break
      const cid = await pubchemCid(cand)
      if (!cid) continue
      inserted = await tryPubchemRenders(d, cid)
    }
    // PubChem name→CID resolver missed it — ask autocomplete for the canonical
    // names (handles Ivermectin, Sucralfate, Cetrimonium…) and retry.
    if (!inserted) {
      for (const alt of await pubchemAutocomplete(name)) {
        if (inserted) break
        if (candidates.some((c) => c.toLowerCase() === alt.toLowerCase())) continue
        const cid = await pubchemCid(alt)
        if (!cid) continue
        inserted = await tryPubchemRenders(d, cid)
      }
    }

    // 2) PDB ribbon — only for proteins/peptides (never small molecules)
    if (!inserted) {
      const isBiologic = BIOLOGIC_RE.test(name) || Boolean(PDB_TARGET[name])
      if (isBiologic) {
        const pdbName = PDB_TARGET[name] || name
        const pdbId = await pdbIdFor(pdbName)
        if (pdbId) {
          const img = await pdbeImage(pdbId)
          if (img) {
            const ready = await prepareStructure(img)
            if (ready) {
              inserted = await saveAndInsert(
                d,
                ready,
                pdbName !== name ? `RCSB PDB (target: ${pdbName})` : 'RCSB PDB / PDBe ribbon structure',
                'PDBe (EMBL-EBI)',
                `https://www.ebi.ac.uk/pdbe/entry/pdb/${pdbId}`,
              )
            }
          }
        }
      }
    }

    if (inserted) ok++
    else {
      none++
      console.log('    [none] no structure available (mixture/device/biologic without render)')
    }
    done.add(d.id)
    if (!dryRun) {
      if (inserted) state.ok.push(d.id)
      else state.none.push(d.id)
      state.done = Array.from(done)
      fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
    }
    await new Promise((r) => setTimeout(r, 350))
  }
  console.log(`\n[worker ${WORKER_INDEX} done] inserted=${ok} none=${none} total_done=${done.size}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
