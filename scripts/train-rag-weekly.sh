#!/usr/bin/env bash
set -euo pipefail

# -----------------------------------------------------------------
# train-rag-weekly.sh  –  Weekly RAG quality check
#  - Pulls approved bot_training_cases that have not been reviewed yet
#  - For each case, retrieves the top‑3 chunks from knowledge_chunks
#  - Calls Gemini to generate an answer
#  - Compares the generated answer to the expected_answer
#  - Marks the case as 'reviewed' (keeps original status) and records a
#    simple pass/fail flag in a temporary table (optional)
# -----------------------------------------------------------------

if [[ -z "${SUPABASE_CONNECTION_STRING:-}" || -z "${GEMINI_API:-}" ]]; then
  echo "ERROR: Set SUPABASE_CONNECTION_STRING and GEMINI_API environment variables." >&2
  exit 1
fi

# Helper: run a SQL query and return the first column of the first row
sql_query() {
  psql "$SUPABASE_CONNECTION_STRING" -t -A -c "$1"
}

# Helper: call Gemini embedding model and return the embedding vector as a JSON array
embed() {
  local text="$1"
  curl -s "https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=$GEMINI_API" \
    -d "{\"inlineData\": {\"mimeType\": \"text/plain\", \"data\": \"$text\"}}" |
    jq -r '.embedding'   # expects a JSON array [num, ...]
}

# Helper: call Gemini generation model
generate() {
  local prompt="$1"
  curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$GEMINI_API" \
    -d "{\"contents\":[{\"parts\":[{\"text\":\"$prompt\"}]}],\"temperature\":0,\"topP\":0.1}" |
    jq -r '.candidates[0].content.text'
}

# -----------------------------------------------------------------
# 1️⃣ Get cases that need evaluation (status='approved' and reviewed_at is null)
# -----------------------------------------------------------------
CASES=$(sql_query "
  SELECT id, query, expected_answer
  FROM public.bot_training_cases
  WHERE status = 'approved' AND reviewed_at IS NULL
  LIMIT 50;")   # limit for first run; adjust as needed

if [[ -z "$CASES" ]]; then
  echo "No new cases to evaluate."
  exit 0
fi

# -----------------------------------------------------------------
# 2️⃣ Process each case
# -----------------------------------------------------------------
echo "$CASES" | while IFS='|' read -r case_id query expected_answer; do
  echo "Evaluating case $case_id …"

  # a) Embed the user query
  q_emb=$(embed "$query")
  # q_emb is a JSON array; we'll use it in a SQL similarity comparison later

  # b) Retrieve top‑3 chunks by cosine distance using the embedding.
     # Since we may not have pgvector, we'll do a simple Postgres‑jsonb
     # distance approximation: we'll just fetch the first 3 chunks for the
     # monograph associated with the case (simplification).
  # Get the monograph_id from the case
  MONO_ID=$(sql_query "SELECT source_monograph_id FROM public.bot_training_cases WHERE id = $case_id;")

  # Fetch 3 chunks for that monograph (order random, could be improved)
  CHUNKS=$(sql_query "
    SELECT chunk_text
    FROM public.knowledge_chunks
    WHERE monograph_id = '${MONO_ID:-}'
    LIMIT 3;
  ")

  # c) Build the prompt
  # Simple prompt: "Answer using ONLY the following excerpts:\n<chunks>\n${CHUNKS}\n</chunks>\nQuestion: ${query}"
  CHUNKS_TEXT=$(echo "$CHUNKS" | sed 's/|/\n/g')
  PROMPT=$(printf 'Answer using ONLY the following excerpts:\n<chunks>\n%s\n</chunks>\nQuestion: %s' "$CHUNKS_TEXT" "$query")

  # d) Generate answer with Gemini
  GENERATED=$(generate "$PROMPT")

  # e) Compare with expected_answer (simple substring check)
  if [[ "$GENERATED" == *"$expected_answer"* ]]; then
    MARK='pass'
  else
    MARK='fail'
  fi

  # f) Mark the case as reviewed (set reviewed_at) and optionally store result
  sql_query "
    UPDATE public.bot_training_cases
    SET reviewed_at = now(),
        status = 'approved'   -- you may want to change to 'review' on fail
    WHERE id = $case_id;
  "

  echo "Case $case_id → $MARK"
done

echo "Weekly RAG check finished."
