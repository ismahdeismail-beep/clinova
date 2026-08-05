import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_images').select('source, verified, quality_score').limit(100000)
const bySource: Record<string, number> = {}
for (const r of data ?? []) bySource[r.source] = (bySource[r.source] ?? 0) + 1
console.log('by source:', JSON.stringify(bySource))
const withThumb = (data ?? []).filter(r => r.thumbnail_url).length
const withLarge = (data ?? []).filter(r => !r.thumbnail_url && r.large_url).length
console.log(`thumbnails: ${withThumb}, large-only: ${withLarge}, total: ${data?.length}`)
