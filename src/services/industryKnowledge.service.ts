import { supabase } from '../lib/supabase'
import type {
  PharmaceuticalTopic,
  IndustryKnowledgeEntry,
  DrugIndustryConnection,
  IndustryTerm,
  KenyanManufacturer,
  IndustryConnectionType,
  IndustryDifficulty,
} from '../types/knowledge'

// ── Static fallback data ────────────────────────────────────────
import { BUNDLED_TOPICS } from '../data/industryKnowledgeData'
import { BUNDLED_INDUSTRY_TERMS } from '../data/industryTermsData'
import { BUNDLED_KENYAN_MANUFACTURERS } from '../data/kenyanManufacturersData'
import { BUNDLED_INDUSTRY_ENTRIES } from '../data/industryKnowledgeEntries'
import { BUNDLED_DRUG_INDUSTRY_CONNECTIONS } from '../data/drugIndustryConnectionsData'

let topicCache: PharmaceuticalTopic[] | null = null

function buildTopicTree(topics: PharmaceuticalTopic[]): PharmaceuticalTopic[] {
  const map = new Map<string, PharmaceuticalTopic>()
  for (const t of topics) map.set(t.id, { ...t, children: [] })
  const roots: PharmaceuticalTopic[] = []
  for (const t of topics) {
    const node = map.get(t.id)!
    if (t.parent_id && map.has(t.parent_id)) {
      map.get(t.parent_id)!.children!.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots.sort((a, b) => a.sort_order - b.sort_order)
}

export const IndustryKnowledgeService = {
  async getTopicTree(): Promise<PharmaceuticalTopic[]> {
    if (topicCache) return topicCache

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('pharmaceutical_topics')
          .select('*')
          .order('sort_order')
        if (!error && data && data.length > 0) {
          topicCache = buildTopicTree(data as PharmaceuticalTopic[])
          return topicCache
        }
      } catch {
        /* fall through to bundled */
      }
    }

    topicCache = buildTopicTree(BUNDLED_TOPICS as PharmaceuticalTopic[])
    return topicCache
  },

  async getTopicsFlat(): Promise<PharmaceuticalTopic[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('pharmaceutical_topics')
          .select('*')
          .order('sort_order')
        if (!error && data && data.length > 0) return data as PharmaceuticalTopic[]
      } catch {
        /* fall through */
      }
    }
    return BUNDLED_TOPICS as PharmaceuticalTopic[]
  },

  async getTopicBySlug(slug: string): Promise<PharmaceuticalTopic | null> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('pharmaceutical_topics')
          .select('*')
          .eq('slug', slug)
          .single()
        if (!error && data) return data as PharmaceuticalTopic
      } catch {
        /* fall through */
      }
    }
    return (BUNDLED_TOPICS as PharmaceuticalTopic[]).find((t) => t.slug === slug) ?? null
  },

  async getByTopic(
    topicSlug: string,
    opts?: { difficulty?: IndustryDifficulty; limit?: number },
  ): Promise<IndustryKnowledgeEntry[]> {
    const topic = await this.getTopicBySlug(topicSlug)
    if (!topic) return []

    if (supabase) {
      try {
        let query = supabase
          .from('industry_knowledge_entries')
          .select('*, topic:pharmaceutical_topics(*)')
          .eq('topic_id', topic.id)
          .order('created_at')
        if (opts?.difficulty) query = query.eq('difficulty', opts.difficulty)
        if (opts?.limit) query = query.limit(opts.limit)
        const { data, error } = await query
        if (!error && data && data.length > 0) return data as IndustryKnowledgeEntry[]
      } catch {
        /* fall through */
      }
    }

    // Fallback: filter bundled entries by topic slug
    let results = BUNDLED_INDUSTRY_ENTRIES.filter((e) => e.topic_slug === topicSlug)
    if (opts?.difficulty) results = results.filter((e) => e.difficulty === opts.difficulty)
    if (opts?.limit) results = results.slice(0, opts.limit)
    return results as IndustryKnowledgeEntry[]
  },

  async getForDrug(
    drugId: string,
    connectionTypes?: IndustryConnectionType[],
  ): Promise<DrugIndustryConnection[]> {
    if (supabase) {
      try {
        let query = supabase
          .from('drug_industry_connections')
          .select('*, entry:industry_knowledge_entries(*, topic:pharmaceutical_topics(*))')
          .eq('drug_id', drugId)
          .order('relevance_score', { ascending: false })
        if (connectionTypes && connectionTypes.length > 0) {
          query = query.in('connection_type', connectionTypes)
        }
        const { data, error } = await query
        if (!error && data && data.length > 0) return data as DrugIndustryConnection[]
      } catch {
        /* fall through */
      }
      return []
    }
    // Fallback: match bundled connections by drug_id or drug_name
    let results = BUNDLED_DRUG_INDUSTRY_CONNECTIONS.filter(
      (c) => c.drug_id === drugId || c.drug_name?.toLowerCase() === drugId.toLowerCase(),
    )
    if (connectionTypes && connectionTypes.length > 0) {
      results = results.filter((c) => connectionTypes.includes(c.connection_type))
    }
    return results.map((c) => {
      const entry = BUNDLED_INDUSTRY_ENTRIES.find((e) => e.id === c.knowledge_entry_id)
      return { ...c, entry: entry || undefined } as DrugIndustryConnection
    })
  },

  async searchTerms(query: string, limit = 10): Promise<IndustryTerm[]> {
    const q = query.toLowerCase().trim()

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('industry_terms')
          .select('*, topic:pharmaceutical_topics(*)')
          .or(`term.ilike.%${q}%,definition.ilike.%${q}%,aliases.cs.{${q}}`)
          .limit(limit)
        if (!error && data && data.length > 0) return data as IndustryTerm[]
      } catch {
        /* fall through */
      }
    }

    // Fallback: search bundled terms
    return BUNDLED_INDUSTRY_TERMS.filter((t) => {
      const haystack = `${t.term} ${t.definition} ${t.aliases.join(' ')}`.toLowerCase()
      return haystack.includes(q)
    }).slice(0, limit) as IndustryTerm[]
  },

  async getTermBySlug(slug: string): Promise<IndustryTerm | null> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('industry_terms')
          .select('*, topic:pharmaceutical_topics(*)')
          .eq('slug', slug)
          .single()
        if (!error && data) return data as IndustryTerm
      } catch {
        /* fall through */
      }
    }
    return (BUNDLED_INDUSTRY_TERMS as IndustryTerm[]).find((t) => t.slug === slug) ?? null
  },

  async getManufacturers(filters?: {
    location?: string
    capability?: string
  }): Promise<KenyanManufacturer[]> {
    if (supabase) {
      try {
        let query = supabase.from('kenyan_manufacturers').select('*').order('name')
        if (filters?.location) query = query.ilike('location', `%${filters.location}%`)
        if (filters?.capability) query = query.contains('capabilities', [filters.capability])
        const { data, error } = await query
        if (!error && data && data.length > 0) return data as KenyanManufacturer[]
      } catch {
        /* fall through */
      }
    }

    let results = BUNDLED_KENYAN_MANUFACTURERS as KenyanManufacturer[]
    if (filters?.location) {
      results = results.filter((m) =>
        m.location?.toLowerCase().includes(filters.location!.toLowerCase()),
      )
    }
    if (filters?.capability) {
      results = results.filter((m) =>
        m.capabilities.some((c) => c.toLowerCase().includes(filters.capability!.toLowerCase())),
      )
    }
    return results
  },

  async getManufacturerBySlug(slug: string): Promise<KenyanManufacturer | null> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('kenyan_manufacturers')
          .select('*')
          .eq('slug', slug)
          .single()
        if (!error && data) return data as KenyanManufacturer
      } catch {
        /* fall through */
      }
    }
    return (
      (BUNDLED_KENYAN_MANUFACTURERS as KenyanManufacturer[]).find((m) => m.slug === slug) ?? null
    )
  },

  async getEntry(entryId: string): Promise<IndustryKnowledgeEntry | null> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('industry_knowledge_entries')
          .select('*, topic:pharmaceutical_topics(*)')
          .eq('id', entryId)
          .single()
        if (!error && data) return data as IndustryKnowledgeEntry
      } catch {
        /* fall through */
      }
    }
    return null
  },

  formatIndustryContext(connections: DrugIndustryConnection[]): string {
    if (connections.length === 0) return ''

    const sections: string[] = []
    const grouped = new Map<string, DrugIndustryConnection[]>()

    for (const conn of connections) {
      const typeName = conn.connection_type.replace(/_/g, ' ')
      if (!grouped.has(typeName)) grouped.set(typeName, [])
      grouped.get(typeName)!.push(conn)
    }

    for (const [typeName, conns] of grouped) {
      sections.push(`**${typeName.charAt(0).toUpperCase() + typeName.slice(1)}:**`)
      for (const conn of conns) {
        if (conn.entry) {
          const content = conn.entry.content
          if (content.overview) sections.push(`- ${content.overview}`)
          else if (content.description) sections.push(`- ${content.description}`)
          else sections.push(`- ${conn.entry.title}`)
        }
        if (conn.context) sections.push(`  Note: ${conn.context}`)
      }
    }

    return sections.join('\n')
  },

  formatTermsContext(terms: IndustryTerm[]): string {
    if (terms.length === 0) return ''
    return terms.map((t) => `**${t.term}:** ${t.definition}`).join('\n')
  },
}
