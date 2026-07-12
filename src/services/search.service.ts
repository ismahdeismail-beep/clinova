import { supabase } from '../lib/supabase';

export type SearchResultType = 'drug' | 'disease' | 'case';

export interface UnifiedSearchResult {
  result_type: SearchResultType;
  id: string;
  title: string;
  subtitle: string;
  relevance: number;
}

/**
 * Unified knowledge-base search.
 *
 * Primary path: the `unified_search` Postgres RPC (migration 000008), which
 * ranks drug monographs, diseases and published clinical cases by trigram
 * similarity in a single round-trip (backed by the pg_trgm GIN indexes from
 * migration 000006).
 *
 * Fallback: if the RPC is unavailable (e.g. migration not yet applied), fall
 * back to the legacy per-table ILIKE queries so search never hard-fails.
 */
export const SearchService = {
  async unified(query: string, limit = 10): Promise<UnifiedSearchResult[]> {
    const term = query.trim();
    if (!supabase || term.length < 2) return [];

    const { data, error } = await supabase.rpc('unified_search', {
      search_query: term,
      match_count: limit,
    });

    if (!error && data) {
      return data as UnifiedSearchResult[];
    }

    return SearchService._legacyFallback(term, limit);
  },

  async _legacyFallback(term: string, limit: number): Promise<UnifiedSearchResult[]> {
    if (!supabase) return [];
    const like = `%${term}%`;
    const results: UnifiedSearchResult[] = [];

    const [drugs, diseases, cases] = await Promise.all([
      supabase
        .from('drug_monographs')
        .select('id, name, drug_class')
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
    ]);

    for (const d of drugs.data ?? []) {
      results.push({ result_type: 'drug', id: String(d.id), title: d.name, subtitle: d.drug_class ?? '', relevance: 0.5 });
    }
    for (const d of diseases.data ?? []) {
      results.push({ result_type: 'disease', id: String(d.id), title: d.name, subtitle: d.specialty ?? '', relevance: 0.5 });
    }
    for (const c of cases.data ?? []) {
      results.push({ result_type: 'case', id: String(c.id), title: c.title, subtitle: c.specialty ?? '', relevance: 0.5 });
    }

    return results.slice(0, limit);
  },

  /**
   * Semantic (vector) search via the `match_embeddings` RPC (migration 000007).
   * Requires a precomputed query embedding (768-dim, Gemini embedding-001),
   * produced server-side by the embeddings pipeline (Phase 10).
   */
  async semantic(
    queryEmbedding: number[],
    contentType?: string,
    limit = 8
  ): Promise<{ content_id: string; chunk_text: string; metadata: any; similarity: number }[]> {
    if (!supabase) return [];
    const { data, error } = await supabase.rpc('match_embeddings', {
      query_embedding: queryEmbedding,
      match_content_type: contentType ?? null,
      match_count: limit,
    });
    if (error || !data) return [];
    return data;
  },
};
