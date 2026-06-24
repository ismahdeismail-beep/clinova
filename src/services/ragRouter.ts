export type IntentCategory = 'drug' | 'guideline' | 'research' | 'general';

export const RAGRouter = {
  analyzeIntent: (query: string): IntentCategory => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('dose') || lowerQuery.includes('interaction') || lowerQuery.includes('side effect') || lowerQuery.includes('mg') || lowerQuery.includes('drug') || lowerQuery.includes('pharmacology')) {
      return 'drug';
    }
    
    if (lowerQuery.includes('guideline') || lowerQuery.includes('stg') || lowerQuery.includes('who') || lowerQuery.includes('first-line') || lowerQuery.includes('protocol')) {
      return 'guideline';
    }
    
    if (lowerQuery.includes('study') || lowerQuery.includes('research') || lowerQuery.includes('evidence') || lowerQuery.includes('trial') || lowerQuery.includes('paper')) {
      return 'research';
    }
    
    return 'general';
  },

  routeQuery: (intent: IntentCategory): string => {
    switch (intent) {
      case 'drug':
        return 'Drug Agent';
      case 'guideline':
        return 'Guideline Agent';
      case 'research':
        return 'Research Agent';
      case 'general':
      default:
        return 'General Clinical Agent';
    }
  }
};
