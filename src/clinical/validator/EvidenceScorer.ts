import type { Drug, AIResponse } from '../../types/engine';
import type { SafetyProfile } from './SafetyChecker';

export interface EvidenceScore {
  score: number;
  strength: 'insufficient' | 'weak' | 'moderate' | 'strong' | 'definitive';
  gaps: string[];
  supportingEvidence: string[];
}

export class EvidenceScorer {
  score(aiResponse: AIResponse, drugs: Drug[], profile: SafetyProfile): EvidenceScore {
    const supportingEvidence: string[] = [];
    const gaps: string[] = [];

    if (aiResponse.diagnosis) {
      supportingEvidence.push(`Primary diagnosis: ${aiResponse.diagnosis}`);
    } else {
      gaps.push('No primary diagnosis provided');
    }

    if (aiResponse.reasoning_steps && aiResponse.reasoning_steps.length > 0) {
      supportingEvidence.push(`Reasoning includes ${aiResponse.reasoning_steps.length} steps`);
    } else {
      gaps.push('No reasoning steps provided');
    }

    if (aiResponse.recommended_actions && aiResponse.recommended_actions.length > 0) {
      supportingEvidence.push(`${aiResponse.recommended_actions.length} recommended actions`);
    }

    if (aiResponse.warnings && aiResponse.warnings.length > 0) {
      supportingEvidence.push(`${aiResponse.warnings.length} warnings documented`);
    }

    if (aiResponse.confidence_score !== undefined) {
      supportingEvidence.push(`AI confidence: ${aiResponse.confidence_score}%`);
    }

    if (drugs.length === 0) {
      gaps.push('No drugs specified in recommendation');
    }

    if (profile.conditions.length === 0) {
      gaps.push('No patient conditions documented');
    }

    const score = this.calculateScore(supportingEvidence.length, gaps.length, aiResponse.confidence_score);
    const strength = this.determineStrength(score);

    return { score, strength, gaps, supportingEvidence };
  }

  private calculateScore(evidenceCount: number, gapCount: number, confidence?: number): number {
    let base = evidenceCount * 15;
    const gapPenalty = gapCount * 10;
    base -= gapPenalty;

    if (confidence !== undefined) {
      base += Math.round(confidence / 10);
    }

    return Math.max(0, Math.min(100, base));
  }

  private determineStrength(score: number): 'insufficient' | 'weak' | 'moderate' | 'strong' | 'definitive' {
    if (score >= 90) return 'definitive';
    if (score >= 70) return 'strong';
    if (score >= 50) return 'moderate';
    if (score >= 25) return 'weak';
    return 'insufficient';
  }
}
