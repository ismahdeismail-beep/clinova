import type { SupabaseClient } from '@supabase/supabase-js'
import { describe, expect, it, vi } from 'vitest'
import { GENERATED_CASES } from '../../data/clinicalCases/index'
import { INITIAL_CASES } from '../../data/clinicalCasesData'
import { DISEASES } from '../../data/curriculum'
import { syncKnowledgeGraph, toSeedId } from '../kgSync'

interface StoredRow {
  id: string
  [key: string]: unknown
}

interface UpsertCall {
  table: string
  rows: Array<Record<string, unknown>>
  onConflict: string
  ignoreDuplicates: boolean
}

interface FakeOptions {
  failNodeUpserts?: boolean
  failNodeFetch?: boolean
}

const allCases = [...INITIAL_CASES, ...GENERATED_CASES]
const diseaseIdByName = new Map(
  Object.entries(DISEASES).map(([id, disease]) => [disease.name.toLowerCase(), id]),
)
const expectedRelationships = allCases.filter((c) => diseaseIdByName.has(c.disease.toLowerCase()))

function keyOf(row: Record<string, unknown>, keys: string[]): string {
  return keys.map((key) => String(row[key])).join('|')
}

function createFakeClient(options: FakeOptions = {}) {
  const nodes: StoredRow[] = []
  const relationships: StoredRow[] = []
  const calls: UpsertCall[] = []
  const indexes = {
    knowledge_graph_nodes: new Map<string, number>(),
    knowledge_graph_relationships: new Map<string, number>(),
  }
  let nextId = 0

  const fake = {
    nodes,
    relationships,
    calls,
    client: {
      from: (table: string) => ({
        upsert: (
          rows: Array<Record<string, unknown>>,
          config: { onConflict: string; ignoreDuplicates: boolean },
        ) => {
          calls.push({
            table,
            rows,
            onConflict: config.onConflict,
            ignoreDuplicates: config.ignoreDuplicates,
          })
          if (options.failNodeUpserts && table === 'knowledge_graph_nodes') {
            return Promise.resolve({ error: { message: 'upsert failed' } })
          }
          const isNode = table === 'knowledge_graph_nodes'
          const target = isNode ? nodes : relationships
          const index = isNode
            ? indexes.knowledge_graph_nodes
            : indexes.knowledge_graph_relationships
          const keys = config.onConflict.split(',')
          for (const row of rows) {
            const key = keyOf(row, keys)
            const at = index.get(key)
            if (at !== undefined) target[at] = { ...target[at], ...row }
            else {
              index.set(key, target.length)
              target.push({ id: `row-${++nextId}`, ...row })
            }
          }
          return Promise.resolve({ error: null })
        },
        select: () => {
          if (options.failNodeFetch) {
            return Promise.resolve({ data: null, error: { message: 'fetch failed' } })
          }
          return Promise.resolve({
            data: table === 'knowledge_graph_nodes' ? nodes : relationships,
            error: null,
          })
        },
      }),
    } as unknown as SupabaseClient,
  }

  return fake
}

const logger = () => ({ log: vi.fn(), warn: vi.fn(), error: vi.fn() })

describe('syncKnowledgeGraph', () => {
  it('upserts disease nodes, case nodes and relationships with schema conflict keys', async () => {
    const fake = createFakeClient()

    const counts = await syncKnowledgeGraph(fake.client)

    expect(counts).toEqual({
      diseaseNodes: Object.keys(DISEASES).length,
      caseNodes: allCases.length,
      relationships: expectedRelationships.length,
    })
    const nodeCalls = fake.calls.filter((call) => call.table === 'knowledge_graph_nodes')
    const relCalls = fake.calls.filter((call) => call.table === 'knowledge_graph_relationships')
    expect(nodeCalls).toHaveLength(
      Math.ceil(Object.keys(DISEASES).length / 200) + Math.ceil(allCases.length / 200),
    )
    expect(nodeCalls.every((call) => call.onConflict === 'entity_type,entity_id')).toBe(true)
    expect(nodeCalls.every((call) => call.ignoreDuplicates === false)).toBe(true)
    expect(relCalls).toHaveLength(Math.ceil(expectedRelationships.length / 200))
    expect(
      relCalls.every(
        (call) => call.onConflict === 'source_node_id,target_node_id,relationship_type',
      ),
    ).toBe(true)
    expect(
      fake.calls.every((call) =>
        ['knowledge_graph_nodes', 'knowledge_graph_relationships'].includes(call.table),
      ),
    ).toBe(true)
  })

  it('links each matching case node to its disease node', async () => {
    const fake = createFakeClient()

    await syncKnowledgeGraph(fake.client)

    const sample = allCases.find((c) => diseaseIdByName.has(c.disease.toLowerCase()))!
    const caseEntityId = `case-${toSeedId(sample.title, sample.specialty)}`
    const caseNode = fake.nodes.find(
      (n) => n.entity_type === 'clinical_case' && n.entity_id === caseEntityId,
    )!
    const diseaseNode = fake.nodes.find(
      (n) =>
        n.entity_type === 'disease' &&
        n.entity_id === diseaseIdByName.get(sample.disease.toLowerCase()),
    )!
    expect(fake.relationships).toContainEqual(
      expect.objectContaining({
        source_node_id: caseNode.id,
        target_node_id: diseaseNode.id,
        relationship_type: 'covers_disease',
        metadata: {},
      }),
    )
    const nodeIds = new Set(fake.nodes.map((n) => n.id))
    expect(
      fake.relationships.every(
        (r) => nodeIds.has(r.source_node_id as string) && nodeIds.has(r.target_node_id as string),
      ),
    ).toBe(true)
  })

  it('is safe to call repeatedly without duplicating rows', async () => {
    const fake = createFakeClient()

    const first = await syncKnowledgeGraph(fake.client)
    const firstCalls = fake.calls.length
    const firstPayloads = fake.calls.map((call) => JSON.stringify(call.rows))
    const nodeSnapshot = JSON.stringify(fake.nodes)
    const relSnapshot = JSON.stringify(fake.relationships)

    const second = await syncKnowledgeGraph(fake.client)

    expect(second).toEqual(first)
    expect(JSON.stringify(fake.nodes)).toBe(nodeSnapshot)
    expect(JSON.stringify(fake.relationships)).toBe(relSnapshot)
    expect(fake.calls.slice(firstCalls).map((call) => JSON.stringify(call.rows))).toEqual(
      firstPayloads,
    )
    const nodeKeys = fake.nodes.map((n) => `${n.entity_type}:${n.entity_id}`)
    expect(new Set(nodeKeys).size).toBe(nodeKeys.length)
    const relKeys = fake.relationships.map(
      (r) => `${r.source_node_id}:${r.target_node_id}:${r.relationship_type}`,
    )
    expect(new Set(relKeys).size).toBe(relKeys.length)
  })

  it('returns zero relationships and reports a node fetch failure', async () => {
    const fake = createFakeClient({ failNodeFetch: true })
    const output = logger()

    const counts = await syncKnowledgeGraph(fake.client, output)

    expect(output.error).toHaveBeenCalledWith('   ❌ Failed to fetch nodes:', 'fetch failed')
    expect(counts).toEqual({
      diseaseNodes: Object.keys(DISEASES).length,
      caseNodes: allCases.length,
      relationships: 0,
    })
    expect(fake.calls.some((call) => call.table === 'knowledge_graph_relationships')).toBe(false)
  })

  it('counts only successful chunks and reports upsert failures', async () => {
    const fake = createFakeClient({ failNodeUpserts: true })
    const output = logger()

    const counts = await syncKnowledgeGraph(fake.client, output)

    expect(counts).toEqual({ diseaseNodes: 0, caseNodes: 0, relationships: 0 })
    expect(output.warn).toHaveBeenCalledWith('   ⚠️  disease nodes chunk 1 failed: upsert failed')
    expect(output.warn).toHaveBeenCalledWith('   ⚠️  case nodes chunk 1 failed: upsert failed')
  })

  it('leaves registry and monograph tables to the CLI-only steps', async () => {
    const fake = createFakeClient()

    await syncKnowledgeGraph(fake.client)

    expect(fake.calls.some((call) => call.table === 'diseases')).toBe(false)
    expect(fake.calls.some((call) => call.table === 'disease_monographs')).toBe(false)
  })
})
