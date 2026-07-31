import { supabase } from '../../lib/supabase'
import type { DrugImage, CrawlStatistics } from '../../types/crawler'

function getAdminClient() {
  if (!supabase) return null
  return supabase
}

export async function getImagesForDrug(drugId: string): Promise<DrugImage[]> {
  if (!supabase) return []
  const { data, error } = await supabase
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
  if (!supabase) return []
  if (!query.trim()) {
    const { data, error } = await supabase
      .from('drug_images')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    if (error) return []
    return data || []
  }

  const q = `%${query}%`
  const { data, error } = await supabase
    .from('drug_images')
    .select('*')
    .or(`generic_name.ilike.${q},dosage_form.ilike.${q},title.ilike.${q}`)
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) {
    console.error('Failed to search images:', error)
    return []
  }
  return data || []
}

export async function getImageStats(): Promise<CrawlStatistics> {
  if (!supabase) return { total_images: 0, verified_images: 0, rejected_images: 0, unique_drugs: 0, by_source: {} }

  const { count: total, error: totalErr } = await supabase
    .from('drug_images')
    .select('*', { count: 'exact', head: true })
  if (totalErr) return defaultStats()

  const { count: verified } = await supabase
    .from('drug_images')
    .select('*', { count: 'exact', head: true })
    .eq('verified', true)

  const { count: rejected } = await supabase
    .from('drug_images')
    .select('*', { count: 'exact', head: true })
    .not('rejection_reason', 'is', null)
    .neq('rejection_reason', '')

  const { data: sourceData, error: sourceErr } = await supabase
    .from('drug_images')
    .select('source')
    .limit(1000)

  const bySource: Record<string, number> = {}
  if (!sourceErr && sourceData) {
    for (const row of sourceData) {
      const src = row.source || 'unknown'
      bySource[src] = (bySource[src] || 0) + 1
    }
  }

  const { data: drugData, error: drugErr } = await supabase
    .from('drug_images')
    .select('drug_id')
    .limit(1000)

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
  if (!supabase) return []
  const { data: allDrugs } = await supabase
    .from('drug_monographs')
    .select('id, name, generic_name')
    .limit(1000)

  if (!allDrugs) return []

  const drugsWithImages = new Set()
  const { data: imageDrugs } = await supabase
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
  if (!supabase) return false
  const { error } = await supabase
    .from('drug_images')
    .update({ verified: true })
    .eq('id', id)
  return !error
}

export async function deleteImage(id: string): Promise<boolean> {
  if (!supabase) return false
  const { error } = await supabase
    .from('drug_images')
    .delete()
    .eq('id', id)
  return !error
}

function defaultStats(): CrawlStatistics {
  return { total_images: 0, verified_images: 0, rejected_images: 0, unique_drugs: 0, by_source: {} }
}
