#!/usr/bin/env bash
set -euo pipefail

# -----------------------------------------------------------------
# import-cases.sh  –  Bulk insert clinical case Q&A into Supabase
# Usage:   SUPABASE_CONNECTION_STRING="postgres://..." ./import-cases.sh data/clinical-cases.csv
# CSV format (header required):
#   query,category,source_monograph_id,expected_answer
# -----------------------------------------------------------------

if [[ -z "${SUPABASE_CONNECTION_STRING:-}" ]]; then
  echo "ERROR: Set SUPABASE_CONNECTION_STRING environment variable." >&2
  exit 1
fi

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <path-to-csv>" >&2
  exit 1
fi

CSV="$1"

# Basic validation
if [[ ! -f "$CSV" ]]; then
  echo "CSV file not found: $CSV" >&2
  exit 1
fi

# Skip header line, insert each row
tail -n +2 "$CSV" | while IFS=',' read -r query category source_monograph_id expected_answer; do
  # trim whitespace
  query=$(echo "$query" | xargs)
  category=$(echo "$category" | xargs)
  source_monograph_id=$(echo "$source_monograph_id" | xargs)
  expected_answer=$(echo "$expected_answer" | xargs)

  # Simple UUID validation for source_monograph_id (optional)
  if [[ -n "$source_monograph_id" ]] && ! echo "$source_monograph_id" | grep -qE '^[0-9a-f-]{36}$'; then
    echo "WARNING: source_monograph_id '$source_monograph_id' is not a valid UUID; inserting NULL." >&2
    source_monograph_id=""
  fi

  psql "$SUPABASE_CONNECTION_STRING" <<EOF
INSERT INTO public.bot_training_cases (query, category, source_monograph_id, expected_answer)
VALUES ('$query', '$category', '${source_monograph_id:-NULL}'::uuid, '$expected_answer')
ON CONFLICT (lower(query)) DO NOTHING;
EOF
  echo "Inserted case: ${query:0:40}..."
done

echo "Import complete."
