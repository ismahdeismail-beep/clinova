import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PlusCircle, FileText, Pill, Bot, FileUp, FolderOpen, X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { NAV_GROUPS } from '../data/navigationConfig'

type QuickAction = {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  path?: string
  action?: () => void
}

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)
  const { userData } = useAuth()
  const isAdmin = userData?.role === 'admin'

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      note: <FileText size={22} />,
      drug: <Pill size={22} />,
      chat: <Bot size={22} />,
      upload: <FileUp size={22} />,
      case: <FolderOpen size={22} />,
    }
    return icons[iconName] || <PlusCircle size={22} />
  }

  const actions: QuickAction[] = [
    {
      id: 'note',
      label: 'New Note',
      description: 'Create a quick note or study summary',
      icon: getIcon('note'),
      path: '/knowledge',
    },
    {
      id: 'drug',
      label: 'Search Drug',
      description: 'Look up a drug monograph or interaction',
      icon: getIcon('drug'),
      path: '/drugs',
    },
    {
      id: 'chat',
      label: 'Start AI Chat',
      description: 'Ask the clinical assistant a question',
      icon: getIcon('chat'),
      path: '/assistant',
    },
    {
      id: 'upload',
      label: 'Upload File',
      description: 'Add a document to your library',
      icon: getIcon('upload'),
      path: isAdmin ? '/admin/kbms' : '/knowledge',
    },
    {
      id: 'case',
      label: 'New Clinical Case',
      description: 'Start a new clinical case review',
      icon: getIcon('case'),
      path: '/cases',
    },
  ]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleAction = (action: QuickAction) => {
    setIsOpen(false)
    if (action.action) {
      action.action()
    } else if (action.path) {
      navigate(action.path)
    }
  }

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Action Menu */}
      {isOpen && (
        <div className="mb-3 flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              className="group flex items-center gap-3 px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg hover:shadow-xl hover:bg-[var(--surface-dim)] transition-all duration-200 text-left w-full sm:w-72"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)] transition-colors shrink-0">
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[var(--text)]">{action.label}</div>
                <div className="text-xs text-[var(--text-muted)] truncate">{action.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ring-4 ring-[var(--primary)]/20"
        aria-label={isOpen ? 'Close quick actions' : 'Quick actions'}
      >
        {isOpen ? <X size={24} /> : <PlusCircle size={24} />}
      </button>
    </div>
  )
}
