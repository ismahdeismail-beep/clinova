import { motion } from 'motion/react';
import type { GraphNode } from '../../engine/NavigationGraph';

interface RouteHealthPanelProps {
  nodes: GraphNode[];
  activeView: string;
  reachable: string[];
}

export function RouteHealthPanel({ nodes, activeView, reachable }: RouteHealthPanelProps) {
  const totalNodes = nodes.length;
  const reachableCount = reachable.length;
  const unreachableCount = totalNodes - reachableCount;
  const healthPercent = totalNodes > 0 ? Math.round((reachableCount / totalNodes) * 100) : 0;

  const healthColor = healthPercent >= 90 ? '#34D399' : healthPercent >= 70 ? '#F59E0B' : '#EF4444';

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold text-white">{healthPercent}%</div>
        <div className="text-xs text-[#6B7280]">Route Health</div>
      </div>

      <div className="w-full bg-[#1E1E28] rounded-full h-2">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: healthColor }}
          initial={{ width: 0 }}
          animate={{ width: `${healthPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-[#1E1E28] p-2 rounded">
          <div className="text-[#34D399] font-bold">{reachableCount}</div>
          <div className="text-[#6B7280]">Reachable</div>
        </div>
        <div className="bg-[#1E1E28] p-2 rounded">
          <div className="text-[#EF4444] font-bold">{unreachableCount}</div>
          <div className="text-[#6B7280]">Unreachable</div>
        </div>
      </div>

      <div className="border-t border-[#1E1E28] pt-3 space-y-1">
        <div className="text-xs text-[#6B7280] mb-1">Node Status</div>
        {nodes.map((node) => {
          const isActive = node.view === activeView;
          const isReachable = reachable.includes(node.view);
          let color = '#6B7280';
          let label = 'Unreachable';
          if (isActive) { color = '#00E5FF'; label = 'Active'; }
          else if (isReachable) { color = '#34D399'; label = 'Healthy'; }

          return (
            <div key={node.view} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[#A0A0B0] text-xs">{node.label}</span>
              <span className="ml-auto text-[#6B7280] text-xs">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
