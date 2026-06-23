type EventHandler = (...args: any[]) => void;

export class EventBus {
  private static instance: EventBus;
  private listeners = new Map<string, Set<EventHandler>>();
  private wildcardListeners = new Set<EventHandler>();

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  on(event: string, handler: EventHandler): () => void {
    if (event === '*') {
      this.wildcardListeners.add(handler);
      return () => { this.wildcardListeners.delete(handler); };
    }
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);

    return () => {
      this.listeners.get(event)?.delete(handler);
      if (this.listeners.get(event)?.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  emit(event: string, ...args: any[]): void {
    this.listeners.get(event)?.forEach((handler) => {
      try {
        handler(...args);
      } catch (err) {
        console.error(`[EventBus] Error in handler for "${event}":`, err);
      }
    });
    this.wildcardListeners.forEach((handler) => {
      try {
        handler(args, event);
      } catch (err) {
        console.error(`[EventBus] Error in wildcard handler for "${event}":`, err);
      }
    });
  }

  once(event: string, handler: EventHandler): () => void {
    const wrapper = (...args: any[]) => {
      handler(...args);
      remove();
    };
    const remove = this.on(event, wrapper);
    return remove;
  }

  off(event: string, handler: EventHandler): void {
    if (event === '*') {
      this.wildcardListeners.delete(handler);
      return;
    }
    this.listeners.get(event)?.delete(handler);
  }

  clear(event?: string): void {
    if (event) {
      if (event === '*') {
        this.wildcardListeners.clear();
      } else {
        this.listeners.delete(event);
      }
    } else {
      this.listeners.clear();
      this.wildcardListeners.clear();
    }
  }

  listenerCount(event: string): number {
    if (event === '*') return this.wildcardListeners.size;
    return this.listeners.get(event)?.size ?? 0;
  }
}
