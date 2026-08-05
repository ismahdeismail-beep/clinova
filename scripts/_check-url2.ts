import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!, { auth: { persistSession: false } })
const { data } = await supabase.from('drug_images').select('drug_id, source, thumbnail_url, large_url').limit(4)
let ok = 0, fail = 0
for (const r of data ?? []) {
  const url = r.thumbnail_url || r.large_url
  try {
    const res = await fetch(url, { method: 'HEAD' })
    if (res.ok) ok++; else { fail++; console.log('FAIL', res.status, r.source, url?.slice(0, 70)) }
  } catch (e) { fail++; console.log('ERR', (e as Error).message.slice(0, 60)) }
}
console.log(`URL check: ${ok} ok, ${fail} fail`)
