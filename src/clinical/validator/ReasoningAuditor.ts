import type { ClinicalConfidence } from './ConfidenceEngine';

export interface AuditEntry {
  step: string;
  conclusion: string;
  evidence: string[];
  validity: 'valid' | 'invalid' | 'inconclusive';
  confidence: number;
  timestamp: number;
}

export class ReasoningAuditor {
  private auditTrail: AuditEntry[] = [];

  auditStep(step: string, conclusion: string, evidence: string[], confidence: ClinicalConfidence): AuditEntry {
    const entry: AuditEntry = {
      step,
      conclusion,
      evidence,
      validity: this.determineValidity(evidence, confidence),
      confidence: confidence.score,
      timestamp: Date.now(),
    };
    this.auditTrail.push(entry);
    return entry;
  }

  detectMissingEvidence(conclusion: string, availableEvidence: string[]): string[] {
    const gaps: string[] = [];
    const keywords = this.extractKeywords(conclusion);

    for (const keyword of keywords) {
      const hasEvidence = availableEvidence.some(e =>
        e.toLowerCase().includes(keyword.toLowerCase())
      );
      if (!hasEvidence) {
        gaps.push(`Missing evidence for: "${keyword}"`);
      }
    }

    return gaps;
  }

  detectContradictions(entries: AuditEntry[]): string[] {
    const contradictions: string[] = [];
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        if (entries[i].validity === 'valid' && entries[j].validity === 'valid') {
          if (this.areContradictory(entries[i].conclusion, entries[j].conclusion)) {
            contradictions.push(
              `Contradiction between step "${entries[i].step}" and "${entries[j].step}"`
            );
          }
        }
      }
    }
    return contradictions;
  }

  detectWorkflowGaps(steps: string[], validSteps: number): string[] {
    const gaps: string[] = [];
    const expectedSteps = ['assessment', 'diagnosis', 'intervention', 'monitoring'];

    for (const expected of expectedSteps) {
      if (!steps.some(s => s.toLowerCase().includes(expected))) {
        gaps.push(`Missing workflow step: ${expected}`);
      }
    }

    return gaps;
  }

  getAuditTrail(): AuditEntry[] {
    return [...this.auditTrail];
  }

  clearAudit(): void {
    this.auditTrail = [];
  }

  private determineValidity(evidence: string[], confidence: ClinicalConfidence): 'valid' | 'invalid' | 'inconclusive' {
    if (evidence.length === 0) return 'inconclusive';
    if (confidence.score < 30) return 'inconclusive';
    if (evidence.length >= 2 && confidence.score >= 50) return 'valid';
    return 'inconclusive';
  }

  private extractKeywords(text: string): string[] {
    const words = text.split(/\s+/);
    return words.filter(w => w.length > 4 && /^[a-zA-Z]/.test(w));
  }

  private areContradictory(a: string, b: string): boolean {
    const negationWords = ['not', 'no', 'never', 'contraindicated', 'avoid', 'unlikely'];
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();
    for (const word of negationWords) {
      if ((lowerA.includes(word) && !lowerB.includes(word)) ||
          (!lowerA.includes(word) && lowerB.includes(word))) {
        return true;
      }
    }
    return false;
  }
}
