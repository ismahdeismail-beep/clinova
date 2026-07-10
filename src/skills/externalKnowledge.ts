// ================================================================
// External Knowledge Skill — when local knowledge is insufficient,
// retrieves from trusted external sources (WHO, KDI, PubChem,
// PubMed, DailyMed, FDA/EMA, CDC, NIH). Prioritizes authoritative,
// legally accessible sources.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const externalKnowledgeSkill: Skill = {
  definition: {
    id: 'external_knowledge',
    name: 'External Knowledge',
    description: 'Retrieves from trusted external sources (WHO, KDI, PubMed, DailyMed, FDA/EMA, CDC, NIH)',
    category: 'retrieval',
    version: '1.0.0',
    priority: 46,
    requiresNetwork: true,
    cacheable: true,
    intents: ['latest guideline', 'pubmed', 'fda', 'ema', 'who', 'external source', 'up to date'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return ['pubmed', 'fda', 'ema', 'who', 'external', 'latest guideline', 'up to date'].some((k) => q.includes(k));
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    try {
      const systemInstruction = `You are a clinical knowledge retriever. Synthesize an answer using authoritative external references (WHO, Kenya Drug Index, PubMed, DailyMed, FDA/EMA, CDC, NIH). Cite sources inline. Prefer the most recent guideline versions. Avoid copyrighted full-text reproduction.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.2, maxOutputTokens: 1536 } },
        undefined,
        'External Knowledge',
      );

      return {
        skillId: 'external_knowledge',
        content: response.text,
        confidence: 0.8,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `ext_${context.query.substring(0, 100)}`,
      };
    } catch (error: any) {
      return { skillId: 'external_knowledge', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(externalKnowledgeSkill);
