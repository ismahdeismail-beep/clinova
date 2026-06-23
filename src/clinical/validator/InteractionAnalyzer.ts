import type { Drug, Interaction } from '../../types/engine';
import type { SafetyCheckResult } from './SafetyChecker';

export class InteractionAnalyzer {
  analyzeInteractions(drugA: Drug, drugB: Drug, interaction?: Interaction): SafetyCheckResult {
    const warnings: string[] = [];
    const details: string[] = [];

    if (interaction) {
      const severityLabel = interaction.severity || 'unknown';
      const riskLabel = interaction.risk || 'unknown';

      warnings.push(`Interaction between ${drugA.name} and ${drugB.name}: ${severityLabel}`);
      details.push(`Risk: ${riskLabel}`);
      details.push(`Mechanism: ${interaction.mechanism || 'Unknown'}`);

      if (riskLabel === 'high' || riskLabel === 'contraindicated') {
        warnings.push(`Contraindicated combination: ${drugA.name} + ${drugB.name}`);
      }
    }

    const riskLevel = this.determineRiskLevel(interaction);
    return {
      safe: riskLevel !== 'critical' && riskLevel !== 'high',
      riskLevel,
      warnings,
      details,
    };
  }

  analyzeMultiDrugInteractions(drugs: Drug[], interactions: Map<string, Interaction>): SafetyCheckResult {
    const allWarnings: string[] = [];
    const allDetails: string[] = [];
    let highestRisk: 'none' | 'low' | 'moderate' | 'high' | 'critical' = 'none';

    for (let i = 0; i < drugs.length; i++) {
      for (let j = i + 1; j < drugs.length; j++) {
        const pairKey = this.getPairKey(drugs[i].id, drugs[j].id);
        const interaction = interactions.get(pairKey);
        const result = this.analyzeInteractions(drugs[i], drugs[j], interaction);
        allWarnings.push(...result.warnings);
        allDetails.push(...result.details);
        if (this.riskRank(result.riskLevel) > this.riskRank(highestRisk)) {
          highestRisk = result.riskLevel;
        }
      }
    }

    return {
      safe: highestRisk !== 'critical' && highestRisk !== 'high',
      riskLevel: highestRisk,
      warnings: allWarnings,
      details: allDetails,
    };
  }

  checkContraindications(drug: Drug, condition: string): SafetyCheckResult {
    const warnings: string[] = [];
    const details: string[] = [];

    if (drug.contraindications?.some(c => c.toLowerCase().includes(condition.toLowerCase()))) {
      warnings.push(`${drug.name} is contraindicated in ${condition}`);
      details.push(`Contraindication matched in drug profile`);
    }

    return {
      safe: warnings.length === 0,
      riskLevel: warnings.length > 0 ? 'critical' : 'none',
      warnings,
      details,
    };
  }

  private getPairKey(idA: string, idB: string): string {
    return [idA, idB].sort().join('__');
  }

  private determineRiskLevel(interaction?: Interaction): 'none' | 'low' | 'moderate' | 'high' | 'critical' {
    if (!interaction) return 'none';
    const severity = interaction.severity?.toLowerCase() || '';
    const risk = interaction.risk?.toLowerCase() || '';
    if (severity === 'contraindicated' || risk === 'high') return 'critical';
    if (risk === 'moderate' || severity === 'severe') return 'high';
    if (risk === 'low' || severity === 'moderate') return 'moderate';
    return 'low';
  }

  private riskRank(level: string): number {
    const ranks: Record<string, number> = { none: 0, low: 1, moderate: 2, high: 3, critical: 4 };
    return ranks[level] || 0;
  }
}
