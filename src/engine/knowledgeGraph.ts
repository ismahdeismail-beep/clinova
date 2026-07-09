// ============================================================
// Clinova Knowledge Graph Service
// Interconnects all educational resources into a unified graph
// ============================================================

import {
  type Discipline,
  DISCIPLINES,
  SUB_DISCIPLINES,
} from '../types/knowledge';

// ============================================================
// Types
// ============================================================

export type KnowledgeNodeType =
  | 'learning_area'
  | 'subject'
  | 'unit'
  | 'topic'
  | 'subtopic'
  | 'disease'
  | 'drug'
  | 'drug_class'
  | 'therapeutic_area'
  | 'clinical_specialty'
  | 'clinical_case'
  | 'guideline'
  | 'book'
  | 'note'
  | 'flashcard'
  | 'quiz'
  | 'study_guide'
  | 'oral_practice'
  | 'revision_note'
  | 'learning_objective'
  | 'resource';

export type RelationshipType =
  | 'has_subject'
  | 'has_unit'
  | 'has_topic'
  | 'has_subtopic'
  | 'treats'
  | 'treats_disease'
  | 'used_for'
  | 'belongs_to'
  | 'part_of'
  | 'related_to'
  | 'contraindicates'
  | 'interacts_with'
  | 'recommends'
  | 'references'
  | 'generates'
  | 'derived_from'
  | 'similar_to'
  | 'prerequisite_for'
  | 'teaches'
  | 'connected_to';

export interface KnowledgeNode {
  id: string;
  type: KnowledgeNodeType;
  label: string;
  description?: string;
  metadata: Record<string, any>;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Relationship {
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  weight: number;
  metadata?: Record<string, any>;
}

export interface GraphExport {
  nodes: KnowledgeNode[];
  edges: Relationship[];
}

// ============================================================
// Knowledge Graph — Main Class
// ============================================================

export class KnowledgeGraph {
  private nodes: Map<string, KnowledgeNode> = new Map();
  private edges: Map<string, Relationship[]> = new Map();
  private reverseEdges: Map<string, Relationship[]> = new Map();
  private static STORAGE_KEY = 'clinova_knowledge_graph';

  constructor() {
    // Build default hierarchy on construction
    this.buildDefaultHierarchy();
  }

  // ============================================================
  // Node Operations
  // ============================================================

  addNode(node: KnowledgeNode): void {
    this.nodes.set(node.id, node);
  }

  getNode(id: string): KnowledgeNode | undefined {
    return this.nodes.get(id);
  }

  removeNode(id: string): void {
    this.nodes.delete(id);
    this.edges.delete(id);
    this.reverseEdges.delete(id);
    // Clean up references from other nodes
    for (const [sourceId, rels] of this.edges.entries()) {
      this.edges.set(
        sourceId,
        rels.filter((r) => r.targetId !== id),
      );
    }
    for (const [targetId, rels] of this.reverseEdges.entries()) {
      this.reverseEdges.set(
        targetId,
        rels.filter((r) => r.sourceId !== id),
      );
    }
  }

  updateNode(id: string, updates: Partial<KnowledgeNode>): void {
    const node = this.nodes.get(id);
    if (node) {
      Object.assign(node, updates, { updatedAt: Date.now() });
    }
  }

  getNodesByType(type: KnowledgeNodeType | string): KnowledgeNode[] {
    const results: KnowledgeNode[] = [];
    for (const node of this.nodes.values()) {
      if (node.type === type) results.push(node);
    }
    return results;
  }

  searchNodes(query: string, types?: string[]): KnowledgeNode[] {
    const lower = query.toLowerCase();
    const results: KnowledgeNode[] = [];
    for (const node of this.nodes.values()) {
      if (types && !types.includes(node.type)) continue;
      if (
        node.label.toLowerCase().includes(lower) ||
        node.tags.some((t) => t.toLowerCase().includes(lower)) ||
        node.description?.toLowerCase().includes(lower)
      ) {
        results.push(node);
      }
    }
    return results;
  }

  getAllNodes(): KnowledgeNode[] {
    return Array.from(this.nodes.values());
  }

  getNodeCount(): number {
    return this.nodes.size;
  }

  // ============================================================
  // Relationship Operations
  // ============================================================

  addRelationship(
    sourceId: string,
    targetId: string,
    type: RelationshipType,
    weight: number = 0.5,
    metadata?: Record<string, any>,
  ): void {
    const relationship: Relationship = { sourceId, targetId, type, weight, metadata };

    if (!this.edges.has(sourceId)) {
      this.edges.set(sourceId, []);
    }
    // Avoid duplicates
    const existing = this.edges.get(sourceId)!.find((r) => r.targetId === targetId && r.type === type);
    if (!existing) {
      this.edges.get(sourceId)!.push(relationship);
    }

    if (!this.reverseEdges.has(targetId)) {
      this.reverseEdges.set(targetId, []);
    }
    const revExisting = this.reverseEdges.get(targetId)!.find((r) => r.sourceId === sourceId && r.type === type);
    if (!revExisting) {
      this.reverseEdges.get(targetId)!.push(relationship);
    }
  }

  removeRelationship(sourceId: string, targetId: string, type: RelationshipType): void {
    const edges = this.edges.get(sourceId);
    if (edges) {
      this.edges.set(
        sourceId,
        edges.filter((r) => !(r.targetId === targetId && r.type === type)),
      );
    }
    const revEdges = this.reverseEdges.get(targetId);
    if (revEdges) {
      this.reverseEdges.set(
        targetId,
        revEdges.filter((r) => !(r.sourceId === sourceId && r.type === type)),
      );
    }
  }

  getRelationships(nodeId: string): Relationship[] {
    const outgoing = this.edges.get(nodeId) || [];
    const incoming = this.reverseEdges.get(nodeId) || [];
    return [...outgoing, ...incoming];
  }

  getOutgoingRelationships(nodeId: string): Relationship[] {
    return this.edges.get(nodeId) || [];
  }

  getIncomingRelationships(nodeId: string): Relationship[] {
    return this.reverseEdges.get(nodeId) || [];
  }

  // ============================================================
  // Graph Navigation
  // ============================================================

  getRelated(nodeId: string, types?: RelationshipType[], maxDepth: number = 1): KnowledgeNode[] {
    const visited = new Set<string>();
    const results: KnowledgeNode[] = [];
    const queue: Array<{ id: string; depth: number }> = [{ id: nodeId, depth: 0 }];
    visited.add(nodeId);

    while (queue.length > 0) {
      const { id, depth } = queue.shift()!;
      if (depth >= maxDepth) continue;

      const relationships = this.getRelationships(id);
      for (const rel of relationships) {
        if (types && !types.includes(rel.type)) continue;

        const targetId = rel.targetId === id ? rel.sourceId : rel.targetId;
        if (!visited.has(targetId)) {
          visited.add(targetId);
          const node = this.nodes.get(targetId);
          if (node) {
            results.push(node);
            queue.push({ id: targetId, depth: depth + 1 });
          }
        }
      }
    }

    return results;
  }

  findPath(sourceId: string, targetId: string, maxDepth: number = 5): KnowledgeNode[][] {
    const paths: KnowledgeNode[][] = [];
    const visited = new Set<string>();

    const dfs = (currentId: string, path: KnowledgeNode[], depth: number) => {
      if (depth > maxDepth) return;
      if (currentId === targetId) {
        paths.push([...path]);
        return;
      }

      visited.add(currentId);
      const relationships = this.getRelationships(currentId);

      for (const rel of relationships) {
        const nextId = rel.targetId === currentId ? rel.sourceId : rel.targetId;
        if (!visited.has(nextId)) {
          const nextNode = this.nodes.get(nextId);
          if (nextNode) {
            path.push(nextNode);
            dfs(nextId, path, depth + 1);
            path.pop();
          }
        }
      }

      visited.delete(currentId);
    };

    const startNode = this.nodes.get(sourceId);
    if (startNode) {
      dfs(sourceId, [startNode], 0);
    }

    return paths;
  }

  // ============================================================
  // Connected Components / Subgraph
  // ============================================================

  getConnectedComponent(nodeId: string): KnowledgeNode[] {
    const visited = new Set<string>();
    const component: KnowledgeNode[] = [];
    const queue: string[] = [nodeId];
    visited.add(nodeId);

    while (queue.length > 0) {
      const id = queue.shift()!;
      const node = this.nodes.get(id);
      if (node) component.push(node);

      const relationships = this.getRelationships(id);
      for (const rel of relationships) {
        const neighborId = rel.targetId === id ? rel.sourceId : rel.targetId;
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          queue.push(neighborId);
        }
      }
    }

    return component;
  }

  // ============================================================
  // Build Default Knowledge Hierarchy
  // ============================================================

  buildDefaultHierarchy(): void {
    const now = Date.now();

    // Create Learning Area nodes
    const learningAreas = [
      { id: 'la_pharmacy', label: 'Clinical Pharmacy', type: 'learning_area' as KnowledgeNodeType },
      { id: 'la_pharmacology', label: 'Pharmacology', type: 'learning_area' as KnowledgeNodeType },
      { id: 'la_pharmaceutics', label: 'Pharmaceutics', type: 'learning_area' as KnowledgeNodeType },
      { id: 'la_chem', label: 'Pharmaceutical Chemistry', type: 'learning_area' as KnowledgeNodeType },
      { id: 'la_biochem', label: 'Biochemistry', type: 'learning_area' as KnowledgeNodeType },
      { id: 'la_physio', label: 'Physiology', type: 'learning_area' as KnowledgeNodeType },
      { id: 'la_anatomy', label: 'Anatomy', type: 'learning_area' as KnowledgeNodeType },
      { id: 'la_pathology', label: 'Pathology', type: 'learning_area' as KnowledgeNodeType },
      { id: 'la_microbio', label: 'Microbiology', type: 'learning_area' as KnowledgeNodeType },
      { id: 'la_public_health', label: 'Public Health', type: 'learning_area' as KnowledgeNodeType },
    ];

    for (const area of learningAreas) {
      this.addNode({
        ...area,
        description: `${area.label} — Core learning area`,
        metadata: {},
        tags: [area.label.toLowerCase().replace(/\s+/g, '_')],
        createdAt: now,
        updatedAt: now,
      });
    }

    // Create subject nodes from DISCIPLINES and SUB_DISCIPLINES
    for (const discipline of DISCIPLINES) {
      const subjectId = `subject_${discipline.toLowerCase().replace(/[^a-z]/g, '_')}`;
      this.addNode({
        id: subjectId,
        type: 'subject',
        label: discipline,
        description: `${discipline} subject area`,
        metadata: {},
        tags: [discipline.toLowerCase().replace(/\s+/g, '_')],
        createdAt: now,
        updatedAt: now,
      });

      // Connect to the most relevant learning area
      const areaMap: Record<string, string> = {
        Pharmacy: 'la_pharmacy',
        Pharmacology: 'la_pharmacology',
        Pharmaceutics: 'la_pharmaceutics',
        'Pharmaceutical Chemistry': 'la_chem',
        'Organic Chemistry': 'la_chem',
        'Pharmaceutical Analysis': 'la_chem',
        Pharmacognosy: 'la_pharmacy',
        Biochemistry: 'la_biochem',
        Physiology: 'la_physio',
        Anatomy: 'la_anatomy',
        Pathology: 'la_pathology',
        Microbiology: 'la_microbio',
        'Clinical Medicine': 'la_pharmacy',
        Diagnostics: 'la_pathology',
        'Public Health': 'la_public_health',
        Research: 'la_public_health',
        Nursing: 'la_pharmacy',
        Dentistry: 'la_anatomy',
        Nutrition: 'la_biochem',
      };

      const areaId = areaMap[discipline];
      if (areaId) {
        this.addRelationship(areaId, subjectId, 'has_subject', 1.0);
      }

      // Create unit nodes for sub-disciplines
      const subDisciplines = SUB_DISCIPLINES[discipline as Discipline] || [];
      for (const sub of subDisciplines) {
        const unitId = `unit_${sub.toLowerCase().replace(/[^a-z]/g, '_')}`;
        this.addNode({
          id: unitId,
          type: 'unit',
          label: sub,
          description: `${sub} — unit within ${discipline}`,
          metadata: { discipline },
          tags: [discipline.toLowerCase().replace(/\s+/g, '_'), sub.toLowerCase().replace(/\s+/g, '_')],
          createdAt: now,
          updatedAt: now,
        });
        this.addRelationship(subjectId, unitId, 'has_unit', 0.9);
      }
    }

    // Create disease nodes
    const diseases = [
      'Hypertension', 'Diabetes Mellitus', 'Asthma', 'COPD', 'Heart Failure',
      'Malaria', 'Tuberculosis', 'HIV/AIDS', 'Pneumonia', 'Urinary Tract Infection',
      'Peptic Ulcer Disease', 'Gastroesophageal Reflux', 'Epilepsy', 'Depression',
      'Schizophrenia', 'Parkinson Disease', 'Alzheimer Disease', 'Rheumatoid Arthritis',
      'Osteoarthritis', 'Gout', 'Osteoporosis', 'Anemia', 'Acute Kidney Injury',
      'Chronic Kidney Disease', 'Hepatitis B', 'Hepatitis C', 'Cirrhosis',
      'Thyroid Disorders', 'Cancer', 'Meningitis', 'Stroke',
    ];

    for (const disease of diseases) {
      const diseaseId = `disease_${disease.toLowerCase().replace(/[^a-z]/g, '_')}`;
      this.addNode({
        id: diseaseId,
        type: 'disease',
        label: disease,
        description: `${disease} — clinical condition`,
        metadata: {},
        tags: [disease.toLowerCase().replace(/\s+/g, '_'), 'disease', 'clinical_condition'],
        createdAt: now,
        updatedAt: now,
      });

      // Connect disease to relevant subjects
      if (['Hypertension', 'Heart Failure', 'Stroke'].includes(disease)) {
        const cvNode = this.searchNodes('Cardiovascular Pharmacology');
        if (cvNode.length > 0) this.addRelationship(diseaseId, cvNode[0].id, 'related_to', 0.8);
      }
      if (['Diabetes Mellitus', 'Thyroid Disorders'].includes(disease)) {
        const endoNode = this.searchNodes('Endocrine Pharmacology');
        if (endoNode.length > 0) this.addRelationship(diseaseId, endoNode[0].id, 'related_to', 0.8);
      }
      if (['Asthma', 'COPD', 'Pneumonia'].includes(disease)) {
        const respNode = this.searchNodes('Respiratory Pharmacology');
        if (respNode.length > 0) this.addRelationship(diseaseId, respNode[0].id, 'related_to', 0.8);
      }
      if (['Malaria', 'Tuberculosis', 'HIV/AIDS'].includes(disease)) {
        const microNode = this.searchNodes('Antimicrobials');
        if (microNode.length > 0) this.addRelationship(diseaseId, microNode[0].id, 'related_to', 0.8);
      }
    }

    // Create drug class nodes
    const drugClasses = [
      'ACE Inhibitors', 'Angiotensin Receptor Blockers', 'Calcium Channel Blockers',
      'Beta Blockers', 'Diuretics', 'Statins', 'Metformin', 'Sulfonylureas',
      'Insulins', 'Penicillins', 'Cephalosporins', 'Macrolides', 'Fluoroquinolones',
      'Aminoglycosides', 'Tetracyclines', 'NSAIDs', 'Opioids', 'SSRIs', 'SNRIs',
      'Benzodiazepines', 'Antipsychotics', 'Corticosteroids', 'Bronchodilators',
      'Anticoagulants', 'Antiplatelets', 'Antiepileptics',
    ];

    for (const drugClass of drugClasses) {
      const dcId = `dc_${drugClass.toLowerCase().replace(/[^a-z]/g, '_')}`;
      this.addNode({
        id: dcId,
        type: 'drug_class',
        label: drugClass,
        description: `${drugClass} — pharmacological drug class`,
        metadata: {},
        tags: [drugClass.toLowerCase().replace(/\s+/g, '_'), 'drug_class'],
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  // ============================================================
  // Auto-Discover Relationships
  // ============================================================

  autoDiscoverRelationships(
    resources: Array<{
      id: string;
      title: string;
      discipline: string;
      tags: string[];
      diseases?: string[];
      drugs?: string[];
    }>,
  ): Relationship[] {
    const discovered: Relationship[] = [];

    for (const resource of resources) {
      // Create a node for this resource if it doesn't exist
      if (!this.nodes.has(resource.id)) {
        this.addNode({
          id: resource.id,
          type: 'resource',
          label: resource.title,
          description: `Resource: ${resource.title}`,
          metadata: { discipline: resource.discipline },
          tags: resource.tags,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }

      // Connect to subject based on discipline
      const subjectNodes = this.searchNodes(resource.discipline, ['subject']);
      for (const subject of subjectNodes) {
        this.addRelationship(resource.id, subject.id, 'belongs_to', 0.8);
        discovered.push({ sourceId: resource.id, targetId: subject.id, type: 'belongs_to', weight: 0.8 });
      }

      // Connect to disease nodes based on tags/diseases
      const diseaseTerms = [...(resource.diseases || []), ...resource.tags.filter((t) => t.length > 2)];
      for (const term of diseaseTerms) {
        const diseaseNodes = this.searchNodes(term, ['disease']);
        for (const disease of diseaseNodes) {
          this.addRelationship(resource.id, disease.id, 'related_to', 0.6);
          discovered.push({ sourceId: resource.id, targetId: disease.id, type: 'related_to', weight: 0.6 });
        }
      }

      // Connect to drug class nodes
      const drugTerms = resource.drugs || [];
      for (const term of drugTerms) {
        const drugNodes = this.searchNodes(term, ['drug_class']);
        for (const drug of drugNodes) {
          this.addRelationship(resource.id, drug.id, 'related_to', 0.6);
          discovered.push({ sourceId: resource.id, targetId: drug.id, type: 'related_to', weight: 0.6 });
        }
      }
    }

    return discovered;
  }

  // ============================================================
  // Subject Tree for UI
  // ============================================================

  toSubjectTree(): Array<{
    id: string;
    label: string;
    children: Array<{
      id: string;
      label: string;
      children: Array<{ id: string; label: string }>;
    }>;
  }> {
    const tree: Array<{
      id: string;
      label: string;
      children: Array<{
        id: string;
        label: string;
        children: Array<{ id: string; label: string }>;
      }>;
    }> = [];

    const learningAreas = this.getNodesByType('learning_area');
    for (const area of learningAreas) {
      const areaEntry = {
        id: area.id,
        label: area.label,
        children: [] as Array<{
          id: string;
          label: string;
          children: Array<{ id: string; label: string }>;
        }>,
      };

      const subjects = this.getRelated(area.id, ['has_subject'], 1);
      for (const subject of subjects) {
        const subjectEntry = {
          id: subject.id,
          label: subject.label,
          children: [] as Array<{ id: string; label: string }>,
        };

        const units = this.getRelated(subject.id, ['has_unit'], 1);
        for (const unit of units) {
          subjectEntry.children.push({ id: unit.id, label: unit.label });
        }

        areaEntry.children.push(subjectEntry);
      }

      tree.push(areaEntry);
    }

    return tree;
  }

  // ============================================================
  // Graph Statistics
  // ============================================================

  getStats(): {
    totalNodes: number;
    totalEdges: number;
    nodesByType: Record<string, number>;
    edgesByType: Record<string, number>;
  } {
    const nodesByType: Record<string, number> = {};
    const edgesByType: Record<string, number> = {};

    for (const node of this.nodes.values()) {
      nodesByType[node.type] = (nodesByType[node.type] || 0) + 1;
    }

    for (const rels of this.edges.values()) {
      for (const rel of rels) {
        edgesByType[rel.type] = (edgesByType[rel.type] || 0) + 1;
      }
    }

    let totalEdges = 0;
    for (const rels of this.edges.values()) totalEdges += rels.length;

    return {
      totalNodes: this.nodes.size,
      totalEdges,
      nodesByType,
      edgesByType,
    };
  }

  // ============================================================
  // Persistence
  // ============================================================

  persist(): void {
    try {
      const data = this.exportGraph();
      localStorage.setItem(KnowledgeGraph.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('[KnowledgeGraph] Failed to persist:', error);
    }
  }

  static load(): KnowledgeGraph {
    const graph = new KnowledgeGraph();
    try {
      const stored = localStorage.getItem(KnowledgeGraph.STORAGE_KEY);
      if (stored) {
        const data: GraphExport = JSON.parse(stored);
        graph.importGraph(data);
      }
    } catch (error) {
      console.warn('[KnowledgeGraph] Failed to load from storage, using default:', error);
    }
    return graph;
  }

  exportGraph(): GraphExport {
    return {
      nodes: Array.from(this.nodes.values()),
      edges: [],
    };
  }

  importGraph(data: GraphExport): void {
    for (const node of data.nodes) {
      this.nodes.set(node.id, node);
    }
  }
}

// ============================================================
// Singleton Export
// ============================================================
export const knowledgeGraph = KnowledgeGraph.load();
