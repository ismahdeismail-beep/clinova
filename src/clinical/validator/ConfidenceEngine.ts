import type { Drug } from '../../types/engine';
import type { SafetyProfile, SafetyCheckResult } from './SafetyChecker';
import type { ValidationResult } from './ClinicalValidator';

export interface ClinicalConfidence {
  score: number;
  evidenceStrength: number;
  riskLevel: 'none' | 'low' | 'moderate' | 'high' | 'critical';
  warnings: string[];
}

export class ConfidenceEngine {
  calculate(
    validationResult: ValidationResult,
    drugCount: number,
    evidenceCount: number,
  ): ClinicalConfidence {
    const safetyScore = validationResult.safetyCheck.passed ? 40 : 10;
    const evidenceScore = Math.min(30, evidenceCount * 10);
    const riskPenalty = this.calculateRiskPenalty(validationResult.riskLevel);

    let score = safetyScore + evidenceScore - riskPenalty;
    if (validationResult.evidenceCheck.score > 0) {
      score = Math.round((score + validationResult.evidenceCheck.score) / 2);
    }
    score = Math.max(0, Math.min(100, score));

    return {
      score,
      evidenceStrength: validationResult.evidenceCheck.score,
      riskLevel: validationResult.riskLevel,
      warnings: validationResult.warnings,
    };
  }

  calculateWithProfile(
    validationResult: ValidationResult,
    profile: SafetyProfile,
    drugs: Drug[],
  ): ClinicalConfidence {
    const maxEvidence = drugs.length + profile.conditions.length + profile.currentMedications.length;
    return this.calculate(validationResult, drugs.length, maxEvidence);
  }

  getConfidenceLabel(score: number): string {
    if (score >= 90) return 'High Confidence';
    if (score >= 70) return 'Moderate Confidence';
    if (score >= 40) return 'Low Confidence';
    return 'Insufficient Confidence';
  }

  private calculateRiskPenalty(riskLevel: string): number {
    const penalties: Record<string, number> = {
      none: 0,
      low: 5,
      moderate: 15,
      high: 30,
      critical: 50,
    };
    return penalties[riskLevel] || 0;
  }
}
