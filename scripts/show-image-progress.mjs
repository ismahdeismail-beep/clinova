import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
)

// PostgREST caps a single request at 1000 rows (the old `.limit(10000)` call
// silently returned only 1000 → reported ~304/1072 instead of the real 100%).
async function fetchAll(table, cols, step = 1000) {
  const rows = []
  let from = 0
  for (let i = 0; i < 100; i++) {
    const { data, error } = await supabase.from(table).select(cols).range(from, from + step - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    rows.push(...data)
    from += step
    if (data.length < step) break
  }
  return rows
}

async function main() {
  const { count: totalDrugs } = await supabase
    .from('drug_monographs')
    .select('*', { count: 'exact', head: true })

  // NOTE: do NOT use distinct+head count here — PostgREST returns the total row count,
  // not distinct drug_ids. Build the distinct set from the rows instead (paginated).
  const imageRows = await fetchAll('drug_images', 'drug_id')

  const { count: totalImages } = await supabase
    .from('drug_images')
    .select('*', { count: 'exact', head: true })

  const drugsWithImages = new Set(imageRows.map((r) => r.drug_id)).size

  console.log('totalDrugs:', totalDrugs)
  console.log('drugsWithImages (distinct):', drugsWithImages)
  console.log('totalImages (rows):', totalImages)
  console.log('drugsMissingImages:', (totalDrugs ?? 0) - drugsWithImages)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
