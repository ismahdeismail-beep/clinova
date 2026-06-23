import { EventBus } from '../engine/EventBus';

export type WorkflowPhase = 'intake' | 'assessment' | 'analysis' | 'decision' | 'review' | 'complete';
export type WorkflowStatus = 'idle' | 'active' | 'paused' | 'error' | 'done';

export interface WorkflowState {
  phase: WorkflowPhase;
  status: WorkflowStatus;
  currentStep: string;
  history: Array<{ phase: WorkflowPhase; step: string; timestamp: number; data?: unknown }>;
  data: Record<string, unknown>;
  errors: string[];
}

const PHASE_ORDER: WorkflowPhase[] = ['intake', 'assessment', 'analysis', 'decision', 'review', 'complete'];

export class WorkflowEngineCore {
  private static instance: WorkflowEngineCore;
  private bus = EventBus.getInstance();
  private state: WorkflowState = {
    phase: 'intake',
    status: 'idle',
    currentStep: 'start',
    history: [],
    data: {},
    errors: [],
  };

  static getInstance(): WorkflowEngineCore {
    if (!WorkflowEngineCore.instance) {
      WorkflowEngineCore.instance = new WorkflowEngineCore();
    }
    return WorkflowEngineCore.instance;
  }

  getState(): WorkflowState {
    return { ...this.state, history: [...this.state.history] };
  }

  start(context?: Record<string, unknown>): void {
    this.state = {
      phase: 'intake',
      status: 'active',
      currentStep: 'patient-intake',
      history: [{ phase: 'intake', step: 'start', timestamp: Date.now(), data: context }],
      data: { ...context },
      errors: [],
    };
    this.bus.emit('workflow:start', this.state);
  }

  transition(phase: WorkflowPhase, step: string, data?: Record<string, unknown>): boolean {
    const currentIdx = PHASE_ORDER.indexOf(this.state.phase);
    const targetIdx = PHASE_ORDER.indexOf(phase);

    if (targetIdx < currentIdx) {
      this.state.errors.push(`Cannot transition back from ${this.state.phase} to ${phase}`);
      this.bus.emit('workflow:error', { message: `Invalid transition: ${this.state.phase} -> ${phase}` });
      return false;
    }

    this.state.phase = phase;
    this.state.currentStep = step;
    this.state.history.push({ phase, step, timestamp: Date.now(), data });
    if (data) {
      this.state.data = { ...this.state.data, ...data };
    }

    if (phase === 'complete') {
      this.state.status = 'done';
    }

    this.bus.emit('workflow:transition', { phase, step });
    return true;
  }

  pause(): void {
    this.state.status = 'paused';
    this.bus.emit('workflow:paused', { phase: this.state.phase, step: this.state.currentStep });
  }

  resume(): void {
    if (this.state.status === 'paused') {
      this.state.status = 'active';
      this.bus.emit('workflow:resumed', { phase: this.state.phase, step: this.state.currentStep });
    }
  }

  reset(): void {
    this.state = {
      phase: 'intake',
      status: 'idle',
      currentStep: 'start',
      history: [],
      data: {},
      errors: [],
    };
    this.bus.emit('workflow:reset');
  }

  getNextPhase(): WorkflowPhase | null {
    const idx = PHASE_ORDER.indexOf(this.state.phase);
    return idx >= 0 && idx < PHASE_ORDER.length - 1 ? PHASE_ORDER[idx + 1] : null;
  }

  getProgress(): number {
    const idx = PHASE_ORDER.indexOf(this.state.phase);
    return idx >= 0 ? Math.round((idx / (PHASE_ORDER.length - 1)) * 100) : 0;
  }
}
