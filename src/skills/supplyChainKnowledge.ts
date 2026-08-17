import type { Skill, SkillContext, SkillResponse } from './types'
import { skillRegistry } from './registry'
import { IndustryKnowledgeService } from '../services/industryKnowledge.service'
import { KnowledgeEngine } from '../engine/knowledgeEngine.service'
import { adminSupabase } from '../server/adminClient'

export const supplyChainKnowledgeSkill: Skill = {
  definition: {
    id: 'supply_chain_knowledge',
    name: 'Supply Chain Knowledge',
    description: 'Pharmaceutical logistics, cold chain management, procurement, KEMSA, and Kenya essential medicines list',
    category: 'industry',
    version: '1.0.0',
    priority: 70,
    cacheable: true,
    intents: ['supply chain', 'logistics', 'cold chain', 'procurement', 'KEMSA', 'essential medicines', 'distribution', 'storage', 'warehousing'],
  },

  canHandle(context: SkillContext): boolean | Promise<boolean> {
    const q = context.query.toLowerCase()
    return (
      q.includes('supply chain') ||
      q.includes('logistics') ||
      q.includes('cold chain') ||
      q.includes('procurement') ||
      q.includes('kemsa') ||
      q.includes('essential medicines') ||
      q.includes('distribution') ||
      q.includes('warehousing')
    )
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now()
    try {
      const topics = await IndustryKnowledgeService.getByTopic('pi-supply-chain', { limit: 20 })
      const terms = await IndustryKnowledgeService.searchTerms(context.query, 10)
      const engineResult = await KnowledgeEngine.process(context.query, adminSupabase ?? undefined)
      const ragContext = engineResult.contextSummary || ''

      let content = ''
      if (topics.length > 0) {
        content += '### Supply Chain Knowledge\n\n'
        for (const t of topics.slice(0, 5)) {
          content += `**${t.title}**\n${t.content ? JSON.stringify(t.content) : ''}\n\n`
        }
      }
      if (terms.length > 0) {
        content += '### Key Supply Chain Terms\n\n'
        for (const term of terms) {
          content += `- **${term.term}**: ${term.definition}\n`
        }
        content += '\n'
      }
      if (ragContext) {
        content += `### Additional Context\n\n${ragContext}\n`
      }
      if (!content) {
        content = `Provide comprehensive information about pharmaceutical supply chain related to: ${context.query}\n\nInclude KEMSA operations, cold chain management, procurement processes, and Kenya essential medicines distribution.`
      }

      return {
        skillId: 'supply_chain_knowledge',
        content,
        data: { topicsCount: topics.length, termsCount: terms.length },
        confidence: topics.length > 0 ? 0.9 : 0.7,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `supply_${context.query.toLowerCase().replace(/\s+/g, '_').slice(0, 50)}`,
      }
    } catch (error: any) {
      return {
        skillId: 'supply_chain_knowledge',
        error: error.message,
        confidence: 0,
        processingTimeMs: Date.now() - start,
      }
    }
  },
}

skillRegistry.register(supplyChainKnowledgeSkill)
