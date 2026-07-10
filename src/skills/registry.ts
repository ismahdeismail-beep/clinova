// ================================================================
// Clinova AI Skills Registry
// Central registry for all skills — allows orchestration, discovery
// ================================================================

import type { Skill, SkillDefinition, SkillId, SkillCategory } from './types';

class SkillRegistry {
  private skills: Map<SkillId, Skill> = new Map();

  /** Register a skill */
  register(skill: Skill): void {
    if (this.skills.has(skill.definition.id)) {
      console.warn(`[SkillRegistry] Overwriting existing skill: ${skill.definition.id}`);
    }
    this.skills.set(skill.definition.id, skill);
  }

  /** Get a skill by ID */
  get(id: SkillId): Skill | undefined {
    return this.skills.get(id);
  }

  /** Get all registered skills */
  getAll(): Skill[] {
    return Array.from(this.skills.values());
  }

  /** Get skills by category */
  getByCategory(category: SkillCategory): Skill[] {
    return this.getAll().filter(s => s.definition.category === category);
  }

  /** Get skill definitions */
  getDefinitions(): SkillDefinition[] {
    return this.getAll().map(s => s.definition);
  }

  /** Check if a skill exists */
  has(id: SkillId): boolean {
    return this.skills.has(id);
  }

  /** Get skills that can handle a given context */
  async findCapable(context: Parameters<Skill['canHandle']>[0]): Promise<Skill[]> {
    const capable: Skill[] = [];
    for (const skill of this.getAll()) {
      try {
        if (await skill.canHandle(context)) {
          capable.push(skill);
        }
      } catch (err) {
        console.warn(`[SkillRegistry] Error checking skill ${skill.definition.id}:`, err);
      }
    }
    return capable.sort((a, b) => b.definition.priority - a.definition.priority);
  }

  /** Get total registered count */
  get count(): number {
    return this.skills.size;
  }

  /** Clear all skills (for testing / hot-reload) */
  clear(): void {
    this.skills.clear();
  }
}

export const skillRegistry = new SkillRegistry();

export { SkillRegistry };
