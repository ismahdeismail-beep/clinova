// Parallel zero-image refill: splits the zero-image drug list into N disjoint
// slices and runs refill-worker.ts per slice, each with its own state file.
//
// Usage: npx tsx scripts/refill-parallel.ts   (env REFILL_WORKERS, default 3)
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { spawn } from 'child_process'
import * as fs from 'fs'

const WORKERS = Number(process.env.REFILL_WORKERS || '3')

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

  // All drug ids with images
  const withImages = new Set<string>()
  {
    let from = 0
    for (let i = 0; i < 60; i++) {
      const { data: images } = await admin.from('drug_images').select('drug_id').range(from, from + 999)
      if (!images || images.length === 0) break
      for (const row of images as any[]) withImages.add(row.drug_id)
      from += 1000
      if ((images as any[]).length < 1000) break
    }
  }

  // All drugs
  const drugs: any[] = []
  {
    let from = 0
    for (let i = 0; i < 60; i++) {
      const { data } = await admin.from('drug_monographs').select('id, generic_name, name').range(from, from + 999)
      if (!data || data.length === 0) break
      drugs.push(...data)
      from += 1000
      if (data.length < 1000) break
    }
  }

  const zero = (drugs as any[]).filter((d) => !withImages.has(d.id) && (d.generic_name || d.name))
  console.log(`[parallel] workers=${WORKERS} zero_image_drugs=${zero.length}`)
  if (zero.length === 0) {
    console.log('[parallel] nothing to do')
    return
  }

  const slices = chunk(zero, WORKERS).filter((s) => s.length > 0)
  console.log(`[parallel] slices=${slices.map((s) => s.length).join(', ')}`)

  const results = await Promise.all(
    slices.map((slice, i) => {
      const ids = slice.map((d: any) => d.id).join(',')
      const stateFile = `storage/refill_state_w${i}.json`
      return new Promise<void>((resolve, reject) => {
        const child = spawn(
          'npx',
          ['tsx', 'scripts/refill-worker.ts'],
          {
            env: {
              ...process.env,
              REFILL_IDS: ids,
              REFILL_STATE: stateFile,
            },
            stdio: 'inherit',
            shell: true,
          },
        )
        child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`worker ${i} exited ${code}`))))
        child.on('error', reject)
      })
    }),
  )

  // Merge worker states back into the main refill state
  const mainState: { done: string[] } = fs.existsSync('storage/refill_state.json')
    ? JSON.parse(fs.readFileSync('storage/refill_state.json', 'utf8'))
    : { done: [] }
  for (let i = 0; i < WORKERS; i++) {
    const f = `storage/refill_state_w${i}.json`
    if (!fs.existsSync(f)) continue
    const w = JSON.parse(fs.readFileSync(f, 'utf8'))
    if (Array.isArray(w.done)) mainState.done.push(...w.done)
    fs.rmSync(f)
  }
  fs.writeFileSync('storage/refill_state.json', JSON.stringify(mainState, null, 2))
  console.log(`[parallel] done — merged ${mainState.done.length} drug ids into refill_state.json`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
