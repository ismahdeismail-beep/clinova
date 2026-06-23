import { motion } from 'motion/react';
import type { GraphNode } from '../../engine/NavigationGraph';

interface NodeInspectorProps {
  node: GraphNode | null;
}

export function NodeInspector({ node }: NodeInspectorProps) {
  if (!node) {
    return (
      <div className="p-4 text-[#6B7280] text-sm">
        Select a node to inspect
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: node.core ? '#00E5FF' : '#34D399' }}
        />
        <span className="text-white font-semibold">{node.label}</span>
      </div>

      <div className="border-t border-[#1E1E28] pt-2 space-y-2">
        <InfoRow label="View" value={node.view} />
        <InfoRow label="Core" value={node.core ? 'Yes' : 'No'} />
        <InfoRow
          label="Roles"
          value={node.roles?.join(', ') || 'All'}
        />
        <InfoRow
          label="Edges"
          value={node.edges?.length ? `${node.edges.length} connections` : 'None'}
        />
      </div>

      {node.edges.length > 0 && (
        <div className="border-t border-[#1E1E28] pt-2">
          <div className="text-[#6B7280] text-xs mb-1">Connections:</div>
          <div className="flex flex-wrap gap-1">
            {node.edges.map((edge, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-[#1E1E28] text-[#A0A0B0] text-xs rounded"
              >
                {edge}
              </span>
            ))}
          </div>
        </div>
      )}

      {node.position && (
        <div className="border-t border-[#1E1E28] pt-2">
          <InfoRow label="Position" value={`(${node.position.x}, ${node.position.y})`} />
        </div>
      )}
    </motion.div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#6B7280] text-xs">{label}</span>
      <span className="text-[#A0A0B0] text-xs">{value}</span>
    </div>
  );
}
