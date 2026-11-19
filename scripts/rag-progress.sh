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

# Distinct documents needs a real aggregate: PostgREST caps row reads at 1000,
# which silently under-counts once the table grows.
docs=$(curl -s --max-time 10 \
  "https://api.supabase.com/v1/projects/${SUPABASE_PROJECT_REF}/database/query" \
  -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"query":"select count(distinct source_ref)::int as n from knowledge_chunks"}' 2>/dev/null |
  grep -o '"n":[0-9]*' | cut -d: -f2)

if [ -z "${count:-}" ]; then
  echo "RAG rebuild: progress unavailable — Supabase count failed (network?)"
  if pgrep -f 'scripts/ensure-rag.ts' >/dev/null; then
    echo "  state:       RUNNING (log: $(grep -E 'upsert|embedded' "$LOG" | tail -1))"
  else
    echo "  state:       STOPPED — resume with scripts/rag-resume.sh"
  fi
  exit 0
fi
docs=${docs:-0}
pct=$((count * 100 / TOTAL))
filled=$((pct * 30 / 100))
bar=$(printf '%*s' "$filled" '' | tr ' ' '#')
empty=$(printf '%*s' $((30 - filled)) '' | tr ' ' '.')

echo "RAG rebuild: [${bar}${empty}] ${pct}%"
echo "  in Supabase: ${count}/${TOTAL} chunks · ${docs}/${DOCS} documents"
quota=$(systemctl --user show ollama-rag.scope -p CPUQuotaPerSecUSec 2>/dev/null | cut -d= -f2)
quota=$(awk -v q="$quota" 'BEGIN{
  if (q ~ /ms$/)      { sub(/ms$/,"",q); printf "%d%%", q/10 }
  else if (q ~ /s$/)  { sub(/s$/,"",q);  printf "%d%%", q*100 }
  else                { printf "?" }
}')
lp=$(pgrep -f 'ollama/llama-server' | head -1)
aff=$(taskset -pc "$lp" 2>/dev/null | sed 's/.*: //')
echo "  model:       nomic-embed-text (768-dim, local Ollama, cpus ${aff:-?}, quota ${quota}, nice 19)"
if pgrep -f 'scripts/ensure-rag.ts' >/dev/null; then
  echo "  state:       RUNNING"
else
  echo "  state:       STOPPED — resume with scripts/rag-resume.sh"
fi
if [ -f /sys/class/power_supply/BAT0/capacity ]; then
  echo "  power:       $(cat /sys/class/power_supply/BAT0/capacity)% $(cat /sys/class/power_supply/BAT0/status)"
fi
echo "  last log:    $(grep -E 'upsert|embedded' "$LOG" | tail -1)"
