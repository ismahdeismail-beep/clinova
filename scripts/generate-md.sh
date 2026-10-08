#!/usr/bin/env bash
set -euo pipefail

# usage: ./scripts/generate-md.sh data/drugs_stage2.csv
# CSV header must match template placeholders (without braces):
# DRUG_NAME,GENERIC_NAME,DRUG_CLASS,MECHANISM,DOSAGE,SIDE_EFFECTS,INTERACTIONS,MONITORING,STORAGE

CSV="$1"
TEMPLATE="src/data/monographTemplate.md"
OUT_DIR="src/data/drugMonographs"

if [[ ! -f "$CSV" ]]; then
  echo "CSV file not found: $CSV"
  exit 1
fi

# skip header line
tail -n +2 "$CSV" | while IFS=',' read -r DRUG_NAME GENERIC_NAME DRUG_CLASS MECHANISM DOSAGE SIDE_EFFECTS INTERACTIONS MONITORING STORAGE; do
  # simple escaping: replace newlines with space
  MECHANISM=$(echo "$MECHANISM" | tr '\n' ' ')
  DOSAGE=$(echo "$DOSAGE" | tr '\n' ' ')
  SIDE_EFFECTS=$(echo "$SIDE_EFFECTS" | tr '\n' ' ')
  INTERACTIONS=$(echo "$INTERACTIONS" | tr '\n' ' ')
  MONITORING=$(echo "$MONITORING" | tr '\n' ' ')
  STORAGE=$(echo "$STORAGE" | tr '\n' ' ')

  OUTPUT_FILE="${OUT_DIR}/${DRUG_NAME// /_}.md"
  # generate content by substituting placeholders
  sed -e "s/{{DRUG_NAME}}/$DRUG_NAME/g" \
      -e "s/{{GENERIC_NAME}}/$GENERIC_NAME/g" \
      -e "s/{{DRUG_CLASS}}/$DRUG_CLASS/g" \
      -e "s/{{MECHANISM}}/$MECHANISM/g" \
      -e "s/{{DOSAGE}}/$DOSAGE/g" \
      -e "s/{{SIDE_EFFECTS}}/$SIDE_EFFECTS/g" \
      -e "s/{{INTERACTIONS}}/$INTERACTIONS/g" \
      -e "s/{{MONITORING}}/$MONITORING/g" \
      -e "s/{{STORAGE}}/$STORAGE/g" \
      "$TEMPLATE" > "$OUTPUT_FILE"

  echo "Generated: $OUTPUT_FILE"
done