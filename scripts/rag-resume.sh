#!/usr/bin/env bash
# rag-resume.sh — resume the local RAG re-embed where it left off.
#   scripts/rag-resume.sh
# Safe to run repeatedly: it no-ops while a run is alive, and --only-missing
# skips every document already checkpointed in knowledge_chunks.
#
# Throttle policy (why these numbers):
#   ollama  : cores 2,3 · CPUQuota=100% · nice 19 · keep_alive=-1
#   ingest  : cores 2,3 · CPUQuota=20%  · nice 19 · ionice idle
#   Cores 0,1 are left completely free for the desktop.
#   keep_alive=-1 matters: a cold nomic load takes ~100 s and the client
#   times out first, which is what produced the old "fetch failed" errors.
#
# Override any of it from the environment, e.g. to give the rebuild the whole
# machine while nobody is using it:
#   OLLAMA_CORES=0-3 OLLAMA_QUOTA=350% INGEST_CORES=0-3 INGEST_QUOTA=60% \
#   BATCH=24 PACE=0 scripts/rag-resume.sh
# nice 19 is kept in every profile, so the desktop still wins any contention.
set -euo pipefail
cd "$(dirname "$0")/.."

OLLAMA_CORES=${OLLAMA_CORES:-2,3}
OLLAMA_QUOTA=${OLLAMA_QUOTA:-100%}
INGEST_CORES=${INGEST_CORES:-2,3}
INGEST_QUOTA=${INGEST_QUOTA:-20%}
BATCH=${BATCH:-16}
PACE=${PACE:-500}

LOG=/home/ishi/.cache/clinova/stg/reembed.log
OLLAMA_LOG=/home/ishi/.cache/clinova/stg/ollama.log
mkdir -p logs /home/ishi/.cache/clinova/stg

if pgrep -f 'scripts/ensure-rag.ts' >/dev/null; then
  echo "already running — nothing to do"
  exit 0
fi

# --- ollama: two cores, quota-limited, model pinned in memory -----------------
if ! curl -sf --max-time 3 http://127.0.0.1:11434/api/tags >/dev/null 2>&1; then
  echo "starting ollama (cores $OLLAMA_CORES · $OLLAMA_QUOTA · nice 19 · keep_alive=-1)…"
  nohup env OLLAMA_KEEP_ALIVE=-1 OLLAMA_NUM_PARALLEL=1 OLLAMA_MAX_LOADED_MODELS=1 \
    systemd-run --user --scope --unit=ollama-rag -p CPUQuota="$OLLAMA_QUOTA" \
    taskset -c "$OLLAMA_CORES" nice -n 19 /home/ishi/.local/bin/ollama serve \
    > "$OLLAMA_LOG" 2>&1 &
  for _ in $(seq 1 30); do
    curl -sf --max-time 2 http://127.0.0.1:11434/api/tags >/dev/null 2>&1 && break
    sleep 1
  done
fi

# --- warm the model so the first real batch does not pay the load cost -------
curl -sf --max-time 300 http://127.0.0.1:11434/api/embed \
  -d '{"model":"nomic-embed-text","input":["search_query: warm"],"keep_alive":-1}' \
  >/dev/null || echo "warning: warm-up failed (continuing)"

# --- ingest: two cores, low quota, idle IO ------------------------------------
nohup systemd-run --user --scope --unit=rag-embed -p CPUQuota="$INGEST_QUOTA" \
  taskset -c "$INGEST_CORES" nice -n 19 ionice -c 3 \
  systemd-inhibit \
    --what=sleep:idle:handle-lid-switch \
    --who="clinova RAG rebuild" \
    --why="local embedding run must not be interrupted" \
    --mode=block \
  npx tsx scripts/ensure-rag.ts --only-missing --embed-batch "$BATCH" --pace-ms "$PACE" \
  >> "$LOG" 2>&1 &

echo "resumed (pid $!) — ollama $OLLAMA_CORES/$OLLAMA_QUOTA · ingest $INGEST_CORES/$INGEST_QUOTA · batch $BATCH"
echo "follow with: scripts/rag-progress.sh"
