import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

async function main() {
  for (const [table, filter] of [
    ['clinical_cases', null],
    ['clinical_cases', { status: 'published' }],
    ['drug_monographs', null],
    ['disease_monographs', null],
    ['flashcards', null],
    ['study_guides', null],
  ] as any) {
    let q = admin.from(table).select('id', { count: 'exact', head: true })
    if (filter) q = q.eq(filter.status ? 'status' : 'x', filter.status ?? 'x')
    const { count, error } = await q
    console.log(`${table} ${filter ? JSON.stringify(filter) : ''}:`, error ? 'ERR ' + error.message : count)
  }
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
