import { useMemo } from 'react';
import { motion } from 'motion/react';
import { NavigationGraph, type GraphNode } from '../../engine/NavigationGraph';

interface GraphRendererProps {
  nodes: GraphNode[];
  activeView: string;
  shortestPaths: Map<string, string[]>;
}

export function GraphRenderer({ nodes, activeView, shortestPaths }: GraphRendererProps) {
  const connections = useMemo(() => {
    const conns: { from: string; to: string }[] = [];
    for (const node of nodes) {
      for (const edge of node.edges) {
        conns.push({ from: node.view, to: edge });
      }
    }
    return conns;
  }, [nodes]);

  return (
    <div className="relative w-full h-full overflow-auto">
      <svg className="w-full h-full" style={{ minWidth: 800, minHeight: 600 }}>
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.view === conn.from);
          const to = nodes.find(n => n.view === conn.to);
          if (!from || !to) return null;

          const path = shortestPaths.get(conn.from);
          const isActive = path?.includes(conn.to);

          return (
            <line
              key={i}
              x1={from.position?.x || 0}
              y1={from.position?.y || 0}
              x2={to.position?.x || 0}
              y2={to.position?.y || 0}
              stroke={isActive ? '#00E5FF' : '#2D2D35'}
              strokeWidth={isActive ? 2 : 1}
              strokeDasharray={isActive ? 'none' : '4 4'}
              className="transition-all duration-300"
            />
          );
        })}

        {nodes.map((node, i) => {
          const isActive = node.view === activeView;
          const positions = [
            { x: 100, y: i * 80 + 40 },
            { x: 350, y: i * 60 + 30 },
            { x: 600, y: i * 70 + 50 },
          ];
          const pos = node.position || positions[i % positions.length];
          const hasPath = shortestPaths.has(node.view);
          const nodeColor = isActive ? '#00E5FF' : hasPath ? '#34D399' : '#2D2D35';

          return (
            <g key={node.view}>
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={24}
                fill={nodeColor}
                opacity={isActive ? 1 : 0.6}
                animate={{ r: isActive ? 28 : 24 }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={10}
                fontWeight="bold"
              >
                {node.label.charAt(0)}
              </text>
              <text
                x={pos.x}
                y={pos.y + 40}
                textAnchor="middle"
                fill={isActive ? '#00E5FF' : '#A0A0B0'}
                fontSize={10}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
