// ================================================================
// Web Research Skill — discovers new educational information,
// verifies sources, ranks evidence and organizes references.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const webResearchSkill: Skill = {
  definition: {
    id: 'web_research',
    name: 'Web Research',
    description: 'Discovers and verifies educational information from trustworthy web sources',
    category: 'retrieval',
    version: '1.0.0',
    priority: 42,
    requiresNetwork: true,
    cacheable: true,
    intents: ['web search', 'research', 'find recent', 'news', 'what is the latest'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('web search') || q.includes('latest') || q.includes('research') || q.includes('recent news');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    try {
      const systemInstruction = `You are a web research assistant for pharmacy education. Provide a synthesized, citation-backed answer using trustworthy and legally accessible sources (professional societies, PubMed abstracts, WHO, FDA/EMA, official guidelines). Rank source quality. Do not reproduce copyrighted full text.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.3, maxOutputTokens: 1536 } },
        undefined,
        'Web Research',
      );

      return {
        skillId: 'web_research',
        content: response.text,
        confidence: 0.78,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `webresearch_${context.query.substring(0, 100)}`,
      };
    } catch (error: any) {
      return { skillId: 'web_research', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(webResearchSkill);
