import type { Skill, SkillContext, SkillResponse } from './types'
import { skillRegistry } from './registry'
import { IndustryKnowledgeService } from '../services/industryKnowledge.service'
import { KnowledgeEngine } from '../engine/knowledgeEngine.service'
import { adminSupabase } from '../server/adminClient'

export const kenyanIndustrySkill: Skill = {
  definition: {
    id: 'kenyan_industry',
    name: 'Kenyan Pharmaceutical Industry',
    description: 'Local manufacturers, KEMSA, industry landscape, career opportunities, and Kenya-specific pharmaceutical knowledge',
    category: 'industry',
    version: '1.0.0',
    priority: 70,
    cacheable: true,
    intents: ['Kenya', 'Kenyan', 'local manufacturer', 'KEMSA', 'career', 'industry', 'pharmacy board Kenya', 'PPB Kenya'],
  },

  canHandle(context: SkillContext): boolean | Promise<boolean> {
    const q = context.query.toLowerCase()
    return (
      q.includes('kenya') ||
      q.includes('kenyan') ||
      q.includes('local manufacturer') ||
      q.includes('kemsa') ||
      q.includes('career') ||
      q.includes('ppb kenya') ||
      q.includes('pharmacy board kenya')
    )
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now()
    try {
      const manufacturers = await IndustryKnowledgeService.getManufacturers()
      const terms = await IndustryKnowledgeService.searchTerms(context.query, 10)
      const engineResult = await KnowledgeEngine.process(context.query, adminSupabase ?? undefined)
      const ragContext = engineResult.contextSummary || ''

      let content = ''
      if (manufacturers.length > 0) {
        content += '### Kenyan Pharmaceutical Manufacturers\n\n'
        for (const m of manufacturers.slice(0, 8)) {
          content += `**${m.name}** (${m.location || 'Kenya'})\n`
          content += `- Products: ${m.products_description || 'Various pharmaceutical products'}\n`
          content += `- Capabilities: ${m.capabilities.join(', ') || 'N/A'}\n`
          if (m.regulatory_status) content += `- Status: ${m.regulatory_status}\n`
          content += '\n'
        }
      }
      if (terms.length > 0) {
        content += '### Key Industry Terms\n\n'
        for (const term of terms) {
          content += `- **${term.term}**: ${term.definition}\n`
        }
        content += '\n'
      }
      if (ragContext) {
        content += `### Additional Context\n\n${ragContext}\n`
      }
      if (!content) {
        content = `Provide comprehensive information about the Kenyan pharmaceutical industry related to: ${context.query}\n\nInclude local manufacturers, KEMSA operations, career opportunities, and regulatory landscape.`
      }

      return {
        skillId: 'kenyan_industry',
        content,
        data: { manufacturersCount: manufacturers.length, termsCount: terms.length },
        confidence: manufacturers.length > 0 ? 0.9 : 0.7,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `kenyan_${context.query.toLowerCase().replace(/\s+/g, '_').slice(0, 50)}`,
      }
    } catch (error: any) {
      return {
        skillId: 'kenyan_industry',
        error: error.message,
        confidence: 0,
        processingTimeMs: Date.now() - start,
      }
    }
  },
}

skillRegistry.register(kenyanIndustrySkill)
