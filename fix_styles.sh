#!/bin/bash
FILE="src/screens/ClinicalAssistantScreen.tsx"

# Backgrounds
sed -i 's/bg-[#0F172A]/bg-[var(--bg)]/g' $FILE
sed -i 's/bg-[#1E293B]/bg-[var(--surface)]/g' $FILE
sed -i 's/bg-[#334155]/bg-[var(--surface-dim)]/g' $FILE
sed -i 's/bg-slate-900/bg-[var(--bg)]/g' $FILE
sed -i 's/bg-slate-800/bg-[var(--surface)]/g' $FILE
sed -i 's/bg-slate-700/bg-[var(--surface-dim)]/g' $FILE
sed -i 's/bg-slate-950/bg-[var(--bg)]/g' $FILE

# Text colors
sed -i 's/text-slate-100/text-[var(--text)]/g' $FILE
sed -i 's/text-slate-200/text-[var(--text)]/g' $FILE
sed -i 's/text-slate-300/text-[var(--text)]/g' $FILE
sed -i 's/text-slate-400/text-[var(--text-muted)]/g' $FILE
sed -i 's/text-slate-500/text-[var(--text-muted)]/g' $FILE
sed -i 's/text-slate-600/text-[var(--text-muted)]/g' $FILE

# Borders
sed -i 's/border-slate-800\/60/border-[var(--border)]/g' $FILE
sed -i 's/border-slate-800\/40/border-[var(--border)]/g' $FILE
sed -i 's/border-slate-800/border-[var(--border)]/g' $FILE
sed -i 's/border-slate-700/border-[var(--border)]/g' $FILE

# Primary (Cyan/Blue)
sed -i 's/text-cyan-400/text-[var(--primary)]/g' $FILE
sed -i 's/text-cyan-500/text-[var(--primary)]/g' $FILE
sed -i 's/bg-cyan-500/bg-[var(--primary)]/g' $FILE
sed -i 's/border-cyan-500/border-[var(--primary)]/g' $FILE
sed -i 's/text-blue-400/text-[var(--primary)]/g' $FILE
sed -i 's/text-blue-500/text-[var(--primary)]/g' $FILE
sed -i 's/text-blue-600/text-[var(--primary)]/g' $FILE
sed -i 's/bg-blue-500/bg-[var(--primary)]/g' $FILE
sed -i 's/bg-blue-600/bg-[var(--primary)]/g' $FILE
sed -i 's/border-blue-500/border-[var(--primary)]/g' $FILE
sed -i 's/hover:bg-blue-500/hover:bg-[var(--primary)]\/90/g' $FILE
sed -i 's/hover:bg-blue-600/hover:bg-[var(--primary)]\/90/g' $FILE
sed -i 's/hover:text-blue-400/hover:text-[var(--primary)]/g' $FILE
sed -i 's/hover:text-blue-500/hover:text-[var(--primary)]/g' $FILE

# Success (Emerald)
sed -i 's/text-emerald-400/text-[var(--success)]/g' $FILE
sed -i 's/text-emerald-500/text-[var(--success)]/g' $FILE
sed -i 's/bg-emerald-500/bg-[var(--success)]/g' $FILE

# Destructive/Error (Rose)
sed -i 's/text-rose-400/text-red-500/g' $FILE
sed -i 's/text-rose-500/text-red-500/g' $FILE
sed -i 's/bg-rose-500/bg-red-500/g' $FILE

# Hover styles
sed -i 's/hover:bg-slate-800\/40/hover:bg-[var(--surface)]/g' $FILE
sed -i 's/hover:bg-slate-800/hover:bg-[var(--surface-dim)]/g' $FILE
sed -i 's/hover:bg-[#1E293B]/hover:bg-[var(--surface-dim)]/g' $FILE
sed -i 's/hover:text-slate-100/hover:text-[var(--text)]/g' $FILE
sed -i 's/hover:text-slate-300/hover:text-[var(--text)]/g' $FILE

# Divide
sed -i 's/divide-slate-800\/60/divide-[var(--border)]/g' $FILE
sed -i 's/divide-slate-800/divide-[var(--border)]/g' $FILE

# Specific fixes
sed -i 's/bg-[#0F172A]/bg-[var(--bg)]/g' $FILE
sed -i 's/bg-[#1E293B]/bg-[var(--surface)]/g' $FILE

