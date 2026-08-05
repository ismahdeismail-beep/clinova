// Subclass classification audit for the Kenya Drug Index (KDI).
// Loads every drug from storage/drugs_full_list.json and classifies each one
// into category → subclass using src/lib/drugCategory.ts + src/lib/drugSubclass.ts.
// Reports per-category subclass counts and the "Other" rate, plus the actual
// drugs landing in "Other" so keyword rules can be iterated.
// Usage: npx tsx scripts/audit_subclasses.ts
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getDrugCategory } from '../src/lib/drugCategory'
import { getDrugSubclass, getSubclassesForCategory } from '../src/lib/drugSubclass'

interface ListDrug {
  generic_name: string | null
  drug_class: string | null
  class_name: string | null
  broad: string | null
}

const drugs = JSON.parse(
  readFileSync(join(process.cwd(), 'storage', 'drugs_full_list.json'), 'utf8').replace(/^\uFEFF/, ''),
) as ListDrug[]

// Mirror the render path: a CategoryTarget with the same fields DrugIndexScreen passes.
function target(d: ListDrug) {
  return {
    name: null,
    generic_name: d.generic_name,
    drug_class: d.drug_class,
    drug_class_name: d.class_name,
  }
}

const byCategory = new Map<string, { total: number; bySubclass: Map<string, string[]>; unclassified: string[] }>()

for (const d of drugs) {
  const t = target(d)
  const category = getDrugCategory(t)
  const subclass = getDrugSubclass(t, category)
  const entry = byCategory.get(category) ?? { total: 0, bySubclass: new Map<string, string[]>(), unclassified: [] }
  entry.total++
  const bucket = subclass === 'Other' ? entry.unclassified : (entry.bySubclass.get(subclass) ?? (entry.bySubclass.set(subclass, []), entry.bySubclass.get(subclass)!))
  bucket.push(d.generic_name ?? '(no name)')
  byCategory.set(category, entry)
}

const rows: string[] = []
let grandTotal = 0
let grandOther = 0

for (const category of byCategory.keys()) {
  const e = byCategory.get(category)!
  grandTotal += e.total
  grandOther += e.unclassified.length
  rows.push(`\n=== ${category} — ${e.total} drugs ===`)
  for (const subclass of getSubclassesForCategory(category)) {
    const names = e.bySubclass.get(subclass)
    if (names && names.length) rows.push(`  ${subclass}: ${names.length}`)
  }
  if (e.unclassified.length) {
    const pct = ((e.unclassified.length / e.total) * 100).toFixed(1)
    rows.push(`  OTHER (no subclass matched): ${e.unclassified.length} (${pct}%)`)
    rows.push(`    → ${e.unclassified.slice(0, 40).join(', ')}${e.unclassified.length > 40 ? ', …' : ''}`)
  } else {
    rows.push('  OTHER: 0 — fully classified')
  }
}

rows.push(`\n==============================`)
rows.push(`TOTAL: ${grandTotal} drugs | Other: ${grandOther} (${((grandOther / grandTotal) * 100).toFixed(1)}%)`)
console.log(rows.join('\n'))
