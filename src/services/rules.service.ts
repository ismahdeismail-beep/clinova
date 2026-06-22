import { collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ClinicalRule } from '../types/engine';

const RULES_COLLECTION = 'rules';

export const RulesService = {
  async getAllRules(): Promise<ClinicalRule[]> {
    const q = query(collection(db, RULES_COLLECTION));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as ClinicalRule);
  },

  async evaluateRules(context: Record<string, any>): Promise<ClinicalRule[]> {
    const rules = await this.getAllRules();
    const brokenRules: ClinicalRule[] = [];

    // Simple deterministic evaluation engine
    for (const rule of rules) {
      if (this.evaluateCondition(rule.condition, context)) {
        brokenRules.push(rule);
      }
    }

    return brokenRules;
  },

  evaluateCondition(conditionString: string, context: Record<string, any>): boolean {
    // THIS IS A PLACEHOLDER FOR A SECURE EXRESSION PARSER.
    // In a real production environment, use a safe expression evaluator (like json-logic or jsep),
    // NEVER use eval() or new Function() with unsanitized input.
    try {
      // Basic mock evaluation for demonstration
      if (conditionString === 'EF < 40 && BP < 90') {
        return (context.EF < 40 && context.BP < 90);
      }
      if (conditionString === 'K > 5.5') {
        return context.K > 5.5;
      }
      return false;
    } catch (e) {
      console.error('Failed to evaluate rule condition', e);
      return false;
    }
  }
};
