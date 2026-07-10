// ================================================================
// Teaching Skill — explains concepts progressively (beginner ->
// intermediate -> advanced), supports exam/viva prep and clinical
// application. Teaches rather than merely answers.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const teachingSkill: Skill = {
  definition: {
    id: 'teaching',
    name: 'Teaching',
    description: 'Explains concepts progressively for beginner/intermediate/advanced levels and exam preparation',
    category: 'teaching',
    version: '1.0.0',
    priority: 76,
    cacheable: true,
    intents: ['teach', 'explain like', 'i dont understand', 'help me learn', 'step by step'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('teach') || q.includes('explain like') || q.includes('help me learn') || q.includes('step by step');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const level = (context.learnerProfile?.level || context.educationalContext.educationalLevel || 'Intermediate').toString();

    try {
      const systemInstruction = `You are a patient pharmacy tutor. Teach the topic using a progressive structure:
1. Beginner foundation (core idea, no jargon).
2. Intermediate detail (mechanism, clinical relevance).
3. Advanced / exam depth (nuances, comparisons, pitfalls).
Learner level: ${level}. End with a quick self-check question.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.4, maxOutputTokens: 2048 } },
        undefined,
        'Teaching',
      );

      return {
        skillId: 'teaching',
        content: response.text,
        confidence: 0.87,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `teaching_${level}_${context.query.substring(0, 100)}`,
      };
    } catch (error: any) {
      return { skillId: 'teaching', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(teachingSkill);
