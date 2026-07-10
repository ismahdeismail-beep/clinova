// ================================================================
// Drug Information Skill — structured drug information including
// mechanism, dosing, interactions, monitoring, and counselling
// ================================================================

import type { Skill, SkillContext, SkillResponse, SkillRecommendation } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';
import { searchLibrary } from '../data/onlineLibraryData';

export const drugInformationSkill: Skill = {
  definition: {
    id: 'drug_information',
    name: 'Drug Information',
    description: 'Provides structured information about medicines: mechanism, dosing, interactions, monitoring, counselling',
    category: 'knowledge',
    version: '1.0.0',
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
      const systemInstruction = `You are a clinical drug information specialist. Provide structured drug information covering:\n
1. **Mechanism of Action** —简明, molecular-level explanation
2. **Indications** — Approved and common off-label uses
3. **Contraindications** — Absolute and relative
4. **Dosage** — Adult, pediatric, renal/hepatic adjustment
5. **Adverse Effects** — Common, serious, and management
6. **Drug Interactions** — Major interactions and clinical management
7. **Monitoring Parameters** — Efficacy and safety monitoring
8. **Patient Counselling** — Key counselling points
9. **Pregnancy & Lactation** — Safety category and recommendations
10. **Availability in Kenya** — Common brands, approximate cost, registration status`;

      const response = await generateContentWithFallback(
        {
          contents: `Provide comprehensive drug information for: ${drugName}`,
          systemInstruction,
          config: { temperature: 0.2, maxOutputTokens: 2048 },
        },
        undefined,
        'Drug Information Skill'
      );

      // Get library recommendations for this drug
      const libResults = searchLibrary(drugName, {}).slice(0, 3);
      const recommendations: SkillRecommendation[] = libResults.map(r => ({
        type: 'book',
        title: r.title,
        resourceId: r.id,
        relevance: r.isFree ? 0.9 : 0.7,
        reason: `Refer to ${r.title} for detailed drug information`,
        url: r.publisherUrl,
      }));

      return {
        skillId: 'drug_information',
        content: response.text,
        data: { drugName },
        recommendations,
        confidence: 0.88,
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

    const libResults = searchLibrary(drugName, {}).slice(0, 3);
    return libResults.map(r => ({
      type: 'book',
      title: r.title,
      resourceId: r.id,
      relevance: r.isFree ? 0.9 : 0.7,
      reason: `Refer to ${r.title} for detailed drug information on ${drugName}`,
      url: r.publisherUrl,
    }));
  },
};

skillRegistry.register(drugInformationSkill);
