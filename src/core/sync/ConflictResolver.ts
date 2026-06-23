export interface ConflictEvent {
  collection: string;
  documentId: string;
  localVersion: number;
  remoteVersion: number;
  localData: Record<string, unknown>;
  remoteData: Record<string, unknown>;
  timestamp: number;
}

export interface ResolvedConflict {
  event: ConflictEvent;
  resolution: 'local_wins' | 'remote_wins' | 'merged';
  mergedData: Record<string, unknown>;
  timestamp: number;
}

export class ConflictResolver {
  private conflictLog: ResolvedConflict[] = [];
  private mergeStrategies: Map<string, (local: Record<string, unknown>, remote: Record<string, unknown>) => Record<string, unknown>> = new Map();

  constructor() {
    this.registerDefaultStrategies();
  }

  resolve(event: ConflictEvent): ResolvedConflict {
    const strategy = this.mergeStrategies.get(event.collection) || this.defaultMerge;
    const mergedData = strategy(event.localData, event.remoteData);

    const hasLocalChanges = JSON.stringify(event.localData) !== JSON.stringify(mergedData);
    const hasRemoteChanges = JSON.stringify(event.remoteData) !== JSON.stringify(mergedData);

    let resolution: 'local_wins' | 'remote_wins' | 'merged';
    if (hasLocalChanges && !hasRemoteChanges) {
      resolution = 'remote_wins';
    } else if (!hasLocalChanges && hasRemoteChanges) {
      resolution = 'local_wins';
    } else {
      resolution = 'merged';
    }

    const resolved: ResolvedConflict = {
      event,
      resolution,
      mergedData,
      timestamp: Date.now(),
    };

    this.conflictLog.push(resolved);
    return resolved;
  }

  registerStrategy(collection: string, strategy: (local: Record<string, unknown>, remote: Record<string, unknown>) => Record<string, unknown>): void {
    this.mergeStrategies.set(collection, strategy);
  }

  getConflictLog(): ResolvedConflict[] {
    return [...this.conflictLog];
  }

  getRecentConflicts(count: number): ResolvedConflict[] {
    return this.conflictLog.slice(-count);
  }

  clearLog(): void {
    this.conflictLog = [];
  }

  private registerDefaultStrategies(): void {
    this.mergeStrategies.set('workflows', this.workflowMerge);
    this.mergeStrategies.set('workflow_nodes', this.nodeMerge);
    this.mergeStrategies.set('rules', this.timestampMerge);
  }

  private defaultMerge(local: Record<string, unknown>, remote: Record<string, unknown>): Record<string, unknown> {
    return { ...local, ...remote, _merged: true, _mergedAt: Date.now() };
  }

  private workflowMerge(local: Record<string, unknown>, remote: Record<string, unknown>): Record<string, unknown> {
    const localTs = (local.updatedAt as number) || 0;
    const remoteTs = (remote.updatedAt as number) || 0;
    return localTs >= remoteTs ? { ...remote, ...local } : { ...local, ...remote };
  }

  private nodeMerge(local: Record<string, unknown>, remote: Record<string, unknown>): Record<string, unknown> {
    return { ...local, ...remote, position: local.position || remote.position };
  }

  private timestampMerge(local: Record<string, unknown>, remote: Record<string, unknown>): Record<string, unknown> {
    const localTs = (local.updatedAt as number) || 0;
    const remoteTs = (remote.updatedAt as number) || 0;
    return localTs >= remoteTs ? local : remote;
  }
}
