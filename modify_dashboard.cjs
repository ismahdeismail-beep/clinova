const fs = require('fs');
let content = fs.readFileSync('src/screens/DashboardScreen.tsx', 'utf8');

const importInjection = `import { useFileStore } from '../store/fileStore';
import { useNavigate } from 'react-router-dom';`;

content = content.replace('import React, { useState } from "react";', `import React, { useState, useEffect } from "react";\n${importInjection}`);

const hookInjection = `  const [searchQuery, setSearchQuery] = useState("");
  const files = useFileStore(state => state.files);
  const navigate = useNavigate();

  const searchResults = files.filter(f => 
    searchQuery.trim().length > 1 &&
    ((f.category === 'knowledge' || f.category === 'knowledge_base') &&
    (
      (f.title && f.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (f.originalName && f.originalName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (f.summary && f.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (f.classification?.keywords && f.classification.keywords.some((k: string) => k.toLowerCase().includes(searchQuery.toLowerCase())))
    ))
  ).slice(0, 5);`;

content = content.replace('const [searchQuery, setSearchQuery] = useState("");', hookInjection);

const renderInjection = `          {/* Quick Search */}
          <div className="relative group z-30">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search
                size={20}
                className="text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors"
              />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Knowledge Base, Guidelines, your notes, or ask a clinical question..."
              className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-[var(--surface)] border-2 border-[var(--border)] rounded-2xl focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 outline-none text-[var(--text)] text-sm md:text-base shadow-sm transition-all backdrop-blur-md"
            />
            {searchQuery.trim().length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      Knowledge Base Results
                    </div>
                    {searchResults.map(res => (
                      <div 
                        key={res.id} 
                        onClick={() => {
                          if (res.storagePath) {
                            window.open(res.storagePath, '_blank');
                          }
                        }}
                        className="px-4 py-3 hover:bg-[var(--surface-dim)] cursor-pointer flex items-center gap-3 border-b border-[var(--border)] last:border-0"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                          <FileText size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-[var(--text)] truncate">{res.title || res.originalName}</div>
                          {res.summary && <div className="text-xs text-[var(--text-muted)] truncate">{res.summary}</div>}
                        </div>
                        {res.aiProcessed && (
                           <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full shrink-0">
                             <Sparkles size={10} /> AI
                           </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-[var(--text-muted)]">
                    No exact matches in the Knowledge Base.
                  </div>
                )}
                <div 
                   className="p-3 bg-[var(--primary)]/5 border-t border-[var(--border)] flex items-center justify-center gap-2 text-sm font-semibold text-[var(--primary)] cursor-pointer hover:bg-[var(--primary)]/10 transition-colors"
                   onClick={() => navigate('/assistant')}
                >
                  <Sparkles size={16} /> Ask AI Assistant instead
                </div>
              </div>
            )}
            <div className="absolute inset-y-0 right-4 flex items-center hidden sm:flex">`;

content = content.replace(/\{\/\*\s*Quick Search\s*\*\/\}\s*<div className="relative group">[\s\S]*?<div className="absolute inset-y-0 right-4 flex items-center hidden sm:flex">/m, renderInjection);

fs.writeFileSync('src/screens/DashboardScreen.tsx', content);
