// ================================================================
// Knowledge Retrieval Skill — locates information from every
// connected knowledge source: user notes, uploaded books/PDFs,
// clinical cases, guidelines, drug monographs, disease monographs.
// ================================================================

import type { Skill, SkillContext, SkillResponse, SkillRecommendation } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';
import { searchLibrary } from '../data/onlineLibraryData';
import { INITIAL_CASES } from '../data/clinicalCasesData';

export const knowledgeRetrievalSkill: Skill = {
  definition: {
    id: 'knowledge_retrieval',
    name: 'Knowledge Retrieval',
    description: 'Locates relevant information from notes, books, cases, guidelines, and drug/disease monographs',
    category: 'retrieval',
    version: '1.0.0',
    priority: 70,
    cacheable: true,
    intents: ['find', 'search', 'where can i read', 'resource', 'notes about', 'show me'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('find') || q.includes('search') || q.includes('resource') || q.includes('notes about');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const query = context.query;

    const lib = searchLibrary(query, {}).slice(0, 5);
    const cases = INITIAL_CASES.filter((c) =>
      (c.disease || '').toLowerCase().includes(query.toLowerCase()) ||
      (c.title || '').toLowerCase().includes(query.toLowerCase()),
    ).slice(0, 5);

    const recommendations: SkillRecommendation[] = [
      ...lib.map((r) => ({
        type: 'book' as const,
        title: r.title,
        resourceId: r.id,
        relevance: r.isFree ? 0.9 : 0.7,
        reason: `Library resource covering ${query}`,
        url: r.publisherUrl,
      })),
      ...cases.map((c) => ({
        type: 'clinical_case' as const,
        title: c.title,
        resourceId: c.id,
        relevance: 0.8,
        reason: `Clinical case illustrating ${c.disease}`,
      })),
    ];

    const content = `**Retrieved resources for "${query}"**\n\n${recommendations
      .map((r, i) => `${i + 1}. ${r.title} — ${r.reason}`)
      .join('\n')}`;

    try {
      // Use the retrieval context to ground an AI synthesis.
      const response = await generateContentWithFallback(
        {
          contents: `Using the retrieved resources below, give a concise, well-structured answer to: "${query}".\n\n${content}`,
          config: { temperature: 0.2, maxOutputTokens: 1536 },
        },
        undefined,
        'Knowledge Retrieval',
      );
      return {
        skillId: 'knowledge_retrieval',
        content: `${content}\n\n${response.text}`,
        recommendations,
        confidence: 0.85,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `retrieval_${query.substring(0, 120)}`,
      };
    } catch {
      return {
        skillId: 'knowledge_retrieval',
        content,
        recommendations,
        confidence: 0.7,
        processingTimeMs: Date.now() - start,
        cacheable: true,
      };
    }
  },
};

skillRegistry.register(knowledgeRetrievalSkill);
