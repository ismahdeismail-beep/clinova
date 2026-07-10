// ================================================================
// Adaptive Learning Skill — personalizes learning using progress,
// weak/strong topics, revision history and assessment performance.
// ================================================================

import type { Skill, SkillContext, SkillResponse, SkillRecommendation } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const adaptiveLearningSkill: Skill = {
  definition: {
    id: 'adaptive_learning',
    name: 'Adaptive Learning',
    description: 'Personalizes learning based on progress, weak/strong areas and assessment performance',
    category: 'teaching',
    version: '1.0.0',
    priority: 54,
    cacheable: false,
    intents: ['adaptive', 'personalize', 'my weak', 'help me improve', 'study plan for me'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return !!context.learnerProfile || q.includes('weak') || q.includes('personalize') || q.includes('my progress');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const profile = context.learnerProfile;
    const weak = profile?.weakAreas?.join(', ') || 'unknown';
    const strong = profile?.strongAreas?.join(', ') || 'unknown';

    try {
      const systemInstruction = `You are an adaptive learning coach. Using the learner profile below, produce a personalized plan:
- Focus extra practice on weak areas: ${weak}.
- Reinforce strong areas: ${strong}.
- Suggest specific topics, a sequencing order, and spaced-repetition intervals.
Be concrete and motivating.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.4, maxOutputTokens: 1536 } },
        undefined,
        'Adaptive Learning',
      );

      const recommendations: SkillRecommendation[] = (profile?.weakAreas ?? []).map((t) => ({
        type: 'study_guide',
        title: `Focus: ${t}`,
        relevance: 0.9,
        reason: 'Identified weak area — prioritize revision',
      }));

      return {
        skillId: 'adaptive_learning',
        content: response.text,
        recommendations,
        confidence: 0.83,
        processingTimeMs: Date.now() - start,
        cacheable: false,
      };
    } catch (error: any) {
      return { skillId: 'adaptive_learning', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(adaptiveLearningSkill);
