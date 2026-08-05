import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('name, pharmacokinetics').ilike('name', 'tinidazole').single()
const t = data.pharmacokinetics
const idx = t.search(/drug interaction stud/i)
console.log('found at:', idx, 'of', t.length)
console.log('...before:', t.slice(Math.max(0, idx - 200), idx))
console.log('...after:', t.slice(idx, idx + 600))
