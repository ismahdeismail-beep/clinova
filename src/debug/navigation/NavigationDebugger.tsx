import { useState, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import { NavigationGraph, type GraphNode } from '../../engine/NavigationGraph';
import { BrainRouter } from '../../engine/BrainRouter';
import { EventBus } from '../../engine/EventBus';
import { useClinicalStore } from '../../store/clinicalStore';
import { GraphRenderer } from './GraphRenderer';
import { NodeInspector } from './NodeInspector';
import { RouteHealthPanel } from './RouteHealthPanel';
import { WorkflowVisualizer } from './WorkflowVisualizer';
import { EventFlowViewer } from './EventFlowViewer';

type DebugMode = 'route' | 'workflow' | 'event';

interface NavigationDebuggerProps {
  navigationGraph: NavigationGraph;
  brainRouter: BrainRouter;
  eventBus: EventBus;
}

export function NavigationDebugger({ navigationGraph, brainRouter, eventBus }: NavigationDebuggerProps) {
  const [mode, setMode] = useState<DebugMode>('route');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [showDebugger, setShowDebugger] = useState(false);
  const activeView = useClinicalStore(s => s.view);
  const workflows = useClinicalStore(s => s.workflows);
  const currentNodes = useClinicalStore(s => s.currentNodes);

  const nodes = useMemo(() => navigationGraph.getAccessible(), [navigationGraph]);

  const reachable = useMemo(() => {
    const r: string[] = [];
    for (const node of nodes) {
      if (navigationGraph.isReachable(activeView, node.view)) {
        r.push(node.view);
      }
    }
    return r;
  }, [nodes, activeView, navigationGraph]);

  const shortestPaths = useMemo(() => {
    const paths = new Map<string, string[]>();
    for (const node of nodes) {
      const path = navigationGraph.shortestPath(activeView, node.view);
      if (path) paths.set(node.view, path);
    }
    return paths;
  }, [nodes, activeView, navigationGraph]);

  const workflowHealth = useMemo(() => {
    if (!workflows.length) return null;
    return null;
  }, [workflows]);

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node);
    brainRouter.navigate(node.view);
  }, [brainRouter]);

  if (!showDebugger) {
    return (
      <button
        onClick={() => setShowDebugger(true)}
        className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-[#1E1E28] border border-[#2D2D35] rounded-lg text-xs text-[#00E5FF] hover:bg-[#2D2D35] transition-colors shadow-lg"
      >
        🧭 Debug
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0E10]/90 backdrop-blur-sm">
      <div className="flex h-full">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-[#1E1E28] bg-[#0E0E10]">
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-sm">Navigation Debugger</h2>
              <div className="flex gap-1">
                {(['route', 'workflow', 'event'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-2 py-1 text-xs rounded ${
                      mode === m
                        ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30'
                        : 'bg-[#1E1E28] text-[#6B7280] border border-[#2D2D35]'
                    }`}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowDebugger(false)}
              className="px-3 py-1 bg-[#EF4444]/20 text-[#EF4444] text-xs rounded hover:bg-[#EF4444]/30"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {mode === 'route' && (
              <div className="flex h-full">
                <div className="flex-1 p-4">
                  <GraphRenderer
                    nodes={nodes}
                    activeView={activeView}
                    shortestPaths={shortestPaths}
                  />
                </div>
                <div className="w-72 border-l border-[#1E1E28] overflow-y-auto">
                  <RouteHealthPanel nodes={nodes} activeView={activeView} reachable={reachable} />
                </div>
              </div>
            )}

            {mode === 'workflow' && (
              <div className="flex h-full">
                <div className="flex-1 overflow-y-auto">
                  {workflows.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-[#6B7280] text-sm">
                      No workflows loaded
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 p-4">
                      {workflows.map(w => (
                        <div key={w.id} className="bg-[#0E0E10] border border-[#1E1E28] rounded-lg">
                          <WorkflowVisualizer
                            workflow={w}
                            nodes={currentNodes}
                            health={workflowHealth}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {mode === 'event' && (
              <EventFlowViewer eventBus={eventBus} />
            )}
          </div>
        </div>

        {selectedNode && (
          <div className="w-64 border-l border-[#1E1E28] bg-[#0E0E10]">
            <NodeInspector node={selectedNode} />
          </div>
        )}
      </div>
    </div>
  );
}
