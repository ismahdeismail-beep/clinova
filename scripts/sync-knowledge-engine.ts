/**
 * Clinova Knowledge Engine Synchronization (batched)
 *
 * After seed import, refresh:
 *   1. Knowledge Graph nodes (diseases + cases)
 *   2. Knowledge Graph relationships (cases → diseases)
 *   3. Disease monographs (placeholder entries)
 *
 * Cases are already curriculum-mapped during seed (unit_id is set there),
 * so that step is skipped here for performance.
 *
 * Usage:
 *   npx tsx scripts/sync-knowledge-engine.ts
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import {
  createKnowledgeGraphClient,
  syncDiseaseMonographs,
  syncDiseaseRegistry,
  syncKnowledgeGraph,
} from '../src/server/kgSync'

function requireClient(): SupabaseClient {
  try {
    return createKnowledgeGraphClient()
  } catch (err) {
    console.error(`❌ ${(err as Error).message}`)
    process.exit(1)
  }
}

async function main() {
  const client = requireClient()

  console.log('='.repeat(60))
  console.log('🧠 CLINOVA KNOWLEDGE ENGINE SYNC')
  console.log('='.repeat(60))

  await syncKnowledgeGraph(client, console)
  await syncDiseaseRegistry(client, console)
  await syncDiseaseMonographs(client, console)

  console.log('\n' + '='.repeat(60))
  console.log('✅ KNOWLEDGE ENGINE SYNC COMPLETE')
  console.log('='.repeat(60))
}

main().catch((err) => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
