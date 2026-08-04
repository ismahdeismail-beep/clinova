import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

// Table shape
const { data: cols, error: colErr } = await admin.from('drug_images').select('*').limit(2)
console.log('sample rows:', JSON.stringify(cols?.[0] ?? null, null, 1)?.slice(0, 600))
console.log('error:', colErr?.message ?? 'none')

// Total rows + per-source breakdown
const { count, error: cntErr } = await admin.from('drug_images').select('*', { count: 'exact', head: true })
console.log('total rows:', count, cntErr?.message ?? '')

// Do thumbnail URLs exist and look valid?
const { data } = await admin.from('drug_images').select('drug_id, source, thumbnail_url, large_url').limit(5)
for (const r of data ?? []) console.log('  ', r.source, '|', (r.thumbnail_url || r.large_url || 'NO URL')?.slice(0, 90))
