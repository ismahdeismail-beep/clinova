import type { AIResponse } from '../../types/engine';
import type { ClinicalConfidence } from './ConfidenceEngine';
import type { ValidationResult } from './ClinicalValidator';

export interface VerifiedRecommendation {
  recommendation: string;
  rationale: string;
  supportingEvidence: string[];
  confidenceScore: number;
  validationStatus: 'verified' | 'flagged' | 'rejected';
  safetyFlags: string[];
  timestamp: number;
}

export class RecommendationVerifier {
  verify(
    action: string,
    aiResponse: AIResponse,
    validation: ValidationResult,
    confidence: ClinicalConfidence,
  ): VerifiedRecommendation {
    const status = this.determineStatus(validation, confidence);

    return {
      recommendation: action,
      rationale: aiResponse.reasoning_steps?.join(' → ') || 'No reasoning provided',
      supportingEvidence: [
        `Diagnosis: ${aiResponse.diagnosis || 'Not specified'}`,
        `Confidence: ${confidence.score}/100`,
        `Evidence strength: ${validation.evidenceCheck.strength}`,
        ...(validation.evidenceCheck.score >= 50
          ? ['Evidence threshold met']
          : ['Evidence threshold not met']),
      ],
      confidenceScore: confidence.score,
      validationStatus: status,
      safetyFlags: validation.warnings,
      timestamp: Date.now(),
    };
  }

  private determineStatus(validation: ValidationResult, confidence: ClinicalConfidence): 'verified' | 'flagged' | 'rejected' {
    if (!validation.isValid || confidence.score < 30) return 'rejected';
    if (validation.warnings.length > 0 || confidence.score < 60) return 'flagged';
    return 'verified';
  }
}
