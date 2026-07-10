// ================================================================
// Learning Objective Extraction Skill — identifies learning
// objectives, competencies, outcomes and core concepts from any
// educational resource.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const learningObjectiveExtractionSkill: Skill = {
  definition: {
    id: 'learning_objective_extraction',
    name: 'Learning Objective Extraction',
    description: 'Extracts learning objectives, competencies, outcomes and core concepts from educational resources',
    category: 'knowledge',
    version: '1.0.0',
    priority: 58,
    cacheable: true,
    intents: ['learning objective', 'competenc', 'outcome', 'core concept', 'what should i learn'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('learning objective') || q.includes('competenc') || q.includes('outcome') || q.includes('core concept');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    try {
      const systemInstruction = `You are a curriculum analyst. From the provided resource/text, extract:
1. Learning objectives (actionable, measurable).
2. Core competencies.
3. Expected outcomes.
4. Key concepts.
Return them as a numbered list.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.3, maxOutputTokens: 1536 } },
        undefined,
        'Learning Objective Extraction',
      );

      return {
        skillId: 'learning_objective_extraction',
        content: response.text,
        confidence: 0.83,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `loe_${context.query.substring(0, 100)}`,
      };
    } catch (error: any) {
      return { skillId: 'learning_objective_extraction', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(learningObjectiveExtractionSkill);
