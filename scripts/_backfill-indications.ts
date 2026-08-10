// Backfill real indications for monographs whose `indications` array is the
// generic fallback template ("Management of specific conditions as per
// approved indications..." / "Management of neuropsychiatric disorders...").
// Sources real FDA indications_and_usage text from OpenFDA, parses it into
// concise bullets, and updates the monograph. Resumable via
// storage/indications_state.json.
//
// Usage: npx tsx scripts/_backfill-indications.ts [--limit N]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const STATE_FILE = 'storage/indications_state.json'
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : 0
const TEMPLATE_RE = /as per approved indications/i

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

function cleanText(s: string): string {
  return s
    .replace(/\[.*?\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function fetchFdaIndications(drugName: string): Promise<string[]> {
  try {
    const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(drugName)}"+OR+openfda.brand_name:"${encodeURIComponent(drugName)}"&limit=1`
    const res = await fetch(url)
    if (!res.ok) {
      const fbUrl = `https://api.fda.gov/drug/label.json?search=search="${encodeURIComponent(drugName)}"&limit=1`
      const fbRes = await fetch(fbUrl)
      if (!fbRes.ok) return []
      const fbData: any = await fbRes.json()
      return extractIndications(fbData?.results?.[0])
    }
    const data: any = await res.json()
    return extractIndications(data?.results?.[0])
  } catch {
    return []
  }
}

function extractIndications(label: any): string[] {
  if (!label) return []
  const raw = Array.isArray(label.indications_and_usage)
    ? label.indications_and_usage.join(' ')
    : label.indications_and_usage || ''
  const text = cleanText(raw)
  // Strip the "1 INDICATIONS AND USAGE" heading
  const body = text.replace(/^\d+\s+INDICATIONS?\s+(AND\s+)?USAGE\s*/i, '')
  // Split on section markers like (1.1), (1.2) and sentence boundaries
  const parts = body
    .split(/\(\s*\d+(?:\.\d+)?\s*\)|(?<=[.;])\s+(?=[A-Z(])/)
    .map((s) => cleanText(s))
    .filter((s) => s.length > 12 && s.length < 300 && !/^and\b|^or\b|^of\b|^for\b/i.test(s))
  // de-dup
  const seen = new Set<string>()
  const out: string[] = []
  for (const p of parts) {
    const key = p.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(p)
    if (out.length >= 6) break
  }
  return out
}

async function fetchAllMonographs(): Promise<any[]> {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 20; i++) {
    const { data } = await admin.from('drug_monographs').select('id, generic_name, name, indications').range(from, from + 999)
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
    if (data.length < 1000) break
  }
  return all
}

function hasTemplate(d: any): boolean {
  const v = Array.isArray(d.indications) ? d.indications.join(' ') : String(d.indications || '')
  return TEMPLATE_RE.test(v)
}

async function main() {
  const rows = await fetchAllMonographs()
  const targets = rows.filter(hasTemplate)
  console.log(`monographs: ${rows.length}  template-indications: ${targets.length}`)

  const state: { done: string[]; ok: string[] } = fs.existsSync(STATE_FILE)
    ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
    : { done: [], ok: [] }
  const done = new Set(state.done)

  let updated = 0
  let skipped = 0
  const slice = targets.slice(0, LIMIT || undefined)
  for (const d of slice) {
    const name = d.generic_name || d.name
    if (done.has(d.id)) continue
    const bullets = await fetchFdaIndications(name)
    if (bullets.length >= 2) {
      const { error } = await admin.from('drug_monographs').update({ indications: bullets }).eq('id', d.id)
      if (error) {
        console.log(`[err] ${name}: ${error.message}`)
      } else {
        updated++
        state.ok.push(d.id)
        console.log(`[ok] ${name}: ${bullets.length} bullets`)
        console.log(`     · ${bullets[0].substring(0, 90)}`)
      }
    } else {
      skipped++
      console.log(`[skip] ${name}: no FDA indications found`)
    }
    done.add(d.id)
    state.done = [...done]
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
    await new Promise((r) => setTimeout(r, 350))
  }
  console.log(`[done] updated=${updated} skipped=${skipped} (of ${slice.length} attempted)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
