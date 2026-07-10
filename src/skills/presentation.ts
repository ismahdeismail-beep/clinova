// ================================================================
// Presentation Skill — converts information into comparison tables,
// flowcharts/clinical algorithms, decision trees, timelines and
// mnemonics. Adapts to the learner's requested level of detail.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const presentationSkill: Skill = {
  definition: {
    id: 'presentation',
    name: 'Presentation',
    description: 'Produces tables, flowcharts, decision trees, timelines and mnemonics',
    category: 'presentation',
    version: '1.0.0',
    priority: 62,
    cacheable: true,
    intents: ['table', 'compare', 'flowchart', 'algorithm', 'decision tree', 'mnemonic', 'timeline', 'analogy'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('table') || q.includes('compare') || q.includes('flowchart') || q.includes('algorithm') || q.includes('mnemonic') || q.includes('decision tree');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    try {
      const systemInstruction = `You are a clinical educator who presents information visually. Based on the user's request produce the most appropriate format:
- comparison table, OR
- stepwise clinical algorithm / flowchart (text steps), OR
- decision tree, OR
- chronological timeline, OR
- a memorable mnemonic with explanation.
Use markdown. Keep it exam-focused and clear.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.4, maxOutputTokens: 1536 } },
        undefined,
        'Presentation',
      );

      return {
        skillId: 'presentation',
        content: response.text,
        confidence: 0.84,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `presentation_${context.query.substring(0, 100)}`,
      };
    } catch (error: any) {
      return { skillId: 'presentation', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(presentationSkill);
