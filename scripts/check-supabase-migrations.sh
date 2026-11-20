#!/usr/bin/env bash
set -euo pipefail

# Fails fast when local Supabase migrations and the linked remote project's
# migration history are out of sync. Requires the Supabase CLI on PATH and a
# linked project (or SUPABASE_ACCESS_TOKEN + project linked by the caller).

if ! command -v supabase >/dev/null 2>&1; then
  echo "❌ Supabase CLI ('supabase') not found on PATH."
  echo "   Install it (https://supabase.com/docs/guides/cli) or run this check in CI where it is set up."
  exit 1
fi

echo "Checking linked Supabase migration history..."
echo "Command: supabase migration list --linked"
echo

set +e
output="$(supabase migration list --linked 2>&1)"
status=$?
set -e

printf '%s\n' "$output"

if [ "$status" -ne 0 ]; then
  echo
  echo "❌ Could not read linked Supabase migration history (supabase migration list --linked exited $status)."
  echo "   Ensure SUPABASE_ACCESS_TOKEN and the project ref are correct, the project is linked, and the CLI can reach Supabase."
  echo "   To debug locally: supabase link --project-ref <project-ref> && supabase migration list --linked"
  exit "$status"
fi

# Detect drift: any data row where Local is present but Remote is empty, or Remote
# is present but Local is empty. Header/separator lines are ignored.
drift_lines="$(printf '%s\n' "$output" | awk -F'|' '
  function trim(s) { gsub(/^[[:space:]]+|[[:space:]]+$/, "", s); return s }
  /^[[:space:]]*$/ { next }
  /^[-[:space:]|+]+$/ { next }
  {
    local = trim($1)
    remote = trim($2)
    low = tolower(local " " remote)
    if (low ~ /local/ && low ~ /remote/) next
    if ((local != "" && remote == "") || (local == "" && remote != "")) print $0
  }
')"

if [ -n "$drift_lines" ]; then
  echo
  echo "❌ Supabase migration history drift detected between local files and the linked remote project."
  echo "   Local-only or remote-only migration versions were found:"
  printf '%s\n' "$drift_lines"
  echo
  echo "How to reconcile (apply migrations via the Supabase CLI/CI, never raw SQL):"
  echo "  1. Run locally: supabase link --project-ref <project-ref> && supabase migration list --linked"
  echo "  2. Remote-only version: add the missing file under supabase/migrations/ (or pull/reconstruct it) so history matches."
  echo "  3. Local-only version: if already applied remotely, record it with supabase migration repair --status applied <version>;"
  echo "     if not applied anywhere, apply it through the Supabase CLI/migrations workflow."
  echo "  4. Re-run supabase migration list --linked until Local and Remote columns match."
  exit 1
fi

echo
echo "✅ Supabase migration history is in sync (no local-only or remote-only versions detected)."
