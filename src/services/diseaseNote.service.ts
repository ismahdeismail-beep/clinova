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
    let liveNotes: DiseaseNote[] = []
    if (supabase) {
      const { data, error } = await supabase
        .from('disease_notes')
        .select('*')
        .eq('unit_id', unitId)
      if (!error && data) {
        liveNotes = data.map(mapRow)
      } else {
        console.warn('[DiseaseNoteService] Supabase fetch failed, using local fallback:', error?.message)
      }
    }
    if (liveNotes.length > 0) return liveNotes
    return DISEASE_NOTES.filter((n) => n.unitId === unitId)
  },

  async getNoteById(id: string): Promise<DiseaseNote | null> {
    if (supabase) {
      const { data, error } = await supabase
        .from('disease_notes')
        .select('*')
        .eq('id', id)
        .maybeSingle()
      if (!error && data) return mapRow(data)
    }
    return DISEASE_NOTES.find((n) => n.id === id) ?? null
  },

  async getAllNotes(): Promise<DiseaseNote[]> {
    let liveNotes: DiseaseNote[] = []
    if (supabase) {
      const { data, error } = await supabase
        .from('disease_notes')
        .select('*')
        .order('name', { ascending: true })
      if (!error && data) {
        liveNotes = data.map(mapRow)
      } else {
        console.warn('[DiseaseNoteService] Supabase fetch failed, using local fallback:', error?.message)
      }
    }
    if (liveNotes.length > 0) return liveNotes
    return DISEASE_NOTES
  },
}

export default DiseaseNoteService
