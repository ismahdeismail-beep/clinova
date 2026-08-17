import type { Skill, SkillContext, SkillResponse } from './types'
import { skillRegistry } from './registry'
import { IndustryKnowledgeService } from '../services/industryKnowledge.service'
import { KnowledgeEngine } from '../engine/knowledgeEngine.service'
import { adminSupabase } from '../server/adminClient'

export const pharmacovigilanceSkill: Skill = {
  definition: {
    id: 'pharmacovigilance',
    name: 'Pharmacovigilance',
    description: 'Drug safety monitoring, ADR reporting, risk management, post-marketing surveillance, and yellow card reporting',
    category: 'industry',
    version: '1.0.0',
    priority: 70,
    cacheable: true,
    intents: ['pharmacovigilance', 'ADR', 'adverse drug reaction', 'drug safety', 'yellow card', 'PSUR', 'risk management', 'post-marketing', 'signal detection'],
  },

  canHandle(context: SkillContext): boolean | Promise<boolean> {
    const q = context.query.toLowerCase()
    return (
      q.includes('pharmacovigilance') ||
      q.includes('adr') ||
      q.includes('adverse drug reaction') ||
      q.includes('drug safety') ||
      q.includes('yellow card') ||
      q.includes('psur') ||
      q.includes('risk management') ||
      q.includes('post-marketing') ||
      q.includes('signal detection')
    )
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now()
    try {
      const topics = await IndustryKnowledgeService.getByTopic('pi-pharmacovigilance', { limit: 20 })
      const terms = await IndustryKnowledgeService.searchTerms(context.query, 10)
      const engineResult = await KnowledgeEngine.process(context.query, adminSupabase ?? undefined)
      const ragContext = engineResult.contextSummary || ''

      let content = ''
      if (topics.length > 0) {
        content += '### Pharmacovigilance Knowledge\n\n'
        for (const t of topics.slice(0, 5)) {
          content += `**${t.title}**\n${t.content ? JSON.stringify(t.content) : ''}\n\n`
        }
      }
      if (terms.length > 0) {
        content += '### Key Pharmacovigilance Terms\n\n'
        for (const term of terms) {
          content += `- **${term.term}**: ${term.definition}\n`
        }
        content += '\n'
      }
      if (ragContext) {
        content += `### Additional Context\n\n${ragContext}\n`
      }
      if (!content) {
        content = `Provide comprehensive information about pharmacovigilance related to: ${context.query}\n\nInclude ADR reporting systems, risk management frameworks, post-marketing surveillance, and Kenya PPB pharmacovigilance requirements.`
      }

      return {
        skillId: 'pharmacovigilance',
        content,
        data: { topicsCount: topics.length, termsCount: terms.length },
        confidence: topics.length > 0 ? 0.9 : 0.7,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `pharmavig_${context.query.toLowerCase().replace(/\s+/g, '_').slice(0, 50)}`,
      }
    } catch (error: any) {
      return {
        skillId: 'pharmacovigilance',
        error: error.message,
        confidence: 0,
        processingTimeMs: Date.now() - start,
      }
    }
  },
}

skillRegistry.register(pharmacovigilanceSkill)
