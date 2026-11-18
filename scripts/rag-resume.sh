#!/usr/bin/env bash
# rag-resume.sh — resume the local RAG re-embed where it left off.
#   scripts/rag-resume.sh
# Safe to run repeatedly: it no-ops while a run is alive, and --only-missing
# skips every document already checkpointed in knowledge_chunks.
set -euo pipefail
cd "$(dirname "$0")/.."

LOG=/home/ishi/.cache/clinova/stg/reembed.log
mkdir -p logs /home/ishi/.cache/clinova/stg

if pgrep -f 'scripts/ensure-rag.ts' >/dev/null; then
  echo "already running — nothing to do"
  exit 0
fi

if ! curl -sf --max-time 3 http://127.0.0.1:11434/api/tags >/dev/null 2>&1; then
  echo "starting ollama (2 cores, nice 19)…"
  nohup taskset -c 2,3 nice -n 19 /home/ishi/.local/bin/ollama serve \
    > /home/ishi/.cache/clinova/stg/ollama.log 2>&1 &
  for _ in $(seq 1 20); do
    curl -sf --max-time 2 http://127.0.0.1:11434/api/tags >/dev/null 2>&1 && break
    sleep 1
  done
fi

nohup systemd-inhibit \
  --what=sleep:idle:handle-lid-switch \
  --who="clinova RAG rebuild" \
  --why="local embedding run must not be interrupted" \
  --mode=block \
  taskset -c 2,3 nice -n 19 ionice -c 3 \
  npx tsx scripts/ensure-rag.ts --only-missing --embed-batch 32 --pace-ms 2000 \
  >> "$LOG" 2>&1 &

echo "resumed (pid $!) — follow with: scripts/rag-progress.sh"
