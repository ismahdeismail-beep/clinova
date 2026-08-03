// Content stats hook — single source of truth for the "how many X" figures
// shown on the Landing and Dashboard pages.
//
// Rule (derived counts): never hardcode. The displayed number comes from the
// live Supabase row count when available, is cached in localStorage so repeat
// visits render instantly with no flicker, and falls back to the bundled local
// data counts only while the first fetch is in flight / offline.
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { BUNDLED_DRUGS } from '../data/drugIndexData'
import { ALL_CLINICAL_CASES } from '../data/clinicalCasesData'
import { getAllCarePlanDiseases } from '../data/carePlanData'
import { INTEGRATED_UNITS_MAP } from '../data/curriculum'

const CASE_KEY = 'clinova_stat_cases'
const DRUG_KEY = 'clinova_stat_drugs'
const AREA_KEY = 'clinova_stat_areas'

function readCache(key: string): number | null {
  try {
    const v = localStorage.getItem(key)
    return v ? Number(v) : null
  } catch {
    return null
  }
}

function writeCache(key: string, n: number) {
  try {
    localStorage.setItem(key, String(n))
  } catch {
    /* ignore */
  }
}

export interface ContentStats {
  drugCount: number | null
  caseCount: number | null
  areaCount: number
  carePlanCount: number
  /** true until the first DB fetch resolves (or supabase is unavailable) */
  loading: boolean
}

export function useContentStats(): ContentStats {
  const [drugCount, setDrugCount] = useState<number | null>(() => readCache(DRUG_KEY))
  const [caseCount, setCaseCount] = useState<number | null>(() => readCache(CASE_KEY))
  const [areaCount, setAreaCount] = useState<number>(() => readCache(AREA_KEY) ?? Object.keys(INTEGRATED_UNITS_MAP).length)
  const [loading, setLoading] = useState<boolean>(drugCount === null || caseCount === null)
  const [carePlanCount] = useState<number>(() => getAllCarePlanDiseases().length)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const [caseRes, drugRes, areaRes] = await Promise.all([
          supabase.from('clinical_cases').select('id', { count: 'exact', head: true }).eq('status', 'published'),
          supabase.from('drug_monographs').select('id', { count: 'exact', head: true }),
          supabase.from('drug_classes').select('id', { count: 'exact', head: true }).is('parent_id', null),
        ])
        if (cancelled) return
        const cn = (caseRes.count as number) ?? 0
        const dn = (drugRes.count as number) ?? 0
        const an = (areaRes.count as number) ?? 0
        if (cn > 0) {
          setCaseCount(cn)
          writeCache(CASE_KEY, cn)
        }
        if (dn > 0) {
          setDrugCount(dn)
          writeCache(DRUG_KEY, dn)
        }
        if (an > 0) {
          setAreaCount(an)
          writeCache(AREA_KEY, an)
        }
      } catch {
        /* keep cached values */
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return { drugCount, caseCount, areaCount, carePlanCount, loading }
}

// Fallback numbers shown only while the first fetch is in flight / offline.
// These derive from the bundled local data, so they are never wrong — just the
// offline catalogue scale rather than the live enriched database scale.
export const FALLBACK_DRUGS = BUNDLED_DRUGS.length
export const FALLBACK_CASES = ALL_CLINICAL_CASES.length
