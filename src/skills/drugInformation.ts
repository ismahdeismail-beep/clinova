// ================================================================
// Drug Information Skill — structured drug information including
// mechanism, dosing, interactions, monitoring, and counselling
// ================================================================

import type { Skill, SkillContext, SkillResponse, SkillRecommendation } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';
import { searchLibrary } from '../data/onlineLibraryData';
import { KnowledgeEngine } from '../engine/knowledgeEngine.service';
import { DrugMonographService } from '../services/drugMonograph.service';
import { adminSupabase } from '../server/adminClient';

export const drugInformationSkill: Skill = {
  definition: {
    id: 'drug_information',
    name: 'Drug Information',
    description: 'Provides structured information about medicines: mechanism, dosing, interactions, monitoring, counselling',
    category: 'knowledge',
    version: '2.0.0',
    priority: 75,
    cacheable: true,
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return (
      context.educationalContext.queryType === 'drug_info' ||
      context.educationalContext.drug !== undefined ||
      q.includes('drug') ||
      q.includes('medicine') ||
      q.includes('dosage') ||
      q.includes('side effect') ||
      q.includes('interaction') ||
      q.includes('contraindication')
    );
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const drugName = context.educationalContext.drug || context.query;

    try {
      const engineResult = await KnowledgeEngine.process(drugName, adminSupabase ?? undefined);
      const monograph = engineResult.drugMonographs?.[0];
      const hasGroundedData = engineResult.hasData;

      let content: string;
      const recommendations: SkillRecommendation[] = [];

      if (hasGroundedData && monograph) {
        const dosingSummary = monograph.dosage?.adult
          ? Object.entries(monograph.dosage.adult)
              .slice(0, 5)
              .map(([k, v]) => `- **${k}**: ${v}`)
              .join('\n')
          : 'See monograph for full dosing details.';

        const sideEffectsSummary = monograph.side_effects.slice(0, 5).join('\n- ');
        const interactionsSummary = monograph.interactions.slice(0, 6).join('\n- ');

        const paedsDosing = monograph.dosage?.paediatric
          ? Object.entries(monograph.dosage.paediatric)
              .slice(0, 3)
              .map(([k, v]) => `- **${k}**: ${v}`)
              .join('\n')
          : 'See monograph for paediatric dosing.';

        content = `## ${monograph.name} (${monograph.generic_name})

**Drug Class:** ${monograph.drug_class_name || monograph.drug_class}

### Indications
- ${monograph.indications.join('\n- ')}

### Contraindications
- ${monograph.contraindications.join('\n- ')}

### Dosage (Adult)
${dosingSummary}

### Dosage (Paediatric)
${paedsDosing}

**Renal Adjustment:** ${monograph.dosage?.renalAdjustment ?? 'See monograph.'}

**Hepatic Adjustment:** ${monograph.dosage?.hepaticAdjustment ?? 'See monograph.'}

### Side Effects
- ${sideEffectsSummary}

### Key Drug Interactions
- ${interactionsSummary}

### Monitoring
${monograph.monitoring}

### Patient Counselling
${monograph.patient_counselling}

---
*Source: Clinova Drug Monograph Database. Always verify against current BNF/KEML guidelines.*`;
      } else {
        const { systemInstruction, context: ragContext } = await KnowledgeEngine.buildPrompt(drugName, adminSupabase ?? undefined);

        const response = await generateContentWithFallback(
          {
            contents: `Provide comprehensive drug information for: ${drugName}\n\nRetrieved context:\n${ragContext || 'No specific monograph found in database. Use your training knowledge.'}`,
            systemInstruction,
            config: { temperature: 0.2, maxOutputTokens: 2048 },
          },
          undefined,
          'Drug Information Skill',
        );
        content = response.text;
      }

      const libResults = searchLibrary(drugName, {}).slice(0, 3);
      recommendations.push(...libResults.map(r => ({
        type: 'book' as const,
        title: r.title,
        resourceId: r.id,
        relevance: r.isFree ? 0.9 : 0.7,
        reason: `Refer to ${r.title} for detailed drug information`,
        url: r.publisherUrl,
      })));

      if (monograph) {
        recommendations.push({
          type: 'drug' as const,
          title: `View ${monograph.name} interactions`,
          resourceId: monograph.id,
          relevance: 0.85,
          reason: `Check which drugs interact with ${monograph.name}`,
        });
      }

      return {
        skillId: 'drug_information',
        content,
        data: { drugName, monographId: monograph?.id, groundedInDb: hasGroundedData },
        recommendations,
        confidence: hasGroundedData ? 0.95 : 0.85,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `drug_info_${drugName.toLowerCase().replace(/\s+/g, '_')}`,
      };
    } catch (error: any) {
      return {
        skillId: 'drug_information',
        error: error.message,
        confidence: 0,
        processingTimeMs: Date.now() - start,
      };
    }
  },

  async getRecommendations(context: SkillContext): Promise<SkillRecommendation[]> {
    const drugName = context.educationalContext.drug;
    if (!drugName) return [];

    const monograph = await DrugMonographService.getByName(drugName);
    const recs: SkillRecommendation[] = [];

    if (monograph) {
      recs.push({
        type: 'drug',
        title: `Interactions with ${monograph.name}`,
        resourceId: monograph.id,
        relevance: 0.9,
        reason: `${monograph.name} has ${monograph.interactions.length} documented drug interactions`,
      });
    }

    const libResults = searchLibrary(drugName, {}).slice(0, 3);
    recs.push(...libResults.map(r => ({
      type: 'book' as const,
      title: r.title,
      resourceId: r.id,
      relevance: r.isFree ? 0.9 : 0.7,
      reason: `Refer to ${r.title} for detailed drug information on ${drugName}`,
      url: r.publisherUrl,
    })));

    return recs;
  },
};

skillRegistry.register(drugInformationSkill);
