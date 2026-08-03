-- 000013_fix_monograph_column_types.sql
-- The drug_monographs enrichment columns were created ad-hoc with types that
-- contradict the application interface (src/services/drugMonograph.service.ts):
--   clinical_pearls   text      but the app expects string[] (seed batches wrote
--                               [] which PostgREST stored as JSON text "[]" — a
--                               string, so monographToMarkdown's list() crashed
--                               on .map() and the Drug Index view broke)
--   pharmacokinetics  jsonb     but the app expects text (object rows rendered
--                               as [object Object])
-- Convert existing values so the schema matches the interface:
--   - clinical_pearls: JSON-array text -> text[]; plain text -> single-element
--   - pharmacokinetics: jsonb string -> text; jsonb object -> "key: value" lines

ALTER TABLE drug_monographs
  ALTER COLUMN clinical_pearls TYPE text[]
  USING (
    CASE
      WHEN clinical_pearls IS NULL THEN NULL
      WHEN clinical_pearls LIKE '[%' THEN (SELECT array_agg(x) FROM jsonb_array_elements_text(clinical_pearls::jsonb) x)
      ELSE ARRAY[clinical_pearls]
    END
  );

ALTER TABLE drug_monographs
  ALTER COLUMN pharmacokinetics TYPE text
  USING (
    CASE
      WHEN pharmacokinetics IS NULL THEN NULL
      WHEN jsonb_typeof(pharmacokinetics) = 'object'
        THEN (SELECT string_agg(
                key || ': ' ||
                CASE WHEN jsonb_typeof(value) = 'string' THEN value #>> '{}' ELSE value::text END,
                E'\n'
              )
              FROM jsonb_each(pharmacokinetics))
      ELSE pharmacokinetics::text
    END
  );
