import { supabase } from '../lib/supabase';

export interface DrugMonograph {
  id: string;
  name: string;
  generic_name: string;
  drug_class: string;
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
  return {
    id: row.id,
    name: row.name,
    generic_name: row.generic_name,
    drug_class: row.drug_class,
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

export const DrugMonographService = {
  async getAll(): Promise<DrugMonograph[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*')
      .order('name');
    if (error) throw error;
    return (data ?? []).map(mapRow);
  },

  async getById(id: string): Promise<DrugMonograph | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return null;
    return data ? mapRow(data) : null;
  },

  async getByName(name: string): Promise<DrugMonograph | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*')
      .ilike('name', name)
      .single();
    if (error) return null;
    return data ? mapRow(data) : null;
  },

  async search(query: string): Promise<DrugMonograph[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*')
      .or(`name.ilike.%${query}%,generic_name.ilike.%${query}%,drug_class.ilike.%${query}%`)
      .order('name');
    if (error) throw error;
    return (data ?? []).map(mapRow);
  },

  async searchByIndication(indication: string): Promise<DrugMonograph[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*')
      .contains('indications', [indication])
      .order('name');
    if (error) throw error;
    return (data ?? []).map(mapRow);
  },

  async getByDrugClass(drugClass: string): Promise<DrugMonograph[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*')
      .ilike('drug_class', `%${drugClass}%`)
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
};
