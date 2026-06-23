import type { ViewState, UserRole } from '../types';
import { EventBus } from '../engine/EventBus';

interface RouteNode {
  view: ViewState;
  label: string;
  icon?: string;
  roles?: UserRole[];
  parent?: ViewState;
  children: ViewState[];
  orphan: boolean;
}

function getDefaultChildren(view: ViewState): ViewState[] {
  const map: Partial<Record<ViewState, ViewState[]>> = {
    dashboard: ['patients', 'study', 'pharma'],
    patients: ['new-case'],
    study: ['knowledge-base'],
    pharma: ['pharmacotherapy', 'drug-index', 'tree'],
    tree: [],
    'new-case': [],
    pharmacotherapy: [],
    'drug-index': [],
    'knowledge-base': [],
    case: [],
    settings: [],
    login: [],
    admin: [],
  };
  return map[view] ?? [];
}

function getRouteLabel(view: ViewState): string {
  const labels: Partial<Record<ViewState, string>> = {
    dashboard: 'Dashboard',
    patients: 'Patients',
    'new-case': 'New Case',
    study: 'Knowledge Engine',
    pharma: 'Reasoning Engine',
    tree: 'Decision Tree',
    pharmacotherapy: 'Pharmacotherapy',
    'drug-index': 'Drug Index',
    'knowledge-base': 'Knowledge Base',
    case: 'Risk Simulator',
    settings: 'Settings',
    admin: 'Admin',
  };
  return labels[view] ?? view;
}

function getRouteIcon(view: ViewState): string | undefined {
  const icons: Partial<Record<ViewState, string>> = {
    dashboard: 'LayoutDashboard',
    patients: 'Users',
    'new-case': 'FilePlus',
    study: 'BookOpen',
    pharma: 'Pill',
    tree: 'GitBranch',
    pharmacotherapy: 'ClipboardList',
    'drug-index': 'BookMarked',
    'knowledge-base': 'Library',
    case: 'FlaskConical',
    settings: 'Settings',
    admin: 'Shield',
  };
  return icons[view];
}

const KNOWN_VIEWS: ViewState[] = [
  'login', 'dashboard', 'tree', 'study', 'pharma', 'case',
  'settings', 'patients', 'new-case', 'pharmacotherapy',
  'drug-index', 'knowledge-base', 'admin',
];

export class NavigationGuard {
  private static instance: NavigationGuard;
  private graph = new Map<ViewState, RouteNode>();
  private bus = EventBus.getInstance();

  static getInstance(): NavigationGuard {
    if (!NavigationGuard.instance) {
      NavigationGuard.instance = new NavigationGuard();
      NavigationGuard.instance.buildGraph();
    }
    return NavigationGuard.instance;
  }

  private buildGraph(): void {
    for (const view of KNOWN_VIEWS) {
      const children = getDefaultChildren(view);
      const node: RouteNode = {
        view,
        label: getRouteLabel(view),
        icon: getRouteIcon(view),
        children,
        orphan: false,
      };
      this.graph.set(view, node);
    }

    for (const [, node] of this.graph) {
      for (const child of node.children) {
        const childNode = this.graph.get(child);
        if (childNode && !childNode.parent) {
          childNode.parent = node.view;
        }
      }
    }

    for (const [, node] of this.graph) {
      if (!node.parent && node.view !== 'login' && node.view !== 'dashboard') {
        node.orphan = true;
      }
    }
  }

  getGraph(): Map<ViewState, RouteNode> {
    return new Map(this.graph);
  }

  getNode(view: ViewState): RouteNode | undefined {
    return this.graph.get(view);
  }

  isValidRoute(view: ViewState): boolean {
    return KNOWN_VIEWS.includes(view);
  }

  isOrphan(view: ViewState): boolean {
    return this.graph.get(view)?.orphan ?? true;
  }

  getFallbackRoute(userRole?: UserRole): ViewState {
    if (userRole === 'admin') return 'admin';
    return 'dashboard';
  }

  getRoutePath(view: ViewState): ViewState[] {
    const path: ViewState[] = [view];
    let current = this.graph.get(view);
    while (current?.parent && current.view !== 'dashboard') {
      path.unshift(current.parent);
      current = this.graph.get(current.parent);
    }
    return path;
  }

  getAccessibleRoutes(role?: UserRole): Array<{ view: ViewState; label: string; icon?: string }> {
    const routes: Array<{ view: ViewState; label: string; icon?: string }> = [];
    const rootNodes: ViewState[] = ['dashboard', 'study', 'pharma', 'case', 'settings', 'patients'];

    for (const view of rootNodes) {
      const node = this.graph.get(view);
      if (!node) continue;
      if (node.roles && role && !node.roles.includes(role)) continue;
      routes.push({ view: node.view, label: node.label, icon: node.icon });
    }

    return routes;
  }

  validate(view: ViewState, role?: UserRole): ViewState {
    if (!this.isValidRoute(view)) {
      this.bus.emit('navigation:invalid', { view, fallback: 'dashboard' });
      return 'dashboard';
    }

    const node = this.graph.get(view);
    if (node?.roles && role && !node.roles.includes(role)) {
      this.bus.emit('navigation:denied', { view, role });
      return 'dashboard';
    }

    return view;
  }
}
