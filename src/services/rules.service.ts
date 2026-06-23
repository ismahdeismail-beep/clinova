import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { ClinicalRule } from '../types/engine';

const RULES_COLLECTION = 'rules';

// Simple recursive-descent expression evaluator.
// Supports: &&, ||, !, ==, !=, <, >, <=, >=, parentheses, identifiers, numbers, strings.
// NO eval() or new Function() — fully safe for clinical context.
class ExprParser {
  private tokens: string[];
  private pos: number;

  constructor(expr: string) {
    this.tokens = expr.match(/(?:[A-Za-z_]\w*|[()!<>]=?|&&|\|\||==|!=|\d+\.?\d*|"[^"]*")/g) || [];
    this.pos = 0;
  }

  private peek(): string | undefined {
    return this.tokens[this.pos];
  }

  private consume(): string {
    return this.tokens[this.pos++];
  }

  private parseValue(context: Record<string, any>): any {
    const t = this.peek();
    if (t === '(') {
      this.consume();
      const val = this.parseOr(context);
      if (this.peek() === ')') this.consume();
      return val;
    }
    if (t === '!') {
      this.consume();
      return !this.parseValue(context);
    }
    if (/^\d/.test(t!)) {
      this.consume();
      return t!.includes('.') ? parseFloat(t!) : parseInt(t!, 10);
    }
    if (/^"/.test(t!)) {
      this.consume();
      return t!.slice(1, -1);
    }
    if (/^[A-Za-z_]/.test(t!)) {
      this.consume();
      return context[t!];
    }
    return undefined;
  }

  private parseComparison(context: Record<string, any>): any {
    let left = this.parseValue(context);
    const op = this.peek();
    if (op === '==' || op === '!=' || op === '<' || op === '>' || op === '<=' || op === '>=') {
      this.consume();
      const right = this.parseValue(context);
      switch (op) {
        case '==': return left === right;
        case '!=': return left !== right;
        case '<': return left < right;
        case '>': return left > right;
        case '<=': return left <= right;
        case '>=': return left >= right;
      }
    }
    return left;
  }

  private parseAnd(context: Record<string, any>): any {
    let left = this.parseComparison(context);
    while (this.peek() === '&&') {
      this.consume();
      left = left && this.parseComparison(context);
    }
    return left;
  }

  private parseOr(context: Record<string, any>): any {
    let left = this.parseAnd(context);
    while (this.peek() === '||') {
      this.consume();
      left = left || this.parseAnd(context);
    }
    return left;
  }

  evaluate(context: Record<string, any>): boolean {
    try {
      return !!this.parseOr(context);
    } catch {
      return false;
    }
  }
}

export const RulesService = {
  async getAllRules(): Promise<ClinicalRule[]> {
    const snap = await getDocs(query(collection(db, RULES_COLLECTION)));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as ClinicalRule));
  },

  async getRulesByWorkflowId(workflowId: string): Promise<ClinicalRule[]> {
    const q = query(collection(db, RULES_COLLECTION), where("workflowId", "==", workflowId));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as ClinicalRule));
  },

  async saveRule(rule: ClinicalRule): Promise<void> {
    const docRef = doc(db, RULES_COLLECTION, rule.id);
    await setDoc(docRef, rule);
  },

  async evaluateRules(context: Record<string, any>): Promise<ClinicalRule[]> {
    const rules = await this.getAllRules();
    const triggered: ClinicalRule[] = [];

    for (const rule of rules) {
      if (this.evaluateCondition(rule.condition, context)) {
        triggered.push(rule);
      }
    }

    return triggered;
  },

  evaluateCondition(conditionString: string, context: Record<string, any>): boolean {
    const parser = new ExprParser(conditionString);
    return parser.evaluate(context);
  }
};
