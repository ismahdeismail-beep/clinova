import { EventBus } from '../engine/EventBus';

export type OverlayPriority = 'critical' | 'high' | 'normal' | 'low';
export type OverlayType = 'modal' | 'loading' | 'toast' | 'drawer' | 'confirm';

export interface OverlayInstance {
  id: string;
  type: OverlayType;
  priority: OverlayPriority;
  component: string;
  props: Record<string, unknown>;
  blocking: boolean;
  timestamp: number;
  dismissible: boolean;
  autoDismissMs: number | null;
}

const PRIORITY_ORDER: Record<OverlayPriority, number> = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3,
};

let counter = 0;

export class OverlayManager {
  private static instance: OverlayManager;
  private stack: OverlayInstance[] = [];
  private bus = EventBus.getInstance();
  private listeners = new Set<(stack: OverlayInstance[]) => void>();

  static getInstance(): OverlayManager {
    if (!OverlayManager.instance) {
      OverlayManager.instance = new OverlayManager();
    }
    return OverlayManager.instance;
  }

  getStack(): OverlayInstance[] {
    return [...this.stack];
  }

  getTop(): OverlayInstance | null {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }

  show(params: Omit<OverlayInstance, 'id' | 'timestamp'>): string {
    const id = `overlay-${++counter}`;
    const instance: OverlayInstance = {
      ...params,
      id,
      timestamp: Date.now(),
    };

    this.stack.push(instance);
    this.sortStack();
    this.notify();
    this.bus.emit('overlay:shown', { id, type: params.type });

    if (params.autoDismissMs && params.autoDismissMs > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, params.autoDismissMs);
    }

    return id;
  }

  dismiss(id: string): void {
    const idx = this.stack.findIndex((o) => o.id === id);
    if (idx === -1) return;
    const removed = this.stack.splice(idx, 1)[0];
    this.notify();
    this.bus.emit('overlay:dismissed', { id, type: removed.type });
  }

  dismissByType(type: OverlayType): void {
    const ids = this.stack.filter((o) => o.type === type).map((o) => o.id);
    ids.forEach((id) => this.dismiss(id));
  }

  dismissStale(maxAgeMs: number): void {
    const now = Date.now();
    const stale = this.stack.filter((o) => now - o.timestamp > maxAgeMs);
    stale.forEach((o) => this.dismiss(o.id));
  }

  dismissAll(): void {
    const ids = this.stack.map((o) => o.id);
    ids.forEach((id) => this.dismiss(id));
  }

  hasBlocking(): boolean {
    return this.stack.some((o) => o.blocking);
  }

  getVisible(): OverlayInstance[] {
    if (this.stack.length === 0) return [];
    const topPriority = this.stack[this.stack.length - 1].priority;
    return this.stack.filter((o) => o.priority === topPriority);
  }

  onChange(cb: (stack: OverlayInstance[]) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private sortStack(): void {
    this.stack.sort(
      (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
    );
  }

  private notify(): void {
    this.listeners.forEach((cb) => cb([...this.stack]));
  }
}
