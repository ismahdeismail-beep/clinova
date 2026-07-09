import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Home, Users, FolderOpen, ClipboardList, Pill, 
  Bot, BookOpen, BarChart3, Bell, Settings, ShieldCheck, X, Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

type Action = {
  id: string;
  label: string;
  icon: any;
  path?: string;
  action?: () => void;
  shortcut?: string[]; // e.g., ['meta', 'j'] for Cmd+J or ['shift', 'n']
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggleTheme } = useTheme();

  const actions: Action[] = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: Home, path: '/', shortcut: ['shift', 'h'] },
    { id: 'patients', label: 'Search Patients', icon: Users, path: '/patients' },
    { id: 'cases', label: 'Search Clinical Cases', icon: FolderOpen, path: '/cases' },
    { id: 'review', label: 'Go to Pharmacotherapy Review', icon: ClipboardList, path: '/review' },
    { id: 'drugs', label: 'Search Drug Index', icon: Pill, path: '/drugs' },
    { id: 'assistant', label: 'Ask Clinical Assistant', icon: Bot, path: '/assistant' },
    { id: 'knowledge', label: 'Go to Education Hub', icon: BookOpen, path: '/knowledge' },
    { id: 'admin', label: 'Go to Admin Console', icon: ShieldCheck, path: '/admin' },
    { id: 'notifications', label: 'Go to Notifications', icon: Bell, path: '/notifications', shortcut: ['shift', 'n'] },
    { id: 'settings', label: 'Go to Settings', icon: Settings, path: '/settings' },
    { 
      id: 'theme', 
      label: 'Toggle Theme', 
      icon: Moon, 
      action: () => {
        toggleTheme();
      },
      shortcut: ['shift', 't']
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      } 
      
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      // Check for global shortcuts
      // Only trigger if we aren't typing in an input/textarea (unless the shortcut uses a modifier)
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName);
      
      for (const action of actions) {
        if (!action.shortcut) continue;
        
        const needsMeta = action.shortcut.includes('meta');
        const needsShift = action.shortcut.includes('shift');
        const needsCtrl = action.shortcut.includes('ctrl');
        const needsAlt = action.shortcut.includes('alt');
        
        const key = action.shortcut.find(k => !['meta', 'shift', 'ctrl', 'alt'].includes(k));
        
        if (
          e.key.toLowerCase() === key?.toLowerCase() &&
          e.metaKey === needsMeta &&
          e.shiftKey === needsShift &&
          e.ctrlKey === needsCtrl &&
          e.altKey === needsAlt
        ) {
          // If typing in an input, don't trigger shift+letter shortcuts
          if (isInput && !needsMeta && !needsCtrl && !needsAlt) {
            continue;
          }
          
          e.preventDefault();
          if (action.action) {
            action.action();
          } else if (action.path) {
            navigate(action.path);
          }
          setIsOpen(false);
          return;
        }
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen, navigate]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleAction = (action: Action) => {
    setIsOpen(false);
    if (action.action) {
      action.action();
    } else if (action.path) {
      navigate(action.path);
    }
  };

  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          handleAction(filteredActions[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, filteredActions, selectedIndex]);

  if (!isOpen) return null;

  const renderShortcut = (shortcut?: string[]) => {
    if (!shortcut) return null;
    return (
      <div className="flex items-center gap-1">
        {shortcut.map((key, i) => (
          <kbd key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--text-muted)] uppercase">
            {key}
          </kbd>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)}
      />
      
      {/* Dialog */}
      <div className="relative w-full max-w-xl bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-[var(--border)]">
          <Search size={20} className="text-[var(--text-muted)] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-[var(--text)] placeholder:text-[var(--text-muted)] text-lg"
            placeholder="Search commands... (e.g., 'drugs', 'cases')"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-dim)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-[var(--text-muted)]">
              No results found for "{query}"
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Quick Actions
              </div>
              {filteredActions.map((action, index) => {
                const Icon = action.icon;
                const isSelected = index === selectedIndex;
                
                return (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors ${
                      isSelected 
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' 
                        : 'text-[var(--text)] hover:bg-[var(--surface-dim)]'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon size={18} className={`mr-3 ${isSelected ? 'text-[var(--primary-foreground)]' : 'text-[var(--text-muted)]'}`} />
                      <span className="font-medium">{action.label}</span>
                    </div>
                    {renderShortcut(action.shortcut)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="px-4 py-3 bg-[var(--surface-dim)] border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>Use <kbd className="bg-[var(--bg)] border border-[var(--border)] rounded px-1.5 py-0.5 mx-1 font-mono">↑</kbd> <kbd className="bg-[var(--bg)] border border-[var(--border)] rounded px-1.5 py-0.5 mx-1 font-mono">↓</kbd> to navigate</span>
          <span><kbd className="bg-[var(--bg)] border border-[var(--border)] rounded px-1.5 py-0.5 mx-1 font-mono">Enter</kbd> to select</span>
        </div>
      </div>
    </div>
  );
}
