import { EventBus } from '../../engine/EventBus';
import { BrainTree } from '../../engine/BrainTree';
import { WorkflowSyncBridge } from './WorkflowSyncBridge';
import { FirebaseEventGateway } from './FirebaseEventGateway';
import type { Workflow, WorkflowNode } from '../../types/engine';

export class BrainTreeSyncService {
  private eventBus: EventBus;
  private brainTree: BrainTree;
  private syncBridge: WorkflowSyncBridge;
  private eventGateway: FirebaseEventGateway;

  constructor(
    eventBus: EventBus,
    brainTree: BrainTree,
    syncBridge: WorkflowSyncBridge,
    eventGateway: FirebaseEventGateway,
  ) {
    this.eventBus = eventBus;
    this.brainTree = brainTree;
    this.syncBridge = syncBridge;
    this.eventGateway = eventGateway;

    this.setupListeners();
  }

  private setupListeners(): void {
    this.eventBus.on('workflow:updated', (data: unknown) => {
      const { workflow } = data as { workflow: Workflow };
      this.syncBridge.syncWorkflow(workflow);
    });

    this.eventBus.on('node:updated', (data: unknown) => {
      const { node } = data as { node: WorkflowNode };
      this.syncBridge.syncNode(node);
    });

    this.eventBus.on('firebase:workflows:modified', (data: unknown) => {
      const event = data as { documentId: string; data: Record<string, unknown> };
      this.syncBridge.handleRemoteUpdate(
        event.documentId,
        {},
        event.data,
      );
    });

    this.eventBus.on('engine:complete', () => {
      const output = this.brainTree.getOutput();
      this.eventBus.emit('sync:brain_tree:output', { output, timestamp: Date.now() });
    });
  }

  startSyncing(): void {
    this.eventGateway.subscribeToCollection('workflows');
    this.eventGateway.subscribeToCollection('workflow_nodes');
    this.eventBus.emit('sync:started', { timestamp: Date.now() });
  }

  stopSyncing(): void {
    this.eventGateway.unsubscribeAll();
    this.eventBus.emit('sync:stopped', { timestamp: Date.now() });
  }
}
