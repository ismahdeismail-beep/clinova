import type { ViewState, UserRole } from '../types';

export interface GraphNode {
  view: ViewState;
  edges: ViewState[];
  label: string;
  roles?: UserRole[];
  core: boolean;
  position?: { x: number; y: number };
}

const GRAPH_DEFINITION: GraphNode[] = [
  { view: 'dashboard', edges: ['tree', 'study', 'pharma', 'case', 'settings'], label: 'Clinova Canvas', core: true },
  { view: 'tree', edges: ['dashboard', 'pharma'], label: 'Clinova Decision Tree', core: true },
  { view: 'study', edges: ['dashboard', 'pharma'], label: 'Clinova Knowledge Engine', core: true },
  { view: 'pharma', edges: ['dashboard', 'study', 'case'], label: 'Clinova Reasoning Engine', core: true },
  { view: 'case', edges: ['dashboard', 'pharma'], label: 'Clinova Risk Simulator', core: true },
  { view: 'settings', edges: ['dashboard'], label: 'Settings', core: false },
  { view: 'admin', edges: ['dashboard'], label: 'Governance Console', roles: ['admin'], core: false },
];

const VIEW_POSITIONS: Record<string, { x: number; y: number }> = {
  dashboard: { x: 400, y: 50 },
  tree: { x: 100, y: 150 },
  study: { x: 400, y: 150 },
  pharma: { x: 700, y: 150 },
  case: { x: 100, y: 280 },
  settings: { x: 400, y: 280 },
  admin: { x: 700, y: 280 },
  login: { x: 400, y: 400 },
};

GRAPH_DEFINITION.forEach(n => {
  n.position = VIEW_POSITIONS[n.view];
});

const nodeMap = new Map<ViewState, GraphNode>(GRAPH_DEFINITION.map((n) => [n.view, n]));

export class NavigationGraph {
  private static instance: NavigationGraph;

  static getInstance(): NavigationGraph {
    if (!NavigationGraph.instance) {
      NavigationGraph.instance = new NavigationGraph();
    }
    return NavigationGraph.instance;
  }

  getNode(view: ViewState): GraphNode | undefined {
    return nodeMap.get(view);
  }

  getAccessible(role?: UserRole): GraphNode[] {
    return GRAPH_DEFINITION.filter((n) => {
      if (!n.roles) return true;
      return role && n.roles.includes(role);
    });
  }

  getRelated(view: ViewState, role?: UserRole): GraphNode[] {
    const node = nodeMap.get(view);
    if (!node) return [];
    return node.edges
      .map((e) => nodeMap.get(e))
      .filter((n): n is GraphNode => {
        if (!n) return false;
        if (n.roles && (!role || !n.roles.includes(role))) return false;
        return true;
      });
  }

  shortestPath(from: ViewState, to: ViewState, role?: UserRole): ViewState[] {
    const accessible = new Set(this.getAccessible(role).map((n) => n.view));
    if (!accessible.has(from) || !accessible.has(to)) return [];

    const visited = new Set<ViewState>();
    const queue: { view: ViewState; path: ViewState[] }[] = [{ view: from, path: [from] }];
    visited.add(from);

    while (queue.length > 0) {
      const { view, path } = queue.shift()!;
      if (view === to) return path;

      const node = nodeMap.get(view);
      if (!node) continue;

      for (const edge of node.edges) {
        if (!accessible.has(edge) || visited.has(edge)) continue;
        visited.add(edge);
        queue.push({ view: edge, path: [...path, edge] });
      }
    }
    return [];
  }

  isReachable(from: ViewState, to: ViewState, role?: UserRole): boolean {
    return this.shortestPath(from, to, role).length > 0;
  }
}
