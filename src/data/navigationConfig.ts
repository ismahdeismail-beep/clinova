import {
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Factory,
  FolderOpen,
  LayoutDashboard,
  LayoutGrid,
  Library,
  Pill,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  description?: string
}

export const PRIMARY_NAV: NavItem[] = [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/knowledge', label: 'Learn', icon: BookOpen },
  { to: '/drugs', label: 'Drugs', icon: Pill },
  { to: '/cases', label: 'Cases', icon: FolderOpen },
  { to: '/more', label: 'More', icon: LayoutGrid },
]

export const MORE_NAV: NavItem[] = [
  {
    to: '/care-plan',
    label: 'Care Plan',
    icon: ClipboardCheck,
    description: 'Ward rounds, prescriptions and patient monitoring',
  },
  {
    to: '/assistant',
    label: 'Clinova Support',
    icon: ClipboardList,
    description: 'Ask the AI clinical and pharmacy assistant',
  },
  {
    to: '/library',
    label: 'Library',
    icon: Library,
    description: 'Articles, notes and saved reading',
  },
  {
    to: '/industry',
    label: 'Industry',
    icon: Factory,
    description: 'Pharmaceutical industry knowledge base',
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: Settings,
    description: 'Account, notifications and appearance',
  },
]
