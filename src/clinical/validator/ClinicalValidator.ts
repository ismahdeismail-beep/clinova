import { SafetyChecker, type SafetyProfile } from './SafetyChecker';
import { InteractionAnalyzer } from './InteractionAnalyzer';
import { EvidenceScorer } from './EvidenceScorer';
import type { Drug, Interaction, AIResponse } from '../../types/engine';

export interface ValidationResult {
  isValid: boolean;
  safetyCheck: {
    passed: boolean;
    issues: string[];
    riskLevel: string;
  };
  evidenceCheck: {
    score: number;
    strength: string;
    gaps: string[];
  };
  recommendations: string[];
  warnings: string[];
  riskLevel: 'none' | 'low' | 'moderate' | 'high' | 'critical';
  timestamp: number;
}

export class ClinicalValidator {
  private safetyChecker: SafetyChecker;
  private interactionAnalyzer: InteractionAnalyzer;
  private evidenceScorer: EvidenceScorer;

  constructor() {
    this.safetyChecker = new SafetyChecker();
    this.interactionAnalyzer = new InteractionAnalyzer();
    this.evidenceScorer = new EvidenceScorer();
  }

  validateRecommendation(
    aiResponse: AIResponse,
    drugs: Drug[],
    interactions: Interaction[],
    profile: SafetyProfile,
  ): ValidationResult {
    const warnings: string[] = [];
    const recommendations: string[] = [];
    const interactionMap = new Map<string, Interaction>();
    for (const ix of interactions) {
      const key = [ix.drugA, ix.drugB].sort().join('__');
      interactionMap.set(key, ix);
    }

    const safetyIssues: string[] = [];
    let highestRisk: 'none' | 'low' | 'moderate' | 'high' | 'critical' = 'none';
    let allSafetyPassed = true;

    for (const drug of drugs) {
      const allergyCheck = this.safetyChecker.checkDrugAllergies(drug, profile);
      if (!allergyCheck.safe) {
        safetyIssues.push(...allergyCheck.warnings);
        warnings.push(...allergyCheck.warnings);
        if (this.riskRank(allergyCheck.riskLevel) > this.riskRank(highestRisk)) {
          highestRisk = allergyCheck.riskLevel;
        }
        allSafetyPassed = false;
      }

      const pregnancyCheck = this.safetyChecker.checkPregnancySafety(drug, profile);
      if (!pregnancyCheck.safe) {
        safetyIssues.push(...pregnancyCheck.warnings);
        warnings.push(...pregnancyCheck.warnings);
        if (this.riskRank(pregnancyCheck.riskLevel) > this.riskRank(highestRisk)) {
          highestRisk = pregnancyCheck.riskLevel;
        }
        allSafetyPassed = false;
      }

      const renalCheck = this.safetyChecker.checkRenalDosing(drug, profile);
      if (!renalCheck.safe) {
        safetyIssues.push(...renalCheck.warnings);
        warnings.push(...renalCheck.warnings);
        if (this.riskRank(renalCheck.riskLevel) > this.riskRank(highestRisk)) {
          highestRisk = renalCheck.riskLevel;
        }
      }

      const hepaticCheck = this.safetyChecker.checkHepaticDosing(drug, profile);
      if (!hepaticCheck.safe) {
        safetyIssues.push(...hepaticCheck.warnings);
        warnings.push(...hepaticCheck.warnings);
        if (this.riskRank(hepaticCheck.riskLevel) > this.riskRank(highestRisk)) {
          highestRisk = hepaticCheck.riskLevel;
        }
      }

      const pediatricCheck = this.safetyChecker.checkPediatricDosing(drug, profile);
      if (!pediatricCheck.safe) {
        safetyIssues.push(...pediatricCheck.warnings);
        warnings.push(...pediatricCheck.warnings);
      }

      const duplicateCheck = this.safetyChecker.checkDuplicateTherapy(drug, profile);
      if (!duplicateCheck.safe) {
        warnings.push(...duplicateCheck.warnings);
      }
    }

    const interactionResult = this.interactionAnalyzer.analyzeMultiDrugInteractions(drugs, interactionMap);
    if (!interactionResult.safe) {
      safetyIssues.push(...interactionResult.warnings);
      warnings.push(...interactionResult.warnings);
      if (this.riskRank(interactionResult.riskLevel) > this.riskRank(highestRisk)) {
        highestRisk = interactionResult.riskLevel;
      }
      allSafetyPassed = false;
    }

    const evidenceResult = this.evidenceScorer.score(aiResponse, drugs, profile);

    const isValid = allSafetyPassed && evidenceResult.score >= 30;

    return {
      isValid,
      safetyCheck: {
        passed: allSafetyPassed,
        issues: safetyIssues,
        riskLevel: highestRisk,
      },
      evidenceCheck: {
        score: evidenceResult.score,
        strength: evidenceResult.strength,
        gaps: evidenceResult.gaps,
      },
      recommendations: this.generateRecommendations(evidenceResult, safetyIssues),
      warnings,
      riskLevel: highestRisk,
      timestamp: Date.now(),
    };
  }

  getSafetyChecker(): SafetyChecker {
    return this.safetyChecker;
  }

  getInteractionAnalyzer(): InteractionAnalyzer {
    return this.interactionAnalyzer;
  }

  getEvidenceScorer(): EvidenceScorer {
    return this.evidenceScorer;
  }

  private generateRecommendations(evidence: { score: number; gaps: string[] }, safetyIssues: string[]): string[] {
    const recs: string[] = [];
    if (safetyIssues.length > 0) {
      recs.push('Address safety concerns before proceeding with recommendation');
    }
    if (evidence.score < 50) {
      recs.push('Gather additional evidence to strengthen clinical support');
    }
    if (evidence.gaps.length > 0) {
      recs.push(`Address evidence gaps: ${evidence.gaps.slice(0, 3).join(', ')}`);
    }
    if (recs.length === 0) {
      recs.push('Recommendation validated - proceed with clinical decision');
    }
    return recs;
  }

  private riskRank(level: string): number {
    const ranks: Record<string, number> = { none: 0, low: 1, moderate: 2, high: 3, critical: 4 };
    return ranks[level] || 0;
  }
}
