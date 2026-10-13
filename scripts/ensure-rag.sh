#!/usr/bin/env bash
# ensure-rag.sh — run the knowledge-chunks ingestion one-shot (nightly-cron friendly).
# Usage: ./scripts/ensure-rag.sh [--dry-run] [--limit N] [--batch N] [--embed-batch N] \
#                                [--reset] [--only-missing] [--pace-ms N]
#   --only-missing  resume a partial/quota-stopped run (npm run rag:resume)
#   --pace-ms 65000 safe rate for the free tier (100 texts/min per model)
set -euo pipefail
cd "$(dirname "$0")/.."
exec npx tsx scripts/ensure-rag.ts "$@"