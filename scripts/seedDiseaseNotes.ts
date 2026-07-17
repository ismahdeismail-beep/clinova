/**
 * seedDiseaseNotes.ts
 * ----------------------------------------------------------------------------
 * Seeds the disease_notes table in Supabase from the local DISEASE_NOTES data.
 * Uses the Management API database-query endpoint (superuser).
 * Idempotent: upserts on conflict (id).
 *
 * Run:  npx tsx scripts/seedDiseaseNotes.ts
 * Env:  SUPABASE_ACCESS_TOKEN, SUPABASE_PROJECT_REF
 */
import 'dotenv/config'
import { DISEASE_NOTES } from '../src/data/diseaseNotes'

const token = process.env.SUPABASE_ACCESS_TOKEN
const ref = process.env.SUPABASE_PROJECT_REF ?? 'bveztrtykjburdhewcdy'
if (!token) {
  console.error('[seed] Missing SUPABASE_ACCESS_TOKEN')
  process.exit(1)
}

const API = `https://api.supabase.com/v1/projects/${ref}/database/query`

async function runSql(sql: string): Promise<any[]> {
  const res = await fetch(API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`)
  if (!text) return []
  try {
    const j = JSON.parse(text)
    return Array.isArray(j) ? j : [j]
  } catch {
    return []
  }
}

function esc(s: unknown): string {
  if (s === null || s === undefined) return 'NULL'
  return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`
}

function jsonb(v: unknown): string {
  return `'${JSON.stringify(v).replace(/\\/g, '\\\\').replace(/'/g, "''")}'::jsonb`
}

async function main() {
  console.log(`[seed] Seeding ${DISEASE_NOTES.length} disease notes...`)

  for (const note of DISEASE_NOTES) {
    const sql = `INSERT INTO disease_notes (id, name, unit_id, specialty, overview, kenya_context, pathophysiology, diagram, key_drugs, monitoring, mcqs, created_at, updated_at)
VALUES (
  ${esc(note.id)},
  ${esc(note.name)},
  ${esc(note.unitId)},
  ${esc(note.specialty)},
  ${esc(note.overview)},
  ${esc(note.kenyaContext ?? null)},
  ${esc(note.pathophysiology ?? null)},
  ${esc(note.diagram ?? null)},
  ${jsonb(note.keyDrugs)},
  ${esc(note.monitoring)},
  ${jsonb(note.mcqs)},
  now(), now()
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  unit_id = EXCLUDED.unit_id,
  specialty = EXCLUDED.specialty,
  overview = EXCLUDED.overview,
  kenya_context = EXCLUDED.kenya_context,
  pathophysiology = EXCLUDED.pathophysiology,
  diagram = EXCLUDED.diagram,
  key_drugs = EXCLUDED.key_drugs,
  monitoring = EXCLUDED.monitoring,
  mcqs = EXCLUDED.mcqs,
  updated_at = now();`

    try {
      await runSql(sql)
      process.stdout.write('.')
    } catch (err) {
      console.error(`\n[seed] Failed for ${note.id}:`, err)
    }
  }
  console.log(`\n[seed] Done — ${DISEASE_NOTES.length} notes processed.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
