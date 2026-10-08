#!/usr/bin/env bash
set -euo pipefail

echo "=== UI strings (className, placeholder, aria-label, title) ==="
grep -Rn "className=\|placeholder=\|aria-label=\|title=" src/ | \
  grep -oP '["\'][^"\']{3,}["\']' | sort -u

echo ""
echo "=== Markdown headings (H1) from drug monographs ==="
find src/data/drugMonographs -name '*.md' -exec grep -h '^# ' {} + | sort -u

echo ""
echo "=== Duplicate lines across source (ts/tsx/md) ==="
cat src/**/*.{ts,tsx,md} | sort | uniq -d | head -30

echo ""
echo "=== Phrase frequency (top 20) ==="
cat src/**/*.{ts,tsx,md} | \
  grep -ioP '\b(Kenya Drug Index|Browse monographs|Your complete pharmaceutical reference|Source:|Monograph|Interaction|Dosage)\b' | \
  sort | uniq -c | sort -rn | head -20