export type NodeType = 'input' | 'decision' | 'calculation' | 'output';

export interface WorkflowNode {
  id: string;
  workflowId: string;
  type: NodeType;
  prompt: string;
  inputType?: 'select' | 'number' | 'text' | 'boolean';
  logic?: string;
  next: {
    yes?: string;
    no?: string;
    default?: string;
  };
  position: { x: number; y: number };
}

export interface Workflow {
  id: string;
  name: string;
  type: 'clinical_decision_tree';
  entryNode: string;
  status: 'draft' | 'active' | 'archived';
}

export interface ClinicalRule {
  id: string;
  condition: string; // The "if" logic
  action: string;    // The "then" logic
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface Drug {
  id: string;
  type: 'drug';
  name: string;
  class: string;
  mechanism: string;
  indications: string[];
  contraindications: string[];
  interactions: string[]; // IDs of interacting drugs
  dosing: string;
  pregnancy_category: string;
  kenya_available: boolean;
  aliases: string[];
}

export interface Condition {
  id: string;
  type: 'condition';
  name: string;
  diagnostic_criteria: string[];
  severity_scale: string;
  associated_drugs: string[];
  complications: string[];
}

export interface Interaction {
  id: string;
  drugA: string;
  drugB: string;
  risk: string;
  severity: 'low' | 'medium' | 'high' | 'severe';
  mechanism: string;
}

export interface AIResponse {
  diagnosis: string;
  confidence_score: number;
  reasoning_steps: string[];
  recommended_actions: string[];
  warnings: string[];
}

export interface ClinicalSessionOutput {
  patient_summary: string;
  workflow_path: string[];
  clinical_reasoning: string;
  risk_assessment: string;
  final_recommendation: string;
  safety_flags: string[];
}
