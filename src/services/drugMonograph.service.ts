import { supabase } from '../lib/supabase';

export interface DrugMonograph {
  id: string;
  name: string;
  generic_name: string;
  drug_class: string;
  drug_class_id: string | null;
  drug_class_name: string;
  indications: string[];
  contraindications: string[];
  side_effects: string[];
  dosage: Record<string, any>;
  interactions: string[];
  monitoring: string;
  patient_counselling: string;
  created_at?: string;
}

function mapRow(row: any): DrugMonograph {
  const drugClassInfo = row.drug_class_info;
  return {
    id: row.id,
    name: row.name,
    generic_name: row.generic_name,
    drug_class: row.drug_class ?? '',
    drug_class_id: row.drug_class_id ?? null,
    drug_class_name: drugClassInfo?.name ?? row.drug_class ?? '',
    indications: row.indications ?? [],
    contraindications: row.contraindications ?? [],
    side_effects: row.side_effects ?? [],
    dosage: row.dosage ?? {},
    interactions: row.interactions ?? [],
    monitoring: row.monitoring ?? '',
    patient_counselling: row.patient_counselling ?? '',
    created_at: row.created_at,
  };
}

export interface UserMonograph {
  id: string;
  user_id: string;
  monograph_id: string;
  saved_at: string;
  notes: string | null;
  tags: string[];
  monograph?: DrugMonograph;
}

export const DrugMonographService = {
  async getAll(): Promise<DrugMonograph[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*, drug_class_info:drug_classes(name)')
      .order('name');
    if (error) throw error;
    return (data ?? []).map(mapRow);
  },

  async getById(id: string): Promise<DrugMonograph | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*, drug_class_info:drug_classes(name)')
      .eq('id', id)
      .single();
    if (error) return null;
    return data ? mapRow(data) : null;
  },

  async getByName(name: string): Promise<DrugMonograph | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*, drug_class_info:drug_classes(name)')
      .ilike('name', name)
      .single();
    if (error) return null;
    return data ? mapRow(data) : null;
  },

  async search(query: string): Promise<DrugMonograph[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*, drug_class_info:drug_classes(name)')
      .or(`name.ilike.%${query}%,generic_name.ilike.%${query}%`)
      .order('name');
    if (error) throw error;
    return (data ?? []).map(mapRow);
  },

  async searchByIndication(indication: string): Promise<DrugMonograph[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*, drug_class_info:drug_classes(name)')
      .contains('indications', [indication])
      .order('name');
    if (error) throw error;
    return (data ?? []).map(mapRow);
  },

  async getByDrugClass(drugClass: string): Promise<DrugMonograph[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*, drug_class_info:drug_classes(name)')
      .ilike('drug_class_info.name', `%${drugClass}%`)
      .order('name');
    if (error) throw error;
    return (data ?? []).map(mapRow);
  },

  async getInteractingDrugs(drugName: string): Promise<{ drug: DrugMonograph; interactions: string[] }[]> {
    const monograph = await DrugMonographService.getByName(drugName);
    if (!monograph) return [];

    const allDrugs = await DrugMonographService.getAll();
    const results: { drug: DrugMonograph; interactions: string[] }[] = [];

    for (const other of allDrugs) {
      if (other.id === monograph.id) continue;
      const relevant = other.interactions.filter(i =>
        i.toLowerCase().includes(monograph.name.toLowerCase())
      );
      if (relevant.length > 0) {
        results.push({ drug: other, interactions: relevant });
      }
    }

    return results;
  },

  // ── Saved Monographs ──────────────────────────────────────────

  async saveMonograph(monographId: string, opts?: { notes?: string; tags?: string[] }): Promise<boolean> {
    if (!supabase) return false;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('user_monographs')
      .upsert({
        user_id: user.id,
        monograph_id: monographId,
        notes: opts?.notes ?? null,
        tags: opts?.tags ?? [],
      }, { onConflict: 'user_id,monograph_id' });

    return !error;
  },

  async removeSavedMonograph(monographId: string): Promise<boolean> {
    if (!supabase) return false;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('user_monographs')
      .delete()
      .eq('user_id', user.id)
      .eq('monograph_id', monographId);

    return !error;
  },

  async getUserMonographs(opts?: {
    search?: string;
    tag?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: UserMonograph[]; total: number }> {
    if (!supabase) return { items: [], total: 0 };
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { items: [], total: 0 };

    const page = opts?.page ?? 1;
    const pageSize = opts?.pageSize ?? 24;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('user_monographs')
      .select('*, monograph:drug_monographs(*, drug_class_info:drug_classes(name))', { count: 'exact' })
      .eq('user_id', user.id);

    if (opts?.tag) {
      query = query.contains('tags', [opts.tag]);
    }

    if (opts?.search) {
      const s = `%${opts.search}%`;
      query = query.or(`notes.ilike.${s}`);
    }

    const { data, count, error } = await query
      .order('saved_at', { ascending: false })
      .range(from, to);

    if (error) return { items: [], total: 0 };

    return {
      items: (data ?? []).map((r: any) => ({
        id: r.id,
        user_id: r.user_id,
        monograph_id: r.monograph_id,
        saved_at: r.saved_at,
        notes: r.notes,
        tags: r.tags ?? [],
        monograph: r.monograph ? mapRow(r.monograph) : undefined,
      })),
      total: count ?? 0,
    };
  },

  async isMonographSaved(monographId: string): Promise<boolean> {
    if (!supabase) return false;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from('user_monographs')
      .select('id')
      .eq('user_id', user.id)
      .eq('monograph_id', monographId)
      .maybeSingle();

    return data !== null;
  },

  async saveMonographWithDetails(monographId: string): Promise<UserMonograph | null> {
    const ok = await DrugMonographService.saveMonograph(monographId);
    if (!ok) return null;

    const { items } = await DrugMonographService.getUserMonographs({ pageSize: 1 });
    return items[0] ?? null;
  },
};
