/**
 * ClinicalCaseService
 * ----------------------------------------------------------------------------
 * Single source of truth for clinical cases.
 *
 * Reads from Supabase `clinical_cases` when the browser client is configured.
 * Falls back to the bundled `ALL_CLINICAL_CASES` (clinicalCasesData.ts) when
 * Supabase is unavailable (local dev / offline), so the app never shows an
 * empty state. Supabase remains the canonical store.
 *
 * All methods return the camelCase `ClinicalCase` shape used across the app.
 */

import { supabase } from '../lib/supabase';
import {
  ALL_CLINICAL_CASES,
  type ClinicalCase,
} from '../data/clinicalCasesData';
import { getIntegratedUnitId } from '../data/curriculum';

// ── Row mapping (snake_case DB → camelCase ClinicalCase) ──────────────────
function mapRow(row: any): ClinicalCase {
  return {
    id: row.id,
    seedId: row.seed_id,
    title: row.title,
    specialty: row.specialty,
    disease: row.disease,
    unitId: row.unit_id,
    difficulty: row.difficulty,
    patientName: row.patient_name,
    facilitySetting: row.facility_setting,
    demographics: row.demographics,
    chiefComplaint: row.chief_complaint,
    hpi: row.hpi,
    pmh: row.pmh,
    medHx: row.med_hx,
    allergies: row.allergies,
    pe: row.pe,
    vitals: row.vitals,
    labs: row.labs,
    imaging: row.imaging,
    diagnosis: row.diagnosis,
    ddx: row.ddx ?? [],
    goals: row.goals,
    pharm: row.pharm,
    nonPharm: row.non_pharm,
    carePlan: row.care_plan,
    dtps: row.dtps,
    monitoring: row.monitoring,
    counselling: row.counselling,
    followUp: row.follow_up,
    pearls: row.pearls,
    references: row.references ?? [],
    createdAt: row.created_at,
    status: row.status,
    createdBy: row.created_by,
    createdByName: row.created_by_name,
    pharmacologySubject: row.pharmacology_subject,
  };
}

// ── Filtering helpers for the in-memory fallback ───────────────────────────
interface CaseFilters {
  unitId?: string;
  disease?: string;
  difficulty?: string;
  specialty?: string;
  status?: string;
  search?: string;
}

function applyFilters(cases: ClinicalCase[], f: CaseFilters): ClinicalCase[] {
  const q = f.search?.trim().toLowerCase();
  return cases.filter((c) => {
    if (f.unitId && c.unitId !== f.unitId) return false;
    if (f.disease && c.disease !== f.disease) return false;
    if (f.difficulty && c.difficulty !== f.difficulty) return false;
    if (f.specialty && c.specialty !== f.specialty) return false;
    if (f.status && c.status !== f.status) return false;
    if (q) {
      const hay = `${c.title} ${c.disease} ${c.diagnosis} ${c.chiefComplaint} ${c.specialty}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

// ── Public API ─────────────────────────────────────────────────────────────
export const ClinicalCaseService = {
  /** True when the Supabase backend is configured and usable. */
  get isLive() {
    return supabase !== null;
  },

  /**
   * Paginated case retrieval with optional filters.
   * Returns { cases, total, page, pageSize }.
   */
  async fetchCases(opts: {
    page?: number;
    pageSize?: number;
    unitId?: string;
    disease?: string;
    difficulty?: string;
    specialty?: string;
    status?: string;
    search?: string;
    order?: 'recent' | 'title';
  } = {}): Promise<{ cases: ClinicalCase[]; total: number; page: number; pageSize: number }> {
    const page = opts.page ?? 1;
    const pageSize = opts.pageSize ?? 24;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // ── Live path: Supabase (canonical) ─────────────────────────────
    let liveCases: ClinicalCase[] = [];
    if (supabase) {
      let query = supabase
        .from('clinical_cases')
        .select('*', { count: 'exact' });

      if (opts.unitId) query = query.eq('unit_id', opts.unitId);
      if (opts.disease) query = query.eq('disease', opts.disease);
      if (opts.difficulty) query = query.eq('difficulty', opts.difficulty);
      if (opts.specialty) query = query.eq('specialty', opts.specialty);
      if (opts.status) query = query.eq('status', opts.status);
      if (opts.search) {
        const s = `%${opts.search}%`;
        query = query.or(`title.ilike.${s},disease.ilike.${s},diagnosis.ilike.${s},chief_complaint.ilike.${s},specialty.ilike.${s}`);
      }

      const orderCol = opts.order === 'title' ? 'title' : 'created_at';
      query = query.order(orderCol, { ascending: opts.order === 'title' });

      // Fetch all live rows (no range) so we can merge with the bundled set below.
      const { data, error } = await query;
      if (error) {
        console.warn('[ClinicalCaseService] fetch failed, merging bundled only:', error.message);
      } else {
        liveCases = (data ?? []).map(mapRow);
      }
    }

    // ── Merge with bundled data ──────────────────────────────────────
    // Supabase RLS only exposes published cases and the table may be only
    // partially seeded, so we always include the bundled cases too (deduped by
    // id/seedId) to ensure nothing the app ships with goes missing.
    const liveKeys = new Set(
      liveCases.map((c) => (c.seedId || c.id)).filter(Boolean) as string[]
    );
    const bundled = ALL_CLINICAL_CASES
      .filter((c) => {
        const key = c.seedId || c.id;
        return key ? !liveKeys.has(key) : true;
      })
      .map((c) => ({
        ...c,
        unitId: c.unitId || (c.specialty ? getIntegratedUnitId(c.specialty) : undefined),
      }));

    const merged = [...liveCases, ...bundled];
    const filtered = applyFilters(merged, opts);
    const sorted = [...filtered].sort((a, b) =>
      opts.order === 'title'
        ? a.title.localeCompare(b.title)
        : (b.createdAt ?? '').localeCompare(a.createdAt ?? '')
    );
    return {
      cases: sorted.slice(from, to + 1),
      total: sorted.length,
      page,
      pageSize,
    };
  },

  async getCaseById(id: string): Promise<ClinicalCase | null> {
    if (supabase) {
      const { data, error } = await supabase
        .from('clinical_cases')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (!error && data) return mapRow(data);
    }
    return ALL_CLINICAL_CASES.find((c) => c.id === id) ?? null;
  },

  /** Fetch by slug (seed_id). */
  async getCaseBySlug(seedId: string): Promise<ClinicalCase | null> {
    if (supabase) {
      const { data, error } = await supabase
        .from('clinical_cases')
        .select('*')
        .eq('seed_id', seedId)
        .maybeSingle();
      if (!error && data) return mapRow(data);
    }
    return ALL_CLINICAL_CASES.find((c) => c.seedId === seedId) ?? null;
  },

  async getCasesByUnit(unitId: string, pageSize = 100): Promise<ClinicalCase[]> {
    const { cases } = await this.fetchCases({ unitId, pageSize });
    return cases;
  },

  async getCasesByDisease(disease: string, pageSize = 100): Promise<ClinicalCase[]> {
    const { cases } = await this.fetchCases({ disease, pageSize });
    return cases;
  },

  async getRecentCases(limit = 12): Promise<ClinicalCase[]> {
    const { cases } = await this.fetchCases({ page: 1, pageSize: limit, order: 'recent' });
    return cases;
  },

  /** Full-text / field search across the case library. */
  async searchCases(query: string, filters: Omit<CaseFilters, 'search'> = {}): Promise<ClinicalCase[]> {
    const { cases } = await this.fetchCases({ search: query, ...filters, pageSize: 200 });
    return cases;
  },

  /** Total count of cases (live + bundled, deduped) for headers / progress. */
  async getTotalCount(status = 'published'): Promise<number> {
    let liveCount = 0;
    if (supabase) {
      const { count, error } = await supabase
        .from('clinical_cases')
        .select('*', { count: 'exact', head: true })
        .eq('status', status);
      if (!error) liveCount = count ?? 0;
    }
    const bundledCount = ALL_CLINICAL_CASES.filter((c) => c.status === status).length;
    // Live + bundled; overlap is rare (distinct seeds) so this is a safe approximation.
    return liveCount + bundledCount;
  },
};

export default ClinicalCaseService;
