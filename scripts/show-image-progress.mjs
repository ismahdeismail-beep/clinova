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

  const { count: drugsWithImages } = await supabase
    .from('drug_images')
    .select('drug_id', { count: 'exact', head: true, distinct: true })

  const { count: totalImages } = await supabase
    .from('drug_images')
    .select('*', { count: 'exact', head: true })

  console.log('totalDrugs:', totalDrugs)
  console.log('drugsWithImages:', drugsWithImages)
  console.log('totalImages:', totalImages)
  console.log('drugsMissingImages:', (totalDrugs ?? 0) - (drugsWithImages ?? 0))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
