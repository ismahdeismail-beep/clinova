#!/usr/bin/env bash
# rag-resume-cron.sh — self-healing daily resume of the knowledge_chunks ingest.
#
# Why: the Gemini embedding free tier allows 1000 TEXT embeddings/day/model
# while a full corpus is ~8077 chunks, so completion takes ~8 productive days.
# This wrapper is safe to run HOURLY from cron:
#   * it only starts a run when the last PRODUCTIVE run was >= 20h ago, so it
#     catches up automatically after the machine was asleep/off;
#   * flock stops two runs racing (e.g. a manual `npm run rag:resume`);
#   * quota exhaustion is expected and non-fatal — no stamp is written, so the
#     next hourly tick retries once the daily budget resets.
#
# Install:   17 * * * * /home/ishi/clinova/scripts/rag-resume-cron.sh
# Disable:   crontab -e   (delete the line)
# Logs:      logs/rag-resume.log   (tail -f while it runs)
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p logs

# --- one resume at a time ---------------------------------------------------
exec 9>"/tmp/clinova-rag-resume.lock"
flock -n 9 || exit 0

# --- skip if we embedded something in the last 20h --------------------------
STAMP="logs/rag-resume.last"
if [ -f "$STAMP" ]; then
  age=$(( $(date +%s) - $(stat -c %Y "$STAMP") ))
  [ "$age" -lt 72000 ] && exit 0
fi

report="logs/rag-status-$(date +%Y%m%d).json"
before=$(date +%s)
echo "=== $(date -Is) rag-resume start ===" >>logs/rag-resume.log

# Exit code 1 is the normal "daily quota exhausted" stop — not an error here.
npx tsx scripts/ensure-rag.ts --only-missing --embed-batch 100 --pace-ms 65000 \
  >>logs/rag-resume.log 2>&1 || true

# Only stamp when OUR run actually embedded chunks (report mtime >= start).
written=0
if [ -f "$report" ] && [ "$(stat -c %Y "$report")" -ge "$before" ]; then
  written=$(node -e "const fs=require('fs');try{process.stdout.write(String(JSON.parse(fs.readFileSync(process.argv[1],'utf8')).chunks_written))}catch{process.stdout.write('0')}" "$report" 2>/dev/null || echo 0)
fi

if [ "${written:-0}" -gt 0 ]; then
  touch "$STAMP"
  echo "=== $(date -Is) embedded $written chunks — stamping (next resume in ~20h) ===" >>logs/rag-resume.log
else
  echo "=== $(date -Is) no chunks written (quota exhausted?) — retrying next hour ===" >>logs/rag-resume.log
fi

# Coverage snapshot (best effort; verify exits 0 only at full coverage).
{
  echo "--- $(date -Is) coverage ---"
  node scripts/verify-rag.mjs 2>&1 || true
} >>logs/rag-resume.log
