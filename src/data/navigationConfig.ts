import {
  Home, BookOpen, FolderOpen, ClipboardList, Pill, Bot,
  Bell, Settings, Database, ShieldCheck, Cpu,
  GraduationCap, Stethoscope, FlaskConical, Library, Users,
  BookMarked, FileText, HeartPulse, Microscope, Calculator,
  Droplets, Puzzle, AlertTriangle, ScrollText, Video,
  MessageSquare, Search, Star, Clock, PlusCircle,
  BarChart3, BrainCircuit, FileUp, Link, RefreshCw,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  badge?: string
  items?: { label: string; to: string }[]
}

export type NavGroup = {
  id: string
  label: string
  icon: LucideIcon
  items: NavItem[]
  adminOnly?: boolean
  future?: boolean
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    items: [
      { to: '/', label: 'Home', icon: Home },
      { to: '/notifications', label: 'Notifications', icon: Bell, badge: 'unread' },
      { to: '/settings', label: 'Settings', icon: Settings },
    ],
  },
  {
    id: 'knowledge-base',
    label: 'Knowledge Base',
    icon: BookOpen,
    items: [
      { to: '/drugs', label: 'Drug Index', icon: Pill },
      { to: '/drugs', label: 'Drug Monographs', icon: BookMarked },
      { to: '/drugs', label: 'Drug Interactions', icon: Puzzle },
      { to: '/drugs', label: 'Therapeutic Classes', icon: BarChart3 },
    ],
  },
  {
    id: 'clinical',
    label: 'Clinical Workspace',
    icon: Stethoscope,
    items: [
      { to: '/cases', label: 'Clinical Cases', icon: FolderOpen },
      { to: '/assistant', label: 'AI Clinical Assistant', icon: Bot },
      { to: '/review', label: 'Medication Review', icon: ClipboardList },
    ],
  },
  {
    id: 'learning',
    label: 'Learning',
    icon: GraduationCap,
    items: [
      { to: '/knowledge', label: 'Education Hub', icon: BookOpen },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    icon: FlaskConical,
    items: [
      { to: '/admin/kbms', label: 'Knowledge Base Mgmt', icon: Database, badge: 'admin' },
    ],
    adminOnly: true,
  },
  {
    id: 'library',
    label: 'Library',
    icon: Library,
    items: [
      { to: '/admin/kbms', label: 'Uploaded Files', icon: FileUp },
      { to: '/knowledge', label: 'Saved Notes', icon: FileText },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    icon: Users,
    items: [
      { to: '#', label: 'Discussions', icon: MessageSquare },
      { to: '#', label: 'Groups', icon: Users },
      { to: '#', label: 'Shared Cases', icon: FolderOpen },
    ],
    future: true,
  },
]

export type ContextNav = {
  group: string
  label: string
  items: { label: string; to: string; icon: LucideIcon }[]
}

export const CONTEXT_NAV: Record<string, ContextNav> = {
  '/drugs': {
    group: 'knowledge-base',
    label: 'Drug Index',
    items: [
      { label: 'Overview', to: '/drugs', icon: BookMarked },
      { label: 'My Library', to: '/drugs?tab=library', icon: Library },
      { label: 'Interaction Checker', to: '/drugs?tab=interactions', icon: Puzzle },
    ],
  },
  '/cases': {
    group: 'clinical',
    label: 'Clinical Cases',
    items: [
      { label: 'All Cases', to: '/cases', icon: FolderOpen },
    ],
  },
  '/knowledge': {
    group: 'learning',
    label: 'Education Hub',
    items: [
      { label: 'Modules', to: '/knowledge', icon: BookOpen },
    ],
  },
}

export const ROUTE_LABELS: Record<string, string> = {
  '/': 'Dashboard',
  '/cases': 'Clinical Cases',
  '/review': 'Medication Review',
  '/drugs': 'Drug Index',
  '/assistant': 'Clinical Assistant',
  '/knowledge': 'Education Hub',
  '/admin': 'Admin Dashboard',
  '/admin/kbms': 'Knowledge Manager',
  '/admin/ai': 'AI Gateway',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
}

export function getRouteLabel(path: string): string {
  if (ROUTE_LABELS[path]) return ROUTE_LABELS[path]
  const segment = path.split('/').filter(Boolean).pop() || ''
  return segment.charAt(0).toUpperCase() + segment.slice(1)
}

const FAVORITES_KEY = 'clinova_favorites'

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function toggleFavorite(path: string): string[] {
  const favs = getFavorites()
  const idx = favs.indexOf(path)
  if (idx >= 0) {
    favs.splice(idx, 1)
  } else {
    favs.push(path)
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs))
  return favs
}

export function isFavorite(path: string): boolean {
  return getFavorites().includes(path)
}

const RECENT_KEY = 'clinova_recent'

export function getRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function trackVisit(path: string) {
  if (path === '/') return
  const recent = getRecent()
  const filtered = recent.filter((p) => p !== path)
  filtered.unshift(path)
  localStorage.setItem(RECENT_KEY, JSON.stringify(filtered.slice(0, 5)))
}
