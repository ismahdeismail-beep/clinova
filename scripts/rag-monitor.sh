#!/usr/bin/env bash
# rag-monitor.sh — sample rebuild progress on an interval, append to a log.
#   scripts/rag-monitor.sh [samples] [interval_seconds]
# Default: 24 samples every 300 s (2 hours). Safe to run alongside a live run.
set -uo pipefail
cd "$(dirname "$0")/.."

SAMPLES=${1:-24}
INTERVAL=${2:-300}
OUT=/tmp/opencode/rag-monitor.log
mkdir -p /tmp/opencode

prev=""
for i in $(seq 1 "$SAMPLES"); do
  ts=$(date '+%Y-%m-%d %H:%M:%S')
  line=$(bash scripts/rag-progress.sh 2>/dev/null \
    | grep -E 'in Supabase|state:|power:' \
    | tr -s ' ' | paste -sd ' | ' -)
  cur=$(echo "$line" | grep -oE '[0-9]+/8801 chunks' | head -1)

  rate=""
  if [ -n "$prev" ] && [ -n "$cur" ]; then
    a=${prev%%/*}; b=${cur%%/*}
    d=$((b - a))
    per=$(( d * 60 / INTERVAL ))
    rate=" | +${d} chunks (${per}/min)"
  fi
  printf '%s %s%s\n' "$ts" "$line" "$rate" | tee -a "$OUT"
  [ -n "$cur" ] && prev="$cur"

  # stop early if the run died
  if ! systemctl --user is-active rag-embed.scope >/dev/null 2>&1; then
    printf '%s run is not active — monitor exiting\n' "$(date '+%H:%M:%S')" | tee -a "$OUT"
    exit 0
  fi
  [ "$i" -lt "$SAMPLES" ] && sleep "$INTERVAL"
done
