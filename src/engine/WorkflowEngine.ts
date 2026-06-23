import { EventBus } from './EventBus';
import type { Workflow, WorkflowNode, ClinicalSessionOutput } from '../types/engine';
import { RulesService } from '../services/rules.service';
import { WorkflowService } from '../services/workflow.service';

export type WorkflowEvent =
  | 'workflow:start'
  | 'workflow:complete'
  | 'workflow:error'
  | 'workflow:node:enter'
  | 'workflow:node:exit'
  | 'workflow:node:evaluate'
  | 'workflow:rule:broken'
  | 'workflow:state:change';

interface EngineContext {
  workflow: Workflow;
  currentNode: WorkflowNode;
  state: Record<string, any>;
  history: string[];
  safetyFlags: string[];
}

export class WorkflowEngine {
  private bus = EventBus.getInstance();
  private context: EngineContext | null = null;
  private nodeCache = new Map<string, WorkflowNode[]>();

  on(event: WorkflowEvent, handler: (...args: any[]) => void): () => void {
    return this.bus.on(event, handler);
  }

  async start(workflow: Workflow, initialContext: Record<string, any> = {}): Promise<void> {
    this.context = {
      workflow,
      currentNode: { id: '', workflowId: workflow.id, type: 'input', prompt: '', next: {}, position: { x: 0, y: 0 } },
      state: initialContext,
      history: [],
      safetyFlags: [],
    };

    const nodes = await this.loadNodes(workflow.id);
    const entryNode = nodes.find((n) => n.id === workflow.entryNode);
    if (!entryNode) {
      this.bus.emit('workflow:error', { message: `Entry node "${workflow.entryNode}" not found` });
      return;
    }

    this.bus.emit('workflow:start', { workflow, initialContext });
    await this.traverse(entryNode, nodes);
    this.bus.emit('workflow:complete', this.getOutput());
    this.nodeCache.delete(workflow.id);
  }

  private async loadNodes(workflowId: string): Promise<WorkflowNode[]> {
    if (this.nodeCache.has(workflowId)) {
      return this.nodeCache.get(workflowId)!;
    }
    const nodes = await WorkflowService.getWorkflowNodes(workflowId);
    this.nodeCache.set(workflowId, nodes);
    return nodes;
  }

  private readonly DEFAULT_SAFE_NODE: WorkflowNode = {
    id: 'default_safe_state',
    workflowId: '',
    type: 'output',
    prompt: 'Safe State: Clinical assessment completed with default protocol.',
    next: {},
    position: { x: 0, y: 0 },
  };

  private async traverse(node: WorkflowNode, allNodes: WorkflowNode[]): Promise<void> {
    if (!this.context) return;

    this.context.currentNode = node;
    this.context.history.push(node.id);
    this.bus.emit('workflow:node:enter', { node, state: this.context.state });

    const brokenRules = await RulesService.evaluateRules(this.context.state);
    for (const rule of brokenRules) {
      this.context.safetyFlags.push(rule.action);
      this.bus.emit('workflow:rule:broken', { rule, state: this.context.state });
    }

    this.bus.emit('workflow:node:evaluate', { node, state: this.context.state });

    const nextId = this.resolveNext(node, this.context.state);
    if (!nextId) {
      this.bus.emit('workflow:node:exit', { node, state: this.context.state });
      return;
    }

    const nextNode = allNodes.find((n) => n.id === nextId);
    if (!nextNode) {
      this.bus.emit('workflow:error', { message: `Node "${nextId}" not found — routing to safe fallback`, fromNode: node.id });
      const safeNode = { ...this.DEFAULT_SAFE_NODE, workflowId: this.context.workflow.id, prompt: `Fallback from missing node "${nextId}". ${this.DEFAULT_SAFE_NODE.prompt}` };
      this.bus.emit('workflow:node:exit', { node, nextNode: safeNode, state: this.context.state });
      this.context.currentNode = safeNode;
      return;
    }

    if (this.context.history.filter((id) => id === nextId).length > 3) {
      this.bus.emit('workflow:error', { message: `Cycle detected at node "${nextId}" — routing to safe fallback`, path: this.context.history });
      const safeNode = { ...this.DEFAULT_SAFE_NODE, workflowId: this.context.workflow.id, prompt: `Cycle prevention fallback from "${nextId}". ${this.DEFAULT_SAFE_NODE.prompt}` };
      this.bus.emit('workflow:node:exit', { node, nextNode: safeNode, state: this.context.state });
      this.context.currentNode = safeNode;
      return;
    }

    this.bus.emit('workflow:node:exit', { node, nextNode, state: this.context.state });
    await this.traverse(nextNode, allNodes);
  }

  private resolveNext(node: WorkflowNode, state: Record<string, any>): string | undefined {
    const { next, logic } = node;
    if (!logic) return next.default || next.yes;

    try {
      const result = RulesService.evaluateCondition(logic, state);
      return result ? (next.yes || next.default) : (next.no || next.default);
    } catch {
      return next.default;
    }
  }

  setState(key: string, value: any): void {
    if (!this.context) return;
    this.context.state[key] = value;
    this.bus.emit('workflow:state:change', { key, value, state: this.context.state });
  }

  getState(): Record<string, any> {
    return this.context?.state ?? {};
  }

  getOutput(): ClinicalSessionOutput | null {
    if (!this.context) return null;
    return {
      patient_summary: '',
      workflow_path: this.context.history,
      clinical_reasoning: '',
      risk_assessment: this.context.safetyFlags.length > 0 ? `Safety flags: ${this.context.safetyFlags.join(', ')}` : 'No risks detected',
      final_recommendation: '',
      safety_flags: this.context.safetyFlags,
    };
  }

  reset(): void {
    this.context = null;
    this.nodeCache.clear();
    this.bus.clear('workflow:start');
    this.bus.clear('workflow:complete');
    this.bus.clear('workflow:error');
    this.bus.clear('workflow:node:enter');
    this.bus.clear('workflow:node:exit');
    this.bus.clear('workflow:node:evaluate');
    this.bus.clear('workflow:rule:broken');
    this.bus.clear('workflow:state:change');
  }
}
