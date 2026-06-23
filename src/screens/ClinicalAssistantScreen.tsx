import React, { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';

export default function ClinicalAssistantScreen() {
  const [messages] = useState([
    { role: 'assistant', content: 'Hello. I am the Clinova Assistant. How can I help you with a clinical case, differential diagnosis, or drug therapy validation today?' }
  ]);

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-2rem)]">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Clinical Assistant</h1>
        <p className="text-[var(--text-muted)] text-sm">Secure clinical decision support and analysis.</p>
      </div>

      <div className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface-dim)] text-[var(--primary)]'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-[var(--primary)] text-white rounded-tr-none' 
                  : 'bg-[var(--surface-dim)] text-[var(--text)] rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-[var(--border)] bg-[var(--surface)]">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Type your clinical query here..." 
              className="w-full pl-4 pr-12 py-3 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none text-[var(--text)] text-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[var(--primary)] hover:bg-[var(--primary-container)] rounded-lg transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
