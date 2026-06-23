import type { Workflow, WorkflowNode } from '../../types/engine';
import { EventBus } from '../../engine/EventBus';

export interface IntegrityIssue {
  type: 'missing_node' | 'broken_edge' | 'circular_dependency' | 'dead_end'
    | 'unreachable_path' | 'duplicate_node' | 'invalid_reference' | 'missing_handler'
    | 'invalid_route_mapping';
  severity: 'error' | 'warning' | 'info';
  nodeId?: string;
  edgeId?: string;
  description: string;
  location?: string;
}

export interface ScanResult {
  workflowId: string;
  issues: IntegrityIssue[];
  nodeCount: number;
  edgeCount: number;
  timestamp: number;
}

export class GraphIntegrityScanner {
  private visited: Set<string> = new Set();
  private recursionStack: Set<string> = new Set();
  private issues: IntegrityIssue[] = [];

  scan(workflow: Workflow, nodes: WorkflowNode[]): ScanResult {
    this.visited.clear();
    this.recursionStack.clear();
    this.issues = [];

    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    const edgeCount = nodes.reduce((sum, n) => {
      let count = 0;
      if (n.next?.yes) count++;
      if (n.next?.no) count++;
      if (n.next?.default) count++;
      return sum + count;
    }, 0);

    this.detectMissingNodes(workflow, nodeMap);
    this.detectCircularDependencies(nodeMap);
    this.detectDeadEnds(workflow, nodeMap);
    this.detectUnreachablePaths(workflow, nodeMap);
    this.detectDuplicateNodes(nodes);
    this.detectInvalidReferences(workflow, nodeMap);
    this.detectMissingHandlers(nodeMap);
    this.detectBrokenEdges(workflow, nodeMap);

    return {
      workflowId: workflow.id,
      issues: [...this.issues],
      nodeCount: nodeMap.size,
      edgeCount,
      timestamp: Date.now(),
    };
  }

  private detectMissingNodes(workflow: Workflow, nodeMap: Map<string, WorkflowNode>): void {
    if (!nodeMap.has(workflow.entryNode)) {
      this.issues.push({
        type: 'missing_node',
        severity: 'error',
        nodeId: workflow.entryNode,
        description: `Entry node "${workflow.entryNode}" not found in workflow "${workflow.name}"`,
      });
    }
  }

  private detectCircularDependencies(nodeMap: Map<string, WorkflowNode>): void {
    for (const [id] of nodeMap) {
      if (!this.visited.has(id)) {
        this.dfsCycle(id, nodeMap);
      }
    }
  }

  private dfsCycle(nodeId: string, nodeMap: Map<string, WorkflowNode>): void {
    this.visited.add(nodeId);
    this.recursionStack.add(nodeId);

    const node = nodeMap.get(nodeId);
    if (!node?.next) {
      this.recursionStack.delete(nodeId);
      return;
    }

    const targets = [node.next.yes, node.next.no, node.next.default].filter(Boolean) as string[];
    for (const target of targets) {
      if (!nodeMap.has(target)) continue;
      if (!this.visited.has(target)) {
        this.dfsCycle(target, nodeMap);
      } else if (this.recursionStack.has(target)) {
        this.issues.push({
          type: 'circular_dependency',
          severity: 'error',
          nodeId: target,
          description: `Circular dependency detected involving node "${target}" through node "${nodeId}"`,
        });
      }
    }

    this.recursionStack.delete(nodeId);
  }

  private detectDeadEnds(workflow: Workflow, nodeMap: Map<string, WorkflowNode>): void {
    for (const [id, node] of nodeMap) {
      if (node.type !== 'output') {
        const hasOutgoing = node.next?.yes || node.next?.no || node.next?.default;
        if (!hasOutgoing) {
          this.issues.push({
            type: 'dead_end',
            severity: 'warning',
            nodeId: id,
            description: `Node "${id}" has no outgoing connections and is not an output node`,
          });
        }
      }
    }
  }

  private detectUnreachablePaths(workflow: Workflow, nodeMap: Map<string, WorkflowNode>): void {
    const reachable = new Set<string>();
    const queue = [workflow.entryNode];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (reachable.has(current)) continue;
      reachable.add(current);
      const node = nodeMap.get(current);
      if (node?.next) {
        const targets = [node.next.yes, node.next.no, node.next.default].filter(Boolean) as string[];
        queue.push(...targets.filter(t => nodeMap.has(t) && !reachable.has(t)));
      }
    }

    for (const [id] of nodeMap) {
      if (!reachable.has(id)) {
        this.issues.push({
          type: 'unreachable_path',
          severity: 'warning',
          nodeId: id,
          description: `Node "${id}" is unreachable from workflow entry point`,
        });
      }
    }
  }

  private detectDuplicateNodes(nodes: WorkflowNode[]): void {
    const seen = new Map<string, string[]>();
    for (const node of nodes) {
      const existing = seen.get(node.id) || [];
      existing.push(node.id);
      seen.set(node.id, existing);
    }
    for (const [id, instances] of seen) {
      if (instances.length > 1) {
        this.issues.push({
          type: 'duplicate_node',
          severity: 'warning',
          nodeId: id,
          description: `Duplicate node ID "${id}" found ${instances.length} times`,
        });
      }
    }
  }

  private detectInvalidReferences(workflow: Workflow, nodeMap: Map<string, WorkflowNode>): void {
    for (const [id, node] of nodeMap) {
      if (node.next) {
        const targets = [node.next.yes, node.next.no, node.next.default].filter(Boolean) as string[];
        for (const target of targets) {
          if (!nodeMap.has(target)) {
            this.issues.push({
              type: 'invalid_reference',
              severity: 'error',
              nodeId: id,
              description: `Node "${id}" references non-existent node "${target}"`,
            });
          }
        }
      }
    }
  }

  private detectMissingHandlers(nodeMap: Map<string, WorkflowNode>): void {
    for (const [id, node] of nodeMap) {
      if (node.logic && !node.next?.yes && !node.next?.no) {
        this.issues.push({
          type: 'missing_handler',
          severity: 'warning',
          nodeId: id,
          description: `Node "${id}" has logic but no conditional handlers (yes/no)`,
        });
      }
    }
  }

  private detectBrokenEdges(workflow: Workflow, nodeMap: Map<string, WorkflowNode>): void {
    for (const [id, node] of nodeMap) {
      if (node.next) {
        const edges = [
          { key: 'yes', val: node.next.yes },
          { key: 'no', val: node.next.no },
          { key: 'default', val: node.next.default },
        ].filter(e => e.val) as { key: string; val: string }[];

        for (const edge of edges) {
          if (!nodeMap.has(edge.val)) {
            this.issues.push({
              type: 'broken_edge',
              severity: 'error',
              nodeId: id,
              edgeId: `${id}->${edge.val}`,
              description: `Broken edge from "${id}" via "${edge.key}" to missing node "${edge.val}"`,
            });
          }
        }
      }
    }
  }
}
