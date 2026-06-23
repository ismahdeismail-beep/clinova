import { memo, useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Settings, Play, Brain, ShieldAlert } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Patient Vitals Review' },
    position: { x: 250, y: 5 },
    className: 'bg-surface-container-high border-2 border-primary text-on-surface font-bold text-xs rounded-xl shadow-lg',
  },
  {
    id: '2',
    data: { label: 'Check BP < 90/60' },
    position: { x: 100, y: 100 },
    className: 'bg-surface-dim border border-outline-variant text-on-surface text-xs rounded-lg'
  },
  {
    id: '3',
    data: { label: 'Check K+ > 5.5' },
    position: { x: 400, y: 100 },
    className: 'bg-surface-dim border border-outline-variant text-on-surface text-xs rounded-lg'
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Sepsis Protocol' },
    position: { x: 100, y: 200 },
    className: 'bg-error-container/20 border-2 border-error text-error font-bold text-xs rounded-lg'
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Hold ACE Inhibitors' },
    position: { x: 400, y: 200 },
    className: 'bg-error-container/20 border-2 border-error text-error font-bold text-xs rounded-lg'
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#00E5FF', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#00E5FF', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', label: 'Yes', labelStyle: { fill: '#bbcac6', fontSize: 10, fontWeight: 'bold' } },
  { id: 'e3-5', source: '3', target: '5', label: 'Yes', labelStyle: { fill: '#bbcac6', fontSize: 10, fontWeight: 'bold' } },
];

function DecisionTreeScreen() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="flex flex-col h-full max-w-[1440px] mx-auto p-4 md:p-6">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 shrink-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-1 tracking-tight">Decision Tree</h2>
          <p className="text-sm text-[#64748B] max-w-xl">
            Visual workflow runner and logic builder. AI assists in traversing the graph while adhering to strict deterministic safety rules.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium border border-[#E2E8F0] hover:border-[#2563EB] transition-colors text-[#475569]">
            <Settings size={16} /> Configure
          </button>
          <button className="flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#1D4ED8] transition-colors">
            <Play size={16} /> Execute
          </button>
        </div>
      </header>

      {/* Main Graph Viewer */}
      <section className="flex-1 bg-white border border-[#E2E8F0] rounded-xl overflow-hidden relative flex min-h-0">
        {/* Left Side: Graph Engine */}
        <div className="flex-1 relative bg-[#F8FAFC]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="cyan-glow"
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#CBD5E1" />
            <Controls className="bg-white border-[#E2E8F0]" />
          </ReactFlow>
        </div>

        {/* Right Side: Workflow Orchestrator Context */}
        <div className="w-72 h-full border-l border-[#E2E8F0] bg-[#F8FAFC] flex flex-col hidden lg:flex shrink-0">
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Execution Context</span>
            <span className="px-2 py-0.5 bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold uppercase rounded border border-[#2563EB]/20">Active</span>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-6">
            
            <div className="space-y-2">
              <span className="text-[10px] text-[#2563EB] uppercase font-bold tracking-widest flex items-center gap-2">
                <Brain size={12} /> Local State
              </span>
              <div className="p-3 bg-[#F1F5F9] border border-[#E2E8F0] rounded text-xs font-mono text-[#64748B] flex flex-col gap-1">
                <div className="flex justify-between"><span>patient.BP</span> <span className="text-[#DC2626]">88/50</span></div>
                <div className="flex justify-between"><span>patient.K</span> <span className="text-[#0F172A]">4.2</span></div>
                <div className="flex justify-between"><span>patient.EF</span> <span className="text-[#0F172A]">55</span></div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-[#DC2626] uppercase font-bold tracking-widest flex items-center gap-2">
                <ShieldAlert size={12} /> Active Safety Rules
              </span>
              <div className="space-y-2">
                <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded">
                  <p className="text-[11px] font-mono text-[#DC2626] font-bold mb-1">RULE_BP_001</p>
                  <p className="text-[10px] text-[#64748B] leading-relaxed">
                    If <span className="text-[#0F172A]">BP {'<'} 90/60</span>, system MUST detour to Sepsis Protocol node and restrict ACE inhibitors.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-[#2563EB] uppercase font-bold tracking-widest">Orchestrator Output</span>
              <div className="p-3 bg-white border border-[#2563EB]/30 rounded relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB]"></div>
                <p className="text-xs text-[#0F172A] leading-relaxed">
                  "Evaluated Vitals Review Node. Detected BP of 88/50 matching clinical safety rule <span className="font-mono text-[#DC2626]">RULE_BP_001</span>. Forcing trajectory to Sepsis Protocol. AI overrides disabled for this path."
                </p>
              </div>
            </div>

          </div>
        </div>
        </section>

      </div>
    );
  }
  
export default memo(DecisionTreeScreen);
