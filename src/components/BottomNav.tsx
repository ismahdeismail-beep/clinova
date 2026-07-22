import { useLocation, Link } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Pill, GraduationCap, ClipboardCheck } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/knowledge', label: 'Education', icon: BookOpen },
  { to: '/drugs', label: 'Drugs', icon: Pill },
  { to: '/exam', label: 'Exam', icon: GraduationCap },
  { to: '/care-plan', label: 'Care Plan', icon: ClipboardCheck },
]

export default function BottomNav() {
  const location = useLocation()

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname === to || location.pathname.startsWith(to + '/')
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--surface)]/95 backdrop-blur-xl border-t border-[var(--border)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.to)
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors ${
                active
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-xl transition-colors ${
                  active ? 'bg-[var(--primary)]/10' : ''
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-semibold ${active ? 'text-[var(--primary)]' : ''}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
