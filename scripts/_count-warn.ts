import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const all: any[] = []
let from = 0
for (let i = 0; i < 60; i++) {
  const { data } = await admin.from('drug_monographs').select('id, warnings, black_box_warnings, brand_names').range(from, from + 999)
  if (!data || data.length === 0) break
  all.push(...data); from += 1000; if (data.length < 1000) break
}
const ok = (v: any) => Array.isArray(v) && v.some((x: string) => typeof x === 'string' && x.trim().length > 10 && !/^(n\/a|none|tbd|todo|placeholder|unknown|pending)/i.test(x.trim()))
console.log('total:', all.length)
console.log('warnings filled:', all.filter(r => ok(r.warnings)).length)
console.log('black_box filled:', all.filter(r => ok(r.black_box_warnings)).length)
console.log('brand filled:', all.filter(r => ok(r.brand_names)).length)
