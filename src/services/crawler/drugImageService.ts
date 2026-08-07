import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { DrugImage, CrawlStatistics } from '../../types/crawler'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

function getAdminClient(): SupabaseClient | null {
  if (!SUPABASE_URL) return null
  // Prefer the service role key; fall back to the anon key for read-only
  // endpoints (RLS allows public SELECT on drug_images).
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY
  if (!key) return null
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false } })
}

// Gallery ordering: the same source-tier preference used for card icons, so
// the 3D/PDB render leads the gallery, then real packaging/product photos,
// then 2D skeletal structures, then generic photos. Within a tier the
// highest-quality image wins; newest breaks ties.
function imagePriority(r: any): number {
  const s = String(r.source || '').toLowerCase()
  if (s.includes('3d') || s.includes('pdb') || s.includes('ribbon')) return 0
  if (s.includes('kenyan brand') || s.includes('dailymed') || s.includes('wikipedia')) return 1
  if (s.includes('2d') || s.includes('structure')) return 2
  return 3
}

function sortByPriority(rows: DrugImage[]): DrugImage[] {
  return [...rows].sort((a, b) => {
    const pa = imagePriority(a)
    const pb = imagePriority(b)
    if (pa !== pb) return pa - pb
    const qa = Number(a.quality_score) || 0
    const qb = Number(b.quality_score) || 0
    if (qa !== qb) return qb - qa
    return String(b.created_at || '').localeCompare(String(a.created_at || ''))
  })
}

export async function getImagesForDrug(drugId: string): Promise<DrugImage[]> {
  const client = getAdminClient()
  if (!client) return []
  const { data, error } = await client
    .from('drug_images')
    .select('*')
    .eq('drug_id', drugId)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('Failed to fetch drug images:', error)
    return []
  }
  return sortByPriority(data || [])
}

export async function searchImages(query: string): Promise<DrugImage[]> {
  const client = getAdminClient()
  if (!client) return []
  if (!query.trim()) {
    const { data, error } = await client
      .from('drug_images')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    if (error) return []
    return data || []
  }

  const q = `%${query}%`
  const { data, error } = await client
    .from('drug_images')
    .select('*')
    .or(`generic_name.ilike.${q},dosage_form.ilike.${q}`)
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) {
    console.error('Failed to search images:', error)
    return []
  }
  return sortByPriority(data || [])
}

export async function getImageStats(): Promise<CrawlStatistics> {
  const client = getAdminClient()
  if (!client) return { total_images: 0, verified_images: 0, rejected_images: 0, unique_drugs: 0, by_source: {} }

  const { count: total, error: totalErr } = await client
    .from('drug_images')
    .select('*', { count: 'exact', head: true })
  if (totalErr) return defaultStats()

  const { count: verified } = await client
    .from('drug_images')
    .select('*', { count: 'exact', head: true })
    .eq('verified', true)

  const { count: rejected } = await client
    .from('drug_images')
    .select('*', { count: 'exact', head: true })
    .not('rejection_reason', 'is', null)
    .neq('rejection_reason', '')

  // PostgREST caps a single request at 1000 rows — paginate to cover the full
  // table instead of sampling only the first page.
  const sourceData = await fetchAllRows(client, 'drug_images', 'source')
  const bySource: Record<string, number> = {}
  for (const row of sourceData) {
    const src = row.source || 'unknown'
    bySource[src] = (bySource[src] || 0) + 1
  }

  const drugData = await fetchAllRows(client, 'drug_images', 'drug_id')
  const uniqueDrugs = new Set(drugData.map((r: any) => r.drug_id)).size

  return {
    total_images: total || 0,
    verified_images: verified || 0,
    rejected_images: rejected || 0,
    unique_drugs: uniqueDrugs,
    by_source: bySource,
  }
}

export async function getMissingDrugs(): Promise<string[]> {
  const client = getAdminClient()
  if (!client) return []

  const allDrugs = await fetchAllRows(client, 'drug_monographs', 'id, name, generic_name')
  const imageDrugs = await fetchAllRows(client, 'drug_images', 'drug_id')

  const drugsWithImages = new Set(imageDrugs.map((r: any) => r.drug_id))
  return allDrugs
    .filter((d: any) => !drugsWithImages.has(d.id))
    .map((d: any) => d.generic_name || d.name || d.id)
}

// PostgREST caps a single request at 1000 rows — page through the table so
// counts and sets cover the full dataset (3525+ image rows, 1072 monographs).
async function fetchAllRows(
  client: SupabaseClient,
  table: string,
  cols: string,
  step = 1000,
): Promise<any[]> {
  const rows: any[] = []
  let from = 0
  for (let i = 0; i < 100; i++) {
    const { data, error } = await client.from(table as any).select(cols).range(from, from + step - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    rows.push(...data)
    from += step
    if (data.length < step) break
  }
  return rows
}

export async function verifyImage(id: string): Promise<boolean> {
  const client = getAdminClient()
  if (!client) return false
  const { error } = await client
    .from('drug_images')
    .update({ verified: true })
    .eq('id', id)
  return !error
}

export async function deleteImage(id: string): Promise<boolean> {
  const client = getAdminClient()
  if (!client) return false
  const { error } = await client
    .from('drug_images')
    .delete()
    .eq('id', id)
  return !error
}

function defaultStats(): CrawlStatistics {
  return { total_images: 0, verified_images: 0, rejected_images: 0, unique_drugs: 0, by_source: {} }
}
