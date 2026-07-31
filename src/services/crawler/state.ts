// Crawler state persistence — tracks progress for resumable crawls.
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

export function loadState(): CrawlerState {
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

export function saveState(state: CrawlerState): void {
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
