#!/usr/bin/env bash
# rag-progress.sh — live progress of the local RAG re-embed.
#   watch -n 15 /home/ishi/clinova/scripts/rag-progress.sh
set -u
LOG=${1:-/home/ishi/.cache/clinova/stg/reembed.log}
TOTAL=8801
DOCS=1142

line=$(grep -oE 'upsert [0-9]+/[0-9]+ docs · [0-9]+ chunks' "$LOG" | tail -1)
docs=$(printf '%s' "$line" | awk '{print $2}' | cut -d/ -f1)
chunks=$(printf '%s' "$line" | awk '{print $5}')
docs=${docs:-0}
chunks=${chunks:-0}

pct=$((chunks * 100 / TOTAL))
filled=$((pct * 30 / 100))
bar=$(printf '%*s' "$filled" '' | tr ' ' '#')
empty=$(printf '%*s' $((30 - filled)) '' | tr ' ' '.')

first=$(grep -oE '^\[ensure-rag\] upsert' "$LOG" | head -1)
rate=""
if [ -n "$first" ]; then
  start=$(date -r "$LOG" +%s 2>/dev/null || echo 0)
  rate=$(awk -v c="$chunks" 'BEGIN { if (c > 0) printf "%d", c }' 2>/dev/null)
fi

echo "RAG rebuild: [${bar}${empty}] ${pct}%"
echo "  chunks: ${chunks}/${TOTAL}   documents: ${docs}/${DOCS}"
echo "  model:  nomic-embed-text (768-dim, local Ollama, nice 19, cores 2-3)"
echo "  last:   ${line:-starting…}"
if [ -f /sys/class/power_supply/BAT0/capacity ]; then
  echo "  power:  $(cat /sys/class/power_supply/BAT0/capacity)% $(cat /sys/class/power_supply/BAT0/status)"
fi
if pgrep -f 'scripts/ensure-rag.ts' >/dev/null; then
  echo "  state:  RUNNING"
else
  echo "  state:  STOPPED (resume: scripts/rag-resume.sh)"
fi
tail -1 "$LOG"
