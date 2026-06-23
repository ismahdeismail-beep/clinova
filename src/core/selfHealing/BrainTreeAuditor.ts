import { EventBus } from '../../engine/EventBus';
import { WorkflowRepairEngine, type RepairResult } from './WorkflowRepairEngine';
import { WorkflowHealthService, type WorkflowHealth } from './WorkflowHealthService';
import { GraphIntegrityScanner } from './GraphIntegrityScanner';
import { NodeRecoveryManager } from './NodeRecoveryManager';
import type { Workflow, WorkflowNode } from '../../types/engine';

export interface AuditEvent {
  workflowId: string;
  type: 'scan' | 'repair' | 'health';
  timestamp: number;
  result: ScanAuditResult | RepairAuditResult | HealthAuditResult;
}

export interface ScanAuditResult {
  integrity: {
    nodeCount: number;
    edgeCount: number;
    issuesFound: number;
    errors: number;
    warnings: number;
  };
}

export interface RepairAuditResult {
  repaired: number;
  skipped: number;
  created: number;
  removed: number;
}

export interface HealthAuditResult {
  score: number;
  totalWorkflows: number;
}

export class BrainTreeAuditor {
  private repairEngine: WorkflowRepairEngine;
  private healthService: WorkflowHealthService;
  private eventBus: EventBus;
  private auditLog: AuditEvent[] = [];
  private maxLogSize = 1000;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
    this.repairEngine = new WorkflowRepairEngine(eventBus);
    this.healthService = new WorkflowHealthService();
  }

  auditWorkflow(workflow: Workflow, nodes: WorkflowNode[]): {
    scan: ScanAuditResult;
    repair: RepairResult;
    health: WorkflowHealth;
  } {
    const scanResult = this.repairEngine.getScanner().scan(workflow, nodes);
    const repairResult = this.repairEngine.repair(workflow, nodes);
    const health = this.healthService.cacheReport(workflow.id, scanResult, repairResult);

    const scanAudit: ScanAuditResult = {
      integrity: {
        nodeCount: scanResult.nodeCount,
        edgeCount: scanResult.edgeCount,
        issuesFound: scanResult.issues.length,
        errors: scanResult.issues.filter(i => i.severity === 'error').length,
        warnings: scanResult.issues.filter(i => i.severity === 'warning').length,
      },
    };

    const repairAudit: RepairAuditResult = {
      repaired: repairResult.actions.filter(a => a.action === 'repaired').length,
      skipped: repairResult.actions.filter(a => a.action === 'skipped').length,
      created: repairResult.actions.filter(a => a.action === 'created').length,
      removed: repairResult.actions.filter(a => a.action === 'removed').length,
    };

    const healthAudit: HealthAuditResult = {
      score: health.score,
      totalWorkflows: 1,
    };

    this.logEvent({
      workflowId: workflow.id,
      type: 'scan',
      timestamp: Date.now(),
      result: scanAudit,
    });

    this.logEvent({
      workflowId: workflow.id,
      type: 'repair',
      timestamp: Date.now(),
      result: repairAudit,
    });

    this.logEvent({
      workflowId: workflow.id,
      type: 'health',
      timestamp: Date.now(),
      result: healthAudit,
    });

    return { scan: scanAudit, repair: repairResult, health };
  }

  getRepairEngine(): WorkflowRepairEngine {
    return this.repairEngine;
  }

  getHealthService(): WorkflowHealthService {
    return this.healthService;
  }

  getScanner(): GraphIntegrityScanner {
    return this.repairEngine.getScanner();
  }

  getRecoveryManager(): NodeRecoveryManager {
    return this.repairEngine.getRecoveryManager();
  }

  getAuditLog(): AuditEvent[] {
    return [...this.auditLog];
  }

  getRecentAudits(count: number): AuditEvent[] {
    return this.auditLog.slice(-count);
  }

  private logEvent(event: AuditEvent): void {
    this.auditLog.push(event);
    if (this.auditLog.length > this.maxLogSize) {
      this.auditLog = this.auditLog.slice(-this.maxLogSize);
    }
    this.eventBus.emit('audit:event', event);
  }
}
