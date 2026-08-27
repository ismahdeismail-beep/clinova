import type { DrugMonograph } from '../services/drugMonograph.service'

let _bundledDrugs: DrugMonograph[] | null = null

export function getBundledDrugs(): DrugMonograph[] {
  return _bundledDrugs ?? []
}

export async function loadBundledDrugs(): Promise<DrugMonograph[]> {
  if (_bundledDrugs) return _bundledDrugs
  const mod = await import('../data/drugIndexData')
  _bundledDrugs = mod.BUNDLED_DRUGS
  return _bundledDrugs
}
