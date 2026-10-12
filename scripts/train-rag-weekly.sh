#!/usr/bin/env bash
# train-rag-weekly.sh — evaluate approved, unreviewed cases against embedded
# knowledge chunks (semantic retrieval + Gemini, temperature 0).
# Usage: ./scripts/train-rag-weekly.sh [--limit N]
set -euo pipefail
cd "$(dirname "$0")/.."
exec npx tsx scripts/train-rag-weekly.ts "$@"