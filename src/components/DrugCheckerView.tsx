import { useState, useMemo } from 'react'
import {
  Search,
  AlertTriangle,
  ShieldAlert,
  Info,
  Pill,
  Skull,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import {
  checkInteractions,
  searchDrugsForChecker,
  getContraindications,
  getToxicityProfile,
} from '../services/drugChecker.service'
import type {
  InteractionCheckResult,
  InteractionSeverity,
  DrugContraindication,
  DrugToxicityProfile,
} from '../types/drugChecker'
import { InlineLoader } from './PageLoader'

const SEVERITY_STYLES: Record<
  InteractionSeverity,
  { badge: string; bg: string; icon: string; label: string }
> = {
  contraindicated: {
    badge: 'bg-red-100 text-red-700 border border-red-300',
    bg: 'bg-red-50 border-l-4 border-red-500',
    icon: 'text-red-600',
    label: 'Contraindicated',
  },
  major: {
    badge: 'bg-orange-100 text-orange-700 border border-orange-300',
    bg: 'bg-orange-50 border-l-4 border-orange-500',
    icon: 'text-orange-600',
    label: 'Major',
  },
  moderate: {
    badge: 'bg-amber-100 text-amber-700 border border-amber-300',
    bg: 'bg-amber-50 border-l-4 border-amber-500',
    icon: 'text-amber-600',
    label: 'Moderate',
  },
  minor: {
    badge: 'bg-green-100 text-green-700 border border-green-300',
    bg: 'bg-green-50 border-l-4 border-green-500',
    icon: 'text-green-600',
    label: 'Minor',
  },
}

function SeverityBadge({ severity }: { severity: InteractionSeverity }) {
  const s = SEVERITY_STYLES[severity]
  const Icon = severity === 'contraindicated' ? Skull : severity === 'major' ? AlertTriangle : Info
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${s.badge}`}
    >
      <Icon size={13} />
      {s.label}
    </span>
  )
}

function DrugSearchInput({
  label,
  value,
  onChange,
  onSelect,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  onSelect: (drug: string) => void
  placeholder: string
}) {
  const [focused, setFocused] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const results = useMemo(() => {
    if (!value || value.length < 2) return []
    return searchDrugsForChecker(value)
  }, [value])

  const handleSelect = (drug: string) => {
    onSelect(drug)
    setShowDropdown(false)
  }

  return (
    <div className="relative flex-1">
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => {
            setFocused(true)
            if (value.length >= 2) setShowDropdown(true)
          }}
          onBlur={() => {
            setFocused(false)
            setTimeout(() => setShowDropdown(false), 200)
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all placeholder:text-slate-400"
        />
        {value && (
          <button
            onClick={() => {
              onChange('')
              setShowDropdown(false)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {results.map((drug) => (
            <button
              key={drug}
              onMouseDown={() => handleSelect(drug)}
              className="w-full text-left px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0"
            >
              {drug}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function InteractionCard({
  interaction,
}: {
  interaction: InteractionCheckResult['directInteractions'][0]
}) {
  const [expanded, setExpanded] = useState(false)
  const s = SEVERITY_STYLES[interaction.severity]
  return (
    <div className={`rounded-xl overflow-hidden ${s.bg} mb-3`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <SeverityBadge severity={interaction.severity} />
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
            {interaction.effect.length > 80
              ? interaction.effect.slice(0, 80) + '...'
              : interaction.effect}
          </span>
        </div>
        {expanded ? (
          <ChevronUp size={16} className="text-slate-500 shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-slate-500 shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Mechanism
            </h5>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {interaction.mechanism}
            </p>
          </div>
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Effect
            </h5>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {interaction.effect}
            </p>
          </div>
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Management
            </h5>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {interaction.management}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {interaction.evidence && (
              <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300">
                Evidence: {interaction.evidence}
              </span>
            )}
            {interaction.onset && (
              <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300">
                Onset: {interaction.onset}
              </span>
            )}
            {interaction.dose_dependent && (
              <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-violet-200 dark:bg-violet-800 text-violet-700 dark:text-violet-300">
                Dose-dependent
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ContraindicationSection({ drugName }: { drugName: string }) {
  const contras = useMemo(() => getContraindications(drugName), [drugName])
  if (contras.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
        <ShieldAlert size={18} className="text-red-600" />
        Contraindications for {drugName}
      </h3>
      <div className="space-y-2">
        {contras.map((c, i) => (
          <div
            key={`${c.condition}-${i}`}
            className={`p-3 rounded-xl border-l-4 ${
              c.severity === 'absolute'
                ? 'bg-red-50 border-red-500'
                : 'bg-amber-50 border-amber-500'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  c.severity === 'absolute'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {c.severity}
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {c.condition}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{c.rationale}</p>
            {c.alternative && (
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                Alternative: {c.alternative}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ToxicitySection({ drugName }: { drugName: string }) {
  const profile = useMemo(() => getToxicityProfile(drugName), [drugName])
  if (!profile || profile.toxicities.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
        <Skull size={18} className="text-red-600" />
        Toxicity Profile: {drugName}
      </h3>
      <div className="space-y-3">
        {profile.toxicities.map((t, i) => (
          <div
            key={`${t.condition}-${i}`}
            className={`p-4 rounded-xl border-l-4 ${
              t.severity === 'life-threatening'
                ? 'bg-red-50 border-red-500'
                : t.severity === 'serious'
                  ? 'bg-orange-50 border-orange-500'
                  : 'bg-amber-50 border-amber-500'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  t.severity === 'life-threatening'
                    ? 'bg-red-100 text-red-700'
                    : t.severity === 'serious'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-amber-100 text-amber-700'
                }`}
              >
                {t.severity}
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {t.condition}
              </span>
            </div>
            {t.dose_threshold && (
              <p className="text-xs font-medium text-violet-700 dark:text-violet-400 mb-2">
                Dose threshold: {t.dose_threshold}
              </p>
            )}
            <div className="mb-2">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Symptoms
              </h5>
              <div className="flex flex-wrap gap-1">
                {t.symptoms.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Management
              </h5>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.management}
              </p>
            </div>
            {t.antidote && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg px-3 py-2">
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-0.5">
                  Antidote
                </h5>
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  {t.antidote}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DrugCheckerView() {
  const [drugA, setDrugA] = useState('')
  const [drugB, setDrugB] = useState('')
  const [selectedA, setSelectedA] = useState('')
  const [selectedB, setSelectedB] = useState('')
  const [result, setResult] = useState<InteractionCheckResult | null>(null)
  const [checking, setChecking] = useState(false)

  const handleCheck = () => {
    if (!selectedA || !selectedB) return
    setChecking(true)
    setTimeout(() => {
      const res = checkInteractions(selectedA, selectedB)
      setResult(res)
      setChecking(false)
    }, 300)
  }

  const handleSwap = () => {
    const tmpA = selectedA
    const tmpB = selectedB
    setSelectedA(tmpB)
    setSelectedB(tmpA)
    setDrugA(tmpB)
    setDrugB(tmpA)
    setResult(null)
  }

  const handleClear = () => {
    setDrugA('')
    setDrugB('')
    setSelectedA('')
    setSelectedB('')
    setResult(null)
  }

  const totalContraindications = useMemo(
    () => [...getContraindications(selectedA), ...getContraindications(selectedB)].length,
    [selectedA, selectedB],
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 text-xs font-semibold mb-3">
          <Pill size={14} />
          Clinical Tool
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Drug Interaction Checker
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Select two drugs below to check for interactions, contraindications, and toxicity
          profiles. Covers all 1,000 drugs in the Kenya Drug Index.
        </p>
      </div>

      {/* Search inputs */}
      <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-6">
        <DrugSearchInput
          label="Drug A"
          value={selectedA || drugA}
          onChange={(v) => {
            setDrugA(v)
            setSelectedA('')
            setResult(null)
          }}
          onSelect={(drug) => {
            setSelectedA(drug)
            setDrugA(drug)
            setResult(null)
          }}
          placeholder="e.g. Warfarin"
        />

        <button
          onClick={handleSwap}
          className="self-center sm:self-end sm:mb-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
        >
          Swap
        </button>

        <DrugSearchInput
          label="Drug B"
          value={selectedB || drugB}
          onChange={(v) => {
            setDrugB(v)
            setSelectedB('')
            setResult(null)
          }}
          onSelect={(drug) => {
            setSelectedB(drug)
            setDrugB(drug)
            setResult(null)
          }}
          placeholder="e.g. Amiodarone"
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={handleCheck}
          disabled={!selectedA || !selectedB || checking}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {checking ? <InlineLoader size={16} /> : <Search size={16} />}
          {checking ? 'Checking...' : 'Check Interactions'}
        </button>
        {(selectedA || selectedB) && (
          <button
            onClick={handleClear}
            className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Summary banner */}
          <div
            className={`p-5 rounded-2xl border ${
              result.totalSeverity === 'contraindicated'
                ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                : result.totalSeverity === 'major'
                  ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800'
                  : result.totalSeverity === 'moderate'
                    ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
                    : 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {result.found ? (
                    <>
                      {result.directInteractions.length + result.classInteractions.length}{' '}
                      interaction
                      {result.directInteractions.length + result.classInteractions.length !== 1
                        ? 's'
                        : ''}{' '}
                      found
                    </>
                  ) : (
                    'No interactions found'
                  )}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {result.drug_a} + {result.drug_b}
                </p>
              </div>
              {result.totalSeverity && <SeverityBadge severity={result.totalSeverity} />}
            </div>
            {!result.found && (
              <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                No known interactions were found between these two drugs based on current clinical
                data. Always verify with clinical judgement.
              </p>
            )}
          </div>

          {/* Direct interactions */}
          {result.directInteractions.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">
                Specific Interactions ({result.directInteractions.length})
              </h3>
              {result.directInteractions.map((inter) => (
                <InteractionCard key={`direct-${inter.id}`} interaction={inter} />
              ))}
            </div>
          )}

          {/* Class-level interactions */}
          {result.classInteractions.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">
                Class-Level Interactions ({result.classInteractions.length})
              </h3>
              {result.classInteractions.map((inter) => (
                <InteractionCard key={`class-${inter.id}`} interaction={inter} />
              ))}
            </div>
          )}

          {/* Contraindications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContraindicationSection drugName={selectedA} />
            <ContraindicationSection drugName={selectedB} />
          </div>

          {/* Toxicity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ToxicitySection drugName={selectedA} />
            <ToxicitySection drugName={selectedB} />
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Disclaimer:</strong> This tool is for educational purposes only and does not
              replace clinical judgement. Interaction data is sourced from established
              pharmacological references. Always verify with current prescribing information, local
              formulary guidelines, and patient-specific factors before making clinical decisions.
              Drug interaction databases may not be exhaustive.
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!result && !checking && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 mb-4">
            <Pill size={32} className="text-violet-600 dark:text-violet-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Select two drugs to begin
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Search for any two drugs in the Kenya Drug Index (1,000 drugs) to check for
            interactions, contraindications, and toxicity profiles.
          </p>
        </div>
      )}
    </div>
  )
}
