import { supabase } from '../../lib/supabase'
import type { CrawlStatus } from '../../types/crawler'
import fs from 'fs'
import path from 'path'

const STATE_FILE = path.join(process.cwd(), 'storage', 'crawler_state.json')

export interface CrawlerState {
  last_crawl: string | null
  crawled_drugs: string[]
  failed_drugs: string[]
  pending_drugs: string[]
  run_count: number
}

function loadState(): CrawlerState {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
    }
  } catch (e) {
    console.error('Failed to load crawler state:', e)
  }
  return {
    last_crawl: null,
    crawled_drugs: [],
    failed_drugs: [],
    pending_drugs: [],
    run_count: 0,
  }
}

function saveState(state: CrawlerState): void {
  try {
    const dir = path.dirname(STATE_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
  } catch (e) {
    console.error('Failed to save crawler state:', e)
  }
}

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
): Promise<{ ok: boolean; message: string }> {
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
      if (supabase) {
        const { data } = await supabase.from('drug_monographs').select('id').limit(1000)
        if (data) {
          const allIds = data.map((d: any) => d.id)
          state.pending_drugs = allIds.filter((id: string) => !state.crawled_drugs.includes(id))
        }
      }
    }

    saveState(state)

    return {
      ok: true,
      message: `Crawl triggered for ${drugIds ? drugIds.length : 'all'} drugs`,
    }
  } catch (e: any) {
    return { ok: false, message: e.message }
  }
}

export async function getCrawlReport(): Promise<any> {
  const reportPath = path.join(process.cwd(), 'packages', 'crawler', 'reports', 'crawl-report.json')
  try {
    if (fs.existsSync(reportPath)) {
      return JSON.parse(fs.readFileSync(reportPath, 'utf-8'))
    }
  } catch (e) {
    console.error('Failed to read crawl report:', e)
  }
  return null
}
