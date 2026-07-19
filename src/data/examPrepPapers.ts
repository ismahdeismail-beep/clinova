// AUTO-GENERATED mock exam papers (do not edit by hand).
// Grounded in the real crawled past papers (src/data/examPrepCrawled.ts) plus the Clinova
// clinical-case bank and KDI drug monographs, generated via Mistral (mistral-small-latest).
// 8 clinical-pharmacy subjects x 3 papers each (standard format A=30 / B=40 / C=30 = 100 marks).
// Titles mirror the real past-paper names (e.g. "Respiratory & Renal").
// No unit codes or school name included.
import { type ExamUnitSpec } from './examPrepData';

export interface GeneratedQuestion {
  stem: any;
  options?: any[];
  answer?: any;
  explanation?: any;
  modelAnswer?: any;
}

export interface GeneratedSection {
  letter: string;
  name: string;
  marks: number;
  questions: GeneratedQuestion[];
}

export interface GeneratedPaper {
  title: string;
  variant: number;
  sections: GeneratedSection[];
}

export const EXAM_PREP_PAPERS: Record<string, Record<number, GeneratedPaper>> =
{
  "exam-antimicrobials": {
    "1": {
      "title": "Principles of Antimicrobial Therapy",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Which of the following is the PRIMARY purpose of an antibiogram in a healthcare facility?",
              "options": [
                "To determine the exact minimum inhibitory concentration (MIC) of antibiotics for a specific patient.",
                "To provide a summary of antimicrobial susceptibility patterns among bacterial isolates in a localized population.",
                "To identify the most expensive antibiotics for formulary inclusion.",
                "To predict the emergence of resistance in laboratory strains of bacteria."
              ],
              "answer": "To provide a summary of antimicrobial susceptibility patterns among bacterial isolates in a localized population.",
              "explanation": "An antibiogram is a tool used to track and report antimicrobial susceptibility data for bacterial isolates from a specific institution or region, guiding empirical therapy decisions."
            },
            {
              "stem": "A 65-year-old male with a history of COPD is admitted with community-acquired pneumonia. Sputum culture reveals Streptococcus pneumoniae with intermediate susceptibility to penicillin. Which of the following is the MOST appropriate empiric therapy adjustment?",
              "options": [
                "Switch to high-dose amoxicillin (3g/day) to achieve higher lung concentrations.",
                "Continue standard-dose penicillin G as the isolate is only intermediately resistant.",
                "Add vancomycin to cover potential penicillin-resistant strains.",
                "Switch to ceftriaxone to ensure adequate coverage for penicillin-intermediate S. pneumoniae."
              ],
              "answer": "Switch to ceftriaxone to ensure adequate coverage for penicillin-intermediate S. pneumoniae.",
              "explanation": "Ceftriaxone provides reliable coverage for penicillin-intermediate S. pneumoniae and is a recommended alternative in such cases."
            },
            {
              "stem": "Which of the following is NOT a core component of antimicrobial stewardship programs?",
              "options": [
                "Routine use of rapid diagnostic tests to guide therapy.",
                "Mandatory restriction of all broad-spectrum antibiotics.",
                "Education of healthcare providers on appropriate antibiotic use.",
                "Monitoring of antibiotic prescribing practices and resistance trends."
              ],
              "answer": "Mandatory restriction of all broad-spectrum antibiotics.",
              "explanation": "Antimicrobial stewardship emphasizes judicious use rather than blanket restrictions, focusing on selecting the right drug, dose, and duration."
            },
            {
              "stem": "A patient with a history of anaphylaxis to penicillin is diagnosed with bacterial meningitis. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone",
                "Aztreonam",
                "Vancomycin + ceftriaxone",
                "Meropenem"
              ],
              "answer": "Vancomycin + ceftriaxone",
              "explanation": "Vancomycin provides coverage for penicillin-resistant Gram-positive organisms, while ceftriaxone covers Gram-negative organisms, including Neisseria meningitidis."
            },
            {
              "stem": "Which of the following is the MOST common cause of community-acquired pneumonia (CAP) in adults?",
              "options": [
                "Haemophilus influenzae",
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Legionella pneumophila"
              ],
              "answer": "Streptococcus pneumoniae",
              "explanation": "S. pneumoniae is the leading cause of CAP globally, accounting for approximately 30-50% of cases."
            },
            {
              "stem": "A 32-year-old female with a history of penicillin allergy (rash) is diagnosed with a urinary tract infection caused by Escherichia coli. Which of the following is the MOST appropriate oral therapy?",
              "options": [
                "Amoxicillin",
                "Ciprofloxacin",
                "Cephalexin",
                "Trimethoprim-sulfamethoxazole"
              ],
              "answer": "Trimethoprim-sulfamethoxazole",
              "explanation": "Trimethoprim-sulfamethoxazole is a suitable alternative for patients with penicillin allergy and is effective against many E. coli strains causing UTIs."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent antimicrobial resistance in hospitalized patients?",
              "options": [
                "Administering broad-spectrum antibiotics prophylactically to all surgical patients.",
                "Using narrow-spectrum antibiotics whenever possible and de-escalating based on culture results.",
                "Extending the duration of antibiotic therapy to ensure complete eradication of bacteria.",
                "Relying solely on newer antibiotics to treat resistant infections."
              ],
              "answer": "Using narrow-spectrum antibiotics whenever possible and de-escalating based on culture results.",
              "explanation": "De-escalation and use of narrow-spectrum antibiotics reduce the selective pressure for resistance and minimize collateral damage to the microbiome."
            },
            {
              "stem": "A 45-year-old male with a history of alcohol use disorder is started on standard four-drug therapy (RHZE) for pulmonary tuberculosis. Which of the following increases his risk of hepatotoxicity?",
              "options": [
                "Age over 40 years",
                "Alcohol use disorder",
                "Male gender",
                "Normal baseline liver function tests"
              ],
              "answer": "Alcohol use disorder",
              "explanation": "Chronic alcohol use is a major risk factor for hepatotoxicity with anti-TB drugs, particularly isoniazid and rifampicin."
            },
            {
              "stem": "Which of the following is the MOST appropriate action if a patient develops elevated liver enzymes (ALT 300 U/L, AST 240 U/L) while on RHZE therapy for tuberculosis?",
              "options": [
                "Continue all TB medications and monitor liver enzymes weekly.",
                "Discontinue all TB medications permanently.",
                "Stop TB medications temporarily and restart once liver enzymes normalize.",
                "Perform a drug rechallenge with ethambutol alone."
              ],
              "answer": "Stop TB medications temporarily and restart once liver enzymes normalize.",
              "explanation": "Temporary discontinuation with careful rechallenge is recommended for patients with drug-induced hepatotoxicity, guided by clinical guidelines."
            },
            {
              "stem": "A 28-year-old female presents with atypical pneumonia symptoms, including dry cough, headache, and myalgia. Which of the following is the MOST likely causative organism?",
              "options": [
                "Streptococcus pneumoniae",
                "Mycoplasma pneumoniae",
                "Klebsiella pneumoniae",
                "Pseudomonas aeruginosa"
              ],
              "answer": "Mycoplasma pneumoniae",
              "explanation": "M. pneumoniae is a common cause of atypical pneumonia, characterized by extrapulmonary symptoms and gradual onset."
            },
            {
              "stem": "Which of the following macrolides is preferred for the treatment of Mycoplasma pneumoniae in a patient with compliance issues?",
              "options": [
                "Erythromycin",
                "Clarithromycin",
                "Azithromycin",
                "Telithromycin"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin has a long half-life and convenient once-daily dosing, improving adherence compared to other macrolides."
            },
            {
              "stem": "A 50-year-old male with a history of COPD is admitted with pneumonia. Sputum culture reveals Pseudomonas aeruginosa. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone",
                "Piperacillin-tazobactam",
                "Vancomycin",
                "Azithromycin"
              ],
              "answer": "Piperacillin-tazobactam",
              "explanation": "Piperacillin-tazobactam provides broad-spectrum coverage, including Pseudomonas aeruginosa, making it suitable for empiric therapy in this context."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient receiving vancomycin for MRSA bacteremia?",
              "options": [
                "Serum creatinine",
                "Serum potassium",
                "Serum vancomycin trough levels",
                "Liver function tests"
              ],
              "answer": "Serum vancomycin trough levels",
              "explanation": "Vancomycin trough levels are critical for ensuring therapeutic efficacy and minimizing nephrotoxicity."
            },
            {
              "stem": "A 60-year-old male with a history of diabetes and CKD (eGFR 30 mL/min) is diagnosed with a UTI caused by ESBL-producing E. coli. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone",
                "Ciprofloxacin",
                "Meropenem",
                "Nitrofurantoin"
              ],
              "answer": "Meropenem",
              "explanation": "Meropenem is a carbapenem with activity against ESBL-producing organisms and is suitable for patients with reduced renal function."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to reduce the risk of Clostridioides difficile infection in hospitalized patients receiving antibiotics?",
              "options": [
                "Administering probiotics routinely with antibiotics.",
                "Using narrow-spectrum antibiotics and avoiding unnecessary prolonged courses.",
                "Prescribing metronidazole prophylactically.",
                "Routine use of fecal microbiota transplantation."
              ],
              "answer": "Using narrow-spectrum antibiotics and avoiding unnecessary prolonged courses.",
              "explanation": "Narrow-spectrum antibiotics and minimizing duration reduce disruption of the gut microbiome, lowering the risk of C. difficile infection."
            },
            {
              "stem": "A 35-year-old female with a history of penicillin allergy (anaphylaxis) is diagnosed with syphilis. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Doxycycline",
                "Ceftriaxone",
                "Azithromycin",
                "Vancomycin"
              ],
              "answer": "Doxycycline",
              "explanation": "Doxycycline is the recommended alternative for penicillin-allergic patients with syphilis, providing effective coverage."
            },
            {
              "stem": "Which of the following is the MOST common adverse effect associated with isoniazid therapy?",
              "options": [
                "Peripheral neuropathy",
                "Hepatotoxicity",
                "Optic neuritis",
                "Gastrointestinal intolerance"
              ],
              "answer": "Peripheral neuropathy",
              "explanation": "Peripheral neuropathy is a well-known adverse effect of isoniazid due to pyridoxine (vitamin B6) depletion, which can be prevented with pyridoxine supplementation."
            },
            {
              "stem": "A 40-year-old male with a history of IV drug use is admitted with infective endocarditis. Blood cultures reveal methicillin-resistant Staphylococcus aureus (MRSA). Which of the following is the MOST appropriate therapy?",
              "options": [
                "Nafcillin",
                "Vancomycin",
                "Penicillin G",
                "Ceftriaxone"
              ],
              "answer": "Vancomycin",
              "explanation": "Vancomycin is the drug of choice for MRSA endocarditis, providing reliable coverage against methicillin-resistant strains."
            },
            {
              "stem": "Which of the following is the MOST appropriate duration of therapy for uncomplicated community-acquired pneumonia in an otherwise healthy adult?",
              "options": [
                "5 days",
                "7 days",
                "10 days",
                "14 days"
              ],
              "answer": "5 days",
              "explanation": "Current guidelines recommend a minimum of 5 days of therapy for CAP, with discontinuation if the patient is clinically stable and afebrile for 48-72 hours."
            },
            {
              "stem": "A 25-year-old female with a history of penicillin allergy (rash) is diagnosed with group A streptococcal pharyngitis. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Amoxicillin",
                "Cefdinir",
                "Azithromycin",
                "Clindamycin"
              ],
              "answer": "Cefdinir",
              "explanation": "Cefdinir is a third-generation cephalosporin with activity against group A streptococci and a lower risk of cross-reactivity in penicillin-allergic patients."
            },
            {
              "stem": "Which of the following is the MOST appropriate empiric therapy for a patient with hospital-acquired pneumonia (HAP) and risk factors for multidrug-resistant organisms?",
              "options": [
                "Ceftriaxone",
                "Piperacillin-tazobactam + vancomycin",
                "Azithromycin",
                "Trimethoprim-sulfamethoxazole"
              ],
              "answer": "Piperacillin-tazobactam + vancomycin",
              "explanation": "Empiric therapy for HAP with risk factors for MDR organisms should include broad-spectrum coverage, such as piperacillin-tazobactam for Gram-negatives and vancomycin for MRSA."
            },
            {
              "stem": "A 55-year-old male with a history of cirrhosis is admitted with spontaneous bacterial peritonitis. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone",
                "Vancomycin",
                "Metronidazole",
                "Ciprofloxacin"
              ],
              "answer": "Ceftriaxone",
              "explanation": "Ceftriaxone is the recommended empiric therapy for spontaneous bacterial peritonitis due to its activity against common pathogens and favorable safety profile."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent antimicrobial resistance in a long-term care facility?",
              "options": [
                "Administering prophylactic antibiotics to all residents.",
                "Implementing an antimicrobial stewardship program with education and audits.",
                "Relying solely on infection control measures.",
                "Using broad-spectrum antibiotics for all suspected infections."
              ],
              "answer": "Implementing an antimicrobial stewardship program with education and audits.",
              "explanation": "Antimicrobial stewardship programs are essential for reducing inappropriate antibiotic use and preventing resistance in long-term care facilities."
            },
            {
              "stem": "A 30-year-old female with a history of penicillin allergy (anaphylaxis) is diagnosed with Lyme disease. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Doxycycline",
                "Amoxicillin",
                "Ceftriaxone",
                "Azithromycin"
              ],
              "answer": "Doxycycline",
              "explanation": "Doxycycline is the recommended therapy for Lyme disease and is suitable for patients with penicillin allergy."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient receiving amphotericin B for invasive fungal infection?",
              "options": [
                "Serum potassium",
                "Serum creatinine",
                "Liver function tests",
                "Complete blood count"
              ],
              "answer": "Serum creatinine",
              "explanation": "Amphotericin B is nephrotoxic, and serum creatinine should be monitored closely to assess renal function."
            },
            {
              "stem": "A 45-year-old male with a history of HIV (CD4 count 150 cells/mm³) is admitted with Pneumocystis jirovecii pneumonia. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Trimethoprim-sulfamethoxazole",
                "Vancomycin",
                "Azithromycin",
                "Ceftriaxone"
              ],
              "answer": "Trimethoprim-sulfamethoxazole",
              "explanation": "Trimethoprim-sulfamethoxazole is the first-line therapy for P. jirovecii pneumonia in HIV patients."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to reduce the risk of antimicrobial resistance in a hospital setting?",
              "options": [
                "Administering antibiotics only after culture results are available.",
                "Using broad-spectrum antibiotics for all suspected infections.",
                "Implementing a formulary restriction policy for all antibiotics.",
                "Encouraging the use of antibiotics for viral infections."
              ],
              "answer": "Administering antibiotics only after culture results are available.",
              "explanation": "Culture-directed therapy reduces unnecessary antibiotic use and helps prevent resistance."
            },
            {
              "stem": "A 60-year-old male with a history of COPD is admitted with pneumonia. Sputum culture reveals Haemophilus influenzae. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone",
                "Azithromycin",
                "Vancomycin",
                "Amoxicillin-clavulanate"
              ],
              "answer": "Amoxicillin-clavulanate",
              "explanation": "Amoxicillin-clavulanate provides coverage for H. influenzae, including beta-lactamase-producing strains."
            },
            {
              "stem": "Which of the following is the MOST appropriate action if a patient develops a rash while on amoxicillin for a suspected bacterial infection?",
              "options": [
                "Continue amoxicillin and monitor the rash.",
                "Switch to a different penicillin-class antibiotic.",
                "Discontinue amoxicillin and consider an alternative class.",
                "Administer antihistamines and continue amoxicillin."
              ],
              "answer": "Discontinue amoxicillin and consider an alternative class.",
              "explanation": "A rash while on amoxicillin may indicate a hypersensitivity reaction, and the drug should be discontinued to avoid progression to anaphylaxis."
            },
            {
              "stem": "A 35-year-old female with a history of penicillin allergy (rash) is diagnosed with a skin and soft tissue infection caused by Staphylococcus aureus. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Amoxicillin",
                "Cephalexin",
                "Clindamycin",
                "Vancomycin"
              ],
              "answer": "Clindamycin",
              "explanation": "Clindamycin is a suitable alternative for skin and soft tissue infections caused by S. aureus in patients with penicillin allergy."
            },
            {
              "stem": "Which of the following is the MOST appropriate duration of therapy for a patient with osteomyelitis caused by methicillin-susceptible Staphylococcus aureus?",
              "options": [
                "1 week",
                "2 weeks",
                "4-6 weeks",
                "12 weeks"
              ],
              "answer": "4-6 weeks",
              "explanation": "Osteomyelitis typically requires 4-6 weeks of parenteral antibiotic therapy for adequate treatment."
            },
            {
              "stem": "A 50-year-old male with a history of diabetes is admitted with a diabetic foot infection. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Vancomycin",
                "Piperacillin-tazobactam",
                "Ceftriaxone",
                "Ertapenem"
              ],
              "answer": "Ertapenem",
              "explanation": "Ertapenem provides broad-spectrum coverage for diabetic foot infections, including Gram-positive, Gram-negative, and anaerobic organisms."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent antimicrobial resistance in a community pharmacy setting?",
              "options": [
                "Dispensing antibiotics without a prescription.",
                "Educating patients on the appropriate use of antibiotics.",
                "Encouraging the use of broad-spectrum antibiotics for all infections.",
                "Relying solely on infection control measures."
              ],
              "answer": "Educating patients on the appropriate use of antibiotics.",
              "explanation": "Patient education is critical for reducing unnecessary antibiotic use and preventing resistance in the community."
            },
            {
              "stem": "A 40-year-old female with a history of penicillin allergy (anaphylaxis) is diagnosed with bacterial meningitis. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone",
                "Vancomycin + ceftriaxone",
                "Aztreonam",
                "Meropenem"
              ],
              "answer": "Vancomycin + ceftriaxone",
              "explanation": "Vancomycin provides coverage for penicillin-resistant Gram-positive organisms, while ceftriaxone covers Gram-negative organisms, including Neisseria meningitidis."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient receiving linezolid for vancomycin-resistant Enterococcus faecium (VRE) bacteremia?",
              "options": [
                "Serum creatinine",
                "Complete blood count",
                "Liver function tests",
                "Serum potassium"
              ],
              "answer": "Complete blood count",
              "explanation": "Linezolid can cause myelosuppression, and a complete blood count should be monitored closely during therapy."
            },
            {
              "stem": "A 30-year-old male with a history of IV drug use is admitted with infective endocarditis. Blood cultures reveal viridans group streptococci. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Vancomycin",
                "Penicillin G",
                "Ceftriaxone",
                "Gentamicin"
              ],
              "answer": "Penicillin G",
              "explanation": "Penicillin G is the drug of choice for viridans group streptococci endocarditis, providing reliable coverage and synergy with gentamicin."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "List FOUR (4) minor manifestations of acute rheumatic fever as per the Jones Criteria.",
              "modelAnswer": "1. Fever\n2. Arthralgia (without arthritis)\n3. Elevated erythrocyte sedimentation rate (ESR) or C-reactive protein (CRP)\n4. Prolonged PR interval on electrocardiogram (ECG)"
            },
            {
              "stem": "Outline FOUR (4) symptoms and signs that should raise suspicion of pharyngitis of viral etiology.",
              "modelAnswer": "1. Cough\n2. Coryza (runny nose)\n3. Conjunctivitis\n4. Absence of fever or presence of low-grade fever"
            },
            {
              "stem": "A 38-year-old patient with a positive history of treatment for pulmonary tuberculosis (PTB) 5 years ago presents to the chest clinic with chief complaints of malaise for the last 3 weeks, excessive night sweats, and unintended weight loss. Sputum for GeneXpert tests positive for rifampicin-resistant Mycobacterium tuberculosis (MTB). Identify the diagnosis and design a five-drug treatment plan for this patient.",
              "modelAnswer": "Diagnosis: Rifampicin-resistant tuberculosis (RR-TB).\n\nTreatment Plan (5-drug regimen):\n1. Bedaquiline (400 mg daily for 2 weeks, then 200 mg 3 times weekly)\n2. Linezolid (600 mg daily)\n3. Clofazimine (100 mg daily)\n4. Levofloxacin (750 mg daily)\n5. Pyrazinamide (1500 mg daily)\n\nDuration: 6-9 months, depending on clinical response and culture conversion."
            },
            {
              "stem": "Describe SIX (6) core elements of establishing an antimicrobial stewardship program.",
              "modelAnswer": "1. Leadership commitment: Dedicated resources and support from hospital administration.\n2. Accountability: Appointment of a leader or co-leaders responsible for program outcomes.\n3. Pharmacy expertise: Involvement of clinical pharmacists in antibiotic review and recommendations.\n4. Action: Implementing interventions such as pre-authorization, prospective audit, and feedback.\n5. Tracking: Monitoring antibiotic prescribing and resistance patterns.\n6. Reporting: Regular reporting of antibiotic use and resistance trends to prescribers and stakeholders."
            },
            {
              "stem": "A 55-year-old male with a history of COPD is admitted with community-acquired pneumonia (CAP). Sputum culture reveals Streptococcus pneumoniae with intermediate susceptibility to penicillin. Outline FOUR (4) key steps in managing this patient's therapy.",
              "modelAnswer": "1. De-escalate therapy: Switch from empiric broad-spectrum antibiotics to a narrower-spectrum agent such as ceftriaxone.\n2. Monitor clinical response: Assess for improvement in symptoms, resolution of fever, and normalization of vital signs.\n3. Repeat sputum culture: If possible, to confirm eradication of the organism.\n4. Adjust therapy duration: Continue therapy for the recommended duration (typically 5-7 days for CAP) based on clinical stability."
            },
            {
              "stem": "List FOUR (4) adverse effects associated with isoniazid therapy and their management.",
              "modelAnswer": "1. Hepatotoxicity: Monitor liver function tests (LFTs) and discontinue if ALT/AST >3x upper limit of normal.\n2. Peripheral neuropathy: Administer pyridoxine (vitamin B6) 50 mg daily to prevent or treat.\n3. Gastrointestinal intolerance: Administer with food to reduce nausea.\n4. Rash: Discontinue isoniazid and consider alternative therapy if severe."
            },
            {
              "stem": "A 40-year-old female with a history of penicillin allergy (anaphylaxis) is diagnosed with a urinary tract infection caused by Escherichia coli. Outline FOUR (4) appropriate alternative antibiotics and their rationale.",
              "modelAnswer": "1. Nitrofurantoin: Effective against E. coli and safe in patients with penicillin allergy.\n2. Trimethoprim-sulfamethoxazole: Effective against many E. coli strains and suitable for short-course therapy.\n3. Fosfomycin: Single-dose therapy with activity against E. coli, including some resistant strains.\n4. Ciprofloxacin: Fluoroquinolone with activity against E. coli, though reserved for complicated UTIs due to resistance concerns."
            },
            {
              "stem": "Describe FOUR (4) strategies to prevent Clostridioides difficile infection in hospitalized patients receiving antibiotics.",
              "modelAnswer": "1. Use narrow-spectrum antibiotics whenever possible to minimize disruption of the gut microbiome.\n2. Avoid unnecessary prolonged courses of antibiotics.\n3. Implement infection control measures, including hand hygiene and contact precautions.\n4. Consider probiotics (e.g., Saccharomyces boulardii) in high-risk patients, though evidence is mixed."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 22-year-old university student is brought to the emergency department with a 24-hour history of fever, headache, and neck stiffness. On examination, she is febrile (39.5°C), tachycardic (120 bpm), and hypotensive (BP 85/50 mmHg). She has a purpuric rash on her lower extremities. A lumbar puncture is performed, and cerebrospinal fluid (CSF) analysis reveals: WBC 2500 cells/mm³ (90% neutrophils), glucose 20 mg/dL, protein 300 mg/dL. Blood cultures are pending.\n\na) Identify the MOST probable diagnosis and the likely causative organism. (2 marks)\nb) Justify your answer in (a) above. (3 marks)\nc) Describe THREE (3) investigations you would recommend to support your diagnosis. (3 marks)\nd) Review FIVE (5) patient-related factors you would consider while selecting empirical antimicrobial therapy for this patient. (5 marks)\ne) Propose an appropriate treatment plan for this patient. (4 marks)\nf) List TWO (2) complications you would be worried about in this patient. (1 mark)\ng) Explain how you would deal with the contacts of this patient. (2 marks)",
              "modelAnswer": {
                "a) Diagnosis and causative organism:\n- Diagnosis: Legionella pneumonia (Legionnaires' disease) with severe sepsis.\n- Causative organism: Legionella pneumophila (most likely serogroup 1).\n\nb) Justification:\n1. Recent travel and exposure to whirlpool baths: Legionella thrives in water systems and is a common source of outbreaks.\n2. Clinical presentation: Dyspnea, pleuritic chest pain, fever, cough with rusty sputum, and disorientation suggest severe pneumonia.\n3. Laboratory findings: Hypoxemia (SpO2 85%), elevated urea (8.5 mmol/L), and tachycardia are consistent with severe sepsis.\n4. Risk factors: Age, travel, and exposure to contaminated water systems increase the likelihood of Legionella infection.\n5. Chest X-ray findings (if available): Typically shows patchy or lobar infiltrates, often with pleural effusion.\n6. Low sodium levels (if present): Hyponatremia is a classic finding in Legionella pneumonia.\n\nc) Additional investigations:\n1. Legionella urinary antigen test: Rapid and highly specific for L. pneumophila serogroup 1.\n2. Sputum culture on buffered charcoal yeast extract (BCYE) agar: Gold standard for diagnosis but takes 3-5 days.\n3. PCR for Legionella DNA: Useful for detecting non-serogroup 1 strains or in culture-negative cases.\n\n\nd) Admission setting justification:\n- This patient requires inpatient admission due to:\n1. Severe sepsis: Hypotension (BP 100/68 mmHg), tachycardia (PR 110 bpm), and hypoxemia (SpO2 85%).\n2. Altered mental status: Disorientation indicates organ dysfunction.\n3. Elevated urea: Suggests dehydration or renal impairment, increasing risk of complications.\n4. Need for close monitoring: IV fluids, oxygen therapy, and potential escalation to ICU if clinical deterioration occurs.\n- Outpatient management is inappropriate due to the severity of illness.\n- ICU admission may be considered if the patient deteriorates (e.g., worsening hypoxia, shock, or need for mechanical ventilation).\n\n\ne) Treatment plan:\n1. Empiric therapy: IV levofloxacin 750 mg daily or IV azithromycin 500 mg daily (macrolides are first-line for Legionella).\n2. Supportive care: Oxygen therapy to maintain SpO2 >90%, IV fluids for hydration, and monitoring of vital signs.\n3. Adjunctive therapy: Consider corticosteroids if severe sepsis or ARDS develops.\n4. Duration: 7-10 days for immunocompetent patients; 14-21 days for immunocompromised patients or severe disease.\n\n\nf) Monitoring for response to treatment:\n1. Clinical parameters: Resolution of fever, improvement in oxygenation, and hemodynamic stability.\n2. Laboratory parameters: Decreasing CRP and white blood cell count.\n3. Imaging: Repeat chest X-ray to assess resolution of infiltrates.\n4. Microbiological parameters: Repeat Legionella urinary antigen test or sputum culture if initially positive.": ""
              }
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Principles of Antimicrobial Therapy",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 65-year-old male with a history of COPD is admitted with severe community-acquired pneumonia. Sputum culture reveals penicillin-resistant Streptococcus pneumoniae. Which of the following is the MOST appropriate empiric therapy adjustment?",
              "options": [
                "Continue ceftriaxone 1g IV q24h",
                "Switch to vancomycin 1g IV q12h",
                "Switch to levofloxacin 750mg IV daily",
                "Switch to azithromycin 500mg IV daily"
              ],
              "answer": "Switch to levofloxacin 750mg IV daily",
              "explanation": "Levofloxacin provides excellent coverage against penicillin-resistant S. pneumoniae and is recommended for CAP in areas with high resistance rates."
            },
            {
              "stem": "Which of the following is the PRIMARY goal of an antimicrobial stewardship program?",
              "options": [
                "To reduce the cost of antimicrobial therapy",
                "To limit the use of all antibiotics",
                "To optimize antibiotic selection, dosing, and duration to improve patient outcomes and reduce resistance",
                "To ensure all patients receive broad-spectrum antibiotics initially"
              ],
              "answer": "To optimize antibiotic selection, dosing, and duration to improve patient outcomes and reduce resistance",
              "explanation": "Antimicrobial stewardship aims to improve patient outcomes while minimizing resistance through judicious antibiotic use."
            },
            {
              "stem": "A 42-year-old female with a history of penicillin allergy (rash) presents with acute bacterial sinusitis. Which of the following is the MOST appropriate alternative therapy?",
              "options": [
                "Amoxicillin-clavulanate",
                "Cefazolin",
                "Azithromycin",
                "Doxycycline"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin is a macrolide with good activity against respiratory pathogens and is a safe alternative in penicillin-allergic patients with non-anaphylactic reactions."
            },
            {
              "stem": "Which of the following laboratory findings is MOST indicative of drug-induced hepatotoxicity in a patient receiving rifampicin and isoniazid for tuberculosis?",
              "options": [
                "Elevated serum creatinine",
                "Elevated ALT and AST >3 times the upper limit of normal",
                "Thrombocytopenia",
                "Hyperkalemia"
              ],
              "answer": "Elevated ALT and AST >3 times the upper limit of normal",
              "explanation": "Hepatotoxicity from anti-TB drugs typically presents with elevated liver enzymes, particularly ALT and AST."
            },
            {
              "stem": "A 30-year-old male with a history of IV drug use presents with fever, night sweats, and a new heart murmur. Blood cultures grow Staphylococcus aureus. Which valve is MOST commonly affected in this scenario?",
              "options": [
                "Mitral valve",
                "Aortic valve",
                "Tricuspid valve",
                "Pulmonary valve"
              ],
              "answer": "Tricuspid valve",
              "explanation": "The tricuspid valve is most commonly affected in infective endocarditis among IV drug users due to direct bacterial seeding from venous return."
            },
            {
              "stem": "Which of the following is the MOST appropriate empiric therapy for a patient with suspected Legionella pneumonia?",
              "options": [
                "Ceftriaxone 1g IV q24h",
                "Vancomycin 1g IV q12h",
                "Azithromycin 500mg IV daily",
                "Amoxicillin-clavulanate 1.2g IV q8h"
              ],
              "answer": "Azithromycin 500mg IV daily",
              "explanation": "Macrolides (e.g., azithromycin) are first-line for Legionella pneumonia due to their excellent intracellular penetration and activity."
            },
            {
              "stem": "A 55-year-old female with diabetes develops a urinary tract infection caused by extended-spectrum beta-lactamase (ESBL)-producing Escherichia coli. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Nitrofurantoin",
                "Ciprofloxacin",
                "Ceftriaxone",
                "Piperacillin-tazobactam"
              ],
              "answer": "Piperacillin-tazobactam",
              "explanation": "Piperacillin-tazobactam provides broad-spectrum coverage against ESBL-producing organisms and is a carbapenem-sparing option."
            },
            {
              "stem": "Which of the following is the MOST common adverse effect associated with ethambutol therapy for tuberculosis?",
              "options": [
                "Peripheral neuropathy",
                "Optic neuritis",
                "Hepatotoxicity",
                "Nephrotoxicity"
              ],
              "answer": "Optic neuritis",
              "explanation": "Ethambutol is associated with dose-dependent optic neuritis, which requires regular visual monitoring."
            },
            {
              "stem": "A 28-year-old female with a history of penicillin anaphylaxis presents with community-acquired pneumonia. Sputum culture reveals Streptococcus pneumoniae. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Cefazolin 1g IV q8h",
                "Vancomycin 1g IV q12h",
                "Azithromycin 500mg IV daily",
                "Levofloxacin 750mg IV daily"
              ],
              "answer": "Levofloxacin 750mg IV daily",
              "explanation": "Levofloxacin is a fluoroquinolone with excellent activity against S. pneumoniae and is safe in penicillin-allergic patients."
            },
            {
              "stem": "Which of the following is the MOST important factor in determining the duration of antibiotic therapy for community-acquired pneumonia?",
              "options": [
                "Patient age",
                "Severity of illness at presentation",
                "Time to clinical stability",
                "Presence of comorbidities"
              ],
              "answer": "Time to clinical stability",
              "explanation": "Duration of therapy should be guided by time to clinical stability (typically 5-7 days for CAP), not solely by severity or comorbidities."
            },
            {
              "stem": "A 60-year-old male with a history of COPD and recent hospitalization develops hospital-acquired pneumonia. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone 1g IV q24h",
                "Piperacillin-tazobactam 4.5g IV q6h",
                "Azithromycin 500mg IV daily",
                "Vancomycin 1g IV q12h"
              ],
              "answer": "Piperacillin-tazobactam 4.5g IV q6h",
              "explanation": "Piperacillin-tazobactam provides broad-spectrum coverage against common hospital-acquired pneumonia pathogens, including Pseudomonas aeruginosa."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient receiving pyrazinamide for tuberculosis?",
              "options": [
                "Serum potassium",
                "Uric acid levels",
                "Serum magnesium",
                "Serum calcium"
              ],
              "answer": "Uric acid levels",
              "explanation": "Pyrazinamide can cause hyperuricemia and gout, so uric acid monitoring is essential."
            },
            {
              "stem": "A 35-year-old male with a history of HIV presents with fever, cough, and weight loss. Sputum microscopy reveals acid-fast bacilli. Which of the following is the MOST appropriate next step?",
              "options": [
                "Start empiric TB therapy immediately",
                "Order a chest CT scan",
                "Perform a tuberculin skin test",
                "Send sputum for GeneXpert MTB/RIF"
              ],
              "answer": "Send sputum for GeneXpert MTB/RIF",
              "explanation": "GeneXpert MTB/RIF provides rapid diagnosis and rifampicin resistance detection, guiding appropriate therapy."
            },
            {
              "stem": "Which of the following is the MOST appropriate therapy for a patient with active tuberculosis and documented isoniazid resistance?",
              "options": [
                "Rifampicin, ethambutol, pyrazinamide (REZ)",
                "Rifampicin, isoniazid, pyrazinamide (RHZ)",
                "Rifampicin, ethambutol, pyrazinamide, levofloxacin (REZL)",
                "Isoniazid, ethambutol, pyrazinamide (HEZ)"
              ],
              "answer": "Rifampicin, ethambutol, pyrazinamide, levofloxacin (REZL)",
              "explanation": "In isoniazid-resistant TB, a fluoroquinolone (e.g., levofloxacin) is added to the standard regimen to ensure adequate coverage."
            },
            {
              "stem": "A 45-year-old female with a history of chronic kidney disease develops a urinary tract infection caused by Klebsiella pneumoniae. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Nitrofurantoin",
                "Ciprofloxacin",
                "Ceftriaxone",
                "Trimethoprim-sulfamethoxazole"
              ],
              "answer": "Ceftriaxone",
              "explanation": "Ceftriaxone is renally adjusted and provides broad-spectrum coverage against Klebsiella pneumoniae in patients with CKD."
            },
            {
              "stem": "Which of the following is the MOST appropriate counseling point for a patient starting rifampicin therapy?",
              "options": [
                "Urine may turn red-orange; this is normal",
                "Avoid dairy products to reduce gastrointestinal upset",
                "Take with food to enhance absorption",
                "Monitor for hearing loss"
              ],
              "answer": "Urine may turn red-orange; this is normal",
              "explanation": "Rifampicin causes harmless discoloration of body fluids, including urine, tears, and sweat."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol use disorder presents with fever, cough, and weight loss. Chest X-ray shows a right upper lobe infiltrate. Sputum culture grows Mycobacterium tuberculosis. Which of the following is the MOST appropriate initial therapy?",
              "options": [
                "Isoniazid, rifampicin, pyrazinamide, ethambutol (RHZE)",
                "Isoniazid, rifampicin, ethambutol (RHE)",
                "Rifampicin, pyrazinamide, ethambutol (RZE)",
                "Isoniazid, rifampicin, pyrazinamide (RHZ)"
              ],
              "answer": "Isoniazid, rifampicin, pyrazinamide, ethambutol (RHZE)",
              "explanation": "Standard four-drug therapy (RHZE) is recommended for all patients with active TB, including those with alcohol use disorder."
            },
            {
              "stem": "Which of the following is the MOST appropriate therapy for a patient with aspiration pneumonia?",
              "options": [
                "Ceftriaxone",
                "Clindamycin",
                "Azithromycin",
                "Vancomycin"
              ],
              "answer": "Clindamycin",
              "explanation": "Clindamycin provides excellent coverage against anaerobes commonly involved in aspiration pneumonia."
            },
            {
              "stem": "A 25-year-old female with a history of penicillin allergy (anaphylaxis) presents with acute bacterial meningitis. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone 2g IV q12h",
                "Vancomycin 1g IV q12h",
                "Meropenem 2g IV q8h",
                "Chloramphenicol 1g IV q6h"
              ],
              "answer": "Meropenem 2g IV q8h",
              "explanation": "Meropenem provides broad-spectrum coverage against common meningitis pathogens and is safe in penicillin-allergic patients."
            },
            {
              "stem": "Which of the following is the MOST appropriate duration of therapy for a patient with uncomplicated community-acquired pneumonia?",
              "options": [
                "5 days",
                "7 days",
                "10 days",
                "14 days"
              ],
              "answer": "5 days",
              "explanation": "For uncomplicated CAP, a 5-day course of antibiotics is sufficient if the patient achieves clinical stability within 5-7 days."
            },
            {
              "stem": "A 60-year-old male with a history of diabetes and CKD presents with fever, dysuria, and flank pain. Urine culture grows Escherichia coli resistant to ceftriaxone. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Nitrofurantoin",
                "Ciprofloxacin",
                "Piperacillin-tazobactam",
                "Trimethoprim-sulfamethoxazole"
              ],
              "answer": "Piperacillin-tazobactam",
              "explanation": "Piperacillin-tazobactam provides broad-spectrum coverage against ESBL-producing E. coli and is renally adjusted for CKD."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient receiving vancomycin for MRSA pneumonia?",
              "options": [
                "Serum creatinine",
                "Serum potassium",
                "Peak vancomycin levels",
                "Trough vancomycin levels"
              ],
              "answer": "Trough vancomycin levels",
              "explanation": "Trough vancomycin levels are used to monitor efficacy and reduce the risk of nephrotoxicity."
            },
            {
              "stem": "A 30-year-old female with a history of penicillin allergy (rash) presents with acute bacterial sinusitis. Sputum culture grows Haemophilus influenzae. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Amoxicillin-clavulanate",
                "Cefazolin",
                "Azithromycin",
                "Doxycycline"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin provides good coverage against H. influenzae and is a safe alternative in penicillin-allergic patients."
            },
            {
              "stem": "Which of the following is the MOST appropriate therapy for a patient with active tuberculosis and documented rifampicin resistance?",
              "options": [
                "Isoniazid, ethambutol, pyrazinamide, levofloxacin (HEZL)",
                "Rifampicin, isoniazid, pyrazinamide, ethambutol (RHZE)",
                "Isoniazid, rifampicin, pyrazinamide (RHZ)",
                "Rifampicin, ethambutol, pyrazinamide (REZ)"
              ],
              "answer": "Isoniazid, ethambutol, pyrazinamide, levofloxacin (HEZL)",
              "explanation": "In rifampicin-resistant TB, a fluoroquinolone (e.g., levofloxacin) is added to the standard regimen to ensure adequate coverage."
            },
            {
              "stem": "A 55-year-old male with a history of COPD presents with fever, cough, and purulent sputum. Chest X-ray shows a right lower lobe infiltrate. Sputum culture grows Pseudomonas aeruginosa. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone",
                "Piperacillin-tazobactam",
                "Azithromycin",
                "Vancomycin"
              ],
              "answer": "Piperacillin-tazobactam",
              "explanation": "Piperacillin-tazobactam provides excellent coverage against Pseudomonas aeruginosa and is a first-line agent for this pathogen."
            },
            {
              "stem": "Which of the following is the MOST appropriate counseling point for a patient starting isoniazid therapy?",
              "options": [
                "Take with food to reduce gastrointestinal upset",
                "Avoid alcohol to reduce the risk of hepatotoxicity",
                "Monitor for hearing loss",
                "Urine may turn red-orange; this is normal"
              ],
              "answer": "Avoid alcohol to reduce the risk of hepatotoxicity",
              "explanation": "Isoniazid is hepatotoxic, and alcohol use increases this risk, so avoidance is strongly recommended."
            },
            {
              "stem": "A 40-year-old male with a history of IV drug use presents with fever, night sweats, and a new heart murmur. Blood cultures grow Staphylococcus epidermidis. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Vancomycin",
                "Ceftriaxone",
                "Azithromycin",
                "Levofloxacin"
              ],
              "answer": "Vancomycin",
              "explanation": "Vancomycin is the drug of choice for coagulase-negative staphylococci, such as S. epidermidis, in infective endocarditis."
            },
            {
              "stem": "Which of the following is the MOST appropriate therapy for a patient with active tuberculosis and documented pyrazinamide resistance?",
              "options": [
                "Isoniazid, rifampicin, ethambutol (RHE)",
                "Isoniazid, rifampicin, pyrazinamide (RHZ)",
                "Rifampicin, ethambutol, pyrazinamide (REZ)",
                "Isoniazid, ethambutol, levofloxacin (HEL)"
              ],
              "answer": "Isoniazid, rifampicin, ethambutol (RHE)",
              "explanation": "In pyrazinamide-resistant TB, the standard three-drug regimen (RHE) is used without pyrazinamide."
            },
            {
              "stem": "A 35-year-old female with a history of penicillin allergy (anaphylaxis) presents with acute bacterial meningitis. Sputum culture grows Neisseria meningitidis. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone 2g IV q12h",
                "Vancomycin 1g IV q12h",
                "Meropenem 2g IV q8h",
                "Chloramphenicol 1g IV q6h"
              ],
              "answer": "Meropenem 2g IV q8h",
              "explanation": "Meropenem provides broad-spectrum coverage against N. meningitidis and is safe in penicillin-allergic patients."
            },
            {
              "stem": "Which of the following is the MOST appropriate duration of therapy for a patient with hospital-acquired pneumonia?",
              "options": [
                "5 days",
                "7 days",
                "10 days",
                "14 days"
              ],
              "answer": "7 days",
              "explanation": "For hospital-acquired pneumonia, a 7-day course of antibiotics is typically sufficient if the patient achieves clinical stability."
            },
            {
              "stem": "A 60-year-old male with a history of diabetes presents with fever, dysuria, and flank pain. Urine culture grows Escherichia coli resistant to ciprofloxacin. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Nitrofurantoin",
                "Piperacillin-tazobactam",
                "Azithromycin",
                "Trimethoprim-sulfamethoxazole"
              ],
              "answer": "Piperacillin-tazobactam",
              "explanation": "Piperacillin-tazobactam provides broad-spectrum coverage against fluoroquinolone-resistant E. coli."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient receiving ethambutol for tuberculosis?",
              "options": [
                "Serum creatinine",
                "Visual acuity and color vision",
                "Serum potassium",
                "Uric acid levels"
              ],
              "answer": "Visual acuity and color vision",
              "explanation": "Ethambutol is associated with optic neuritis, so regular visual monitoring is essential."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol use disorder presents with fever, cough, and weight loss. Chest X-ray shows a right upper lobe infiltrate. Sputum culture grows Mycobacterium tuberculosis. Which of the following is the MOST appropriate initial therapy adjustment?",
              "options": [
                "Add pyridoxine (vitamin B6) to prevent peripheral neuropathy",
                "Reduce the dose of pyrazinamide to minimize hepatotoxicity",
                "Switch rifampicin to rifabutin to reduce drug interactions",
                "Increase the dose of isoniazid to enhance efficacy"
              ],
              "answer": "Add pyridoxine (vitamin B6) to prevent peripheral neuropathy",
              "explanation": "Pyridoxine is routinely added to isoniazid therapy to prevent peripheral neuropathy, especially in patients with alcohol use disorder."
            },
            {
              "stem": "Which of the following is the MOST appropriate therapy for a patient with active tuberculosis and documented ethambutol resistance?",
              "options": [
                "Isoniazid, rifampicin, pyrazinamide (RHZ)",
                "Rifampicin, isoniazid, ethambutol (RHE)",
                "Isoniazid, rifampicin, ethambutol, levofloxacin (RHEL)",
                "Rifampicin, pyrazinamide, ethambutol (RZE)"
              ],
              "answer": "Isoniazid, rifampicin, pyrazinamide (RHZ)",
              "explanation": "In ethambutol-resistant TB, the standard three-drug regimen (RHZ) is used without ethambutol."
            },
            {
              "stem": "A 45-year-old female with a history of penicillin allergy (rash) presents with acute bacterial sinusitis. Sputum culture grows Moraxella catarrhalis. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Amoxicillin-clavulanate",
                "Cefazolin",
                "Azithromycin",
                "Doxycycline"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin provides good coverage against Moraxella catarrhalis and is a safe alternative in penicillin-allergic patients."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 65-year-old male with a history of COPD is admitted with severe community-acquired pneumonia. Sputum culture reveals penicillin-resistant Streptococcus pneumoniae. Outline FOUR core principles of antimicrobial stewardship that should guide therapy in this patient.",
              "modelAnswer": "1. **De-escalation**: Once microbiology results are available, narrow the spectrum of therapy to target the identified pathogen (e.g., switch from broad-spectrum empiric therapy to a penicillin-based regimen if susceptible).\n2. **Duration optimization**: Limit therapy to the shortest effective duration (typically 5-7 days for CAP) based on clinical response.\n3. **Dose optimization**: Ensure appropriate dosing based on renal function, site of infection, and pathogen susceptibility.\n4. **Monitoring and follow-up**: Monitor for clinical response, adverse effects, and resistance patterns. Adjust therapy if the patient does not improve or if cultures reveal resistance."
            },
            {
              "stem": "A 30-year-old female with a history of penicillin allergy (anaphylaxis) presents with acute bacterial meningitis. Blood cultures grow Streptococcus pneumoniae. Outline FOUR alternative antibiotic options for this patient, including dosing and rationale.",
              "modelAnswer": "1. **Meropenem 2g IV q8h**: Broad-spectrum carbapenem with excellent CNS penetration and activity against penicillin-resistant S. pneumoniae. Safe in penicillin-allergic patients.\n2. **Vancomycin 1g IV q12h + Ceftriaxone 2g IV q12h**: Vancomycin provides coverage for penicillin-resistant strains, while ceftriaxone covers susceptible strains. Monitor vancomycin trough levels.\n3. **Chloramphenicol 1g IV q6h**: Bacteriostatic with good CNS penetration. Reserve for patients with severe beta-lactam allergies due to risk of bone marrow suppression.\n4. **Linezolid 600mg IV q12h**: Oxazolidinone with excellent CNS penetration and activity against gram-positive organisms, including penicillin-resistant S. pneumoniae. Monitor for myelosuppression."
            },
            {
              "stem": "A 55-year-old male with a history of diabetes and CKD presents with fever, dysuria, and flank pain. Urine culture grows Escherichia coli resistant to ceftriaxone and ciprofloxacin. Outline a FIVE-drug treatment plan for this patient, including rationale and monitoring parameters.",
              "modelAnswer": "1. **Piperacillin-tazobactam 4.5g IV q6h**: Broad-spectrum coverage against ESBL-producing E. coli. Renally adjusted for CKD.\n   - Monitoring: Renal function, LFTs, CBC, and signs of allergic reaction.\n2. **Add Amikacin 15mg/kg IV daily**: For synergy against resistant E. coli. Monitor peak/trough levels and renal function.\n   - Monitoring: Serum creatinine, peak/trough amikacin levels, and audiometry.\n3. **Fluids and supportive care**: Ensure adequate hydration to prevent nephrotoxicity from amikacin.\n4. **Pain management**: Acetaminophen for fever and discomfort (avoid NSAIDs due to CKD).\n5. **Follow-up**: Repeat urine culture after 48-72 hours to assess response. Transition to oral therapy if clinically stable and cultures show susceptibility."
            },
            {
              "stem": "A 40-year-old male with a history of IV drug use presents with fever, night sweats, and a new heart murmur. Blood cultures grow Staphylococcus aureus. Outline FOUR core elements of an antimicrobial stewardship program that should be applied in this case.",
              "modelAnswer": "1. **Appropriate empiric therapy**: Start vancomycin empirically for MRSA coverage in IV drug users with suspected endocarditis.\n2. **Culture-directed therapy**: De-escalate to nafcillin or cefazolin if cultures reveal methicillin-susceptible S. aureus (MSSA).\n3. **Duration optimization**: Treat for 4-6 weeks for native valve endocarditis. Monitor for clinical response and complications.\n4. **Monitoring and follow-up**: Monitor vancomycin trough levels, renal function, and signs of treatment failure or complications (e.g., embolic events)."
            },
            {
              "stem": "A 28-year-old female with a history of HIV presents with fever, cough, and weight loss. Sputum microscopy reveals acid-fast bacilli. Outline FOUR steps in the diagnostic workup for tuberculosis in this patient.",
              "modelAnswer": "1. **Sputum for GeneXpert MTB/RIF**: Rapid molecular test to confirm TB and detect rifampicin resistance.\n2. **Sputum culture and sensitivity**: Gold standard for diagnosis and susceptibility testing. Includes Löwenstein-Jensen or liquid culture.\n3. **Chest X-ray**: To assess for typical TB findings (e.g., upper lobe infiltrates, cavitations).\n4. **HIV testing and CD4 count**: Essential for staging and guiding TB-HIV co-treatment (e.g., timing of antiretroviral therapy)."
            },
            {
              "stem": "A 60-year-old male with a history of alcohol use disorder presents with fever, cough, and weight loss. Chest X-ray shows a right upper lobe infiltrate. Sputum culture grows Mycobacterium tuberculosis. Outline FOUR counseling points for this patient to improve adherence and minimize adverse effects.",
              "modelAnswer": "1. **Adherence**: Emphasize the importance of completing the full 6-month course of therapy to prevent treatment failure and resistance.\n2. **Pyridoxine supplementation**: Advise taking vitamin B6 (pyridoxine) 50mg daily to prevent isoniazid-induced peripheral neuropathy.\n3. **Alcohol avoidance**: Strongly advise abstaining from alcohol to reduce the risk of hepatotoxicity from rifampicin and isoniazid.\n4. **Monitoring**: Educate on the need for regular liver function tests (LFTs) and report any symptoms of hepatotoxicity (e.g., jaundice, dark urine, abdominal pain)."
            },
            {
              "stem": "A 35-year-old female with a history of penicillin allergy (rash) presents with acute bacterial sinusitis. Sputum culture grows Haemophilus influenzae. Outline FOUR alternative antibiotic options for this patient, including dosing and rationale.",
              "modelAnswer": "1. **Azithromycin 500mg PO daily for 3 days**: Macrolide with good activity against H. influenzae. Safe in penicillin-allergic patients.\n2. **Doxycycline 100mg PO BID for 5-7 days**: Tetracycline with broad-spectrum activity, including H. influenzae. Avoid in children and pregnant women.\n3. **Cefixime 400mg PO daily for 5-7 days**: Third-generation cephalosporin with activity against H. influenzae. Monitor for cross-reactivity in penicillin-allergic patients.\n4. **Trimethoprim-sulfamethoxazole (TMP-SMX) 160/800mg PO BID for 5-7 days**: Alternative for susceptible strains. Monitor for allergic reactions and renal function."
            },
            {
              "stem": "A 50-year-old male with a history of COPD presents with fever, cough, and purulent sputum. Chest X-ray shows a right lower lobe infiltrate. Sputum culture grows Pseudomonas aeruginosa. Outline FOUR principles of empiric therapy selection for hospital-acquired pneumonia in this patient.",
              "modelAnswer": "1. **Local susceptibility data**: Use antibiograms to guide empiric therapy, ensuring coverage for common pathogens like P. aeruginosa.\n2. **Combination therapy**: Start with an antipseudomonal beta-lactam (e.g., piperacillin-tazobactam) plus an aminoglycoside or fluoroquinolone for synergy and to prevent resistance.\n3. **Host factors**: Consider comorbidities (e.g., COPD, CKD) and prior antibiotic exposure when selecting therapy.\n4. **De-escalation**: Once cultures and susceptibility results are available, narrow therapy to a single agent based on the identified pathogen."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 22-year-old college student is brought to the emergency department with a 24-hour history of fever, headache, neck stiffness, and a petechial rash on the lower extremities. On examination, the patient is confused, tachycardic (HR 120 bpm), and hypotensive (BP 85/50 mmHg). Kernig’s sign is positive. Blood cultures are drawn, and empiric antibiotics are initiated.\n\n(a) Identify the MOST probable diagnosis and the likely causative organism. (2 marks)\n(b) Justify your answer in (a) above. (3 marks)\n(c) Describe THREE investigations you would recommend to support your diagnosis. (3 marks)\n(d) Review FIVE patient-related factors you would consider while selecting empirical antimicrobial therapy for this patient. (5 marks)\n(e) Propose an appropriate treatment plan for this patient. (4 marks)\n(f) List TWO complications you would be worried about in this patient. (1 mark)\n(g) Explain how you would deal with the contacts of this patient. (2 marks)",
              "modelAnswer": {
                "a": "Diagnosis: **Meningococcal meningitis** caused by **Neisseria meningitidis**.",
                "b": "Justification: The patient presents with classic symptoms of meningitis (fever, headache, neck stiffness) and a petechial rash, which is highly suggestive of meningococcal disease. The rapid progression to confusion, tachycardia, and hypotension indicates severe sepsis, consistent with meningococcemia. N. meningitidis is a common cause of bacterial meningitis in young adults, particularly in outbreaks or close-contact settings like college dormitories.",
                "c": "Investigations:\n1. **Lumbar puncture (LP)**: Send cerebrospinal fluid (CSF) for cell count, glucose, protein, Gram stain, culture, and PCR for N. meningitidis.\n2. **Blood cultures**: To identify the causative organism and guide therapy.\n3. **PCR for meningococcal DNA**: Rapid and highly sensitive test for N. meningitidis, especially if LP is delayed or contraindicated.",
                "d": "Patient-related factors:\n1. **Age and setting**: Young adult in a college dormitory, increasing the risk of close contact and transmission.\n2. **Severity of illness**: Septic shock (hypotension, tachycardia) requires aggressive resuscitation and broad-spectrum empiric therapy.\n3. **Allergies**: History of penicillin allergy (if present) would influence antibiotic choice.\n4. **Comorbidities**: None reported, but underlying immunosuppression (e.g., asplenia) would increase risk.\n5. **Renal and hepatic function**: Impaired function may require dose adjustments for renally or hepatically cleared drugs.",
                "e": "Treatment plan:\n1. **Empiric therapy**: Start **ceftriaxone 2g IV q12h** (or **meropenem 2g IV q8h** if penicillin-allergic). Add **vancomycin 1g IV q12h** if MRSA is a concern (e.g., recent hospitalization or IV drug use).\n2. **Steroids**: Administer **dexamethasone 10mg IV q6h for 4 days** (start before or with the first dose of antibiotics) to reduce inflammation and complications.\n3. **Supportive care**: Aggressive fluid resuscitation, vasopressors (e.g., norepinephrine) for hypotension, and ICU monitoring.\n4. **Prophylaxis for contacts**: Administer **rifampicin 600mg PO BID for 2 days** or **ciprofloxacin 500mg PO single dose** to close contacts.",
                "f": "Complications:\n1. **Septic shock with multi-organ failure**: Due to overwhelming meningococcemia.\n2. **Waterhouse-Friderichsen syndrome**: Adrenal hemorrhage and acute adrenal insufficiency secondary to meningococcemia.",
                "g": "Contact management: Identify and provide chemoprophylaxis to close contacts (e.g., household members, dormitory mates, or those exposed to respiratory secretions). Options include rifampicin (600mg PO BID for 2 days) or ciprofloxacin (500mg PO single dose). Vaccination (e.g., MenACWY) may also be recommended for outbreak control."
              }
            },
            {
              "stem": "A 45-year-old male presents to the emergency department with a 3-day history of fever, dyspnea, pleuritic chest pain, and cough productive of rusty sputum. He recently returned from a conference abroad, where he frequently used the hotel whirlpool. On examination, he is disoriented, tachypneic (RR 33/min), hypoxic (SpO2 85% on room air), and febrile (38.8°C). His urea is elevated at 8.5 mmol/L, BP is 100/68 mmHg, and PR is 110 bpm.\n\n(a) Identify the MOST likely diagnosis and the MOST likely causative organism. (2 marks)\n(b) Justify your answer in (a) above. (6 points @0.5 marks each)\n(c) Outline TWO additional investigations you would recommend. (2 marks)\n(d) Evaluate whether you would recommend treating this patient as an outpatient, inpatient (general ward), or in an intensive care unit. Justify your answer. (4 marks)\n(e) Formulate a treatment plan for this patient. (5 marks)\n(f) Using appropriate examples, examine how you would monitor for response to treatment. (4 marks)",
              "modelAnswer": {
                "a": "Diagnosis: **Legionella pneumonia** caused by **Legionella pneumophila**.",
                "b": "Justification:\n1. **Exposure history**: Recent travel and frequent use of a whirlpool bath increase the risk of Legionella exposure.\n2. **Clinical presentation**: High fever, dyspnea, pleuritic chest pain, and rusty sputum are classic for Legionella pneumonia.\n3. **Hypoxemia and confusion**: Severe hypoxia and altered mental status suggest a severe infection, consistent with Legionella.\n4. **Elevated urea**: Reflects dehydration or sepsis, common in severe Legionella pneumonia.\n5. **Chest X-ray findings**: Typically shows patchy or lobar infiltrates, often with pleural effusion.\n6. **Risk factors**: Middle-aged male with no comorbidities but recent travel and exposure to aerosolized water sources.",
                "c": "Additional investigations:\n1. **Urinary Legionella antigen test**: Rapid and specific for L. pneumophila serogroup 1, the most common cause of Legionella pneumonia.\n2. **Sputum culture for Legionella**: Specialized media (e.g., buffered charcoal yeast extract agar) is required for isolation.",
                "d": "Setting for treatment: **Intensive Care Unit (ICU)**.\nJustification:\n- Severe hypoxia (SpO2 85% on room air) and confusion indicate respiratory failure and altered mental status, requiring ICU-level care.\n- Hypotension (BP 100/68 mmHg) suggests sepsis or septic shock, necessitating vasopressor support.\n- Elevated urea (8.5 mmol/L) reflects dehydration or renal impairment, increasing the risk of complications.\n- Legionella pneumonia can progress rapidly, requiring close monitoring and aggressive management.",
                "e": "Treatment plan:\n1. **Empiric therapy**: Start **azithromycin 500mg IV daily** (or **levofloxacin 750mg IV daily** if macrolide-resistant Legionella is suspected).\n2. **Supportive care**: Oxygen therapy (target SpO2 >90%), IV fluids for dehydration, and vasopressors (e.g., norepinephrine) if hypotension persists.\n3. **Monitoring**: Continuous pulse oximetry, hourly vital signs, and hourly urine output.\n4. **Adjunctive therapy**: Consider **corticosteroids** (e.g., hydrocortisone 50mg IV q6h) for severe sepsis or ARDS.\n5. **Prophylaxis for contacts**: No chemoprophylaxis is recommended for Legionella, but environmental investigation (e.g., whirlpool decontamination) may be necessary.",
                "f": "Monitoring for response to treatment:\n1. **Clinical parameters**: Resolution of fever, improvement in dyspnea, and normalization of mental status within 48-72 hours.\n2. **Laboratory parameters**: Decrease in white blood cell count, improvement in oxygenation (SpO2 >90% on room air), and normalization of urea/electrolytes.\n3. **Radiological parameters**: Repeat chest X-ray in 48-72 hours to assess for improvement in infiltrates.\n4. **Microbiological parameters**: Follow-up urinary Legionella antigen test or sputum culture to confirm eradication of the organism."
              }
            }
          ]
        }
      ]
    },
    "3": {
      "title": "Principles of Antimicrobial Therapy",
      "variant": 3,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 65-year-old male with COPD exacerbation is admitted with increased sputum purulence and fever. Sputum culture shows Pseudomonas aeruginosa resistant to ciprofloxacin but susceptible to piperacillin-tazobactam. Which of the following is the MOST appropriate empiric therapy based on local antibiogram data?",
              "options": [
                "Ciprofloxacin 400 mg IV q12h",
                "Piperacillin-tazobactam 4.5 g IV q6h",
                "Ceftazidime 2 g IV q8h",
                "Meropenem 1 g IV q8h"
              ],
              "answer": "Piperacillin-tazobactam 4.5 g IV q6h",
              "explanation": "Local antibiogram data indicate resistance to ciprofloxacin, making it inappropriate. Piperacillin-tazobactam is a first-line antipseudomonal agent with documented susceptibility."
            },
            {
              "stem": "A hospital’s antimicrobial stewardship program aims to reduce carbapenem use. Which strategy is LEAST effective in achieving this goal?",
              "options": [
                "Implementing rapid diagnostic testing for bloodstream infections",
                "Mandating infectious disease consultation for all carbapenem prescriptions",
                "Restricting carbapenem use to culture-proven multidrug-resistant organisms only",
                "Encouraging formulary substitution of carbapenems with broad-spectrum cephalosporins"
              ],
              "answer": "Encouraging formulary substitution of carbapenems with broad-spectrum cephalosporins",
              "explanation": "Substituting carbapenems with broad-spectrum cephalosporins may not reduce overall broad-spectrum use and could drive resistance to cephalosporins."
            },
            {
              "stem": "A 32-year-old female with a history of recurrent urinary tract infections presents with fever and flank pain. Urine culture grows ESBL-producing Escherichia coli. Which of the following is the MOST appropriate oral agent for definitive therapy?",
              "options": [
                "Amoxicillin 500 mg PO q8h",
                "Ciprofloxacin 500 mg PO q12h",
                "Nitrofurantoin 100 mg PO q12h",
                "Trimethoprim-sulfamethoxazole 160/800 mg PO q12h"
              ],
              "answer": "Nitrofurantoin 100 mg PO q12h",
              "explanation": "Nitrofurantoin achieves high urinary concentrations and is active against ESBL-producing E. coli, unlike amoxicillin or TMP-SMX which are often resistant."
            },
            {
              "stem": "A 45-year-old male with a prosthetic mitral valve is admitted with fever and new murmur. Blood cultures grow Streptococcus viridans. He reports a history of rash with penicillin. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Vancomycin 1 g IV q12h",
                "Ceftriaxone 2 g IV daily",
                "Daptomycin 6 mg/kg IV daily",
                "Linezolid 600 mg IV q12h"
              ],
              "answer": "Ceftriaxone 2 g IV daily",
              "explanation": "Ceftriaxone is a first-line agent for viridans group streptococcal endocarditis and is safe in patients with non-anaphylactic penicillin allergy."
            },
            {
              "stem": "A 28-year-old female with a penicillin allergy (anaphylaxis) is diagnosed with community-acquired pneumonia. Sputum Gram stain shows gram-positive diplococci. Which of the following is the BEST empiric therapy?",
              "options": [
                "Amoxicillin 500 mg PO q8h",
                "Cefazolin 1 g IV q8h",
                "Azithromycin 500 mg PO daily",
                "Levofloxacin 750 mg PO daily"
              ],
              "answer": "Levofloxacin 750 mg PO daily",
              "explanation": "Levofloxacin provides excellent coverage for Streptococcus pneumoniae and is safe in patients with penicillin anaphylaxis."
            },
            {
              "stem": "A 55-year-old male with a 10-day history of fever, cough, and myalgia presents with confusion and hyponatremia. Legionella urinary antigen is positive. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone 2 g IV daily",
                "Vancomycin 1 g IV q12h",
                "Azithromycin 500 mg IV daily",
                "Doxycycline 100 mg PO q12h"
              ],
              "answer": "Azithromycin 500 mg IV daily",
              "explanation": "Azithromycin is the preferred agent for Legionella pneumonia due to excellent intracellular penetration and activity."
            },
            {
              "stem": "A 70-year-old male with COPD is admitted with pneumonia. Sputum culture grows Haemophilus influenzae resistant to ampicillin but susceptible to amoxicillin-clavulanate. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ampicillin 1 g IV q6h",
                "Amoxicillin-clavulanate 875/125 mg PO q12h",
                "Cefuroxime 500 mg PO q12h",
                "Trimethoprim-sulfamethoxazole 160/800 mg PO q12h"
              ],
              "answer": "Amoxicillin-clavulanate 875/125 mg PO q12h",
              "explanation": "Amoxicillin-clavulanate provides coverage for beta-lactamase-producing H. influenzae and is suitable for oral therapy."
            },
            {
              "stem": "A 30-year-old female with a history of IV drug use presents with fever, malaise, and a new murmur. Blood cultures grow Staphylococcus aureus. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Vancomycin 1 g IV q12h",
                "Cefazolin 2 g IV q8h",
                "Daptomycin 6 mg/kg IV daily",
                "Linezolid 600 mg IV q12h"
              ],
              "answer": "Vancomycin 1 g IV q12h",
              "explanation": "Vancomycin is the empiric therapy of choice for MRSA endocarditis in IV drug users until susceptibility data are available."
            },
            {
              "stem": "A 40-year-old male with a history of alcohol abuse is started on rifampicin, isoniazid, pyrazinamide, and ethambutol for pulmonary tuberculosis. Which of the following is the MOST important monitoring parameter during the first 2 months of therapy?",
              "options": [
                "Serum creatinine",
                "Liver function tests (LFTs)",
                "Complete blood count (CBC)",
                "Visual acuity"
              ],
              "answer": "Liver function tests (LFTs)",
              "explanation": "All four first-line TB drugs can cause hepatotoxicity, making LFT monitoring essential, especially in patients with alcohol abuse."
            },
            {
              "stem": "A 25-year-old female with a 3-day history of fever, sore throat, and cervical lymphadenopathy is diagnosed with group A streptococcal pharyngitis. She reports a history of anaphylaxis to penicillin. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Amoxicillin 500 mg PO q8h",
                "Cefdinir 300 mg PO daily",
                "Azithromycin 500 mg PO daily",
                "Clindamycin 300 mg PO q8h"
              ],
              "answer": "Clindamycin 300 mg PO q8h",
              "explanation": "Clindamycin is a safe alternative in patients with penicillin anaphylaxis and provides coverage for group A streptococci."
            },
            {
              "stem": "A 60-year-old male with a history of diabetes and CKD (eGFR 30 mL/min) is admitted with pyelonephritis. Urine culture grows ESBL-producing Klebsiella pneumoniae. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone 2 g IV daily",
                "Piperacillin-tazobactam 4.5 g IV q6h",
                "Ertapenem 1 g IV daily",
                "Meropenem 1 g IV q8h"
              ],
              "answer": "Ertapenem 1 g IV daily",
              "explanation": "Ertapenem is a carbapenem with once-daily dosing and is preferred in patients with CKD due to minimal renal adjustment requirements."
            },
            {
              "stem": "A 50-year-old male with a prosthetic knee presents with fever and knee pain. Synovial fluid culture grows Staphylococcus epidermidis. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Vancomycin 1 g IV q12h",
                "Cefazolin 2 g IV q8h",
                "Daptomycin 6 mg/kg IV daily",
                "Linezolid 600 mg IV q12h"
              ],
              "answer": "Vancomycin 1 g IV q12h",
              "explanation": "Vancomycin is the empiric therapy of choice for coagulase-negative staphylococci in prosthetic joint infections until susceptibility data are available."
            },
            {
              "stem": "A 35-year-old female with a history of asthma is admitted with pneumonia. Sputum culture grows Mycoplasma pneumoniae. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Amoxicillin 500 mg PO q8h",
                "Azithromycin 500 mg PO daily",
                "Ciprofloxacin 500 mg PO q12h",
                "Doxycycline 100 mg PO q12h"
              ],
              "answer": "Azithromycin 500 mg PO daily",
              "explanation": "Azithromycin is the preferred agent for Mycoplasma pneumoniae due to its excellent activity and favorable side effect profile."
            },
            {
              "stem": "A 75-year-old male with a history of COPD and recent hospitalization is admitted with pneumonia. Sputum culture grows Pseudomonas aeruginosa. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftazidime 2 g IV q8h",
                "Piperacillin-tazobactam 4.5 g IV q6h",
                "Ciprofloxacin 400 mg IV q12h",
                "Meropenem 1 g IV q8h"
              ],
              "answer": "Piperacillin-tazobactam 4.5 g IV q6h",
              "explanation": "Piperacillin-tazobactam is a first-line antipseudomonal agent for empiric therapy in patients with risk factors for multidrug-resistant organisms."
            },
            {
              "stem": "A 20-year-old female with a history of penicillin allergy (rash) is diagnosed with bacterial meningitis. Cerebrospinal fluid (CSF) Gram stain shows gram-positive cocci in chains. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Penicillin G 4 million units IV q4h",
                "Ceftriaxone 2 g IV q12h",
                "Vancomycin 1 g IV q12h",
                "Meropenem 2 g IV q8h"
              ],
              "answer": "Ceftriaxone 2 g IV q12h",
              "explanation": "Ceftriaxone is the preferred agent for bacterial meningitis in patients with penicillin allergy (non-anaphylactic) and provides coverage for Streptococcus pneumoniae."
            },
            {
              "stem": "A 45-year-old male with a history of HIV (CD4 150 cells/mm³) is admitted with fever, cough, and weight loss. Sputum AFB smear is positive. Which of the following is the MOST appropriate initial therapy?",
              "options": [
                "Isoniazid + Rifampicin + Pyrazinamide + Ethambutol",
                "Isoniazid + Rifampicin + Pyrazinamide",
                "Isoniazid + Rifampicin",
                "Rifampicin + Ethambutol + Pyrazinamide"
              ],
              "answer": "Isoniazid + Rifampicin + Pyrazinamide + Ethambutol",
              "explanation": "Four-drug therapy (RHZE) is the standard initial regimen for active tuberculosis, including in patients with HIV, to prevent resistance."
            },
            {
              "stem": "A 30-year-old male with a history of IV drug use presents with fever and new murmur. Blood cultures grow Enterococcus faecalis. Susceptibility testing shows resistance to penicillin but susceptibility to vancomycin. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Vancomycin 1 g IV q12h + Gentamicin 1 mg/kg IV q8h",
                "Ampicillin 2 g IV q4h + Gentamicin 1 mg/kg IV q8h",
                "Linezolid 600 mg IV q12h",
                "Daptomycin 6 mg/kg IV daily"
              ],
              "answer": "Vancomycin 1 g IV q12h + Gentamicin 1 mg/kg IV q8h",
              "explanation": "Vancomycin plus gentamicin is the preferred therapy for enterococcal endocarditis when penicillin resistance is present."
            },
            {
              "stem": "A 55-year-old female with a history of diabetes is admitted with a diabetic foot infection. Wound culture grows MRSA and Pseudomonas aeruginosa. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Vancomycin 1 g IV q12h + Piperacillin-tazobactam 4.5 g IV q6h",
                "Linezolid 600 mg IV q12h + Ceftazidime 2 g IV q8h",
                "Daptomycin 6 mg/kg IV daily + Meropenem 1 g IV q8h",
                "Ceftaroline 600 mg IV q12h + Ciprofloxacin 400 mg IV q12h"
              ],
              "answer": "Vancomycin 1 g IV q12h + Piperacillin-tazobactam 4.5 g IV q6h",
              "explanation": "Vancomycin provides MRSA coverage, and piperacillin-tazobactam provides antipseudomonal coverage, making this the most appropriate empiric regimen."
            },
            {
              "stem": "A 65-year-old male with a history of COPD is admitted with pneumonia. Sputum culture grows Streptococcus pneumoniae resistant to penicillin (MIC 4 µg/mL). Which of the following is the MOST appropriate therapy?",
              "options": [
                "Penicillin G 4 million units IV q4h",
                "Ceftriaxone 2 g IV daily",
                "Vancomycin 1 g IV q12h",
                "Levofloxacin 750 mg PO daily"
              ],
              "answer": "Ceftriaxone 2 g IV daily",
              "explanation": "Ceftriaxone is the preferred agent for penicillin-resistant S. pneumoniae pneumonia due to its excellent activity and CNS penetration."
            },
            {
              "stem": "A 40-year-old female with a history of penicillin allergy (anaphylaxis) is diagnosed with syphilis. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Penicillin G benzathine 2.4 million units IM weekly",
                "Doxycycline 100 mg PO q12h",
                "Azithromycin 500 mg PO daily",
                "Ceftriaxone 1 g IV daily"
              ],
              "answer": "Ceftriaxone 1 g IV daily",
              "explanation": "Ceftriaxone is a safe alternative for syphilis in patients with penicillin anaphylaxis and provides excellent treponemal coverage."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol abuse is started on isoniazid for latent tuberculosis infection (LTBI). Which of the following is the MOST important adjunctive therapy to prevent adverse effects?",
              "options": [
                "Folic acid 1 mg PO daily",
                "Pyridoxine (vitamin B6) 50 mg PO daily",
                "Vitamin B12 1000 mcg IM monthly",
                "Magnesium oxide 400 mg PO daily"
              ],
              "answer": "Pyridoxine (vitamin B6) 50 mg PO daily",
              "explanation": "Pyridoxine supplementation is recommended with isoniazid to prevent peripheral neuropathy, a common adverse effect."
            },
            {
              "stem": "A 35-year-old female with a history of recurrent UTIs is admitted with pyelonephritis. Urine culture grows ESBL-producing Escherichia coli. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ciprofloxacin 500 mg PO q12h",
                "Nitrofurantoin 100 mg PO q12h",
                "Trimethoprim-sulfamethoxazole 160/800 mg PO q12h",
                "Fosfomycin 3 g PO single dose"
              ],
              "answer": "Fosfomycin 3 g PO single dose",
              "explanation": "Fosfomycin achieves high urinary concentrations and is active against ESBL-producing E. coli, making it an appropriate oral option."
            },
            {
              "stem": "A 60-year-old male with a history of CKD (eGFR 25 mL/min) is admitted with pneumonia. Sputum culture grows Klebsiella pneumoniae resistant to ceftriaxone but susceptible to meropenem. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone 2 g IV daily",
                "Meropenem 1 g IV q8h",
                "Piperacillin-tazobactam 4.5 g IV q6h",
                "Ciprofloxacin 400 mg IV q12h"
              ],
              "answer": "Meropenem 1 g IV q8h",
              "explanation": "Meropenem is the preferred agent for ESBL-producing Klebsiella pneumoniae in patients with CKD, as it requires minimal renal adjustment."
            },
            {
              "stem": "A 25-year-old male with a history of IV drug use presents with fever and new murmur. Blood cultures grow Staphylococcus aureus. Susceptibility testing shows methicillin resistance. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Nafcillin 2 g IV q4h",
                "Vancomycin 1 g IV q12h",
                "Cefazolin 2 g IV q8h",
                "Daptomycin 6 mg/kg IV daily"
              ],
              "answer": "Vancomycin 1 g IV q12h",
              "explanation": "Vancomycin is the empiric therapy of choice for MRSA endocarditis in IV drug users until susceptibility data are available."
            },
            {
              "stem": "A 50-year-old female with a history of diabetes is admitted with a severe diabetic foot infection. Wound culture grows MRSA and Bacteroides fragilis. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Vancomycin 1 g IV q12h + Metronidazole 500 mg IV q8h",
                "Linezolid 600 mg IV q12h + Piperacillin-tazobactam 4.5 g IV q6h",
                "Daptomycin 6 mg/kg IV daily + Clindamycin 600 mg IV q8h",
                "Ceftaroline 600 mg IV q12h + Ciprofloxacin 400 mg IV q12h"
              ],
              "answer": "Vancomycin 1 g IV q12h + Metronidazole 500 mg IV q8h",
              "explanation": "Vancomycin provides MRSA coverage, and metronidazole provides anaerobic coverage, making this the most appropriate empiric regimen."
            },
            {
              "stem": "A 30-year-old female with a history of penicillin allergy (rash) is diagnosed with bacterial meningitis. CSF Gram stain shows gram-negative diplococci. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Penicillin G 4 million units IV q4h",
                "Ceftriaxone 2 g IV q12h",
                "Vancomycin 1 g IV q12h",
                "Meropenem 2 g IV q8h"
              ],
              "answer": "Ceftriaxone 2 g IV q12h",
              "explanation": "Ceftriaxone is the preferred agent for bacterial meningitis caused by Neisseria meningitidis, even in patients with penicillin allergy (non-anaphylactic)."
            },
            {
              "stem": "A 45-year-old male with a history of HIV (CD4 200 cells/mm³) is admitted with fever, cough, and weight loss. Sputum AFB smear is positive. Which of the following is the MOST important monitoring parameter during the first 2 months of therapy?",
              "options": [
                "Serum creatinine",
                "Liver function tests (LFTs)",
                "Complete blood count (CBC)",
                "CD4 count"
              ],
              "answer": "Liver function tests (LFTs)",
              "explanation": "All four first-line TB drugs can cause hepatotoxicity, making LFT monitoring essential, especially in patients with HIV."
            },
            {
              "stem": "A 65-year-old male with a history of COPD is admitted with pneumonia. Sputum culture grows Haemophilus influenzae resistant to ampicillin but susceptible to amoxicillin-clavulanate. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ampicillin 1 g IV q6h",
                "Amoxicillin-clavulanate 875/125 mg PO q12h",
                "Cefuroxime 500 mg PO q12h",
                "Trimethoprim-sulfamethoxazole 160/800 mg PO q12h"
              ],
              "answer": "Amoxicillin-clavulanate 875/125 mg PO q12h",
              "explanation": "Amoxicillin-clavulanate provides coverage for beta-lactamase-producing H. influenzae and is suitable for oral therapy."
            },
            {
              "stem": "A 35-year-old female with a history of recurrent UTIs is admitted with pyelonephritis. Urine culture grows ESBL-producing Escherichia coli. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ciprofloxacin 500 mg PO q12h",
                "Nitrofurantoin 100 mg PO q12h",
                "Trimethoprim-sulfamethoxazole 160/800 mg PO q12h",
                "Fosfomycin 3 g PO single dose"
              ],
              "answer": "Fosfomycin 3 g PO single dose",
              "explanation": "Fosfomycin achieves high urinary concentrations and is active against ESBL-producing E. coli, making it an appropriate oral option."
            },
            {
              "stem": "A 50-year-old male with a history of CKD (eGFR 30 mL/min) is admitted with pneumonia. Sputum culture grows Klebsiella pneumoniae resistant to ceftriaxone but susceptible to meropenem. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone 2 g IV daily",
                "Meropenem 1 g IV q8h",
                "Piperacillin-tazobactam 4.5 g IV q6h",
                "Ciprofloxacin 400 mg IV q12h"
              ],
              "answer": "Meropenem 1 g IV q8h",
              "explanation": "Meropenem is the preferred agent for ESBL-producing Klebsiella pneumoniae in patients with CKD, as it requires minimal renal adjustment."
            },
            {
              "stem": "A 25-year-old male with a history of IV drug use presents with fever and new murmur. Blood cultures grow Staphylococcus aureus. Susceptibility testing shows methicillin resistance. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Nafcillin 2 g IV q4h",
                "Vancomycin 1 g IV q12h",
                "Cefazolin 2 g IV q8h",
                "Daptomycin 6 mg/kg IV daily"
              ],
              "answer": "Vancomycin 1 g IV q12h",
              "explanation": "Vancomycin is the empiric therapy of choice for MRSA endocarditis in IV drug users until susceptibility data are available."
            },
            {
              "stem": "A 50-year-old female with a history of diabetes is admitted with a severe diabetic foot infection. Wound culture grows MRSA and Bacteroides fragilis. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Vancomycin 1 g IV q12h + Metronidazole 500 mg IV q8h",
                "Linezolid 600 mg IV q12h + Piperacillin-tazobactam 4.5 g IV q6h",
                "Daptomycin 6 mg/kg IV daily + Clindamycin 600 mg IV q8h",
                "Ceftaroline 600 mg IV q12h + Ciprofloxacin 400 mg IV q12h"
              ],
              "answer": "Vancomycin 1 g IV q12h + Metronidazole 500 mg IV q8h",
              "explanation": "Vancomycin provides MRSA coverage, and metronidazole provides anaerobic coverage, making this the most appropriate empiric regimen."
            },
            {
              "stem": "A 30-year-old female with a history of penicillin allergy (anaphylaxis) is diagnosed with syphilis. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Penicillin G benzathine 2.4 million units IM weekly",
                "Doxycycline 100 mg PO q12h",
                "Azithromycin 500 mg PO daily",
                "Ceftriaxone 1 g IV daily"
              ],
              "answer": "Ceftriaxone 1 g IV daily",
              "explanation": "Ceftriaxone is a safe alternative for syphilis in patients with penicillin anaphylaxis and provides excellent treponemal coverage."
            },
            {
              "stem": "A 55-year-old male with a history of alcohol abuse is started on isoniazid for latent tuberculosis infection (LTBI). Which of the following is the MOST important adjunctive therapy to prevent adverse effects?",
              "options": [
                "Folic acid 1 mg PO daily",
                "Pyridoxine (vitamin B6) 50 mg PO daily",
                "Vitamin B12 1000 mcg IM monthly",
                "Magnesium oxide 400 mg PO daily"
              ],
              "answer": "Pyridoxine (vitamin B6) 50 mg PO daily",
              "explanation": "Pyridoxine supplementation is recommended with isoniazid to prevent peripheral neuropathy, a common adverse effect."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 45-year-old male with a history of COPD is admitted with severe community-acquired pneumonia (CAP). Blood cultures grow Streptococcus pneumoniae. The patient is allergic to penicillin (rash). Outline the steps you would take to de-escalate therapy once susceptibility data are available.",
              "modelAnswer": "1. Review susceptibility report: Confirm S. pneumoniae is susceptible to alternative agents (e.g., ceftriaxone, levofloxacin, vancomycin).\n2. Select narrowest-spectrum agent: Ceftriaxone 2 g IV daily is preferred for penicillin-allergic patients with non-anaphylactic reactions.\n3. Assess patient stability: Ensure clinical improvement (afebrile, normalizing WBC, improving oxygenation) before de-escalation.\n4. Convert to oral therapy: Transition to oral levofloxacin 750 mg daily or amoxicillin-clavulanate 875/125 mg q12h if clinically stable and tolerating oral intake.\n5. Monitor for adverse effects: Watch for rash, diarrhea, or other drug-related reactions.\n6. Document rationale: Record de-escalation steps, susceptibility data, and clinical justification in the medical record."
            },
            {
              "stem": "A 30-year-old female with a history of recurrent UTIs is admitted with pyelonephritis. Urine culture grows ESBL-producing Escherichia coli. Outline the steps you would take to optimize antimicrobial therapy.",
              "modelAnswer": "1. Review susceptibility data: Confirm ESBL production and susceptibility to carbapenems (e.g., ertapenem, meropenem).\n2. Select appropriate agent: Ertapenem 1 g IV daily is preferred for ESBL-producing E. coli due to once-daily dosing and minimal renal adjustment.\n3. Assess renal function: Adjust dose if eGFR <30 mL/min (e.g., ertapenem 500 mg IV daily).\n4. Monitor for response: Check clinical improvement (fever resolution, symptom relief) within 48–72 hours.\n5. Consider oral step-down: Transition to fosfomycin 3 g PO single dose or nitrofurantoin 100 mg q12h if clinically stable and tolerating oral intake.\n6. Counsel on prevention: Advise on hydration, voiding after intercourse, and consider prophylactic strategies (e.g., low-dose nitrofurantoin) if recurrent."
            },
            {
              "stem": "A 50-year-old male with a prosthetic mitral valve is admitted with fever and new murmur. Blood cultures grow Staphylococcus epidermidis. Outline the steps you would take to optimize antimicrobial therapy.",
              "modelAnswer": "1. Review susceptibility data: Confirm methicillin resistance (MRSE) and susceptibility to vancomycin or daptomycin.\n2. Select empiric therapy: Vancomycin 1 g IV q12h + rifampin 300 mg PO q8h + gentamicin 1 mg/kg IV q8h (synergistic for prosthetic valve infections).\n3. Monitor drug levels: Check vancomycin trough (target 15–20 mcg/mL) and gentamicin peak/trough.\n4. Assess renal function: Adjust doses if eGFR <60 mL/min.\n5. Consider duration: Plan for 6 weeks of therapy with possible valve replacement surgery.\n6. Monitor for adverse effects: Watch for ototoxicity (gentamicin), nephrotoxicity (vancomycin), and rash (rifampin)."
            },
            {
              "stem": "A 40-year-old male with a history of HIV (CD4 150 cells/mm³) is admitted with fever, cough, and weight loss. Sputum AFB smear is positive. Outline the steps you would take to initiate and monitor tuberculosis therapy.",
              "modelAnswer": "1. Initiate four-drug therapy: Isoniazid 300 mg PO daily + rifampicin 600 mg PO daily + pyrazinamide 1.5 g PO daily + ethambutol 800 mg PO daily (RHZE).\n2. Counsel on adverse effects: Warn about hepatotoxicity (LFTs), peripheral neuropathy (pyridoxine 50 mg PO daily), and orange discoloration of body fluids (rifampicin).\n3. Monitor baseline labs: LFTs, CBC, renal function, and HIV viral load/CD4 count.\n4. Schedule follow-up: Repeat LFTs at 2 weeks, then monthly; check visual acuity monthly (ethambutol).\n5. Assess adherence: Use directly observed therapy (DOT) if adherence is a concern.\n6. Evaluate for drug interactions: Rifampicin induces CYP3A4, reducing efficacy of antiretrovirals (e.g., dolutegravir). Adjust ART if necessary."
            },
            {
              "stem": "A 65-year-old male with a history of diabetes and CKD (eGFR 30 mL/min) is admitted with pneumonia. Sputum culture grows Klebsiella pneumoniae resistant to ceftriaxone but susceptible to meropenem. Outline the steps you would take to optimize antimicrobial therapy.",
              "modelAnswer": "1. Review susceptibility data: Confirm resistance to ceftriaxone and susceptibility to meropenem.\n2. Select appropriate agent: Meropenem 1 g IV q8h (adjust to 500 mg IV q8h if eGFR <30 mL/min).\n3. Assess clinical stability: Ensure patient is improving (afebrile, normalizing WBC, improving oxygenation) before de-escalation.\n4. Monitor drug levels: Check meropenem levels if available (target AUC/MIC >400).\n5. Consider oral step-down: Transition to oral ciprofloxacin 500 mg q12h if clinically stable and tolerating oral intake.\n6. Monitor for adverse effects: Watch for seizures (meropenem), nephrotoxicity (adjust dose), and Clostridioides difficile infection."
            },
            {
              "stem": "A 35-year-old female with a history of recurrent UTIs is admitted with pyelonephritis. Urine culture grows ESBL-producing Escherichia coli. Outline the steps you would take to prevent antimicrobial resistance in this patient.",
              "modelAnswer": "1. Use culture-directed therapy: Select fosfomycin or nitrofurantoin based on susceptibility data.\n2. Avoid unnecessary broad-spectrum agents: Do not use carbapenems unless absolutely necessary.\n3. Counsel on hygiene: Advise on voiding after intercourse, wiping front-to-back, and avoiding spermicides.\n4. Consider prophylactic strategies: Offer low-dose nitrofurantoin 50–100 mg PO daily or trimethoprim-sulfamethoxazole 40/200 mg PO daily if recurrent (>3 UTIs/year).\n5. Educate on antibiotic use: Emphasize completing the full course of therapy and avoiding self-medication.\n6. Monitor for recurrence: Schedule follow-up urinalysis and culture if symptoms recur."
            },
            {
              "stem": "A 50-year-old female with a history of diabetes is admitted with a severe diabetic foot infection. Wound culture grows MRSA and Bacteroides fragilis. Outline the steps you would take to optimize antimicrobial therapy.",
              "modelAnswer": "1. Review susceptibility data: Confirm MRSA and anaerobic coverage (B. fragilis).\n2. Select empiric therapy: Vancomycin 1 g IV q12h + metronidazole 500 mg IV q8h.\n3. Assess wound severity: Consider surgical debridement if necrotic tissue or abscess present.\n4. Monitor drug levels: Check vancomycin trough (target 15–20 mcg/mL).\n5. Consider oral step-down: Transition to oral linezolid 600 mg q12h + metronidazole 500 mg q8h if clinically stable.\n6. Monitor for adverse effects: Watch for serotonin syndrome (linezolid), peripheral neuropathy (metronidazole), and Clostridioides difficile infection."
            },
            {
              "stem": "A 25-year-old male with a history of IV drug use presents with fever and new murmur. Blood cultures grow Staphylococcus aureus. Outline the steps you would take to optimize antimicrobial therapy.",
              "modelAnswer": "1. Review susceptibility data: Confirm methicillin resistance (MRSA) and susceptibility to vancomycin or daptomycin.\n2. Select empiric therapy: Vancomycin 1 g IV q12h (adjust dose based on trough levels).\n3. Assess valve involvement: Order echocardiogram (TTE or TEE) to evaluate for vegetations.\n4. Consider duration: Plan for 6 weeks of therapy with possible valve replacement surgery if severe infection.\n5. Monitor drug levels: Check vancomycin trough (target 15–20 mcg/mL) and renal function.\n6. Counsel on harm reduction: Advise on safe injection practices and consider referral to addiction services."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 22-year-old university student is brought to the emergency department with a 24-hour history of fever, headache, and confusion. On examination, she is febrile (39.5°C), tachycardic (120 bpm), and hypotensive (BP 85/50 mmHg). She has a petechial rash on her lower extremities and nuchal rigidity. Blood cultures are drawn, and empiric antibiotics are started. \n\na) Identify the most likely diagnosis and causative organism. (2 marks)\n\nb) Justify your answer in (a) above. (3 marks)\n\nc) Describe three investigations you would recommend to support the diagnosis. (3 marks)\n\nd) Review five patient-related factors to consider when selecting empiric antimicrobial therapy for this patient. (5 marks)\n\ne) Propose an appropriate treatment plan for this patient. (4 marks)\n\nf) List two complications you would be worried about in this patient. (1 mark)\n\ng) Explain how you would manage the contacts of this patient. (2 marks)",
              "modelAnswer": {
                "a) Most likely diagnosis: Meningococcal meningitis. Causative organism: Neisseria meningitidis.\n\nb) Justification:\n   - Fever, headache, confusion, and nuchal rigidity are classic symptoms of meningitis.\n   - Petechial rash is highly suggestive of meningococcemia, caused by Neisseria meningitidis.\n   - Hypotension and tachycardia indicate septic shock, a common complication of meningococcal sepsis.\n\nc) Investigations:\n   1. Lumbar puncture (LP): Send CSF for cell count, glucose, protein, Gram stain, and culture. Expect neutrophilic pleocytosis, low glucose, and high protein in bacterial meningitis.\n   2. Blood cultures: Confirm bacteremia and identify the organism.\n   3. PCR testing: Rapid meningococcal PCR on blood or CSF to confirm diagnosis and serogroup (e.g., A, B, C, W, Y).\n\nd) Patient-related factors for empiric therapy:\n   1. Age: Young adults are at higher risk for meningococcal disease.\n   2. Clinical severity: Septic shock requires broad-spectrum empiric therapy.\n   3. Allergies: Document any drug allergies (e.g., penicillin) to avoid contraindicated agents.\n   4. Renal/hepatic function: Adjust doses if impaired (e.g., ceftriaxone requires no renal adjustment).\n   5. Comorbidities: Consider HIV status, immunosuppression, or other risk factors for atypical pathogens.\n\ne) Treatment plan:\n   - Empiric therapy: Ceftriaxone 2 g IV q12h + vancomycin 1 g IV q12h (to cover penicillin-resistant S. pneumoniae and N. meningitidis).\n   - Adjunctive therapy: Dexamethasone 10 mg IV q6h for 4 days (start before or with first antibiotic dose).\n   - Supportive care: IV fluids, vasopressors (e.g., norepinephrine) for shock, and ICU monitoring.\n   - Isolation: Droplet precautions until 24 hours after starting effective therapy.\n   - Prophylaxis for contacts: Rifampicin 600 mg PO q12h for 2 days or ciprofloxacin 500 mg PO single dose.\n\nf) Complications:\n   1. Septic shock with multi-organ failure.\n   2. Disseminated intravascular coagulation (DIC) due to meningococcemia.\n\ng) Management of contacts:\n   - Identify close contacts (e.g., household members, intimate partners, healthcare workers with direct exposure).\n   - Administer chemoprophylaxis within 24 hours of index case diagnosis: Rifampicin 600 mg PO q12h for 2 days or ciprofloxacin 500 mg PO single dose.\n   - Vaccinate contacts if serogroup is vaccine-preventable (e.g., MenACWY or MenB vaccine).": "a) Most likely diagnosis: Meningococcal meningitis. Causative organism: Neisseria meningitidis.\n\nb) Justification:\n   - Fever, headache, confusion, and nuchal rigidity are classic symptoms of meningitis.\n   - Petechial rash is highly suggestive of meningococcemia, caused by Neisseria meningitidis.\n   - Hypotension and tachycardia indicate septic shock, a common complication of meningococcal sepsis.\n\nc) Investigations:\n   1. Lumbar puncture (LP): Send CSF for cell count, glucose, protein, Gram stain, and culture. Expect neutrophilic pleocytosis, low glucose, and high protein in bacterial meningitis.\n   2. Blood cultures: Confirm bacteremia and identify the organism.\n   3. PCR testing: Rapid meningococcal PCR on blood or CSF to confirm diagnosis and serogroup (e.g., A, B, C, W, Y).\n\nd) Patient-related factors for empiric therapy:\n   1. Age: Young adults are at higher risk for meningococcal disease.\n   2. Clinical severity: Septic shock requires broad-spectrum empiric therapy.\n   3. Allergies: Document any drug allergies (e.g., penicillin) to avoid contraindicated agents.\n   4. Renal/hepatic function: Adjust doses if impaired (e.g., ceftriaxone requires no renal adjustment).\n   5. Comorbidities: Consider HIV status, immunosuppression, or other risk factors for atypical pathogens.\n\ne) Treatment plan:\n   - Empiric therapy: Ceftriaxone 2 g IV q12h + vancomycin 1 g IV q12h (to cover penicillin-resistant S. pneumoniae and N. meningitidis).\n   - Adjunctive therapy: Dexamethasone 10 mg IV q6h for 4 days (start before or with first antibiotic dose).\n   - Supportive care: IV fluids, vasopressors (e.g., norepinephrine) for shock, and ICU monitoring.\n   - Isolation: Droplet precautions until 24 hours after starting effective therapy.\n   - Prophylaxis for contacts: Rifampicin 600 mg PO q12h for 2 days or ciprofloxacin 500 mg PO single dose.\n\nf) Complications:\n   1. Septic shock with multi-organ failure.\n   2. Disseminated intravascular coagulation (DIC) due to meningococcemia.\n\ng) Management of contacts:\n   - Identify close contacts (e.g., household members, intimate partners, healthcare workers with direct exposure).\n   - Administer chemoprophylaxis within 24 hours of index case diagnosis: Rifampicin 600 mg PO q12h for 2 days or ciprofloxacin 500 mg PO single dose.\n   - Vaccinate contacts if serogroup is vaccine-preventable (e.g., MenACWY or MenB vaccine)."
              }
            },
            {
              "stem": "A 55-year-old male presents to the emergency department with a 3-day history of fever, cough productive of rusty sputum, pleuritic chest pain, and sudden onset of confusion. He returned from a business trip abroad 5 days ago, where he stayed in a large hotel and frequently used the whirlpool. On examination, he is febrile (38.8°C), tachycardic (110 bpm), tachypneic (RR 33/min), and hypoxic (SpO2 85% on room air). His urea is elevated (8.5 mmol/L), and his BP is 100/68 mmHg. Chest X-ray shows a right lower lobe consolidation.\n\na) Identify the most likely diagnosis and causative organism. (2 marks)\n\nb) Justify your answer in (a) above. (6 marks)\n\nc) Outline two additional investigations you would recommend. (2 marks)\n\nd) Evaluate whether you would recommend treating this patient as an outpatient, inpatient (general ward), or in an intensive care unit. Justify your answer. (4 marks)\n\ne) Formulate a treatment plan for this patient. (5 marks)\n\nf) Using appropriate examples, examine how you would monitor for response to treatment. (4 marks)",
              "modelAnswer": {
                "a) Most likely diagnosis: Legionnaires' disease. Causative organism: Legionella pneumophila.\n\nb) Justification:\n   1. Exposure history: Recent travel and use of whirlpool/hot tubs are risk factors for Legionella infection.\n   2. Clinical presentation: Fever, cough with rusty sputum, pleuritic chest pain, and confusion are classic symptoms.\n   3. Laboratory findings: Elevated urea suggests dehydration or renal involvement, common in severe Legionella pneumonia.\n   4. Chest X-ray: Right lower lobe consolidation is typical for bacterial pneumonia, including Legionella.\n   5. Hypoxia and tachypnea: Indicate severe pneumonia requiring hospitalization.\n   6. Absence of typical CAP pathogens: Legionella is a common cause of atypical pneumonia in travelers.\n\nc) Additional investigations:\n   1. Legionella urinary antigen test: Rapid and specific for Legionella pneumophila serogroup 1 (most common cause).\n   2. Sputum culture for Legionella: Requires special media (e.g., buffered charcoal-yeast extract agar) and may take 3–5 days.\n\n\nd) Level of care:\n   - Recommendation: Admit to the intensive care unit (ICU).\n   - Justification:\n     1. Severe hypoxia (SpO2 85% on room air) requires supplemental oxygen and close monitoring.\n     2. Confusion and elevated urea indicate multi-organ involvement or sepsis.\n     3. Tachypnea (RR 33/min) and hemodynamic instability (BP 100/68 mmHg) suggest impending respiratory failure.\n     4. Legionnaires' disease can progress rapidly, requiring ICU-level care for potential intubation and mechanical ventilation.\n\n\ne) Treatment plan:\n   - Empiric therapy: Azithromycin 500 mg IV daily or levofloxacin 750 mg IV daily (preferred for severe Legionella pneumonia).\n   - Supportive care:\n     1. Oxygen therapy: Target SpO2 >90% with nasal cannula or non-rebreather mask.\n     2. IV fluids: Correct dehydration and maintain hemodynamic stability.\n     3. Monitor electrolytes: Correct hyponatremia (common in Legionella) and other electrolyte imbalances.\n   - Adjunctive therapy: Consider corticosteroids (e.g., methylprednisolone 40 mg IV q12h) for severe cases with ARDS or septic shock.\n   - Isolation: Standard precautions (Legionella is not transmitted person-to-person).\n   - Prophylaxis for contacts: Not indicated (Legionella is environmental, not contagious).\n\n\nf) Monitoring for response to treatment:\n   1. Clinical parameters:\n      - Temperature: Should normalize within 48–72 hours of effective therapy.\n      - Oxygenation: Improve SpO2 and reduce oxygen requirements.\n      - Hemodynamics: Stabilize BP and reduce vasopressor requirements.\n   2. Laboratory parameters:\n      - WBC count: Should decrease as infection resolves.\n      - CRP/ESR: Should trend downward with effective therapy.\n      - Electrolytes: Correct hyponatremia and other imbalances.\n   3. Radiographic parameters:\n      - Chest X-ray: Should show improvement in consolidation within 5–7 days.\n   4. Microbiologic parameters:\n      - Repeat Legionella urinary antigen if initially positive (may remain positive for weeks).\n      - Consider repeat sputum culture if available to document clearance (rarely done in practice).": "a) Most likely diagnosis: Legionnaires' disease. Causative organism: Legionella pneumophila.\n\nb) Justification:\n   1. Exposure history: Recent travel and use of whirlpool/hot tubs are risk factors for Legionella infection.\n   2. Clinical presentation: Fever, cough with rusty sputum, pleuritic chest pain, and confusion are classic symptoms.\n   3. Laboratory findings: Elevated urea suggests dehydration or renal involvement, common in severe Legionella pneumonia.\n   4. Chest X-ray: Right lower lobe consolidation is typical for bacterial pneumonia, including Legionella.\n   5. Hypoxia and tachypnea: Indicate severe pneumonia requiring hospitalization.\n   6. Absence of typical CAP pathogens: Legionella is a common cause of atypical pneumonia in travelers.\n\nc) Additional investigations:\n   1. Legionella urinary antigen test: Rapid and specific for Legionella pneumophila serogroup 1 (most common cause).\n   2. Sputum culture for Legionella: Requires special media (e.g., buffered charcoal-yeast extract agar) and may take 3–5 days.\n\n\nd) Level of care:\n   - Recommendation: Admit to the intensive care unit (ICU).\n   - Justification:\n     1. Severe hypoxia (SpO2 85% on room air) requires supplemental oxygen and close monitoring.\n     2. Confusion and elevated urea indicate multi-organ involvement or sepsis.\n     3. Tachypnea (RR 33/min) and hemodynamic instability (BP 100/68 mmHg) suggest impending respiratory failure.\n     4. Legionnaires' disease can progress rapidly, requiring ICU-level care for potential intubation and mechanical ventilation.\n\n\ne) Treatment plan:\n   - Empiric therapy: Azithromycin 500 mg IV daily or levofloxacin 750 mg IV daily (preferred for severe Legionella pneumonia).\n   - Supportive care:\n     1. Oxygen therapy: Target SpO2 >90% with nasal cannula or non-rebreather mask.\n     2. IV fluids: Correct dehydration and maintain hemodynamic stability.\n     3. Monitor electrolytes: Correct hyponatremia (common in Legionella) and other electrolyte imbalances.\n   - Adjunctive therapy: Consider corticosteroids (e.g., methylprednisolone 40 mg IV q12h) for severe cases with ARDS or septic shock.\n   - Isolation: Standard precautions (Legionella is not transmitted person-to-person).\n   - Prophylaxis for contacts: Not indicated (Legionella is environmental, not contagious).\n\n\nf) Monitoring for response to treatment:\n   1. Clinical parameters:\n      - Temperature: Should normalize within 48–72 hours of effective therapy.\n      - Oxygenation: Improve SpO2 and reduce oxygen requirements.\n      - Hemodynamics: Stabilize BP and reduce vasopressor requirements.\n   2. Laboratory parameters:\n      - WBC count: Should decrease as infection resolves.\n      - CRP/ESR: Should trend downward with effective therapy.\n      - Electrolytes: Correct hyponatremia and other imbalances.\n   3. Radiographic parameters:\n      - Chest X-ray: Should show improvement in consolidation within 5–7 days.\n   4. Microbiologic parameters:\n      - Repeat Legionella urinary antigen if initially positive (may remain positive for weeks).\n      - Consider repeat sputum culture if available to document clearance (rarely done in practice)."
              }
            }
          ]
        }
      ]
    }
  },
  "exam-cardiovascular-heme": {
    "1": {
      "title": "Cardiovascular & Hematopoietic",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Which physical sign is most specific for detecting moderate to severe anemia in a dark-skinned patient?",
              "options": [
                "Pallor of the conjunctiva",
                "Cyanosis of the lips",
                "Yellow discoloration of the sclera",
                "Dryness of the oral mucosa"
              ],
              "answer": "Pallor of the conjunctiva",
              "explanation": "Conjunctival pallor is the most reliable clinical sign for detecting moderate to severe anemia, especially in patients with darker skin tones."
            },
            {
              "stem": "Which of the following drugs is a common cause of bradycardia?",
              "options": [
                "Amlodipine",
                "Digoxin",
                "Losartan",
                "Hydrochlorothiazide"
              ],
              "answer": "Digoxin",
              "explanation": "Digoxin slows atrioventricular conduction and increases vagal tone, leading to bradycardia, especially at toxic levels."
            },
            {
              "stem": "Which investigation is most appropriate for detecting structural abnormalities of the heart valves?",
              "options": [
                "Electrocardiogram (ECG)",
                "Chest X-ray",
                "Echocardiography (ECHO)",
                "Magnetic Resonance Imaging (MRI)"
              ],
              "answer": "Echocardiography (ECHO)",
              "explanation": "Echocardiography provides real-time imaging of cardiac structures, including valves, and is the gold standard for detecting valvular abnormalities."
            },
            {
              "stem": "Calculate the mean arterial pressure (MAP) for a patient with a blood pressure of 150/90 mmHg.",
              "options": [
                "110 mmHg",
                "120 mmHg",
                "130 mmHg",
                "140 mmHg"
              ],
              "answer": "110 mmHg",
              "explanation": "MAP = (2 × diastolic BP + systolic BP) / 3 = (2 × 90 + 150) / 3 = 110 mmHg."
            },
            {
              "stem": "A patient has a blood pressure of 140/95 mmHg. According to the WHO classification, this is classified as:",
              "options": [
                "Normal",
                "Pre-hypertension",
                "Stage I hypertension",
                "Stage II hypertension"
              ],
              "answer": "Stage I hypertension",
              "explanation": "Stage I hypertension is defined as systolic BP 140–159 mmHg or diastolic BP 90–99 mmHg."
            },
            {
              "stem": "What is the recommended blood pressure target for a diabetic patient with nephropathy?",
              "options": [
                "<140/85 mmHg",
                "<130/80 mmHg",
                "<125/75 mmHg",
                "<140/100 mmHg"
              ],
              "answer": "<130/80 mmHg",
              "explanation": "Guidelines recommend a target BP of <130/80 mmHg in diabetic patients with nephropathy to reduce progression of kidney disease."
            },
            {
              "stem": "What is the most common cause of secondary hypertension?",
              "options": [
                "Aortic stenosis",
                "Drug-induced",
                "Renoparenchymal disease",
                "Cushing syndrome"
              ],
              "answer": "Renoparenchymal disease",
              "explanation": "Chronic kidney disease is the most common cause of secondary hypertension, accounting for approximately 5–10% of all hypertension cases."
            },
            {
              "stem": "Which antihypertensive is contraindicated in a patient with asthma?",
              "options": [
                "Amlodipine",
                "Labetalol",
                "Hydralazine",
                "Enalapril"
              ],
              "answer": "Labetalol",
              "explanation": "Non-selective beta-blockers like labetalol can exacerbate bronchospasm in asthmatic patients and are contraindicated."
            },
            {
              "stem": "Which diuretic is the drug of choice for reducing acute pulmonary edema in heart failure?",
              "options": [
                "Hydrochlorothiazide",
                "Spironolactone",
                "Furosemide",
                "Amiloride"
              ],
              "answer": "Furosemide",
              "explanation": "Loop diuretics like furosemide are preferred for rapid diuresis in acute pulmonary edema due to their potent natriuretic effect."
            },
            {
              "stem": "Which adverse effect is NOT associated with thiazide diuretics?",
              "options": [
                "Hyperuricemia",
                "Hypoglycemia",
                "Hyperlipidemia",
                "Hyperglycemia"
              ],
              "answer": "Hypoglycemia",
              "explanation": "Thiazides can cause hyperglycemia, hyperlipidemia, and hyperuricemia but do not typically cause hypoglycemia."
            },
            {
              "stem": "Angiotensin-converting enzyme (ACE) inhibitors are contraindicated in all of the following EXCEPT:",
              "options": [
                "Aortic stenosis",
                "Bilateral renal artery stenosis",
                "First trimester of pregnancy",
                "Asthma"
              ],
              "answer": "Asthma",
              "explanation": "ACE inhibitors are contraindicated in bilateral renal artery stenosis, aortic stenosis, and pregnancy but not specifically in asthma."
            },
            {
              "stem": "Acebutolol is classified as a:",
              "options": [
                "Non-selective beta-blocker",
                "Cardioselective beta-blocker",
                "Beta-blocker with vasodilatory properties",
                "None of the above"
              ],
              "answer": "Cardioselective beta-blocker",
              "explanation": "Acebutolol is a cardioselective beta-1 blocker with intrinsic sympathomimetic activity."
            },
            {
              "stem": "Which combination is most appropriate for the management of congestive heart failure?",
              "options": [
                "ACE inhibitor and furosemide",
                "Beta-blocker and thiazide diuretic",
                "Beta-blocker and ACE inhibitor",
                "Spironolactone and nitrate"
              ],
              "answer": "ACE inhibitor and furosemide",
              "explanation": "ACE inhibitors and loop diuretics are the cornerstone of heart failure management, with beta-blockers added for long-term benefits."
            },
            {
              "stem": "Toxic effects of calcium channel blockers include:",
              "options": [
                "Tachycardia",
                "Atrioventricular block and congestive heart failure",
                "Hyperkalemia",
                "Hyperglycemia"
              ],
              "answer": "Atrioventricular block and congestive heart failure",
              "explanation": "Calcium channel blockers can cause bradycardia, AV block, and exacerbate heart failure due to negative inotropic effects."
            },
            {
              "stem": "Reflex tachycardia is seen with the use of all EXCEPT:",
              "options": [
                "Hydralazine",
                "Prazosin",
                "Propranolol",
                "Minoxidil"
              ],
              "answer": "Propranolol",
              "explanation": "Propranolol is a beta-blocker that reduces heart rate and does not cause reflex tachycardia."
            },
            {
              "stem": "Which medication is preferred for severe hypertension in pregnancy?",
              "options": [
                "Methyldopa",
                "Hydralazine",
                "Nifedipine",
                "Enalapril"
              ],
              "answer": "Methyldopa",
              "explanation": "Methyldopa is the preferred antihypertensive in pregnancy due to its safety profile and established use."
            },
            {
              "stem": "Regarding hypertensive crisis, which statement is TRUE?",
              "options": [
                "Urgencies are associated with end-organ damage",
                "Immediate blood pressure reduction is recommended in hypertensive urgencies",
                "Hypertensive emergency is managed using oral therapy",
                "Immediate-release nifedipine should be avoided"
              ],
              "answer": "Immediate-release nifedipine should be avoided",
              "explanation": "Immediate-release nifedipine is associated with unpredictable drops in BP and adverse events; it should be avoided in hypertensive emergencies."
            },
            {
              "stem": "Which statement about dyslipidemias is UNTRUE?",
              "options": [
                "Diet and genetics play a role",
                "They are major players in atherosclerosis and plaque formation",
                "Cholesterol screening should start as soon as cardiovascular disorders occur",
                "Pediatric screening is largely based on genetics and risk factors"
              ],
              "answer": "Cholesterol screening should start as soon as cardiovascular disorders occur",
              "explanation": "Cholesterol screening should begin in childhood (age 9–11) and continue periodically, not only after cardiovascular disorders occur."
            },
            {
              "stem": "Familial hypercholesterolemia is associated with a mutation in the gene coding for:",
              "options": [
                "Apolipoprotein B-100",
                "Apolipoprotein E",
                "LDL receptor",
                "HMG-CoA reductase"
              ],
              "answer": "LDL receptor",
              "explanation": "Familial hypercholesterolemia is caused by mutations in the LDL receptor gene, leading to impaired LDL clearance."
            },
            {
              "stem": "Which drug is NOT typically associated with hyperlipidemia?",
              "options": [
                "Cyclosporine",
                "Protease inhibitors",
                "Prazosin",
                "Isotretinoin"
              ],
              "answer": "Prazosin",
              "explanation": "Prazosin is an alpha-1 blocker and is not associated with hyperlipidemia, unlike cyclosporine, protease inhibitors, and isotretinoin."
            },
            {
              "stem": "HDL levels can be increased by all EXCEPT:",
              "options": [
                "Exercise",
                "Ezetimibe",
                "Niacin",
                "Diets high in polyunsaturated fatty acids"
              ],
              "answer": "Ezetimibe",
              "explanation": "Ezetimibe primarily lowers LDL cholesterol and does not significantly increase HDL levels."
            },
            {
              "stem": "HMG-CoA reductase inhibitors are characterized by all EXCEPT:",
              "options": [
                "They are the most potent and among best tolerated lipid-lowering agents",
                "They bind intestinal bile acids",
                "Adverse effects include myopathy and hepatotoxicity",
                "They are contraindicated in pregnancy"
              ],
              "answer": "They bind intestinal bile acids",
              "explanation": "HMG-CoA reductase inhibitors (statins) inhibit cholesterol synthesis; bile acid sequestrants bind bile acids."
            },
            {
              "stem": "Which statement about angina is TRUE?",
              "options": [
                "Prinzmetal’s angina occurs at rest, especially in the early morning hours",
                "Stable angina occurs at rest",
                "Symptoms of unstable angina are relieved by rest",
                "Stable angina requires hospital admission and aggressive therapy"
              ],
              "answer": "Prinzmetal’s angina occurs at rest, especially in the early morning hours",
              "explanation": "Prinzmetal’s (variant) angina is caused by coronary artery spasm and typically occurs at rest, often in the early morning."
            },
            {
              "stem": "Which drug is NOT used to prevent recurrent ischemic symptoms?",
              "options": [
                "Calcium channel blockers",
                "Beta blockers",
                "Thiazide diuretics",
                "Nitrates"
              ],
              "answer": "Thiazide diuretics",
              "explanation": "Thiazide diuretics are not indicated for preventing recurrent ischemic symptoms; they are used for hypertension and edema."
            },
            {
              "stem": "Which statement about ischemic heart disease management is FALSE?",
              "options": [
                "Pharmacotherapy targets a reduction in cardiac workload",
                "Statins should only be used in patients with elevated LDL levels",
                "ACE inhibitors have shown benefit in ischemic heart disease combined with hypertension",
                "Control of modifiable risk factors is important"
              ],
              "answer": "Statins should only be used in patients with elevated LDL levels",
              "explanation": "Statins are beneficial even in patients with normal LDL levels due to their pleiotropic effects on inflammation and plaque stabilization."
            },
            {
              "stem": "Which statement about antiplatelet drugs in angina is FALSE?",
              "options": [
                "Aspirin reduces the risk of major adverse cardiac events",
                "Aspirin doses >162 mg have no additional benefit",
                "Clopidogrel is preferred in aspirin allergy",
                "Combination of aspirin and clopidogrel is recommended in all patients with stents"
              ],
              "answer": "Combination of aspirin and clopidogrel is recommended in all patients with stents",
              "explanation": "Dual antiplatelet therapy (DAPT) is recommended for a limited duration post-stent placement (e.g., 6–12 months), not indefinitely."
            },
            {
              "stem": "Which statement about short-acting nitrates in angina is TRUE?",
              "options": [
                "They have a delayed onset of action",
                "They can be used as maintenance therapy in chronic stable angina",
                "Adverse effects include lightheadedness",
                "They can be used with phosphodiesterase-5 inhibitors"
              ],
              "answer": "Adverse effects include lightheadedness",
              "explanation": "Short-acting nitrates cause vasodilation, leading to lightheadedness, headache, and hypotension; they are contraindicated with PDE-5 inhibitors."
            },
            {
              "stem": "Which statement about calcium channel blockers in angina is FALSE?",
              "options": [
                "They can be used with beta blockers when initial treatment is unsuccessful",
                "They are recommended when beta blockers are contraindicated",
                "Combination of dihydropyridines and beta blockers may improve symptoms",
                "None of the above"
              ],
              "answer": "None of the above",
              "explanation": "All statements are true; calcium channel blockers can be combined with beta blockers for improved symptom control in angina."
            },
            {
              "stem": "Which symptom is NOT typical of left heart failure?",
              "options": [
                "Fatigue",
                "Nocturia",
                "Dyspnea",
                "Cough"
              ],
              "answer": "Nocturia",
              "explanation": "Nocturia is more common in right heart failure due to fluid redistribution when lying down, whereas left heart failure typically causes dyspnea and cough."
            },
            {
              "stem": "Hepatomegaly in congestive heart failure is a sign of:",
              "options": [
                "Left heart failure",
                "Right heart failure",
                "Both left and right heart failure",
                "Aortic incompetence"
              ],
              "answer": "Right heart failure",
              "explanation": "Hepatomegaly occurs due to venous congestion from right heart failure, as the liver drains into the inferior vena cava."
            },
            {
              "stem": "Which is NOT a clinical manifestation of left heart failure?",
              "options": [
                "Oedema",
                "Dyspnea",
                "Elevated jugular venous pressure",
                "Orthopnea"
              ],
              "answer": "Elevated jugular venous pressure",
              "explanation": "Elevated jugular venous pressure is a sign of right heart failure or elevated central venous pressure, not typically left heart failure."
            },
            {
              "stem": "Which factor does NOT precipitate heart failure?",
              "options": [
                "Anemia",
                "Pregnancy",
                "Well-controlled hypertension",
                "Use of doxorubicin"
              ],
              "answer": "Well-controlled hypertension",
              "explanation": "Well-controlled hypertension reduces afterload and is protective; anemia, pregnancy, and doxorubicin (cardiotoxic) can precipitate heart failure."
            },
            {
              "stem": "Which agent can be combined with loop diuretics in heart failure management?",
              "options": [
                "Chlorthalidone",
                "Ethacrynic acid",
                "Metolazone",
                "Bumetanide"
              ],
              "answer": "Metolazone",
              "explanation": "Metolazone is a thiazide-like diuretic that can be combined with loop diuretics for synergistic diuresis in resistant edema."
            },
            {
              "stem": "Which is NOT a beneficial effect of spironolactone in heart failure?",
              "options": [
                "It lowers the heart rate",
                "It increases potassium levels",
                "It prevents ventricular remodeling",
                "It reduces mortality"
              ],
              "answer": "It lowers the heart rate",
              "explanation": "Spironolactone does not lower heart rate; it blocks aldosterone, preventing sodium retention, potassium loss, and ventricular remodeling."
            },
            {
              "stem": "Which effect is NOT associated with ACE inhibitors in heart failure?",
              "options": [
                "Slow down ventricular remodeling",
                "Lower the heart rate",
                "Prevent myocardial fibrosis",
                "Lower peripheral resistance"
              ],
              "answer": "Lower the heart rate",
              "explanation": "ACE inhibitors reduce afterload and preload, prevent remodeling, and improve survival but do not typically lower heart rate."
            },
            {
              "stem": "Which is NOT a beneficial effect of beta blockers in heart failure?",
              "options": [
                "Reversing left ventricular remodeling",
                "Promoting plasma renin release",
                "Improving left ventricular systolic function",
                "Decreasing heart rate"
              ],
              "answer": "Promoting plasma renin release",
              "explanation": "Beta blockers inhibit renin release (via beta-1 blockade), which is beneficial in heart failure by reducing RAAS activation."
            },
            {
              "stem": "Regarding myocardial infarction, which statement is TRUE?",
              "options": [
                "NSTEMI involves the entire thickness of the myocardial wall",
                "Premenopausal women are at higher risk",
                "STEMI involves the entire thickness of the myocardial wall",
                "None of the above"
              ],
              "answer": "STEMI involves the entire thickness of the myocardial wall",
              "explanation": "STEMI (ST-elevation MI) involves full-thickness myocardial necrosis, whereas NSTEMI involves subendocardial injury."
            },
            {
              "stem": "Regarding cardiac biomarkers, which statement is TRUE?",
              "options": [
                "Myoglobin is highly specific for cardiac injury",
                "Troponin is highly specific for MI",
                "CK-MB is more reliable than troponin",
                "None of the above"
              ],
              "answer": "Troponin is highly specific for MI",
              "explanation": "Troponin I and T are highly specific for myocardial injury and are the preferred biomarkers for diagnosing MI."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "List two classes of drugs used in dyslipidemias, stating the mode of action of each.",
              "modelAnswer": "1. HMG-CoA reductase inhibitors (statins): Inhibit HMG-CoA reductase, reducing hepatic cholesterol synthesis and increasing LDL receptor expression, leading to enhanced LDL clearance.\n2. Ezetimibe: Inhibits intestinal cholesterol absorption by blocking Niemann-Pick C1-Like 1 (NPC1L1) protein, reducing LDL cholesterol levels."
            },
            {
              "stem": "Discuss the management of hemolytic-uremic syndrome (HUS).",
              "modelAnswer": "Management includes:\n- Supportive care: Fluid and electrolyte balance, blood pressure control, and dialysis if needed.\n- Avoidance of antibiotics (unless clear evidence of infection) as they may worsen toxin release.\n- Plasma exchange or infusion in severe cases (e.g., atypical HUS) to remove toxins and provide ADAMTS13.\n- Monitoring for complications such as acute kidney injury, hypertension, and neurological symptoms."
            },
            {
              "stem": "Briefly describe the different types of angina.",
              "modelAnswer": "1. Stable angina: Predictable chest pain on exertion, relieved by rest or nitrates.\n2. Unstable angina: New-onset, worsening, or occurring at rest; high risk of progression to MI.\n3. Prinzmetal (variant) angina: Caused by coronary artery spasm, typically occurs at rest, often in the early morning.\n4. Microvascular angina: Chest pain due to dysfunction of small coronary arteries, often in women."
            },
            {
              "stem": "Outline the management of a patient diagnosed with iron deficiency anemia.",
              "modelAnswer": "1. Identify and treat the underlying cause (e.g., dietary deficiency, malabsorption, blood loss).\n2. Oral iron therapy: Ferrous sulfate 325 mg (60–120 mg elemental iron) daily, preferably on an empty stomach.\n3. Monitor for improvement in hemoglobin (4–8 weeks) and reticulocyte response (1 week).\n4. Address dietary factors (e.g., increase iron-rich foods, vitamin C for absorption).\n5. Consider parenteral iron if oral therapy is ineffective or malabsorption is present."
            },
            {
              "stem": "Give two examples of angiotensin-converting enzyme (ACE) inhibitors; what are some adverse effects of this class?",
              "modelAnswer": "Examples: Enalapril, Lisinopril.\nAdverse effects: Dry cough (due to bradykinin accumulation), hyperkalemia (reduced aldosterone), acute kidney injury (especially in bilateral renal artery stenosis), angioedema (rare but serious), and taste disturbances."
            },
            {
              "stem": "a) What is the mechanism of action of digoxin in heart failure?\nb) List two key monitoring parameters for digoxin therapy.",
              "modelAnswer": "a) Mechanism: Inhibits Na+/K+-ATPase, increasing intracellular calcium, enhancing cardiac contractility (positive inotropic effect) and slowing AV conduction (rate control in atrial fibrillation).\nb) Monitoring: Serum digoxin levels (therapeutic range 0.5–2.0 ng/mL), renal function (digoxin is renally excreted), and serum potassium (hypokalemia increases toxicity risk)."
            },
            {
              "stem": "a) What are the two main types of calcium channel blockers (CCBs)?\nb) Give one example of each type and state a clinical use.",
              "modelAnswer": "a) Dihydropyridines (e.g., amlodipine) and non-dihydropyridines (e.g., diltiazem, verapamil).\nb) Example 1: Amlodipine (dihydropyridine) — used for hypertension and chronic stable angina.\nExample 2: Diltiazem (non-dihydropyridine) — used for hypertension, angina, and rate control in atrial fibrillation."
            },
            {
              "stem": "a) What is the Vaughan-Williams classification of antiarrhythmic drugs?\nb) Give one example of a Class II antiarrhythmic agent.",
              "modelAnswer": "a) Class I: Sodium channel blockers; Class II: Beta-blockers; Class III: Potassium channel blockers; Class IV: Calcium channel blockers; Class V: Other mechanisms.\nb) Example: Metoprolol (beta-blocker, Class II)."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 68-year-old male presents with a 3-month history of progressive breathlessness on exertion, orthopnea (requiring 3 pillows to sleep), and bilateral ankle swelling. He reports reduced exercise tolerance and early satiety. His past medical history includes hypertension, type 2 diabetes mellitus, and dyslipidemia. On examination, his blood pressure is 150/90 mmHg, heart rate is 105 bpm (irregularly irregular), and jugular venous pressure is elevated. Bibasal crackles are heard on auscultation, and there is 2+ pitting edema to the mid-shin bilaterally. Abdominal examination reveals mild distension with shifting dullness.\n\na) What is the most likely diagnosis? Justify your answer. (2 marks)\nb) Outline the investigations you would request to confirm the diagnosis and assess severity. (3 marks)\nc) List five precipitating factors that could worsen his symptoms. (5 marks)\nd) Develop a comprehensive pharmaceutical care plan for this patient. (15 marks)",
              "modelAnswer": "a) Diagnosis: Congestive heart failure (CHF) with reduced ejection fraction (HFrEF), likely due to hypertensive heart disease and ischemic cardiomyopathy (given history of hypertension, diabetes, and dyslipidemia). The irregularly irregular pulse suggests atrial fibrillation, which can exacerbate heart failure.\n\nb) Investigations:\n- Echocardiography: To assess left ventricular ejection fraction (LVEF), valvular function, and structural abnormalities.\n- Electrocardiogram (ECG): To evaluate rhythm (e.g., atrial fibrillation), ischemia, or hypertrophy.\n- Chest X-ray: To assess for pulmonary congestion, cardiomegaly, or pleural effusions.\n- Serum B-type natriuretic peptide (BNP) or N-terminal pro-BNP (NT-proBNP): To support diagnosis and assess severity.\n- Full blood count, renal function, electrolytes, liver function tests, fasting lipid profile, and HbA1c: To evaluate comorbidities and guide therapy.\n\nc) Precipitating factors:\n1. Atrial fibrillation (rapid ventricular response increases cardiac workload).\n2. Poorly controlled hypertension (increases afterload).\n3. Non-adherence to heart failure medications (e.g., diuretics, ACE inhibitors).\n4. Dietary indiscretion (high sodium intake leading to fluid retention).\n5. Concurrent infections (e.g., pneumonia) or anemia (increases cardiac output demand).\n\n\n\n\n\n\n\n\n\nd) Pharmaceutical care plan:\n\n1. Optimize guideline-directed medical therapy (GDMT) for HFrEF:\n   - Initiate or uptitrate ACE inhibitor (e.g., enalapril) or ARB (e.g., losartan) if ACE inhibitor not tolerated, with monitoring of renal function and potassium.\n   - Start beta-blocker (e.g., bisoprolol) at low dose and uptitrate slowly, monitoring heart rate, blood pressure, and signs of worsening heart failure.\n   - Add mineralocorticoid receptor antagonist (e.g., spironolactone) if symptomatic despite ACE inhibitor and beta-blocker, with monitoring of potassium and renal function.\n   - Loop diuretic (e.g., furosemide) for symptom relief, titrated to achieve euvolemia (e.g., target weight loss of 0.5–1 kg/day).\n\n2. Rate control for atrial fibrillation:\n   - Optimize beta-blocker dose for rate control (target resting heart rate <80 bpm or <110 bpm if asymptomatic).\n   - Consider digoxin if beta-blocker is insufficient or contraindicated (monitor levels and renal function).\n\n3. Address comorbidities:\n   - Optimize diabetes control (e.g., metformin if eGFR >30 mL/min, SGLT2 inhibitor if appropriate).\n   - Statin therapy (e.g., simvastatin) for secondary prevention of cardiovascular events.\n   - Blood pressure control (target <130/80 mmHg in diabetes).\n\n4. Patient education and lifestyle modifications:\n   - Sodium restriction (<2 g/day), fluid restriction if hyponatremic (<1.5 L/day).\n   - Daily weight monitoring; instruct to report weight gain >2 kg in 3 days.\n   - Encourage moderate exercise (e.g., cardiac rehabilitation) and smoking cessation.\n   - Medication adherence counseling (e.g., blister packs, medication reminders).\n\n5. Monitoring and follow-up:\n   - Monthly visits initially to assess symptoms, weight, blood pressure, heart rate, and renal function.\n   - Adjust diuretics based on weight and symptoms; monitor for electrolyte imbalances.\n   - Annual influenza and pneumococcal vaccination.\n   - Consider referral to cardiology for advanced therapies (e.g., CRT, ICD) if LVEF remains <35% despite GDMT.\n\n6. Address barriers to adherence:\n   - Simplify medication regimen (e.g., fixed-dose combinations if available).\n   - Address cost barriers (e.g., generic formulations, patient assistance programs).\n   - Provide written instructions and involve caregivers in management."
            },
            {
              "stem": "A 55-year-old female presents with a 6-month history of fatigue, pallor, and exertional dyspnea. She reports a 5 kg weight loss over the past 3 months and intermittent episodes of dizziness. Her past medical history includes hypertension and osteoarthritis. On examination, her conjunctivae are pale, and her heart rate is 110 bpm. Laboratory investigations reveal:\n- Hemoglobin: 8.5 g/dL (normal: 12–16 g/dL)\n- MCV: 72 fL (normal: 80–100 fL)\n- Serum ferritin: 8 ng/mL (normal: 15–300 ng/mL)\n- Serum iron: 12 µmol/L (normal: 10–30 µmol/L)\n- TIBC: 55 µmol/L (normal: 45–70 µmol/L)\n- Transferrin saturation: 22% (normal: 20–50%)\n\n\na) What is the most likely diagnosis? Justify your answer. (2 marks)\nb) What additional investigations would you recommend to confirm the diagnosis? (3 marks)\nc) Outline the management plan for this patient. (5 marks)\nd) List three potential causes of her condition. (5 marks)",
              "modelAnswer": "a) Diagnosis: Iron deficiency anemia (IDA) due to microcytic hypochromic anemia (low MCV, low ferritin, low serum iron, high TIBC, and low transferrin saturation).\n\nb) Additional investigations:\n- Stool occult blood test and fecal immunochemical test (FIT) to screen for gastrointestinal bleeding.\n- Upper and lower endoscopy (if GI bleeding is suspected) to identify sources such as peptic ulcer disease, gastritis, or colorectal cancer.\n- Serum vitamin B12 and folate levels to rule out combined deficiencies.\n- C-reactive protein (CRP) and erythrocyte sedimentation rate (ESR) to assess for chronic inflammation.\n- Urinalysis and renal function tests to rule out renal causes of anemia.\n\nc) Management plan:\n1. Oral iron therapy: Ferrous sulfate 325 mg (60–120 mg elemental iron) daily, preferably taken on an empty stomach with vitamin C (e.g., orange juice) to enhance absorption. Expect a rise in hemoglobin of ~1 g/dL every 2–3 weeks.\n2. Address underlying cause: Investigate and treat the source of iron loss (e.g., GI bleeding, menorrhagia).\n3. Dietary counseling: Increase intake of iron-rich foods (e.g., red meat, leafy greens) and vitamin C to enhance absorption.\n4. Monitor response: Repeat hemoglobin and reticulocyte count in 4 weeks to assess response. Continue iron therapy for 3–6 months after normalization of hemoglobin to replenish iron stores.\n5. Consider parenteral iron if oral therapy is ineffective, contraindicated, or malabsorption is present (e.g., iron dextran or ferric carboxymaltose).\n\n\n\nd) Potential causes:\n1. Gastrointestinal bleeding (e.g., peptic ulcer disease, gastritis, colorectal cancer).\n2. Menorrhagia (heavy menstrual bleeding).\n3. Malabsorption (e.g., celiac disease, atrophic gastritis, post-gastrectomy).\n4. Chronic kidney disease (reduced erythropoietin production and iron loss during dialysis).\n5. Dietary deficiency (low iron intake, especially in vegetarians/vegans)."
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Cardiovascular & Hematopoietic",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 68-year-old male presents with fatigue and pallor. On examination, his conjunctivae appear pale. Which of the following is the MOST reliable site for detecting anemia in this patient?",
              "options": [
                "Sclera",
                "Conjunctiva",
                "Cornea",
                "Retina"
              ],
              "answer": "Conjunctiva",
              "explanation": "The conjunctiva is the most reliable site for detecting anemia due to its thin vascular structure and ease of visualization."
            },
            {
              "stem": "Which of the following drugs is MOST likely to cause bradycardia as a side effect?",
              "options": [
                "Amlodipine",
                "Digoxin",
                "Losartan",
                "Hydrochlorothiazide"
              ],
              "answer": "Digoxin",
              "explanation": "Digoxin slows conduction through the AV node, leading to bradycardia, especially in toxic doses."
            },
            {
              "stem": "A 55-year-old female with a history of hypertension and diabetes presents with exertional dyspnea and chest pain. Which investigation is MOST appropriate to assess for valvular or structural heart disease?",
              "options": [
                "ECG",
                "MRI",
                "ECHO",
                "CXR"
              ],
              "answer": "ECHO",
              "explanation": "Echocardiography is the gold standard for assessing valvular and structural heart disease due to its ability to visualize cardiac anatomy and function."
            },
            {
              "stem": "A patient's blood pressure is recorded as 150/90 mmHg. What is the mean arterial pressure (MAP) in this patient?",
              "options": [
                "60 mmHg",
                "70 mmHg",
                "110 mmHg",
                "120 mmHg"
              ],
              "answer": "110 mmHg",
              "explanation": "MAP = (SBP + 2*DBP)/3 = (150 + 2*90)/3 = 110 mmHg."
            },
            {
              "stem": "A patient's blood pressure is 140/95 mmHg. According to the WHO classification of hypertension, this would be classified as:",
              "options": [
                "Normal",
                "Pre-hypertension",
                "Stage I hypertension",
                "Stage II hypertension"
              ],
              "answer": "Stage I hypertension",
              "explanation": "Stage I hypertension is defined as systolic BP 140-159 mmHg or diastolic BP 90-99 mmHg."
            },
            {
              "stem": "A 60-year-old diabetic patient with nephropathy presents for hypertension management. What is the recommended blood pressure target for this patient?",
              "options": [
                "<140/85 mmHg",
                "<130/80 mmHg",
                "<125/75 mmHg",
                "<140/100 mmHg"
              ],
              "answer": "<130/80 mmHg",
              "explanation": "For diabetic patients with nephropathy, the target BP is <130/80 mmHg to reduce progression of kidney disease."
            },
            {
              "stem": "Which of the following is the MOST common cause of secondary hypertension?",
              "options": [
                "Aortic stenosis",
                "Drugs",
                "Renoparenchymal disease",
                "Cushing syndrome"
              ],
              "answer": "Renoparenchymal disease",
              "explanation": "Renoparenchymal disease (e.g., chronic kidney disease) is the most common cause of secondary hypertension."
            },
            {
              "stem": "Which antihypertensive agent is MOST suitable for a patient with asthma?",
              "options": [
                "Labetalol",
                "Hydralazine",
                "Nifedipine",
                "Propranolol"
              ],
              "answer": "Nifedipine",
              "explanation": "Nifedipine is a calcium channel blocker that does not exacerbate bronchospasm, unlike beta-blockers."
            },
            {
              "stem": "A 70-year-old male presents with acute pulmonary edema. Which diuretic is the MOST appropriate for reducing fluid overload?",
              "options": [
                "Hydrochlorothiazide",
                "Spironolactone",
                "Furosemide",
                "Amiloride"
              ],
              "answer": "Furosemide",
              "explanation": "Furosemide is a loop diuretic that rapidly reduces fluid overload in acute pulmonary edema."
            },
            {
              "stem": "Which of the following is NOT an adverse effect of thiazide diuretics?",
              "options": [
                "Hyperuricemia",
                "Hypoglycemia",
                "Hyperlipidemia",
                "Hyperglycemia"
              ],
              "answer": "Hypoglycemia",
              "explanation": "Thiazide diuretics can cause hyperglycemia, hyperlipidemia, and hyperuricemia, but not hypoglycemia."
            },
            {
              "stem": "Angiotensin-converting enzyme (ACE) inhibitors are contraindicated in all of the following EXCEPT:",
              "options": [
                "Aortic stenosis",
                "Renal artery stenosis",
                "First trimester of pregnancy",
                "Asthma"
              ],
              "answer": "Asthma",
              "explanation": "ACE inhibitors are contraindicated in aortic stenosis, renal artery stenosis, and pregnancy, but not in asthma."
            },
            {
              "stem": "Acebutolol is classified as a:",
              "options": [
                "Cardio-selective beta-blocker",
                "Non-selective beta-blocker",
                "Beta-blocker with vasodilatory properties",
                "None of the above"
              ],
              "answer": "Cardio-selective beta-blocker",
              "explanation": "Acebutolol is a cardio-selective beta-blocker with partial agonist activity."
            },
            {
              "stem": "Which combination is MOST suitable for managing congestive heart failure?",
              "options": [
                "ACE inhibitor and furosemide",
                "Beta-blocker and thiazide diuretic",
                "Beta-blocker and ACE inhibitor",
                "Spironolactone and nitrate"
              ],
              "answer": "ACE inhibitor and furosemide",
              "explanation": "ACE inhibitors reduce afterload and mortality, while loop diuretics reduce fluid overload in heart failure."
            },
            {
              "stem": "Toxic effects of calcium channel blockers include:",
              "options": [
                "Tachycardia",
                "Atrioventricular block and congestive heart failure",
                "Hyperkalemia",
                "Hyperglycemia"
              ],
              "answer": "Atrioventricular block and congestive heart failure",
              "explanation": "Calcium channel blockers can cause AV block, bradycardia, and exacerbate heart failure."
            },
            {
              "stem": "Reflex tachycardia is seen with the use of all the following EXCEPT:",
              "options": [
                "Hydralazine",
                "Prazosin",
                "Propranolol",
                "Minoxidil"
              ],
              "answer": "Propranolol",
              "explanation": "Propranolol is a beta-blocker that reduces heart rate and does not cause reflex tachycardia."
            },
            {
              "stem": "Which medication is PREFERRED for severe hypertension in pregnancy?",
              "options": [
                "Methyldopa",
                "Hydralazine",
                "Nifedipine",
                "Enalapril"
              ],
              "answer": "Methyldopa",
              "explanation": "Methyldopa is the preferred antihypertensive in pregnancy due to its safety profile."
            },
            {
              "stem": "Regarding hypertensive crisis, which statement is TRUE?",
              "options": [
                "Urgencies are associated with end-organ damage",
                "Immediate blood pressure reduction is recommended in hypertensive urgencies",
                "Hypertensive emergency is managed using IV therapy",
                "Immediate-release nifedipine should be used"
              ],
              "answer": "Hypertensive emergency is managed using IV therapy",
              "explanation": "Hypertensive emergency requires immediate BP reduction with IV agents, while urgencies do not."
            },
            {
              "stem": "Which statement about dyslipidemias is UNTRUE?",
              "options": [
                "Diet and genetics play a role",
                "They are major players in atherosclerosis and plaque formation",
                "Cholesterol screening should start as soon as cardiovascular disorders occur",
                "Pediatric screening is largely based on genetics and risk factors"
              ],
              "answer": "Cholesterol screening should start as soon as cardiovascular disorders occur",
              "explanation": "Cholesterol screening should begin in childhood/adolescence, not after cardiovascular disorders occur."
            },
            {
              "stem": "Familial hypercholesterolemia is associated with a mutation in the gene coding for:",
              "options": [
                "Apolipoprotein B-100",
                "LDL receptor",
                "Apolipoprotein E",
                "HMG-CoA reductase"
              ],
              "answer": "LDL receptor",
              "explanation": "Familial hypercholesterolemia results from mutations in the LDL receptor gene, impairing LDL clearance."
            },
            {
              "stem": "Which drug is NOT associated with hyperlipidemia?",
              "options": [
                "Cyclosporine",
                "Protease inhibitors",
                "Prazosin",
                "Isotretinoin"
              ],
              "answer": "Prazosin",
              "explanation": "Prazosin is an alpha-blocker and is not associated with hyperlipidemia."
            },
            {
              "stem": "HDL levels can be increased by all of the following EXCEPT:",
              "options": [
                "Exercise",
                "Ezetimibe",
                "Niacin",
                "Diets high in polyunsaturated fatty acids"
              ],
              "answer": "Ezetimibe",
              "explanation": "Ezetimibe reduces LDL cholesterol but does not increase HDL levels."
            },
            {
              "stem": "HMG-CoA reductase inhibitors:",
              "options": [
                "Bind intestinal bile acids",
                "Are the most potent and among best tolerated",
                "Can be used in pregnancy",
                "Adverse effects include flushing and pruritus"
              ],
              "answer": "Are the most potent and among best tolerated",
              "explanation": "Statins are the most potent LDL-lowering agents and are generally well tolerated."
            },
            {
              "stem": "Which statement about angina is TRUE?",
              "options": [
                "Prinzmetal’s angina occurs at rest, especially in the early morning hours",
                "Stable angina occurs at rest",
                "Symptoms of unstable angina are relieved by rest",
                "Stable angina requires hospital admission and aggressive therapy"
              ],
              "answer": "Prinzmetal’s angina occurs at rest, especially in the early morning hours",
              "explanation": "Prinzmetal’s (variant) angina is caused by coronary vasospasm and typically occurs at rest."
            },
            {
              "stem": "Which drug is NOT used to prevent recurrent ischemic symptoms?",
              "options": [
                "Calcium channel blockers",
                "Beta blockers",
                "Thiazide diuretics",
                "Nitrates"
              ],
              "answer": "Thiazide diuretics",
              "explanation": "Thiazide diuretics are not used for preventing recurrent ischemic symptoms."
            },
            {
              "stem": "Which statement about the clinical management of ischemic heart disease is UNTRUE?",
              "options": [
                "Pharmacotherapy targets a reduction in cardiac workload",
                "Statins should only be used in patients with elevated LDL levels",
                "ACE inhibitors have shown benefit in ischemic heart disease combined with hypertension",
                "Control of modifiable risk factors is important in the management of ischemic heart disease"
              ],
              "answer": "Statins should only be used in patients with elevated LDL levels",
              "explanation": "Statins are used in ischemic heart disease regardless of LDL levels due to pleiotropic effects."
            },
            {
              "stem": "Which statement about antiplatelet drugs in angina is UNTRUE?",
              "options": [
                "Aspirin has been shown to reduce the risk of major adverse cardiac events",
                "Aspirin doses greater than 162 mg have therapeutic benefit",
                "Clopidogrel is preferred in aspirin allergy or intolerance",
                "Combination of both aspirin and clopidogrel is recommended in patients with stents to prevent in-stent thrombosis"
              ],
              "answer": "Aspirin doses greater than 162 mg have therapeutic benefit",
              "explanation": "Higher aspirin doses (>162 mg) do not provide additional benefit and increase bleeding risk."
            },
            {
              "stem": "Short-acting nitrates in angina:",
              "options": [
                "Have a delayed onset of action",
                "Can be used as maintenance therapy in chronic stable angina",
                "Adverse effects include lightheadedness",
                "Can be used in combination with phosphodiesterase enzyme inhibitors"
              ],
              "answer": "Adverse effects include lightheadedness",
              "explanation": "Short-acting nitrates cause lightheadedness due to vasodilation and hypotension."
            },
            {
              "stem": "Calcium channel blockers in angina:",
              "options": [
                "Can be used with beta blockers when initial treatment is unsuccessful",
                "Are recommended when beta blockers are contraindicated",
                "Combination of dihydropyridines and beta blockers may improve symptoms",
                "None of the above"
              ],
              "answer": "None of the above",
              "explanation": "All statements are true; thus, 'none of the above' is incorrect."
            },
            {
              "stem": "Symptoms of left heart failure include all of the following EXCEPT:",
              "options": [
                "Fatigue",
                "Nocturia",
                "Dyspnea",
                "Cough"
              ],
              "answer": "Nocturia",
              "explanation": "Nocturia is more common in right heart failure due to fluid redistribution."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "a) List two classes of drugs used in dyslipidemias, stating the mode of action of each.\n\nb) Provide one example of a drug from each class.",
              "modelAnswer": "a) Two classes of drugs used in dyslipidemias and their modes of action:\n   - HMG-CoA reductase inhibitors (statins): Inhibit HMG-CoA reductase, reducing cholesterol synthesis in the liver and increasing LDL receptor expression.\n   - Fibrates: Activate peroxisome proliferator-activated receptor-alpha (PPAR-α), increasing lipoprotein lipase activity and reducing triglycerides.\n\nb) Examples:\n   - Statins: Simvastatin\n   - Fibrates: Fenofibrate"
            },
            {
              "stem": "Outline the management of a patient diagnosed with iron deficiency anemia.",
              "modelAnswer": "Management of iron deficiency anemia:\n1. Identify and treat the underlying cause (e.g., dietary deficiency, malabsorption, blood loss).\n2. Oral iron therapy: Ferrous sulfate 200 mg (60 mg elemental iron) 2-3 times daily, preferably on an empty stomach.\n3. Monitor for improvement in hemoglobin (4-8 weeks) and resolution of symptoms.\n4. Address dietary deficiencies (e.g., red meat, leafy greens, fortified foods).\n5. Consider parenteral iron (e.g., iron sucrose) if oral therapy is ineffective or poorly tolerated.\n6. Treat underlying conditions (e.g., H. pylori eradication, celiac disease management)."
            },
            {
              "stem": "a) Describe the different types of angina.\n\nb) Provide one distinguishing feature for each type.",
              "modelAnswer": "a) Types of angina:\n   - Stable angina: Predictable chest pain triggered by exertion or stress, relieved by rest or nitroglycerin.\n   - Unstable angina: Chest pain at rest or with minimal exertion, increasing in frequency or severity; not relieved by rest.\n   - Prinzmetal’s (variant) angina: Chest pain at rest due to coronary vasospasm, often occurring early in the morning.\n   - Microvascular angina: Chest pain due to dysfunction of small coronary arteries, often in the absence of obstructive CAD.\n\nb) Distinguishing features:\n   - Stable angina: Relieved by rest or nitroglycerin.\n   - Unstable angina: Occurs at rest or with minimal exertion.\n   - Prinzmetal’s angina: Occurs early in the morning due to vasospasm.\n   - Microvascular angina: Normal coronary angiography but abnormal stress test."
            },
            {
              "stem": "Give two examples of angiotensin-converting enzyme (ACE) inhibitors and list three adverse effects of this class.",
              "modelAnswer": "Examples of ACE inhibitors:\n   - Enalapril\n   - Lisinopril\n\nAdverse effects of ACE inhibitors:\n   1. Dry cough (due to bradykinin accumulation)\n   2. Hyperkalemia (due to reduced aldosterone secretion)\n   3. Acute kidney injury (especially in bilateral renal artery stenosis)"
            },
            {
              "stem": "a) Define secondary hypertension.\n\nb) List three common causes of secondary hypertension.",
              "modelAnswer": "a) Secondary hypertension is high blood pressure caused by an identifiable underlying condition or medication.\n\nb) Common causes of secondary hypertension:\n   1. Renoparenchymal disease (e.g., chronic kidney disease)\n   2. Renovascular disease (e.g., renal artery stenosis)\n   3. Endocrine disorders (e.g., primary hyperaldosteronism, Cushing’s syndrome)"
            },
            {
              "stem": "a) What is the mechanism of action of loop diuretics?\n\nb) List two clinical indications for loop diuretics.",
              "modelAnswer": "a) Mechanism of action of loop diuretics:\n   - Inhibit the Na+/K+/2Cl- cotransporter in the thick ascending limb of the loop of Henle, reducing sodium reabsorption and increasing urine output.\n\nb) Clinical indications for loop diuretics:\n   1. Acute pulmonary edema\n   2. Edema associated with congestive heart failure or hepatic cirrhosis"
            },
            {
              "stem": "a) What is the target blood pressure for a patient with hypertension and diabetes?\n\nb) Why is this target lower than in non-diabetic patients?",
              "modelAnswer": "a) Target blood pressure for a patient with hypertension and diabetes: <130/80 mmHg.\n\nb) This target is lower because diabetic patients are at higher risk of microvascular complications (e.g., nephropathy, retinopathy), and intensive BP control reduces these risks."
            },
            {
              "stem": "a) What is the Vaughan-Williams classification of antiarrhythmic drugs?\n\nb) Provide one example of a Class II antiarrhythmic agent.",
              "modelAnswer": "a) Vaughan-Williams classification of antiarrhythmic drugs:\n   - Class I: Sodium channel blockers (e.g., lidocaine, flecainide)\n   - Class II: Beta-blockers (e.g., metoprolol, propranolol)\n   - Class III: Potassium channel blockers (e.g., amiodarone, sotalol)\n   - Class IV: Calcium channel blockers (e.g., verapamil, diltiazem)\n\nb) Example of a Class II antiarrhythmic agent: Metoprolol"
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 65-year-old male with a history of hypertension, type 2 diabetes, and chronic kidney disease presents with a 2-week history of progressive dyspnea, orthopnea, and bilateral leg swelling. He reports using 3 pillows at night to sleep comfortably. On examination, his blood pressure is 160/95 mmHg, heart rate is 105 bpm, and respiratory rate is 22 breaths/min. Jugular venous pressure is elevated, and crackles are heard at both lung bases. His ankles are swollen with pitting edema, and his abdomen is slightly distended.\n\n\na) What is the MOST likely diagnosis? Provide two supporting clinical features.\n\nb) Outline the investigations you would request to confirm the diagnosis and assess severity.\n\nc) List three precipitating factors for this patient’s symptoms.\n\n\nd) Develop a pharmaceutical care plan for this patient, including non-pharmacological and pharmacological interventions.",
              "modelAnswer": "a) Most likely diagnosis: Acute decompensated heart failure (ADHF) with volume overload.\n   Supporting clinical features:\n   1. Progressive dyspnea and orthopnea (signs of pulmonary congestion)\n   2. Bilateral leg swelling with pitting edema (signs of systemic congestion)\n\nb) Investigations to confirm diagnosis and assess severity:\n   - Echocardiography: To assess left ventricular ejection fraction (LVEF) and structural abnormalities.\n   - Chest X-ray: To evaluate for pulmonary edema, cardiomegaly, or pleural effusion.\n   - B-type natriuretic peptide (BNP) or N-terminal pro-BNP (NT-proBNP): Elevated levels support heart failure diagnosis.\n   - Electrocardiogram (ECG): To assess for arrhythmias, ischemia, or left ventricular hypertrophy.\n   - Serum electrolytes, renal function, and liver function tests: To assess for electrolyte imbalances, renal dysfunction, or hepatic congestion.\n   - Troponin levels: To rule out acute coronary syndrome as a precipitating factor.\n\nc) Precipitating factors for symptoms:\n   1. Poorly controlled hypertension (increased afterload)\n   2. Fluid overload due to excessive sodium intake or non-adherence to diuretics\n   3. Anemia (reduced oxygen delivery to the myocardium)\n\nd) Pharmaceutical care plan:\n   Non-pharmacological interventions:\n   - Sodium restriction (<2 g/day) to reduce fluid retention.\n   - Fluid restriction (<1.5 L/day) if hyponatremic.\n   - Daily weight monitoring to assess fluid balance.\n   - Encourage gradual physical activity (e.g., walking) as tolerated.\n   - Smoking cessation and alcohol reduction.\n\n   Pharmacological interventions:\n   - Loop diuretic (e.g., furosemide 40 mg IV initially, then titrate based on response) to reduce fluid overload.\n   - ACE inhibitor (e.g., enalapril 5 mg PO daily) to reduce afterload and improve cardiac remodeling.\n   - Beta-blocker (e.g., bisoprolol 1.25 mg PO daily) to reduce heart rate and improve cardiac function.\n   - Mineralocorticoid receptor antagonist (e.g., spironolactone 25 mg PO daily) for additional diuresis and mortality benefit.\n   - Consider digoxin if atrial fibrillation with rapid ventricular response is present.\n   - Optimize diabetes control (e.g., metformin, SGLT2 inhibitors if eGFR >30 mL/min).\n\n   Monitoring:\n   - Daily weights and fluid balance.\n   - Serum electrolytes (especially potassium) and renal function 2-3 days after diuretic initiation.\n   - Blood pressure and heart rate monitoring.\n   - Signs of worsening heart failure (e.g., increased dyspnea, edema).\n\n   Patient education:\n   - Signs and symptoms of worsening heart failure.\n   - Medication adherence and importance of follow-up.\n   - Dietary and lifestyle modifications."
            },
            {
              "stem": "A 50-year-old female presents with a 3-month history of fatigue, pallor, and exertional dyspnea. She reports a history of heavy menstrual bleeding for the past year. On examination, her conjunctivae are pale, and her heart rate is 100 bpm. Laboratory investigations reveal:\n   - Hemoglobin: 9.5 g/dL (normal: 12-16 g/dL)\n   - MCV: 72 fL (normal: 80-100 fL)\n   - Serum ferritin: 10 ng/mL (normal: 20-300 ng/mL)\n   - Serum iron: 30 µg/dL (normal: 50-170 µg/dL)\n   - TIBC: 450 µg/dL (normal: 250-450 µg/dL)\n\n\na) What is the MOST likely diagnosis? Provide two supporting laboratory findings.\n\nb) Outline the management of this patient, including pharmacological and non-pharmacological interventions.\n\nc) List two potential complications if this condition is left untreated.",
              "modelAnswer": "a) Most likely diagnosis: Iron deficiency anemia (IDA).\n   Supporting laboratory findings:\n   1. Microcytic hypochromic anemia (low MCV, low hemoglobin)\n   2. Low serum ferritin (depleted iron stores)\n\nb) Management of iron deficiency anemia:\n   Non-pharmacological interventions:\n   - Dietary modification: Increase intake of iron-rich foods (e.g., red meat, leafy greens, fortified cereals).\n   - Address underlying cause: Evaluate for menorrhagia (e.g., refer to gynecology for further assessment).\n\n   Pharmacological interventions:\n   - Oral iron therapy: Ferrous sulfate 200 mg (60 mg elemental iron) 2-3 times daily, preferably on an empty stomach.\n   - Consider parenteral iron (e.g., iron sucrose) if oral therapy is ineffective or poorly tolerated, or if rapid correction is needed.\n   - Consider proton pump inhibitor (e.g., omeprazole) if Helicobacter pylori infection is suspected.\n\n   Monitoring:\n   - Repeat hemoglobin and MCV after 4-8 weeks of therapy.\n   - Assess for symptom improvement (e.g., reduced fatigue, improved exercise tolerance).\n   - Monitor for adverse effects of iron therapy (e.g., constipation, nausea).\n\n   Patient education:\n   - Importance of medication adherence.\n   - Dietary sources of iron.\n   - Signs and symptoms of anemia and when to seek medical attention.\n\nc) Potential complications if left untreated:\n   1. Cardiovascular complications (e.g., high-output heart failure due to increased cardiac output)\n   2. Cognitive impairment or developmental delays in children (due to impaired oxygen delivery to the brain)"
            }
          ]
        }
      ]
    },
    "3": {
      "title": "Cardiovascular & Hematopoietic",
      "variant": 3,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Which physical sign is MOST specific for detecting anemia in a dark-skinned patient?",
              "options": [
                "Pallor of the conjunctiva",
                "Pallor of the sclera",
                "Pallor of the buccal mucosa",
                "Pallor of the nail beds"
              ],
              "answer": "Pallor of the conjunctiva",
              "explanation": "Conjunctival pallor is the most reliable clinical sign for detecting anemia, especially in individuals with darker skin tones where mucosal surfaces are more visible."
            },
            {
              "stem": "A 68-year-old patient presents with bradycardia (HR 48 bpm). Which of the following medications is MOST likely to cause this?",
              "options": [
                "Amlodipine",
                "Lisinopril",
                "Digoxin",
                "Losartan"
              ],
              "answer": "Digoxin",
              "explanation": "Digoxin slows conduction through the AV node and can cause bradycardia, especially in toxic concentrations or in patients with pre-existing conduction abnormalities."
            },
            {
              "stem": "A 55-year-old male with a history of hypertension and diabetes is found to have a new murmur on auscultation. Which investigation is MOST appropriate to assess valvular/structural heart disease?",
              "options": [
                "Electrocardiogram (ECG)",
                "Chest X-ray",
                "Echocardiogram",
                "Cardiac MRI"
              ],
              "answer": "Echocardiogram",
              "explanation": "Echocardiography is the gold standard for evaluating valvular and structural heart disease, providing detailed images of cardiac anatomy and function."
            },
            {
              "stem": "A patient’s blood pressure is recorded as 150/90 mmHg. What is the mean arterial pressure (MAP) in this patient?",
              "options": [
                "60 mmHg",
                "70 mmHg",
                "80 mmHg",
                "90 mmHg"
              ],
              "answer": "110 mmHg",
              "explanation": "MAP is calculated as (SBP + 2*DBP)/3 = (150 + 2*90)/3 = 110 mmHg."
            },
            {
              "stem": "A 45-year-old diabetic patient with nephropathy has a blood pressure of 145/85 mmHg. What is the recommended BP target for this patient according to WHO/KDI guidelines?",
              "options": [
                "<140/90 mmHg",
                "<130/80 mmHg",
                "<125/75 mmHg",
                "<140/80 mmHg"
              ],
              "answer": "<130/80 mmHg",
              "explanation": "For diabetic patients with nephropathy, WHO/KDI guidelines recommend a target BP of <130/80 mmHg to reduce progression of renal damage."
            },
            {
              "stem": "Which of the following is the MOST common cause of secondary hypertension?",
              "options": [
                "Aortic coarctation",
                "Primary hyperaldosteronism",
                "Renoparenchymal disease",
                "Cushing syndrome"
              ],
              "answer": "Renoparenchymal disease",
              "explanation": "Renoparenchymal disease (e.g., chronic kidney disease) is the most common cause of secondary hypertension, accounting for ~5-10% of all hypertension cases."
            },
            {
              "stem": "A 50-year-old asthmatic patient requires antihypertensive therapy. Which of the following agents is MOST appropriate to avoid bronchospasm?",
              "options": [
                "Propranolol",
                "Carvedilol",
                "Bisoprolol",
                "Labetalol"
              ],
              "answer": "Bisoprolol",
              "explanation": "Bisoprolol is a cardioselective beta-blocker with minimal effect on bronchial beta-2 receptors, making it safer for patients with asthma."
            },
            {
              "stem": "A patient with acute pulmonary edema secondary to heart failure is admitted. Which diuretic is MOST appropriate for rapid symptom relief?",
              "options": [
                "Hydrochlorothiazide",
                "Spironolactone",
                "Furosemide",
                "Amiloride"
              ],
              "answer": "Furosemide",
              "explanation": "Furosemide is a loop diuretic that provides rapid diuresis in acute pulmonary edema by reducing preload and pulmonary congestion."
            },
            {
              "stem": "A 60-year-old patient on hydrochlorothiazide for hypertension develops hyperuricemia. Which adverse effect of thiazide diuretics does this represent?",
              "options": [
                "Hyperglycemia",
                "Hyperlipidemia",
                "Hyperuricemia",
                "Hypokalemia"
              ],
              "answer": "Hyperuricemia",
              "explanation": "Thiazide diuretics can cause hyperuricemia by reducing renal uric acid excretion, which may precipitate gout in susceptible individuals."
            },
            {
              "stem": "Which of the following is NOT a contraindication for ACE inhibitors?",
              "options": [
                "Bilateral renal artery stenosis",
                "Pregnancy",
                "Aortic stenosis",
                "Asthma"
              ],
              "answer": "Asthma",
              "explanation": "ACE inhibitors are contraindicated in bilateral renal artery stenosis, pregnancy, and aortic stenosis, but not in asthma. Beta-blockers are contraindicated in asthma."
            },
            {
              "stem": "Acebutolol is classified as which type of beta-blocker?",
              "options": [
                "Non-selective beta-blocker",
                "Cardioselective beta-blocker",
                "Beta-blocker with vasodilatory properties",
                "Beta-blocker with intrinsic sympathomimetic activity"
              ],
              "answer": "Cardioselective beta-blocker",
              "explanation": "Acebutolol is a cardioselective beta-blocker with partial agonist activity, primarily blocking beta-1 receptors."
            },
            {
              "stem": "Which combination is MOST appropriate for the management of congestive cardiac failure?",
              "options": [
                "ACE inhibitor + thiazide diuretic",
                "ACE inhibitor + furosemide",
                "Beta-blocker + thiazide diuretic",
                "Spironolactone + nitrate"
              ],
              "answer": "ACE inhibitor + furosemide",
              "explanation": "ACE inhibitors (e.g., enalapril) reduce afterload and remodeling, while loop diuretics (e.g., furosemide) reduce preload and congestion in heart failure."
            },
            {
              "stem": "A patient presents with bradycardia and hypotension after a suspected overdose of a calcium channel blocker. Which toxicity is MOST likely?",
              "options": [
                "Hyperkalemia",
                "Tachycardia",
                "Atrioventricular block",
                "Hyperglycemia"
              ],
              "answer": "Atrioventricular block",
              "explanation": "Calcium channel blocker toxicity (e.g., verapamil, diltiazem) typically causes bradycardia and AV block due to reduced calcium influx in cardiac conduction tissue."
            },
            {
              "stem": "Reflex tachycardia is a known adverse effect of which antihypertensive agent?",
              "options": [
                "Propranolol",
                "Amlodipine",
                "Lisinopril",
                "Losartan"
              ],
              "answer": "Amlodipine",
              "explanation": "Amlodipine, a dihydropyridine calcium channel blocker, causes reflex tachycardia due to peripheral vasodilation and subsequent sympathetic activation."
            },
            {
              "stem": "Which antihypertensive is MOST appropriate for severe hypertension in pregnancy?",
              "options": [
                "Enalapril",
                "Losartan",
                "Nifedipine",
                "Propranolol"
              ],
              "answer": "Nifedipine",
              "explanation": "Nifedipine (a calcium channel blocker) is safe and effective for managing severe hypertension in pregnancy, with minimal fetal risk."
            },
            {
              "stem": "Which statement about hypertensive crisis is CORRECT?",
              "options": [
                "Hypertensive urgencies require immediate BP reduction with IV therapy",
                "Hypertensive emergencies are associated with end-organ damage",
                "Immediate-release nifedipine is the preferred agent for hypertensive emergencies",
                "Hypertensive urgencies should be managed with oral agents within 24 hours"
              ],
              "answer": "Hypertensive emergencies are associated with end-organ damage",
              "explanation": "Hypertensive emergencies involve acute end-organ damage (e.g., stroke, MI, aortic dissection), requiring immediate BP reduction with IV agents."
            },
            {
              "stem": "Which statement about dyslipidemias is INCORRECT?",
              "options": [
                "Diet and genetics play a role in their development",
                "They are major contributors to atherosclerosis and plaque formation",
                "Cholesterol screening should start at age 20 in low-risk individuals",
                "Pediatric screening is largely based on family history and risk factors"
              ],
              "answer": "Cholesterol screening should start at age 20 in low-risk individuals",
              "explanation": "Cholesterol screening should start at age 35 for men and 45 for women in low-risk individuals, per WHO guidelines."
            },
            {
              "stem": "Familial hypercholesterolemia is MOST commonly associated with a defect in which of the following?",
              "options": [
                "Apolipoprotein B-100",
                "Apolipoprotein E",
                "LDL receptor gene",
                "HMG-CoA reductase gene"
              ],
              "answer": "LDL receptor gene",
              "explanation": "Familial hypercholesterolemia is caused by mutations in the LDL receptor gene, leading to impaired LDL clearance and elevated cholesterol levels."
            },
            {
              "stem": "Which drug is NOT typically associated with hyperlipidemia?",
              "options": [
                "Cyclosporine",
                "Protease inhibitors",
                "Prazosin",
                "Isotretinoin"
              ],
              "answer": "Prazosin",
              "explanation": "Prazosin (an alpha-1 blocker) is not associated with hyperlipidemia, whereas cyclosporine, protease inhibitors, and isotretinoin can cause lipid abnormalities."
            },
            {
              "stem": "Which intervention does NOT increase HDL levels?",
              "options": [
                "Regular exercise",
                "Niacin therapy",
                "Ezetimibe therapy",
                "Diets high in polyunsaturated fatty acids"
              ],
              "answer": "Ezetimibe therapy",
              "explanation": "Ezetimibe reduces LDL cholesterol but does not significantly increase HDL levels. Exercise, niacin, and polyunsaturated fatty acids can raise HDL."
            },
            {
              "stem": "Which statement about HMG-CoA reductase inhibitors (statins) is CORRECT?",
              "options": [
                "They bind intestinal bile acids",
                "They are the most potent and well-tolerated lipid-lowering agents",
                "They can be used safely in pregnancy",
                "Adverse effects include flushing and pruritus"
              ],
              "answer": "They are the most potent and well-tolerated lipid-lowering agents",
              "explanation": "Statins are the most potent LDL-lowering agents and are generally well-tolerated, though they can cause myopathy and require monitoring."
            },
            {
              "stem": "Prinzmetal’s angina is characterized by which feature?",
              "options": [
                "Occurs at rest, especially in the early morning hours",
                "Relieved by rest",
                "Requires hospital admission and aggressive therapy",
                "Associated with fixed coronary artery stenosis"
              ],
              "answer": "Occurs at rest, especially in the early morning hours",
              "explanation": "Prinzmetal’s angina is caused by coronary artery vasospasm and typically occurs at rest, often in the early morning."
            },
            {
              "stem": "Which drug is NOT used to prevent recurrent ischemic symptoms in angina?",
              "options": [
                "Calcium channel blockers",
                "Beta blockers",
                "Thiazide diuretics",
                "Nitrates"
              ],
              "answer": "Thiazide diuretics",
              "explanation": "Thiazide diuretics are not used for preventing ischemic symptoms in angina; calcium channel blockers, beta blockers, and nitrates are standard therapies."
            },
            {
              "stem": "Which statement about the clinical management of ischemic heart disease is INCORRECT?",
              "options": [
                "Pharmacotherapy targets reduction in cardiac workload",
                "Statins should only be used in patients with elevated LDL levels",
                "ACE inhibitors benefit patients with ischemic heart disease and hypertension",
                "Control of modifiable risk factors is essential"
              ],
              "answer": "Statins should only be used in patients with elevated LDL levels",
              "explanation": "Statins are beneficial in ischemic heart disease regardless of baseline LDL levels, as they stabilize plaques and reduce inflammation."
            },
            {
              "stem": "Which statement about antiplatelet drugs in angina is INCORRECT?",
              "options": [
                "Aspirin reduces the risk of major adverse cardiac events",
                "Aspirin doses >162 mg have no additional benefit",
                "Clopidogrel is preferred in aspirin allergy",
                "Combination of aspirin and clopidogrel is recommended for all patients with stents"
              ],
              "answer": "Combination of aspirin and clopidogrel is recommended for all patients with stents",
              "explanation": "Dual antiplatelet therapy (aspirin + clopidogrel) is recommended for 1-12 months post-stent placement, not indefinitely."
            },
            {
              "stem": "Which statement about short-acting nitrates in angina is CORRECT?",
              "options": [
                "They have a delayed onset of action",
                "They can be used as maintenance therapy in chronic stable angina",
                "Adverse effects include lightheadedness",
                "They can be safely combined with phosphodiesterase enzyme inhibitors"
              ],
              "answer": "Adverse effects include lightheadedness",
              "explanation": "Short-acting nitrates (e.g., sublingual GTN) cause rapid vasodilation, leading to lightheadedness, headache, and hypotension. They should not be combined with PDE-5 inhibitors due to risk of severe hypotension."
            },
            {
              "stem": "Which statement about calcium channel blockers in angina is INCORRECT?",
              "options": [
                "They can be used with beta blockers when initial treatment fails",
                "They are recommended when beta blockers are contraindicated",
                "Combination of dihydropyridines and beta blockers may improve symptoms",
                "None of the above"
              ],
              "answer": "None of the above",
              "explanation": "All statements are correct; calcium channel blockers (e.g., amlodipine) are effective alternatives or adjuncts to beta blockers in angina management."
            },
            {
              "stem": "Which symptom is NOT typical of left heart failure?",
              "options": [
                "Fatigue",
                "Nocturia",
                "Dyspnea",
                "Cough"
              ],
              "answer": "Nocturia",
              "explanation": "Nocturia is more common in right heart failure due to fluid redistribution at night, whereas left heart failure typically presents with dyspnea, fatigue, and cough."
            },
            {
              "stem": "Hepatomegaly in congestive cardiac failure is a sign of which condition?",
              "options": [
                "Left heart failure",
                "Right heart failure",
                "Both left and right heart failure",
                "Aortic incompetence"
              ],
              "answer": "Right heart failure",
              "explanation": "Hepatomegaly occurs in right heart failure due to venous congestion and elevated central venous pressure."
            },
            {
              "stem": "Which factor does NOT precipitate symptoms of heart failure?",
              "options": [
                "Anemia",
                "Pregnancy",
                "Well-controlled hypertension",
                "Doxorubicin use"
              ],
              "answer": "Well-controlled hypertension",
              "explanation": "Well-controlled hypertension is not a precipitating factor for heart failure; anemia, pregnancy, and cardiotoxic drugs (e.g., doxorubicin) can exacerbate heart failure."
            },
            {
              "stem": "Which agent can be combined with loop diuretics to enhance diuresis in heart failure?",
              "options": [
                "Chlorthalidone",
                "Ethacrynic acid",
                "Metolazone",
                "Bumetanide"
              ],
              "answer": "Metolazone",
              "explanation": "Metolazone is a thiazide-like diuretic that can be combined with loop diuretics to achieve synergistic diuresis in resistant edema."
            },
            {
              "stem": "Which effect is NOT a beneficial property of spironolactone in heart failure?",
              "options": [
                "Lowers heart rate",
                "Increases potassium levels",
                "Prevents ventricular remodeling",
                "Increases blood volume"
              ],
              "answer": "Increases blood volume",
              "explanation": "Spironolactone prevents ventricular remodeling and hyperkalemia but does not increase blood volume; it is a potassium-sparing diuretic."
            },
            {
              "stem": "Which effect is NOT associated with ACE inhibitors in heart failure?",
              "options": [
                "Slow ventricular remodeling",
                "Lower heart rate",
                "Prevent myocardial fibrosis",
                "Lower peripheral resistance"
              ],
              "answer": "Lower heart rate",
              "explanation": "ACE inhibitors lower peripheral resistance and prevent remodeling/fibrosis but do not directly lower heart rate (beta blockers do)."
            },
            {
              "stem": "Which effect is NOT a beneficial property of beta blockers in heart failure?",
              "options": [
                "Reverse left ventricular remodeling",
                "Promote plasma renin release",
                "Improve left ventricular systolic function",
                "Decrease heart rate"
              ],
              "answer": "Promote plasma renin release",
              "explanation": "Beta blockers improve systolic function and reverse remodeling but suppress renin release via beta-1 blockade."
            },
            {
              "stem": "Which statement about myocardial infarction is CORRECT?",
              "options": [
                "NSTEMI involves the entire thickness of the myocardial wall",
                "Premenopausal women are at higher risk",
                "STEMI involves the entire thickness of the myocardial wall",
                "None of the above"
              ],
              "answer": "STEMI involves the entire thickness of the myocardial wall",
              "explanation": "STEMI (ST-elevation MI) involves full-thickness myocardial necrosis, whereas NSTEMI is subendocardial."
            },
            {
              "stem": "Which cardiac biomarker is MOST specific for myocardial injury?",
              "options": [
                "Myoglobin",
                "Troponin",
                "CK-MB",
                "BNP"
              ],
              "answer": "Troponin",
              "explanation": "Troponin (I or T) is highly specific for myocardial injury and remains elevated for days, making it the preferred biomarker for MI diagnosis."
            },
            {
              "stem": "A 75-year-old man presents with chest pain and BP 200/105 mmHg 10 hours after symptom onset. Which statement about pain management is CORRECT?",
              "options": [
                "Pain cannot be relieved with ASA 325 mg",
                "Pain should be managed with morphine sulfate 2-5 mg IV q5-15min",
                "There is no need to treat pain in MI",
                "Pain indicates the patient is not having an MI"
              ],
              "answer": "Pain should be managed with morphine sulfate 2-5 mg IV q5-15min",
              "explanation": "Morphine is the drug of choice for severe chest pain in MI, as it reduces preload, afterload, and sympathetic tone."
            },
            {
              "stem": "Which statement about nitroglycerin (NTG) use in MI is CORRECT?",
              "options": [
                "NTG is contraindicated in MI",
                "Sublingual NTG is contraindicated in MI",
                "Give a single sublingual dose only on admission",
                "Give IV NTG starting at 10-20 µg/min"
              ],
              "answer": "Give IV NTG starting at 10-20 µg/min",
              "explanation": "IV NTG is used in MI to reduce preload and afterload, starting at 10-20 µg/min and titrating to symptom relief and BP."
            },
            {
              "stem": "Should metoprolol be used in this patient’s MI management?",
              "options": [
                "Yes; it minimizes signs/symptoms of ischemia",
                "No; it is contraindicated with nitroglycerin",
                "No; it is used only if tPA is given",
                "No; it is contraindicated if HR >100 bpm"
              ],
              "answer": "Yes; it minimizes signs/symptoms of ischemia",
              "explanation": "Metoprolol (a beta-1 selective blocker) reduces myocardial oxygen demand and ischemia in MI, provided there are no contraindications (e.g., severe bradycardia, hypotension)."
            },
            {
              "stem": "Which of the following is NOT a common cause of arrhythmias?",
              "options": [
                "Myocardial infarction",
                "Thyroid disorders",
                "Young age",
                "Excess alcohol consumption"
              ],
              "answer": "Young age",
              "explanation": "Young age is not a cause of arrhythmias; MI, thyroid disorders (hyper/hypo), and alcohol excess are common triggers."
            },
            {
              "stem": "Which agent is classified as a Class II antiarrhythmic?",
              "options": [
                "Sotalol",
                "Procainamide",
                "Diltiazem",
                "Metoprolol"
              ],
              "answer": "Metoprolol",
              "explanation": "Metoprolol is a Class II antiarrhythmic (beta-blocker) that slows AV conduction and suppresses sympathetic-driven arrhythmias."
            },
            {
              "stem": "A patient on chronic amiodarone requires monitoring for toxicity. Which test is MOST important?",
              "options": [
                "Chest X-ray",
                "Thyroid function tests",
                "Liver function tests",
                "Ophthalmic examinations"
              ],
              "answer": "Thyroid function tests",
              "explanation": "Amiodarone causes thyroid dysfunction (hypo/hyper) in ~20% of patients, necessitating regular TFT monitoring."
            },
            {
              "stem": "Propafenone possesses which Vaughan-Williams classification property?",
              "options": [
                "Type Ib only",
                "Types Ic and II",
                "Type III",
                "Types Ia and IV"
              ],
              "answer": "Types Ic and II",
              "explanation": "Propafenone is a Class Ic antiarrhythmic (sodium channel blocker) with additional beta-blocking (Class II) properties."
            },
            {
              "stem": "Which drug is the MOST appropriate for terminating paroxysmal supraventricular tachycardia?",
              "options": [
                "Lidocaine",
                "Procainamide",
                "Adenosine",
                "Digoxin"
              ],
              "answer": "Adenosine",
              "explanation": "Adenosine is the drug of choice for terminating PSVT due to its rapid onset and short half-life, causing transient AV block."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "List two classes of drugs used in dyslipidemias, stating the mode of action of each.",
              "modelAnswer": "1. HMG-CoA reductase inhibitors (statins): Inhibit HMG-CoA reductase, reducing cholesterol synthesis in the liver and increasing LDL receptor expression to enhance LDL clearance.\n2. Ezetimibe: Inhibits intestinal cholesterol absorption by blocking Niemann-Pick C1-Like1 (NPC1L1) protein, reducing LDL cholesterol."
            },
            {
              "stem": "Discuss the management of hemolytic-uremic syndrome (HUS).",
              "modelAnswer": "Management of HUS involves:\n- Supportive care: Fluid and electrolyte balance, blood pressure control, and dialysis if renal failure occurs.\n- Avoidance of antibiotics (unless evidence of infection), as they may worsen toxin release in Shiga toxin-producing E. coli (STEC)-associated HUS.\n- Plasma exchange or infusion in severe cases (e.g., atypical HUS or TTP overlap).\n- Monitoring for complications (e.g., seizures, AKI)."
            },
            {
              "stem": "Briefly describe the different types of angina.",
              "modelAnswer": "1. Stable angina: Predictable chest pain on exertion, relieved by rest or nitrates; due to fixed coronary stenosis.\n2. Unstable angina: New-onset, worsening, or rest angina; high risk of MI; due to plaque rupture and thrombosis.\n3. Prinzmetal’s (variant) angina: Occurs at rest, often at night; caused by coronary artery vasospasm.\n4. Microvascular angina: Chest pain with normal coronary arteries; due to microvascular dysfunction."
            },
            {
              "stem": "Outline the management of a patient diagnosed with iron deficiency anemia.",
              "modelAnswer": "1. Identify and treat underlying cause (e.g., blood loss, malabsorption).\n2. Oral iron therapy: Ferrous sulfate 200 mg TDS (elemental iron 60 mg TDS) for 3-6 months; take on empty stomach for better absorption.\n3. Monitor Hb and reticulocyte count after 2-4 weeks; continue until Hb normalizes.\n4. Dietary advice: Increase iron-rich foods (meat, leafy greens) and vitamin C (enhances absorption).\n5. Parenteral iron (e.g., iron sucrose) if oral therapy fails or malabsorption."
            },
            {
              "stem": "Give two examples of angiotensin-converting enzyme (ACE) inhibitors; what are some adverse effects of this class of antihypertensives?",
              "modelAnswer": "Examples: Enalapril, Lisinopril.\nAdverse effects: Dry cough (due to bradykinin accumulation), hyperkalemia, acute kidney injury (especially in bilateral renal artery stenosis), angioedema, and first-dose hypotension."
            },
            {
              "stem": "a) What is the mechanism of action of digoxin in heart failure?\nb) List two adverse effects of digoxin toxicity.",
              "modelAnswer": "a) Mechanism: Inhibits Na+/K+-ATPase, increasing intracellular Ca2+ and contractility (positive inotropy); also slows AV conduction (rate control in AF).\nb) Adverse effects: Nausea/vomiting, arrhythmias (e.g., AV block, ventricular tachycardia), visual disturbances (yellow-green halos), and hyperkalemia."
            },
            {
              "stem": "a) What is the target international normalized ratio (INR) for a patient with a mechanical heart valve?\nb) List two drug interactions that can increase INR in a patient on warfarin.",
              "modelAnswer": "a) Target INR: 2.5–3.5 (higher than standard 2–3 due to higher thrombotic risk).\nb) Drug interactions: Trimethoprim-sulfamethoxazole (inhibits warfarin metabolism), amiodarone (inhibits CYP2C9), and fluconazole (CYP2C9 inhibitor)."
            },
            {
              "stem": "a) What is the primary goal of hydroxyurea therapy in sickle cell disease?\nb) List one monitoring parameter for hydroxyurea.",
              "modelAnswer": "a) Primary goal: Increase fetal hemoglobin (HbF) production, reducing sickling and hemolysis.\nb) Monitoring: Complete blood count (CBC) every 2–4 weeks initially to assess for myelosuppression (neutropenia, thrombocytopenia)."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 65-year-old man with a history of hypertension, type 2 diabetes, and coronary artery disease presents with progressive breathlessness. He reports orthopnea (needing 3 pillows to sleep) and bilateral ankle swelling. He also has early satiety and nausea. On examination, his ankles are pitting edematous, and his abdomen is slightly distended. \n\na) What is the MOST likely diagnosis? (2 marks)\nb) What investigations would you request to confirm the diagnosis? (3 marks)\nc) What factors could precipitate or exacerbate his symptoms? (5 marks)\nd) Outline a comprehensive pharmaceutical care plan for this patient. (15 marks)",
              "modelAnswer": "a) Diagnosis: Chronic heart failure with reduced ejection fraction (HFrEF), likely due to ischemic cardiomyopathy (given history of CAD) and hypertension. Orthopnea, peripheral edema, and abdominal distension suggest fluid overload.\n\nb) Investigations:\n- Echocardiogram: To assess ejection fraction, valvular function, and structural abnormalities.\n- BNP or NT-proBNP: Elevated levels support heart failure diagnosis.\n- ECG: To evaluate for ischemia, arrhythmias, or conduction abnormalities.\n- Chest X-ray: To assess for pulmonary congestion, cardiomegaly, or pleural effusions.\n- Serum electrolytes, renal function, and liver enzymes: To evaluate for comorbidities (e.g., hyponatremia, renal dysfunction) and guide diuretic therapy.\n\nc) Precipitating/exacerbating factors:\n- Non-adherence to medications (e.g., ACE inhibitors, beta blockers, diuretics).\n- Dietary indiscretion (high sodium intake leading to fluid retention).\n- Uncontrolled hypertension or ischemia (increased afterload).\n- Anemia (reduced oxygen delivery to myocardium).\n- Medication-related factors (e.g., NSAIDs causing fluid retention, corticosteroids worsening glycemic control).\n- Infections (e.g., pneumonia increasing cardiac workload).\n\nd) Pharmaceutical care plan:\n1. Optimize guideline-directed medical therapy (GDMT):\n   - ACE inhibitor (e.g., enalapril) or ARB (e.g., losartan) if ACE inhibitor intolerant: Start low, titrate to target dose (e.g., enalapril 10 mg BD), monitor BP, renal function, and potassium.\n   - Beta-blocker (e.g., bisoprolol): Start 1.25 mg OD, titrate to 10 mg OD if tolerated; monitor heart rate and BP.\n   - Mineralocorticoid receptor antagonist (e.g., spironolactone 25 mg OD): Monitor potassium and renal function (target K+ 4.5–5.5 mmol/L).\n   - Loop diuretic (e.g., furosemide 40 mg OD): Adjust dose based on weight, edema, and renal function; monitor electrolytes (especially potassium).\n\n2. Address comorbidities:\n   - Diabetes: Optimize glycemic control (e.g., metformin if eGFR >30 mL/min, SGLT2 inhibitor like empagliflozin if tolerated).\n   - Hypertension: Ensure BP <130/80 mmHg; consider adding hydralazine or isosorbide dinitrate if needed.\n\n3. Patient education:\n   - Fluid restriction (1.5–2 L/day) and low-sodium diet (<2 g/day).\n   - Daily weight monitoring; report >2 kg gain in 3 days.\n   - Medication adherence and side effect recognition (e.g., cough with ACE inhibitors, hyperkalemia with spironolactone).\n   - Signs of worsening heart failure (e.g., increased dyspnea, orthopnea, edema).\n\n4. Monitoring and follow-up:\n   - Clinic visits every 1–3 months initially, then every 6 months if stable.\n   - Labs: Renal function, electrolytes, BNP every 3–6 months.\n   - Echocardiogram annually or if clinical deterioration.\n   - Review medication list for drug interactions (e.g., NSAIDs, calcium channel blockers).\n\n5. Lifestyle modifications:\n   - Encourage regular, moderate exercise (e.g., walking) as tolerated.\n   - Smoking cessation and alcohol reduction.\n   - Vaccinations: Annual influenza and pneumococcal (if indicated).\n\n6. Advanced therapies (if refractory):\n   - Consider referral for device therapy (e.g., ICD, CRT) if LVEF <35% despite GDMT.\n   - Palliative care involvement for symptom management if advanced disease."
            },
            {
              "stem": "A 30-year-old woman presents with fatigue, pallor, and exertional dyspnea. Laboratory results show:\n- Hb: 8.5 g/dL (low)\n- MCV: 70 fL (low)\n- Serum ferritin: 8 µg/L (low)\n- Serum iron: 5 µmol/L (low)\n- TIBC: 70 µmol/L (high)\n- Transferrin saturation: 7% (low)\n\na) What is the MOST likely type of anemia? Provide a rationale. (3 marks)\nb) List four potential causes of this anemia in this patient. (4 marks)\nc) Outline a management plan for this patient, including monitoring parameters. (8 marks)",
              "modelAnswer": "a) Type of anemia: Microcytic hypochromic anemia due to iron deficiency (low MCV, low ferritin, low serum iron, high TIBC, low transferrin saturation).\n\nb) Potential causes:\n1. Chronic blood loss (e.g., menorrhagia, gastrointestinal bleeding from peptic ulcer disease or angiodysplasia).\n2. Malabsorption (e.g., celiac disease, post-gastric bypass surgery).\n3. Inadequate dietary iron intake (e.g., vegetarian/vegan diet, poor nutrition).\n4. Increased iron requirements (e.g., pregnancy, lactation).\n\nc) Management plan:\n1. Oral iron therapy:\n   - Ferrous sulfate 200 mg TDS (elemental iron 60 mg TDS) on an empty stomach for 3–6 months.\n   - Counsel on side effects (e.g., nausea, constipation) and stool darkening.\n   - Take with vitamin C (e.g., orange juice) to enhance absorption.\n\n2. Identify and treat underlying cause:\n   - For suspected GI bleeding: Refer for endoscopy/colonoscopy.\n   - For malabsorption: Consider celiac serology and duodenal biopsy.\n   - For menorrhagia: Refer to gynecology for evaluation.\n\n3. Dietary advice:\n   - Increase iron-rich foods (e.g., red meat, poultry, fish, lentils, spinach).\n   - Avoid calcium-rich foods/dairy with iron supplements (inhibits absorption).\n\n4. Monitoring:\n   - Repeat CBC and reticulocyte count after 2–4 weeks to assess response (Hb should rise by ~1 g/dL every 2 weeks).\n   - If no response after 4 weeks, consider poor adherence, malabsorption, or ongoing blood loss.\n   - Check ferritin at 3 months to ensure iron stores are replenished.\n   - If oral therapy fails or intolerance: Consider parenteral iron (e.g., iron sucrose 200 mg IV weekly).\n\n5. Follow-up:\n   - Repeat Hb and iron studies at 3 months to confirm resolution.\n   - Address underlying cause to prevent recurrence."
            }
          ]
        }
      ]
    }
  },
  "exam-cns": {
    "1": {
      "title": "Central Nervous System Disorders",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 24-year-old male presents with 3 days of elevated mood, decreased need for sleep, racing thoughts, and reckless spending. He has no history of psychiatric illness. Which of the following is the most likely diagnosis?",
              "options": [
                "Generalized anxiety disorder",
                "Bipolar I disorder, manic episode",
                "Schizophrenia",
                "Major depressive disorder with psychotic features"
              ],
              "answer": "Bipolar I disorder, manic episode",
              "explanation": "The constellation of elevated mood, decreased sleep, racing thoughts, and impulsive behavior is characteristic of a manic episode, which is diagnostic of bipolar I disorder."
            },
            {
              "stem": "Which of the following antibiotics is most likely to cause a disulfiram-like reaction when consumed with alcohol?",
              "options": [
                "Ciprofloxacin",
                "Metronidazole",
                "Amoxicillin",
                "Doxycycline"
              ],
              "answer": "Metronidazole",
              "explanation": "Metronidazole inhibits aldehyde dehydrogenase, leading to accumulation of acetaldehyde and causing a disulfiram-like reaction when alcohol is consumed."
            },
            {
              "stem": "A 30-year-old male with a history of heroin use disorder is admitted for detoxification. Which of the following medications is most appropriate for managing opioid withdrawal symptoms?",
              "options": [
                "Buprenorphine",
                "Meperidine",
                "Methadone",
                "Fentanyl"
              ],
              "answer": "Methadone",
              "explanation": "Methadone is a long-acting opioid agonist used for opioid replacement therapy in opioid use disorder, reducing withdrawal symptoms and cravings."
            },
            {
              "stem": "A 10-year-old child presents with episodes of staring blankly into space for 5-10 seconds, during which she is unresponsive to verbal commands. EEG shows 3 Hz spike-and-wave discharges. Which of the following is the drug of choice for this condition?",
              "options": [
                "Phenytoin",
                "Ethosuximide",
                "Carbamazepine",
                "Valproate"
              ],
              "answer": "Ethosuximide",
              "explanation": "Ethosuximide is the first-line treatment for absence seizures, characterized by staring spells and 3 Hz spike-and-wave discharges on EEG."
            },
            {
              "stem": "A 25-year-old male is brought to the emergency department after a motor vehicle accident with a Glasgow Coma Scale (GCS) score of 8. Which of the following is the most appropriate initial intervention to reduce intracranial pressure?",
              "options": [
                "Hyperventilation to PaCO2 25-30 mmHg",
                "Administration of mannitol 1 g/kg IV",
                "Administration of dexamethasone 10 mg IV",
                "Induction of moderate hypothermia (34-35°C)"
              ],
              "answer": "Administration of mannitol 1 g/kg IV",
              "explanation": "Mannitol is an osmotic diuretic used to reduce intracranial pressure in patients with traumatic brain injury and low GCS scores."
            },
            {
              "stem": "A 35-year-old female presents with a severe, unilateral headache associated with nausea, photophobia, and phonophobia. She reports that her mother also suffers from similar headaches. Which of the following is the most appropriate first-line acute treatment?",
              "options": [
                "Ibuprofen 400 mg orally",
                "Sumatriptan 50 mg orally",
                "Acetaminophen 1000 mg orally",
                "Propranolol 40 mg orally"
              ],
              "answer": "Sumatriptan 50 mg orally",
              "explanation": "Triptans like sumatriptan are first-line acute treatments for moderate to severe migraines, targeting serotonin receptors to relieve headache and associated symptoms."
            },
            {
              "stem": "A 45-year-old male with a history of chronic alcohol use disorder presents with confusion, ataxia, and ophthalmoplegia. Which of the following is the most likely diagnosis?",
              "options": [
                "Hepatic encephalopathy",
                "Wernicke encephalopathy",
                "Alcohol withdrawal delirium",
                "Methanol toxicity"
              ],
              "answer": "Wernicke encephalopathy",
              "explanation": "Wernicke encephalopathy is caused by thiamine (vitamin B1) deficiency, commonly seen in chronic alcohol use disorder, and presents with confusion, ataxia, and ophthalmoplegia."
            },
            {
              "stem": "Which of the following symptoms is considered a positive symptom of schizophrenia?",
              "options": [
                "Avolition",
                "Anhedonia",
                "Hallucinations",
                "Blunted affect"
              ],
              "answer": "Hallucinations",
              "explanation": "Positive symptoms of schizophrenia include hallucinations, delusions, and disorganized speech, while negative symptoms include avolition, anhedonia, and blunted affect."
            },
            {
              "stem": "A 40-year-old male with a history of alcohol dependence presents with tremors, anxiety, and insomnia after abruptly stopping alcohol. Which of the following is the most appropriate initial treatment?",
              "options": [
                "Disulfiram",
                "Naltrexone",
                "Lorazepam",
                "Acamprosate"
              ],
              "answer": "Lorazepam",
              "explanation": "Benzodiazepines like lorazepam are first-line treatments for alcohol withdrawal to prevent seizures and reduce symptoms of withdrawal."
            },
            {
              "stem": "A 30-year-old female with schizophrenia is started on olanzapine. Which of the following adverse effects is most commonly associated with olanzapine?",
              "options": [
                "Extrapyramidal symptoms",
                "Hyperprolactinemia",
                "Weight gain",
                "Tardive dyskinesia"
              ],
              "answer": "Weight gain",
              "explanation": "Olanzapine is an atypical antipsychotic associated with significant weight gain and metabolic syndrome, requiring regular monitoring of weight and metabolic parameters."
            },
            {
              "stem": "A 28-year-old female presents with a 6-month history of excessive worry, muscle tension, and fatigue. She reports difficulty concentrating and irritability. Which of the following is the most likely diagnosis?",
              "options": [
                "Panic disorder",
                "Generalized anxiety disorder",
                "Post-traumatic stress disorder",
                "Major depressive disorder"
              ],
              "answer": "Generalized anxiety disorder",
              "explanation": "Generalized anxiety disorder is characterized by excessive worry, muscle tension, and fatigue lasting for at least 6 months, with associated symptoms of irritability and difficulty concentrating."
            },
            {
              "stem": "A 50-year-old male with a history of epilepsy presents with a tonic-clonic seizure lasting 8 minutes. Which of the following is the most appropriate initial treatment?",
              "options": [
                "Oral carbamazepine",
                "Intravenous lorazepam",
                "Intramuscular phenytoin",
                "Rectal diazepam"
              ],
              "answer": "Intravenous lorazepam",
              "explanation": "Intravenous lorazepam is the first-line treatment for status epilepticus, a seizure lasting longer than 5 minutes or recurrent seizures without recovery."
            },
            {
              "stem": "A 60-year-old male with Parkinson's disease is started on levodopa-carbidopa. Which of the following adverse effects is most commonly associated with levodopa therapy?",
              "options": [
                "Hypotension",
                "Dyskinesia",
                "Bradycardia",
                "Hyperprolactinemia"
              ],
              "answer": "Dyskinesia",
              "explanation": "Levodopa therapy is associated with motor fluctuations and dyskinesia, which are common adverse effects due to the pulsatile stimulation of dopamine receptors."
            },
            {
              "stem": "A 25-year-old female presents with a 3-month history of recurrent, severe headaches. She reports that the headaches are unilateral, throbbing, and associated with nausea and photophobia. Which of the following is the most likely diagnosis?",
              "options": [
                "Tension-type headache",
                "Cluster headache",
                "Migraine headache",
                "Sinus headache"
              ],
              "answer": "Migraine headache",
              "explanation": "Migraine headaches are characterized by unilateral, throbbing pain associated with nausea, photophobia, and phonophobia, often lasting 4-72 hours."
            },
            {
              "stem": "A 35-year-old male with a history of schizophrenia presents with rigidity, bradykinesia, and tremor. He is currently taking haloperidol. Which of the following is the most likely cause of his symptoms?",
              "options": [
                "Neuroleptic malignant syndrome",
                "Parkinsonism due to antipsychotic medication",
                "Tardive dyskinesia",
                "Serotonin syndrome"
              ],
              "answer": "Parkinsonism due to antipsychotic medication",
              "explanation": "Extrapyramidal symptoms such as rigidity, bradykinesia, and tremor are common adverse effects of typical antipsychotics like haloperidol."
            },
            {
              "stem": "A 40-year-old female with bipolar disorder is started on lithium. Which of the following laboratory tests should be monitored regularly?",
              "options": [
                "Serum potassium",
                "Serum lithium levels",
                "Serum magnesium",
                "Serum calcium"
              ],
              "answer": "Serum lithium levels",
              "explanation": "Serum lithium levels must be monitored regularly to ensure therapeutic levels (0.6-1.2 mEq/L) and prevent toxicity, which can cause neurological and renal complications."
            },
            {
              "stem": "A 20-year-old male presents with a 2-week history of depressed mood, anhedonia, and fatigue. He reports difficulty sleeping and concentrating. Which of the following is the most appropriate initial treatment?",
              "options": [
                "Bupropion",
                "Fluoxetine",
                "Lorazepam",
                "Quetiapine"
              ],
              "answer": "Fluoxetine",
              "explanation": "Fluoxetine is a selective serotonin reuptake inhibitor (SSRI) and is a first-line treatment for major depressive disorder in adults."
            },
            {
              "stem": "A 55-year-old male with a history of alcohol dependence presents with confusion, ataxia, and nystagmus. Which of the following is the most appropriate immediate treatment?",
              "options": [
                "Intravenous thiamine",
                "Intravenous glucose",
                "Intravenous naloxone",
                "Intravenous diazepam"
              ],
              "answer": "Intravenous thiamine",
              "explanation": "Intravenous thiamine is the immediate treatment for Wernicke encephalopathy, a medical emergency caused by thiamine deficiency in alcohol use disorder."
            },
            {
              "stem": "A 30-year-old female with schizophrenia presents with auditory hallucinations and delusions. Which of the following is the most appropriate first-line antipsychotic medication?",
              "options": [
                "Clozapine",
                "Risperidone",
                "Haloperidol",
                "Quetiapine"
              ],
              "answer": "Risperidone",
              "explanation": "Risperidone is an atypical antipsychotic and is often used as a first-line treatment for schizophrenia due to its efficacy and lower risk of extrapyramidal symptoms compared to typical antipsychotics."
            },
            {
              "stem": "A 45-year-old male with a history of epilepsy presents with a seizure. His current medications include phenytoin. Which of the following adverse effects is most commonly associated with phenytoin?",
              "options": [
                "Gingival hyperplasia",
                "Hyperprolactinemia",
                "Weight gain",
                "Tardive dyskinesia"
              ],
              "answer": "Gingival hyperplasia",
              "explanation": "Gingival hyperplasia is a common adverse effect of phenytoin, particularly in patients with poor oral hygiene, due to its effects on collagen metabolism."
            },
            {
              "stem": "A 25-year-old female presents with a 3-month history of panic attacks, characterized by sudden episodes of intense fear, palpitations, and shortness of breath. Which of the following is the most appropriate initial treatment?",
              "options": [
                "Propranolol",
                "Alprazolam",
                "Fluoxetine",
                "Diazepam"
              ],
              "answer": "Fluoxetine",
              "explanation": "Selective serotonin reuptake inhibitors (SSRIs) like fluoxetine are first-line treatments for panic disorder, reducing the frequency and severity of panic attacks."
            },
            {
              "stem": "A 60-year-old male with Parkinson's disease presents with orthostatic hypotension. Which of the following medications is most likely responsible?",
              "options": [
                "Levodopa-carbidopa",
                "Selegiline",
                "Ropinirole",
                "Entacapone"
              ],
              "answer": "Levodopa-carbidopa",
              "explanation": "Levodopa-carbidopa can cause orthostatic hypotension, particularly in elderly patients, due to its effects on dopamine and norepinephrine pathways."
            },
            {
              "stem": "A 35-year-old female with a history of migraine presents with a severe headache. She reports that her usual triptan is no longer effective. Which of the following is the most appropriate next step?",
              "options": [
                "Increase the dose of the triptan",
                "Switch to a different triptan",
                "Add ibuprofen to the triptan",
                "Start prophylactic therapy with propranolol"
              ],
              "answer": "Switch to a different triptan",
              "explanation": "If a patient experiences inadequate response to one triptan, switching to a different triptan with a different receptor profile may improve efficacy."
            },
            {
              "stem": "A 40-year-old male with schizophrenia presents with weight gain and hyperglycemia after starting olanzapine. Which of the following is the most appropriate management strategy?",
              "options": [
                "Discontinue olanzapine immediately",
                "Switch to aripiprazole",
                "Add metformin",
                "Increase olanzapine dose"
              ],
              "answer": "Switch to aripiprazole",
              "explanation": "Switching to an antipsychotic with a lower risk of metabolic adverse effects, such as aripiprazole, is a reasonable strategy to manage weight gain and hyperglycemia."
            },
            {
              "stem": "A 50-year-old female with bipolar disorder is started on valproate. Which of the following adverse effects is most commonly associated with valproate?",
              "options": [
                "Nephrotoxicity",
                "Hepatotoxicity",
                "Optic neuritis",
                "Tardive dyskinesia"
              ],
              "answer": "Hepatotoxicity",
              "explanation": "Valproate can cause hepatotoxicity, particularly in children and patients with mitochondrial disorders, requiring regular monitoring of liver function tests."
            },
            {
              "stem": "A 25-year-old male presents with a 2-week history of depressed mood, anhedonia, and suicidal ideation. Which of the following is the most appropriate initial treatment?",
              "options": [
                "Sertraline",
                "Lorazepam",
                "Quetiapine",
                "Mirtazapine"
              ],
              "answer": "Sertraline",
              "explanation": "Sertraline is an SSRI and is a first-line treatment for major depressive disorder, including cases with suicidal ideation, due to its efficacy and safety profile."
            },
            {
              "stem": "A 45-year-old male with a history of alcohol dependence presents with tremors, anxiety, and hallucinations after stopping alcohol abruptly. Which of the following is the most likely diagnosis?",
              "options": [
                "Alcohol withdrawal delirium",
                "Wernicke encephalopathy",
                "Hepatic encephalopathy",
                "Methanol toxicity"
              ],
              "answer": "Alcohol withdrawal delirium",
              "explanation": "Alcohol withdrawal delirium (delirium tremens) is characterized by tremors, anxiety, hallucinations, and autonomic hyperactivity, typically occurring 48-72 hours after alcohol cessation."
            },
            {
              "stem": "A 30-year-old female with schizophrenia presents with tardive dyskinesia after long-term antipsychotic use. Which of the following is the most appropriate management strategy?",
              "options": [
                "Increase the dose of the antipsychotic",
                "Switch to clozapine",
                "Add benztropine",
                "Discontinue the antipsychotic immediately"
              ],
              "answer": "Switch to clozapine",
              "explanation": "Clozapine is an atypical antipsychotic with a lower risk of tardive dyskinesia and may be used in patients who develop this adverse effect with other antipsychotics."
            },
            {
              "stem": "A 55-year-old male with Parkinson's disease presents with freezing of gait. Which of the following medications is most likely responsible?",
              "options": [
                "Levodopa-carbidopa",
                "Selegiline",
                "Ropinirole",
                "Entacapone"
              ],
              "answer": "Levodopa-carbidopa",
              "explanation": "Levodopa-carbidopa can cause motor fluctuations, including freezing of gait, particularly in advanced Parkinson's disease due to the wearing-off effect."
            },
            {
              "stem": "A 25-year-old female presents with a 3-month history of recurrent, severe headaches. She reports that the headaches are bilateral, pressing, and not associated with nausea or photophobia. Which of the following is the most likely diagnosis?",
              "options": [
                "Tension-type headache",
                "Cluster headache",
                "Migraine headache",
                "Sinus headache"
              ],
              "answer": "Tension-type headache",
              "explanation": "Tension-type headaches are characterized by bilateral, pressing pain, not associated with nausea, photophobia, or phonophobia, and typically last 30 minutes to 7 days."
            },
            {
              "stem": "A 40-year-old male with a history of epilepsy presents with a seizure. His current medications include carbamazepine. Which of the following adverse effects is most commonly associated with carbamazepine?",
              "options": [
                "Hyponatremia",
                "Hyperprolactinemia",
                "Weight gain",
                "Tardive dyskinesia"
              ],
              "answer": "Hyponatremia",
              "explanation": "Carbamazepine can cause hyponatremia due to its effects on the renal tubules, leading to syndrome of inappropriate antidiuretic hormone secretion (SIADH)."
            },
            {
              "stem": "A 35-year-old female with bipolar disorder is started on lithium. Which of the following is a common early adverse effect of lithium?",
              "options": [
                "Tremor",
                "Hypothyroidism",
                "Nephrotoxicity",
                "Hypercalcemia"
              ],
              "answer": "Tremor",
              "explanation": "Tremor is a common early adverse effect of lithium, often dose-related, and may improve with dose reduction or time."
            },
            {
              "stem": "A 50-year-old male with Parkinson's disease presents with hallucinations after starting pramipexole. Which of the following is the most appropriate management strategy?",
              "options": [
                "Increase the dose of pramipexole",
                "Add quetiapine",
                "Discontinue pramipexole immediately",
                "Switch to levodopa-carbidopa"
              ],
              "answer": "Add quetiapine",
              "explanation": "Quetiapine is an atypical antipsychotic that can be used to manage hallucinations in Parkinson's disease without exacerbating motor symptoms."
            },
            {
              "stem": "A 25-year-old female presents with a 2-week history of depressed mood, anhedonia, and fatigue. She reports difficulty sleeping and concentrating. Which of the following is the most appropriate initial treatment?",
              "options": [
                "Bupropion",
                "Fluoxetine",
                "Lorazepam",
                "Quetiapine"
              ],
              "answer": "Fluoxetine",
              "explanation": "Fluoxetine is an SSRI and is a first-line treatment for major depressive disorder in adults, with a favorable side effect profile."
            },
            {
              "stem": "A 45-year-old male with a history of alcohol dependence presents with confusion, ataxia, and nystagmus. Which of the following is the most appropriate immediate treatment?",
              "options": [
                "Intravenous thiamine",
                "Intravenous glucose",
                "Intravenous naloxone",
                "Intravenous diazepam"
              ],
              "answer": "Intravenous thiamine",
              "explanation": "Intravenous thiamine is the immediate treatment for Wernicke encephalopathy, a medical emergency caused by thiamine deficiency in alcohol use disorder."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "a) List four non-motor symptoms of Parkinson’s disease. (4 marks)\n\nb) For each symptom, provide one pharmacological approach to manage it. (4 marks)",
              "modelAnswer": "a) Non-motor symptoms of Parkinson’s disease include:\n1. Cognitive impairment (e.g., dementia)\n2. Mood disorders (e.g., depression, anxiety)\n3. Sleep disturbances (e.g., REM sleep behavior disorder, insomnia)\n4. Autonomic dysfunction (e.g., constipation, orthostatic hypotension)\n\nb) Pharmacological management approaches:\n1. Cognitive impairment: Rivastigmine (cholinesterase inhibitor)\n2. Depression: Sertraline (SSRI) or mirtazapine (NaSSA)\n3. Sleep disturbances: Melatonin or clonazepam (for REM sleep behavior disorder)\n4. Orthostatic hypotension: Midodrine (alpha-1 agonist) or fludrocortisone (mineralocorticoid)"
            },
            {
              "stem": "a) Compare tension-type headaches and migraine headaches in terms of pain characteristics. (2 marks)\n\nb) Compare their associated symptoms. (2 marks)\n\nc) Compare their triggers. (1 mark)",
              "modelAnswer": "a) Pain characteristics:\n- Tension-type headache: Bilateral, pressing/tightening quality, mild to moderate intensity.\n- Migraine headache: Unilateral (often), throbbing/pulsating quality, moderate to severe intensity.\n\nb) Associated symptoms:\n- Tension-type headache: No nausea, photophobia, or phonophobia; no aura.\n- Migraine headache: Nausea and/or vomiting, photophobia, phonophobia; may have aura (e.g., visual disturbances).\n\nc) Triggers:\n- Tension-type headache: Stress, poor posture, eye strain.\n- Migraine headache: Stress, hormonal changes, certain foods (e.g., aged cheese, chocolate), sleep disturbances, bright lights."
            },
            {
              "stem": "a) Describe four strategies used in the management of raised intracranial pressure (ICP) associated with traumatic brain injury (TBI). (4 marks)\n\nb) For each strategy, provide one example of a pharmacological agent or intervention. (4 marks)",
              "modelAnswer": "a) Strategies for managing raised ICP in TBI:\n1. Osmotic therapy\n2. Hyperventilation (temporarily)\n3. Sedation and analgesia\n4. Surgical intervention (e.g., decompressive craniectomy)\n\nb) Examples of pharmacological agents or interventions:\n1. Osmotic therapy: Mannitol 20% IV or hypertonic saline (3% NaCl)\n2. Hyperventilation: Mechanical ventilation to maintain PaCO2 30-35 mmHg (temporarily)\n3. Sedation and analgesia: Propofol (sedation) + fentanyl (analgesia)\n4. Surgical intervention: Decompressive craniectomy to relieve pressure"
            },
            {
              "stem": "a) List four modifiable risk factors for ischemic stroke. (4 marks)\n\nb) For each risk factor, provide one pharmacological or lifestyle intervention to address it. (4 marks)",
              "modelAnswer": "a) Modifiable risk factors for ischemic stroke:\n1. Hypertension\n2. Hyperlipidemia\n3. Diabetes mellitus\n4. Atrial fibrillation\n\nb) Interventions:\n1. Hypertension: Antihypertensive therapy (e.g., ACE inhibitor, thiazide diuretic)\n2. Hyperlipidemia: Statin therapy (e.g., atorvastatin)\n3. Diabetes mellitus: Metformin or insulin therapy; lifestyle modifications (diet, exercise)\n4. Atrial fibrillation: Anticoagulation therapy (e.g., warfarin, DOACs)"
            },
            {
              "stem": "a) Identify four acute effects of marijuana use. (4 marks)\n\nb) For each effect, describe one potential clinical consequence. (4 marks)",
              "modelAnswer": "a) Acute effects of marijuana use:\n1. Euphoria or relaxation\n2. Altered perception (e.g., time distortion, visual/auditory changes)\n3. Impaired motor coordination\n4. Increased heart rate (tachycardia)\n\nb) Clinical consequences:\n1. Euphoria/relaxation: May lead to impaired judgment and risky behaviors.\n2. Altered perception: Can cause accidents (e.g., motor vehicle collisions) or hallucinations in high doses.\n3. Impaired motor coordination: Increases risk of falls or injuries.\n4. Tachycardia: May exacerbate underlying cardiovascular conditions (e.g., angina, arrhythmias)."
            },
            {
              "stem": "a) List four symptoms of opioid withdrawal. (4 marks)\n\nb) For each symptom, provide one pharmacological approach to manage it. (4 marks)",
              "modelAnswer": "a) Symptoms of opioid withdrawal:\n1. Nausea and vomiting\n2. Diarrhea\n3. Muscle aches and cramps\n4. Anxiety and insomnia\n\nb) Pharmacological management approaches:\n1. Nausea and vomiting: Ondansetron (5-HT3 antagonist)\n2. Diarrhea: Loperamide (opioid receptor agonist)\n3. Muscle aches and cramps: Ibuprofen (NSAID) or acetaminophen\n4. Anxiety and insomnia: Clonidine (alpha-2 agonist) or trazodone (sedating antidepressant)"
            },
            {
              "stem": "a) Describe four positive symptoms of schizophrenia. (4 marks)\n\nb) For each symptom, provide one example of a pharmacological treatment. (4 marks)",
              "modelAnswer": "a) Positive symptoms of schizophrenia:\n1. Hallucinations (e.g., auditory, visual)\n2. Delusions (e.g., paranoid, grandiose)\n3. Disorganized speech (e.g., incoherence, tangentiality)\n4. Disorganized or catatonic behavior\n\nb) Pharmacological treatments:\n1. Hallucinations: Risperidone (atypical antipsychotic)\n2. Delusions: Olanzapine (atypical antipsychotic)\n3. Disorganized speech: Haloperidol (typical antipsychotic)\n4. Disorganized/catatonic behavior: Aripiprazole (atypical antipsychotic)"
            },
            {
              "stem": "a) List four adverse effects associated with long-term use of typical antipsychotics. (4 marks)\n\nb) For each adverse effect, describe one monitoring strategy. (4 marks)",
              "modelAnswer": "a) Adverse effects of long-term typical antipsychotic use:\n1. Extrapyramidal symptoms (EPS)\n2. Tardive dyskinesia\n3. Hyperprolactinemia\n4. Neuroleptic malignant syndrome (NMS)\n\nb) Monitoring strategies:\n1. EPS: Regular assessment using the Abnormal Involuntary Movement Scale (AIMS)\n2. Tardive dyskinesia: AIMS screening every 6-12 months\n3. Hyperprolactinemia: Monitor prolactin levels and assess for symptoms (e.g., galactorrhea, sexual dysfunction)\n4. NMS: Monitor temperature, muscle rigidity, and creatine kinase (CK) levels; assess for autonomic instability."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 30-year-old female, Ms. K, presents to the emergency department with a generalized tonic-clonic seizure lasting 25 minutes. She has a history of epilepsy since age 15, poorly controlled on multiple antiepileptic drugs. Her current medications include carbamazepine 600 mg twice daily and valproate 500 mg twice daily. She is 8 weeks pregnant.\n\na) Outline the acute management of Ms. K’s status epilepticus. (6 marks)\n\nb) Discuss four principles of chronic management of Ms. K’s epilepsy, considering her pregnancy. (4 marks)\n\nc) Identify two potential risks to the fetus associated with antiepileptic drug use during pregnancy. (2 marks)\n\nd) Describe one strategy to minimize these risks. (3 marks)",
              "modelAnswer": "a) Acute management of status epilepticus:\n1. **Airway, Breathing, Circulation (ABCs):** Ensure patent airway, provide oxygen, and monitor vital signs.\n2. **Benzodiazepines:** Administer IV lorazepam 4 mg (0.1 mg/kg) over 2 minutes; may repeat once if seizure persists.\n3. **Second-line antiepileptic:** If seizure persists, administer IV fosphenytoin 20 mg PE/kg (max 1500 mg PE) or IV valproate 40 mg/kg (max 3000 mg).\n4. **Continuous monitoring:** Assess seizure activity, vital signs, and oxygen saturation.\n5. **Intubation and ventilation:** If seizure persists despite benzodiazepines and second-line therapy, consider intubation for airway protection.\n6. **Refractory status epilepticus:** If seizure persists >30 minutes, consider IV midazolam or propofol infusion for refractory status epilepticus.\n\nb) Principles of chronic management during pregnancy:\n1. **Monotherapy:** Optimize monotherapy with the lowest effective dose of an antiepileptic drug (AED) to minimize fetal exposure.\n2. **Avoid teratogenic AEDs:** Discontinue valproate (highest teratogenic risk) and switch to a safer alternative (e.g., lamotrigine or levetiracetam).\n3. **Folate supplementation:** Prescribe folic acid 5 mg daily to reduce the risk of neural tube defects.\n4. **Regular monitoring:** Monitor AED levels, seizure frequency, and fetal growth; adjust therapy as needed.\n\nc) Potential risks to the fetus:\n1. **Teratogenicity:** Increased risk of congenital malformations (e.g., neural tube defects, cardiac anomalies).\n2. **Neurodevelopmental outcomes:** Potential long-term effects on cognitive and behavioral development.\n\nd) Strategy to minimize risks:\n- **Preconception counseling:** Optimize AED therapy prior to conception to reduce fetal exposure during organogenesis.\n- **Switch to safer AEDs:** Replace high-risk AEDs (e.g., valproate) with lower-risk alternatives (e.g., lamotrigine, levetiracetam).\n- **Folate supplementation:** Prescribe folic acid 5 mg daily starting at least 3 months before conception to reduce neural tube defect risk."
            },
            {
              "stem": "Mr. L, a 65-year-old male, presents to the emergency department with a 15-minute episode of slurred speech and left facial droop. His symptoms resolved spontaneously, and his neurological examination is now normal. His medical history includes hypertension, type 2 diabetes mellitus, and hyperlipidemia. He smokes 1 pack of cigarettes daily and drinks 2-3 beers nightly. His medications include metformin 1000 mg twice daily, atorvastatin 40 mg daily, and lisinopril 10 mg daily.\n\na) List five pieces of data from Mr. L’s history that are consistent with a transient ischemic attack (TIA). (5 marks)\n\nb) Identify the initial and long-term goals in treating Mr. L. (3 marks)\n\nc) Describe six strategies to modify Mr. L’s risk factors and prevent further TIA or stroke. (6 marks)\n\nd) Outline the role of antiplatelet therapy in secondary stroke prevention for Mr. L. (1 mark)",
              "modelAnswer": "a) Data consistent with TIA:\n1. **Focal neurological symptoms:** Slurred speech and left facial droop (consistent with left hemispheric involvement).\n2. **Transient nature:** Symptoms lasted 15 minutes and resolved spontaneously.\n3. **Vascular risk factors:** Hypertension, type 2 diabetes mellitus, hyperlipidemia, and smoking.\n4. **Alcohol use:** Chronic alcohol consumption (2-3 beers nightly) may contribute to hypertension and coagulopathy.\n5. **Medication non-adherence:** Possible suboptimal control of hypertension and diabetes (e.g., elevated HbA1C).\n\nb) Goals in treating Mr. L:\n- **Initial goal:** Prevent further TIA or stroke by initiating secondary prevention measures.\n- **Long-term goal:** Reduce the risk of recurrent stroke and improve overall cardiovascular health.\n\nc) Strategies to modify risk factors:\n1. **Smoking cessation:** Provide counseling and pharmacotherapy (e.g., nicotine replacement therapy, varenicline).\n2. **Alcohol reduction:** Counsel on limiting alcohol intake to reduce blood pressure and stroke risk.\n3. **Blood pressure control:** Optimize antihypertensive therapy (e.g., increase lisinopril dose or add a thiazide diuretic).\n4. **Glycemic control:** Adjust metformin dose or add another antidiabetic agent (e.g., SGLT2 inhibitor, GLP-1 agonist) to achieve HbA1C <7%.\n5. **Lipid management:** Optimize statin therapy (e.g., increase atorvastatin dose or switch to high-intensity statin) to achieve LDL <70 mg/dL.\n6. **Antiplatelet therapy:** Initiate low-dose aspirin (81 mg daily) or clopidogrel (75 mg daily) for secondary stroke prevention.\n\n\nd) Role of antiplatelet therapy:\n- **Secondary stroke prevention:** Antiplatelet therapy (e.g., aspirin, clopidogrel) reduces the risk of recurrent stroke by preventing platelet aggregation and thrombus formation in atherosclerotic plaques."
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Central Nervous System Disorders",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 28-year-old male presents with 3 days of insomnia, pressured speech, and grandiose delusions about inventing a new energy source. He has no prior psychiatric history. Which of the following is the MOST likely diagnosis?",
              "options": [
                "Schizophrenia",
                "Major depressive disorder with psychotic features",
                "Bipolar I disorder, manic episode",
                "Schizoaffective disorder"
              ],
              "answer": "Bipolar I disorder, manic episode",
              "explanation": "The triad of insomnia, pressured speech, and grandiose delusions is classic for a manic episode, which defines bipolar I disorder."
            },
            {
              "stem": "A patient with a history of alcohol use disorder is prescribed metronidazole for a dental infection. Which of the following adverse effects is MOST likely to occur if the patient consumes alcohol?",
              "options": [
                "Hypotension and bradycardia",
                "Disulfiram-like reaction with flushing and tachycardia",
                "Neuroleptic malignant syndrome",
                "Serotonin syndrome"
              ],
              "answer": "Disulfiram-like reaction with flushing and tachycardia",
              "explanation": "Metronidazole inhibits aldehyde dehydrogenase, leading to a disulfiram-like reaction when alcohol is consumed."
            },
            {
              "stem": "Which opioid derivative is MOST associated with the highest risk of physical dependence and abuse potential?",
              "options": [
                "Meperidine",
                "Methadone",
                "Heroin",
                "Diphenoxylate"
              ],
              "answer": "Heroin",
              "explanation": "Heroin is a Schedule I controlled substance with rapid CNS penetration and high abuse liability, leading to severe dependence."
            },
            {
              "stem": "A 12-year-old child presents with staring spells lasting 5-10 seconds, during which he is unresponsive and has subtle lip-smacking movements. EEG shows 3 Hz spike-and-wave discharges. Which antiepileptic drug is FIRST-LINE therapy?",
              "options": [
                "Phenytoin",
                "Ethosuximide",
                "Carbamazepine",
                "Valproate"
              ],
              "answer": "Ethosuximide",
              "explanation": "Ethosuximide is the drug of choice for absence seizures, characterized by 3 Hz spike-and-wave discharges on EEG."
            },
            {
              "stem": "Following a traumatic brain injury (TBI), secondary neuronal injury is MOST directly triggered by which pathophysiologic event?",
              "options": [
                "Systemic hypotension",
                "Cerebral edema",
                "Central nervous system ischemia",
                "Increased intracranial pressure"
              ],
              "answer": "Central nervous system ischemia",
              "explanation": "Secondary neuronal injury in TBI is primarily driven by ischemia due to reduced cerebral perfusion pressure and mitochondrial dysfunction."
            },
            {
              "stem": "A 35-year-old male with severe TBI (GCS 7) develops signs of increased intracranial pressure (ICP). Which of the following is the MOST appropriate FIRST-LINE therapy to reduce ICP?",
              "options": [
                "Aggressive hyperventilation (PaCO2 25-30 mm Hg)",
                "Mannitol 0.25-1 g/kg IV",
                "Methylprednisolone 30 mg/kg IV",
                "Hypertonic saline 3% infusion"
              ],
              "answer": "Mannitol 0.25-1 g/kg IV",
              "explanation": "Mannitol is an osmotic diuretic used first-line to reduce ICP in severe TBI by drawing water from the brain parenchyma."
            },
            {
              "stem": "A patient with a Glasgow Coma Scale (GCS) score of 8 after a motor vehicle accident is classified as having which severity of head injury?",
              "options": [
                "Mild",
                "Moderate",
                "Severe",
                "Critical"
              ],
              "answer": "Severe",
              "explanation": "GCS scores of 3-8 are classified as severe head injury, indicating coma or profound neurological impairment."
            },
            {
              "stem": "Which of the following is MOST characteristic of the clinical presentation of a migraine headache?",
              "options": [
                "Bilateral, dull, pressure-like pain",
                "Unilateral, throbbing pain with photophobia and phonophobia",
                "Sudden onset of severe pain with fever",
                "Pain that worsens with movement and resolves within minutes"
              ],
              "answer": "Unilateral, throbbing pain with photophobia and phonophobia",
              "explanation": "Migraine headaches are typically unilateral, throbbing, and associated with photophobia, phonophobia, and nausea."
            },
            {
              "stem": "Wernicke encephalopathy is caused by a deficiency of which vitamin?",
              "options": [
                "Riboflavin (B2)",
                "Thiamine (B1)",
                "Pyridoxine (B6)",
                "Cobalamin (B12)"
              ],
              "answer": "Thiamine (B1)",
              "explanation": "Wernicke encephalopathy results from acute thiamine (vitamin B1) deficiency, commonly seen in alcohol use disorder."
            },
            {
              "stem": "Which of the following is NOT a positive symptom of schizophrenia?",
              "options": [
                "Hallucinations",
                "Delusions",
                "Disorganized behavior",
                "Lack of volition"
              ],
              "answer": "Lack of volition",
              "explanation": "Lack of volition (avolition) is a negative symptom, while hallucinations, delusions, and disorganized behavior are positive symptoms."
            },
            {
              "stem": "A patient with chronic alcohol use disorder presents with tremors, diaphoresis, and hallucinations 48 hours after his last drink. Which class of medications is FIRST-LINE for managing alcohol withdrawal?",
              "options": [
                "Barbiturates",
                "Benzodiazepines",
                "Antipsychotics",
                "Anticonvulsants"
              ],
              "answer": "Benzodiazepines",
              "explanation": "Benzodiazepines (e.g., diazepam, chlordiazepoxide) are first-line for alcohol withdrawal due to their efficacy in preventing seizures and delirium tremens."
            },
            {
              "stem": "Schizophrenia is typically diagnosed during which life stage?",
              "options": [
                "Infancy",
                "Childhood",
                "Early adulthood",
                "Old age"
              ],
              "answer": "Early adulthood",
              "explanation": "Schizophrenia most commonly presents in late adolescence to early adulthood (ages 16-30)."
            },
            {
              "stem": "A patient reports seeing 'shadows moving in the corner of the room' but acknowledges they are not real. This symptom is BEST described as a(n):",
              "options": [
                "Delusion",
                "Hallucination",
                "Illusion",
                "Negative symptom"
              ],
              "answer": "Hallucination",
              "explanation": "Hallucinations involve perceiving something that is not present, while illusions are misinterpretations of real stimuli."
            },
            {
              "stem": "Which of the following antipsychotics is MOST likely to cause significant weight gain and metabolic syndrome?",
              "options": [
                "Haloperidol",
                "Risperidone",
                "Aripiprazole",
                "Ziprasidone"
              ],
              "answer": "Risperidone",
              "explanation": "Risperidone, an atypical antipsychotic, is associated with significant weight gain, hyperlipidemia, and insulin resistance."
            },
            {
              "stem": "A 60-year-old male with Parkinson’s disease is started on levodopa-carbidopa. Which of the following adverse effects is MOST likely to occur?",
              "options": [
                "Hypotension",
                "Hyperprolactinemia",
                "Gingival hyperplasia",
                "Neuroleptic malignant syndrome"
              ],
              "answer": "Hypotension",
              "explanation": "Levodopa-carbidopa commonly causes orthostatic hypotension due to peripheral dopamine effects."
            },
            {
              "stem": "Which of the following is a MODIFIABLE risk factor for ischemic stroke?",
              "options": [
                "Age",
                "Family history of stroke",
                "Atrial fibrillation",
                "Male sex"
              ],
              "answer": "Atrial fibrillation",
              "explanation": "Atrial fibrillation is a modifiable risk factor for ischemic stroke, as anticoagulation can reduce thromboembolic risk."
            },
            {
              "stem": "A patient with a history of opioid dependence is prescribed methadone for maintenance therapy. Which of the following is the PRIMARY mechanism of action of methadone?",
              "options": [
                "Mu-opioid receptor antagonist",
                "Mu-opioid receptor partial agonist",
                "Mu-opioid receptor full agonist",
                "Dopamine receptor antagonist"
              ],
              "answer": "Mu-opioid receptor full agonist",
              "explanation": "Methadone is a full mu-opioid receptor agonist used for opioid maintenance therapy due to its long half-life and reduced euphoric effects."
            },
            {
              "stem": "Which of the following is the MOST effective abortive therapy for cluster headache?",
              "options": [
                "Acetaminophen",
                "Sumatriptan subcutaneous injection",
                "Ibuprofen",
                "Oxygen inhalation"
              ],
              "answer": "Sumatriptan subcutaneous injection",
              "explanation": "Sumatriptan 6 mg SC is the most effective abortive therapy for cluster headache, providing rapid relief in 70-80% of patients."
            },
            {
              "stem": "A patient with schizophrenia presents with akathisia and parkinsonism after starting an antipsychotic. Which of the following medications is MOST likely responsible?",
              "options": [
                "Clozapine",
                "Olanzapine",
                "Haloperidol",
                "Aripiprazole"
              ],
              "answer": "Haloperidol",
              "explanation": "Haloperidol, a typical antipsychotic, is strongly associated with extrapyramidal symptoms (akathisia, parkinsonism) due to D2 receptor blockade."
            },
            {
              "stem": "Which of the following is a FIRST-LINE therapy for acute migraine in a patient without contraindications?",
              "options": [
                "Acetaminophen/aspirin/caffeine",
                "Oxycodone/acetaminophen",
                "Ergotamine tartrate",
                "Propranolol"
              ],
              "answer": "Acetaminophen/aspirin/caffeine",
              "explanation": "Acetaminophen/aspirin/caffeine is a first-line abortive therapy for mild-to-moderate migraines, with caffeine enhancing absorption and efficacy."
            },
            {
              "stem": "A 45-year-old female with bipolar disorder presents with acute mania and psychosis. Which combination therapy is MOST appropriate for initial stabilization?",
              "options": [
                "Lithium + valproate",
                "Lithium + risperidone",
                "Carbamazepine + lamotrigine",
                "Quetiapine + clonazepam"
              ],
              "answer": "Lithium + risperidone",
              "explanation": "Combining a mood stabilizer (lithium) with an antipsychotic (risperidone) is standard for acute mania with psychotic features."
            },
            {
              "stem": "Which of the following is a COMMON adverse effect of sodium valproate?",
              "options": [
                "Hyperthyroidism",
                "Neural tube defects",
                "Hair loss",
                "Tardive dyskinesia"
              ],
              "answer": "Hair loss",
              "explanation": "Transient hair loss is a common adverse effect of sodium valproate, along with weight gain and thrombocytopenia."
            },
            {
              "stem": "A patient with epilepsy is started on phenytoin. Which of the following is the TARGET therapeutic serum concentration for seizure control?",
              "options": [
                "5-10 mcg/mL",
                "10-20 mcg/mL",
                "20-30 mcg/mL",
                "30-40 mcg/mL"
              ],
              "answer": "10-20 mcg/mL",
              "explanation": "The therapeutic range for phenytoin is 10-20 mcg/mL; levels above 20 mcg/mL increase toxicity risk without added benefit."
            },
            {
              "stem": "Which of the following is a NON-MOTOR symptom of Parkinson’s disease?",
              "options": [
                "Resting tremor",
                "Bradykinesia",
                "Postural instability",
                "Anosmia"
              ],
              "answer": "Anosmia",
              "explanation": "Anosmia (loss of smell) is a non-motor symptom of Parkinson’s disease, often preceding motor symptoms by years."
            },
            {
              "stem": "A patient with alcohol use disorder is admitted for detoxification. Which vitamin should be administered IMMEDIATELY to prevent Wernicke encephalopathy?",
              "options": [
                "Vitamin B12",
                "Folic acid",
                "Thiamine",
                "Vitamin K"
              ],
              "answer": "Thiamine",
              "explanation": "Thiamine (vitamin B1) must be administered parenterally immediately in alcohol withdrawal to prevent or treat Wernicke encephalopathy."
            },
            {
              "stem": "Which of the following is a FIRST-LINE therapy for status epilepticus?",
              "options": [
                "Lorazepam IV",
                "Phenytoin IV",
                "Levetiracetam IV",
                "Phenobarbital IV"
              ],
              "answer": "Lorazepam IV",
              "explanation": "IV lorazepam (0.1 mg/kg) is first-line for status epilepticus due to rapid onset and efficacy in terminating seizures."
            },
            {
              "stem": "A 30-year-old male presents with sudden-onset severe headache, nausea, and photophobia. CT scan shows no hemorrhage. Which of the following is the MOST likely diagnosis?",
              "options": [
                "Subarachnoid hemorrhage",
                "Migraine headache",
                "Cluster headache",
                "Tension-type headache"
              ],
              "answer": "Migraine headache",
              "explanation": "The triad of severe headache, nausea, and photophobia is classic for migraine, especially in the absence of hemorrhage on CT."
            },
            {
              "stem": "Which of the following antipsychotics has the LOWEST risk of causing extrapyramidal symptoms (EPS)?",
              "options": [
                "Haloperidol",
                "Risperidone",
                "Olanzapine",
                "Aripiprazole"
              ],
              "answer": "Olanzapine",
              "explanation": "Olanzapine, an atypical antipsychotic, has a lower risk of EPS compared to typical antipsychotics like haloperidol."
            },
            {
              "stem": "A patient with schizophrenia is started on clozapine. Which of the following is the MOST serious adverse effect requiring MONTHLY monitoring?",
              "options": [
                "Weight gain",
                "Sedation",
                "Agranulocytosis",
                "Hyperprolactinemia"
              ],
              "answer": "Agranulocytosis",
              "explanation": "Clozapine carries a black-box warning for agranulocytosis, requiring weekly CBC monitoring for the first 6 months, then monthly."
            },
            {
              "stem": "Which of the following is a CONTRAINDICATION to the use of sumatriptan for migraine?",
              "options": [
                "History of hypertension",
                "Use of SSRIs",
                "Ischemic heart disease",
                "Age > 65 years"
              ],
              "answer": "Ischemic heart disease",
              "explanation": "Sumatriptan is contraindicated in patients with ischemic heart disease due to its vasoconstrictive effects, which can precipitate angina or MI."
            },
            {
              "stem": "A 25-year-old female with bipolar disorder is planning a pregnancy. Which mood stabilizer is CONTRAINDICATED due to high teratogenic risk?",
              "options": [
                "Lithium",
                "Valproate",
                "Lamotrigine",
                "Quetiapine"
              ],
              "answer": "Valproate",
              "explanation": "Valproate is contraindicated in pregnancy due to a 10% risk of neural tube defects and other congenital anomalies."
            },
            {
              "stem": "Which of the following is a FIRST-LINE therapy for acute alcohol withdrawal in a patient with hepatic impairment?",
              "options": [
                "Diazepam",
                "Lorazepam",
                "Chlordiazepoxide",
                "Oxazepam"
              ],
              "answer": "Lorazepam",
              "explanation": "Lorazepam is preferred in hepatic impairment due to its lack of active metabolites and shorter half-life."
            },
            {
              "stem": "A patient with schizophrenia presents with tardive dyskinesia after long-term antipsychotic use. Which of the following is the MOST appropriate management step?",
              "options": [
                "Increase antipsychotic dose",
                "Switch to clozapine",
                "Add benztropine",
                "Discontinue antipsychotic abruptly"
              ],
              "answer": "Switch to clozapine",
              "explanation": "Switching to clozapine is recommended for tardive dyskinesia, as it has the lowest risk of exacerbating movement disorders."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "a) List FOUR non-motor symptoms of Parkinson’s disease. (2 marks)\nb) For each symptom, briefly describe its clinical impact on the patient. (2 marks)",
              "modelAnswer": "a) Non-motor symptoms of Parkinson’s disease include:\n   1. Anosmia (loss of smell)\n   2. Constipation\n   3. REM sleep behavior disorder\n   4. Depression/anxiety\n\nb) Clinical impact:\n   1. Anosmia reduces quality of life and may precede motor symptoms by years.\n   2. Constipation causes discomfort and may lead to fecal impaction or bowel obstruction.\n   3. REM sleep behavior disorder leads to violent dream-enactment behaviors, risking injury to self or partner.\n   4. Depression/anxiety worsens functional outcomes and increases suicide risk."
            },
            {
              "stem": "Compare and contrast tension-type headache and migraine headache using FOUR distinct criteria. (4 marks)",
              "modelAnswer": "1. **Pain characteristics**: Tension-type headache is bilateral, dull, and pressure-like, while migraine is typically unilateral, throbbing, and severe.\n2. **Associated symptoms**: Migraine is associated with photophobia, phonophobia, nausea, and vomiting, whereas tension-type headache lacks these features.\n3. **Duration**: Tension-type headache lasts 30 minutes to 7 days, while migraine lasts 4-72 hours if untreated.\n4. **Triggers**: Migraine is often triggered by stress, hormonal changes, or specific foods, while tension-type headache is linked to muscle tension, stress, or poor posture."
            },
            {
              "stem": "Outline FOUR strategies used in the management of raised intracranial pressure (ICP) associated with traumatic brain injury (TBI). (4 marks)",
              "modelAnswer": "1. **Osmotic therapy**: Mannitol 0.25-1 g/kg IV or hypertonic saline (3%) to reduce brain water content.\n2. **Hyperventilation**: Temporary reduction in PaCO2 to 30-35 mm Hg to induce cerebral vasoconstriction (used cautiously to avoid ischemia).\n3. **Sedation and analgesia**: Propofol or midazolam to reduce metabolic demand and ICP.\n4. **Surgical intervention**: Decompressive craniectomy for refractory ICP or hematoma evacuation."
            },
            {
              "stem": "Identify FOUR modifiable risk factors for ischemic stroke and describe how each can be addressed. (4 marks)",
              "modelAnswer": "1. **Hypertension**: Treat with antihypertensives (e.g., ACE inhibitors, thiazides) to target <130/80 mm Hg.\n2. **Hyperlipidemia**: Initiate statin therapy (e.g., atorvastatin 40-80 mg) to reduce LDL <70 mg/dL.\n3. **Diabetes mellitus**: Optimize glycemic control (HbA1c <7%) with metformin or insulin.\n4. **Atrial fibrillation**: Start anticoagulation (e.g., apixaban, warfarin) to prevent cardioembolic stroke."
            },
            {
              "stem": "List FOUR acute effects of marijuana use. (2 marks)\nFor each effect, describe its clinical significance. (2 marks)",
              "modelAnswer": "1. **Euphoria and relaxation**: May impair judgment and coordination, increasing risk of accidents.\n2. **Increased heart rate**: Tachycardia can exacerbate cardiovascular conditions (e.g., angina, arrhythmias).\n3. **Dry mouth and conjunctival injection**: Benign but may cause discomfort or red eyes.\n4. **Impaired short-term memory**: Affects learning and cognitive function, particularly in adolescents."
            },
            {
              "stem": "a) What are the FOUR key components of the Glasgow Coma Scale (GCS)? (2 marks)\nb) How is a GCS score of 13 classified in terms of severity of head injury? (1 mark)\nc) Why is GCS monitoring important in TBI management? (1 mark)",
              "modelAnswer": "a) The four key components of GCS are:\n   1. Eye opening (1-4)\n   2. Verbal response (1-5)\n   3. Motor response (1-6)\n   4. Best response score (sum of the above)\n\nb) A GCS score of 13 is classified as a **mild** head injury.\n\nc) GCS monitoring is critical in TBI to assess neurological status, detect deterioration (e.g., herniation), and guide interventions (e.g., intubation, ICP management)."
            },
            {
              "stem": "a) What is the FIRST-LINE pharmacological therapy for alcohol withdrawal? (1 mark)\nb) Name TWO benzodiazepines commonly used for this indication. (1 mark)\nc) What is the rationale for using benzodiazepines in alcohol withdrawal? (2 marks)",
              "modelAnswer": "a) The first-line pharmacological therapy for alcohol withdrawal is **benzodiazepines**.\n\nb) Two commonly used benzodiazepines are:\n   1. Chlordiazepoxide\n   2. Diazepam\n\nc) Benzodiazepines are used to prevent seizures, delirium tremens, and autonomic hyperactivity by enhancing GABA-mediated inhibition in the CNS. They provide cross-tolerance to alcohol’s effects and have a wide therapeutic index."
            },
            {
              "stem": "a) What are the THREE core symptoms of schizophrenia? (1.5 marks)\nb) Provide ONE example of a positive symptom and ONE example of a negative symptom. (1 mark)\nc) Why is early intervention important in schizophrenia? (1.5 marks)",
              "modelAnswer": "a) The three core symptoms of schizophrenia are:\n   1. Delusions\n   2. Hallucinations\n   3. Disorganized speech\n\nb) Example of a positive symptom: Hallucinations (e.g., hearing voices).\n   Example of a negative symptom: Avolition (lack of motivation).\n\nc) Early intervention is critical to improve long-term outcomes, reduce relapse rates, and minimize functional decline. Antipsychotic therapy initiated early can prevent neuroprogression and improve response to treatment."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 28-year-old female, MS, presents to the emergency department with a generalized tonic-clonic seizure that has persisted for 25 minutes. She has a history of epilepsy diagnosed at age 16 but has been non-adherent to her antiepileptic medication (carbamazepine) for the past 3 months. On examination, she is post-ictal, with a GCS of 10 (E3V2M5). Her vital signs are: BP 140/90 mm Hg, HR 110 bpm, RR 22/min, SpO2 92% on room air. She has no focal neurological deficits.\n\na) Outline the ACUTE management of MS’s condition, including drug therapy and monitoring. (8 marks)\nb) Discuss FOUR principles of chronic management of MS’s epilepsy, assuming she is planning a pregnancy. (7 marks)",
              "modelAnswer": "a) **Acute management of status epilepticus:**\n   1. **Airway and breathing**: Ensure patent airway, administer oxygen, and consider intubation if GCS <8 or respiratory compromise.\n   2. **Circulation**: Monitor BP and HR; establish IV access for fluids and medications.\n   3. **Drug therapy**:\n      - **First-line**: IV lorazepam 0.1 mg/kg (max 4 mg) or IV diazepam 0.15 mg/kg (max 10 mg). Repeat once if seizure persists.\n      - **Second-line**: IV fosphenytoin 20 PE/kg (max 1500 PE) or IV valproate 40 mg/kg (max 3000 mg) if benzodiazepines fail.\n      - **Third-line**: IV phenobarbital 20 mg/kg (max 1000 mg) or IV levetiracetam 60 mg/kg (max 4500 mg) if refractory.\n   4. **Monitoring**: Continuous ECG, SpO2, BP, and temperature. Check serum electrolytes, glucose, and antiepileptic drug levels if available.\n   5. **Neurological assessment**: Repeat GCS and pupil examination every 15 minutes to detect deterioration.\n   6. **Consider EEG**: If seizure persists >30 minutes to confirm ongoing status epilepticus.\n\nb) **Chronic management principles for epilepsy in pregnancy:**\n   1. **Preconception counseling**: Optimize seizure control with the lowest effective dose of a pregnancy-compatible antiepileptic drug (e.g., lamotrigine, levetiracetam). Avoid valproate due to teratogenic risk.\n   2. **Folic acid supplementation**: Start folic acid 5 mg/day at least 3 months before conception to reduce neural tube defect risk.\n   3. **Monitoring**: Regular serum drug levels (e.g., lamotrigine) to adjust dosing, as pregnancy increases drug clearance. Monitor for seizures and adverse effects.\n   4. **Multidisciplinary care**: Involve obstetrics, neurology, and genetics to manage risks (e.g., teratogenicity, seizure frequency) and plan delivery.\n   5. **Breastfeeding**: Encourage breastfeeding if seizure-free, as most antiepileptics are compatible (e.g., lamotrigine, levetiracetam). Monitor infant for sedation or poor feeding.\n   6. **Postpartum care**: Adjust antiepileptic doses back to pre-pregnancy levels, as clearance normalizes. Provide contraception counseling (e.g., progestin-only pills, IUD) to avoid teratogenic exposure."
            },
            {
              "stem": "A 50-year-old male, JK, presents to the emergency department with a 10-minute episode of right-sided weakness and slurred speech that resolved spontaneously. He has a history of hypertension, type 2 diabetes, and hyperlipidemia. He smokes 1 pack of cigarettes daily and drinks 2-3 beers nightly. His medications include metformin 500 mg BID, amlodipine 5 mg daily, and atorvastatin 40 mg nightly. On examination, his BP is 160/95 mm Hg, and he has a carotid bruit on the left side. CT angiography shows 80% stenosis of the left internal carotid artery.\n\na) Identify FIVE risk factors for stroke in JK from the history and examination. (5 marks)\nb) Outline the INITIAL and LONG-TERM goals of therapy for JK to prevent further stroke. (5 marks)\nc) Describe SIX strategies to modify JK’s risk factors for secondary stroke prevention. (5 marks)",
              "modelAnswer": "a) **Risk factors for stroke in JK:**\n   1. **Hypertension** (BP 160/95 mm Hg)\n   2. **Type 2 diabetes mellitus** (poorly controlled)\n   3. **Hyperlipidemia** (elevated LDL despite statin therapy)\n   4. **Carotid artery stenosis** (80% left internal carotid artery)\n   5. **Smoking** (1 pack/day)\n   6. **Alcohol use** (2-3 beers nightly)\n   7. **Age** (50 years)\n\nb) **Initial and long-term goals of therapy:**\n   - **Initial goals (first 24-48 hours):**\n     1. **Prevent recurrent stroke/TIA**: Start dual antiplatelet therapy (aspirin + clopidogrel) for 21 days, then switch to monotherapy.\n     2. **Control hypertension**: Target BP <130/80 mm Hg with antihypertensives (e.g., ACE inhibitor + thiazide).\n     3. **Optimize glycemic control**: Adjust metformin or add insulin to target HbA1c <7%.\n     4. **Statin therapy**: High-intensity statin (e.g., atorvastatin 80 mg) to reduce LDL <70 mg/dL.\n     5. **Carotid revascularization**: Refer for carotid endarterectomy or stenting if symptomatic stenosis >50%.\n\n   - **Long-term goals (beyond 3 months):**\n     1. **Secondary stroke prevention**: Maintain BP <130/80 mm Hg, LDL <70 mg/dL, and HbA1c <7%.\n     2. **Antiplatelet therapy**: Continue aspirin or clopidogrel long-term.\n     3. **Lifestyle modifications**: Smoking cessation, alcohol reduction, and Mediterranean diet.\n     4. **Monitoring**: Regular follow-up for BP, lipids, glucose, and carotid Doppler.\n\nc) **Strategies to modify JK’s risk factors:**\n   1. **Smoking cessation**: Provide nicotine replacement therapy, varenicline, or bupropion; refer to cessation programs.\n   2. **Alcohol reduction**: Counsel on limiting intake to <1 drink/day; consider referral to addiction services if needed.\n   3. **Hypertension control**: Titrate amlodipine to target BP <130/80 mm Hg; add ACE inhibitor if necessary.\n   4. **Diabetes management**: Optimize metformin dose or add SGLT2 inhibitor (e.g., empagliflozin) to improve glycemic control and reduce cardiovascular risk.\n   5. **Lipid optimization**: Increase atorvastatin to 80 mg and add ezetimibe if LDL remains >70 mg/dL.\n   6. **Carotid revascularization**: Refer for carotid endarterectomy or stenting to reduce stroke risk from stenosis."
            }
          ]
        }
      ]
    },
    "3": {
      "title": "Central Nervous System Disorders",
      "variant": 3,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 28-year-old male presents with 3 days of elevated mood, decreased need for sleep, racing thoughts, and grandiose beliefs about his business acumen. He has been spending excessively and has not slept for 48 hours. Which of the following is the MOST likely diagnosis?",
              "options": [
                "Schizophrenia",
                "Bipolar I disorder, manic episode",
                "Major depressive disorder with psychotic features",
                "Cyclothymic disorder"
              ],
              "answer": "Bipolar I disorder, manic episode",
              "explanation": "The presentation of elevated mood, decreased sleep, racing thoughts, and grandiosity for 3 days is consistent with a manic episode, which is diagnostic of bipolar I disorder."
            },
            {
              "stem": "A patient with a history of alcohol dependence is prescribed metronidazole for a dental infection. Which of the following adverse effects is MOST likely to occur if the patient consumes alcohol?",
              "options": [
                "Hypertensive crisis",
                "Disulfiram-like reaction",
                "Serotonin syndrome",
                "Neuroleptic malignant syndrome"
              ],
              "answer": "Disulfiram-like reaction",
              "explanation": "Metronidazole inhibits aldehyde dehydrogenase, leading to accumulation of acetaldehyde and a disulfiram-like reaction when alcohol is consumed."
            },
            {
              "stem": "A 35-year-old male with a history of heroin use disorder is admitted for detoxification. Which of the following medications is MOST appropriate for managing opioid withdrawal symptoms?",
              "options": [
                "Buprenorphine",
                "Naltrexone",
                "Methadone",
                "Meperidine"
              ],
              "answer": "Methadone",
              "explanation": "Methadone is a long-acting opioid agonist used for opioid replacement therapy in opioid use disorder, reducing withdrawal symptoms and cravings."
            },
            {
              "stem": "A 12-year-old child presents with episodes of staring blankly into space for 5-10 seconds, during which he does not respond to verbal commands. An EEG shows 3 Hz spike-and-wave discharges. Which of the following is the MOST appropriate first-line treatment?",
              "options": [
                "Phenytoin",
                "Ethosuximide",
                "Carbamazepine",
                "Valproate"
              ],
              "answer": "Ethosuximide",
              "explanation": "Ethosuximide is the drug of choice for absence seizures, characterized by staring spells and 3 Hz spike-and-wave discharges on EEG."
            },
            {
              "stem": "A 45-year-old male is brought to the emergency department after a motor vehicle accident with a Glasgow Coma Scale (GCS) score of 8. Which of the following is the MOST likely pathophysiologic event triggering secondary neuronal injury?",
              "options": [
                "Systemic hypotension",
                "Cerebral edema",
                "Increased intracranial pressure",
                "Central nervous system ischemia"
              ],
              "answer": "Central nervous system ischemia",
              "explanation": "Secondary neuronal injury following traumatic brain injury is primarily driven by cerebral ischemia due to reduced cerebral perfusion pressure."
            },
            {
              "stem": "A 50-year-old female with severe traumatic brain injury (GCS 7) develops signs of raised intracranial pressure. Which of the following is the MOST appropriate first-line therapy to reduce ICP?",
              "options": [
                "Hyperventilation to PaCO2 25-30 mmHg",
                "Mannitol 0.25-1 g/kg IV",
                "Methylprednisolone 30 mg/kg IV",
                "Furosemide 40 mg IV"
              ],
              "answer": "Mannitol 0.25-1 g/kg IV",
              "explanation": "Mannitol is an osmotic diuretic used to reduce intracranial pressure in patients with severe traumatic brain injury."
            },
            {
              "stem": "A 22-year-old female presents with a unilateral throbbing headache associated with nausea, photophobia, and phonophobia. She reports that these headaches are preceded by visual disturbances. Which of the following is the MOST likely diagnosis?",
              "options": [
                "Tension-type headache",
                "Cluster headache",
                "Migraine with aura",
                "Sinus headache"
              ],
              "answer": "Migraine with aura",
              "explanation": "The presence of unilateral throbbing headache with nausea, photophobia, phonophobia, and visual aura is characteristic of migraine with aura."
            },
            {
              "stem": "A 40-year-old male with chronic alcohol dependence presents with confusion, ataxia, and ophthalmoplegia. Which of the following is the MOST appropriate immediate treatment?",
              "options": [
                "Lorazepam",
                "Thiamine",
                "Folic acid",
                "Diazepam"
              ],
              "answer": "Thiamine",
              "explanation": "Wernicke encephalopathy is caused by thiamine deficiency and requires immediate parenteral thiamine administration to prevent irreversible neurological damage."
            },
            {
              "stem": "A 30-year-old male with schizophrenia presents with hallucinations, delusions, and disorganized speech. Which of the following symptoms is considered a NEGATIVE symptom of schizophrenia?",
              "options": [
                "Hallucinations",
                "Delusions",
                "Disorganized behavior",
                "Avolition"
              ],
              "answer": "Avolition",
              "explanation": "Negative symptoms of schizophrenia include avolition (lack of motivation), alogia (poverty of speech), and affective flattening."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol dependence presents with tremors, agitation, and hallucinations 48 hours after his last drink. Which of the following is the MOST appropriate first-line therapy?",
              "options": [
                "Disulfiram",
                "Acamprosate",
                "Lorazepam",
                "Naltrexone"
              ],
              "answer": "Lorazepam",
              "explanation": "Benzodiazepines such as lorazepam are the first-line treatment for alcohol withdrawal to prevent seizures and delirium tremens."
            },
            {
              "stem": "A 25-year-old female with schizophrenia is started on risperidone. Which of the following adverse effects is MOST commonly associated with risperidone?",
              "options": [
                "Hyperprolactinemia",
                "QT prolongation",
                "Neuroleptic malignant syndrome",
                "Agranulocytosis"
              ],
              "answer": "Hyperprolactinemia",
              "explanation": "Risperidone, an atypical antipsychotic, commonly causes hyperprolactinemia due to dopamine D2 receptor blockade in the pituitary gland."
            },
            {
              "stem": "A 60-year-old male with Parkinson’s disease is started on levodopa-carbidopa. Which of the following adverse effects is MOST likely to occur with long-term levodopa therapy?",
              "options": [
                "Hypotension",
                "Dyskinesias",
                "Bradykinesia",
                "Constipation"
              ],
              "answer": "Dyskinesias",
              "explanation": "Long-term levodopa therapy is associated with the development of motor fluctuations and dyskinesias, which can significantly impact quality of life."
            },
            {
              "stem": "A 35-year-old female with bipolar disorder is prescribed valproate. Which of the following is a MANDATORY monitoring parameter for this patient?",
              "options": [
                "Serum potassium levels",
                "Liver function tests",
                "Thyroid function tests",
                "Serum sodium levels"
              ],
              "answer": "Liver function tests",
              "explanation": "Valproate can cause hepatotoxicity, so liver function tests (LFTs) should be monitored regularly, especially during the first 6 months of therapy."
            },
            {
              "stem": "A 40-year-old male with a history of seizures is prescribed phenytoin. Which of the following is a key monitoring parameter for phenytoin therapy?",
              "options": [
                "Serum phenytoin levels (target 10-20 mcg/mL)",
                "Serum potassium levels",
                "Serum magnesium levels",
                "Serum calcium levels"
              ],
              "answer": "Serum phenytoin levels (target 10-20 mcg/mL)",
              "explanation": "Phenytoin has a narrow therapeutic index, and serum levels should be monitored to ensure efficacy and avoid toxicity."
            },
            {
              "stem": "A 28-year-old female with generalized anxiety disorder is prescribed sertraline. Which of the following adverse effects is MOST commonly reported with sertraline?",
              "options": [
                "Dry mouth",
                "Constipation",
                "Diarrhea",
                "Urinary retention"
              ],
              "answer": "Diarrhea",
              "explanation": "Sertraline, an SSRI, commonly causes gastrointestinal adverse effects such as diarrhea, nausea, and vomiting."
            },
            {
              "stem": "A 55-year-old male with a history of hypertension and diabetes presents with sudden onset of right-sided weakness and slurred speech that resolves within 20 minutes. Which of the following is the MOST likely diagnosis?",
              "options": [
                "Ischemic stroke",
                "Hemorrhagic stroke",
                "Transient ischemic attack (TIA)",
                "Migraine with aura"
              ],
              "answer": "Transient ischemic attack (TIA)",
              "explanation": "A transient ischemic attack (TIA) is characterized by focal neurological deficits that resolve within 24 hours, most commonly within 20 minutes."
            },
            {
              "stem": "A 30-year-old male with a history of opioid dependence is started on buprenorphine for maintenance therapy. Which of the following is the MOST appropriate counseling point for this patient?",
              "options": [
                "Buprenorphine can be taken with alcohol without risk.",
                "Buprenorphine should be taken on an empty stomach.",
                "Buprenorphine may cause respiratory depression if combined with benzodiazepines.",
                "Buprenorphine should be discontinued abruptly if side effects occur."
              ],
              "answer": "Buprenorphine may cause respiratory depression if combined with benzodiazepines.",
              "explanation": "Buprenorphine is a partial opioid agonist that can cause respiratory depression, especially when combined with other CNS depressants such as benzodiazepines."
            },
            {
              "stem": "A 45-year-old female with schizophrenia is started on clozapine due to treatment-resistant symptoms. Which of the following is a MANDATORY monitoring parameter for clozapine therapy?",
              "options": [
                "Serum clozapine levels",
                "White blood cell count (WBC)",
                "Liver function tests",
                "Serum potassium levels"
              ],
              "answer": "White blood cell count (WBC)",
              "explanation": "Clozapine can cause agranulocytosis, so weekly WBC monitoring is mandatory during the first 6 months of therapy."
            },
            {
              "stem": "A 22-year-old female with a history of migraine headaches is prescribed sumatriptan. Which of the following is a contraindication to the use of sumatriptan?",
              "options": [
                "Hypertension",
                "Pregnancy",
                "History of stroke",
                "All of the above"
              ],
              "answer": "All of the above",
              "explanation": "Sumatriptan is contraindicated in patients with uncontrolled hypertension, pregnancy, and a history of stroke or transient ischemic attack due to the risk of vasoconstriction."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol dependence presents with confusion, ataxia, and nystagmus. Which of the following is the MOST likely diagnosis?",
              "options": [
                "Alcohol withdrawal",
                "Wernicke encephalopathy",
                "Hepatic encephalopathy",
                "Delirium tremens"
              ],
              "answer": "Wernicke encephalopathy",
              "explanation": "Wernicke encephalopathy is characterized by confusion, ataxia, and ophthalmoplegia (nystagmus) due to thiamine deficiency in alcohol-dependent patients."
            },
            {
              "stem": "A 35-year-old female with bipolar disorder is prescribed lithium. Which of the following is a key monitoring parameter for lithium therapy?",
              "options": [
                "Serum lithium levels (target 0.6-1.2 mEq/L)",
                "Serum potassium levels",
                "Serum magnesium levels",
                "Serum calcium levels"
              ],
              "answer": "Serum lithium levels (target 0.6-1.2 mEq/L)",
              "explanation": "Lithium has a narrow therapeutic index, and serum levels should be monitored to ensure efficacy and avoid toxicity."
            },
            {
              "stem": "A 40-year-old male with schizophrenia presents with parkinsonism after starting haloperidol. Which of the following is the MOST appropriate management strategy?",
              "options": [
                "Increase the dose of haloperidol",
                "Switch to an atypical antipsychotic such as risperidone",
                "Add benztropine for extrapyramidal symptoms",
                "Discontinue haloperidine abruptly"
              ],
              "answer": "Add benztropine for extrapyramidal symptoms",
              "explanation": "Benztropine, an anticholinergic, is used to treat extrapyramidal symptoms caused by typical antipsychotics such as haloperidol."
            },
            {
              "stem": "A 28-year-old female with a history of seizures is prescribed levetiracetam. Which of the following is a key advantage of levetiracetam over phenytoin?",
              "options": [
                "Less risk of teratogenicity",
                "No need for serum level monitoring",
                "Better efficacy for absence seizures",
                "Lower risk of weight gain"
              ],
              "answer": "No need for serum level monitoring",
              "explanation": "Levetiracetam does not require routine serum level monitoring, unlike phenytoin, which has a narrow therapeutic index."
            },
            {
              "stem": "A 55-year-old male with a history of alcohol dependence presents with tremors, diaphoresis, and hallucinations 72 hours after his last drink. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Disulfiram",
                "Acamprosate",
                "Lorazepam",
                "Naltrexone"
              ],
              "answer": "Lorazepam",
              "explanation": "Benzodiazepines such as lorazepam are the first-line treatment for alcohol withdrawal to prevent seizures and delirium tremens."
            },
            {
              "stem": "A 30-year-old female with schizophrenia is started on olanzapine. Which of the following adverse effects is MOST commonly associated with olanzapine?",
              "options": [
                "Hyperprolactinemia",
                "QT prolongation",
                "Weight gain",
                "Agranulocytosis"
              ],
              "answer": "Weight gain",
              "explanation": "Olanzapine, an atypical antipsychotic, is associated with significant weight gain and metabolic adverse effects."
            },
            {
              "stem": "A 45-year-old male with a history of seizures is prescribed carbamazepine. Which of the following is a key monitoring parameter for carbamazepine therapy?",
              "options": [
                "Serum sodium levels",
                "Serum potassium levels",
                "Serum magnesium levels",
                "Serum calcium levels"
              ],
              "answer": "Serum sodium levels",
              "explanation": "Carbamazepine can cause hyponatremia due to its antidiuretic effect, so serum sodium levels should be monitored."
            },
            {
              "stem": "A 22-year-old female with a history of opioid dependence is started on methadone maintenance therapy. Which of the following is a key counseling point for this patient?",
              "options": [
                "Methadone can be taken with alcohol without risk.",
                "Methadone should be taken on an empty stomach.",
                "Methadone may cause respiratory depression if combined with benzodiazepines.",
                "Methadone should be discontinued abruptly if side effects occur."
              ],
              "answer": "Methadone may cause respiratory depression if combined with benzodiazepines.",
              "explanation": "Methadone is a long-acting opioid agonist that can cause respiratory depression, especially when combined with other CNS depressants such as benzodiazepines."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol dependence presents with confusion, ataxia, and nystagmus. Which of the following is the MOST appropriate immediate treatment?",
              "options": [
                "Lorazepam",
                "Thiamine",
                "Folic acid",
                "Diazepam"
              ],
              "answer": "Thiamine",
              "explanation": "Wernicke encephalopathy is caused by thiamine deficiency and requires immediate parenteral thiamine administration to prevent irreversible neurological damage."
            },
            {
              "stem": "A 35-year-old female with bipolar disorder is prescribed valproate. Which of the following is a key contraindication to the use of valproate?",
              "options": [
                "Pregnancy",
                "Hypertension",
                "Diabetes",
                "Obesity"
              ],
              "answer": "Pregnancy",
              "explanation": "Valproate is contraindicated in pregnancy due to the risk of neural tube defects and other congenital abnormalities."
            },
            {
              "stem": "A 40-year-old male with schizophrenia presents with tardive dyskinesia after long-term haloperidol therapy. Which of the following is the MOST appropriate management strategy?",
              "options": [
                "Increase the dose of haloperidol",
                "Switch to an atypical antipsychotic such as clozapine",
                "Add benztropine for extrapyramidal symptoms",
                "Discontinue haloperidol abruptly"
              ],
              "answer": "Switch to an atypical antipsychotic such as clozapine",
              "explanation": "Switching to an atypical antipsychotic with a lower risk of tardive dyskinesia, such as clozapine, is the most appropriate management strategy."
            },
            {
              "stem": "A 28-year-old female with a history of seizures is prescribed phenobarbital. Which of the following is a key adverse effect of phenobarbital therapy?",
              "options": [
                "Hyperactivity",
                "Sedation",
                "Weight loss",
                "Hypertension"
              ],
              "answer": "Sedation",
              "explanation": "Phenobarbital, a barbiturate, commonly causes sedation and cognitive impairment due to its CNS depressant effects."
            },
            {
              "stem": "A 55-year-old male with a history of alcohol dependence presents with tremors, agitation, and hallucinations 48 hours after his last drink. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Disulfiram",
                "Acamprosate",
                "Lorazepam",
                "Naltrexone"
              ],
              "answer": "Lorazepam",
              "explanation": "Benzodiazepines such as lorazepam are the first-line treatment for alcohol withdrawal to prevent seizures and delirium tremens."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "a) List four (4) non-motor symptoms of Parkinson’s disease. (4 marks)\n\nb) Explain the rationale for using levodopa-carbidopa combination therapy in Parkinson’s disease. (1 mark)",
              "modelAnswer": "a) Four non-motor symptoms of Parkinson’s disease:\n1. Autonomic dysfunction (e.g., orthostatic hypotension, constipation, urinary incontinence)\n2. Sleep disturbances (e.g., REM sleep behavior disorder, insomnia)\n3. Cognitive impairment (e.g., dementia, executive dysfunction)\n4. Mood disorders (e.g., depression, anxiety)\n\nb) The rationale for using levodopa-carbidopa combination therapy:\n- Carbidopa inhibits peripheral dopa decarboxylase, reducing the peripheral conversion of levodopa to dopamine, which increases the amount of levodopa available to cross the blood-brain barrier and reduces peripheral adverse effects such as nausea and vomiting."
            },
            {
              "stem": "a) Compare and contrast tension-type headaches and migraine headaches in terms of clinical presentation. (4 marks)\n\nb) Provide one (1) example of a first-line acute treatment for each headache type. (1 mark)",
              "modelAnswer": "a) Comparison of tension-type headaches and migraine headaches:\n1. Pain characteristics: Tension-type headaches are typically bilateral, pressing/tightening in quality, and mild to moderate in intensity. Migraine headaches are usually unilateral, throbbing in quality, and moderate to severe in intensity.\n2. Associated symptoms: Tension-type headaches are not typically associated with nausea, photophobia, or phonophobia. Migraine headaches are often associated with nausea, photophobia, and phonophobia.\n3. Duration: Tension-type headaches can last from 30 minutes to 7 days. Migraine headaches typically last 4-72 hours if untreated.\n4. Triggers: Tension-type headaches are often triggered by stress, poor posture, or muscle tension. Migraine headaches are triggered by factors such as hormonal changes, certain foods, stress, and sleep disturbances.\n\nb) First-line acute treatments:\n- Tension-type headache: Ibuprofen or acetaminophen\n- Migraine headache: Sumatriptan or ibuprofen"
            },
            {
              "stem": "a) Describe four (4) strategies used in the management of raised intracranial pressure (ICP) associated with traumatic brain injury (TBI). (4 marks)\n\nb) Briefly explain the rationale for using mannitol in the management of raised ICP. (1 mark)",
              "modelAnswer": "a) Four strategies for managing raised ICP in TBI:\n1. Head elevation to 30 degrees to improve venous drainage and reduce ICP.\n2. Hyperosmolar therapy (e.g., mannitol or hypertonic saline) to draw water from the brain parenchyma into the vascular space, reducing ICP.\n3. Hyperventilation to maintain PaCO2 at 30-35 mmHg, causing cerebral vasoconstriction and reducing ICP.\n4. Surgical intervention (e.g., decompressive craniectomy) to relieve pressure in cases of refractory ICP.\n\nb) Rationale for mannitol:\n- Mannitol is an osmotic diuretic that increases plasma osmolality, drawing water from the brain parenchyma into the vascular space, thereby reducing ICP."
            },
            {
              "stem": "a) Identify four (4) modifiable risk factors for ischemic stroke. (4 marks)\n\nb) Provide one (1) example of a non-modifiable risk factor for ischemic stroke. (1 mark)",
              "modelAnswer": "a) Four modifiable risk factors for ischemic stroke:\n1. Hypertension\n2. Hyperlipidemia\n3. Diabetes mellitus\n4. Smoking\n\nb) One non-modifiable risk factor for ischemic stroke:\n- Age (risk increases with age)"
            },
            {
              "stem": "a) List four (4) acute effects of marijuana use. (4 marks)\n\nb) Explain the mechanism of action of marijuana’s psychoactive effects. (1 mark)",
              "modelAnswer": "a) Four acute effects of marijuana use:\n1. Euphoria or relaxation\n2. Altered perception (e.g., enhanced sensory perception, time distortion)\n3. Impaired short-term memory and cognitive function\n4. Increased appetite (\"the munchies\")\n\nb) Mechanism of action:\n- Marijuana’s psychoactive effects are primarily mediated by delta-9-tetrahydrocannabinol (THC), which acts as a partial agonist at cannabinoid receptors (CB1 and CB2), leading to increased dopamine release in the brain's reward pathways."
            },
            {
              "stem": "a) Describe four (4) key differences between typical and atypical antipsychotics. (4 marks)\n\nb) Provide one (1) example of a typical antipsychotic and one (1) example of an atypical antipsychotic. (1 mark)",
              "modelAnswer": "a) Four key differences between typical and atypical antipsychotics:\n1. Receptor profile: Typical antipsychotics primarily block dopamine D2 receptors, while atypical antipsychotics have a broader receptor profile, including serotonin 5-HT2A receptor antagonism.\n2. Adverse effects: Typical antipsychotics are more likely to cause extrapyramidal symptoms (EPS), while atypical antipsychotics are more likely to cause metabolic adverse effects (e.g., weight gain, diabetes).\n3. Efficacy: Atypical antipsychotics are generally more effective for negative symptoms of schizophrenia and have a lower risk of tardive dyskinesia.\n4. Tolerability: Atypical antipsychotics are generally better tolerated due to a lower risk of EPS.\n\nb) Examples:\n- Typical antipsychotic: Haloperidol\n- Atypical antipsychotic: Risperidone"
            },
            {
              "stem": "a) List four (4) key features of Wernicke encephalopathy. (4 marks)\n\nb) Explain the rationale for using thiamine in the management of Wernicke encephalopathy. (1 mark)",
              "modelAnswer": "a) Four key features of Wernicke encephalopathy:\n1. Confusion\n2. Ataxia\n3. Ophthalmoplegia (e.g., nystagmus, lateral rectus palsy)\n4. Thiamine (vitamin B1) deficiency\n\nb) Rationale for thiamine:\n- Thiamine is a cofactor for several enzymes involved in carbohydrate metabolism. Deficiency leads to impaired energy production in the brain, particularly in regions such as the mammillary bodies and thalamus, which are critical for memory and coordination."
            },
            {
              "stem": "a) Describe four (4) key principles of managing alcohol withdrawal. (4 marks)\n\nb) Provide one (1) example of a benzodiazepine used in the management of alcohol withdrawal. (1 mark)",
              "modelAnswer": "a) Four key principles of managing alcohol withdrawal:\n1. Assess the severity of withdrawal using a validated tool (e.g., Clinical Institute Withdrawal Assessment for Alcohol, CIWA-Ar).\n2. Provide supportive care, including hydration, electrolyte correction, and nutritional support.\n3. Use benzodiazepines (e.g., diazepam, lorazepam) to prevent seizures and delirium tremens.\n4. Monitor for complications such as Wernicke encephalopathy and provide thiamine supplementation.\n\nb) Example of a benzodiazepine:\n- Lorazepam"
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 35-year-old female, EC, presents to the emergency department with a generalized tonic-clonic seizure that has lasted for 25 minutes without recovery to baseline neurological status. Her husband reports that she has a history of epilepsy since age 17, but her seizures have been poorly controlled despite multiple antiepileptic drugs.\n\n(a) Outline the acute management of EC’s status epilepticus, including the rationale for each step. (6 marks)\n\n(b) Describe four (4) principles of chronic management of EC’s epilepsy, assuming she is now pregnant. (4 marks)\n\n(c) Explain the rationale for avoiding valproate in pregnancy and provide one (1) alternative antiepileptic drug with a lower risk of teratogenicity. (5 marks)",
              "modelAnswer": "a) Acute management of status epilepticus:\n1. **Ensure airway, breathing, and circulation (ABCs):** Maintain oxygenation and ventilation to prevent hypoxia and acidosis. (Rationale: Prolonged seizures can lead to respiratory failure and hypoxia, exacerbating brain injury.)\n2. **Administer intravenous (IV) benzodiazepine (e.g., lorazepam 4 mg IV):** First-line therapy to terminate seizures rapidly. (Rationale: Benzodiazepines enhance GABAergic inhibition, terminating seizure activity.)\n3. **If seizures persist, administer IV fosphenytoin (20 mg PE/kg at 150 mg PE/min) or phenytoin (20 mg/kg IV):** Second-line therapy to prevent seizure recurrence. (Rationale: Phenytoin stabilizes neuronal membranes by blocking sodium channels, preventing seizure propagation.)\n4. **If seizures remain refractory, consider IV valproate (40 mg/kg loading dose) or levetiracetam (60 mg/kg loading dose):** Third-line options for refractory status epilepticus. (Rationale: Valproate enhances GABAergic activity, while levetiracetam modulates synaptic vesicle protein SV2A, reducing excitatory neurotransmission.)\n5. **Intubate and ventilate if necessary:** To protect the airway and maintain oxygenation in patients with prolonged or recurrent seizures. (Rationale: Prolonged seizures can lead to respiratory depression and aspiration risk.)\n6. **Monitor vital signs, oxygen saturation, and blood glucose:** To detect and manage complications such as hypoxia, hypotension, and hypoglycemia. (Rationale: Hypoxia and hypoglycemia can exacerbate seizure activity and brain injury.)\n\nb) Principles of chronic management of EC’s epilepsy in pregnancy:\n1. **Optimize seizure control prior to conception:** Use the lowest effective dose of an antiepileptic drug (AED) with the best safety profile in pregnancy. (Rationale: Poorly controlled epilepsy increases the risk of maternal and fetal complications, including miscarriage and stillbirth.)\n2. **Use AEDs with the lowest teratogenic risk:** Prefer lamotrigine or levetiracetam over valproate or phenytoin. (Rationale: Valproate and phenytoin are associated with higher risks of neural tube defects and other congenital abnormalities.)\n3. **Supplement with folic acid (5 mg/day):** To reduce the risk of neural tube defects. (Rationale: Folic acid supplementation is critical in women of childbearing age taking AEDs, as many AEDs interfere with folate metabolism.)\n4. **Monitor AED levels regularly:** Adjust doses as needed to maintain therapeutic levels while minimizing fetal exposure. (Rationale: Pharmacokinetic changes during pregnancy can alter AED metabolism, leading to subtherapeutic or toxic levels.)\n\nc) Rationale for avoiding valproate in pregnancy and alternative options:\n- **Rationale for avoiding valproate:** Valproate is associated with a 10-20% risk of major congenital malformations, including neural tube defects (e.g., spina bifida), craniofacial abnormalities, and neurodevelopmental disorders such as autism spectrum disorder and lower IQ. The risk is dose-dependent and highest when valproate is used in the first trimester.\n- **Alternative antiepileptic drug:** Lamotrigine is a suitable alternative with a lower risk of teratogenicity (approximately 2-4% risk of major congenital malformations) and a better safety profile in pregnancy. It is also less likely to interact with folic acid metabolism compared to valproate."
            },
            {
              "stem": "A 60-year-old male, J.S., presents to the emergency department with a 15-minute episode of right arm paralysis and slurred speech that resolved spontaneously. His medical history includes hypertension, type 2 diabetes mellitus, hyperlipidemia, and a 25-pack-year smoking history. His current medications include metformin, atorvastatin, and lisinopril. On examination, he has a carotid bruit on the left side. Doppler ultrasound reveals 90% stenosis of the left carotid artery and 40% stenosis of the right carotid artery. His blood pressure is 165/100 mmHg, HbA1c is 10%, and LDL cholesterol is 300 mg/dL.\n\n(a) Identify five (5) data points from J.S.’s history and examination that are consistent with a transient ischemic attack (TIA). (5 marks)\n\n(b) Outline the initial and long-term goals of therapy for J.S. (3 marks)\n\n(c) Describe six (6) strategies to modify J.S.’s risk factors and prevent further TIA or stroke. (6 marks)\n\n(d) Explain the rationale for using dual antiplatelet therapy (DAPT) in the management of J.S.’s TIA. (1 mark)",
              "modelAnswer": "a) Data points consistent with TIA:\n1. **Transient neurological deficit:** Right arm paralysis and slurred speech lasting 15 minutes, resolving spontaneously.\n2. **Carotid bruit:** Indicates underlying carotid artery stenosis, a common source of embolic TIA.\n3. **Hypertension:** Blood pressure of 165/100 mmHg, a major risk factor for stroke.\n4. **Diabetes mellitus:** HbA1c of 10%, indicating poor glycemic control and increased risk of vascular complications.\n5. **Hyperlipidemia:** LDL cholesterol of 300 mg/dL, contributing to atherosclerosis and increased stroke risk.\n\nb) Initial and long-term goals of therapy:\n- **Initial goals:**\n  1. Prevent immediate recurrence of TIA or progression to stroke.\n  2. Identify and treat the underlying cause (e.g., carotid artery stenosis).\n  3. Initiate secondary prevention measures to reduce long-term stroke risk.\n- **Long-term goals:**\n  1. Achieve optimal blood pressure control (target <130/80 mmHg).\n  2. Achieve optimal glycemic control (target HbA1c <7%).\n  3. Achieve optimal lipid control (target LDL <70 mg/dL).\n  4. Smoking cessation.\n  5. Lifestyle modifications (e.g., diet, exercise).\n\nc) Strategies to modify J.S.’s risk factors:\n1. **Blood pressure control:** Initiate or titrate antihypertensive therapy (e.g., lisinopril) to achieve target blood pressure <130/80 mmHg. (Rationale: Hypertension is the most important modifiable risk factor for stroke.)\n2. **Glycemic control:** Optimize diabetes management with metformin and consider adding a SGLT2 inhibitor or GLP-1 receptor agonist to achieve HbA1c <7%. (Rationale: Poor glycemic control increases the risk of microvascular and macrovascular complications.)\n3. **Lipid control:** Initiate high-intensity statin therapy (e.g., atorvastatin 80 mg/day) to achieve LDL <70 mg/dL. (Rationale: Statins reduce the risk of recurrent stroke and cardiovascular events.)\n4. **Smoking cessation:** Provide counseling and pharmacotherapy (e.g., varenicline or nicotine replacement therapy) to support smoking cessation. (Rationale: Smoking is a major risk factor for atherosclerosis and stroke.)\n5. **Antiplatelet therapy:** Initiate aspirin 81 mg/day or clopidogrel 75 mg/day for secondary stroke prevention. (Rationale: Antiplatelet therapy reduces the risk of recurrent stroke in patients with TIA or minor stroke.)\n6. **Carotid revascularization:** Refer for carotid endarterectomy or carotid artery stenting if indicated by the degree of stenosis. (Rationale: Carotid revascularization reduces the risk of recurrent stroke in patients with high-grade carotid stenosis.)\n\n\nd) Rationale for dual antiplatelet therapy (DAPT):\n- **Rationale:** DAPT (e.g., aspirin + clopidogrel) is used in the short term (e.g., 21 days) after a TIA or minor stroke to reduce the risk of early recurrence. The combination provides greater platelet inhibition than monotherapy, reducing the risk of thromboembolic events. However, long-term DAPT is not recommended due to the increased risk of bleeding."
            }
          ]
        }
      ]
    }
  },
  "exam-endo-onc-rheum": {
    "1": {
      "title": "Endocrinology, Joint & Oncology",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 68-year-old patient with newly diagnosed hypothyroidism has a history of heart failure, type 2 diabetes, and chronic kidney disease (eGFR 45 mL/min/1.73m²). Which factor most strongly supports initiating levothyroxine at a lower starting dose?",
              "options": [
                "Age",
                "Heart failure",
                "Chronic kidney disease",
                "Type 2 diabetes"
              ],
              "answer": "Chronic kidney disease",
              "explanation": "Reduced renal clearance in CKD may delay levothyroxine metabolism, increasing risk of adverse cardiac effects; lower starting doses are recommended."
            },
            {
              "stem": "A patient with hypothyroidism is prescribed levothyroxine 50 mcg daily. Which instruction is most important to ensure optimal absorption?",
              "options": [
                "Take with a high-fat breakfast to enhance dissolution",
                "Take at bedtime with a glass of milk",
                "Separate administration from iron supplements by at least 4 hours",
                "Take immediately after a meal containing grapefruit"
              ],
              "answer": "Separate administration from iron supplements by at least 4 hours",
              "explanation": "Iron reduces levothyroxine absorption; spacing doses by 4 hours minimizes interaction."
            },
            {
              "stem": "A 55-year-old male with type 2 diabetes is started on metformin 500 mg twice daily. Which parameter should be monitored most closely after initiation?",
              "options": [
                "Serum potassium",
                "Liver enzymes",
                "Serum creatinine/eGFR",
                "White blood cell count"
              ],
              "answer": "Serum creatinine/eGFR",
              "explanation": "Metformin is contraindicated in significant renal impairment due to risk of lactic acidosis; eGFR must be monitored."
            },
            {
              "stem": "A patient with type 1 diabetes on a basal-bolus insulin regimen has the following capillary glucose readings: 180 mg/dL (10.0 mmol/L) pre-breakfast, 80 mg/dL (4.4 mmol/L) at 0300 h, and 220 mg/dL (12.2 mmol/L) 2 hours post-lunch. Which adjustment is most appropriate?",
              "options": [
                "Increase morning rapid-acting insulin dose",
                "Decrease evening basal insulin dose",
                "Increase evening basal insulin dose",
                "Decrease morning basal insulin dose"
              ],
              "answer": "Increase morning rapid-acting insulin dose",
              "explanation": "Elevated postprandial glucose suggests insufficient prandial insulin; increasing rapid-acting insulin at breakfast will target this."
            },
            {
              "stem": "Which of the following is NOT a recognized risk factor for type 2 diabetes mellitus?",
              "options": [
                "First-degree relative with diabetes",
                "History of delivering a macrosomic infant (>4 kg)",
                "Chronic low-dose corticosteroid use",
                "Hypertension ≥140/90 mmHg"
              ],
              "answer": "History of delivering a macrosomic infant (>4 kg)",
              "explanation": "Macrosomia (>4 kg) is a risk factor for gestational diabetes, not type 2 diabetes; other options are established risk factors."
            },
            {
              "stem": "A 72-year-old woman with osteoarthritis uses ibuprofen 400 mg three times daily for knee pain. She has no history of peptic ulcer disease but takes aspirin 81 mg daily for cardiovascular prophylaxis. Which is the most appropriate intervention?",
              "options": [
                "Switch ibuprofen to acetaminophen",
                "Add omeprazole 20 mg daily",
                "Increase ibuprofen dose to 600 mg tid",
                "Discontinue aspirin to reduce GI risk"
              ],
              "answer": "Add omeprazole 20 mg daily",
              "explanation": "Concurrent use of NSAIDs and low-dose aspirin increases GI bleeding risk; gastroprotection with a PPI is recommended."
            },
            {
              "stem": "A 65-year-old male with chronic kidney disease (eGFR 30 mL/min/1.73m²) presents with acute gout. Naproxen 500 mg twice daily is prescribed. Which is the most appropriate clinical concern?",
              "options": [
                "Naproxen is less effective than indomethacin for acute gout",
                "Naproxen may worsen renal function",
                "Naproxen interacts with allopurinol",
                "Naproxen causes photosensitivity"
              ],
              "answer": "Naproxen may worsen renal function",
              "explanation": "NSAIDs are nephrotoxic and contraindicated in moderate-to-severe CKD due to risk of acute kidney injury."
            },
            {
              "stem": "Following resolution of an acute gout attack, allopurinol is initiated. Which patient education point is most critical?",
              "options": [
                "Limit fluid intake to prevent overhydration",
                "Take medication on an empty stomach to enhance absorption",
                "Report any rash or itching immediately",
                "Avoid sunlight exposure to prevent photosensitivity"
              ],
              "answer": "Report any rash or itching immediately",
              "explanation": "Allopurinol can cause severe hypersensitivity reactions, including Stevens-Johnson syndrome; prompt reporting is essential."
            },
            {
              "stem": "A community pharmacist plans a diabetes education session for newly diagnosed patients. Which topic is LEAST relevant for this group?",
              "options": [
                "Strategies to minimize cardiac risk factors",
                "Technique for mixing insulins",
                "Appropriate dietary recommendations",
                "Advanced glycation end-product pathophysiology"
              ],
              "answer": "Advanced glycation end-product pathophysiology",
              "explanation": "While important, this topic is too advanced for a foundational education session; the others are core competencies."
            },
            {
              "stem": "Which scenario warrants temporary withholding of metformin?",
              "options": [
                "Receipt of oral contrast for a CT scan",
                "Mild viral illness with fever and dehydration",
                "New diagnosis of hypertension",
                "Stable chronic obstructive pulmonary disease"
              ],
              "answer": "Receipt of oral contrast for a CT scan",
              "explanation": "IV contrast increases risk of lactic acidosis in patients on metformin; drug should be withheld 48 hours pre- and post-procedure."
            },
            {
              "stem": "A 58-year-old male with hypertension and gout asks about thiazide diuretics. Which comorbid condition makes thiazides a poor first-line choice?",
              "options": [
                "Hyperlipidemia",
                "Heart failure with reduced ejection fraction",
                "COPD",
                "Gout"
              ],
              "answer": "Heart failure with reduced ejection fraction",
              "explanation": "Thiazides are ineffective in advanced heart failure and may worsen volume depletion; loop diuretics are preferred."
            },
            {
              "stem": "A patient on a sulfonylurea reports skipping meals due to illness. Which instruction is most appropriate?",
              "options": [
                "Take the missed dose as soon as possible",
                "Skip the dose and resume normal schedule",
                "Take half the usual dose",
                "Monitor blood glucose and take a 15–20 g carbohydrate snack"
              ],
              "answer": "Monitor blood glucose and take a 15–20 g carbohydrate snack",
              "explanation": "Skipping meals increases hypoglycemia risk; patients should test glucose and consume carbohydrates if unable to eat."
            },
            {
              "stem": "Which endocrine disorder requires caution when prescribing amiodarone due to its thyroid effects?",
              "options": [
                "Hyperthyroidism",
                "Hypothyroidism",
                "Type 2 diabetes",
                "Adrenal insufficiency"
              ],
              "answer": "Hyperthyroidism",
              "explanation": "Amiodarone contains iodine and can precipitate or worsen hyperthyroidism; baseline thyroid function should be assessed."
            },
            {
              "stem": "A 52-year-old woman with type 2 diabetes has HbA1c 9.2%, AST 220 IU/L, and serum creatinine 2.1 mg/dL. Which antidiabetic agent is contraindicated?",
              "options": [
                "Insulin",
                "Metformin",
                "Pioglitazone",
                "Dulaglutide"
              ],
              "answer": "Metformin",
              "explanation": "Metformin is contraindicated in significant renal impairment (eGFR <30 mL/min/1.73m²) due to lactic acidosis risk."
            },
            {
              "stem": "A 28-year-old woman presents with heat intolerance, palpitations, and weight loss despite increased appetite. Labs confirm moderate hyperthyroidism. Which initial therapy is most appropriate?",
              "options": [
                "Propranolol 20 mg four times daily",
                "Potassium iodide 10 drops three times daily",
                "Propylthiouracil 300 mg three times daily",
                "Radioactive iodine 100 mCi"
              ],
              "answer": "Propranolol 20 mg four times daily",
              "explanation": "Beta-blockers (e.g., propranolol) rapidly control adrenergic symptoms; definitive therapy (e.g., radioiodine) follows stabilization."
            },
            {
              "stem": "A 26-year-old pregnant woman is diagnosed with Graves’ disease. Which therapy is preferred?",
              "options": [
                "Propylthiouracil 600 mg/day",
                "Radioactive iodine 5 mCi",
                "Levothyroxine 0.1 mg daily",
                "No treatment until after delivery"
              ],
              "answer": "Propylthiouracil 600 mg/day",
              "explanation": "Propylthiouracil is preferred in pregnancy due to lower placental transfer compared to methimazole; lowest effective dose should be used."
            },
            {
              "stem": "Iodides are used preoperatively in hyperthyroid patients to:",
              "options": [
                "Decrease thyroid vascularity",
                "Inhibit peripheral T4 to T3 conversion",
                "Stimulate thyroid hormone synthesis",
                "Reduce TSH secretion"
              ],
              "answer": "Decrease thyroid vascularity",
              "explanation": "Iodides reduce thyroid blood flow and gland size, making surgery safer by minimizing bleeding risk."
            },
            {
              "stem": "A 55-year-old male reports polyuria, polydipsia, and polyphagia with no dysuria or urgency. Which is the most likely diagnosis?",
              "options": [
                "Urinary tract infection",
                "Benign prostatic hyperplasia",
                "Type 2 diabetes mellitus",
                "Hypertensive nephropathy"
              ],
              "answer": "Type 2 diabetes mellitus",
              "explanation": "Polyuria, polydipsia, and polyphagia are classic symptoms of hyperglycemia; further testing (e.g., fasting glucose, HbA1c) is warranted."
            },
            {
              "stem": "Which cytotoxic agent requires preparation in a biological safety cabinet due to its vesicant and carcinogenic properties?",
              "options": [
                "Alteplase",
                "Doxorubicin",
                "Nitroglycerin",
                "Penicillin"
              ],
              "answer": "Doxorubicin",
              "explanation": "Doxorubicin is a vesicant and requires handling in a Class II biological safety cabinet to prevent exposure and contamination."
            },
            {
              "stem": "A 75-year-old patient with hypothyroidism has a history of heart failure and angina. Which parameter is most useful for monitoring levothyroxine effectiveness?",
              "options": [
                "Weight loss",
                "Improved vision",
                "Increased energy",
                "Reduced angina frequency"
              ],
              "answer": "Increased energy",
              "explanation": "Clinical improvement in hypothyroidism is best assessed by symptom relief, particularly increased energy and reduced fatigue."
            },
            {
              "stem": "Which adverse effect is most commonly associated with high-dose colchicine for acute gout?",
              "options": [
                "Psychosis",
                "Hypertension",
                "Severe diarrhea",
                "Rash"
              ],
              "answer": "Severe diarrhea",
              "explanation": "Colchicine at high doses frequently causes gastrointestinal toxicity, including severe diarrhea, limiting its use."
            },
            {
              "stem": "What is the recommended weekly dose of methotrexate for rheumatoid arthritis?",
              "options": [
                "50 mg orally daily",
                "50 mg orally once weekly",
                "7.5 mg orally daily",
                "7.5 mg orally once weekly"
              ],
              "answer": "7.5 mg orally once weekly",
              "explanation": "Low-dose weekly methotrexate is the standard regimen for RA; daily dosing increases toxicity without benefit."
            },
            {
              "stem": "Which symptom should be monitored in a patient taking hydroxychloroquine for rheumatoid arthritis?",
              "options": [
                "Increased urinary frequency",
                "Visual changes",
                "Dry mouth",
                "Drowsiness"
              ],
              "answer": "Visual changes",
              "explanation": "Hydroxychloroquine can cause irreversible retinal toxicity; regular ophthalmologic monitoring is essential."
            },
            {
              "stem": "Which virus is NOT associated with human carcinogenesis?",
              "options": [
                "Herpes simplex virus (HSV)",
                "Human papillomavirus (HPV)",
                "Hepatitis B virus (HBV)",
                "Epstein-Barr virus (EBV)"
              ],
              "answer": "Herpes simplex virus (HSV)",
              "explanation": "HSV-1 and HSV-2 are not established oncogenic viruses; HPV, HBV, and EBV are linked to specific cancers."
            },
            {
              "stem": "Which patient is at highest risk for cervical cancer?",
              "options": [
                "A 32-year-old in a monogamous relationship who declined HPV vaccination",
                "A 21-year-old with first sexual intercourse at age 14 and 10+ partners",
                "A 60-year-old with a history of syphilis and cigarette smoking",
                "None of the above"
              ],
              "answer": "A 21-year-old with first sexual intercourse at age 14 and 10+ partners",
              "explanation": "Multiple sexual partners and early sexual debut increase HPV exposure risk; HPV is the primary cause of cervical cancer."
            },
            {
              "stem": "Which agent is a hormonal therapy used in breast cancer?",
              "options": [
                "Tamoxifen citrate",
                "Ifosfamide",
                "Carmustine",
                "Methotrexate"
              ],
              "answer": "Tamoxifen citrate",
              "explanation": "Tamoxifen is a selective estrogen receptor modulator used in estrogen receptor-positive breast cancer."
            },
            {
              "stem": "The wasting syndrome associated with cancer is termed:",
              "options": [
                "Achalasia",
                "Cachexia",
                "Atelexis",
                "Cacoguesia"
              ],
              "answer": "Cachexia",
              "explanation": "Cachexia is a multifactorial syndrome characterized by weight loss, muscle atrophy, and systemic inflammation in cancer."
            },
            {
              "stem": "Which chromosomal abnormality in CML is targeted by imatinib?",
              "options": [
                "t(9;22) Philadelphia chromosome",
                "Trisomy 21",
                "t(8;14)",
                "Deletion 5q"
              ],
              "answer": "t(9;22) Philadelphia chromosome",
              "explanation": "The Philadelphia chromosome (t(9;22)) generates the BCR-ABL fusion protein, which imatinib inhibits."
            },
            {
              "stem": "A patient on ABVD regimen for Hodgkin lymphoma develops exertional dyspnea and dry cough. Chest X-ray shows pulmonary infiltrates. Which drug is most likely responsible?",
              "options": [
                "Bleomycin",
                "Dacarbazine",
                "Doxorubicin",
                "Vinblastine"
              ],
              "answer": "Bleomycin",
              "explanation": "Bleomycin is associated with pulmonary toxicity, including pneumonitis and fibrosis; ABVD includes bleomycin."
            },
            {
              "stem": "Which drug in the MOPP regimen is most likely responsible for cardiomyopathy and CHF years after treatment?",
              "options": [
                "Adriamycin (doxorubicin)",
                "Bleomycin",
                "Dacarbazine",
                "Merchlorethamine"
              ],
              "answer": "Adriamycin (doxorubicin)",
              "explanation": "Doxorubicin is cardiotoxic; cumulative dose limits are strictly observed to prevent cardiomyopathy and heart failure."
            },
            {
              "stem": "A 47-year-old woman receives high-dose methotrexate for choriocarcinoma. Which agent is used to rescue normal cells from methotrexate toxicity?",
              "options": [
                "Deferoxamine",
                "Leucovorin",
                "N-acetylcysteine",
                "Penicillamine"
              ],
              "answer": "Leucovorin",
              "explanation": "Leucovorin (folinic acid) bypasses dihydrofolate reductase inhibition, rescuing normal cells from methotrexate-induced toxicity."
            },
            {
              "stem": "Which adverse effect is most likely with vincristine therapy?",
              "options": [
                "Nephrotoxicity",
                "Neutropenia",
                "Peripheral neuropathy",
                "Pulmonary fibrosis"
              ],
              "answer": "Peripheral neuropathy",
              "explanation": "Vincristine, a vinca alkaloid, commonly causes dose-limiting peripheral sensory and motor neuropathy."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 62-year-old male with type 2 diabetes mellitus (HbA1c 8.7%) is currently treated with metformin 1000 mg twice daily and gliclazide 80 mg twice daily. He has chronic kidney disease (eGFR 45 mL/min/1.73m²) and hypertension. He reports frequent hypoglycemia and weight gain.",
              "modelAnswer": {
                "a": "Identify two treatment goals for this patient. (2 marks)\n- Achieve HbA1c target of <7.0% without hypoglycemia (individualized to <8.0% given CKD and hypoglycemia risk).\n- Prevent progression of microvascular complications (e.g., nephropathy, retinopathy) and reduce cardiovascular risk.",
                "b": "Outline a stepwise therapeutic adjustment plan for this patient, referencing guideline-aligned principles. (3 marks)\n1. Optimize current therapy: Reduce gliclazide dose or switch to a longer-acting sulfonylurea (e.g., glimepiride) with careful titration to minimize hypoglycemia.\n2. Add a sodium-glucose cotransporter-2 inhibitor (SGLT2i) if eGFR ≥45 mL/min/1.73m² (e.g., empagliflozin), given cardio-renal benefits and low hypoglycemia risk.\n3. Consider switching metformin to an alternative (e.g., DPP-4 inhibitor like linagliptin, which is renally adjusted) if persistent GI intolerance or further eGFR decline.\n4. Monitor renal function, blood glucose, and symptoms every 3–6 months; avoid insulin initiation unless severe hyperglycemia or contraindications to oral agents."
              }
            },
            {
              "stem": "A 70-year-old woman with primary hyperthyroidism is admitted for management. She has a history of atrial fibrillation and heart failure with preserved ejection fraction. Current medications: furosemide 40 mg daily, lisinopril 10 mg daily.",
              "modelAnswer": {
                "a": "List three causes of primary hyperthyroidism. (3 marks)\n1. Graves’ disease (autoimmune stimulation of TSH receptor).\n2. Toxic multinodular goiter (autonomous thyroid nodules producing excess hormone).\n3. Toxic adenoma (single autonomous nodule).",
                "b": "Describe two parameters that should be monitored during treatment of her hyperthyroidism. (2 marks)\n1. Heart rate and rhythm (e.g., Holter monitoring or telemetry), as uncontrolled hyperthyroidism increases risk of atrial fibrillation and tachycardia-induced cardiomyopathy.\n2. Thyroid function tests (TSH, free T4) every 4–6 weeks during titration to assess response and avoid overtreatment leading to hypothyroidism."
              }
            },
            {
              "stem": "A 53-year-old woman presents with 9 weeks of joint pain and stiffness affecting her hands and wrists. She works as a street vendor and reports morning stiffness lasting >1 hour.",
              "modelAnswer": {
                "a": "List four key questions to ask about her joint pain and stiffness. (2 marks)\n1. Symmetry of joint involvement (e.g., both hands/wrists).\n2. Presence of swelling, warmth, or redness in joints.\n3. Systemic symptoms (e.g., fever, fatigue, weight loss).\n4. Family history of autoimmune diseases (e.g., rheumatoid arthritis, lupus).",
                "b": "Propose a pharmaceutical care plan for the management of rheumatoid arthritis in this patient. (4 marks)\n1. Medication: Initiate methotrexate 7.5–15 mg orally once weekly with folic acid 5 mg daily to reduce GI and hepatic toxicity; consider subcutaneous route if poor oral tolerance.\n2. Monitoring: Baseline and periodic liver enzymes, CBC, renal function, and chest X-ray (if methotrexate-naïve); assess disease activity (DAS28) every 3 months.\n3. Patient education: Counsel on importance of adherence, contraception (methotrexate is teratogenic), alcohol avoidance, and recognition of infection or cytopenia symptoms.\n4. Non-pharmacologic: Refer to physiotherapy for joint protection and exercise; consider occupational therapy for assistive devices; emphasize smoking cessation if applicable."
              }
            },
            {
              "stem": "A 35-year-old woman with newly diagnosed Hodgkin lymphoma is scheduled to begin chemotherapy.",
              "modelAnswer": {
                "a": "Identify one commonly used chemotherapy regimen for Hodgkin lymphoma. (2 marks)\nABVD: Doxorubicin (Adriamycin), Bleomycin, Vinblastine, Dacarbazine.",
                "b": "List three patient counseling points regarding chemotherapy-induced nausea and vomiting (CINV) for this regimen. (3 marks)\n1. Antiemetic prophylaxis: Ondansetron 8–16 mg IV plus dexamethasone 12 mg IV before chemotherapy; consider aprepitant for highly emetogenic regimens.\n2. Take antiemetics as prescribed, even if feeling well, to prevent delayed nausea (common with cisplatin or cyclophosphamide-based regimens).\n3. Report uncontrolled nausea/vomiting immediately, as severe CINV may require dose adjustment or alternative regimens."
              }
            },
            {
              "stem": "A 45-year-old male with type 1 diabetes presents to the emergency department with confusion, diaphoresis, and a capillary glucose of 2.9 mmol/L.",
              "modelAnswer": {
                "a": "Describe the immediate management steps for this patient. (3 marks)\n1. Administer 15–20 g fast-acting carbohydrate (e.g., 150 mL orange juice or 3 glucose tablets) and retest glucose in 15 minutes.\n2. If still hypoglycemic (<4.0 mmol/L), repeat carbohydrate administration.\n3. Once glucose >4.0 mmol/L and patient alert, provide a snack with protein and complex carbohydrate (e.g., peanut butter sandwich) to prevent recurrence.",
                "b": "List two long-term strategies to prevent recurrent hypoglycemia in this patient. (2 marks)\n1. Review insulin regimen: Adjust basal or prandial insulin doses; consider insulin pump therapy or continuous glucose monitoring (CGM) for better glycemic control.\n2. Patient education: Teach recognition of hypoglycemia symptoms, proper carbohydrate counting, and avoidance of insulin stacking (e.g., skipping meals after insulin administration)."
              }
            },
            {
              "stem": "A 60-year-old woman with metastatic breast cancer is receiving doxorubicin and cyclophosphamide.",
              "modelAnswer": {
                "a": "Identify the most likely cardiotoxicity associated with doxorubicin and describe monitoring recommendations. (3 marks)\nCardiotoxicity: Doxorubicin can cause dose-dependent cardiomyopathy and heart failure.\nMonitoring: Baseline and periodic echocardiogram or MUGA scan to assess left ventricular ejection fraction (LVEF); withhold doxorubicin if LVEF drops below institutional threshold (e.g., <50% or >10% decline from baseline).",
                "b": "Outline the management of doxorubicin extravasation. (2 marks)\n1. Stop infusion immediately and disconnect IV line (leave cannula in place).\n2. Aspirate residual drug from the site; administer dexrazoxane (if available) or apply cold compresses; consult plastic surgery for debridement if severe."
              }
            },
            {
              "stem": "A 58-year-old male with chronic kidney disease (eGFR 25 mL/min/1.73m²) is admitted with acute gout.",
              "modelAnswer": {
                "a": "Explain why colchicine is contraindicated in this patient. (2 marks)\nColchicine is primarily renally eliminated; in CKD, accumulation increases risk of severe diarrhea, myopathy, and bone marrow suppression. Dose reduction is required, but even low doses are unsafe in eGFR <30 mL/min/1.73m².",
                "b": "Recommend an alternative therapy and justify your choice. (3 marks)\nAlternative: Intra-articular corticosteroid injection (e.g., triamcinolone 40 mg) or oral prednisone 20–30 mg daily for 5–7 days, tapered as symptoms improve.\nJustification: Corticosteroids are effective for acute gout and do not require renal adjustment; they avoid NSAID-related nephrotoxicity and colchicine toxicity in CKD."
              }
            },
            {
              "stem": "A 40-year-old woman with type 2 diabetes is scheduled for an elective CT scan with intravenous contrast.",
              "modelAnswer": {
                "a": "Describe the management of her diabetes medications peri-procedure. (3 marks)\n1. Metformin: Withhold 48 hours before and after contrast administration due to risk of lactic acidosis; restart only if renal function is stable (eGFR ≥45 mL/min/1.73m²).\n2. Insulin: Continue basal insulin but reduce prandial insulin dose on the day of the procedure; ensure patient is well-hydrated.\n3. Monitor capillary glucose peri-procedure; target 6–10 mmol/L to avoid hypoglycemia or hyperglycemia."
              }
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 24-year-old male is admitted to the high-dependency unit with a 2-week history of polyuria, polydipsia, lower abdominal pain, and confusion. Vital signs: BP 88/56 mmHg, PR 100 bpm, RR 25/min, temperature 40.0°C. Laboratory results: RBS 24 mmol/L, Na+ 143 mEq/L, K+ 4.5 mEq/L, pH 7.1, HCO3- 16 mEq/L, anion gap 18. He is disoriented in time and place.",
              "modelAnswer": {
                "stem": "A 55-year-old female with metastatic breast cancer is receiving adjuvant chemotherapy with doxorubicin, cyclophosphamide, and paclitaxel. She develops fever (38.5°C) and neutropenia (ANC 0.3 × 10⁹/L) 10 days after her last cycle.",
                "a": "Describe the management of febrile neutropenia in this patient. (5 marks)\n1. Hospital admission and empiric broad-spectrum antibiotics within 1 hour of presentation: Piperacillin-tazobactam 4.5 g IV q6h or meropenem 1 g IV q8h (covering Pseudomonas and Gram-negative bacilli).\n2. Add vancomycin if suspected catheter-related infection, hypotension, or known MRSA colonization.\n3. Monitor vital signs, fluid balance, and cultures (blood, urine, sputum, catheter tips if removed).\n4. Granulocyte colony-stimulating factor (G-CSF, e.g., filgrastim 5 mcg/kg SC daily) may be considered if profound neutropenia (<0.1 × 10⁹/L) or prolonged (>10 days) expected.\n5. Reassess after 48–72 hours; if afebrile and clinically stable, consider step-down to oral antibiotics (e.g., ciprofloxacin + amoxicillin-clavulanate) if neutrophil recovery anticipated.",
                "b": "Outline the prevention and management of chemotherapy-induced nausea and vomiting (CINV) for highly emetogenic and moderately emetogenic regimens. (5 marks)\nHighly emetogenic regimens (e.g., cisplatin, cyclophosphamide >1500 mg/m²):\n- Antiemetic prophylaxis: NK1 receptor antagonist (e.g., aprepitant 125 mg PO day 1, then 80 mg days 2–3) + 5-HT3 antagonist (e.g., ondansetron 16–24 mg IV day 1) + dexamethasone 12 mg IV day 1.\n- Rescue: Metoclopramide or olanzapine for breakthrough nausea.\n\nModerately emetogenic regimens (e.g., doxorubicin + cyclophosphamide):\n- Antiemetic prophylaxis: 5-HT3 antagonist (e.g., ondansetron 8–16 mg IV day 1) + dexamethasone 8–12 mg IV day 1.\n- Consider NK1 antagonist if prior poor control or high-risk patient.\n- Delayed CINV (days 2–5): Dexamethasone 8 mg PO BID days 2–4 + aprepitant 80 mg PO daily days 2–3.\n\nPatient education: Take antiemetics as prescribed, even if feeling well; avoid triggers (e.g., strong odors); maintain hydration and small, frequent meals.",
                "c": "Describe the management of chemotherapy extravasation for the following agents: (5 marks)\nPaclitaxel:\n- Stop infusion immediately; aspirate residual drug via the existing IV line.\n- Administer hyaluronidase 150–250 units subcutaneously around the site to disperse the drug.\n- Apply warm compresses to enhance drug dispersion; avoid cold compresses.\n- Elevate the limb and monitor for signs of tissue necrosis; consult plastic surgery if severe.\n\nNitrogen mustard:\n- Stop infusion and disconnect IV; leave cannula in place to aspirate residual drug.\n- Administer sodium thiosulfate 12.5 g/50 mL via IV line (if peripheral) or locally via subcutaneous infiltration around the site.\n- Apply cold compresses to reduce inflammation; avoid heat.\n- Surgical debridement may be required for severe extravasation.\n\nMitomycin:\n- Stop infusion and aspirate residual drug; remove IV line.\n- Administer dimethyl sulfoxide (DMSO) 99% topically to the site 4–6 times daily for 1–2 weeks to reduce tissue damage.\n- Apply cold compresses; monitor for delayed ulceration or necrosis."
              }
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Endocrinology, Joint & Oncology",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 68-year-old male with newly diagnosed hypothyroidism (TSH 12 mIU/L, free T4 8 pmol/L) is started on levothyroxine 25 mcg daily. Which of the following is the most appropriate next step in monitoring?",
              "options": [
                "a. Repeat thyroid function tests in 4–6 weeks to assess response",
                "b. Increase levothyroxine dose immediately to 50 mcg daily due to low free T4",
                "c. Measure TSH weekly until target range is achieved",
                "d. Discontinue levothyroxine and switch to liothyronine due to age"
              ],
              "answer": "a. Repeat thyroid function tests in 4–6 weeks to assess response",
              "explanation": "Levothyroxine dose adjustments should be guided by TSH levels 4–6 weeks after initiation or dose change."
            },
            {
              "stem": "A patient with type 2 diabetes mellitus and chronic kidney disease (eGFR 45 mL/min/1.73m²) is currently taking metformin 500 mg twice daily. Which of the following is the most appropriate action regarding metformin?",
              "options": [
                "a. Continue metformin and monitor eGFR every 3–6 months",
                "b. Increase metformin to 1000 mg twice daily to improve glycemic control",
                "c. Discontinue metformin immediately due to risk of lactic acidosis",
                "d. Switch metformin to empagliflozin due to renal benefits"
              ],
              "answer": "a. Continue metformin and monitor eGFR every 3–6 months",
              "explanation": "Metformin can be used in CKD stage 3a (eGFR 45–59) with dose adjustment and monitoring."
            },
            {
              "stem": "A 55-year-old female with rheumatoid arthritis is prescribed ibuprofen 400 mg three times daily for joint pain. She has no history of peptic ulcer disease but takes low-dose aspirin for cardiovascular prophylaxis. Which of the following is the most appropriate strategy to reduce GI toxicity?",
              "options": [
                "a. Add omeprazole 20 mg daily for gastroprotection",
                "b. Switch ibuprofen to celecoxib 200 mg daily",
                "c. Reduce ibuprofen dose to 200 mg twice daily",
                "d. Discontinue aspirin to reduce GI risk"
              ],
              "answer": "a. Add omeprazole 20 mg daily for gastroprotection",
              "explanation": "Concomitant NSAID and low-dose aspirin use increases GI bleeding risk; PPIs are recommended for gastroprotection."
            },
            {
              "stem": "A 60-year-old male with type 2 diabetes mellitus presents with a painful, swollen right knee. Joint aspiration reveals negatively birefringent crystals. Which of the following is the most appropriate initial treatment?",
              "options": [
                "a. Colchicine 0.6 mg immediately followed by 0.3 mg 1 hour later",
                "b. Allopurinol 100 mg daily for long-term urate lowering",
                "c. Prednisolone 30 mg daily for 5 days",
                "d. Naproxen 500 mg twice daily for 7 days"
              ],
              "answer": "d. Naproxen 500 mg twice daily for 7 days",
              "explanation": "NSAIDs are first-line for acute gout unless contraindicated; colchicine is an alternative if NSAIDs are not tolerated."
            },
            {
              "stem": "A 45-year-old female with metastatic breast cancer is receiving doxorubicin and cyclophosphamide chemotherapy. Which of the following is the most likely long-term adverse effect of this regimen?",
              "options": [
                "a. Cardiomyopathy",
                "b. Pulmonary fibrosis",
                "c. Peripheral neuropathy",
                "d. Ototoxicity"
              ],
              "answer": "a. Cardiomyopathy",
              "explanation": "Doxorubicin is associated with dose-dependent cardiotoxicity, including cardiomyopathy and heart failure."
            },
            {
              "stem": "A 70-year-old male with type 2 diabetes mellitus and hypertension is prescribed hydrochlorothiazide 25 mg daily. Which of the following is the most likely metabolic adverse effect of this therapy?",
              "options": [
                "a. Hyperkalemia",
                "b. Hypoglycemia",
                "c. Hyperuricemia",
                "d. Hypercalcemia"
              ],
              "answer": "c. Hyperuricemia",
              "explanation": "Thiazide diuretics can increase uric acid levels, precipitating gout in susceptible individuals."
            },
            {
              "stem": "A 30-year-old female with Graves’ disease is started on methimazole 10 mg three times daily. Which of the following is the most serious adverse effect requiring immediate discontinuation?",
              "options": [
                "a. Pruritus and mild rash",
                "b. Transient leukopenia (WBC 3.2 × 10⁹/L)",
                "c. Agranulocytosis (ANC < 500/µL)",
                "d. Mild elevation in liver enzymes"
              ],
              "answer": "c. Agranulocytosis (ANC < 500/µL)",
              "explanation": "Agranulocytosis is a rare but life-threatening adverse effect of thionamides, requiring immediate drug cessation and supportive care."
            },
            {
              "stem": "A 50-year-old male with type 2 diabetes mellitus is admitted with acute pancreatitis. His medications include metformin, glibenclamide, and atorvastatin. Which of the following is the most likely contributing factor to his pancreatitis?",
              "options": [
                "a. Metformin",
                "b. Glibenclamide",
                "c. Atorvastatin",
                "d. None of the above"
              ],
              "answer": "c. Atorvastatin",
              "explanation": "Statins, particularly atorvastatin, are associated with rare cases of drug-induced pancreatitis."
            },
            {
              "stem": "A 65-year-old female with chronic lymphocytic leukemia is receiving fludarabine, cyclophosphamide, and rituximab (FCR regimen). Which of the following is the most appropriate supportive care measure to prevent infection?",
              "options": [
                "a. Prophylactic acyclovir for herpes zoster prevention",
                "b. Routine use of granulocyte colony-stimulating factor (G-CSF)",
                "c. Prophylactic trimethoprim-sulfamethoxazole for Pneumocystis jirovecii pneumonia",
                "d. Avoidance of live vaccines"
              ],
              "answer": "c. Prophylactic trimethoprim-sulfamethoxazole for Pneumocystis jirovecii pneumonia",
              "explanation": "FCR regimen increases risk of opportunistic infections; TMP-SMX is recommended for Pneumocystis prophylaxis."
            },
            {
              "stem": "A 25-year-old male with type 1 diabetes mellitus presents with dizziness, sweating, and confusion. His blood glucose is 2.8 mmol/L. Which of the following is the most appropriate immediate management?",
              "options": [
                "a. Administer 15–20 g oral glucose and retest in 15 minutes",
                "b. Administer 50 mL of 50% dextrose intravenously",
                "c. Administer 1 mg intramuscular glucagon",
                "d. Wait 1 hour and retest blood glucose"
              ],
              "answer": "a. Administer 15–20 g oral glucose and retest in 15 minutes",
              "explanation": "Conscious patients with hypoglycemia should receive oral glucose; retesting ensures resolution."
            },
            {
              "stem": "A 75-year-old male with prostate cancer is receiving leuprolide for androgen deprivation therapy. Which of the following is the most likely adverse effect of this therapy?",
              "options": [
                "a. Hypercalcemia",
                "b. Gynecomastia",
                "c. Hypoglycemia",
                "d. Bradycardia"
              ],
              "answer": "b. Gynecomastia",
              "explanation": "Gonadotropin-releasing hormone agonists like leuprolide cause testosterone suppression, leading to gynecomastia and hot flashes."
            },
            {
              "stem": "A 40-year-old female with metastatic colorectal cancer is receiving FOLFOX (fluorouracil, leucovorin, oxaliplatin) chemotherapy. Which of the following is the most likely dose-limiting toxicity of oxaliplatin?",
              "options": [
                "a. Nephrotoxicity",
                "b. Peripheral neuropathy",
                "c. Hepatotoxicity",
                "d. Cardiotoxicity"
              ],
              "answer": "b. Peripheral neuropathy",
              "explanation": "Oxaliplatin commonly causes cumulative sensory peripheral neuropathy, which can be dose-limiting."
            },
            {
              "stem": "A 55-year-old male with type 2 diabetes mellitus and CKD stage 4 (eGFR 25 mL/min/1.73m²) is prescribed empagliflozin. Which of the following is the most appropriate counseling point?",
              "options": [
                "a. Monitor for signs of hypoglycemia daily",
                "b. Increase fluid intake to prevent dehydration",
                "c. Expect weight gain due to fluid retention",
                "d. Report any signs of genital infections or urinary symptoms"
              ],
              "answer": "d. Report any signs of genital infections or urinary symptoms",
              "explanation": "SGLT2 inhibitors increase risk of genital mycotic infections and urinary tract infections."
            },
            {
              "stem": "A 60-year-old female with rheumatoid arthritis is started on methotrexate 7.5 mg weekly. Which of the following is the most appropriate baseline monitoring test?",
              "options": [
                "a. Serum creatinine and eGFR",
                "b. Liver function tests and hepatitis B/C serology",
                "c. Electrocardiogram",
                "d. Pulmonary function tests"
              ],
              "answer": "b. Liver function tests and hepatitis B/C serology",
              "explanation": "Methotrexate requires baseline liver function tests and hepatitis screening due to hepatotoxicity risk."
            },
            {
              "stem": "A 35-year-old male with testicular cancer is receiving bleomycin, etoposide, and cisplatin (BEP regimen). Which of the following is the most appropriate monitoring parameter for bleomycin toxicity?",
              "options": [
                "a. Serum creatinine",
                "b. Pulmonary function tests (DLCO)",
                "c. Electrocardiogram",
                "d. Audiometry"
              ],
              "answer": "b. Pulmonary function tests (DLCO)",
              "explanation": "Bleomycin causes dose-dependent pulmonary toxicity; DLCO monitoring is essential."
            },
            {
              "stem": "A 50-year-old female with osteoporosis is prescribed alendronate 70 mg weekly. Which of the following is the most appropriate administration instruction?",
              "options": [
                "a. Take with breakfast to enhance absorption",
                "b. Take at bedtime with a glass of milk",
                "c. Take first thing in the morning with a full glass of water and remain upright for 30 minutes",
                "d. Take with orange juice to increase acidity"
              ],
              "answer": "c. Take first thing in the morning with a full glass of water and remain upright for 30 minutes",
              "explanation": "Bisphosphonates should be taken on an empty stomach with water and the patient should remain upright to prevent esophageal irritation."
            },
            {
              "stem": "A 45-year-old male with type 2 diabetes mellitus and hypertension is prescribed empagliflozin. Which of the following is the most likely cardiovascular benefit of this therapy?",
              "options": [
                "a. Reduction in LDL cholesterol",
                "b. Decrease in blood pressure",
                "c. Increase in HDL cholesterol",
                "d. Prevention of atrial fibrillation"
              ],
              "answer": "b. Decrease in blood pressure",
              "explanation": "SGLT2 inhibitors like empagliflozin reduce blood pressure through osmotic diuresis and natriuresis."
            },
            {
              "stem": "A 65-year-old female with metastatic breast cancer is receiving trastuzumab. Which of the following is the most appropriate cardiac monitoring strategy?",
              "options": [
                "a. Baseline and periodic echocardiograms",
                "b. Electrocardiogram every 3 months",
                "c. Serum troponin levels monthly",
                "d. Chest X-ray annually"
              ],
              "answer": "a. Baseline and periodic echocardiograms",
              "explanation": "Trastuzumab is associated with cardiotoxicity; baseline and periodic cardiac function assessment is required."
            },
            {
              "stem": "A 55-year-old male with gout is prescribed allopurinol 100 mg daily. Which of the following is the most important patient counseling point?",
              "options": [
                "a. Take medication on an empty stomach for better absorption",
                "b. Increase fluid intake to prevent kidney stones",
                "c. Limit dietary purine intake to red meat only",
                "d. Expect immediate relief of joint pain"
              ],
              "answer": "b. Increase fluid intake to prevent kidney stones",
              "explanation": "Allopurinol increases urinary uric acid excretion; adequate hydration prevents uric acid nephrolithiasis."
            },
            {
              "stem": "A 70-year-old female with type 2 diabetes mellitus is started on insulin glargine at bedtime. Which of the following is the most appropriate initial dose?",
              "options": [
                "a. 0.1 units/kg/day",
                "b. 0.2 units/kg/day",
                "c. 0.5 units/kg/day",
                "d. 1.0 units/kg/day"
              ],
              "answer": "a. 0.1 units/kg/day",
              "explanation": "Basal insulin (e.g., glargine) is typically initiated at 0.1–0.2 units/kg/day in type 2 diabetes."
            },
            {
              "stem": "A 40-year-old male with Hodgkin lymphoma is receiving ABVD chemotherapy. Which of the following is the most likely adverse effect of bleomycin in this regimen?",
              "options": [
                "a. Cardiotoxicity",
                "b. Pulmonary toxicity",
                "c. Neurotoxicity",
                "d. Nephrotoxicity"
              ],
              "answer": "b. Pulmonary toxicity",
              "explanation": "Bleomycin is associated with dose-dependent pulmonary fibrosis."
            },
            {
              "stem": "A 55-year-old female with type 2 diabetes mellitus is prescribed sitagliptin. Which of the following is the most appropriate monitoring parameter?",
              "options": [
                "a. Serum creatinine and eGFR",
                "b. Liver function tests",
                "c. Thyroid function tests",
                "d. Hemoglobin A1c every 3 months"
              ],
              "answer": "a. Serum creatinine and eGFR",
              "explanation": "DPP-4 inhibitors like sitagliptin require renal function monitoring due to renal elimination."
            },
            {
              "stem": "A 60-year-old male with prostate cancer is receiving abiraterone. Which of the following is the most important baseline test before initiating therapy?",
              "options": [
                "a. Serum testosterone levels",
                "b. Liver function tests",
                "c. Electrocardiogram",
                "d. Bone scan"
              ],
              "answer": "b. Liver function tests",
              "explanation": "Abiraterone is metabolized by the liver and requires baseline and periodic liver function monitoring."
            },
            {
              "stem": "A 45-year-old female with rheumatoid arthritis is prescribed hydroxychloroquine. Which of the following is the most important long-term monitoring parameter?",
              "options": [
                "a. Serum creatinine",
                "b. Retinal examination",
                "c. Electrocardiogram",
                "d. Pulmonary function tests"
              ],
              "answer": "b. Retinal examination",
              "explanation": "Hydroxychloroquine can cause irreversible retinal toxicity; regular ophthalmologic monitoring is required."
            },
            {
              "stem": "A 50-year-old male with type 2 diabetes mellitus and CKD stage 3b (eGFR 40 mL/min/1.73m²) is prescribed dapagliflozin. Which of the following is the most appropriate counseling point?",
              "options": [
                "a. Expect significant weight gain",
                "b. Monitor for signs of hypoglycemia daily",
                "c. Increase fluid intake to prevent dehydration",
                "d. Report any signs of genital infections"
              ],
              "answer": "d. Report any signs of genital infections",
              "explanation": "SGLT2 inhibitors increase risk of genital mycotic infections, which should be promptly reported."
            },
            {
              "stem": "A 65-year-old female with metastatic breast cancer is receiving paclitaxel. Which of the following is the most appropriate premedication to prevent hypersensitivity reactions?",
              "options": [
                "a. Dexamethasone and diphenhydramine",
                "b. Ondansetron and metoclopramide",
                "c. Acetaminophen and ibuprofen",
                "d. Lorazepam and haloperidol"
              ],
              "answer": "a. Dexamethasone and diphenhydramine",
              "explanation": "Paclitaxel commonly causes hypersensitivity reactions; premedication with steroids and antihistamines is standard."
            },
            {
              "stem": "A 55-year-old male with type 2 diabetes mellitus is prescribed liraglutide. Which of the following is the most likely adverse effect?",
              "options": [
                "a. Hypoglycemia",
                "b. Weight gain",
                "c. Constipation",
                "d. Pancreatitis"
              ],
              "answer": "c. Constipation",
              "explanation": "GLP-1 receptor agonists like liraglutide commonly cause gastrointestinal adverse effects, including constipation."
            },
            {
              "stem": "A 40-year-old female with metastatic colorectal cancer is receiving FOLFIRI (fluorouracil, leucovorin, irinotecan) chemotherapy. Which of the following is the most appropriate antiemetic regimen for highly emetogenic chemotherapy?",
              "options": [
                "a. Ondansetron alone",
                "b. Ondansetron and dexamethasone",
                "c. Aprepitant, ondansetron, and dexamethasone",
                "d. Metoclopramide alone"
              ],
              "answer": "c. Aprepitant, ondansetron, and dexamethasone",
              "explanation": "Highly emetogenic regimens (e.g., FOLFIRI) require a three-drug antiemetic regimen including NK1 receptor antagonist."
            },
            {
              "stem": "A 60-year-old male with type 2 diabetes mellitus is prescribed canagliflozin. Which of the following is the most important cardiovascular benefit?",
              "options": [
                "a. Reduction in LDL cholesterol",
                "b. Decrease in blood pressure",
                "c. Prevention of atrial fibrillation",
                "d. Increase in HDL cholesterol"
              ],
              "answer": "b. Decrease in blood pressure",
              "explanation": "SGLT2 inhibitors reduce blood pressure through osmotic diuresis and natriuresis."
            },
            {
              "stem": "A 55-year-old female with rheumatoid arthritis is prescribed tofacitinib. Which of the following is the most important baseline test before initiating therapy?",
              "options": [
                "a. Serum creatinine and eGFR",
                "b. Liver function tests",
                "c. Complete blood count",
                "d. Chest X-ray"
              ],
              "answer": "c. Complete blood count",
              "explanation": "Tofacitinib can cause myelosuppression; baseline and periodic CBC monitoring is required."
            },
            {
              "stem": "A 45-year-old male with type 2 diabetes mellitus is prescribed dulaglutide. Which of the following is the most appropriate administration instruction?",
              "options": [
                "a. Take orally with breakfast",
                "b. Inject subcutaneously once daily",
                "c. Inject subcutaneously once weekly",
                "d. Take sublingually at bedtime"
              ],
              "answer": "c. Inject subcutaneously once weekly",
              "explanation": "GLP-1 receptor agonists like dulaglutide are administered subcutaneously once weekly."
            },
            {
              "stem": "A 60-year-old female with metastatic breast cancer is receiving trastuzumab emtansine (T-DM1). Which of the following is the most likely dose-limiting toxicity?",
              "options": [
                "a. Cardiotoxicity",
                "b. Hepatotoxicity",
                "c. Peripheral neuropathy",
                "d. Thrombocytopenia"
              ],
              "answer": "d. Thrombocytopenia",
              "explanation": "T-DM1 is associated with thrombocytopenia as a dose-limiting toxicity."
            },
            {
              "stem": "A 50-year-old male with type 2 diabetes mellitus is prescribed metformin and empagliflozin. Which of the following is the most important counseling point regarding sick day management?",
              "options": [
                "a. Discontinue both medications during acute illness",
                "b. Increase fluid intake and monitor blood glucose closely",
                "c. Reduce carbohydrate intake to prevent hyperglycemia",
                "d. Take extra doses of metformin to control blood glucose"
              ],
              "answer": "b. Increase fluid intake and monitor blood glucose closely",
              "explanation": "Sick day management for diabetes includes maintaining hydration and frequent glucose monitoring."
            },
            {
              "stem": "A 65-year-old female with rheumatoid arthritis is prescribed tocilizumab. Which of the following is the most important baseline test before initiating therapy?",
              "options": [
                "a. Serum creatinine and eGFR",
                "b. Liver function tests",
                "c. Lipid panel",
                "d. Tuberculosis screening"
              ],
              "answer": "d. Tuberculosis screening",
              "explanation": "Tocilizumab suppresses the immune system; tuberculosis screening is required before initiating therapy."
            },
            {
              "stem": "A 40-year-old male with type 2 diabetes mellitus is prescribed insulin degludec. Which of the following is the most appropriate initial dose?",
              "options": [
                "a. 0.1 units/kg/day",
                "b. 0.2 units/kg/day",
                "c. 0.5 units/kg/day",
                "d. 1.0 units/kg/day"
              ],
              "answer": "a. 0.1 units/kg/day",
              "explanation": "Basal insulin (e.g., degludec) is typically initiated at 0.1–0.2 units/kg/day in type 2 diabetes."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 68-year-old male with newly diagnosed type 2 diabetes mellitus (HbA1c 9.2%) is started on metformin 500 mg twice daily. He has CKD stage 3a (eGFR 50 mL/min/1.73m²).",
              "modelAnswer": {
                "a": {
                  "title": "Identify two key monitoring parameters for this patient.",
                  "content": [
                    "1. Renal function (serum creatinine and eGFR) every 3–6 months to assess metformin safety.",
                    "2. HbA1c every 3 months to evaluate glycemic control and adjust therapy as needed."
                  ]
                },
                "b": {
                  "title": "List two patient counseling points regarding metformin.",
                  "content": [
                    "1. Take metformin with meals to reduce gastrointestinal adverse effects.",
                    "2. Report symptoms of lactic acidosis (e.g., muscle pain, difficulty breathing, drowsiness) immediately."
                  ]
                },
                "c": {
                  "title": "Explain why this patient’s eGFR is relevant to metformin therapy.",
                  "content": "Metformin is contraindicated in severe renal impairment (eGFR < 30 mL/min/1.73m²) due to increased risk of lactic acidosis. In CKD stage 3a (eGFR 45–59), metformin can be used with dose adjustment and close monitoring."
                }
              }
            },
            {
              "stem": "A 55-year-old female with rheumatoid arthritis is prescribed methotrexate 7.5 mg weekly and folic acid 5 mg daily.",
              "modelAnswer": {
                "a": {
                  "title": "Identify two baseline tests required before initiating methotrexate.",
                  "content": [
                    "1. Liver function tests (ALT, AST, bilirubin) to assess baseline hepatic function.",
                    "2. Hepatitis B and C serology to screen for chronic viral hepatitis, which increases hepatotoxicity risk."
                  ]
                },
                "b": {
                  "title": "List two adverse effects of methotrexate that require patient counseling.",
                  "content": [
                    "1. Gastrointestinal upset (nausea, vomiting, diarrhea) — take with food or split dose.",
                    "2. Bone marrow suppression (e.g., infections, easy bruising) — report fever or unusual bleeding immediately."
                  ]
                },
                "c": {
                  "title": "Explain the role of folic acid in methotrexate therapy.",
                  "content": "Folic acid supplementation reduces the risk of methotrexate-induced hepatotoxicity and bone marrow suppression by replenishing folate stores depleted by methotrexate."
                }
              }
            },
            {
              "stem": "A 60-year-old male with metastatic prostate cancer is receiving leuprolide for androgen deprivation therapy.",
              "modelAnswer": {
                "a": {
                  "title": "Identify two common adverse effects of leuprolide.",
                  "content": [
                    "1. Hot flashes and sweating due to testosterone suppression.",
                    "2. Gynecomastia and breast tenderness."
                  ]
                },
                "b": {
                  "title": "List two monitoring parameters for this patient.",
                  "content": [
                    "1. Serum testosterone levels to confirm castration (target < 50 ng/dL).",
                    "2. Bone mineral density (DEXA scan) annually to assess for osteoporosis risk."
                  ]
                },
                "c": {
                  "title": "Explain why bone mineral density monitoring is important in this patient.",
                  "content": "Androgen deprivation therapy (e.g., leuprolide) increases the risk of osteoporosis and fractures due to reduced testosterone levels, which are essential for bone health."
                }
              }
            },
            {
              "stem": "A 45-year-old female with type 2 diabetes mellitus and hypertension is prescribed empagliflozin 10 mg daily.",
              "modelAnswer": {
                "a": {
                  "title": "Identify two cardiovascular benefits of empagliflozin.",
                  "content": [
                    "1. Reduction in blood pressure through osmotic diuresis and natriuresis.",
                    "2. Decreased risk of major adverse cardiovascular events (MACE) in patients with type 2 diabetes and established cardiovascular disease."
                  ]
                },
                "b": {
                  "title": "List two patient counseling points for empagliflozin.",
                  "content": [
                    "1. Increase fluid intake to prevent dehydration, especially during hot weather or illness.",
                    "2. Report symptoms of genital infections (e.g., itching, discharge) or urinary tract infections promptly."
                  ]
                },
                "c": {
                  "title": "Explain why renal function monitoring is important with empagliflozin.",
                  "content": "Empagliflozin is renally eliminated; renal impairment (eGFR < 30 mL/min/1.73m²) increases the risk of adverse effects, including hypotension and hyperkalemia."
                }
              }
            },
            {
              "stem": "A 50-year-old male with Hodgkin lymphoma is receiving ABVD chemotherapy (doxorubicin, bleomycin, vinblastine, dacarbazine).",
              "modelAnswer": {
                "a": {
                  "title": "Identify two dose-limiting toxicities of doxorubicin in this regimen.",
                  "content": [
                    "1. Cardiotoxicity (e.g., cardiomyopathy, heart failure) — monitor LVEF with echocardiogram.",
                    "2. Myelosuppression (e.g., neutropenia, thrombocytopenia) — monitor CBC regularly."
                  ]
                },
                "b": {
                  "title": "List two monitoring parameters for bleomycin toxicity.",
                  "content": [
                    "1. Pulmonary function tests (DLCO) before each cycle to assess for pulmonary fibrosis.",
                    "2. Chest X-ray if symptoms (e.g., cough, dyspnea) develop."
                  ]
                },
                "c": {
                  "title": "Explain why vinblastine is included in ABVD despite its myelosuppressive effects.",
                  "content": "Vinblastine provides additional antineoplastic activity against Hodgkin lymphoma while its myelosuppressive effects are manageable with supportive care (e.g., G-CSF)."
                }
              }
            },
            {
              "stem": "A 65-year-old female with metastatic breast cancer is receiving trastuzumab and pertuzumab.",
              "modelAnswer": {
                "a": {
                  "title": "Identify two cardiac monitoring strategies for trastuzumab therapy.",
                  "content": [
                    "1. Baseline echocardiogram to assess left ventricular ejection fraction (LVEF).",
                    "2. Repeat echocardiogram every 3 months during therapy to detect cardiotoxicity early."
                  ]
                },
                "b": {
                  "title": "List two adverse effects of pertuzumab.",
                  "content": [
                    "1. Diarrhea (common, often grade 1–2).",
                    "2. Rash and other dermatologic reactions."
                  ]
                },
                "c": {
                  "title": "Explain why dual HER2 blockade (trastuzumab + pertuzumab) is used in metastatic breast cancer.",
                  "content": "Dual HER2 blockade provides synergistic antitumor activity and improves progression-free survival compared to single-agent therapy in HER2-positive metastatic breast cancer."
                }
              }
            },
            {
              "stem": "A 55-year-old male with type 2 diabetes mellitus and CKD stage 3b (eGFR 40 mL/min/1.73m²) is prescribed canagliflozin 100 mg daily.",
              "modelAnswer": {
                "a": {
                  "title": "Identify two key counseling points for canagliflozin.",
                  "content": [
                    "1. Take medication in the morning to reduce nocturnal polyuria and improve adherence.",
                    "2. Monitor for signs of dehydration (e.g., dizziness, dry mouth) and increase fluid intake as needed."
                  ]
                },
                "b": {
                  "title": "List two benefits of canagliflozin in this patient.",
                  "content": [
                    "1. Improved glycemic control with low risk of hypoglycemia.",
                    "2. Reduction in blood pressure and potential renoprotective effects."
                  ]
                },
                "c": {
                  "title": "Explain why canagliflozin is preferred over metformin in this patient.",
                  "content": "Canagliflozin does not require renal dose adjustment until eGFR < 30 mL/min/1.73m², making it safer than metformin in CKD stage 3b."
                }
              }
            },
            {
              "stem": "A 40-year-old female with rheumatoid arthritis is prescribed tofacitinib 5 mg twice daily.",
              "modelAnswer": {
                "a": {
                  "title": "Identify two baseline tests required before initiating tofacitinib.",
                  "content": [
                    "1. Complete blood count (CBC) to assess for baseline cytopenias.",
                    "2. Tuberculosis screening (e.g., IGRA or TST) due to increased risk of reactivation."
                  ]
                },
                "b": {
                  "title": "List two adverse effects of tofacitinib.",
                  "content": [
                    "1. Increased risk of infections (e.g., herpes zoster, tuberculosis).",
                    "2. Elevated liver enzymes and potential hepatotoxicity."
                  ]
                },
                "c": {
                  "title": "Explain why tofacitinib is used in rheumatoid arthritis.",
                  "content": "Tofacitinib is a Janus kinase (JAK) inhibitor that reduces inflammation and joint damage in rheumatoid arthritis, particularly in patients who fail methotrexate therapy."
                }
              }
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 58-year-old male with a 10-year history of type 2 diabetes mellitus presents to the emergency department with confusion, polyuria, polydipsia, and a blood glucose of 28 mmol/L. His vital signs are BP 90/60 mmHg, PR 110 bpm, RR 28/min, and temperature 37.2°C. Laboratory results show pH 7.25, bicarbonate 12 mmol/L, anion gap 20, and serum ketones positive.",
              "modelAnswer": {
                "a": {
                  "title": "Identify the most likely diagnosis.",
                  "content": "Diabetic ketoacidosis (DKA) secondary to uncontrolled type 2 diabetes mellitus, likely precipitated by infection or non-adherence to therapy."
                },
                "b": {
                  "title": "Outline the stepwise acute management of this patient.",
                  "content": [
                    "1. **Fluid resuscitation**: Start 0.9% normal saline 1 L over 1 hour, then reassess. Use 0.45% saline if hypernatremic or hemodynamically stable.\n2. **Insulin therapy**: Start IV regular insulin 0.1 units/kg bolus, then 0.1 units/kg/hour continuous infusion. Target blood glucose reduction of 3–5 mmol/L/hour.\n3. **Potassium replacement**: If serum K+ < 5.3 mmol/L, add 20–40 mmol KCl to IV fluids. Hold insulin if K+ < 3.3 mmol/L.\n4. **Bicarbonate therapy**: Only if pH < 6.9 or severe acidosis with hemodynamic instability (controversial; use cautiously).\n5. **Identify and treat precipitating factors**: Obtain urinalysis, chest X-ray, and blood cultures to rule out infection.\n6. **Transition to subcutaneous insulin**: Once glucose < 11 mmol/L, anion gap closes, and patient tolerates oral intake, switch to basal-bolus insulin regimen (e.g., glargine + aspart).\n7. **Monitoring**: Check glucose every hour, electrolytes (K+, Na+, bicarbonate) every 2–4 hours, and anion gap daily."
                  ]
                },
                "c": {
                  "title": "Describe the treatment and prevention of chemotherapy-induced nausea and vomiting (CINV) for a highly emetogenic regimen (e.g., cisplatin).",
                  "content": [
                    "**Highly emetogenic regimens (e.g., cisplatin, cyclophosphamide > 1500 mg/m²):**\n- **Prevention**:\n  1. **Triple antiemetic regimen**:\n     - **NK1 receptor antagonist** (e.g., aprepitant 125 mg PO on day 1, then 80 mg PO on days 2–3).\n     - **5-HT3 receptor antagonist** (e.g., ondansetron 16–24 mg IV on day 1, then 8 mg PO twice daily on days 2–3).\n     - **Dexamethasone** (e.g., 12 mg IV on day 1, then 8 mg PO daily on days 2–4).\n  2. **Add olanzapine 5–10 mg PO daily on days 1–4** for additional benefit in delayed CINV.\n- **Breakthrough treatment**:\n  - **Metoclopramide** (e.g., 10–20 mg PO every 6 hours as needed).\n  - **Dimenhydrinate** (e.g., 50–100 mg PO every 4–6 hours as needed).\n- **Prevention of delayed CINV**:\n  - Continue antiemetics (e.g., aprepitant, dexamethasone) for 2–3 days post-chemotherapy.\n  - Educate patient on adherence to prescribed regimen and early reporting of breakthrough nausea."
                  ]
                }
              }
            },
            {
              "stem": "A 62-year-old female with metastatic breast cancer is receiving docetaxel and cyclophosphamide chemotherapy. She presents to the pharmacy clinic with complaints of numbness and tingling in her hands and feet, which has progressively worsened over the last two cycles.",
              "modelAnswer": {
                "a": {
                  "title": "Identify the most likely cause of her symptoms.",
                  "content": "Chemotherapy-induced peripheral neuropathy (CIPN) secondary to docetaxel, a taxane chemotherapy agent."
                },
                "b": {
                  "title": "Outline a pharmaceutical care plan for managing this patient’s symptoms.",
                  "content": [
                    "1. **Assess severity**: Use validated tools (e.g., NCI-CTCAE grading) to quantify neuropathy (grade 1–4).\n2. **Dose modification**:\n   - If grade 2 neuropathy, consider dose reduction or treatment delay.\n   - If grade 3–4 neuropathy, discontinue docetaxel and switch to non-neurotoxic regimen if possible.\n3. **Symptomatic management**:\n   - **Gabapentin**: Start at 300 mg PO at bedtime, titrate to 300–1200 mg three times daily as tolerated.\n   - **Duloxetine**: Consider 30 mg PO daily, titrate to 60 mg daily if needed (evidence for duloxetine in CIPN).\n   - **Topical agents**: Capsaicin cream or lidocaine patches for localized symptoms.\n4. **Patient education**:\n   - Avoid exposure to cold temperatures (e.g., iced drinks) as it may worsen symptoms.\n   - Use protective measures (e.g., gloves, warm clothing) to prevent injury.\n   - Report worsening symptoms or functional impairment (e.g., difficulty walking, buttoning clothes).\n5. **Monitoring**:\n   - Reassess symptoms at each clinic visit.\n   - Adjust therapy based on response and tolerability."
                  ]
                },
                "c": {
                  "title": "Describe the management of chemotherapy extravasation for the following agents:",
                  "content": [
                    "**Paclitaxel:**\n- **Immediate management**:\n  - Stop infusion immediately and disconnect IV line (leave cannula in place).\n  - Aspirate residual drug from the IV line and cannula.\n  - Do NOT flush the line.\n- **Antidote**: No specific antidote; apply cold compresses for 15–20 minutes every 6 hours for 24–48 hours.\n- **Surgical consultation**: Consider if severe tissue damage or necrosis develops.\n\n**Nitrogen Mustard (e.g., mechlorethamine):**\n- **Immediate management**:\n  - Stop infusion immediately and disconnect IV line.\n  - Aspirate residual drug and instill sodium thiosulfate 1/6 M solution into the extravasation site (1–2 mL per mL of extravasated drug).\n  - Leave cannula in place for sodium thiosulfate administration.\n- **Antidote**: Sodium thiosulfate is the specific antidote for nitrogen mustard extravasation.\n- **Surgical consultation**: Urgent if severe tissue damage or necrosis.\n\n**Mitomycin:**\n- **Immediate management**:\n  - Stop infusion immediately and disconnect IV line.\n  - Aspirate residual drug and apply dimethyl sulfoxide (DMSO) 99% topically to the extravasation site (apply 4–6 times daily for 1–2 weeks).\n  - Do NOT use cold compresses (may worsen tissue damage).\n- **Antidote**: DMSO is used for mitomycin extravasation.\n- **Surgical consultation**: If severe tissue damage or necrosis develops."
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    "3": {
      "title": "Endocrinology, Joint & Oncology",
      "variant": 3,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 68-year-old male with newly diagnosed hypothyroidism (TSH 12 mIU/L, free T4 8 pmol/L) has a history of atrial fibrillation controlled with digoxin 0.125 mg daily. Which of the following is the MOST appropriate initial levothyroxine dose for this patient?",
              "options": [
                "a. 12.5 mcg daily",
                "b. 25 mcg daily",
                "c. 50 mcg daily",
                "d. 75 mcg daily"
              ],
              "answer": "a. 12.5 mcg daily",
              "explanation": "Elderly patients and those with cardiac disease should start with a low levothyroxine dose (12.5–25 mcg daily) to avoid precipitating arrhythmias or angina."
            },
            {
              "stem": "A 45-year-old female with type 2 diabetes mellitus (HbA1c 8.5%) is initiated on levothyroxine 50 mcg daily for newly diagnosed hypothyroidism. She also takes ferrous sulfate 325 mg daily for iron deficiency anemia. What is the MOST appropriate counseling point regarding levothyroxine administration?",
              "options": [
                "a. Take levothyroxine with ferrous sulfate to enhance absorption",
                "b. Separate levothyroxine and ferrous sulfate doses by at least 4 hours",
                "c. Take levothyroxine on an empty stomach immediately before bed",
                "d. Crush levothyroxine tablets to improve absorption with iron"
              ],
              "answer": "b. Separate levothyroxine and ferrous sulfate doses by at least 4 hours",
              "explanation": "Ferrous sulfate significantly reduces levothyroxine absorption; doses should be separated by ≥4 hours."
            },
            {
              "stem": "A 55-year-old male with metastatic non-small cell lung cancer is receiving cisplatin 75 mg/m² every 3 weeks. Which adverse effect should be monitored MOST closely during therapy?",
              "options": [
                "a. Ototoxicity",
                "b. Hepatotoxicity",
                "c. Photosensitivity",
                "d. Pulmonary fibrosis"
              ],
              "answer": "a. Ototoxicity",
              "explanation": "Cisplatin is highly ototoxic; audiometry should be performed before and periodically during therapy."
            },
            {
              "stem": "A 32-year-old female with type 1 diabetes mellitus uses a basal-bolus insulin regimen: glargine 20 units at bedtime and lispro 6 units before each meal. Her fasting glucose is 6.2 mmol/L, but her pre-lunch glucose is consistently 12.5 mmol/L. Which adjustment is MOST appropriate?",
              "options": [
                "a. Increase morning glargine dose by 2 units",
                "b. Increase pre-lunch lispro dose by 2 units",
                "c. Decrease evening glargine dose by 2 units",
                "d. Decrease pre-breakfast lispro dose by 2 units"
              ],
              "answer": "b. Increase pre-lunch lispro dose by 2 units",
              "explanation": "Elevated pre-lunch glucose suggests insufficient prandial insulin coverage for breakfast; increasing lispro before lunch is appropriate."
            },
            {
              "stem": "Which of the following is NOT a recognized risk factor for type 2 diabetes mellitus according to WHO guidelines?",
              "options": [
                "a. Physical inactivity",
                "b. First-degree relative with diabetes",
                "c. BMI ≥ 25 kg/m²",
                "d. History of gestational diabetes"
              ],
              "answer": "c. BMI ≥ 25 kg/m²",
              "explanation": "BMI ≥ 25 kg/m² is a risk factor, but the question asks for a non-recognized factor; all listed options except BMI ≥ 25 are WHO-recognized risk factors."
            },
            {
              "stem": "A 70-year-old male with osteoarthritis uses ibuprofen 400 mg three times daily for knee pain. He has no history of peptic ulcer disease but takes aspirin 81 mg daily for cardiovascular prophylaxis. Which intervention is MOST appropriate to reduce GI toxicity risk?",
              "options": [
                "a. Add omeprazole 20 mg daily",
                "b. Switch ibuprofen to acetaminophen 1 g four times daily",
                "c. Increase ibuprofen dose to 600 mg three times daily for better efficacy",
                "d. Add misoprostol 200 mcg four times daily"
              ],
              "answer": "a. Add omeprazole 20 mg daily",
              "explanation": "Low-dose aspirin increases GI bleed risk; adding a PPI is the most appropriate gastroprotective strategy with NSAID use."
            },
            {
              "stem": "A 65-year-old male with chronic kidney disease (eGFR 35 mL/min/1.73m²) and gout presents with an acute flare. His physician prescribes naproxen 500 mg twice daily. Which is the MOST appropriate action for the pharmacist to take?",
              "options": [
                "a. Counsel on taking naproxen with food to reduce GI irritation",
                "b. Recommend reducing naproxen dose to 250 mg twice daily",
                "c. Advise against naproxen use due to renal impairment",
                "d. Suggest switching to colchicine 0.6 mg twice daily"
              ],
              "answer": "c. Advise against naproxen use due to renal impairment",
              "explanation": "Naproxen is contraindicated in moderate-severe renal impairment (eGFR < 60 mL/min/1.73m²) due to risk of further renal deterioration."
            },
            {
              "stem": "A 58-year-old female with type 2 diabetes (HbA1c 9.2%) is prescribed allopurinol for chronic tophaceous gout. Which counseling point is MOST important to prevent severe skin reactions?",
              "options": [
                "a. Take allopurinol with a full glass of water to prevent kidney stones",
                "b. Report any rash or itching immediately to the physician",
                "c. Limit fluid intake to reduce uric acid crystallization",
                "d. Take allopurinol on an empty stomach for better absorption"
              ],
              "answer": "b. Report any rash or itching immediately to the physician",
              "explanation": "Allopurinol can cause severe hypersensitivity reactions, including Stevens-Johnson syndrome; immediate reporting of rash is critical."
            },
            {
              "stem": "A community pharmacist is developing a diabetes education program for newly diagnosed patients. Which topic is LEAST relevant for inclusion in the initial session?",
              "options": [
                "a. Strategies to minimize cardiac risk factors",
                "b. Technique for mixing different types of insulin",
                "c. Facts on diabetes and its long-term complications",
                "d. Detailed carbohydrate counting with meal planning"
              ],
              "answer": "d. Detailed carbohydrate counting with meal planning",
              "explanation": "While important, detailed carbohydrate counting is typically covered in advanced sessions; initial education focuses on foundational knowledge."
            },
            {
              "stem": "A 60-year-old male with type 2 diabetes is scheduled for a CT scan with intravenous contrast. His current medications include metformin 1000 mg twice daily. Which is the MOST appropriate action regarding metformin?",
              "options": [
                "a. Continue metformin as scheduled",
                "b. Withhold metformin 48 hours before and after contrast",
                "c. Switch metformin to insulin temporarily",
                "d. Reduce metformin dose by 50% on the day of the procedure"
              ],
              "answer": "b. Withhold metformin 48 hours before and after contrast",
              "explanation": "Metformin should be withheld 48 hours before and after iodinated contrast to reduce risk of lactic acidosis."
            },
            {
              "stem": "A 50-year-old female with hypertension and type 2 diabetes is prescribed hydrochlorothiazide 25 mg daily. Which adverse effect is MOST likely to occur with this therapy?",
              "options": [
                "a. Hyperkalemia",
                "b. Hypoglycemia",
                "c. Hyperuricemia",
                "d. Weight gain"
              ],
              "answer": "c. Hyperuricemia",
              "explanation": "Thiazide diuretics can increase uric acid levels, precipitating gout in susceptible individuals."
            },
            {
              "stem": "A 40-year-old male with type 2 diabetes is prescribed glipizide. Which adverse effect should he be counseled about MOST prominently?",
              "options": [
                "a. Hypoglycemia",
                "b. Weight loss",
                "c. Gastrointestinal upset",
                "d. Photosensitivity"
              ],
              "answer": "a. Hypoglycemia",
              "explanation": "Sulfonylureas like glipizide carry a significant risk of hypoglycemia, especially in patients with irregular eating patterns."
            },
            {
              "stem": "A 72-year-old female with hyperthyroidism due to Graves’ disease is started on methimazole 10 mg daily. Which parameter should be monitored MOST closely during the first 2 weeks of therapy?",
              "options": [
                "a. Serum TSH",
                "b. White blood cell count",
                "c. Liver function tests",
                "d. Serum potassium"
              ],
              "answer": "b. White blood cell count",
              "explanation": "Methimazole can cause agranulocytosis; WBC monitoring is essential, especially in the first 2 months."
            },
            {
              "stem": "A 30-year-old female with newly diagnosed hypothyroidism (TSH 15 mIU/L) is started on levothyroxine 50 mcg daily. When should thyroid function tests be repeated to assess adequacy of dosing?",
              "options": [
                "a. 2 weeks",
                "b. 4–6 weeks",
                "c. 3 months",
                "d. 6 months"
              ],
              "answer": "b. 4–6 weeks",
              "explanation": "Thyroid function tests should be repeated 4–6 weeks after levothyroxine initiation or dose adjustment to assess therapeutic response."
            },
            {
              "stem": "A 65-year-old male with metastatic prostate cancer is receiving abiraterone acetate. Which endocrine adverse effect is MOST likely to occur with this therapy?",
              "options": [
                "a. Hyperthyroidism",
                "b. Hypothyroidism",
                "c. Hypercalcemia",
                "d. Hypocalcemia"
              ],
              "answer": "b. Hypothyroidism",
              "explanation": "Abiraterone inhibits CYP17A1, leading to increased ACTH and subsequent adrenal insufficiency, including hypothyroidism."
            },
            {
              "stem": "A 55-year-old female with rheumatoid arthritis is started on methotrexate 7.5 mg weekly. Which supplement should be co-prescribed to reduce toxicity risk?",
              "options": [
                "a. Vitamin B12",
                "b. Folic acid",
                "c. Vitamin D",
                "d. Iron"
              ],
              "answer": "b. Folic acid",
              "explanation": "Folic acid supplementation reduces methotrexate-induced hepatotoxicity and mucositis."
            },
            {
              "stem": "A 45-year-old male with type 2 diabetes and chronic kidney disease (eGFR 45 mL/min/1.73m²) is prescribed empagliflozin. Which adverse effect is MOST likely to occur?",
              "options": [
                "a. Hypoglycemia",
                "b. Hyperkalemia",
                "c. Genital mycotic infections",
                "d. Weight gain"
              ],
              "answer": "c. Genital mycotic infections",
              "explanation": "SGLT2 inhibitors like empagliflozin increase urinary glucose excretion, predisposing to genital fungal infections."
            },
            {
              "stem": "A 60-year-old female with breast cancer is receiving adjuvant chemotherapy with doxorubicin and cyclophosphamide. Which toxicity is MOST likely to occur with this regimen?",
              "options": [
                "a. Ototoxicity",
                "b. Cardiotoxicity",
                "c. Pulmonary fibrosis",
                "d. Nephrotoxicity"
              ],
              "answer": "b. Cardiotoxicity",
              "explanation": "Doxorubicin is cardiotoxic; lifetime cumulative dose limits are strictly enforced to prevent cardiomyopathy."
            },
            {
              "stem": "A 50-year-old male with Hodgkin lymphoma is receiving ABVD chemotherapy (doxorubicin, bleomycin, vinblastine, dacarbazine). Which drug in this regimen is MOST likely to cause pulmonary toxicity?",
              "options": [
                "a. Doxorubicin",
                "b. Bleomycin",
                "c. Vinblastine",
                "d. Dacarbazine"
              ],
              "answer": "b. Bleomycin",
              "explanation": "Bleomycin is associated with dose-dependent pulmonary fibrosis; lung function tests should be monitored."
            },
            {
              "stem": "A 35-year-old female with metastatic colorectal cancer is receiving FOLFOX chemotherapy (fluorouracil, oxaliplatin, leucovorin). Which adverse effect is MOST specific to oxaliplatin?",
              "options": [
                "a. Mucositis",
                "b. Peripheral neuropathy",
                "c. Cardiotoxicity",
                "d. Nephrotoxicity"
              ],
              "answer": "b. Peripheral neuropathy",
              "explanation": "Oxaliplatin commonly causes acute and chronic peripheral neuropathy, often dose-limiting."
            },
            {
              "stem": "A 70-year-old male with prostate cancer is receiving leuprolide for androgen deprivation therapy. Which endocrine adverse effect is MOST likely to occur?",
              "options": [
                "a. Hyperthyroidism",
                "b. Hypothyroidism",
                "c. Hypercalcemia",
                "d. Hypocalcemia"
              ],
              "answer": "b. Hypothyroidism",
              "explanation": "GnRH agonists like leuprolide can cause transient increases in TSH, leading to hypothyroidism."
            },
            {
              "stem": "A 40-year-old female with metastatic breast cancer is receiving trastuzumab. Which cardiac parameter should be monitored MOST closely?",
              "options": [
                "a. Serum potassium",
                "b. Left ventricular ejection fraction (LVEF)",
                "c. Serum magnesium",
                "d. Blood pressure"
              ],
              "answer": "b. Left ventricular ejection fraction (LVEF)",
              "explanation": "Trastuzumab is associated with cardiotoxicity; LVEF should be monitored before and during therapy."
            },
            {
              "stem": "A 55-year-old male with multiple myeloma is receiving bortezomib. Which adverse effect is MOST likely to occur with this therapy?",
              "options": [
                "a. Peripheral neuropathy",
                "b. Nephrotoxicity",
                "c. Hepatotoxicity",
                "d. Ototoxicity"
              ],
              "answer": "a. Peripheral neuropathy",
              "explanation": "Bortezomib commonly causes peripheral neuropathy, which can be dose-limiting."
            },
            {
              "stem": "A 60-year-old female with metastatic renal cell carcinoma is receiving sunitinib. Which adverse effect is MOST likely to occur?",
              "options": [
                "a. Hypothyroidism",
                "b. Hyperthyroidism",
                "c. Hypercalcemia",
                "d. Hypocalcemia"
              ],
              "answer": "a. Hypothyroidism",
              "explanation": "VEGF inhibitors like sunitinib can cause hypothyroidism due to decreased thyroid hormone synthesis."
            },
            {
              "stem": "A 45-year-old male with type 2 diabetes is prescribed pioglitazone. Which adverse effect should he be counseled about MOST prominently?",
              "options": [
                "a. Hypoglycemia",
                "b. Weight gain",
                "c. Gastrointestinal upset",
                "d. Photosensitivity"
              ],
              "answer": "b. Weight gain",
              "explanation": "Thiazolidinediones like pioglitazone can cause fluid retention and weight gain, exacerbating heart failure."
            },
            {
              "stem": "A 50-year-old female with metastatic melanoma is receiving ipilimumab. Which immune-related adverse effect is MOST likely to occur?",
              "options": [
                "a. Hyperthyroidism",
                "b. Hypothyroidism",
                "c. Hypercalcemia",
                "d. Hypocalcemia"
              ],
              "answer": "b. Hypothyroidism",
              "explanation": "CTLA-4 inhibitors like ipilimumab can cause immune-related endocrine dysfunction, including hypothyroidism."
            },
            {
              "stem": "A 65-year-old male with chronic lymphocytic leukemia is receiving ibrutinib. Which adverse effect is MOST likely to occur?",
              "options": [
                "a. Hyperkalemia",
                "b. Atrial fibrillation",
                "c. Hypocalcemia",
                "d. Nephrotoxicity"
              ],
              "answer": "b. Atrial fibrillation",
              "explanation": "Ibrutinib is associated with an increased risk of atrial fibrillation, requiring cardiac monitoring."
            },
            {
              "stem": "A 55-year-old female with metastatic breast cancer is receiving palbociclib. Which adverse effect is MOST likely to occur?",
              "options": [
                "a. Neutropenia",
                "b. Hypercalcemia",
                "c. Hypothyroidism",
                "d. Nephrotoxicity"
              ],
              "answer": "a. Neutropenia",
              "explanation": "CDK4/6 inhibitors like palbociclib commonly cause myelosuppression, particularly neutropenia."
            },
            {
              "stem": "A 40-year-old male with type 2 diabetes is prescribed canagliflozin. Which adverse effect is MOST likely to occur?",
              "options": [
                "a. Hypoglycemia",
                "b. Hyperkalemia",
                "c. Genital mycotic infections",
                "d. Weight gain"
              ],
              "answer": "c. Genital mycotic infections",
              "explanation": "SGLT2 inhibitors increase urinary glucose excretion, predisposing to genital fungal infections."
            },
            {
              "stem": "A 60-year-old female with rheumatoid arthritis is started on hydroxychloroquine. Which parameter should be monitored MOST closely?",
              "options": [
                "a. Serum potassium",
                "b. Liver function tests",
                "c. Visual acuity",
                "d. Serum creatinine"
              ],
              "answer": "c. Visual acuity",
              "explanation": "Hydroxychloroquine can cause irreversible retinal toxicity; regular ophthalmologic monitoring is required."
            },
            {
              "stem": "A 55-year-old male with metastatic prostate cancer is receiving enzalutamide. Which endocrine adverse effect is MOST likely to occur?",
              "options": [
                "a. Hyperthyroidism",
                "b. Hypothyroidism",
                "c. Hypercalcemia",
                "d. Hypocalcemia"
              ],
              "answer": "b. Hypothyroidism",
              "explanation": "Androgen receptor inhibitors like enzalutamide can cause hypothyroidism due to decreased thyroid hormone synthesis."
            },
            {
              "stem": "A 45-year-old female with metastatic colorectal cancer is receiving regorafenib. Which adverse effect is MOST likely to occur?",
              "options": [
                "a. Hyperthyroidism",
                "b. Hand-foot skin reaction",
                "c. Hypocalcemia",
                "d. Nephrotoxicity"
              ],
              "answer": "b. Hand-foot skin reaction",
              "explanation": "Regorafenib commonly causes hand-foot skin reaction, which can be dose-limiting."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 65-year-old male with chronic lymphocytic leukemia is receiving ibrutinib. (a) Identify two key adverse effects associated with ibrutinib therapy. (b) Outline two monitoring parameters required during ibrutinib treatment.",
              "modelAnswer": "a) Key adverse effects: 1) Atrial fibrillation; 2) Bleeding (e.g., epistaxis, bruising); 3) Hypertension; 4) Infections (due to immunosuppression). b) Monitoring parameters: 1) Electrocardiogram (ECG) and cardiac enzymes (to monitor for atrial fibrillation); 2) Blood pressure (to monitor for hypertension); 3) Complete blood count (CBC) to monitor for cytopenias; 4) Signs of bleeding (e.g., bruising, petechiae)."
            },
            {
              "stem": "A 45-year-old female with metastatic breast cancer is receiving trastuzumab. (a) Explain the mechanism of action of trastuzumab. (b) State two key adverse effects associated with trastuzumab therapy.",
              "modelAnswer": "a) Mechanism of action: Trastuzumab is a monoclonal antibody that binds to the extracellular domain of the human epidermal growth factor receptor 2 (HER2), inhibiting HER2-mediated signaling pathways and promoting antibody-dependent cellular cytotoxicity against HER2-overexpressing tumor cells. b) Key adverse effects: 1) Cardiotoxicity (e.g., reduced left ventricular ejection fraction); 2) Infusion-related reactions (e.g., fever, chills, dyspnea); 3) Pulmonary toxicity (rare); 4) Diarrhea."
            },
            {
              "stem": "A 55-year-old male with type 2 diabetes mellitus is prescribed empagliflozin. (a) Explain the mechanism of action of empagliflozin. (b) State two key adverse effects associated with empagliflozin therapy.",
              "modelAnswer": "a) Mechanism of action: Empagliflozin is an SGLT2 inhibitor that blocks glucose reabsorption in the proximal renal tubule, increasing urinary glucose excretion and lowering blood glucose levels. b) Key adverse effects: 1) Genital mycotic infections (e.g., candidiasis); 2) Urinary tract infections; 3) Hypotension (due to osmotic diuresis); 4) Increased LDL cholesterol."
            },
            {
              "stem": "A 60-year-old female with rheumatoid arthritis is started on hydroxychloroquine. (a) Explain the mechanism of action of hydroxychloroquine in rheumatoid arthritis. (b) State two key monitoring parameters required during hydroxychloroquine therapy.",
              "modelAnswer": "a) Mechanism of action: Hydroxychloroquine is a disease-modifying antirheumatic drug (DMARD) that inhibits lysosomal activity and antigen presentation, reducing inflammatory cytokine production and immune cell activation. b) Key monitoring parameters: 1) Ophthalmologic examination (baseline and every 6–12 months) to monitor for retinal toxicity; 2) Liver function tests (LFTs) to monitor for hepatotoxicity; 3) Complete blood count (CBC) to monitor for bone marrow suppression."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 58-year-old male with a history of type 2 diabetes mellitus (HbA1c 8.2%) and hypertension presents to the emergency department with confusion, polyuria, and polydipsia. His capillary blood glucose is 28 mmol/L, and arterial blood gas shows pH 7.25, bicarbonate 12 mmol/L, and anion gap 22. (a) Identify the most likely diagnosis. (b) Outline the stepwise management of this condition, including fluid resuscitation, insulin therapy, and electrolyte correction. (c) Describe two potential complications of aggressive fluid resuscitation in this patient.",
              "modelAnswer": "a) Diagnosis: Diabetic ketoacidosis (DKA), likely triggered by infection or non-adherence to diabetes medications.\n\nb) Stepwise management:\n1) Fluid resuscitation: Start with 0.9% normal saline (1 L over 1 hour), then reassess hydration status. If serum sodium is high (>150 mmol/L), switch to 0.45% saline. If glucose falls to 14–16 mmol/L, switch to 5% dextrose with 0.45% saline.\n2) Insulin therapy: Administer regular insulin 0.1 units/kg IV bolus, followed by 0.1 units/kg/hour continuous infusion. Target glucose reduction: 3–5 mmol/L/hour. Monitor glucose every 1–2 hours.\n3) Electrolyte correction: Monitor and correct potassium (aim for 4–5 mmol/L), phosphate, and magnesium as needed. Potassium replacement is typically required once urine output is confirmed and serum potassium is <5.3 mmol/L.\n4) Bicarbonate therapy: Only if pH <6.9 or severe acidosis (pH <7.0) with hemodynamic instability. Administer 100 mmol sodium bicarbonate in 400 mL water over 2 hours.\n5) Identify and treat precipitating factors (e.g., infection, missed insulin doses).\n\nc) Potential complications of aggressive fluid resuscitation:\n1) Cerebral edema: Rapid fluid shifts can lead to cerebral edema, especially in children or young adults. Monitor for altered mental status, headache, or seizures.\n2) Hypokalemia: Over-rapid insulin administration or excessive fluid resuscitation can precipitate hypokalemia, leading to arrhythmias or muscle weakness.\n3) Pulmonary edema: In patients with underlying cardiac disease, aggressive fluid resuscitation may precipitate pulmonary edema due to volume overload."
            },
            {
              "stem": "A 65-year-old female with metastatic breast cancer is receiving adjuvant chemotherapy with doxorubicin and cyclophosphamide (AC regimen). (a) Describe the mechanism of action of doxorubicin and cyclophosphamide. (b) Outline the key adverse effects associated with each drug. (c) Detail the monitoring required during and after therapy with these agents.",
              "modelAnswer": "a) Mechanism of action:\n- Doxorubicin: An anthracycline that intercalates into DNA, inhibiting topoisomerase II and generating free radicals, leading to DNA strand breaks and cell death.\n- Cyclophosphamide: An alkylating agent that forms DNA cross-links, inhibiting DNA replication and transcription, leading to cell death.\n\nb) Key adverse effects:\n- Doxorubicin: 1) Cardiotoxicity (dose-dependent cardiomyopathy); 2) Myelosuppression (neutropenia, thrombocytopenia); 3) Mucositis; 4) Alopecia; 5) Secondary malignancies (e.g., leukemia).\n- Cyclophosphamide: 1) Myelosuppression (neutropenia, thrombocytopenia); 2) Hemorrhagic cystitis (due to acrolein metabolite); 3) Nausea and vomiting; 4) Secondary malignancies (e.g., bladder cancer); 5) Infertility.\n\nc) Monitoring required:\n1) Cardiac monitoring: Baseline echocardiogram or MUGA scan before therapy; repeat every 200–300 mg/m² cumulative dose of doxorubicin. Monitor for signs of heart failure (e.g., dyspnea, peripheral edema).\n2) Hematologic monitoring: Complete blood count (CBC) before each cycle and as needed. Monitor for neutropenia, thrombocytopenia, and anemia.\n3) Renal and hepatic function: Baseline and periodic monitoring of serum creatinine, BUN, and liver function tests (LFTs).\n4) Urinalysis: Baseline and periodic urinalysis to monitor for hematuria (cyclophosphamide-induced hemorrhagic cystitis).\n5) Signs of infection: Monitor for fever, chills, or other signs of neutropenic fever.\n6) Hydration: Ensure adequate hydration before and after cyclophosphamide to reduce risk of hemorrhagic cystitis.\n7) Secondary malignancy screening: Long-term monitoring for secondary malignancies (e.g., leukemia, bladder cancer)."
            }
          ]
        }
      ]
    }
  },
  "exam-hospital-practice": {
    "1": {
      "title": "Hospital & Clinical Pharmacy Practice",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Which of the following is the PRIMARY responsibility of a hospital pharmacist in ensuring patient safety?",
              "options": [
                "a. Compounding intravenous admixtures",
                "b. Ensuring the availability of essential medicines",
                "c. Prescribing medications under collaborative practice agreements",
                "d. Conducting clinical trials for new drug formulations"
              ],
              "answer": "b. Ensuring the availability of essential medicines",
              "explanation": "The primary role of a hospital pharmacist in patient safety is to ensure the consistent availability of essential medicines, which prevents stockouts and supports uninterrupted therapy."
            },
            {
              "stem": "Which statement BEST describes the role of the Medicines and Therapeutics Committee (MTC) in a hospital?",
              "options": [
                "a. It is responsible for the direct administration of medications to patients",
                "b. It influences the implementation of evidence-based care in the hospital",
                "c. It manages the hospital's financial budget for drug procurement",
                "d. It conducts clinical trials for new drug formulations"
              ],
              "answer": "b. It influences the implementation of evidence-based care in the hospital",
              "explanation": "The MTC is a governance body that reviews and approves policies, formularies, and protocols to ensure evidence-based medication use in the hospital."
            },
            {
              "stem": "A pharmacist reviewing a patient's medication chart identifies a potential drug-drug interaction between warfarin and amoxicillin. What is the MOST appropriate immediate action?",
              "options": [
                "a. Discontinue amoxicillin immediately",
                "b. Adjust the warfarin dose based on INR results",
                "c. Document the interaction and monitor for signs of bleeding",
                "d. Refer the patient to the prescriber for urgent review"
              ],
              "answer": "d. Refer the patient to the prescriber for urgent review",
              "explanation": "The pharmacist should alert the prescriber to the interaction, as warfarin requires close monitoring and dose adjustment when combined with antibiotics like amoxicillin."
            },
            {
              "stem": "Which of the following is a key component of medication reconciliation in a hospital setting?",
              "options": [
                "a. Verifying the patient's insurance coverage for medications",
                "b. Comparing the patient's current medication list with their home medications",
                "c. Ensuring the patient receives all prescribed medications before discharge",
                "d. Documenting the patient's adherence to their medication regimen"
              ],
              "answer": "b. Comparing the patient's current medication list with their home medications",
              "explanation": "Medication reconciliation involves comparing the patient's current medication list with their home medications to identify discrepancies and prevent errors."
            },
            {
              "stem": "A patient presents with symptoms of acute kidney injury after starting a new medication. Which of the following drugs is MOST likely responsible?",
              "options": [
                "a. Atorvastatin",
                "b. Enalapril",
                "c. Lorazepam",
                "d. Lactulose"
              ],
              "answer": "b. Enalapril",
              "explanation": "Enalapril, an ACE inhibitor, can cause acute kidney injury, especially in patients with pre-existing renal impairment or those taking diuretics or NSAIDs."
            },
            {
              "stem": "Which of the following is a common cause of medication errors in hospital pharmacies?",
              "options": [
                "a. Use of non-proprietary drug names in prescriptions",
                "b. Lack of standardized medication administration records",
                "c. Regular review of medication charts by pharmacists",
                "d. Use of unit-dose drug distribution systems"
              ],
              "answer": "b. Lack of standardized medication administration records",
              "explanation": "Standardized medication administration records reduce ambiguity and errors in drug administration, particularly in high-volume settings."
            },
            {
              "stem": "A pharmacist is counseling a patient on the use of an inhaler for asthma. Which of the following is the MOST important counseling point?",
              "options": [
                "a. The inhaler should be stored in the refrigerator",
                "b. The patient should rinse their mouth after use to prevent oral candidiasis",
                "c. The inhaler should be used only when symptoms are severe",
                "d. The patient should increase the dose if symptoms worsen"
              ],
              "answer": "b. The patient should rinse their mouth after use to prevent oral candidiasis",
              "explanation": "Rinsing the mouth after inhaler use reduces the risk of oral candidiasis, a common side effect of inhaled corticosteroids."
            },
            {
              "stem": "Which of the following is a TRUE statement about proprietary drug names?",
              "options": [
                "a. They are the same as non-proprietary (generic) names",
                "b. They are unique to a specific manufacturer and cannot be substituted",
                "c. They are less expensive than generic equivalents",
                "d. They are preferred in hospital formularies for cost savings"
              ],
              "answer": "b. They are unique to a specific manufacturer and cannot be substituted",
              "explanation": "Proprietary names are brand names assigned by manufacturers and are not interchangeable with generic names."
            },
            {
              "stem": "A patient with a history of penicillin allergy is prescribed amoxicillin. What is the MOST appropriate action for the pharmacist?",
              "options": [
                "a. Administer the amoxicillin as prescribed",
                "b. Substitute amoxicillin with a cephalosporin",
                "c. Document the allergy and withhold the amoxicillin",
                "d. Contact the prescriber to discuss an alternative antibiotic"
              ],
              "answer": "d. Contact the prescriber to discuss an alternative antibiotic",
              "explanation": "Penicillin allergies are a contraindication for amoxicillin, and an alternative antibiotic should be considered."
            },
            {
              "stem": "Which of the following is a key responsibility of a pharmacist in a satellite pharmacy?",
              "options": [
                "a. Conducting clinical trials for new drugs",
                "b. Managing inventory and dispensing medications for a specific clinical unit",
                "c. Prescribing medications under collaborative practice agreements",
                "d. Performing surgical procedures in the operating room"
              ],
              "answer": "b. Managing inventory and dispensing medications for a specific clinical unit",
              "explanation": "A satellite pharmacy is a decentralized pharmacy located in or near a clinical unit to manage inventory and dispensing for that unit."
            },
            {
              "stem": "A patient is prescribed nitrofurantoin for a urinary tract infection. Which of the following monitoring parameters is MOST important?",
              "options": [
                "a. Liver function tests",
                "b. Renal function tests",
                "c. Electrocardiogram (ECG)",
                "d. Complete blood count (CBC)"
              ],
              "answer": "b. Renal function tests",
              "explanation": "Nitrofurantoin is nephrotoxic, and renal function should be monitored, especially in elderly patients or those with pre-existing renal impairment."
            },
            {
              "stem": "Which of the following is a TRUE statement about the unit-dose drug distribution system?",
              "options": [
                "a. It increases the risk of medication errors",
                "b. It requires pharmacists to compound all medications on-site",
                "c. It improves medication safety by reducing the risk of wrong-dose errors",
                "d. It is only used in community pharmacies"
              ],
              "answer": "c. It improves medication safety by reducing the risk of wrong-dose errors",
              "explanation": "The unit-dose system pre-packages medications for individual patients, reducing the risk of errors during administration."
            },
            {
              "stem": "A pharmacist is reviewing a patient's medication list and identifies a potential duplicate therapy with two ACE inhibitors. Which of the following drugs is MOST likely involved?",
              "options": [
                "a. Enalapril and losartan",
                "b. Atorvastatin and simvastatin",
                "c. Lorazepam and phenytoin",
                "d. Pethidine and dexamethasone"
              ],
              "answer": "a. Enalapril and losartan",
              "explanation": "Enalapril and losartan are both ACE inhibitors or ARBs, and their concurrent use can lead to hyperkalemia and renal impairment."
            },
            {
              "stem": "Which of the following is a TRUE statement about pharmacy records in a hospital setting?",
              "options": [
                "a. They are only used for billing purposes",
                "b. They include the patient's medication administration record (MAR)",
                "c. They are not required to be maintained for legal purposes",
                "d. They are only accessible to physicians"
              ],
              "answer": "b. They include the patient's medication administration record (MAR)",
              "explanation": "Pharmacy records include the MAR, which documents the administration of medications to patients."
            },
            {
              "stem": "A patient is prescribed dexamethasone for a severe allergic reaction. Which of the following is a common adverse effect of dexamethasone?",
              "options": [
                "a. Hypoglycemia",
                "b. Hyperkalemia",
                "c. Increased appetite and weight gain",
                "d. Bradycardia"
              ],
              "answer": "c. Increased appetite and weight gain",
              "explanation": "Dexamethasone, a corticosteroid, commonly causes increased appetite, weight gain, and other metabolic effects."
            },
            {
              "stem": "Which of the following is a TRUE statement about medication errors?",
              "options": [
                "a. They are always caused by the pharmacist",
                "b. They can result in adverse drug reactions or wrong-dose administration",
                "c. They are only a concern in community pharmacies",
                "d. They do not require documentation or reporting"
              ],
              "answer": "b. They can result in adverse drug reactions or wrong-dose administration",
              "explanation": "Medication errors can lead to adverse drug reactions, wrong-dose administration, or other patient harm."
            },
            {
              "stem": "A pharmacist is counseling a patient on the use of atorvastatin for hypercholesterolemia. Which of the following is the MOST important counseling point?",
              "options": [
                "a. The medication should be taken with grapefruit juice for better absorption",
                "b. The patient should report any muscle pain or weakness immediately",
                "c. The medication can be stopped once cholesterol levels normalize",
                "d. The medication should be taken only at night"
              ],
              "answer": "b. The patient should report any muscle pain or weakness immediately",
              "explanation": "Atorvastatin can cause myopathy, and patients should report muscle pain or weakness to monitor for this adverse effect."
            },
            {
              "stem": "Which of the following is a TRUE statement about the role of a pharmacist in medication review?",
              "options": [
                "a. It is limited to verifying the accuracy of medication orders",
                "b. It involves assessing the appropriateness and safety of the medication regimen",
                "c. It is only performed at discharge",
                "d. It does not include patient education"
              ],
              "answer": "b. It involves assessing the appropriateness and safety of the medication regimen",
              "explanation": "Medication review involves a comprehensive assessment of the patient's medication regimen for appropriateness, safety, and adherence."
            },
            {
              "stem": "A patient is prescribed phenytoin for seizure control. Which of the following is a common adverse effect of phenytoin?",
              "options": [
                "a. Hypotension",
                "b. Gingival hyperplasia",
                "c. Hyperglycemia",
                "d. Bradycardia"
              ],
              "answer": "b. Gingival hyperplasia",
              "explanation": "Phenytoin, an anticonvulsant, commonly causes gingival hyperplasia as an adverse effect."
            },
            {
              "stem": "Which of the following is a TRUE statement about the floor stock drug distribution system?",
              "options": [
                "a. It reduces the risk of medication errors",
                "b. It is used exclusively in community pharmacies",
                "c. It involves storing medications in patient care areas for immediate use",
                "d. It is the most cost-effective system for all hospitals"
              ],
              "answer": "c. It involves storing medications in patient care areas for immediate use",
              "explanation": "The floor stock system stores medications in patient care areas for immediate use, which can increase the risk of errors if not managed properly."
            },
            {
              "stem": "A pharmacist is reviewing a patient's medication list and identifies a potential drug-food interaction with warfarin. Which of the following foods should the patient avoid?",
              "options": [
                "a. Green leafy vegetables",
                "b. Citrus fruits",
                "c. Dairy products",
                "d. Grapefruit juice"
              ],
              "answer": "a. Green leafy vegetables",
              "explanation": "Green leafy vegetables are high in vitamin K, which can reduce the anticoagulant effect of warfarin."
            },
            {
              "stem": "Which of the following is a TRUE statement about the role of a pharmacist in vaccination programs?",
              "options": [
                "a. Pharmacists are not authorized to administer vaccines",
                "b. Pharmacists can prescribe and administer vaccines according to local regulations",
                "c. Vaccines are only administered in hospitals",
                "d. Vaccines are administered subcutaneously in the gluteal muscle"
              ],
              "answer": "b. Pharmacists can prescribe and administer vaccines according to local regulations",
              "explanation": "Pharmacists are increasingly authorized to prescribe and administer vaccines, depending on local regulations."
            },
            {
              "stem": "A patient is prescribed pethidine for acute pain. Which of the following is a common adverse effect of pethidine?",
              "options": [
                "a. Hypertension",
                "b. Respiratory depression",
                "c. Hypoglycemia",
                "d. Bradycardia"
              ],
              "answer": "b. Respiratory depression",
              "explanation": "Pethidine, an opioid analgesic, can cause respiratory depression, especially in high doses or with prolonged use."
            },
            {
              "stem": "Which of the following is a TRUE statement about the role of a pharmacist in drug therapy monitoring?",
              "options": [
                "a. It is limited to checking serum drug levels",
                "b. It involves assessing the patient's response to therapy and identifying adverse effects",
                "c. It is only performed by physicians",
                "d. It does not include patient education"
              ],
              "answer": "b. It involves assessing the patient's response to therapy and identifying adverse effects",
              "explanation": "Drug therapy monitoring involves assessing the patient's response to therapy, identifying adverse effects, and optimizing treatment."
            },
            {
              "stem": "A pharmacist is counseling a patient on the use of lactulose for constipation. Which of the following is a common adverse effect of lactulose?",
              "options": [
                "a. Hypertension",
                "b. Flatulence and abdominal distension",
                "c. Hypoglycemia",
                "d. Bradycardia"
              ],
              "answer": "b. Flatulence and abdominal distension",
              "explanation": "Lactulose, an osmotic laxative, commonly causes flatulence and abdominal distension as adverse effects."
            },
            {
              "stem": "Which of the following is a TRUE statement about the role of a pharmacist in medication reconciliation?",
              "options": [
                "a. It is only performed at discharge",
                "b. It involves comparing the patient's current medication list with their home medications",
                "c. It does not include patient education",
                "d. It is only performed by physicians"
              ],
              "answer": "b. It involves comparing the patient's current medication list with their home medications",
              "explanation": "Medication reconciliation involves comparing the patient's current medication list with their home medications to identify discrepancies and prevent errors."
            },
            {
              "stem": "A patient is prescribed carvedilol for hypertension. Which of the following is a common adverse effect of carvedilol?",
              "options": [
                "a. Tachycardia",
                "b. Bradycardia",
                "c. Hypertension",
                "d. Hyperglycemia"
              ],
              "answer": "b. Bradycardia",
              "explanation": "Carvedilol, a non-selective beta-blocker, commonly causes bradycardia as an adverse effect."
            },
            {
              "stem": "Which of the following is a TRUE statement about the role of a pharmacist in patient counseling?",
              "options": [
                "a. It is synonymous with patient education",
                "b. It is preventive in nature and applicable to prescription and non-prescription medications",
                "c. It is only documented when required by law",
                "d. It does not include assessing the patient's understanding of their medications"
              ],
              "answer": "b. It is preventive in nature and applicable to prescription and non-prescription medications",
              "explanation": "Patient counseling is preventive and educational, applicable to all medications, and often documented for legal and professional purposes."
            },
            {
              "stem": "A pharmacist is reviewing a patient's medication list and identifies a potential drug-disease interaction with metformin and chronic kidney disease. What is the MOST appropriate action?",
              "options": [
                "a. Continue metformin as prescribed",
                "b. Adjust the metformin dose based on renal function",
                "c. Discontinue metformin immediately",
                "d. Refer the patient to a nephrologist for further evaluation"
              ],
              "answer": "b. Adjust the metformin dose based on renal function",
              "explanation": "Metformin is contraindicated in severe renal impairment, and the dose should be adjusted based on renal function."
            },
            {
              "stem": "Which of the following is a TRUE statement about the role of a pharmacist in medication safety?",
              "options": [
                "a. It is limited to verifying medication orders",
                "b. It involves identifying and preventing medication errors and adverse drug reactions",
                "c. It is only performed by physicians",
                "d. It does not include patient education"
              ],
              "answer": "b. It involves identifying and preventing medication errors and adverse drug reactions",
              "explanation": "Medication safety involves identifying and preventing medication errors, adverse drug reactions, and other patient harm."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "List FIVE key purposes of maintaining accurate pharmacy records in a hospital setting.",
              "modelAnswer": "1. Legal and regulatory compliance (e.g., documenting drug administration and dispensing).\n2. Facilitating continuity of care by providing a complete medication history.\n3. Supporting medication reconciliation and preventing medication errors.\n4. Enabling audits and quality assurance activities.\n5. Providing data for research, education, and performance improvement."
            },
            {
              "stem": "A 65-year-old patient with type 2 diabetes mellitus is admitted to the hospital with uncontrolled hyperglycemia. The patient's home medications include metformin 1000 mg twice daily and glimepiride 4 mg daily. The pharmacist reviews the patient's medication chart and notes that metformin has been discontinued and insulin glargine has been initiated. What are FIVE possible reasons for this change, and what action should the pharmacist take?",
              "modelAnswer": "Possible reasons for the change:\n1. Worsening renal function (metformin is contraindicated in severe renal impairment).\n2. Acute illness or stress hyperglycemia requiring insulin therapy.\n3. Poor glycemic control despite oral hypoglycemic agents.\n4. Contraindication to metformin (e.g., lactic acidosis risk).\n5. Need for tighter glycemic control in a hospitalized patient.\n\nAction for the pharmacist:\n- Verify the reason for the change with the prescriber.\n- Ensure the patient is educated on insulin administration and monitoring.\n- Document the rationale for the change in the patient's medication record.\n- Monitor the patient's blood glucose levels and adjust therapy as needed."
            },
            {
              "stem": "Outline FIVE common mistakes that can occur during prescription processing in a hospital pharmacy.",
              "modelAnswer": "1. Illegible or incomplete prescriptions leading to misinterpretation.\n2. Incorrect transcription of medication orders (e.g., wrong dose, route, or frequency).\n3. Failure to check for drug allergies or contraindications.\n4. Dispensing the wrong medication or formulation (e.g., extended-release vs. immediate-release).\n5. Lack of verification of medication orders by a pharmacist before dispensing."
            },
            {
              "stem": "Describe FIVE routine pharmacy-based screening tests that pharmacists can perform in a community or hospital setting.",
              "modelAnswer": "1. Blood pressure measurement (e.g., for patients on antihypertensives).\n2. Blood glucose monitoring (e.g., for diabetic patients).\n3. INR testing (e.g., for patients on warfarin).\n4. Cholesterol screening (e.g., lipid profile for patients on statins).\n5. Point-of-care testing for urinary tract infections (e.g., dipstick urinalysis)."
            },
            {
              "stem": "Why is it important for a pharmacist to be well-versed in poison information? Provide FOUR reasons.",
              "modelAnswer": "1. To provide accurate and timely information to healthcare professionals and patients in cases of poisoning or overdose.\n2. To guide appropriate management, including antidote administration and supportive care.\n3. To prevent medication errors and adverse drug reactions by identifying potential toxicities.\n4. To support public health initiatives, such as poison control programs and poison prevention education."
            },
            {
              "stem": "State the use of each of the following medical devices:\na. Catheters\nb. Osmotic pumps\nc. Dialysis machines",
              "modelAnswer": "a. Catheters: Used for draining fluids (e.g., urinary catheters for bladder drainage) or administering medications/infusions (e.g., intravenous catheters).\n\nb. Osmotic pumps: Used for controlled, long-term drug delivery (e.g., insulin pumps for diabetes management or chemotherapy pumps for cancer treatment).\n\nc. Dialysis machines: Used to filter waste products and excess fluids from the blood in patients with kidney failure (e.g., hemodialysis or peritoneal dialysis)."
            },
            {
              "stem": "Discuss FIVE ethical issues relating to the provision of drug information by pharmacists.",
              "modelAnswer": "1. Confidentiality: Ensuring patient privacy when discussing medication histories or sensitive health information.\n2. Autonomy: Respecting the patient's right to make informed decisions about their treatment.\n3. Beneficence: Providing information that benefits the patient's health and well-being.\n4. Non-maleficence: Avoiding harm by ensuring accurate, evidence-based drug information is provided.\n5. Justice: Ensuring equitable access to drug information for all patients, regardless of socioeconomic status or background."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Discuss the following aspects of institutional pharmacy:\na. Essential functions of a hospital pharmacy (5 marks)\nb. Management of controlled drugs (5 marks)\nc. Quality assurance and quality control of medicines (5 marks)",
              "modelAnswer": "a. Essential functions of a hospital pharmacy:\n1. **Medication procurement and supply:** Ensuring the availability of essential medicines, including formulary management and procurement.\n2. **Dispensing and distribution:** Accurate dispensing and distribution of medications using systems like unit-dose or floor stock.\n3. **Clinical pharmacy services:** Providing direct patient care through medication review, reconciliation, and therapeutic drug monitoring.\n4. **Drug information and education:** Offering evidence-based drug information to healthcare professionals and patients.\n5. **Pharmacy administration and governance:** Managing pharmacy operations, policies, and compliance with regulatory standards.\n\nb. Management of controlled drugs:\n1. **Storage and security:** Controlled drugs must be stored in locked, secure cabinets with restricted access to authorized personnel only.\n2. **Inventory control:** Regular audits and reconciliation of controlled substances to prevent diversion or loss.\n3. **Prescription requirements:** Ensuring prescriptions for controlled drugs meet legal and regulatory requirements (e.g., DEA or local equivalents).\n4. **Documentation and reporting:** Maintaining accurate records of controlled drug transactions, including dispensing, administration, and waste disposal.\n5. **Compliance and training:** Ensuring staff are trained in the proper handling, storage, and disposal of controlled substances.\n\nc. Quality assurance and quality control of medicines:\n1. **Medication selection and formulary management:** Ensuring the hospital formulary includes safe, effective, and cost-effective medications.\n2. **Procurement and supply chain management:** Working with reputable suppliers to ensure the quality and authenticity of medicines.\n3. **Storage and handling:** Adhering to manufacturer guidelines for storage conditions (e.g., temperature, light) to maintain drug stability.\n4. **Dispensing accuracy:** Implementing double-check systems and technology (e.g., barcoding) to reduce dispensing errors.\n5. **Monitoring and reporting:** Regularly reviewing medication-related incidents, adverse drug reactions, and near-misses to identify trends and implement corrective actions."
            },
            {
              "stem": "With regard to community pharmacy practice, discuss the following:\na. Responsibilities of a pharmacist (10 marks)\nb. Consultation styles (5 marks)",
              "modelAnswer": "a. Responsibilities of a pharmacist in community pharmacy practice:\n1. **Dispensing medications:** Accurately dispensing prescription and over-the-counter medications, ensuring proper labeling and patient counseling.\n2. **Patient education and counseling:** Providing information on medication use, side effects, and adherence to improve patient outcomes.\n3. **Medication review and reconciliation:** Reviewing patients' medication lists to identify potential drug interactions, duplications, or non-adherence.\n4. **Health screening and promotion:** Conducting health screenings (e.g., blood pressure, cholesterol) and promoting healthy lifestyle choices.\n5. **Vaccination services:** Administering vaccines (e.g., influenza, COVID-19) as authorized by local regulations.\n6. **Over-the-counter (OTC) recommendations:** Providing evidence-based advice on OTC medications for minor ailments.\n7. **Chronic disease management:** Supporting patients with chronic conditions (e.g., diabetes, hypertension) through medication management and lifestyle advice.\n8. **Medication adherence support:** Using tools like pill organizers or adherence packaging to improve patient compliance.\n9. **Drug information provision:** Offering accurate, up-to-date drug information to patients and healthcare professionals.\n10. **Legal and regulatory compliance:** Ensuring compliance with local laws and regulations regarding pharmacy practice and medication dispensing.\n\nb. Consultation styles:\n1. **Patient-centered approach:** Focusing on the patient's needs, concerns, and preferences to build rapport and trust.\n2. **Structured counseling:** Using a systematic approach (e.g., the \"Ask-Tell-Ask\" method) to ensure key information is communicated effectively.\n3. **Motivational interviewing:** Encouraging patients to take an active role in their treatment by exploring their motivations and barriers to adherence.\n4. **Teach-back method:** Asking patients to repeat back instructions to confirm their understanding.\n5. **Empathetic communication:** Using active listening and empathy to address patient concerns and improve engagement."
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Hospital & Clinical Pharmacy Practice",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Which of the following is the PRIMARY responsibility of a hospital pharmacist in ensuring patient safety?",
              "options": [
                "Compounding intravenous admixtures",
                "Ensuring the availability of essential medicines",
                "Prescribing medications under protocol",
                "Conducting clinical trials in the hospital"
              ],
              "answer": "Ensuring the availability of essential medicines",
              "explanation": "The primary responsibility of a hospital pharmacist is to ensure the availability of essential medicines to support patient care and safety."
            },
            {
              "stem": "Which statement BEST describes the role of the Medicines and Therapeutics Committee (MTC) in a hospital?",
              "options": [
                "It is responsible for the direct administration of medications to patients.",
                "It influences the implementation of evidence-based care in the hospital.",
                "It manages the hospital's financial budget for pharmacy services.",
                "It is tasked with the procurement of medical devices only."
              ],
              "answer": "It influences the implementation of evidence-based care in the hospital.",
              "explanation": "The MTC plays a key role in promoting evidence-based medicine and standardizing drug therapy policies within the hospital."
            },
            {
              "stem": "A hospital pharmacist reviewing a patient's medication chart identifies a potential drug-drug interaction between warfarin and amoxicillin. What is the MOST appropriate action?",
              "options": [
                "Ignore the interaction as it is clinically insignificant.",
                "Adjust the warfarin dose and monitor INR closely.",
                "Discontinue amoxicillin immediately.",
                "Refer the patient to the physician for review."
              ],
              "answer": "Refer the patient to the physician for review.",
              "explanation": "The pharmacist should alert the prescriber to the interaction and recommend appropriate monitoring or dose adjustments."
            },
            {
              "stem": "Which of the following is a key component of medication reconciliation in a hospital setting?",
              "options": [
                "Ensuring the patient receives the cheapest available medication.",
                "Comparing the patient's current medication list with their home medications.",
                "Prescribing medications based on the hospital formulary.",
                "Dispensing medications without patient counseling."
              ],
              "answer": "Comparing the patient's current medication list with their home medications.",
              "explanation": "Medication reconciliation involves verifying and documenting all medications a patient is taking to prevent errors during transitions of care."
            },
            {
              "stem": "A patient presents with symptoms of acute kidney injury after starting a new medication. Which of the following drugs is MOST likely responsible?",
              "options": [
                "Atorvastatin",
                "Enalapril",
                "Lactulose",
                "Dexamethasone"
              ],
              "answer": "Enalapril",
              "explanation": "ACE inhibitors like enalapril can cause acute kidney injury, especially in patients with pre-existing renal impairment or those taking diuretics."
            },
            {
              "stem": "Which of the following is a TRUE statement regarding rational prescribing?",
              "options": [
                "Prescriptions should always be written using proprietary drug names.",
                "The shortest effective duration of treatment should be prescribed to minimize adverse effects.",
                "Expert opinion should always override current clinical evidence.",
                "Patients must adhere strictly to the prescribed medication without exception."
              ],
              "answer": "The shortest effective duration of treatment should be prescribed to minimize adverse effects.",
              "explanation": "Rational prescribing emphasizes using the lowest effective dose for the shortest necessary duration to minimize risks and improve adherence."
            },
            {
              "stem": "A pharmacist is asked to screen a patient for potential drug allergies. Which of the following is the MOST appropriate action?",
              "options": [
                "Perform a skin prick test for all medications.",
                "Review the patient's medication history for documented allergies.",
                "Administer a test dose of the suspected medication.",
                "Prescribe an antihistamine to prevent allergic reactions."
              ],
              "answer": "Review the patient's medication history for documented allergies.",
              "explanation": "Screening for drug allergies involves reviewing documented allergies and cross-referencing with prescribed medications to avoid adverse reactions."
            },
            {
              "stem": "Which of the following is NOT considered a medication error?",
              "options": [
                "Administering a dose 30 minutes late.",
                "Prescribing a medication to which the patient has a known allergy.",
                "A patient experiencing an adverse drug reaction that was unavoidable.",
                "Dispensing a medication with the wrong strength."
              ],
              "answer": "A patient experiencing an adverse drug reaction that was unavoidable.",
              "explanation": "Medication errors are preventable events, whereas unavoidable adverse drug reactions are not classified as errors."
            },
            {
              "stem": "When prescribing a medication, which of the following names should be used to ensure clarity and avoid confusion?",
              "options": [
                "Brand name",
                "Chemical name",
                "Non-proprietary (generic) name",
                "Manufacturer's code"
              ],
              "answer": "Non-proprietary (generic) name",
              "explanation": "Using the non-proprietary (generic) name reduces confusion and ensures consistency in prescribing and dispensing."
            },
            {
              "stem": "Which of the following is a TRUE statement regarding pharmacy records in a hospital?",
              "options": [
                "They are only used for billing purposes.",
                "They provide data for research and education.",
                "They do not include patient allergies.",
                "They are maintained only by the nursing staff."
              ],
              "answer": "They provide data for research and education.",
              "explanation": "Pharmacy records are essential for clinical audits, research, education, and ensuring continuity of care."
            },
            {
              "stem": "The need for a hospital formulary system is increasing due to:",
              "options": [
                "The increasing number of drugs available in the market.",
                "The requirement for all hospitals to use only branded medications.",
                "The need to reduce competition among drug manufacturers.",
                "The regulatory requirement for hospitals to stock all medications."
              ],
              "answer": "The increasing number of drugs available in the market.",
              "explanation": "A formulary system helps manage the growing number of available drugs by promoting evidence-based selection and cost-effective use."
            },
            {
              "stem": "Which of the following medical devices is correctly matched with its function?",
              "options": [
                "Stethoscope — Measuring blood pressure",
                "Pulse oximeter — Detecting electrical activity of the heart",
                "Sphygmomanometer — Auscultating heart and lung sounds",
                "Defibrillator — Delivering an electric shock to the heart"
              ],
              "answer": "Defibrillator — Delivering an electric shock to the heart",
              "explanation": "A defibrillator is used to deliver an electric shock to restore normal heart rhythm in cases of cardiac arrest."
            },
            {
              "stem": "In which drug distribution system are both the pharmacy and nursing station responsible for drug storage and dispensing?",
              "options": [
                "Floor stock system",
                "Unit dose system",
                "Combination system",
                "Individual prescription order system"
              ],
              "answer": "Combination system",
              "explanation": "In a combination system, medications are stored in both the pharmacy and nursing stations to balance efficiency and safety."
            },
            {
              "stem": "A satellite pharmacy in a hospital is typically located:",
              "options": [
                "On each patient floor",
                "At a central location in the hospital",
                "In the sterile processing unit",
                "In the hospital's main pharmacy"
              ],
              "answer": "On each patient floor",
              "explanation": "Satellite pharmacies are decentralized units located on patient floors to improve access to medications and clinical pharmacy services."
            },
            {
              "stem": "Which of the following statements regarding vaccines is FALSE?",
              "options": [
                "The Kenyan EPI schedule includes vaccination at birth, 6 weeks, 10 weeks, and 14 weeks.",
                "Pharmacists are authorized to prescribe and administer vaccines in Kenya.",
                "Vaccines are routinely administered in the deltoid muscle.",
                "Oral Polio Vaccine (OPV) should be stored frozen at -20°C."
              ],
              "answer": "Oral Polio Vaccine (OPV) should be stored frozen at -20°C.",
              "explanation": "OPV should be stored refrigerated (2-8°C), not frozen, to maintain its potency."
            },
            {
              "stem": "Which of the following is NOT a component of a pharmaceutical consultation?",
              "options": [
                "Monitoring of drug therapy",
                "Counseling the patient on drug use",
                "Procuring drugs from the drug store",
                "Taking a patient's medication history"
              ],
              "answer": "Procuring drugs from the drug store",
              "explanation": "Procuring drugs is a dispensing function, not a component of a pharmaceutical consultation."
            },
            {
              "stem": "Which of the following patients is at the HIGHEST risk of suffering from an adverse drug reaction?",
              "options": [
                "A 6-month-old infant receiving amoxicillin for an ear infection",
                "A 25-year-old patient with asthma receiving inhaled corticosteroids",
                "A 50-year-old patient with hypertension receiving an ACE inhibitor",
                "A 70-year-old patient with chronic kidney disease receiving a diuretic"
              ],
              "answer": "A 70-year-old patient with chronic kidney disease receiving a diuretic",
              "explanation": "Elderly patients with renal impairment are at higher risk of adverse drug reactions due to altered drug metabolism and excretion."
            },
            {
              "stem": "A 35-year-old man presents to the pharmacy complaining of upper abdominal pain and vomiting for three days. He reports yellowing of the eyes. What is the MOST appropriate course of action?",
              "options": [
                "Prescribe an antacid to relieve symptoms.",
                "Identify and withdraw the causative medication.",
                "Refer him for further medical assessment.",
                "Advise him to stop using over-the-counter analgesics."
              ],
              "answer": "Refer him for further medical assessment.",
              "explanation": "Jaundice and abdominal pain are red flags that require urgent medical evaluation to rule out serious conditions like drug-induced liver injury."
            },
            {
              "stem": "The role of the pharmacist in selecting therapeutic alternatives requires which of the following skills?",
              "options": [
                "Performance of drug utilization evaluation",
                "Ability to counsel patients on drug adherence",
                "Review and critique drug literature",
                "All of the above"
              ],
              "answer": "All of the above",
              "explanation": "Selecting therapeutic alternatives involves evaluating drug use, counseling patients, and critically appraising drug literature."
            },
            {
              "stem": "Which of the following is TRUE regarding the preparation of cytotoxic drugs?",
              "options": [
                "They can be prepared in a regular laminar flow hood.",
                "They require cold chain storage conditions.",
                "Personal protective equipment is not required.",
                "They do not require segregation of chemotherapy waste."
              ],
              "answer": "They require cold chain storage conditions.",
              "explanation": "Cytotoxic drugs often require specific storage conditions, including cold chain, to maintain stability and efficacy."
            },
            {
              "stem": "Which of the following parameters is the MOST reliable for calculating pediatric doses?",
              "options": [
                "Age",
                "Body weight",
                "Height",
                "Surface area"
              ],
              "answer": "Surface area",
              "explanation": "Body surface area (BSA) is the most accurate method for calculating pediatric doses, especially for drugs with narrow therapeutic indices."
            },
            {
              "stem": "Which of the following explains the purpose of using a stethoscope?",
              "options": [
                "To ascertain the character of breath sounds",
                "To detect any added sounds",
                "To determine whether breath sounds are equal on both sides",
                "All of the above"
              ],
              "answer": "All of the above",
              "explanation": "A stethoscope is used to auscultate breath sounds, detect abnormal sounds, and compare sounds between both sides of the chest."
            },
            {
              "stem": "Which of the following is NOT a component of a pharmaceutical consultation?",
              "options": [
                "Monitoring of drug therapy",
                "Counseling the patient on drug use",
                "Procuring drugs from the drug store",
                "Taking a patient's medication history"
              ],
              "answer": "Procuring drugs from the drug store",
              "explanation": "Procuring drugs is a dispensing function, not a component of a pharmaceutical consultation."
            },
            {
              "stem": "Which of the following patients is at the HIGHEST risk of suffering from an adverse drug reaction?",
              "options": [
                "A 6-month-old infant receiving amoxicillin for an ear infection",
                "A 25-year-old patient with asthma receiving inhaled corticosteroids",
                "A 50-year-old patient with hypertension receiving an ACE inhibitor",
                "A 70-year-old patient with chronic kidney disease receiving a diuretic"
              ],
              "answer": "A 70-year-old patient with chronic kidney disease receiving a diuretic",
              "explanation": "Elderly patients with renal impairment are at higher risk of adverse drug reactions due to altered drug metabolism and excretion."
            },
            {
              "stem": "A 35-year-old man presents to the pharmacy complaining of upper abdominal pain and vomiting for three days. He reports yellowing of the eyes. What is the MOST appropriate course of action?",
              "options": [
                "Prescribe an antacid to relieve symptoms.",
                "Identify and withdraw the causative medication.",
                "Refer him for further medical assessment.",
                "Advise him to stop using over-the-counter analgesics."
              ],
              "answer": "Refer him for further medical assessment.",
              "explanation": "Jaundice and abdominal pain are red flags that require urgent medical evaluation to rule out serious conditions like drug-induced liver injury."
            },
            {
              "stem": "The role of the pharmacist in selecting therapeutic alternatives requires which of the following skills?",
              "options": [
                "Performance of drug utilization evaluation",
                "Ability to counsel patients on drug adherence",
                "Review and critique drug literature",
                "All of the above"
              ],
              "answer": "All of the above",
              "explanation": "Selecting therapeutic alternatives involves evaluating drug use, counseling patients, and critically appraising drug literature."
            },
            {
              "stem": "Which of the following is TRUE regarding the preparation of cytotoxic drugs?",
              "options": [
                "They can be prepared in a regular laminar flow hood.",
                "They require cold chain storage conditions.",
                "Personal protective equipment is not required.",
                "They do not require segregation of chemotherapy waste."
              ],
              "answer": "They require cold chain storage conditions.",
              "explanation": "Cytotoxic drugs often require specific storage conditions, including cold chain, to maintain stability and efficacy."
            },
            {
              "stem": "Which of the following is a key responsibility of a hospital pharmacist in direct patient care?",
              "options": [
                "Administering medications to patients",
                "Checking for accuracy of doses prepared by nurses",
                "Prescribing medications under protocol",
                "Maintaining professional competence in drug stability and incompatibilities"
              ],
              "answer": "Maintaining professional competence in drug stability and incompatibilities",
              "explanation": "A hospital pharmacist must ensure their knowledge of drug stability and incompatibilities is up-to-date to prevent medication errors."
            },
            {
              "stem": "Which of the following is a TRUE statement regarding medication review?",
              "options": [
                "It is solely the responsibility of the physician.",
                "It ensures good patient understanding of treatment.",
                "It involves estimating medication needs to minimize stockouts.",
                "It is equivalent to patient education."
              ],
              "answer": "It ensures good patient understanding of treatment.",
              "explanation": "Medication review focuses on evaluating the appropriateness of therapy and ensuring patients understand their treatment."
            },
            {
              "stem": "Which of the following is a TRUE statement regarding the differences between institutional and community pharmacy practice?",
              "options": [
                "Institutional pharmacy involves more patient counseling.",
                "Community pharmacy focuses on research to improve service delivery.",
                "Institutional pharmacy emphasizes physician-patient-pharmacist-nurse relationships.",
                "Community pharmacy does not involve dispensing medications."
              ],
              "answer": "Institutional pharmacy emphasizes physician-patient-pharmacist-nurse relationships.",
              "explanation": "Institutional pharmacy practice involves close collaboration among healthcare professionals to optimize patient care."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "List five purposes of maintaining accurate pharmacy records in a hospital setting.",
              "modelAnswer": "1. Ensure continuity of patient care and medication history tracking.\n2. Facilitate clinical audits and quality assurance processes.\n3. Support research and education through data collection.\n4. Enable monitoring of drug utilization and formulary compliance.\n5. Provide legal documentation for billing, accountability, and regulatory compliance."
            },
            {
              "stem": "A 45-year-old patient with type 2 diabetes mellitus is prescribed metformin 500 mg twice daily. After two weeks, their fasting blood glucose remains elevated (>10 mmol/L). Outline five possible causes for this lack of response and suggest one action the pharmacist should take.",
              "modelAnswer": "Possible causes:\n1. Poor medication adherence (patient not taking metformin as prescribed).\n2. Inadequate dosing (metformin 500 mg BID may be insufficient for this patient).\n3. Dietary non-compliance (high carbohydrate intake).\n4. Concurrent medications that elevate blood glucose (e.g., corticosteroids).\n5. Progression of diabetes requiring intensification of therapy.\n\nAction: The pharmacist should counsel the patient on adherence, discuss dietary habits, and recommend a review of the treatment plan with the prescriber, including consideration of dose escalation or addition of another antidiabetic agent."
            },
            {
              "stem": "Outline five common mistakes that may occur during prescription processing in a hospital pharmacy.",
              "modelAnswer": "1. Incorrect transcription of the prescription (e.g., wrong dose, frequency, or drug).\n2. Failure to check for drug allergies or contraindications.\n3. Dispensing the wrong medication or strength due to look-alike/sound-alike errors.\n4. Lack of patient counseling on proper medication use and potential side effects.\n5. Inadequate documentation or record-keeping of dispensed medications."
            },
            {
              "stem": "Describe five routine pharmacy-based screening tests that a pharmacist may perform in a community or hospital setting.",
              "modelAnswer": "1. Blood pressure measurement (for patients on antihypertensives or at risk of hypertension).\n2. Blood glucose monitoring (for diabetic patients or those on steroids).\n3. Lipid profile screening (for patients on statins or at risk of cardiovascular disease).\n4. INR monitoring (for patients on warfarin).\n5. Point-of-care testing for infectious diseases (e.g., HIV, hepatitis B/C) in high-risk patients."
            },
            {
              "stem": "Why is it important for a pharmacist to be well-versed in poison information? Provide four reasons.",
              "modelAnswer": "1. To provide timely and accurate advice in cases of accidental or intentional poisoning.\n2. To guide appropriate management, including antidote administration and supportive care.\n3. To prevent medication errors and adverse drug reactions through awareness of toxic drug interactions.\n4. To educate patients and healthcare providers on safe medication storage and disposal to prevent poisoning incidents."
            },
            {
              "stem": "State the use of each of the following medical devices:\na) Catheters\nb) Osmotic laxatives\nc) Dialysis machine",
              "modelAnswer": "a) Catheters: Used to drain urine from the bladder (urinary catheter) or administer fluids/medications directly into the bloodstream (intravenous catheter).\n\nb) Osmotic laxatives (e.g., lactulose): Used to treat constipation by drawing water into the colon to soften stools and stimulate bowel movements.\n\nc) Dialysis machine: Used in patients with kidney failure to filter waste products and excess fluids from the blood when the kidneys are unable to perform this function."
            },
            {
              "stem": "Discuss five ethical issues relating to the provision of drug information by pharmacists.",
              "modelAnswer": "1. **Confidentiality**: Ensuring patient information is kept confidential and shared only with authorized personnel.\n2. **Autonomy**: Respecting the patient's right to make informed decisions about their treatment.\n3. **Beneficence**: Providing information that benefits the patient and avoids harm.\n4. **Non-maleficence**: Avoiding the provision of misleading or incorrect information that could cause harm.\n5. **Justice**: Ensuring equitable access to drug information for all patients, regardless of socioeconomic status or background."
            },
            {
              "stem": "A patient presents with a prescription for atorvastatin 40 mg daily but reports experiencing severe muscle pain after starting the medication. Outline five potential causes for this symptom and suggest one action the pharmacist should take.",
              "modelAnswer": "Potential causes:\n1. Statin-induced myopathy (muscle pain due to atorvastatin).\n2. Drug interaction with another medication (e.g., a CYP3A4 inhibitor like clarithromycin).\n3. Underlying muscle disorder exacerbated by the statin.\n4. Dehydration or electrolyte imbalance contributing to muscle pain.\n5. Physical overexertion or injury unrelated to the medication.\n\nAction: The pharmacist should advise the patient to stop taking atorvastatin immediately and refer them to the prescriber for evaluation. The prescriber may consider checking creatine kinase levels and switching to a different statin or adjusting the dose."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Discuss the following aspects of institutional pharmacy:\na) Essential functions of a hospital pharmacy (5 marks)\nb) Management of controlled drugs (5 marks)\nc) Quality assurance and quality control of medicines (5 marks)",
              "modelAnswer": "a) **Essential functions of a hospital pharmacy:**\n1. **Medication procurement and supply**: Ensuring the timely availability of essential medicines, including formulary management and procurement.\n2. **Dispensing and distribution**: Accurate dispensing of medications using systems like unit dose or floor stock to minimize errors.\n3. **Clinical pharmacy services**: Providing drug information, medication review, and patient counseling to optimize therapy.\n4. **Drug therapy monitoring**: Assessing appropriateness of therapy, detecting adverse drug reactions, and ensuring adherence to guidelines.\n5. **Education and training**: Educating healthcare professionals and patients on safe medication use and emerging therapies.\n\nb) **Management of controlled drugs:**\n1. **Storage**: Controlled drugs must be stored in a secure, locked cabinet or safe to prevent theft or diversion.\n2. **Inventory control**: Regular audits and reconciliation of controlled substances to detect discrepancies and prevent loss.\n3. **Prescription requirements**: Ensuring prescriptions for controlled drugs comply with legal requirements (e.g., triplicate prescriptions for narcotics in some jurisdictions).\n4. **Documentation**: Maintaining detailed records of receipt, dispensing, and disposal of controlled substances, including patient details and quantities.\n5. **Disposal**: Following proper protocols for the disposal of expired or unused controlled drugs to prevent misuse.\n\nc) **Quality assurance and quality control of medicines:**\n1. **Procurement standards**: Ensuring all medicines procured meet regulatory standards (e.g., WHO prequalification or national drug regulatory authority approval).\n2. **Storage conditions**: Monitoring and maintaining appropriate storage conditions (temperature, humidity) to preserve drug potency.\n3. **Expiry date management**: Regularly checking and removing expired medications to prevent administration of ineffective or harmful drugs.\n4. **Adherence to guidelines**: Following national and international guidelines (e.g., WHO Good Storage Practices) for handling and storing medicines.\n5. **Incident reporting**: Implementing systems to report and investigate medication errors or quality issues, with corrective actions to prevent recurrence."
            },
            {
              "stem": "With regard to community pharmacy practice, discuss the following:\na) Responsibilities of a pharmacist (10 marks)\nb) Consultation styles (5 marks)",
              "modelAnswer": "a) **Responsibilities of a pharmacist in community pharmacy practice:**\n1. **Dispensing medications**: Accurately dispensing prescription and over-the-counter medications, ensuring correct dose, formulation, and labeling.\n2. **Patient counseling**: Providing clear and concise information on medication use, potential side effects, and drug interactions to enhance adherence and safety.\n3. **Medication review and reconciliation**: Reviewing patients' medication lists to identify duplications, interactions, or omissions, and reconciling discrepancies.\n4. **Health screening and monitoring**: Performing health screenings (e.g., blood pressure, blood glucose) and monitoring chronic conditions (e.g., diabetes, hypertension).\n5. **Vaccination services**: Administering vaccines (e.g., influenza, COVID-19) as authorized by local regulations and guidelines.\n6. **Over-the-counter (OTC) advice**: Providing evidence-based recommendations for minor ailments (e.g., pain, allergies, gastrointestinal issues) and referring patients to physicians when necessary.\n7. **Chronic disease management**: Supporting patients with chronic conditions (e.g., diabetes, asthma) through education, monitoring, and collaboration with healthcare providers.\n8. **Medication adherence support**: Using tools like pill organizers, blister packs, or reminder apps to improve adherence, especially in elderly or polypharmacy patients.\n9. **Public health initiatives**: Participating in public health campaigns (e.g., smoking cessation, weight management) and providing health education materials.\n10. **Regulatory compliance**: Ensuring compliance with local laws and regulations, including record-keeping, controlled substance management, and reporting adverse drug reactions.\n\nb) **Consultation styles:**\n1. **Patient-centered approach**: Focusing on the patient's needs, concerns, and preferences to build trust and improve outcomes.\n2. **Structured approach**: Using frameworks like the \"SOAP\" (Subjective, Objective, Assessment, Plan) or \"WWHAM\" (Who, What, How long, Action, Medication) to ensure comprehensive consultations.\n3. **Motivational interviewing**: Encouraging patients to take an active role in their treatment by exploring their motivations and barriers to adherence.\n4. **Shared decision-making**: Collaborating with patients to make informed decisions about their treatment options, considering their values and preferences.\n5. **Empathetic communication**: Using active listening, open-ended questions, and non-judgmental language to create a supportive environment for patients."
            }
          ]
        }
      ]
    },
    "3": {
      "title": "Hospital & Clinical Pharmacy Practice",
      "variant": 3,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Which of the following is the PRIMARY responsibility of a hospital pharmacist in ensuring patient safety?",
              "options": [
                "Compounding intravenous admixtures for chemotherapy",
                "Ensuring the availability of essential medicines on hospital wards",
                "Prescribing antibiotics for community-acquired pneumonia",
                "Managing the hospital’s electronic health record system"
              ],
              "answer": "Ensuring the availability of essential medicines on hospital wards",
              "explanation": "The primary responsibility of a hospital pharmacist is to ensure the safe and timely availability of medicines to support patient care."
            },
            {
              "stem": "Which function is NOT typically performed by a Medicines and Therapeutics Committee (MTC) in a hospital?",
              "options": [
                "Developing and updating the hospital formulary",
                "Monitoring adverse drug reactions reported in the hospital",
                "Approving individual patient prescriptions for controlled substances",
                "Evaluating evidence for inclusion of new therapeutic agents"
              ],
              "answer": "Approving individual patient prescriptions for controlled substances",
              "explanation": "The MTC sets policies and approves the formulary but does not approve individual prescriptions."
            },
            {
              "stem": "During direct patient care, a pharmacist’s role in medication chart review includes all of the following EXCEPT:",
              "options": [
                "Verifying the accuracy of medication doses and frequencies",
                "Ensuring adherence to hospital antibiotic stewardship policies",
                "Prescribing medications based on clinical judgment",
                "Identifying potential drug-drug interactions"
              ],
              "answer": "Prescribing medications based on clinical judgment",
              "explanation": "Prescribing is typically the responsibility of physicians; pharmacists provide clinical review and recommendations."
            },
            {
              "stem": "Medication reconciliation is BEST defined as:",
              "options": [
                "The process of comparing a patient’s current medications with their medical history to avoid discrepancies",
                "A systematic review of medication errors reported in the hospital",
                "The evaluation of medication adherence using pharmacy records",
                "The documentation of all medications administered during a patient’s hospital stay"
              ],
              "answer": "The process of comparing a patient’s current medications with their medical history to avoid discrepancies",
              "explanation": "Medication reconciliation aims to prevent medication errors by ensuring accurate transfer of medication information."
            },
            {
              "stem": "Which principle is NOT part of rational prescribing?",
              "options": [
                "Prescribing the least expensive medication available",
                "Using the shortest effective duration of therapy",
                "Selecting medications based on current clinical evidence",
                "Considering the patient’s preferences and values"
              ],
              "answer": "Prescribing the least expensive medication available",
              "explanation": "Rational prescribing prioritizes evidence-based therapy, safety, and patient needs over cost alone."
            },
            {
              "stem": "Pharmacy-based screening services typically include all of the following EXCEPT:",
              "options": [
                "Blood pressure measurement for hypertensive patients",
                "Fasting blood glucose testing for diabetic patients",
                "Performing MRI scans for neurological assessment",
                "Cholesterol screening for cardiovascular risk assessment"
              ],
              "answer": "Performing MRI scans for neurological assessment",
              "explanation": "MRI scans are diagnostic imaging procedures, not typical pharmacy-based screening services."
            },
            {
              "stem": "Which of the following is NOT classified as a medication error?",
              "options": [
                "Administering a dose 30 minutes late due to a ward emergency",
                "Prescribing a 10-fold overdose of digoxin",
                "A patient experiencing mild nausea after starting metformin",
                "A nurse administering penicillin to a patient with a documented penicillin allergy"
              ],
              "answer": "A patient experiencing mild nausea after starting metformin",
              "explanation": "Mild nausea is a predictable adverse effect, not a medication error."
            },
            {
              "stem": "When prescribing medications, the non-proprietary (generic) name should be used because it:",
              "options": [
                "Ensures the patient receives the exact brand the physician intended",
                "Reduces confusion and promotes consistency in prescribing",
                "Is always cheaper than the proprietary name",
                "Guarantees the medication is bioequivalent to the brand"
              ],
              "answer": "Reduces confusion and promotes consistency in prescribing",
              "explanation": "Using non-proprietary names minimizes errors and ensures clarity in medication prescribing."
            },
            {
              "stem": "Which of the following is NOT a component of pharmacy records in a hospital?",
              "options": [
                "Patient allergy history and previous adverse drug reactions",
                "Charges for medications billed to the patient",
                "The patient’s social security number and home address",
                "Medication administration records (MARs)"
              ],
              "answer": "The patient’s social security number and home address",
              "explanation": "While pharmacy records include patient identifiers, sensitive personal data like home addresses are typically stored separately for privacy."
            },
            {
              "stem": "The increasing need for a hospital formulary system is primarily driven by:",
              "options": [
                "Regulatory requirements mandating formulary use",
                "The overwhelming number of medications available in the market",
                "Pharmaceutical marketing strategies influencing prescribing",
                "The requirement for all hospitals to use the same formulary"
              ],
              "answer": "The overwhelming number of medications available in the market",
              "explanation": "A formulary helps manage the vast number of available medications by standardizing choices based on efficacy, safety, and cost."
            },
            {
              "stem": "Which medical device is correctly matched with its function?",
              "options": [
                "Stethoscope — Detecting electrical activity in the heart",
                "Pulse oximeter — Measuring oxygen saturation in arterial blood",
                "Sphygmomanometer — Assessing lung function",
                "Otoscope — Measuring intraocular pressure"
              ],
              "answer": "Pulse oximeter — Measuring oxygen saturation in arterial blood",
              "explanation": "The pulse oximeter measures oxygen saturation, while the other devices are mismatched."
            },
            {
              "stem": "In which drug distribution system are both the pharmacy and nursing station responsible for medication storage and preparation?",
              "options": [
                "Floor stock system",
                "Unit dose system",
                "Combination system",
                "Individual prescription order system"
              ],
              "answer": "Combination system",
              "explanation": "The combination system integrates aspects of floor stock and unit dose systems, with shared responsibilities."
            },
            {
              "stem": "A satellite pharmacy is typically located:",
              "options": [
                "In the sterile processing unit",
                "At a central location in the hospital",
                "On each patient care floor or unit",
                "In the hospital’s administrative offices"
              ],
              "answer": "On each patient care floor or unit",
              "explanation": "Satellite pharmacies are decentralized units located on patient care floors to improve access and efficiency."
            },
            {
              "stem": "Which statement about the Kenyan Expanded Programme on Immunization (EPI) schedule is FALSE?",
              "options": [
                "BCG and OPV are administered at birth",
                "Measles vaccine is given at 9 and 18 months",
                "Vaccines are stored in the freezer at -20°C",
                "Hepatitis B vaccine is given at birth, 6, 10, and 14 weeks"
              ],
              "answer": "Vaccines are stored in the freezer at -20°C",
              "explanation": "Most vaccines are stored at 2–8°C; freezing can damage live vaccines like OPV."
            },
            {
              "stem": "Patient counseling is BEST described as:",
              "options": [
                "A one-time session to explain medication side effects",
                "A continuous process integrated into pharmacy practice for prescription and non-prescription medications",
                "A legal requirement only for controlled substances",
                "A service provided exclusively by physicians"
              ],
              "answer": "A continuous process integrated into pharmacy practice for prescription and non-prescription medications",
              "explanation": "Patient counseling is an ongoing, integral part of pharmacy practice for all medications."
            },
            {
              "stem": "Which statement about prescription processing is FALSE?",
              "options": [
                "Prescriptions must be stored for at least 2 years in the pharmacy premises",
                "Prescription handling can be delegated to pharmacy technicians without supervision",
                "Record keeping is a legal and professional requirement",
                "Self-checking for accuracy is required if a non-pharmacist handles the prescription"
              ],
              "answer": "Prescription handling can be delegated to pharmacy technicians without supervision",
              "explanation": "Prescription processing requires pharmacist oversight; delegation to technicians must be supervised."
            },
            {
              "stem": "The most specific and sensitive method to assess medication compliance is:",
              "options": [
                "Patient history taking",
                "Residual tablet counting",
                "Drug analysis in body fluids",
                "Pharmacy dispensing records"
              ],
              "answer": "Drug analysis in body fluids",
              "explanation": "Drug analysis detects actual drug presence, providing objective evidence of compliance."
            },
            {
              "stem": "Prescription medicines differ from over-the-counter (OTC) medicines in that prescription medicines:",
              "options": [
                "Contain higher concentrations of active ingredients",
                "Are unsafe for use without medical supervision",
                "Are exempt from regulatory approval",
                "Do not require patient counseling"
              ],
              "answer": "Are unsafe for use without medical supervision",
              "explanation": "Prescription medicines require professional oversight due to their potential for harm or misuse."
            },
            {
              "stem": "In commodity management, lead time refers to:",
              "options": [
                "The time taken to consume half of the stock",
                "The period when demand for stock is low",
                "The time between placing an order and receiving the goods",
                "The duration it takes to utilize available stocks"
              ],
              "answer": "The time between placing an order and receiving the goods",
              "explanation": "Lead time is the duration from ordering to delivery of stock."
            },
            {
              "stem": "The generic equivalent of a drug must have:",
              "options": [
                "The same active ingredient, strength, dosage form, and route of administration as the brand",
                "A different active ingredient but similar therapeutic effect",
                "A similar pharmacokinetic profile but different pharmacodynamic effects",
                "None of the above"
              ],
              "answer": "The same active ingredient, strength, dosage form, and route of administration as the brand",
              "explanation": "Generic equivalents must be pharmaceutically equivalent and bioequivalent to the brand."
            },
            {
              "stem": "Which statement about drug therapy monitoring is FALSE?",
              "options": [
                "It involves assessing for appropriateness of generic substitution",
                "It ensures adherence to formulary medicines",
                "It checks for therapeutic duplication",
                "It is the sole responsibility of nurses"
              ],
              "answer": "It is the sole responsibility of nurses",
              "explanation": "Drug therapy monitoring is a multidisciplinary responsibility, primarily led by pharmacists."
            },
            {
              "stem": "Which tool is BEST suited for detecting anatomical malformations of heart valves?",
              "options": [
                "Chest X-ray",
                "Electrocardiograph (ECG)",
                "Echocardiography",
                "Magnetic Resonance Imaging (MRI)"
              ],
              "answer": "Echocardiography",
              "explanation": "Echocardiography provides real-time imaging of heart structures, including valves."
            },
            {
              "stem": "Which parameter is the MOST reliable for calculating pediatric doses?",
              "options": [
                "Age",
                "Body weight",
                "Height",
                "Body surface area"
              ],
              "answer": "Body surface area",
              "explanation": "Body surface area accounts for metabolic differences and is the most accurate for pediatric dosing."
            },
            {
              "stem": "Which of the following is NOT a component of a pharmaceutical consultation?",
              "options": [
                "Taking a patient’s medication history",
                "Counseling the patient on drug use",
                "Monitoring drug therapy outcomes",
                "Procuring drugs from the drug store"
              ],
              "answer": "Procuring drugs from the drug store",
              "explanation": "Procurement is a logistical function, not part of the clinical consultation process."
            },
            {
              "stem": "Which patient is at the HIGHEST risk of an adverse drug reaction?",
              "options": [
                "A 2-month-old infant receiving amoxicillin for otitis media",
                "A 25-year-old asthmatic using inhaled corticosteroids",
                "A 50-year-old hypertensive patient on enalapril",
                "A 70-year-old patient with chronic kidney disease on furosemide"
              ],
              "answer": "A 2-month-old infant receiving amoxicillin for otitis media",
              "explanation": "Infants have immature organ systems, increasing susceptibility to ADRs."
            },
            {
              "stem": "A 35-year-old male presents to the pharmacy with jaundice, abdominal pain, and vomiting after self-medicating with paracetamol for 5 days. The pharmacist should:",
              "options": [
                "Prescribe N-acetylcysteine immediately",
                "Refer the patient for urgent medical evaluation",
                "Recommend stopping paracetamol and monitoring symptoms",
                "Advise the patient to increase fluid intake"
              ],
              "answer": "Refer the patient for urgent medical evaluation",
              "explanation": "Jaundice and abdominal pain suggest potential hepatotoxicity requiring immediate medical attention."
            },
            {
              "stem": "The pharmacist’s role in selecting therapeutic alternatives requires which of the following skills?",
              "options": [
                "Ability to perform drug utilization evaluations",
                "Skill in reviewing and critiquing drug literature",
                "Competence in patient counseling on adherence",
                "All of the above"
              ],
              "answer": "All of the above",
              "explanation": "Selecting alternatives requires clinical evaluation, literature review, and patient education skills."
            },
            {
              "stem": "Regarding preparation of cytotoxic drugs, which statement is FALSE?",
              "options": [
                "It must be done aseptically in a biological safety cabinet",
                "Personal protective equipment (PPE) is required",
                "Cytotoxic waste must be segregated carefully",
                "They require cold chain storage at -20°C"
              ],
              "answer": "They require cold chain storage at -20°C",
              "explanation": "Cytotoxic drugs are typically stored at 2–8°C; freezing is not required."
            },
            {
              "stem": "Which of the following is a key responsibility of the hospital pharmacist in drug safety?",
              "options": [
                "Administering vaccines to inpatients",
                "Monitoring for and reporting adverse drug reactions",
                "Prescribing antibiotics based on culture results",
                "Performing minor surgical procedures"
              ],
              "answer": "Monitoring for and reporting adverse drug reactions",
              "explanation": "Pharmacists play a critical role in detecting, reporting, and preventing ADRs."
            },
            {
              "stem": "The primary goal of medication review in a hospital setting is to:",
              "options": [
                "Reduce the cost of medications for the hospital",
                "Ensure all medications are prescribed by brand name",
                "Optimize medication therapy and prevent errors",
                "Increase the number of medications prescribed"
              ],
              "answer": "Optimize medication therapy and prevent errors",
              "explanation": "Medication review aims to improve therapeutic outcomes and safety."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "List five essential purposes of maintaining accurate medical records in a hospital pharmacy. (5 marks)",
              "modelAnswer": "1. Ensuring continuity of patient care by providing a documented history of medications and allergies.\n2. Facilitating clinical decision-making by enabling pharmacists and physicians to review past and current therapies.\n3. Supporting medication reconciliation to prevent discrepancies during transitions of care.\n4. Providing data for adverse drug reaction reporting and pharmacovigilance.\n5. Serving as a legal and audit trail for billing, regulatory compliance, and quality assurance."
            },
            {
              "stem": "Mr. K. is a 65-year-old patient with type 2 diabetes mellitus prescribed metformin 500 mg twice daily. After 3 months, his HbA1c remains elevated at 8.9%. Outline five possible causes for this lack of glycemic control and suggest one action the pharmacist should take. (5 marks)",
              "modelAnswer": "Possible causes:\n1. Poor medication adherence due to complex dosing regimen or side effects.\n2. Inadequate dietary control or lack of lifestyle modifications.\n3. Progression of diabetes requiring intensification of therapy.\n4. Concurrent use of medications that elevate blood glucose (e.g., corticosteroids).\n5. Undiagnosed secondary causes such as insulin resistance or pancreatic insufficiency.\n\nAction: The pharmacist should conduct a comprehensive medication review, assess adherence, and collaborate with the physician to consider therapeutic adjustments (e.g., adding a second-line agent like a sulfonylurea or SGLT2 inhibitor)."
            },
            {
              "stem": "Outline five common mistakes that can occur during prescription processing in a hospital pharmacy. (5 marks)",
              "modelAnswer": "1. Illegible handwriting leading to misinterpretation of drug names or doses.\n2. Incorrect transcription of doses or frequencies from the original prescription.\n3. Failure to check for drug allergies or contraindications before dispensing.\n4. Omission of required patient identifiers (e.g., name, age, ward) on the prescription.\n5. Dispensing the wrong medication due to look-alike or sound-alike drug names."
            },
            {
              "stem": "Describe five routine pharmacy-based screening tests that can be performed in a community pharmacy setting. (5 marks)",
              "modelAnswer": "1. Blood pressure measurement to screen for hypertension.\n2. Fasting or random blood glucose testing to screen for diabetes or prediabetes.\n3. Cholesterol and lipid profile screening for cardiovascular risk assessment.\n4. Point-of-care INR testing for patients on warfarin therapy.\n5. Influenza or COVID-19 rapid antigen testing during outbreaks."
            },
            {
              "stem": "Why is it important for a pharmacist to be well-versed in poison information? Provide four key reasons. (4 marks)",
              "modelAnswer": "1. To provide immediate and accurate advice in cases of accidental or intentional poisoning.\n2. To guide appropriate management, including antidote selection and dosing.\n3. To support public health initiatives by educating communities on poison prevention.\n4. To ensure compliance with regulatory requirements for poison control and reporting."
            },
            {
              "stem": "State the primary use of each of the following medical devices: (2 marks each)\na) Catheters\nb) Osmotic laxatives\nc) Dialysis machine",
              "modelAnswer": "a) Catheters: Used for draining fluids (e.g., urine via urinary catheters, blood via central venous catheters) or administering medications directly into the body.\nb) Osmotic laxatives (e.g., lactulose): Used to treat constipation by drawing water into the colon to soften stool and stimulate bowel movements.\nc) Dialysis machine: Used in renal replacement therapy to filter waste products, excess fluids, and toxins from the blood of patients with kidney failure."
            },
            {
              "stem": "Discuss five ethical issues that pharmacists may encounter when providing drug information to patients or healthcare providers. (10 marks)",
              "modelAnswer": "1. **Confidentiality vs. Duty to Warn**: Balancing patient privacy with the need to disclose potential risks (e.g., teratogenic effects) to ensure safety.\n2. **Conflict of Interest**: Avoiding bias when recommending medications, especially when influenced by pharmaceutical incentives or personal relationships.\n3. **Informed Consent**: Ensuring patients fully understand the risks, benefits, and alternatives of prescribed medications before use.\n4. **Resource Allocation**: Addressing disparities in access to medications due to cost or availability while maintaining equitable care.\n5. **Truthfulness in Advertising**: Providing accurate and unbiased information about medications, avoiding exaggeration or omission of risks in promotional materials."
            },
            {
              "stem": "A patient presents to the pharmacy with a prescription for atorvastatin 40 mg daily. List five key points the pharmacist should include in patient counseling for this medication. (5 marks)",
              "modelAnswer": "1. Purpose: Explain that atorvastatin is used to lower cholesterol and reduce the risk of heart disease.\n2. Administration: Take once daily, preferably at night, with or without food.\n3. Side Effects: Common side effects include muscle pain (myalgia), headache, and gastrointestinal upset; rare but serious effects include liver toxicity and rhabdomyolysis.\n4. Monitoring: Advise the patient to have periodic liver function tests and lipid profile monitoring.\n5. Lifestyle Advice: Encourage a heart-healthy diet, regular exercise, and avoidance of alcohol to enhance therapeutic effects."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Discuss the following aspects of institutional pharmacy practice: (15 marks)\na) Essential functions of a hospital pharmacy (5 marks)\nb) Management of controlled drugs (5 marks)\nc) Quality assurance and quality control of medicines (5 marks)",
              "modelAnswer": "**a) Essential functions of a hospital pharmacy:**\n1. **Medication Procurement and Distribution**: Ensuring the timely availability of essential medicines, including stock management, purchasing, and distribution systems (e.g., unit dose, floor stock).\n2. **Clinical Pharmacy Services**: Providing direct patient care through medication review, therapeutic drug monitoring, and participation in multidisciplinary teams (e.g., ward rounds, ICU support).\n3. **Drug Information and Education**: Serving as a resource for healthcare providers and patients on drug therapy, adverse effects, and interactions.\n4. **Pharmaceutical Care**: Optimizing medication therapy to improve patient outcomes, including resolving drug-related problems and promoting rational prescribing.\n5. **Emergency Preparedness**: Maintaining emergency drug supplies (e.g., crash carts, antidotes) and protocols for disasters or outbreaks.\n\n**b) Management of controlled drugs:**\n1. **Regulatory Compliance**: Adhering to national and international regulations (e.g., Kenya’s Narcotic Drugs and Psychotropic Substances Act) for storage, dispensing, and record-keeping.\n2. **Secure Storage**: Using locked, tamper-proof cabinets or safes with restricted access to prevent diversion or theft.\n3. **Inventory Control**: Implementing perpetual inventory systems to track usage, reconcile discrepancies, and prevent shortages or overstocking.\n4. **Prescription Validation**: Verifying prescriptions for legitimacy, including prescriber credentials, patient identifiers, and appropriate indications.\n5. **Disposal and Waste Management**: Following strict protocols for the disposal of expired or unused controlled substances, including witnessed destruction and documentation.\n\n**c) Quality assurance and quality control of medicines:**\n1. **Procurement Standards**: Sourcing medications from licensed manufacturers with verified quality certifications (e.g., WHO-GMP, FDA).\n2. **Receiving and Storage**: Inspecting shipments for damage, correct labeling, and expiry dates; storing under appropriate conditions (temperature, humidity, light).\n3. **Dispensing Accuracy**: Implementing double-check systems (e.g., pharmacist verification) to prevent dispensing errors.\n4. **Adverse Drug Reaction Monitoring**: Reporting and analyzing ADRs to identify trends and improve safety protocols.\n5. **Continuous Improvement**: Conducting audits, staff training, and process reviews to maintain high standards of medication safety and efficacy."
            },
            {
              "stem": "With regard to community pharmacy practice, discuss the following: (15 marks)\na) Responsibilities of a pharmacist (10 marks)\nb) Consultation styles used in community pharmacy (5 marks)",
              "modelAnswer": "**a) Responsibilities of a pharmacist in community pharmacy practice:**\n1. **Dispensing Medications**: Accurately interpreting and filling prescriptions, ensuring correct drug, dose, and patient counseling.\n2. **Patient Counseling**: Providing clear, tailored advice on medication use, side effects, interactions, and lifestyle modifications to enhance adherence and outcomes.\n3. **Health Promotion and Disease Prevention**: Offering screening services (e.g., blood pressure, glucose), vaccinations (e.g., influenza, COVID-19), and smoking cessation programs.\n4. **Medication Therapy Management (MTM)**: Reviewing patients’ medication regimens to identify and resolve drug-related problems (e.g., duplications, interactions, non-adherence).\n5. **Over-the-Counter (OTC) Consultation**: Assisting patients in selecting appropriate OTC products for minor ailments while screening for contraindications or red flags.\n6. **Chronic Disease Management**: Supporting patients with conditions like diabetes, hypertension, or asthma through monitoring, education, and referrals.\n7. **Public Health Initiatives**: Participating in community health campaigns (e.g., immunization drives, antibiotic stewardship) and providing drug information to the public.\n8. **Inventory and Supply Management**: Maintaining stock levels, rotating inventory to prevent expiry, and ensuring compliance with regulatory storage requirements.\n9. **Documentation and Record-Keeping**: Maintaining accurate records of prescriptions, patient interactions, and adverse events for legal and clinical purposes.\n10. **Professional Development**: Staying updated with continuing education, clinical guidelines, and emerging therapies to provide evidence-based care.\n\n**b) Consultation styles used in community pharmacy:**\n1. **Patient-Centered Approach**: Focusing on the patient’s needs, preferences, and concerns, encouraging shared decision-making (e.g., discussing options for pain relief).\n2. **Structured Counseling**: Using a systematic framework (e.g., the \"SHOW\" method: Show how to take, How often, When, and What to expect) to ensure comprehensive information delivery.\n3. **Motivational Interviewing**: Employing open-ended questions and reflective listening to encourage behavior change (e.g., adherence to antihypertensive therapy).\n4. **Teach-Back Method**: Asking patients to repeat instructions in their own words to confirm understanding (e.g., after explaining inhaler technique).\n5. **Empathetic and Non-Judgmental Communication**: Creating a supportive environment to address sensitive topics (e.g., mental health medications or lifestyle advice)."
            }
          ]
        }
      ]
    }
  },
  "exam-infections-i": {
    "1": {
      "title": "Infections I",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 28-year-old farmer presents with sudden-onset diplopia, dysphagia, and descending flaccid paralysis after consuming home-canned vegetables. He is afebrile and alert. Which of the following is the most likely diagnosis?",
              "options": [
                "Tetanus",
                "Diphtheria",
                "Botulism",
                "Staphylococcal food poisoning"
              ],
              "answer": "Botulism",
              "explanation": "Botulism presents with descending flaccid paralysis due to preformed neurotoxin, often from improperly canned foods."
            },
            {
              "stem": "A 22-year-old student develops bloody diarrhea, fever, and abdominal cramps 24 hours after eating undercooked chicken at a barbecue. Stool culture reveals Gram-negative, oxidase-positive, curved rods. Which organism is most likely responsible?",
              "options": [
                "Salmonella enterica",
                "Escherichia coli O157:H7",
                "Campylobacter jejuni",
                "Shigella sonnei"
              ],
              "answer": "Campylobacter jejuni",
              "explanation": "Campylobacter jejuni is a Gram-negative, oxidase-positive, curved rod commonly associated with undercooked poultry."
            },
            {
              "stem": "A 10-year-old boy with sickle cell disease presents with acute right knee pain, fever, and swelling. Blood cultures are pending. Which organism is most likely responsible for his osteomyelitis?",
              "options": [
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Salmonella spp.",
                "Pseudomonas aeruginosa"
              ],
              "answer": "Salmonella spp.",
              "explanation": "Salmonella spp. are the most common cause of osteomyelitis in patients with sickle cell disease due to functional asplenia."
            },
            {
              "stem": "A 35-year-old woman presents with multiple painless, skin-colored papules on her vulva and perianal area. Some lesions are cauliflower-shaped. Which human papillomavirus (HPV) type is most likely responsible?",
              "options": [
                "HPV-1",
                "HPV-6",
                "HPV-16",
                "HPV-18"
              ],
              "answer": "HPV-6",
              "explanation": "HPV-6 and HPV-11 are most commonly associated with anogenital warts (condyloma acuminata)."
            },
            {
              "stem": "A 30-year-old man is bitten by a stray dog in Nairobi. He has no prior rabies vaccination. Which post-exposure prophylaxis regimen is most appropriate?",
              "options": [
                "Wound debridement and washout only",
                "Five doses of IM rabies vaccine on days 0, 3, 7, 14, and 28",
                "Five doses of IM rabies vaccine plus human rabies immunoglobulin infiltrated into the wound",
                "Human rabies immunoglobulin infiltrated into the wound only"
              ],
              "answer": "Five doses of IM rabies vaccine plus human rabies immunoglobulin infiltrated into the wound",
              "explanation": "Post-exposure prophylaxis for rabies requires both rabies vaccine and human rabies immunoglobulin infiltrated into the wound."
            },
            {
              "stem": "A 7-year-old child presents with 5 days of watery diarrhea, vomiting, and fever. He is moderately dehydrated. Which adjunctive therapy has been shown to reduce the duration and severity of diarrhea in this age group?",
              "options": [
                "Ascorbic acid",
                "Zinc",
                "Thiamine",
                "Cholecalciferol"
              ],
              "answer": "Zinc",
              "explanation": "Zinc supplementation reduces the duration and severity of diarrhea in children, particularly in resource-limited settings."
            },
            {
              "stem": "A 25-year-old man presents with fever, right knee pain, and swelling. Joint aspiration reveals purulent fluid with Gram-negative diplococci. Which organism is most likely responsible?",
              "options": [
                "Staphylococcus aureus",
                "Neisseria gonorrhoeae",
                "Streptococcus pneumoniae",
                "Escherichia coli"
              ],
              "answer": "Neisseria gonorrhoeae",
              "explanation": "Gonococcal septic arthritis is characterized by Gram-negative diplococci in joint fluid and is common in sexually active young adults."
            },
            {
              "stem": "A 40-year-old woman presents with migratory swellings over her arm and back, lasting 1–3 days. She recently returned from Cameroon. Which vector is most likely responsible for her infection?",
              "options": [
                "Anopheles mosquito",
                "Chrysops deerfly",
                "Culex mosquito",
                "Mansonia mosquito"
              ],
              "answer": "Chrysops deerfly",
              "explanation": "Chrysops deerfly is the vector for Loa loa, a filarial nematode causing loiasis."
            },
            {
              "stem": "A 9-year-old boy presents with acute osteomyelitis of the distal tibia. Blood cultures are pending. Which empirical antibiotic regimen is most appropriate?",
              "options": [
                "IV Vancomycin + IV Ceftriaxone",
                "IV Clindamycin + IV Gentamicin",
                "IV Cloxacillin + IV Gentamicin",
                "IV Benzylpenicillin + IV Metronidazole"
              ],
              "answer": "IV Vancomycin + IV Ceftriaxone",
              "explanation": "Empirical therapy for acute osteomyelitis should cover Staphylococcus aureus (including MRSA) and Gram-negative organisms."
            },
            {
              "stem": "A 5-year-old child presents with cholera-like symptoms after consuming contaminated water. Which mechanism best describes the action of the cholera toxin?",
              "options": [
                "ADP ribosylation of Elongation Factor 2",
                "ADP ribosylation of inhibitory G proteins leading to reduced cAMP",
                "ADP ribosylation of stimulatory G proteins leading to elevated intracellular cAMP",
                "Formation of cation-selective pores in cell membranes"
              ],
              "answer": "ADP ribosylation of stimulatory G proteins leading to elevated intracellular cAMP",
              "explanation": "Cholera toxin ADP-ribosylates the stimulatory Gs protein, leading to persistent activation of adenylate cyclase and elevated cAMP."
            },
            {
              "stem": "A 12-year-old boy presents with acute hematogenous osteomyelitis of the distal femur. After 3 days of IV antibiotics, he remains febrile with persistent pain. Imaging reveals a 1.5 cm abscess. Which laboratory parameter is most useful for monitoring early treatment response?",
              "options": [
                "White blood cell count",
                "Erythrocyte sedimentation rate (ESR)",
                "C-reactive protein (CRP)",
                "MRI"
              ],
              "answer": "C-reactive protein (CRP)",
              "explanation": "CRP is a sensitive marker for early response to treatment in osteomyelitis, with levels declining within 48–72 hours of effective therapy."
            },
            {
              "stem": "A 65-year-old man with uncontrolled diabetes presents with a dog bite wound to his leg. He is allergic to sulfa drugs. Which antibiotic is most appropriate for prophylaxis?",
              "options": [
                "Amoxicillin-clavulanate",
                "Amoxicillin-clavulanate + tetanus toxoid",
                "Ciprofloxacin + clindamycin",
                "Moxifloxacin + tetanus toxoid"
              ],
              "answer": "Amoxicillin-clavulanate + tetanus toxoid",
              "explanation": "Amoxicillin-clavulanate covers Pasteurella multocida and other oral flora. Tetanus toxoid should be administered if the patient's vaccination status is uncertain."
            },
            {
              "stem": "A 20-year-old woman presents with a 1-week history of cramping abdominal pain and bloody diarrhea. Stool culture is positive for Campylobacter jejuni. Which antibiotic is most appropriate?",
              "options": [
                "Azithromycin",
                "Ciprofloxacin",
                "Metronidazole",
                "No antimicrobials needed"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin is the preferred agent for Campylobacter jejuni enteritis, particularly in severe or prolonged cases."
            },
            {
              "stem": "A 3-year-old child presents with sudden-onset fever, fatigue, and inability to bear weight on the right leg. Examination reveals swelling and point tenderness over the proximal tibia. Which imaging modality is most sensitive for early diagnosis?",
              "options": [
                "X-ray",
                "MRI",
                "CT scan",
                "Bone scintigraphy"
              ],
              "answer": "MRI",
              "explanation": "MRI is the most sensitive imaging modality for early diagnosis of osteomyelitis, detecting changes within 24–48 hours."
            },
            {
              "stem": "A 28-year-old man presents with fever, joint pain, and a petechial rash after returning from a trip to Mombasa. He is sexually active. Which organism is most likely responsible for his symptoms?",
              "options": [
                "Neisseria gonorrhoeae",
                "Staphylococcus aureus",
                "Streptococcus pyogenes",
                "Salmonella typhi"
              ],
              "answer": "Neisseria gonorrhoeae",
              "explanation": "Disseminated gonococcal infection can present with fever, joint pain, and petechial rash, particularly in sexually active individuals."
            },
            {
              "stem": "A 45-year-old woman presents with fever, confusion, and a new rash on her chest after returning from a trip to Mathare slums. Blood cultures are pending. Which organism is most likely responsible?",
              "options": [
                "Salmonella typhi",
                "Escherichia coli",
                "Staphylococcus aureus",
                "Campylobacter jejuni"
              ],
              "answer": "Salmonella typhi",
              "explanation": "Typhoid fever presents with fever, confusion, and rash (rose spots), often after travel to endemic areas."
            },
            {
              "stem": "A 15-year-old boy presents with sudden-onset fever, headache, and neck stiffness. Lumbar puncture reveals turbid CSF with elevated neutrophils and low glucose. Which organism is most likely responsible?",
              "options": [
                "Streptococcus pneumoniae",
                "Neisseria meningitidis",
                "Haemophilus influenzae",
                "Listeria monocytogenes"
              ],
              "answer": "Neisseria meningitidis",
              "explanation": "Neisseria meningitidis is a common cause of bacterial meningitis in adolescents and young adults, presenting with fever, headache, and neck stiffness."
            },
            {
              "stem": "A 60-year-old man presents with fever, cough, and rust-colored sputum. Chest X-ray shows lobar consolidation. Which organism is most likely responsible?",
              "options": [
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Klebsiella pneumoniae",
                "Mycoplasma pneumoniae"
              ],
              "answer": "Streptococcus pneumoniae",
              "explanation": "Streptococcus pneumoniae is the most common cause of community-acquired pneumonia with lobar consolidation."
            },
            {
              "stem": "A 7-year-old girl presents with intense perianal itching and irritability. Eggs with a flattened side are identified on scotch tape test. Which organism is most likely responsible?",
              "options": [
                "Ascaris lumbricoides",
                "Enterobius vermicularis",
                "Entamoeba histolytica",
                "Trichuris trichiura"
              ],
              "answer": "Enterobius vermicularis",
              "explanation": "Enterobius vermicularis (pinworm) causes perianal itching and is diagnosed by identifying eggs on scotch tape test."
            },
            {
              "stem": "A 50-year-old man presents with fever, jaundice, and right upper quadrant pain after returning from a trip to the Maasai Mara. Which organism is most likely responsible?",
              "options": [
                "Plasmodium falciparum",
                "Leptospira interrogans",
                "Schistosoma mansoni",
                "Entamoeba histolytica"
              ],
              "answer": "Leptospira interrogans",
              "explanation": "Leptospirosis presents with fever, jaundice, and right upper quadrant pain (Weil's syndrome) after exposure to contaminated water."
            },
            {
              "stem": "A 30-year-old woman presents with fever, joint pain, and a macular rash after a tick bite. Which organism is most likely responsible?",
              "options": [
                "Borrelia burgdorferi",
                "Rickettsia rickettsii",
                "Ehrlichia chaffeensis",
                "Anaplasma phagocytophilum"
              ],
              "answer": "Rickettsia rickettsii",
              "explanation": "Rickettsia rickettsii causes Rocky Mountain spotted fever, characterized by fever, rash, and joint pain after a tick bite."
            },
            {
              "stem": "A 40-year-old man presents with fever, cough, and weight loss after returning from a trip to Uganda. Chest X-ray shows miliary pattern. Which organism is most likely responsible?",
              "options": [
                "Mycobacterium tuberculosis",
                "Histoplasma capsulatum",
                "Coccidioides immitis",
                "Blastomyces dermatitidis"
              ],
              "answer": "Mycobacterium tuberculosis",
              "explanation": "Miliary tuberculosis presents with fever, cough, weight loss, and a miliary pattern on chest X-ray, often after travel to endemic areas."
            },
            {
              "stem": "A 25-year-old man presents with fever, headache, and photophobia after swimming in Lake Victoria. Which organism is most likely responsible?",
              "options": [
                "Naegleria fowleri",
                "Acanthamoeba spp.",
                "Balamuthia mandrillaris",
                "Toxoplasma gondii"
              ],
              "answer": "Naegleria fowleri",
              "explanation": "Naegleria fowleri causes primary amebic meningoencephalitis, often after swimming in warm freshwater."
            },
            {
              "stem": "A 10-year-old boy presents with fever, abdominal pain, and bloody diarrhea after eating undercooked beef. Stool culture reveals Gram-negative, oxidase-negative rods. Which organism is most likely responsible?",
              "options": [
                "Salmonella enterica",
                "Escherichia coli O157:H7",
                "Shigella sonnei",
                "Campylobacter jejuni"
              ],
              "answer": "Escherichia coli O157:H7",
              "explanation": "Escherichia coli O157:H7 causes hemorrhagic colitis and hemolytic uremic syndrome after consuming undercooked beef."
            },
            {
              "stem": "A 35-year-old woman presents with fever, cough, and night sweats after returning from a trip to the Rift Valley. Chest X-ray shows upper lobe cavitation. Which organism is most likely responsible?",
              "options": [
                "Mycobacterium tuberculosis",
                "Streptococcus pneumoniae",
                "Klebsiella pneumoniae",
                "Legionella pneumophila"
              ],
              "answer": "Mycobacterium tuberculosis",
              "explanation": "Tuberculosis presents with fever, cough, night sweats, and upper lobe cavitation on chest X-ray, often after travel to endemic areas."
            },
            {
              "stem": "A 5-year-old child presents with fever, headache, and neck stiffness. Lumbar puncture reveals clear CSF with elevated lymphocytes and normal glucose. Which organism is most likely responsible?",
              "options": [
                "Neisseria meningitidis",
                "Streptococcus pneumoniae",
                "Enterovirus",
                "Listeria monocytogenes"
              ],
              "answer": "Enterovirus",
              "explanation": "Enteroviruses are the most common cause of aseptic meningitis, presenting with lymphocytic pleocytosis and normal glucose."
            },
            {
              "stem": "A 40-year-old man presents with fever, cough, and rust-colored sputum. Chest X-ray shows lobar consolidation. Which empirical antibiotic regimen is most appropriate?",
              "options": [
                "IV Ceftriaxone + IV Azithromycin",
                "IV Vancomycin + IV Piperacillin-tazobactam",
                "IV Clindamycin + IV Gentamicin",
                "IV Benzylpenicillin + IV Metronidazole"
              ],
              "answer": "IV Ceftriaxone + IV Azithromycin",
              "explanation": "Empirical therapy for community-acquired pneumonia should cover Streptococcus pneumoniae and atypical organisms (e.g., Mycoplasma pneumoniae)."
            },
            {
              "stem": "A 20-year-old woman presents with fever, dysuria, and flank pain. Urinalysis reveals pyuria and bacteriuria. Which organism is most likely responsible?",
              "options": [
                "Escherichia coli",
                "Staphylococcus saprophyticus",
                "Klebsiella pneumoniae",
                "Proteus mirabilis"
              ],
              "answer": "Escherichia coli",
              "explanation": "Escherichia coli is the most common cause of urinary tract infections, including pyelonephritis."
            },
            {
              "stem": "A 30-year-old man presents with fever, cough, and weight loss after returning from a trip to Ethiopia. Chest X-ray shows a solitary pulmonary nodule. Which organism is most likely responsible?",
              "options": [
                "Mycobacterium tuberculosis",
                "Histoplasma capsulatum",
                "Coccidioides immitis",
                "Blastomyces dermatitidis"
              ],
              "answer": "Histoplasma capsulatum",
              "explanation": "Histoplasmosis presents with fever, cough, weight loss, and a solitary pulmonary nodule, often after exposure to bird or bat droppings."
            },
            {
              "stem": "A 50-year-old man presents with fever, jaundice, and right upper quadrant pain after returning from a trip to the Maasai Mara. Which empirical antibiotic regimen is most appropriate?",
              "options": [
                "IV Ceftriaxone",
                "IV Ciprofloxacin",
                "IV Benzylpenicillin",
                "IV Metronidazole"
              ],
              "answer": "IV Ceftriaxone",
              "explanation": "Empirical therapy for leptospirosis includes IV ceftriaxone or doxycycline, depending on severity."
            },
            {
              "stem": "A 25-year-old woman presents with fever, joint pain, and a macular rash after a tick bite. Which empirical antibiotic regimen is most appropriate?",
              "options": [
                "IV Doxycycline",
                "IV Ceftriaxone",
                "IV Vancomycin",
                "IV Metronidazole"
              ],
              "answer": "IV Doxycycline",
              "explanation": "Doxycycline is the drug of choice for Rocky Mountain spotted fever, a rickettsial infection transmitted by ticks."
            },
            {
              "stem": "A 45-year-old woman presents with fever, confusion, and a new rash on her chest after returning from a trip to Mathare slums. Which empirical antibiotic regimen is most appropriate?",
              "options": [
                "IV Ceftriaxone + IV Azithromycin",
                "IV Vancomycin + IV Piperacillin-tazobactam",
                "IV Ciprofloxacin + IV Metronidazole",
                "IV Benzylpenicillin + IV Gentamicin"
              ],
              "answer": "IV Ceftriaxone + IV Azithromycin",
              "explanation": "Empirical therapy for typhoid fever includes IV ceftriaxone, with azithromycin as an alternative in penicillin-allergic patients."
            },
            {
              "stem": "A 10-year-old boy presents with fever, abdominal pain, and bloody diarrhea after eating undercooked beef. Stool culture reveals Gram-negative, oxidase-negative rods. Which empirical antibiotic regimen is most appropriate?",
              "options": [
                "Oral Azithromycin",
                "Oral Ciprofloxacin",
                "Oral Metronidazole",
                "No antimicrobials needed"
              ],
              "answer": "Oral Azithromycin",
              "explanation": "Azithromycin is the preferred agent for enterohemorrhagic Escherichia coli (EHEC) infections, though antimicrobials are generally avoided in EHEC to prevent hemolytic uremic syndrome."
            },
            {
              "stem": "A 30-year-old man presents with fever, cough, and weight loss after returning from a trip to the Rift Valley. Chest X-ray shows upper lobe cavitation. Which empirical antibiotic regimen is most appropriate?",
              "options": [
                "IV Isoniazid + IV Rifampicin + IV Pyrazinamide + IV Ethambutol",
                "IV Ceftriaxone + IV Azithromycin",
                "IV Vancomycin + IV Piperacillin-tazobactam",
                "IV Ciprofloxacin + IV Metronidazole"
              ],
              "answer": "IV Isoniazid + IV Rifampicin + IV Pyrazinamide + IV Ethambutol",
              "explanation": "Empirical therapy for tuberculosis includes a four-drug regimen (isoniazid, rifampicin, pyrazinamide, ethambutol) until susceptibility results are available."
            },
            {
              "stem": "A 5-year-old child presents with fever, headache, and neck stiffness. Lumbar puncture reveals clear CSF with elevated lymphocytes and normal glucose. Which empirical antibiotic regimen is most appropriate?",
              "options": [
                "IV Acyclovir",
                "IV Ceftriaxone",
                "IV Vancomycin",
                "No antimicrobials needed"
              ],
              "answer": "IV Acyclovir",
              "explanation": "Acyclovir is the drug of choice for herpes simplex virus encephalitis, a common cause of aseptic meningitis with lymphocytic pleocytosis."
            },
            {
              "stem": "A 20-year-old woman presents with fever, dysuria, and flank pain. Urinalysis reveals pyuria and bacteriuria. Which empirical antibiotic regimen is most appropriate?",
              "options": [
                "Oral Nitrofurantoin",
                "Oral Ciprofloxacin",
                "Oral Amoxicillin-clavulanate",
                "Oral Trimethoprim-sulfamethoxazole"
              ],
              "answer": "Oral Ciprofloxacin",
              "explanation": "Ciprofloxacin is a fluoroquinolone with excellent urinary penetration and is commonly used for pyelonephritis."
            },
            {
              "stem": "A 30-year-old man presents with fever, cough, and weight loss after returning from a trip to Ethiopia. Chest X-ray shows a solitary pulmonary nodule. Which empirical antibiotic regimen is most appropriate?",
              "options": [
                "IV Amphotericin B",
                "IV Itraconazole",
                "IV Voriconazole",
                "IV Caspofungin"
              ],
              "answer": "IV Itraconazole",
              "explanation": "Itraconazole is the drug of choice for histoplasmosis, a fungal infection common in endemic areas."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 17-year-old boy presents with sudden-onset fever, fatigue, and pain in his right lower leg. He is no longer able to bear weight. Examination reveals swelling, point tenderness over the proximal tibia, and limited movement. Labs: Hb 12.5 g/dL, WBC 15,000/mm³, ESR 65 mm/h. Bone scan shows increased uptake at the metaphysis of the tibia.",
              "modelAnswer": {
                "a": "Most likely diagnosis: Acute hematogenous osteomyelitis of the proximal tibia.",
                "b": "Pharmacological management: Empirical IV antibiotics covering Staphylococcus aureus (e.g., IV Vancomycin + IV Ceftriaxone) for at least 4–6 weeks. Consider de-escalation based on culture results.",
                "c": "Non-pharmacological management: Rest, elevation of the limb, and analgesia (e.g., paracetamol or ibuprofen). Surgical debridement may be required if there is abscess formation or failure to improve clinically.",
                "d": "Monitoring: Serial CRP and ESR to assess response to therapy. Repeat imaging (MRI or bone scan) if clinical deterioration occurs."
              }
            },
            {
              "stem": "Identify the most important member of Enterobacteriaceae that causes each of the following diseases:",
              "modelAnswer": {
                "a": "Childhood diarrhea: Escherichia coli (enteropathogenic E. coli, EPEC).",
                "b": "Traveler's diarrhea: Escherichia coli (enterotoxigenic E. coli, ETEC).",
                "c": "Bacillary dysentery: Shigella dysenteriae.",
                "d": "Hemorrhagic colitis or Hemolytic Uremic Syndrome (HUS): Escherichia coli O157:H7 (enterohemorrhagic E. coli, EHEC)."
              }
            },
            {
              "stem": "Identify 3 human worms (parasites) that can cause iron deficiency anemia and 1 parasite associated with pernicious anemia.",
              "modelAnswer": {
                "a": "Parasites causing iron deficiency anemia:",
                "   i": "Ancylostoma duodenale (hookworm)",
                "   ii": "Necator americanus (hookworm)",
                "   iii": "Trichuris trichiura (whipworm)",
                "b": "Parasite associated with pernicious anemia: Diphyllobothrium latum (fish tapeworm, causes vitamin B12 deficiency)."
              }
            },
            {
              "stem": "Pablo, a 41-year-old security officer, is bitten by a neighbor’s dog while passing near the neighbor’s driveway. The dog’s vaccination history is unclear. Formulate an appropriate treatment plan for Pablo and include counseling points.",
              "modelAnswer": {
                "a": "Treatment plan:",
                "   i": "Avoid contact with the dog and seek medical attention if symptoms of rabies (e.g., fever, confusion, hydrophobia) develop.",
                "   ii": "Complete the full course of rabies vaccine and HRIG to ensure protection.",
                "   iii": "Monitor the wound for signs of infection (e.g., redness, swelling, pus) and seek medical attention if these occur.",
                "   iv": "Follow up with a healthcare provider for wound check and further counseling.",
                "b": "Counseling points:"
              }
            },
            {
              "stem": "Match each clinical presentation with the causative parasite:",
              "modelAnswer": {
                "a": "Migratory swellings lasting 1–3 days: Loa loa.",
                "b": "Intense perianal itching: Enterobius vermicularis (pinworm).",
                "c": "Iron deficiency anemia: Ancylostoma duodenale (hookworm).",
                "d": "Pernicious anemia: Diphyllobothrium latum (fish tapeworm)."
              }
            },
            {
              "stem": "A 25-year-old man presents with fever, joint pain, and a petechial rash after returning from a trip to Mombasa. He is sexually active. Labs: Hb 13.6 g/L, WBC 13.4 x10⁶/µL, CRP 318, ESR 96. What should be your working diagnosis?",
              "modelAnswer": {
                "a": "Working diagnosis: Disseminated gonococcal infection (DGI).",
                "b": "Justification: Fever, joint pain, petechial rash, and elevated inflammatory markers are consistent with DGI, particularly in a sexually active individual."
              }
            },
            {
              "stem": "Select the most common organism causing osteomyelitis in children under 3 years.",
              "modelAnswer": "Staphylococcus aureus."
            },
            {
              "stem": "Which of the following statements is CORRECT regarding Vibrio cholerae infection?",
              "modelAnswer": {
                "a": "The organism is isolated from a stool sample (not blood).",
                "b": "The natural reservoir of the organism is environmental water sources (not domestic animals).",
                "c": "The LPS complex is a virulence factor, but the main virulence factor is the cholera toxin (an enterotoxin).",
                "d": "The correct statement: An enterotoxin is the main virulence factor."
              }
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "B.C. is a 49-year-old obese woman presenting to the emergency department with a 1-week history of fever, confusion, delirium, abdominal pain, headache, anorexia, and diarrhea. She returned 10 days ago from Mathare slums, where she stayed with relatives recovering from typhoid fever. Her medical history is significant for gallstones. Admission vital signs: temperature 38.3°C, heart rate 60 bpm, blood pressure stable. Physical examination: splenomegaly, hepatomegaly. Labs: WBC 3.0 x10⁶/µL, liver function tests mildly elevated. Blood cultures are pending.",
              "modelAnswer": {
                "a": "Most likely presumptive diagnosis and probable causative agent:",
                "   i": "Avoid consumption of contaminated water or food in endemic areas.",
                "   ii": "Vaccination against typhoid fever (e.g., Vi polysaccharide vaccine or oral Ty21a vaccine) before travel to endemic areas.",
                "b": "Why history, presentation, and labs are consistent with this diagnosis:",
                "   iii": "Oral Amoxicillin 1 g three times daily for 28 days (if susceptible).",
                "   iv": "Cholecystectomy (if gallstones are present and the patient is a chronic carrier).",
                "   v": "Mildly elevated liver function tests are consistent with typhoid hepatitis.",
                "c": "Three benefits of antimicrobial treatment in B.C.:",
                "d": "Appropriate treatment plan for B.C.:",
                "e": "Four therapeutic options to cure B.C.’s chronic carrier state (if stool remains positive after 14 days of treatment):",
                "f": "Two preventive measures against B.C.’s condition:"
              }
            },
            {
              "stem": "A 5-year-old boy from Mwea is brought to the outpatient department. He was well until this morning when he woke up feeling tired and vomited after breakfast. His mother reports he felt hot, so she gave him a half tablet of paracetamol. Examination: well-nourished 20 kg child, alert, not pale, axillary temperature 38.5°C. Social history: recently traveled to Mwea for a family function. Rest of the physical examination is normal.",
              "modelAnswer": {
                "a": "Most likely diagnosis and causative agent:",
                "   i": "Complete the full course of antimalarials as prescribed to ensure cure and prevent resistance.",
                "   ii": "Use mosquito bite prevention measures (e.g., insecticide-treated bed nets, repellents) to avoid future infections.",
                "b": "Justification for diagnosis:",
                "   iii": "Monitor the child for signs of worsening illness (e.g., persistent vomiting, seizures, altered consciousness) and seek medical attention immediately if these occur.",
                "   iv": "Absence of other focal signs (e.g., rash, cough) makes malaria more likely.",
                "c": "Three diagnostic tests and their utility:",
                "d": "Elaborate treatment plan for this patient:",
                "      - Artemether-lumefantrine (Coartem®) 20/120 mg tablets: Dose based on weight (20 kg child = 3 tablets per dose). Administer at 0, 8, 24, 36, 48, and 60 hours (total 6 doses). Take with fatty food to enhance absorption. Duration: 3 days (6 doses). Monitor for vomiting; repeat dose if vomited within 30 minutes of administration. If vomiting persists, consider IV artesunate or quinine (though IV artesunate is preferred in severe malaria). Alternatively, oral dihydroartemisinin-piperaquine (Eurartesim®) 20/160 mg tablets: 2 tablets per dose at 0, 24, and 48 hours (total 3 doses). Take on an empty stomach. Duration: 3 days (3 doses). Monitor for QT prolongation with ECG if possible. If vomiting persists, switch to IV artesunate. If artesunate is unavailable, use IV quinine (loading dose 20 mg/kg salt, then 10 mg/kg every 8 hours) with cardiac monitoring. Transition to oral therapy once able to tolerate fluids. If patient is unable to tolerate oral therapy, consider IV artesunate or quinine. If patient is severely ill (e.g., impaired consciousness, seizures, severe anemia, hypoglycemia), treat as severe malaria with IV artesunate 2.4 mg/kg at 0, 12, and 24 hours, then daily until able to tolerate oral therapy. Transition to oral artemisinin-based combination therapy (ACT) once stable. Supportive care: IV fluids for dehydration, antipyretics (e.g., paracetamol 15 mg/kg every 6 hours) for fever, and monitoring for complications (e.g., hypoglycemia, seizures). If patient is G6PD-deficient, avoid primaquine for radical cure (use single-dose primaquine 0.25 mg/kg if G6PD-normal). Counseling: Emphasize the importance of completing the full course of antimalarials to prevent recrudescence and resistance. Advise on mosquito bite prevention (e.g., insecticide-treated bed nets, repellents) to prevent future infections. Follow up in 1–2 weeks to ensure clearance of parasitemia and assess for complications.": "e. Three counseling points for the mother:"
              }
            },
            {
              "stem": "The patient is brought back later in the night. The mother reports that the boy has not been retaining anything. He has refused food but has drunk a little. The mother says the child had a 'fit' late afternoon; he regained consciousness immediately. For the past few hours, the child has been increasingly drowsy and has now become unconscious. Examination: well-nourished, unconscious, not dehydrated. Axillary temperature 40.2°C; pulse rate 120/min, regular; blood pressure 90/70 mmHg. No neck stiffness or rash. Pupils equal; a few retinal hemorrhages seen; no papilloedema. Some yellowish sticky fluid is seen filling the left external auditory meatus. Reflexes are normal.",
              "modelAnswer": {
                "a": "Most probable diagnosis and justification:",
                "   i": "Cerebral malaria has a high mortality rate, particularly in children. Even with prompt treatment, neurological sequelae (e.g., cognitive impairment, epilepsy) may occur. Long-term follow-up is essential to monitor for developmental delays and provide supportive care as needed.",
                "   ii": "Justification:",
                "      - Unconsciousness in a child with fever and travel to a malaria-endemic area is highly suggestive of cerebral malaria. The presence of retinal hemorrhages and normal pupillary reflexes further supports this diagnosis. The 'fit' (seizure) is consistent with cerebral involvement. The absence of neck stiffness and rash makes meningitis less likely. The yellowish sticky fluid in the external auditory meatus suggests otitis media, which may be a secondary infection but does not explain the unconsciousness.": "b. Appropriate treatment plan for this patient:",
                "      - Secure airway and ensure adequate oxygenation. Position the child in the recovery position to prevent aspiration. Monitor vital signs (temperature, pulse, blood pressure, oxygen saturation). Establish IV access for fluids and medications. Avoid overhydration to prevent cerebral edema. If hypoglycemia is suspected (e.g., in a child with altered consciousness), check blood glucose and administer IV dextrose 10% 2–5 mL/kg if <40 mg/dL. If seizures occur, administer IV or rectal diazepam (0.3–0.5 mg/kg) or IV phenobarbital (15–20 mg/kg loading dose). Avoid phenytoin in malaria due to risk of hypotension and arrhythmias. Antimalarial therapy: IV artesunate 2.4 mg/kg at 0, 12, and 24 hours, then daily until able to tolerate oral therapy. Transition to oral artemisinin-based combination therapy (e.g., artemether-lumefantrine) once stable and able to tolerate fluids. Supportive care: IV fluids (e.g., normal saline or Ringer's lactate) to maintain hydration and blood pressure. Avoid hypotonic fluids to prevent cerebral edema. Monitor for complications (e.g., hypoglycemia, seizures, anemia, renal failure). If the child develops severe anemia (Hb <5 g/dL), consider blood transfusion. If renal failure occurs, consider dialysis if available. If pulmonary edema or acute respiratory distress syndrome (ARDS) develops, provide supportive care with oxygen and mechanical ventilation if necessary. If the child develops shock (e.g., blood pressure 90/70 mmHg), administer IV fluids cautiously and consider vasopressors if refractory. If otitis media is present, administer empirical antibiotics (e.g., IV ceftriaxone) to cover common pathogens (e.g., Streptococcus pneumoniae, Haemophilus influenzae). Monitoring: Continuous monitoring of vital signs, neurological status, and urine output. Repeat blood smears every 12–24 hours to assess parasitemia and response to therapy. If parasitemia persists >72 hours, consider alternative therapy or resistance. Counseling: Emphasize the importance of completing the full course of antimalarials to prevent recrudescence and resistance. Advise on mosquito bite prevention measures to avoid future infections. Follow up in 1–2 weeks to ensure clearance of parasitemia and assess for complications.": "c. Prognosis and long-term considerations:"
              }
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Infections I",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 28-year-old farmer presents with progressive weakness of his upper limbs over 48 hours, followed by descending paralysis. He reports no fever but has diplopia and dysphagia. He recently consumed home-canned beans. Which toxin is most likely responsible for his symptoms?",
              "options": [
                "Tetanus toxin",
                "Diphtheria exotoxin",
                "Botulinum toxin",
                "Staphylococcus enterotoxin"
              ],
              "answer": "Botulinum toxin",
              "explanation": "Descending flaccid paralysis with preserved consciousness and no fever is classic for botulism, typically from preformed toxin in improperly preserved foods."
            },
            {
              "stem": "A 22-year-old student develops bloody diarrhea 3 days after eating undercooked chicken at a campus barbecue. Stool culture confirms Campylobacter jejuni. Which antimicrobial is first-line for this infection?",
              "options": [
                "Ciprofloxacin",
                "Azithromycin",
                "Metronidazole",
                "Doxycycline"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin is the preferred agent for Campylobacter enteritis due to high resistance rates to fluoroquinolones in many regions."
            },
            {
              "stem": "A 6-year-old child with sickle cell disease presents with acute right knee pain and fever. Blood cultures grow Salmonella species. Which organism is most likely responsible for his osteomyelitis?",
              "options": [
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Salmonella enterica",
                "Pseudomonas aeruginosa"
              ],
              "answer": "Salmonella enterica",
              "explanation": "Salmonella is the most common cause of osteomyelitis in patients with sickle cell disease due to functional asplenia and impaired opsonization."
            },
            {
              "stem": "A 35-year-old man returns from a safari in Maasai Mara with migratory swellings on his arm that last 2–3 days. He recalls being bitten by flies. Which vector is most likely responsible for his infection?",
              "options": [
                "Anopheles mosquito",
                "Culex mosquito",
                "Chrysops deerfly",
                "Aedes aegypti"
              ],
              "answer": "Chrysops deerfly",
              "explanation": "Chrysops deerflies transmit Loa loa, causing loiasis characterized by Calabar swellings and microfilariae in blood."
            },
            {
              "stem": "A 45-year-old woman presents with fever, confusion, and a new macular rash on her trunk 10 days after returning from a rural area with poor sanitation. Blood cultures are pending. Which organism is most likely causing her typhoid fever?",
              "options": [
                "Salmonella Typhi",
                "Shigella dysenteriae",
                "Vibrio cholerae",
                "Escherichia coli"
              ],
              "answer": "Salmonella Typhi",
              "explanation": "Typhoid fever presents with fever, confusion, and rash (rose spots) after exposure to contaminated food/water in endemic areas."
            },
            {
              "stem": "A 10-year-old boy develops sudden onset of fever, joint pain, and a pustular rash on his arms 48 hours after a camping trip. He is sexually active. Which organism is most likely responsible for his septic arthritis?",
              "options": [
                "Neisseria gonorrhoeae",
                "Staphylococcus aureus",
                "Streptococcus pyogenes",
                "Haemophilus influenzae"
              ],
              "answer": "Neisseria gonorrhoeae",
              "explanation": "Gonococcal arthritis typically presents with fever, tenosynovitis, and pustular skin lesions in sexually active individuals."
            },
            {
              "stem": "A 7-year-old child with acute watery diarrhea (>15 stools/day) and signs of severe dehydration is admitted. Stool culture confirms Vibrio cholerae. Which mechanism explains the profuse diarrhea?",
              "options": [
                "ADP-ribosylation of elongation factor 2",
                "ADP-ribosylation of stimulatory G proteins increasing cAMP",
                "Formation of cation-selective pores in enterocytes",
                "Inhibition of Na+/K+ ATPase"
              ],
              "answer": "ADP-ribosylation of stimulatory G proteins increasing cAMP",
              "explanation": "Cholera toxin ADP-ribosylates Gs proteins, permanently activating adenylate cyclase and increasing cAMP, leading to chloride secretion and watery diarrhea."
            },
            {
              "stem": "A 24-year-old woman presents with multiple painless, cauliflower-like lesions on her vulva. HPV typing confirms HPV-6. Which clinical syndrome is most likely?",
              "options": [
                "Cervical cancer",
                "Anogenital warts",
                "Vulvar intraepithelial neoplasia",
                "Pelvic inflammatory disease"
              ],
              "answer": "Anogenital warts",
              "explanation": "HPV-6 and HPV-11 are low-risk types causing anogenital warts (condyloma acuminata), while high-risk types (16, 18) cause neoplasia."
            },
            {
              "stem": "A 30-year-old man sustains a dog bite to his hand while traveling in a rabies-endemic area. He has no prior rabies vaccination. Which post-exposure prophylaxis regimen is indicated?",
              "options": [
                "Rabies vaccine alone on days 0, 3, 7, 14, 28",
                "Rabies vaccine plus human rabies immunoglobulin (HRIG) infiltrated into the wound",
                "HRIG alone infiltrated into the wound",
                "No prophylaxis needed if wound is clean"
              ],
              "answer": "Rabies vaccine plus human rabies immunoglobulin (HRIG) infiltrated into the wound",
              "explanation": "Post-exposure prophylaxis for rabies requires both rabies vaccine (days 0, 3, 7, 14, 28) and HRIG infiltrated into the wound to neutralize virus at the inoculation site."
            },
            {
              "stem": "A 5-year-old child with 5 days of watery diarrhea, vomiting, and fever is admitted with severe dehydration. Which adjunctive therapy improves outcomes?",
              "options": [
                "Vitamin A supplementation",
                "Zinc supplementation",
                "Iron supplementation",
                "Vitamin D supplementation"
              ],
              "answer": "Zinc supplementation",
              "explanation": "Zinc reduces duration and severity of diarrhea in children, especially in resource-limited settings, by enhancing intestinal repair and immune function."
            },
            {
              "stem": "A 12-year-old boy with acute hematogenous osteomyelitis of the tibia shows no clinical improvement after 3 days of IV cloxacillin. Imaging reveals a 2 cm abscess. Which laboratory marker is most useful for monitoring early treatment response?",
              "options": [
                "White blood cell count",
                "Erythrocyte sedimentation rate (ESR)",
                "C-reactive protein (CRP)",
                "Procalcitonin"
              ],
              "answer": "C-reactive protein (CRP)",
              "explanation": "CRP rises rapidly with infection and normalizes faster than ESR, making it the most expeditious marker for early treatment response in osteomyelitis."
            },
            {
              "stem": "A 28-year-old man presents with fever, right knee swelling, and pain after a soccer injury. Joint aspirate shows >50,000 WBC/mm³ with 90% neutrophils. Which organism is most likely responsible?",
              "options": [
                "Neisseria gonorrhoeae",
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Escherichia coli"
              ],
              "answer": "Staphylococcus aureus",
              "explanation": "Staphylococcus aureus is the most common cause of septic arthritis in adults, often following trauma or hematogenous spread."
            },
            {
              "stem": "A 40-year-old man with uncontrolled diabetes presents with a dog bite wound to his leg that is erythematous, swollen, and tender. Which antimicrobial is most appropriate for empiric therapy?",
              "options": [
                "Amoxicillin-clavulanate",
                "Ciprofloxacin",
                "Clindamycin",
                "Trimethoprim-sulfamethoxazole"
              ],
              "answer": "Amoxicillin-clavulanate",
              "explanation": "Amoxicillin-clavulanate provides coverage against Pasteurella multocida (common in dog bites) and oral anaerobes, making it first-line for bite wounds."
            },
            {
              "stem": "A 6-month-old infant presents with fever, irritability, and refusal to bear weight on the right leg. Blood cultures grow Staphylococcus aureus. Which empirical IV antibiotic regimen is most appropriate?",
              "options": [
                "Cloxacillin 50 mg/kg/dose every 6 hours",
                "Ceftriaxone 50 mg/kg once daily",
                "Gentamicin 2.5 mg/kg/dose every 8 hours",
                "Vancomycin 15 mg/kg/dose every 6 hours"
              ],
              "answer": "Cloxacillin 50 mg/kg/dose every 6 hours",
              "explanation": "Cloxacillin (or nafcillin) is first-line for methicillin-susceptible Staphylococcus aureus osteomyelitis in children due to excellent bone penetration."
            },
            {
              "stem": "A 3-year-old child develops sudden onset of fever, bloody diarrhea, and oliguria 3 days after eating undercooked beef. Stool culture confirms E. coli O157:H7. Which complication is most likely?",
              "options": [
                "Hemolytic uremic syndrome (HUS)",
                "Toxic megacolon",
                "Peritonitis",
                "Intussusception"
              ],
              "answer": "Hemolytic uremic syndrome (HUS)",
              "explanation": "E. coli O157:H7 produces Shiga toxin causing microangiopathic hemolytic anemia, thrombocytopenia, and acute kidney injury (HUS)."
            },
            {
              "stem": "A 25-year-old woman presents with fever, migratory arthralgias, and a petechial rash after returning from a hiking trip. Blood cultures are pending. Which organism is most likely responsible for her disseminated infection?",
              "options": [
                "Borrelia burgdorferi",
                "Rickettsia rickettsii",
                "Leptospira interrogans",
                "Brucella melitensis"
              ],
              "answer": "Leptospira interrogans",
              "explanation": "Leptospirosis presents with fever, myalgias, conjunctival suffusion, and rash after exposure to contaminated water, especially in tropical regions."
            },
            {
              "stem": "A 14-year-old boy presents with fever, sore throat, and a grayish pseudomembrane on his tonsils. Which organism is responsible for his diphtheria?",
              "options": [
                "Corynebacterium diphtheriae",
                "Streptococcus pyogenes",
                "Arcanobacterium haemolyticum",
                "Fusobacterium necrophorum"
              ],
              "answer": "Corynebacterium diphtheriae",
              "explanation": "Diphtheria is caused by Corynebacterium diphtheriae, producing an exotoxin leading to pseudomembrane formation and systemic toxicity."
            },
            {
              "stem": "A 7-year-old girl presents with intense perianal itching and irritability. Scotch tape test reveals flattened eggs. Which organism is responsible?",
              "options": [
                "Ascaris lumbricoides",
                "Enterobius vermicularis",
                "Trichuris trichiura",
                "Taenia saginata"
              ],
              "answer": "Enterobius vermicularis",
              "explanation": "Enterobius vermicularis (pinworm) causes perianal itching, especially at night, with flattened eggs visible on scotch tape test."
            },
            {
              "stem": "A 30-year-old man presents with fever, jaundice, and dark urine 2 weeks after returning from a rural area. Which organism is most likely responsible for his leptospirosis?",
              "options": [
                "Leptospira interrogans",
                "Brucella abortus",
                "Francisella tularensis",
                "Yersinia pestis"
              ],
              "answer": "Leptospira interrogans",
              "explanation": "Leptospirosis presents with fever, jaundice (Weil's syndrome), and renal failure after exposure to contaminated water or soil."
            },
            {
              "stem": "A 50-year-old man with a history of alcohol use disorder presents with fever, cough, and foul-smelling sputum. Chest X-ray shows a lung abscess. Which organism is most likely responsible?",
              "options": [
                "Klebsiella pneumoniae",
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Anaerobic bacteria (e.g., Bacteroides)"
              ],
              "answer": "Anaerobic bacteria (e.g., Bacteroides)",
              "explanation": "Lung abscesses in alcoholics are often polymicrobial, with anaerobic bacteria (e.g., Bacteroides, Fusobacterium) being predominant."
            },
            {
              "stem": "A 20-year-old woman presents with fever, dysuria, and flank pain. Urine culture grows Escherichia coli. Which virulence factor is most important for her ascending urinary tract infection?",
              "options": [
                "Shiga toxin",
                "P fimbriae",
                "Heat-labile toxin",
                "Verotoxin"
              ],
              "answer": "P fimbriae",
              "explanation": "P fimbriae (P adhesins) mediate attachment to uroepithelial cells, enabling ascending infection in the urinary tract."
            },
            {
              "stem": "A 6-month-old infant presents with fever, cough, and wheezing. Nasopharyngeal aspirate confirms respiratory syncytial virus (RSV). Which antiviral is indicated?",
              "options": [
                "Ribavirin",
                "Oseltamivir",
                "Acyclovir",
                "No antiviral indicated"
              ],
              "answer": "No antiviral indicated",
              "explanation": "RSV infection in infants is managed supportively; ribavirin is rarely used due to limited efficacy and toxicity."
            },
            {
              "stem": "A 35-year-old man presents with fever, headache, and a macular rash on his wrists and ankles after a camping trip. Which organism is most likely responsible?",
              "options": [
                "Rickettsia rickettsii",
                "Borrelia burgdorferi",
                "Leptospira interrogans",
                "Yersinia pestis"
              ],
              "answer": "Rickettsia rickettsii",
              "explanation": "Rocky Mountain spotted fever (RMSF) presents with fever, headache, and petechial rash after tick bite, caused by Rickettsia rickettsii."
            },
            {
              "stem": "A 4-year-old child presents with fever, sore throat, and a sandpaper-like rash. Which organism is responsible for his scarlet fever?",
              "options": [
                "Streptococcus pyogenes",
                "Staphylococcus aureus",
                "Corynebacterium diphtheriae",
                "Arcanobacterium haemolyticum"
              ],
              "answer": "Streptococcus pyogenes",
              "explanation": "Scarlet fever is caused by Streptococcus pyogenes (group A Streptococcus) producing pyrogenic exotoxins leading to rash and strawberry tongue."
            },
            {
              "stem": "A 28-year-old woman presents with fever, arthralgias, and a target lesion (erythema migrans) after a hiking trip. Which organism is responsible?",
              "options": [
                "Borrelia burgdorferi",
                "Rickettsia rickettsii",
                "Leptospira interrogans",
                "Brucella melitensis"
              ],
              "answer": "Borrelia burgdorferi",
              "explanation": "Lyme disease (early localized stage) presents with erythema migrans, fever, and arthralgias after Ixodes tick bite."
            },
            {
              "stem": "A 55-year-old man with diabetes presents with a painful, swollen right ear canal and fever. Which organism is most likely responsible for his malignant otitis externa?",
              "options": [
                "Pseudomonas aeruginosa",
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Candida albicans"
              ],
              "answer": "Pseudomonas aeruginosa",
              "explanation": "Malignant otitis externa in diabetics is typically caused by Pseudomonas aeruginosa, requiring prolonged IV antipseudomonal therapy."
            },
            {
              "stem": "A 30-year-old man presents with fever, cough, and hemoptysis 3 weeks after returning from a rural area. Chest X-ray shows upper lobe cavitation. Which organism is most likely responsible?",
              "options": [
                "Mycobacterium tuberculosis",
                "Klebsiella pneumoniae",
                "Staphylococcus aureus",
                "Histoplasma capsulatum"
              ],
              "answer": "Mycobacterium tuberculosis",
              "explanation": "Post-primary tuberculosis presents with upper lobe cavitary lesions, fever, and hemoptysis after reactivation of latent infection."
            },
            {
              "stem": "A 40-year-old woman presents with fever, confusion, and a new macular rash on her trunk 10 days after returning from a rural area with poor sanitation. Blood cultures grow Salmonella Typhi. Which complication is most likely?",
              "options": [
                "Gastrointestinal perforation",
                "Acute kidney injury",
                "Myocarditis",
                "Hemolytic uremic syndrome"
              ],
              "answer": "Gastrointestinal perforation",
              "explanation": "Typhoid fever complications include intestinal perforation (especially in the ileum) due to Peyer's patch necrosis, presenting with peritonitis."
            },
            {
              "stem": "A 6-year-old child presents with fever, cough, and wheezing. Nasopharyngeal aspirate confirms Bordetella pertussis. Which antimicrobial is indicated?",
              "options": [
                "Azithromycin",
                "Ciprofloxacin",
                "Amoxicillin",
                "Metronidazole"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin is first-line for pertussis, reducing transmission and severity if given early in the catarrhal phase."
            },
            {
              "stem": "A 25-year-old man presents with fever, dysuria, and a purulent urethral discharge. Gram stain shows gram-negative diplococci. Which organism is responsible?",
              "options": [
                "Neisseria gonorrhoeae",
                "Chlamydia trachomatis",
                "Mycoplasma genitalium",
                "Ureaplasma urealyticum"
              ],
              "answer": "Neisseria gonorrhoeae",
              "explanation": "Gonorrhea presents with purulent urethritis; gram-negative diplococci on Gram stain are diagnostic for Neisseria gonorrhoeae."
            },
            {
              "stem": "A 70-year-old man with COPD presents with fever, cough, and purulent sputum. Chest X-ray shows a right lower lobe infiltrate. Which organism is most likely responsible?",
              "options": [
                "Streptococcus pneumoniae",
                "Haemophilus influenzae",
                "Moraxella catarrhalis",
                "Klebsiella pneumoniae"
              ],
              "answer": "Streptococcus pneumoniae",
              "explanation": "Streptococcus pneumoniae is the most common cause of community-acquired pneumonia, including in COPD patients."
            },
            {
              "stem": "A 3-year-old child presents with fever, vomiting, and a stiff neck. Lumbar puncture shows CSF with 500 WBC/mm³ (90% neutrophils), low glucose, and high protein. Which organism is most likely responsible?",
              "options": [
                "Neisseria meningitidis",
                "Streptococcus pneumoniae",
                "Haemophilus influenzae type b",
                "Escherichia coli"
              ],
              "answer": "Neisseria meningitidis",
              "explanation": "Meningococcal meningitis presents with acute onset of fever, meningismus, and CSF findings of low glucose and high protein with neutrophilic pleocytosis."
            },
            {
              "stem": "A 45-year-old woman presents with fever, cough, and rust-colored sputum. Chest X-ray shows a right middle lobe consolidation. Which organism is most likely responsible?",
              "options": [
                "Streptococcus pneumoniae",
                "Klebsiella pneumoniae",
                "Staphylococcus aureus",
                "Pseudomonas aeruginosa"
              ],
              "answer": "Streptococcus pneumoniae",
              "explanation": "Streptococcus pneumoniae is the most common cause of lobar pneumonia with rust-colored sputum due to alveolar hemorrhage."
            },
            {
              "stem": "A 28-year-old man presents with fever, cough, and night sweats 3 weeks after returning from a rural area. Chest X-ray shows hilar lymphadenopathy. Which organism is most likely responsible?",
              "options": [
                "Mycobacterium tuberculosis",
                "Histoplasma capsulatum",
                "Coccidioides immitis",
                "Blastomyces dermatitidis"
              ],
              "answer": "Histoplasma capsulatum",
              "explanation": "Histoplasmosis presents with fever, cough, and hilar lymphadenopathy after exposure to bird/bat droppings in endemic areas."
            },
            {
              "stem": "A 5-year-old child presents with fever, sore throat, and a 'strawberry tongue.' Which organism is responsible for his scarlet fever?",
              "options": [
                "Streptococcus pyogenes",
                "Staphylococcus aureus",
                "Corynebacterium diphtheriae",
                "Arcanobacterium haemolyticum"
              ],
              "answer": "Streptococcus pyogenes",
              "explanation": "Scarlet fever is caused by Streptococcus pyogenes producing pyrogenic exotoxins, leading to 'strawberry tongue' and sandpaper rash."
            },
            {
              "stem": "A 30-year-old man presents with fever, cough, and hemoptysis 2 months after returning from a rural area. Chest X-ray shows a solitary pulmonary nodule. Which organism is most likely responsible?",
              "options": [
                "Coccidioides immitis",
                "Histoplasma capsulatum",
                "Blastomyces dermatitidis",
                "Mycobacterium tuberculosis"
              ],
              "answer": "Coccidioides immitis",
              "explanation": "Coccidioidomycosis presents with fever, cough, and pulmonary nodules after exposure to soil in endemic Southwestern U.S. regions."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 10-year-old boy with sickle cell disease presents with fever and right knee pain. Blood cultures grow Salmonella species. a) Identify the most likely diagnosis. b) Outline the pharmacological management (include dose and duration). c) List two non-pharmacological interventions.",
              "modelAnswer": "a) Acute osteomyelitis due to Salmonella species.\n\nb) Pharmacological management:\n- IV ceftriaxone 75 mg/kg once daily (max 2 g/day) for 4–6 weeks, followed by oral ciprofloxacin 15 mg/kg twice daily (max 500 mg/dose) for 2–4 weeks to complete 6 weeks total therapy.\n- Analgesia: Paracetamol 15 mg/kg/dose every 6 hours as needed (max 60 mg/kg/day).\n\nc) Non-pharmacological interventions:\n- Immobilization of the affected limb with a splint to reduce pain and prevent pathological fractures.\n- Physical therapy after acute phase to restore function and prevent contractures."
            },
            {
              "stem": "A 25-year-old woman presents with fever, joint pain, and a petechial rash after returning from a hiking trip. Blood cultures are pending. a) Identify the most likely diagnosis. b) List three diagnostic tests to confirm the diagnosis. c) Outline the empirical antimicrobial therapy.",
              "modelAnswer": "a) Leptospirosis.\n\nb) Diagnostic tests:\n- Serum microscopic agglutination test (MAT) for Leptospira antibodies (gold standard).\n- PCR for Leptospira DNA in blood or urine (early phase).\n- Dark-field microscopy of urine for leptospires (less sensitive).\n\nc) Empirical antimicrobial therapy:\n- IV benzylpenicillin 1.2 million units every 6 hours for 7 days OR\n- IV doxycycline 200 mg once daily for 7 days (if penicillin-allergic)."
            },
            {
              "stem": "A 6-month-old infant presents with fever, cough, and wheezing. Nasopharyngeal aspirate confirms respiratory syncytial virus (RSV). a) Outline the supportive care for this patient. b) List two high-risk groups for severe RSV infection. c) When is palivizumab prophylaxis indicated?",
              "modelAnswer": "a) Supportive care:\n- Oxygen therapy if SpO2 <90%.\n- Hydration with oral or IV fluids as needed.\n- Antipyretics (paracetamol 15 mg/kg/dose every 6 hours) for fever.\n- Nebulized 3% saline to improve mucus clearance (optional).\n\nb) High-risk groups for severe RSV infection:\n- Premature infants (<35 weeks gestation).\n- Infants with chronic lung disease (e.g., bronchopulmonary dysplasia).\n\nc) Palivizumab prophylaxis is indicated for:\n- Infants born at <29 weeks gestation during their first RSV season.\n- Infants with hemodynamically significant congenital heart disease or chronic lung disease of prematurity."
            },
            {
              "stem": "A 3-year-old child presents with fever, bloody diarrhea, and oliguria 3 days after eating undercooked beef. Stool culture confirms E. coli O157:H7. a) Identify the most likely complication. b) Outline the management of this complication. c) List two preventive measures for this infection.",
              "modelAnswer": "a) Hemolytic uremic syndrome (HUS).\n\nb) Management of HUS:\n- Supportive care: Fluid and electrolyte balance, blood pressure control, and dialysis if indicated (e.g., severe hyperkalemia, uremia, or fluid overload).\n- Avoid antimotility agents and antibiotics (may increase toxin release and worsen HUS).\n- Transfusion if severe anemia or thrombocytopenia.\n\nc) Preventive measures:\n- Cook beef thoroughly to an internal temperature of 71°C (160°F).\n- Avoid unpasteurized dairy products and contaminated water."
            },
            {
              "stem": "A 28-year-old man presents with fever, dysuria, and a purulent urethral discharge. Gram stain shows gram-negative diplococci. a) Identify the organism responsible. b) Outline the first-line antimicrobial therapy (include dose and duration). c) List two complications if untreated.",
              "modelAnswer": "a) Neisseria gonorrhoeae.\n\nb) First-line antimicrobial therapy:\n- Ceftriaxone 500 mg IM as a single dose (if <150 kg) OR 1 g IM if ≥150 kg.\n- If chlamydial co-infection is suspected (common), add azithromycin 1 g orally as a single dose OR doxycycline 100 mg orally twice daily for 7 days.\n\nc) Complications if untreated:\n- Disseminated gonococcal infection (e.g., septic arthritis, tenosynovitis, dermatitis).\n- Pelvic inflammatory disease (PID) in women, leading to infertility or ectopic pregnancy."
            },
            {
              "stem": "A 40-year-old woman presents with fever, confusion, and a new macular rash on her trunk 10 days after returning from a rural area with poor sanitation. Blood cultures grow Salmonella Typhi. a) Identify the most likely diagnosis. b) Outline the antimicrobial therapy (include dose and duration). c) List two preventive measures.",
              "modelAnswer": "a) Typhoid fever.\n\nb) Antimicrobial therapy:\n- First-line: Oral azithromycin 1 g once daily for 5–7 days OR\n- IV ceftriaxone 2 g once daily for 10–14 days (if severe or unable to tolerate oral therapy).\n- Alternative: Oral ciprofloxacin 500 mg twice daily for 7–10 days (if local resistance patterns allow).\n\nc) Preventive measures:\n- Safe food and water practices (boil water, avoid raw vegetables, peel fruits).\n- Typhoid vaccination (inactivated or live oral) for travelers to endemic areas."
            },
            {
              "stem": "A 7-year-old child presents with fever, sore throat, and a sandpaper-like rash. a) Identify the organism responsible. b) Outline the first-line antimicrobial therapy (include dose and duration). c) List two complications if untreated.",
              "modelAnswer": "a) Streptococcus pyogenes (Group A Streptococcus).\n\nb) First-line antimicrobial therapy:\n- Oral penicillin V 250 mg twice daily (children) or 500 mg twice daily (adults) for 10 days.\n- Alternative: Amoxicillin 50 mg/kg/day divided into two doses for 10 days (max 1 g/day).\n- If penicillin-allergic: Azithromycin 12 mg/kg once daily for 5 days (max 500 mg/day).\n\nc) Complications if untreated:\n- Rheumatic fever (acute rheumatic carditis, arthritis, chorea).\n- Post-streptococcal glomerulonephritis."
            },
            {
              "stem": "A 25-year-old man presents with fever, cough, and hemoptysis 3 weeks after returning from a rural area. Chest X-ray shows upper lobe cavitation. a) Identify the most likely diagnosis. b) Outline the diagnostic tests to confirm the diagnosis. c) List two first-line antimicrobial agents.",
              "modelAnswer": "a) Post-primary pulmonary tuberculosis.\n\nb) Diagnostic tests:\n- Sputum acid-fast bacilli (AFB) smear and culture (gold standard).\n- GeneXpert MTB/RIF assay for rapid detection of Mycobacterium tuberculosis and rifampicin resistance.\n- Chest X-ray (shows upper lobe cavitation).\n- Tuberculin skin test (TST) or interferon-gamma release assay (IGRA) for latent TB screening.\n\nc) First-line antimicrobial agents (RIPE regimen):\n- Rifampicin 10 mg/kg/day (max 600 mg/day) for 6 months.\n- Isoniazid 5 mg/kg/day (max 300 mg/day) for 6 months.\n- Pyrazinamide 25 mg/kg/day (max 2 g/day) for 2 months.\n- Ethambutol 15 mg/kg/day (max 1.2 g/day) for 2 months."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 45-year-old obese woman presents to the emergency department with a 1-week history of fever, confusion, and delirium. She also reports abdominal pain, headache, and anorexia. One day before admission, she noted a new, red macular rash on her chest. Her history is significant for returning 10 days ago from Mathare slums, where she stayed with relatives recovering from typhoid fever. Admission vital signs: temperature 38.3°C, heart rate 60 bpm, blood pressure 110/70 mmHg. Physical examination reveals splenomegaly and hepatomegaly. Laboratory tests: WBC 3.0 × 10⁶/μL, hemoglobin 11.5 g/dL, platelets 120 × 10³/μL, ALT 85 U/L, AST 90 U/L, ALP 150 U/L, total bilirubin 2.1 mg/dL. Blood cultures are pending.\n\na) Identify the most likely presumptive diagnosis and the probable causative agent. (2 marks)\nb) Why is her history of present illness, clinical presentation, and laboratory results consistent with this diagnosis? Provide four points (1 mark each).\nc) Illustrate three benefits of antimicrobial treatment in this patient. (3 marks)\nd) Design an appropriate treatment plan for this patient (include adjunctive and supportive therapy). (5 marks)\n\nFourteen months after discharge from the hospital, the patient’s stool is still positive for the same microbial agent. Propose four therapeutic options that are available to cure her chronic carrier state. (4 marks)\n\ne) Outline two preventive measures against this condition. (2 marks)",
              "modelAnswer": "a) Presumptive diagnosis: Typhoid fever. Causative agent: Salmonella Typhi.\n\nb) Consistency with diagnosis:\n1. Exposure history: Returned from an endemic area (Mathare slums) where typhoid is prevalent, with close contact to cases.\n2. Clinical presentation: Fever, confusion (encephalopathy), abdominal pain, and a macular rash (rose spots) are classic for typhoid fever.\n3. Laboratory findings: Leukopenia (WBC 3.0 × 10⁶/μL) is typical in typhoid fever due to bone marrow suppression; mild transaminitis (ALT/AST elevation) reflects hepatic involvement.\n4. Splenomegaly and hepatomegaly: Reflect reticuloendothelial system involvement in typhoid infection.\n\nc) Benefits of antimicrobial treatment:\n1. Reduces mortality: Early treatment reduces the case fatality rate from ~10–30% (untreated) to <1%.\n2. Shortens duration of illness: Symptoms resolve within 3–5 days of appropriate therapy (vs. 3–4 weeks untreated).\n3. Prevents complications: Reduces risk of intestinal perforation, hemorrhage, and chronic carriage.\n\n\nd) Treatment plan:\n- Antimicrobial therapy: Oral azithromycin 1 g once daily for 7 days (preferred for uncomplicated typhoid in regions with fluoroquinolone resistance).\n- Supportive care: IV fluids (normal saline) for dehydration; antipyretics (paracetamol 1 g every 6 hours as needed) for fever.\n- Monitoring: Daily vital signs, CBC, liver function tests, and blood cultures (if available).\n- Adjunctive therapy: Nutritional support (high-calorie, high-protein diet) to aid recovery.\n- Infection control: Standard precautions; educate patient on hygiene to prevent transmission.\n\n\ne) Preventive measures:\n1. Safe food and water practices: Boil drinking water, avoid raw vegetables, peel fruits, and consume well-cooked food.\n2. Typhoid vaccination: Administer the Vi polysaccharide vaccine (inactivated) or live oral Ty21a vaccine before travel to endemic areas."
            },
            {
              "stem": "A 5-year-old boy is brought to the outpatient department by his mother. She reports that he was well until this morning when he woke up feeling tired and vomited after breakfast. His mother noted he felt hot and gave him a half tablet of paracetamol. On examination, he is alert, well-nourished (20 kg), not pale, and has an axillary temperature of 38.5°C. Social history reveals they recently traveled to Mwea for a family function. The rest of the physical examination is normal.\n\na) Identify the most likely diagnosis and causative agent. (2 marks)\n\nb) Justify your answer in (a) above with four points (0.5 marks each).\n\nc) Propose three diagnostic tests that would help confirm your diagnosis and elaborate on their utility. (3 marks)\n\nd) Compile an elaborate treatment plan for this patient (include the dosing regimen for all pharmacological agents). (4 marks)\n\ne) Illustrate three counselling points that you would offer the mother regarding treatment. (3 marks)\n\nThe patient is brought back later in the night. The mother reports that the boy has not been retaining anything. He has refused food but has drunk a little. The mother says the child had a 'fit' late afternoon; he regained consciousness immediately. For the past few hours, the child has been increasingly drowsy and has now become unconscious. At examination, the child is well-nourished, unconscious, and not dehydrated. Axillary temperature is 40.2°C; pulse rate 120/min (regular); blood pressure 90/70 mmHg. There is no neck stiffness or rash. Pupils are equal; a few retinal hemorrhages are seen; no papilloedema. Some yellowish sticky fluid is seen filling the left external auditory meatus. Reflexes are normal.\n\nf) Identify the most probable diagnosis and justify your answer. (2 marks)\n\ng) Design an appropriate treatment plan for this patient. (4 marks)"
            }
          ]
        }
      ]
    },
    "3": {
      "title": "Infections I",
      "variant": 3,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 28-year-old man presents with sudden onset of blurred vision, dry mouth, and descending flaccid paralysis 6 hours after eating home-canned beans. He denies fever or altered mental status. The most likely diagnosis is:",
              "options": [
                "Staphylococcus aureus food poisoning",
                "Clostridium botulinum intoxication",
                "Bacillus cereus emetic syndrome",
                "Salmonella enteritis"
              ],
              "answer": "Clostridium botulinum intoxication",
              "explanation": "Botulism presents with descending flaccid paralysis due to preformed neurotoxin; foodborne botulism follows ingestion of preformed toxin in improperly canned foods."
            },
            {
              "stem": "A 5-year-old child develops severe pharyngitis with a thick, gray pseudomembrane on the tonsils and anterior pharynx. The child is afebrile but appears toxic. The most likely causative organism is:",
              "options": [
                "Streptococcus pyogenes",
                "Corynebacterium diphtheriae",
                "Haemophilus influenzae",
                "Fusobacterium necrophorum"
              ],
              "answer": "Corynebacterium diphtheriae",
              "explanation": "Diphtheria is characterized by a pseudomembrane in the throat and systemic toxicity; caused by Corynebacterium diphtheriae producing diphtheria toxin."
            },
            {
              "stem": "A 65-year-old farmer presents with trismus, risus sardonicus, and generalized muscle spasms 10 days after stepping on a rusty nail. He is afebrile and alert. The most appropriate initial management is:",
              "options": [
                "Metronidazole 500 mg IV q8h",
                "Tetanus immunoglobulin 3000 IU IM plus Tdap vaccine",
                "Diazepam 5–10 mg IV for muscle spasms",
                "Penicillin G 2 million units IV q4h"
              ],
              "answer": "Tetanus immunoglobulin 3000 IU IM plus Tdap vaccine",
              "explanation": "Tetanus management includes passive immunization with tetanus immunoglobulin and active immunization with tetanus toxoid-containing vaccine; benzodiazepines are adjunctive for spasms."
            },
            {
              "stem": "A 22-year-old student develops bloody diarrhea and severe abdominal cramps 3 days after eating undercooked chicken at a barbecue. Stool culture grows oxidase-positive, curved, gram-negative rods. The most likely organism is:",
              "options": [
                "Salmonella enterica",
                "Campylobacter jejuni",
                "Escherichia coli O157:H7",
                "Shigella sonnei"
              ],
              "answer": "Campylobacter jejuni",
              "explanation": "Campylobacter jejuni is oxidase-positive, curved, gram-negative bacillus causing bloody diarrhea after poultry exposure; commonly isolated from stool cultures."
            },
            {
              "stem": "A 30-year-old woman presents with 10 days of profuse, rice-water diarrhea after drinking untreated water during a rural trek. Stool microscopy shows no fecal leukocytes. The likely mechanism of action of the causative toxin is:",
              "options": [
                "ADP-ribosylation of elongation factor 2",
                "ADP-ribosylation of stimulatory Gs protein leading to increased cAMP",
                "Formation of cation-selective pores in enterocyte membranes",
                "Inhibition of sodium-glucose cotransporter in the gut"
              ],
              "answer": "ADP-ribosylation of stimulatory Gs protein leading to increased cAMP",
              "explanation": "Cholera toxin ADP-ribosylates the stimulatory Gs protein, locking it in the active state and causing persistent elevation of intracellular cAMP, leading to massive chloride and water secretion."
            },
            {
              "stem": "A 10-year-old boy with sickle cell disease presents with acute onset of fever and right knee pain. Imaging reveals osteomyelitis of the distal femur. The most likely causative organism is:",
              "options": [
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Salmonella species",
                "Pseudomonas aeruginosa"
              ],
              "answer": "Salmonella species",
              "explanation": "In sickle cell disease, Salmonella is the most common cause of osteomyelitis due to functional asplenia and impaired opsonization."
            },
            {
              "stem": "A 25-year-old man presents with acute monoarthritis of the knee, fever, and a pustular rash on his arms. Synovial fluid analysis shows 50,000 WBC/mm³ with 90% neutrophils. The most likely causative organism is:",
              "options": [
                "Staphylococcus aureus",
                "Neisseria gonorrhoeae",
                "Streptococcus pyogenes",
                "Kingella kingae"
              ],
              "answer": "Neisseria gonorrhoeae",
              "explanation": "Gonococcal arthritis is common in sexually active adults and presents with monoarthritis, tenosynovitis, and pustular rash; synovial fluid shows high neutrophil count."
            },
            {
              "stem": "A 4-year-old child presents with 5 days of watery diarrhea, vomiting, and fever after attending a daycare center. The child is moderately dehydrated. In addition to oral rehydration solution, the most beneficial adjunctive therapy is:",
              "options": [
                "Zinc 20 mg/day for 10–14 days",
                "Vitamin A 200,000 IU single dose",
                "Ferrous sulfate 3 mg/kg/day",
                "Ascorbic acid 500 mg/day"
              ],
              "answer": "Zinc 20 mg/day for 10–14 days",
              "explanation": "Zinc supplementation reduces duration and severity of acute diarrhea in children, especially in resource-limited settings; WHO recommends 20 mg/day for 10–14 days."
            },
            {
              "stem": "A 19-year-old woman presents with multiple painless, skin-colored papules on her vulva and perianal area that have coalesced into cauliflower-like clusters. The most likely HPV type associated with these lesions is:",
              "options": [
                "HPV-1",
                "HPV-6",
                "HPV-16",
                "HPV-18"
              ],
              "answer": "HPV-6",
              "explanation": "HPV-6 and HPV-11 are low-risk types associated with anogenital warts (condyloma acuminata), while HPV-16 and 18 are high-risk types linked to cervical cancer."
            },
            {
              "stem": "A 35-year-old man is bitten by a stray dog on his forearm while hiking in Laikipia. The dog is unavailable for observation. The patient has completed a primary tetanus series and received a booster 8 years ago. The most appropriate post-exposure rabies prophylaxis includes:",
              "options": [
                "Rabies vaccine alone on days 0, 3, 7, 14, and 28",
                "Rabies vaccine on days 0, 3, 7, 14, and 28 plus human rabies immunoglobulin infiltrated into the wound",
                "Human rabies immunoglobulin infiltrated into the wound only",
                "No rabies prophylaxis needed if wound is cleaned"
              ],
              "answer": "Rabies vaccine on days 0, 3, 7, 14, and 28 plus human rabies immunoglobulin infiltrated into the wound",
              "explanation": "For category III exposures (bites or scratches), both rabies vaccine (5 doses) and human rabies immunoglobulin infiltrated into the wound are indicated."
            },
            {
              "stem": "A 28-year-old woman presents with migratory swellings on her arm and back that last 2–3 days, accompanied by pruritus and warmth. She recently returned from a 6-month stay in Cameroon. The most likely vector for her infection is:",
              "options": [
                "Anopheles mosquito",
                "Chrysops deerfly",
                "Culex mosquito",
                "Phlebotomus sandfly"
              ],
              "answer": "Chrysops deerfly",
              "explanation": "Loiasis is transmitted by the Chrysops deerfly; characterized by Calabar swellings and microfilariae in blood."
            },
            {
              "stem": "A 7-year-old boy presents with acute hematogenous osteomyelitis of the distal tibia. After 3 days of IV cloxacillin, he remains febrile with persistent pain. Imaging reveals a 2 cm subperiosteal abscess. The most appropriate next step is:",
              "options": [
                "Continue IV antibiotics and reassess in 48 hours",
                "Add gentamicin to broaden coverage",
                "Perform surgical drainage and debridement",
                "Switch to oral antibiotics and discharge"
              ],
              "answer": "Perform surgical drainage and debridement",
              "explanation": "Surgical drainage is indicated for subperiosteal abscess in acute osteomyelitis not responding to 48–72 hours of appropriate IV antibiotics."
            },
            {
              "stem": "A 45-year-old man presents with fever, right knee pain, and swelling 3 days after a minor knee injury. Synovial fluid shows 80,000 WBC/mm³ with 95% neutrophils. Blood cultures are pending. The most appropriate empiric antibiotic is:",
              "options": [
                "Vancomycin 1 g IV q12h",
                "Ceftriaxone 1 g IV daily",
                "Clindamycin 600 mg IV q8h",
                "Ciprofloxacin 400 mg IV q12h"
              ],
              "answer": "Vancomycin 1 g IV q12h",
              "explanation": "Empiric therapy for septic arthritis should cover Staphylococcus aureus (including MRSA) with vancomycin until culture results are available."
            },
            {
              "stem": "A 20-year-old student develops cramping abdominal pain and bloody diarrhea 2 days after returning from a camping trip. Stool culture grows Campylobacter jejuni. The most appropriate antimicrobial therapy is:",
              "options": [
                "Azithromycin 500 mg PO once daily for 3 days",
                "Ciprofloxacin 500 mg PO twice daily for 7 days",
                "Metronidazole 500 mg PO three times daily for 7 days",
                "No antimicrobials needed"
              ],
              "answer": "Azithromycin 500 mg PO once daily for 3 days",
              "explanation": "Azithromycin is the preferred agent for Campylobacter enteritis due to increasing resistance to fluoroquinolones; duration is typically 3 days."
            },
            {
              "stem": "A 60-year-old diabetic man presents with a dog bite to his hand that is erythematous, swollen, and tender. He has no signs of systemic infection. He is allergic to sulfa drugs. The most appropriate empiric oral antibiotic is:",
              "options": [
                "Amoxicillin-clavulanate 875/125 mg PO q12h",
                "Ciprofloxacin 500 mg PO q12h",
                "Clindamycin 300 mg PO q8h",
                "Trimethoprim-sulfamethoxazole 160/800 mg PO q12h"
              ],
              "answer": "Amoxicillin-clavulanate 875/125 mg PO q12h",
              "explanation": "Amoxicillin-clavulanate provides coverage for Pasteurella multocida and oral anaerobes; safe in sulfa-allergic patients."
            },
            {
              "stem": "A 3-year-old child presents with fever, irritability, and refusal to bear weight on the right leg. Examination reveals localized warmth and tenderness over the distal femur. X-ray is normal. The most sensitive early diagnostic test is:",
              "options": [
                "Plain radiograph",
                "MRI",
                "Bone scintigraphy",
                "C-reactive protein (CRP)"
              ],
              "answer": "MRI",
              "explanation": "MRI is the most sensitive imaging modality for early detection of osteomyelitis, showing bone marrow edema within 24–48 hours of onset."
            },
            {
              "stem": "A 15-year-old boy presents with fever, fatigue, and pain in his right hip after a soccer game. He has limited internal rotation and pain on palpation of the greater trochanter. The most likely diagnosis is:",
              "options": [
                "Septic arthritis",
                "Transient synovitis",
                "Acute osteomyelitis",
                "Slipped capital femoral epiphysis"
              ],
              "answer": "Transient synovitis",
              "explanation": "Transient synovitis is the most common cause of acute hip pain in children, often post-viral or post-trauma, with normal or mildly elevated inflammatory markers."
            },
            {
              "stem": "A 25-year-old woman presents with fever, migratory polyarthritis, and a pustular rash on her palms and soles. She is sexually active with multiple partners. The most likely diagnosis is:",
              "options": [
                "Gonococcal arthritis",
                "Reactive arthritis",
                "Rheumatoid arthritis",
                "Lyme disease"
              ],
              "answer": "Gonococcal arthritis",
              "explanation": "Disseminated gonococcal infection presents with fever, tenosynovitis, migratory polyarthritis, and pustular rash; strongly associated with sexual activity."
            },
            {
              "stem": "A 40-year-old man presents with sudden onset of fever, vomiting, and profuse watery diarrhea after eating reheated rice. The most likely causative organism is:",
              "options": [
                "Bacillus cereus",
                "Clostridium perfringens",
                "Staphylococcus aureus",
                "Salmonella enterica"
              ],
              "answer": "Bacillus cereus",
              "explanation": "Bacillus cereus causes emetic-type food poisoning within 1–6 hours of ingesting reheated rice contaminated with heat-stable toxin."
            },
            {
              "stem": "A 6-month-old infant presents with severe watery diarrhea, vomiting, and signs of dehydration. Stool microscopy shows no fecal leukocytes. The most appropriate initial rehydration strategy is:",
              "options": [
                "Intravenous normal saline 20 mL/kg bolus",
                "Oral rehydration solution with low osmolarity",
                "Intravenous dextrose 5% in water",
                "Intravenous colloid solution"
              ],
              "answer": "Oral rehydration solution with low osmolarity",
              "explanation": "Oral rehydration solution with low osmolarity is the WHO-recommended first-line therapy for dehydration due to acute gastroenteritis."
            },
            {
              "stem": "A 30-year-old man presents with fever, headache, and diarrhea 1 week after returning from a trip to rural Western Kenya. He reports exposure to stagnant water. The most likely parasitic cause of his symptoms is:",
              "options": [
                "Entamoeba histolytica",
                "Giardia lamblia",
                "Schistosoma mansoni",
                "Ascaris lumbricoides"
              ],
              "answer": "Schistosoma mansoni",
              "explanation": "Schistosomiasis (bilharzia) is acquired through skin contact with freshwater containing cercariae; causes acute febrile illness (Katayama fever) and later hepatic/intestinal disease."
            },
            {
              "stem": "A 50-year-old woman presents with fever, confusion, and a new macular rash on her trunk 10 days after returning from a rural area. She reports exposure to ticks. Blood smear shows intraerythrocytic parasites. The most likely diagnosis is:",
              "options": [
                "Malaria",
                "Babesiosis",
                "Leptospirosis",
                "Lyme disease"
              ],
              "answer": "Malaria",
              "explanation": "Malaria presents with fever, confusion, and rash after travel to endemic areas; diagnosis confirmed by identification of Plasmodium parasites on blood smear."
            },
            {
              "stem": "A 12-year-old boy presents with intense perianal itching and irritability. Scotch tape test reveals oval eggs with a flattened side. The most likely organism is:",
              "options": [
                "Ascaris lumbricoides",
                "Enterobius vermicularis",
                "Trichuris trichiura",
                "Taenia saginata"
              ],
              "answer": "Enterobius vermicularis",
              "explanation": "Enterobius vermicularis (pinworm) causes perianal itching; diagnosis confirmed by identification of eggs on scotch tape test."
            },
            {
              "stem": "A 25-year-old man presents with fever, myalgia, and periorbital edema 3 weeks after eating undercooked pork. He has eosinophilia and elevated creatine kinase. The most likely diagnosis is:",
              "options": [
                "Taenia solium infection",
                "Trichinella spiralis infection",
                "Echinococcus granulosus infection",
                "Diphyllobothrium latum infection"
              ],
              "answer": "Trichinella spiralis infection",
              "explanation": "Trichinellosis follows ingestion of undercooked pork containing larvae; presents with fever, myalgia, periorbital edema, and eosinophilia."
            },
            {
              "stem": "A 40-year-old woman presents with fever, jaundice, and right upper quadrant pain 2 weeks after returning from a trip to India. Ultrasound shows a solitary liver cyst with internal echoes. The most appropriate treatment is:",
              "options": [
                "Metronidazole monotherapy",
                "Albendazole followed by drainage",
                "Praziquantel monotherapy",
                "Surgical resection"
              ],
              "answer": "Albendazole followed by drainage",
              "explanation": "Hydatid cyst (Echinococcus granulosus) is treated with albendazole to sterilize the cyst, followed by percutaneous drainage or surgery to remove the cyst."
            },
            {
              "stem": "A 35-year-old man presents with fever, cough, and hemoptysis 6 months after returning from a trip to East Africa. Chest X-ray shows a cavitary lesion in the right upper lobe. The most likely diagnosis is:",
              "options": [
                "Tuberculosis",
                "Paragonimiasis",
                "Histoplasmosis",
                "Coccidioidomycosis"
              ],
              "answer": "Tuberculosis",
              "explanation": "Tuberculosis is the most common cause of cavitary lung lesions worldwide; strongly associated with travel to endemic regions."
            },
            {
              "stem": "A 20-year-old woman presents with fever, arthralgia, and a maculopapular rash that started on her wrists and ankles and spread centrally. She reports a tick bite 2 weeks ago. The most likely diagnosis is:",
              "options": [
                "Rocky Mountain spotted fever",
                "Lyme disease",
                "Malaria",
                "Leptospirosis"
              ],
              "answer": "Rocky Mountain spotted fever",
              "explanation": "Rocky Mountain spotted fever presents with fever, rash starting on wrists/ankles, and history of tick bite; caused by Rickettsia rickettsii."
            },
            {
              "stem": "A 5-year-old child presents with fever, abdominal pain, and bloody diarrhea 2 days after attending a birthday party. Stool culture grows Shigella sonnei. The most appropriate antimicrobial therapy is:",
              "options": [
                "Azithromycin 10 mg/kg/day for 3 days",
                "Ciprofloxacin 15 mg/kg twice daily for 3 days",
                "Metronidazole 7.5 mg/kg three times daily for 7 days",
                "No antimicrobials needed"
              ],
              "answer": "Azithromycin 10 mg/kg/day for 3 days",
              "explanation": "Azithromycin is recommended for Shigella infections in children due to increasing resistance to fluoroquinolones; duration is typically 3 days."
            },
            {
              "stem": "A 60-year-old man presents with fever, confusion, and a petechial rash after a camping trip. Blood cultures grow gram-negative coccobacilli. The most likely diagnosis is:",
              "options": [
                "Brucellosis",
                "Leptospirosis",
                "Lyme disease",
                "Tularemia"
              ],
              "answer": "Leptospirosis",
              "explanation": "Leptospirosis presents with fever, confusion, petechial rash, and exposure to contaminated water; diagnosis confirmed by blood culture or serology."
            },
            {
              "stem": "A 30-year-old woman presents with fever, headache, and neck stiffness 1 week after returning from a safari in Kenya. Lumbar puncture shows 500 WBC/mm³ with 80% lymphocytes. The most likely diagnosis is:",
              "options": [
                "Bacterial meningitis",
                "Viral meningitis",
                "Cryptococcal meningitis",
                "Tuberculous meningitis"
              ],
              "answer": "Viral meningitis",
              "explanation": "Viral meningitis typically presents with lymphocytic pleocytosis and milder clinical course; common after travel to tropical regions."
            },
            {
              "stem": "A 45-year-old man presents with fever, cough, and hemoptysis 3 weeks after returning from a trip to South Sudan. Chest X-ray shows bilateral infiltrates. The most likely diagnosis is:",
              "options": [
                "Pneumococcal pneumonia",
                "Melioidosis",
                "Histoplasmosis",
                "Tuberculosis"
              ],
              "answer": "Melioidosis",
              "explanation": "Melioidosis is endemic in Southeast Asia and northern Australia; presents with pneumonia, sepsis, and can mimic tuberculosis."
            },
            {
              "stem": "A 25-year-old woman presents with fever, jaundice, and dark urine 2 weeks after returning from a trip to Uganda. Liver function tests show elevated bilirubin and transaminases. The most likely diagnosis is:",
              "options": [
                "Hepatitis A",
                "Hepatitis B",
                "Leptospirosis",
                "Malaria"
              ],
              "answer": "Hepatitis A",
              "explanation": "Hepatitis A is transmitted via fecal-oral route and is common in travelers to endemic regions; presents with fever, jaundice, and elevated liver enzymes."
            },
            {
              "stem": "A 35-year-old man presents with fever, myalgia, and a macular rash that started on his trunk and spread to his extremities. He reports exposure to ticks during a hiking trip. The most likely diagnosis is:",
              "options": [
                "Lyme disease",
                "Rocky Mountain spotted fever",
                "Ehrlichiosis",
                "Tularemia"
              ],
              "answer": "Ehrlichiosis",
              "explanation": "Ehrlichiosis presents with fever, myalgia, and rash after tick exposure; caused by Ehrlichia chaffeensis or Anaplasma phagocytophilum."
            },
            {
              "stem": "A 40-year-old woman presents with fever, cough, and weight loss 6 months after returning from a trip to Ethiopia. Chest X-ray shows a right upper lobe cavity. The most likely diagnosis is:",
              "options": [
                "Tuberculosis",
                "Histoplasmosis",
                "Coccidioidomycosis",
                "Paragonimiasis"
              ],
              "answer": "Tuberculosis",
              "explanation": "Tuberculosis is the most common cause of cavitary lung lesions worldwide; strongly associated with travel to endemic regions."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 7-year-old boy presents with acute onset of fever, refusal to bear weight on his right leg, and localized warmth over the distal femur. His mother reports he had a minor knee injury while playing soccer 3 days ago. On examination, he is febrile (38.8°C), tachycardic, and appears toxic. Labs show WBC 16,000/mm³, CRP 85 mg/L, and ESR 55 mm/h. Blood cultures are pending. X-ray of the femur is normal.",
              "modelAnswer": {
                "a": "Most likely diagnosis: Acute hematogenous osteomyelitis of the distal femur.",
                "b": "Pharmacological management: Empiric IV antibiotics covering Staphylococcus aureus (including MRSA) such as vancomycin 15 mg/kg q8–12h or cloxacillin 50 mg/kg q6h. Duration: 4–6 weeks IV followed by oral therapy if clinical improvement.",
                "c": "Non-pharmacological management: Rest, elevation of the limb, analgesia (paracetamol or ibuprofen), and orthopedic consultation for possible surgical drainage if abscess or failure to improve within 48–72 hours.",
                "d": "Monitoring: Daily clinical assessment, CRP every 48–72 hours to assess response, repeat imaging (MRI or ultrasound) if no improvement."
              }
            },
            {
              "stem": "Identify the most important member of Enterobacteriaceae responsible for each of the following clinical syndromes:",
              "modelAnswer": {
                "a": "Childhood diarrhea: Enteropathogenic E. coli (EPEC)",
                "b": "Traveler's diarrhea: Enterotoxigenic E. coli (ETEC)",
                "c": "Bacillary dysentery: Shigella dysenteriae",
                "d": "Hemorrhagic colitis or Hemolytic Uremic Syndrome (HUS): Enterohemorrhagic E. coli (EHEC), particularly E. coli O157:H7"
              }
            },
            {
              "stem": "List three human worms (parasites) that can cause iron deficiency anemia and one parasite associated with pernicious anemia.",
              "modelAnswer": {
                "a": "Parasites causing iron deficiency anemia:",
                "   i": "Diphyllobothrium latum (fish tapeworm) — causes vitamin B12 deficiency leading to megaloblastic anemia",
                "   ii": "Whipworm (Trichuris trichiura)",
                "   iii": "Ascaris lumbricoides (in heavy infestation)",
                "b": "Parasite associated with pernicious anemia:"
              }
            },
            {
              "stem": "Pablo, a 41-year-old security officer, is bitten by a neighbor’s dog while passing near the neighbor’s driveway. The dog’s vaccination history is unclear. Formulate an appropriate treatment plan for Pablo and include counseling points.",
              "modelAnswer": {
                "a": "Treatment plan:",
                "   i": "Monitor wound for signs of infection (increased pain, redness, swelling, pus) and seek medical attention if these occur.",
                "   ii": "Complete the full course of rabies vaccine and return for all scheduled doses.",
                "   iii": "Report any adverse reactions to vaccines or antibiotics immediately.",
                "   iv": "Avoid contact with stray animals and report any animal bites to local health authorities.",
                "b": "Counseling points:"
              }
            },
            {
              "stem": "Match each clinical presentation with the causative parasite:",
              "modelAnswer": {
                "a": "Intestinal obstruction and malnutrition in a child: Ascaris lumbricoides",
                "b": "Perianal itching and insomnia: Enterobius vermicularis (pinworm)",
                "c": "Hepatomegaly, fever, and eosinophilia after freshwater exposure: Schistosoma mansoni",
                "d": "Calabar swellings and microfilariae in blood: Loa loa"
              }
            },
            {
              "stem": "A 14-month-old child presents with 3 days of watery diarrhea, vomiting, and fever. The child is moderately dehydrated (6% fluid deficit). The mother reports the child has had 10 watery stools in the last 24 hours. The child is breastfeeding and also takes a cup of cow’s milk daily.",
              "modelAnswer": {
                "a": "Most likely diagnosis: Acute gastroenteritis with moderate dehydration due to viral or bacterial pathogen (e.g., rotavirus, norovirus, or Campylobacter).",
                "b": "Immediate management:",
                "   i": "Rehydration: Oral rehydration solution (ORS) 75 mL/kg over 4 hours for moderate dehydration, then maintenance ORS.",
                "   ii": "Zinc supplementation: 20 mg/day for 10–14 days to reduce duration and severity of diarrhea.",
                "   iii": "Continue breastfeeding and age-appropriate diet (avoid milk if lactose intolerance suspected).",
                "   iv": "Monitor for signs of deterioration (increased lethargy, sunken eyes, poor urine output).",
                "c": "Antimicrobial therapy: Not routinely indicated unless bacterial etiology confirmed (e.g., bloody diarrhea, high fever, or systemic toxicity). If Campylobacter suspected, azithromycin 10 mg/kg/day for 3 days.",
                "d": "Prevention: Hand hygiene, safe food preparation, rotavirus vaccination if not previously administered."
              }
            },
            {
              "stem": "A 25-year-old woman presents with fever, joint pain, and a pustular rash on her arms and legs. She is sexually active with multiple partners and has no history of travel. On examination, she has tenosynovitis in the wrists and a temperature of 38.8°C. Labs show WBC 13.4 × 10⁹/L, CRP 318 mg/L, and ESR 96 mm/h.",
              "modelAnswer": {
                "a": "Most likely diagnosis: Disseminated gonococcal infection (DGI).",
                "b": "Supporting features:",
                "   i": "Blood cultures (positive in ~50% of DGI cases).",
                "   ii": "Synovial fluid analysis (if arthritis present) — Gram stain and culture for N. gonorrhoeae.",
                "   iii": "Urethral/cervical/rectal swabs for N. gonorrhoeae NAAT (nucleic acid amplification test).",
                "c": "Diagnostic tests:",
                "d": "Treatment: Ceftriaxone 1 g IM/IV once daily for 7 days (or until clinical improvement), followed by azithromycin 1 g PO single dose for possible chlamydial co-infection."
              }
            },
            {
              "stem": "A 50-year-old man presents with fever, confusion, and a new macular rash on his trunk 10 days after returning from a rural area in Kenya. He reports exposure to stagnant water and ticks. Blood smear shows intraerythrocytic parasites.",
              "modelAnswer": {
                "a": "Most likely diagnosis: Malaria (Plasmodium falciparum).",
                "b": "Justification:",
                "   i": "Uncomplicated P. falciparum: Artemether-lumefantrine 20/120 mg tablets (weight-based dosing) for 3 days.",
                "   ii": "Severe malaria: IV artesunate 2.4 mg/kg at 0, 12, 24 hours, then daily until oral therapy tolerated.",
                "   iii": "Supportive care: Antipyretics, IV fluids if dehydration, monitor for complications (cerebral malaria, severe anemia).",
                "c": "Diagnostic tests:",
                "d": "Treatment plan:",
                "e": "Prevention counseling: Use insecticide-treated bed nets, apply DEET-containing repellents, wear long sleeves/pants, and consider chemoprophylaxis for future travel."
              }
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 49-year-old obese woman presents to the emergency department with a 1-week history of fever, confusion, abdominal pain, headache, anorexia, and diarrhea. One day before admission, she noted a new, red rash on her chest. Her history is significant for returning 10 days ago from Mathare slums, where she stayed with relatives recovering from typhoid fever. She has a history of gallstones. Admission vital signs: temperature 38.3°C, heart rate 60 bpm, blood pressure 110/70 mmHg. Physical examination reveals splenomegaly and hepatomegaly. Laboratory tests: WBC 3.0 × 10⁶/μL, ALT 65 U/L, AST 70 U/L, bilirubin 2.1 mg/dL, CRP 120 mg/L. Blood cultures are pending.",
              "modelAnswer": {
                "a": "Most likely diagnosis and causative agent:",
                "   i": "Reduces mortality: Untreated typhoid fever has a case fatality rate of 10–30%; early antibiotics reduce this to <1%.",
                "   ii": "Shortens duration of illness: Symptoms typically resolve within 3–5 days of appropriate therapy compared to 2–4 weeks without treatment.",
                "      - Exposure to endemic area (Mathare slums) with known typhoid outbreak among contacts, fever >7 days, confusion (delirium), abdominal pain, anorexia, diarrhea, relative bradycardia (heart rate 60 bpm with fever), splenomegaly, leukopenia (WBC 3.0 × 10⁶/μL), elevated liver enzymes, and rash (rose spots). Gallstones increase risk of chronic carrier state and complications like cholecystitis or perforation. Blood cultures are pending but would confirm S. Typhi if positive (sensitivity ~60–80%).\n\nb": "Benefits of antimicrobial treatment in this patient:",
                "   iii": "Prevents complications: Reduces risk of intestinal perforation, hemorrhage, encephalopathy, and chronic carrier state.\n\nc: "
              }
            }
          ]
        }
      ]
    }
  },
  "exam-infections-ii": {
    "1": {
      "title": "Infections II",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 25-year-old male presents with jaundice, dark urine, and fatigue. Serology reveals anti-HAV IgM positive, anti-HAV IgG negative, HBsAg negative, anti-HCV negative. Which of the following is the most likely diagnosis?",
              "options": [
                "Chronic hepatitis B infection",
                "Acute hepatitis A infection",
                "Acute hepatitis C infection",
                "Chronic hepatitis C infection"
              ],
              "answer": "Acute hepatitis A infection",
              "explanation": "Anti-HAV IgM positivity indicates recent infection with hepatitis A virus, which is typically self-limiting and transmitted via the fecal-oral route."
            },
            {
              "stem": "Which of the following is the primary route of transmission for hepatitis B virus (HBV) in sub-Saharan Africa?",
              "options": [
                "Parenteral (bloodborne)",
                "Fecal-oral",
                "Sexual contact",
                "Vertical (mother-to-child)"
              ],
              "answer": "Vertical (mother-to-child)",
              "explanation": "In high-prevalence regions like sub-Saharan Africa, vertical transmission (during birth or breastfeeding) is the dominant route of HBV transmission."
            },
            {
              "stem": "A 30-year-old female with a history of multiple sexual partners presents with a painless genital ulcer. Serology shows positive VDRL and positive TPHA. Which of the following is the most likely diagnosis?",
              "options": [
                "Genital herpes",
                "Chancroid",
                "Syphilis",
                "Lymphogranuloma venereum"
              ],
              "answer": "Syphilis",
              "explanation": "A painless genital ulcer with positive VDRL and TPHA serology is diagnostic of primary syphilis caused by Treponema pallidum."
            },
            {
              "stem": "Which of the following antiretroviral classes is HIV-2 intrinsically resistant to?",
              "options": [
                "Nucleoside reverse transcriptase inhibitors (NRTIs)",
                "Non-nucleoside reverse transcriptase inhibitors (NNRTIs)",
                "Integrase inhibitors (INSTIs)",
                "Protease inhibitors (PIs)"
              ],
              "answer": "Non-nucleoside reverse transcriptase inhibitors (NNRTIs)",
              "explanation": "HIV-2 lacks the binding site targeted by NNRTIs, making this class ineffective against HIV-2."
            },
            {
              "stem": "A 45-year-old male with a history of intravenous drug use presents with fever, headache, and confusion. CSF analysis shows lymphocytic pleocytosis, elevated protein, and low glucose. India ink stain is negative, but cryptococcal antigen is positive. Which of the following is the most appropriate initial antifungal therapy?",
              "options": [
                "Fluconazole monotherapy",
                "Amphotericin B monotherapy",
                "Liposomal amphotericin B plus flucytosine",
                "Caspofungin plus voriconazole"
              ],
              "answer": "Liposomal amphotericin B plus flucytosine",
              "explanation": "For cryptococcal meningitis, the WHO recommends induction therapy with liposomal amphotericin B (3–4 mg/kg/day) plus flucytosine (100 mg/kg/day) for at least 2 weeks."
            },
            {
              "stem": "Which of the following is the recommended first-line treatment for confirmed Neisseria gonorrhoeae urethritis in a non-pregnant adult?",
              "options": [
                "Ceftriaxone 500 mg IM single dose",
                "Ciprofloxacin 500 mg orally single dose",
                "Doxycycline 100 mg orally twice daily for 7 days",
                "Azithromycin 1 g orally single dose"
              ],
              "answer": "Ceftriaxone 500 mg IM single dose",
              "explanation": "WHO and CDC guidelines recommend ceftriaxone 500 mg IM as first-line therapy for gonorrhea due to increasing resistance to fluoroquinolones and azithromycin."
            },
            {
              "stem": "A 28-year-old female presents with dysuria and vaginal discharge. Gram stain of cervical secretions shows intracellular gram-negative diplococci. Which of the following is the most likely co-infection requiring treatment?",
              "options": [
                "Trichomonas vaginalis",
                "Chlamydia trachomatis",
                "Candida albicans",
                "Herpes simplex virus"
              ],
              "answer": "Chlamydia trachomatis",
              "explanation": "Gonorrhea (caused by Neisseria gonorrhoeae) frequently co-occurs with chlamydia, which requires dual therapy with ceftriaxone and azithromycin/doxycycline."
            },
            {
              "stem": "Which of the following hepatitis B serology patterns indicates immunity due to prior vaccination?",
              "options": [
                "HBsAg positive, anti-HBc IgG positive",
                "HBsAg negative, anti-HBs positive, anti-HBc IgG negative",
                "HBsAg negative, anti-HBs negative, anti-HBc IgG positive",
                "HBsAg positive, anti-HBs positive"
              ],
              "answer": "HBsAg negative, anti-HBs positive, anti-HBc IgG negative",
              "explanation": "A positive anti-HBs with negative HBsAg and anti-HBc indicates immunity from vaccination rather than natural infection."
            },
            {
              "stem": "A 35-year-old male with HIV (CD4 120 cells/µL) presents with fever, cough, and dyspnea. Chest X-ray shows bilateral interstitial infiltrates. Which of the following is the most likely opportunistic infection?",
              "options": [
                "Tuberculosis",
                "Pneumocystis jirovecii pneumonia",
                "Cryptococcal pneumonia",
                "Histoplasmosis"
              ],
              "answer": "Pneumocystis jirovecii pneumonia",
              "explanation": "Pneumocystis jirovecii pneumonia (PCP) is the most common opportunistic infection in HIV patients with CD4 counts <200 cells/µL and presents with bilateral interstitial infiltrates."
            },
            {
              "stem": "Which of the following is the recommended post-exposure prophylaxis (PEP) regimen for HIV following a high-risk occupational exposure?",
              "options": [
                "Tenofovir + emtricitabine + dolutegravir for 28 days",
                "Zidovudine monotherapy for 4 weeks",
                "Lamivudine + efavirenz for 28 days",
                "Raltegravir + tenofovir for 21 days"
              ],
              "answer": "Tenofovir + emtricitabine + dolutegravir for 28 days",
              "explanation": "WHO and CDC recommend a 28-day triple-drug regimen (e.g., tenofovir/emtricitabine plus dolutegravir) for HIV PEP to reduce transmission risk."
            },
            {
              "stem": "A 50-year-old male with chronic hepatitis B infection develops hepatocellular carcinoma. Which of the following viral factors is most strongly associated with this complication?",
              "options": [
                "High HBV DNA viral load",
                "Presence of anti-HBe antibodies",
                "HBeAg negativity",
                "Low HBsAg levels"
              ],
              "answer": "High HBV DNA viral load",
              "explanation": "Persistent high HBV DNA levels (>2000 IU/mL) are strongly associated with an increased risk of hepatocellular carcinoma in chronic HBV infection."
            },
            {
              "stem": "Which of the following is the most common adverse effect of rifampicin therapy?",
              "options": [
                "Peripheral neuropathy",
                "Orange discoloration of body fluids",
                "Hypoglycemia",
                "QT prolongation"
              ],
              "answer": "Orange discoloration of body fluids",
              "explanation": "Rifampicin commonly causes orange-red discoloration of urine, sweat, tears, and other body fluids, which is harmless but can be alarming to patients."
            },
            {
              "stem": "A 22-year-old female presents with a maculopapular rash on palms and soles, fever, and generalized lymphadenopathy. Serology shows positive VDRL and positive FTA-ABS. Which stage of syphilis is most likely?",
              "options": [
                "Primary syphilis",
                "Secondary syphilis",
                "Latent syphilis",
                "Tertiary syphilis"
              ],
              "answer": "Secondary syphilis",
              "explanation": "Secondary syphilis presents with systemic symptoms (fever, lymphadenopathy) and a characteristic rash involving palms and soles, with positive serology."
            },
            {
              "stem": "Which of the following is the recommended confirmatory test for hepatitis C virus (HCV) infection after a positive anti-HCV antibody test?",
              "options": [
                "HCV RNA PCR",
                "HCV core antigen assay",
                "Recombinant immunoblot assay (RIBA)",
                "Liver biopsy"
              ],
              "answer": "HCV RNA PCR",
              "explanation": "A positive anti-HCV test should be confirmed with HCV RNA PCR to distinguish active infection from past resolved infection."
            },
            {
              "stem": "A 6-month-old infant presents with fever, irritability, and bulging fontanelle. CSF analysis shows 500 WBC/µL (90% neutrophils), glucose 1.5 mmol/L (serum 4.5 mmol/L), and protein 2.5 g/L. Which of the following is the most likely causative organism?",
              "options": [
                "Streptococcus pneumoniae",
                "Neisseria meningitidis",
                "Listeria monocytogenes",
                "Haemophilus influenzae"
              ],
              "answer": "Streptococcus pneumoniae",
              "explanation": "Streptococcus pneumoniae is the most common cause of bacterial meningitis in infants, with CSF findings of neutrophilic pleocytosis, low glucose, and elevated protein."
            },
            {
              "stem": "Which of the following is the recommended vaccination schedule for hepatitis A in Kenya?",
              "options": [
                "Single dose at 12 months",
                "Two doses at 12 and 18 months",
                "Three doses at 6, 10, and 14 weeks",
                "Four doses at birth, 6 weeks, 10 weeks, and 14 weeks"
              ],
              "answer": "Two doses at 12 and 18 months",
              "explanation": "The Kenya Expanded Programme on Immunization (KEPI) recommends hepatitis A vaccination as a two-dose schedule at 12 and 18 months of age."
            },
            {
              "stem": "A 30-year-old male with HIV (CD4 80 cells/µL) presents with odynophagia and white plaques on the tongue. Which of the following is the most appropriate initial therapy?",
              "options": [
                "Oral fluconazole 100 mg daily for 14–21 days",
                "Topical nystatin suspension swish and swallow for 7 days",
                "Intravenous amphotericin B for 10 days",
                "Oral acyclovir 400 mg five times daily for 7 days"
              ],
              "answer": "Oral fluconazole 100 mg daily for 14–21 days",
              "explanation": "Oral fluconazole is first-line therapy for oropharyngeal candidiasis in HIV patients, with a typical duration of 14–21 days for esophageal involvement."
            },
            {
              "stem": "Which of the following is the most common adverse effect of tenofovir disoproxil fumarate (TDF) therapy?",
              "options": [
                "Peripheral neuropathy",
                "Lactic acidosis",
                "Renal toxicity (Fanconi syndrome)",
                "Pancreatitis"
              ],
              "answer": "Renal toxicity (Fanconi syndrome)",
              "explanation": "Tenofovir is associated with proximal renal tubular dysfunction (Fanconi syndrome), necessitating regular renal function monitoring."
            },
            {
              "stem": "A 40-year-old female presents with fever, night sweats, and weight loss. Chest X-ray shows bilateral upper lobe infiltrates. Sputum AFB smear is positive. Which of the following is the most appropriate initial therapy?",
              "options": [
                "Isoniazid + rifampicin + pyrazinamide + ethambutol for 2 months, then isoniazid + rifampicin for 4 months",
                "Isoniazid monotherapy for 9 months",
                "Rifampicin + ethambutol for 6 months",
                "Pyrazinamide + streptomycin for 2 months"
              ],
              "answer": "Isoniazid + rifampicin + pyrazinamide + ethambutol for 2 months, then isoniazid + rifampicin for 4 months",
              "explanation": "Standard first-line therapy for drug-susceptible tuberculosis is a 6-month regimen: 2 months of isoniazid, rifampicin, pyrazinamide, and ethambutol, followed by 4 months of isoniazid and rifampicin."
            },
            {
              "stem": "Which of the following is the recommended treatment for neurosyphilis?",
              "options": [
                "Benzathine penicillin G 2.4 million units IM weekly for 3 weeks",
                "Procaine penicillin G 600,000 units IM daily for 14 days",
                "Ceftriaxone 2 g IV daily for 10–14 days",
                "Doxycycline 200 mg orally twice daily for 28 days"
              ],
              "answer": "Procaine penicillin G 600,000 units IM daily for 14 days",
              "explanation": "Neurosyphilis requires aqueous penicillin G (procaine penicillin) for 10–14 days due to poor CSF penetration of benzathine penicillin."
            },
            {
              "stem": "A 25-year-old female with a history of recurrent UTIs presents with dysuria and suprapubic pain. Urinalysis shows >100 WBC/HPF and positive nitrites. Which of the following is the most likely causative organism?",
              "options": [
                "Staphylococcus saprophyticus",
                "Escherichia coli",
                "Klebsiella pneumoniae",
                "Enterococcus faecalis"
              ],
              "answer": "Escherichia coli",
              "explanation": "E. coli is the most common cause of uncomplicated urinary tract infections, accounting for 75–95% of cases."
            },
            {
              "stem": "Which of the following is the recommended duration of therapy for uncomplicated cystitis in a non-pregnant woman?",
              "options": [
                "3 days",
                "5 days",
                "7 days",
                "10 days"
              ],
              "answer": "3 days",
              "explanation": "Short-course therapy (3 days) is recommended for uncomplicated cystitis in women, with agents like nitrofurantoin, trimethoprim-sulfamethoxazole, or fosfomycin."
            },
            {
              "stem": "A 30-year-old male presents with a painless genital ulcer and inguinal lymphadenopathy. Dark-field microscopy confirms spirochetes. Which of the following is the most likely diagnosis?",
              "options": [
                "Chancroid",
                "Lymphogranuloma venereum",
                "Primary syphilis",
                "Genital herpes"
              ],
              "answer": "Primary syphilis",
              "explanation": "Primary syphilis presents with a painless chancre and regional lymphadenopathy, with spirochetes visible on dark-field microscopy."
            },
            {
              "stem": "Which of the following is the most appropriate treatment for a 28-week pregnant woman with confirmed Chlamydia trachomatis infection?",
              "options": [
                "Doxycycline 100 mg orally twice daily for 7 days",
                "Azithromycin 1 g orally single dose",
                "Ceftriaxone 500 mg IM single dose",
                "Metronidazole 500 mg orally twice daily for 7 days"
              ],
              "answer": "Azithromycin 1 g orally single dose",
              "explanation": "Azithromycin is the preferred treatment for chlamydia in pregnancy due to its safety profile and single-dose convenience."
            },
            {
              "stem": "A 45-year-old male with chronic hepatitis C (genotype 1) is started on ledipasvir/sofosbuvir. Which of the following is the expected sustained virologic response (SVR) rate with this regimen?",
              "options": [
                "50–60%",
                "70–80%",
                "85–90%",
                ">95%"
              ],
              "answer": ">95%",
              "explanation": "Direct-acting antiviral regimens like ledipasvir/sofosbuvir achieve SVR rates >95% in patients with chronic hepatitis C genotype 1."
            },
            {
              "stem": "Which of the following is the most common adverse effect of acyclovir therapy?",
              "options": [
                "Nephrotoxicity",
                "Hepatotoxicity",
                "Bone marrow suppression",
                "Peripheral neuropathy"
              ],
              "answer": "Nephrotoxicity",
              "explanation": "Acyclovir can cause crystalline nephropathy, especially with high doses or inadequate hydration, necessitating renal function monitoring."
            },
            {
              "stem": "A 20-year-old female presents with fever, malaise, and tender hepatomegaly. Serology shows IgM anti-HAV positive, IgG anti-HAV negative, HBsAg negative, and anti-HCV negative. Which of the following is the most appropriate management?",
              "options": [
                "Supportive care with hydration and rest",
                "Tenofovir therapy for 4 weeks",
                "Ribavirin monotherapy for 12 weeks",
                "Interferon-alpha therapy for 6 months"
              ],
              "answer": "Supportive care with hydration and rest",
              "explanation": "Hepatitis A is self-limiting, and management is supportive with hydration, rest, and avoidance of hepatotoxins."
            },
            {
              "stem": "Which of the following is the recommended first-line ART regimen for a treatment-naïve HIV patient in Kenya?",
              "options": [
                "Tenofovir + lamivudine + efavirenz",
                "Zidovudine + lamivudine + nevirapine",
                "Stavudine + didanosine + efavirenz",
                "Abacavir + lamivudine + dolutegravir"
              ],
              "answer": "Tenofovir + lamivudine + dolutegravir",
              "explanation": "The WHO recommends dolutegravir-based regimens (e.g., tenofovir/lamivudine/dolutegravir) as first-line therapy due to efficacy, tolerability, and low resistance barrier."
            },
            {
              "stem": "A 55-year-old male with cirrhosis due to hepatitis C develops hepatocellular carcinoma. Which of the following is the most appropriate next step?",
              "options": [
                "Sorafenib therapy",
                "Liver transplantation evaluation",
                "Transarterial chemoembolization (TACE)",
                "Palliative care referral"
              ],
              "answer": "Liver transplantation evaluation",
              "explanation": "For patients with hepatocellular carcinoma within Milan criteria, liver transplantation offers the best chance for cure."
            },
            {
              "stem": "Which of the following is the most common adverse effect of ethambutol therapy?",
              "options": [
                "Optic neuritis",
                "Peripheral neuropathy",
                "Hepatotoxicity",
                "Nephrotoxicity"
              ],
              "answer": "Optic neuritis",
              "explanation": "Ethambutol can cause dose-related optic neuritis, necessitating regular visual acuity and color vision monitoring."
            },
            {
              "stem": "A 30-year-old male presents with fever, headache, and nuchal rigidity. CSF analysis shows 500 WBC/µL (80% lymphocytes), glucose 2.0 mmol/L (serum 4.5 mmol/L), and protein 1.5 g/L. Which of the following is the most likely diagnosis?",
              "options": [
                "Bacterial meningitis",
                "Viral meningitis",
                "Tuberculous meningitis",
                "Fungal meningitis"
              ],
              "answer": "Viral meningitis",
              "explanation": "Lymphocytic pleocytosis with normal or mildly elevated protein and low-normal glucose suggests viral meningitis, often caused by enteroviruses."
            },
            {
              "stem": "Which of the following is the recommended post-exposure prophylaxis (PEP) for sexual exposure to Neisseria gonorrhoeae?",
              "options": [
                "Ceftriaxone 500 mg IM single dose",
                "Azithromycin 1 g orally single dose",
                "Doxycycline 100 mg orally twice daily for 7 days",
                "Ciprofloxacin 500 mg orally single dose"
              ],
              "answer": "Ceftriaxone 500 mg IM single dose",
              "explanation": "Single-dose ceftriaxone is recommended for gonorrhea PEP due to high resistance rates to other agents like fluoroquinolones."
            },
            {
              "stem": "A 25-year-old female with a history of recurrent UTIs presents with flank pain and fever. Urinalysis shows >100 WBC/HPF, positive nitrites, and WBC casts. Which of the following is the most likely diagnosis?",
              "options": [
                "Acute cystitis",
                "Acute pyelonephritis",
                "Urethritis",
                "Asymptomatic bacteriuria"
              ],
              "answer": "Acute pyelonephritis",
              "explanation": "Flank pain, fever, and WBC casts on urinalysis are diagnostic of acute pyelonephritis, a more severe upper UTI."
            },
            {
              "stem": "Which of the following is the recommended treatment for a 32-week pregnant woman with asymptomatic bacteriuria?",
              "options": [
                "No treatment unless symptomatic",
                "Nitrofurantoin 100 mg orally twice daily for 5 days",
                "Ciprofloxacin 500 mg orally twice daily for 7 days",
                "Trimethoprim-sulfamethoxazole 160/800 mg twice daily for 3 days"
              ],
              "answer": "Nitrofurantoin 100 mg orally twice daily for 5 days",
              "explanation": "Asymptomatic bacteriuria in pregnancy should be treated to prevent pyelonephritis, with nitrofurantoin as a preferred agent (avoid in late pregnancy)."
            },
            {
              "stem": "A 40-year-old male with HIV (CD4 50 cells/µL) presents with confusion and focal neurological deficits. MRI shows ring-enhancing lesions. Which of the following is the most likely diagnosis?",
              "options": [
                "Cryptococcal meningitis",
                "Toxoplasmic encephalitis",
                "Progressive multifocal leukoencephalopathy",
                "Primary CNS lymphoma"
              ],
              "answer": "Toxoplasmic encephalitis",
              "explanation": "Toxoplasmic encephalitis is the most common cause of focal brain lesions in HIV patients with CD4 <100 cells/µL, typically presenting with ring-enhancing lesions on MRI."
            },
            {
              "stem": "Which of the following is the recommended treatment for a 6-month-old infant with confirmed pertussis infection?",
              "options": [
                "Azithromycin 10 mg/kg/day for 5 days",
                "Amoxicillin 40 mg/kg/day for 10 days",
                "Ceftriaxone 50 mg/kg/day for 7 days",
                "Erythromycin 40 mg/kg/day for 14 days"
              ],
              "answer": "Azithromycin 10 mg/kg/day for 5 days",
              "explanation": "Azithromycin is the preferred macrolide for pertussis in infants due to better tolerability and shorter duration of therapy."
            },
            {
              "stem": "A 30-year-old male presents with fever, cough, and weight loss. Chest X-ray shows cavitary lesions in the upper lobes. Sputum AFB smear is positive. Which of the following is the most likely diagnosis?",
              "options": [
                "Pneumocystis jirovecii pneumonia",
                "Tuberculosis",
                "Histoplasmosis",
                "Coccidioidomycosis"
              ],
              "answer": "Tuberculosis",
              "explanation": "Cavitary upper lobe lesions on chest X-ray with positive AFB smear are classic for pulmonary tuberculosis."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 35-year-old male with HIV (CD4 150 cells/µL) is started on co-trimoxazole preventive therapy (CPT).",
              "modelAnswer": "Co-trimoxazole preventive therapy (CPT) is used to prevent the following opportunistic infections in HIV-positive patients:\n1. Pneumocystis jirovecii pneumonia (PCP)\n2. Toxoplasmic encephalitis\n3. Cerebral toxoplasmosis\n4. Bacterial infections (e.g., recurrent urinary tract infections, bacterial pneumonia)\n5. Isosporiasis (in some regions)\n\nCPT is typically dosed as trimethoprim-sulfamethoxazole 960 mg orally daily or 480 mg daily if CD4 <200 cells/µL. Monitoring should include CBC for myelosuppression and renal function for hyperkalemia."
            },
            {
              "stem": "Design a summary of recommendations for the administration and monitoring of amphotericin B in a patient with cryptococcal meningitis.",
              "modelAnswer": "Administration of Amphotericin B:\n- Use liposomal amphotericin B (3–4 mg/kg/day) or conventional amphotericin B deoxycholate (0.7–1 mg/kg/day) for induction therapy.\n- Infuse over 2–6 hours in 5% dextrose (avoid saline due to precipitation).\n- Premedicate with paracetamol, diphenhydramine, and hydrocortisone to reduce infusion-related reactions.\n- Monitor for nephrotoxicity (serum creatinine, electrolytes, BUN) and electrolyte imbalances (hypokalemia, hypomagnesemia).\n- Administer 1 L of normal saline IV before and after each dose to reduce nephrotoxicity.\n- Monitor for infusion-related reactions (fever, chills, rigors) and manage with slow infusion rate or premedication.\n\nMonitoring:\n- Daily clinical assessment (fever, headache, neurological status).\n- Weekly CBC, renal function, electrolytes, and LFTs.\n- Repeat lumbar puncture after 2 weeks to assess CSF fungal clearance.\n- Adjust dose based on renal function (reduce dose if eGFR <30 mL/min)."
            },
            {
              "stem": "Outline three indirect methods that can be used to assess adherence to antiretroviral therapy (ART) in HIV-positive patients during routine clinic visits.",
              "modelAnswer": "Three indirect methods to assess ART adherence:\n1. **Pill counts**: Compare the number of pills dispensed with the number returned at each visit to estimate adherence.\n2. **Pharmacy refill records**: Review prescription refill history to assess whether patients are collecting medications on time.\n3. **Patient self-report**: Use standardized questionnaires (e.g., Morisky Medication Adherence Scale) or direct questioning about missed doses in the past 7–30 days.\n\nAdditional methods (though not indirect):\n- Therapeutic drug monitoring (for drugs with measurable levels).\n- Clinical response (e.g., viral load suppression, CD4 count increase)."
            },
            {
              "stem": "a) Explain the current recommendations for prevention of recurrent HBV infection after liver transplantation.\nb) Describe three goals of therapy for treating HCV infection.",
              "modelAnswer": "a) Prevention of recurrent HBV infection after liver transplantation:\n- **Pre-transplant**: Administer hepatitis B immune globulin (HBIG) and nucleos(t)ide analogs (e.g., tenofovir or entecavir) to achieve undetectable HBV DNA levels.\n- **Peri-transplant**: Continue HBIG and nucleos(t)ide analogs intraoperatively and post-transplant.\n- **Post-transplant**: Long-term HBIG (e.g., monthly injections) combined with a potent nucleos(t)ide analog (e.g., tenofovir) to prevent HBV recurrence. Monitor HBV DNA and HBsAg levels regularly.\n\nb) Three goals of therapy for treating HCV infection:\n1. **Eradication of HCV**: Achieve sustained virologic response (SVR), defined as undetectable HCV RNA 12 weeks after completing therapy.\n2. **Prevention of complications**: Reduce the risk of cirrhosis, hepatocellular carcinoma, and liver failure.\n3. **Improvement in quality of life**: Alleviate symptoms (e.g., fatigue, jaundice) and reduce extrahepatic manifestations (e.g., cryoglobulinemic vasculitis)."
            },
            {
              "stem": "H.C., a 19-year-old sexually active woman, presents with dysuria, purulent vaginal discharge, fever, and bilateral lower abdominal pain. Examination reveals uterine and adnexal tenderness, purulent cervical exudate, and a temperature of 39°C. Laboratory tests show a nonreactive VDRL, negative urinalysis, and negative pregnancy test. Peripheral WBC count is 11,000/µL with 70% polymorphonuclear leukocytes.",
              "modelAnswer": "Justification for presumptive diagnosis of PID:\n1. **Lower abdominal pain**: Consistent with pelvic inflammatory disease (PID), which often presents with suprapubic or lower abdominal pain.\n2. **Cervical motion tenderness and adnexal tenderness**: Key clinical findings in PID (Chandelier sign).\n3. **Purulent cervical exudate**: Suggests cervical infection, often caused by Neisseria gonorrhoeae or Chlamydia trachomatis.\n4. **Fever and elevated WBC count**: Systemic signs of infection, supporting the diagnosis of PID.\n5. **Absence of other diagnoses**: Negative VDRL and urinalysis rule out syphilis and UTI, respectively.\n\nPID is a clinical diagnosis, and empirical treatment should be initiated if there is a high index of suspicion, even if laboratory confirmation is pending."
            },
            {
              "stem": "Develop an appropriate treatment plan for the patient described above (H.C.). Include antibiotic therapy and adjunctive measures.",
              "modelAnswer": "Treatment plan for PID:\n**Antibiotic therapy (empirical, covering N. gonorrhoeae and C. trachomatis):**\n- **Ceftriaxone 500 mg IM single dose** (for gonorrhea).\n- **Doxycycline 100 mg orally twice daily for 14 days** (for chlamydia).\n- **Metronidazole 400 mg orally twice daily for 14 days** (to cover anaerobic bacteria and bacterial vaginosis).\n\n**Adjunctive therapy:**\n- **Analgesia**: Paracetamol or NSAIDs for pain relief.\n- **Hydration and rest**: Supportive care.\n- **Partner notification and treatment**: Treat sexual partners empirically to prevent reinfection.\n- **Follow-up**: Repeat clinical assessment in 72 hours to assess response. Consider repeat testing for gonorrhea/chlamydia if symptoms persist.\n\n**Hospitalization criteria (if present):**\n- Pregnancy.\n- Severe illness (e.g., high fever, vomiting).\n- Tubo-ovarian abscess.\n- Inability to tolerate oral therapy."
            },
            {
              "stem": "A 28-year-old male presents with fever, headache, and confusion. CSF analysis shows 16 WBC/µL (85% lymphocytes), glucose 26 mg/dL (serum 4.5 mmol/L), protein 90.5 mg/dL, and positive CSF cryptococcal antigen (titer 1:2048). Serum cryptococcal antigen is positive (titer 1:512). HIV testing is positive.",
              "modelAnswer": "Diagnostic interpretation:\n1. **CSF findings**: Lymphocytic pleocytosis, low glucose, elevated protein, and positive cryptococcal antigen are diagnostic of cryptococcal meningitis.\n2. **Serum cryptococcal antigen**: Positive titer confirms disseminated infection.\n3. **HIV status**: Immunosuppression (CD4 likely <100 cells/µL) predisposes to cryptococcal disease.\n4. **Differential diagnosis**: Ruled out bacterial meningitis (lymphocytes > neutrophils), TB meningitis (higher protein, lower glucose), and viral meningitis (usually milder CSF abnormalities).\n\n**Most likely diagnosis**: Cryptococcal meningitis in an HIV-positive patient."
            },
            {
              "stem": "Outline three parameters that would be used to monitor response to treatment in a patient with pelvic inflammatory disease (PID).",
              "modelAnswer": "Three parameters to monitor response to PID treatment:\n1. **Clinical improvement**: Resolution of fever, abdominal pain, and cervical motion tenderness within 72 hours of starting therapy.\n2. **Laboratory markers**: Decrease in peripheral WBC count and normalization of inflammatory markers (e.g., CRP).\n3. **Microbiological clearance**: Repeat testing for N. gonorrhoeae and C. trachomatis if symptoms persist or recur.\n\nAdditional monitoring:\n- **Adherence**: Ensure patient completes the full course of antibiotics.\n- **Complications**: Assess for tubo-ovarian abscess or signs of sepsis.\n- **Partner management**: Confirm that sexual partners have been treated to prevent reinfection."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 31-year-old man newly diagnosed with HIV was admitted with shortness of breath, cough, and generalized chest discomfort. Chest radiograph revealed diffuse bilateral opacities, and arterial blood gas analysis demonstrated a PaO2 of 8.0 kPa (normal range 11.0–14.0 kPa). Sputum culture was uninformative. A bronchoalveolar lavage (BAL) was performed, and transbronchial biopsies were taken.",
              "modelAnswer": "**a) Most likely clinical diagnosis and causative agent:**\n- **Diagnosis**: Pneumocystis jirovecii pneumonia (PCP).\n- **Causative agent**: Pneumocystis jirovecii (formerly P. carinii), an opportunistic fungal pathogen.\n\n**b) Justification for diagnosis:**\n1. **Clinical presentation**: Progressive dyspnea, nonproductive cough, and hypoxia in an HIV patient with CD4 count likely <200 cells/µL.\n2. **Chest radiograph**: Diffuse bilateral interstitial or ground-glass opacities (\"bat-wing\" pattern).\n3. **Arterial blood gas**: Severe hypoxia (PaO2 <10 kPa) despite relatively mild symptoms, typical of PCP.\n4. **Sputum/BAL findings**: Although sputum culture was uninformative, BAL with transbronchial biopsy is the gold standard for diagnosis, showing characteristic cysts on Gomori methenamine-silver stain or PCR positivity for P. jirovecii DNA.\n\n**c) Two other tests to support diagnosis:**\n1. **β-D-glucan assay**: Serum β-D-glucan is elevated in PCP and can support the diagnosis (sensitivity ~90%, specificity ~80%).\n2. **PCR for P. jirovecii DNA**: BAL fluid PCR is highly sensitive and specific for PCP, even in patients with negative microscopy.\n\n**d) Comprehensive treatment plan:**\n**Antimicrobial therapy:**\n- **First-line**: Trimethoprim-sulfamethoxazole (TMP-SMX) 15–20 mg/kg/day (based on TMP component) IV or orally in divided doses for 21 days.\n- **Adjunctive therapy**: Prednisone 40 mg orally twice daily for 5 days, then 40 mg daily for 5 days, then 20 mg daily for 11 days (to reduce inflammation and improve oxygenation in moderate-severe PCP, PaO2 <9.3 kPa).\n\n**Supportive therapy:**\n- **Oxygen therapy**: Supplemental oxygen to maintain SpO2 >90%.\n- **Hydration and nutrition**: IV fluids if dehydrated; consider nutritional support if malnourished.\n- **Prophylaxis for opportunistic infections**: Start co-trimoxazole (TMP-SMX 960 mg daily) for PCP prophylaxis once PCP treatment is completed and CD4 count remains <200 cells/µL.\n\n**Monitoring:**\n- **Daily**: Clinical assessment (fever, dyspnea, oxygen requirements).\n- **Weekly**: CBC (for myelosuppression from TMP-SMX), renal function, electrolytes (hyperkalemia risk), and LFTs.\n- **ABG**: Repeat arterial blood gases if hypoxia worsens.\n- **BAL follow-up**: Repeat BAL if clinical deterioration to assess treatment response.\n\n**e) Alternative therapies for moderate-severe PCP (if allergic to first-line):**\n1. **Clindamycin 600 mg IV q8h + primaquine 30 mg orally daily**: Alternative regimen with good efficacy but risk of hemolysis in G6PD-deficient patients.\n2. **Atovaquone 750 mg orally twice daily**: Less effective than TMP-SMX but useful in patients with mild sulfa allergies or intolerance.\n\n**f) Monitoring treatment:**\n- **Clinical response**: Improvement in dyspnea, oxygen requirements, and chest radiograph within 7–10 days.\n- **Microbiological response**: Repeat BAL or induced sputum if symptoms persist after 10–14 days.\n- **Laboratory monitoring**: Weekly CBC, renal function, and electrolytes to detect TMP-SMX toxicity.\n\n**g) ART regimen and timing:**\n- **Recommended regimen**: Tenofovir + lamivudine + dolutegravir (TLD).\n- **Timing**: Start ART within 2 weeks of initiating PCP treatment (WHO guidelines), unless the patient is severely ill (e.g., respiratory failure), in which case delay until clinical stability (e.g., after 2–4 weeks).\n- **Rationale**: Early ART initiation reduces mortality and improves immune recovery. Dolutegravir is preferred due to high efficacy, low resistance barrier, and favorable side effect profile."
            },
            {
              "stem": "D.S., a 23-year-old male army officer, presents with dysuria, meatal pain, and a profuse yellow urethral discharge for 2 days. He admits to extramarital sex with a sex worker during the past week. He is accompanied by his pregnant wife, C.S., who is asymptomatic. Gram stain of urethral exudate shows intracellular gram-negative diplococci. D.S. engages in vaginal sex only.",
              "modelAnswer": "**a) Most likely diagnosis and causative agent:**\n- **Diagnosis**: Gonococcal urethritis.\n- **Causative agent**: Neisseria gonorrhoeae (gram-negative diplococcus).\n\n**b) Justification for diagnosis:**\n1. **Clinical presentation**: Acute onset of dysuria, meatal pain, and purulent urethral discharge (classic for gonorrhea).\n2. **Gram stain**: Intracellular gram-negative diplococci in urethral exudate are diagnostic of N. gonorrhoeae.\n3. **Risk factors**: Recent unprotected sexual contact with a sex worker, consistent with high-risk behavior for STIs.\n4. **Exclusion of other causes**: Absence of oral/anal sex reduces likelihood of other STIs (e.g., chlamydia, HSV).\n\n**c) Treatment plans for D.S. and C.S.:**\n**For D.S. (gonococcal urethritis):**\n- **First-line therapy**: Ceftriaxone 500 mg IM single dose (WHO/CDC recommendation for gonorrhea due to resistance patterns).\n- **Co-treatment for chlamydia**: Azithromycin 1 g orally single dose (dual therapy recommended empirically due to high co-infection rates).\n- **Partner notification**: Treat sexual partners (including C.S.) empirically.\n- **Follow-up**: Advise abstinence for 7 days post-treatment and until symptoms resolve. Repeat testing for N. gonorrhoeae and C. trachomatis in 2–3 weeks if symptoms persist.\n\n**For C.S. (asymptomatic pregnant partner):**\n- **Empirical treatment**: Azithromycin 1 g orally single dose (for chlamydia coverage) + ceftriaxone 500 mg IM single dose (for gonorrhea coverage), despite absence of symptoms.\n- **Safety in pregnancy**: Azithromycin and ceftriaxone are Category B drugs and considered safe in pregnancy.\n- **Follow-up**: Repeat STI testing at 3–6 weeks post-treatment. Counsel on safe sex practices and STI prevention.\n\n**d) Three parameters to monitor response to treatment:**\n1. **Clinical resolution**: Disappearance of dysuria, meatal pain, and urethral discharge within 3–7 days.\n2. **Microbiological clearance**: Repeat Gram stain or NAAT for N. gonorrhoeae and C. trachomatis at 2–3 weeks post-treatment to confirm eradication.\n3. **Partner management**: Ensure C.S. completes treatment and follow-up testing.\n\n**e) Contraindicated drug in pregnancy:**\n- **Drug**: Doxycycline.\n- **Reason**: Tetracyclines are contraindicated in pregnancy due to risk of fetal skeletal abnormalities and hepatotoxicity.\n\n**f) Post-exposure prophylaxis (PEP) if presented within 72 hours:**\n- **Regimen**: Ceftriaxone 500 mg IM single dose + azithromycin 1 g orally single dose.\n- **Duration**: Single-dose therapy (no extended duration needed for PEP in this context).\n\n**g) Two adverse effects to watch for with PEP regimen:**\n1. **Ceftriaxone**: Injection site pain, allergic reactions (rare but serious, e.g., anaphylaxis).\n2. **Azithromycin**: Gastrointestinal upset (nausea, diarrhea), QT prolongation (rare, but monitor in patients with cardiac risk factors).\n\n**h) Two possible complications of syphilis in D.S. if left untreated:**\n1. **Secondary syphilis**: Systemic dissemination with rash (including palms/soles), fever, lymphadenopathy, and constitutional symptoms.\n2. **Tertiary syphilis**: Late complications including cardiovascular syphilis (e.g., aortic aneurysm), neurosyphilis (e.g., tabes dorsalis, general paresis), or gummatous lesions (destructive granulomatous lesions)."
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Infections II",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 28-year-old woman presents with jaundice, dark urine, and fatigue 4 weeks after returning from a rural area with poor sanitation. Her ALT is 850 IU/L and total bilirubin is 6.2 mg/dL. Which serological marker is most specific for acute hepatitis A infection?",
              "options": [
                "Anti-HAV IgM",
                "Anti-HAV IgG",
                "HBsAg",
                "Anti-HCV"
              ],
              "answer": "Anti-HAV IgM",
              "explanation": "Anti-HAV IgM is the first antibody to appear in acute hepatitis A infection and indicates recent exposure."
            },
            {
              "stem": "A 34-year-old pregnant woman in her third trimester is diagnosed with acute hepatitis E infection. Which of the following is the most significant risk associated with this infection during pregnancy?",
              "options": [
                "Chronic carrier state",
                "Fulminant hepatic failure",
                "Vertical transmission to the neonate",
                "Development of hepatocellular carcinoma"
              ],
              "answer": "Fulminant hepatic failure",
              "explanation": "HEV infection in pregnancy, particularly in the third trimester, is associated with a high risk of fulminant hepatic failure."
            },
            {
              "stem": "A 45-year-old man with chronic hepatitis B infection (HBeAg positive, HBV DNA 8 log10 IU/mL) is started on tenofovir therapy. Which laboratory parameter should be monitored most closely during therapy?",
              "options": [
                "Serum creatinine and phosphate",
                "Hemoglobin A1c",
                "Thyroid function tests",
                "Platelet count"
              ],
              "answer": "Serum creatinine and phosphate",
              "explanation": "Tenofovir is associated with renal toxicity, including proximal tubular dysfunction, necessitating monitoring of creatinine and phosphate."
            },
            {
              "stem": "A 22-year-old man presents with a painless genital ulcer and inguinal lymphadenopathy. Dark-field microscopy confirms Treponema pallidum. Which stage of syphilis does this represent?",
              "options": [
                "Primary syphilis",
                "Secondary syphilis",
                "Latent syphilis",
                "Tertiary syphilis"
              ],
              "answer": "Primary syphilis",
              "explanation": "A painless genital ulcer with regional lymphadenopathy is characteristic of primary syphilis."
            },
            {
              "stem": "A 30-year-old woman with a history of multiple sexual partners presents with dysuria and a mucopurulent cervical discharge. Gram stain shows intracellular gram-negative diplococci. Which antibiotic is recommended for empirical treatment?",
              "options": [
                "Azithromycin 1 g single dose",
                "Doxycycline 100 mg twice daily for 7 days",
                "Ceftriaxone 500 mg IM single dose",
                "Metronidazole 500 mg twice daily for 7 days"
              ],
              "answer": "Ceftriaxone 500 mg IM single dose",
              "explanation": "Ceftriaxone is the recommended treatment for gonorrhea, and co-treatment for chlamydia (azithromycin or doxycycline) is advised due to high co-infection rates."
            },
            {
              "stem": "A 50-year-old man with HIV (CD4 count 120 cells/mm³) presents with fever, headache, and confusion. CSF analysis shows lymphocytic pleocytosis, elevated protein, and low glucose. Cryptococcal antigen is positive. Which is the preferred initial antifungal therapy?",
              "options": [
                "Fluconazole 800 mg daily",
                "Amphotericin B deoxycholate 0.7 mg/kg/day + flucytosine 25 mg/kg four times daily",
                "Caspofungin 70 mg loading dose then 50 mg daily",
                "Voriconazole 4 mg/kg IV twice daily"
              ],
              "answer": "Amphotericin B deoxycholate 0.7 mg/kg/day + flucytosine 25 mg/kg four times daily",
              "explanation": "Amphotericin B plus flucytosine is the recommended induction therapy for cryptococcal meningitis in HIV-infected patients."
            },
            {
              "stem": "A 25-year-old woman with HIV (CD4 count 50 cells/mm³) develops odynophagia and white plaques on her tongue. Which is the most appropriate initial therapy?",
              "options": [
                "Topical nystatin suspension 5 mL swish and swallow four times daily for 14 days",
                "Oral fluconazole 100 mg daily for 14 days",
                "Intravenous micafungin 100 mg daily for 10 days",
                "Oral acyclovir 400 mg five times daily for 7 days"
              ],
              "answer": "Oral fluconazole 100 mg daily for 14 days",
              "explanation": "Fluconazole is the preferred therapy for oropharyngeal candidiasis in HIV-infected patients with moderate to severe disease."
            },
            {
              "stem": "A 35-year-old man with chronic hepatitis C (genotype 1) is started on sofosbuvir/velpatasvir. Which adverse effect is most commonly associated with this regimen?",
              "options": [
                "Bradycardia",
                "Hemolytic anemia",
                "Headache and fatigue",
                "Renal impairment"
              ],
              "answer": "Headache and fatigue",
              "explanation": "Sofosbuvir/velpatasvir is generally well-tolerated, with headache and fatigue being the most common adverse effects."
            },
            {
              "stem": "A 60-year-old man with a history of chronic hepatitis B and cirrhosis presents with ascites. Which serological marker indicates active HBV replication and high infectivity?",
              "options": [
                "Anti-HBe",
                "HBeAg",
                "Anti-HBc IgM",
                "Anti-HBs"
              ],
              "answer": "HBeAg",
              "explanation": "HBeAg positivity indicates active HBV replication and high infectivity, especially in the context of elevated HBV DNA."
            },
            {
              "stem": "A 20-year-old man presents with fever, headache, and nuchal rigidity. CSF analysis shows 500 WBC/µL (90% neutrophils), glucose 20 mg/dL (serum 100 mg/dL), and protein 200 mg/dL. Which organism is most likely responsible?",
              "options": [
                "Neisseria meningitidis",
                "Streptococcus pneumoniae",
                "Listeria monocytogenes",
                "Mycobacterium tuberculosis"
              ],
              "answer": "Streptococcus pneumoniae",
              "explanation": "The CSF profile (neutrophilic pleocytosis, low glucose, elevated protein) is classic for bacterial meningitis, with S. pneumoniae being a common cause in adults."
            },
            {
              "stem": "A 40-year-old woman with HIV (CD4 count 200 cells/mm³) develops watery diarrhea for 2 weeks. Stool microscopy reveals acid-fast oocysts. Which organism is most likely responsible?",
              "options": [
                "Giardia lamblia",
                "Cryptosporidium parvum",
                "Entamoeba histolytica",
                "Isospora belli"
              ],
              "answer": "Cryptosporidium parvum",
              "explanation": "Cryptosporidium is a common cause of chronic diarrhea in HIV-infected patients with CD4 counts <200 cells/mm³."
            },
            {
              "stem": "A 30-year-old man with HIV is started on efavirenz-based ART. Which adverse effect is most commonly associated with efavirenz?",
              "options": [
                "Peripheral neuropathy",
                "Rash and Stevens-Johnson syndrome",
                "Central nervous system symptoms (e.g., vivid dreams, dizziness)",
                "Lactic acidosis"
              ],
              "answer": "Central nervous system symptoms (e.g., vivid dreams, dizziness)",
              "explanation": "Efavirenz is associated with neuropsychiatric adverse effects, including vivid dreams, dizziness, and insomnia."
            },
            {
              "stem": "A 55-year-old man with chronic hepatitis C (genotype 3) achieves sustained virologic response (SVR) after 12 weeks of glecaprevir/pibrentasvir. Which long-term complication risk is most reduced by achieving SVR?",
              "options": [
                "Hepatocellular carcinoma",
                "Portal hypertension",
                "Esophageal varices",
                "Spontaneous bacterial peritonitis"
              ],
              "answer": "Hepatocellular carcinoma",
              "explanation": "Achieving SVR in chronic hepatitis C significantly reduces the risk of hepatocellular carcinoma, especially in patients with cirrhosis."
            },
            {
              "stem": "A 28-year-old woman presents with a maculopapular rash involving the palms and soles, fever, and generalized lymphadenopathy. RPR is reactive (1:32) and TPHA is positive. Which stage of syphilis does this represent?",
              "options": [
                "Primary syphilis",
                "Secondary syphilis",
                "Latent syphilis",
                "Tertiary syphilis"
              ],
              "answer": "Secondary syphilis",
              "explanation": "The maculopapular rash involving the palms and soles, along with systemic symptoms, is characteristic of secondary syphilis."
            },
            {
              "stem": "A 45-year-old man with HIV (CD4 count 150 cells/mm³) develops progressive dyspnea and dry cough. Chest X-ray shows bilateral interstitial infiltrates. Which organism is most likely responsible?",
              "options": [
                "Mycobacterium tuberculosis",
                "Pneumocystis jirovecii",
                "Streptococcus pneumoniae",
                "Cytomegalovirus"
              ],
              "answer": "Pneumocystis jirovecii",
              "explanation": "Pneumocystis pneumonia is a common opportunistic infection in HIV-infected patients with CD4 counts <200 cells/mm³."
            },
            {
              "stem": "A 30-year-old woman is diagnosed with acute hepatitis B infection. Which serological marker indicates recovery and immunity?",
              "options": [
                "HBsAg",
                "Anti-HBc IgM",
                "Anti-HBs",
                "HBeAg"
              ],
              "answer": "Anti-HBs",
              "explanation": "Anti-HBs indicates recovery from hepatitis B infection and immunity to future infection."
            },
            {
              "stem": "A 25-year-old man presents with dysuria and a scrotal abscess. Ultrasound shows a complex fluid collection. Which organism is most likely responsible?",
              "options": [
                "Neisseria gonorrhoeae",
                "Chlamydia trachomatis",
                "Staphylococcus aureus",
                "Escherichia coli"
              ],
              "answer": "Staphylococcus aureus",
              "explanation": "Staphylococcus aureus is a common cause of scrotal abscesses, often due to trauma or secondary infection."
            },
            {
              "stem": "A 60-year-old man with chronic hepatitis B and cirrhosis is started on entecavir. Which parameter should be monitored most closely during therapy?",
              "options": [
                "Serum creatinine",
                "Hepatic encephalopathy score",
                "HBV DNA levels",
                "Alpha-fetoprotein"
              ],
              "answer": "HBV DNA levels",
              "explanation": "Entecavir suppresses HBV DNA replication, and monitoring HBV DNA levels helps assess treatment response."
            },
            {
              "stem": "A 35-year-old woman with HIV (CD4 count 100 cells/mm³) presents with a 2-week history of headache and confusion. MRI shows multiple ring-enhancing lesions. Which organism is most likely responsible?",
              "options": [
                "Toxoplasma gondii",
                "Cryptococcus neoformans",
                "Mycobacterium tuberculosis",
                "Cytomegalovirus"
              ],
              "answer": "Toxoplasma gondii",
              "explanation": "Toxoplasma encephalitis is a common cause of ring-enhancing lesions in HIV-infected patients with low CD4 counts."
            },
            {
              "stem": "A 40-year-old man with chronic hepatitis C (genotype 1) is started on ledipasvir/sofosbuvir. Which drug interaction is most likely to occur with this regimen?",
              "options": [
                "Increased warfarin effect",
                "Reduced efficacy of oral contraceptives",
                "Increased risk of statin-induced myopathy",
                "Reduced efficacy of proton pump inhibitors"
              ],
              "answer": "Increased risk of statin-induced myopathy",
              "explanation": "Ledipasvir/sofosbuvir can increase statin levels, increasing the risk of myopathy and rhabdomyolysis."
            },
            {
              "stem": "A 28-year-old woman presents with fever, malaise, and a maculopapular rash. She reports unprotected sexual contact 2 weeks ago. RPR is non-reactive, but FTA-ABS is positive. Which stage of syphilis does this represent?",
              "options": [
                "Primary syphilis",
                "Secondary syphilis",
                "Early latent syphilis",
                "Late latent syphilis"
              ],
              "answer": "Early latent syphilis",
              "explanation": "Early latent syphilis is characterized by positive serology without clinical symptoms, occurring within 1 year of infection."
            },
            {
              "stem": "A 50-year-old man with HIV (CD4 count 80 cells/mm³) develops progressive visual loss. Fundoscopy reveals retinal hemorrhages and cotton-wool spots. Which organism is most likely responsible?",
              "options": [
                "Cytomegalovirus",
                "Herpes simplex virus",
                "Toxoplasma gondii",
                "Mycobacterium avium complex"
              ],
              "answer": "Cytomegalovirus",
              "explanation": "CMV retinitis is a common opportunistic infection in HIV-infected patients with low CD4 counts."
            },
            {
              "stem": "A 30-year-old woman with chronic hepatitis B is started on tenofovir. Which vaccination should be administered to prevent superinfection with another hepatotropic virus?",
              "options": [
                "Hepatitis A vaccine",
                "Hepatitis C vaccine",
                "Hepatitis D vaccine",
                "Hepatitis E vaccine"
              ],
              "answer": "Hepatitis A vaccine",
              "explanation": "Hepatitis A vaccination is recommended for patients with chronic hepatitis B to prevent superinfection, which can lead to fulminant hepatitis."
            },
            {
              "stem": "A 25-year-old man presents with a painless genital ulcer and inguinal lymphadenopathy. Dark-field microscopy confirms Treponema pallidum. Which antibiotic is the preferred treatment?",
              "options": [
                "Doxycycline 100 mg twice daily for 14 days",
                "Benzathine penicillin G 2.4 million units IM single dose",
                "Ceftriaxone 500 mg IM daily for 10 days",
                "Azithromycin 2 g single dose"
              ],
              "answer": "Benzathine penicillin G 2.4 million units IM single dose",
              "explanation": "Benzathine penicillin G is the preferred treatment for primary syphilis."
            },
            {
              "stem": "A 45-year-old man with HIV (CD4 count 180 cells/mm³) develops fever, night sweats, and weight loss. Chest X-ray shows bilateral upper lobe infiltrates. Which organism is most likely responsible?",
              "options": [
                "Mycobacterium tuberculosis",
                "Pneumocystis jirovecii",
                "Streptococcus pneumoniae",
                "Histoplasma capsulatum"
              ],
              "answer": "Mycobacterium tuberculosis",
              "explanation": "Tuberculosis is a common opportunistic infection in HIV-infected patients with low CD4 counts."
            },
            {
              "stem": "A 30-year-old woman with chronic hepatitis C (genotype 2) is started on sofosbuvir/ribavirin. Which adverse effect is most commonly associated with ribavirin?",
              "options": [
                "Peripheral neuropathy",
                "Hemolytic anemia",
                "Rash",
                "Nephrotoxicity"
              ],
              "answer": "Hemolytic anemia",
              "explanation": "Ribavirin is associated with dose-dependent hemolytic anemia, necessitating monitoring of hemoglobin levels."
            },
            {
              "stem": "A 28-year-old man presents with dysuria and a purulent urethral discharge. Gram stain shows gram-negative diplococci. Which antibiotic is recommended for empirical treatment?",
              "options": [
                "Azithromycin 1 g single dose",
                "Doxycycline 100 mg twice daily for 7 days",
                "Ceftriaxone 500 mg IM single dose",
                "Metronidazole 500 mg twice daily for 7 days"
              ],
              "answer": "Ceftriaxone 500 mg IM single dose",
              "explanation": "Ceftriaxone is the recommended treatment for gonorrhea, and co-treatment for chlamydia (azithromycin or doxycycline) is advised."
            },
            {
              "stem": "A 50-year-old man with chronic hepatitis B and cirrhosis is started on tenofovir. Which parameter should be monitored to assess for renal toxicity?",
              "options": [
                "Serum creatinine and phosphate",
                "Hepatic encephalopathy score",
                "HBV DNA levels",
                "Alpha-fetoprotein"
              ],
              "answer": "Serum creatinine and phosphate",
              "explanation": "Tenofovir is associated with renal toxicity, including proximal tubular dysfunction, necessitating monitoring of creatinine and phosphate."
            },
            {
              "stem": "A 35-year-old woman with HIV (CD4 count 120 cells/mm³) presents with fever, headache, and confusion. CSF analysis shows lymphocytic pleocytosis, elevated protein, and low glucose. Cryptococcal antigen is positive. Which is the preferred initial antifungal therapy?",
              "options": [
                "Fluconazole 800 mg daily",
                "Amphotericin B deoxycholate 0.7 mg/kg/day + flucytosine 25 mg/kg four times daily",
                "Caspofungin 70 mg loading dose then 50 mg daily",
                "Voriconazole 4 mg/kg IV twice daily"
              ],
              "answer": "Amphotericin B deoxycholate 0.7 mg/kg/day + flucytosine 25 mg/kg four times daily",
              "explanation": "Amphotericin B plus flucytosine is the recommended induction therapy for cryptococcal meningitis in HIV-infected patients."
            },
            {
              "stem": "A 25-year-old man with HIV (CD4 count 50 cells/mm³) develops odynophagia and white plaques on his tongue. Which is the most appropriate initial therapy?",
              "options": [
                "Topical nystatin suspension 5 mL swish and swallow four times daily for 14 days",
                "Oral fluconazole 100 mg daily for 14 days",
                "Intravenous micafungin 100 mg daily for 10 days",
                "Oral acyclovir 400 mg five times daily for 7 days"
              ],
              "answer": "Oral fluconazole 100 mg daily for 14 days",
              "explanation": "Fluconazole is the preferred therapy for oropharyngeal candidiasis in HIV-infected patients with moderate to severe disease."
            },
            {
              "stem": "A 40-year-old woman with chronic hepatitis C (genotype 1) is started on ledipasvir/sofosbuvir. Which drug interaction is most likely to occur with this regimen?",
              "options": [
                "Increased warfarin effect",
                "Reduced efficacy of oral contraceptives",
                "Increased risk of statin-induced myopathy",
                "Reduced efficacy of proton pump inhibitors"
              ],
              "answer": "Increased risk of statin-induced myopathy",
              "explanation": "Ledipasvir/sofosbuvir can increase statin levels, increasing the risk of myopathy and rhabdomyolysis."
            },
            {
              "stem": "A 30-year-old man presents with fever, headache, and nuchal rigidity. CSF analysis shows 500 WBC/µL (90% neutrophils), glucose 20 mg/dL (serum 100 mg/dL), and protein 200 mg/dL. Which organism is most likely responsible?",
              "options": [
                "Neisseria meningitidis",
                "Streptococcus pneumoniae",
                "Listeria monocytogenes",
                "Mycobacterium tuberculosis"
              ],
              "answer": "Streptococcus pneumoniae",
              "explanation": "The CSF profile (neutrophilic pleocytosis, low glucose, elevated protein) is classic for bacterial meningitis, with S. pneumoniae being a common cause in adults."
            },
            {
              "stem": "A 28-year-old woman presents with jaundice, dark urine, and fatigue 4 weeks after returning from a rural area with poor sanitation. Her ALT is 850 IU/L and total bilirubin is 6.2 mg/dL. Which serological marker is most specific for acute hepatitis A infection?",
              "options": [
                "Anti-HAV IgM",
                "Anti-HAV IgG",
                "HBsAg",
                "Anti-HCV"
              ],
              "answer": "Anti-HAV IgM",
              "explanation": "Anti-HAV IgM is the first antibody to appear in acute hepatitis A infection and indicates recent exposure."
            },
            {
              "stem": "A 34-year-old pregnant woman in her third trimester is diagnosed with acute hepatitis E infection. Which of the following is the most significant risk associated with this infection during pregnancy?",
              "options": [
                "Chronic carrier state",
                "Fulminant hepatic failure",
                "Vertical transmission to the neonate",
                "Development of hepatocellular carcinoma"
              ],
              "answer": "Fulminant hepatic failure",
              "explanation": "HEV infection in pregnancy, particularly in the third trimester, is associated with a high risk of fulminant hepatic failure."
            },
            {
              "stem": "A 45-year-old man with chronic hepatitis B infection (HBeAg positive, HBV DNA 8 log10 IU/mL) is started on tenofovir therapy. Which laboratory parameter should be monitored most closely during therapy?",
              "options": [
                "Serum creatinine and phosphate",
                "Hemoglobin A1c",
                "Thyroid function tests",
                "Platelet count"
              ],
              "answer": "Serum creatinine and phosphate",
              "explanation": "Tenofovir is associated with renal toxicity, including proximal tubular dysfunction, necessitating monitoring of creatinine and phosphate."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 35-year-old man with HIV (CD4 count 150 cells/mm³) presents with fever, cough, and weight loss. Chest X-ray shows bilateral interstitial infiltrates. a) What is the most likely diagnosis? b) List two first-line antimicrobial regimens for this condition. c) What adjunctive therapy is recommended for severe cases? d) How should response to therapy be monitored?",
              "modelAnswer": "a) Pneumocystis jirovecii pneumonia (PCP).\nb) First-line regimens: 1) Trimethoprim-sulfamethoxazole (TMP-SMX) 15–20 mg/kg/day IV or PO divided every 6–8 hours for 21 days; 2) Clindamycin 600 mg IV every 6–8 hours plus primaquine 30 mg PO daily for 21 days (for patients intolerant to TMP-SMX).\nc) Adjunctive therapy: Prednisone 40 mg PO twice daily for 5 days, then 40 mg daily for 5 days, then 20 mg daily for 11 days (for patients with PaO2 <70 mmHg or alveolar-arterial oxygen gradient >35 mmHg).\nd) Monitor response to therapy with clinical improvement (e.g., resolution of fever, cough, and hypoxia), arterial blood gas analysis (improvement in PaO2), and chest X-ray (resolution of infiltrates)."
            },
            {
              "stem": "A 40-year-old woman with chronic hepatitis B (HBeAg positive, HBV DNA 7 log10 IU/mL) is started on entecavir. a) What are three goals of therapy for chronic hepatitis B? b) List two laboratory parameters that should be monitored during therapy. c) What is the expected duration of therapy?",
              "modelAnswer": "a) Goals of therapy: 1) Suppress HBV DNA to undetectable levels; 2) Seroconversion from HBeAg to anti-HBe (in HBeAg-positive patients); 3) Improve liver histology and reduce risk of cirrhosis and hepatocellular carcinoma.\nb) Laboratory parameters to monitor: 1) HBV DNA levels (every 3–6 months); 2) Liver function tests (ALT/AST every 3–6 months).\nc) Duration of therapy: Long-term (often lifelong) for patients with cirrhosis or high risk of disease progression; finite duration (e.g., 1–2 years) may be considered for selected patients with HBeAg seroconversion and sustained virologic response."
            },
            {
              "stem": "A 28-year-old man presents with a painless genital ulcer and inguinal lymphadenopathy. Dark-field microscopy confirms Treponema pallidum. a) What is the most likely diagnosis? b) What is the recommended treatment regimen? c) What follow-up serological testing is recommended?",
              "modelAnswer": "a) Primary syphilis.\nb) Recommended treatment: Benzathine penicillin G 2.4 million units IM single dose.\nc) Follow-up serological testing: RPR or VDRL at 6 and 12 months to assess for serologic response (4-fold decrease in titer indicates response)."
            },
            {
              "stem": "A 30-year-old woman with HIV (CD4 count 80 cells/mm³) develops odynophagia and white plaques on her tongue. a) What is the most likely diagnosis? b) What is the recommended first-line therapy? c) What are two alternative therapies for patients intolerant to first-line treatment?",
              "modelAnswer": "a) Oropharyngeal candidiasis (thrush).\nb) Recommended first-line therapy: Oral fluconazole 100–200 mg daily for 7–14 days.\nc) Alternative therapies: 1) Itraconazole oral solution 200 mg daily for 7–14 days; 2) Posaconazole suspension 400 mg twice daily on day 1, then 400 mg daily for 14 days."
            },
            {
              "stem": "A 50-year-old man with chronic hepatitis C (genotype 1) is started on sofosbuvir/ledipasvir. a) What are three goals of therapy for chronic hepatitis C? b) List two laboratory parameters that should be monitored during therapy. c) What is the expected duration of therapy?",
              "modelAnswer": "a) Goals of therapy: 1) Achieve sustained virologic response (SVR); 2) Improve liver histology and reduce risk of cirrhosis and hepatocellular carcinoma; 3) Prevent transmission of HCV to others.\nb) Laboratory parameters to monitor: 1) HCV RNA levels (at baseline, end of treatment, and 12 weeks post-treatment); 2) Liver function tests (ALT/AST every 4–12 weeks).\nc) Duration of therapy: Typically 8–12 weeks for genotype 1 (depending on prior treatment experience and presence of cirrhosis)."
            },
            {
              "stem": "A 25-year-old woman presents with dysuria, frequency, and suprapubic pain. Urinalysis shows >100,000 CFU/mL of Escherichia coli. a) What is the most likely diagnosis? b) What are two first-line oral antibiotic regimens for uncomplicated cystitis? c) What patient education should be provided to prevent recurrence?",
              "modelAnswer": "a) Uncomplicated urinary tract infection (cystitis).\nb) First-line oral antibiotic regimens: 1) Nitrofurantoin 100 mg twice daily for 5 days; 2) Trimethoprim-sulfamethoxazole 160/800 mg twice daily for 3 days (if local resistance patterns permit).\nc) Patient education: 1) Drink plenty of water; 2) Urinate after sexual intercourse; 3) Wipe front to back; 4) Avoid spermicides and diaphragms."
            },
            {
              "stem": "A 35-year-old man with HIV (CD4 count 200 cells/mm³) presents with fever, night sweats, and weight loss. Chest X-ray shows bilateral upper lobe infiltrates. a) What is the most likely diagnosis? b) What is the recommended treatment regimen? c) What is the expected duration of therapy?",
              "modelAnswer": "a) Pulmonary tuberculosis.\nb) Recommended treatment regimen: Rifampicin 600 mg daily, isoniazid 300 mg daily, pyrazinamide 1.5–2 g daily, and ethambutol 1.2–1.6 g daily for 2 months, followed by rifampicin and isoniazid for 4 months.\nc) Duration of therapy: 6 months total (2 months intensive phase, 4 months continuation phase)."
            },
            {
              "stem": "A 40-year-old woman with chronic hepatitis B and cirrhosis is started on tenofovir. a) What are two long-term complications of chronic hepatitis B that tenofovir therapy aims to prevent? b) List two laboratory parameters that should be monitored during therapy. c) What is the role of hepatocellular carcinoma surveillance in this patient?",
              "modelAnswer": "a) Long-term complications: 1) Cirrhosis; 2) Hepatocellular carcinoma (HCC).\nb) Laboratory parameters to monitor: 1) HBV DNA levels (every 3–6 months); 2) Liver function tests (ALT/AST every 3–6 months).\nc) Role of HCC surveillance: Patients with cirrhosis should undergo HCC surveillance with abdominal ultrasound every 6 months to detect early-stage tumors amenable to curative therapy."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 32-year-old man with no known medical history presents to the emergency department with a 2-week history of fever, headache, and confusion. He reports unprotected sexual contact 4 weeks ago. On examination, he is febrile (38.5°C), tachycardic, and confused. Neurological examination reveals neck stiffness and photophobia. a) What is the most likely diagnosis? b) Justify your answer. c) Propose two tests that could support the diagnosis. d) Design a comprehensive treatment plan for this patient, including antimicrobial regimen, adjunctive therapy, and supportive care. e) Assuming this patient was allergic to the first-line treatment, propose two alternative pharmacological interventions for moderate to severe infection. f) Explain how you would monitor treatment in this patient. g) Outline the ART regimen you would recommend for this patient and the exact timing of initiation.",
              "modelAnswer": {
                "a) Most likely diagnosis and causative agent: Pneumocystis jirovecii pneumonia (PCP) caused by Pneumocystis jirovecii.\n\nb) Justification:\n- Shortness of breath and cough suggest a respiratory infection.\n- Diffuse bilateral opacities on chest radiograph are characteristic of PCP.\n- Arterial blood gas analysis demonstrating hypoxia (PaO2 8.0 kPa) is typical of PCP.\n- Sputum culture was uninformative, and BAL with transbronchial biopsy was performed to obtain a diagnosis.\n\nc) Supporting tests:\n1) Bronchoalveolar lavage (BAL) with silver stain or immunofluorescence for Pneumocystis jirovecii.\n2) Serum LDH levels: Elevated LDH (>500 IU/L) is often seen in PCP.\n\n\nd) Comprehensive treatment plan:\n- Antimicrobial regimen: Trimethoprim-sulfamethoxazole (TMP-SMX) 15–20 mg/kg/day IV or PO divided every 6–8 hours for 21 days.\n- Adjunctive therapy: Prednisone 40 mg PO twice daily for 5 days, then 40 mg daily for 5 days, then 20 mg daily for 11 days (for patients with PaO2 <70 mmHg or alveolar-arterial oxygen gradient >35 mmHg).\n- Supportive care: Supplemental oxygen to maintain SpO2 >90%; monitor fluid balance and electrolytes; consider noninvasive ventilation or mechanical ventilation if severe hypoxia.\n\n\ne) Alternative pharmacological interventions (for moderate to severe infection):\n1) Clindamycin 600 mg IV every 6–8 hours plus primaquine 30 mg PO daily for 21 days.\n2) Pentamidine 4 mg/kg IV daily for 21 days (reserved for patients intolerant to TMP-SMX and clindamycin-primaquine).\n\n\nf) Monitoring treatment:\n- Clinical: Daily assessment of respiratory status, oxygen requirements, and fever.\n- Laboratory: Arterial blood gas analysis (improvement in PaO2); chest X-ray (resolution of infiltrates).\n- Adverse effects: Monitor for TMP-SMX-related adverse effects (e.g., rash, hyperkalemia, nephrotoxicity).\n\n\ng) ART regimen and timing:\n- Recommended regimen: Tenofovir alafenamide (TAF) 25 mg + emtricitabine (FTC) 200 mg + bictegravir (BIC) 50 mg once daily.\n- Timing of initiation: Start ART within 2 weeks of PCP treatment initiation. Early ART initiation is associated with improved survival in HIV-infected patients with opportunistic infections.": 15
              }
            }
          ]
        }
      ]
    },
    "3": {
      "title": "Infections II",
      "variant": 3,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 28-year-old woman presents with jaundice, dark urine, and fatigue 4 weeks after returning from a rural area in Kenya. She reports no prior vaccination. Which serological marker would be the FIRST to appear in acute hepatitis A infection?",
              "options": [
                "Anti-HAV IgM",
                "Anti-HAV IgG",
                "HBsAg",
                "HCV RNA"
              ],
              "answer": "Anti-HAV IgM",
              "explanation": "Anti-HAV IgM is the first serological marker to appear in acute hepatitis A infection and indicates recent exposure."
            },
            {
              "stem": "A 32-year-old HIV-positive woman is 28 weeks pregnant. Her viral load is 120,000 copies/mL, and CD4 count is 350 cells/mm³. Which intervention is MOST effective in reducing the risk of vertical HIV transmission?",
              "options": [
                "Elective cesarean section at 38 weeks",
                "Intrapartum zidovudine infusion",
                "Maternal antiretroviral therapy (ART) with tenofovir, lamivudine, and dolutegravir",
                "Neonatal zidovudine prophylaxis for 6 weeks"
              ],
              "answer": "Maternal antiretroviral therapy (ART) with tenofovir, lamivudine, and dolutegravir",
              "explanation": "Maternal ART is the most effective strategy to reduce vertical HIV transmission by suppressing maternal viral load."
            },
            {
              "stem": "A 45-year-old man presents with fever, headache, and confusion. Lumbar puncture reveals CSF with 250 WBC/µL (80% lymphocytes), glucose 1.8 mmol/L (serum 5.0 mmol/L), and protein 3.5 g/L. India ink stain is negative, but cryptococcal antigen is positive. Which is the MOST likely diagnosis?",
              "options": [
                "Tuberculous meningitis",
                "Neurosyphilis",
                "Cryptococcal meningitis",
                "Herpes simplex encephalitis"
              ],
              "answer": "Cryptococcal meningitis",
              "explanation": "The CSF profile (lymphocytic pleocytosis, low glucose, high protein) with a positive cryptococcal antigen strongly suggests cryptococcal meningitis."
            },
            {
              "stem": "A 22-year-old male presents with dysuria and a purulent urethral discharge. Gram stain shows intracellular gram-negative diplococci. Which organism is MOST likely responsible?",
              "options": [
                "Chlamydia trachomatis",
                "Neisseria gonorrhoeae",
                "Mycoplasma genitalium",
                "Ureaplasma urealyticum"
              ],
              "answer": "Neisseria gonorrhoeae",
              "explanation": "Gram-negative diplococci on urethral Gram stain are characteristic of Neisseria gonorrhoeae."
            },
            {
              "stem": "A 40-year-old Senegalese man is diagnosed with HIV-2 infection. Which class of antiretrovirals is HIV-2 intrinsically resistant to?",
              "options": [
                "Non-nucleoside reverse transcriptase inhibitors (NNRTIs)",
                "Nucleoside reverse transcriptase inhibitors (NRTIs)",
                "Integrase strand transfer inhibitors (INSTIs)",
                "Protease inhibitors (PIs)"
              ],
              "answer": "Non-nucleoside reverse transcriptase inhibitors (NNRTIs)",
              "explanation": "HIV-2 is intrinsically resistant to NNRTIs due to structural differences in the reverse transcriptase enzyme."
            },
            {
              "stem": "A 65-year-old man with a history of chronic HBV infection presents with abdominal distension and ascites. Ultrasound confirms hepatocellular carcinoma (HCC). Which viral marker is MOST strongly associated with the development of HCC in HBV-infected individuals?",
              "options": [
                "HBeAg",
                "HBcAb",
                "HBV DNA",
                "Anti-HBs"
              ],
              "answer": "HBV DNA",
              "explanation": "High HBV DNA levels are strongly associated with an increased risk of HCC in chronic HBV infection."
            },
            {
              "stem": "A 12-month-old child is scheduled for hepatitis A vaccination. According to WHO guidelines, when should the first dose of hepatitis A vaccine be administered?",
              "options": [
                "At birth",
                "At 6 months",
                "At 12 months",
                "At 24 months"
              ],
              "answer": "At 12 months",
              "explanation": "WHO recommends the first dose of hepatitis A vaccine at 12 months of age, with a booster 6–12 months later."
            },
            {
              "stem": "A patient tests negative for anti-HCV antibodies on a third-generation ELISA. Which test should be performed NEXT to confirm absence of HCV infection?",
              "options": [
                "HCV RNA PCR",
                "HCV core antigen assay",
                "Recombinant immunoblot assay (RIBA)",
                "Liver biopsy"
              ],
              "answer": "HCV RNA PCR",
              "explanation": "A negative anti-HCV antibody test should be confirmed with HCV RNA PCR to exclude active infection."
            },
            {
              "stem": "A patient’s hepatitis B serology shows: HBsAg negative, anti-HBs positive, anti-HBc IgG positive. Which interpretation is CORRECT?",
              "options": [
                "Acute HBV infection",
                "Chronic HBV infection",
                "Immunity after natural infection",
                "Immunity after vaccination"
              ],
              "answer": "Immunity after natural infection",
              "explanation": "HBsAg negative, anti-HBs positive, and anti-HBc IgG positive indicate resolved natural HBV infection with immunity."
            },
            {
              "stem": "Which sexually transmitted infection (STI) has the HIGHEST global prevalence of antimicrobial resistance?",
              "options": [
                "Chlamydia trachomatis",
                "Treponema pallidum",
                "Neisseria gonorrhoeae",
                "Trichomonas vaginalis"
              ],
              "answer": "Neisseria gonorrhoeae",
              "explanation": "Neisseria gonorrhoeae has widespread antimicrobial resistance, including to extended-spectrum cephalosporins."
            },
            {
              "stem": "A 25-year-old woman presents with a maculopapular rash on her palms and soles, fever, and generalized lymphadenopathy. Which STI is MOST likely responsible?",
              "options": [
                "Chlamydia trachomatis",
                "Neisseria gonorrhoeae",
                "Treponema pallidum",
                "Herpes simplex virus"
              ],
              "answer": "Treponema pallidum",
              "explanation": "The rash on palms and soles is characteristic of secondary syphilis caused by Treponema pallidum."
            },
            {
              "stem": "Which hepatitis virus is NOT transmitted parenterally?",
              "options": [
                "Hepatitis B virus",
                "Hepatitis C virus",
                "Hepatitis D virus",
                "Hepatitis A virus"
              ],
              "answer": "Hepatitis A virus",
              "explanation": "Hepatitis A virus is transmitted via the fecal-oral route and is not parenterally transmitted."
            },
            {
              "stem": "A 30-year-old pregnant woman in her third trimester presents with nausea, vomiting, and jaundice. She reports drinking contaminated water during a recent trip. Which hepatitis virus is MOST likely responsible?",
              "options": [
                "Hepatitis A virus",
                "Hepatitis B virus",
                "Hepatitis C virus",
                "Hepatitis E virus"
              ],
              "answer": "Hepatitis E virus",
              "explanation": "Hepatitis E virus is transmitted via the fecal-oral route and is particularly severe in pregnant women."
            },
            {
              "stem": "Which of the following is NOT a recommended test for diagnosing acute HBV infection?",
              "options": [
                "Alanine aminotransferase (ALT)",
                "Aspartate aminotransferase (AST)",
                "Bilirubin",
                "Glucose tolerance test"
              ],
              "answer": "Glucose tolerance test",
              "explanation": "Glucose tolerance test is not relevant for diagnosing HBV infection; liver enzymes and serology are key."
            },
            {
              "stem": "Which route of transmission is responsible for both hepatitis A and hepatitis E infections?",
              "options": [
                "Bloodborne",
                "Droplet",
                "Fecal-oral",
                "Sexual"
              ],
              "answer": "Fecal-oral",
              "explanation": "Both hepatitis A and E are transmitted via the fecal-oral route, often through contaminated food or water."
            },
            {
              "stem": "A 20-year-old woman presents with fever, nausea, vomiting, and hepatomegaly. Which symptom is LEAST likely to be associated with acute hepatitis A infection?",
              "options": [
                "Jaundice",
                "Pedal edema",
                "Fever and chills",
                "Nausea and vomiting"
              ],
              "answer": "Pedal edema",
              "explanation": "Pedal edema is not a typical feature of acute hepatitis A; jaundice, fever, and gastrointestinal symptoms are common."
            },
            {
              "stem": "Hepatitis E infection is typically self-limiting EXCEPT in which patient group?",
              "options": [
                "Pregnant women",
                "HIV-positive patients",
                "Patients with pre-existing liver disease",
                "Children under 5 years"
              ],
              "answer": "Pregnant women",
              "explanation": "Hepatitis E infection is particularly severe in pregnant women, with high mortality rates."
            },
            {
              "stem": "A patient’s hepatitis B serology shows: HBsAg positive, HBeAg positive, anti-HBc IgM positive, HBV DNA 10^8 IU/mL. Which phase of HBV infection is MOST likely?",
              "options": [
                "Immune tolerant phase",
                "Immune active phase",
                "Inactive carrier phase",
                "HCC phase"
              ],
              "answer": "Immune active phase",
              "explanation": "HBsAg and HBeAg positive with high HBV DNA and anti-HBc IgM positive indicates the immune active phase of HBV infection."
            },
            {
              "stem": "Which of the following is NOT a goal of direct-acting antiviral (DAA) therapy for chronic HCV infection?",
              "options": [
                "Achieve sustained virologic response (SVR)",
                "Prevent progression to cirrhosis",
                "Eradicate HCV RNA",
                "Stimulate host immune response"
              ],
              "answer": "Stimulate host immune response",
              "explanation": "DAAs directly target HCV replication; they do not stimulate the host immune response."
            },
            {
              "stem": "Which of the following is NOT a common cause of urinary tract infection (UTI) in men?",
              "options": [
                "Prostate enlargement",
                "Urinary stone",
                "Catheter usage",
                "Erectile dysfunction"
              ],
              "answer": "Erectile dysfunction",
              "explanation": "Erectile dysfunction is not a direct cause of UTI; prostate enlargement, stones, and catheters are risk factors."
            },
            {
              "stem": "A 5-year-old child presents with fever, dysuria, and suprapubic pain. Urinalysis shows 100 WBC/HPF and positive nitrites. Which organism is the MOST likely cause?",
              "options": [
                "Staphylococcus saprophyticus",
                "Escherichia coli",
                "Klebsiella pneumoniae",
                "Proteus mirabilis"
              ],
              "answer": "Escherichia coli",
              "explanation": "E. coli is the most common cause of UTI in children and adults, accounting for ~80% of cases."
            },
            {
              "stem": "Which of the following is NOT a recommended first-line treatment for uncomplicated cystitis in non-pregnant women?",
              "options": [
                "Nitrofurantoin 100 mg twice daily for 5 days",
                "Trimethoprim-sulfamethoxazole 160/800 mg twice daily for 3 days",
                "Fosfomycin 3 g single dose",
                "Amoxicillin-clavulanate 500/125 mg three times daily for 7 days"
              ],
              "answer": "Amoxicillin-clavulanate 500/125 mg three times daily for 7 days",
              "explanation": "Amoxicillin-clavulanate is not a first-line agent for uncomplicated cystitis due to high resistance rates."
            },
            {
              "stem": "A 28-year-old pregnant woman at 20 weeks gestation presents with dysuria and fever. Urine culture grows E. coli. Which antibiotic is CONTRAINDICATED in pregnancy?",
              "options": [
                "Nitrofurantoin",
                "Cefixime",
                "Trimethoprim-sulfamethoxazole",
                "Amoxicillin"
              ],
              "answer": "Trimethoprim-sulfamethoxazole",
              "explanation": "Trimethoprim-sulfamethoxazole is contraindicated in the first trimester due to folate antagonist effects and near term due to neonatal kernicterus risk."
            },
            {
              "stem": "Which of the following is NOT a risk factor for mother-to-child transmission of HIV?",
              "options": [
                "High maternal viral load",
                "Low maternal CD4 count",
                "Prolonged rupture of membranes",
                "Maternal age < 25 years"
              ],
              "answer": "Maternal age < 25 years",
              "explanation": "Maternal age < 25 years is not a recognized risk factor for vertical HIV transmission."
            },
            {
              "stem": "A 35-year-old HIV-positive man presents with a 2-week history of cough, fever, and weight loss. Chest X-ray shows bilateral interstitial infiltrates. Which opportunistic infection is MOST likely?",
              "options": [
                "Tuberculosis",
                "Pneumocystis jirovecii pneumonia",
                "Cryptococcal pneumonia",
                "Histoplasmosis"
              ],
              "answer": "Pneumocystis jirovecii pneumonia",
              "explanation": "The clinical presentation and chest X-ray findings are classic for Pneumocystis jirovecii pneumonia in an HIV-positive patient."
            },
            {
              "stem": "Which of the following antiretroviral drugs is associated with the HIGHEST risk of mitochondrial toxicity?",
              "options": [
                "Tenofovir",
                "Lamivudine",
                "Stavudine",
                "Dolutegravir"
              ],
              "answer": "Stavudine",
              "explanation": "Stavudine is a thymidine analog NRTI with the highest risk of mitochondrial toxicity, including lactic acidosis and lipoatrophy."
            },
            {
              "stem": "A 40-year-old man with HIV presents with a CD4 count of 40 cells/mm³ and a 1-week history of headache, confusion, and fever. MRI brain shows multiple ring-enhancing lesions. Which organism is MOST likely responsible?",
              "options": [
                "Mycobacterium tuberculosis",
                "Toxoplasma gondii",
                "Cryptococcus neoformans",
                "Herpes simplex virus"
              ],
              "answer": "Toxoplasma gondii",
              "explanation": "Ring-enhancing lesions on MRI in a severely immunocompromised patient suggest cerebral toxoplasmosis."
            },
            {
              "stem": "Which of the following is a DIRECT method of measuring adherence to antiretroviral therapy?",
              "options": [
                "Pill counts",
                "Pharmacy refill records",
                "Directly observed therapy",
                "Patient self-report"
              ],
              "answer": "Directly observed therapy",
              "explanation": "Directly observed therapy is a direct method of measuring adherence by observing the patient taking the medication."
            },
            {
              "stem": "A 25-year-old man presents with a painless genital ulcer that appeared 3 weeks ago. He reports unprotected sexual contact 4 weeks prior. Which organism is MOST likely responsible?",
              "options": [
                "Chlamydia trachomatis",
                "Neisseria gonorrhoeae",
                "Treponema pallidum",
                "Herpes simplex virus"
              ],
              "answer": "Treponema pallidum",
              "explanation": "A painless genital ulcer is characteristic of primary syphilis caused by Treponema pallidum."
            },
            {
              "stem": "Which of the following is NOT a common adverse effect of acyclovir?",
              "options": [
                "Nephrotoxicity",
                "Headache",
                "Bone marrow suppression",
                "Gastrointestinal upset"
              ],
              "answer": "Bone marrow suppression",
              "explanation": "Acyclovir is not typically associated with bone marrow suppression; nephrotoxicity and GI upset are more common."
            },
            {
              "stem": "A 30-year-old woman presents with vaginal itching, curd-like discharge, and vulvar erythema. Which organism is MOST likely responsible?",
              "options": [
                "Trichomonas vaginalis",
                "Candida albicans",
                "Neisseria gonorrhoeae",
                "Chlamydia trachomatis"
              ],
              "answer": "Candida albicans",
              "explanation": "Candida albicans is the most common cause of vulvovaginal candidiasis, characterized by curd-like discharge and itching."
            },
            {
              "stem": "Which of the following is the preferred initial treatment for oral candidiasis in an HIV-positive patient?",
              "options": [
                "Topical nystatin suspension",
                "Oral fluconazole",
                "Intravenous amphotericin B",
                "Topical clotrimazole cream"
              ],
              "answer": "Oral fluconazole",
              "explanation": "Oral fluconazole is the preferred initial treatment for oral candidiasis in HIV-positive patients due to its efficacy and ease of administration."
            },
            {
              "stem": "A 22-year-old man presents with dysuria and a thin, clear urethral discharge. Gram stain shows no organisms. Which organism is MOST likely responsible?",
              "options": [
                "Chlamydia trachomatis",
                "Neisseria gonorrhoeae",
                "Mycoplasma genitalium",
                "Ureaplasma urealyticum"
              ],
              "answer": "Chlamydia trachomatis",
              "explanation": "Chlamydia trachomatis often presents with a thin, clear discharge and no organisms on Gram stain."
            },
            {
              "stem": "Which of the following is NOT a recommended strategy to improve adherence to antiretroviral therapy?",
              "options": [
                "Enlisting a treatment supporter",
                "Disclosing HIV status to all family members",
                "Using pill organizers",
                "Peer support groups"
              ],
              "answer": "Disclosing HIV status to all family members",
              "explanation": "Disclosing HIV status to all family members is not a recommended strategy for improving adherence; it may lead to stigma and discrimination."
            },
            {
              "stem": "A 45-year-old man with chronic HBV infection is started on tenofovir. Which parameter should be monitored MOST closely?",
              "options": [
                "Serum creatinine and eGFR",
                "Liver enzymes (ALT/AST)",
                "Hepatitis B viral load",
                "Complete blood count"
              ],
              "answer": "Serum creatinine and eGFR",
              "explanation": "Tenofovir is associated with renal toxicity, so serum creatinine and eGFR should be monitored closely."
            },
            {
              "stem": "Which of the following is a CORRECT statement about the hepatitis B vaccine?",
              "options": [
                "It provides lifelong immunity after a single dose",
                "It is administered as a series of three injections",
                "It is contraindicated in immunocompromised individuals",
                "It is derived from live attenuated HBV"
              ],
              "answer": "It is administered as a series of three injections",
              "explanation": "The hepatitis B vaccine is administered as a series of three intramuscular injections, typically at 0, 1, and 6 months."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 35-year-old HIV-positive woman with a CD4 count of 120 cells/mm³ presents with fever, cough, and weight loss. Chest X-ray shows bilateral interstitial infiltrates. a) Identify the MOST likely diagnosis. b) List TWO first-line treatment options. c) Name ONE adjunctive therapy that may improve survival. d) State ONE monitoring parameter during treatment.",
              "modelAnswer": "a) Pneumocystis jirovecii pneumonia (PCP).\nb) 1. Trimethoprim-sulfamethoxazole (TMP-SMX) 15–20 mg/kg/day IV or orally in divided doses for 21 days. 2. Alternative: Clindamycin 600 mg IV every 8 hours plus primaquine 30 mg orally daily for 21 days.\nc) Corticosteroids (e.g., prednisone 40 mg twice daily for 5 days, then taper) if PaO2 < 70 mmHg or alveolar-arterial oxygen gradient > 35 mmHg.\nd) Oxygen saturation and arterial blood gas (ABG) monitoring."
            },
            {
              "stem": "A 28-year-old man presents with a painless genital ulcer that appeared 3 weeks ago. He reports unprotected sexual contact 4 weeks prior. a) Identify the MOST likely diagnosis. b) Name the causative organism. c) List TWO diagnostic tests to confirm the diagnosis. d) State the recommended treatment regimen.",
              "modelAnswer": "a) Primary syphilis.\nb) Treponema pallidum.\nc) 1. Rapid plasma reagin (RPR) or Venereal Disease Research Laboratory (VDRL) test. 2. Treponema pallidum particle agglutination (TPPA) or fluorescent treponemal antibody absorption (FTA-ABS) test.\nd) Benzathine penicillin G 2.4 million units IM as a single dose."
            },
            {
              "stem": "A 40-year-old woman with chronic HBV infection is started on tenofovir disoproxil fumarate (TDF). a) State TWO laboratory parameters that should be monitored during therapy. b) Identify ONE potential adverse effect of TDF. c) Describe the goal of HBV therapy in this patient.",
              "modelAnswer": "a) 1. Serum creatinine and estimated glomerular filtration rate (eGFR). 2. Hepatitis B viral load (HBV DNA).\nb) Renal toxicity (e.g., Fanconi syndrome, acute kidney injury).\nc) To suppress HBV replication, reduce hepatic inflammation, and prevent progression to cirrhosis or hepatocellular carcinoma."
            },
            {
              "stem": "A 25-year-old pregnant woman at 28 weeks gestation is diagnosed with acute hepatitis E infection. a) State TWO complications associated with hepatitis E in pregnancy. b) Outline ONE supportive measure for this patient. c) Describe the preferred management approach for her newborn.",
              "modelAnswer": "a) 1. Fulminant hepatic failure. 2. High maternal and fetal mortality.\nb) Supportive care: hydration, correction of electrolyte imbalances, and monitoring for signs of hepatic encephalopathy.\nc) No specific treatment is required for the newborn; monitor for signs of infection and provide supportive care if symptomatic."
            },
            {
              "stem": "A 30-year-old man presents with dysuria, purulent urethral discharge, and a history of unprotected sexual contact. Gram stain shows intracellular gram-negative diplococci. a) Identify the MOST likely diagnosis. b) Name the causative organism. c) State the recommended treatment regimen. d) List ONE partner management strategy.",
              "modelAnswer": "a) Gonococcal urethritis.\nb) Neisseria gonorrhoeae.\nc) Ceftriaxone 500 mg IM as a single dose PLUS azithromycin 1 g orally as a single dose (for possible chlamydial co-infection).\nd) Partner notification, testing, and empiric treatment with the same regimen."
            },
            {
              "stem": "A 45-year-old man with HIV presents with a CD4 count of 50 cells/mm³ and a 2-week history of headache, confusion, and fever. Lumbar puncture reveals a CSF opening pressure of 28 cm H2O, glucose 2.0 mmol/L (serum 5.0 mmol/L), protein 2.5 g/L, and 200 WBC/µL (90% lymphocytes). Cryptococcal antigen is positive. a) Identify the MOST likely diagnosis. b) State the preferred initial antifungal therapy. c) Describe ONE adjunctive measure to manage increased intracranial pressure.",
              "modelAnswer": "a) Cryptococcal meningitis.\nb) Liposomal amphotericin B 3–4 mg/kg IV daily PLUS flucytosine 25 mg/kg orally four times daily for at least 2 weeks, followed by fluconazole consolidation therapy.\nc) Serial lumbar punctures to reduce CSF pressure (e.g., remove 20–30 mL of CSF daily until pressure < 20 cm H2O)."
            },
            {
              "stem": "A 22-year-old woman presents with lower abdominal pain, fever, and purulent vaginal discharge. Pelvic examination reveals cervical motion tenderness and adnexal tenderness. a) Identify the MOST likely diagnosis. b) List THREE organisms commonly implicated. c) State the recommended treatment regimen.",
              "modelAnswer": "a) Pelvic inflammatory disease (PID).\nb) 1. Chlamydia trachomatis. 2. Neisseria gonorrhoeae. 3. Mycoplasma genitalium or anaerobes (e.g., Bacteroides fragilis).\nc) Ceftriaxone 500 mg IM as a single dose PLUS doxycycline 100 mg orally twice daily for 14 days PLUS metronidazole 400 mg orally twice daily for 14 days."
            },
            {
              "stem": "A 30-year-old man with HIV is diagnosed with oral candidiasis. a) Identify the MOST likely causative organism. b) State the preferred initial treatment. c) List TWO alternative treatment options if the patient is intolerant to the first-line therapy. d) Describe ONE monitoring parameter during therapy.",
              "modelAnswer": "a) Candida albicans.\nb) Oral fluconazole 100–200 mg daily for 7–14 days.\nc) 1. Itraconazole oral solution 200 mg daily for 7–14 days. 2. Posaconazole suspension 400 mg twice daily for 1 day, then 400 mg daily for 13 days.\nd) Clinical response (resolution of symptoms and signs) and adverse effects (e.g., hepatotoxicity)."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 35-year-old man with newly diagnosed HIV presents with a 3-week history of fever, night sweats, and a 5-kg weight loss. He reports no cough or dyspnea. Chest X-ray shows bilateral hilar lymphadenopathy. a) Identify the MOST likely diagnosis. b) Justify your answer with FOUR clinical or laboratory features. c) Propose TWO diagnostic tests to confirm the diagnosis. d) Design a comprehensive treatment plan, including ART regimen and timing. e) Outline THREE parameters to monitor during treatment.",
              "modelAnswer": "a) Disseminated Mycobacterium tuberculosis (TB) infection.\nb) 1. Fever and weight loss (constitutional symptoms). 2. Bilateral hilar lymphadenopathy on chest X-ray (suggestive of TB). 3. Night sweats (classic TB symptom). 4. HIV infection (immunocompromised state predisposing to TB).\nc) 1. Sputum acid-fast bacilli (AFB) smear and culture. 2. Interferon-gamma release assay (IGRA) or tuberculin skin test (TST) if not anergic.\nd) Treatment plan:\n   - Start ART within 2 weeks of TB treatment initiation (TB-IRIS risk is lower with early ART).\n   - ART regimen: Tenofovir disoproxil fumarate (TDF) 300 mg + lamivudine (3TC) 300 mg + dolutegravir (DTG) 50 mg once daily.\n   - TB treatment: Rifampicin 600 mg, isoniazid 300 mg, pyrazinamide 1.5 g, and ethambutol 1.2 g daily for 2 months, followed by rifampicin and isoniazid for 4 months.\n   - Adjunctive therapy: Pyridoxine 25 mg daily to prevent isoniazid-induced neuropathy.\ne) Monitoring parameters:\n   1. Clinical response (symptom resolution, weight gain).\n   2. CD4 count and HIV viral load at 3 and 6 months.\n   3. Liver function tests (monthly during TB treatment due to hepatotoxicity risk)."
            },
            {
              "stem": "A 28-year-old woman presents to the emergency department with a 2-day history of fever, headache, and confusion. She reports no recent travel but has a history of unprotected sexual contact 3 weeks ago. On examination, she is febrile (39°C), confused, and has neck stiffness. Lumbar puncture reveals CSF with 300 WBC/µL (70% lymphocytes), glucose 1.5 mmol/L (serum 5.0 mmol/L), and protein 2.0 g/L. Serum VDRL is positive, and CSF VDRL is negative. a) Identify the MOST likely diagnosis. b) Justify your answer with FOUR clinical or laboratory features. c) Propose TWO diagnostic tests to confirm the diagnosis. d) Design a comprehensive treatment plan, including the recommended regimen and duration. e) Outline THREE parameters to monitor during treatment.",
              "modelAnswer": "a) Neurosyphilis.\nb) 1. Fever and confusion (neurological symptoms). 2. Neck stiffness (meningeal irritation). 3. Lymphocytic pleocytosis in CSF (70% lymphocytes). 4. Positive serum VDRL (serological evidence of syphilis).\nc) 1. CSF fluorescent treponemal antibody absorption (FTA-ABS) test. 2. CSF Venereal Disease Research Laboratory (VDRL) test (though negative in this case, it supports neurosyphilis if positive).\nd) Treatment plan:\n   - Benzathine penicillin G 18–24 million units IV daily (divided into 3–4 doses) for 10–14 days.\n   - Alternative for penicillin-allergic patients: Ceftriaxone 2 g IV daily for 10–14 days.\n   - Adjunctive therapy: Analgesics for headache, antipyretics for fever, and monitoring for Jarisch-Herxheimer reaction.\n   - Follow-up lumbar puncture at 6 months to assess treatment response (CSF cell count and VDRL).\ne) Monitoring parameters:\n   1. Neurological examination (resolution of confusion, headache).\n   2. CSF analysis (repeat lumbar puncture at 6 months to assess response).\n   3. Serological tests (serum RPR/VDRL titers at 3, 6, and 12 months to monitor response)."
            }
          ]
        }
      ]
    }
  },
  "exam-respiratory-renal": {
    "1": {
      "title": "Respiratory & Renal",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Which of the following is the MOST characteristic pathological feature of chronic obstructive pulmonary disease (COPD)?",
              "options": [
                "Permanent enlargement of airspaces distal to the terminal bronchioles with destruction of their walls",
                "Chronic inflammation of the airways with reversible airflow limitation",
                "Destruction of the pulmonary vasculature leading to pulmonary hypertension",
                "Hyper-responsiveness of the airways to nonspecific stimuli"
              ],
              "answer": "Permanent enlargement of airspaces distal to the terminal bronchioles with destruction of their walls",
              "explanation": "COPD is defined by permanent enlargement of airspaces distal to the terminal bronchioles with destruction of their walls, often accompanied by chronic inflammation."
            },
            {
              "stem": "A 55-year-old male with COPD presents with worsening dyspnea and ankle swelling. On examination, he has elevated jugular venous pressure, hepatomegaly, and peripheral edema. Which complication is most likely responsible for these findings?",
              "options": [
                "Respiratory acidosis",
                "Cor pulmonale",
                "Pneumothorax",
                "Pulmonary embolism"
              ],
              "answer": "Cor pulmonale",
              "explanation": "Cor pulmonale is right ventricular hypertrophy and failure secondary to pulmonary hypertension, commonly seen in advanced COPD."
            },
            {
              "stem": "Which of the following spirometry findings is MOST consistent with a diagnosis of asthma?",
              "options": [
                "FEV1/FVC ratio < 0.70 that improves by >12% and >200 mL after bronchodilator administration",
                "FEV1/FVC ratio < 0.70 that remains unchanged after bronchodilator administration",
                "FEV1/FVC ratio > 0.80 with reduced FEV1",
                "FEV1/FVC ratio < 0.70 with normal total lung capacity"
              ],
              "answer": "FEV1/FVC ratio < 0.70 that improves by >12% and >200 mL after bronchodilator administration",
              "explanation": "Asthma is characterized by reversible airflow limitation, demonstrated by a significant improvement in FEV1/FVC post-bronchodilator."
            },
            {
              "stem": "A patient with COPD is prescribed a long-acting muscarinic antagonist (LAMA). Which of the following is the MOST appropriate example of this drug class?",
              "options": [
                "Salbutamol",
                "Tiotropium",
                "Fluticasone",
                "Montelukast"
              ],
              "answer": "Tiotropium",
              "explanation": "Tiotropium is a long-acting muscarinic antagonist (LAMA) used in COPD for maintenance bronchodilation."
            },
            {
              "stem": "Which of the following is a common adverse effect of inhaled corticosteroids in asthma management?",
              "options": [
                "Tachycardia",
                "Oral candidiasis",
                "Hyperkalemia",
                "Hypotension"
              ],
              "answer": "Oral candidiasis",
              "explanation": "Inhaled corticosteroids can cause local immunosuppression in the oropharynx, leading to oral candidiasis."
            },
            {
              "stem": "A patient with asthma is prescribed a combination inhaler containing a long-acting beta-agonist (LABA) and an inhaled corticosteroid (ICS). Which of the following is the MOST appropriate example of such a combination?",
              "options": [
                "Salbutamol + Beclomethasone",
                "Formoterol + Budesonide",
                "Ipratropium + Fluticasone",
                "Montelukast + Prednisolone"
              ],
              "answer": "Formoterol + Budesonide",
              "explanation": "Formoterol (LABA) and Budesonide (ICS) is a commonly prescribed fixed-dose combination for asthma maintenance therapy."
            },
            {
              "stem": "Which of the following is the MOST appropriate first-line pharmacotherapy for smoking cessation?",
              "options": [
                "Bupropion alone",
                "Varenicline alone",
                "Nicotine replacement therapy (NRT) alone",
                "Combination of NRT and varenicline"
              ],
              "answer": "Nicotine replacement therapy (NRT) alone",
              "explanation": "NRT is the first-line pharmacotherapy for smoking cessation, with varenicline and bupropion as alternatives."
            },
            {
              "stem": "Which of the following is a contraindication to the use of varenicline in smoking cessation?",
              "options": [
                "History of depression",
                "Severe renal impairment",
                "Concurrent use of nicotine replacement therapy",
                "History of alcohol use disorder"
              ],
              "answer": "Severe renal impairment",
              "explanation": "Varenicline is renally excreted, and severe renal impairment requires dose adjustment or avoidance."
            },
            {
              "stem": "A patient with COPD is prescribed theophylline. Which of the following is the MOST important reason for therapeutic drug monitoring (TDM) in this patient?",
              "options": [
                "Narrow therapeutic index",
                "High risk of hepatotoxicity",
                "Frequent drug interactions with inhaled corticosteroids",
                "Need for dose adjustment based on FEV1"
              ],
              "answer": "Narrow therapeutic index",
              "explanation": "Theophylline has a narrow therapeutic index, making TDM essential to avoid toxicity or subtherapeutic levels."
            },
            {
              "stem": "Which of the following is the MOST common adverse effect of ipratropium bromide?",
              "options": [
                "Hyperkalemia",
                "Dry mouth",
                "Tachycardia",
                "Hypotension"
              ],
              "answer": "Dry mouth",
              "explanation": "Ipratropium bromide, an anticholinergic, commonly causes dry mouth due to its muscarinic receptor blockade."
            },
            {
              "stem": "A patient with chronic kidney disease (CKD) has an estimated glomerular filtration rate (eGFR) of 25 mL/min/1.73 m². Which of the following is the MOST appropriate classification of CKD in this patient?",
              "options": [
                "Stage 1",
                "Stage 2",
                "Stage 3",
                "Stage 4"
              ],
              "answer": "Stage 3",
              "explanation": "CKD is classified as Stage 3 when eGFR is between 30-59 mL/min/1.73 m²."
            },
            {
              "stem": "Which of the following is a major risk factor for the development of chronic kidney disease (CKD)?",
              "options": [
                "Hypertension",
                "Hyperlipidemia",
                "Osteoarthritis",
                "Migraine"
              ],
              "answer": "Hypertension",
              "explanation": "Hypertension is a major risk factor for CKD due to its damaging effects on renal vasculature."
            },
            {
              "stem": "A patient with CKD presents with fatigue, pruritus, and peripheral edema. Which of the following is the MOST likely complication of CKD responsible for these symptoms?",
              "options": [
                "Hypercalcemia",
                "Anemia",
                "Hypokalemia",
                "Metabolic alkalosis"
              ],
              "answer": "Anemia",
              "explanation": "Anemia of CKD is due to reduced erythropoietin production, leading to fatigue and other symptoms."
            },
            {
              "stem": "Which of the following is the MOST appropriate initial management for a patient with acute renal failure (AKI) due to prerenal causes?",
              "options": [
                "Initiate dialysis",
                "Administer intravenous furosemide",
                "Optimize fluid resuscitation and correct underlying cause",
                "Start erythropoietin therapy"
              ],
              "answer": "Optimize fluid resuscitation and correct underlying cause",
              "explanation": "Prerenal AKI is due to reduced renal perfusion, and management focuses on restoring volume and treating the underlying cause."
            },
            {
              "stem": "A patient with asthma is prescribed a leukotriene receptor antagonist. Which of the following is the MOST appropriate example of this drug class?",
              "options": [
                "Montelukast",
                "Zafirlukast",
                "Omalizumab",
                "Cromolyn sodium"
              ],
              "answer": "Montelukast",
              "explanation": "Montelukast is a leukotriene receptor antagonist used in asthma management."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient on long-term oral corticosteroids?",
              "options": [
                "Serum potassium levels",
                "Bone mineral density",
                "Serum magnesium levels",
                "Urine specific gravity"
              ],
              "answer": "Bone mineral density",
              "explanation": "Long-term oral corticosteroids increase the risk of osteoporosis, necessitating monitoring of bone mineral density."
            },
            {
              "stem": "A patient with COPD is prescribed a phosphodiesterase-4 inhibitor. Which of the following is the MOST appropriate example of this drug class?",
              "options": [
                "Roflumilast",
                "Tiotropium",
                "Formoterol",
                "Budesonide"
              ],
              "answer": "Roflumilast",
              "explanation": "Roflumilast is a phosphodiesterase-4 inhibitor used in COPD to reduce exacerbations."
            },
            {
              "stem": "Which of the following is the MOST appropriate management for a patient with acute exacerbation of COPD?",
              "options": [
                "Initiate long-term oxygen therapy",
                "Administer systemic corticosteroids and bronchodilators",
                "Start inhaled corticosteroids alone",
                "Prescribe a loop diuretic"
              ],
              "answer": "Administer systemic corticosteroids and bronchodilators",
              "explanation": "Acute exacerbation of COPD is managed with systemic corticosteroids and bronchodilators to reduce inflammation and improve airflow."
            },
            {
              "stem": "A patient with asthma is prescribed a mast cell stabilizer. Which of the following is the MOST appropriate example of this drug class?",
              "options": [
                "Cromolyn sodium",
                "Nedocromil sodium",
                "Omalizumab",
                "Montelukast"
              ],
              "answer": "Cromolyn sodium",
              "explanation": "Cromolyn sodium is a mast cell stabilizer used in asthma prophylaxis."
            },
            {
              "stem": "Which of the following is the MOST appropriate pharmacotherapy for a patient with mild persistent asthma?",
              "options": [
                "Short-acting beta-agonist (SABA) as needed",
                "Low-dose inhaled corticosteroid (ICS) daily",
                "Long-acting beta-agonist (LABA) alone",
                "Oral corticosteroids daily"
              ],
              "answer": "Low-dose inhaled corticosteroid (ICS) daily",
              "explanation": "Mild persistent asthma is managed with daily low-dose inhaled corticosteroids for long-term control."
            },
            {
              "stem": "A patient with COPD is prescribed a combination of a long-acting beta-agonist (LABA) and a long-acting muscarinic antagonist (LAMA). Which of the following is the MOST appropriate example of such a combination?",
              "options": [
                "Formoterol + Tiotropium",
                "Salbutamol + Ipratropium",
                "Fluticasone + Budesonide",
                "Montelukast + Zafirlukast"
              ],
              "answer": "Formoterol + Tiotropium",
              "explanation": "Formoterol (LABA) and Tiotropium (LAMA) is a commonly prescribed fixed-dose combination for COPD maintenance therapy."
            },
            {
              "stem": "Which of the following is the MOST appropriate management for a patient with acute asthma exacerbation not responding to inhaled bronchodilators?",
              "options": [
                "Administer oral corticosteroids",
                "Initiate oxygen therapy",
                "Prescribe a leukotriene receptor antagonist",
                "Start a phosphodiesterase-4 inhibitor"
              ],
              "answer": "Administer oral corticosteroids",
              "explanation": "Oral corticosteroids are used in acute asthma exacerbations to reduce inflammation when inhaled bronchodilators are insufficient."
            },
            {
              "stem": "A patient with CKD is prescribed an ACE inhibitor. Which of the following is the MOST important monitoring parameter for this patient?",
              "options": [
                "Serum potassium levels",
                "Serum sodium levels",
                "Serum calcium levels",
                "Serum magnesium levels"
              ],
              "answer": "Serum potassium levels",
              "explanation": "ACE inhibitors can cause hyperkalemia, necessitating monitoring of serum potassium levels."
            },
            {
              "stem": "Which of the following is the MOST appropriate pharmacotherapy for a patient with moderate persistent asthma?",
              "options": [
                "Low-dose inhaled corticosteroid (ICS) daily",
                "Medium-dose inhaled corticosteroid (ICS) daily",
                "High-dose inhaled corticosteroid (ICS) daily",
                "Long-acting beta-agonist (LABA) alone"
              ],
              "answer": "Medium-dose inhaled corticosteroid (ICS) daily",
              "explanation": "Moderate persistent asthma is managed with medium-dose inhaled corticosteroids for long-term control."
            },
            {
              "stem": "A patient with COPD is prescribed a mucolytic agent. Which of the following is the MOST appropriate example of this drug class?",
              "options": [
                "N-acetylcysteine",
                "Ambroxol",
                "Carbocysteine",
                "Dornase alfa"
              ],
              "answer": "N-acetylcysteine",
              "explanation": "N-acetylcysteine is a mucolytic agent used in COPD to reduce sputum viscosity."
            },
            {
              "stem": "Which of the following is the MOST appropriate management for a patient with acute renal colic due to nephrolithiasis?",
              "options": [
                "Administer intravenous furosemide",
                "Prescribe oral potassium citrate",
                "Administer intravenous morphine and hydration",
                "Start allopurinol"
              ],
              "answer": "Administer intravenous morphine and hydration",
              "explanation": "Acute renal colic is managed with analgesia (e.g., morphine) and hydration to facilitate stone passage."
            },
            {
              "stem": "A patient with asthma is prescribed a monoclonal antibody targeting IgE. Which of the following is the MOST appropriate example of this drug class?",
              "options": [
                "Omalizumab",
                "Mepolizumab",
                "Reslizumab",
                "Dupilumab"
              ],
              "answer": "Omalizumab",
              "explanation": "Omalizumab is a monoclonal antibody targeting IgE used in severe allergic asthma."
            },
            {
              "stem": "Which of the following is the MOST appropriate pharmacotherapy for a patient with stage 5 CKD on dialysis?",
              "options": [
                "High-dose loop diuretic",
                "Erythropoietin-stimulating agent (ESA)",
                "High-dose ACE inhibitor",
                "Thiazide diuretic"
              ],
              "answer": "Erythropoietin-stimulating agent (ESA)",
              "explanation": "Stage 5 CKD patients on dialysis often require ESAs to manage anemia due to reduced erythropoietin production."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "Discuss the key investigations used in the diagnosis of asthma. Include both pulmonary function tests and other relevant investigations.",
              "modelAnswer": "1. **Spirometry**: FEV1/FVC ratio <0.70 with reversibility (>12% and >200 mL improvement in FEV1 post-bronchodilator).\n2. **Peak Expiratory Flow (PEF) monitoring**: Diurnal variability >20% suggests asthma.\n3. **Bronchoprovocation testing**: Methacholine challenge (PC20 <8 mg/mL indicates hyperresponsiveness).\n4. **Skin prick testing or serum IgE levels**: Identify allergic triggers.\n5. **Chest X-ray**: Rule out other causes (e.g., pneumonia, pneumothorax).\n6. **Fractional exhaled nitric oxide (FeNO)**: Elevated levels (>50 ppb) suggest eosinophilic inflammation.\n7. **Sputum eosinophils**: Presence indicates eosinophilic asthma phenotype."
            },
            {
              "stem": "Outline the ten steps involved in the accurate use of a metered-dose inhaler (MDI).",
              "modelAnswer": "1. **Shake the inhaler** vigorously for 5-10 seconds.\n2. **Remove the cap** and hold the inhaler upright.\n3. **Breathe out** fully to empty lungs.\n4. **Hold the inhaler** 2-4 cm away from the mouth (or use a spacer).\n5. **Start inhaling slowly** and actuate the inhaler once.\n6. **Continue slow, deep inhalation** for 3-5 seconds.\n7. **Hold breath** for 10 seconds (or as long as comfortable).\n8. **Breathe out slowly** through pursed lips.\n9. **Wait 30-60 seconds** before the next dose (if required).\n10. **Rinse mouth** (if using corticosteroids) to prevent oral candidiasis."
            },
            {
              "stem": "What are the major complications of chronic obstructive pulmonary disease (COPD)?",
              "modelAnswer": "1. **Acute exacerbations**: Worsening dyspnea, increased sputum volume/purulence.\n2. **Respiratory failure**: Type 1 (hypoxemic) or Type 2 (hypercapnic).\n3. **Cor pulmonale**: Right ventricular hypertrophy/failure due to pulmonary hypertension.\n4. **Secondary polycythemia**: Chronic hypoxia stimulates erythropoietin production.\n5. **Pneumothorax**: Due to bullae rupture.\n6. **Chronic hypoxia**: Leads to pulmonary hypertension and cor pulmonale.\n7. **Infections**: Increased risk of pneumonia and bronchitis.\n8. **Cachexia**: Due to increased metabolic demand and reduced appetite."
            },
            {
              "stem": "What monitoring parameters are required for the effective follow-up of patients with asthma?",
              "modelAnswer": "1. **Symptom control**: Frequency of daytime/nighttime symptoms, reliever use.\n2. **Pulmonary function**: FEV1, PEF (diurnal variability).\n3. **Adherence**: Review inhaler technique and medication use.\n4. **Exacerbations**: Number and severity of acute attacks.\n5. **Adverse effects**: Oral candidiasis (ICS), tremor/palpitations (SABA/LABA).\n6. **Comorbidities**: Allergic rhinitis, GERD, obesity.\n7. **Peak flow diary**: If available, assess variability.\n8. **FeNO levels**: If available, monitor eosinophilic inflammation."
            },
            {
              "stem": "Briefly discuss the management of a common cold.",
              "modelAnswer": "1. **Non-pharmacological**: Rest, hydration, saline nasal sprays, humidified air.\n2. **Pharmacological**:\n   - **Analgesia**: Paracetamol or NSAIDs for fever/headache.\n   - **Decongestants**: Oral pseudoephedrine or topical oxymetazoline (short-term use).\n   - **Antihistamines**: First-generation (e.g., diphenhydramine) for rhinorrhea/sneezing.\n   - **Cough suppressants**: Dextromethorphan for dry cough.\n   - **Expectorants**: Guaifenesin for productive cough.\n3. **Avoid**: Antibiotics (viral etiology), high-dose vitamin C (no proven benefit).\n4. **Patient education**: Hand hygiene, avoid close contact with others."
            },
            {
              "stem": "Discuss the clinical presentation of chronic kidney disease (CKD).",
              "modelAnswer": "1. **Early symptoms**: Fatigue, pruritus, nocturia, polyuria.\n2. **Late symptoms**: Peripheral edema, dyspnea (fluid overload), nausea/vomiting, confusion (uremia).\n3. **Signs**: Hypertension, pallor (anemia), uremic frost (late stage), pericardial friction rub (uremic pericarditis).\n4. **Complications**: Anemia (normocytic, normochromic), mineral bone disease (hyperphosphatemia, hypocalcemia), metabolic acidosis, hyperkalemia.\n5. **Laboratory findings**: Elevated serum creatinine, reduced eGFR, proteinuria, hematuria (if glomerular disease)."
            },
            {
              "stem": "Briefly discuss the management of acute respiratory distress syndrome (ARDS).",
              "modelAnswer": "1. **Supportive care**:\n   - **Oxygen therapy**: Target SpO2 88-95% (avoid high FiO2 to prevent toxicity).\n   - **Mechanical ventilation**: Low tidal volume (6 mL/kg ideal body weight), high PEEP, permissive hypercapnia.\n2. **Pharmacological**:\n   - **Sedation/analgesia**: Propofol, fentanyl (to reduce ventilator dyssynchrony).\n   - **Neuromuscular blockade**: If needed for severe ventilator dyssynchrony.\n   - **Fluid management**: Conservative strategy to avoid fluid overload.\n3. **Adjunctive therapies**:\n   - **Prone positioning**: For severe ARDS (PaO2/FiO2 <150 mmHg).\n   - **ECMO**: For refractory hypoxemia.\n4. **Treat underlying cause**: Sepsis, pneumonia, trauma, etc."
            },
            {
              "stem": "Briefly discuss the management of acute renal failure (AKI).",
              "modelAnswer": "1. **Identify and treat underlying cause**:\n   - **Prerenal**: Optimize volume status (IV fluids), correct hypotension.\n   - **Intrinsic**: Discontinue nephrotoxins (e.g., NSAIDs, aminoglycosides), treat glomerulonephritis.\n   - **Postrenal**: Relieve obstruction (e.g., Foley catheter, nephrostomy).\n2. **Supportive care**:\n   - **Volume management**: Avoid fluid overload; use diuretics (e.g., furosemide) if volume overload.\n   - **Electrolyte management**: Correct hyperkalemia (e.g., calcium gluconate, insulin/dextrose, sodium polystyrene sulfonate).\n   - **Acidosis correction**: Sodium bicarbonate if severe (pH <7.2).\n3. **Monitoring**: Daily weights, fluid balance, serum creatinine, electrolytes, urine output.\n4. **Renal replacement therapy (RRT)**: If severe (e.g., refractory hyperkalemia, uremic symptoms, fluid overload)."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Mr. Barasa, a 45-year-old road works contractor, presents with a one-month history of cough, wheezing, dyspnea, and chest tightness. Symptoms occur daily, interfere with work, and wake him up twice weekly. He uses a salbutamol inhaler as needed but also takes oral salbutamol and prednisolone tablets inconsistently due to tremors and palpitations. Last night, his inhaler failed to relieve symptoms.\n\n(a) What condition is Mr. Barasa suffering from? (2 marks)\n(b) How would you classify the condition and why? (2 marks)\n(c) Giving examples, describe the classes of medication that Mr. Barasa would benefit from. (8 marks)\n(d) What interventions would you make regarding his current medication? (3 marks)\n(e) What side effects would you counsel the patient on before starting your choice of medication? (5 marks)",
              "modelAnswer": "**(a) Condition:**\nMr. Barasa is suffering from **asthma**, characterized by chronic airway inflammation, reversible airflow limitation, and symptoms of wheezing, dyspnea, and chest tightness.\n\n**(b) Classification:**\nThe condition is classified as **moderate persistent asthma** because:\n- Symptoms occur **daily** (not intermittent).\n- Nighttime symptoms occur **>1 night/week** (not <2 nights/month).\n- Symptoms interfere with **normal activities** (not mild limitation).\n\n**(c) Classes of medication Mr. Barasa would benefit from:**\n1. **Controller medications (long-term control):**\n   - **Inhaled corticosteroids (ICS)**: E.g., **budesonide** or **fluticasone** (first-line for persistent asthma).\n   - **Long-acting beta-agonists (LABA)**: E.g., **formoterol** (used in combination with ICS).\n   - **Leukotriene receptor antagonists**: E.g., **montelukast** (alternative for mild-moderate asthma).\n\n2. **Reliever medications (quick-relief):**\n   - **Short-acting beta-agonists (SABA)**: E.g., **salbutamol** (for acute symptom relief).\n\n3. **Adjunctive therapies (if needed):**\n   - **Long-acting muscarinic antagonists (LAMA)**: E.g., **tiotropium** (for severe asthma).\n   - **Biologics**: E.g., **omalizumab** (if allergic asthma with elevated IgE).\n\n**(d) Interventions regarding current medication:**\n1. **Discontinue oral salbutamol and prednisolone** (due to systemic adverse effects and poor adherence).\n2. **Switch to a fixed-dose combination inhaler** (e.g., **budesonide/formoterol**) for maintenance and as-needed use (MART regimen).\n3. **Educate on proper inhaler technique** and adherence to controller therapy.\n\n**(e) Side effects to counsel the patient on:**\n1. **Inhaled corticosteroids (ICS):**\n   - Oral candidiasis (rinse mouth after use).\n   - Hoarseness.\n   - Systemic effects (rare at low doses): adrenal suppression, osteoporosis.\n\n2. **Long-acting beta-agonists (LABA):**\n   - Tremors, palpitations, tachycardia.\n   - Paradoxical bronchospasm (rare).\n\n3. **Short-acting beta-agonists (SABA):**\n   - Tremors, palpitations, hypokalemia (with high doses).\n   - Tachycardia.\n\n4. **Leukotriene receptor antagonists (e.g., montelukast):**\n   - Headache, GI upset.\n   - Rare: neuropsychiatric effects (agitation, depression).\n\n**Patient education:** Emphasize the importance of **daily controller therapy** (even when asymptomatic) and **proper inhaler technique** to prevent exacerbations."
            },
            {
              "stem": "Catherine, a 50-year-old cook, presents with a 6-month history of cough, severe dyspnea, and copious sputum production. On examination, she has cyanosis, tachypnea, digital clubbing, and uses accessory muscles to breathe. She sells githeri and uji to construction workers.\n\n(a) What is Catherine likely suffering from? (2 marks)\n(b) What investigations would you request for Catherine? (5 marks)\n(c) What classes of medication would you recommend for Catherine? (8 marks)\n(d) What non-pharmacological interventions would you recommend for the patient? (5 marks)",
              "modelAnswer": "**(a) Likely condition:**\nCatherine is likely suffering from **chronic obstructive pulmonary disease (COPD)**, characterized by chronic bronchitis (cough, sputum production) and emphysema (dyspnea, cyanosis, accessory muscle use, digital clubbing). Her occupational exposure to biomass fuel smoke (cooking with githeri/uji) is a significant risk factor.\n\n**(b) Investigations:**\n1. **Spirometry**: FEV1/FVC <0.70 (post-bronchodilator) to confirm airflow limitation.\n2. **Chest X-ray**: Hyperinflation, flattened diaphragm, bullae (emphysema), or increased bronchovascular markings (chronic bronchitis).\n3. **Arterial blood gas (ABG)**: Assess for hypoxemia (PaO2 <60 mmHg) and hypercapnia (PaCO2 >45 mmHg).\n4. **Complete blood count (CBC)**: Polycythemia (elevated Hb/Hct) due to chronic hypoxia.\n5. **Alpha-1 antitrypsin levels**: If <40 years old or strong family history (to rule out deficiency-related COPD).\n6. **Sputum culture**: Identify bacterial pathogens if exacerbation.\n7. **Echocardiography**: Assess for cor pulmonale (right ventricular hypertrophy/failure).\n\n**(c) Classes of medication recommended:**\n1. **Bronchodilators (long-acting):**\n   - **Long-acting muscarinic antagonist (LAMA)**: E.g., **tiotropium** (first-line for COPD).\n   - **Long-acting beta-agonist (LABA)**: E.g., **formoterol** or **salmeterol** (used alone or in combination with LAMA).\n   - **Phosphodiesterase-4 inhibitor**: E.g., **roflumilast** (for severe COPD with chronic bronchitis and frequent exacerbations).\n\n2. **Inhaled corticosteroids (ICS):**\n   - **Budesonide** or **fluticasone** (only if frequent exacerbations or asthma-COPD overlap).\n\n3. **Combination therapies:**\n   - **LAMA/LABA**: E.g., **tiotropium/olodaterol** (for better bronchodilation).\n   - **ICS/LABA**: E.g., **fluticasone/salmeterol** (if asthma-COPD overlap).\n\n4. **Mucolytics:**\n   - **N-acetylcysteine** (to reduce sputum viscosity).\n\n5. **Oxygen therapy (if indicated):**\n   - **Long-term oxygen therapy (LTOT)**: If PaO2 <55 mmHg or <60 mmHg with cor pulmonale/polycythemia (target SpO2 88-92%).\n\n6. **Exacerbation management:**\n   - **Short-acting beta-agonists (SABA)**: E.g., **salbutamol** (for acute relief).\n   - **Short-acting muscarinic antagonist (SAMA)**: E.g., **ipratropium** (for acute exacerbations).\n   - **Systemic corticosteroids**: E.g., **prednisolone 30 mg/day for 5-7 days** (for exacerbations).\n   - **Antibiotics**: E.g., **amoxicillin/clavulanic acid** or **doxycycline** (if purulent sputum or signs of infection).\n\n**(d) Non-pharmacological interventions:**\n1. **Smoking cessation**: Critical to slow disease progression (refer to cessation programs).\n2. **Pulmonary rehabilitation**: Improves exercise capacity, symptoms, and quality of life.\n3. **Vaccinations**: Annual **influenza vaccine** and **pneumococcal vaccine** (PPSV23).\n4. **Nutritional support**: High-protein diet to combat cachexia; avoid excessive carbohydrates (can increase CO2 production).\n5. **Avoidance of triggers**: Biomass smoke, occupational dust/chemicals, air pollution.\n6. **Breathing exercises**: Pursed-lip breathing to improve oxygenation and reduce dyspnea.\n7. **Psychosocial support**: Address anxiety/depression (common in COPD)."
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Respiratory & Renal",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 65-year-old male with a 20-pack-year smoking history presents with chronic productive cough, dyspnea on exertion, and FEV1/FVC ratio of 0.65 on spirometry. Which of the following is the most likely diagnosis?",
              "options": [
                "Asthma",
                "Chronic bronchitis",
                "Idiopathic pulmonary fibrosis",
                "Pulmonary embolism"
              ],
              "answer": "Chronic bronchitis",
              "explanation": "FEV1/FVC <0.70 with chronic productive cough and smoking history is diagnostic of COPD (chronic bronchitis phenotype)."
            },
            {
              "stem": "Which of the following is the primary mechanism of action of inhaled corticosteroids in the management of asthma?",
              "options": [
                "Bronchodilation via beta-2 receptor agonism",
                "Mast cell stabilization and reduction of airway hyperresponsiveness",
                "Inhibition of leukotriene synthesis",
                "Suppression of eosinophilic inflammation and cytokine production"
              ],
              "answer": "Suppression of eosinophilic inflammation and cytokine production",
              "explanation": "Inhaled corticosteroids reduce airway inflammation by suppressing cytokine production and eosinophilic infiltration."
            },
            {
              "stem": "A patient with COPD is started on tiotropium bromide. Which of the following adverse effects is most commonly associated with this medication?",
              "options": [
                "Tachycardia",
                "Urinary retention",
                "Hypokalemia",
                "Oral candidiasis"
              ],
              "answer": "Urinary retention",
              "explanation": "Tiotropium is a long-acting muscarinic antagonist (LAMA) with anticholinergic effects, including urinary retention."
            },
            {
              "stem": "Which of the following statements about theophylline is CORRECT?",
              "options": [
                "It is a first-line agent for acute asthma exacerbations due to its rapid onset of action.",
                "Therapeutic drug monitoring is required due to a narrow therapeutic index and potential toxicity.",
                "It has no significant drug interactions with commonly used antibiotics.",
                "It is safe to use in patients with active peptic ulcer disease."
              ],
              "answer": "Therapeutic drug monitoring is required due to a narrow therapeutic index and potential toxicity.",
              "explanation": "Theophylline has a narrow therapeutic window (10-20 mcg/mL) and requires TDM due to risk of toxicity (e.g., seizures, arrhythmias)."
            },
            {
              "stem": "A 32-year-old female with a history of asthma presents with worsening symptoms despite using her salbutamol inhaler 4 times daily. She reports nighttime awakenings 3 times weekly. According to GINA guidelines, what is the most appropriate next step in management?",
              "options": [
                "Add oral prednisolone 30mg daily for 5 days.",
                "Increase salbutamol to 6 puffs as needed.",
                "Add a low-dose inhaled corticosteroid/long-acting beta-agonist (ICS/LABA) combination.",
                "Switch to oral theophylline for better control."
              ],
              "answer": "Add a low-dose inhaled corticosteroid/long-acting beta-agonist (ICS/LABA) combination.",
              "explanation": "GINA Step 3 recommends low-dose ICS/LABA for patients with persistent symptoms despite SABA use."
            },
            {
              "stem": "Which of the following is a contraindication to the use of varenicline for smoking cessation?",
              "options": [
                "History of depression",
                "Severe renal impairment (CrCl <30 mL/min)",
                "Concurrent use of nicotine replacement therapy",
                "History of alcohol use disorder"
              ],
              "answer": "Severe renal impairment (CrCl <30 mL/min)",
              "explanation": "Varenicline is renally eliminated, and dose adjustment is required in severe renal impairment; it is contraindicated if CrCl <30 mL/min."
            },
            {
              "stem": "A 58-year-old male with CKD stage 4 (eGFR 25 mL/min/1.73m²) presents with hypertension and hyperkalemia. Which of the following antihypertensives is most likely to exacerbate hyperkalemia?",
              "options": [
                "Amlodipine",
                "Enalapril",
                "Hydrochlorothiazide",
                "Bisoprolol"
              ],
              "answer": "Enalapril",
              "explanation": "ACE inhibitors (e.g., enalapril) reduce aldosterone secretion, increasing hyperkalemia risk in CKD."
            },
            {
              "stem": "Which of the following is the primary pathophysiological feature distinguishing asthma from COPD?",
              "options": [
                "Airway hyperresponsiveness",
                "Airway remodeling",
                "Chronic inflammation",
                "Destruction of lung parenchyma"
              ],
              "answer": "Airway hyperresponsiveness",
              "explanation": "Asthma is characterized by reversible airway hyperresponsiveness, whereas COPD involves irreversible airflow limitation."
            },
            {
              "stem": "A patient with COPD is prescribed roflumilast. Which of the following is the primary indication for this medication?",
              "options": [
                "Acute exacerbation of COPD",
                "Maintenance treatment to reduce exacerbations in patients with severe COPD and chronic bronchitis",
                "First-line therapy for mild COPD",
                "Adjunct to inhaled corticosteroids for asthma"
              ],
              "answer": "Maintenance treatment to reduce exacerbations in patients with severe COPD and chronic bronchitis",
              "explanation": "Roflumilast is a PDE-4 inhibitor used to reduce exacerbations in severe COPD with chronic bronchitis and a history of exacerbations."
            },
            {
              "stem": "Which of the following is the most appropriate initial treatment for a patient presenting with acute pulmonary edema due to acute decompensated heart failure?",
              "options": [
                "Intravenous furosemide",
                "Intravenous digoxin",
                "Oral carvedilol",
                "Subcutaneous enoxaparin"
              ],
              "answer": "Intravenous furosemide",
              "explanation": "Loop diuretics (e.g., furosemide) are first-line for acute pulmonary edema to reduce fluid overload."
            },
            {
              "stem": "A 45-year-old female with a history of asthma is started on fluticasone/salmeterol. Which of the following adverse effects is most likely to occur with long-term use?",
              "options": [
                "Osteoporosis",
                "Tachycardia",
                "Hypokalemia",
                "Hyperglycemia"
              ],
              "answer": "Osteoporosis",
              "explanation": "Long-term systemic or high-dose inhaled corticosteroids increase osteoporosis risk due to bone mineral density reduction."
            },
            {
              "stem": "Which of the following is the primary mechanism of action of ipratropium bromide in COPD?",
              "options": [
                "Stimulation of beta-2 receptors",
                "Inhibition of muscarinic receptors",
                "Inhibition of leukotriene receptors",
                "Stabilization of mast cells"
              ],
              "answer": "Inhibition of muscarinic receptors",
              "explanation": "Ipratropium is a short-acting muscarinic antagonist (SAMA) that blocks M3 receptors, reducing bronchoconstriction."
            },
            {
              "stem": "A patient with CKD stage 3 (eGFR 45 mL/min/1.73m²) is prescribed amoxicillin for a respiratory infection. Which of the following is the most appropriate monitoring parameter?",
              "options": [
                "Serum potassium levels",
                "Serum creatinine and eGFR",
                "Liver function tests",
                "Complete blood count"
              ],
              "answer": "Serum creatinine and eGFR",
              "explanation": "Amoxicillin is renally eliminated; monitoring renal function is essential in CKD to avoid accumulation and toxicity."
            },
            {
              "stem": "Which of the following is the most appropriate inhaler technique for a patient using a metered-dose inhaler (MDI) without a spacer?",
              "options": [
                "Inhale rapidly and hold breath for 10 seconds",
                "Inhale slowly and hold breath for 5-10 seconds",
                "Exhale forcefully before inhalation",
                "Use a quick, deep inhalation followed by immediate exhalation"
              ],
              "answer": "Inhale slowly and hold breath for 5-10 seconds",
              "explanation": "Slow inhalation (3-5 seconds) and holding breath for 5-10 seconds improves drug deposition in the lungs."
            },
            {
              "stem": "A 60-year-old male with COPD and cor pulmonale presents with worsening dyspnea and peripheral edema. Which of the following is the most appropriate diuretic to use?",
              "options": [
                "Spironolactone",
                "Hydrochlorothiazide",
                "Furosemide",
                "Amiloride"
              ],
              "answer": "Furosemide",
              "explanation": "Loop diuretics (e.g., furosemide) are preferred for edema in cor pulmonale due to their potent diuretic effect."
            },
            {
              "stem": "Which of the following is the primary goal of smoking cessation pharmacotherapy?",
              "options": [
                "Complete elimination of nicotine cravings",
                "Reduction of nicotine withdrawal symptoms",
                "Prevention of weight gain",
                "Achievement of long-term abstinence from smoking"
              ],
              "answer": "Achievement of long-term abstinence from smoking",
              "explanation": "The primary goal of smoking cessation therapy is long-term abstinence, with pharmacotherapy reducing withdrawal symptoms."
            },
            {
              "stem": "A patient with asthma is prescribed montelukast. Which of the following is the primary mechanism of action of this medication?",
              "options": [
                "Inhibition of leukotriene receptors",
                "Stabilization of mast cells",
                "Bronchodilation via beta-2 agonism",
                "Suppression of eosinophilic inflammation"
              ],
              "answer": "Inhibition of leukotriene receptors",
              "explanation": "Montelukast is a leukotriene receptor antagonist (LTRA) that blocks leukotriene-mediated bronchoconstriction."
            },
            {
              "stem": "Which of the following is the most appropriate initial treatment for a patient with acute exacerbation of COPD (AECOPD) with purulent sputum?",
              "options": [
                "Oral prednisolone 30mg daily for 5 days",
                "Intravenous vancomycin",
                "Oral amoxicillin-clavulanic acid",
                "Inhaled ipratropium bromide"
              ],
              "answer": "Oral amoxicillin-clavulanic acid",
              "explanation": "AECOPD with purulent sputum suggests bacterial infection; antibiotics (e.g., amoxicillin-clavulanic acid) are indicated."
            },
            {
              "stem": "A 50-year-old female with CKD stage 5 (eGFR <15 mL/min/1.73m²) is prescribed digoxin for atrial fibrillation. Which of the following is the most appropriate monitoring parameter?",
              "options": [
                "Serum potassium levels",
                "Serum digoxin levels",
                "Liver function tests",
                "Serum magnesium levels"
              ],
              "answer": "Serum digoxin levels",
              "explanation": "Digoxin has a narrow therapeutic index; serum levels should be monitored, especially in CKD, to avoid toxicity."
            },
            {
              "stem": "Which of the following is the primary adverse effect of systemic corticosteroids in asthma management?",
              "options": [
                "Hyperkalemia",
                "Osteoporosis",
                "Hypotension",
                "Bradycardia"
              ],
              "answer": "Osteoporosis",
              "explanation": "Long-term systemic corticosteroids increase osteoporosis risk due to reduced bone mineral density."
            },
            {
              "stem": "A patient with COPD is prescribed a long-acting beta-agonist (LABA). Which of the following is the primary mechanism of action?",
              "options": [
                "Inhibition of muscarinic receptors",
                "Stimulation of beta-2 receptors",
                "Inhibition of leukotriene synthesis",
                "Stabilization of mast cells"
              ],
              "answer": "Stimulation of beta-2 receptors",
              "explanation": "LABA (e.g., salmeterol, formoterol) stimulate beta-2 receptors, causing bronchodilation."
            },
            {
              "stem": "Which of the following is the most appropriate first-line treatment for a patient with mild intermittent asthma?",
              "options": [
                "Low-dose inhaled corticosteroid",
                "Short-acting beta-agonist (SABA) as needed",
                "Long-acting beta-agonist (LABA)",
                "Oral theophylline"
              ],
              "answer": "Short-acting beta-agonist (SABA) as needed",
              "explanation": "GINA Step 1 recommends SABA as needed for mild intermittent asthma."
            },
            {
              "stem": "A 70-year-old male with CKD stage 4 (eGFR 25 mL/min/1.73m²) presents with hypertension and edema. Which of the following diuretics is contraindicated?",
              "options": [
                "Furosemide",
                "Hydrochlorothiazide",
                "Spironolactone",
                "Amiloride"
              ],
              "answer": "Hydrochlorothiazide",
              "explanation": "Thiazide diuretics (e.g., hydrochlorothiazide) are ineffective in CKD stage 4 (eGFR <30 mL/min/1.73m²) and may worsen renal function."
            },
            {
              "stem": "Which of the following is the primary risk factor for the development of chronic kidney disease (CKD)?",
              "options": [
                "Hypertension",
                "Obesity",
                "Hyperlipidemia",
                "Family history of asthma"
              ],
              "answer": "Hypertension",
              "explanation": "Hypertension is a leading risk factor for CKD due to glomerular damage and reduced renal perfusion."
            },
            {
              "stem": "A patient with asthma is prescribed a combination inhaler containing fluticasone and salmeterol. Which of the following is the primary advantage of this combination?",
              "options": [
                "Reduction of systemic corticosteroid use",
                "Increased risk of osteoporosis",
                "Decreased bronchodilatory effect",
                "Higher incidence of oral candidiasis"
              ],
              "answer": "Reduction of systemic corticosteroid use",
              "explanation": "ICS/LABA combinations reduce the need for systemic corticosteroids by providing better asthma control."
            },
            {
              "stem": "Which of the following is the most appropriate treatment for a patient with acute exacerbation of asthma unresponsive to SABA?",
              "options": [
                "Oral prednisolone",
                "Intravenous magnesium sulfate",
                "Inhaled ipratropium bromide",
                "Oral theophylline"
              ],
              "answer": "Intravenous magnesium sulfate",
              "explanation": "IV magnesium sulfate is used as adjunctive therapy in severe acute asthma unresponsive to bronchodilators."
            },
            {
              "stem": "A 65-year-old male with COPD presents with FEV1 45% predicted and frequent exacerbations. According to GOLD guidelines, what is the most appropriate treatment?",
              "options": [
                "Long-acting beta-agonist (LABA) monotherapy",
                "Long-acting muscarinic antagonist (LAMA) monotherapy",
                "ICS/LABA combination",
                "Roflumilast monotherapy"
              ],
              "answer": "ICS/LABA combination",
              "explanation": "GOLD Group D (high risk, frequent exacerbations) recommends LAMA + LABA/ICS or LABA/ICS combination."
            },
            {
              "stem": "Which of the following is the primary mechanism of action of bupropion in smoking cessation?",
              "options": [
                "Nicotinic receptor agonism",
                "Dopamine and norepinephrine reuptake inhibition",
                "GABA receptor agonism",
                "Leukotriene receptor antagonism"
              ],
              "answer": "Dopamine and norepinephrine reuptake inhibition",
              "explanation": "Bupropion is a norepinephrine-dopamine reuptake inhibitor (NDRI) that reduces nicotine cravings and withdrawal symptoms."
            },
            {
              "stem": "A patient with CKD stage 3 (eGFR 45 mL/min/1.73m²) is prescribed vancomycin for MRSA bacteremia. Which of the following is the most appropriate monitoring parameter?",
              "options": [
                "Serum potassium levels",
                "Serum vancomycin trough levels",
                "Liver function tests",
                "Complete blood count"
              ],
              "answer": "Serum vancomycin trough levels",
              "explanation": "Vancomycin requires therapeutic drug monitoring (trough levels) to ensure efficacy and avoid nephrotoxicity, especially in CKD."
            },
            {
              "stem": "Which of the following is the primary adverse effect of inhaled corticosteroids in asthma management?",
              "options": [
                "Tachycardia",
                "Oral candidiasis",
                "Hypokalemia",
                "Bradycardia"
              ],
              "answer": "Oral candidiasis",
              "explanation": "Inhaled corticosteroids increase the risk of oral candidiasis (thrush) due to local immunosuppression in the oropharynx."
            },
            {
              "stem": "A 55-year-old female with COPD presents with FEV1 55% predicted and no exacerbations in the past year. According to GOLD guidelines, what is the most appropriate treatment?",
              "options": [
                "Long-acting beta-agonist (LABA) monotherapy",
                "Long-acting muscarinic antagonist (LAMA) monotherapy",
                "Short-acting beta-agonist (SABA) as needed",
                "Oral theophylline"
              ],
              "answer": "Long-acting muscarinic antagonist (LAMA) monotherapy",
              "explanation": "GOLD Group B (low risk, symptomatic) recommends LAMA or LABA monotherapy as first-line treatment."
            },
            {
              "stem": "Which of the following is the primary goal of pulmonary rehabilitation in COPD?",
              "options": [
                "Cure of the underlying disease",
                "Improvement in exercise capacity and quality of life",
                "Reduction of FEV1 decline",
                "Elimination of the need for oxygen therapy"
              ],
              "answer": "Improvement in exercise capacity and quality of life",
              "explanation": "Pulmonary rehabilitation aims to improve exercise tolerance, symptoms, and quality of life in COPD patients."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "Discuss the role of spirometry in the diagnosis and monitoring of asthma. Include key parameters and their clinical significance.",
              "modelAnswer": "Spirometry is essential for diagnosing and monitoring asthma. Key parameters include:\n1. **FEV1 (Forced Expiratory Volume in 1 second)**: Reduced in asthma due to airway obstruction; improvement post-bronchodilator (>12% and >200 mL) confirms reversibility.\n2. **FVC (Forced Vital Capacity)**: May be normal or reduced in severe obstruction.\n3. **FEV1/FVC ratio**: Reduced (<0.70) in obstructive diseases like asthma.\n4. **Peak Expiratory Flow (PEF)**: Used for daily monitoring; variability >20% suggests poor control.\nMonitoring: Spirometry every 1-2 years in stable asthma; more frequently during exacerbations or poor control."
            },
            {
              "stem": "Outline the steps for the correct use of a dry powder inhaler (DPI) in a patient with COPD.",
              "modelAnswer": "Steps for correct DPI use:\n1. **Prepare the inhaler**: Load the dose (if required) and ensure the device is upright.\n2. **Exhale fully**: Empty lungs completely before inhalation.\n3. **Seal lips around the mouthpiece**: Ensure a tight seal to prevent medication loss.\n4. **Inhale forcefully and deeply**: Rapid, deep inhalation (1-2 seconds) to disperse the powder.\n5. **Hold breath**: Hold for 5-10 seconds to allow drug deposition in the lungs.\n6. **Exhale slowly**: Breathe out gently through the nose or pursed lips.\n7. **Rinse mouth** (if using corticosteroids): Prevents oral candidiasis.\n8. **Close and store**: Replace the cap and store in a dry place."
            },
            {
              "stem": "List the complications of chronic kidney disease (CKD) and briefly describe their pathophysiology.",
              "modelAnswer": "Complications of CKD:\n1. **Cardiovascular disease**: Hypertension, heart failure, and atherosclerosis due to volume overload, anemia, and dyslipidemia.\n2. **Electrolyte imbalances**: Hyperkalemia (reduced excretion), metabolic acidosis (reduced H+ excretion), and hypocalcemia (reduced vitamin D activation).\n3. **Anemia**: Erythropoietin deficiency leading to reduced red blood cell production.\n4. **Bone disease (CKD-MBD)**: Secondary hyperparathyroidism, osteitis fibrosa, and osteomalacia due to phosphate retention and vitamin D deficiency.\n5. **Uremia**: Accumulation of uremic toxins causing nausea, pruritus, and encephalopathy.\n6. **Fluid overload**: Edema, pulmonary edema, and hypertension due to reduced sodium and water excretion."
            },
            {
              "stem": "Describe the monitoring parameters required for a patient with asthma on inhaled corticosteroids (ICS).",
              "modelAnswer": "Monitoring parameters for ICS in asthma:\n1. **Symptom control**: Frequency of SABA use, nighttime awakenings, and exacerbations.\n2. **Lung function**: FEV1, PEF, and FEV1/FVC ratio (improvement indicates good control).\n3. **Adverse effects**: Oral candidiasis (thrush), hoarseness, and systemic effects (e.g., osteoporosis with long-term high-dose use).\n4. **Adherence**: Ensure correct inhaler technique and consistent use.\n5. **Growth in children**: Monitor for potential systemic effects (e.g., growth suppression).\n6. **Comorbidities**: Assess for conditions that may worsen asthma (e.g., GERD, allergic rhinitis)."
            },
            {
              "stem": "Discuss the role of smoking cessation pharmacotherapy. Include the mechanisms of action, efficacy, and adverse effects of nicotine replacement therapy (NRT).",
              "modelAnswer": "Role of smoking cessation pharmacotherapy:\n1. **Nicotine replacement therapy (NRT)**: Provides controlled nicotine doses to reduce withdrawal symptoms. Forms include patches, gum, lozenges, and inhalers.\n   - **Mechanism**: Binds nicotinic acetylcholine receptors, reducing cravings and withdrawal.\n   - **Efficacy**: Doubles quit rates compared to placebo.\n   - **Adverse effects**: Local irritation (gum/lozenges), skin reactions (patches), nausea, and insomnia.\n2. **Varenicline**: Partial nicotinic receptor agonist; reduces cravings and withdrawal.\n   - **Adverse effects**: Nausea, vivid dreams, and rare neuropsychiatric effects.\n3. **Bupropion**: NDRI; reduces cravings and withdrawal by modulating dopamine/norepinephrine.\n   - **Adverse effects**: Insomnia, dry mouth, and rare seizures.\nMonitoring: Assess adherence, adverse effects, and smoking status regularly."
            },
            {
              "stem": "Outline the clinical presentation and management of acute respiratory distress syndrome (ARDS).",
              "modelAnswer": "Clinical presentation of ARDS:\n- **Symptoms**: Severe dyspnea, tachypnea, cyanosis, and refractory hypoxemia.\n- **Signs**: Bilateral lung infiltrates on chest X-ray, reduced lung compliance, and severe hypoxia (PaO2/FiO2 <300 mmHg).\nManagement:\n1. **Supportive care**: Oxygen therapy (high-flow nasal cannula or mechanical ventilation with low tidal volumes).\n2. **Fluid management**: Conservative fluid strategy to avoid pulmonary edema.\n3. **Pharmacotherapy**: Limited role; may include corticosteroids in late-phase ARDS or neuromuscular blockers for severe cases.\n4. **Prone positioning**: Improves oxygenation in severe ARDS.\n5. **Treat underlying cause**: E.g., sepsis, pneumonia, or trauma."
            },
            {
              "stem": "Describe the pathophysiology of chronic obstructive pulmonary disease (COPD) and its key differences from asthma.",
              "modelAnswer": "Pathophysiology of COPD:\n- **Chronic inflammation**: Neutrophils, macrophages, and CD8+ T-cells release proteases (e.g., elastase) and inflammatory mediators.\n- **Airway remodeling**: Fibrosis, mucus gland hypertrophy, and loss of elastic recoil.\n- **Parenchymal destruction**: Emphysema with destruction of alveoli and pulmonary vasculature.\n- **Airflow limitation**: Irreversible due to structural changes.\nKey differences from asthma:\n1. **Reversibility**: Asthma is reversible; COPD is irreversible.\n2. **Inflammation**: Asthma involves eosinophils and mast cells; COPD involves neutrophils and macrophages.\n3. **Triggers**: Asthma is triggered by allergens or exercise; COPD is triggered by smoking or pollutants.\n4. **Age**: Asthma often starts in childhood; COPD typically presents in adults >40 years."
            },
            {
              "stem": "Discuss the role of theophylline in asthma and COPD management. Include its mechanism of action, therapeutic drug monitoring (TDM), and adverse effects.",
              "modelAnswer": "Role of theophylline:\n1. **Mechanism**: Non-selective phosphodiesterase inhibitor; increases cAMP, causing bronchodilation and mild anti-inflammatory effects.\n2. **Use**: Limited to severe asthma/COPD unresponsive to other therapies due to narrow therapeutic index.\n3. **TDM**: Required due to variable pharmacokinetics (therapeutic range: 10-20 mcg/mL). Monitor trough levels 3-5 days after initiation or dose change.\n4. **Adverse effects**: Nausea, vomiting, headache, insomnia, arrhythmias, seizures (at toxic levels >20 mcg/mL).\n5. **Drug interactions**: Metabolized by CYP1A2; levels increased by ciprofloxacin, macrolides, and decreased by smoking.\n6. **Contraindications**: Peptic ulcer disease, epilepsy, and arrhythmias."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Mr. Kamau, a 58-year-old male farmer, presents to the clinic with a 6-month history of progressive dyspnea, chronic productive cough, and fatigue. He reports a 30-pack-year smoking history and has been treated for recurrent chest infections over the past year. On examination, he appears cyanotic, has a barrel-shaped chest, and uses accessory muscles to breathe. Spirometry reveals FEV1 45% predicted, FEV1/FVC ratio 0.55, and no significant reversibility post-bronchodilator. \n\n(a) What is the most likely diagnosis? Justify your answer. (3 marks)\n(b) Outline the pharmacological management of Mr. Kamau’s condition according to GOLD guidelines. Include drug classes, examples, and rationale. (8 marks)\n(c) What non-pharmacological interventions would you recommend for Mr. Kamau? (4 marks)",
              "modelAnswer": "**(a) Diagnosis**: Chronic Obstructive Pulmonary Disease (COPD), predominantly emphysema phenotype.\n**Justification**: \n- Progressive dyspnea and chronic productive cough with smoking history.\n- Spirometry shows FEV1/FVC <0.70 and FEV1 45% predicted (GOLD Stage 3: severe airflow limitation).\n- No reversibility post-bronchodilator excludes asthma.\n- Cyanosis and barrel chest suggest emphysema (destruction of lung parenchyma).\n\n**(b) Pharmacological management (GOLD Guidelines)**:\n1. **Bronchodilators**:\n   - **Long-acting muscarinic antagonist (LAMA)**: Tiotropium bromide (once daily) to reduce exacerbations and improve symptoms.\n   - **Long-acting beta-agonist (LABA)**: Indacaterol or olodaterol (once daily) for bronchodilation and symptom relief.\n   - **Rationale**: LAMA/LABA combinations improve lung function, reduce dyspnea, and lower exacerbation risk.\n2. **Inhaled corticosteroids (ICS)**:\n   - **Fluticasone furoate/vilanterol (ICS/LABA)**: If frequent exacerbations (e.g., ≥2/year) or asthma-COPD overlap.\n   - **Rationale**: ICS reduces inflammation and exacerbations in patients with frequent exacerbations.\n3. **Phosphodiesterase-4 inhibitor**:\n   - **Roflumilast**: If chronic bronchitis phenotype and ≥1 exacerbation/year despite LAMA/LABA.\n   - **Rationale**: Reduces exacerbations by anti-inflammatory effects.\n4. **Short-acting bronchodilators**:\n   - **Salbutamol or ipratropium**: As needed for acute symptom relief.\n5. **Oxygen therapy**:\n   - **Long-term oxygen therapy (LTOT)**: If PaO2 <55 mmHg or <60 mmHg with cor pulmonale/polycythemia.\n\n**(c) Non-pharmacological interventions**:\n1. **Smoking cessation**: Critical to slow disease progression; offer NRT, varenicline, or bupropion.\n2. **Pulmonary rehabilitation**: Improves exercise capacity, symptoms, and quality of life.\n3. **Vaccinations**: Annual influenza and pneumococcal vaccines to reduce infection risk.\n4. **Nutritional support**: High-protein diet to address cachexia and muscle wasting.\n5. **Avoidance of triggers**: Reduce exposure to dust, smoke, and air pollution."
            },
            {
              "stem": "Mrs. Wanjiku, a 62-year-old female with type 2 diabetes and hypertension, presents to the clinic with a 2-week history of fatigue, ankle swelling, and reduced urine output. She reports no recent infections or changes in medication. On examination, her blood pressure is 160/95 mmHg, heart rate 90 bpm, and she has bilateral pitting edema. Laboratory investigations reveal:\n- Serum creatinine: 3.2 mg/dL (baseline 1.2 mg/dL 6 months ago)\n- eGFR: 25 mL/min/1.73m² (CKD Stage 4)\n- Serum potassium: 5.8 mEq/L\n- Urine albumin-to-creatinine ratio (UACR): 800 mg/g\n- Hemoglobin: 10.5 g/dL\n\n(a) What is the most likely diagnosis? Justify your answer. (3 marks)\n(b) Outline the pharmacological management of Mrs. Wanjiku’s condition. Include drug classes, examples, and rationale. (8 marks)\n(c) What monitoring parameters would you recommend for Mrs. Wanjiku? (4 marks)",
              "modelAnswer": "**(a) Diagnosis**: Acute-on-chronic kidney disease (AKI superimposed on CKD Stage 4) with hyperkalemia and volume overload.\n**Justification**:\n- Rapid rise in serum creatinine (from 1.2 to 3.2 mg/dL) over 2 weeks suggests AKI.\n- CKD Stage 4 (eGFR 25 mL/min/1.73m²) with UACR 800 mg/g indicates diabetic nephropathy as the underlying cause.\n- Hyperkalemia (5.8 mEq/L) and volume overload (edema, hypertension) are complications of CKD and AKI.\n\n**(b) Pharmacological management**:\n1. **Volume overload**:\n   - **Loop diuretic**: Furosemide 40-80 mg IV or oral, titrated to urine output and edema.\n   - **Rationale**: Furosemide reduces fluid overload by increasing sodium excretion in the loop of Henle.\n2. **Hyperkalemia**:\n   - **Potassium binders**: Sodium polystyrene sulfonate (SPS) or patiromer (if SPS unavailable).\n   - **Rationale**: Binds potassium in the GI tract, reducing serum levels.\n   - **Alternative**: Insulin/dextrose infusion or salbutamol nebulization for acute management.\n3. **Hypertension**:\n   - **ACE inhibitor/ARB**: Enalapril 5 mg daily or losartan 50 mg daily (if tolerated).\n   - **Rationale**: Reduces intraglomerular pressure and slows CKD progression; monitor for hyperkalemia.\n   - **Avoid**: Thiazide diuretics (ineffective in CKD Stage 4) and potassium-sparing diuretics (e.g., spironolactone).\n4. **Anemia**:\n   - **Erythropoiesis-stimulating agents (ESA)**: Darbepoetin alfa or epoetin alfa if Hb <10 g/dL and symptomatic.\n   - **Rationale**: Corrects anemia of CKD by stimulating red blood cell production.\n   - **Iron supplementation**: IV iron sucrose if ferritin <100 ng/mL or TSAT <20%.\n5. **Diabetes management**:\n   - **Insulin**: Adjust dose based on renal function; consider short-acting insulin for better control.\n   - **Avoid**: Metformin (contraindicated in eGFR <30 mL/min/1.73m²) and sulfonylureas (e.g., glibenclamide).\n\n**(c) Monitoring parameters**:\n1. **Renal function**: Serum creatinine and eGFR weekly until stable.\n2. **Electrolytes**: Serum potassium, sodium, bicarbonate, and calcium every 2-4 days.\n3. **Volume status**: Daily weight, urine output, and signs of edema/lung congestion.\n4. **Blood pressure**: Target <130/80 mmHg; adjust antihypertensives as needed.\n5. **Hemoglobin and iron studies**: Monitor Hb, ferritin, and TSAT every 4 weeks if on ESA/iron.\n6. **Adverse effects**: Monitor for diuretic-induced hypokalemia, ACE inhibitor-induced hyperkalemia, or ESA-related hypertension."
            }
          ]
        }
      ]
    },
    "3": {
      "title": "Respiratory & Renal",
      "variant": 3,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 65-year-old male with a 20-pack-year smoking history presents with progressive dyspnea, chronic cough, and sputum production. Spirometry reveals an FEV1/FVC ratio of 0.65 and an FEV1 of 45% predicted. Which of the following is the most likely diagnosis?",
              "options": [
                "Asthma",
                "Chronic obstructive pulmonary disease (COPD)",
                "Idiopathic pulmonary fibrosis",
                "Bronchiectasis"
              ],
              "answer": "Chronic obstructive pulmonary disease (COPD)",
              "explanation": "COPD is characterized by persistent airflow limitation due to chronic bronchitis and/or emphysema, with spirometry showing FEV1/FVC <0.70 and reduced FEV1."
            },
            {
              "stem": "A 30-year-old female with a history of allergic rhinitis presents with episodic wheezing, chest tightness, and cough that worsens at night. She reports symptom relief with albuterol use. Which of the following is the most appropriate next step in management?",
              "options": [
                "Initiate oral prednisone 40 mg daily for 5 days",
                "Start inhaled fluticasone 250 mcg twice daily",
                "Prescribe oral theophylline 200 mg twice daily",
                "Recommend daily use of inhaled cromolyn sodium"
              ],
              "answer": "Start inhaled fluticasone 250 mcg twice daily",
              "explanation": "Inhaled corticosteroids are the cornerstone of long-term control therapy for persistent asthma, reducing airway inflammation and preventing exacerbations."
            },
            {
              "stem": "A 55-year-old male with stage 3 chronic kidney disease (CKD) is prescribed metformin for type 2 diabetes. Which of the following is the most appropriate action regarding metformin therapy?",
              "options": [
                "Continue metformin at the current dose",
                "Reduce metformin dose by 50%",
                "Discontinue metformin due to risk of lactic acidosis",
                "Switch to insulin therapy immediately"
              ],
              "answer": "Reduce metformin dose by 50%",
              "explanation": "Metformin should be dose-reduced in stage 3 CKD (eGFR 30-59 mL/min/1.73m²) due to increased risk of lactic acidosis; dose reduction is preferred over discontinuation unless eGFR <30."
            },
            {
              "stem": "A 40-year-old male with COPD (FEV1 55% predicted) reports persistent dyspnea despite using a short-acting beta-agonist (SABA) as needed. Which of the following is the most appropriate add-on therapy?",
              "options": [
                "Oral theophylline",
                "Inhaled long-acting muscarinic antagonist (LAMA)",
                "Oral prednisone",
                "Inhaled mast cell stabilizer"
              ],
              "answer": "Inhaled long-acting muscarinic antagonist (LAMA)",
              "explanation": "LAMAs (e.g., tiotropium) are recommended as add-on therapy in COPD patients with persistent dyspnea despite SABA use, improving lung function and reducing exacerbations."
            },
            {
              "stem": "A 28-year-old female with asthma uses a metered-dose inhaler (MDI) with a spacer. She reports poor technique and frequent missed doses. Which of the following is the most likely consequence of improper MDI use?",
              "options": [
                "Increased systemic absorption of corticosteroids",
                "Reduced deposition of medication in the lungs",
                "Higher risk of oral candidiasis",
                "Accelerated drug degradation in the inhaler"
              ],
              "answer": "Reduced deposition of medication in the lungs",
              "explanation": "Improper MDI technique (e.g., not using a spacer or inhaling too quickly) reduces medication deposition in the lungs, leading to suboptimal asthma control."
            },
            {
              "stem": "A 60-year-old male with COPD and cor pulmonale is prescribed furosemide for peripheral edema. Which of the following electrolytes should be monitored most closely?",
              "options": [
                "Sodium",
                "Potassium",
                "Calcium",
                "Magnesium"
              ],
              "answer": "Potassium",
              "explanation": "Loop diuretics like furosemide increase urinary potassium excretion, increasing the risk of hypokalemia, which can exacerbate cardiac arrhythmias in patients with cor pulmonale."
            },
            {
              "stem": "A 50-year-old male with a 30-pack-year smoking history presents with hemoptysis and weight loss. Chest X-ray shows a right upper lobe mass. Which of the following is the most likely underlying cause?",
              "options": [
                "Tuberculosis",
                "Lung cancer",
                "Pneumonia",
                "Pulmonary embolism"
              ],
              "answer": "Lung cancer",
              "explanation": "Hemoptysis, weight loss, and a lung mass on chest X-ray in a long-term smoker are highly suggestive of lung cancer, particularly non-small cell lung cancer."
            },
            {
              "stem": "A 35-year-old female with asthma is prescribed salmeterol/fluticasone 50/250 mcg twice daily. She reports using the inhaler daily but still experiences nocturnal symptoms twice weekly. Which of the following is the most appropriate next step?",
              "options": [
                "Increase salmeterol/fluticasone to 50/500 mcg twice daily",
                "Add oral montelukast 10 mg daily",
                "Switch to oral prednisone 10 mg daily",
                "Prescribe a short-acting beta-agonist (SABA) for rescue use"
              ],
              "answer": "Add oral montelukast 10 mg daily",
              "explanation": "Adding a leukotriene receptor antagonist (e.g., montelukast) is recommended for patients with persistent nocturnal symptoms despite inhaled corticosteroid/LABA therapy."
            },
            {
              "stem": "A 70-year-old male with stage 4 CKD (eGFR 20 mL/min/1.73m²) is prescribed vancomycin for MRSA bacteremia. Which of the following is the most critical monitoring parameter?",
              "options": [
                "Serum vancomycin trough levels",
                "Serum potassium levels",
                "Serum magnesium levels",
                "Serum phosphate levels"
              ],
              "answer": "Serum vancomycin trough levels",
              "explanation": "Vancomycin requires therapeutic drug monitoring (trough levels) in CKD to avoid accumulation and nephrotoxicity, with target troughs of 15-20 mcg/mL for serious infections."
            },
            {
              "stem": "A 45-year-old male with COPD exacerbation is prescribed ipratropium bromide via nebulizer. Which of the following adverse effects is most commonly associated with ipratropium?",
              "options": [
                "Hyperkalemia",
                "Dry mouth",
                "Bradycardia",
                "Hypotension"
              ],
              "answer": "Dry mouth",
              "explanation": "Ipratropium is an anticholinergic agent; common adverse effects include dry mouth, bitter taste, and urinary retention due to muscarinic receptor blockade."
            },
            {
              "stem": "A 25-year-old female with mild intermittent asthma uses albuterol as needed. She reports using it 3-4 times weekly and awakens once monthly with symptoms. Which of the following is the most appropriate classification of her asthma?",
              "options": [
                "Mild persistent",
                "Moderate persistent",
                "Severe persistent",
                "Intermittent"
              ],
              "answer": "Mild persistent",
              "explanation": "Mild persistent asthma is defined by symptoms >2 days/week but not daily, nocturnal awakenings ≥2x/month, and albuterol use >2 days/week but not daily."
            },
            {
              "stem": "A 65-year-old male with COPD (FEV1 35% predicted) is prescribed theophylline for symptom control. Which of the following is the primary reason theophylline is no longer a first-line agent in COPD?",
              "options": [
                "High risk of hepatotoxicity",
                "Narrow therapeutic index requiring TDM",
                "Ineffective bronchodilation",
                "High cost"
              ],
              "answer": "Narrow therapeutic index requiring TDM",
              "explanation": "Theophylline has a narrow therapeutic index (target 5-15 mcg/mL), requiring therapeutic drug monitoring to avoid toxicity (e.g., seizures, arrhythmias)."
            },
            {
              "stem": "A 55-year-old female with stage 3 CKD (eGFR 45 mL/min/1.73m²) is prescribed amoxicillin/clavulanate for a urinary tract infection. Which of the following is the most appropriate adjustment?",
              "options": [
                "No adjustment needed",
                "Reduce dose by 25%",
                "Reduce dose by 50%",
                "Avoid use due to nephrotoxicity risk"
              ],
              "answer": "Reduce dose by 25%",
              "explanation": "Amoxicillin/clavulanate requires dose reduction in stage 3 CKD (eGFR 30-59 mL/min/1.73m²) to prevent accumulation and potential nephrotoxicity."
            },
            {
              "stem": "A 30-year-old male with asthma is prescribed beclomethasone dipropionate 200 mcg twice daily. Which of the following is the most important counseling point regarding inhaled corticosteroid use?",
              "options": [
                "Rinse mouth after use to prevent oral candidiasis",
                "Take with food to reduce GI upset",
                "Monitor blood glucose levels daily",
                "Avoid dairy products to prevent absorption issues"
              ],
              "answer": "Rinse mouth after use to prevent oral candidiasis",
              "explanation": "Inhaled corticosteroids increase the risk of oral candidiasis; rinsing the mouth after use reduces local immunosuppression and fungal overgrowth."
            },
            {
              "stem": "A 75-year-old male with COPD and cor pulmonale is prescribed spironolactone. Which of the following electrolytes should be monitored most closely?",
              "options": [
                "Sodium",
                "Potassium",
                "Calcium",
                "Magnesium"
              ],
              "answer": "Potassium",
              "explanation": "Spironolactone is a potassium-sparing diuretic; hyperkalemia is a significant risk, especially in patients with CKD or those taking ACE inhibitors/ARBs."
            },
            {
              "stem": "A 40-year-old female with a history of asthma presents with acute wheezing and dyspnea after exposure to cold air. She uses albuterol via MDI with minimal relief. Which of the following is the most appropriate next step?",
              "options": [
                "Administer oral prednisone 40 mg daily for 5 days",
                "Initiate inhaled ipratropium bromide",
                "Prescribe oral theophylline",
                "Recommend a leukotriene receptor antagonist"
              ],
              "answer": "Administer oral prednisone 40 mg daily for 5 days",
              "explanation": "Oral corticosteroids are indicated for acute asthma exacerbations unresponsive to SABA therapy, reducing airway inflammation and preventing relapse."
            },
            {
              "stem": "A 50-year-old male with stage 4 CKD (eGFR 25 mL/min/1.73m²) is prescribed digoxin for atrial fibrillation. Which of the following is the most critical monitoring parameter?",
              "options": [
                "Serum potassium levels",
                "Serum magnesium levels",
                "Serum digoxin levels",
                "Serum calcium levels"
              ],
              "answer": "Serum digoxin levels",
              "explanation": "Digoxin has a narrow therapeutic index and prolonged half-life in CKD; serum digoxin levels (target 0.5-2.0 ng/mL) must be monitored to avoid toxicity."
            },
            {
              "stem": "A 35-year-old male with COPD exacerbation is prescribed a combination of albuterol and ipratropium via nebulizer. Which of the following is the primary rationale for this combination?",
              "options": [
                "Synergistic bronchodilation via different mechanisms",
                "Reduced risk of systemic absorption",
                "Lower cost compared to monotherapy",
                "Faster onset of action"
              ],
              "answer": "Synergistic bronchodilation via different mechanisms",
              "explanation": "Albuterol (SABA) and ipratropium (SAMA) provide complementary bronchodilation by stimulating beta-2 receptors and blocking muscarinic receptors, respectively."
            },
            {
              "stem": "A 60-year-old female with stage 3 CKD (eGFR 40 mL/min/1.73m²) is prescribed simvastatin for dyslipidemia. Which of the following is the most appropriate action?",
              "options": [
                "Continue simvastatin at the current dose",
                "Reduce simvastatin dose by 50%",
                "Switch to atorvastatin due to lower renal clearance",
                "Discontinue statin therapy due to nephrotoxicity risk"
              ],
              "answer": "Continue simvastatin at the current dose",
              "explanation": "Simvastatin does not require dose adjustment in stage 3 CKD; atorvastatin is preferred in advanced CKD due to lower renal clearance but is not mandatory."
            },
            {
              "stem": "A 28-year-old female with asthma is prescribed formoterol/budesonide 6/200 mcg twice daily. She reports using it daily and awakens 3 times weekly with symptoms. Which of the following is the most appropriate next step?",
              "options": [
                "Increase to formoterol/budesonide 12/400 mcg twice daily",
                "Add oral montelukast 10 mg daily",
                "Switch to oral prednisone 10 mg daily",
                "Prescribe a short-acting beta-agonist (SABA) for rescue use"
              ],
              "answer": "Add oral montelukast 10 mg daily",
              "explanation": "Adding a leukotriene receptor antagonist (e.g., montelukast) is recommended for patients with persistent symptoms despite inhaled corticosteroid/LABA therapy."
            },
            {
              "stem": "A 70-year-old male with COPD (FEV1 30% predicted) is prescribed roflumilast. Which of the following is the primary mechanism of action of roflumilast?",
              "options": [
                "Inhibition of phosphodiesterase-4",
                "Stimulation of beta-2 receptors",
                "Blockade of muscarinic receptors",
                "Inhibition of leukotriene synthesis"
              ],
              "answer": "Inhibition of phosphodiesterase-4",
              "explanation": "Roflumilast is a selective phosphodiesterase-4 inhibitor that reduces inflammation in COPD by increasing intracellular cAMP levels."
            },
            {
              "stem": "A 55-year-old female with stage 3 CKD (eGFR 50 mL/min/1.73m²) is prescribed enalapril for hypertension. Which of the following is the most critical monitoring parameter?",
              "options": [
                "Serum potassium levels",
                "Serum sodium levels",
                "Serum magnesium levels",
                "Serum calcium levels"
              ],
              "answer": "Serum potassium levels",
              "explanation": "ACE inhibitors like enalapril increase serum potassium by reducing aldosterone secretion; hyperkalemia is a significant risk, especially in CKD."
            },
            {
              "stem": "A 40-year-old male with COPD exacerbation is prescribed systemic corticosteroids. Which of the following is the most appropriate duration of therapy?",
              "options": [
                "3-5 days",
                "7-10 days",
                "14-21 days",
                "4-6 weeks"
              ],
              "answer": "7-10 days",
              "explanation": "Short courses of systemic corticosteroids (7-10 days) are recommended for COPD exacerbations to reduce inflammation and improve outcomes without prolonged adverse effects."
            },
            {
              "stem": "A 30-year-old female with asthma is prescribed omalizumab. Which of the following is the primary indication for omalizumab therapy?",
              "options": [
                "Severe persistent allergic asthma",
                "COPD exacerbations",
                "Chronic cough",
                "Exercise-induced bronchospasm"
              ],
              "answer": "Severe persistent allergic asthma",
              "explanation": "Omalizumab is a monoclonal antibody targeting IgE, indicated for severe persistent allergic asthma inadequately controlled with inhaled corticosteroids."
            },
            {
              "stem": "A 65-year-old male with stage 4 CKD (eGFR 20 mL/min/1.73m²) is prescribed furosemide for volume overload. Which of the following is the most critical adverse effect to monitor?",
              "options": [
                "Hyperkalemia",
                "Hypokalemia",
                "Hypercalcemia",
                "Hypocalcemia"
              ],
              "answer": "Hypokalemia",
              "explanation": "Loop diuretics like furosemide increase urinary potassium excretion, increasing the risk of hypokalemia, which can lead to arrhythmias and muscle weakness."
            },
            {
              "stem": "A 50-year-old female with COPD (FEV1 40% predicted) is prescribed a long-acting beta-agonist (LABA) for maintenance therapy. Which of the following is the most appropriate counseling point?",
              "options": [
                "Use as needed for acute symptom relief",
                "Do not use for acute exacerbations",
                "Take with food to reduce GI upset",
                "Monitor blood glucose levels daily"
              ],
              "answer": "Do not use for acute exacerbations",
              "explanation": "LABA monotherapy is not recommended for acute symptom relief in COPD; they are maintenance therapies and should not replace short-acting bronchodilators for exacerbations."
            },
            {
              "stem": "A 45-year-old male with stage 3 CKD (eGFR 45 mL/min/1.73m²) is prescribed ciprofloxacin for a urinary tract infection. Which of the following is the most critical monitoring parameter?",
              "options": [
                "Serum potassium levels",
                "Serum magnesium levels",
                "Tendon health and QTc interval",
                "Serum calcium levels"
              ],
              "answer": "Tendon health and QTc interval",
              "explanation": "Fluoroquinolones like ciprofloxacin increase the risk of tendon rupture and QT prolongation; monitoring tendon health and ECG is critical, especially in CKD."
            },
            {
              "stem": "A 35-year-old female with asthma is prescribed a leukotriene receptor antagonist (LTRA) as add-on therapy. Which of the following is the primary advantage of LTRAs over inhaled corticosteroids?",
              "options": [
                "Faster onset of action",
                "Oral administration",
                "Lower cost",
                "No risk of oral candidiasis"
              ],
              "answer": "Oral administration",
              "explanation": "LTRAs (e.g., montelukast) are administered orally, offering an alternative for patients who cannot use inhaled therapies effectively."
            },
            {
              "stem": "A 70-year-old male with COPD and cor pulmonale is prescribed oxygen therapy. Which of the following is the primary goal of long-term oxygen therapy (LTOT) in COPD?",
              "options": [
                "Reduce symptoms of dyspnea",
                "Improve exercise tolerance",
                "Prolong survival by correcting hypoxemia",
                "Prevent acute exacerbations"
              ],
              "answer": "Prolong survival by correcting hypoxemia",
              "explanation": "Long-term oxygen therapy (LTOT) in COPD aims to correct chronic hypoxemia (PaO2 <55 mmHg or <60 mmHg with cor pulmonale), reducing mortality and improving quality of life."
            },
            {
              "stem": "A 55-year-old female with stage 3 CKD (eGFR 50 mL/min/1.73m²) is prescribed doxycycline for a respiratory infection. Which of the following is the most critical adverse effect to monitor?",
              "options": [
                "Photosensitivity",
                "Hepatotoxicity",
                "Nephrotoxicity",
                "Ototoxicity"
              ],
              "answer": "Photosensitivity",
              "explanation": "Tetracyclines like doxycycline increase photosensitivity, requiring counseling on sun protection and monitoring for skin reactions."
            },
            {
              "stem": "A 40-year-old male with COPD exacerbation is prescribed a combination of inhaled corticosteroids (ICS) and long-acting beta-agonists (LABA). Which of the following is the primary rationale for this combination?",
              "options": [
                "Synergistic anti-inflammatory and bronchodilatory effects",
                "Reduced risk of systemic absorption",
                "Lower cost compared to monotherapy",
                "Faster onset of action"
              ],
              "answer": "Synergistic anti-inflammatory and bronchodilatory effects",
              "explanation": "ICS/LABA combinations (e.g., fluticasone/salmeterol) provide both anti-inflammatory effects (ICS) and sustained bronchodilation (LABA), improving COPD control."
            },
            {
              "stem": "A 60-year-old male with stage 4 CKD (eGFR 25 mL/min/1.73m²) is prescribed vancomycin for MRSA bacteremia. Which of the following is the most appropriate target vancomycin trough level?",
              "options": [
                "5-10 mcg/mL",
                "10-15 mcg/mL",
                "15-20 mcg/mL",
                "20-25 mcg/mL"
              ],
              "answer": "15-20 mcg/mL",
              "explanation": "For serious MRSA infections (e.g., bacteremia), vancomycin trough levels should target 15-20 mcg/mL to ensure efficacy and minimize resistance development."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 25-year-old male presents with a 2-month history of episodic wheezing, chest tightness, and cough that worsens at night. He reports symptom relief with albuterol use. His father has a history of asthma. Spirometry reveals an FEV1/FVC ratio of 0.75 and an FEV1 of 70% predicted. a) What is the most likely diagnosis? b) List 3 investigations that would confirm the diagnosis.",
              "modelAnswer": "a) The most likely diagnosis is asthma, given the episodic symptoms, nocturnal worsening, family history, and reversible airflow limitation on spirometry.\nb) Investigations to confirm asthma:\n1. Spirometry with bronchodilator response (FEV1 improvement ≥12% and ≥200 mL after albuterol).\n2. Peak expiratory flow (PEF) monitoring to assess diurnal variability (>20% variation suggests asthma).\n3. Methacholine challenge test (positive if FEV1 drops ≥20% at low doses).\n4. Allergy testing (skin prick or serum IgE) to identify triggers (optional but supportive)."
            },
            {
              "stem": "A 65-year-old male with a 30-pack-year smoking history presents with progressive dyspnea, chronic cough, and sputum production. Spirometry reveals an FEV1/FVC ratio of 0.60 and an FEV1 of 40% predicted. a) What is the most likely diagnosis? b) List 3 risk factors for this condition.",
              "modelAnswer": "a) The most likely diagnosis is chronic obstructive pulmonary disease (COPD), characterized by persistent airflow limitation (FEV1/FVC <0.70) and reduced FEV1 in a long-term smoker.\nb) Risk factors for COPD:\n1. Tobacco smoking (primary risk factor).\n2. Occupational exposure to dust, chemicals, or fumes.\n3. Air pollution (indoor/outdoor).\n4. Genetic factors (e.g., alpha-1 antitrypsin deficiency).\n5. Recurrent respiratory infections in childhood.\n6. Advanced age."
            },
            {
              "stem": "A 50-year-old female with stage 3 chronic kidney disease (CKD) (eGFR 45 mL/min/1.73m²) is prescribed metformin for type 2 diabetes. a) What is the primary concern with metformin use in CKD? b) What are 3 alternative antidiabetic agents that could be considered?",
              "modelAnswer": "a) The primary concern with metformin in CKD is the increased risk of lactic acidosis due to reduced renal clearance and accumulation of the drug.\nb) Alternative antidiabetic agents:\n1. Insulin (e.g., basal insulin like glargine or detemir).\n2. DPP-4 inhibitors (e.g., sitagliptin, linagliptin—linagliptin does not require dose adjustment in CKD).\n3. SGLT2 inhibitors (e.g., empagliflozin—use with caution in eGFR <45 mL/min/1.73m²).\n4. Sulfonylureas (e.g., glipizide—preferred in CKD due to hepatic metabolism)."
            },
            {
              "stem": "A 30-year-old female with mild persistent asthma is prescribed an inhaled corticosteroid (ICS) for maintenance therapy. a) What is the role of ICS in asthma management? b) List 3 key counseling points for ICS use.",
              "modelAnswer": "a) Role of ICS in asthma management:\n- ICS are the cornerstone of long-term control therapy for persistent asthma.\n- They reduce airway inflammation, prevent exacerbations, and improve lung function.\n- ICS are not rescue medications but provide sustained control when used regularly.\n\nb) Key counseling points for ICS use:\n1. Use the inhaler as prescribed (daily, even if asymptomatic) to maintain control.\n2. Rinse mouth after use to prevent oral candidiasis (thrush).\n3. Use a spacer device to improve lung deposition and reduce systemic absorption.\n4. Monitor for systemic adverse effects (e.g., adrenal suppression, osteoporosis) with long-term high-dose use."
            },
            {
              "stem": "A 60-year-old male with COPD (FEV1 35% predicted) is prescribed a long-acting muscarinic antagonist (LAMA) for maintenance therapy. a) What is the mechanism of action of LAMAs? b) List 3 potential adverse effects of LAMAs.",
              "modelAnswer": "a) Mechanism of action of LAMAs:\n- LAMAs (e.g., tiotropium, aclidinium) are anticholinergic agents that block muscarinic (M3) receptors in the airways.\n- This reduces bronchoconstriction by inhibiting acetylcholine-mediated smooth muscle contraction.\n- LAMAs provide sustained bronchodilation over 24 hours.\n\nb) Potential adverse effects of LAMAs:\n1. Dry mouth (most common).\n2. Constipation.\n3. Urinary retention (caution in benign prostatic hyperplasia).\n4. Blurred vision (due to anticholinergic effects).\n5. Increased intraocular pressure (caution in glaucoma)."
            },
            {
              "stem": "A 45-year-old male with stage 4 CKD (eGFR 25 mL/min/1.73m²) is prescribed vancomycin for MRSA bacteremia. a) What is the primary reason for therapeutic drug monitoring (TDM) in vancomycin therapy? b) List 3 parameters that should be monitored during vancomycin therapy.",
              "modelAnswer": "a) Primary reason for TDM in vancomycin therapy:\n- Vancomycin has a narrow therapeutic index, with efficacy and toxicity closely linked to serum concentrations.\n- TDM ensures trough levels are within the target range (15-20 mcg/mL for serious infections) to maximize efficacy and minimize nephrotoxicity/ototoxicity.\n\nb) Parameters to monitor during vancomycin therapy:\n1. Serum vancomycin trough levels (drawn just before the next dose).\n2. Renal function (serum creatinine, eGFR) to assess for nephrotoxicity.\n3. Signs of ototoxicity (e.g., tinnitus, hearing loss).\n4. Complete blood count (CBC) for neutropenia (rare but possible with prolonged therapy).\n5. Volume status and fluid balance (vancomycin is renally eliminated)."
            },
            {
              "stem": "A 55-year-old female with COPD exacerbation is prescribed a combination of albuterol and ipratropium via nebulizer. a) What is the rationale for combining albuterol and ipratropium? b) List 3 key monitoring parameters for this combination therapy.",
              "modelAnswer": "a) Rationale for combining albuterol and ipratropium:\n- Albuterol (SABA) stimulates beta-2 receptors, causing bronchodilation via smooth muscle relaxation.\n- Ipratropium (SAMA) blocks muscarinic receptors, reducing acetylcholine-mediated bronchoconstriction.\n- The combination provides complementary bronchodilation, improving symptom relief and lung function in COPD exacerbations.\n\nb) Key monitoring parameters for albuterol/ipratropium combination:\n1. Respiratory rate, oxygen saturation, and peak expiratory flow (PEF) to assess response.\n2. Heart rate and blood pressure (albuterol may cause tachycardia or hypertension).\n3. Signs of anticholinergic effects (e.g., dry mouth, urinary retention, blurred vision).\n4. Serum potassium levels (albuterol may cause hypokalemia).\n5. Adverse effects (e.g., tremor, palpitations, paradoxical bronchospasm)."
            },
            {
              "stem": "A 35-year-old male with a 20-pack-year smoking history presents with hemoptysis, weight loss, and a right upper lobe mass on chest X-ray. a) What is the most likely diagnosis? b) List 3 investigations that would confirm the diagnosis.",
              "modelAnswer": "a) The most likely diagnosis is lung cancer, given the hemoptysis, weight loss, and lung mass in a long-term smoker.\nb) Investigations to confirm lung cancer:\n1. Computed tomography (CT) scan of the chest to further characterize the mass and assess for metastases.\n2. Bronchoscopy with biopsy (gold standard for tissue diagnosis).\n3. Positron emission tomography (PET) scan to evaluate metabolic activity and staging.\n4. Sputum cytology (if hemoptysis is present).\n5. Pulmonary function tests (PFTs) to assess surgical candidacy if applicable."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Mr. Kamau, a 55-year-old male with a 35-pack-year smoking history, presents to the clinic with a 6-month history of progressive dyspnea, chronic cough with mucoid sputum production, and fatigue. He reports using albuterol via MDI 3-4 times daily for symptom relief but notes minimal improvement. On examination, he has a barrel-shaped chest, decreased breath sounds, and prolonged expiratory phase. Spirometry reveals an FEV1/FVC ratio of 0.55 and an FEV1 of 35% predicted. His oxygen saturation is 88% on room air. \na) What is the most likely diagnosis? Provide a rationale. (3 marks)\nb) Classify the severity of his COPD using GOLD criteria. (2 marks)\nc) Outline a comprehensive management plan for Mr. Kamau, including pharmacological and non-pharmacological interventions. (8 marks)\nd) What are the key monitoring parameters for Mr. Kamau’s therapy? (2 marks)",
              "modelAnswer": "a) Most likely diagnosis: Chronic obstructive pulmonary disease (COPD) with severe airflow limitation.\n   Rationale:\n   - Long-term smoking history (35 pack-years).\n   - Progressive dyspnea, chronic cough, and sputum production.\n   - Barrel-shaped chest, decreased breath sounds, and prolonged expiratory phase (signs of hyperinflation).\n   - Spirometry showing FEV1/FVC <0.70 and FEV1 35% predicted (severe airflow limitation).\n   - Hypoxemia (SpO2 88% on room air) suggesting chronic respiratory failure.\n\nb) GOLD classification of COPD severity:\n   - GOLD 3 (Severe): FEV1 30-49% predicted.\n   - Group D (High risk, more symptoms): Frequent exacerbations (not specified but implied by frequent albuterol use) and mMRC dyspnea score ≥2 or CAT score ≥10.\n\nc) Comprehensive management plan:\n   Pharmacological interventions:\n   1. Bronchodilator therapy:\n      - Long-acting muscarinic antagonist (LAMA): Tiotropium 18 mcg once daily (preferred for severe COPD).\n      - Long-acting beta-agonist (LABA): Formoterol 12 mcg twice daily or indacaterol 150 mcg once daily (combination with LAMA for better outcomes).\n   2. Inhaled corticosteroid (ICS) + LABA combination:\n      - Fluticasone/salmeterol 500/50 mcg twice daily (if frequent exacerbations or asthma-COPD overlap).\n   3. Phosphodiesterase-4 inhibitor:\n      - Roflumilast 500 mcg daily (if chronic bronchitis phenotype and history of exacerbations).\n   4. Oxygen therapy:\n      - Long-term oxygen therapy (LTOT) if PaO2 <55 mmHg or <60 mmHg with cor pulmonale (initiate after confirming with arterial blood gas).\n   5. Vaccinations:\n      - Annual influenza vaccine.\n      - Pneumococcal vaccine (PCV13 followed by PPSV23).\n\n   Non-pharmacological interventions:\n   1. Smoking cessation counseling and support (nicotine replacement therapy, varenicline, or bupropion if needed).\n   2. Pulmonary rehabilitation program (improves exercise tolerance and quality of life).\n   3. Nutritional support (high-protein diet to prevent muscle wasting).\n   4. Education on self-management (action plan for exacerbations).\n   5. Avoidance of respiratory irritants (e.g., dust, smoke, cold air).\n\n   d) Key monitoring parameters:\n   1. Spirometry (FEV1, FVC) every 6-12 months to assess disease progression.\n   2. Oxygen saturation (SpO2) and arterial blood gases (ABGs) if on LTOT.\n   3. Exacerbation frequency and severity (track hospitalizations or unscheduled clinic visits).\n   4. Symptom control (mMRC dyspnea score, CAT score).\n   5. Adherence to inhaler therapy and technique.\n   6. Adverse effects of medications (e.g., oral candidiasis with ICS, tremor with albuterol).\n   7. Nutritional status and weight (prevent cachexia).\n   8. Comorbidities (e.g., cardiovascular disease, osteoporosis)."
            },
            {
              "stem": "Ms. Wanjiku, a 40-year-old female with a history of allergic rhinitis, presents to the clinic with a 3-month history of episodic wheezing, chest tightness, cough (especially at night), and shortness of breath after exercise. She reports using albuterol via MDI 2-3 times weekly for symptom relief. Spirometry reveals an FEV1/FVC ratio of 0.80 and an FEV1 of 85% predicted. Her peak expiratory flow (PEF) shows diurnal variability of 25%. \na) What is the most likely diagnosis? Provide a rationale. (3 marks)\nb) Classify the severity of her asthma using GINA criteria. (2 marks)\nc) Outline a step-wise management plan for Ms. Wanjiku, including pharmacological and non-pharmacological interventions. (8 marks)\nd) What are the key monitoring parameters for Ms. Wanjiku’s therapy? (2 marks)",
              "modelAnswer": "a) Most likely diagnosis: Mild persistent asthma.\n   Rationale:\n   - History of allergic rhinitis (common comorbidity with asthma).\n   - Episodic wheezing, chest tightness, cough (especially nocturnal), and exercise-induced symptoms.\n   - Albuterol use 2-3 times weekly (but not daily).\n   - Spirometry showing reversible airflow limitation (FEV1 85% predicted with diurnal PEF variability >20%).\n\nb) GINA classification of asthma severity:\n   - Step 2 (Mild persistent): Symptoms >2 days/week but not daily, nocturnal awakenings ≥2x/month, albuterol use >2 days/week but not daily, and normal spirometry (FEV1 >80% predicted).\n\nc) Step-wise management plan:\n   Pharmacological interventions:\n   1. Controller therapy:\n      - Low-dose inhaled corticosteroid (ICS): Fluticasone 100 mcg twice daily or budesonide 200 mcg twice daily.\n   2. Reliever therapy:\n      - Short-acting beta-agonist (SABA): Albuterol 100 mcg as needed (not to exceed 2-3 times weekly).\n   3. Alternative controller options (if ICS not tolerated or preferred):\n      - Leukotriene receptor antagonist (LTRA): Montelukast 10 mg daily.\n      - Mast cell stabilizer: Cromolyn sodium (less preferred due to lower efficacy).\n\n   Non-pharmacological interventions:\n   1. Trigger avoidance:\n      - Identify and avoid allergens (e.g., dust mites, pet dander, pollen).\n      - Avoid tobacco smoke and air pollution.\n   2. Asthma education:\n      - Teach proper inhaler technique (use of spacer if needed).\n      - Provide an asthma action plan (green-yellow-red zones).\n   3. Allergy management:\n      - Consider allergy testing and immunotherapy if allergic triggers are identified.\n   4. Exercise and weight management:\n      - Encourage regular physical activity to improve lung function and overall health.\n      - Maintain a healthy weight to reduce symptom burden.\n   5. Vaccinations:\n      - Annual influenza vaccine.\n      - Pneumococcal vaccine (if indicated).\n\n   d) Key monitoring parameters:\n   1. Symptom control (Asthma Control Test [ACT] or GINA symptom control tool).\n   2. Peak expiratory flow (PEF) monitoring (diurnal variability).\n   3. Spirometry (FEV1, FVC) every 6-12 months or as needed.\n   4. Exacerbation frequency and severity (track unscheduled visits or hospitalizations).\n   5. Adherence to controller therapy (ICS) and reliever use (SABA).\n   6. Inhaler technique and spacer use (if applicable).\n   7. Adverse effects of medications (e.g., oral candidiasis with ICS, tremor with albuterol).\n   8. Comorbidities (e.g., allergic rhinitis, gastroesophageal reflux disease [GERD])."
            }
          ]
        }
      ]
    }
  }
};

export function getExamPrepPaper(unitId: string, variant: number): GeneratedPaper | undefined {
  return EXAM_PREP_PAPERS[unitId]?.[variant];
}
