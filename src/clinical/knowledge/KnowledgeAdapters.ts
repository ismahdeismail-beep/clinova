import { KnowledgeService } from '../../services/knowledge.service';
import type { Drug, Condition, Interaction } from '../../types/engine';

export interface ClinicalReference {
  id: string;
  title: string;
  source: 'kdi' | 'guideline' | 'literature' | 'textbook';
  relevance: number;
  content: string;
  reference: string;
}

export interface EvidenceEntry {
  id: string;
  claim: string;
  supportLevel: 'strong' | 'moderate' | 'weak' | 'insufficient';
  sources: ClinicalReference[];
  lastUpdated: number;
}

export class KenyaDrugIndexAdapter {
  private knowledge: typeof KnowledgeService;

  constructor(knowledge: typeof KnowledgeService) {
    this.knowledge = knowledge;
  }

  async lookupDrug(name: string): Promise<Drug | null> {
    return this.knowledge.getDrug(name);
  }

  async searchKDIDrugs(query: string): Promise<Drug[]> {
    return this.knowledge.searchDrugs(query);
  }

  async getDrugsByClass(drugClass: string): Promise<Drug[]> {
    return this.knowledge.getDrugsByClass(drugClass);
  }

  async getApprovedKDIDrugs(): Promise<Drug[]> {
    return this.knowledge.getKDIDrugs();
  }

  async getDrugByKEMSCode(code: string): Promise<Drug | null> {
    return this.knowledge.getDrugByKEMSCode(code);
  }
}

export class ClinicalReferencesAdapter {
  private references: Map<string, ClinicalReference> = new Map();

  addReference(ref: ClinicalReference): void {
    this.references.set(ref.id, ref);
  }

  searchReferences(query: string): ClinicalReference[] {
    const results: ClinicalReference[] = [];
    const lower = query.toLowerCase();
    for (const ref of this.references.values()) {
      if (ref.title.toLowerCase().includes(lower) || ref.content.toLowerCase().includes(lower)) {
        results.push(ref);
      }
    }
    return results.sort((a, b) => b.relevance - a.relevance);
  }

  getReferencesBySource(source: ClinicalReference['source']): ClinicalReference[] {
    return Array.from(this.references.values()).filter(r => r.source === source);
  }
}

export class DiagnosticReasoningAdapter {
  private knowledge: typeof KnowledgeService;

  constructor(knowledge: typeof KnowledgeService) {
    this.knowledge = knowledge;
  }

  async getConditionDifferentials(conditionName: string): Promise<Condition[]> {
    return this.knowledge.searchConditions(conditionName);
  }

  async getAssociatedDrugs(conditionId: string): Promise<Drug[]> {
    const condition = await this.knowledge.getCondition(conditionId);
    if (!condition?.associated_drugs) return [];

    const drugs: Drug[] = [];
    for (const drugId of condition.associated_drugs) {
      const drug = await this.knowledge.getDrug(drugId);
      if (drug) drugs.push(drug);
    }
    return drugs;
  }
}

export class TreatmentRecommendationAdapter {
  private knowledge: typeof KnowledgeService;

  constructor(knowledge: typeof KnowledgeService) {
    this.knowledge = knowledge;
  }

  async getDrugInteractions(drugA: string, drugB: string): Promise<Interaction | null> {
    return this.knowledge.checkInteraction(drugA, drugB);
  }

  async getDrugInteractionsList(drugId: string): Promise<Interaction[]> {
    return this.knowledge.getInteractionsForDrug(drugId);
  }
}

export class EvidenceLayerAdapter {
  private evidence: Map<string, EvidenceEntry> = new Map();

  addEvidence(entry: EvidenceEntry): void {
    this.evidence.set(entry.id, entry);
  }

  getEvidenceForClaim(claim: string): EvidenceEntry[] {
    const lower = claim.toLowerCase();
    return Array.from(this.evidence.values()).filter(e =>
      e.claim.toLowerCase().includes(lower)
    );
  }

  getStrongEvidence(minScore: number = 70): EvidenceEntry[] {
    return Array.from(this.evidence.values()).filter(e => {
      const scoreMap = { strong: 90, moderate: 70, weak: 40, insufficient: 10 };
      return (scoreMap[e.supportLevel] || 0) >= minScore;
    });
  }
}
