import { supabase } from '../lib/supabase'
import { DISEASE_NOTES, type DiseaseNote } from '../data/diseaseNotes'

function mapRow(row: any): DiseaseNote {
  return {
    id: row.id,
    name: row.name,
    unitId: row.unit_id,
    specialty: row.specialty,
    overview: row.overview,
    kenyaContext: row.kenya_context ?? undefined,
    pathophysiology: row.pathophysiology ?? undefined,
    diagram: row.diagram ?? undefined,
    keyDrugs: row.key_drugs ?? [],
    monitoring: row.monitoring ?? '',
    mcqs: row.mcqs ?? [],
  }
}

export const DiseaseNoteService = {
  get isLive() {
    return supabase !== null
  },

  async getNotesByUnit(unitId: string): Promise<DiseaseNote[]> {
    // Local DISEASE_NOTES is the complete, curated source (includes all
    // extended fields). Prefer it; only fall back to Supabase when a unit
    // has no local notes (e.g. future server-authored content).
    const local = DISEASE_NOTES.filter((n) => n.unitId === unitId)
    if (local.length > 0) return local

    if (supabase) {
      const { data, error } = await supabase
        .from('disease_notes')
        .select('*')
        .eq('unit_id', unitId)
      if (!error && data && data.length > 0) {
        return data.map(mapRow)
      }
    }
    return []
  },

  async getNoteById(id: string): Promise<DiseaseNote | null> {
    const local = DISEASE_NOTES.find((n) => n.id === id)
    if (local) return local

    if (supabase) {
      const { data, error } = await supabase
        .from('disease_notes')
        .select('*')
        .eq('id', id)
        .maybeSingle()
      if (!error && data) return mapRow(data)
    }
    return null
  },

  async getAllNotes(): Promise<DiseaseNote[]> {
    if (DISEASE_NOTES.length > 0) return DISEASE_NOTES

    if (supabase) {
      const { data, error } = await supabase
        .from('disease_notes')
        .select('*')
        .order('name', { ascending: true })
      if (!error && data && data.length > 0) {
        return data.map(mapRow)
      }
    }
    return []
  },
}

export default DiseaseNoteService
