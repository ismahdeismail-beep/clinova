/**
 * Interface representing structured clinical data retrieved from openFDA
 */
export interface OpenFdaLabelData {
  genericName?: string;
  brandName?: string;
  indicationsAndUsage?: string;
  dosageAndAdministration?: string;
  contraindications?: string;
  warningsAndPrecautions?: string;
  adverseReactions?: string;
  drugInteractions?: string;
  boxedWarning?: string;
}

/**
 * Interface representing parsed RxNorm interactions
 */
export interface NlmInteractionData {
  type: string;
  severity: 'Critical' | 'Moderate' | 'Minor';
  title: string;
  description: string;
  recommendation: string;
}

/**
 * Resolves a drug name to its corresponding RxNorm Concept Unique Identifier (RxCUI)
 */
export async function resolveRxCui(drugName: string): Promise<string | null> {
  try {
    const trimmed = drugName.trim();
    if (!trimmed) return null;

    // Try standard rxcui lookup
    const url = `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${encodeURIComponent(trimmed)}`;
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    
    if (!response.ok) return null;
    const data: any = await response.json();
    
    if (data?.idGroup?.rxnormId && data.idGroup.rxnormId.length > 0) {
      return data.idGroup.rxnormId[0];
    }

    // Fallback: Try drugs query for brand names or variations
    const fallbackUrl = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(trimmed)}`;
    const fbResponse = await fetch(fallbackUrl, { headers: { 'Accept': 'application/json' } });
    if (fbResponse.ok) {
      const fbData: any = await fbResponse.json();
      const firstGroup = fbData?.drugGroup?.conceptGroup?.[0];
      const firstConcept = firstGroup?.conceptProperties?.[0];
      if (firstConcept?.rxcui) {
        return firstConcept.rxcui;
      }
    }

    return null;
  } catch (error) {
    console.warn(`[RxNorm] Failed to resolve RxCUI for ${drugName}:`, error);
    return null;
  }
}

/**
 * Fetches clinical label data from openFDA API
 */
export async function fetchOpenFdaLabel(drugName: string): Promise<OpenFdaLabelData | null> {
  try {
    const trimmed = drugName.trim();
    if (!trimmed) return null;

    // Search by generic name or brand name
    const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(trimmed)}"+OR+openfda.brand_name:"${encodeURIComponent(trimmed)}"&limit=1`;
    const response = await fetch(url);
    
    if (!response.ok) {
      // Try loose text search if strict brand/generic search fails
      const fallbackUrl = `https://api.fda.gov/drug/label.json?search=search="${encodeURIComponent(trimmed)}"&limit=1`;
      const fbResponse = await fetch(fallbackUrl);
      if (!fbResponse.ok) return null;
      const fbData: any = await fbResponse.json();
      return parseOpenFdaLabelResponse(fbData);
    }

    const data: any = await response.json();
    return parseOpenFdaLabelResponse(data);
  } catch (error) {
    console.warn(`[openFDA] Failed to fetch label for ${drugName}:`, error);
    return null;
  }
}

/**
 * Parses and extracts text fields safely from openFDA JSON response
 */
function parseOpenFdaLabelResponse(data: any): OpenFdaLabelData | null {
  const result = data?.results?.[0];
  if (!result) return null;

  const extractField = (field: any): string => {
    if (!field) return '';
    if (Array.isArray(field)) {
      return field.join('\n').trim();
    }
    return String(field).trim();
  };

  const openfda = result.openfda || {};

  return {
    genericName: extractField(openfda.generic_name),
    brandName: extractField(openfda.brand_name),
    indicationsAndUsage: extractField(result.indications_and_usage),
    dosageAndAdministration: extractField(result.dosage_and_administration),
    contraindications: extractField(result.contraindications),
    warningsAndPrecautions: extractField(result.warnings_and_cautions || result.warnings_and_precautions || result.warnings),
    adverseReactions: extractField(result.adverse_reactions),
    drugInteractions: extractField(result.drug_interactions),
    boxedWarning: extractField(result.boxed_warning),
  };
}

/**
 * Fetches known drug-drug interactions for a set of resolved RxCUIs from the NLM RxNav API
 */
export async function fetchRxNormInteractions(rxcuis: string[]): Promise<NlmInteractionData[]> {
  try {
    if (rxcuis.length < 2) return [];

    const url = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxcuis.join('+')}`;
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    
    if (!response.ok) return [];
    const data: any = await response.json();
    
    const interactions: NlmInteractionData[] = [];
    const groups = data?.fullInteractionTypeGroup || [];

    for (const group of groups) {
      const typeList = group.fullInteractionType || [];
      for (const interactionType of typeList) {
        const pairs = interactionType.interactionPair || [];
        for (const pair of pairs) {
          const concepts = pair.interactionConcept || [];
          const name1 = concepts[0]?.minConceptItem?.name || 'Medication A';
          const name2 = concepts[1]?.minConceptItem?.name || 'Medication B';
          
          const rawSeverity = String(pair.severity || '').toLowerCase();
          const severity = rawSeverity === 'high' ? 'Critical' : rawSeverity === 'moderate' ? 'Moderate' : 'Minor';

          interactions.push({
            type: 'Drug-Drug',
            severity,
            title: `${name1} + ${name2} Co-administration`,
            description: pair.description || `Potential interaction detected between ${name1} and ${name2}.`,
            recommendation: `Monitor clinically. Consult KDI / DailyMed prescribing guidelines for necessary adjustment or separation.`,
          });
        }
      }
    }

    return interactions;
  } catch (error) {
    console.warn('[RxNorm Interactions] Failed to fetch interactions:', error);
    return [];
  }
}
