#!/usr/bin/env bash
# import-cases.sh — bulk-insert clinical case Q&As into bot_training_cases.
# Usage: ./scripts/import-cases.sh data/clinical-cases-starter.csv [--dry-run] [--batch N]
set -euo pipefail
cd "$(dirname "$0")/.."
exec npx tsx scripts/import-cases.ts "$@"