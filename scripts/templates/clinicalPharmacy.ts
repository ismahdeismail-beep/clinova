// ================================================================
// Clinical Pharmacy — Case Templates (5 templates)
// ================================================================
import type { ClinicalCaseTemplate } from '../generateCases';
function t(
  pharmacologySubject: string,
  specialty: string,
  disease: string,
  title: string,
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  chiefComplaint: string,
  hpi: string,
  pmh: string,
  medHx: string,
  pe: string,
  labs: string,
  imaging: string,
  diagnosis: string,
  ddx: string[],
  goals: string,
  pharm: string,
  nonPharm: string,
  carePlan: string,
  dtps: string,
  monitoring: string,
  counselling: string,
  followUp: string,
  pearls: string,
  references: string[],
): ClinicalCaseTemplate {
  return {
    pharmacologySubject,
    specialty,
    disease,
    title,
    difficulty,
    chiefComplaintTemplate: chiefComplaint,
    hpiTemplate: hpi,
    pmhTemplate: pmh,
    medHxTemplate: medHx,
    peTemplate: pe,
    labsTemplate: labs,
    imagingTemplate: imaging,
    diagnosis,
    ddx,
    goalsTemplate: goals,
    pharmTemplate: pharm,
    nonPharmTemplate: nonPharm,
    carePlanTemplate: carePlan,
    dtpsTemplate: dtps,
    monitoringTemplate: monitoring,
    counsellingTemplate: counselling,
    followUpTemplate: followUp,
    pearlsTemplate: pearls,
    references,
  };
}
export const CLINICAL_PHARMACY_TEMPLATES: ClinicalCaseTemplate[] = [
  t('Clinical Pharmacy', 'Clinical Pharmacy / Polypharmacy', 'Polypharmacy Review', 'Complex Polypharmacy Review in an Elderly Patient with Multiple Comorbidities', 'Advanced',
    'Patient on 12 regular medications — dizziness, falls, confusion, and poor adherence',
    '{name}, a {age}-year-old retired {occupation} from {location}, presents for a comprehensive medication review. Currently on 12 regular medications. Over the past 3 months: 2 falls at home, increasing confusion (attributed to "old age"), dizziness on standing, poor appetite, and significant weight loss (6kg). Daughter reports patient frequently misses doses and gets confused about which medications to take. Recently admitted for a fall that caused a hip contusion.',
    'Type 2 Diabetes (20 years), Hypertension (20 years), CKD Stage 3b (eGFR 38), Ischaemic Heart Disease (post-MI 5 years ago, on dual antiplatelet), Heart Failure with reduced EF (EF 40%), Atrial Fibrillation (CHA2DS2VASc 7), Osteoarthritis (knees, hips), Benign Prostatic Hyperplasia, Depression (mild), Insomnia',
    `Medication List (12 regular meds):
1. Metformin 1g BID
2. Glibenclamide 5mg BID
3. Amlodipine 10mg daily
4. Losartan 100mg daily
5. Bisoprolol 5mg daily
6. Aspirin 75mg daily
7. Clopidogrel 75mg daily
8. Warfarin 5mg daily (INR target 2-3)
9. Furosemide 40mg daily
10. Spironolactone 25mg daily
11. Omeprazole 20mg daily (started in hospital 3 months ago)
12. Paracetamol 1g QID (PRN)
+ Zopiclone 7.5mg at bedtime (PRN for sleep)
+ Ibuprofen 400mg PRN (for joint pain — self-prescribed)`,
    'BP supine 142/88, BP standing 108/64 (orthostatic hypotension — drops 34/24). HR 62 (irregularly irregular). BMI 21 (underweight). Mild pedal oedema. Heart sounds: S1 variable, no murmurs. Lungs: mild basal crackles. Abdomen: soft. Cognitive assessment: Montreal Cognitive Assessment (MoCA) 20/30 (mild cognitive impairment). Gait: slow, unsteady, uses walking stick.',
    'K+ 4.2, Na+ 135, Cr 1.9 (eGFR 38), Hb 10.2 (normocytic — anaemia of CKD), INR 3.1 (supratherapeutic — target 2-3). HbA1c 6.8% (on target, but risk of hypoglycaemia due to glibenclamide + reduced renal function). TSH normal. Vitamin D 18 ng/mL (deficient). B12 185 pg/mL (low borderline).',
    'No acute imaging indicated.',
    'Polypharmacy (12 regular medications) with Drug-Related Problems: Adverse Drug Reactions, Drug-Drug Interactions, Inappropriate Prescribing in Older Adults, Suboptimal Adherence, and High Risk of Major Bleeding and Falls',
    ['Polypharmacy with drug-related problems', 'Dementia (medication-induced cognitive impairment)', 'Frailty syndrome', 'Age-related cognitive decline', 'Anaemia of chronic disease'],
    'Reduce pill burden, withdraw potentially inappropriate medications, correct drug-drug interactions, simplify regimen, improve adherence and quality of life',
    '1. STOP Aspirin (no benefit in stable CAD on Clopidogrel + Warfarin — triple therapy increases bleeding risk). 2. STOP Ibuprofen (contraindicated in CKD, HF, and on anticoagulation — nephrotoxic, increases bleeding risk, worsens HF). 3. STOP Glibenclamide (risk of hypoglycaemia in elderly with CKD — SULFONYLUREA of longest duration and highest hypoglycaemia risk). SWITCH to: lower-risk sulfonylurea (Glipizide 5-10mg daily) or DPP-4i (Sitagliptin 50mg daily) or SGLT2i (Dapagliflozin 10mg — but eGFR 38 so use with caution). 4. REDUCE Bisoprolol dose (2.5mg daily — still provides beta-blockade but less orthostatic hypotension). 5. Consider STOP Spironolactone (hyperkalaemia risk with eGFR 38 + warfarin interaction). 6. STOP Omeprazole unless clear ongoing indication (PPI use >8 weeks without indication — risk of B12 deficiency, fractures, C. diff, CKD). 7. STOP Zopiclone (falls risk + cognitive impairment in elderly). 8. Optimise Warfarin: check INR more frequently, reduce dose if needed (currently supratherapeutic). 9. Replace Paracetamol with simple PRN analgesia — avoid NSAIDs. 10. Simplify regimen: Once-daily where possible (e.g., Losartan/amlodipine single pill combination, Metformin XR once daily). 11. Bone health trial: Vitamin D 800 IU daily, Calcium 500mg daily. 12. Consider: START antidepressant with better safety profile if depression warrants treatment (SSRI — Sertraline 25-50mg daily, but monitor for bleeding risk with warfarin).',
    'Simplify packaging: Pill organiser (dosette box). Use large-print labels. Involve daughter/carer in medication management. Fall prevention: home safety assessment, remove rugs, improve lighting, non-slip shoes. Physiotherapy for gait and balance. Nutritional support (appetite stimulants, high-calorie supplements).',
    'Comprehensive medication review completed. Deprescribe: Aspirin, Ibuprofen, Glibenclamide, Zopiclone, Omeprazole. Reduce Bisoprolol. Consider switching to DPP-4i. Continue warfarin with close INR monitoring. Start Vitamin D + Calcium. Arrange pill organiser and carer support. Refer to dietitian. Review in 2 weeks for INR and to reassess adherence.',
    '1. Complex polypharmacy with 12 medications in an elderly patient with multiple comorbidities, CKD, and falls risk. 2. Multiple potentially inappropriate medications per Beers Criteria and STOPP/START criteria. 3. High bleeding risk (triple therapy + NSAID + supratherapeutic INR).',
    '2 weeks: INR, Cr/eGFR, K+, Hb. Monthly: BP, orthostatic vitals, adherence check. 3 monthly: HbA1c, LFTs, cognitive screening. Annual: falls risk assessment, medication review, renal function.',
    'Your loved one is on too many medications — some may be causing more harm than good. We will slowly stop the medications that are not needed or that increase the risk of falls and bleeding. We will simplify the remaining ones so they are easier to take. Do NOT stop any medications without consulting us first — especially the blood thinner (warfarin).',
    'GP/Clinical Pharmacist monthly for medication review and INR. Falls clinic. Dietitian. Physiotherapy. Geriatrician if cognitive decline progresses. Review need for anticholinergic burden (avoid if possible).',
    'Polypharmacy is the single greatest risk factor for adverse drug events in older adults. The Beers Criteria (AGS) and STOPP/START criteria are essential tools for deprescribing in the elderly. The most dangerous medications in older adults: benzodiazepines, anticholinergics, long-acting sulfonylureas, NSAIDs, and triple antithrombotic therapy. A good rule of thumb: for every medication, ask "Is the indication still present? Is the dose appropriate? Is there a safer alternative? Can we stop it?" The "prescribing cascade" is common — treating an ADR with another drug (e.g., giving omeprazole for dyspepsia from aspirin, or antihypertensives for bisoprolol withdrawal). Always check for drug interactions in the elderly.',
    ['ACS Beers Criteria for Potentially Inappropriate Medication Use in Older Adults', 'STOPP/START Criteria', 'WHO: Medication Safety in Older Adults', 'Kenya Clinical Guidelines: Geriatric Care'],
  ),
  t('Clinical Pharmacy', 'Clinical Pharmacy / Antimicrobial Stewardship', 'Antimicrobial Stewardship', 'Antimicrobial Stewardship Review: De-Escalation of Broad-Spectrum Antibiotics', 'Advanced',
    'IV Meropenem started empirically 72 hours ago — patient improving — is de-escalation appropriate?',
    '{name}, a {age}-year-old {occupation} from {location}, was admitted 3 days ago with severe community-acquired pneumonia (CAP) and septic shock. Started on IV Meropenem 1g q8h + Vancomycin 1g q12h empirically. Patient is now clinically improving: fever resolved, BP normalising off vasopressors, O2 saturations improving on 2L nasal prongs (from 15L non-rebreather). Microbiology results now returning. Pharmacy/ID team is reviewing for antimicrobial de-escalation.',
    'No significant PMH. No known drug allergies. No recent hospitalisations. Immunocompetent.',
    'Status epilepticus — no regular meds. Hospital: IV Meropenem 1g q8h (72h), IV Vancomycin 1g q12h (72h).',
    'Current: HR 88, BP 118/72 (off vasopressors), Temp 37.1, RR 20, SpO2 94% on 2L NC. Chest: decreased air entry right lower zone, resolving. Improved from admission: 3 days ago — Temp 39.8, HR 112, BP 82/48, RR 32, SpO2 84% on RA.',
    `Blood cultures (day 0): Streptococcus pneumoniae (penicillin MIC 0.06 mcg/mL — susceptible). Sputum culture: S. pneumoniae (same). No MRSA. No gram-negatives.
Labs: WBC 9.2 (was 18.0 on admission), Neutrophils 70%, CRP 35 mg/L (was 180), Procalcitonin 0.5 ng/mL (was 25). Cr 0.9, eGFR >60.
CRP/PCT trend confirms resolving infection.`,
    'Chest X-ray (today): Right lower lobe consolidation (resolving, decreased density compared to admission).',
    'Severe Community-Acquired Pneumonia due to Penicillin-Susceptible Streptococcus pneumoniae — Clinically Responding to Treatment',
    ['Severe CAP (S. pneumoniae)', 'Hospital-Acquired Pneumonia', 'Aspiration Pneumonia', 'Atypical Pneumonia'],
    'De-escalate antibiotics based on microbiology, avoid unnecessary broad-spectrum use, prevent antimicrobial resistance, reduce side effects and cost',
    '1. STOP Vancomycin (no MRSA identified, no indications for ongoing MRSA coverage). 2. De-escalate Meropenem: Transition to a narrower-spectrum, penicillin-based regimen. OPTIONS: IV Benzylpenicillin 4 million units q4h (narrowest, most targeted, and penicillin-susceptible S. pneumoniae). OR IV Amoxicillin/Clavulanate 1.2g q8h (broader, but better oral step-down option). 3. If clinically stable and tolerating oral: Step down to oral Amoxicillin 1g TID or Amoxicillin/Clavulanate 625mg TID to complete 7-day course (4 days remaining). 4. Duration: 7 days total (from day 1 of effective therapy) — current evidence supports shorter courses for CAP if clinical improvement. 5. No role for continued broad-spectrum therapy when directed therapy is available.',
    'Monitor clinical status: vitals, O2 requirements, chest signs. Encourage early mobilisation. Nutritional support. Deep breathing exercises. Ensure adequate hydration.',
    'De-escalate: STOP Vancomycin. Switch Meropenem → IV Benzylpenicillin 4MU q4h (or Amoxicillin/Clavulanate IV). If tolerating oral in 24h: switch to Amoxicillin 1g TID or Amoxicillin/Clavulanate 625mg TID. Complete 7 days total. Discharge when stable (afebrile 24h, SpO2 >92% on RA, tolerating oral).',
    '1. Clear microbiology results allow targeted therapy — de-escalation is a core antimicrobial stewardship principle. 2. Unnecessary broad-spectrum antibiotics increase risk of C. difficile, resistance, and adverse effects.',
    'Daily: vitals, O2 sat, chest signs, temperature, oral tolerance. Labs: repeat CRP/PCT trend (optional if resolving). No routine cultures needed unless deterioration. Monitor for C. difficile (diarrhoea) — risk increased by broad-spectrum antibiotics.',
    'You are recovering well. The lab has identified the bacteria causing your pneumonia and it is sensitive to a simpler, safer antibiotic. We are therefore changing your antibiotics from the very broad ones to a more targeted treatment. This reduces side effects and helps prevent antibiotic resistance.',
    'Complete antibiotic course (7 days total). Follow-up: chest X-ray in 6 weeks for radiological resolution (if >50 years or smoker). Pneumococcal vaccination before discharge. Influenza vaccination (annually).',
    'Antimicrobial stewardship is not about restricting antibiotics — it\'s about choosing the RIGHT antibiotic, at the RIGHT dose, for the RIGHT duration. De-escalation is safe and recommended once microbiology results are available and the patient is clinically improving. Procalcitonin is a useful biomarker to guide duration and de-escalation decisions. The mantra: "Start smart, then focus." In severe CAP, S. pneumoniae is still the most common pathogen — and it is often penicillin-susceptible. Vancomycin should be stopped if MRSA is ruled out — continuing it unnecessarily increases nephrotoxicity risk.',
    ['IDSA Guidelines: Antimicrobial Stewardship', 'WHO: Antimicrobial Stewardship Programs', 'Kenya Clinical Guidelines: Antibiotic Use', 'CDC: Core Elements of Antibiotic Stewardship'],
  ),
];
