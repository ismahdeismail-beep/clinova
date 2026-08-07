import { supabase } from '../lib/supabase'
import { BUNDLED_DRUGS } from '../data/drugIndexData'

// ── Static fallback index ──────────────────────────────────────────
// The bundled index holds ~513 drugs (149 original + 364 AI-enriched).
// Methods below try Supabase first, then fall back to this static data.
// ───────────────────────────────────────────────────────────────────

const STATIC_BY_NAME = new Map<string, DrugMonograph>()
const STATIC_BY_ID = new Map<string, DrugMonograph>()
const STATIC_ALL: DrugMonograph[] = []

function buildStaticIndex() {
  if (STATIC_ALL.length > 0) return
  for (const d of BUNDLED_DRUGS) {
    const key = d.name.toLowerCase().trim()
    STATIC_BY_NAME.set(key, d)
    STATIC_BY_ID.set(d.id, d)
    STATIC_ALL.push(d)
  }
}
buildStaticIndex()

// ── Thumbnail index (3D structure first) ──────────────────────────
// Every monograph gets a best-image icon from drug_images. Preference order:
// 3D renders (PubChem conformers, PDB/PDBe ribbons) → 2D structures → photos.
// Loaded once per session and cached so list renders are instant.
let thumbCache: Map<string, string> | null = null
let thumbFetching: Promise<Map<string, string>> | null = null

function thumbPriority(r: any): number {
  const s = String(r.source || '').toLowerCase()
  // Note: there is no 'kind' column in the live drug_images table — the
  // crawler folds the classification into the descriptive `source` string
  // (e.g. "PubChem (NIH) 3D conformer", "Wikimedia Commons (structure)",
  // "Kenyan brand (Lab & Allied)"), so priority is derived from that.
  // 3D renderings are the ideal icon — molecule structure at a glance
  if (s.includes('3d') || s.includes('pdb') || s.includes('ribbon')) return 0
  // Real product / packaging photos show the actual drug name
  if (s.includes('kenyan brand') || s.includes('dailymed') || s.includes('wikipedia')) return 1
  // 2D skeletal structures (chemical formula)
  if (s.includes('2d') || s.includes('structure')) return 2
  // Generic photos (may be blurry or generic)
  return 3
}

async function loadThumbnails(): Promise<Map<string, string>> {
  if (thumbCache) return thumbCache
  if (thumbFetching) return thumbFetching
  thumbFetching = (async (): Promise<Map<string, string>> => {
    const map = new Map<string, { url: string; priority: number; quality: number; storage: boolean }>()
    if (!supabase) return new Map<string, string>()
    let from = 0
    for (let i = 0; i < 80; i++) {
      const { data } = await supabase
        .from('drug_images')
        .select('drug_id, source, thumbnail_url, large_url, quality_score')
        .range(from, from + 999)
      if (!data || data.length === 0) break
      for (const r of data) {
        const url = r.thumbnail_url || r.large_url
        if (!url) continue
        const cur = map.get(r.drug_id)
        const priority = thumbPriority(r)
        // Tie-break within the same source tier: prefer the higher-quality
        // image so weak generic photos don't beat clean structure renders.
        const quality = Number(r.quality_score) || 0
        // Storage copies are our own re-uploads — always live. Legacy rows
        // kept the raw upload.wikimedia.org URL, which browsers get 429'd
        // on, so a storage copy wins over an external URL at equal priority.
        const storage = url.includes('supabase.co/storage')
        if (cur) {
          if (priority > cur.priority) continue
          if (priority === cur.priority) {
            if (storage && !cur.storage) {
              // prefer the storage copy — fall through to replace
            } else if (cur.storage && !storage) continue
            else if (quality <= cur.quality) continue
          }
        }
        map.set(r.drug_id, { url, priority, quality, storage })
      }
      from += 1000
      if (data.length < 1000) break
    }
    const out = new Map<string, string>()
    for (const [id, v] of map) out.set(id, v.url)
    thumbCache = out
    return out
  })().finally(() => {
    thumbFetching = null
  })
  return thumbFetching
}

async function attachThumbnails(rows: DrugMonograph[]): Promise<DrugMonograph[]> {
  if (rows.length === 0) return rows
  try {
    const map = await loadThumbnails()
    return rows.map((r) => ({
      ...r,
      thumbnail_url: map.get(r.id) ?? '',
    }))
  } catch {
    return rows
  }
}

/** Attach the best thumbnail to a single monograph (session-cached map). */
async function attachThumbnail(row: DrugMonograph): Promise<DrugMonograph> {
  try {
    const map = await loadThumbnails()
    return { ...row, thumbnail_url: map.get(row.id) ?? '' }
  } catch {
    return row
  }
}

/** Best 3D-first thumbnail for a single monograph (session-cached). */
export async function getDrugThumbnail(drugId: string): Promise<string | null> {
  try {
    const map = await loadThumbnails()
    return map.get(drugId) ?? null
  } catch {
    return null
  }
}

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
  /** Mechanism of action – molecular target, pharmacological action, clinical effect */
  mechanism_of_action?: string;
  /** Common brand names – Kenyan and international */
  brand_names?: string[];
  /** FDA/USP pregnancy category (A, B, C, D, X, N) */
  pregnancy_category?: string;
  /** Key warnings and precautions (e.g. pregnancy, lactation, G6PD, special populations) */
  warnings?: string[];
  /** Overdose management – symptoms, antidote, supportive care */
  overdose?: string;
  /** Pharmacokinetics – absorption, distribution, metabolism, excretion, half-life */
  pharmacokinetics?: string;
  /** Black box warnings */
  black_box_warnings?: string[];
  /** Clinical pearls and practice tips */
  clinical_pearls?: string[];
  created_at?: string;
  /** Best available gallery image for list icons — 3D structures preferred */
  thumbnail_url?: string;
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
    mechanism_of_action: row.mechanism_of_action ?? undefined,
    brand_names: row.brand_names ?? undefined,
    pregnancy_category: row.pregnancy_category ?? undefined,
    warnings: row.warnings ?? undefined,
    overdose: row.overdose ?? undefined,
    pharmacokinetics: row.pharmacokinetics ?? undefined,
    black_box_warnings: row.black_box_warnings ?? undefined,
    clinical_pearls: row.clinical_pearls ?? undefined,
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

/** Search the static index by name or generic_name */
function searchStatic(q: string): DrugMonograph[] {
  if (!q) return STATIC_ALL
  return STATIC_ALL.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.generic_name.toLowerCase().includes(q),
  )
}

// PostgREST caps a single request at 1000 rows — page through the results so
// lists are complete (the 1,072-drug catalog used to silently drop its last
// 72 entries because only the first page was fetched).
async function paginate<T>(
  build: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: any }>,
): Promise<T[]> {
  const all: T[] = []
  let from = 0
  for (let i = 0; i < 50; i++) {
    const { data, error } = await build(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
    if (data.length < 1000) break
  }
  return all
}

export const DrugMonographService = {
  /**
   * Fast catalog fetch for the KDI browse grid — only the fields needed for
   * category grouping, display, and hasClinicalContent checks. Thumbnails are
   * loaded in parallel so the grid renders without waiting for the full drug
   * payload (which includes long text fields like monitoring text).
   */
  async getCatalog(): Promise<DrugMonograph[]> {
    if (!supabase) return STATIC_ALL;
    const [drugRows, thumbs] = await Promise.all([
      paginate<any>((from, to) =>
        supabase!
          .from('drug_monographs')
          // drug_class_name is NOT a column — derive it from the drug_classes
          // join (selecting the raw name previously 400'd and silently fell
          // back to the static bundle, hiding the live catalog from the grid).
          .select('id,name,generic_name,brand_names,drug_class,drug_class_id,drug_class_info:drug_classes(name),indications,side_effects,contraindications,monitoring,interactions')
          .order('name')
          .range(from, to),
      ),
      loadThumbnails(),
    ]);
    const rows = drugRows.map(mapRow);
    if (rows.length === 0) return STATIC_ALL;
    return rows.map((r) => ({ ...r, thumbnail_url: thumbs.get(r.id) ?? '' }));
  },

  async getAll(): Promise<DrugMonograph[]> {
    if (!supabase) return STATIC_ALL;
    const rows = (await paginate<any>((from, to) =>
      supabase!
        .from('drug_monographs')
        .select('*, drug_class_info:drug_classes(name)')
        .order('name')
        .range(from, to),
    )).map(mapRow);
    return rows.length > 0 ? attachThumbnails(rows) : STATIC_ALL;
  },

  async getById(id: string): Promise<DrugMonograph | null> {
    if (!supabase) return STATIC_BY_ID.get(id) ?? null;
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*, drug_class_info:drug_classes(name)')
      .eq('id', id)
      .single();
    if (error) return STATIC_BY_ID.get(id) ?? null;
    return data ? attachThumbnail(mapRow(data)) : STATIC_BY_ID.get(id) ?? null;
  },

  async getByName(name: string): Promise<DrugMonograph | null> {
    if (!supabase) return STATIC_BY_NAME.get(name.toLowerCase().trim()) ?? null;
    const { data, error } = await supabase
      .from('drug_monographs')
      .select('*, drug_class_info:drug_classes(name)')
      .ilike('name', name)
      .single();
    if (error) return STATIC_BY_NAME.get(name.toLowerCase().trim()) ?? null;
    return data ? attachThumbnail(mapRow(data)) : STATIC_BY_NAME.get(name.toLowerCase().trim()) ?? null;
  },

  async search(query: string): Promise<DrugMonograph[]> {
    const q = query.toLowerCase().trim()
    if (!supabase) return searchStatic(q);

    const rows = (await paginate<any>((from, to) =>
      supabase!
        .from('drug_monographs')
        .select('*, drug_class_info:drug_classes(name)')
        .or(`name.ilike.%${query}%,generic_name.ilike.%${query}%`)
        .order('name')
        .range(from, to),
    )).map(mapRow);
    return rows.length > 0 ? attachThumbnails(rows) : searchStatic(q);
  },

  async searchByIndication(indication: string): Promise<DrugMonograph[]> {
    const ind = indication.toLowerCase()
    if (!supabase) return STATIC_ALL.filter((d) => d.indications.some((i) => i.toLowerCase().includes(ind)))

    const rows = (await paginate<any>((from, to) =>
      supabase!
        .from('drug_monographs')
        .select('*, drug_class_info:drug_classes(name)')
        .contains('indications', [indication])
        .order('name')
        .range(from, to),
    )).map(mapRow);
    return rows.length > 0 ? attachThumbnails(rows) : STATIC_ALL.filter((d) => d.indications.some((i) => i.toLowerCase().includes(ind)))
  },

  async getByDrugClass(drugClass: string): Promise<DrugMonograph[]> {
    const dc = drugClass.toLowerCase()
    if (!supabase) return STATIC_ALL.filter((d) => d.drug_class.toLowerCase().includes(dc) || d.drug_class_name.toLowerCase().includes(dc))

    const rows = (await paginate<any>((from, to) =>
      supabase!
        .from('drug_monographs')
        .select('*, drug_class_info:drug_classes(name)')
        .ilike('drug_class_info.name', `%${drugClass}%`)
        .order('name')
        .range(from, to),
    )).map(mapRow);
    return rows.length > 0 ? attachThumbnails(rows) : STATIC_ALL.filter((d) => d.drug_class.toLowerCase().includes(dc) || d.drug_class_name.toLowerCase().includes(dc))
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

    // Attach the best 3D-first thumbnail to every saved monograph so library
    // icons render images (mapRow alone can't — drug_monographs has no
    // thumbnail column; the thumbs live in drug_images).
    const thumbs = await loadThumbnails();
    const items = (data ?? []).map((r: any) => ({
      id: r.id,
      user_id: r.user_id,
      monograph_id: r.monograph_id,
      saved_at: r.saved_at,
      notes: r.notes,
      tags: r.tags ?? [],
      monograph: r.monograph
        ? { ...mapRow(r.monograph), thumbnail_url: thumbs.get(r.monograph_id) ?? '' }
        : undefined,
    }));

    return {
      items,
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
