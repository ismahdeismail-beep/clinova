#!/usr/bin/env bash
# rag-progress.sh — live progress of the local RAG re-embed, read from Supabase.
#   watch -n 15 /home/ishi/clinova/scripts/rag-progress.sh
set -u
cd "$(dirname "$0")/.."
LOG=${1:-/home/ishi/.cache/clinova/stg/reembed.log}
TOTAL=8801
DOCS=1142

set -a
# shellcheck disable=SC1091
[ -f .env ] && . ./.env
set +a

count=$(curl -s -o /dev/null -D - --max-time 8 \
  "${SUPABASE_URL}/rest/v1/knowledge_chunks?select=id" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Prefer: count=exact" \
  -H "Range: 0-0" 2>/dev/null |
  tr -d '\r' | awk -F'/' '/^content-range:/ {print $2}')

docs=$(curl -s --max-time 8 \
  "${SUPABASE_URL}/rest/v1/knowledge_chunks?select=source_ref" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Range: 0-9999" 2>/dev/null | grep -o '"source_ref":"[^"]*"' | sort -u | wc -l)

count=${count:-0}
docs=${docs:-0}
pct=$((count * 100 / TOTAL))
filled=$((pct * 30 / 100))
bar=$(printf '%*s' "$filled" '' | tr ' ' '#')
empty=$(printf '%*s' $((30 - filled)) '' | tr ' ' '.')

echo "RAG rebuild: [${bar}${empty}] ${pct}%"
echo "  in Supabase: ${count}/${TOTAL} chunks · ${docs}/${DOCS} documents"
echo "  model:       nomic-embed-text (768-dim, local Ollama, nice 19, cores 2-3)"
if pgrep -f 'scripts/ensure-rag.ts' >/dev/null; then
  echo "  state:       RUNNING"
else
  echo "  state:       STOPPED — resume with scripts/rag-resume.sh"
fi
if [ -f /sys/class/power_supply/BAT0/capacity ]; then
  echo "  power:       $(cat /sys/class/power_supply/BAT0/capacity)% $(cat /sys/class/power_supply/BAT0/status)"
fi
echo "  last log:    $(grep -E 'upsert|embedded' "$LOG" | tail -1)"
