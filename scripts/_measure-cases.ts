import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { count: total } = await admin.from('clinical_cases').select('id', { count: 'exact', head: true })
console.log('clinical_cases DB total:', total)

// Template counts from the template files
const files = fs.readdirSync('scripts/templates').filter(f => f.endsWith('.ts'))
let totalTemplates = 0
for (const f of files) {
  const src = fs.readFileSync(`scripts/templates/${f}`, 'utf8')
  const m = src.match(/TEMPLATES\s*[:=][^=]*?=?\s*\[/g)
  const count = (src.match(/id:\s*['"][a-z0-9-]+['"]/gi) || []).length
  console.log(f.padEnd(35), 'entries with id:', count)
  totalTemplates += count
}
console.log('≈ total template case entries:', totalTemplates)
