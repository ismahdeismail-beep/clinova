// ================================================================
// Memory Skill — maintains structured memory across the app:
// learning memory (progress, weak/strong areas), workspace memory
// (folders, bookmarks, recent resources) and conversation memory.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';

export const memorySkill: Skill = {
  definition: {
    id: 'memory',
    name: 'Memory',
    description: 'Maintains learning, workspace and conversation memory; surfaces context for personalization',
    category: 'memory',
    version: '1.0.0',
    priority: 40,
    cacheable: false,
    intents: ['remember', 'my progress', 'what did we discuss', 'recall', 'history'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('remember') || q.includes('my progress') || q.includes('what did we discuss') || q.includes('recall');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const p = context.learnerProfile;

    const content = `**Clinova Memory**
- Learner level: ${p?.level ?? 'unknown'}
- Weak areas: ${(p?.weakAreas ?? []).join(', ') || 'none recorded'}
- Strong areas: ${(p?.strongAreas ?? []).join(', ') || 'none recorded'}
- Recent topics: ${(p?.recentTopics ?? []).join(', ') || 'none recorded'}
- Conversation turns in this session: ${context.chatHistory?.length ?? 0}

Use this context to personalize the response and reference prior discussion where relevant.`;

    return {
      skillId: 'memory',
      content,
      confidence: 0.7,
      processingTimeMs: Date.now() - start,
      cacheable: false,
    };
  },
};

skillRegistry.register(memorySkill);
