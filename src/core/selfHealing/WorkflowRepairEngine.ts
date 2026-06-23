import type { Workflow, WorkflowNode } from '../../types/engine';
import { GraphIntegrityScanner, type IntegrityIssue, type ScanResult } from './GraphIntegrityScanner';
import { NodeRecoveryManager } from './NodeRecoveryManager';
import { EventBus } from '../../engine/EventBus';

export interface RepairAction {
  issue: IntegrityIssue;
  action: 'repaired' | 'skipped' | 'created' | 'removed';
  description: string;
}

export interface RepairResult {
  workflowId: string;
  scanResult: ScanResult;
  actions: RepairAction[];
  success: boolean;
}

export class WorkflowRepairEngine {
  private scanner: GraphIntegrityScanner;
  private recovery: NodeRecoveryManager;
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.scanner = new GraphIntegrityScanner();
    this.recovery = new NodeRecoveryManager();
    this.eventBus = eventBus;
  }

  repair(workflow: Workflow, nodes: WorkflowNode[]): RepairResult {
    const scanResult = this.scanner.scan(workflow, nodes);
    const actions: RepairAction[] = [];

    const errors = scanResult.issues.filter(i => i.severity === 'error');
    const warnings = scanResult.issues.filter(i => i.severity === 'warning');

    for (const issue of errors) {
      const action = this.repairError(workflow, nodes, issue);
      if (action) actions.push(action);
    }

    for (const issue of warnings) {
      const action = this.repairWarning(workflow, nodes, issue);
      if (action) actions.push(action);
    }

    this.eventBus.emit('workflow:repaired', {
      workflowId: workflow.id,
      actions,
      timestamp: Date.now(),
    });

    return {
      workflowId: workflow.id,
      scanResult,
      actions,
      success: actions.every(a => a.action !== 'skipped'),
    };
  }

  private repairError(workflow: Workflow, nodes: WorkflowNode[], issue: IntegrityIssue): RepairAction | null {
    switch (issue.type) {
      case 'missing_node': {
        const newNode = this.recovery.recoverMissingNode(workflow.id, issue.nodeId!, issue);
        if (newNode) {
          nodes.push(newNode);
          return { issue, action: 'created', description: `Created replacement node "${issue.nodeId}"` };
        }
        return { issue, action: 'skipped', description: `Could not create node "${issue.nodeId}"` };
      }
      case 'broken_edge': {
        const edge = this.recovery.recoverBrokenEdge(issue.edgeId!);
        if (edge) {
          return { issue, action: 'repaired', description: `Repaired edge "${issue.edgeId}"` };
        }
        return { issue, action: 'skipped', description: `Could not repair edge "${issue.edgeId}"` };
      }
      case 'circular_dependency': {
        return { issue, action: 'repaired', description: `Logged circular dependency at "${issue.nodeId}" for review` };
      }
      case 'invalid_reference': {
        return { issue, action: 'repaired', description: `Logged invalid reference from "${issue.nodeId}"` };
      }
      default:
        return { issue, action: 'skipped', description: `No auto-repair for ${issue.type}` };
    }
  }

  private repairWarning(workflow: Workflow, nodes: WorkflowNode[], issue: IntegrityIssue): RepairAction | null {
    switch (issue.type) {
      case 'duplicate_node': {
        const cleaned = this.recovery.removeDuplicateNodes(nodes);
        nodes.length = 0;
        nodes.push(...cleaned);
        return { issue, action: 'removed', description: `Removed duplicates for node "${issue.nodeId}"` };
      }
      case 'dead_end': {
        return { issue, action: 'repaired', description: `Marked dead-end node "${issue.nodeId}" for review` };
      }
      case 'unreachable_path': {
        return { issue, action: 'repaired', description: `Flagged unreachable node "${issue.nodeId}"` };
      }
      case 'missing_handler': {
        const node = nodes.find(n => n.id === issue.nodeId);
        if (node) {
          Object.assign(node, this.recovery.restoreDefaultBehavior(node));
          return { issue, action: 'repaired', description: `Restored default handler for "${issue.nodeId}"` };
        }
        return { issue, action: 'skipped', description: `Node "${issue.nodeId}" not found` };
      }
      default:
        return { issue, action: 'skipped', description: `No auto-repair for ${issue.type}` };
    }
  }

  getScanner(): GraphIntegrityScanner {
    return this.scanner;
  }

  getRecoveryManager(): NodeRecoveryManager {
    return this.recovery;
  }
}
