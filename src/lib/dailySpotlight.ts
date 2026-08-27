import type { DrugMonograph } from '../services/drugMonograph.service'
import { getBundledDrugs } from '../lib/lazyDrugData'
import { HEALTH_DAYS, type HealthDay } from '../data/healthDays'

export interface DailySpotlight {
  date: Date
  dayOfYear: number
  observance?: HealthDay
  drug: DrugMonograph
  /** short intro shown under the title */
  lede: string
  /** one-line "did you know" fact */
  fact: string
  /** true when today maps to a WHO observance */
  isObservanceDay: boolean
}

function getDayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0)
  const diff = d.getTime() - start.getTime()
  return Math.floor(diff / 86400000)
}

function findObservance(d: Date): HealthDay | undefined {
  const month = d.getMonth() + 1
  const day = d.getDate()
  return HEALTH_DAYS.find(
    (h) => h.month === month && (h.endDay ? day >= h.day && day <= h.endDay : day === h.day),
  )
}

function buildDrugNote(drug: DrugMonograph): string {
  const indications = (drug.indications || []).filter(Boolean)
  const lead = indications.length
    ? indications.slice(0, 3).join(', ').toLowerCase()
    : 'a range of clinical conditions'
  const cls = (drug.drug_class || drug.drug_class_name || 'medicine').toLowerCase()
  return `${drug.name} is a ${cls} primarily used for ${lead}.`
}

function buildFact(drug: DrugMonograph): string {
  if (drug.patient_counselling && drug.patient_counselling.trim()) {
    return drug.patient_counselling.trim()
  }
  if (drug.monitoring && drug.monitoring.trim()) {
    return `Monitor: ${drug.monitoring.trim()}`
  }
  if ((drug.side_effects || []).length) {
    return `Watch for: ${drug.side_effects.slice(0, 3).join(', ')}.`
  }
  return 'Consult the Kenya Standard Treatment Guidelines before use.'
}

/**
 * Returns the daily spotlight for a given date. On WHO observance days the
 * related drug (and theme) are featured; on ordinary days a seeded catalogue
 * drug is rotated deterministically by day-of-year so it changes daily but is
 * stable for every user within the same day.
 */
export function getDailySpotlight(now: Date = new Date()): DailySpotlight {
  const dayOfYear = getDayOfYear(now)
  const observance = findObservance(now)
  const drugs = getBundledDrugs()

  let drug: DrugMonograph | undefined
  if (observance?.relatedDrugId) {
    drug = drugs.find((d) => d.id === observance.relatedDrugId)
  }
  if (!drug && drugs.length > 0) {
    drug = drugs[dayOfYear % drugs.length]
  }
  if (!drug) {
    drug = {
      id: '',
      name: 'Clinova',
      generic_name: '',
      drug_class: '',
      drug_class_name: '',
    } as DrugMonograph
  }

  const lede = observance
    ? `${observance.title} is observed today. ${observance.blurb} ${buildDrugNote(drug)}`
    : `Today’s featured medicine from the Kenya Drug Index. ${buildDrugNote(drug)}`

  return {
    date: now,
    dayOfYear,
    observance,
    drug,
    lede,
    fact: buildFact(drug),
    isObservanceDay: Boolean(observance),
  }
}
