// Upload drug images extracted from the B.Pharm Year 5 Pharmacology lecture
// slides (anticancer agents folder) into drug_images, mapped to the matching
// monographs. Images run through the standard pipeline (validate → optimize →
// upload to storage → insert) and are attributed to the lecture source.
//
// Usage: npx tsx scripts/_lecture-images.ts [--dry-run]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import {
  validateImage,
  optimizeImage,
  scoreQuality,
} from '../src/services/crawler/imageProcessor'
import { kindOfTitle } from '../src/services/crawler/imageCrawler'

const dryRun = process.argv.includes('--dry-run')
const IMG_DIR = path.resolve('storage/pdfimages')

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

// Content images from single-drug slides (the _1.jpg crop, NOT the shared
// slide-template background which is byte-identical across all pages).
const SLIDES: { pdf: string; page: number; file: string; drug: string }[] = [
  { pdf: 'LECTURE 3.pdf', page: 23, file: 'LECTURE 3_p23_1.jpg', drug: 'Capecitabine' },
  { pdf: 'LECTURE 3.pdf', page: 27, file: 'LECTURE 3_p27_1.jpg', drug: 'Cytarabine' },
  { pdf: 'LECTURE 3.pdf', page: 29, file: 'LECTURE 3_p29_1.jpg', drug: 'Gemcitabine' },
  { pdf: 'LECTURE 3.pdf', page: 31, file: 'LECTURE 3_p31_1.jpg', drug: 'Mercaptopurine' },
  { pdf: 'LECTURE 3.pdf', page: 39, file: 'LECTURE 3_p39_1.jpg', drug: 'Fludarabine' },
  { pdf: 'LECTURE 4.pdf', page: 15, file: 'LECTURE 4_p15_1.jpg', drug: 'Paclitaxel' },
  { pdf: 'LECTURE 4.pdf', page: 30, file: 'LECTURE 4_p30_1.jpg', drug: 'Doxorubicin' },
  { pdf: 'LECTURE 4.pdf', page: 43, file: 'LECTURE 4_p43_1.jpg', drug: 'Bleomycin' },
]

const BUCKET = 'medicine-images'
const SOURCE = 'Lecture Notes (B.Pharm Pharmacology)'
const AUTHOR = 'Dr. B.M. Kioko'
const LICENSE = 'Educational lecture material (personal use)'
const LICENSE_URL = ''

async function findDrug(name: string): Promise<any | null> {
  const { data } = await admin.from('drug_monographs').select('id, generic_name, name').ilike('generic_name', `%${name}%`)
  if (data && data.length > 0) return data[0]
  const { data: alt } = await admin.from('drug_monographs').select('id, generic_name, name').ilike('name', `%${name}%`)
  return alt && alt.length > 0 ? alt[0] : null
}

async function main() {
  for (const s of SLIDES) {
    const file = path.join(IMG_DIR, s.file)
    if (!fs.existsSync(file)) {
      console.log(`[missing] ${s.file}`)
      continue
    }
    const drug = await findDrug(s.drug)
    if (!drug) {
      console.log(`[no-drug] ${s.drug}`)
      continue
    }
    const name = drug.generic_name || drug.name
    const buf = fs.readFileSync(file)

    const validation = await validateImage(buf)
    if (!validation.valid) {
      console.log(`[invalid] ${s.drug} — ${validation.reason}`)
      continue
    }
    const optimized = await optimizeImage(buf)

    // skip if this hash already exists for the drug
    const { data: dup } = await admin
      .from('drug_images')
      .select('id')
      .eq('drug_id', drug.id)
      .eq('hash', optimized.hash)
      .limit(1)
    if (dup && dup.length > 0) {
      console.log(`[dup] ${s.drug} already has this image`)
      continue
    }

    const kind = kindOfTitle(s.file, SOURCE)
    const pageUrl = `https://example.local/lectures/${encodeURIComponent(s.pdf.replace(/\.pdf$/, ''))}#page=${s.page}`
    const quality = scoreQuality(validation.width, validation.height, validation.format)

    if (dryRun) {
      console.log(`[dry] ${name}: ${s.file} (${validation.width}x${validation.height}, q=${quality}, kind=${kind})`)
      continue
    }

    const safeName = `${name}-lecture`.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const folder = `${name}`.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const ts = Date.now()
    const sizes: { path: string; buf: Buffer; key: string }[] = [
      { path: `${folder}/lecture/${safeName}_${ts}.webp`, buf: optimized.original, key: 'image_url' },
      { path: `${folder}/lecture/${safeName}_large_${ts}.webp`, buf: optimized.large, key: 'large_url' },
      { path: `${folder}/lecture/${safeName}_medium_${ts}.webp`, buf: optimized.medium, key: 'medium_url' },
      { path: `${folder}/lecture/${safeName}_thumb_${ts}.webp`, buf: optimized.thumbnail, key: 'thumbnail_url' },
    ]
    const urls: Record<string, string> = {}
    for (const size of sizes) {
      const { error } = await admin.storage.from(BUCKET).upload(size.path, size.buf, {
        contentType: 'image/webp',
        upsert: false,
      })
      if (error) throw new Error(`storage: ${error.message}`)
      const { data: pub } = admin.storage.from(BUCKET).getPublicUrl(size.path)
      urls[size.key] = pub.publicUrl
    }

    const { error } = await admin.from('drug_images').insert({
      drug_id: drug.id,
      generic_name: name,
      dosage_form: 'unknown',
      strength: '',
      image_url: urls.image_url,
      thumbnail_url: urls.thumbnail_url,
      large_url: urls.large_url,
      medium_url: urls.medium_url,
      source: SOURCE,
      license: LICENSE,
      license_url: LICENSE_URL,
      author: AUTHOR,
      page_url: pageUrl,
      hash: optimized.hash,
      verified: false,
      quality_score: quality,
      rejection_reason: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    if (error) throw new Error(`insert: ${error.message}`)
    console.log(`[ok] ${name}: ${s.file} (${validation.width}x${validation.height}, q=${quality})`)
  }
  console.log(dryRun ? 'DRY RUN — no changes' : 'done')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
