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
  return data || []
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
  return data || []
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

  const { data: sourceData, error: sourceErr } = await client
    .from('drug_images')
    .select('source')
    .limit(5000)

  const bySource: Record<string, number> = {}
  if (!sourceErr && sourceData) {
    for (const row of sourceData) {
      const src = row.source || 'unknown'
      bySource[src] = (bySource[src] || 0) + 1
    }
  }

  const { data: drugData, error: drugErr } = await client
    .from('drug_images')
    .select('drug_id')
    .limit(5000)

  const uniqueDrugs = drugErr ? 0 : new Set(drugData?.map((r: any) => r.drug_id)).size

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
  const { data: allDrugs } = await client
    .from('drug_monographs')
    .select('id, name, generic_name')
    .limit(5000)

  if (!allDrugs) return []

  const drugsWithImages = new Set()
  const { data: imageDrugs } = await client
    .from('drug_images')
    .select('drug_id')
    .limit(10000)

  if (imageDrugs) {
    for (const row of imageDrugs) {
      drugsWithImages.add(row.drug_id)
    }
  }

  const missing = allDrugs
    .filter((d: any) => !drugsWithImages.has(d.id))
    .map((d: any) => d.generic_name || d.name || d.id)

  return missing
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
