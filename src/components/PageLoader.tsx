interface PageLoaderProps {
  title?: string
  subtitle?: string
  icon?: React.ReactNode
}

export function PageLoader({ title, subtitle, icon }: PageLoaderProps) {
  return (
    <div className="w-full bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center space-y-4">
      <div className="p-4 bg-[var(--primary-container)] rounded-full animate-pulse">
        {icon ?? (
          <svg
            className="w-9 h-9 text-[var(--primary)] animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              className="opacity-25"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      {title && (
        <div>
          <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
          {subtitle && <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">{subtitle}</p>}
        </div>
      )}
    </div>
  )
}

interface InlineLoaderProps {
  size?: number
}

export function InlineLoader({ size = 16 }: InlineLoaderProps) {
  return (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
