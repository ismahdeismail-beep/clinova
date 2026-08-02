// Kenyan-market brand names keyed by lowercase generic name.
// Used to generate brand-based image search queries — branded packaging
// photos are acceptable, and Kenyan-market brands are prioritized.
export const KENYAN_BRANDS: Record<string, string[]> = {
  'acebutolol hydrochloride': ['Sectral'],
  'acyclovir': ['Zovirax', 'Acivir'],
  'alfuzosin hydrochloride': ['Xatral', 'UroXatral'],
  'amikacin sulfate': ['Amikin'],
  'amiloride hydrochloride': ['Midamor', 'Moduretic'],
  'amoxicillin/clavulanate': ['Augmentin', 'Co-amoxiclav', 'Moxikind'],
  'amphotericin b': ['Fungizone', 'AmBisome'],
  'artemether and lumefantrine': ['Coartem', 'Lonart', 'Artefan'],
  'atovaquone and proguanil hydrochloride': ['Malarone'],
  'azilsartan kamedoxomil': ['Edarbi'],
  'aztreonam': ['Azactam'],
  'baloxavir marboxil': ['Xofluza'],
  'bedaquiline fumarate': ['Sirturo'],
  'bictegravir sodium, emtricitabine, and tenofovir alafenamide fumarate': ['Biktarvy'],
  'captopril and hydrochlorothiazide': ['Capozide', 'Acezide'],
  'carbapenem': ['Meropenem'],
  'caspofungin acetate': ['Cancidas'],
  'cefoxitin sodium': ['Mefoxin'],
  'cefpodoxime proxetil': ['Vantin', 'Orelox'],
  'ceftaroline fosamil': ['Teflaro', 'Zinforo'],
  'ceftazidime': ['Fortum', 'Fortaz'],
  'ceftobiprole medocaril sodium': ['Zevtera', 'Mabelio'],
  'cephalexin': ['Keflex', 'Keforal', 'Ceporex', 'cefalexin'],
  'chloramphenicol sodium succinate': ['Chloromycetin', 'Kemicetine'],
  'chlorthalidone': ['Hygroton', 'Thalitone'],
  'clofazimine': ['Lamprene'],
  'clonidine hydrochloride': ['Catapres', 'Dixarit'],
  'colistin sulfate, neomycin sulfate, thonzonium bromide and hydrocortisone acetate': ['Coly-Mycin S'],
  'cycloserine': ['Seromycin'],
  'dalbavancin': ['Dalvance'],
  'delafloxacin meglumine': ['Baxdela'],
  'dorzolamide hydrochloride timolol maleate': ['Cosopt'],
  'eplerenone': ['Inspra'],
  'ertapenem sodium': ['Invanz'],
  'etravirine': ['Intelence'],
  'fidaxomicin': ['Dificid'],
  'foscarnet sodium': ['Foscavir'],
  'fosinopril sodium': ['Monopril'],
  'fostemsavir tromethamine': ['Rukobia'],
  'ibalizumab': ['Trogarzo'],
  'irbesartan': ['Avapro', 'Aprovel'],
  'isosorbide dinitrate': ['Isordil', 'Sorbitrate'],
  'isosorbide mononitrate': ['Imdur', 'Monoket'],
  'ivabradine': ['Corlanor', 'Procoralan'],
  'labetalol hydrochloride': ['Trandate', 'Normodyne'],
  'lefamulin acetate': ['Xenleta'],
  'lenacapavir sodium': ['Sunlenca'],
  'mefloquine hydrochloride': ['Lariam'],
  'meropenem-vaborbactam': ['Vabomere'],
  'metformin': ['Glucophage', 'Glumet', 'Orofer'],
  'metoclopramide': ['Maxolon', 'Pramin'],
  'metolazone': ['Zaroxolyn'],
  'micafungin': ['Mycamine'],
  'minocycline hydrochloride': ['Minocin', 'Minomycin'],
  'moexipril hydrochloride': ['Univasc'],
  'nebivolol': ['Bystolic', 'Nebilet'],
  'nimodipine': ['Nimotop'],
  'nitazoxanide': ['Alinia'],
  'nitrofurantoin': ['Furadantin', 'Macrodantin'],
  'nitroglycerin': ['Nitrostat', 'Nitro-Dur', 'Nitrolingual'],
  'olmesartan medoxomil-hydrochlorothiazide': ['Benicar HCT', 'Olmetec HCT'],
  'oritavancin diphosphate': ['Orbactiv'],
  'paromomycin sulfate': ['Humatin'],
  'peginterferon alfa-2a': ['Pegasys'],
  'pentamidine isethionate': ['Pentam 300', 'Pentacarinat'],
  'perindopril erbumine': ['Coversyl', 'Aceon'],
  'pindolol': ['Visken'],
  'piperacillin sodium, tazobactam sodium': ['Tazocin', 'Zosyn'],
  'plazomicin': ['Zemdri'],
  'posaconazole': ['Noxafil'],
  'quinapril': ['Accupril'],
  'ranolazine': ['Ranexa'],
  'remdesivir': ['Veklury'],
  'rifaximin': ['Xifaxan', 'Normix'],
  'sacubitril/valsartan': ['Entresto'],
  'sodium nitroprusside': ['Nipride', 'Nitropress'],
  'sotalol hydrochloride': ['Betapace', 'Sotacor'],
  'sulfamethoxazole and trimethoprim': ['Bactrim', 'Septrin', 'Cotrimoxazole'],
  'tedizolid phosphate': ['Sivextro'],
  'salbutamol': ['Ventolin', 'Salbuvent', 'Asthalin'],
  'telmisartan': ['Micardis', 'Pritor'],
  'tenofovir disoproxil fumarate': ['Viread'],
  'terazosin hydrochloride': ['Hytrin'],
  'tigecycline': ['Tygacil'],
  'tinidazole': ['Fasigyn', 'Trinidal'],
  'torsemide': ['Demadex', 'Torem'],
  'trandolapril': ['Mavik', 'Gopten'],
  'triamterene and hydrochlorothiazide': ['Dyazide', 'Maxzide'],
  'valacyclovir': ['Valtrex', 'Valcivir'],
  'insulin': ['Humulin', 'Novolin', 'Actrapid', 'Insulatard', 'Mixtard', 'Novomix'],
  'insulin regular': ['Humulin R', 'Novolin R', 'Actrapid', 'Actrapid penfill'],
  'insulin soluble': ['Humulin R', 'Novolin R', 'Actrapid', 'Actrapid penfill'],
  'biphasic isophane insulin': ['Novomix', 'Mixtard', 'Insulatard', 'Humulin 30/70', 'Novomix 30', 'Mixtard 30'],
  'zanamivir': ['Relenza'],
}

const NORMALIZE_RE = /\s+/g

export function normalizeGeneric(name: string): string {
  return (name || '').toLowerCase().replace(NORMALIZE_RE, ' ').trim()
}

// Tokens that carry no brand-matching signal — salts, esters, connector words.
const BRAND_STOP = new Set([
  'and', 'with', 'of', 'for', 'or', 'plus',
  'sodium', 'potassium', 'calcium', 'hydrochloride', 'dihydrochloride',
  'sulfate', 'sulphate', 'acetate', 'citrate', 'fumarate', 'maleate',
  'phosphate', 'diphosphate', 'monohydrate', 'dihydrate', 'trihydrate',
  'proxetil', 'magnesium', 'oxide', 'tartrate', 'succinate', 'carbonate',
  'nitrate', 'mesylate', 'tosylate', 'acid', 'alfa', 'alpha', 'beta',
])

function brandTokens(name: string): string[] {
  return normalizeGeneric(name)
    .replace(/[^a-z ]/g, ' ') // hyphens, slashes, '+', parens → space
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter((w) => w.length >= 3 && !BRAND_STOP.has(w))
}

/** Kenyan-market brand names for a generic drug.
 *  Format-tolerant: matches 'Amoxicillin-Clavulanate' to the
 *  'amoxicillin/clavulanate' key, 'Artemether + Lumefantrine' to
 *  'artemether and lumefantrine', etc. (token-subset match).
 *  The MOST SPECIFIC key wins (e.g. 'insulin regular' beats 'insulin'). */
export function brandNamesFor(genericName: string): string[] {
  const nameTokens = brandTokens(genericName)
  if (nameTokens.length === 0) return []
  let best: string[] | null = null
  let bestScore = 0
  for (const [key, brands] of Object.entries(KENYAN_BRANDS)) {
    const keyTokens = brandTokens(key)
    if (keyTokens.length === 0) continue
    if (!keyTokens.every((t) => nameTokens.includes(t))) continue
    if (keyTokens.length > bestScore) {
      bestScore = keyTokens.length
      best = brands
    }
  }
  return best ?? []
}

// ── Title-relevance filtering ──────────────────────────────────────
// Wikimedia relevance search is fuzzy/flaky — "DALBAVANCIN" matched church
// photos from "Zeven, Germany" and "PEGINTERFERON" matched a truck. A result
// must relate to the drug name, one of its components, or a Kenyan brand,
// otherwise it would pollute the image set. Typos are tolerated (e.g.
// aciclovir/acyclovir) via Levenshtein distance.
const SALT_STOP = new Set([
  'sodium', 'potassium', 'calcium', 'hydrochloride', 'dihydrochloride',
  'sulfate', 'sulphate', 'acetate', 'citrate', 'fumarate', 'maleate',
  'phosphate', 'diphosphate', 'monohydrate', 'dihydrate', 'trihydrate',
  'proxetil', 'magnesium', 'oxide', 'tartrate', 'succinate', 'carbonate',
  'nitrate', 'mesylate', 'tosylate', 'acid', 'and', 'with', 'of',
  'alfa', 'alpha', 'beta',
])

/** Base name components (strips salts, esters, dosage-form words). */
export function componentWords(genericName: string): string[] {
  return normalizeGeneric(genericName)
    .replace(/[^a-z ]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !SALT_STOP.has(w))
}

function levenshtein(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1
  const row: number[] = Array.from({ length: a.length + 1 }, (_, i) => i)
  for (let j = 1; j <= b.length; j++) {
    let prev = row[0]
    row[0] = j
    for (let i = 1; i <= a.length; i++) {
      const tmp = row[i]
      row[i] = Math.min(row[i] + 1, row[i - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return row[a.length]
}

/** Strong tier: title references the drug, a component, or a Kenyan brand. */
export function isTitleRelevant(title: string, genericName: string): boolean {
  const t = title.toLowerCase().replace(/[^a-z0-9]+/g, ' ')
  const tokens = t.split(' ').filter((w) => w.length >= 4)
  const names = [
    ...componentWords(genericName),
    ...brandNamesFor(genericName).map((b) => b.toLowerCase()),
  ]
  for (const n of names) {
    if (n.length < 4) continue
    if (t.includes(n)) return true
    // Typo tolerance for single words (aciclovir vs acyclovir, torasemide vs torsemide)
    if (
      !n.includes(' ') &&
      tokens.some((tok) => tok.length >= Math.max(5, n.length - 1) && levenshtein(tok, n, 2) <= 2)
    ) {
      return true
    }
  }
  return false
}

const WEAK_WORDS = [
  'medicine', 'tablet', 'pill', 'capsule', 'drug', 'package', 'packaging',
  'pack', 'vial', 'syrup', 'medication', 'bottle', 'blister', 'generic',
  'product', 'container', 'ampule', 'ampoule', 'cream', 'ointment',
]

/** Weak tier: generic medicine imagery for drugs with no titled matches. */
export function isWeakRelevant(title: string): boolean {
  const t = title.toLowerCase()
  return WEAK_WORDS.some((w) => t.includes(w))
}
