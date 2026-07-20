/**
 * seedDiseaseNotes.ts
 * ----------------------------------------------------------------------------
 * Seeds the disease_notes table in Supabase from the local DISEASE_NOTES data.
 * Uses the Supabase JS client (service role) which serializes JSON correctly,
 * avoiding the SQL string-escaping pitfalls of raw SQL concatenation.
 *
 * Idempotent: upserts on conflict (id).
 *
 * Run:  npx tsx scripts/seedDiseaseNotes.ts
 * Env:  SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { DISEASE_NOTES } from '../src/data/diseaseNotes'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('[seed] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const sb = createClient(url, key, { auth: { persistSession: false } })

async function main() {
  console.log(`[seed] Seeding ${DISEASE_NOTES.length} disease notes via Supabase client...`)

  const rows = DISEASE_NOTES.map((note) => ({
    id: note.id,
    name: note.name,
    unit_id: note.unitId,
    specialty: note.specialty,
    overview: note.overview,
    kenya_context: note.kenyaContext ?? null,
    pathophysiology: note.pathophysiology ?? null,
    diagram: note.diagram ?? null,
    key_drugs: note.keyDrugs,
    monitoring: note.monitoring,
    mcqs: note.mcqs,
  }))

  // Upsert in batches to stay responsive and avoid oversized payloads.
  const BATCH = 25
  let done = 0
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH)
    const { error } = await sb.from('disease_notes').upsert(batch, { onConflict: 'id' })
    if (error) {
      console.error(`\n[seed] Failed batch ${i}-${i + BATCH}:`, error.message)
    } else {
      done += batch.length
      process.stdout.write(`.${done}`)
    }
  }
  console.log(`\n[seed] Done — ${done} notes processed.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
