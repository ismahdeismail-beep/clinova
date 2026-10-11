#!/usr/bin/env bash
# ensure-rag.sh — run the knowledge-chunks ingestion one-shot (nightly-cron friendly).
# Usage: ./scripts/ensure-rag.sh [--dry-run] [--limit N] [--batch N]
set -euo pipefail
cd "$(dirname "$0")/.."
exec npx tsx scripts/ensure-rag.ts "$@"