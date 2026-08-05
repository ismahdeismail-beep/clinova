import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

const tables = ['drug_monographs', 'clinical_cases', 'disease_monographs', 'flashcards', 'study_guides', 'drug_images', 'drug_classes']
for (const t of tables) {
  const { count, error } = await admin.from(t).select('id', { count: 'exact', head: true })
  console.log(t.padEnd(20), count ?? 'ERR ' + (error?.message ?? 'unknown'))
}
const { count: pub } = await admin.from('clinical_cases').select('id', { count: 'exact', head: true }).eq('status', 'published')
console.log('clinical_cases published'.padEnd(20), pub)
const { count: pubDrugs } = await admin.from('drug_monographs').select('id', { count: 'exact', head: true }).eq('is_published', true)
console.log('drug_monographs published'.padEnd(20), pubDrugs)
