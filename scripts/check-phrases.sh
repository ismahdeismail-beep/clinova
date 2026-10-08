#!/usr/bin/env bash
set -euo pipefail

# List of phrases that are allowed to appear multiple times (defined in uiStrings.ts)
# Anything outside this list that appears more than $MAX_COUNT times will cause failure.
MAX_COUNT=3

# Phrase blacklist - phrases that are allowed to repeat (will be excluded from check)
ALLOWED_PHRASES=(
  "Kenya Drug Index"
  "Browse monographs"
  "Your complete pharmaceutical reference"
)

# Build a temporary file of allowed phrases (escaped for grep)
ALLOWED_FILE=$(mktemp)
for p in "${ALLOWED_PHRASES[@]}"; do
  echo "$p"
done > "$ALLOWED_FILE"

# Count occurrences of each phrase across source files, excluding allowed ones
FAIL=0
for phrase in $(grep -rohP '\b[A-Za-z][A-Za-z\s]{2,}\b' src/**/*.{ts,tsx,md} | sort -u); do
  # skip if in allowed list
  if grep -qF "$phrase" "$ALLOWED_FILE"; then
    continue
  fi
  count=$(grep -roh "$phrase" src/**/*.{ts,tsx,md} 2>/dev/null | wc -l)
  if (( count > MAX_COUNT )); then
    echo "⚠️  Phrase '$phrase' appears $count times (limit $MAX_COUNT)"
    FAIL=1
  fi
done

rm -f "$ALLOWED_FILE"
exit $FAIL