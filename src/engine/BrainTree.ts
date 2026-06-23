import { EventBus } from './EventBus';
import { WorkflowEngine } from './WorkflowEngine';
import type { Workflow, WorkflowNode, ClinicalSessionOutput } from '../types/engine';

type EnginePhase = 'idle' | 'assessing' | 'reasoning' | 'deciding' | 'executing' | 'complete' | 'error';

interface BrainTreeState {
  phase: EnginePhase;
  workflowId: string | null;
  sessionId: string | null;
}

export class BrainTree {
  private static instance: BrainTree;
  private bus = EventBus.getInstance();
  private engine = new WorkflowEngine();
  private state: BrainTreeState = { phase: 'idle', workflowId: null, sessionId: null };
  private sessionCounter = 0;

  static getInstance(): BrainTree {
    if (!BrainTree.instance) {
      BrainTree.instance = new BrainTree();
    }
    return BrainTree.instance;
  }

  getPhase(): EnginePhase {
    return this.state.phase;
  }

  getState(): BrainTreeState {
    return { ...this.state };
  }

  private cleanups: (() => void)[] = [];

  async assess(workflow: Workflow, context: Record<string, any> = {}): Promise<void> {
    this.cleanups.forEach(fn => fn());
    this.cleanups = [];

    this.state = {
      phase: 'assessing',
      workflowId: workflow.id,
      sessionId: `session_${++this.sessionCounter}_${Date.now()}`,
    };
    this.bus.emit('braintree:assess', { workflow, context });

    this.cleanups.push(
      this.engine.on('workflow:start', () => {
        this.state.phase = 'reasoning';
        this.bus.emit('braintree:reason', { sessionId: this.state.sessionId });
      })
    );

    this.cleanups.push(
      this.engine.on('workflow:node:enter', ({ node }: { node: WorkflowNode }) => {
        this.state.phase = 'deciding';
        this.bus.emit('braintree:decide', { node, sessionId: this.state.sessionId });
      })
    );

    this.cleanups.push(
      this.engine.on('workflow:complete', (output: ClinicalSessionOutput) => {
        this.state.phase = 'complete';
        this.bus.emit('braintree:complete', { output, sessionId: this.state.sessionId });
      })
    );

    this.cleanups.push(
      this.engine.on('workflow:error', ({ message, fromNode }: { message: string; fromNode?: string }) => {
        this.state.phase = 'error';
        this.bus.emit('braintree:error', { message, fromNode, sessionId: this.state.sessionId });
      })
    );

    await this.engine.start(workflow, context);
  }

  setContext(key: string, value: any): void {
    this.engine.setState(key, value);
  }

  getOutput(): ClinicalSessionOutput | null {
    return this.engine.getOutput();
  }

  getWorkflowEngine(): WorkflowEngine {
    return this.engine;
  }

  reset(): void {
    this.cleanups.forEach(fn => fn());
    this.cleanups = [];
    this.engine.reset();
    this.state = { phase: 'idle', workflowId: null, sessionId: null };
    this.bus.clear('braintree:assess');
    this.bus.clear('braintree:reason');
    this.bus.clear('braintree:decide');
    this.bus.clear('braintree:complete');
    this.bus.clear('braintree:error');
  }
}
