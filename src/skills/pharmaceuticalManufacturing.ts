import type { Skill, SkillContext, SkillResponse } from './types'
import { skillRegistry } from './registry'
import { IndustryKnowledgeService } from '../services/industryKnowledge.service'
import { KnowledgeEngine } from '../engine/knowledgeEngine.service'
import { adminSupabase } from '../server/adminClient'

export const pharmaceuticalManufacturingSkill: Skill = {
  definition: {
    id: 'pharmaceutical_manufacturing',
    name: 'Pharmaceutical Manufacturing',
    description: 'Drug formulation, GMP, manufacturing processes, quality control, and pharmaceutical technologies',
    category: 'industry',
    version: '1.0.0',
    priority: 70,
    cacheable: true,
    intents: ['manufacturing', 'formulation', 'GMP', 'tablet', 'capsule', 'injectable', 'bioequivalence', 'dissolution', 'stability', 'packaging', 'excipient', 'granulation', 'compression', 'coating', 'sterile'],
  },

  canHandle(context: SkillContext): boolean | Promise<boolean> {
    const q = context.query.toLowerCase()
    return (
      q.includes('manufactur') ||
      q.includes('formulation') ||
      q.includes('gmp') ||
      q.includes('tablet') ||
      q.includes('capsule') ||
      q.includes('injectable') ||
      q.includes('bioequivalence') ||
      q.includes('dissolution') ||
      q.includes('stability') ||
      q.includes('excipient') ||
      q.includes('granulation') ||
      q.includes('packaging') ||
      q.includes('quality control')
    )
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now()
    try {
      const topics = await IndustryKnowledgeService.getByTopic('pi-manufacturing', { limit: 20 })
      const terms = await IndustryKnowledgeService.searchTerms(context.query, 10)
      const engineResult = await KnowledgeEngine.process(context.query, adminSupabase ?? undefined)
      const ragContext = engineResult.contextSummary || ''

      let content = ''
      if (topics.length > 0) {
        content += '### Manufacturing & Formulation Knowledge\n\n'
        for (const t of topics.slice(0, 5)) {
          content += `**${t.title}**\n${t.content ? JSON.stringify(t.content) : ''}\n\n`
        }
      }
      if (terms.length > 0) {
        content += '### Key Terms\n\n'
        for (const term of terms) {
          content += `- **${term.term}**: ${term.definition}\n`
        }
        content += '\n'
      }
      if (ragContext) {
        content += `### Additional Context\n\n${ragContext}\n`
      }
      if (!content) {
        content = `Provide comprehensive information about pharmaceutical manufacturing and formulation related to: ${context.query}\n\nInclude GMP principles, manufacturing processes, quality control, and relevant regulatory considerations.`
      }

      return {
        skillId: 'pharmaceutical_manufacturing',
        content,
        data: { topicsCount: topics.length, termsCount: terms.length },
        confidence: topics.length > 0 ? 0.9 : 0.7,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `pharm_mfg_${context.query.toLowerCase().replace(/\s+/g, '_').slice(0, 50)}`,
      }
    } catch (error: any) {
      return {
        skillId: 'pharmaceutical_manufacturing',
        error: error.message,
        confidence: 0,
        processingTimeMs: Date.now() - start,
      }
    }
  },
}

skillRegistry.register(pharmaceuticalManufacturingSkill)
