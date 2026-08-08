// Bounded URL-liveness audit for drug_images thumbnails.
// Pulls the image rows from Supabase (paginated), then checks a sample of
// thumbnail URLs. 200/206 = healthy; anything else is flagged.
// Usage: npx tsx scripts/_audit-urls.ts [storageSample] [externalSample]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

async function fetchAll(table: string, cols: string, step = 1000): Promise<any[]> {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 100; i++) {
    const { data, error } = await admin.from(table as any).select(cols).range(from, from + step - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += step
    if (data.length < step) break
  }
  return all
}

const storageSample = Number(process.argv[2] ?? 200)
const externalSample = Number(process.argv[3] ?? 60)

const imgs = await fetchAll('drug_images', 'thumbnail_url')
const urls = [...new Set(imgs.map((x) => x.thumbnail_url).filter(Boolean))] as string[]
const storage = urls.filter((u) => u.includes('supabase.co/storage'))
const external = urls.filter((u) => !u.includes('supabase.co/storage'))
const sample = [...storage.slice(0, storageSample), ...external.slice(0, externalSample)]
console.log(
  `checking ${sample.length} urls (${storage.length} storage / ${external.length} external total)`,
)

const results: Record<string, number> = {}
let idx = 0
const CONC = 8
async function worker() {
  while (idx < sample.length) {
    const u = sample[idx++]
    try {
      const ctrl = new AbortController()
      const t = setTimeout(() => ctrl.abort(), 6000)
      const res = await fetch(u, { method: 'GET', signal: ctrl.signal })
      clearTimeout(t)
      results[u] = res.status
    } catch {
      results[u] = -1
    }
  }
}
await Promise.all(Array.from({ length: CONC }, worker))

const bad = Object.entries(results).filter(([, s]) => s !== 200 && s !== 206)
console.log('OK:', Object.keys(results).length - bad.length, '| broken:', bad.length)
for (const [u, s] of bad.slice(0, 25)) console.log(`  ${s}  ${u.slice(0, 110)}`)
const statuses: Record<number, number> = {}
for (const [, s] of Object.entries(results)) statuses[s] = (statuses[s] || 0) + 1
console.log('status distribution:', statuses)
