export type RagSourceId = 'drug' | 'guideline' | 'pharma' | 'research' | 'notes' | 'ward';

export interface RagSourceConfig {
  id: RagSourceId;
  name: string;
  keywords: string[];
}

export const RAG_SOURCES: RagSourceConfig[] = [
  { id: 'drug', name: 'Drug RAG', keywords: ['dose', 'mg', 'interaction', 'contraindication', 'side effect', 'adverse', 'pharmacology', 'mechanism', 'half-life', 'toxicity', 'antibiotic'] },
  { id: 'guideline', name: 'Guideline RAG', keywords: ['guideline', 'stg', 'who', 'first-line', 'treatment', 'algorithm', 'protocol', 'kdi', 'recommendation', 'cap', 'malaria'] },
  { id: 'pharma', name: 'Pharmacotherapy RAG', keywords: ['pharmacokinetics', 'renal', 'hepatic', 'adjustment', 'alternative', 'pharmacodynamics', 'monitoring', 'empiric', 'therapy'] },
  { id: 'research', name: 'Research RAG', keywords: ['research', 'study', 'trial', 'evidence', 'literature', 'paper', 'journal', 'pubmed', 'meta-analysis'] },
  { id: 'notes', name: 'User Notes RAG', keywords: ['my notes', 'lecture', 'summary', 'upload', 'my patient'] },
  { id: 'ward', name: 'Ward-AID RAG', keywords: ['ward', 'discharge', 'monitor', 'soap', 'round', 'intervention', 'counseling', 'plan', 'review'] },
];

export interface RoutingResult {
  selectedSources: string[];
  confidence: number;
  intent: string;
}

export class RagRouterService {
  /**
   * Intelligently routes a clinical query to the most relevant knowledge bases.
   */
  static routeQuery(query: string): RoutingResult {
    const lowerQuery = query.toLowerCase();
    
    const scoredSources = RAG_SOURCES.map(source => {
      let score = 0;
      source.keywords.forEach(keyword => {
        if (lowerQuery.includes(keyword)) {
          // Boost score for exact word matches vs partial
          const regex = new RegExp(`\\b${keyword}\\b`, 'i');
          if (regex.test(lowerQuery)) {
            score += 2;
          } else {
            score += 1;
          }
        }
      });
      return { name: source.name, score };
    });

    scoredSources.sort((a, b) => b.score - a.score);
    
    // Select top sources with a score > 0, up to a max of 3
    const selected = scoredSources.filter(s => s.score > 0).slice(0, 3).map(s => s.name);
    
    // Fallback if no keywords matched
    if (selected.length === 0) {
      if (lowerQuery.includes('patient') || lowerQuery.includes('case')) {
        selected.push('Ward-AID RAG');
        selected.push('Pharmacotherapy RAG');
      } else {
        selected.push('Guideline RAG');
        selected.push('Drug RAG');
      }
      return {
        selectedSources: selected,
        confidence: 75, // Lower confidence for fallback
        intent: 'General clinical inquiry (Fallback routing)'
      };
    }

    return {
      selectedSources: selected,
      confidence: Math.min(85 + (selected.length * 4) + (scoredSources[0].score * 2), 98), // Compute confidence based on matches
      intent: 'Targeted clinical inquiry'
    };
  }
}
