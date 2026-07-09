export type OverlayPriority = 'normal' | 'critical';
export type OverlayType = 'loading' | 'modal' | 'toast' | 'confirm' | 'drawer';

export interface OverlayInstance {
  id: string;
  type: OverlayType;
  priority?: OverlayPriority;
  dismissible?: boolean;
  props?: Record<string, any>;
}

export class OverlayManager {
  private static instance: OverlayManager;
  private stack: OverlayInstance[] = [];
  private listeners: ((stack: OverlayInstance[]) => void)[] = [];

  static getInstance(): OverlayManager {
    if (!OverlayManager.instance) {
      OverlayManager.instance = new OverlayManager();
    }
    return OverlayManager.instance;
  }

  onChange(listener: (stack: OverlayInstance[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  show(overlay: OverlayInstance) {
    this.stack.push(overlay);
    this.notify();
  }

  dismiss(id: string) {
    this.stack = this.stack.filter(o => o.id !== id);
    this.notify();
  }

  private notify() {
    this.listeners.forEach(l => l(this.stack));
  }
}
