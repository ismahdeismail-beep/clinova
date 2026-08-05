import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { monographToMarkdown } from '../src/lib/monographToMarkdown'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('*').ilike('name', '%allopurinol%').single()
const md = monographToMarkdown(data as any)
const start = md.indexOf('⏱ Pharmacokinetics')
console.log(md.slice(start, start + 2200))
