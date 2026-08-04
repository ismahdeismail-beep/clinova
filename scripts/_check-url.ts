import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data, error } = await admin.from('drug_images').select('drug_id, source, thumbnail_url, large_url').limit(3)
console.log('rows fetched:', data?.length, error?.message ?? '')
for (const r of data ?? []) {
  const url = r.thumbnail_url || r.large_url
  let status = 'ERR'
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    status = String(res.status)
  } catch (e) {
    status = 'FETCH:' + (e as Error).message.slice(0, 60)
  }
  console.log(status.padEnd(10), r.source, url?.slice(0, 70))
}
