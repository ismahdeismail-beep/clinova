// Parallel refresh: splits the remaining drugs-to-refresh into N disjoint
// slices and runs that many refresh-images.ts workers concurrently, each with
// its own state file (no race) and REFRESH_IDS slice. Merges worker states
// back into the main refresh_state.json when all workers finish.
//
// Usage: npx tsx scripts/refresh-parallel.ts   (env REFRESH_WORKERS, default 3)
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { spawn } from 'child_process'
import * as fs from 'fs'

const WORKERS = Number(process.env.REFRESH_WORKERS || '3')
const MAIN_STATE = 'storage/refresh_state.json'

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = []
  const size = Math.ceil(arr.length / Math.max(1, n))
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

async function main() {
  const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  })

  const refresh: { done: string[] } = fs.existsSync(MAIN_STATE)
    ? JSON.parse(fs.readFileSync(MAIN_STATE, 'utf8'))
    : { done: [] }
  const done = new Set(refresh.done)

  const { data: images } = await admin.from('drug_images').select('drug_id, hash, source')
  if (!images) throw new Error('no images rows')

  const perDrug = new Map<string, { count: number; hasNonStructure: boolean }>()
  for (const row of images as any[]) {
    const e = perDrug.get(row.drug_id) || { count: 0, hasNonStructure: false }
    e.count++
    if (row.source !== 'Wikimedia Commons (structure)') e.hasNonStructure = true
    perDrug.set(row.drug_id, e)
  }

  const { data: drugs } = await admin.from('drug_monographs').select('id, generic_name, name').limit(5000)
  if (!drugs) throw new Error('no drugs rows')

  const toRefresh = (drugs as any[]).filter((d) => {
    const e = perDrug.get(d.id)
    if (!e || !e.hasNonStructure) return false
    if (e.count >= 4) return false
    return !done.has(d.id)
  })

  console.log(`[parallel] workers=${WORKERS} to_refresh=${toRefresh.length}`)
  if (toRefresh.length === 0) {
    console.log('[parallel] nothing to do')
    return
  }

  const slices = chunk(toRefresh, WORKERS).filter((s) => s.length > 0)
  console.log(`[parallel] slices=${slices.map((s) => s.length).join(', ')}`)

  const results = await Promise.all(
    slices.map((slice, i) => {
      const stateFile = `storage/refresh_state_w${i}.json`
      return new Promise<void>((resolve, reject) => {
        const child = spawn(
          'npx',
          ['tsx', 'scripts/refresh-images.ts'],
          {
            env: {
              ...process.env,
              REFRESH_IDS: slice.map((d) => d.id).join(','),
              REFRESH_STATE: stateFile,
              REFRESH_BATCH_SIZE: '999',
              CRAWL_MAX_IMAGES: process.env.CRAWL_MAX_IMAGES || '2',
              CRAWL_DELAY_MS: process.env.CRAWL_DELAY_MS || '400',
              CRAWL_DOWNLOAD_DELAY_MS: process.env.CRAWL_DOWNLOAD_DELAY_MS || '300',
              CRAWL_NO_FORMS: process.env.CRAWL_NO_FORMS || '1',
            },
            stdio: ['ignore', 'pipe', 'pipe'],
            shell: process.platform === 'win32',
          },
        )
        child.stdout.on('data', (d) => process.stdout.write(`[w${i}] ${d}`))
        child.stderr.on('data', (d) => process.stderr.write(`[w${i}] ${d}`))
        child.on('error', reject)
        child.on('close', (code) => {
          if (code === 0) resolve()
          else reject(new Error(`worker ${i} exited with code ${code}`))
        })
      })
    }),
  )
  results.forEach(() => undefined)

  // Merge worker states into the main state file
  for (let i = 0; i < slices.length; i++) {
    const f = `storage/refresh_state_w${i}.json`
    if (!fs.existsSync(f)) continue
    const w = JSON.parse(fs.readFileSync(f, 'utf8'))
    for (const id of w.done || []) done.add(id)
  }
  fs.writeFileSync(MAIN_STATE, JSON.stringify({ done: [...done] }, null, 2))
  console.log(`[parallel] done, total refreshed: ${done.size}`)
}

main().catch((err) => {
  console.error('[parallel] fatal:', err)
  process.exit(1)
})
