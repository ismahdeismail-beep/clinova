import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('monitoring, patient_counselling').eq('name', 'Cefalexin').limit(1)
console.log('Cefalexin monitoring:', (data?.[0]?.monitoring ?? '').slice(0, 180))
console.log('Cefalexin counselling:', (data?.[0]?.patient_counselling ?? '').slice(0, 180))
// how many existing have monitoring > 60 chars?
const all: any[] = []
for (let from = 0; from < 2000; from += 1000) {
  const { data: d } = await admin.from('drug_monographs').select('monitoring, patient_counselling').range(from, from + 999)
  if (!d?.length) break
  all.push(...d)
  if (d.length < 1000) break
}
const mon = all.filter((r: any) => (r.monitoring || '').length > 60).length
const cou = all.filter((r: any) => (r.patient_counselling || '').length > 60).length
console.log('existing rows monitoring>60:', mon, '| counselling>60:', cou, 'of', all.length)
