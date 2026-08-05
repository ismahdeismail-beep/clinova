import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

function thumbPriority(r: any): number {
  const s = String(r.source || '').toLowerCase()
  if (s.includes('3d') || s.includes('pdb') || s.includes('ribbon')) return 0
  if (s.includes('kenyan brand') || s.includes('dailymed') || s.includes('wikipedia')) return 1
  if (s.includes('2d') || s.includes('structure')) return 2
  return 3
}

const supabase = createClient(process.env.SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!, { auth: { persistSession: false } })
const map = new Map<string, { url: string; priority: number }>()
let from = 0
for (let i = 0; i < 80; i++) {
  const { data, error } = await supabase
    .from('drug_images')
    .select('drug_id, source, thumbnail_url, large_url, quality_score')
    .range(from, from + 999)
  if (error) { console.log('QUERY ERROR:', error.message); process.exit(1) }
  if (!data || data.length === 0) break
  for (const r of data) {
    const url = r.thumbnail_url || r.large_url
    if (!url) continue
    const cur = map.get(r.drug_id)
    if (cur && thumbPriority(r) >= cur.priority) continue
    map.set(r.drug_id, { url, priority: thumbPriority(r) })
  }
  from += 1000
  if (data.length < 1000) break
}
console.log('drugs with a thumbnail:', map.size)
const byPrio: Record<number, number> = {}
for (const v of map.values()) byPrio[v.priority] = (byPrio[v.priority] ?? 0) + 1
console.log('priority breakdown (0=3D,1=product,2=2D,3=generic):', JSON.stringify(byPrio))
// Check a few drug ids resolve to a URL (allopurinol!)
const { data: allo } = await supabase.from('drug_monographs').select('id, name').ilike('name', '%allopurinol%')
for (const d of allo ?? []) console.log('  thumb for', d.name, ':', map.get(d.id)?.url?.slice(0, 90) ?? 'MISSING')
