import {
  BookOpen, FolderOpen, Pill,
  GraduationCap, ClipboardCheck,
  Settings, type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
}

export type NavGroup = {
  id: string
  label?: string
  icon: LucideIcon
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'main',
    icon: BookOpen,
  items: [
    { to: '/knowledge', label: 'Education Hub', icon: BookOpen },
    { to: '/cases', label: 'Clinical Cases', icon: FolderOpen },
    { to: '/drugs', label: 'Drug Index', icon: Pill },
    { to: '/care-plan', label: 'Care Plan', icon: ClipboardCheck },
    { to: '/assistant', label: 'Clinova Support', icon: ClipboardList },
  ],
  },
  {
    id: 'settings',
    icon: Settings,
    items: [
      { to: '/settings', label: 'Settings', icon: Settings },
    ],
  },
]
