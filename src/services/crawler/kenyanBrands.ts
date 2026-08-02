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
  'carbimazole': ['Neomercazole', 'Carbazole'],
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
  'co-trimoxazole': ['Septrin', 'Bactrim', 'Cotrim', 'Septra'],
  'colistin': ['Colomycin', 'Promixin', 'Coly-Mycin S'],
  'colistin sulfate, neomycin sulfate, thonzonium bromide and hydrocortisone acetate': ['Coly-Mycin S'],
  'cycloserine': ['Seromycin'],
  'dalbavancin': ['Dalvance'],
  'delafloxacin meglumine': ['Baxdela'],
  'daclatasvir': ['Daklinza'],
  'amodiaquine': ['Camoquin', 'Amobin'],
  'ceftaroline': ['Zinforo', 'Teflaro'],
  'paromomycin': ['Humatin'],
  'pentamidine': ['Pentam', 'Nebupent'],
  'primaquine': ['Malirid'],
  'tenofovir alafenamide': ['Descovy', 'Vemlidy'],
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
  'proxetil', 'oxide', 'tartrate', 'succinate', 'carbonate',
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
  if (isJunkTitle(title)) return false
  const t = title.toLowerCase().replace(/[^a-z0-9]+/g, ' ')
  const tokens = t.split(' ').filter((w) => w.length >= 4)
  const components = componentWords(genericName)
  for (const n of components) {
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
  // Brand names are NOT distinctive on their own — "Enid PEGASYS Truck" contains
  // the brand "Pegasys" but is a truck photo. A brand match only counts when the
  // title also shows medicine context (tablet/capsule/bottle/vial/box/mg…).
  if (!hasMedicineContext(title)) return false
  for (const n of brandNamesFor(genericName)) {
    if (n.length < 4) continue
    const nn = n.toLowerCase()
    if (!nn.includes(' ') && tokens.includes(nn)) return true
    if (nn.includes(' ') && t.includes(nn)) return true
  }
  return false
}

// Words/patterns that mark a title as clearly NOT a drug photo — scenery,
// people, vehicles, aircraft, animals, sports, food, chemical models, journal
// figures, histology slides, etc. Applied on top of drug-name matching because
// "US Navy boy after drinking albendazole" contains the drug name but is a
// photo of a child, and "Enid PEGASYS Truck" contains a brand but is a truck.
const JUNK_TOKENS = new Set([
  'aircraft', 'aeroplane', 'airplane', 'airport', 'flight', 'plane', 'helicopter',
  'ship', 'vessel', 'warship', 'navy', 'train', 'locomotive', 'truck', 'lorry',
  'vehicle', 'bus', 'bicycle', 'motorbike', 'car', 'church', 'temple', 'mosque',
  'cathedral', 'scenery', 'landscape', 'mountain', 'hill', 'beach', 'sea', 'ocean',
  'river', 'lake', 'sky', 'sunset', 'sunrise', 'forest', 'flower', 'tree', 'animal',
  'dog', 'cat', 'snake', 'bird', 'fish', 'insect', 'horse', 'cow', 'elephant', 'lion',
  'bear', 'monkey', 'rabbit', 'turtle', 'frog', 'spider', 'people', 'person', 'child',
  'children', 'boy', 'girl', 'man', 'woman', 'portrait', 'face', 'hand', 'foot', 'arm',
  'statue', 'sculpture', 'bridge', 'building', 'house', 'road', 'street', 'city',
  'village', 'town', 'handball', 'football', 'basketball', 'cricket', 'soccer',
  'tennis', 'rugby', 'olympics', 'stadium', 'tournament', 'food', 'meal', 'fruit',
  'vegetable', 'meat', 'bread', 'cake', 'drink', 'coffee', 'restaurant', 'histology',
  'microscope', 'magnification', 'micrograph', 'microphotograph', 'leiomyoma',
  'tissue', 'biopsy', 'pathology', 'hematoxylin', 'eosin', 'stain', 'stained',
  'section', 'journal', 'doi', 'biomedcentral', 'plos', 'bait', 'cartridges',
  'xtal', 'spacefill', 'spacfill', 'ballandstick', 'stickmodel', 'model', 'cation',
  'dna', 'replication', 'visualizing', 'induced', 'systematic', 'review', 'efficacy',
  'safety', 'uncomplicated', 'trial', 'study', 'analysis', 'meta', 'stress',
])

const JUNK_SUBSTRINGS = ['3d', 'ball and stick', 'ball-and-stick', '1475-2875', '2018 summer youth']

function isJunkTitle(title: string): boolean {
  const t = title.toLowerCase().replace(/[^a-z0-9]+/g, ' ')
  const tokens = t.split(' ').filter(Boolean)
  if (tokens.some((w) => JUNK_TOKENS.has(w))) return true
  return JUNK_SUBSTRINGS.some((s) => t.includes(s))
}

export { isJunkTitle }

// Subject-junk only — for cleanup tooling. Excludes chemical-structure/model
// terms (ball-and-stick, xtal, 3D…) which are the correct drug, just not
// product photos; the cleanup keeps those as last-resort content.
const SUBJECT_JUNK_RE =
  /aircraft|aeroplane|airplane|airport|flight|helicopter|ship|vessel|warship|navy|train|locomotive|truck|lorry|vehicle|\bcar\b|church|temple|mosque|cathedral|scenery|landscape|mountain|\bhill\b|beach|\bsea\b|ocean|river|\blake\b|\bsky\b|sunset|sunrise|forest|flower|\btree\b|animal|\bdog\b|\bcat\b|snake|\bbird\b|\bfish\b|insect|horse|\bcow\b|elephant|lion|\bbear\b|monkey|rabbit|turtle|frog|spider|people|person|child|children|\bboy\b|\bgirl\b|\bman\b|woman|portrait|\bface\b|\bhand\b|\bfoot\b|\barm\b|statue|sculpture|bridge|building|\bhouse\b|\broad\b|street|\bcity\b|village|\btown\b|handball|football|basketball|cricket|soccer|tennis|rugby|olympics|stadium|tournament|food|\bmeal\b|fruit|vegetable|meat|bread|\bcake\b|drink|coffee|restaurant|histology|microscope|magnification|micrograph|leiomyoma|tissue|biopsy|pathology|hematoxylin|eosin|stain|journal|\bdoi\b|biomedcentral|plos|bait|cartridges|dna|replication|visualizing|induced|systematic|review|efficacy|safety|uncomplicated|trial|\bstudy\b|analysis|\bmeta\b|stress|screenshot|poster|industrial|clinicaltrials/i

export function isSubjectJunkTitle(title: string): boolean {
  return SUBJECT_JUNK_RE.test((title || '').toLowerCase())
}

// Medicine-context words — packaging/box/bottle/vial/injection/mg etc. A brand
// name alone ("Pegasys") is not enough; the photo must actually show product.
const MED_WORDS = new Set([
  'tablet', 'tablets', 'tab', 'tabs', 'cap', 'caps', 'capsule', 'capsules',
  'vial', 'vials', 'bottle', 'bottles', 'box', 'boxes', 'pack', 'packs',
  'injection', 'inj', 'syringe', 'pen', 'cartridge', 'cartridges', 'solution',
  'suspension', 'syrup', 'drops', 'drop', 'ointment', 'cream', 'gel', 'spray',
  'inhaler', 'sachet', 'ampoule', 'ampule', 'blister', 'strip', 'label',
  'coated', 'enteric', 'drug', 'drugs', 'medication', 'medications', 'medicine',
  'medicines', 'pharmaceutical', 'pharmaceuticals', 'dose', 'doses',
  'unit', 'units', 'vials', 'ampoules', 'ampules',
])

function hasMedicineContext(title: string): boolean {
  const t = title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim()
  const tokens = t.split(' ').filter(Boolean)
  if (tokens.some((w) => MED_WORDS.has(w))) return true
  return /\b\d+\s?(mg|mcg|ml|g|iu|units?|s)\b/.test(t)
}

const WEAK_WORDS = [
  'medicine', 'tablet', 'pill', 'capsule', 'drug', 'package', 'packaging',
  'pack', 'vial', 'syrup', 'medication', 'bottle', 'blister', 'generic',
  'product', 'container', 'ampule', 'ampoule', 'cream', 'ointment',
]

/** Weak tier: generic medicine imagery for drugs with no titled matches. */
export function isWeakRelevant(title: string): boolean {
  if (isJunkTitle(title)) return false
  const t = title.toLowerCase()
  return WEAK_WORDS.some((w) => t.includes(w)) && hasMedicineContext(title)
}
