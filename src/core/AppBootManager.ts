import { EventBus } from '../engine/EventBus';

export type BootPhase = 'initializing' | 'configuring' | 'connecting' | 'ready' | 'error';
export type BootService = 'firebase' | 'sync' | 'storage' | 'workflow';

interface BootTask {
  name: BootService;
  timeout: number;
  critical: boolean;
}

const BOOT_TIMEOUT = 15000;

const BOOT_SEQUENCE: BootTask[] = [
  { name: 'firebase', timeout: 8000, critical: true },
  { name: 'storage', timeout: 5000, critical: false },
  { name: 'sync', timeout: 5000, critical: false },
  { name: 'workflow', timeout: 5000, critical: false },
];

export class AppBootManager {
  private static instance: AppBootManager;
  private bus = EventBus.getInstance();
  private phase: BootPhase = 'initializing';
  private completed = new Set<BootService>();
  private failed = new Set<BootService>();
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private error: string | null = null;

  static getInstance(): AppBootManager {
    if (!AppBootManager.instance) {
      AppBootManager.instance = new AppBootManager();
    }
    return AppBootManager.instance;
  }

  getPhase(): BootPhase {
    return this.phase;
  }

  getError(): string | null {
    return this.error;
  }

  isServiceComplete(name: BootService): boolean {
    return this.completed.has(name);
  }

  isServiceFailed(name: BootService): boolean {
    return this.failed.has(name);
  }

  markComplete(name: BootService): void {
    this.completed.add(name);
    this.bus.emit('boot:service:complete', { name });
    this.checkAllComplete();
  }

  markFailed(name: BootService, err: string): void {
    this.failed.add(name);
    this.error = err;
    this.bus.emit('boot:service:failed', { name, error: err });

    const task = BOOT_SEQUENCE.find((t) => t.name === name);
    if (task?.critical) {
      this.phase = 'error';
      this.bus.emit('boot:failed', { name, error: err });
    }
  }

  private checkAllComplete(): void {
    const allDone = BOOT_SEQUENCE.every(
      (t) => this.completed.has(t.name) || this.failed.has(t.name),
    );
    if (allDone && this.phase !== 'error') {
      this.phase = 'ready';
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.bus.emit('boot:ready', { timestamp: Date.now() });
    }
  }

  start(): void {
    this.phase = 'configuring';
    this.bus.emit('boot:start', { timestamp: Date.now() });

    this.timeoutId = setTimeout(() => {
      if (this.phase !== 'ready' && this.phase !== 'error') {
        const pending = BOOT_SEQUENCE.filter(
          (t) => !this.completed.has(t.name) && !this.failed.has(t.name),
        );
        const criticalPending = pending.filter((t) => t.critical);

        if (criticalPending.length > 0) {
          this.phase = 'error';
          this.error = `Boot timeout: ${criticalPending.map((t) => t.name).join(', ')}`;
          this.bus.emit('boot:failed', {
            error: this.error,
            pending: criticalPending.map((t) => t.name),
          });
        } else {
          this.phase = 'ready';
          this.bus.emit('boot:ready', { degraded: true, pending: pending.map((t) => t.name) });
        }
      }
    }, BOOT_TIMEOUT);
  }

  reset(): void {
    this.phase = 'initializing';
    this.completed.clear();
    this.failed.clear();
    this.error = null;
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}
