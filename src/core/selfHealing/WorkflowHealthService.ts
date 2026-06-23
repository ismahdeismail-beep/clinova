import type { Workflow, WorkflowNode } from '../../types/engine';
import type { ScanResult } from './GraphIntegrityScanner';
import type { RepairResult } from './WorkflowRepairEngine';

export interface WorkflowHealth {
  score: number;
  warnings: string[];
  errors: string[];
  repairedIssues: string[];
}

export interface HealthReport {
  workflows: Map<string, WorkflowHealth>;
  globalScore: number;
  totalWarnings: number;
  totalErrors: number;
  totalRepaired: number;
  timestamp: number;
}

export class WorkflowHealthService {
  private reports: Map<string, HealthReport> = new Map();

  assess(scanResult: ScanResult, repairResult?: RepairResult): WorkflowHealth {
    const errors = scanResult.issues.filter(i => i.severity === 'error');
    const warnings = scanResult.issues.filter(i => i.severity === 'warning');

    const errorPenalty = errors.length * 15;
    const warningPenalty = warnings.length * 5;
    const score = Math.max(0, Math.min(100, 100 - errorPenalty - warningPenalty));

    return {
      score,
      warnings: warnings.map(w => w.description),
      errors: errors.map(e => e.description),
      repairedIssues: repairResult
        ? repairResult.actions.filter(a => a.action !== 'skipped').map(a => a.description)
        : [],
    };
  }

  generateReport(workflowHealths: Map<string, WorkflowHealth>): HealthReport {
    let totalScore = 0;
    let totalWarnings = 0;
    let totalErrors = 0;
    let totalRepaired = 0;

    for (const health of workflowHealths.values()) {
      totalScore += health.score;
      totalWarnings += health.warnings.length;
      totalErrors += health.errors.length;
      totalRepaired += health.repairedIssues.length;
    }

    const count = workflowHealths.size || 1;

    return {
      workflows: workflowHealths,
      globalScore: Math.round(totalScore / count),
      totalWarnings,
      totalErrors,
      totalRepaired,
      timestamp: Date.now(),
    };
  }

  cacheReport(workflowId: string, scanResult: ScanResult, repairResult?: RepairResult): WorkflowHealth {
    const health = this.assess(scanResult, repairResult);
    const existingReport = this.reports.get(workflowId) || {
      workflows: new Map(),
      globalScore: 0,
      totalWarnings: 0,
      totalErrors: 0,
      totalRepaired: 0,
      timestamp: 0,
    };
    existingReport.workflows.set(workflowId, health);
    existingReport.globalScore = this.calculateGlobalScore(existingReport.workflows);
    existingReport.totalWarnings += health.warnings.length;
    existingReport.totalErrors += health.errors.length;
    existingReport.totalRepaired += health.repairedIssues.length;
    existingReport.timestamp = Date.now();
    this.reports.set(workflowId, existingReport);
    return health;
  }

  getReport(workflowId: string): HealthReport | undefined {
    return this.reports.get(workflowId);
  }

  getGlobalHealth(): { score: number; totalWorkflows: number } {
    const scores = Array.from(this.reports.values()).map(r => r.globalScore);
    const avg = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 100;
    return { score: avg, totalWorkflows: this.reports.size };
  }

  private calculateGlobalScore(workflows: Map<string, WorkflowHealth>): number {
    const scores = Array.from(workflows.values()).map(h => h.score);
    return scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 100;
  }
}
