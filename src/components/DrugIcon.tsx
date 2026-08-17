import { useState } from 'react'
import { getDrugClassConfig } from '../data/drugClassColors'

// Strong per-color gradients for generated icon tiles (literal strings so the
// Tailwind v4 scanner picks them up). Falls back per-class instead of the
// generic slate used by tinted surfaces.
const TILE_GRADIENTS: Record<string, string> = {
  rose: 'from-rose-500 to-rose-600',
  sky: 'from-sky-500 to-sky-600',
  amber: 'from-amber-500 to-amber-600',
  teal: 'from-teal-500 to-teal-600',
  violet: 'from-violet-500 to-violet-600',
  emerald: 'from-emerald-500 to-emerald-600',
  red: 'from-red-500 to-red-600',
  indigo: 'from-indigo-500 to-indigo-600',
  orange: 'from-orange-500 to-orange-600',
  yellow: 'from-yellow-500 to-yellow-600',
  pink: 'from-pink-500 to-pink-600',
  cyan: 'from-cyan-500 to-cyan-600',
  green: 'from-green-500 to-green-600',
  slate: 'from-slate-500 to-slate-600',
  fuchsia: 'from-fuchsia-500 to-fuchsia-600',
  lime: 'from-lime-500 to-lime-600',
}

const TILE_SIZES: Record<'sm' | 'md' | 'lg', { box: string; text: string }> = {
  sm: { box: 'w-10 h-10', text: 'text-sm' },
  md: { box: 'w-12 h-12', text: 'text-base' },
  lg: { box: 'w-14 h-14 sm:w-16 sm:h-16', text: 'text-lg sm:text-xl' },
}

// Deterministic monogram: "Glycopyrronium/Indacaterol" → "GI",
// "Paracetamol" → "P", "Vitamin B12" → "VB".
function drugInitials(name: string): string {
  const clean = name.replace(/[^A-Za-z0-9\s/+-]/g, ' ').trim()
  if (!clean) return '?'
  const parts = clean.split(/[\s/+-]+/).filter(Boolean)
  if (parts.length >= 2 && parts[0].length > 1 && parts[1].length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return clean[0].toUpperCase()
}

export interface DrugIconProps {
  name: string
  thumbnailUrl?: string
  drugClass?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Drug icon that renders the best available gallery image when one exists and
 * falls back to a deterministic class-colored monogram tile otherwise — so
 * every drug in the app shows a distinct icon, even with zero image rows.
 */
export function DrugIcon({ name, thumbnailUrl, drugClass, size = 'md', className = '' }: DrugIconProps) {
  const [failed, setFailed] = useState(false)
  const dims = TILE_SIZES[size]

  if (thumbnailUrl && !failed) {
    return (
      <img
        src={thumbnailUrl}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${dims.box} rounded-xl object-cover bg-white shrink-0 border border-[var(--border)] shadow-sm ${className}`}
      />
    )
  }

  const cc = getDrugClassConfig(drugClass || '')
  const gradient = TILE_GRADIENTS[cc.color] ?? TILE_GRADIENTS.slate
  return (
    <div
      className={`${dims.box} relative shrink-0 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center border border-black/10 shadow-sm overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        viewBox="0 0 48 48"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M24 5 L40 14.5 L40 33.5 L24 43 L8 33.5 L8 14.5 Z" stroke="white" strokeWidth="1.6" />
        <circle cx="24" cy="5" r="2" fill="white" />
        <circle cx="40" cy="14.5" r="2" fill="white" />
        <circle cx="40" cy="33.5" r="2" fill="white" />
        <circle cx="24" cy="43" r="2" fill="white" />
        <circle cx="8" cy="33.5" r="2" fill="white" />
        <circle cx="8" cy="14.5" r="2" fill="white" />
      </svg>
      <span className={`relative font-black text-white drop-shadow-sm ${dims.text}`}>{drugInitials(name)}</span>
    </div>
  )
}
