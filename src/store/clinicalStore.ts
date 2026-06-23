import { create } from 'zustand';
import type { ViewState, UserRole, UserData } from '../types';
import type { Workflow, WorkflowNode, ClinicalRule, Drug, Condition, Interaction } from '../types/engine';

interface ClinicalState {
  view: ViewState;
  user: { uid: string; email: string | null; displayName: string | null; role: UserRole } | null;
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  currentNodes: WorkflowNode[];
  rules: ClinicalRule[];
  drugs: Drug[];
  conditions: Condition[];
  interactions: Interaction[];
  loading: boolean;
  error: string | null;

  setView: (view: ViewState) => void;
  setUser: (user: ClinicalState['user']) => void;
  setWorkflows: (workflows: Workflow[]) => void;
  setCurrentWorkflow: (workflow: Workflow | null, nodes?: WorkflowNode[]) => void;
  setRules: (rules: ClinicalRule[]) => void;
  setDrugs: (drugs: Drug[]) => void;
  setConditions: (conditions: Condition[]) => void;
  setInteractions: (interactions: Interaction[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  view: 'login' as ViewState,
  user: null,
  workflows: [],
  currentWorkflow: null,
  currentNodes: [],
  rules: [],
  drugs: [],
  conditions: [],
  interactions: [],
  loading: false,
  error: null,
};

export const useClinicalStore = create<ClinicalState>((set, get) => ({
  ...initialState,

  setView: (view) => {
    set({ view, error: null });
  },
  setUser: (user) => set({ user }),
  setWorkflows: (workflows) => set({ workflows }),
  setCurrentWorkflow: (workflow, nodes) =>
    set({ currentWorkflow: workflow, currentNodes: nodes ?? [] }),
  setRules: (rules) => set({ rules }),
  setDrugs: (drugs) => set({ drugs }),
  setConditions: (conditions) => set({ conditions }),
  setInteractions: (interactions) => set({ interactions }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
