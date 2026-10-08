#!/usr/bin/env bash
set -euo pipefail

# Maximum allowed occurrences of each phrase outside of src/data/uiStrings.ts
MAX_OUTSIDE=200

# Phrases that are allowed to appear anywhere (already centralised in uiStrings.ts)
# These will be excluded from the count.
ALLOWED_PHRASES=(
  "Kenya Drug Index"
  "Source:"
)

# Build a temp file with allowed phrases (one per line) for grep -F
ALLOWED_FILE=$(mktemp)
printf '%s\n' "${ALLOWED_PHRASES[@]}" > "$ALLOWED_FILE"

# Get all distinct phrases (lower‑case) from the source tree
PHRASES=$(grep -rohP '\b[A-Za-z]{3,}\b' src/**/*.{ts,tsx,md} 2>/dev/null | \
          tr '[:upper:]' '[:lower:]' | \
          sort -u)

fail=0
for phrase in $PHRASES; do
  # skip allowed phrases
  if grep -qF "$phrase" "$ALLOWED_FILE"; then
    continue
  fi
  # count total occurrences in the source tree
  count=$(grep -roh "$phrase" src/**/*.{ts,tsx,md} 2>/dev/null | wc -l)
  # count how many of those are inside uiStrings.ts (centralised definitions)
  inside_ui=$(grep -c "$phrase" src/data/uiStrings.ts 2>/dev/null || true)
  outside=$(( count - inside_ui ))
  if (( outside > MAX_OUTSIDE )); then
    echo "❌ Phrase '$phrase' appears $outside times outside uiStrings.ts (limit $MAX_OUTSIDE)"
    fail=1
  else
    echo "✅ Phrase '$phrase' is within limits ($outside occurrences outside uiStrings.ts)"
  fi
done

rm -f "$ALLOWED_FILE"
exit $fail