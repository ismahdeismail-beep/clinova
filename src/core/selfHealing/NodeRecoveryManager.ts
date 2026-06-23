import type { WorkflowNode, NodeType } from '../../types/engine';
import type { IntegrityIssue } from './GraphIntegrityScanner';

export class NodeRecoveryManager {
  private recoveryLog: string[] = [];

  recoverMissingNode(workflowId: string, nodeId: string, issue: IntegrityIssue): WorkflowNode | null {
    const node = this.generateReplacementNode(workflowId, nodeId, issue);
    if (node) {
      this.recoveryLog.push(`Recovered missing node "${nodeId}" in workflow "${workflowId}"`);
    }
    return node;
  }

  recoverBrokenEdge(edgeId: string): { from: string; to: string } | null {
    this.recoveryLog.push(`Attempted edge recovery for "${edgeId}"`);
    return null;
  }

  restoreDefaultBehavior(node: WorkflowNode): WorkflowNode {
    this.recoveryLog.push(`Restored default behavior for node "${node.id}"`);
    return {
      ...node,
      next: node.next || { yes: undefined, no: undefined, default: undefined },
      logic: node.logic || '',
      prompt: node.prompt || '',
    };
  }

  removeDuplicateNodes(nodes: WorkflowNode[]): WorkflowNode[] {
    const seen = new Map<string, WorkflowNode>();
    for (const node of nodes) {
      const existing = seen.get(node.id);
      if (!existing) {
        seen.set(node.id, node);
      } else {
        this.recoveryLog.push(`Removed duplicate node "${node.id}"`);
      }
    }
    return Array.from(seen.values());
  }

  getRecoveryLog(): string[] {
    return [...this.recoveryLog];
  }

  clearRecoveryLog(): void {
    this.recoveryLog = [];
  }

  private generateReplacementNode(workflowId: string, nodeId: string, issue: IntegrityIssue): WorkflowNode | null {
    if (issue.type !== 'missing_node') return null;

    const typeHint = this.inferNodeType(nodeId);

    return {
      id: nodeId,
      workflowId,
      type: typeHint,
      prompt: `Auto-recovered node: ${nodeId}`,
      inputType: 'text',
      logic: '',
      next: {},
      position: { x: 0, y: 0 },
    };
  }

  private inferNodeType(nodeId: string): NodeType {
    const lower = nodeId.toLowerCase();
    if (lower.includes('decision') || lower.includes('check') || lower.includes('if')) return 'decision';
    if (lower.includes('calc') || lower.includes('score') || lower.includes('bmi')) return 'calculation';
    if (lower.includes('output') || lower.includes('result') || lower.includes('end')) return 'output';
    return 'input';
  }
}
