import { useMemo } from 'react';
import { motion } from 'motion/react';
import type { Workflow, WorkflowNode } from '../../types/engine';
import type { WorkflowHealth } from '../../core/selfHealing/WorkflowHealthService';

interface WorkflowVisualizerProps {
  workflow: Workflow | null;
  nodes: WorkflowNode[];
  health: WorkflowHealth | null;
}

export function WorkflowVisualizer({ workflow, nodes, health }: WorkflowVisualizerProps) {
  const groupedNodes = useMemo(() => {
    if (!nodes.length) return [];
    const entry = nodes.find(n => n.id === workflow?.entryNode);
    const decision = nodes.filter(n => n.type === 'decision');
    const calculation = nodes.filter(n => n.type === 'calculation');
    const output = nodes.filter(n => n.type === 'output');
    const input = nodes.filter(n => n.type === 'input');

    return [
      { label: 'Entry', nodes: entry ? [entry] : [], color: '#00E5FF' },
      { label: 'Input', nodes, color: '#34D399' },
      { label: 'Decision', nodes: decision, color: '#F59E0B' },
      { label: 'Calculation', nodes: calculation, color: '#8B5CF6' },
      { label: 'Output', nodes: output, color: '#EC4899' },
    ];
  }, [workflow, nodes]);

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-full text-[#6B7280] text-sm">
        No workflow selected
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">{workflow.name}</h3>
          <span className="text-[#6B7280] text-xs">{workflow.type}</span>
        </div>
        {health && (
          <div className={`px-2 py-1 rounded text-xs font-bold ${
            health.score >= 80 ? 'bg-[#34D399]/20 text-[#34D399]' :
            health.score >= 50 ? 'bg-[#F59E0B]/20 text-[#F59E0B]' :
            'bg-[#EF4444]/20 text-[#EF4444]'
          }`}>
            {health.score}%
          </div>
        )}
      </div>

      <div className="space-y-3">
        {groupedNodes.map((group, gi) => {
          if (group.nodes.length === 0) return null;
          return (
            <div key={gi}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
                <span className="text-[#6B7280] text-xs">{group.label} ({group.nodes.length})</span>
              </div>
              <div className="flex flex-wrap gap-1 ml-4">
                {group.nodes.map((node, ni) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: ni * 0.05 }}
                    className="px-2 py-1 bg-[#1E1E28] rounded text-xs text-[#A0A0B0] border border-[#2D2D35]"
                    title={`Type: ${node.type}, Logic: ${node.logic || 'none'}`}
                  >
                    {node.prompt?.substring(0, 20) || node.id}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {health && (
        <div className="border-t border-[#1E1E28] pt-3 space-y-1">
          <div className="text-xs text-[#6B7280]">Warnings ({health.warnings.length})</div>
          {health.warnings.slice(0, 3).map((w, i) => (
            <div key={i} className="text-xs text-[#F59E0B] flex items-center gap-1">
              <span>⚠</span> {w}
            </div>
          ))}
          {health.errors.length > 0 && (
            <>
              <div className="text-xs text-[#6B7280] mt-2">Errors ({health.errors.length})</div>
              {health.errors.slice(0, 3).map((e, i) => (
                <div key={i} className="text-xs text-[#EF4444] flex items-center gap-1">
                  <span>✕</span> {e}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
