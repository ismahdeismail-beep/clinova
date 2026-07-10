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

import { createClient } from '@supabase/supabase-js';
import { INITIAL_CASES, type ClinicalCase } from '../src/data/clinicalCasesData';
import { GENERATED_CASES } from '../src/data/clinicalCases/index';
import { DISEASES } from '../src/data/curriculum';

const SUPABASE_URL    = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const CHUNK = 200;

function toSeedId(title: string, specialty: string): string {
  const raw = `${title}-${specialty}`.toLowerCase();
  return raw
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 120);
}

async function batchUpsert(table: string, rows: any[], onConflict: string, step: string) {
  let done = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const { error } = await supabase
      .from(table)
      .upsert(chunk, { onConflict, ignoreDuplicates: false });
    if (error) {
      console.warn(`   ⚠️  ${step} chunk ${Math.floor(i / CHUNK) + 1} failed: ${error.message}`);
    } else {
      done += chunk.length;
    }
  }
  return done;
}

async function syncDiseaseNodes() {
  console.log('\n📊 Syncing disease knowledge graph nodes...');
  const rows = Object.entries(DISEASES).map(([id, disease]) => ({
    entity_type: 'disease',
    entity_id: id,
    label: disease.name,
    description: `Disease: ${disease.name}`,
    metadata: { aliases: (disease as any).aliases || [] },
  }));
  const n = await batchUpsert('knowledge_graph_nodes', rows, 'entity_type,entity_id', 'disease nodes');
  console.log(`   ✅ ${n} disease nodes synced`);
}

async function syncCaseNodes() {
  console.log('\n📊 Syncing case knowledge graph nodes...');
  const allCases: ClinicalCase[] = [...INITIAL_CASES, ...GENERATED_CASES];
  const rows = allCases.map(c => ({
    entity_type: 'clinical_case',
    entity_id: `case-${toSeedId(c.title, c.specialty)}`,
    label: c.title,
    description: `${c.disease} — ${c.diagnosis}`,
    metadata: {
      specialty: c.specialty,
      disease: c.disease,
      difficulty: c.difficulty,
      chiefComplaint: (c.chiefComplaint || '').substring(0, 200),
    },
  }));
  const n = await batchUpsert('knowledge_graph_nodes', rows, 'entity_type,entity_id', 'case nodes');
  console.log(`   ✅ ${n} case nodes synced`);
}

async function syncRelationships() {
  console.log('\n🔗 Syncing knowledge graph relationships...');
  const allCases: ClinicalCase[] = [...INITIAL_CASES, ...GENERATED_CASES];

  const { data: nodes, error: fetchErr } = await supabase
    .from('knowledge_graph_nodes')
    .select('id, entity_type, entity_id');

  if (fetchErr) {
    console.error('   ❌ Failed to fetch nodes:', fetchErr.message);
    return;
  }

  const nodeMap = new Map<string, string>();
  for (const n of nodes || []) {
    nodeMap.set(`${n.entity_type}:${n.entity_id}`, n.id);
  }

  const rels: any[] = [];
  for (const c of allCases) {
    const caseEntityId = `case-${toSeedId(c.title, c.specialty)}`;
    const caseNodeId = nodeMap.get(`clinical_case:${caseEntityId}`);
    if (!caseNodeId) continue;

    const diseaseEntry = Object.entries(DISEASES).find(
      ([, d]) => (d as any).name.toLowerCase() === (c.disease || '').toLowerCase()
    );
    if (!diseaseEntry) continue;
    const diseaseNodeId = nodeMap.get(`disease:${diseaseEntry[0]}`);
    if (!diseaseNodeId) continue;

    rels.push({
      source_node_id: caseNodeId,
      target_node_id: diseaseNodeId,
      relationship_type: 'covers_disease',
      metadata: {},
    });
  }

  const n = await batchUpsert(
    'knowledge_graph_relationships',
    rels,
    'source_node_id,target_node_id,relationship_type',
    'relationships'
  );
  console.log(`   ✅ ${n} relationships synced`);
}

async function syncDiseases() {
  console.log('\n🦠 Syncing diseases registry...');
  const rows = Object.entries(DISEASES).map(([id, disease]) => ({
    id,
    name: (disease as any).name,
    aliases: (disease as any).aliases || [],
  }));
  const n = await batchUpsert('diseases', rows, 'id', 'diseases');
  console.log(`   ✅ ${n} diseases synced`);
}

async function syncDiseaseMonographs() {
  console.log('\n📄 Syncing disease monographs (placeholders)...');
  const rows = Object.entries(DISEASES).map(([id, disease]) => ({
    disease_id: id,
    title: (disease as any).name,
    content: {
      overview: `Comprehensive overview of ${(disease as any).name}.`,
      epidemiology: 'Epidemiology data pending.',
      pathophysiology: 'Pathophysiology details pending.',
      clinical_presentation: 'Clinical presentation pending.',
      diagnosis: 'Diagnostic criteria pending.',
      pharmacotherapy: 'Pharmacotherapy options pending.',
      monitoring: 'Monitoring parameters pending.',
      references: [],
    },
  }));
  const n = await batchUpsert('disease_monographs', rows, 'disease_id', 'monographs');
  console.log(`   ✅ ${n} disease monographs synced`);
}

async function main() {
  console.log('='.repeat(60));
  console.log('🧠 CLINOVA KNOWLEDGE ENGINE SYNC');
  console.log('='.repeat(60));

  await syncDiseaseNodes();
  await syncCaseNodes();
  await syncRelationships();
  await syncDiseases();
  await syncDiseaseMonographs();

  console.log('\n' + '='.repeat(60));
  console.log('✅ KNOWLEDGE ENGINE SYNC COMPLETE');
  console.log('='.repeat(60));
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
