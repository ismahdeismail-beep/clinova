#!/usr/bin/env bash
# Throttled restart of the local RAG embed: CPU-quota enforced by systemd,
# pinned to one core, low priority, sleep inhibited.
set -u
cd /home/ishi/clinova
LOG=/home/ishi/.cache/clinova/stg/reembed.log
OLLAMA=/home/ishi/.local/bin/ollama
QUOTA=${QUOTA:-40%}

# Stop anything from a previous run (by PID, never by pattern that could match
# this script's own command line).
for p in $(pgrep -f 'ensure-rag\.ts' | grep -v "^$$\$"); do
  [ "$p" = "$$" ] && continue
  kill -9 "$p" 2>/dev/null
done
for p in $(pgrep -f 'ollama/llama-server'); do kill -9 "$p" 2>/dev/null; done
for p in $(pgrep -f '\.local/bin/ollama serve'); do kill -9 "$p" 2>/dev/null; done
sleep 2

# Ollama under a hard CPU quota on core 3 only.
systemd-run --user --scope --unit=ollama-rag --quiet \
  -p CPUQuota="${QUOTA}" \
  taskset -c 3 nice -n 19 "$OLLAMA" serve \
  > /home/ishi/.cache/clinova/stg/ollama.log 2>&1 &
sleep 6

for _ in $(seq 1 20); do
  curl -sf --max-time 2 http://127.0.0.1:11434/api/tags >/dev/null 2>&1 && break
  sleep 1
done

# Ingest under the same quota, with sleep inhibited.
systemd-run --user --scope --unit=rag-embed --quiet \
  -p CPUQuota=15% \
  systemd-inhibit --what=sleep:idle:handle-lid-switch \
    --who="clinova RAG rebuild" \
    --why="local embedding run must not be interrupted" \
    --mode=block \
  taskset -c 3 nice -n 19 ionice -c 3 \
  npx tsx scripts/ensure-rag.ts --only-missing --embed-batch 32 --pace-ms 3000 \
  >> "$LOG" 2>&1 &

echo "started: ollama quota ${QUOTA} (core 3), ingest quota 25% (core 3)"
