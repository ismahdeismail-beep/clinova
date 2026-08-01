import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
)

async function main() {
  const { count: totalDrugs } = await supabase
    .from('drug_monographs')
    .select('*', { count: 'exact', head: true })

  // NOTE: do NOT use distinct+head count here — PostgREST returns the total row count,
  // not distinct drug_ids. Build the distinct set from the rows instead.
  const { data: imageRows } = await supabase.from('drug_images').select('drug_id').limit(10000)

  const { count: totalImages } = await supabase
    .from('drug_images')
    .select('*', { count: 'exact', head: true })

  const drugsWithImages = new Set((imageRows || []).map((r) => r.drug_id)).size

  console.log('totalDrugs:', totalDrugs)
  console.log('drugsWithImages (distinct):', drugsWithImages)
  console.log('totalImages (rows):', totalImages)
  console.log('drugsMissingImages:', (totalDrugs ?? 0) - drugsWithImages)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
