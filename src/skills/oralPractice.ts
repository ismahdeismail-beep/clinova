// ================================================================
// Oral Practice Skill — generates viva questions, rapid-fire
// questions, drug/disease/counselling questions and evaluates
// learner responses. Linked to learning objectives.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const oralPracticeSkill: Skill = {
  definition: {
    id: 'oral_practice',
    name: 'Oral Practice',
    description: 'Generates viva, rapid-fire, drug, disease and counselling questions for OSCE/oral exam prep',
    category: 'assessment',
    version: '1.0.0',
    priority: 66,
    cacheable: true,
    intents: ['viva', 'oral', 'osce', 'rapid fire', 'viva questions'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('viva') || q.includes('oral') || q.includes('osce') || q.includes('rapid fire');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    try {
      const systemInstruction = `You are an OSCE/viva examiner for pharmacy students. Generate a structured oral practice set: 3 viva questions, 3 rapid-fire questions, 2 drug-therapy questions, 2 monitoring questions, and 2 patient-counselling scenarios. Provide model answers after each. Tailor difficulty to the learner level.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.5, maxOutputTokens: 2048 } },
        undefined,
        'Oral Practice',
      );

      return {
        skillId: 'oral_practice',
        content: response.text,
        confidence: 0.82,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `oral_${context.query.substring(0, 120)}`,
      };
    } catch (error: any) {
      return { skillId: 'oral_practice', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(oralPracticeSkill);
