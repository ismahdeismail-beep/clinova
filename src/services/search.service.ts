import { supabase } from '../lib/supabase'
import { BUNDLED_DRUGS } from '../data/drugIndexData'

export type SearchResultType = 'drug' | 'disease' | 'case'

export interface UnifiedSearchResult {
  result_type: SearchResultType
  id: string
  title: string
  subtitle: string
  relevance: number
}

/**
 * Unified knowledge-base search.
 *
 * Primary path:     the `unified_search` Postgres RPC
 * Fallback 1:       legacy per-table ILIKE queries on Supabase
 * Fallback 2:       static drug index (BUNDLED_DRUGS — ~513 drugs)
 *
 * This guarantees search always returns results even when Supabase
 * tables are empty or the RPC is unavailable.
 */
export const SearchService = {
  async unified(query: string, limit = 10): Promise<UnifiedSearchResult[]> {
    const term = query.trim()
    if (!supabase || term.length < 2) return searchStatic(term, limit)

    // Try RPC first
    const { data, error } = await supabase.rpc('unified_search', {
      search_query: term,
      match_count: limit,
    })

    if (!error && data && (data as any[]).length > 0) {
      return data as UnifiedSearchResult[]
    }

    // Fallback 1: legacy Supabase queries
    const legacy = await SearchService._legacyFallback(term, limit)
    if (legacy.length > 0) return legacy

    // Fallback 2: static drug index
    return searchStatic(term, limit)
  },

  async _legacyFallback(term: string, limit: number): Promise<UnifiedSearchResult[]> {
    if (!supabase) return []
    const like = `%${term}%`
    const results: UnifiedSearchResult[] = []

    const [drugs, diseases, cases] = await Promise.all([
      supabase
        .from('drug_monographs')
        .select('id, name')
        .or(`name.ilike.${like},generic_name.ilike.${like}`)
        .limit(limit),
      supabase
        .from('diseases')
        .select('id, name, specialty')
        .ilike('name', like)
        .limit(limit),
      supabase
        .from('clinical_cases')
        .select('id, title, specialty')
        .eq('status', 'published')
        .or(`title.ilike.${like},diagnosis.ilike.${like},disease.ilike.${like}`)
        .limit(limit),
    ])

    for (const d of drugs.data ?? []) {
      results.push({ result_type: 'drug', id: String(d.id), title: d.name, subtitle: '', relevance: 0.5 })
    }
    for (const d of diseases.data ?? []) {
      results.push({ result_type: 'disease', id: String(d.id), title: d.name, subtitle: d.specialty ?? '', relevance: 0.5 })
    }
    for (const c of cases.data ?? []) {
      results.push({ result_type: 'case', id: String(c.id), title: c.title, subtitle: c.specialty ?? '', relevance: 0.5 })
    }

    return results.slice(0, limit)
  },
}

/** Search the static drug index */
function searchStatic(term: string, limit: number): UnifiedSearchResult[] {
  const q = term.toLowerCase()
  const results: UnifiedSearchResult[] = []

  for (const d of BUNDLED_DRUGS) {
    if (results.length >= limit) break
    const nameMatch = d.name.toLowerCase().includes(q)
    const genericMatch = d.generic_name.toLowerCase().includes(q)
    const classMatch = d.drug_class.toLowerCase().includes(q) || d.drug_class_name.toLowerCase().includes(q)
    const brandMatch = (d.brand_names || []).some(bn => bn.toLowerCase().includes(q))
    
    if (nameMatch || genericMatch || classMatch || brandMatch) {
      results.push({
        result_type: 'drug',
        id: d.id,
        title: d.name,
        subtitle: d.drug_class_name,
        relevance: nameMatch ? 0.6 : genericMatch ? 0.55 : brandMatch ? 0.5 : 0.4,
      })
    }
  }

  return results
}
