import React, { useState, useEffect } from 'react';
import { ChatSession, getAllChatSessions, renameChatSession, deleteChatSession } from '../lib/localDb';
import { Pencil, Trash2, Check, X, MessageSquare, Plus } from 'lucide-react';

interface Props {
  onSelectSession: (session: ChatSession) => void;
  onNewSession: () => void;
  currentSessionId?: string;
}

export function ChatSessionList({ onSelectSession, onNewSession, currentSessionId }: Props) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  const loadSessions = () => {
    getAllChatSessions().then(loaded => {
      setSessions(loaded.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
    });
  };

  useEffect(() => {
    loadSessions();
    // In a real app we'd use a context or event listener to trigger this when a new message is saved
    const interval = setInterval(loadSessions, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full w-full max-w-[260px] border-r border-[var(--border)] bg-[var(--surface-dim)]/30">
      <div className="p-3 border-b border-[var(--border)]">
        <button 
          onClick={onNewSession}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          New Consultation
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
        {sessions.length === 0 ? (
          <div className="text-center p-4 text-[10px] text-[var(--text-muted)]">No past consultations</div>
        ) : (
          sessions.map((s) => (
            <SessionItem 
              key={s.id} 
              session={s} 
              isActive={s.id === currentSessionId}
              onClick={() => onSelectSession(s)}
              onChanged={loadSessions}
            />
          ))
        )}
      </div>
    </div>
  );
}

function SessionItem({ session, isActive, onClick, onChanged }: { session: ChatSession; isActive: boolean; onClick: () => void; onChanged: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(session.title);

  const handleSave = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (editTitle.trim() && editTitle !== session.title) {
      await renameChatSession(session.id, editTitle.trim());
      onChanged();
    }
    setIsEditing(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this consultation record?')) {
      await deleteChatSession(session.id);
      onChanged();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1 p-1.5 bg-[var(--surface)] rounded-md border border-[var(--primary)]">
        <input 
          autoFocus
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="flex-1 bg-transparent text-xs text-[var(--text)] outline-none min-w-0"
        />
        <button onClick={handleSave} className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded"><Check size={12} /></button>
        <button onClick={(e) => { e.stopPropagation(); setIsEditing(false); setEditTitle(session.title); }} className="p-1 text-[var(--text-muted)] hover:bg-[var(--surface-dim)] rounded"><X size={12} /></button>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`group flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
        isActive ? 'bg-[var(--primary-container)] text-[var(--primary)]' : 'hover:bg-[var(--surface)] text-[var(--text-secondary)]'
      }`}
    >
      <div className="flex items-center gap-2 overflow-hidden flex-1">
        <MessageSquare size={14} className="shrink-0" />
        <div className="truncate text-xs font-medium">{session.title}</div>
      </div>
      
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
          className="p-1 hover:bg-[var(--surface-dim)] rounded text-[var(--text-muted)] hover:text-[var(--text)]"
        >
          <Pencil size={12} />
        </button>
        <button 
          onClick={handleDelete}
          className="p-1 hover:bg-red-500/10 rounded text-red-500/70 hover:text-red-500"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}
