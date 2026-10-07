import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, LogOut, Image } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { MORE_NAV } from '../data/navigationConfig'

export default function MoreScreen() {
  const navigate = useNavigate()
  const { userData, logout } = useAuth()
  const isAdmin = userData?.role === 'admin'

  const secondary = isAdmin
    ? [
        ...MORE_NAV,
        {
          to: '/admin/images',
          label: 'Image Manager',
          icon: Image,
          description: 'Admin: drug image pipeline',
        },
      ]
    : MORE_NAV

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
              More
            </h1>
            <p className="text-sm text-[var(--text-muted)]">Everything else, in one place</p>
          </div>
        </div>

        <nav className="space-y-2">
          {secondary.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:bg-[var(--surface-dim)] transition-all text-left cursor-pointer group"
              >
                <span className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[var(--text)]">{item.label}</span>
                  {item.description && (
                    <span className="block text-xs text-[var(--text-muted)] truncate">
                      {item.description}
                    </span>
                  )}
                </span>
                <ChevronRight
                  size={18}
                  className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors shrink-0"
                />
              </button>
            )
          })}
        </nav>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-sm shrink-0">
            {(userData?.name || 'G').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[var(--text)] truncate">
              {userData?.name || 'Guest'}
            </p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
              {userData?.role || 'user'}
            </p>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[var(--destructive)] hover:bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
