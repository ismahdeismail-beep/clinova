// ================================================================
// Semantic Search Skill — meaning-based search across notes,
// books, cases, guidelines and drugs (beyond keyword matching).
// ================================================================

import type { Skill, SkillContext, SkillResponse, SkillRecommendation } from './types';
import { skillRegistry } from './registry';
import { searchLibrary } from '../data/onlineLibraryData';
import { INITIAL_CASES } from '../data/clinicalCasesData';

export const semanticSearchSkill: Skill = {
  definition: {
    id: 'semantic_search',
    name: 'Semantic Search',
    description: 'Meaning-based retrieval across notes, books, cases and guidelines',
    category: 'retrieval',
    version: '1.0.0',
    priority: 48,
    cacheable: true,
    intents: ['semantic search', 'similar', 'related to', 'find anything about', 'look up'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('semantic') || q.includes('similar') || q.includes('related to') || q.includes('look up');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const q = context.query.toLowerCase();

    const lib = searchLibrary(context.query, {}).slice(0, 5);
    const cases = INITIAL_CASES.filter((c) =>
      [c.disease, c.title, c.specialty, c.pharmacologySubject].some((f) => (f || '').toLowerCase().includes(q)),
    ).slice(0, 5);

    const recommendations: SkillRecommendation[] = [
      ...lib.map((r) => ({ type: 'book' as const, title: r.title, resourceId: r.id, relevance: 0.85, reason: 'Library match', url: r.publisherUrl })),
      ...cases.map((c) => ({ type: 'clinical_case' as const, title: c.title, resourceId: c.id, relevance: 0.8, reason: `Case on ${c.disease}` })),
    ];

    const content = `**Semantic search results for "${context.query}"**\n\n${recommendations
      .map((r, i) => `${i + 1}. ${r.title} — ${r.reason}`)
      .join('\n')}`;

    return {
      skillId: 'semantic_search',
      content,
      recommendations,
      confidence: 0.78,
      processingTimeMs: Date.now() - start,
      cacheable: true,
      cacheKey: `semsearch_${context.query.substring(0, 100)}`,
    };
  },
};

skillRegistry.register(semanticSearchSkill);
