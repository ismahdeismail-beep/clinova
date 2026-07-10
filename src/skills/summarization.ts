// ================================================================
// Summarization Skill — topic/chapter/guideline/drug/disease
// summaries and revision notes at brief / standard / detailed levels.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const summarizationSkill: Skill = {
  definition: {
    id: 'summarization',
    name: 'Summarization',
    description: 'Generates concise, accurate, evidence-based summaries and revision notes at brief/standard/detailed levels',
    category: 'presentation',
    version: '1.0.0',
    priority: 64,
    cacheable: true,
    intents: ['summarize', 'summary', 'revision note', 'revise', 'key points', 'high-yield'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('summar') || q.includes('revision note') || q.includes('key points') || q.includes('high-yield');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const level = /brief|short|one line/i.test(context.query)
      ? 'brief'
      : /detailed|in depth|comprehensive/i.test(context.query)
      ? 'detailed'
      : 'standard';

    try {
      const systemInstruction = `You are a study summarizer. Produce a ${level} summary of the requested topic with: key concepts, mechanisms, high-yield clinical pearls, and exam tips. Use bullet points and clear headings.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.3, maxOutputTokens: 1536 } },
        undefined,
        'Summarization',
      );

      return {
        skillId: 'summarization',
        content: response.text,
        confidence: 0.86,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `summary_${level}_${context.query.substring(0, 100)}`,
      };
    } catch (error: any) {
      return { skillId: 'summarization', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(summarizationSkill);
