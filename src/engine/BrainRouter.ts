import type { ViewState, UserRole } from '../types';

interface RouteDefinition {
  view: ViewState;
  roles?: UserRole[];
  label: string;
  icon?: string;
  core: boolean;
}

export const ROUTE_REGISTRY: RouteDefinition[] = [
  { view: 'dashboard', label: 'Dashboard', core: true },
  { view: 'tree', label: 'Decision Tree', core: true },
  { view: 'study', label: 'Knowledge Engine', core: true },
  { view: 'pharma', label: 'Reasoning Engine', core: true },
  { view: 'case', label: 'Risk Simulator', core: true },
  { view: 'settings', label: 'Settings', core: false },
  { view: 'patients', label: 'Patients', core: false },
  { view: 'new-case', label: 'New Case', core: false },
  { view: 'pharmacotherapy', label: 'Pharmacotherapy Review', core: false },
  { view: 'drug-index', label: 'Drug Index', core: false },
  { view: 'knowledge-base', label: 'Knowledge Base', core: false },
  { view: 'admin', label: 'Governance Console', roles: ['admin'], core: false },
];

const ROUTE_ORDER: ViewState[] = ['login', 'dashboard', 'tree', 'study', 'pharma', 'case', 'settings', 'patients', 'new-case', 'pharmacotherapy', 'drug-index', 'knowledge-base', 'admin'];

export class BrainRouter {
  private static instance: BrainRouter;
  private currentView: ViewState = 'login';
  private history: ViewState[] = [];
  private listeners = new Set<(view: ViewState) => void>();

  static getInstance(): BrainRouter {
    if (!BrainRouter.instance) {
      BrainRouter.instance = new BrainRouter();
    }
    return BrainRouter.instance;
  }

  getCurrentView(): ViewState {
    return this.currentView;
  }

  navigate(view: ViewState, role?: UserRole): boolean {
    const route = ROUTE_REGISTRY.find((r) => r.view === view);
    if (route?.roles && role && !route.roles.includes(role)) {
      console.warn(`[BrainRouter] Access denied: "${view}" requires role ${route.roles.join('|')}`);
      return false;
    }

    this.history.push(this.currentView);
    this.currentView = view;
    this.listeners.forEach((cb) => cb(view));
    return true;
  }

  back(): ViewState | null {
    if (this.history.length === 0) return null;
    const prev = this.history.pop()!;
    this.currentView = prev;
    this.listeners.forEach((cb) => cb(prev));
    return prev;
  }

  canNavigate(view: ViewState, role?: UserRole): boolean {
    const route = ROUTE_REGISTRY.find((r) => r.view === view);
    if (route?.roles && role && !route.roles.includes(role)) return false;
    return true;
  }

  getAccessibleRoutes(role?: UserRole): RouteDefinition[] {
    return ROUTE_REGISTRY.filter((r) => {
      if (!r.roles) return true;
      return role && r.roles.includes(role);
    });
  }

  onChange(cb: (view: ViewState) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  getNext(view: ViewState): ViewState | null {
    const idx = ROUTE_ORDER.indexOf(view);
    return idx >= 0 && idx < ROUTE_ORDER.length - 1 ? ROUTE_ORDER[idx + 1] : null;
  }

  getPrev(view: ViewState): ViewState | null {
    const idx = ROUTE_ORDER.indexOf(view);
    return idx > 0 ? ROUTE_ORDER[idx - 1] : null;
  }
}
