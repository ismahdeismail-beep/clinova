import type { Skill, SkillContext, SkillResponse } from './types'
import { skillRegistry } from './registry'
import { IndustryKnowledgeService } from '../services/industryKnowledge.service'
import { KnowledgeEngine } from '../engine/knowledgeEngine.service'
import { adminSupabase } from '../server/adminClient'

export const regulatoryAffairsSkill: Skill = {
  definition: {
    id: 'regulatory_affairs',
    name: 'Regulatory Affairs',
    description: 'Drug registration, PPB Kenya, WHO prequalification, NDA/ANDA, clinical trials, and regulatory frameworks',
    category: 'industry',
    version: '1.0.0',
    priority: 70,
    cacheable: true,
    intents: ['regulatory', 'PPB', 'registration', 'prequalification', 'NDA', 'ANDA', 'clinical trial', 'ethics', 'CTD', 'pharmacy board'],
  },

  canHandle(context: SkillContext): boolean | Promise<boolean> {
    const q = context.query.toLowerCase()
    return (
      q.includes('regulatory') ||
      q.includes('ppb') ||
      q.includes('registration') ||
      q.includes('prequalification') ||
      q.includes('nda') ||
      q.includes('anda') ||
      q.includes('clinical trial') ||
      q.includes('ethics committee') ||
      q.includes('pharmacy board')
    )
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now()
    try {
      const topics = await IndustryKnowledgeService.getByTopic('pi-regulatory', { limit: 20 })
      const terms = await IndustryKnowledgeService.searchTerms(context.query, 10)
      const engineResult = await KnowledgeEngine.process(context.query, adminSupabase ?? undefined)
      const ragContext = engineResult.contextSummary || ''

      let content = ''
      if (topics.length > 0) {
        content += '### Regulatory Affairs Knowledge\n\n'
        for (const t of topics.slice(0, 5)) {
          content += `**${t.title}**\n${t.content ? JSON.stringify(t.content) : ''}\n\n`
        }
      }
      if (terms.length > 0) {
        content += '### Key Regulatory Terms\n\n'
        for (const term of terms) {
          content += `- **${term.term}**: ${term.definition}\n`
        }
        content += '\n'
      }
      if (ragContext) {
        content += `### Additional Context\n\n${ragContext}\n`
      }
      if (!content) {
        content = `Provide comprehensive information about regulatory affairs related to: ${context.query}\n\nInclude PPB Kenya requirements, WHO prequalification, registration pathways, and clinical trial regulations.`
      }

      return {
        skillId: 'regulatory_affairs',
        content,
        data: { topicsCount: topics.length, termsCount: terms.length },
        confidence: topics.length > 0 ? 0.9 : 0.7,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `reg_affairs_${context.query.toLowerCase().replace(/\s+/g, '_').slice(0, 50)}`,
      }
    } catch (error: any) {
      return {
        skillId: 'regulatory_affairs',
        error: error.message,
        confidence: 0,
        processingTimeMs: Date.now() - start,
      }
    }
  },
}

skillRegistry.register(regulatoryAffairsSkill)
