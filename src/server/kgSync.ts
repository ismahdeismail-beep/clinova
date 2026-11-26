import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { INITIAL_CASES } from '../data/clinicalCasesData'
import { GENERATED_CASES } from '../data/clinicalCases/index'
import { DISEASES } from '../data/curriculum'

export type KnowledgeGraphLogger = Pick<Console, 'log' | 'warn' | 'error'>
export type KnowledgeGraphCaseSource = 'static' | 'database'

export interface KnowledgeGraphSyncOptions {
  /** 'static' (default) reads bundled cases; 'database' reads clinical_cases. */
  caseSource?: KnowledgeGraphCaseSource
}

interface KgCase {
  entityId: string
  title: string
  specialty: string
  disease: string
  diagnosis: string
  difficulty: string
  chiefComplaint: string
}

export interface KnowledgeGraphSyncCounts {
  diseaseNodes: number
  caseNodes: number
  relationships: number
}

const CHUNK = 200

const silentLogger: KnowledgeGraphLogger = {
  log: () => undefined,
  warn: () => undefined,
  error: () => undefined,
}

export function createKnowledgeGraphClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars')
  }
  return createClient(url, serviceRoleKey)
}

export function toSeedId(title: string, specialty: string): string {
  const raw = `${title}-${specialty}`.toLowerCase()
  return raw
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 120)
}

function staticCases(): KgCase[] {
  return [...INITIAL_CASES, ...GENERATED_CASES].map((c) => ({
    entityId: `case-${toSeedId(c.title, c.specialty)}`,
    title: c.title,
    specialty: c.specialty,
    disease: c.disease,
    diagnosis: c.diagnosis,
    difficulty: c.difficulty,
    chiefComplaint: c.chiefComplaint || '',
  }))
}

async function databaseCases(
  client: SupabaseClient,
  logger: KnowledgeGraphLogger,
): Promise<KgCase[]> {
  const { data, error } = await client
    .from('clinical_cases')
    .select('id,title,specialty,disease,diagnosis,difficulty,chief_complaint')
  if (error) {
    logger.error('   ❌ Failed to fetch clinical cases:', error.message)
    return []
  }
  return (data ?? []).map((row: Record<string, any>) => ({
    entityId: `case-${row.id}`,
    title: row.title || 'Untitled case',
    specialty: row.specialty || '',
    disease: row.disease || '',
    diagnosis: row.diagnosis || '',
    difficulty: row.difficulty || '',
    chiefComplaint: row.chief_complaint || '',
  }))
}

const diseaseIdByName = new Map<string, string>()
for (const [id, disease] of Object.entries(DISEASES)) {
  const key = disease.name.toLowerCase()
  if (!diseaseIdByName.has(key)) {
    diseaseIdByName.set(key, id)
  }
}

async function batchUpsert(
  client: SupabaseClient,
  table: string,
  rows: Record<string, unknown>[],
  onConflict: string,
  step: string,
  logger: KnowledgeGraphLogger,
): Promise<number> {
  let done = 0
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK)
    const { error } = await client
      .from(table)
      .upsert(chunk, { onConflict, ignoreDuplicates: false })
    if (error) {
      logger.warn(`   ⚠️  ${step} chunk ${Math.floor(i / CHUNK) + 1} failed: ${error.message}`)
    } else {
      done += chunk.length
    }
  }
  return done
}

async function syncDiseaseNodes(
  client: SupabaseClient,
  logger: KnowledgeGraphLogger,
): Promise<number> {
  logger.log('\n📊 Syncing disease knowledge graph nodes...')
  const rows = Object.entries(DISEASES).map(([id, disease]) => ({
    entity_type: 'disease',
    entity_id: id,
    label: disease.name,
    description: `Disease: ${disease.name}`,
    metadata: { aliases: disease.aliases || [] },
  }))
  const n = await batchUpsert(
    client,
    'knowledge_graph_nodes',
    rows,
    'entity_type,entity_id',
    'disease nodes',
    logger,
  )
  logger.log(`   ✅ ${n} disease nodes synced`)
  return n
}

async function syncCaseNodes(
  client: SupabaseClient,
  logger: KnowledgeGraphLogger,
  cases: KgCase[],
): Promise<number> {
  logger.log('\n📊 Syncing case knowledge graph nodes...')
  const rows = cases.map((c) => ({
    entity_type: 'clinical_case',
    entity_id: c.entityId,
    label: c.title,
    description: `${c.disease} — ${c.diagnosis}`,
    metadata: {
      specialty: c.specialty,
      disease: c.disease,
      difficulty: c.difficulty,
      chiefComplaint: c.chiefComplaint.substring(0, 200),
    },
  }))
  const n = await batchUpsert(
    client,
    'knowledge_graph_nodes',
    rows,
    'entity_type,entity_id',
    'case nodes',
    logger,
  )
  logger.log(`   ✅ ${n} case nodes synced`)
  return n
}

async function syncRelationships(
  client: SupabaseClient,
  logger: KnowledgeGraphLogger,
  cases: KgCase[],
): Promise<number> {
  logger.log('\n🔗 Syncing knowledge graph relationships...')

  const { data: nodes, error: fetchErr } = await client
    .from('knowledge_graph_nodes')
    .select('id, entity_type, entity_id')

  if (fetchErr) {
    logger.error('   ❌ Failed to fetch nodes:', fetchErr.message)
    return 0
  }

  const nodeMap = new Map<string, string>()
  for (const n of nodes || []) {
    nodeMap.set(`${n.entity_type}:${n.entity_id}`, n.id)
  }

  const rels: Record<string, unknown>[] = []
  for (const c of cases) {
    const caseNodeId = nodeMap.get(`clinical_case:${c.entityId}`)
    if (!caseNodeId) continue

    const diseaseId = diseaseIdByName.get((c.disease || '').toLowerCase())
    if (!diseaseId) continue
    const diseaseNodeId = nodeMap.get(`disease:${diseaseId}`)
    if (!diseaseNodeId) continue

    rels.push({
      source_node_id: caseNodeId,
      target_node_id: diseaseNodeId,
      relationship_type: 'covers_disease',
      metadata: {},
    })
  }

  const n = await batchUpsert(
    client,
    'knowledge_graph_relationships',
    rels,
    'source_node_id,target_node_id,relationship_type',
    'relationships',
    logger,
  )
  logger.log(`   ✅ ${n} relationships synced`)
  return n
}

export async function syncKnowledgeGraph(
  client: SupabaseClient = createKnowledgeGraphClient(),
  logger: KnowledgeGraphLogger = silentLogger,
  options: KnowledgeGraphSyncOptions = {},
): Promise<KnowledgeGraphSyncCounts> {
  const cases =
    options.caseSource === 'database' ? await databaseCases(client, logger) : staticCases()
  const diseaseNodes = await syncDiseaseNodes(client, logger)
  const caseNodes = await syncCaseNodes(client, logger, cases)
  const relationships = await syncRelationships(client, logger, cases)
  return { diseaseNodes, caseNodes, relationships }
}

export async function syncDiseaseRegistry(
  client: SupabaseClient,
  logger: KnowledgeGraphLogger = silentLogger,
): Promise<number> {
  logger.log('\n🦠 Syncing diseases registry...')
  const rows = Object.entries(DISEASES).map(([id, disease]) => ({
    id,
    name: disease.name,
    aliases: disease.aliases || [],
  }))
  const n = await batchUpsert(client, 'diseases', rows, 'id', 'diseases', logger)
  logger.log(`   ✅ ${n} diseases synced`)
  return n
}

export async function syncDiseaseMonographs(
  client: SupabaseClient,
  logger: KnowledgeGraphLogger = silentLogger,
): Promise<number> {
  logger.log('\n📄 Syncing disease monographs (placeholders)...')
  const rows = Object.entries(DISEASES).map(([id, disease]) => ({
    disease_id: id,
    title: disease.name,
    content: {
      overview: `Comprehensive overview of ${disease.name}.`,
      epidemiology: 'Epidemiology data pending.',
      pathophysiology: 'Pathophysiology details pending.',
      clinical_presentation: 'Clinical presentation pending.',
      diagnosis: 'Diagnostic criteria pending.',
      pharmacotherapy: 'Pharmacotherapy options pending.',
      monitoring: 'Monitoring parameters pending.',
      references: [],
    },
  }))
  const n = await batchUpsert(
    client,
    'disease_monographs',
    rows,
    'disease_id',
    'monographs',
    logger,
  )
  logger.log(`   ✅ ${n} disease monographs synced`)
  return n
}
