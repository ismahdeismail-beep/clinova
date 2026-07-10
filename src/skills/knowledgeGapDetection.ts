// ================================================================
// Knowledge Gap Detection Skill — identifies topics not yet studied
// and recommends books, notes, cases, flashcards and quizzes.
// ================================================================

import type { Skill, SkillContext, SkillResponse, SkillRecommendation } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';
import { searchLibrary } from '../data/onlineLibraryData';

export const knowledgeGapDetectionSkill: Skill = {
  definition: {
    id: 'knowledge_gap_detection',
    name: 'Knowledge Gap Detection',
    description: 'Identifies unstudied topics and recommends books, notes, cases, flashcards and quizzes',
    category: 'teaching',
    version: '1.0.0',
    priority: 50,
    cacheable: false,
    intents: ['gap', 'what havent i', 'missing', 'not studied', 'recommend what to study'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('gap') || q.includes('not studied') || q.includes('missing') || q.includes('recommend what');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const recent = context.learnerProfile?.recentTopics?.join(', ') || 'none recorded';
    const weak = context.learnerProfile?.weakAreas?.join(', ') || 'none recorded';

    try {
      const systemInstruction = `You are a knowledge-gap analyst. Given the learner's recent topics (${recent}) and weak areas (${weak}), identify the most important unstudied or under-studied topics and explain why they matter.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.4, maxOutputTokens: 1536 } },
        undefined,
        'Knowledge Gap Detection',
      );

      const lib = searchLibrary(context.query, {}).slice(0, 3);
      const recommendations: SkillRecommendation[] = lib.map((r) => ({
        type: 'book',
        title: r.title,
        resourceId: r.id,
        relevance: 0.8,
        reason: 'Recommended resource to close a knowledge gap',
        url: r.publisherUrl,
      }));

      return {
        skillId: 'knowledge_gap_detection',
        content: response.text,
        recommendations,
        confidence: 0.8,
        processingTimeMs: Date.now() - start,
        cacheable: false,
      };
    } catch (error: any) {
      return { skillId: 'knowledge_gap_detection', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(knowledgeGapDetectionSkill);
