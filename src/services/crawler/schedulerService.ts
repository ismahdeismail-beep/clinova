// Crawler scheduler — manages crawl state, triggers, and progress tracking.
import { adminSupabase } from '../../server/adminClient'
import type { CrawlStatus, CrawlReport } from '../../types/crawler'
import { loadState, saveState, type CrawlerState } from './state'
import { crawlDrug, crawlAllMissing } from './imageCrawler'
import * as path from 'path'
import * as fs from 'fs'

export { type CrawlerState }

export function getCrawlStatus(): CrawlStatus {
  const state = loadState()
  return {
    last_crawl: state.last_crawl,
    run_count: state.run_count,
    crawled_count: state.crawled_drugs.length,
    failed_count: state.failed_drugs.length,
    pending_count: state.pending_drugs.length,
  }
}

export async function triggerCrawl(
  drugIds?: string[],
): Promise<{ ok: boolean; message: string; report?: CrawlReport }> {
  try {
    const state = loadState()
    const now = new Date().toISOString()
    state.last_crawl = now
    state.run_count = state.run_count + 1

    if (drugIds && drugIds.length > 0) {
      state.pending_drugs = [...new Set([...state.pending_drugs, ...drugIds])].filter(
        (d) => !state.crawled_drugs.includes(d),
      )
    } else {
      // Crawl all missing drugs
      const report = await crawlAllMissing()
      saveState({
        ...state,
        last_crawl: now,
        run_count: state.run_count,
        pending_drugs: [],
      })
      return {
        ok: true,
        message: `Crawl completed: ${report.medicines_searched} medicines searched, ${report.images_accepted} images accepted`,
        report: {
          timestamp: now,
          summary: {
            medicines_searched: report.medicines_searched,
            images_found: report.images_found,
            images_accepted: report.images_accepted,
            images_rejected: report.images_rejected,
            duplicates_removed: report.duplicates_removed,
            processing_time_seconds: 0,
            coverage_percentage: report.coverage_percentage,
            storage_used_mb: 0,
          },
          rejection_reasons: {},
          failures: report.failures,
        },
      }
    }

    // Crawl specific drug IDs
    if (!adminSupabase) throw new Error('Supabase admin client not configured')
    const { data: existing } = await adminSupabase
      .from('drug_images')
      .select('hash')
      .limit(10000)
    const existingHashes = new Set((existing || []).map((r: any) => r.hash as string).filter(Boolean))

    let totalFound = 0
    let totalAccepted = 0
    let totalRejected = 0
    const failures: string[] = []

    for (const drugId of state.pending_drugs) {
      try {
        const { data: drug } = await adminSupabase
          .from('drug_monographs')
          .select('generic_name, name')
          .eq('id', drugId)
          .single()

        if (!drug) continue
        const genericName = drug.generic_name || drug.name
        if (!genericName) continue

        const stats = await crawlDrug(drugId, genericName, undefined, '', existingHashes)
        totalFound += stats.found
        totalAccepted += stats.accepted
        totalRejected += stats.rejected
        failures.push(...stats.failures)

        if (stats.accepted > 0) {
          state.crawled_drugs.push(drugId)
        } else {
          state.failed_drugs.push(drugId)
        }
      } catch (e: any) {
        failures.push(`${drugId}: ${e.message}`)
        state.failed_drugs.push(drugId)
      }
    }

    state.pending_drugs = []
    saveState(state)

    return {
      ok: true,
      message: `Crawl completed: ${totalAccepted} images accepted, ${totalRejected} rejected`,
      report: {
        timestamp: now,
        summary: {
          medicines_searched: state.crawled_drugs.length + state.failed_drugs.length,
          images_found: totalFound,
          images_accepted: totalAccepted,
          images_rejected: totalRejected,
          duplicates_removed: 0,
          processing_time_seconds: 0,
          coverage_percentage: 0,
          storage_used_mb: 0,
        },
        rejection_reasons: {},
        failures,
      },
    }
  } catch (e: any) {
    return { ok: false, message: e.message }
  }
}

export async function getCrawlReport(): Promise<CrawlReport | null> {
  const reportPath = path.join(process.cwd(), 'storage', 'crawler_state.json')
  try {
    if (fs.existsSync(reportPath)) {
      const state = JSON.parse(fs.readFileSync(reportPath, 'utf-8'))
      return {
        timestamp: state.last_crawl || new Date().toISOString(),
        summary: {
          medicines_searched: state.crawled_drugs.length + state.failed_drugs.length,
          images_found: 0,
          images_accepted: 0,
          images_rejected: 0,
          duplicates_removed: 0,
          processing_time_seconds: 0,
          coverage_percentage: 0,
          storage_used_mb: 0,
        },
        rejection_reasons: {},
        failures: [],
      }
    }
  } catch (e) {
    console.error('Failed to read crawl report:', e)
  }
  return null
}
