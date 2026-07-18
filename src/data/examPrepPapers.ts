// AUTO-GENERATED mock exam papers (do not edit by hand).
// Grounded in the real crawled past papers (src/data/examPrepCrawled.ts) plus the Clinova
// clinical-case bank and KDI drug monographs, generated via Mistral (mistral-small-latest).
// 8 clinical-pharmacy subjects x 2 papers each. Titles mirror the real past-paper names
// (e.g. "Clinical Pharmacy — Respiratory & Renal"). No unit codes or school name included.
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
      "title": "Clinical Pharmacy — Principles of Antimicrobial Therapy",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "Which of the following is NOT a core principle of antimicrobial stewardship?",
              "options": [
                "Selecting the narrowest-spectrum agent based on local susceptibility data",
                "Minimizing duration of therapy to the shortest effective course",
                "Using combination therapy for all severe infections to prevent resistance",
                "Implementing formulary restrictions to limit broad-spectrum use"
              ],
              "answer": "Using combination therapy for all severe infections to prevent resistance",
              "explanation": "Combination therapy is not routinely required for all severe infections; it should be reserved for specific indications such as tuberculosis or neutropenic sepsis."
            },
            {
              "stem": "An antibiogram is most useful for guiding therapy by providing:",
              "options": [
                "Susceptibility patterns of pathogens isolated from individual patients",
                "Antimicrobial resistance trends within a specific healthcare facility",
                "Pharmacokinetic data of antimicrobial agents in critically ill patients",
                "Cost-effectiveness analysis of different antimicrobial regimens"
              ],
              "answer": "Antimicrobial resistance trends within a specific healthcare facility",
              "explanation": "An antibiogram aggregates susceptibility data from a healthcare facility to guide empiric therapy choices based on local resistance patterns."
            },
            {
              "stem": "A patient with a history of penicillin allergy develops anaphylaxis when challenged with a cephalosporin. Which mechanism best explains this cross-reactivity?",
              "options": [
                "Shared beta-lactam ring structure leading to IgE-mediated hypersensitivity",
                "Presence of identical side chains in both drug classes",
                "Inhibition of renal excretion causing toxic accumulation",
                "Disruption of gut microbiota leading to hypersensitivity reactions"
              ],
              "answer": "Shared beta-lactam ring structure leading to IgE-mediated hypersensitivity",
              "explanation": "Cross-reactivity between penicillins and cephalosporins is primarily due to the shared beta-lactam ring, which can trigger IgE-mediated allergic reactions in sensitized individuals."
            },
            {
              "stem": "Which of the following is the MOST common cause of community-acquired pneumonia requiring hospitalization?",
              "options": [
                "Staphylococcus aureus",
                "Klebsiella pneumoniae",
                "Streptococcus pneumoniae",
                "Haemophilus influenzae"
              ],
              "answer": "Streptococcus pneumoniae",
              "explanation": "Streptococcus pneumoniae remains the most frequent bacterial cause of community-acquired pneumonia worldwide, accounting for the majority of hospitalized cases."
            },
            {
              "stem": "A patient with atypical pneumonia caused by Mycoplasma pneumoniae fails to improve on doxycycline. Which alternative agent should be considered?",
              "options": [
                "Ceftriaxone",
                "Azithromycin",
                "Vancomycin",
                "Amoxicillin"
              ],
              "answer": "Azithromycin",
              "explanation": "Mycoplasma pneumoniae lacks a cell wall and is inherently resistant to beta-lactams; macrolides such as azithromycin are the preferred agents."
            },
            {
              "stem": "Which laboratory finding is MOST indicative of hepatotoxicity secondary to anti-tuberculosis therapy?",
              "options": [
                "Serum ALT >3 times the upper limit of normal with symptoms",
                "Isolated elevation of serum bilirubin without enzyme changes",
                "Mild elevation of alkaline phosphatase with normal ALT",
                "Elevated serum creatinine with normal liver enzymes"
              ],
              "answer": "Serum ALT >3 times the upper limit of normal with symptoms",
              "explanation": "Hepatotoxicity from anti-TB drugs is typically defined as ALT or AST >3 times ULN with symptoms, or >5 times ULN without symptoms."
            },
            {
              "stem": "Which of the following is NOT a recommended strategy to prevent antimicrobial resistance?",
              "options": [
                "Prescribing antibiotics for viral infections",
                "Using narrow-spectrum agents when appropriate",
                "Implementing infection control measures",
                "Adhering to hand hygiene protocols"
              ],
              "answer": "Prescribing antibiotics for viral infections",
              "explanation": "Antibiotics are ineffective against viral infections and their unnecessary use contributes directly to antimicrobial resistance."
            },
            {
              "stem": "A patient with suspected Legionella pneumonia should be empirically treated with:",
              "options": [
                "Ceftriaxone",
                "Vancomycin",
                "Levofloxacin",
                "Clindamycin"
              ],
              "answer": "Levofloxacin",
              "explanation": "Legionella species are intracellular pathogens not covered by beta-lactams; fluoroquinolones or macrolides are the preferred agents."
            },
            {
              "stem": "Which of the following is the primary mechanism of action of isoniazid in tuberculosis therapy?",
              "options": [
                "Inhibition of mycobacterial cell wall synthesis",
                "Inhibition of mycobacterial RNA polymerase",
                "Inhibition of mycobacterial folate synthesis",
                "Inhibition of mycobacterial protein synthesis"
              ],
              "answer": "Inhibition of mycobacterial cell wall synthesis",
              "explanation": "Isoniazid inhibits the synthesis of mycolic acids, essential components of the mycobacterial cell wall, through inhibition of the enzyme InhA."
            },
            {
              "stem": "A patient with a positive tuberculin skin test but no clinical or radiographic evidence of active disease has:",
              "options": [
                "Active tuberculosis requiring immediate treatment",
                "Latent tuberculosis infection requiring treatment",
                "No need for further evaluation or treatment",
                "A false-positive result due to prior BCG vaccination"
              ],
              "answer": "Latent tuberculosis infection requiring treatment",
              "explanation": "A positive tuberculin skin test with no evidence of active disease indicates latent tuberculosis infection, which requires treatment to prevent reactivation."
            },
            {
              "stem": "Which of the following is the MOST appropriate empiric therapy for a patient with hospital-acquired pneumonia in a facility with high rates of MRSA and Pseudomonas aeruginosa?",
              "options": [
                "Vancomycin monotherapy",
                "Piperacillin-tazobactam monotherapy",
                "Vancomycin plus piperacillin-tazobactam",
                "Ceftriaxone monotherapy"
              ],
              "answer": "Vancomycin plus piperacillin-tazobactam",
              "explanation": "Empiric therapy for hospital-acquired pneumonia in settings with high MRSA and Pseudomonas rates should cover both organisms until culture results are available."
            },
            {
              "stem": "Which of the following adverse effects is MOST specific to ethambutol therapy?",
              "options": [
                "Hepatotoxicity",
                "Ototoxicity",
                "Optic neuritis",
                "Peripheral neuropathy"
              ],
              "answer": "Optic neuritis",
              "explanation": "Ethambutol is associated with dose-dependent optic neuritis, which can lead to visual disturbances and requires regular monitoring."
            },
            {
              "stem": "A patient with a confirmed diagnosis of tuberculosis develops jaundice after 2 weeks of therapy. Which is the MOST appropriate next step?",
              "options": [
                "Continue therapy and monitor closely",
                "Stop all anti-TB drugs immediately",
                "Stop all anti-TB drugs and rechallenge sequentially once LFTs normalize",
                "Switch to a non-hepatotoxic regimen such as streptomycin and ethambutol"
              ],
              "answer": "Stop all anti-TB drugs and rechallenge sequentially once LFTs normalize",
              "explanation": "All first-line anti-TB drugs are potentially hepatotoxic; stopping all drugs and rechallenging sequentially is the safest approach to identify the culprit."
            },
            {
              "stem": "Which of the following is the MOST common cause of antibiotic-associated diarrhea?",
              "options": [
                "Clostridioides difficile",
                "Staphylococcus aureus",
                "Klebsiella pneumoniae",
                "Candida albicans"
              ],
              "answer": "Clostridioides difficile",
              "explanation": "Clostridioides difficile is the leading cause of antibiotic-associated diarrhea and pseudomembranous colitis due to disruption of normal gut flora."
            },
            {
              "stem": "Which of the following is NOT a component of the CURB-65 score used to assess severity of community-acquired pneumonia?",
              "options": [
                "Confusion",
                "Urea >7 mmol/L",
                "Respiratory rate >30 breaths/min",
                "Blood pressure <90/60 mmHg"
              ],
              "answer": "Respiratory rate >30 breaths/min",
              "explanation": "CURB-65 includes Confusion, Urea >7 mmol/L, Respiratory rate ≥30 breaths/min, Blood pressure <90/60 mmHg, and age ≥65 years."
            },
            {
              "stem": "A patient with a history of anaphylaxis to penicillin is diagnosed with bacterial endocarditis caused by viridans group streptococci. Which is the MOST appropriate alternative agent?",
              "options": [
                "Vancomycin",
                "Ceftriaxone",
                "Clindamycin",
                "Azithromycin"
              ],
              "answer": "Vancomycin",
              "explanation": "Vancomycin is the preferred alternative for patients with severe penicillin allergy requiring coverage for gram-positive organisms such as viridans group streptococci."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient receiving prolonged therapy with vancomycin?",
              "options": [
                "Serum creatinine",
                "Serum potassium",
                "Serum magnesium",
                "Serum calcium"
              ],
              "answer": "Serum creatinine",
              "explanation": "Vancomycin is nephrotoxic; serum creatinine should be monitored regularly, especially in patients receiving prolonged therapy or with risk factors for renal impairment."
            },
            {
              "stem": "Which of the following statements is TRUE regarding the treatment of tuberculosis in pregnancy?",
              "options": [
                "Streptomycin is the preferred agent due to its safety profile",
                "Rifampicin should be avoided due to teratogenic effects",
                "Isoniazid, rifampicin, and ethambutol are considered safe",
                "Pyrazinamide is contraindicated in all trimesters"
              ],
              "answer": "Isoniazid, rifampicin, and ethambutol are considered safe",
              "explanation": "Isoniazid, rifampicin, and ethambutol are considered safe in pregnancy; pyrazinamide may be used but is not routinely recommended in some guidelines."
            },
            {
              "stem": "A patient with a diagnosis of aspiration pneumonia should be empirically treated to cover which of the following organisms?",
              "options": [
                "Pseudomonas aeruginosa",
                "Staphylococcus aureus",
                "Anaerobic bacteria",
                "Streptococcus pneumoniae"
              ],
              "answer": "Anaerobic bacteria",
              "explanation": "Aspiration pneumonia often involves mixed aerobic and anaerobic flora from the oral cavity; coverage for anaerobes is essential."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent the emergence of resistance during tuberculosis treatment?",
              "options": [
                "Administering all doses under direct observation",
                "Using high-dose monotherapy to ensure bacterial kill",
                "Shortening the duration of therapy to 3 months",
                "Adding a second agent only when resistance is confirmed"
              ],
              "answer": "Administering all doses under direct observation",
              "explanation": "Directly observed therapy (DOT) ensures adherence and reduces the risk of resistance development by preventing incomplete treatment courses."
            },
            {
              "stem": "A patient with a confirmed diagnosis of Legionella pneumonia fails to improve on azithromycin. Which is the MOST appropriate next step?",
              "options": [
                "Switch to levofloxacin",
                "Add rifampicin",
                "Increase the dose of azithromycin",
                "Switch to ceftriaxone"
              ],
              "answer": "Switch to levofloxacin",
              "explanation": "Legionella species may develop resistance to macrolides; fluoroquinolones such as levofloxacin are the preferred alternative agents."
            },
            {
              "stem": "Which of the following is the MOST common adverse effect of rifampicin therapy?",
              "options": [
                "Hepatotoxicity",
                "Peripheral neuropathy",
                "Orange discoloration of body fluids",
                "Ototoxicity"
              ],
              "answer": "Orange discoloration of body fluids",
              "explanation": "Rifampicin commonly causes orange-red discoloration of urine, tears, sweat, and other body fluids due to its metabolism and excretion."
            },
            {
              "stem": "Which of the following is NOT a recommended strategy for antimicrobial de-escalation?",
              "options": [
                "Switching from broad-spectrum to narrow-spectrum agents based on culture results",
                "Reducing the dose of the antimicrobial to minimize toxicity",
                "Stopping unnecessary combination therapy once a pathogen is identified",
                "Shortening the duration of therapy based on clinical response"
              ],
              "answer": "Reducing the dose of the antimicrobial to minimize toxicity",
              "explanation": "De-escalation focuses on narrowing spectrum and shortening duration, not simply reducing dose, which may compromise efficacy."
            },
            {
              "stem": "A patient with a diagnosis of bacterial meningitis has a positive Gram stain showing gram-negative diplococci. Which is the MOST likely causative organism?",
              "options": [
                "Streptococcus pneumoniae",
                "Neisseria meningitidis",
                "Haemophilus influenzae",
                "Listeria monocytogenes"
              ],
              "answer": "Neisseria meningitidis",
              "explanation": "Gram-negative diplococci on cerebrospinal fluid Gram stain are characteristic of Neisseria meningitidis, a common cause of bacterial meningitis."
            },
            {
              "stem": "Which of the following is the MOST appropriate empiric therapy for a patient with suspected bacterial meningitis in an immunocompetent adult?",
              "options": [
                "Vancomycin monotherapy",
                "Ceftriaxone plus vancomycin",
                "Ampicillin plus gentamicin",
                "Meropenem monotherapy"
              ],
              "answer": "Ceftriaxone plus vancomycin",
              "explanation": "Empiric therapy for bacterial meningitis in adults should cover Streptococcus pneumoniae (including penicillin-resistant strains) and Neisseria meningitidis; ceftriaxone plus vancomycin is recommended."
            },
            {
              "stem": "Which of the following is the MOST common adverse effect of pyrazinamide therapy?",
              "options": [
                "Hepatotoxicity",
                "Peripheral neuropathy",
                "Optic neuritis",
                "Nephrotoxicity"
              ],
              "answer": "Hepatotoxicity",
              "explanation": "Pyrazinamide is associated with hepatotoxicity, which is dose-dependent and requires regular monitoring of liver function tests."
            },
            {
              "stem": "A patient with a diagnosis of tuberculosis develops peripheral neuropathy after 4 weeks of therapy. Which is the MOST likely causative agent?",
              "options": [
                "Isoniazid",
                "Rifampicin",
                "Ethambutol",
                "Pyrazinamide"
              ],
              "answer": "Isoniazid",
              "explanation": "Isoniazid is associated with peripheral neuropathy due to pyridoxine (vitamin B6) deficiency; co-administration of pyridoxine is recommended to prevent this."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent antimicrobial resistance in a healthcare facility?",
              "options": [
                "Implementing formulary restrictions to limit broad-spectrum agents",
                "Routine use of combination therapy for all infections",
                "Prescribing antibiotics for all febrile patients",
                "Using the most expensive agents to ensure efficacy"
              ],
              "answer": "Implementing formulary restrictions to limit broad-spectrum agents",
              "explanation": "Formulary restrictions and antimicrobial stewardship programs are key strategies to reduce unnecessary antibiotic use and prevent resistance."
            },
            {
              "stem": "A patient with a diagnosis of bacterial endocarditis caused by Enterococcus faecalis is allergic to penicillin. Which is the MOST appropriate alternative agent?",
              "options": [
                "Vancomycin",
                "Ceftriaxone",
                "Azithromycin",
                "Clindamycin"
              ],
              "answer": "Vancomycin",
              "explanation": "Enterococcus faecalis is inherently resistant to cephalosporins; vancomycin is the preferred alternative for penicillin-allergic patients."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient receiving prolonged therapy with isoniazid?",
              "options": [
                "Serum creatinine",
                "Serum potassium",
                "Serum vitamin B6 levels",
                "Serum calcium"
              ],
              "answer": "Serum vitamin B6 levels",
              "explanation": "Isoniazid can cause pyridoxine deficiency leading to peripheral neuropathy; monitoring vitamin B6 levels and supplementation is recommended."
            },
            {
              "stem": "A patient with a diagnosis of community-acquired pneumonia fails to improve on amoxicillin-clavulanate. Which is the MOST likely reason?",
              "options": [
                "Infection with a beta-lactamase-producing organism",
                "Infection with an atypical organism such as Mycoplasma pneumoniae",
                "Infection with a gram-negative organism such as Pseudomonas aeruginosa",
                "Infection with a viral organism"
              ],
              "answer": "Infection with an atypical organism such as Mycoplasma pneumoniae",
              "explanation": "Amoxicillin-clavulanate does not cover atypical organisms such as Mycoplasma pneumoniae, which are common causes of community-acquired pneumonia."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent the spread of antimicrobial resistance in a community setting?",
              "options": [
                "Prescribing antibiotics for all patients with fever",
                "Educating patients on the appropriate use of antibiotics",
                "Using the broadest-spectrum agents available",
                "Limiting the duration of therapy to 3 days for all infections"
              ],
              "answer": "Educating patients on the appropriate use of antibiotics",
              "explanation": "Patient education on appropriate antibiotic use is a key strategy to reduce unnecessary prescriptions and prevent resistance in the community."
            },
            {
              "stem": "A patient with a diagnosis of tuberculosis develops visual disturbances after 6 weeks of therapy. Which is the MOST likely causative agent?",
              "options": [
                "Isoniazid",
                "Rifampicin",
                "Ethambutol",
                "Pyrazinamide"
              ],
              "answer": "Ethambutol",
              "explanation": "Ethambutol is associated with optic neuritis, which can cause visual disturbances such as blurred vision or color blindness."
            },
            {
              "stem": "Which of the following is the MOST appropriate empiric therapy for a patient with suspected aspiration pneumonia?",
              "options": [
                "Ceftriaxone monotherapy",
                "Ampicillin-sulbactam",
                "Vancomycin monotherapy",
                "Azithromycin monotherapy"
              ],
              "answer": "Ampicillin-sulbactam",
              "explanation": "Aspiration pneumonia often involves mixed aerobic and anaerobic flora; ampicillin-sulbactam provides coverage for both gram-positive and anaerobic organisms."
            },
            {
              "stem": "A patient with a diagnosis of bacterial meningitis has a positive cerebrospinal fluid culture for Streptococcus pneumoniae. Which is the MOST appropriate definitive therapy?",
              "options": [
                "Vancomycin monotherapy",
                "Ceftriaxone",
                "Ampicillin",
                "Meropenem"
              ],
              "answer": "Ceftriaxone",
              "explanation": "Streptococcus pneumoniae is typically susceptible to ceftriaxone, which is the preferred agent for definitive therapy in bacterial meningitis."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent antimicrobial resistance in a patient with recurrent urinary tract infections?",
              "options": [
                "Prescribing prophylactic antibiotics continuously",
                "Educating the patient on appropriate hygiene measures",
                "Using the broadest-spectrum agent available",
                "Limiting fluid intake to reduce urinary frequency"
              ],
              "answer": "Educating the patient on appropriate hygiene measures",
              "explanation": "Patient education on hygiene measures and avoiding unnecessary antibiotic use is key to preventing recurrent urinary tract infections and resistance."
            },
            {
              "stem": "A patient with a diagnosis of tuberculosis develops hyperuricemia after 2 weeks of therapy. Which is the MOST likely causative agent?",
              "options": [
                "Isoniazid",
                "Rifampicin",
                "Ethambutol",
                "Pyrazinamide"
              ],
              "answer": "Pyrazinamide",
              "explanation": "Pyrazinamide is associated with hyperuricemia due to its effect on purine metabolism; monitoring uric acid levels is recommended."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient receiving prolonged therapy with rifampicin?",
              "options": [
                "Serum creatinine",
                "Serum potassium",
                "Complete blood count",
                "Serum calcium"
              ],
              "answer": "Complete blood count",
              "explanation": "Rifampicin can cause hematologic adverse effects such as thrombocytopenia; regular monitoring of CBC is recommended during prolonged therapy."
            },
            {
              "stem": "A patient with a diagnosis of bacterial endocarditis caused by Staphylococcus aureus is allergic to penicillin. Which is the MOST appropriate alternative agent?",
              "options": [
                "Vancomycin",
                "Ceftriaxone",
                "Azithromycin",
                "Clindamycin"
              ],
              "answer": "Vancomycin",
              "explanation": "Staphylococcus aureus, including methicillin-resistant strains, is typically susceptible to vancomycin, which is the preferred alternative for penicillin-allergic patients."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent antimicrobial resistance in a healthcare facility?",
              "options": [
                "Implementing antimicrobial stewardship programs",
                "Using the most expensive agents to ensure efficacy",
                "Prescribing antibiotics for all febrile patients",
                "Routine use of combination therapy for all infections"
              ],
              "answer": "Implementing antimicrobial stewardship programs",
              "explanation": "Antimicrobial stewardship programs are designed to optimize antibiotic use, reduce resistance, and improve patient outcomes in healthcare facilities."
            },
            {
              "stem": "A patient with a diagnosis of tuberculosis develops arthralgia after 3 weeks of therapy. Which is the MOST likely causative agent?",
              "options": [
                "Isoniazid",
                "Rifampicin",
                "Ethambutol",
                "Pyrazinamide"
              ],
              "answer": "Pyrazinamide",
              "explanation": "Pyrazinamide is associated with arthralgia and hyperuricemia due to its effect on purine metabolism; symptoms typically resolve with discontinuation."
            },
            {
              "stem": "Which of the following is the MOST appropriate empiric therapy for a patient with suspected hospital-acquired pneumonia in a facility with high rates of MRSA?",
              "options": [
                "Ceftriaxone monotherapy",
                "Vancomycin monotherapy",
                "Piperacillin-tazobactam plus vancomycin",
                "Azithromycin monotherapy"
              ],
              "answer": "Piperacillin-tazobactam plus vancomycin",
              "explanation": "Empiric therapy for hospital-acquired pneumonia in settings with high MRSA rates should cover both gram-negative organisms (e.g., Pseudomonas aeruginosa) and MRSA."
            },
            {
              "stem": "A patient with a diagnosis of bacterial meningitis has a positive cerebrospinal fluid culture for Neisseria meningitidis. Which is the MOST appropriate definitive therapy?",
              "options": [
                "Vancomycin monotherapy",
                "Ceftriaxone",
                "Ampicillin",
                "Meropenem"
              ],
              "answer": "Ceftriaxone",
              "explanation": "Neisseria meningitidis is typically susceptible to ceftriaxone, which is the preferred agent for definitive therapy in bacterial meningitis."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent antimicrobial resistance in a patient with a history of recurrent skin and soft tissue infections?",
              "options": [
                "Prescribing prophylactic antibiotics continuously",
                "Educating the patient on appropriate wound care and hygiene",
                "Using the broadest-spectrum agent available",
                "Limiting fluid intake to reduce systemic inflammation"
              ],
              "answer": "Educating the patient on appropriate wound care and hygiene",
              "explanation": "Patient education on wound care and hygiene measures is key to preventing recurrent skin and soft tissue infections and reducing the need for antibiotics."
            },
            {
              "stem": "A patient with a diagnosis of tuberculosis develops gastrointestinal upset after 1 week of therapy. Which is the MOST likely causative agent?",
              "options": [
                "Isoniazid",
                "Rifampicin",
                "Ethambutol",
                "Pyrazinamide"
              ],
              "answer": "Rifampicin",
              "explanation": "Rifampicin commonly causes gastrointestinal upset, including nausea and vomiting, due to its effect on the gastrointestinal mucosa."
            },
            {
              "stem": "Which of the following is the MOST appropriate monitoring parameter for a patient receiving prolonged therapy with ethambutol?",
              "options": [
                "Serum creatinine",
                "Serum potassium",
                "Visual acuity and color vision",
                "Serum calcium"
              ],
              "answer": "Visual acuity and color vision",
              "explanation": "Ethambutol is associated with optic neuritis; regular monitoring of visual acuity and color vision is essential to detect early signs of toxicity."
            },
            {
              "stem": "A patient with a diagnosis of bacterial endocarditis caused by viridans group streptococci is allergic to penicillin. Which is the MOST appropriate alternative agent?",
              "options": [
                "Vancomycin",
                "Ceftriaxone",
                "Azithromycin",
                "Clindamycin"
              ],
              "answer": "Vancomycin",
              "explanation": "Viridans group streptococci are typically susceptible to vancomycin, which is the preferred alternative for penicillin-allergic patients."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent antimicrobial resistance in a community pharmacy setting?",
              "options": [
                "Dispensing antibiotics without a prescription",
                "Educating patients on the appropriate use of antibiotics",
                "Using the broadest-spectrum agents available",
                "Limiting the duration of therapy to 3 days for all infections"
              ],
              "answer": "Educating patients on the appropriate use of antibiotics",
              "explanation": "Patient education on appropriate antibiotic use is a key strategy to reduce unnecessary prescriptions and prevent resistance in the community."
            },
            {
              "stem": "A patient with a diagnosis of tuberculosis develops rash after 2 weeks of therapy. Which is the MOST likely causative agent?",
              "options": [
                "Isoniazid",
                "Rifampicin",
                "Ethambutol",
                "Pyrazinamide"
              ],
              "answer": "Isoniazid",
              "explanation": "Isoniazid is associated with hypersensitivity reactions, including rash, due to its effect on the immune system."
            },
            {
              "stem": "Which of the following is the MOST appropriate empiric therapy for a patient with suspected atypical pneumonia?",
              "options": [
                "Amoxicillin-clavulanate",
                "Ceftriaxone",
                "Azithromycin",
                "Vancomycin"
              ],
              "answer": "Azithromycin",
              "explanation": "Atypical pneumonia is commonly caused by organisms such as Mycoplasma pneumoniae and Legionella species, which are not covered by beta-lactams; macrolides such as azithromycin are preferred."
            },
            {
              "stem": "A patient with a diagnosis of bacterial meningitis has a positive cerebrospinal fluid culture for Listeria monocytogenes. Which is the MOST appropriate definitive therapy?",
              "options": [
                "Vancomycin monotherapy",
                "Ceftriaxone",
                "Ampicillin plus gentamicin",
                "Meropenem"
              ],
              "answer": "Ampicillin plus gentamicin",
              "explanation": "Listeria monocytogenes is inherently resistant to cephalosporins; ampicillin plus gentamicin is the preferred regimen for definitive therapy."
            },
            {
              "stem": "Which of the following is the MOST appropriate strategy to prevent antimicrobial resistance in a patient with a history of recurrent urinary tract infections?",
              "options": [
                "Prescribing prophylactic antibiotics continuously",
                "Educating the patient on appropriate hygiene measures",
                "Using the broadest-spectrum agent available",
                "Limiting fluid intake to reduce urinary frequency"
              ],
              "answer": "Educating the patient on appropriate hygiene measures",
              "explanation": "Patient education on hygiene measures and avoiding unnecessary antibiotic use is key to preventing recurrent urinary tract infections and resistance."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "List four minor manifestations used in the diagnosis of acute rheumatic fever according to the Jones criteria.",
              "modelAnswer": "1. Fever; 2. Arthralgia; 3. Elevated erythrocyte sedimentation rate (ESR) or C-reactive protein (CRP); 4. Prolonged PR interval on electrocardiogram."
            },
            {
              "stem": "Describe four symptoms and signs that should raise suspicion of pharyngitis of viral etiology.",
              "modelAnswer": "1. Cough; 2. Rhinorrhea; 3. Conjunctivitis; 4. Absence of fever or presence of low-grade fever; 5. Presence of viral exanthem or enanthem."
            },
            {
              "stem": "A 38-year-old patient with a positive history of treatment for pulmonary tuberculosis 5 years ago presents to the chest clinic with malaise for 3 weeks, night sweats, and unintended weight loss. Sputum GeneXpert tests positive for rifampicin-resistant Mycobacterium tuberculosis. Identify the diagnosis and design a five-drug treatment plan for this patient.",
              "modelAnswer": "Diagnosis: Multidrug-resistant tuberculosis (MDR-TB). Treatment plan: 1. Levofloxacin; 2. Ethionamide; 3. Cycloserine; 4. Pyrazinamide; 5. Ethambutol. Duration: 18–24 months, with at least 6 months of injectable agents if tolerated."
            },
            {
              "stem": "Describe any six core elements of establishing an antimicrobial stewardship program.",
              "modelAnswer": "1. Leadership commitment; 2. Accountability; 3. Pharmacy expertise; 4. Action (e.g., preauthorization, prospective audit and feedback); 5. Tracking (monitoring antibiotic prescribing and resistance patterns); 6. Reporting (regular feedback to providers); 7. Education (training on appropriate antibiotic use)."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 19-year-old college student is brought to the emergency department with confusion, vomiting, headache, and neck stiffness. Temperature is 39.0°C, pulse 117/min, respiratory rate 14/min, and blood pressure 94/56 mmHg. Examination reveals lethargy, disorientation, nuchal rigidity, and petechial rash on extremities that progresses to purpura within 24 hours. Identify the most probable diagnosis and causative agent. Justify your answer. Describe three investigations to support the diagnosis. Review five patient-related factors to consider when selecting empirical antimicrobial therapy. Propose an appropriate treatment plan. List two complications to monitor. Explain how you would manage contacts.",
              "modelAnswer": {
                "diagnosis": "Meningococcal meningitis with meningococcemia (purpura fulminans).",
                "causative_agent": "Neisseria meningitidis (serogroup C most likely in outbreaks).",
                "justification": "Clinical presentation with fever, confusion, nuchal rigidity, and petechial rash progressing to purpura is classic for meningococcal disease. The rapid progression and systemic involvement suggest meningococcemia.",
                "investigations": "1. Lumbar puncture for cerebrospinal fluid (CSF) analysis (cell count, Gram stain, culture, PCR); 2. Blood cultures; 3. Skin lesion biopsy for Gram stain and culture.",
                "patient_factors": "1. Age and immune status (young adults in close contact settings are high risk); 2. Hemodynamic instability (hypotension, tachycardia); 3. Renal function (risk of acute kidney injury); 4. Coagulation status (risk of disseminated intravascular coagulation); 5. Allergy history (e.g., penicillin allergy).",
                "treatment_plan": "1. Immediate empiric therapy: Ceftriaxone 2g IV q12h (or benzylpenicillin 2.4g IV q4h if no allergy); 2. Supportive care: Fluid resuscitation, vasopressors if needed, and close monitoring in ICU; 3. Chemoprophylaxis for close contacts: Rifampicin 600mg PO q12h for 2 days or ciprofloxacin 500mg PO single dose.",
                "complications": "1. Septic shock with multi-organ failure; 2. Disseminated intravascular coagulation (DIC).",
                "contact_management": "Identify and provide chemoprophylaxis to close contacts (household members, intimate contacts, healthcare workers with direct exposure to respiratory secretions). Use rifampicin or ciprofloxacin as above. Vaccination should be considered for serogroup-specific outbreaks."
              }
            },
            {
              "stem": "Mr. JW, a 40-year-old previously healthy man, presents 5 days after returning from a conference abroad with sudden onset of fever, cough producing rusty sputum, pleuritic chest pain, dyspnea, and disorientation. His respiratory rate is 33/min, SpO2 85%, temperature 38.8°C, blood pressure 100/68 mmHg, and pulse 110/min. Urea is 8.5 mmol/L. Identify the most likely diagnosis and causative organism. Justify your answer. Outline two additional investigations. Evaluate whether he should be treated as an outpatient, inpatient (general ward), or in the ICU. Formulate a treatment plan. Describe how you would monitor for response to treatment.",
              "modelAnswer": {
                "diagnosis": "Community-acquired pneumonia (CAP) with severe sepsis.",
                "causative_organism": "Streptococcus pneumoniae (most likely) or Legionella pneumophila (given travel history and whirlpool exposure).",
                "justification": "Sudden onset of fever, rusty sputum, pleuritic chest pain, and hypoxia are classic for pneumococcal pneumonia. Travel history and whirlpool exposure increase the likelihood of Legionella, which can present similarly with systemic symptoms.",
                "investigations": "1. Chest X-ray (to confirm pneumonia and assess for complications such as effusion or multilobar involvement); 2. Sputum Gram stain and culture, urinary antigen test for Legionella and pneumococcus.",
                "care_setting": "Inpatient in the ICU due to severe sepsis (hypotension, hypoxia, tachycardia, altered mental status, and elevated urea). CURB-65 score would likely be ≥3, mandating ICU admission.",
                "treatment_plan": "1. Empiric therapy: Ceftriaxone 2g IV q24h plus azithromycin 500mg IV q24h (covers both pneumococcus and atypical organisms); 2. Supportive care: Oxygen therapy to maintain SpO2 >90%, fluid resuscitation, and close monitoring; 3. Consider vasopressors if hypotension persists.",
                "monitoring": "1. Clinical parameters: Temperature, respiratory rate, oxygen saturation, and mental status; 2. Laboratory parameters: White blood cell count, C-reactive protein, and arterial blood gases; 3. Radiographic parameters: Chest X-ray to assess for improvement or complications; 4. Microbiological parameters: Follow-up sputum cultures and urinary antigen tests if initially positive."
              }
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Clinical Pharmacy — Principles of Antimicrobial Therapy",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "A 65-year-old male with a history of COPD and recent hospitalization for exacerbation is admitted with suspected hospital-acquired pneumonia. Local antibiogram data shows 30% resistance of Pseudomonas aeruginosa to piperacillin-tazobactam. Which of the following is the MOST appropriate empiric therapy choice based on antimicrobial stewardship principles?",
              "options": [
                "Piperacillin-tazobactam monotherapy",
                "Ceftazidime monotherapy",
                "Meropenem monotherapy",
                "Piperacillin-tazobactam plus vancomycin"
              ],
              "answer": "Piperacillin-tazobactam monotherapy",
              "explanation": "Local antibiogram data supports piperacillin-tazobactam as empiric therapy for Pseudomonas aeruginosa, with de-escalation guided by culture results; adding vancomycin is unnecessary without MRSA risk."
            },
            {
              "stem": "A hospital’s antibiotic formulary restricts the use of carbapenems to culture-proven infections with multidrug-resistant organisms. Which of the following is the PRIMARY goal of this formulary restriction?",
              "options": [
                "To reduce overall antibiotic costs",
                "To minimize the development of carbapenem resistance",
                "To increase the use of narrow-spectrum agents",
                "To simplify inventory management"
              ],
              "answer": "To minimize the development of carbapenem resistance",
              "explanation": "Carbapenem restriction is a core antimicrobial stewardship strategy to preserve the utility of these agents by reducing selective pressure for resistance."
            },
            {
              "stem": "A 32-year-old female with a history of recurrent urinary tract infections presents with fever and flank pain. Urine culture grows ESBL-producing Escherichia coli. Which of the following is the MOST appropriate oral step-down therapy after clinical improvement?",
              "options": [
                "Amoxicillin-clavulanate",
                "Ciprofloxacin",
                "Nitrofurantoin",
                "Trimethoprim-sulfamethoxazole"
              ],
              "answer": "Nitrofurantoin",
              "explanation": "Nitrofurantoin achieves high urinary concentrations and is active against ESBL-producing E. coli; fluoroquinolones and TMP-SMX are less reliable due to resistance."
            },
            {
              "stem": "A 45-year-old male with a documented anaphylactic reaction to penicillin is admitted with community-acquired pneumonia. Sputum Gram stain shows gram-positive diplococci. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Cefazolin",
                "Azithromycin",
                "Vancomycin",
                "Clindamycin"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin provides coverage for Streptococcus pneumoniae in penicillin-allergic patients without cross-reactivity; cefazolin and vancomycin are not first-line for CAP."
            },
            {
              "stem": "A 28-year-old female with a 5-day history of fever, cough, and myalgia is diagnosed with atypical pneumonia. Which of the following organisms is MOST likely responsible?",
              "options": [
                "Streptococcus pneumoniae",
                "Haemophilus influenzae",
                "Mycoplasma pneumoniae",
                "Klebsiella pneumoniae"
              ],
              "answer": "Mycoplasma pneumoniae",
              "explanation": "Mycoplasma pneumoniae is a common cause of atypical pneumonia characterized by gradual onset, non-productive cough, and extrapulmonary symptoms."
            },
            {
              "stem": "A 70-year-old male with COPD exacerbation is started on empiric therapy with ceftriaxone and azithromycin. On day 3, he develops profuse watery diarrhea and abdominal cramping. Which of the following is the MOST likely cause?",
              "options": [
                "Azithromycin-induced QT prolongation",
                "Ceftriaxone-associated cholestasis",
                "Clostridioides difficile infection",
                "Vancomycin-resistant Enterococcus colonization"
              ],
              "answer": "Clostridioides difficile infection",
              "explanation": "Ceftriaxone is a high-risk agent for C. difficile infection; symptoms of profuse diarrhea and abdominal cramping are classic for this complication."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol use disorder is started on standard four-drug therapy for pulmonary tuberculosis (RHZE). Baseline LFTs are ALT 35 U/L and AST 40 U/L. Which of the following increases his risk of hepatotoxicity?",
              "options": [
                "Age >50 years",
                "Alcohol use disorder",
                "Male sex",
                "Positive tuberculin skin test"
              ],
              "answer": "Alcohol use disorder",
              "explanation": "Chronic alcohol use is a major risk factor for isoniazid- and rifampicin-induced hepatotoxicity due to impaired drug metabolism and hepatic reserve."
            },
            {
              "stem": "A patient with active tuberculosis develops jaundice and elevated bilirubin after 2 weeks of RHZE therapy. LFTs show ALT 250 U/L and total bilirubin 4.2 mg/dL. Which of the following is the MOST appropriate management step?",
              "options": [
                "Continue all TB medications and monitor closely",
                "Stop all TB medications and restart once LFTs normalize",
                "Stop all TB medications and initiate drug rechallenge sequentially",
                "Switch to a rifamycin-free regimen immediately"
              ],
              "answer": "Stop all TB medications and initiate drug rechallenge sequentially",
              "explanation": "Sequential drug rechallenge is recommended after LFTs return to <2x ULN to identify the causative agent and resume effective therapy."
            },
            {
              "stem": "A 60-year-old female with a history of hypertension and type 2 diabetes is admitted with fever, cough, and dyspnea. Chest X-ray shows bilateral infiltrates. Sputum culture grows Legionella pneumophila. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone",
                "Azithromycin",
                "Vancomycin",
                "Ciprofloxacin"
              ],
              "answer": "Azithromycin",
              "explanation": "Macrolides (e.g., azithromycin) are first-line for Legionella pneumonia; fluoroquinolones are alternatives, but ceftriaxone and vancomycin lack activity."
            },
            {
              "stem": "A 35-year-old male with a history of intravenous drug use presents with fever, chills, and a new cardiac murmur. Blood cultures grow Staphylococcus aureus. Which of the following valves is MOST commonly affected in this patient population?",
              "options": [
                "Mitral valve",
                "Aortic valve",
                "Tricuspid valve",
                "Pulmonary valve"
              ],
              "answer": "Tricuspid valve",
              "explanation": "IV drug users are at high risk for tricuspid valve endocarditis due to direct inoculation of bacteria into the venous system."
            },
            {
              "stem": "A 40-year-old female with a history of penicillin allergy (rash) requires treatment for community-acquired pneumonia. Sputum culture grows Streptococcus pneumoniae. Which of the following is the MOST appropriate alternative agent?",
              "options": [
                "Cefazolin",
                "Clarithromycin",
                "Vancomycin",
                "Doxycycline"
              ],
              "answer": "Clarithromycin",
              "explanation": "Macrolides (e.g., clarithromycin) provide coverage for penicillin-susceptible S. pneumoniae in patients with non-anaphylactic penicillin allergies."
            },
            {
              "stem": "A 25-year-old male presents with a 2-week history of fever, night sweats, and weight loss. Chest X-ray shows a right upper lobe infiltrate. Sputum smear is positive for acid-fast bacilli. Which of the following is the MOST appropriate next step?",
              "options": [
                "Start empiric TB therapy immediately",
                "Obtain sputum culture and sensitivity",
                "Perform a tuberculin skin test",
                "Order a chest CT scan"
              ],
              "answer": "Start empiric TB therapy immediately",
              "explanation": "Empiric TB therapy should be initiated in patients with high clinical suspicion (e.g., AFB-positive sputum and typical radiographic findings) while awaiting culture confirmation."
            },
            {
              "stem": "A 55-year-old male with a history of COPD is admitted with severe community-acquired pneumonia. He is started on empiric therapy with ceftriaxone and azithromycin. On day 2, his oxygen requirements increase, and he develops hypotension requiring vasopressors. Which of the following is the MOST appropriate next step?",
              "options": [
                "Add vancomycin for MRSA coverage",
                "Switch to meropenem for broader coverage",
                "Increase the dose of ceftriaxone",
                "Obtain blood cultures and reassess therapy"
              ],
              "answer": "Obtain blood cultures and reassess therapy",
              "explanation": "Clinical deterioration in CAP warrants reassessment, including blood cultures and consideration of broader-spectrum therapy if sepsis or resistant organisms are suspected."
            },
            {
              "stem": "A 30-year-old female with a history of recurrent UTIs is started on nitrofurantoin for a culture-proven E. coli UTI. Which of the following is the MOST important monitoring parameter during therapy?",
              "options": [
                "Serum creatinine",
                "Liver function tests",
                "Pulmonary function tests",
                "Complete blood count"
              ],
              "answer": "Serum creatinine",
              "explanation": "Nitrofurantoin is renally eliminated; monitoring serum creatinine ensures adequate drug levels and avoids toxicity in patients with renal impairment."
            },
            {
              "stem": "A 65-year-old male with a history of chronic kidney disease (eGFR 30 mL/min) is admitted with pneumonia. Local antibiogram shows high resistance of Klebsiella pneumoniae to ceftriaxone. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone",
                "Piperacillin-tazobactam",
                "Ertapenem",
                "Ciprofloxacin"
              ],
              "answer": "Ertapenem",
              "explanation": "Ertapenem provides broad-spectrum coverage for gram-negative organisms, including ESBL-producing Klebsiella, and is less nephrotoxic than other carbapenems in CKD."
            },
            {
              "stem": "A 45-year-old male with a history of HIV (CD4 150 cells/mm³) presents with fever, cough, and weight loss. Chest X-ray shows diffuse infiltrates. Which of the following is the MOST likely causative organism?",
              "options": [
                "Streptococcus pneumoniae",
                "Pneumocystis jirovecii",
                "Haemophilus influenzae",
                "Mycobacterium tuberculosis"
              ],
              "answer": "Pneumocystis jirovecii",
              "explanation": "Pneumocystis jirovecii pneumonia (PCP) is a common opportunistic infection in HIV patients with CD4 counts <200 cells/mm³."
            },
            {
              "stem": "A 50-year-old female with a history of penicillin allergy (anaphylaxis) is admitted with cellulitis. The organism is identified as methicillin-susceptible Staphylococcus aureus. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Cefazolin",
                "Vancomycin",
                "Clindamycin",
                "Daptomycin"
              ],
              "answer": "Vancomycin",
              "explanation": "Vancomycin is the preferred agent for MSSA in patients with severe penicillin allergy (anaphylaxis) due to lack of cross-reactivity."
            },
            {
              "stem": "A 35-year-old male with a history of intravenous drug use is admitted with fever and a new cardiac murmur. Blood cultures grow Staphylococcus epidermidis. Which of the following is the MOST likely source of infection?",
              "options": [
                "Urinary tract infection",
                "Central venous catheter",
                "Community-acquired pneumonia",
                "Skin and soft tissue infection"
              ],
              "answer": "Central venous catheter",
              "explanation": "Staphylococcus epidermidis is a common cause of catheter-related bloodstream infections in IV drug users due to biofilm formation on indwelling devices."
            },
            {
              "stem": "A 60-year-old male with a history of diabetes and chronic kidney disease is admitted with a diabetic foot infection. Wound culture grows Pseudomonas aeruginosa. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone",
                "Piperacillin-tazobactam",
                "Vancomycin",
                "Clindamycin"
              ],
              "answer": "Piperacillin-tazobactam",
              "explanation": "Piperacillin-tazobactam provides broad-spectrum coverage for Pseudomonas aeruginosa, a common pathogen in diabetic foot infections."
            },
            {
              "stem": "A 28-year-old female with a history of asthma is admitted with community-acquired pneumonia. Sputum culture grows Streptococcus pneumoniae. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Amoxicillin",
                "Ceftriaxone",
                "Azithromycin",
                "Vancomycin"
              ],
              "answer": "Amoxicillin",
              "explanation": "Amoxicillin is the first-line therapy for penicillin-susceptible Streptococcus pneumoniae in patients without severe penicillin allergy."
            },
            {
              "stem": "A 55-year-old male with a history of COPD is admitted with an acute exacerbation. He is started on empiric therapy with amoxicillin-clavulanate. On day 3, he develops watery diarrhea and abdominal cramping. Which of the following is the MOST likely cause?",
              "options": [
                "Amoxicillin-induced rash",
                "Clavulanate-associated hepatotoxicity",
                "Clostridioides difficile infection",
                "Amoxicillin-associated nephrotoxicity"
              ],
              "answer": "Clostridioides difficile infection",
              "explanation": "Amoxicillin-clavulanate is a high-risk agent for C. difficile infection; symptoms of diarrhea and abdominal cramping are classic for this complication."
            },
            {
              "stem": "A 40-year-old male with a history of tuberculosis presents with fever, night sweats, and weight loss. Chest X-ray shows a right upper lobe cavity. Sputum culture grows Mycobacterium tuberculosis resistant to isoniazid and rifampin. Which of the following is the MOST appropriate next step?",
              "options": [
                "Start standard RHZE therapy",
                "Start a multidrug-resistant TB regimen",
                "Obtain a repeat sputum culture",
                "Perform a tuberculin skin test"
              ],
              "answer": "Start a multidrug-resistant TB regimen",
              "explanation": "Resistance to isoniazid and rifampin (MDR-TB) requires a tailored regimen with at least four second-line drugs based on susceptibility testing."
            },
            {
              "stem": "A 30-year-old female with a history of penicillin allergy (rash) is admitted with meningitis. Cerebrospinal fluid (CSF) Gram stain shows gram-positive diplococci. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone",
                "Vancomycin",
                "Meropenem",
                "Chloramphenicol"
              ],
              "answer": "Ceftriaxone",
              "explanation": "Ceftriaxone provides coverage for penicillin-susceptible Streptococcus pneumoniae in patients with non-anaphylactic penicillin allergies; vancomycin is added if resistance is suspected."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol use disorder is admitted with fever, cough, and dyspnea. Chest X-ray shows a right lower lobe consolidation. Sputum culture grows Klebsiella pneumoniae. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone",
                "Piperacillin-tazobactam",
                "Azithromycin",
                "Vancomycin"
              ],
              "answer": "Piperacillin-tazobactam",
              "explanation": "Piperacillin-tazobactam provides broad-spectrum coverage for Klebsiella pneumoniae, including ESBL-producing strains, which are common in alcohol use disorder."
            },
            {
              "stem": "A 65-year-old female with a history of hypertension and diabetes is admitted with fever, cough, and dyspnea. Chest X-ray shows bilateral infiltrates. Sputum culture grows Legionella pneumophila. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone",
                "Azithromycin",
                "Vancomycin",
                "Ciprofloxacin"
              ],
              "answer": "Azithromycin",
              "explanation": "Macrolides (e.g., azithromycin) are first-line for Legionella pneumonia; fluoroquinolones are alternatives, but ceftriaxone and vancomycin lack activity."
            },
            {
              "stem": "A 45-year-old male with a history of intravenous drug use presents with fever, chills, and a new cardiac murmur. Blood cultures grow Staphylococcus aureus. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Nafcillin",
                "Vancomycin",
                "Daptomycin",
                "Linezolid"
              ],
              "answer": "Vancomycin",
              "explanation": "Vancomycin is the preferred agent for MSSA in patients with severe penicillin allergy or IV drug use history due to reliable coverage and reduced risk of resistance."
            },
            {
              "stem": "A 30-year-old female with a history of recurrent UTIs is started on nitrofurantoin for a culture-proven E. coli UTI. Which of the following is the MOST important counseling point regarding adverse effects?",
              "options": [
                "Take with food to reduce nausea",
                "Avoid sunlight exposure",
                "Report any signs of pulmonary toxicity",
                "Monitor for ototoxicity"
              ],
              "answer": "Report any signs of pulmonary toxicity",
              "explanation": "Nitrofurantoin can cause acute or chronic pulmonary toxicity; patients should be counseled to report cough, dyspnea, or fever promptly."
            },
            {
              "stem": "A 55-year-old male with a history of COPD is admitted with an acute exacerbation. He is started on empiric therapy with ceftriaxone and azithromycin. On day 2, his oxygen requirements increase, and he develops hypotension requiring vasopressors. Which of the following is the MOST appropriate next step?",
              "options": [
                "Add vancomycin for MRSA coverage",
                "Switch to meropenem for broader coverage",
                "Increase the dose of ceftriaxone",
                "Obtain blood cultures and reassess therapy"
              ],
              "answer": "Obtain blood cultures and reassess therapy",
              "explanation": "Clinical deterioration in CAP warrants reassessment, including blood cultures and consideration of broader-spectrum therapy if sepsis or resistant organisms are suspected."
            },
            {
              "stem": "A 60-year-old female with a history of hypertension and type 2 diabetes is admitted with fever, cough, and dyspnea. Chest X-ray shows bilateral infiltrates. Sputum culture grows Legionella pneumophila. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone",
                "Azithromycin",
                "Vancomycin",
                "Ciprofloxacin"
              ],
              "answer": "Azithromycin",
              "explanation": "Macrolides (e.g., azithromycin) are first-line for Legionella pneumonia; fluoroquinolones are alternatives, but ceftriaxone and vancomycin lack activity."
            },
            {
              "stem": "A 35-year-old male with a history of intravenous drug use is admitted with fever, chills, and a new cardiac murmur. Blood cultures grow Staphylococcus epidermidis. Which of the following is the MOST likely source of infection?",
              "options": [
                "Urinary tract infection",
                "Central venous catheter",
                "Community-acquired pneumonia",
                "Skin and soft tissue infection"
              ],
              "answer": "Central venous catheter",
              "explanation": "Staphylococcus epidermidis is a common cause of catheter-related bloodstream infections in IV drug users due to biofilm formation on indwelling devices."
            },
            {
              "stem": "A 65-year-old male with a history of chronic kidney disease (eGFR 30 mL/min) is admitted with pneumonia. Local antibiogram shows high resistance of Klebsiella pneumoniae to ceftriaxone. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone",
                "Piperacillin-tazobactam",
                "Ertapenem",
                "Ciprofloxacin"
              ],
              "answer": "Ertapenem",
              "explanation": "Ertapenem provides broad-spectrum coverage for gram-negative organisms, including ESBL-producing Klebsiella, and is less nephrotoxic than other carbapenems in CKD."
            },
            {
              "stem": "A 45-year-old male with a history of HIV (CD4 150 cells/mm³) presents with fever, cough, and weight loss. Chest X-ray shows diffuse infiltrates. Which of the following is the MOST likely causative organism?",
              "options": [
                "Streptococcus pneumoniae",
                "Pneumocystis jirovecii",
                "Haemophilus influenzae",
                "Mycobacterium tuberculosis"
              ],
              "answer": "Pneumocystis jirovecii",
              "explanation": "Pneumocystis jirovecii pneumonia (PCP) is a common opportunistic infection in HIV patients with CD4 counts <200 cells/mm³."
            },
            {
              "stem": "A 50-year-old female with a history of penicillin allergy (anaphylaxis) is admitted with cellulitis. The organism is identified as methicillin-susceptible Staphylococcus aureus. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Cefazolin",
                "Vancomycin",
                "Clindamycin",
                "Daptomycin"
              ],
              "answer": "Vancomycin",
              "explanation": "Vancomycin is the preferred agent for MSSA in patients with severe penicillin allergy (anaphylaxis) due to lack of cross-reactivity."
            },
            {
              "stem": "A 30-year-old male with a history of tuberculosis presents with fever, night sweats, and weight loss. Chest X-ray shows a right upper lobe cavity. Sputum culture grows Mycobacterium tuberculosis resistant to isoniazid and rifampin. Which of the following is the MOST appropriate next step?",
              "options": [
                "Start standard RHZE therapy",
                "Start a multidrug-resistant TB regimen",
                "Obtain a repeat sputum culture",
                "Perform a tuberculin skin test"
              ],
              "answer": "Start a multidrug-resistant TB regimen",
              "explanation": "Resistance to isoniazid and rifampin (MDR-TB) requires a tailored regimen with at least four second-line drugs based on susceptibility testing."
            },
            {
              "stem": "A 30-year-old female with a history of penicillin allergy (rash) is admitted with meningitis. Cerebrospinal fluid (CSF) Gram stain shows gram-positive diplococci. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone",
                "Vancomycin",
                "Meropenem",
                "Chloramphenicol"
              ],
              "answer": "Ceftriaxone",
              "explanation": "Ceftriaxone provides coverage for penicillin-susceptible Streptococcus pneumoniae in patients with non-anaphylactic penicillin allergies; vancomycin is added if resistance is suspected."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol use disorder is admitted with fever, cough, and dyspnea. Chest X-ray shows a right lower lobe consolidation. Sputum culture grows Klebsiella pneumoniae. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone",
                "Piperacillin-tazobactam",
                "Azithromycin",
                "Vancomycin"
              ],
              "answer": "Piperacillin-tazobactam",
              "explanation": "Piperacillin-tazobactam provides broad-spectrum coverage for Klebsiella pneumoniae, including ESBL-producing strains, which are common in alcohol use disorder."
            },
            {
              "stem": "A 65-year-old female with a history of hypertension and diabetes is admitted with fever, cough, and dyspnea. Chest X-ray shows bilateral infiltrates. Sputum culture grows Legionella pneumophila. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone",
                "Azithromycin",
                "Vancomycin",
                "Ciprofloxacin"
              ],
              "answer": "Azithromycin",
              "explanation": "Macrolides (e.g., azithromycin) are first-line for Legionella pneumonia; fluoroquinolones are alternatives, but ceftriaxone and vancomycin lack activity."
            },
            {
              "stem": "A 45-year-old male with a history of intravenous drug use presents with fever, chills, and a new cardiac murmur. Blood cultures grow Staphylococcus aureus. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Nafcillin",
                "Vancomycin",
                "Daptomycin",
                "Linezolid"
              ],
              "answer": "Vancomycin",
              "explanation": "Vancomycin is the preferred agent for MSSA in patients with severe penicillin allergy or IV drug use history due to reliable coverage and reduced risk of resistance."
            },
            {
              "stem": "A 30-year-old female with a history of recurrent UTIs is started on nitrofurantoin for a culture-proven E. coli UTI. Which of the following is the MOST important counseling point regarding adverse effects?",
              "options": [
                "Take with food to reduce nausea",
                "Avoid sunlight exposure",
                "Report any signs of pulmonary toxicity",
                "Monitor for ototoxicity"
              ],
              "answer": "Report any signs of pulmonary toxicity",
              "explanation": "Nitrofurantoin can cause acute or chronic pulmonary toxicity; patients should be counseled to report cough, dyspnea, or fever promptly."
            },
            {
              "stem": "A 55-year-old male with a history of COPD is admitted with an acute exacerbation. He is started on empiric therapy with amoxicillin-clavulanate. On day 3, he develops watery diarrhea and abdominal cramping. Which of the following is the MOST likely cause?",
              "options": [
                "Amoxicillin-induced rash",
                "Clavulanate-associated hepatotoxicity",
                "Clostridioides difficile infection",
                "Amoxicillin-associated nephrotoxicity"
              ],
              "answer": "Clostridioides difficile infection",
              "explanation": "Amoxicillin-clavulanate is a high-risk agent for C. difficile infection; symptoms of diarrhea and abdominal cramping are classic for this complication."
            },
            {
              "stem": "A 40-year-old male with a history of tuberculosis presents with fever, night sweats, and weight loss. Chest X-ray shows a right upper lobe cavity. Sputum culture grows Mycobacterium tuberculosis resistant to isoniazid and rifampin. Which of the following is the MOST appropriate next step?",
              "options": [
                "Start standard RHZE therapy",
                "Start a multidrug-resistant TB regimen",
                "Obtain a repeat sputum culture",
                "Perform a tuberculin skin test"
              ],
              "answer": "Start a multidrug-resistant TB regimen",
              "explanation": "Resistance to isoniazid and rifampin (MDR-TB) requires a tailored regimen with at least four second-line drugs based on susceptibility testing."
            },
            {
              "stem": "A 30-year-old female with a history of penicillin allergy (rash) is admitted with meningitis. Cerebrospinal fluid (CSF) Gram stain shows gram-positive diplococci. Which of the following is the MOST appropriate empiric therapy?",
              "options": [
                "Ceftriaxone",
                "Vancomycin",
                "Meropenem",
                "Chloramphenicol"
              ],
              "answer": "Ceftriaxone",
              "explanation": "Ceftriaxone provides coverage for penicillin-susceptible Streptococcus pneumoniae in patients with non-anaphylactic penicillin allergies; vancomycin is added if resistance is suspected."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol use disorder is admitted with fever, cough, and dyspnea. Chest X-ray shows a right lower lobe consolidation. Sputum culture grows Klebsiella pneumoniae. Which of the following is the MOST appropriate therapy?",
              "options": [
                "Ceftriaxone",
                "Piperacillin-tazobactam",
                "Azithromycin",
                "Vancomycin"
              ],
              "answer": "Piperacillin-tazobactam",
              "explanation": "Piperacillin-tazobactam provides broad-spectrum coverage for Klebsiella pneumoniae, including ESBL-producing strains, which are common in alcohol use disorder."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "List four (4) minor manifestations of acute rheumatic fever according to the Jones criteria.",
              "modelAnswer": "1. Fever; 2. Arthralgia (without arthritis); 3. Elevated erythrocyte sedimentation rate (ESR) or C-reactive protein (CRP); 4. Prolonged PR interval on electrocardiogram."
            },
            {
              "stem": "Outline four (4) symptoms and signs that should raise suspicion of viral pharyngitis.",
              "modelAnswer": "1. Cough; 2. Coryza (nasal congestion/runny nose); 3. Conjunctivitis; 4. Absence of fever or low-grade fever; 5. Presence of viral exanthem or oral ulcers."
            },
            {
              "stem": "A 35-year-old male with a history of treated pulmonary tuberculosis 3 years ago presents with 3 weeks of malaise, night sweats, and 5 kg weight loss. Sputum GeneXpert is positive for rifampicin-resistant Mycobacterium tuberculosis. Identify the diagnosis and design a five-drug treatment plan for this patient.",
              "modelAnswer": "Diagnosis: Multidrug-resistant tuberculosis (MDR-TB). Treatment plan: 1. Levofloxacin; 2. Bedaquiline; 3. Linezolid; 4. Clofazimine; 5. Pyrazinamide (or cycloserine if pyrazinamide-resistant). Duration: 18–24 months with directly observed therapy (DOT)."
            },
            {
              "stem": "Describe six (6) core elements of an antimicrobial stewardship program.",
              "modelAnswer": "1. Leadership commitment; 2. Accountability (designated stewardship leader); 3. Pharmacy expertise; 4. Action (e.g., preauthorization, prospective audit and feedback); 5. Tracking (antibiotic use and resistance patterns); 6. Reporting (to clinicians and hospital leadership); 7. Education (of clinicians and patients)."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 22-year-old university student is brought to the emergency department with a 24-hour history of fever, headache, and neck stiffness. On examination, she is confused, has a temperature of 39.5°C, a heart rate of 120 bpm, and a blood pressure of 90/50 mmHg. Petechial rash is noted on her trunk and extremities. Her Glasgow Coma Scale score is 13.  \n\n(a) Identify the most probable diagnosis and the likely causative organism. (2 marks)  \n(b) Justify your answer in (a) above. (3 marks)  \n(c) Describe three (3) investigations you would recommend to support your diagnosis. (3 marks)  \n(d) Review five (5) patient-related factors to consider when selecting empirical antimicrobial therapy. (5 marks)  \n(e) Propose an appropriate treatment plan for this patient. (4 marks)  \n(f) List two (2) complications you would be worried about in this patient. (1 mark)  \n(g) Explain how you would manage the contacts of this patient. (2 marks)",
              "modelAnswer": {
                "a": "Diagnosis: Meningococcal meningitis. Likely causative organism: Neisseria meningitidis.",
                "b": "The triad of fever, neck stiffness, and altered mental status is classic for meningitis. The petechial rash is highly suggestive of meningococcemia, caused by Neisseria meningitidis, which invades the bloodstream and meninges.",
                "c": "1. Lumbar puncture for cerebrospinal fluid (CSF) analysis (cell count, glucose, protein, Gram stain, culture); 2. Blood cultures; 3. PCR for Neisseria meningitidis from blood or CSF.",
                "d": "1. Age and immune status (young adults are at higher risk); 2. Hemodynamic instability (septic shock requiring vasopressors); 3. Presence of rash (suggests disseminated intravascular coagulation); 4. Renal function (risk of acute kidney injury); 5. Allergies or prior adverse drug reactions.",
                "e": "Empirical therapy: IV ceftriaxone 2g q12h (or IV chloramphenicol 1g q6h if penicillin-allergic). Add IV dexamethasone 0.15 mg/kg q6h for 4 days to reduce inflammation. Supportive care: IV fluids, vasopressors if needed, and close monitoring in ICU.",
                "f": "1. Septic shock with multi-organ failure; 2. Disseminated intravascular coagulation (DIC).",
                "g": "Close contacts (e.g., household members, intimate contacts) should receive chemoprophylaxis with oral ciprofloxacin 500mg single dose or rifampicin 600mg q12h for 2 days. Vaccination should be considered for close contacts if the strain is vaccine-preventable."
              }
            },
            {
              "stem": "Mr. JW, a 42-year-old male, presents to the emergency department with a 3-day history of fever, cough producing rusty sputum, pleuritic chest pain, and sudden onset of dyspnea. He returned from a conference 5 days ago where he frequently used whirlpool baths. On examination, his temperature is 38.8°C, respiratory rate is 33/min, SpO2 is 85% on room air, blood pressure is 100/68 mmHg, and heart rate is 110 bpm. Urea is 8.5 mmol/L.  \n\n(a) Identify the most likely diagnosis and the most likely causative organism. (2 marks)  \n(b) Justify your answer in (a) above. (6 points @0.5 marks each)  \n(c) Outline two (2) additional investigations you would recommend. (2 marks)  \n(d) Evaluate whether you would recommend treating this patient as an outpatient, inpatient (general ward), or in an intensive care unit. Justify your answer. (4 marks)  \n(e) Formulate a treatment plan for this patient. (5 marks)  \n(f) Using appropriate examples, examine how you would monitor for response to treatment. (4 marks)",
              "modelAnswer": {
                "a": "Diagnosis: Legionella pneumonia. Likely causative organism: Legionella pneumophila.",
                "b": "1. Exposure to whirlpool baths (risk factor for Legionella); 2. Sudden onset of high fever and systemic symptoms; 3. Rusty sputum and pleuritic chest pain; 4. Hypoxemia and tachypnea (severe CAP); 5. Elevated urea (suggests dehydration or sepsis); 6. Absence of typical CAP pathogens on Gram stain.",
                "c": "1. Legionella urinary antigen test; 2. Chest X-ray or CT scan to assess extent of pneumonia and complications (e.g., empyema).",
                "d": "Admission to ICU is warranted due to severe CAP with hypoxemia (SpO2 85%), tachypnea (RR 33/min), hypotension (BP 100/68 mmHg), and elevated urea (8.5 mmol/L), indicating high risk of respiratory failure and septic shock.",
                "e": "Treatment plan: IV azithromycin 500mg daily for 7–10 days (or IV levofloxacin 750mg daily if macrolide-intolerant). Add IV ceftriaxone 2g daily empirically for atypical and typical coverage until Legionella is confirmed. Supportive care: supplemental oxygen, IV fluids, and close monitoring for sepsis.",
                "f": "Monitoring: 1. Clinical parameters (temperature, respiratory rate, oxygen saturation); 2. Microbiological clearance (repeat sputum cultures or Legionella urinary antigen if initially positive); 3. Laboratory parameters (CRP, WBC count, urea, electrolytes); 4. Radiological improvement (repeat chest X-ray in 48–72 hours)."
              }
            }
          ]
        }
      ]
    }
  },
  "exam-cardiovascular-heme": {
    "1": {
      "title": "Clinical Pharmacy — Cardiovascular & Hematopoietic",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "Which physical sign is most specific for detecting mild to moderate anemia in a dark-skinned patient?",
              "options": [
                "Pallor of the conjunctiva",
                "Pallor of the sclera",
                "Pallor of the buccal mucosa",
                "Pallor of the tongue"
              ],
              "answer": "Pallor of the conjunctiva",
              "explanation": "Conjunctival pallor is the most reliable clinical sign for detecting mild to moderate anemia, particularly in dark-skinned individuals."
            },
            {
              "stem": "A 68-year-old male presents with a heart rate of 48 bpm. Which of the following medications is most likely responsible for his bradycardia?",
              "options": [
                "Amlodipine",
                "Digoxin",
                "Losartan",
                "Hydrochlorothiazide"
              ],
              "answer": "Digoxin",
              "explanation": "Digoxin slows atrioventricular conduction and increases vagal tone, leading to bradycardia."
            },
            {
              "stem": "A 55-year-old patient with a history of rheumatic heart disease presents with exertional dyspnea and fatigue. Which imaging modality is most appropriate to assess valvular structure and function?",
              "options": [
                "Chest X-ray",
                "Electrocardiogram (ECG)",
                "Echocardiography (ECHO)",
                "Cardiac MRI"
              ],
              "answer": "Echocardiography (ECHO)",
              "explanation": "Echocardiography is the gold standard for evaluating valvular structure, function, and hemodynamic consequences."
            },
            {
              "stem": "A patient’s blood pressure is recorded as 180/110 mmHg. What is the mean arterial pressure (MAP) in this patient?",
              "options": [
                "133 mmHg",
                "140 mmHg",
                "150 mmHg",
                "160 mmHg"
              ],
              "answer": "140 mmHg",
              "explanation": "MAP = (SBP + 2×DBP)/3 = (180 + 2×110)/3 = 140 mmHg."
            },
            {
              "stem": "A patient’s blood pressure is 138/92 mmHg. According to the WHO classification, this is classified as:",
              "options": [
                "Normal",
                "Pre-hypertension",
                "Stage 1 hypertension",
                "Stage 2 hypertension"
              ],
              "answer": "Stage 1 hypertension",
              "explanation": "Stage 1 hypertension is defined as SBP 140–159 mmHg or DBP 90–99 mmHg."
            },
            {
              "stem": "A 52-year-old diabetic patient with nephropathy has a blood pressure of 148/88 mmHg. What is the recommended blood pressure target for this patient?",
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
              "stem": "What is the most common cause of secondary hypertension?",
              "options": [
                "Aortic coarctation",
                "Renoparenchymal disease",
                "Primary hyperaldosteronism",
                "Cushing syndrome"
              ],
              "answer": "Renoparenchymal disease",
              "explanation": "Renoparenchymal disease (e.g., chronic kidney disease) is the most common cause of secondary hypertension."
            },
            {
              "stem": "Which antihypertensive agent is contraindicated in a patient with asthma?",
              "options": [
                "Amlodipine",
                "Labetalol",
                "Hydralazine",
                "Losartan"
              ],
              "answer": "Labetalol",
              "explanation": "Labetalol is a non-selective beta-blocker and can precipitate bronchospasm in asthmatic patients."
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
              "explanation": "Furosemide is a loop diuretic that rapidly reduces fluid overload in acute pulmonary edema."
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
              "explanation": "Thiazides can cause hyperglycemia, hyperlipidemia, and hyperuricemia, but not hypoglycemia."
            },
            {
              "stem": "Angiotensin-converting enzyme (ACE) inhibitors are contraindicated in all of the following EXCEPT:",
              "options": [
                "Bilateral renal artery stenosis",
                "First trimester of pregnancy",
                "Aortic stenosis",
                "Asthma"
              ],
              "answer": "Asthma",
              "explanation": "ACE inhibitors are not contraindicated in asthma; they may even be beneficial in some cases."
            },
            {
              "stem": "Acebutolol is classified as a:",
              "options": [
                "Non-selective beta-blocker",
                "Cardioselective beta-blocker",
                "Beta-blocker with vasodilatory properties",
                "Alpha-1 blocker"
              ],
              "answer": "Cardioselective beta-blocker",
              "explanation": "Acebutolol is a cardioselective beta-1 blocker with intrinsic sympathomimetic activity."
            },
            {
              "stem": "Which combination is most suitable for managing congestive cardiac failure?",
              "options": [
                "ACE inhibitor and furosemide",
                "Beta-blocker and thiazide diuretic",
                "Beta-blocker and ACE inhibitor",
                "Spironolactone and nitrate"
              ],
              "answer": "ACE inhibitor and furosemide",
              "explanation": "ACE inhibitors reduce afterload and mortality, while loop diuretics (e.g., furosemide) reduce fluid overload."
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
              "explanation": "Calcium channel blockers (e.g., verapamil, diltiazem) can cause AV block and negative inotropy leading to heart failure."
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
              "explanation": "Propranolol is a beta-blocker that reduces heart rate and counteracts reflex tachycardia."
            },
            {
              "stem": "The preferred medication for severe hypertension in pregnancy is:",
              "options": [
                "Methyldopa",
                "Hydralazine",
                "Nifedipine",
                "Enalapril"
              ],
              "answer": "Methyldopa",
              "explanation": "Methyldopa is the drug of choice for hypertension in pregnancy due to its safety profile."
            },
            {
              "stem": "Regarding hypertensive crisis:",
              "options": [
                "Hypertensive urgencies require immediate blood pressure reduction",
                "Hypertensive emergencies are managed with oral agents",
                "Immediate-release nifedipine is recommended for hypertensive emergencies",
                "Hypertensive emergencies are associated with end-organ damage"
              ],
              "answer": "Hypertensive emergencies are associated with end-organ damage",
              "explanation": "Hypertensive emergencies require immediate BP reduction to prevent organ damage; urgencies do not."
            },
            {
              "stem": "Which statement about dyslipidemias is UNTRUE?",
              "options": [
                "Diet and genetics play a role in their development",
                "They are major contributors to atherosclerosis and plaque formation",
                "Cholesterol screening should start as soon as cardiovascular disorders occur",
                "Pediatric screening is largely based on genetics and risk factors"
              ],
              "answer": "Cholesterol screening should start as soon as cardiovascular disorders occur",
              "explanation": "Cholesterol screening should begin in childhood (age 9–11) regardless of cardiovascular disease status."
            },
            {
              "stem": "Familial hypercholesterolemia is associated with:",
              "options": [
                "Normally functioning LDL receptors",
                "A defect in Apolipoprotein B-100",
                "A mutation in the gene coding for the LDL receptor",
                "A defect in Apolipoprotein E"
              ],
              "answer": "A mutation in the gene coding for the LDL receptor",
              "explanation": "Familial hypercholesterolemia is caused by mutations in the LDL receptor gene, leading to impaired LDL clearance."
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
              "explanation": "Prazosin is an alpha-1 blocker and is not associated with hyperlipidemia."
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
              "explanation": "Ezetimibe lowers LDL but does not significantly increase HDL levels."
            },
            {
              "stem": "HMG-CoA reductase inhibitors:",
              "options": [
                "Bind intestinal bile acids",
                "Are the most potent and among the best tolerated lipid-lowering agents",
                "Can be used in pregnancy",
                "Adverse effects include flushing and pruritus"
              ],
              "answer": "Are the most potent and among the best tolerated lipid-lowering agents",
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
              "explanation": "Prinzmetal’s (variant) angina is caused by coronary artery spasm and typically occurs at rest."
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
              "explanation": "Thiazides are not indicated for preventing ischemic symptoms; they are used for hypertension and edema."
            },
            {
              "stem": "Which statement about ischemic heart disease management is UNTRUE?",
              "options": [
                "Pharmacotherapy targets reduction in cardiac workload",
                "Statins should only be used in patients with elevated LDL levels",
                "ACE inhibitors have shown benefit in ischemic heart disease combined with hypertension",
                "Control of modifiable risk factors is important"
              ],
              "answer": "Statins should only be used in patients with elevated LDL levels",
              "explanation": "Statins are beneficial in ischemic heart disease regardless of baseline LDL levels due to pleiotropic effects."
            },
            {
              "stem": "Which statement about antiplatelet drugs in angina is UNTRUE?",
              "options": [
                "Aspirin reduces the risk of major adverse cardiac events",
                "Aspirin doses >162 mg have no additional therapeutic benefit",
                "Clopidogrel is preferred in aspirin allergy",
                "Combination of aspirin and clopidogrel is recommended in patients with stents"
              ],
              "answer": "Aspirin doses >162 mg have no additional therapeutic benefit",
              "explanation": "Higher aspirin doses (>162 mg) do not provide additional benefit and increase bleeding risk."
            },
            {
              "stem": "Which statement about short-acting nitrates in angina is TRUE?",
              "options": [
                "They have a delayed onset of action",
                "They can be used as maintenance therapy in chronic stable angina",
                "Adverse effects include lightheadedness",
                "They can be used in combination with phosphodiesterase enzyme inhibitors"
              ],
              "answer": "Adverse effects include lightheadedness",
              "explanation": "Short-acting nitrates cause vasodilation, leading to lightheadedness and hypotension."
            },
            {
              "stem": "Which statement about calcium channel blockers in angina is UNTRUE?",
              "options": [
                "They can be used with beta blockers when initial treatment is unsuccessful",
                "They are recommended when beta blockers are contraindicated",
                "Combination of dihydropyridines and beta blockers may improve symptoms",
                "None of the above"
              ],
              "answer": "None of the above",
              "explanation": "All statements are true; calcium channel blockers can be combined with beta blockers for angina management."
            },
            {
              "stem": "Symptoms of left heart failure include all EXCEPT:",
              "options": [
                "Fatigue",
                "Nocturia",
                "Dyspnea",
                "Cough"
              ],
              "answer": "Nocturia",
              "explanation": "Nocturia is more characteristic of right heart failure due to fluid redistribution at night."
            },
            {
              "stem": "Hepatomegaly in congestive cardiac failure is a sign of:",
              "options": [
                "Left heart failure",
                "Right heart failure",
                "Both left and right heart failure",
                "Aortic incompetence"
              ],
              "answer": "Right heart failure",
              "explanation": "Hepatomegaly occurs in right heart failure due to hepatic venous congestion."
            },
            {
              "stem": "Clinical manifestations of left heart failure include:",
              "options": [
                "Oedema",
                "Dyspnea",
                "Elevated jugular venous pressure",
                "B and C"
              ],
              "answer": "B and C",
              "explanation": "Dyspnea and elevated jugular venous pressure are signs of left heart failure."
            },
            {
              "stem": "Precipitating factors for heart failure include all EXCEPT:",
              "options": [
                "Anemia",
                "Pregnancy",
                "Well-controlled hypertension",
                "Doxorubicin use"
              ],
              "answer": "Well-controlled hypertension",
              "explanation": "Well-controlled hypertension is not a precipitating factor; uncontrolled hypertension is."
            },
            {
              "stem": "Which agent can be used in combination with loop diuretics in heart failure management?",
              "options": [
                "Chlorthalidone",
                "Ethacrynic acid",
                "Metolazone",
                "Bumetanide"
              ],
              "answer": "Metolazone",
              "explanation": "Metolazone is a thiazide-like diuretic often combined with loop diuretics for refractory edema."
            },
            {
              "stem": "A beneficial effect of spironolactone in heart failure is:",
              "options": [
                "It lowers the heart rate",
                "It increases potassium levels",
                "It prevents ventricular remodeling",
                "It increases blood volume"
              ],
              "answer": "It prevents ventricular remodeling",
              "explanation": "Spironolactone reduces aldosterone-mediated cardiac fibrosis and remodeling."
            },
            {
              "stem": "Effects of ACE inhibitors in heart failure include all EXCEPT:",
              "options": [
                "Slow ventricular remodeling",
                "Lower heart rate",
                "Prevent myocardial fibrosis",
                "Lower peripheral resistance"
              ],
              "answer": "Lower heart rate",
              "explanation": "ACE inhibitors reduce afterload and remodeling but do not directly lower heart rate."
            },
            {
              "stem": "Beneficial effects of beta blockers in heart failure include all EXCEPT:",
              "options": [
                "Reversing left ventricular remodeling",
                "Promoting plasma renin release",
                "Improving left ventricular systolic function",
                "Decreasing heart rate"
              ],
              "answer": "Promoting plasma renin release",
              "explanation": "Beta blockers reduce renin release via beta-1 blockade, which is beneficial in heart failure."
            },
            {
              "stem": "Regarding myocardial infarction:",
              "options": [
                "NSTEMI involves the entire thickness of the myocardial wall",
                "Premenopausal women are at higher risk",
                "STEMI involves the entire thickness of the myocardial wall",
                "None of the above is true"
              ],
              "answer": "STEMI involves the entire thickness of the myocardial wall",
              "explanation": "STEMI (ST-elevation MI) involves full-thickness myocardial necrosis, whereas NSTEMI does not."
            },
            {
              "stem": "Regarding cardiac biomarkers:",
              "options": [
                "Myoglobin is highly specific for cardiac injury",
                "Troponin is highly specific for MI",
                "CK-MB is more reliable than troponin",
                "None of the above"
              ],
              "answer": "Troponin is highly specific for MI",
              "explanation": "Troponin I/T is highly specific for myocardial injury and is the preferred biomarker for MI."
            },
            {
              "stem": "A 75-year-old man presents with chest pain, BP 200/105 mmHg, and symptoms lasting 10 hours. Which statement is correct?",
              "options": [
                "He is not having an MI",
                "Pain could be relieved with a single dose of ASA 325 mg",
                "Pain could be managed with morphine sulfate 2–5 mg IV q5–15min",
                "There is no need to treat pain associated with MI"
              ],
              "answer": "Pain could be managed with morphine sulfate 2–5 mg IV q5–15min",
              "explanation": "Morphine is used for severe pain in MI; ASA 325 mg is standard antiplatelet therapy."
            },
            {
              "stem": "If nitroglycerin (NTG) is used for acute MI management, which statement is correct?",
              "options": [
                "NTG is contraindicated in MI",
                "Sublingual NTG is contraindicated in MI",
                "Give a single sublingual dose only on admission",
                "Give intravenous NTG beginning with 10–20 µg/min"
              ],
              "answer": "Give intravenous NTG beginning with 10–20 µg/min",
              "explanation": "IV NTG is used for ongoing ischemia in MI, starting at 10–20 µg/min and titrating."
            },
            {
              "stem": "Should metoprolol be used in this patient’s MI management?",
              "options": [
                "Yes; it minimizes signs/symptoms of ischemia",
                "No; it is contraindicated because he is receiving nitroglycerin",
                "No; it is used only if the patient had received tissue plasminogen activator",
                "No; it is contraindicated because his resting heart rate is >100 bpm"
              ],
              "answer": "Yes; it minimizes signs/symptoms of ischemia",
              "explanation": "Metoprolol (beta-1 selective) reduces myocardial oxygen demand and ischemia in MI."
            },
            {
              "stem": "Causes of arrhythmias include all EXCEPT:",
              "options": [
                "Myocardial infarction",
                "Thyroid disorders",
                "Young age",
                "Excess alcohol consumption"
              ],
              "answer": "Young age",
              "explanation": "Young age is not a cause of arrhythmias; aging increases risk due to structural changes."
            },
            {
              "stem": "Which is a Class II antiarrhythmic agent?",
              "options": [
                "Sotalol",
                "Procainamide",
                "Diltiazem",
                "Metoprolol"
              ],
              "answer": "Metoprolol",
              "explanation": "Metoprolol is a beta-blocker (Class II) used for rate control in arrhythmias."
            },
            {
              "stem": "When monitoring a patient on chronic oral amiodarone, which test is essential?",
              "options": [
                "Chest X-ray",
                "Thyroid function tests",
                "Liver function tests",
                "Ophthalmic examinations"
              ],
              "answer": "Thyroid function tests",
              "explanation": "Amiodarone causes thyroid dysfunction (hypo- or hyperthyroidism), requiring monitoring."
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
              "explanation": "Propafenone is a Vaughan-Williams Class Ic (sodium channel blocker) and has beta-blocking (Class II) properties."
            },
            {
              "stem": "The drug of choice for terminating paroxysmal supraventricular tachycardia is:",
              "options": [
                "Lidocaine",
                "Procainamide",
                "Adenosine",
                "Digoxin"
              ],
              "answer": "Adenosine",
              "explanation": "Adenosine is the first-line agent for terminating PSVT due to its rapid onset and short duration."
            },
            {
              "stem": "Anemia may present with all EXCEPT:",
              "options": [
                "Pallor",
                "Tachycardia",
                "Papilledema",
                "Dizziness"
              ],
              "answer": "Papilledema",
              "explanation": "Papilledema is not a typical sign of anemia; it suggests increased intracranial pressure."
            },
            {
              "stem": "Iron deficiency anemia:",
              "options": [
                "May be associated with chronic intake of drugs lowering gastric pH",
                "May lead to loss of vibration sense",
                "May be due to chronic hemorrhage",
                "May be due to acute hemorrhage"
              ],
              "answer": "May be due to chronic hemorrhage",
              "explanation": "Chronic blood loss (e.g., GI bleeding) is a common cause of iron deficiency anemia."
            },
            {
              "stem": "Management of anemia of chronic disease entails:",
              "options": [
                "Oral iron therapy",
                "Blood transfusion",
                "Treating the underlying chronic condition",
                "None of the above"
              ],
              "answer": "Treating the underlying chronic condition",
              "explanation": "Treating the underlying disease (e.g., CKD, inflammation) is the primary management strategy."
            },
            {
              "stem": "Management of sideroblastic anemia is with:",
              "options": [
                "High doses of Vitamin C >200 mg",
                "Desferrioxamine and low doses of Vitamin C <200 mg",
                "Desferrioxamine and high doses of Vitamin C >200 mg",
                "None of the above"
              ],
              "answer": "Desferrioxamine and low doses of Vitamin C <200 mg",
              "explanation": "Desferrioxamine chelates iron, and low-dose Vitamin C (≤200 mg) enhances iron excretion."
            },
            {
              "stem": "The principal biochemical defect in sickle hemoglobin involves the substitution of:",
              "options": [
                "Phenylalanine for lysine",
                "Valine for glutamic acid",
                "Glutamic acid for alanine",
                "Proline for cysteine"
              ],
              "answer": "Valine for glutamic acid",
              "explanation": "Sickle hemoglobin (HbS) results from a valine substitution for glutamic acid at position 6 of the beta-globin chain."
            },
            {
              "stem": "The principal goal of hydroxyurea therapy is to:",
              "options": [
                "Decrease circulating S hemoglobin",
                "Increase polymerization of S hemoglobin",
                "Decrease circulating F hemoglobin",
                "Increase adhesive properties of red cells"
              ],
              "answer": "Decrease circulating S hemoglobin",
              "explanation": "Hydroxyurea increases fetal hemoglobin (HbF), which reduces HbS polymerization and sickling."
            },
            {
              "stem": "In the management of hemophilia:",
              "options": [
                "Immunomodulators have not shown benefit",
                "Vaccination against hepatitis A and B is done regularly",
                "Recombinant factors are cheaper than plasma-derived concentrates",
                "None of the above"
              ],
              "answer": "Vaccination against hepatitis A and B is done regularly",
              "explanation": "Patients with hemophilia require hepatitis A and B vaccination due to frequent blood product exposure."
            },
            {
              "stem": "Disseminated intravascular coagulation (DIC) is managed using all EXCEPT:",
              "options": [
                "Dermatan sulfate",
                "Lepirudin",
                "Warfarin",
                "Heparin"
              ],
              "answer": "Warfarin",
              "explanation": "Warfarin is contraindicated in DIC due to its delayed onset and risk of bleeding."
            },
            {
              "stem": "Which statement is TRUE regarding prophylaxis of venous thromboembolism (VTE)?",
              "options": [
                "Low-dose UFH provides improved protection compared to LMWHs",
                "Ambulation as soon as possible post-surgery lowers VTE risk significantly",
                "Fondaparinux 2.5 mg SC daily is supported for hospitalized general/surgical patients",
                "None of the above"
              ],
              "answer": "Fondaparinux 2.5 mg SC daily is supported for hospitalized general/surgical patients",
              "explanation": "Fondaparinux is recommended for VTE prophylaxis in hospitalized patients at moderate to high risk."
            },
            {
              "stem": "Graduated compression stockings are:",
              "options": [
                "Not well tolerated by the majority of patients",
                "An appropriate VTE prevention strategy for patients at moderate risk",
                "An expensive strategy for VTE prevention",
                "Ineffective when used with pharmacologic VTE prophylaxis"
              ],
              "answer": "An appropriate VTE prevention strategy for patients at moderate risk",
              "explanation": "Graduated compression stockings are recommended for moderate-risk patients and are well tolerated."
            },
            {
              "stem": "In long-term management of VTE:",
              "options": [
                "Anticoagulation should be continued for a minimum of 6 months",
                "UFH is safer and efficacious in cancer patients and pregnant women",
                "Warfarin can be used alongside a parenteral agent",
                "None of the above"
              ],
              "answer": "Anticoagulation should be continued for a minimum of 6 months",
              "explanation": "Standard duration for VTE treatment is at least 3 months, with extended therapy (6+ months) for high-risk patients."
            },
            {
              "stem": "Which statement about warfarin is UNTRUE?",
              "options": [
                "It has no effect on circulating anticoagulants that have previously been formed",
                "It should only be administered when systematic monitoring is available",
                "It achieves its full antithrombotic effect immediately",
                "For general surgery, prophylaxis can be discontinued when the patient can ambulate regularly"
              ],
              "answer": "It achieves its full antithrombotic effect immediately",
              "explanation": "Warfarin has a delayed onset of action (days) due to the time required to deplete vitamin K-dependent clotting factors."
            },
            {
              "stem": "Which sign or symptom is NOT consistent with deep vein thrombosis (DVT)?",
              "options": [
                "Palpable cord in the leg",
                "Redness and warmth in the leg",
                "Pain on dorsiflexion of the foot (Homans’ sign)",
                "Very swollen ankles"
              ],
              "answer": "Very swollen ankles",
              "explanation": "While swelling can occur in DVT, very swollen ankles are more suggestive of chronic venous insufficiency or lymphedema."
            },
            {
              "stem": "Regarding hemophilia:",
              "options": [
                "Female carriers have a slight bleeding tendency",
                "It presents as nerve compression",
                "Hemophilia A involves factor IX deficiency",
                "Hemophilia B involves factor VIII deficiency"
              ],
              "answer": "Female carriers have a slight bleeding tendency",
              "explanation": "Female carriers of hemophilia may have mild bleeding tendencies due to lyonization (X-chromosome inactivation)."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "List two classes of drugs used in dyslipidemias, stating the mode of action of each.",
              "modelAnswer": "1. HMG-CoA reductase inhibitors (statins): Inhibit HMG-CoA reductase, reducing hepatic cholesterol synthesis and increasing LDL receptor expression, leading to enhanced LDL clearance.\n2. Fibric acid derivatives (e.g., fenofibrate): Activate peroxisome proliferator-activated receptor-alpha (PPAR-α), increasing lipoprotein lipase activity, reducing triglycerides, and increasing HDL."
            },
            {
              "stem": "Discuss the management of hemolytic-uremic syndrome (HUS).",
              "modelAnswer": "Management of HUS is supportive and includes:\n- Fluid and electrolyte balance (avoid fluid overload).\n- Blood transfusions if severe anemia.\n- Dialysis for acute kidney injury (AKI) with severe uremia or electrolyte imbalances.\n- Avoid antibiotics in typical HUS (may worsen outcomes); supportive care only.\n- Monitor for complications (e.g., hypertension, seizures).\n- Plasma exchange may be considered in atypical HUS (TTP-like presentations)."
            },
            {
              "stem": "Briefly describe the different types of angina.",
              "modelAnswer": "1. Stable angina: Predictable chest pain on exertion, relieved by rest or nitrates; due to fixed coronary artery stenosis.\n2. Unstable angina: New-onset, worsening, or occurring at rest; high risk of MI; caused by plaque rupture and thrombus formation.\n3. Prinzmetal (variant) angina: Occurs at rest, often nocturnally; caused by coronary artery spasm; responds to nitrates and calcium channel blockers.\n4. Microvascular angina: Angina with normal coronary arteries; due to endothelial dysfunction and microvascular spasms."
            },
            {
              "stem": "Outline the management of a patient diagnosed with iron deficiency anemia.",
              "modelAnswer": "1. Identify and treat the underlying cause (e.g., GI bleeding, dietary deficiency).\n2. Oral iron therapy: Ferrous sulfate 325 mg (60 mg elemental iron) TID; take on empty stomach for absorption; continue for 3–6 months post-correction.\n3. Parenteral iron (e.g., iron dextran, ferric carboxymaltose) if oral therapy is ineffective or poorly tolerated.\n4. Dietary counseling: Increase iron-rich foods (meat, leafy greens) and vitamin C to enhance absorption.\n5. Monitor hemoglobin, reticulocyte count, and ferritin; assess for resolution of symptoms (fatigue, pallor)."
            },
            {
              "stem": "Give two examples of angiotensin-converting enzyme (ACE) inhibitors; what are some adverse effects of this class of antihypertensives?",
              "modelAnswer": "Examples: Enalapril, Lisinopril.\nAdverse effects:\n- Dry cough (due to bradykinin accumulation).\n- Hyperkalemia (reduced aldosterone).\n- Acute kidney injury (especially with bilateral renal artery stenosis).\n- Angioedema (rare but serious).\n- Teratogenicity (contraindicated in pregnancy)."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "M.O, a 65-year-old known hypertensive patient with a history of coronary artery disease and type 2 diabetes mellitus, presents to hospital. His presenting complaint is breathlessness and easy fatiguability, which occur with short distances, climbing stairs, and when lying flat. He uses two pillows to sleep. On examination, his ankles are swollen, he no longer wears closed shoes, and he reports early satiety and nausea. \n\na) Based on this information, what diagnosis would you make?\n\nb) What tests would you request to confirm the diagnosis?\n\nc) What factors would precipitate symptoms of this disease?\n\nd) Outline a pharmaceutical care plan for M.O.",
              "modelAnswer": "a) Diagnosis: Congestive heart failure (CHF) with reduced ejection fraction (HFrEF), likely due to hypertensive heart disease and coronary artery disease, complicated by volume overload (pulmonary and peripheral edema).\n\nb) Diagnostic tests:\n- Echocardiography (ECHO): To assess left ventricular ejection fraction (LVEF), valvular function, and structural abnormalities.\n- Electrocardiogram (ECG): To evaluate for ischemic changes, arrhythmias, or left ventricular hypertrophy.\n- Chest X-ray: To assess for pulmonary congestion, cardiomegaly, or pleural effusions.\n- Serum B-type natriuretic peptide (BNP) or N-terminal pro-BNP (NT-proBNP): Elevated levels support heart failure diagnosis.\n- Basic metabolic panel (BMP): To assess renal function, electrolytes (especially potassium and sodium), and rule out acute kidney injury.\n- Liver function tests (LFTs): To evaluate hepatic congestion.\n- Thyroid function tests (TFTs): To rule out thyroid dysfunction as a precipitating factor.\n- Coronary angiography (if not recently performed): To assess for ischemic cardiomyopathy.\n\nc) Precipitating factors for CHF symptoms:\n- Non-adherence to medications (e.g., ACE inhibitors, beta-blockers, diuretics).\n- Excessive sodium or fluid intake.\n- Uncontrolled hypertension.\n- Myocardial ischemia or infarction.\n- Arrhythmias (e.g., atrial fibrillation).\n- Anemia (increased cardiac workload).\n- Infections (e.g., pneumonia, sepsis).\n- Medications: NSAIDs (fluid retention), corticosteroids, or negative inotropes (e.g., verapamil).\n- Worsening renal function or electrolyte imbalances (e.g., hyperkalemia, hyponatremia).\n\nd) Pharmaceutical care plan for M.O.:\n\n1. Optimize guideline-directed medical therapy (GDMT):\n   - Continue ACE inhibitor (e.g., enalapril) or switch to ARB (e.g., losartan) if ACE inhibitor cough is intolerable; monitor renal function and potassium.\n   - Add or uptitrate beta-blocker (e.g., bisoprolol) to target dose (e.g., 10 mg daily) for HFrEF, ensuring no contraindications (e.g., acute decompensation, bradycardia).\n   - Add mineralocorticoid receptor antagonist (e.g., spironolactone 25 mg daily) if LVEF ≤35% and symptomatic despite ACE inhibitor/beta-blocker; monitor potassium and renal function.\n   - Loop diuretic (e.g., furosemide 40 mg daily) for fluid overload; adjust dose based on weight and symptoms; monitor electrolytes (potassium, magnesium).\n\n2. Address comorbidities:\n   - Optimize glycemic control in diabetes (e.g., metformin if eGFR >30 mL/min, SGLT2 inhibitor if tolerated).\n   - Manage hypertension to target BP <130/80 mmHg.\n   - Consider statin therapy for secondary prevention of coronary artery disease.\n\n3. Patient education and lifestyle modifications:\n   - Sodium restriction (<2 g/day) and fluid restriction (1.5–2 L/day if hyponatremic).\n   - Daily weight monitoring; report weight gain >2 kg in 3 days.\n   - Moderate exercise (e.g., walking) as tolerated; cardiac rehabilitation if available.\n   - Smoking cessation and alcohol moderation.\n   - Medication adherence counseling (e.g., pill organizers, blister packs).\n\n4. Monitoring and follow-up:\n   - Clinic visits every 1–3 months initially, then every 6 months if stable.\n   - Labs: BMP (including potassium, creatinine) every 3–6 months; BNP/NT-proBNP as needed.\n   - ECHO every 6–12 months or if clinical deterioration.\n   - Assess for signs of decompensation (e.g., dyspnea, edema, weight gain).\n\n5. Address barriers to care:\n   - Social support (e.g., caregiver assistance, home health services).\n   - Financial assistance for medications (e.g., patient assistance programs).\n   - Referral to cardiology or heart failure specialist if refractory symptoms or advanced disease."
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Clinical Pharmacy — Cardiovascular & Hematopoietic",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "A 68-year-old woman presents with fatigue and exertional dyspnea. On examination, her conjunctivae appear pale. Which of the following is the MOST reliable site for detecting anemia in this patient?",
              "options": [
                "Sclera",
                "Conjunctiva",
                "Cornea",
                "Retina"
              ],
              "answer": "Conjunctiva",
              "explanation": "The conjunctiva is the most reliable site for detecting pallor due to anemia, as it is easily accessible and reflects systemic hemoglobin levels."
            },
            {
              "stem": "Which of the following medications is MOST likely to cause bradycardia as a side effect?",
              "options": [
                "Amlodipine",
                "Digoxin",
                "Furosemide",
                "Simvastatin"
              ],
              "answer": "Digoxin",
              "explanation": "Digoxin slows conduction through the atrioventricular node, leading to bradycardia, especially in toxic concentrations."
            },
            {
              "stem": "A 55-year-old man with a history of hypertension and diabetes presents with new-onset dyspnea. An echocardiogram is ordered to evaluate for valvular or structural heart disease. Which of the following is the MOST appropriate initial imaging modality for detecting valvular abnormalities?",
              "options": [
                "ECG",
                "MRI",
                "ECHO",
                "CXR"
              ],
              "answer": "ECHO",
              "explanation": "Echocardiography (ECHO) is the gold standard for assessing valvular and structural heart disease due to its ability to visualize cardiac anatomy and function in real-time."
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
              "explanation": "MAP is calculated as diastolic BP + 1/3(pulse pressure). Here, MAP = 90 + 1/3(150-90) = 90 + 20 = 110 mmHg."
            },
            {
              "stem": "A 45-year-old patient's blood pressure is recorded as 138/88 mmHg. According to the JNC 8 classification, this patient falls into which category?",
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
              "stem": "A 60-year-old diabetic patient with nephropathy has a blood pressure of 145/85 mmHg. What is the recommended target blood pressure for this patient?",
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
              "stem": "A 50-year-old asthmatic patient requires antihypertensive therapy. Which of the following agents is CONTRAINDICATED in this patient?",
              "options": [
                "Sodium nitroprusside",
                "Labetalol",
                "Hydralazine",
                "None of the above"
              ],
              "answer": "Labetalol",
              "explanation": "Labetalol is a non-selective beta-blocker and is contraindicated in asthma due to the risk of bronchospasm."
            },
            {
              "stem": "A 70-year-old man presents with acute pulmonary edema secondary to heart failure. Which of the following is the MOST appropriate initial therapy?",
              "options": [
                "Loop diuretics",
                "Thiazide diuretics",
                "Potassium-sparing diuretics",
                "Osmotic diuretics"
              ],
              "answer": "Loop diuretics",
              "explanation": "Loop diuretics (e.g., furosemide) are the drug of choice for reducing acute pulmonary edema due to their rapid onset and potent diuretic effect."
            },
            {
              "stem": "A patient on hydrochlorothiazide develops hyperuricemia. Which of the following is the MOST likely adverse effect of thiazide diuretics responsible for this finding?",
              "options": [
                "Hyperglycemia",
                "Hyperlipidemia",
                "Hyperuricemia",
                "Hypoglycemia"
              ],
              "answer": "Hyperuricemia",
              "explanation": "Thiazide diuretics can cause hyperuricemia by increasing uric acid reabsorption in the proximal tubule."
            },
            {
              "stem": "Which of the following is NOT a contraindication for angiotensin-converting enzyme (ACE) inhibitors?",
              "options": [
                "Aortic stenosis",
                "Renal artery stenosis",
                "First trimester of pregnancy",
                "Asthma"
              ],
              "answer": "Asthma",
              "explanation": "ACE inhibitors are not contraindicated in asthma. They are contraindicated in aortic stenosis, renal artery stenosis, and pregnancy."
            },
            {
              "stem": "Acebutolol is classified as which type of beta-blocker?",
              "options": [
                "Cardio-selective beta-blocker",
                "Non-selective beta-blocker",
                "Beta-blocker with vasodilatory properties",
                "None of the above"
              ],
              "answer": "Cardio-selective beta-blocker",
              "explanation": "Acebutolol is a cardioselective beta-blocker with partial agonist activity."
            },
            {
              "stem": "A 65-year-old man with heart failure is prescribed ACE inhibitors and furosemide. Which of the following combinations is MOST appropriate for managing his condition?",
              "options": [
                "ACEI and furosemide",
                "A beta-blocker and a thiazide diuretic",
                "A beta-blocker and an ACEI",
                "Spironolactone and a nitrate"
              ],
              "answer": "ACEI and furosemide",
              "explanation": "ACE inhibitors reduce afterload and mortality, while loop diuretics (e.g., furosemide) reduce fluid overload in heart failure."
            },
            {
              "stem": "A patient on verapamil develops bradycardia and hypotension. Which of the following is the MOST likely toxic effect of calcium channel blockers in this scenario?",
              "options": [
                "Tachycardia",
                "Atrioventricular block and congestive heart failure",
                "Hyperkalemia",
                "Hyperglycemia"
              ],
              "answer": "Atrioventricular block and congestive heart failure",
              "explanation": "Calcium channel blockers (e.g., verapamil) can cause AV block and negative inotropic effects, leading to bradycardia and heart failure."
            },
            {
              "stem": "Reflex tachycardia is commonly seen with the use of which of the following medications?",
              "options": [
                "Hydralazine",
                "Prazosin",
                "Propranolol",
                "Minoxidil"
              ],
              "answer": "Minoxidil",
              "explanation": "Minoxidil is a vasodilator that causes reflex tachycardia due to its potent arteriolar dilation effect."
            },
            {
              "stem": "Which of the following is the PREFERRED medication for severe hypertension in pregnancy?",
              "options": [
                "Methyldopa",
                "Hydralazine",
                "Nifedipine",
                "Enalapril"
              ],
              "answer": "Methyldopa",
              "explanation": "Methyldopa is the preferred antihypertensive in pregnancy due to its safety profile and proven efficacy."
            },
            {
              "stem": "Regarding hypertensive crisis, which of the following statements is TRUE?",
              "options": [
                "Urgencies are associated with end-organ damage",
                "Immediate blood pressure reduction is recommended in hypertensive urgencies",
                "Hypertensive emergency is managed using IV therapy",
                "Immediate-release nifedipine should be used"
              ],
              "answer": "Hypertensive emergency is managed using IV therapy",
              "explanation": "Hypertensive emergencies require immediate BP reduction with IV agents (e.g., nitroprusside, labetalol) to prevent end-organ damage."
            },
            {
              "stem": "Which of the following statements about dyslipidemias is UNTRUE?",
              "options": [
                "Diet and genetics play a role",
                "They are major players in atherosclerosis and plaque formation",
                "Cholesterol screening should start as soon as cardiovascular disorders occur",
                "Pediatric screening is largely based on genetics and risk factors"
              ],
              "answer": "Cholesterol screening should start as soon as cardiovascular disorders occur",
              "explanation": "Cholesterol screening should begin in childhood (age 9-11) and continue periodically, not only after cardiovascular disorders occur."
            },
            {
              "stem": "Familial hypercholesterolemia is associated with a defect in which of the following?",
              "options": [
                "Apolipoprotein B-100",
                "LDL receptor",
                "Apolipoprotein E",
                "Phenylalanine for lysine substitution"
              ],
              "answer": "LDL receptor",
              "explanation": "Familial hypercholesterolemia is caused by a mutation in the LDL receptor gene, leading to impaired LDL clearance."
            },
            {
              "stem": "Which of the following drugs is NOT associated with hyperlipidemia?",
              "options": [
                "Cyclosporine",
                "Protease inhibitors",
                "Prazosin",
                "Isotretinoin"
              ],
              "answer": "Prazosin",
              "explanation": "Prazosin is an alpha-blocker and is not associated with hyperlipidemia. Cyclosporine, protease inhibitors, and isotretinoin can cause dyslipidemias."
            },
            {
              "stem": "HDL levels can be increased by all of the following EXCEPT:",
              "options": [
                "Exercise",
                "Use of ezetimibe",
                "Use of niacin",
                "Diets high in polyunsaturated fatty acids"
              ],
              "answer": "Use of ezetimibe",
              "explanation": "Ezetimibe lowers LDL cholesterol but does not significantly increase HDL levels. Exercise, niacin, and polyunsaturated fats can raise HDL."
            },
            {
              "stem": "HMG-CoA reductase inhibitors (statins) have which of the following properties?",
              "options": [
                "Bind intestinal bile acids",
                "Are the most potent and among best tolerated",
                "Can be used in pregnancy",
                "Adverse effects include flushing and pruritus"
              ],
              "answer": "Are the most potent and among best tolerated",
              "explanation": "Statins are the most potent LDL-lowering agents and are generally well-tolerated, though they can cause myopathy and hepatotoxicity."
            },
            {
              "stem": "Which of the following statements about angina is TRUE?",
              "options": [
                "Prinzmetal’s angina occurs at rest, especially in the early morning hours",
                "Stable angina occurs at rest",
                "Symptoms of unstable angina are relieved by rest",
                "Stable angina requires hospital admission and aggressive therapy"
              ],
              "answer": "Prinzmetal’s angina occurs at rest, especially in the early morning hours",
              "explanation": "Prinzmetal’s (variant) angina is caused by coronary artery spasm and typically occurs at rest, often early in the morning."
            },
            {
              "stem": "Which of the following drugs is NOT used to prevent recurrent ischemic symptoms?",
              "options": [
                "Calcium channel blockers",
                "Beta blockers",
                "Thiazide diuretics",
                "Nitrates"
              ],
              "answer": "Thiazide diuretics",
              "explanation": "Thiazide diuretics are not used for preventing recurrent ischemic symptoms. Calcium blockers, beta-blockers, and nitrates are used for this purpose."
            },
            {
              "stem": "Which of the following statements about the clinical management of ischemic heart disease is FALSE?",
              "options": [
                "Pharmacotherapy targets a reduction in cardiac workload",
                "Statins should only be used in patients with elevated LDL levels",
                "ACEIs have shown benefit in ischemic heart disease combined with hypertension",
                "Control of modifiable risk factors is important in the management of ischemic heart disease"
              ],
              "answer": "Statins should only be used in patients with elevated LDL levels",
              "explanation": "Statins are used in all patients with ischemic heart disease, regardless of LDL levels, due to their pleiotropic effects (e.g., anti-inflammatory, plaque stabilization)."
            },
            {
              "stem": "Which of the following statements about antiplatelet drugs in angina is FALSE?",
              "options": [
                "Aspirin has been shown to reduce the risk of major adverse cardiac events",
                "Aspirin doses greater than 162 mg have therapeutic benefit",
                "Clopidogrel is preferred in aspirin allergy or intolerance",
                "Combination of both aspirin and clopidogrel is recommended in patients with stents to prevent in-stent thrombosis"
              ],
              "answer": "Aspirin doses greater than 162 mg have therapeutic benefit",
              "explanation": "Higher doses of aspirin (>162 mg) do not provide additional benefit and increase bleeding risk. The optimal dose is 75-162 mg daily."
            },
            {
              "stem": "Which of the following statements about short-acting nitrates in angina is TRUE?",
              "options": [
                "They have a delayed onset of action",
                "They can be used as maintenance therapy in chronic stable angina",
                "Adverse effects include lightheadedness",
                "They can be used in combination with phosphodiesterase enzyme inhibitors"
              ],
              "answer": "Adverse effects include lightheadedness",
              "explanation": "Short-acting nitrates (e.g., sublingual nitroglycerin) have a rapid onset (1-5 minutes) and can cause lightheadedness due to vasodilation."
            },
            {
              "stem": "Which of the following statements about calcium channel blockers in angina is FALSE?",
              "options": [
                "They can be used with beta blockers when initial treatment is unsuccessful",
                "They are recommended when beta blockers are contraindicated",
                "Combination of dihydropyridines and beta blockers may improve symptoms",
                "None of the above"
              ],
              "answer": "None of the above",
              "explanation": "All statements are true. Calcium channel blockers (e.g., amlodipine) can be combined with beta-blockers for angina, especially if initial therapy fails."
            },
            {
              "stem": "Which of the following is NOT a symptom of left heart failure?",
              "options": [
                "Fatigue",
                "Nocturia",
                "Dyspnea",
                "Cough"
              ],
              "answer": "Nocturia",
              "explanation": "Nocturia is a symptom of right heart failure due to fluid redistribution. Left heart failure symptoms include dyspnea, cough, and fatigue."
            },
            {
              "stem": "Hepatomegaly in congestive cardiac failure is a sign of which type of heart failure?",
              "options": [
                "Left heart failure",
                "Right heart failure",
                "Both A and B",
                "Aortic incompetence"
              ],
              "answer": "Right heart failure",
              "explanation": "Hepatomegaly occurs in right heart failure due to increased central venous pressure and hepatic congestion."
            },
            {
              "stem": "Which of the following is NOT a clinical manifestation of left heart failure?",
              "options": [
                "Oedema",
                "Dyspnoea",
                "Elevated jugular venous pressure",
                "A and C"
              ],
              "answer": "Oedema",
              "explanation": "Oedema is a sign of right heart failure. Left heart failure manifestations include dyspnea, elevated JVP, and pulmonary congestion."
            },
            {
              "stem": "Which of the following is NOT a precipitating factor for heart failure?",
              "options": [
                "Anemia",
                "Pregnancy",
                "Well controlled hypertension",
                "Use of doxorubicin"
              ],
              "answer": "Well controlled hypertension",
              "explanation": "Well-controlled hypertension is not a precipitating factor for heart failure. Anemia, pregnancy, and doxorubicin (cardiotoxic) can precipitate heart failure."
            },
            {
              "stem": "Which of the following agents can be used in combination with loop diuretics in the management of heart failure?",
              "options": [
                "Chlorthalidone",
                "Ethacrynic acid",
                "Metolazone",
                "Bumetanide"
              ],
              "answer": "Metolazone",
              "explanation": "Metolazone is a thiazide-like diuretic that can be combined with loop diuretics to enhance diuresis in resistant edema."
            },
            {
              "stem": "Which of the following is a beneficial effect of spironolactone in heart failure?",
              "options": [
                "It lowers the heart rate",
                "It increases potassium levels",
                "It prevents ventricular remodeling",
                "It increases blood volume"
              ],
              "answer": "It prevents ventricular remodeling",
              "explanation": "Spironolactone blocks aldosterone, preventing ventricular remodeling and improving survival in heart failure."
            },
            {
              "stem": "Which of the following is NOT an effect of ACE inhibitors in heart failure?",
              "options": [
                "Slow down ventricular remodeling",
                "Lower the heart rate",
                "Prevent myocardial fibrosis",
                "Lower the peripheral resistance"
              ],
              "answer": "Lower the heart rate",
              "explanation": "ACE inhibitors do not lower heart rate directly. They reduce afterload, prevent remodeling, and improve symptoms in heart failure."
            },
            {
              "stem": "Which of the following statements about beta-blockers in heart failure is FALSE?",
              "options": [
                "Reversing left ventricular remodeling",
                "Promoting plasma renin release",
                "Improving left ventricular systolic function",
                "Decreasing the heart rate"
              ],
              "answer": "Promoting plasma renin release",
              "explanation": "Beta-blockers inhibit renin release (via beta-1 blockade), reducing the renin-angiotensin system activation in heart failure."
            },
            {
              "stem": "Regarding myocardial infarction, which of the following is TRUE?",
              "options": [
                "NSTEMI involves the entire thickness of the myocardial wall",
                "Premenopausal women are at higher risk",
                "STEMI involves the entire thickness of the myocardial wall",
                "None of the above is true"
              ],
              "answer": "STEMI involves the entire thickness of the myocardial wall",
              "explanation": "STEMI (ST-elevation MI) involves full-thickness myocardial necrosis, while NSTEMI involves subendocardial injury."
            },
            {
              "stem": "Regarding cardiac biomarkers, which of the following is TRUE?",
              "options": [
                "Myoglobin is highly specific for cardiac injury",
                "Troponin is highly specific for MI",
                "CK-MB is more reliable than troponin",
                "None of the above"
              ],
              "answer": "Troponin is highly specific for MI",
              "explanation": "Troponin is the most specific and sensitive biomarker for myocardial infarction, rising within 3-6 hours and peaking at 24 hours."
            },
            {
              "stem": "A 75-year-old man presents with chest pain and elevated troponin. His BP is 200/105 mmHg. Which of the following is the MOST appropriate pain management?",
              "options": [
                "KL is not having an MI",
                "The pain could be relieved with a single dose of ASA 325 mg",
                "The pain could be managed with morphine sulfate 2-5 mg IV q5-15min",
                "There is no need to treat pain associated with MI"
              ],
              "answer": "The pain could be managed with morphine sulfate 2-5 mg IV q5-15min",
              "explanation": "Morphine is used for severe chest pain in MI, reducing preload and pain, but should be used cautiously in hypotension."
            },
            {
              "stem": "Which of the following correctly describes the use of nitroglycerin (NTG) in acute MI?",
              "options": [
                "NTG is contraindicated in the management of MI",
                "Use of sublingual NTG in particular is contraindicated in the management of MI",
                "Give a single sublingual dose only on admission to the emergency department",
                "Give intravenous NTG beginning with 10-20 µg/min"
              ],
              "answer": "Give intravenous NTG beginning with 10-20 µg/min",
              "explanation": "IV NTG is used in acute MI to reduce preload and afterload, starting at 10-20 µg/min and titrating to effect."
            },
            {
              "stem": "Should the patient receive metoprolol for his MI?",
              "options": [
                "Yes; it is useful for minimizing signs/symptoms of ischemia",
                "No; it is contraindicated because he is receiving nitroglycerin",
                "No; it is used only if the patient had received tissue plasminogen activator",
                "No; it is contraindicated because his resting heart rate is greater than 100 beats/minute"
              ],
              "answer": "Yes; it is useful for minimizing signs/symptoms of ischemia",
              "explanation": "Metoprolol (beta-blocker) reduces myocardial oxygen demand and ischemia in MI, even with nitroglycerin use, unless contraindicated (e.g., bradycardia, hypotension)."
            },
            {
              "stem": "Which of the following is NOT a cause of arrhythmias?",
              "options": [
                "Myocardial infarction",
                "Thyroid disorders",
                "Young age",
                "Excess alcohol consumption"
              ],
              "answer": "Young age",
              "explanation": "Young age is not a cause of arrhythmias. MI, thyroid disorders, and alcohol excess can precipitate arrhythmias."
            },
            {
              "stem": "Which of the following is a class II antiarrhythmic agent?",
              "options": [
                "Sotalol",
                "Procainamide",
                "Diltiazem",
                "Metoprolol"
              ],
              "answer": "Metoprolol",
              "explanation": "Metoprolol is a class II antiarrhythmic (beta-blocker) that slows AV conduction and suppresses automaticity."
            },
            {
              "stem": "A patient on chronic amiodarone requires monitoring for toxicities. Which test is MOST important to monitor?",
              "options": [
                "Chest x-ray",
                "Thyroid function tests",
                "Liver function tests",
                "Ophthalmic examinations"
              ],
              "answer": "Thyroid function tests",
              "explanation": "Amiodarone causes thyroid dysfunction (hypo- or hyperthyroidism) in up to 20% of patients, necessitating regular thyroid function monitoring."
            },
            {
              "stem": "Which of the following properties does propafenone possess?",
              "options": [
                "Vaughan-Williams type Ib only",
                "Vaughan-Williams types Ic and II",
                "Vaughan-Williams type III",
                "Vaughan-Williams types Ia and IV"
              ],
              "answer": "Vaughan-Williams types Ic and II",
              "explanation": "Propafenone is a Vaughan-Williams class Ic antiarrhythmic (sodium channel blocker) with additional beta-blocking (class II) properties."
            },
            {
              "stem": "The drug of choice for terminating paroxysmal supraventricular tachycardia is:",
              "options": [
                "Lidocaine",
                "Procainamide",
                "Adenosine",
                "Digoxin"
              ],
              "answer": "Adenosine",
              "explanation": "Adenosine is the drug of choice for terminating PSVT due to its rapid onset and short half-life, causing transient AV block."
            },
            {
              "stem": "Anemia may present with all of the following signs and symptoms EXCEPT:",
              "options": [
                "Pallor",
                "Tachycardia",
                "Papilledema",
                "Dizziness"
              ],
              "answer": "Papilledema",
              "explanation": "Papilledema is not a typical sign of anemia. Pallor, tachycardia, and dizziness are common symptoms."
            },
            {
              "stem": "Iron deficiency anemia may be due to all of the following EXCEPT:",
              "options": [
                "Chronic intake of drugs causing lowered gastric pH",
                "Chronic hemorrhage",
                "Acute hemorrhage",
                "Loss of vibration sense"
              ],
              "answer": "Loss of vibration sense",
              "explanation": "Loss of vibration sense is a sign of vitamin B12 deficiency (neuropathy), not iron deficiency anemia."
            },
            {
              "stem": "Management of anemia of chronic disease entails:",
              "options": [
                "Oral iron therapy",
                "Blood transfusion",
                "Treating the underlying chronic condition",
                "None of the above"
              ],
              "answer": "Treating the underlying chronic condition",
              "explanation": "Anemia of chronic disease is managed by treating the underlying condition (e.g., CKD, inflammation) rather than iron therapy."
            },
            {
              "stem": "Management of sideroblastic anemia is with:",
              "options": [
                "High doses of Vitamin C, >200 mg",
                "Desferrioxamine and low doses of Vitamin C <200 mg",
                "Desferrioxamine and high doses of Vitamin C >200 mg",
                "None of the above"
              ],
              "answer": "Desferrioxamine and low doses of Vitamin C <200 mg",
              "explanation": "Sideroblastic anemia is managed with iron chelation (e.g., desferrioxamine) and low-dose vitamin C (<200 mg) to avoid iron overload."
            },
            {
              "stem": "The principal biochemical defect in sickle hemoglobin involves the substitution of which amino acid at the sixth position of the β-polypeptide chain?",
              "options": [
                "Phenylalanine for lysine",
                "Valine for glutamic acid",
                "Glutamic acid for alanine",
                "Proline for cysteine"
              ],
              "answer": "Valine for glutamic acid",
              "explanation": "Sickle hemoglobin (HbS) results from a substitution of valine for glutamic acid at the sixth position of the β-chain."
            },
            {
              "stem": "The principal goal of hydroxyurea therapy in sickle cell disease is to:",
              "options": [
                "Decrease the amount of circulating S hemoglobin",
                "Increase polymerization of S hemoglobin",
                "Decrease the amount of circulating F hemoglobin",
                "Increase the adhesive properties of red cell"
              ],
              "answer": "Decrease the amount of circulating S hemoglobin",
              "explanation": "Hydroxyurea increases fetal hemoglobin (HbF), which reduces the polymerization of HbS and decreases sickling."
            },
            {
              "stem": "In the management of hemophilia, which of the following is TRUE?",
              "options": [
                "Immunomodulators have not shown benefit",
                "Vaccination of hepatitis A and B is done regularly",
                "Recombinant factors are cheaper than plasma derived concentrates",
                "None of the above"
              ],
              "answer": "Vaccination of hepatitis A and B is done regularly",
              "explanation": "Patients with hemophilia require hepatitis A and B vaccination due to the risk of transfusion-transmitted infections."
            },
            {
              "stem": "Disseminated intravascular coagulation is managed using all of the following EXCEPT:",
              "options": [
                "Dermatan sulfate",
                "Lepirudin",
                "Warfarin",
                "Heparin"
              ],
              "answer": "Warfarin",
              "explanation": "Warfarin is contraindicated in DIC due to its delayed onset and risk of worsening bleeding. Heparin, lepirudin, and dermatan sulfate may be used."
            },
            {
              "stem": "Which of the following is TRUE regarding prophylaxis of venous thromboembolism?",
              "options": [
                "Low-dose unfractionated heparin (UFH) provides improved protection compared to low molecular weight heparins (LMWHs)",
                "Ambulation as soon as possible following surgery has been seen to significantly lower risk of VTE",
                "For hospitalized general and surgical patients, evidence supports use of fondaparinux 2.5 mg SC daily",
                "None of the above"
              ],
              "answer": "For hospitalized general and surgical patients, evidence supports use of fondaparinux 2.5 mg SC daily",
              "explanation": "Fondaparinux 2.5 mg SC daily is recommended for VTE prophylaxis in hospitalized medical and surgical patients."
            },
            {
              "stem": "Graduated compression stockings are:",
              "options": [
                "Not well tolerated by the majority of patients",
                "An appropriate VTE prevention strategy for patients at moderate risk",
                "An expensive strategy for the prevention of VTE",
                "Ineffective when used in combination with pharmacologic VTE prophylaxis"
              ],
              "answer": "An appropriate VTE prevention strategy for patients at moderate risk",
              "explanation": "Graduated compression stockings are effective and well-tolerated for VTE prevention in moderate-risk patients."
            },
            {
              "stem": "In the long-term management of VTE, which of the following is TRUE?",
              "options": [
                "Anticoagulation therapy should be continued for a minimum of 6 months",
                "Unfractionated heparin (UFH) is safer and efficacious in cancer patients and pregnant women",
                "Warfarin can be used alongside a parenteral agent",
                "None of the above"
              ],
              "answer": "Warfarin can be used alongside a parenteral agent",
              "explanation": "Warfarin can be overlapped with a parenteral agent (e.g., LMWH) for 5 days until INR is therapeutic."
            },
            {
              "stem": "Which of the following is UNTRUE about warfarin?",
              "options": [
                "It has no effect on circulating anticoagulants that have previously been formed",
                "It should only be administered when a systematic patient monitoring system is available",
                "It achieves its full antithrombotic effect on administration",
                "For general surgery procedures, prophylaxis should be discontinued when the patient can ambulate regularly"
              ],
              "answer": "It achieves its full antithrombotic effect on administration",
              "explanation": "Warfarin has a delayed onset of action (3-5 days) and requires bridging with parenteral anticoagulants for immediate anticoagulation."
            },
            {
              "stem": "Which of the following signs or symptoms is NOT consistent with the diagnosis of deep vein thrombosis (DVT)?",
              "options": [
                "The examiner feels a palpable cord in the right leg",
                "The patient's left leg appears red and feels hot",
                "The patient complains of pain in the right leg when dorsiflexing the right foot",
                "The patient's ankles are very swollen"
              ],
              "answer": "The patient's ankles are very swollen",
              "explanation": "Swollen ankles are a sign of edema, not specifically DVT. A palpable cord, unilateral redness/heat, and Homan’s sign (pain on dorsiflexion) are suggestive of DVT."
            },
            {
              "stem": "Regarding hemophilia, which of the following is TRUE?",
              "options": [
                "Female carriers have a slight bleeding tendency",
                "It presents as nerve compression",
                "Hemophilia A involves deficiency of factor IX",
                "Hemophilia B involves deficiency of factor VIII"
              ],
              "answer": "Female carriers have a slight bleeding tendency",
              "explanation": "Female carriers of hemophilia may have mild bleeding tendencies due to lyonization (random X-chromosome inactivation)."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "List two classes of drugs used in dyslipidemias, stating the mode of action of each.",
              "modelAnswer": "1. HMG-CoA reductase inhibitors (statins): Inhibit HMG-CoA reductase, reducing cholesterol synthesis in the liver and increasing LDL receptor expression, leading to enhanced LDL clearance.\n2. Ezetimibe: Inhibits intestinal absorption of cholesterol by blocking the Niemann-Pick C1-Like 1 (NPC1L1) protein, reducing LDL cholesterol levels."
            },
            {
              "stem": "Discuss the management of hemolytic-uremic syndrome (HUS).",
              "modelAnswer": "Management of HUS includes:\n1. Supportive care: Fluid and electrolyte balance, blood pressure control, and dialysis if necessary (especially in renal failure).\n2. Avoidance of antibiotics (unless secondary infection): Antibiotics may worsen HUS by increasing toxin release in Shiga toxin-producing E. coli (STEC) cases.\n3. Plasma exchange or infusion: For severe cases (e.g., atypical HUS), plasma exchange removes autoantibodies and complements, while plasma infusion provides deficient factors.\n4. Eculizumab: A monoclonal antibody against C5, used in atypical HUS to inhibit complement-mediated hemolysis.\n5. Monitoring: Regular assessment of renal function, hemoglobin, and platelet counts."
            },
            {
              "stem": "Briefly describe the different types of angina.",
              "modelAnswer": "1. Stable angina: Predictable chest pain occurring with exertion or stress, relieved by rest or nitroglycerin. Caused by fixed atherosclerotic plaques.\n2. Unstable angina: Chest pain at rest or with minimal exertion, increasing in frequency or severity. Indicates plaque rupture or thrombosis.\n3. Prinzmetal’s (variant) angina: Occurs at rest, often early morning, due to coronary artery spasm. Responds to nitrates and calcium channel blockers.\n4. Microvascular angina: Chest pain with normal coronary arteries, caused by endothelial dysfunction or microvascular spasms."
            },
            {
              "stem": "Outline the management of a patient diagnosed with iron deficiency anemia.",
              "modelAnswer": "1. Identify and treat the underlying cause (e.g., blood loss, malabsorption, dietary deficiency).\n2. Oral iron therapy: Ferrous sulfate 325 mg (60 mg elemental iron) TID, taken on an empty stomach for better absorption. Continue for 3-6 months to replenish stores.\n3. Parenteral iron: For patients intolerant to oral iron or with malabsorption (e.g., iron sucrose, ferric gluconate).\n4. Dietary modifications: Increase iron-rich foods (e.g., red meat, leafy greens) and vitamin C (enhances absorption).\n5. Monitor: Hemoglobin, reticulocyte count (after 1-2 weeks), and ferritin levels (after 2-3 months).\n6. Address complications: Transfusion for severe anemia or symptomatic patients."
            },
            {
              "stem": "Give two examples of angiotensin-converting enzyme (ACE) inhibitors; what are some of the adverse effects of this class of antihypertensives?",
              "modelAnswer": "Examples: Enalapril, Lisinopril.\nAdverse effects:\n1. Dry cough (due to bradykinin accumulation).\n2. Hyperkalemia (reduced aldosterone secretion).\n3. Acute kidney injury (especially in bilateral renal artery stenosis).\n4. Angioedema (rare but serious).\n5. Teratogenicity (contraindicated in pregnancy).\nMonitoring: Serum creatinine, potassium, and blood pressure."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "M.O, a 65-year-old known hypertensive patient with a history of coronary artery disease and type 2 diabetes mellitus presents to hospital. His presenting complaint is a feeling of breathlessness and easy fatiguability. He reports that he experiences these symptoms when he walks for short distances, climbs stairs and when he lies down flat. He says that he has resorted to using at least 2 pillows when he goes to sleep as they offer some relief. On physical examination, you note that his ankles are swollen, to which he further informs you that he no longer wears closed shoes, as they don’t fit and he only wears open shoes. You also note slight abdominal distension, and upon the review of systems he reveals that he has difficulty finishing his meals due to a feeling of early satiety and nausea.\n\na) Based on this information, what diagnosis would you make?\n\nb) What tests would you request to confirm the diagnosis?\n\nc) What factors would precipitate symptoms of this disease?\n\nd) Outline a pharmaceutical care plan for M.O.",
              "modelAnswer": "a) Diagnosis:\n   - **Congestive heart failure (CHF), likely left-sided with possible right-sided involvement (congestive cardiac failure).**\n   - Symptoms: Dyspnea on exertion, orthopnea (use of 2 pillows), paroxysmal nocturnal dyspnea (PND), fatigue, peripheral edema, early satiety, nausea, and abdominal distension suggest fluid overload and hepatic congestion.\n\nb) Diagnostic tests:\n   1. **Echocardiography (ECHO):** To assess left ventricular ejection fraction (LVEF), valvular function, and structural abnormalities.\n   2. **B-type natriuretic peptide (BNP) or N-terminal pro-BNP (NT-proBNP):** Elevated levels support the diagnosis of heart failure.\n   3. **Electrocardiogram (ECG):** To evaluate for ischemic changes, arrhythmias, or left ventricular hypertrophy.\n   4. **Chest X-ray:** To assess for pulmonary congestion, cardiomegaly, or pleural effusions.\n   5. **Serum electrolytes, renal function, and liver enzymes:** To evaluate for electrolyte imbalances (e.g., hyponatremia), renal impairment, or hepatic congestion.\n   6. **Complete blood count (CBC):** To assess for anemia, which can exacerbate heart failure symptoms.\n   7. **Thyroid function tests:** To rule out hyperthyroidism or hypothyroidism as a precipitating factor.\n\nc) Precipitating factors for heart failure symptoms:\n   1. **Non-adherence to medications or dietary sodium restriction:** High sodium intake increases fluid retention.\n   2. **Infection or sepsis:** Increases metabolic demand and cardiac workload.\n   3. **Uncontrolled hypertension:** Increases afterload, worsening heart failure.\n   4. **Arrhythmias (e.g., atrial fibrillation):** Reduces cardiac output and increases risk of thromboembolism.\n   5. **Myocardial ischemia or infarction:** Reduces myocardial contractility.\n   6. **Anemia:** Reduces oxygen delivery, increasing cardiac workload.\n   7. **Medication non-adherence (e.g., diuretics, ACE inhibitors):** Leads to fluid overload or worsening symptoms.\n   8. **Excessive fluid intake:** Worsens fluid overload and edema.\n   9. **Renal dysfunction:** Reduces diuretic efficacy and exacerbates volume overload.\n   10. **Alcohol or drug use:** Can cause or worsen cardiomyopathy.\n\nd) Pharmaceutical care plan for M.O.:\n   **1. Medication optimization:**\n      - **ACE inhibitor (e.g., Enalapril 5 mg PO daily):** Start low and titrate to target dose (e.g., 10-20 mg daily) to reduce afterload and mortality.\n      - **Beta-blocker (e.g., Bisoprolol 1.25 mg PO daily):** Titrate to target dose (e.g., 10 mg daily) to reduce heart rate, improve LVEF, and prevent remodeling.\n      - **Loop diuretic (e.g., Furosemide 40 mg PO daily):** Adjust dose based on fluid status (e.g., increase to 80 mg if edema persists). Monitor electrolytes (potassium, sodium) and renal function.\n      - **Aldosterone antagonist (e.g., Spironolactone 25 mg PO daily):** Add if LVEF <35% and symptomatic to reduce mortality and edema.\n      - **SGLT2 inhibitor (e.g., Empagliflozin 10 mg PO daily):** For diabetic patients with heart failure (reduces hospitalization and mortality).\n      - **Statin (e.g., Atorvastatin 40 mg PO daily):** For secondary prevention of coronary artery disease.\n      - **Antiplatelet (e.g., Aspirin 75-100 mg PO daily):** For coronary artery disease.\n\n   **2. Monitoring and follow-up:**\n      - **Weekly:** Weight, blood pressure, heart rate, and symptoms (dyspnea, edema).\n      - **Monthly:** Serum electrolytes (potassium, sodium), renal function (creatinine, eGFR), and liver enzymes.\n      - **Every 3-6 months:** BNP/NT-proBNP, lipid profile, and HbA1c (for diabetes control).\n      - **ECHO:** Repeat every 6-12 months or if clinical deterioration.\n\n   **3. Patient education:**\n      - **Diet:** Sodium restriction (<2 g/day), fluid restriction (1.5-2 L/day if hyponatremic), and heart-healthy diet (DASH diet).\n      - **Lifestyle:** Regular light exercise (e.g., walking), smoking cessation, and alcohol moderation.\n      - **Medication adherence:** Importance of taking medications as prescribed, even if asymptomatic.\n      - **Symptom recognition:** Teach signs of worsening heart failure (e.g., increased dyspnea, weight gain >2 kg in 3 days, worsening edema).\n      - **Vaccinations:** Annual influenza and pneumococcal vaccination to prevent infections.\n\n   **4. Addressing comorbidities:**\n      - **Diabetes:** Optimize glycemic control (target HbA1c <7%). Consider SGLT2 inhibitors or GLP-1 agonists with proven cardiovascular benefits.\n      - **Hypertension:** Target BP <130/80 mmHg with ACE inhibitor/ARB + beta-blocker.\n      - **Dyslipidemia:** Continue statin therapy for secondary prevention.\n\n   **5. Social and psychological support:**\n      - Referral to cardiac rehabilitation for exercise training and education.\n      - Address depression or anxiety, which can worsen outcomes.\n      - Support groups for heart failure patients.\n\n   **6. Advanced care planning:**\n      - Discuss goals of care, advance directives, and palliative care options if symptoms progress despite optimal therapy."
            }
          ]
        }
      ]
    }
  },
  "exam-cns": {
    "1": {
      "title": "Clinical Pharmacy — Central Nervous System Disorders",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "A 28-year-old male presents with 3 days of decreased sleep, excessive talking, grandiose beliefs about his business skills, and impulsive spending sprees. His mood is euphoric and irritable. The most likely diagnosis is:",
              "options": [
                "Schizophrenia",
                "Major depressive disorder",
                "Bipolar I disorder, manic episode",
                "Generalized anxiety disorder"
              ],
              "answer": "Bipolar I disorder, manic episode",
              "explanation": "The combination of decreased sleep, grandiosity, impulsivity, and euphoric/irritable mood is characteristic of a manic episode in bipolar I disorder."
            },
            {
              "stem": "Which of the following antibiotics is most likely to cause a disulfiram-like reaction when consumed with alcohol?",
              "options": [
                "Ceftriaxone",
                "Metronidazole",
                "Amoxicillin",
                "Doxycycline"
              ],
              "answer": "Metronidazole",
              "explanation": "Metronidazole inhibits aldehyde dehydrogenase, leading to acetaldehyde accumulation and a disulfiram-like reaction when alcohol is consumed."
            },
            {
              "stem": "Which opioid derivative has the highest potential for physical dependence and abuse?",
              "options": [
                "Meperidine",
                "Methadone",
                "Codeine",
                "Heroin"
              ],
              "answer": "Heroin",
              "explanation": "Heroin is a Schedule I controlled substance with rapid onset and high abuse liability, leading to severe physical dependence."
            },
            {
              "stem": "A 12-year-old child presents with staring spells lasting 5–10 seconds, during which she is unresponsive to verbal commands. EEG shows 3-Hz spike-and-wave discharges. The most appropriate first-line antiepileptic drug is:",
              "options": [
                "Phenytoin",
                "Ethosuximide",
                "Carbamazepine",
                "Valproate"
              ],
              "answer": "Ethosuximide",
              "explanation": "Ethosuximide is the drug of choice for absence seizures, characterized by 3-Hz spike-and-wave discharges on EEG."
            },
            {
              "stem": "Following a traumatic brain injury, which pathophysiologic event is the primary trigger for secondary neuronal injury?",
              "options": [
                "Systemic hypotension",
                "Cerebral edema",
                "Central nervous system ischemia",
                "Hyperglycemia"
              ],
              "answer": "Central nervous system ischemia",
              "explanation": "Secondary neuronal injury is primarily driven by ischemia due to reduced cerebral blood flow, mitochondrial dysfunction, and excitotoxicity."
            },
            {
              "stem": "A patient with severe head injury (GCS 7) develops signs of raised intracranial pressure. Which of the following is the most appropriate first-line osmotic therapy?",
              "options": [
                "Hypertonic saline (3%)",
                "Mannitol 20%",
                "Furosemide",
                "Acetazolamide"
              ],
              "answer": "Mannitol 20%",
              "explanation": "Mannitol is a first-line osmotic agent for reducing intracranial pressure in severe head injury, provided the patient is euvolemic."
            },
            {
              "stem": "A patient with a Glasgow Coma Scale score of 8 after a motor vehicle accident is classified as having:",
              "options": [
                "Mild head injury",
                "Moderate head injury",
                "Severe head injury",
                "No head injury"
              ],
              "answer": "Severe head injury",
              "explanation": "A GCS score of 8 or below indicates severe head injury, requiring urgent medical intervention."
            },
            {
              "stem": "Which of the following is a typical feature of migraine headache?",
              "options": [
                "Bilateral, dull headache",
                "Unilateral, throbbing pain",
                "Pain worsened by movement",
                "Aura in 80% of cases"
              ],
              "answer": "Unilateral, throbbing pain",
              "explanation": "Migraine headaches are typically unilateral, throbbing, and often associated with photophobia, phonophobia, and nausea."
            },
            {
              "stem": "Wernicke encephalopathy is caused by a deficiency of which vitamin?",
              "options": [
                "Vitamin B6",
                "Thiamine (Vitamin B1)",
                "Folate",
                "Vitamin B12"
              ],
              "answer": "Thiamine (Vitamin B1)",
              "explanation": "Wernicke encephalopathy results from thiamine deficiency, commonly seen in alcohol use disorder due to poor nutrition and malabsorption."
            },
            {
              "stem": "Which symptom is NOT considered a positive symptom of schizophrenia?",
              "options": [
                "Hallucinations",
                "Delusions",
                "Disorganized speech",
                "Apathy"
              ],
              "answer": "Apathy",
              "explanation": "Positive symptoms include hallucinations, delusions, and disorganized behavior/speech, while apathy is a negative symptom."
            },
            {
              "stem": "A patient with chronic alcohol use disorder presents with tremors, agitation, and hallucinations 48 hours after his last drink. The most appropriate initial therapy is:",
              "options": [
                "Disulfiram",
                "Acamprosate",
                "Lorazepam",
                "Naltrexone"
              ],
              "answer": "Lorazepam",
              "explanation": "Benzodiazepines like lorazepam are first-line for alcohol withdrawal to prevent seizures and delirium tremens."
            },
            {
              "stem": "Schizophrenia is typically diagnosed in which age group?",
              "options": [
                "Infancy",
                "Childhood",
                "Early adulthood (18–30 years)",
                "Old age (>65 years)"
              ],
              "answer": "Early adulthood (18–30 years)",
              "explanation": "Schizophrenia most commonly presents in late adolescence to early adulthood, with peak onset between 18–30 years."
            },
            {
              "stem": "Seeing a ghost would be classified as a _______, while believing you are a ghost would be classified as a _______.",
              "options": [
                "Hallucination; delusion",
                "Delusion; hallucination",
                "Positive symptom; negative symptom",
                "Negative symptom; positive symptom"
              ],
              "answer": "Hallucination; delusion",
              "explanation": "Hallucinations involve sensory perceptions without stimuli, while delusions are fixed false beliefs."
            },
            {
              "stem": "Which of the following antipsychotics is most likely to cause significant weight gain and metabolic syndrome?",
              "options": [
                "Haloperidol",
                "Risperidone",
                "Aripiprazole",
                "Ziprasidone"
              ],
              "answer": "Risperidone",
              "explanation": "Risperidone, an atypical antipsychotic, is associated with significant weight gain, hyperglycemia, and dyslipidemia."
            },
            {
              "stem": "A 70-year-old patient with Parkinson’s disease on levodopa-carbidopa develops visual hallucinations and confusion. Which of his medications is most likely contributing?",
              "options": [
                "Levodopa-carbidopa",
                "Donepezil",
                "Ramipril",
                "Calcium citrate"
              ],
              "answer": "Levodopa-carbidopa",
              "explanation": "Dopaminergic agents like levodopa can cause hallucinations and psychosis, especially in elderly patients."
            },
            {
              "stem": "Which factor is most strongly associated with the increased risk of diabetes in patients with schizophrenia?",
              "options": [
                "Genetic predisposition",
                "Antipsychotic medication",
                "High-calorie diet",
                "Sedentary lifestyle"
              ],
              "answer": "Antipsychotic medication",
              "explanation": "Atypical antipsychotics (e.g., olanzapine, clozapine) are linked to weight gain, insulin resistance, and increased diabetes risk."
            },
            {
              "stem": "A patient presents with blurred vision, confusion, and metabolic acidosis after ingesting a red-colored liquid with a formaldehyde-like odor. The most likely toxicant is:",
              "options": [
                "Ethanol",
                "Ethylene glycol",
                "Isopropanol",
                "Methanol"
              ],
              "answer": "Methanol",
              "explanation": "Methanol poisoning causes visual disturbances (snowstorm vision), metabolic acidosis, and formaldehyde-like breath odor."
            },
            {
              "stem": "A 45-year-old alcoholic presents with confusion, ataxia, and ophthalmoplegia. The immediate treatment should include:",
              "options": [
                "Chlordiazepoxide",
                "Thiamine",
                "Folic acid",
                "Disulfiram"
              ],
              "answer": "Thiamine",
              "explanation": "Thiamine deficiency causes Wernicke encephalopathy; immediate IV thiamine is critical to prevent Korsakoff syndrome."
            },
            {
              "stem": "A 40-year-old man with a history of heavy alcohol use stops drinking abruptly. Which complication is he most at risk for within 48–72 hours?",
              "options": [
                "Alcoholic ketoacidosis",
                "Delirium tremens",
                "Hepatic encephalopathy",
                "Pancreatitis"
              ],
              "answer": "Delirium tremens",
              "explanation": "Abrupt alcohol cessation can lead to delirium tremens, characterized by agitation, hallucinations, and autonomic hyperactivity."
            },
            {
              "stem": "A 20-year-old student with no alcohol tolerance consumes enough ethanol to reach a blood alcohol concentration of 500 mg/dL. His condition is best described as:",
              "options": [
                "Mild sedation",
                "Ataxia and slurred speech",
                "Comatose and near death",
                "Euphoric and talkative"
              ],
              "answer": "Comatose and near death",
              "explanation": "A BAC of 500 mg/dL is life-threatening and typically causes coma, respiratory depression, and death without intervention."
            },
            {
              "stem": "A pregnant woman with chronic alcohol use disorder is at risk of delivering an infant with which syndrome?",
              "options": [
                "Down syndrome",
                "Fetal alcohol spectrum disorder (FASD)",
                "Turner syndrome",
                "Klinefelter syndrome"
              ],
              "answer": "Fetal alcohol spectrum disorder (FASD)",
              "explanation": "Prenatal alcohol exposure causes FASD, characterized by craniofacial abnormalities, growth retardation, and neurodevelopmental deficits."
            },
            {
              "stem": "A patient with cocaine overdose is least likely to present with which symptom?",
              "options": [
                "Agitation",
                "Tachycardia",
                "Hyperthermia",
                "Bradycardia"
              ],
              "answer": "Bradycardia",
              "explanation": "Cocaine stimulates the sympathetic nervous system, causing tachycardia, hypertension, and hyperthermia; bradycardia is unlikely."
            },
            {
              "stem": "Regular low-to-moderate alcohol consumption is associated with which cardiovascular effect?",
              "options": [
                "Increased risk of coronary artery disease",
                "Myocardial depression",
                "Lower incidence of coronary artery disease",
                "Wernicke encephalopathy"
              ],
              "answer": "Lower incidence of coronary artery disease",
              "explanation": "Moderate alcohol consumption (1 drink/day for women, 2 for men) is associated with reduced CAD risk due to increased HDL and antiplatelet effects."
            },
            {
              "stem": "Which statement about alcohol’s effect on sleep is correct?",
              "options": [
                "It is a dependable hypnotic with no abuse potential",
                "It consistently improves sleep architecture",
                "It can disorganize sleep architecture",
                "It suppresses sleep apnea"
              ],
              "answer": "It can disorganize sleep architecture",
              "explanation": "Alcohol disrupts REM sleep and causes fragmented sleep, leading to poor sleep quality despite initial sedation."
            },
            {
              "stem": "Ethanol is used in methanol poisoning primarily because it:",
              "options": [
                "Antagonizes methanol’s effects",
                "Stimulates methanol metabolism",
                "Inhibits methanol metabolism",
                "Replenishes folate stores"
              ],
              "answer": "Inhibits methanol metabolism",
              "explanation": "Ethanol competitively inhibits alcohol dehydrogenase, reducing methanol metabolism to toxic formate and formaldehyde."
            },
            {
              "stem": "The preferred drug for suppressing febrile convulsions in children is:",
              "options": [
                "Intramuscular phenobarbital",
                "Intravenous phenytoin",
                "Rectal diazepam",
                "Oral sodium valproate"
              ],
              "answer": "Rectal diazepam",
              "explanation": "Rectal diazepam is first-line for acute febrile convulsions due to rapid onset and ease of administration."
            },
            {
              "stem": "Combination therapy with two or more antiepileptic drugs is indicated:",
              "options": [
                "Routinely in all types of epilepsy",
                "Only when monotherapy fails",
                "In all cases of complex partial seizures",
                "In all cases of secondarily generalized seizures"
              ],
              "answer": "Only when monotherapy fails",
              "explanation": "Polytherapy is reserved for refractory epilepsy when two or more first-line AEDs have failed to control seizures."
            },
            {
              "stem": "An epileptic woman controlled by phenytoin conceives. The most appropriate management is to:",
              "options": [
                "Terminate the pregnancy",
                "Withdraw phenytoin immediately",
                "Gradually reduce phenytoin to the lowest effective dose",
                "Substitute phenytoin with carbamazepine and valproate"
              ],
              "answer": "Gradually reduce phenytoin to the lowest effective dose",
              "explanation": "AED dose reduction should be attempted during pregnancy to minimize teratogenic risk, but seizures must be controlled."
            },
            {
              "stem": "In a 60-year-old male with Parkinson’s disease, levodopa is initiated. Which statement is true about levodopa?",
              "options": [
                "It causes fewer CNS side effects when given with a dopa decarboxylase inhibitor",
                "Its effectiveness decreases over time",
                "It prevents extrapyramidal effects of antipsychotics",
                "It protects against melanoma"
              ],
              "answer": "It causes fewer CNS side effects when given with a dopa decarboxylase inhibitor",
              "explanation": "Carbidopa (a dopa decarboxylase inhibitor) reduces peripheral conversion of levodopa to dopamine, minimizing nausea and increasing CNS availability."
            },
            {
              "stem": "Risk of neural tube defects in pregnant women on antiepileptic drugs can be minimized by supplemental therapy with:",
              "options": [
                "Folic acid",
                "Vitamin A",
                "Vitamin E",
                "Pyridoxine"
              ],
              "answer": "Folic acid",
              "explanation": "Folic acid supplementation (4–5 mg/day) reduces neural tube defect risk in women on AEDs, particularly valproate and carbamazepine."
            },
            {
              "stem": "In parkinsonian patients, levodopa exerts all the following effects EXCEPT:",
              "options": [
                "Reduces skeletal muscle contractility",
                "Decreases muscle tone",
                "Increases locomotor activity",
                "Inhibits muscle tremor"
              ],
              "answer": "Reduces skeletal muscle contractility",
              "explanation": "Levodopa improves muscle tone, increases mobility, and reduces tremor but does not reduce skeletal muscle contractility."
            },
            {
              "stem": "Use of drugs of abuse is a risk factor for seizures, especially during:",
              "options": [
                "Infection",
                "Hypoglycemia",
                "Overdose and withdrawal",
                "Tuberous sclerosis"
              ],
              "answer": "Overdose and withdrawal",
              "explanation": "Seizures are common during drug overdose (e.g., cocaine, amphetamines) and withdrawal (e.g., alcohol, benzodiazepines)."
            },
            {
              "stem": "An aura in migraine typically lasts for:",
              "options": [
                "A few seconds",
                "Several hours",
                "Several days",
                "Minutes to an hour"
              ],
              "answer": "Minutes to an hour",
              "explanation": "Auras in migraine usually last 5–60 minutes and precede the headache phase."
            },
            {
              "stem": "Which antiepileptic drug is most strongly associated with an increased risk of neural tube defects?",
              "options": [
                "Valproate",
                "Phenobarbital",
                "Gabapentin",
                "Lamotrigine"
              ],
              "answer": "Valproate",
              "explanation": "Valproate is contraindicated in pregnancy due to a 1–5% risk of neural tube defects (e.g., spina bifida)."
            },
            {
              "stem": "A 30-year-old male on antipsychotic therapy complains of feeling 'flat,' confusion, weight gain, and decreased libido. He also has a tremor and polyuria. The most likely drug is:",
              "options": [
                "Carbamazepine",
                "Clozapine",
                "Lithium",
                "Risperidone"
              ],
              "answer": "Lithium",
              "explanation": "Lithium causes tremor, polyuria (nephrogenic diabetes insipidus), weight gain, and cognitive dulling ('flat affect')."
            },
            {
              "stem": "Long-term marijuana use may result in persistent ______ even after cessation.",
              "options": [
                "Visual processing difficulties",
                "Short-term memory impairment",
                "Decreased attention span",
                "Increased agitation"
              ],
              "answer": "Short-term memory impairment",
              "explanation": "Chronic marijuana use impairs short-term memory and executive function, with effects persisting beyond acute intoxication."
            },
            {
              "stem": "Which symptom is NOT characteristic of Alzheimer’s disease?",
              "options": [
                "Delirium",
                "Anomia",
                "Wandering",
                "Paranoid delusions"
              ],
              "answer": "Delirium",
              "explanation": "Delirium is an acute confusional state, not a core feature of Alzheimer’s disease, which is a chronic neurodegenerative disorder."
            },
            {
              "stem": "Which drug is considered safe and effective for bipolar disorder during pregnancy?",
              "options": [
                "Carbamazepine",
                "Valproic acid",
                "Lithium",
                "Olanzapine"
              ],
              "answer": "Olanzapine",
              "explanation": "Olanzapine is an atypical antipsychotic with lower teratogenic risk compared to lithium, valproate, or carbamazepine."
            },
            {
              "stem": "Which drug is most effective for obsessive-compulsive disorder?",
              "options": [
                "Amitriptyline",
                "Bupropion",
                "Clomipramine",
                "Trazodone"
              ],
              "answer": "Clomipramine",
              "explanation": "Clomipramine, a tricyclic antidepressant, is FDA-approved for OCD and more effective than SSRIs in some cases."
            },
            {
              "stem": "A 40-year-old woman presents with episodes of intense anxiety, hyperventilation, tachycardia, and sweating. The most appropriate drug for panic disorder is:",
              "options": [
                "Alprazolam",
                "Eszopiclone",
                "Flurazepam",
                "Propranolol"
              ],
              "answer": "Alprazolam",
              "explanation": "Benzodiazepines like alprazolam are first-line for acute panic attacks due to rapid onset; SSRIs are preferred for maintenance."
            },
            {
              "stem": "The preferred treatment for psychotic depression is:",
              "options": [
                "Imipramine plus risperidone",
                "Imipramine plus sertraline",
                "Tranylcypromine",
                "Fluoxetine"
              ],
              "answer": "Imipramine plus risperidone",
              "explanation": "Combination therapy with an antidepressant (e.g., imipramine) and an antipsychotic (e.g., risperidone) is most effective for psychotic depression."
            },
            {
              "stem": "According to DSM-IV-TR, major depression criteria include all EXCEPT:",
              "options": [
                "Symptoms present for at least 2 weeks",
                "Inability to work",
                "Increased focus and concentration",
                "Feelings of inappropriate guilt"
              ],
              "answer": "Increased focus and concentration",
              "explanation": "Major depression is associated with decreased concentration, not increased focus."
            },
            {
              "stem": "When choosing antidepressant therapy, which factor should NOT be considered?",
              "options": [
                "Past history of response or intolerance",
                "Concomitant medications",
                "Cost of the medication regimen",
                "Patient’s astrological sign"
              ],
              "answer": "Patient’s astrological sign",
              "explanation": "Evidence-based factors (response history, drug interactions, cost) guide antidepressant selection; astrology is irrelevant."
            },
            {
              "stem": "An acutely manic patient on lithium and risperidone requires adjunctive therapy for agitation. The best short-term option is:",
              "options": [
                "Gabapentin",
                "Propranolol",
                "Clonazepam",
                "Clonidine"
              ],
              "answer": "Clonazepam",
              "explanation": "Benzodiazepines like clonazepam are effective for acute agitation in mania, complementing antipsychotic and mood stabilizer therapy."
            },
            {
              "stem": "Patients on mood stabilizers should be monitored for all EXCEPT:",
              "options": [
                "Decreased white blood counts with carbamazepine and clozapine",
                "Weight gain with olanzapine, lithium, and valproate",
                "Hypothyroidism with lithium",
                "Polycystic ovaries with gabapentin"
              ],
              "answer": "Polycystic ovaries with gabapentin",
              "explanation": "Polycystic ovary syndrome is linked to valproate, not gabapentin; gabapentin is weight-neutral and metabolically safe."
            },
            {
              "stem": "The most important counseling point for a patient starting alprazolam for panic disorder is:",
              "options": [
                "Do not discontinue alprazolam abruptly",
                "Concurrent alcohol use is permissible",
                "Take the full dose at bedtime after several weeks",
                "No drug interactions exist"
              ],
              "answer": "Do not discontinue alprazolam abruptly",
              "explanation": "Abrupt benzodiazepine cessation can cause withdrawal seizures and rebound anxiety; tapering is essential."
            },
            {
              "stem": "Complications during a seizure can include all EXCEPT:",
              "options": [
                "Burns and bruises",
                "Pneumonia and sinusitis",
                "Abrasions and head injuries",
                "Tongue bite and broken bones"
              ],
              "answer": "Pneumonia and sinusitis",
              "explanation": "Pneumonia and sinusitis are not direct complications of seizures; burns, abrasions, and fractures are common."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "List four non-motor symptoms of Parkinson’s disease.",
              "modelAnswer": "1. Autonomic dysfunction (e.g., orthostatic hypotension, constipation, urinary incontinence). 2. Sleep disturbances (e.g., REM sleep behavior disorder, insomnia). 3. Cognitive impairment (e.g., dementia, executive dysfunction). 4. Mood disorders (e.g., depression, anxiety)."
            },
            {
              "stem": "Describe four differences between tension-type headaches and migraine headaches.",
              "modelAnswer": "1. **Pain characteristics**: Tension-type headaches are bilateral, dull, and pressing; migraines are unilateral, throbbing, and severe. 2. **Aura**: Migraines often have an aura (e.g., visual disturbances); tension-type headaches do not. 3. **Associated symptoms**: Migraines include photophobia, phonophobia, nausea/vomiting; tension-type headaches do not. 4. **Triggers**: Migraines are triggered by stress, hormonal changes, or specific foods; tension-type headaches are linked to muscle tension and stress."
            },
            {
              "stem": "List four strategies used in the management of raised intracranial pressure (ICP) associated with traumatic brain injury (TBI).",
              "modelAnswer": "1. **Osmotic therapy**: Mannitol 20% or hypertonic saline (3%) to reduce cerebral edema. 2. **Hyperventilation**: Brief, controlled hyperventilation to reduce PaCO2 and cerebral vasoconstriction (target PaCO2 30–35 mmHg). 3. **Head elevation**: 30° head-of-bed elevation to improve venous drainage. 4. **Sedation and analgesia**: Propofol or fentanyl to reduce metabolic demand and ICP."
            },
            {
              "stem": "Identify four modifiable risk factors for ischemic stroke.",
              "modelAnswer": "1. **Hypertension**: The leading modifiable risk factor; blood pressure control reduces stroke risk by 30–40%. 2. **Hyperlipidemia**: Statin therapy lowers LDL cholesterol and reduces atherosclerotic plaque formation. 3. **Diabetes mellitus**: Tight glycemic control (HbA1c <7%) reduces microvascular complications and stroke risk. 4. **Smoking**: Cessation reduces stroke risk by 50% within 5 years."
            },
            {
              "stem": "List four acute effects of marijuana use.",
              "modelAnswer": "1. **Euphoria and relaxation**: Due to THC’s effects on cannabinoid receptors in the brain. 2. **Impaired short-term memory**: THC disrupts hippocampal function, affecting memory encoding. 3. **Increased appetite**: Often referred to as 'the munchies.' 4. **Tachycardia and conjunctival injection**: Due to sympathetic activation and vasodilation."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "EC is a 35-year-old female with a 17-year history of epilepsy. Her seizures have been refractory to multiple antiepileptic drugs. She presents to the emergency department with a generalized motor seizure that began 20 minutes ago and has not stopped. (a) Outline the acute management of this patient. (b) Outline four principles of chronic management of EC’s condition, assuming she is pregnant.",
              "modelAnswer": {
                "a": {
                  "title": "Acute Management of Refractory Status Epilepticus",
                  "content": [
                    "1. **ABCs and Stabilization**: Ensure airway patency, administer oxygen, and monitor vital signs. Establish IV access for drug administration.",
                    "2. **Benzodiazepines (First-line)**: Administer IV lorazepam (0.1 mg/kg, max 4 mg) or midazolam (0.2 mg/kg IM if IV access delayed). Repeat once if seizure persists.",
                    "3. **Second-line Antiepileptic Drugs**: If seizures continue, administer IV fosphenytoin (20 PE/kg, max 1500 PE) or valproate (40 mg/kg, max 3000 mg). Avoid phenytoin in pregnancy.",
                    "4. **Refractory Status Epilepticus**: If seizures persist beyond 30 minutes, intubate and initiate continuous EEG monitoring. Consider midazolam infusion (0.1–0.4 mg/kg/h) or propofol (1–2 mg/kg bolus, then 2–10 mg/kg/h).",
                    "5. **Supportive Care**: Correct hypoglycemia, electrolyte imbalances, and acidosis. Monitor for complications (e.g., rhabdomyolysis, lactic acidosis)."
                  ]
                },
                "b": {
                  "title": "Principles of Chronic Management in Pregnancy",
                  "content": [
                    "1. **AED Selection**: Prefer AEDs with lower teratogenic risk (e.g., lamotrigine, levetiracetam). Avoid valproate and carbamazepine due to neural tube defect risk.",
                    "2. **Folate Supplementation**: Administer folic acid 4–5 mg/day to reduce neural tube defect risk, especially if on valproate or carbamazepine.",
                    "3. **Monitoring**: Perform regular ultrasound scans (18–20 weeks) to assess fetal development. Monitor AED serum levels to balance seizure control and fetal exposure.",
                    "4. **Multidisciplinary Care**: Coordinate with obstetrics, neurology, and genetics to optimize outcomes. Consider vitamin K supplementation in the third trimester if on enzyme-inducing AEDs (e.g., phenytoin, carbamazepine)."
                  ]
                }
              }
            },
            {
              "stem": "JS is a 55-year-old man with a 25 pack-year smoking history, heavy alcohol use, and poorly controlled diabetes (HbA1c 10%). He presents with a 15-minute episode of right arm paralysis and slurred speech that resolved spontaneously. Carotid Doppler shows 90% stenosis on the left carotid artery. (a) Identify five points in JS’s history consistent with a transient ischemic attack (TIA). (b) Outline the initial and long-term goals in treating JS. (c) Describe how JS’s risk factors can be modified to prevent further TIA.",
              "modelAnswer": {
                "a": {
                  "title": "Points Consistent with TIA",
                  "content": [
                    "1. **Focal neurological deficit**: Right arm paralysis and slurred speech indicate a focal deficit.",
                    "2. **Duration**: Symptoms lasted 15 minutes, consistent with TIA (typically <24 hours).",
                    "3. **Carotid stenosis**: 90% left carotid stenosis is a high-risk source of embolic stroke.",
                    "4. **Vascular risk factors**: Smoking (25 pack-years), hypertension, diabetes, and hyperlipidemia increase TIA/stroke risk.",
                    "5. **Resolution**: Spontaneous resolution of symptoms without residual deficits."
                  ]
                },
                "b": {
                  "title": "Initial and Long-Term Goals in Treating JS",
                  "content": [
                    "1. **Initial Goals**:",
                    "   - Stabilize the patient and rule out stroke (e.g., CT/MRI brain).",
                    "   - Initiate antiplatelet therapy (e.g., aspirin 325 mg loading dose, then 81 mg daily).",
                    "   - Start high-intensity statin (e.g., atorvastatin 80 mg daily).",
                    "   - Optimize blood pressure control (e.g., ACE inhibitor + thiazide).",
                    "2. **Long-Term Goals**:",
                    "   - Prevent recurrent TIA/stroke: Maintain BP <130/80 mmHg, LDL <70 mg/dL.",
                    "   - Reduce cardiovascular risk: Smoking cessation, glycemic control (HbA1c <7%).",
                    "   - Consider carotid endarterectomy or stenting for symptomatic severe stenosis (>70%)."
                  ]
                },
                "c": {
                  "title": "Modification of JS’s Risk Factors",
                  "content": [
                    "1. **Smoking Cessation**: Refer to smoking cessation programs, use nicotine replacement therapy or varenicline if needed. Reduces stroke risk by 50% within 5 years.",
                    "2. **Alcohol Reduction**: Limit to ≤1 drink/day to reduce blood pressure and stroke risk.",
                    "3. **Glycemic Control**: Intensify diabetes management with metformin, SGLT2 inhibitors, or GLP-1 agonists to achieve HbA1c <7%.",
                    "4. **Blood Pressure Control**: Initiate ACE inhibitor + thiazide diuretic to target <130/80 mmHg.",
                    "5. **Lipid Management**: High-intensity statin (e.g., atorvastatin 80 mg) to reduce LDL <70 mg/dL.",
                    "6. **Carotid Intervention**: Urgent carotid endarterectomy or stenting for 90% left carotid stenosis to prevent recurrent embolization."
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Clinical Pharmacy — Central Nervous System Disorders",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "A 28-year-old male presents with 3 days of insomnia, reckless spending sprees, and grandiose delusions about his business acumen. He has no prior psychiatric history. Which of the following is the MOST likely diagnosis?",
              "options": [
                "Schizophrenia",
                "Generalized anxiety disorder",
                "Bipolar I disorder, manic episode",
                "Major depressive disorder with psychotic features"
              ],
              "answer": "Bipolar I disorder, manic episode",
              "explanation": "The triad of insomnia, reckless behavior, and grandiose delusions is characteristic of a manic episode in bipolar I disorder."
            },
            {
              "stem": "A patient with a history of alcohol dependence is prescribed metronidazole for a dental infection. Which of the following adverse effects is MOST likely if the patient consumes alcohol during therapy?",
              "options": [
                "Hypotension and tachycardia",
                "Disulfiram-like reaction with flushing and nausea",
                "Seizures due to lowered seizure threshold",
                "Respiratory depression"
              ],
              "answer": "Disulfiram-like reaction with flushing and nausea",
              "explanation": "Metronidazole inhibits aldehyde dehydrogenase, leading to acetaldehyde accumulation and a disulfiram-like reaction when alcohol is consumed."
            },
            {
              "stem": "A 35-year-old male with a 10-year history of heroin use is admitted for opioid detoxification. Which of the following medications is MOST appropriate for managing opioid withdrawal symptoms?",
              "options": [
                "Methadone",
                "Meperidine",
                "Buprenorphine",
                "Naltrexone"
              ],
              "answer": "Buprenorphine",
              "explanation": "Buprenorphine is a partial opioid agonist used for opioid detoxification and maintenance therapy due to its safety profile and efficacy in reducing withdrawal symptoms."
            },
            {
              "stem": "A 12-year-old boy presents with episodes of staring blankly for 5–10 seconds, during which he is unresponsive to verbal commands. EEG confirms 3-Hz spike-and-wave discharges. Which of the following is the MOST appropriate first-line antiepileptic drug?",
              "options": [
                "Phenytoin",
                "Ethosuximide",
                "Carbamazepine",
                "Valproate"
              ],
              "answer": "Ethosuximide",
              "explanation": "Ethosuximide is the drug of choice for absence seizures, characterized by 3-Hz spike-and-wave discharges on EEG."
            },
            {
              "stem": "A 22-year-old male is brought to the emergency department after a motor vehicle collision with a Glasgow Coma Scale (GCS) score of 8. Which of the following is the MOST critical pathophysiologic event triggering secondary brain injury?",
              "options": [
                "Systemic hypertension",
                "Cerebral edema",
                "Cerebral ischemia",
                "Hyperglycemia"
              ],
              "answer": "Cerebral ischemia",
              "explanation": "Secondary brain injury following trauma is primarily driven by cerebral ischemia due to reduced cerebral perfusion pressure and oxygen delivery."
            },
            {
              "stem": "A 45-year-old female with severe traumatic brain injury (GCS 7) develops signs of raised intracranial pressure (ICP). Which of the following is the MOST appropriate FIRST-LINE therapy to reduce ICP?",
              "options": [
                "Hyperventilation to PaCO2 25–30 mmHg",
                "Intravenous mannitol 20%",
                "Intravenous furosemide",
                "Induced hypothermia (34–35°C)"
              ],
              "answer": "Intravenous mannitol 20%",
              "explanation": "Mannitol is an osmotic diuretic used first-line to reduce ICP by drawing water out of brain tissue into the vascular space."
            },
            {
              "stem": "A 30-year-old female presents with a unilateral throbbing headache associated with photophobia and nausea. She reports that these headaches occur 2–3 times monthly and are preceded by visual disturbances. Which of the following is the MOST likely diagnosis?",
              "options": [
                "Tension-type headache",
                "Cluster headache",
                "Migraine with aura",
                "Sinus headache"
              ],
              "answer": "Migraine with aura",
              "explanation": "The presence of unilateral throbbing pain, photophobia, nausea, and visual aura is classic for migraine with aura."
            },
            {
              "stem": "A 50-year-old male with chronic alcohol dependence presents with confusion, ataxia, and ophthalmoplegia. Which of the following is the MOST likely cause of his symptoms?",
              "options": [
                "Alcohol withdrawal delirium",
                "Hepatic encephalopathy",
                "Wernicke encephalopathy",
                "Alcoholic cerebellar degeneration"
              ],
              "answer": "Wernicke encephalopathy",
              "explanation": "Wernicke encephalopathy is caused by thiamine (vitamin B1) deficiency and presents with the triad of confusion, ataxia, and ophthalmoplegia."
            },
            {
              "stem": "A 25-year-old male with schizophrenia reports hearing voices telling him to harm himself. He also exhibits flat affect and social withdrawal. Which of the following symptoms is classified as a NEGATIVE symptom?",
              "options": [
                "Auditory hallucinations",
                "Delusions of persecution",
                "Flat affect",
                "Disorganized speech"
              ],
              "answer": "Flat affect",
              "explanation": "Negative symptoms in schizophrenia include flat affect, alogia, avolition, and social withdrawal, reflecting a deficit in normal functioning."
            },
            {
              "stem": "A 40-year-old male with a history of alcohol dependence presents with tremors, diaphoresis, and agitation 48 hours after his last drink. Which of the following is the MOST appropriate initial therapy?",
              "options": [
                "Lorazepam",
                "Disulfiram",
                "Acamprosate",
                "Naltrexone"
              ],
              "answer": "Lorazepam",
              "explanation": "Benzodiazepines like lorazepam are first-line for alcohol withdrawal due to their efficacy in preventing seizures and delirium tremens."
            },
            {
              "stem": "A 35-year-old female with schizophrenia is started on olanzapine. Which of the following adverse effects is MOST commonly associated with olanzapine?",
              "options": [
                "Extrapyramidal symptoms",
                "Hyperprolactinemia",
                "Weight gain and metabolic syndrome",
                "Neuroleptic malignant syndrome"
              ],
              "answer": "Weight gain and metabolic syndrome",
              "explanation": "Olanzapine is associated with significant weight gain, dyslipidemia, and insulin resistance, contributing to metabolic syndrome."
            },
            {
              "stem": "A 28-year-old female with bipolar disorder is started on lithium. Which of the following laboratory parameters should be monitored MOST frequently during the first 3 months of therapy?",
              "options": [
                "Serum creatinine and thyroid function",
                "Liver enzymes",
                "Complete blood count",
                "Electrolytes"
              ],
              "answer": "Serum creatinine and thyroid function",
              "explanation": "Lithium can cause nephrogenic diabetes insipidus (monitoring serum creatinine) and hypothyroidism (monitoring TSH)."
            },
            {
              "stem": "A 60-year-old male with Parkinson’s disease is started on levodopa-carbidopa. Which of the following adverse effects is MOST likely to occur with long-term use?",
              "options": [
                "Bradykinesia",
                "Dyskinesias",
                "Orthostatic hypotension",
                "Hallucinations"
              ],
              "answer": "Dyskinesias",
              "explanation": "Long-term levodopa therapy is associated with motor fluctuations and dyskinesias due to pulsatile dopamine receptor stimulation."
            },
            {
              "stem": "A 30-year-old female with epilepsy is started on carbamazepine. Which of the following is a MOST important monitoring parameter for this patient?",
              "options": [
                "Serum sodium levels",
                "Liver enzymes",
                "White blood cell count",
                "Serum carbamazepine levels"
              ],
              "answer": "White blood cell count",
              "explanation": "Carbamazepine can cause agranulocytosis and aplastic anemia, necessitating regular monitoring of white blood cell counts."
            },
            {
              "stem": "A 25-year-old male presents with sudden-onset severe headache, neck stiffness, and photophobia. Lumbar puncture reveals xanthochromia. Which of the following is the MOST likely diagnosis?",
              "options": [
                "Migraine headache",
                "Subarachnoid hemorrhage",
                "Meningitis",
                "Cluster headache"
              ],
              "answer": "Subarachnoid hemorrhage",
              "explanation": "Sudden severe headache with neck stiffness and xanthochromia on lumbar puncture is diagnostic of subarachnoid hemorrhage."
            },
            {
              "stem": "A 45-year-old female with schizophrenia is started on risperidone. Which of the following is a MOST important counseling point regarding her medication?",
              "options": [
                "Avoid grapefruit juice",
                "Monitor for extrapyramidal symptoms",
                "Take with food to enhance absorption",
                "Avoid exposure to sunlight"
              ],
              "answer": "Monitor for extrapyramidal symptoms",
              "explanation": "Risperidone, an atypical antipsychotic, can cause extrapyramidal symptoms, particularly at higher doses."
            },
            {
              "stem": "A 35-year-old male with a history of opioid dependence is started on methadone maintenance therapy. Which of the following is the MOST appropriate monitoring parameter?",
              "options": [
                "Serum methadone levels",
                "QT interval on ECG",
                "Liver function tests",
                "Urine drug screens"
              ],
              "answer": "QT interval on ECG",
              "explanation": "Methadone can prolong the QT interval, increasing the risk of torsades de pointes, necessitating baseline and periodic ECG monitoring."
            },
            {
              "stem": "A 22-year-old female presents with recurrent episodes of intense fear, palpitations, and shortness of breath. Symptoms peak within 10 minutes and resolve spontaneously. Which of the following is the MOST likely diagnosis?",
              "options": [
                "Generalized anxiety disorder",
                "Panic disorder",
                "Social anxiety disorder",
                "Post-traumatic stress disorder"
              ],
              "answer": "Panic disorder",
              "explanation": "Recurrent, unexpected episodes of intense fear with physical symptoms peaking within 10 minutes are diagnostic of panic disorder."
            },
            {
              "stem": "A 50-year-old male with a history of alcohol dependence is started on disulfiram. Which of the following is the MOST important patient counseling point?",
              "options": [
                "Avoid all forms of alcohol, including topical products",
                "Take the medication with food to reduce nausea",
                "Monitor for signs of liver toxicity",
                "Avoid driving while taking the medication"
              ],
              "answer": "Avoid all forms of alcohol, including topical products",
              "explanation": "Disulfiram causes a severe disulfiram-ethanol reaction if alcohol is consumed, including topical alcohol in colognes or mouthwashes."
            },
            {
              "stem": "A 30-year-old female with bipolar disorder is started on valproate. Which of the following is a MOST important teratogenic risk associated with valproate?",
              "options": [
                "Cleft palate",
                "Neural tube defects",
                "Limb reduction defects",
                "Cardiac malformations"
              ],
              "answer": "Neural tube defects",
              "explanation": "Valproate is associated with a 1–5% risk of neural tube defects (e.g., spina bifida) if taken during the first trimester of pregnancy."
            },
            {
              "stem": "A 40-year-old male with schizophrenia is started on clozapine. Which of the following is a MOST important monitoring parameter for this patient?",
              "options": [
                "White blood cell count",
                "Serum glucose levels",
                "Liver enzymes",
                "Serum clozapine levels"
              ],
              "answer": "White blood cell count",
              "explanation": "Clozapine can cause agranulocytosis, necessitating weekly white blood cell count monitoring for the first 6 months of therapy."
            },
            {
              "stem": "A 25-year-old female with epilepsy is started on lamotrigine. Which of the following is a MOST important adverse effect to monitor for?",
              "options": [
                "Rash, including Stevens-Johnson syndrome",
                "Weight gain",
                "Sedation",
                "Hair loss"
              ],
              "answer": "Rash, including Stevens-Johnson syndrome",
              "explanation": "Lamotrigine is associated with a risk of serious skin reactions, including Stevens-Johnson syndrome, particularly with rapid titration."
            },
            {
              "stem": "A 35-year-old male with a history of alcohol dependence presents with confusion, nystagmus, and ataxia. Which of the following is the MOST appropriate immediate therapy?",
              "options": [
                "Intravenous thiamine",
                "Intravenous glucose",
                "Intravenous naloxone",
                "Intravenous benzodiazepines"
              ],
              "answer": "Intravenous thiamine",
              "explanation": "Thiamine deficiency in alcohol dependence can lead to Wernicke encephalopathy; immediate thiamine administration is critical to prevent progression."
            },
            {
              "stem": "A 40-year-old female with schizophrenia is started on haloperidol. Which of the following is a MOST likely extrapyramidal symptom (EPS) associated with haloperidol?",
              "options": [
                "Akathisia",
                "Sedation",
                "Weight gain",
                "Hyperprolactinemia"
              ],
              "answer": "Akathisia",
              "explanation": "Haloperidol, a typical antipsychotic, frequently causes akathisia, a distressing sense of inner restlessness and inability to sit still."
            },
            {
              "stem": "A 28-year-old male with a history of opioid dependence is started on buprenorphine-naloxone. Which of the following is the MOST important counseling point regarding this medication?",
              "options": [
                "Avoid alcohol while taking this medication",
                "Dissolve the tablet under the tongue and do not swallow",
                "Take the medication with food to enhance absorption",
                "Monitor for signs of respiratory depression"
              ],
              "answer": "Dissolve the tablet under the tongue and do not swallow",
              "explanation": "Buprenorphine-naloxone tablets must be dissolved sublingually to ensure proper absorption and to prevent diversion."
            },
            {
              "stem": "A 30-year-old female with bipolar disorder is started on lithium. Which of the following is a MOST important drug interaction to avoid?",
              "options": [
                "NSAIDs",
                "Proton pump inhibitors",
                "Calcium channel blockers",
                "Beta-blockers"
              ],
              "answer": "NSAIDs",
              "explanation": "NSAIDs can increase lithium levels by reducing renal clearance, increasing the risk of lithium toxicity."
            },
            {
              "stem": "A 45-year-old male with epilepsy is started on phenytoin. Which of the following is a MOST important adverse effect to monitor for?",
              "options": [
                "Gingival hyperplasia",
                "Weight loss",
                "Hypotension",
                "Bradycardia"
              ],
              "answer": "Gingival hyperplasia",
              "explanation": "Phenytoin commonly causes gingival hyperplasia, particularly in younger patients or those with poor oral hygiene."
            },
            {
              "stem": "A 25-year-old female with schizophrenia is started on aripiprazole. Which of the following is a MOST important advantage of aripiprazole over other antipsychotics?",
              "options": [
                "Lower risk of weight gain",
                "Lower risk of extrapyramidal symptoms",
                "Lower risk of QT prolongation",
                "Lower risk of sedation"
              ],
              "answer": "Lower risk of weight gain",
              "explanation": "Aripiprazole, an atypical antipsychotic, has a lower propensity for weight gain compared to olanzapine or clozapine."
            },
            {
              "stem": "A 30-year-old male with a history of alcohol dependence is started on acamprosate. Which of the following is the MOST important mechanism of action of acamprosate?",
              "options": [
                "Opioid receptor antagonist",
                "GABA agonist and glutamate antagonist",
                "Dopamine antagonist",
                "Serotonin reuptake inhibitor"
              ],
              "answer": "GABA agonist and glutamate antagonist",
              "explanation": "Acamprosate modulates GABA and glutamate neurotransmission to reduce craving and relapse in alcohol dependence."
            },
            {
              "stem": "A 40-year-old female with epilepsy is started on levetiracetam. Which of the following is a MOST important adverse effect to monitor for?",
              "options": [
                "Rash",
                "Behavioral changes",
                "Hepatotoxicity",
                "Nephrotoxicity"
              ],
              "answer": "Behavioral changes",
              "explanation": "Levetiracetam is associated with mood changes, irritability, and even psychosis in some patients."
            },
            {
              "stem": "A 28-year-old male with schizophrenia is started on olanzapine. Which of the following is a MOST important metabolic parameter to monitor?",
              "options": [
                "Serum potassium",
                "Fasting blood glucose and lipid profile",
                "Serum magnesium",
                "Liver enzymes"
              ],
              "answer": "Fasting blood glucose and lipid profile",
              "explanation": "Olanzapine is associated with significant weight gain, dyslipidemia, and insulin resistance, necessitating regular monitoring of metabolic parameters."
            },
            {
              "stem": "A 35-year-old female with bipolar disorder is started on carbamazepine. Which of the following is a MOST important drug interaction to avoid?",
              "options": [
                "Oral contraceptives",
                "Warfarin",
                "Lisinopril",
                "Metformin"
              ],
              "answer": "Oral contraceptives",
              "explanation": "Carbamazepine induces hepatic enzymes, reducing the efficacy of oral contraceptives and increasing the risk of unintended pregnancy."
            },
            {
              "stem": "A 40-year-old male with Parkinson’s disease is started on rasagiline. Which of the following is a MOST important dietary counseling point?",
              "options": [
                "Avoid high-protein meals",
                "Avoid tyramine-rich foods",
                "Avoid grapefruit juice",
                "Avoid caffeine"
              ],
              "answer": "Avoid tyramine-rich foods",
              "explanation": "Rasagiline is a MAO-B inhibitor; tyramine-rich foods can precipitate hypertensive crises in patients taking MAO inhibitors."
            },
            {
              "stem": "A 25-year-old female with epilepsy is started on topiramate. Which of the following is a MOST important adverse effect to monitor for?",
              "options": [
                "Weight gain",
                "Metabolic acidosis",
                "Sedation",
                "Hair loss"
              ],
              "answer": "Metabolic acidosis",
              "explanation": "Topiramate can cause hyperchloremic non-anion gap metabolic acidosis due to renal bicarbonate wasting."
            },
            {
              "stem": "A 30-year-old male with a history of opioid dependence is started on naltrexone. Which of the following is a MOST important patient counseling point?",
              "options": [
                "Take the medication with food to reduce nausea",
                "Avoid alcohol while taking this medication",
                "Naltrexone will block the effects of opioids for 24–72 hours",
                "Monitor for signs of respiratory depression"
              ],
              "answer": "Naltrexone will block the effects of opioids for 24–72 hours",
              "explanation": "Naltrexone is an opioid antagonist that blocks the effects of opioids for 24–72 hours, reducing craving and relapse risk."
            },
            {
              "stem": "A 45-year-old female with schizophrenia is started on ziprasidone. Which of the following is a MOST important adverse effect to monitor for?",
              "options": [
                "Weight gain",
                "QT prolongation",
                "Sedation",
                "Extrapyramidal symptoms"
              ],
              "answer": "QT prolongation",
              "explanation": "Ziprasidone is associated with a dose-dependent risk of QT prolongation, necessitating baseline and periodic ECG monitoring."
            },
            {
              "stem": "A 28-year-old male with epilepsy is started on zonisamide. Which of the following is a MOST important adverse effect to monitor for?",
              "options": [
                "Rash",
                "Metabolic acidosis",
                "Weight gain",
                "Hepatotoxicity"
              ],
              "answer": "Metabolic acidosis",
              "explanation": "Zonisamide can cause hyperchloremic non-anion gap metabolic acidosis due to renal bicarbonate wasting."
            },
            {
              "stem": "A 35-year-old female with bipolar disorder is started on quetiapine. Which of the following is a MOST important advantage of quetiapine over other antipsychotics?",
              "options": [
                "Lower risk of weight gain",
                "Lower risk of extrapyramidal symptoms",
                "Lower risk of QT prolongation",
                "Lower risk of sedation"
              ],
              "answer": "Lower risk of extrapyramidal symptoms",
              "explanation": "Quetiapine has a lower risk of extrapyramidal symptoms compared to typical antipsychotics and some atypical agents."
            },
            {
              "stem": "A 40-year-old male with Parkinson’s disease is started on entacapone. Which of the following is the MOST important mechanism of action of entacapone?",
              "options": [
                "Dopamine agonist",
                "COMT inhibitor",
                "MAO-B inhibitor",
                "Dopamine reuptake inhibitor"
              ],
              "answer": "COMT inhibitor",
              "explanation": "Entacapone inhibits catechol-O-methyltransferase (COMT), prolonging the action of levodopa by preventing its peripheral metabolism."
            },
            {
              "stem": "A 25-year-old female with schizophrenia is started on lurasidone. Which of the following is a MOST important advantage of lurasidone over other antipsychotics?",
              "options": [
                "Lower risk of weight gain",
                "Lower risk of QT prolongation",
                "Lower risk of sedation",
                "Lower risk of extrapyramidal symptoms"
              ],
              "answer": "Lower risk of weight gain",
              "explanation": "Lurasidone has a lower propensity for weight gain compared to olanzapine or clozapine, making it a preferred option for metabolic concerns."
            },
            {
              "stem": "A 30-year-old male with a history of alcohol dependence is started on disulfiram. Which of the following is the MOST important patient education point regarding disulfiram?",
              "options": [
                "Take the medication with food to reduce nausea",
                "Avoid all forms of alcohol, including hidden sources",
                "Monitor for signs of liver toxicity",
                "Avoid driving while taking the medication"
              ],
              "answer": "Avoid all forms of alcohol, including hidden sources",
              "explanation": "Disulfiram causes a severe reaction if alcohol is consumed, including hidden sources like mouthwash, cough syrups, or topical products."
            },
            {
              "stem": "A 45-year-old female with epilepsy is started on perampanel. Which of the following is a MOST important adverse effect to monitor for?",
              "options": [
                "Weight gain",
                "Behavioral changes",
                "Hepatotoxicity",
                "Nephrotoxicity"
              ],
              "answer": "Behavioral changes",
              "explanation": "Perampanel is associated with mood changes, irritability, and even aggression in some patients."
            },
            {
              "stem": "A 28-year-old male with schizophrenia is started on asenapine. Which of the following is a MOST important adverse effect to monitor for?",
              "options": [
                "Weight gain",
                "QT prolongation",
                "Sedation",
                "Extrapyramidal symptoms"
              ],
              "answer": "QT prolongation",
              "explanation": "Asenapine is associated with a dose-dependent risk of QT prolongation, necessitating baseline and periodic ECG monitoring."
            },
            {
              "stem": "A 35-year-old female with bipolar disorder is started on lamotrigine. Which of the following is a MOST important drug interaction to avoid?",
              "options": [
                "Valproate",
                "Carbamazepine",
                "Lithium",
                "Quetiapine"
              ],
              "answer": "Valproate",
              "explanation": "Valproate increases lamotrigine levels by inhibiting its metabolism, increasing the risk of serious skin reactions."
            },
            {
              "stem": "A 40-year-old male with Parkinson’s disease is started on pramipexole. Which of the following is a MOST important adverse effect to monitor for?",
              "options": [
                "Weight gain",
                "Sedation",
                "Impulse control disorders",
                "Hypotension"
              ],
              "answer": "Impulse control disorders",
              "explanation": "Dopamine agonists like pramipexole can cause impulse control disorders, including gambling, shopping, or hypersexuality."
            },
            {
              "stem": "A 25-year-old female with epilepsy is started on brivaracetam. Which of the following is a MOST important advantage of brivaracetam over levetiracetam?",
              "options": [
                "Lower risk of behavioral changes",
                "Lower risk of sedation",
                "Lower risk of weight gain",
                "Lower risk of rash"
              ],
              "answer": "Lower risk of behavioral changes",
              "explanation": "Brivaracetam has a lower risk of behavioral changes (e.g., agitation, aggression) compared to levetiracetam."
            },
            {
              "stem": "A 30-year-old male with a history of opioid dependence is started on buprenorphine. Which of the following is a MOST important advantage of buprenorphine over methadone?",
              "options": [
                "Lower risk of respiratory depression",
                "Longer duration of action",
                "Lower risk of diversion",
                "Lower risk of QT prolongation"
              ],
              "answer": "Lower risk of respiratory depression",
              "explanation": "Buprenorphine, a partial opioid agonist, has a ceiling effect on respiratory depression, reducing the risk of overdose compared to full agonists like methadone."
            },
            {
              "stem": "A 45-year-old female with schizophrenia is started on iloperidone. Which of the following is a MOST important adverse effect to monitor for?",
              "options": [
                "Weight gain",
                "QT prolongation",
                "Sedation",
                "Extrapyramidal symptoms"
              ],
              "answer": "QT prolongation",
              "explanation": "Iloperidone is associated with a dose-dependent risk of QT prolongation, necessitating baseline and periodic ECG monitoring."
            },
            {
              "stem": "A 28-year-old male with bipolar disorder is started on oxcarbazepine. Which of the following is a MOST important monitoring parameter?",
              "options": [
                "Serum sodium levels",
                "Liver enzymes",
                "White blood cell count",
                "Serum oxcarbazepine levels"
              ],
              "answer": "Serum sodium levels",
              "explanation": "Oxcarbazepine can cause hyponatremia, particularly in elderly patients or those on diuretics, necessitating regular monitoring of serum sodium."
            },
            {
              "stem": "A 35-year-old female with epilepsy is started on eslicarbazepine. Which of the following is a MOST important drug interaction to avoid?",
              "options": [
                "Oral contraceptives",
                "Warfarin",
                "Lisinopril",
                "Metformin"
              ],
              "answer": "Oral contraceptives",
              "explanation": "Eslicarbazepine induces hepatic enzymes, reducing the efficacy of oral contraceptives and increasing the risk of unintended pregnancy."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "List FOUR non-motor symptoms of Parkinson’s disease.",
              "modelAnswer": "1. Cognitive impairment (e.g., dementia, executive dysfunction)\n2. Mood disorders (e.g., depression, anxiety)\n3. Sleep disturbances (e.g., REM sleep behavior disorder, insomnia)\n4. Autonomic dysfunction (e.g., constipation, urinary incontinence, orthostatic hypotension)"
            },
            {
              "stem": "List FOUR differences between tension-type headaches and migraine headaches.",
              "modelAnswer": "1. **Duration**: Tension-type headaches typically last 30 minutes to 7 days; migraines last 4–72 hours.\n2. **Character of pain**: Tension-type headaches are bilateral, pressing/tightening; migraines are unilateral, throbbing.\n3. **Associated symptoms**: Tension-type headaches lack nausea/vomiting and photophobia/phonophobia; migraines often include these.\n4. **Triggers**: Tension-type headaches are often stress-related; migraines are triggered by hormonal changes, foods, or sensory stimuli."
            },
            {
              "stem": "Describe FOUR strategies used in the management of raised intracranial pressure (ICP) associated with traumatic brain injury (TBI).",
              "modelAnswer": "1. **Osmotic therapy**: Mannitol 20% or hypertonic saline to reduce brain water content.\n2. **Hyperventilation**: Temporary reduction in PaCO2 to 30–35 mmHg to cause cerebral vasoconstriction (short-term measure).\n3. **Sedation and analgesia**: Propofol or midazolam to reduce metabolic demand and ICP.\n4. **Surgical intervention**: Decompressive craniectomy for refractory ICP."
            },
            {
              "stem": "Elucidate FOUR modifiable risk factors for ischemic stroke.",
              "modelAnswer": "1. **Hypertension**: The most important modifiable risk factor; control with antihypertensives.\n2. **Dyslipidemia**: Elevated LDL cholesterol; manage with statins.\n3. **Diabetes mellitus**: Poor glycemic control increases stroke risk; optimize HbA1c.\n4. **Atrial fibrillation**: Anticoagulation (e.g., warfarin, DOACs) reduces embolic stroke risk."
            },
            {
              "stem": "Identify FOUR acute effects of marijuana use.",
              "modelAnswer": "1. **Euphoria and relaxation**: Due to activation of cannabinoid receptors in the brain.\n2. **Altered perception**: Enhanced sensory perception (e.g., colors, sounds).\n3. **Impaired coordination and reaction time**: Increased risk of accidents.\n4. **Tachycardia and increased appetite**: Due to stimulation of the sympathetic nervous system."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 30-year-old female (EC) presents to the emergency department with a generalized tonic-clonic seizure that has persisted for 25 minutes despite initial benzodiazepine administration. She has a history of epilepsy but has been non-adherent to her antiepileptic medication.\n(a) Elaborate the acute management of this patient.\n(b) Elucidate FOUR principles of chronic management of EC’s condition, assuming she is now pregnant.",
              "modelAnswer": {
                "a": {
                  "title": "Acute Management of Status Epilepticus",
                  "content": [
                    "1. **Benzodiazepine administration**: If not already given, administer IV lorazepam (0.1 mg/kg, max 4 mg) or IM midazolam (10 mg) to terminate seizure activity.\n2. **Second-line antiepileptic drug**: If seizures persist, administer IV fosphenytoin (20 PE/kg, max 1500 PE) or valproate (40 mg/kg, max 3000 mg) to prevent recurrence.\n3. **Airway and breathing support**: Ensure patent airway, administer oxygen, and prepare for intubation if respiratory depression occurs.\n4. **Circulatory support**: Monitor vital signs; administer IV fluids if hypotensive.\n5. **EEG monitoring**: Continuous EEG to assess for ongoing non-convulsive seizures.\n6. **Identify and treat underlying cause**: Check electrolytes (e.g., sodium, calcium, magnesium), glucose, and drug levels; consider neuroimaging if structural cause suspected."
                  ]
                },
                "b": {
                  "title": "Principles of Chronic Management in Pregnancy",
                  "content": [
                    "1. **Medication selection**: Use antiepileptic drugs with the lowest teratogenic risk (e.g., lamotrigine, levetiracetam). Avoid valproate and phenytoin due to high risk of neural tube defects and fetal hydantoin syndrome.\n2. **Dose optimization**: Maintain the lowest effective dose to minimize fetal exposure; monitor drug levels closely.\n3. **Folic acid supplementation**: Administer folic acid 5 mg/day to reduce the risk of neural tube defects, especially in the first trimester.\n4. **Multidisciplinary care**: Coordinate with obstetrics and neurology to balance seizure control with fetal safety; consider switching to monotherapy if possible."
                  ]
                }
              }
            },
            {
              "stem": "J.S. is a 55-year-old male (5’6”, 100 kg) who experienced a 15–20 minute episode of right arm paralysis and slurred speech yesterday. His symptoms resolved spontaneously. He has a history of smoking (25 pack-years), heavy alcohol use (3–6 beers/day), hypertension, gout, hyperlipidemia, and a carotid bruit. His BP is 165/100 mmHg, Hb 17 g/dL, hematocrit 55%, LDL cholesterol 300 mg/dL, HbA1c 10%, and Doppler ultrasound shows 90% stenosis on the left carotid artery.\n(a) Illustrate the data in J.S.’s history that is consistent with a transient ischemic attack (TIA).\n(b) Identify the initial and long-term goals in treating J.S.\n(c) Elaborate how the risk factors for J.S. can be modified to prevent further TIA.",
              "modelAnswer": {
                "a": {
                  "title": "Data Consistent with TIA",
                  "content": [
                    "1. **Focal neurological deficit**: Right arm paralysis and slurred speech.\n2. **Transient duration**: Symptoms lasted 15–20 minutes and resolved spontaneously.\n3. **Vascular risk factors**: Hypertension, hyperlipidemia, diabetes, smoking, heavy alcohol use.\n4. **Carotid artery disease**: 90% stenosis on the left carotid artery, a common source of embolic TIAs.\n5. **Polycythemia**: Elevated Hb and hematocrit, increasing blood viscosity and stroke risk."
                  ]
                },
                "b": {
                  "title": "Initial and Long-Term Goals in Treating J.S.",
                  "content": [
                    "1. **Initial goals**:\n   - Stabilize the patient and prevent progression to stroke.\n   - Initiate antiplatelet therapy (e.g., aspirin + clopidogrel) and statin therapy.\n   - Control hypertension and hyperglycemia.\n   - Refer for urgent carotid endarterectomy or stenting if indicated.\n2. **Long-term goals**:\n   - Reduce the risk of recurrent TIA or stroke.\n   - Achieve optimal blood pressure (<130/80 mmHg), LDL cholesterol (<70 mg/dL), and HbA1c (<7%).\n   - Promote smoking cessation and alcohol reduction.\n   - Ensure adherence to secondary prevention medications."
                  ]
                },
                "c": {
                  "title": "Modification of Risk Factors to Prevent Further TIA",
                  "content": [
                    "1. **Hypertension**: Initiate antihypertensive therapy (e.g., ACE inhibitor + thiazide diuretic) and monitor BP regularly.\n2. **Hyperlipidemia**: Start high-intensity statin therapy (e.g., atorvastatin 80 mg/day) to achieve LDL <70 mg/dL.\n3. **Diabetes**: Optimize glycemic control with metformin, SGLT2 inhibitors, or GLP-1 agonists; target HbA1c <7%.\n4. **Smoking cessation**: Provide counseling, nicotine replacement therapy, or varenicline to reduce cardiovascular risk.\n5. **Alcohol reduction**: Advise reduction to <2 standard drinks/day and refer to alcohol cessation programs if needed.\n6. **Carotid revascularization**: Urgent carotid endarterectomy or stenting for 90% stenosis to reduce embolic risk.\n7. **Antiplatelet therapy**: Continue dual antiplatelet therapy (aspirin + clopidogrel) for 21 days, then switch to monotherapy (e.g., aspirin or clopidogrel) for long-term secondary prevention."
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  },
  "exam-endo-onc-rheum": {
    "1": {
      "title": "Clinical Pharmacy — Endocrinology, Joint & Oncology",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "A 68-year-old woman with newly diagnosed primary hypothyroidism has a history of chronic kidney disease (eGFR 45 mL/min/1.73m²) and type 2 diabetes mellitus. Her current medications include metformin 1000 mg twice daily, lisinopril 10 mg daily, and atorvastatin 20 mg at bedtime. Which of the following is the most appropriate initial levothyroxine starting dose for this patient?",
              "options": [
                "25 mcg daily",
                "50 mcg daily",
                "75 mcg daily",
                "100 mcg daily"
              ],
              "answer": "25 mcg daily",
              "explanation": "In elderly patients with comorbidities such as CKD, a lower starting dose of levothyroxine (25 mcg daily) is recommended to avoid cardiac complications and excessive thyroid hormone levels."
            },
            {
              "stem": "A patient with hypothyroidism is started on levothyroxine 50 mcg daily. Which of the following medications should be separated from levothyroxine by at least 4 hours to avoid impaired absorption?",
              "options": [
                "Amlodipine",
                "Ferrous sulfate",
                "Omeprazole",
                "Simvastatin"
              ],
              "answer": "Ferrous sulfate",
              "explanation": "Ferrous sulfate can bind levothyroxine in the gastrointestinal tract, reducing its absorption. Separating administration by several hours minimizes this interaction."
            },
            {
              "stem": "A 55-year-old male with type 2 diabetes mellitus and hypertension is prescribed cisplatin for metastatic bladder cancer. Which of the following is a dose-limiting adverse effect of cisplatin that requires proactive monitoring?",
              "options": [
                "Nephrotoxicity",
                "Ototoxicity",
                "Cardiotoxicity",
                "Pulmonary fibrosis"
              ],
              "answer": "Ototoxicity",
              "explanation": "Cisplatin is associated with significant ototoxicity, which can be irreversible. Audiometry monitoring is recommended before and during treatment to detect early changes."
            },
            {
              "stem": "A 42-year-old female with type 1 diabetes mellitus is using a basal-bolus insulin regimen (glargine once daily and lispro before meals). Her fasting glucose is 6.8 mmol/L, but her post-prandial glucose at 2 hours after dinner is consistently 14.2 mmol/L. Which adjustment is most appropriate?",
              "options": [
                "Increase the evening glargine dose",
                "Increase the pre-dinner lispro dose",
                "Decrease the morning glargine dose",
                "Switch to a premixed insulin regimen"
              ],
              "answer": "Increase the pre-dinner lispro dose",
              "explanation": "Elevated post-prandial glucose suggests the need to increase the rapid-acting insulin dose at the meal preceding the high glucose reading."
            },
            {
              "stem": "Which of the following is NOT a recognized risk factor for type 2 diabetes mellitus?",
              "options": [
                "First-degree relative with diabetes",
                "Physical inactivity",
                "Hypertension (BP ≥ 140/90 mmHg)",
                "Body mass index (BMI) < 25 kg/m²"
              ],
              "answer": "Body mass index (BMI) < 25 kg/m²",
              "explanation": "Obesity (BMI ≥ 25 kg/m²) is a major risk factor for type 2 diabetes. A BMI < 25 kg/m² is not associated with increased risk."
            },
            {
              "stem": "A 70-year-old woman presents with epigastric pain and heartburn. Her medications include levothyroxine 75 mcg daily, metformin 500 mg twice daily, and ibuprofen 400 mg three times daily for osteoarthritis. Which drug therapy problem is most likely contributing to her symptoms?",
              "options": [
                "Metformin-induced lactic acidosis",
                "Ibuprofen-induced gastrointestinal bleeding",
                "Levothyroxine malabsorption",
                "Metformin-associated hypoglycemia"
              ],
              "answer": "Ibuprofen-induced gastrointestinal bleeding",
              "explanation": "Chronic NSAID use without gastroprotection increases the risk of GI bleeding and peptic ulcer disease, particularly in elderly patients."
            },
            {
              "stem": "A 60-year-old male with type 2 diabetes mellitus presents to the pharmacy with a blood glucose reading of 2.9 mmol/L and confusion. His wife asks for advice. What is the most appropriate immediate action?",
              "options": [
                "Administer 15–20 grams of oral glucose and retest in 15 minutes",
                "Give a carbohydrate-rich meal and retest in 1 hour",
                "Administer 1 unit of glucagon subcutaneously",
                "Call emergency services immediately"
              ],
              "answer": "Administer 15–20 grams of oral glucose and retest in 15 minutes",
              "explanation": "For conscious patients with hypoglycemia, oral glucose (15–20 grams) is the first-line treatment, followed by retesting in 15 minutes."
            },
            {
              "stem": "A 65-year-old male with chronic kidney disease (eGFR 30 mL/min/1.73m²) and gout is prescribed naproxen 500 mg twice daily for an acute gout attack. Which of the following is a contraindication to naproxen in this patient?",
              "options": [
                "Concurrent use of allopurinol",
                "History of peptic ulcer disease",
                "Chronic kidney disease",
                "Age > 60 years"
              ],
              "answer": "Chronic kidney disease",
              "explanation": "NSAIDs, including naproxen, are contraindicated in patients with significant renal impairment due to the risk of further decline in kidney function."
            },
            {
              "stem": "Following resolution of an acute gout attack, a patient is started on allopurinol for long-term urate-lowering therapy. Which of the following counseling points should be emphasized?",
              "options": [
                "Take allopurinol on an empty stomach to enhance absorption",
                "Increase fluid intake to at least 2 liters daily",
                "Limit exposure to sunlight due to photosensitivity",
                "Discontinue if a rash develops"
              ],
              "answer": "Increase fluid intake to at least 2 liters daily",
              "explanation": "Adequate hydration helps prevent uric acid crystallization in the urinary tract and reduces the risk of kidney stones."
            },
            {
              "stem": "A community pharmacist is designing a diabetes education program for newly diagnosed patients. Which of the following topics is LEAST relevant for this group?",
              "options": [
                "Strategies to minimize cardiac risk factors",
                "Technique for mixing insulins",
                "Appropriate dietary recommendations",
                "Surgical management of diabetes"
              ],
              "answer": "Surgical management of diabetes",
              "explanation": "Surgical interventions (e.g., bariatric surgery) are not typically part of initial diabetes education for newly diagnosed patients."
            },
            {
              "stem": "Which of the following scenarios is an appropriate reason to temporarily withhold metformin?",
              "options": [
                "Receipt of oral contrast for a CT scan",
                "Mild upper respiratory tract infection",
                "New diagnosis of stage I hypertension",
                "Post-prandial glucose > 10 mmol/L"
              ],
              "answer": "Receipt of oral contrast for a CT scan",
              "explanation": "Metformin should be withheld before and for 48 hours after iodinated contrast procedures due to the risk of lactic acidosis."
            },
            {
              "stem": "A 55-year-old male with hypertension and gout asks about the use of thiazide diuretics. Which of the following conditions is a contraindication to thiazide diuretics as first-line therapy?",
              "options": [
                "Hyperlipidemia",
                "Heart failure with reduced ejection fraction",
                "Chronic obstructive pulmonary disease",
                "Gout"
              ],
              "answer": "Gout",
              "explanation": "Thiazide diuretics can increase uric acid levels and precipitate gout attacks, making them unsuitable as first-line therapy in patients with gout."
            },
            {
              "stem": "Patients taking sulfonylureas should be counseled about which of the following risks?",
              "options": [
                "Weight loss and nausea",
                "Hypoglycemia and its recognition",
                "Photosensitivity reactions",
                "Hyperkalemia"
              ],
              "answer": "Hypoglycemia and its recognition",
              "explanation": "Sulfonylureas stimulate insulin secretion and carry a significant risk of hypoglycemia, which patients must be educated to recognize and manage."
            },
            {
              "stem": "Amiodarone is associated with which endocrine adverse effect?",
              "options": [
                "Hyperthyroidism",
                "Hypothyroidism",
                "Diabetes insipidus",
                "Cushing's syndrome"
              ],
              "answer": "Hypothyroidism",
              "explanation": "Amiodarone can cause hypothyroidism due to its high iodine content and direct toxic effects on the thyroid gland."
            },
            {
              "stem": "A 50-year-old woman with type 2 diabetes mellitus has an HbA1c of 9.5%, AST of 250 IU/L, and serum creatinine of 2.2 mg/dL. Which antidiabetic agent is contraindicated in this patient?",
              "options": [
                "Insulin",
                "Metformin",
                "Pioglitazone",
                "Empagliflozin"
              ],
              "answer": "Metformin",
              "explanation": "Metformin is contraindicated in patients with significant renal impairment (eGFR < 30 mL/min/1.73m²) due to the risk of lactic acidosis."
            },
            {
              "stem": "A 28-year-old woman presents with palpitations, weight loss, heat intolerance, and a fine tremor. Thyroid function tests confirm hyperthyroidism. Which of the following is the most appropriate initial treatment?",
              "options": [
                "Propranolol 20 mg four times daily",
                "Propylthiouracil 300 mg three times daily",
                "Radioactive iodine (131I) 100 mCi",
                "Potassium iodide (SSKI) 10 drops three times daily"
              ],
              "answer": "Propranolol 20 mg four times daily",
              "explanation": "Beta-blockers (e.g., propranolol) are used initially to control adrenergic symptoms while awaiting definitive therapy."
            },
            {
              "stem": "A 26-year-old pregnant woman is diagnosed with Graves' disease. Which of the following is the preferred antithyroid drug for this patient?",
              "options": [
                "Methimazole",
                "Propylthiouracil",
                "Radioactive iodine",
                "Levothyroxine"
              ],
              "answer": "Propylthiouracil",
              "explanation": "Propylthiouracil is preferred in the first trimester of pregnancy due to a lower risk of teratogenicity compared to methimazole."
            },
            {
              "stem": "Iodides (e.g., Lugol's solution) are used preoperatively in hyperthyroid patients to:",
              "options": [
                "Inhibit thyroid hormone synthesis",
                "Decrease thyroid gland vascularity",
                "Block peripheral conversion of T4 to T3",
                "Ameliorate thyrotoxic symptoms"
              ],
              "answer": "Decrease thyroid gland vascularity",
              "explanation": "Iodides reduce thyroid gland vascularity, making surgery safer by minimizing bleeding risk."
            },
            {
              "stem": "A 58-year-old male presents with polyuria, polydipsia, and polyphagia but no urinary urgency or dysuria. His symptoms have been present for 2 months. Which of the following is the most likely diagnosis?",
              "options": [
                "Urinary tract infection",
                "Benign prostatic hyperplasia",
                "Type 2 diabetes mellitus",
                "Renal complications of hypertension"
              ],
              "answer": "Type 2 diabetes mellitus",
              "explanation": "Polyuria, polydipsia, and polyphagia are classic symptoms of uncontrolled diabetes mellitus."
            },
            {
              "stem": "Which of the following cytotoxic agents requires preparation in a biological safety cabinet due to its vesicant properties and high risk of severe tissue damage?",
              "options": [
                "Doxorubicin",
                "Cisplatin",
                "Paclitaxel",
                "5-fluorouracil"
              ],
              "answer": "Doxorubicin",
              "explanation": "Doxorubicin is a vesicant and requires preparation in a biological safety cabinet to prevent exposure and severe tissue damage."
            },
            {
              "stem": "A 75-year-old patient with hypothyroidism has been on levothyroxine 75 mcg daily for 6 weeks. Which parameter is most appropriate for assessing the effectiveness of therapy?",
              "options": [
                "Weight loss",
                "Improved vision",
                "Increased energy levels",
                "Reduced frequency of angina"
              ],
              "answer": "Increased energy levels",
              "explanation": "Clinical improvement in symptoms such as fatigue and energy levels is a key indicator of effective levothyroxine therapy."
            },
            {
              "stem": "A 45-year-old woman with rheumatoid arthritis is started on methotrexate 7.5 mg once weekly. Which of the following should be monitored regularly to assess for toxicity?",
              "options": [
                "Serum creatinine",
                "Liver function tests",
                "Electrocardiogram",
                "Pulmonary function tests"
              ],
              "answer": "Liver function tests",
              "explanation": "Methotrexate can cause hepatotoxicity, so liver function tests (e.g., AST, ALT) should be monitored regularly."
            },
            {
              "stem": "A patient receiving high-dose methotrexate for osteosarcoma is given leucovorin rescue. What is the purpose of leucovorin?",
              "options": [
                "Enhance methotrexate efficacy",
                "Reduce methotrexate toxicity to normal cells",
                "Prevent methotrexate-induced nephrotoxicity",
                "Accelerate methotrexate clearance"
              ],
              "answer": "Reduce methotrexate toxicity to normal cells",
              "explanation": "Leucovorin is a folinic acid derivative that rescues normal cells from methotrexate toxicity by bypassing the dihydrofolate reductase inhibition."
            },
            {
              "stem": "A 50-year-old male with Hodgkin lymphoma develops cardiomyopathy after receiving a cumulative dose of an anticancer drug. Which drug is most likely responsible?",
              "options": [
                "Bleomycin",
                "Cisplatin",
                "Doxorubicin",
                "Vincristine"
              ],
              "answer": "Doxorubicin",
              "explanation": "Doxorubicin is associated with dose-dependent cardiotoxicity, which can lead to cardiomyopathy and heart failure."
            },
            {
              "stem": "A patient receiving combination chemotherapy with doxorubicin, cyclophosphamide, and fluorouracil is given filgrastim starting 24 hours after chemotherapy. What is the primary purpose of filgrastim?",
              "options": [
                "Control chemotherapy-induced nausea",
                "Reduce the risk of neutropenia and infections",
                "Prevent doxorubicin-induced cardiotoxicity",
                "Enhance the anticancer effects of chemotherapy"
              ],
              "answer": "Reduce the risk of neutropenia and infections",
              "explanation": "Filgrastim is a granulocyte colony-stimulating factor (G-CSF) used to shorten the duration of chemotherapy-induced neutropenia."
            },
            {
              "stem": "Allopurinol is administered prophylactically before chemotherapy to prevent which complication?",
              "options": [
                "Chemotherapy-induced nausea",
                "Tumor lysis syndrome",
                "Myelosuppression",
                "Hyperuricemia"
              ],
              "answer": "Hyperuricemia",
              "explanation": "Allopurinol inhibits xanthine oxidase, reducing uric acid production and preventing hyperuricemia associated with tumor lysis syndrome."
            },
            {
              "stem": "Ondansetron is administered to prevent chemotherapy-induced nausea and vomiting. Which receptor does ondansetron primarily block?",
              "options": [
                "Dopamine D2 receptor",
                "Serotonin 5-HT3 receptor",
                "Histamine H1 receptor",
                "Muscarinic acetylcholine receptor"
              ],
              "answer": "Serotonin 5-HT3 receptor",
              "explanation": "Ondansetron is a selective 5-HT3 receptor antagonist used to prevent chemotherapy-induced nausea and vomiting."
            },
            {
              "stem": "A 30-year-old woman with Graves' disease is treated with radioactive iodine (131I). Which of the following is a permanent effect of this treatment?",
              "options": [
                "Hypothyroidism",
                "Hyperthyroidism",
                "Thyroid storm",
                "Thyroid nodules"
              ],
              "answer": "Hypothyroidism",
              "explanation": "Radioactive iodine ablation of the thyroid gland often leads to permanent hypothyroidism, requiring lifelong levothyroxine replacement."
            },
            {
              "stem": "The most reliable guide to adjusting levothyroxine dose in a patient with hypothyroidism is:",
              "options": [
                "Serum free T4 level",
                "Serum TSH level",
                "Body weight",
                "Pulse rate"
              ],
              "answer": "Serum TSH level",
              "explanation": "TSH is the most sensitive marker for assessing levothyroxine therapy adequacy, as it reflects thyroid hormone levels at the pituitary level."
            },
            {
              "stem": "A major disadvantage of sulfonylureas in type 2 diabetes management is:",
              "options": [
                "Risk of hypoglycemia",
                "Weight gain",
                "High cost",
                "Gastrointestinal intolerance"
              ],
              "answer": "Risk of hypoglycemia",
              "explanation": "Sulfonylureas stimulate insulin secretion and can cause hypoglycemia, particularly in elderly or malnourished patients."
            },
            {
              "stem": "In type 2 diabetes management, which of the following is NOT a rational consideration for drug choice?",
              "options": [
                "Patient characteristics and preferences",
                "Efficacy and durability of glucose-lowering effect",
                "Potential for cardiovascular and renal benefits",
                "Color of the pill"
              ],
              "answer": "Color of the pill",
              "explanation": "The color of a medication is not a clinically relevant factor in drug selection for diabetes management."
            },
            {
              "stem": "Which of the following is a risk factor for type 2 diabetes mellitus?",
              "options": [
                "Family history of diabetes",
                "High intake of dietary fat",
                "Being overweight",
                "All of the options listed"
              ],
              "answer": "All of the options listed",
              "explanation": "Family history, overweight/obesity, and high dietary fat intake are all recognized risk factors for type 2 diabetes."
            },
            {
              "stem": "Which statement best describes the differences between type 1 and type 2 diabetes?",
              "options": [
                "Type 1 diabetes is milder and requires lower insulin doses",
                "Type 2 diabetes is associated with autoimmune destruction of beta cells",
                "Type 1 diabetes is associated with autoimmune factors",
                "Type 2 diabetes can be managed with oral hypoglycemic agents alone"
              ],
              "answer": "Type 1 diabetes is associated with autoimmune factors",
              "explanation": "Type 1 diabetes is characterized by autoimmune destruction of pancreatic beta cells, whereas type 2 diabetes is primarily due to insulin resistance."
            },
            {
              "stem": "According to diabetes prevention trials, which intervention reduces the risk of developing type 2 diabetes in high-risk individuals?",
              "options": [
                "Very low carbohydrate diet",
                "Daily vigorous exercise",
                "Weight loss of 5–7% of body weight with a hypocaloric low-fat diet and 30 minutes of daily activity",
                "Metformin 850 mg twice daily"
              ],
              "answer": "Weight loss of 5–7% of body weight with a hypocaloric low-fat diet and 30 minutes of daily activity",
              "explanation": "Lifestyle modifications, including weight loss and increased physical activity, have been shown to reduce the risk of type 2 diabetes in high-risk individuals."
            },
            {
              "stem": "Which of the following is a diagnostic criterion for diabetes?",
              "options": [
                "Random blood glucose > 180 mg/dL (10 mmol/L) with symptoms",
                "Fasting blood glucose > 126 mg/dL (7.0 mmol/L) on two separate occasions",
                "2-hour plasma glucose > 200 mg/dL (11.1 mmol/L) during an OGTT",
                "All of the options listed"
              ],
              "answer": "All of the options listed",
              "explanation": "Any of these criteria can be used to diagnose diabetes if confirmed on a separate day."
            },
            {
              "stem": "All of the following are clinical features of diabetic ketoacidosis EXCEPT:",
              "options": [
                "Abdominal pain and vomiting",
                "Tachypnea and tachycardia",
                "Cheyne-Stokes respiration",
                "Kussmaul breathing"
              ],
              "answer": "Cheyne-Stokes respiration",
              "explanation": "Cheyne-Stokes respiration is not typical of diabetic ketoacidosis; Kussmaul breathing (deep, rapid respirations) is characteristic."
            },
            {
              "stem": "What is the first step in the management of diabetic ketoacidosis?",
              "options": [
                "Administer intravenous insulin",
                "Administer intravenous fluids",
                "Administer bicarbonate",
                "Administer potassium"
              ],
              "answer": "Administer intravenous fluids",
              "explanation": "Fluid resuscitation is the first priority in DKA to restore intravascular volume and improve tissue perfusion."
            },
            {
              "stem": "Which of the following is an example of autonomic neuropathy in diabetes?",
              "options": [
                "Gastroparesis and silent myocardial infarction",
                "Foot ulcers and skin infections",
                "Excessive perspiration on lower extremities",
                "Decreased taste and smell sensation"
              ],
              "answer": "Gastroparesis and silent myocardial infarction",
              "explanation": "Autonomic neuropathy can affect gastrointestinal motility (gastroparesis) and cardiac autonomic function (silent MI)."
            },
            {
              "stem": "A 77-year-old diabetic patient on IV insulin (7 IU/h) and 0.9% saline develops a plasma glucose of 3.2 mmol/L. The insulin infusion is continued, and 5% dextrose is started at 250 mL/h. What is the next appropriate step?",
              "options": [
                "Decrease insulin infusion to 4 IU/h",
                "Stop insulin infusion and start subcutaneous insulin",
                "Continue insulin infusion at 7 IU/h",
                "Increase insulin infusion to 10 IU/h"
              ],
              "answer": "Continue insulin infusion at 7 IU/h",
              "explanation": "Insulin infusion should be continued to maintain glucose control, with dextrose added to prevent hypoglycemia."
            },
            {
              "stem": "Which statement about hyperosmolar hyperglycemic state (HHS) is true?",
              "options": [
                "Mortality rate is approximately 1%",
                "Precipitating events include myocardial infarction",
                "Patients usually have normal renal function",
                "Hyperglycemia is due to excessive oral carbohydrate intake"
              ],
              "answer": "Precipitating events include myocardial infarction",
              "explanation": "Myocardial infarction, infection, and other acute illnesses are common precipitating factors for HHS."
            },
            {
              "stem": "Which statement about HHS is false?",
              "options": [
                "Altered mental status is the most common reason for hospital presentation",
                "In a comatose patient with effective serum osmolality < 320 mOsm/kg, another cause of impaired mental state should be sought",
                "Patients with HHS usually have an increased anion gap metabolic acidosis",
                "Insulin therapy lowers potassium and may cause severe hypokalemia"
              ],
              "answer": "Patients with HHS usually have an increased anion gap metabolic acidosis",
              "explanation": "HHS is characterized by hyperosmolarity and hyperglycemia without significant ketoacidosis (normal anion gap)."
            },
            {
              "stem": "All of the following are predisposing factors for hypoglycemia in insulin-treated patients EXCEPT:",
              "options": [
                "Renal failure",
                "Older age",
                "Alcohol ingestion",
                "Concomitant use of chlorthalidone"
              ],
              "answer": "Older age",
              "explanation": "Older age is not a direct predisposing factor for hypoglycemia; renal failure, alcohol, and certain medications (e.g., chlorthalidone) are."
            },
            {
              "stem": "Which statement about metformin is correct?",
              "options": [
                "Metformin is contraindicated in all patients with serum creatinine > 1.4 mg/dL (123.8 µmol/L)",
                "Metformin can be used safely in patients hospitalized for heart failure",
                "Metformin is contraindicated in patients with GFR < 30 mL/min/1.73m²",
                "Metformin is contraindicated in patients with chronic stable angina"
              ],
              "answer": "Metformin is contraindicated in patients with GFR < 30 mL/min/1.73m²",
              "explanation": "Metformin is contraindicated in severe renal impairment (eGFR < 30 mL/min/1.73m²) due to the risk of lactic acidosis."
            },
            {
              "stem": "Which statement about cerebral edema in DKA is correct?",
              "options": [
                "Cerebral edema never occurs before fluid administration",
                "Treatment includes discontinuation of insulin",
                "Cerebral edema is more frequent in younger patients with new-onset type 1 diabetes",
                "Patients present with tachycardia"
              ],
              "answer": "Cerebral edema is more frequent in younger patients with new-onset type 1 diabetes",
              "explanation": "Cerebral edema is a rare but serious complication of DKA, more common in children and adolescents with new-onset type 1 diabetes."
            },
            {
              "stem": "A 52-year-old woman presents with acute gout affecting the first metatarsophalangeal joint. Colchicine is prescribed for pain relief. Which adverse effect is most likely with high-dose colchicine?",
              "options": [
                "Behavioral changes including psychosis",
                "Severe diarrhea",
                "Hypertension",
                "Rash"
              ],
              "answer": "Severe diarrhea",
              "explanation": "High-dose colchicine commonly causes gastrointestinal adverse effects, including severe diarrhea and nausea."
            },
            {
              "stem": "Which of the following is an appropriate initial methotrexate dose for rheumatoid arthritis?",
              "options": [
                "50 mg orally daily",
                "50 mg orally once weekly",
                "7.5 mg orally daily",
                "7.5 mg orally once weekly"
              ],
              "answer": "7.5 mg orally once weekly",
              "explanation": "Methotrexate for rheumatoid arthritis is typically initiated at 7.5 mg once weekly, with gradual dose escalation as tolerated."
            },
            {
              "stem": "Hydroxychloroquine toxicity monitoring should include assessment for:",
              "options": [
                "Increased frequency of urination",
                "Visual changes",
                "Dry mouth",
                "Drowsiness"
              ],
              "answer": "Visual changes",
              "explanation": "Hydroxychloroquine can cause retinal toxicity; regular ophthalmologic monitoring is essential to detect early changes."
            },
            {
              "stem": "Which virus does NOT cause cancer as a result of chronic infection?",
              "options": [
                "Herpes simplex virus (HSV)",
                "Human papillomavirus (HPV)",
                "Hepatitis B virus (HBV)",
                "Epstein-Barr virus (EBV)"
              ],
              "answer": "Herpes simplex virus (HSV)",
              "explanation": "HSV is not associated with chronic infection leading to cancer, unlike HPV, HBV, and EBV."
            },
            {
              "stem": "Which patient is at highest risk for cervical cancer?",
              "options": [
                "A 21-year-old with first sexual partner at age 14 and 10+ sexual partners",
                "A 32-year-old in a monogamous relationship who declined the HPV vaccine",
                "A 60-year-old with a history of syphilis and cigarette smoking",
                "None of the patients are at risk"
              ],
              "answer": "A 21-year-old with first sexual partner at age 14 and 10+ sexual partners",
              "explanation": "Multiple sexual partners and early sexual debut increase the risk of HPV infection, the primary cause of cervical cancer."
            },
            {
              "stem": "Which of the following is a hormonal agent used in breast cancer chemotherapy?",
              "options": [
                "Tamoxifen citrate",
                "Ifosfamide",
                "Carmustine",
                "Methotrexate"
              ],
              "answer": "Tamoxifen citrate",
              "explanation": "Tamoxifen is a selective estrogen receptor modulator used in the treatment and prevention of hormone receptor-positive breast cancer."
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
              "explanation": "Cachexia is a multifactorial syndrome characterized by severe body weight, muscle, and fat loss, often seen in advanced cancer."
            },
            {
              "stem": "Chronic myelogenous leukemia (CML) is characterized by a chromosomal abnormality that is a target for targeted therapy. Which drug is the treatment of choice?",
              "options": [
                "Bleomycin",
                "Imatinib",
                "Mechlorethamine",
                "Tamoxifen"
              ],
              "answer": "Imatinib",
              "explanation": "Imatinib is a tyrosine kinase inhibitor that targets the BCR-ABL fusion protein in CML, making it the treatment of choice."
            },
            {
              "stem": "Intrathecal methotrexate is administered to children with acute lymphoblastic leukemia (ALL) for:",
              "options": [
                "CNS prophylaxis",
                "Increase systemic drug levels",
                "Reduce toxicity",
                "Enhance compliance"
              ],
              "answer": "CNS prophylaxis",
              "explanation": "Intrathecal methotrexate is used to prevent or treat CNS leukemia, as systemic chemotherapy does not adequately penetrate the blood-brain barrier."
            },
            {
              "stem": "A patient receiving ABVD chemotherapy for Hodgkin lymphoma presents with shortness of breath and a dry cough. Chest X-ray shows pulmonary infiltrates. Which drug in the regimen is most likely responsible?",
              "options": [
                "Bleomycin",
                "Dacarbazine",
                "Doxorubicin",
                "Vinblastine"
              ],
              "answer": "Bleomycin",
              "explanation": "Bleomycin is associated with pulmonary toxicity, including pneumonitis and pulmonary fibrosis, which can present with cough and dyspnea."
            },
            {
              "stem": "A 43-year-old man treated for Hodgkin lymphoma with MOPP followed by ABVD develops cardiomyopathy and congestive heart failure 4 years later. Which drug is most likely responsible?",
              "options": [
                "Adriamycin (doxorubicin)",
                "Bleomycin",
                "Dacarbazine",
                "Mechlorethamine"
              ],
              "answer": "Adriamycin (doxorubicin)",
              "explanation": "Doxorubicin is a anthracycline with dose-dependent cardiotoxicity, which can manifest years after treatment."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 72-year-old woman with type 2 diabetes mellitus (HbA1c 10.2%) is reluctant to start insulin despite maximal oral therapy. Identify two treatment goals for this patient.",
              "modelAnswer": "1. Achieve glycemic control (target HbA1c < 7% or individualized based on patient factors).\n2. Prevent or delay microvascular and macrovascular complications (e.g., retinopathy, nephropathy, cardiovascular disease)."
            },
            {
              "stem": "Explain how you would escalate treatment in this patient as per the AACE treatment algorithm.",
              "modelAnswer": "1. Assess patient’s willingness and barriers to insulin therapy.\n2. Consider initiating basal insulin (e.g., glargine or detemir) with or without oral agents, starting at a low dose (e.g., 10 units or 0.1–0.2 units/kg/day) and titrating based on fasting glucose levels.\n3. If basal insulin is insufficient, consider adding rapid-acting insulin before meals or switching to a premixed insulin regimen.\n4. Provide education on insulin administration, monitoring, and hypoglycemia recognition."
            },
            {
              "stem": "Elaborate on three patient counseling points regarding the new medication this patient requires.",
              "modelAnswer": "1. Insulin administration technique: Demonstrate proper injection site rotation, needle disposal, and pen device use.\n2. Hypoglycemia recognition and management: Teach symptoms (e.g., sweating, shakiness) and actions (e.g., 15–20 grams of oral glucose, retest in 15 minutes).\n3. Importance of adherence and follow-up: Emphasize regular glucose monitoring, scheduled follow-up visits, and lifestyle modifications (diet, exercise)."
            },
            {
              "stem": "J.K is a 68-year-old farmer with primary hyperthyroidism, congestive heart failure, and current medications of furosemide 40 mg daily and lisinopril 10 mg daily. (a) Elaborate on three causes of primary hyperthyroidism.",
              "modelAnswer": "1. Graves’ disease: Autoimmune disorder causing diffuse goiter and hyperthyroidism.\n2. Toxic multinodular goiter: Autonomous thyroid nodules producing excess thyroid hormone.\n3. Toxic adenoma: Single autonomous thyroid nodule causing hyperthyroidism."
            },
            {
              "stem": "Describe two parameters that should be monitored while treating J.K’s hyperthyroidism.",
              "modelAnswer": "1. Thyroid function tests (TSH, free T4): Monitor every 4–6 weeks initially to assess response to therapy and adjust antithyroid drug doses.\n2. Cardiac function: Monitor for worsening heart failure, arrhythmias (e.g., atrial fibrillation), and tachycardia due to hyperthyroidism."
            },
            {
              "stem": "T.M is a 53-year-old lady with 9 weeks of joint pain and stiffness. As the pharmacist developing her pharmaceutical care plan: List four questions you would ask about her joint pain and stiffness.",
              "modelAnswer": "1. Location and symmetry of joint involvement (e.g., small vs. large joints, symmetric vs. asymmetric).\n2. Duration and pattern of stiffness (e.g., morning stiffness > 1 hour suggests inflammatory arthritis).\n3. Presence of systemic symptoms (e.g., fever, fatigue, weight loss).\n4. History of trauma, recent infections, or family history of autoimmune diseases."
            },
            {
              "stem": "The attending medical officer requests several tests. A diagnosis of rheumatoid arthritis is made. Propose a pharmaceutical care plan for the management of T.M.",
              "modelAnswer": "1. Pharmacologic therapy: Start methotrexate 7.5–15 mg once weekly with folic acid supplementation. Consider adding a short course of glucocorticoids (e.g., prednisone 5–10 mg daily) for symptom control.\n2. Monitoring: Baseline and regular liver function tests, CBC, and renal function. Monitor for methotrexate toxicity (e.g., stomatitis, cytopenias).\n3. Patient education: Counsel on methotrexate administration, potential adverse effects, and the importance of adherence. Advise on contraception (methotrexate is teratogenic).\n4. Non-pharmacologic interventions: Recommend physical therapy, exercise, and joint protection strategies. Provide resources for support groups and occupational therapy."
            },
            {
              "stem": "Identify one regimen used for the management of Hodgkin lymphoma.",
              "modelAnswer": "ABVD regimen: Doxorubicin (Adriamycin) 25 mg/m², Bleomycin 10 units/m², Vinblastine 6 mg/m², Dacarbazine 375 mg/m², administered on days 1 and 15 of a 28-day cycle."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A.M is a 24-year-old patient admitted to the HDU with polyuria, polydipsia, lower abdominal pain for 2 weeks, confusion, and vital signs showing BP 88/56 mmHg, PR 100 bpm, RR 25/min, and temperature 40°C. Laboratory results: RBS 24 mmol/L, K+ 4.5 mEq/L, Na+ 143 mEq/L, pH 7.1, anion gap 18, HCO3- 16 mEq/L. (i) Identify the most likely diagnosis. (ii) Suggest two reasons for your answer. (iii) Using the information provided, identify the most likely trigger for this condition. (iv) Describe the stepwise acute management for this patient.",
              "modelAnswer": {
                "Diagnosis": "Diabetic ketoacidosis (DKA) with possible hyperosmolar component.",
                "Reasons": "1. Hyperglycemia (RBS 24 mmol/L) with metabolic acidosis (pH 7.1, anion gap 18) and reduced bicarbonate (HCO3- 16 mEq/L) consistent with ketoacidosis.\n2. Clinical presentation of polyuria, polydipsia, confusion, and hypotension is typical of DKA.",
                "Trigger": "Most likely an acute infection (e.g., urinary tract infection, pneumonia) given the presence of fever (40°C) and lower abdominal pain.",
                "Management": {
                  "Step 1: Fluid resuscitation": "Administer 0.9% normal saline 1–1.5 L over the first hour to restore intravascular volume and improve tissue perfusion. Subsequent fluids based on hydration status and electrolytes (e.g., switch to 0.45% saline if sodium is high).",
                  "Step 2: Insulin therapy": "Start regular insulin infusion at 0.1 units/kg/h (e.g., 7–10 units/h for a 70 kg patient) after confirming potassium > 3.3 mEq/L. Target glucose reduction of 3–5 mmol/L/h.",
                  "Step 3: Potassium replacement": "If serum potassium is < 5.3 mEq/L and urine output is adequate, add potassium chloride to IV fluids (e.g., 20–40 mEq/L) to maintain potassium 4–5 mEq/L.",
                  "Step 4: Monitor and correct acidosis": "Bicarbonate is rarely needed unless pH < 6.9 or severe hyperkalemia. Monitor pH and anion gap to assess resolution of acidosis.",
                  "Step 5: Identify and treat precipitating factors": "Investigate and treat underlying causes (e.g., infection) with appropriate antibiotics if indicated.",
                  "Step 6: Transition to subcutaneous insulin": "Once acidosis resolves (pH > 7.3, bicarbonate > 18 mEq/L, anion gap < 12), transition to basal-bolus insulin regimen and monitor for resolution of ketosis."
                }
              }
            },
            {
              "stem": "Elucidate the treatment and prevention of the following toxicities associated with cancer chemotherapy: (i) Febrile neutropenia, (ii) Chemotherapy-induced nausea and vomiting (for highly emetogenic and moderately emetogenic regimens), (iii) Extravasation of paclitaxel, nitrogen mustard, and mitomycin.",
              "modelAnswer": {
                "Febrile neutropenia": {
                  "Prevention": "1. Use of granulocyte colony-stimulating factors (G-CSFs) such as filgrastim or pegfilgrastim in patients at high risk (e.g., chemotherapy with >20% risk of febrile neutropenia).\n2. Antimicrobial prophylaxis (e.g., fluoroquinolones) in select high-risk patients.\n3. Dose reduction or delay of chemotherapy if appropriate.",
                  "Treatment": "1. Empiric broad-spectrum antibiotics (e.g., piperacillin-tazobactam or carbapenem) within 1 hour of presentation.\n2. Monitor for sepsis and escalate care as needed (e.g., ICU admission for septic shock).\n3. Consider antifungal or antiviral prophylaxis if neutropenia persists >7 days."
                },
                "Chemotherapy-induced nausea and vomiting (CINV)": {
                  "Highly emetogenic regimens (e.g., cisplatin)**: ": 1.4,
                  "  1.4  0.05  0.05  0.05  0.05  0.05  0.05  0.05  0.05  0.05  0.05  0.05  0.05  0.05  ": "1. Serotonin 5-HT3 receptor antagonist (e.g., ondansetron 16–24 mg IV or palonosetron 0.25 mg IV) on day 1.\n2. Neurokinin-1 (NK1) receptor antagonist (e.g., aprepitant 125 mg PO on day 1, then 80 mg PO on days 2–3).\n3. Dexamethasone 12 mg IV on day 1, then 8 mg PO/IV on days 2–4.\n4. Consider olanzapine 5–10 mg PO on days 1–4 for additional antiemetic coverage.",
                  "Moderately emetogenic regimens (e.g., carboplatin)**: ": 1.4,
                  "  1.4  0.05  0.05  0.05  0.05  0.05  0.05  0.05  0.05  0.05  ": "1. Serotonin 5-HT3 receptor antagonist (e.g., ondansetron 8–16 mg IV or granisetron 1 mg IV) on day 1.\n2. Dexamethasone 8–12 mg IV on day 1.\n3. Consider NK1 receptor antagonist (e.g., aprepitant) for select regimens.\n4. Provide take-home antiemetics (e.g., metoclopramide, prochlorperazine) for breakthrough nausea."
                },
                "Extravasation management": {
                  "Paclitaxel": "1. Stop infusion immediately and disconnect IV line (leave cannula in place).\n2. Aspirate residual drug from the IV line.\n3. Administer hyaluronidase 150–250 units subcutaneously around the extravasation site to enhance drug dispersion.\n4. Apply warm compresses and elevate the limb.\n5. Monitor for tissue necrosis and consider plastic surgery consultation if severe.",
                  "Nitrogen mustard (e.g., mechlorethamine)**: ": 1.4,
                  "  1.4  0.05  0.05  0.05  0.05  0.05  0.05  0.05  0.05  ": "1. Stop infusion immediately and disconnect IV line.\n2. Aspirate residual drug and administer sodium thiosulfate 1/6 M solution subcutaneously around the site to neutralize the drug.\n3. Apply cold compresses to reduce inflammation.\n4. Monitor for tissue necrosis and consider surgical debridement if severe.",
                  "Mitomycin": "1. Stop infusion immediately and disconnect IV line.\n2. Aspirate residual drug and administer dimethyl sulfoxide (DMSO) 99% topically to the site to reduce tissue damage.\n3. Apply cold compresses.\n4. Monitor for delayed tissue necrosis and consider surgical intervention if severe."
                }
              }
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Clinical Pharmacy — Endocrinology, Joint & Oncology",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "A 68-year-old male with newly diagnosed hypothyroidism (TSH 12 mU/L, free T4 8 pmol/L) is started on levothyroxine 50 mcg daily. Which of the following factors is the primary reason for initiating therapy at this low dose?",
              "options": [
                "a. Age-related decrease in drug clearance",
                "b. Presence of coronary artery disease",
                "c. Concurrent use of atorvastatin",
                "d. History of chronic constipation"
              ],
              "answer": "b. Presence of coronary artery disease",
              "explanation": "Levothyroxine initiation in elderly patients with coronary artery disease should begin at low doses (25–50 mcg) to avoid precipitating angina or arrhythmias due to increased myocardial oxygen demand."
            },
            {
              "stem": "A patient with hypothyroidism is advised to take levothyroxine on an empty stomach 30–60 minutes before breakfast. Which of the following is the primary reason for this instruction?",
              "options": [
                "a. Enhance absorption by reducing gastric pH",
                "b. Minimize interaction with dietary fiber",
                "c. Prevent degradation by stomach acid",
                "d. Avoid chelation with divalent cations"
              ],
              "answer": "d. Avoid chelation with divalent cations",
              "explanation": "Levothyroxine absorption is impaired by food and divalent cations (e.g., calcium, iron). Taking it on an empty stomach maximizes bioavailability."
            },
            {
              "stem": "A 55-year-old female with type 2 diabetes mellitus and chronic kidney disease (eGFR 45 mL/min/1.73m²) is admitted for a CT scan with contrast. Which of the following is the most appropriate action regarding her metformin therapy?",
              "options": [
                "a. Continue metformin as usual",
                "b. Withhold metformin for 48 hours post-procedure",
                "c. Switch to insulin temporarily",
                "d. Reduce metformin dose by 50%"
              ],
              "answer": "b. Withhold metformin for 48 hours post-procedure",
              "explanation": "Metformin should be withheld 48 hours before and after iodinated contrast administration due to the risk of lactic acidosis, especially in patients with renal impairment."
            },
            {
              "stem": "A 42-year-old male with type 1 diabetes mellitus presents with recurrent hypoglycemia (glucose 3.2 mmol/L) despite reducing his basal insulin dose. Which of the following is the most likely cause?",
              "options": [
                "a. Increased physical activity",
                "b. Concurrent use of metformin",
                "c. Development of renal impairment",
                "d. Poor absorption of insulin"
              ],
              "answer": "a. Increased physical activity",
              "explanation": "Increased physical activity increases insulin sensitivity, leading to a higher risk of hypoglycemia in insulin-dependent patients."
            },
            {
              "stem": "A 60-year-old female with a history of gout is prescribed allopurinol 100 mg daily. Which of the following counseling points is most critical to prevent acute gout flares during initiation?",
              "options": [
                "a. Take with food to reduce GI upset",
                "b. Maintain high fluid intake",
                "c. Use NSAIDs or colchicine for 1–2 weeks",
                "d. Limit purine-rich foods indefinitely"
              ],
              "answer": "c. Use NSAIDs or colchicine for 1–2 weeks",
              "explanation": "Allopurinol initiation can precipitate acute gout flares due to rapid urate mobilization; prophylactic NSAIDs or colchicine for 1–2 weeks is recommended."
            },
            {
              "stem": "A 70-year-old male with hypertension, diabetes, and CKD (eGFR 30 mL/min/1.73m²) is prescribed ibuprofen 400 mg TID for osteoarthritis. Which of the following is the most significant risk associated with this regimen?",
              "options": [
                "a. Hyperkalemia",
                "b. Acute kidney injury",
                "c. Hypoglycemia",
                "d. Bradycardia"
              ],
              "answer": "b. Acute kidney injury",
              "explanation": "NSAIDs, especially in elderly patients with CKD, increase the risk of acute kidney injury due to prostaglandin inhibition and reduced renal perfusion."
            },
            {
              "stem": "A 50-year-old female with metastatic breast cancer is receiving doxorubicin and cyclophosphamide. Which of the following is the most appropriate monitoring parameter to assess for doxorubicin-induced cardiotoxicity?",
              "options": [
                "a. Serum troponin levels",
                "b. Left ventricular ejection fraction (LVEF)",
                "c. Serum potassium",
                "d. Electrocardiogram (ECG)"
              ],
              "answer": "b. Left ventricular ejection fraction (LVEF)",
              "explanation": "Doxorubicin is associated with dose-dependent cardiotoxicity; LVEF monitoring (e.g., echocardiogram) is essential to detect early cardiac dysfunction."
            },
            {
              "stem": "A 35-year-old male with Hodgkin lymphoma is receiving ABVD chemotherapy (doxorubicin, bleomycin, vinblastine, dacarbazine). Which of the following adverse effects is most specific to bleomycin?",
              "options": [
                "a. Myelosuppression",
                "b. Pulmonary fibrosis",
                "c. Nephrotoxicity",
                "d. Peripheral neuropathy"
              ],
              "answer": "b. Pulmonary fibrosis",
              "explanation": "Bleomycin is uniquely associated with pulmonary toxicity, including pulmonary fibrosis and interstitial pneumonitis, which requires baseline and serial pulmonary function tests."
            },
            {
              "stem": "A 65-year-old female with rheumatoid arthritis is started on methotrexate 7.5 mg weekly. Which of the following is the most important baseline investigation before initiating therapy?",
              "options": [
                "a. Serum ferritin",
                "b. Chest X-ray",
                "c. Serum creatinine",
                "d. Electrocardiogram"
              ],
              "answer": "b. Chest X-ray",
              "explanation": "Methotrexate can cause pulmonary toxicity (e.g., pneumonitis); a baseline chest X-ray is recommended to rule out pre-existing lung disease."
            },
            {
              "stem": "A 40-year-old male with type 2 diabetes mellitus has an HbA1c of 9.5% despite metformin and glibenclamide. The physician decides to add insulin glargine. Which of the following is the most appropriate starting dose?",
              "options": [
                "a. 0.1 units/kg/day",
                "b. 0.2 units/kg/day",
                "c. 10 units/day",
                "d. 20 units/day"
              ],
              "answer": "a. 0.1 units/kg/day",
              "explanation": "For patients transitioning to basal insulin, a conservative starting dose of 0.1–0.2 units/kg/day is recommended to minimize hypoglycemia risk."
            },
            {
              "stem": "A 55-year-old female with hyperthyroidism is started on carbimazole 15 mg daily. Which of the following is the most serious adverse effect requiring immediate discontinuation?",
              "options": [
                "a. Mild rash",
                "b. Agranulocytosis",
                "c. Mild leukopenia",
                "d. Headache"
              ],
              "answer": "b. Agranulocytosis",
              "explanation": "Agranulocytosis is a rare but life-threatening adverse effect of thionamides (e.g., carbimazole, methimazole); immediate discontinuation and urgent hematology review are required."
            },
            {
              "stem": "A 72-year-old male with prostate cancer is receiving goserelin (LHRH agonist) therapy. Which of the following is the most likely long-term adverse effect?",
              "options": [
                "a. Hypercalcemia",
                "b. Osteoporosis",
                "c. Hypoglycemia",
                "d. Hypertension"
              ],
              "answer": "b. Osteoporosis",
              "explanation": "LHRH agonists (e.g., goserelin) suppress testosterone, leading to decreased bone mineral density and increased risk of osteoporosis and fractures."
            },
            {
              "stem": "A 45-year-old female with metastatic colorectal cancer is receiving FOLFOX (5-fluorouracil, leucovorin, oxaliplatin). Which of the following is the most appropriate premedication to prevent oxaliplatin-induced neuropathy?",
              "options": [
                "a. Dexamethasone",
                "b. Calcium gluconate and magnesium sulfate",
                "c. Ondansetron",
                "d. Lorazepam"
              ],
              "answer": "b. Calcium gluconate and magnesium sulfate",
              "explanation": "Oxaliplatin-induced neurotoxicity (e.g., cold-induced dysesthesia) can be mitigated by calcium and magnesium infusions before and after chemotherapy."
            },
            {
              "stem": "A 60-year-old male with type 2 diabetes mellitus and CKD (eGFR 25 mL/min/1.73m²) is admitted with lactic acidosis. Which of the following antidiabetic agents is most likely responsible?",
              "options": [
                "a. Metformin",
                "b. Glibenclamide",
                "c. Pioglitazone",
                "d. Insulin glargine"
              ],
              "answer": "a. Metformin",
              "explanation": "Metformin is contraindicated in severe renal impairment (eGFR <30 mL/min/1.73m²) due to the risk of lactic acidosis."
            },
            {
              "stem": "A 50-year-old female with breast cancer is receiving tamoxifen. Which of the following is the most important monitoring parameter for this patient?",
              "options": [
                "a. Serum calcium",
                "b. Endometrial thickness (transvaginal ultrasound)",
                "c. Serum potassium",
                "d. Liver function tests"
              ],
              "answer": "b. Endometrial thickness (transvaginal ultrasound)",
              "explanation": "Tamoxifen is associated with an increased risk of endometrial cancer; regular gynecological surveillance (e.g., transvaginal ultrasound) is recommended."
            },
            {
              "stem": "A 30-year-old female with Graves' disease is treated with radioactive iodine (131I). Which of the following is the most appropriate post-treatment counseling point?",
              "options": [
                "a. Avoid close contact with children for 1 week",
                "b. Expect immediate resolution of hyperthyroidism",
                "c. Use contraception for at least 6 months",
                "d. Expect transient hypothyroidism followed by euthyroidism"
              ],
              "answer": "a. Avoid close contact with children for 1 week",
              "explanation": "Radioactive iodine emits radiation; patients should avoid close contact with children and pregnant women for 1 week post-treatment to minimize radiation exposure."
            },
            {
              "stem": "A 65-year-old male with hypertension and gout is prescribed hydrochlorothiazide. Which of the following is the most likely effect of this therapy on his gout?",
              "options": [
                "a. Reduced risk of gout flares",
                "b. Increased risk of gout flares",
                "c. No effect on gout",
                "d. Reduced uric acid levels"
              ],
              "answer": "b. Increased risk of gout flares",
              "explanation": "Thiazide diuretics (e.g., hydrochlorothiazide) increase serum uric acid levels by reducing renal excretion, thereby increasing the risk of gout flares."
            },
            {
              "stem": "A 40-year-old female with type 2 diabetes mellitus is started on empagliflozin. Which of the following is the most important patient counseling point?",
              "options": [
                "a. Take with food to reduce GI upset",
                "b. Monitor for signs of hypoglycemia",
                "c. Increase fluid intake to prevent dehydration",
                "d. Avoid grapefruit juice"
              ],
              "answer": "c. Increase fluid intake to prevent dehydration",
              "explanation": "SGLT2 inhibitors (e.g., empagliflozin) cause osmotic diuresis, increasing the risk of dehydration and hypotension; adequate fluid intake is essential."
            },
            {
              "stem": "A 55-year-old male with metastatic prostate cancer is receiving abiraterone. Which of the following is the most important baseline investigation before initiating therapy?",
              "options": [
                "a. Serum testosterone",
                "b. Liver function tests",
                "c. Electrocardiogram (ECG)",
                "d. Serum potassium"
              ],
              "answer": "b. Liver function tests",
              "explanation": "Abiraterone is hepatotoxic; baseline and regular liver function tests are required to monitor for hepatotoxicity."
            },
            {
              "stem": "A 60-year-old female with rheumatoid arthritis is started on hydroxychloroquine. Which of the following is the most important monitoring parameter for this patient?",
              "options": [
                "a. Serum creatinine",
                "b. Visual acuity and retinal examination",
                "c. Serum potassium",
                "d. Liver function tests"
              ],
              "answer": "b. Visual acuity and retinal examination",
              "explanation": "Hydroxychloroquine can cause irreversible retinal toxicity; baseline and annual ophthalmologic examinations are recommended."
            },
            {
              "stem": "A 45-year-old male with type 2 diabetes mellitus and CKD (eGFR 40 mL/min/1.73m²) is prescribed linagliptin. Which of the following is the primary advantage of linagliptin in this patient?",
              "options": [
                "a. Does not require dose adjustment in renal impairment",
                "b. Causes significant weight loss",
                "c. Reduces cardiovascular risk",
                "d. Does not cause hypoglycemia"
              ],
              "answer": "a. Does not require dose adjustment in renal impairment",
              "explanation": "Linagliptin is primarily excreted via the biliary system, making it suitable for patients with renal impairment without dose adjustment."
            },
            {
              "stem": "A 50-year-old female with metastatic breast cancer is receiving paclitaxel. Which of the following is the most appropriate premedication to prevent hypersensitivity reactions?",
              "options": [
                "a. Dexamethasone and diphenhydramine",
                "b. Ondansetron and aprepitant",
                "c. Lorazepam and metoclopramide",
                "d. Ranitidine and famotidine"
              ],
              "answer": "a. Dexamethasone and diphenhydramine",
              "explanation": "Paclitaxel can cause severe hypersensitivity reactions; premedication with dexamethasone and diphenhydramine is standard to prevent these reactions."
            },
            {
              "stem": "A 65-year-old male with type 2 diabetes mellitus is prescribed semaglutide. Which of the following is the most important patient counseling point?",
              "options": [
                "a. Inject subcutaneously into the abdomen",
                "b. Take with food to enhance absorption",
                "c. Monitor for signs of pancreatitis",
                "d. Expect immediate weight loss"
              ],
              "answer": "c. Monitor for signs of pancreatitis",
              "explanation": "GLP-1 receptor agonists (e.g., semaglutide) are associated with an increased risk of pancreatitis; patients should be advised to report severe abdominal pain."
            },
            {
              "stem": "A 70-year-old female with osteoporosis is prescribed alendronate. Which of the following is the most appropriate administration instruction?",
              "options": [
                "a. Take with food to reduce GI upset",
                "b. Take at bedtime to enhance absorption",
                "c. Take with a full glass of water and remain upright for 30 minutes",
                "d. Take with calcium supplements to enhance efficacy"
              ],
              "answer": "c. Take with a full glass of water and remain upright for 30 minutes",
              "explanation": "Bisphosphonates (e.g., alendronate) must be taken with a full glass of water and the patient should remain upright for 30–60 minutes to reduce the risk of esophageal irritation."
            },
            {
              "stem": "A 55-year-old male with type 2 diabetes mellitus is started on canagliflozin. Which of the following is the most significant adverse effect associated with this therapy?",
              "options": [
                "a. Hypoglycemia",
                "b. Hyperkalemia",
                "c. Genital mycotic infections",
                "d. Weight gain"
              ],
              "answer": "c. Genital mycotic infections",
              "explanation": "SGLT2 inhibitors (e.g., canagliflozin) increase urinary glucose excretion, predisposing patients to genital mycotic infections (e.g., candidiasis)."
            },
            {
              "stem": "A 60-year-old female with metastatic colorectal cancer is receiving FOLFIRI (5-fluorouracil, leucovorin, irinotecan). Which of the following is the most appropriate premedication to prevent irinotecan-induced diarrhea?",
              "options": [
                "a. Dexamethasone",
                "b. Atropine",
                "c. Ondansetron",
                "d. Loperamide"
              ],
              "answer": "b. Atropine",
              "explanation": "Irinotecan can cause early-onset diarrhea due to cholinergic effects; atropine is administered as premedication to prevent this adverse effect."
            },
            {
              "stem": "A 45-year-old male with type 1 diabetes mellitus is admitted with diabetic ketoacidosis (DKA). Which of the following is the most appropriate initial fluid therapy?",
              "options": [
                "a. 0.9% normal saline",
                "b. 0.45% normal saline",
                "c. 5% dextrose",
                "d. Hartmann's solution"
              ],
              "answer": "a. 0.9% normal saline",
              "explanation": "Initial fluid resuscitation in DKA is with 0.9% normal saline (1–1.5 L in the first hour) to restore intravascular volume and improve tissue perfusion."
            },
            {
              "stem": "A 50-year-old female with rheumatoid arthritis is started on tofacitinib. Which of the following is the most important baseline investigation before initiating therapy?",
              "options": [
                "a. Serum creatinine",
                "b. Liver function tests",
                "c. Complete blood count (CBC)",
                "d. Chest X-ray"
              ],
              "answer": "c. Complete blood count (CBC)",
              "explanation": "Tofacitinib is associated with myelosuppression; baseline and regular CBC monitoring is required to detect neutropenia or anemia."
            },
            {
              "stem": "A 65-year-old male with hypertension and diabetes is prescribed chlorthalidone. Which of the following is the most significant adverse effect associated with this therapy?",
              "options": [
                "a. Hyperkalemia",
                "b. Hypoglycemia",
                "c. Hyperuricemia",
                "d. Bradycardia"
              ],
              "answer": "c. Hyperuricemia",
              "explanation": "Thiazide diuretics (e.g., chlorthalidone) increase serum uric acid levels by reducing renal excretion, thereby increasing the risk of gout flares."
            },
            {
              "stem": "A 55-year-old female with metastatic breast cancer is receiving trastuzumab. Which of the following is the most important monitoring parameter for this patient?",
              "options": [
                "a. Serum calcium",
                "b. Left ventricular ejection fraction (LVEF)",
                "c. Serum potassium",
                "d. Electrocardiogram (ECG)"
              ],
              "answer": "b. Left ventricular ejection fraction (LVEF)",
              "explanation": "Trastuzumab is associated with cardiotoxicity; LVEF monitoring (e.g., echocardiogram) is essential to detect early cardiac dysfunction."
            },
            {
              "stem": "A 40-year-old male with type 2 diabetes mellitus is started on dulaglutide. Which of the following is the most important patient counseling point?",
              "options": [
                "a. Inject subcutaneously into the thigh",
                "b. Take with food to enhance absorption",
                "c. Monitor for signs of thyroid tumors",
                "d. Expect immediate weight loss"
              ],
              "answer": "c. Monitor for signs of thyroid tumors",
              "explanation": "GLP-1 receptor agonists (e.g., dulaglutide) have a warning for thyroid C-cell tumors; patients should be advised to report neck lumps or difficulty swallowing."
            },
            {
              "stem": "A 60-year-old female with osteoporosis is prescribed denosumab. Which of the following is the most appropriate administration instruction?",
              "options": [
                "a. Take with food to reduce GI upset",
                "b. Take at bedtime to enhance absorption",
                "c. Administer subcutaneously every 6 months",
                "d. Take with calcium supplements to enhance efficacy"
              ],
              "answer": "c. Administer subcutaneously every 6 months",
              "explanation": "Denosumab is administered subcutaneously every 6 months for the treatment of osteoporosis."
            },
            {
              "stem": "A 55-year-old male with type 2 diabetes mellitus is prescribed empagliflozin. Which of the following is the most significant cardiovascular benefit associated with this therapy?",
              "options": [
                "a. Reduced risk of hypoglycemia",
                "b. Reduced risk of heart failure hospitalization",
                "c. Increased weight loss",
                "d. Reduced risk of pancreatitis"
              ],
              "answer": "b. Reduced risk of heart failure hospitalization",
              "explanation": "Empagliflozin has been shown to reduce the risk of heart failure hospitalization in patients with type 2 diabetes mellitus and established cardiovascular disease."
            },
            {
              "stem": "A 65-year-old female with metastatic breast cancer is receiving capecitabine. Which of the following is the most appropriate monitoring parameter for this patient?",
              "options": [
                "a. Serum calcium",
                "b. Hand-foot syndrome",
                "c. Serum potassium",
                "d. Electrocardiogram (ECG)"
              ],
              "answer": "b. Hand-foot syndrome",
              "explanation": "Capecitabine is associated with hand-foot syndrome (palmar-plantar erythrodysesthesia); patients should be monitored for this adverse effect and advised on preventive measures."
            },
            {
              "stem": "A 45-year-old male with type 2 diabetes mellitus is started on pioglitazone. Which of the following is the most significant adverse effect associated with this therapy?",
              "options": [
                "a. Hypoglycemia",
                "b. Weight gain",
                "c. Hyperkalemia",
                "d. Bradycardia"
              ],
              "answer": "b. Weight gain",
              "explanation": "Thiazolidinediones (e.g., pioglitazone) are associated with weight gain due to fluid retention and increased subcutaneous fat deposition."
            },
            {
              "stem": "A 50-year-old female with rheumatoid arthritis is started on leflunomide. Which of the following is the most important baseline investigation before initiating therapy?",
              "options": [
                "a. Serum creatinine",
                "b. Liver function tests",
                "c. Complete blood count (CBC)",
                "d. Chest X-ray"
              ],
              "answer": "b. Liver function tests",
              "explanation": "Leflunomide is hepatotoxic; baseline and regular liver function tests are required to monitor for hepatotoxicity."
            },
            {
              "stem": "A 60-year-old male with type 2 diabetes mellitus is prescribed sitagliptin. Which of the following is the primary advantage of sitagliptin in this patient?",
              "options": [
                "a. Does not cause hypoglycemia",
                "b. Causes significant weight loss",
                "c. Reduces cardiovascular risk",
                "d. Does not require dose adjustment in renal impairment"
              ],
              "answer": "a. Does not cause hypoglycemia",
              "explanation": "DPP-4 inhibitors (e.g., sitagliptin) rarely cause hypoglycemia when used as monotherapy, making them a safer option for patients prone to hypoglycemia."
            },
            {
              "stem": "A 55-year-old female with metastatic colorectal cancer is receiving cetuximab. Which of the following is the most important baseline investigation before initiating therapy?",
              "options": [
                "a. Serum calcium",
                "b. RAS mutation status",
                "c. Serum potassium",
                "d. Electrocardiogram (ECG)"
              ],
              "answer": "b. RAS mutation status",
              "explanation": "Cetuximab is only effective in patients with wild-type KRAS and NRAS tumors; RAS mutation status must be determined before initiating therapy."
            },
            {
              "stem": "A 40-year-old male with type 2 diabetes mellitus is started on dapagliflozin. Which of the following is the most significant adverse effect associated with this therapy?",
              "options": [
                "a. Hypoglycemia",
                "b. Hyperkalemia",
                "c. Genital mycotic infections",
                "d. Weight gain"
              ],
              "answer": "c. Genital mycotic infections",
              "explanation": "SGLT2 inhibitors (e.g., dapagliflozin) increase urinary glucose excretion, predisposing patients to genital mycotic infections (e.g., candidiasis)."
            },
            {
              "stem": "A 65-year-old female with osteoporosis is prescribed risedronate. Which of the following is the most appropriate administration instruction?",
              "options": [
                "a. Take with food to reduce GI upset",
                "b. Take at bedtime to enhance absorption",
                "c. Take with a full glass of water and remain upright for 30 minutes",
                "d. Take with calcium supplements to enhance efficacy"
              ],
              "answer": "c. Take with a full glass of water and remain upright for 30 minutes",
              "explanation": "Bisphosphonates (e.g., risedronate) must be taken with a full glass of water and the patient should remain upright for 30–60 minutes to reduce the risk of esophageal irritation."
            },
            {
              "stem": "A 50-year-old male with type 2 diabetes mellitus is prescribed liraglutide. Which of the following is the most important patient counseling point?",
              "options": [
                "a. Inject subcutaneously into the abdomen",
                "b. Take with food to enhance absorption",
                "c. Monitor for signs of pancreatitis",
                "d. Expect immediate weight loss"
              ],
              "answer": "c. Monitor for signs of pancreatitis",
              "explanation": "GLP-1 receptor agonists (e.g., liraglutide) are associated with an increased risk of pancreatitis; patients should be advised to report severe abdominal pain."
            },
            {
              "stem": "A 60-year-old female with metastatic breast cancer is receiving everolimus. Which of the following is the most important monitoring parameter for this patient?",
              "options": [
                "a. Serum calcium",
                "b. Mucositis",
                "c. Serum potassium",
                "d. Electrocardiogram (ECG)"
              ],
              "answer": "b. Mucositis",
              "explanation": "Everolimus is associated with mucositis/stomatitis; patients should be monitored for this adverse effect and advised on oral hygiene and symptomatic management."
            },
            {
              "stem": "A 45-year-old male with type 2 diabetes mellitus is started on ertugliflozin. Which of the following is the most significant cardiovascular benefit associated with this therapy?",
              "options": [
                "a. Reduced risk of hypoglycemia",
                "b. Reduced risk of heart failure hospitalization",
                "c. Increased weight loss",
                "d. Reduced risk of pancreatitis"
              ],
              "answer": "b. Reduced risk of heart failure hospitalization",
              "explanation": "SGLT2 inhibitors (e.g., ertugliflozin) have been shown to reduce the risk of heart failure hospitalization in patients with type 2 diabetes mellitus and established cardiovascular disease."
            },
            {
              "stem": "A 55-year-old female with rheumatoid arthritis is started on baricitinib. Which of the following is the most important baseline investigation before initiating therapy?",
              "options": [
                "a. Serum creatinine",
                "b. Liver function tests",
                "c. Complete blood count (CBC)",
                "d. Chest X-ray"
              ],
              "answer": "c. Complete blood count (CBC)",
              "explanation": "Baricitinib is associated with myelosuppression; baseline and regular CBC monitoring is required to detect neutropenia or anemia."
            },
            {
              "stem": "A 60-year-old male with type 2 diabetes mellitus is prescribed alogliptin. Which of the following is the primary advantage of alogliptin in this patient?",
              "options": [
                "a. Does not cause hypoglycemia",
                "b. Causes significant weight loss",
                "c. Reduces cardiovascular risk",
                "d. Does not require dose adjustment in renal impairment"
              ],
              "answer": "a. Does not cause hypoglycemia",
              "explanation": "DPP-4 inhibitors (e.g., alogliptin) rarely cause hypoglycemia when used as monotherapy, making them a safer option for patients prone to hypoglycemia."
            },
            {
              "stem": "A 50-year-old female with metastatic breast cancer is receiving bevacizumab. Which of the following is the most important monitoring parameter for this patient?",
              "options": [
                "a. Serum calcium",
                "b. Blood pressure",
                "c. Serum potassium",
                "d. Electrocardiogram (ECG)"
              ],
              "answer": "b. Blood pressure",
              "explanation": "Bevacizumab is associated with hypertension; blood pressure should be monitored closely and managed aggressively to prevent complications."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 68-year-old male with type 2 diabetes mellitus (HbA1c 8.5%) and CKD (eGFR 45 mL/min/1.73m²) is admitted for a CT scan with contrast. Outline the steps you would take to manage his diabetes medications peri-procedurally.",
              "modelAnswer": "1. Withhold metformin 48 hours before and after the procedure due to the risk of lactic acidosis with iodinated contrast.\n2. Ensure adequate hydration with intravenous fluids (e.g., 0.9% normal saline) before and after the procedure to maintain renal perfusion.\n3. Monitor serum creatinine and electrolytes pre- and post-procedure to assess for contrast-induced nephropathy.\n4. Consider temporary use of short-acting insulin (e.g., insulin aspart) for glycemic control during hospitalization, with close monitoring of blood glucose levels.\n5. Resume metformin only after confirming normal renal function (eGFR >45 mL/min/1.73m²) and absence of contrast-induced nephropathy."
            },
            {
              "stem": "A 55-year-old female with rheumatoid arthritis is started on methotrexate 7.5 mg weekly. List four essential baseline investigations and explain their relevance.",
              "modelAnswer": "1. **Chest X-ray**: To assess for pre-existing lung disease (e.g., interstitial lung disease) as methotrexate can exacerbate or cause pulmonary toxicity.\n2. **Liver function tests (LFTs)**: To establish baseline liver function, as methotrexate is hepatotoxic and requires regular monitoring.\n3. **Complete blood count (CBC)**: To assess for baseline cytopenias (e.g., anemia, leukopenia, thrombocytopenia) as methotrexate can cause myelosuppression.\n4. **Renal function tests (serum creatinine, eGFR)**: To assess renal function, as methotrexate is renally excreted and dose adjustment may be required in renal impairment."
            },
            {
              "stem": "A 60-year-old male with type 2 diabetes mellitus is prescribed empagliflozin. Outline three key patient counseling points regarding this medication.",
              "modelAnswer": "1. **Hydration**: Emphasize the importance of maintaining adequate fluid intake to prevent dehydration and hypotension, as empagliflozin causes osmotic diuresis.\n2. **Genital hygiene**: Advise on the increased risk of genital mycotic infections (e.g., candidiasis) and the importance of good genital hygiene and prompt treatment if symptoms occur.\n3. **Monitoring for adverse effects**: Instruct the patient to monitor for signs of diabetic ketoacidosis (e.g., nausea, vomiting, abdominal pain, difficulty breathing) and to seek medical attention immediately if these occur."
            },
            {
              "stem": "A 50-year-old female with metastatic breast cancer is receiving doxorubicin and cyclophosphamide. Outline the steps you would take to monitor and prevent doxorubicin-induced cardiotoxicity.",
              "modelAnswer": "1. **Baseline assessment**: Perform a baseline echocardiogram or multigated acquisition (MUGA) scan to assess left ventricular ejection fraction (LVEF) before initiating therapy.\n2. **Regular monitoring**: Repeat LVEF assessment after every 2–3 cycles of therapy or if the cumulative dose approaches 300 mg/m².\n3. **Cumulative dose limit**: Ensure the total cumulative dose does not exceed 450–550 mg/m² to minimize the risk of cardiotoxicity.\n4. **Cardiology referral**: Refer the patient to a cardiologist if LVEF declines by >10% from baseline or falls below 50%.\n5. **Symptom monitoring**: Advise the patient to report symptoms of heart failure (e.g., shortness of breath, fatigue, peripheral edema) promptly."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 45-year-old male with type 1 diabetes mellitus presents to the emergency department with confusion, polyuria, polydipsia, and a blood glucose level of 28 mmol/L. His arterial blood gas shows pH 7.1, bicarbonate 12 mmol/L, and anion gap 20. Outline the stepwise management of this patient, including initial resuscitation, insulin therapy, electrolyte management, and monitoring.",
              "modelAnswer": "**Step 1: Initial Resuscitation**\n- Administer 0.9% normal saline 1–1.5 L over the first hour to restore intravascular volume and improve tissue perfusion.\n- Assess for signs of shock (e.g., hypotension, tachycardia) and consider vasopressor support if necessary.\n\n**Step 2: Insulin Therapy**\n- Administer intravenous (IV) regular insulin at 0.1 units/kg bolus, followed by a continuous infusion of 0.1 units/kg/hour.\n- Target blood glucose reduction: 3–5 mmol/L/hour to avoid rapid shifts in osmolality and cerebral edema.\n- Monitor blood glucose every 1–2 hours and adjust insulin infusion rate accordingly.\n\n**Step 3: Electrolyte Management**\n- **Potassium (K+)**: Monitor serum potassium every 2–4 hours. If serum K+ <3.3 mmol/L, withhold insulin and administer IV potassium chloride 20–40 mmol/hour until K+ >3.3 mmol/L.\n- **Phosphate**: Monitor serum phosphate; replace if <0.32 mmol/L with IV potassium phosphate.\n- **Bicarbonate**: Avoid routine bicarbonate administration unless pH <6.9 or severe hyperkalemia is present, as it may increase the risk of cerebral edema.\n\n**Step 4: Monitoring and Transition to Subcutaneous Insulin**\n- Monitor blood glucose, electrolytes (K+, Na+, phosphate), and acid-base status every 2–4 hours during the acute phase.\n- Transition to subcutaneous basal-bolus insulin regimen once the patient is stable, eating, and ketosis has resolved (e.g., bicarbonate >18 mmol/L, anion gap <12).\n- Provide patient education on sick-day management, insulin administration, and recognition of hypoglycemia.\n\n**Step 5: Prevention of Complications**\n- Assess for and manage precipitating factors (e.g., infection, missed insulin doses).\n- Consider thromboprophylaxis (e.g., low-molecular-weight heparin) if no contraindications, as DKA increases the risk of venous thromboembolism."
            },
            {
              "stem": "A 60-year-old female with metastatic breast cancer is receiving FEC (5-fluorouracil, epirubicin, cyclophosphamide) chemotherapy. Outline the management of chemotherapy-induced nausea and vomiting (CINV) for this highly emetogenic regimen, including antiemetic selection, dosing, timing, and monitoring.",
              "modelAnswer": "**Step 1: Antiemetic Selection**\n- **Pre-chemotherapy (Day 1)**: Administer a triple antiemetic regimen:\n  - **Neurokinin-1 (NK1) receptor antagonist**: Aprepitant 125 mg orally 1 hour before chemotherapy.\n  - **5-HT3 receptor antagonist**: Ondansetron 16–24 mg IV or palonosetron 0.25 mg IV 30 minutes before chemotherapy.\n  - **Corticosteroid**: Dexamethasone 12 mg IV 30 minutes before chemotherapy.\n\n**Step 2: Post-chemotherapy (Days 2–4)**\n- **Day 2**: Aprepitant 80 mg orally once daily in the morning.\n- **Days 3–4**: If aprepitant is not tolerated, consider metoclopramide 10–20 mg orally every 6 hours as needed.\n\n**Step 3: Rescue Antiemetics**\n- For breakthrough nausea/vomiting, administer:\n  - **Dopamine antagonist**: Metoclopramide 10–20 mg IV every 6 hours or prochlorperazine 10 mg IV every 6 hours.\n  - **Alternative**: Olanzapine 5–10 mg orally daily for 2–3 days.\n\n**Step 4: Monitoring and Supportive Care**\n- Monitor for signs of dehydration, electrolyte imbalances (e.g., hypokalemia, hypomagnesemia), and aspiration risk.\n- Ensure adequate hydration with IV fluids if necessary.\n- Provide patient education on the importance of adherence to antiemetic therapy and when to seek medical attention for uncontrolled nausea/vomiting.\n\n**Step 5: Dose Adjustments and Contraindications**\n- Adjust antiemetic doses for renal or hepatic impairment as needed.\n- Avoid metoclopramide in patients with Parkinson’s disease or a history of extrapyramidal symptoms.\n- Consider lorazepam 0.5–1 mg orally or sublingually for anticipatory nausea/vomiting."
            }
          ]
        }
      ]
    }
  },
  "exam-hospital-practice": {
    "1": {
      "title": "Clinical Pharmacy — Hospital & Clinical Pharmacy Practice",
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
                "Compounding intravenous admixtures",
                "Ensuring availability of medicines",
                "Prescribing medications under protocol",
                "Monitoring drug interactions in real-time"
              ],
              "answer": "Ensuring availability of medicines",
              "explanation": "Hospital pharmacists prioritize ensuring continuous availability of essential medicines to prevent stockouts that could compromise patient care."
            },
            {
              "stem": "Which statement BEST describes the role of the Medicines and Therapeutics Committee (MTC) in a hospital?",
              "options": [
                "All hospital pharmacists are automatically members of the MTC",
                "The MTC implements policies and philosophies of the governing board",
                "It influences the implementation of evidence-based care in the hospital",
                "It is solely responsible for drug therapy monitoring"
              ],
              "answer": "It influences the implementation of evidence-based care in the hospital",
              "explanation": "The MTC is a multidisciplinary body that reviews and approves drug policies, promotes rational prescribing, and ensures adherence to evidence-based guidelines."
            },
            {
              "stem": "A pharmacist reviewing a patient's medication chart identifies a dose that exceeds the recommended maximum. Which competency does this action BEST demonstrate?",
              "options": [
                "Drug distribution",
                "Medication reconciliation",
                "Direct patient care",
                "Pharmacy-based screening"
              ],
              "answer": "Direct patient care",
              "explanation": "Reviewing medication charts for accuracy and appropriateness of doses is a core component of direct patient care in clinical pharmacy practice."
            },
            {
              "stem": "During medication review, a pharmacist identifies that a patient is taking two different opioids for chronic pain. What is the MOST appropriate next step?",
              "options": [
                "Document the finding and continue monitoring",
                "Recommend tapering one opioid and optimizing the other",
                "Report the pharmacist to the regulatory body",
                "Advise the patient to stop both medications immediately"
              ],
              "answer": "Recommend tapering one opioid and optimizing the other",
              "explanation": "Identifying and resolving therapeutic duplication is a key aspect of medication review to prevent adverse effects and drug interactions."
            },
            {
              "stem": "Which of the following is NOT a principle of rational prescribing?",
              "options": [
                "Prescribing the shortest effective duration of treatment",
                "Using the least costly medication when clinically appropriate",
                "Prescribing based on expert opinion rather than current evidence",
                "Considering the patient's preferences and values"
              ],
              "answer": "Prescribing based on expert opinion rather than current evidence",
              "explanation": "Rational prescribing emphasizes evidence-based medicine, not reliance on expert opinion alone."
            },
            {
              "stem": "A pharmacist screens a patient for hypertension and finds a blood pressure of 160/100 mmHg. Which action should the pharmacist take NEXT?",
              "options": [
                "Prescribe an antihypertensive immediately",
                "Refer the patient to a physician for further evaluation",
                "Advise lifestyle modifications and recheck in one month",
                "Document the finding and continue routine screening"
              ],
              "answer": "Refer the patient to a physician for further evaluation",
              "explanation": "Pharmacists can screen for conditions but must refer patients with abnormal findings to appropriate healthcare providers for definitive management."
            },
            {
              "stem": "Which of the following is considered a medication error?",
              "options": [
                "A patient experiencing a known side effect of a drug",
                "A patient receiving a dose 10% higher than prescribed due to a calculation error",
                "A patient developing tolerance to a long-term opioid",
                "A patient experiencing an idiosyncratic reaction to a drug"
              ],
              "answer": "A patient receiving a dose 10% higher than prescribed due to a calculation error",
              "explanation": "Medication errors include deviations from prescribed therapy, such as incorrect doses, regardless of whether harm occurs."
            },
            {
              "stem": "When prescribing a medication, which name should be used to ensure clarity and avoid confusion?",
              "options": [
                "Proprietary name",
                "Brand name",
                "Chemical name",
                "Non-proprietary (generic) name"
              ],
              "answer": "Non-proprietary (generic) name",
              "explanation": "Using the non-proprietary name reduces confusion and ensures consistency in prescribing, especially when multiple formulations exist."
            },
            {
              "stem": "Which of the following is NOT typically included in pharmacy records?",
              "options": [
                "Charges of drugs to patients",
                "Drug allergies and adverse reactions",
                "Patient's social security number",
                "Drug kardex"
              ],
              "answer": "Patient's social security number",
              "explanation": "Pharmacy records include clinical and administrative data but should not contain sensitive personal identifiers like social security numbers."
            },
            {
              "stem": "The need for a hospital formulary system is MOST influenced by which factor?",
              "options": [
                "Increased number of drugs in the market",
                "Regulatory requirements",
                "Competition among manufacturers",
                "Patient demand for specific brands"
              ],
              "answer": "Increased number of drugs in the market",
              "explanation": "The formulary system helps manage the growing number of available drugs by standardizing choices to those that are safe, effective, and cost-efficient."
            },
            {
              "stem": "Which medical device is correctly matched with its function?",
              "options": [
                "Stethoscope — Detecting electrical activity in the heart",
                "Pulse oximeter — Measuring oxygen saturation in blood",
                "Defibrillator — Administering fluids and blood",
                "Sphygmomanometer — Detecting consensual reflex"
              ],
              "answer": "Pulse oximeter — Measuring oxygen saturation in blood",
              "explanation": "The pulse oximeter is used to measure oxygen saturation in arterial blood, a critical parameter in patient monitoring."
            },
            {
              "stem": "In which drug distribution system are both the pharmacy and nursing station responsible for drug storage and preparation?",
              "options": [
                "Floor stock system",
                "Unit dose system",
                "Combination system",
                "Individual prescription order system"
              ],
              "answer": "Combination system",
              "explanation": "The combination system integrates aspects of floor stock and unit dose systems, where some medications are stored in both pharmacy and nursing stations."
            },
            {
              "stem": "Where is a satellite pharmacy typically located in a hospital?",
              "options": [
                "Each floor",
                "Central location in the hospital",
                "Sterile processing unit",
                "Depends on hospital type and size"
              ],
              "answer": "Depends on hospital type and size",
              "explanation": "Satellite pharmacies are strategically placed based on patient care needs, often in high-demand areas like critical care units or surgical wards."
            },
            {
              "stem": "Which statement about vaccines in the Kenyan Expanded Programme on Immunization (EPI) schedule is FALSE?",
              "options": [
                "Children are vaccinated at birth, 2, 4, 6, and 12 months",
                "Pharmacists are authorized to prescribe and administer vaccines",
                "Vaccines are routinely administered in the gluteal muscle",
                "Oral Polio Vaccine (OPV) requires freezing at -20°C for storage"
              ],
              "answer": "Vaccines are routinely administered in the gluteal muscle",
              "explanation": "Most vaccines are administered intramuscularly in the deltoid muscle, not the gluteal muscle, to ensure proper absorption and reduce risk of injury."
            },
            {
              "stem": "Which of the following BEST describes patient counseling in pharmacy practice?",
              "options": [
                "It is synonymous with patient education",
                "It is applicable only to prescription medications",
                "It is preventive in nature and often documented",
                "It is the sole responsibility of the physician"
              ],
              "answer": "It is preventive in nature and often documented",
              "explanation": "Patient counseling is a preventive service aimed at avoiding medication-related problems and is often documented as part of the pharmacist's professional responsibility."
            },
            {
              "stem": "Which statement about prescription processing is FALSE?",
              "options": [
                "Prescriptions should be stored for at least 2 years in the pharmacy premises",
                "It is the responsibility of qualified pharmacists and technicians which cannot be delegated",
                "When handled by non-pharmacists, self-checking for accuracy must be done",
                "Record keeping is a legal and professional requirement"
              ],
              "answer": "It is the responsibility of qualified pharmacists and technicians which cannot be delegated",
              "explanation": "Prescription processing can be delegated to trained pharmacy technicians under the supervision of a pharmacist, as per institutional policies."
            },
            {
              "stem": "Which method is the MOST specific and sensitive for assessing medication compliance?",
              "options": [
                "Drug analysis in body fluids",
                "History taking",
                "Residual tablet counting",
                "Pharmacy records"
              ],
              "answer": "Drug analysis in body fluids",
              "explanation": "Drug analysis in body fluids (e.g., urine or blood) provides objective evidence of medication ingestion and is highly specific and sensitive."
            },
            {
              "stem": "How are prescription medicines different from over-the-counter (OTC) medicines?",
              "options": [
                "They contain higher concentrations of active ingredients",
                "They are unsafe for use without medical supervision",
                "They do not contain preservatives",
                "They are prone to fewer drug interactions"
              ],
              "answer": "They are unsafe for use without medical supervision",
              "explanation": "Prescription medicines require professional oversight due to their potential for serious adverse effects, drug interactions, or misuse."
            },
            {
              "stem": "In commodity management, lead time refers to the time between:",
              "options": [
                "Making an order and receiving the goods",
                "Utilizing available stocks",
                "Demand for stock being low",
                "Consuming half the stock"
              ],
              "answer": "Making an order and receiving the goods",
              "explanation": "Lead time is the duration between placing an order and the receipt of goods, critical for inventory management and avoiding stockouts."
            },
            {
              "stem": "The generic equivalent of a drug is expected to have:",
              "options": [
                "Different active components of the same class",
                "Similar pharmacokinetic and pharmacodynamic profiles",
                "Some active components not contained in the branded drug",
                "None of the above"
              ],
              "answer": "Similar pharmacokinetic and pharmacodynamic profiles",
              "explanation": "Generic equivalents must demonstrate bioequivalence to the branded drug, meaning they have similar pharmacokinetic and pharmacodynamic profiles."
            },
            {
              "stem": "Which statement about drug therapy monitoring is FALSE?",
              "options": [
                "It involves assessing for appropriateness of use of generics",
                "It is the responsibility of nurses",
                "It ensures adherence to formulary medicines",
                "It checks for therapeutic duplication"
              ],
              "answer": "It is the responsibility of nurses",
              "explanation": "Drug therapy monitoring is a collaborative process involving pharmacists, physicians, and nurses, but it is not solely the responsibility of nurses."
            },
            {
              "stem": "Which tool is MOST suitable for detecting anatomical malformations of heart valves?",
              "options": [
                "MRI",
                "Chest X-ray",
                "Electrocardiograph",
                "Echocardiography"
              ],
              "answer": "Echocardiography",
              "explanation": "Echocardiography uses ultrasound to visualize the structure and function of the heart, including the valves, making it the gold standard for detecting anatomical malformations."
            },
            {
              "stem": "Which parameter is the MOST reliable for calculating pediatric doses?",
              "options": [
                "Height",
                "Body weight",
                "Surface area",
                "Age"
              ],
              "answer": "Surface area",
              "explanation": "Body surface area (BSA) is the most reliable parameter for calculating pediatric doses because it correlates better with drug clearance and metabolism than weight or age alone."
            },
            {
              "stem": "Which of the following BEST explains the purposes of using a stethoscope?",
              "options": [
                "To ascertain the character of breath sounds",
                "To detect any added sounds",
                "To determine whether breath sounds are equal on both sides",
                "All of the above"
              ],
              "answer": "All of the above",
              "explanation": "A stethoscope is used to auscultate breath sounds, detect abnormal sounds (e.g., crackles, wheezes), and compare symmetry between both sides of the chest."
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
              "explanation": "Procuring drugs is a logistical task, whereas a pharmaceutical consultation focuses on patient education, monitoring, and history-taking."
            },
            {
              "stem": "Which patient is at the HIGHEST risk of suffering from an adverse drug reaction?",
              "options": [
                "An 8-month-old infant receiving a prescription for an antibiotic",
                "A 22-year-old patient with asthma receiving prescriptions for inhalers",
                "A 48-year-old patient with hypertension receiving an ACE inhibitor",
                "A 68-year-old patient with edema receiving a diuretic"
              ],
              "answer": "An 8-month-old infant receiving a prescription for an antibiotic",
              "explanation": "Infants are at higher risk of adverse drug reactions due to immature organ function, particularly renal and hepatic metabolism, which affects drug clearance."
            },
            {
              "stem": "A 40-year-old man presents to the pharmacy complaining of upper abdominal pain and vomiting for three days. He is jaundiced. What is the MOST appropriate course of action?",
              "options": [
                "Evaluate his condition and prescribe medication to relieve symptoms",
                "Identify the drug causing his symptoms and withdraw/substitute it",
                "Refer him for further medical assessment",
                "Advise him to stop using the analgesics"
              ],
              "answer": "Refer him for further medical assessment",
              "explanation": "Jaundice and abdominal pain are red flags that require immediate medical evaluation to rule out serious conditions such as drug-induced liver injury or biliary obstruction."
            },
            {
              "stem": "The role of the pharmacist in selecting therapeutic alternatives requires which of the following clinical skills?",
              "options": [
                "Performance of drug utilization evaluation",
                "Ability to counsel patients on drug adherence and compliance",
                "Review and critique drug literature",
                "All of the above"
              ],
              "answer": "All of the above",
              "explanation": "Selecting therapeutic alternatives involves evaluating drug use patterns, patient counseling, and critically appraising clinical evidence to ensure optimal therapy."
            },
            {
              "stem": "Regarding preparation of cytotoxic drugs, which statement is FALSE?",
              "options": [
                "It is done aseptically",
                "They require cold chain storage conditions",
                "Includes careful segregation of chemotherapeutic waste",
                "Personal protective equipment is required"
              ],
              "answer": "They require cold chain storage conditions",
              "explanation": "Cytotoxic drugs do not typically require cold chain storage; however, they must be prepared aseptically, with proper waste segregation and use of PPE."
            },
            {
              "stem": "Which of the following is a key responsibility of a hospital pharmacist in ensuring drug safety?",
              "options": [
                "Compounding all medications on-site",
                "Monitoring for adverse drug reactions and drug interactions",
                "Prescribing medications under protocol",
                "Managing the hospital's financial budget"
              ],
              "answer": "Monitoring for adverse drug reactions and drug interactions",
              "explanation": "Ensuring drug safety involves vigilant monitoring for adverse effects, drug interactions, and ensuring adherence to safety protocols."
            },
            {
              "stem": "Which statement about medication reconciliation is TRUE?",
              "options": [
                "It is only performed at hospital admission",
                "It involves comparing the patient's current medications with their medical history",
                "It is the responsibility of the nurse alone",
                "It does not require patient input"
              ],
              "answer": "It involves comparing the patient's current medications with their medical history",
              "explanation": "Medication reconciliation is the process of creating the most accurate list of a patient's medications and comparing it with the medical record to avoid discrepancies."
            },
            {
              "stem": "Which of the following is a common cause of medication errors in hospital settings?",
              "options": [
                "Use of non-proprietary drug names",
                "Poor handwriting on prescriptions",
                "Regular medication reviews by pharmacists",
                "Electronic prescribing systems"
              ],
              "answer": "Poor handwriting on prescriptions",
              "explanation": "Illegible handwriting on prescriptions is a well-documented cause of medication errors, leading to misinterpretation and incorrect dispensing."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "State five purposes of medical record keeping in pharmacy practice.",
              "modelAnswer": "1. To provide a legal and professional record of patient care and medication history.\n2. To facilitate continuity of care by ensuring all healthcare providers have access to accurate patient information.\n3. To support clinical decision-making by documenting allergies, adverse drug reactions, and current medications.\n4. To enable monitoring of drug therapy outcomes and identification of potential issues (e.g., drug interactions, therapeutic duplication).\n5. To provide data for research, education, and quality improvement initiatives."
            },
            {
              "stem": "M.N., a newly diagnosed diabetic patient, is prescribed intermediate-acting insulin (e.g., Mixtard). The pharmacist recommends daily blood glucose monitoring. Two weeks later, M.N. presents with consistently elevated blood glucose readings. Outline five possible causes of this scenario and suggest one action the pharmacist should take.",
              "modelAnswer": "Possible causes:\n1. Inadequate insulin dosing or incorrect administration technique.\n2. Poor adherence to the prescribed insulin regimen.\n3. Dietary non-compliance or excessive carbohydrate intake.\n4. Concurrent medications (e.g., corticosteroids) that increase blood glucose.\n5. Stress, illness, or infection affecting glucose metabolism.\n\nAction: The pharmacist should refer M.N. to the prescribing physician for a comprehensive review of her insulin regimen, administration technique, and overall diabetes management plan."
            },
            {
              "stem": "Outline five common mistakes during prescription processing.",
              "modelAnswer": "1. Illegible handwriting leading to misinterpretation of the prescription.\n2. Incorrect transcription of the prescribed medication or dose.\n3. Failure to check for drug allergies or contraindications.\n4. Dispensing the wrong medication or incorrect strength.\n5. Lack of patient counseling or verification of understanding."
            },
            {
              "stem": "Describe any five routine pharmacy-based screening tests.",
              "modelAnswer": "1. Blood pressure measurement: Screening for hypertension.\n2. Blood glucose testing: Screening for diabetes or prediabetes.\n3. Lipid profile: Screening for dyslipidemia and cardiovascular risk.\n4. Point-of-care INR testing: Monitoring patients on warfarin therapy.\n5. Urine dipstick testing: Screening for urinary tract infections, proteinuria, or glycosuria."
            },
            {
              "stem": "Why is it important for a pharmacist to be well-versed with poison information?",
              "modelAnswer": "1. To provide accurate and timely advice in cases of accidental or intentional poisoning.\n2. To guide appropriate management, including antidote selection and supportive care.\n3. To prevent medication errors and adverse drug reactions by identifying high-risk drugs.\n4. To educate patients and healthcare providers about poison prevention and safe medication use."
            },
            {
              "stem": "State the use of each of the following medical devices:\n1. Catheters\n2. Osmotic laxatives\n3. Dialysis machine",
              "modelAnswer": "1. Catheters: Used to drain urine from the bladder (e.g., urinary catheter) or administer fluids/medications directly into the bloodstream (e.g., intravenous catheter).\n2. Osmotic laxatives (e.g., lactulose): Increase water retention in the colon to soften stool and stimulate bowel movements, used to treat constipation or hepatic encephalopathy.\n3. Dialysis machine: Used in renal replacement therapy to filter waste products, excess fluids, and toxins from the blood in patients with kidney failure."
            },
            {
              "stem": "Discuss five ethical issues relating to the provision of drug information.",
              "modelAnswer": "1. **Confidentiality**: Ensuring patient information is kept confidential and shared only with authorized healthcare providers.\n2. **Autonomy**: Respecting the patient's right to make informed decisions about their treatment.\n3. **Beneficence**: Providing information that benefits the patient and promotes their well-being.\n4. **Non-maleficence**: Avoiding the provision of misleading or harmful information that could lead to adverse outcomes.\n5. **Conflict of interest**: Disclosing any financial or personal interests that could bias the provision of drug information."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Discuss the following aspects of institutional pharmacy:\n1. Essential functions of a hospital pharmacy (5 marks)\n2. Management of controlled drugs (5 marks)\n3. Quality assurance and quality control of medicines (5 marks)",
              "modelAnswer": "### 1. Essential functions of a hospital pharmacy\nThe essential functions of a hospital pharmacy include:\n- **Medication procurement and supply**: Ensuring the availability of essential medicines to meet patient needs, including stock management and emergency supply.\n- **Drug distribution**: Implementing systems such as unit dose, floor stock, or combination systems to ensure timely and accurate medication delivery to patients.\n- **Clinical pharmacy services**: Providing direct patient care through medication review, reconciliation, and monitoring to optimize drug therapy and prevent adverse effects.\n- **Drug information and education**: Serving as a resource for healthcare providers and patients on drug-related issues, including adverse effects, interactions, and administration techniques.\n- **Pharmaceutical care**: Collaborating with the healthcare team to develop individualized treatment plans that improve patient outcomes and quality of life.\n- **Medication safety**: Implementing policies and procedures to minimize medication errors, such as double-checking high-risk medications and using barcoding systems.\n- **Research and quality improvement**: Participating in clinical trials, drug utilization evaluations, and quality improvement projects to enhance pharmacy services.\n\n### 2. Management of controlled drugs\nControlled drugs (e.g., opioids, benzodiazepines) require strict management to prevent misuse, diversion, and abuse. Key aspects include:\n- **Storage**: Stored in locked, secure cabinets or safes with restricted access to authorized personnel only.\n- **Inventory control**: Maintaining accurate records of receipt, dispensing, and stock levels, including regular reconciliation to detect discrepancies.\n- **Prescription requirements**: Ensuring prescriptions comply with legal requirements, including the prescriber's signature, patient details, and appropriate documentation (e.g., triplicate prescription forms for some controlled substances).\n- **Dispensing**: Dispensing only the prescribed quantity and documenting the transaction, including the patient's name, drug name, strength, and quantity.\n- **Waste management**: Proper disposal of unused or expired controlled substances in accordance with regulatory guidelines, often involving witnessed destruction.\n- **Monitoring**: Regular audits and inspections to ensure compliance with regulations and to identify potential issues such as overprescribing or diversion.\n\n### 3. Quality assurance and quality control of medicines\nQuality assurance (QA) and quality control (QC) are critical to ensuring the safety, efficacy, and quality of medicines in a hospital pharmacy:\n- **Quality assurance**: A systematic process to ensure that medicines meet predefined standards. This includes:\n  - **Standard operating procedures (SOPs)**: Developing and adhering to SOPs for procurement, storage, compounding, and dispensing.\n  - **Supplier qualification**: Selecting reputable suppliers and verifying the quality of purchased medicines through certificates of analysis and audits.\n  - **Storage conditions**: Ensuring medicines are stored under appropriate conditions (e.g., temperature, humidity) to maintain their integrity.\n  - **Staff training**: Providing ongoing training to pharmacy staff on QA principles and practices.\n- **Quality control**: Specific tests and checks to verify the quality of medicines. This includes:\n  - **Visual inspection**: Checking for physical defects, discoloration, or contamination.\n  - **Labeling verification**: Ensuring labels are accurate, legible, and include essential information (e.g., drug name, strength, expiration date).\n  - **Expiry date monitoring**: Regularly checking stock for expired or near-expiry medications and removing them from inventory.\n  - **Compounding checks**: For extemporaneous preparations, ensuring accuracy in ingredients, quantities, and techniques.\n  - **Temperature monitoring**: Using data loggers to monitor storage conditions and ensuring compliance with cold chain requirements for temperature-sensitive medicines."
            },
            {
              "stem": "With regard to community pharmacy practice, discuss the following:\n1. Responsibilities of a pharmacist (10 marks)\n2. Consultation styles (5 marks)",
              "modelAnswer": "### 1. Responsibilities of a pharmacist in community pharmacy practice\nThe responsibilities of a community pharmacist extend beyond dispensing medications and include:\n- **Patient-centered care**: Providing individualized care by assessing patients' medication needs, reviewing their medication history, and identifying potential issues such as drug interactions or adverse effects.\n- **Medication dispensing**: Accurately dispensing prescribed medications, ensuring the correct drug, strength, and quantity are provided, and providing clear instructions for use.\n- **Patient education and counseling**: Educating patients about their medications, including indications, side effects, administration techniques, and storage requirements. This also includes counseling on over-the-counter (OTC) medications and lifestyle modifications.\n- **Health promotion and disease prevention**: Providing screening services (e.g., blood pressure, blood glucose) and vaccinations (e.g., influenza, COVID-19) to promote public health and prevent disease.\n- **Chronic disease management**: Supporting patients with chronic conditions (e.g., diabetes, hypertension) through medication adherence programs, monitoring, and referrals to healthcare providers when necessary.\n- **Medication therapy management (MTM)**: Conducting comprehensive medication reviews to optimize therapy, reduce polypharmacy, and improve outcomes.\n- **Adverse drug reaction (ADR) reporting**: Identifying and reporting suspected ADRs to regulatory authorities or pharmacovigilance programs to enhance drug safety.\n- **Inventory management**: Ensuring the pharmacy has an adequate supply of medications while minimizing waste and expired stock. This includes managing stock levels, ordering supplies, and monitoring expiry dates.\n- **Legal and regulatory compliance**: Adhering to laws and regulations governing pharmacy practice, including prescription requirements, record-keeping, and controlled substance management.\n- **Collaboration with healthcare providers**: Communicating with physicians, nurses, and other healthcare providers to resolve medication-related issues and ensure continuity of care.\n- **Professional development**: Continuously updating knowledge through continuing education, attending workshops, and staying informed about new drugs and therapies.\n- **Ethical practice**: Upholding ethical standards, including confidentiality, informed consent, and avoiding conflicts of interest.\n\n### 2. Consultation styles in community pharmacy practice\nEffective consultation styles are essential for building rapport, ensuring patient understanding, and promoting adherence. Common styles include:\n- **Patient-centered approach**: Focuses on the patient's needs, concerns, and preferences. The pharmacist listens actively, asks open-ended questions, and tailors advice to the individual.\n- **Directive approach**: The pharmacist takes a more authoritative role, providing clear instructions and guidance. This style is useful for urgent situations or when patients require immediate action (e.g., emergency contraception).\n- **Collaborative approach**: Involves shared decision-making between the pharmacist and patient. The pharmacist provides information and options, and the patient makes an informed choice (e.g., selecting an OTC product for minor ailments).\n- **Educational approach**: Focuses on providing detailed information about medications, including mechanisms of action, side effects, and administration techniques. This is particularly important for patients with chronic conditions or complex regimens.\n- **Motivational interviewing**: A patient-centered style that encourages behavior change by exploring the patient's motivations and barriers. It is useful for improving medication adherence or lifestyle modifications.\n\nKey elements of effective consultation:\n- **Introduction**: Greet the patient warmly and introduce yourself.\n- **Assessment**: Ask about the patient's medical history, current medications, and concerns.\n- **Information sharing**: Provide clear, concise information tailored to the patient's needs.\n- **Empathy and support**: Acknowledge the patient's concerns and offer reassurance.\n- **Summary and follow-up**: Summarize key points and agree on a follow-up plan if necessary."
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Clinical Pharmacy — Hospital & Clinical Pharmacy Practice",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "A 65-year-old male patient is admitted with acute exacerbation of COPD. The physician prescribes oral prednisone 40 mg daily for 5 days. Which of the following is the PRIMARY role of the hospital pharmacist in this scenario?",
              "options": [
                "To compound the prednisone suspension for the patient.",
                "To ensure the prescribed dose aligns with the hospital formulary and evidence-based guidelines.",
                "To prescribe an alternative corticosteroid with a lower risk of adverse effects.",
                "To dispense the medication without further review as it is a standard prescription."
              ],
              "answer": "To ensure the prescribed dose aligns with the hospital formulary and evidence-based guidelines.",
              "explanation": "The primary role of the hospital pharmacist in this scenario is to ensure the prescribed medication and dose are appropriate, safe, and aligned with the hospital formulary and clinical guidelines."
            },
            {
              "stem": "Which of the following is a key responsibility of the Medicines and Therapeutics Committee (MTC) in a hospital setting?",
              "options": [
                "To directly prescribe medications to patients based on individual clinical needs.",
                "To influence the implementation of evidence-based care and standardize drug therapy policies.",
                "To delegate all drug-related decisions to individual physicians for patient care.",
                "To solely focus on the financial aspects of drug procurement and distribution."
              ],
              "answer": "To influence the implementation of evidence-based care and standardize drug therapy policies.",
              "explanation": "The MTC is responsible for developing and implementing evidence-based drug therapy policies and ensuring standardized, safe, and effective medication use in the hospital."
            },
            {
              "stem": "During a medication review, a pharmacist identifies that a patient with chronic kidney disease has been prescribed ibuprofen 400 mg three times daily for osteoarthritis. Which of the following actions should the pharmacist take FIRST?",
              "options": [
                "Immediately discontinue the ibuprofen and document the action in the patient's record.",
                "Consult with the prescriber to discuss alternative analgesic options that are safer for the patient's renal function.",
                "Administer a dose of intravenous fluids to mitigate potential renal damage.",
                "Report the incident to the hospital's adverse drug reaction committee."
              ],
              "answer": "Consult with the prescriber to discuss alternative analgesic options that are safer for the patient's renal function.",
              "explanation": "The pharmacist should first consult with the prescriber to discuss safer alternatives, as abrupt discontinuation without clinical justification may not be appropriate."
            },
            {
              "stem": "A patient is prescribed enalapril for hypertension but develops a persistent dry cough. Which of the following is the MOST appropriate next step for the pharmacist?",
              "options": [
                "Recommend switching to an angiotensin II receptor blocker (ARB) such as losartan.",
                "Advise the patient to continue the medication as the cough is a minor side effect.",
                "Increase the dose of enalapril to achieve better blood pressure control.",
                "Discontinue enalapril immediately and document the adverse drug reaction."
              ],
              "answer": "Recommend switching to an angiotensin II receptor blocker (ARB) such as losartan.",
              "explanation": "A persistent dry cough is a known side effect of ACE inhibitors like enalapril. Switching to an ARB such as losartan is a clinically appropriate alternative."
            },
            {
              "stem": "Which of the following is the MOST specific and sensitive method for assessing patient compliance with antihypertensive therapy?",
              "options": [
                "Reviewing pharmacy records for refill history.",
                "Performing a 24-hour ambulatory blood pressure monitoring.",
                "Conducting a patient interview to assess adherence.",
                "Measuring serum drug levels in the patient's blood."
              ],
              "answer": "Measuring serum drug levels in the patient's blood.",
              "explanation": "Serum drug level measurement is the most specific and sensitive method for assessing compliance, as it directly quantifies the presence of the drug in the patient's system."
            },
            {
              "stem": "A 72-year-old female patient is admitted with a diagnosis of community-acquired pneumonia. The physician prescribes doxycycline 100 mg twice daily. Which of the following monitoring parameters is MOST critical for this patient?",
              "options": [
                "Serum potassium levels.",
                "Renal function tests (serum creatinine and eGFR).",
                "Liver function tests (ALT, AST, bilirubin).",
                "Complete blood count (CBC)."
              ],
              "answer": "Renal function tests (serum creatinine and eGFR).",
              "explanation": "Doxycycline is primarily renally excreted, and renal function monitoring is critical, especially in elderly patients, to prevent accumulation and toxicity."
            },
            {
              "stem": "Which of the following statements is TRUE regarding proprietary and non-proprietary drug names?",
              "options": [
                "Proprietary names are always preferred in clinical practice for clarity.",
                "Non-proprietary names are the same as chemical names and are rarely used in practice.",
                "Proprietary names can vary by country, while non-proprietary names are standardized internationally.",
                "Non-proprietary names are only used for over-the-counter medications."
              ],
              "answer": "Proprietary names can vary by country, while non-proprietary names are standardized internationally.",
              "explanation": "Non-proprietary (generic) names are standardized internationally, whereas proprietary (brand) names can differ between countries and manufacturers."
            },
            {
              "stem": "A hospital pharmacist is reviewing a patient's medication chart and notices that the patient has been prescribed both simvastatin and atorvastatin for hypercholesterolemia. Which of the following actions should the pharmacist take?",
              "options": [
                "Discontinue both medications immediately to avoid drug duplication.",
                "Consult with the prescriber to assess the rationale for dual therapy and recommend deprescribing if unnecessary.",
                "Increase the dose of one of the statins to achieve better lipid control.",
                "Document the observation and take no further action as this is a common practice."
              ],
              "answer": "Consult with the prescriber to assess the rationale for dual therapy and recommend deprescribing if unnecessary.",
              "explanation": "The pharmacist should consult the prescriber to evaluate the clinical rationale for dual therapy and deprescribe if the combination is unnecessary or duplicative."
            },
            {
              "stem": "Which of the following medical devices is correctly matched with its primary function?",
              "options": [
                "Pulse oximeter — Measures oxygen saturation in the blood.",
                "Nebulizer — Delivers intravenous medications.",
                "Defibrillator — Measures electrical activity of the heart.",
                "Sphygmomanometer — Administers oxygen to patients."
              ],
              "answer": "Pulse oximeter — Measures oxygen saturation in the blood.",
              "explanation": "A pulse oximeter is a medical device used to measure oxygen saturation in the blood, which is critical for assessing respiratory function."
            },
            {
              "stem": "A patient with type 2 diabetes mellitus is prescribed metformin 500 mg twice daily. The pharmacist notes that the patient's serum creatinine is 2.1 mg/dL. Which of the following is the MOST appropriate action?",
              "options": [
                "Continue metformin as the dose is appropriate for the patient's renal function.",
                "Reduce the dose of metformin and monitor renal function closely.",
                "Discontinue metformin immediately and switch to insulin therapy.",
                "Increase the dose of metformin to improve glycemic control."
              ],
              "answer": "Reduce the dose of metformin and monitor renal function closely.",
              "explanation": "Metformin is contraindicated in patients with significant renal impairment (eGFR <30 mL/min/1.73 m²). The dose should be reduced, and renal function should be closely monitored."
            },
            {
              "stem": "Which of the following is a key component of medication reconciliation in a hospital setting?",
              "options": [
                "Ensuring that the patient's medication list is updated only at discharge.",
                "Comparing the patient's pre-admission medication list with the current hospital medication orders.",
                "Prescribing new medications based on the patient's admission diagnosis.",
                "Discontinuing all pre-admission medications upon hospital admission."
              ],
              "answer": "Comparing the patient's pre-admission medication list with the current hospital medication orders.",
              "explanation": "Medication reconciliation involves comparing the patient's pre-admission medication list with the current hospital medication orders to identify and resolve discrepancies."
            },
            {
              "stem": "A 5-year-old child is prescribed amoxicillin for a bacterial infection. The pharmacist calculates the dose based on the child's weight (15 kg). Which of the following is the MOST reliable method for calculating the pediatric dose?",
              "options": [
                "Using the child's age in years.",
                "Using the child's body weight in kilograms.",
                "Using the child's body surface area (BSA).",
                "Using a fixed dose recommended for all children in this age group."
              ],
              "answer": "Using the child's body weight in kilograms.",
              "explanation": "Pediatric doses are most commonly calculated based on the child's body weight in kilograms, using mg/kg dosing guidelines."
            },
            {
              "stem": "Which of the following is TRUE regarding the storage conditions for vaccines in a hospital pharmacy?",
              "options": [
                "All vaccines should be stored at room temperature (20–25°C).",
                "Oral Polio Vaccine (OPV) should be stored frozen at -20°C.",
                "Measles-containing vaccines should be stored in the refrigerator (2–8°C).",
                "Live attenuated vaccines are stable at room temperature for up to 6 months."
              ],
              "answer": "Measles-containing vaccines should be stored in the refrigerator (2–8°C).",
              "explanation": "Measles-containing vaccines are live attenuated vaccines and must be stored in the refrigerator (2–8°C) to maintain potency."
            },
            {
              "stem": "A patient presents to the pharmacy with a prescription for lorazepam 1 mg at bedtime for insomnia. The pharmacist notes that the patient has a history of alcohol use disorder. Which of the following is the MOST appropriate action?",
              "options": [
                "Dispense the lorazepam as prescribed without further action.",
                "Consult with the prescriber to discuss alternative non-benzodiazepine options for insomnia.",
                "Increase the dose of lorazepam to improve sleep quality.",
                "Advise the patient to take the medication with alcohol to enhance its effects."
              ],
              "answer": "Consult with the prescriber to discuss alternative non-benzodiazepine options for insomnia.",
              "explanation": "Benzodiazepines like lorazepam are contraindicated in patients with a history of alcohol use disorder due to the risk of dependence and respiratory depression."
            },
            {
              "stem": "Which of the following is a key ethical principle that should guide a pharmacist's provision of drug information to a patient?",
              "options": [
                "Providing information only when requested by the patient.",
                "Ensuring that the information provided is accurate, unbiased, and in the patient's best interest.",
                "Withholding information if it may cause the patient anxiety or distress.",
                "Prioritizing the pharmacist's personal beliefs over evidence-based information."
              ],
              "answer": "Ensuring that the information provided is accurate, unbiased, and in the patient's best interest.",
              "explanation": "Pharmacists must provide drug information that is accurate, unbiased, and in the patient's best interest, adhering to ethical principles such as beneficence and non-maleficence."
            },
            {
              "stem": "A patient with a history of heart failure is prescribed carvedilol 6.25 mg twice daily. The pharmacist notes that the patient's heart rate is 52 beats per minute. Which of the following is the MOST appropriate action?",
              "options": [
                "Discontinue carvedilol immediately due to bradycardia.",
                "Consult with the prescriber to discuss reducing the dose of carvedilol or switching to a different beta-blocker.",
                "Increase the dose of carvedilol to improve heart failure management.",
                "Document the observation and take no further action as bradycardia is expected with carvedilol."
              ],
              "answer": "Consult with the prescriber to discuss reducing the dose of carvedilol or switching to a different beta-blocker.",
              "explanation": "Carvedilol can cause bradycardia, and the dose may need to be adjusted or the patient switched to an alternative beta-blocker if symptomatic bradycardia occurs."
            },
            {
              "stem": "Which of the following is a key responsibility of a pharmacist in a satellite pharmacy within a hospital?",
              "options": [
                "To perform all compounding activities for the entire hospital.",
                "To manage drug distribution for a specific clinical unit or ward.",
                "To prescribe medications for patients in the ward.",
                "To solely focus on administrative tasks such as inventory management."
              ],
              "answer": "To manage drug distribution for a specific clinical unit or ward.",
              "explanation": "A satellite pharmacy is typically located near a specific clinical unit or ward and is responsible for managing drug distribution for that unit."
            },
            {
              "stem": "A patient is prescribed phenytoin for seizure control. The pharmacist notes that the patient's serum phenytoin level is 25 mcg/mL. Which of the following is the MOST appropriate action?",
              "options": [
                "Increase the dose of phenytoin to achieve a higher serum level.",
                "Discontinue phenytoin immediately as the level is too high.",
                "Consult with the prescriber to discuss reducing the dose of phenytoin to achieve a therapeutic level (10–20 mcg/mL).",
                "Continue the current dose and monitor for seizure control."
              ],
              "answer": "Consult with the prescriber to discuss reducing the dose of phenytoin to achieve a therapeutic level (10–20 mcg/mL).",
              "explanation": "The therapeutic range for phenytoin is 10–20 mcg/mL. A level of 25 mcg/mL is above the therapeutic range and may increase the risk of toxicity."
            },
            {
              "stem": "Which of the following is TRUE regarding the use of a unit dose drug distribution system in a hospital?",
              "options": [
                "It increases the risk of medication errors due to multiple handling steps.",
                "It reduces the need for pharmacist involvement in medication review.",
                "It improves medication safety by ensuring that each dose is individually packaged and labeled.",
                "It is primarily used for controlled substances only."
              ],
              "answer": "It improves medication safety by ensuring that each dose is individually packaged and labeled.",
              "explanation": "The unit dose system improves medication safety by reducing the risk of errors through individually packaged and labeled doses."
            },
            {
              "stem": "A patient with hepatic encephalopathy is prescribed lactulose 30 mL three times daily. The pharmacist notes that the patient's serum potassium is 2.8 mEq/L. Which of the following is the MOST appropriate action?",
              "options": [
                "Discontinue lactulose immediately due to the risk of hypokalemia.",
                "Consult with the prescriber to discuss adding a potassium supplement or adjusting the lactulose dose.",
                "Increase the dose of lactulose to improve ammonia clearance.",
                "Document the observation and take no further action as hypokalemia is expected with lactulose."
              ],
              "answer": "Consult with the prescriber to discuss adding a potassium supplement or adjusting the lactulose dose.",
              "explanation": "Lactulose can cause hypokalemia, and the dose may need to be adjusted or potassium supplementation considered."
            },
            {
              "stem": "Which of the following is a key component of a pharmacy record in a hospital setting?",
              "options": [
                "Patient's personal financial information.",
                "A record of all medications dispensed to the patient during their hospital stay.",
                "The patient's social media activity.",
                "A list of the patient's favorite foods."
              ],
              "answer": "A record of all medications dispensed to the patient during their hospital stay.",
              "explanation": "Pharmacy records in a hospital setting include a record of all medications dispensed to the patient during their hospital stay, which is essential for continuity of care and medication safety."
            },
            {
              "stem": "A patient is prescribed dexamethasone for a severe allergic reaction. The pharmacist notes that the patient has uncontrolled diabetes mellitus. Which of the following is the MOST appropriate action?",
              "options": [
                "Discontinue dexamethasone immediately due to the risk of hyperglycemia.",
                "Consult with the prescriber to discuss the risks and benefits of dexamethasone in this patient and consider alternative therapies.",
                "Increase the dose of dexamethasone to achieve better control of the allergic reaction.",
                "Document the observation and take no further action as hyperglycemia is expected with dexamethasone."
              ],
              "answer": "Consult with the prescriber to discuss the risks and benefits of dexamethasone in this patient and consider alternative therapies.",
              "explanation": "Dexamethasone can exacerbate hyperglycemia in patients with diabetes. The pharmacist should discuss the risks and benefits with the prescriber and consider alternative therapies if appropriate."
            },
            {
              "stem": "Which of the following is a key responsibility of a pharmacist in the context of drug safety in a hospital?",
              "options": [
                "To prescribe medications based on the patient's clinical needs.",
                "To monitor for potential adverse drug reactions and drug interactions.",
                "To solely focus on the financial aspects of drug procurement.",
                "To delegate all drug-related decisions to nursing staff."
              ],
              "answer": "To monitor for potential adverse drug reactions and drug interactions.",
              "explanation": "A key responsibility of a pharmacist in drug safety is to monitor for potential adverse drug reactions and drug interactions to ensure patient safety."
            },
            {
              "stem": "A patient is prescribed pethidine for postoperative pain management. The pharmacist notes that the patient has a history of opioid use disorder. Which of the following is the MOST appropriate action?",
              "options": [
                "Dispense pethidine as prescribed without further action.",
                "Consult with the prescriber to discuss alternative non-opioid analgesics for pain management.",
                "Increase the dose of pethidine to achieve better pain control.",
                "Document the observation and take no further action as pethidine is a standard postoperative analgesic."
              ],
              "answer": "Consult with the prescriber to discuss alternative non-opioid analgesics for pain management.",
              "explanation": "Pethidine is an opioid with a high risk of misuse and dependence. The pharmacist should consult with the prescriber to discuss safer alternatives for pain management."
            },
            {
              "stem": "Which of the following is TRUE regarding the role of a pharmacist in medication review and reconciliation?",
              "options": [
                "Medication review and reconciliation are only performed at hospital discharge.",
                "Medication review involves assessing the appropriateness of each medication for the patient's clinical condition.",
                "Medication reconciliation is only the responsibility of the nursing staff.",
                "Medication review and reconciliation do not require collaboration with other healthcare professionals."
              ],
              "answer": "Medication review involves assessing the appropriateness of each medication for the patient's clinical condition.",
              "explanation": "Medication review involves assessing the appropriateness, safety, and efficacy of each medication for the patient's clinical condition, and it requires collaboration with other healthcare professionals."
            },
            {
              "stem": "A patient with a history of hypertension is prescribed losartan 50 mg daily. The pharmacist notes that the patient's serum potassium is 5.5 mEq/L. Which of the following is the MOST appropriate action?",
              "options": [
                "Discontinue losartan immediately due to the risk of hyperkalemia.",
                "Consult with the prescriber to discuss reducing the dose of losartan or switching to an alternative antihypertensive.",
                "Increase the dose of losartan to improve blood pressure control.",
                "Document the observation and take no further action as hyperkalemia is expected with losartan."
              ],
              "answer": "Consult with the prescriber to discuss reducing the dose of losartan or switching to an alternative antihypertensive.",
              "explanation": "Losartan can cause hyperkalemia, especially in patients with renal impairment. The dose may need to be adjusted, or an alternative antihypertensive considered."
            },
            {
              "stem": "Which of the following is a key principle of rational prescribing?",
              "options": [
                "Prescribing the most expensive medication available to ensure quality.",
                "Using the shortest effective duration of treatment to minimize the risk of adverse effects and encourage compliance.",
                "Prescribing medications based solely on the patient's preferences without considering clinical evidence.",
                "Avoiding the use of generic medications to ensure brand loyalty."
              ],
              "answer": "Using the shortest effective duration of treatment to minimize the risk of adverse effects and encourage compliance.",
              "explanation": "Rational prescribing involves using the shortest effective duration of treatment to minimize the risk of adverse effects and encourage patient compliance."
            },
            {
              "stem": "A patient is prescribed atorvastatin for primary hypercholesterolemia. The pharmacist notes that the patient's liver function tests (LFTs) are elevated (ALT 150 U/L, AST 120 U/L). Which of the following is the MOST appropriate action?",
              "options": [
                "Discontinue atorvastatin immediately due to the risk of hepatotoxicity.",
                "Consult with the prescriber to discuss reducing the dose of atorvastatin or switching to an alternative lipid-lowering agent.",
                "Increase the dose of atorvastatin to achieve better lipid control.",
                "Document the observation and take no further action as mild LFT elevations are expected with atorvastatin."
              ],
              "answer": "Consult with the prescriber to discuss reducing the dose of atorvastatin or switching to an alternative lipid-lowering agent.",
              "explanation": "Elevated LFTs are a known adverse effect of statins like atorvastatin. The dose may need to be reduced, or an alternative lipid-lowering agent considered."
            },
            {
              "stem": "Which of the following is a key responsibility of a pharmacist in the context of pharmacy-based screening?",
              "options": [
                "To perform all diagnostic tests for patients in the hospital.",
                "To evaluate the validity and reliability of screening tests and ensure proper documentation.",
                "To solely focus on the financial aspects of screening tests.",
                "To delegate all screening activities to nursing staff."
              ],
              "answer": "To evaluate the validity and reliability of screening tests and ensure proper documentation.",
              "explanation": "A key responsibility of a pharmacist in pharmacy-based screening is to evaluate the validity and reliability of screening tests and ensure proper documentation."
            },
            {
              "stem": "A patient is prescribed nitrofurantoin for a urinary tract infection. The pharmacist notes that the patient's estimated glomerular filtration rate (eGFR) is 25 mL/min/1.73 m². Which of the following is the MOST appropriate action?",
              "options": [
                "Discontinue nitrofurantoin immediately due to the risk of nephrotoxicity.",
                "Consult with the prescriber to discuss alternative antibiotics that are safer for the patient's renal function.",
                "Increase the dose of nitrofurantoin to achieve better bacterial eradication.",
                "Document the observation and take no further action as nitrofurantoin is a standard treatment for UTIs."
              ],
              "answer": "Consult with the prescriber to discuss alternative antibiotics that are safer for the patient's renal function.",
              "explanation": "Nitrofurantoin is contraindicated in patients with significant renal impairment (eGFR <30 mL/min/1.73 m²). The pharmacist should consult with the prescriber to discuss safer alternatives."
            },
            {
              "stem": "Which of the following is TRUE regarding the role of a pharmacist in the context of medication errors?",
              "options": [
                "Medication errors are solely the responsibility of the prescribing physician.",
                "Pharmacists play a key role in identifying, preventing, and reporting medication errors.",
                "Medication errors are rare and do not require systematic review.",
                "Pharmacists are not involved in the investigation of medication errors."
              ],
              "answer": "Pharmacists play a key role in identifying, preventing, and reporting medication errors.",
              "explanation": "Pharmacists play a critical role in identifying, preventing, and reporting medication errors to improve patient safety."
            },
            {
              "stem": "A patient with a history of chronic obstructive pulmonary disease (COPD) is prescribed theophylline for symptom control. The pharmacist notes that the patient is also taking ciprofloxacin for a urinary tract infection. Which of the following is the MOST appropriate action?",
              "options": [
                "Discontinue theophylline immediately due to the risk of drug interaction.",
                "Consult with the prescriber to discuss the potential interaction between theophylline and ciprofloxacin and adjust the theophylline dose if necessary.",
                "Increase the dose of theophylline to improve symptom control.",
                "Document the observation and take no further action as theophylline is a standard treatment for COPD."
              ],
              "answer": "Consult with the prescriber to discuss the potential interaction between theophylline and ciprofloxacin and adjust the theophylline dose if necessary.",
              "explanation": "Ciprofloxacin can increase theophylline levels, leading to toxicity. The pharmacist should consult with the prescriber to discuss dose adjustment or alternative therapies."
            },
            {
              "stem": "Which of the following is a key component of a hospital formulary?",
              "options": [
                "A list of medications that are restricted to specific clinical units.",
                "A comprehensive list of medications approved for use in the hospital, along with their indications and restrictions.",
                "A list of medications that are only available for outpatient use.",
                "A list of medications that are exclusively used for research purposes."
              ],
              "answer": "A comprehensive list of medications approved for use in the hospital, along with their indications and restrictions.",
              "explanation": "A hospital formulary is a comprehensive list of medications approved for use in the hospital, including their indications, restrictions, and dosing guidelines."
            },
            {
              "stem": "A patient is prescribed dexamethasone for a severe inflammatory condition. The pharmacist notes that the patient has a history of peptic ulcer disease. Which of the following is the MOST appropriate action?",
              "options": [
                "Discontinue dexamethasone immediately due to the risk of gastrointestinal bleeding.",
                "Consult with the prescriber to discuss the risks and benefits of dexamethasone in this patient and consider adding a proton pump inhibitor (PPI) for gastroprotection.",
                "Increase the dose of dexamethasone to achieve better anti-inflammatory effects.",
                "Document the observation and take no further action as dexamethasone is a standard treatment for inflammatory conditions."
              ],
              "answer": "Consult with the prescriber to discuss the risks and benefits of dexamethasone in this patient and consider adding a proton pump inhibitor (PPI) for gastroprotection.",
              "explanation": "Dexamethasone can exacerbate peptic ulcer disease. The pharmacist should discuss the risks and benefits with the prescriber and consider adding a PPI for gastroprotection."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "List five essential components that must be included in a patient's medication history during a clinical pharmacy consultation.",
              "modelAnswer": "1. Current medications (prescription, over-the-counter, and herbal supplements).\n2. Allergies and adverse drug reactions (including specific reactions and severity).\n3. Previous medication use (including discontinued medications and reasons for discontinuation).\n4. Adherence to prescribed therapy (including missed doses or non-compliance).\n5. Patient's understanding of their medications and any concerns or questions they may have."
            },
            {
              "stem": "A 45-year-old male patient with hypertension and type 2 diabetes mellitus is prescribed enalapril 10 mg daily and metformin 500 mg twice daily. During a follow-up visit, the pharmacist notes that the patient's blood pressure is 160/95 mmHg and his HbA1c is 9.2%. What are the possible causes of this poor control, and what actions should the pharmacist take?",
              "modelAnswer": "Possible causes:\n1. Poor adherence to prescribed medications.\n2. Inadequate dosing of enalapril or metformin.\n3. Lifestyle factors (e.g., high-sodium diet, lack of exercise, poor dietary control of diabetes).\n4. Drug interactions or untreated comorbidities (e.g., hyperlipidemia, obesity).\n5. Secondary causes of hypertension or insulin resistance.\n\nActions:\n1. Assess the patient's adherence to medications and provide counseling on the importance of compliance.\n2. Consult with the prescriber to discuss titrating the dose of enalapril or adding a second antihypertensive (e.g., calcium channel blocker or thiazide diuretic).\n3. Review the patient's lifestyle and provide education on dietary modifications, exercise, and weight management.\n4. Check for drug interactions and assess for untreated comorbidities.\n5. Recommend additional monitoring (e.g., serum creatinine, potassium, lipid profile, HbA1c) and follow-up."
            },
            {
              "stem": "Outline five common mistakes that can occur during prescription processing in a hospital pharmacy.",
              "modelAnswer": "1. Illegible handwriting or unclear prescription orders leading to misinterpretation.\n2. Incorrect dose calculations or unit errors (e.g., mg vs. g, mL vs. units).\n3. Failure to check for drug allergies or contraindications before dispensing.\n4. Omission of required patient information (e.g., weight, renal function) for dose adjustments.\n5. Lack of verification of the prescription by a pharmacist before dispensing."
            },
            {
              "stem": "Describe five routine pharmacy-based screening tests that a pharmacist may perform in a community or hospital setting.",
              "modelAnswer": "1. Blood pressure measurement: To screen for hypertension and monitor patients on antihypertensive therapy.\n2. Blood glucose testing: To screen for diabetes or monitor glycemic control in diabetic patients.\n3. Lipid profile testing: To screen for hyperlipidemia or monitor patients on lipid-lowering therapy.\n4. INR testing: To monitor patients on warfarin therapy for anticoagulation.\n5. Point-of-care urine dipstick testing: To screen for urinary tract infections, proteinuria, or glycosuria."
            },
            {
              "stem": "Why is it important for a pharmacist to be well-versed in poison information?",
              "modelAnswer": "1. To provide accurate and timely advice to patients and healthcare professionals in cases of accidental or intentional poisoning.\n2. To guide appropriate management, including antidote administration, decontamination, and supportive care.\n3. To prevent medication errors and adverse drug reactions by identifying potential toxicities early.\n4. To educate patients and caregivers on the safe storage and use of medications and household chemicals.\n5. To contribute to public health initiatives by promoting poison prevention and awareness."
            },
            {
              "stem": "State the primary use of each of the following medical devices:\n1. Catheters\n2. Osmotic pumps\n3. Dialysis machines",
              "modelAnswer": "1. Catheters: Used for draining fluids (e.g., urine, blood, or other bodily fluids) from the body or for administering medications or fluids directly into a specific site (e.g., intravenous, urinary, or arterial catheters).\n2. Osmotic pumps: Used for controlled, long-term drug delivery (e.g., insulin pumps for diabetes management or chemotherapy pumps for cancer treatment).\n3. Dialysis machines: Used to filter waste products, excess fluids, and toxins from the blood in patients with kidney failure (e.g., hemodialysis or peritoneal dialysis)."
            },
            {
              "stem": "Discuss five ethical issues that pharmacists may encounter when providing drug information to patients.",
              "modelAnswer": "1. Confidentiality: Ensuring patient privacy and maintaining confidentiality when discussing sensitive health information.\n2. Autonomy: Respecting the patient's right to make informed decisions about their treatment while providing unbiased information.\n3. Beneficence and non-maleficence: Providing information that benefits the patient while avoiding harm (e.g., avoiding unnecessary anxiety or misleading advice).\n4. Veracity: Ensuring that the information provided is truthful, accurate, and evidence-based.\n5. Justice: Ensuring equitable access to drug information and avoiding bias or discrimination in the provision of care."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 30,
          "questions": [
            {
              "stem": "Discuss the following aspects of institutional pharmacy practice:\n1. Essential functions of a hospital pharmacy (10 marks)\n2. Management of controlled drugs in a hospital setting (10 marks)\n3. Quality assurance and quality control of medicines in a hospital pharmacy (10 marks)",
              "modelAnswer": {
                "1. Essential functions of a hospital pharmacy": {
                  "a. Drug procurement and supply": "Ensuring the timely availability of safe, effective, and affordable medications for patient care. This includes managing inventory, negotiating with suppliers, and ensuring compliance with regulatory requirements.",
                  "b. Drug distribution": "Implementing systems such as unit dose, floor stock, or satellite pharmacies to ensure accurate and timely medication delivery to patients.",
                  "c. Clinical pharmacy services": "Providing direct patient care through medication review, reconciliation, therapeutic drug monitoring, and patient counseling to optimize drug therapy and improve outcomes.",
                  "d. Drug information services": "Providing evidence-based drug information to healthcare professionals and patients to support safe and rational medication use.",
                  "e. Pharmacovigilance and medication safety": "Monitoring for adverse drug reactions (ADRs), medication errors, and drug interactions to prevent harm and improve patient safety.",
                  "f. Education and training": "Providing ongoing education and training to pharmacy staff, medical students, and other healthcare professionals to enhance clinical knowledge and skills.",
                  "g. Research and development": "Conducting or participating in research to improve medication use, develop new therapies, and enhance pharmacy practice.",
                  "h. Policy development and governance": "Contributing to the development and implementation of hospital policies, guidelines, and formularies to standardize and improve medication use."
                },
                "2. Management of controlled drugs in a hospital setting": {
                  "a. Regulatory compliance": "Ensuring compliance with national and international regulations (e.g., Kenya Dangerous Drugs Act, WHO guidelines) for the storage, dispensing, and documentation of controlled substances.",
                  "b. Secure storage": "Storing controlled drugs in locked, tamper-proof cabinets or safes with restricted access to authorized personnel only.",
                  "c. Documentation and record-keeping": "Maintaining accurate and up-to-date records of controlled drug transactions, including receipt, dispensing, administration, and disposal. Records must be kept for a specified period (e.g., 2–5 years) as per regulatory requirements.",
                  "d. Inventory management": "Implementing systems to monitor stock levels, prevent stockouts, and avoid diversion or misuse. Regular audits and reconciliations should be conducted to ensure accountability.",
                  "e. Dispensing controls": "Ensuring that controlled drugs are dispensed only by authorized personnel and that prescriptions are verified for legitimacy (e.g., prescriber credentials, patient details, and clinical justification).",
                  "f. Waste management": "Implementing safe and compliant procedures for the disposal of expired, unused, or contaminated controlled substances to prevent environmental contamination or misuse.",
                  "g. Staff training and awareness": "Providing regular training to staff on the proper handling, storage, and disposal of controlled drugs, as well as recognizing and reporting suspicious activities or potential diversion."
                },
                "3. Quality assurance and quality control of medicines in a hospital pharmacy": {
                  "a. Procurement standards": "Ensuring that all medications procured meet regulatory standards (e.g., WHO prequalification, Kenya Bureau of Standards) and are sourced from reputable manufacturers.",
                  "b. Storage conditions": "Maintaining appropriate storage conditions (e.g., temperature, humidity, light) for all medications to preserve their potency and safety. This includes using calibrated refrigerators, freezers, and monitoring devices.",
                  "c. Inspection and verification": "Conducting visual inspections of medications upon receipt to check for damage, tampering, or expiration. Verifying the authenticity of medications (e.g., checking holograms, barcodes, or manufacturer details).",
                  "d. Labeling and packaging": "Ensuring that all medications are properly labeled with essential information (e.g., drug name, strength, dosage form, expiration date, storage instructions) and that packaging is intact and free from contamination.",
                  "e. Pharmacovigilance": "Monitoring for adverse drug reactions (ADRs) and reporting them to regulatory authorities (e.g., Pharmacy and Poisons Board in Kenya) to identify and mitigate risks associated with medication use.",
                  "f. Medication errors prevention": "Implementing systems (e.g., barcoding, automated dispensing cabinets) to reduce the risk of medication errors and ensuring that all staff are trained in error prevention strategies.",
                  "g. Continuous quality improvement": "Regularly reviewing and updating pharmacy policies, procedures, and formularies to align with best practices and emerging evidence. Conducting internal audits and participating in external quality assessments to identify areas for improvement."
                }
              }
            },
            {
              "stem": "With regard to community pharmacy practice, discuss the following:\n1. Responsibilities of a community pharmacist (15 marks)\n2. Consultation styles used in community pharmacy practice (15 marks)",
              "modelAnswer": {
                "1. Responsibilities of a community pharmacist": {
                  "a. Dispensing medications": "Accurately dispensing prescription and over-the-counter (OTC) medications, ensuring that the correct drug, dose, and formulation are provided to the patient. This includes verifying prescriptions, checking for drug interactions, and providing appropriate labeling and instructions.",
                  "b. Patient counseling and education": "Providing comprehensive medication counseling to patients, including drug indications, dosing instructions, potential side effects, and adherence strategies. Educating patients on lifestyle modifications, disease management, and preventive care.",
                  "c. Medication review and reconciliation": "Conducting medication reviews to assess the appropriateness, safety, and efficacy of a patient's medication regimen. Reconciling medications during transitions of care (e.g., hospital discharge) to prevent errors and omissions.",
                  "d. Over-the-counter (OTC) recommendations": "Providing evidence-based recommendations for OTC medications, including assessing the patient's symptoms, medical history, and potential contraindications. Educating patients on the safe and appropriate use of OTC products.",
                  "e. Health screening and monitoring": "Performing health screenings (e.g., blood pressure, blood glucose, cholesterol) and monitoring chronic conditions (e.g., diabetes, hypertension) to identify early signs of disease or complications. Referring patients to healthcare professionals when necessary.",
                  "f. Vaccination services": "Administering vaccinations (e.g., influenza, pneumococcal, COVID-19) as authorized by national guidelines and regulations. Providing education on vaccine-preventable diseases and the importance of immunization.",
                  "g. Chronic disease management": "Supporting patients with chronic conditions (e.g., diabetes, hypertension, asthma) through medication management, lifestyle counseling, and regular follow-ups. Collaborating with healthcare providers to optimize therapy and improve outcomes.",
                  "h. Public health initiatives": "Participating in public health campaigns (e.g., smoking cessation, weight management, HIV testing) to promote health and prevent disease. Providing education on topics such as safe medication disposal and poison prevention.",
                  "i. Drug information services": "Providing accurate, unbiased, and evidence-based drug information to patients, caregivers, and healthcare professionals. This includes answering questions about drug interactions, side effects, and alternative therapies.",
                  "j. Inventory and supply management": "Managing the pharmacy's inventory to ensure the availability of essential medications while minimizing waste and expiration. This includes ordering, stock rotation, and disposal of expired or unused medications.",
                  "k. Legal and regulatory compliance": "Ensuring compliance with national and local regulations governing pharmacy practice, including controlled substance management, prescription requirements, and record-keeping. Maintaining professional licensure and participating in continuing education.",
                  "l. Professional development and research": "Engaging in continuous professional development to stay updated on new medications, guidelines, and best practices. Participating in or conducting research to improve pharmacy services and patient care."
                },
                "2. Consultation styles used in community pharmacy practice": {
                  "a. Patient-centered consultation": "Focusing on the patient's needs, concerns, and preferences. The pharmacist actively listens, asks open-ended questions, and tailors the consultation to the individual's health literacy and cultural background. This style builds trust and encourages patient engagement.",
                  "b. Structured consultation": "Following a systematic approach (e.g., SOAP format: Subjective, Objective, Assessment, Plan) to ensure all relevant aspects of the patient's medication and health status are addressed. This style is particularly useful for patients with complex medication regimens or chronic conditions.",
                  "c. Motivational interviewing": "Using a collaborative, goal-oriented approach to elicit and strengthen the patient's motivation for behavior change (e.g., medication adherence, lifestyle modifications). The pharmacist uses empathy, reflective listening, and open-ended questions to explore the patient's ambivalence and encourage self-efficacy.",
                  "d. Teach-back method": "Ensuring that the patient understands and can apply the information provided by asking them to explain the instructions or advice in their own words. This method helps identify gaps in understanding and reinforces key messages.",
                  "e. Shared decision-making": "Involving the patient in the decision-making process by presenting options, discussing risks and benefits, and aligning the treatment plan with the patient's values and preferences. This style is particularly important for chronic disease management and preventive care.",
                  "f. Brief intervention": "Providing concise, targeted advice or education during a short consultation (e.g., for minor ailments or adherence issues). This style is efficient and practical for busy community pharmacies but should be followed by a more detailed consultation if necessary.",
                  "g. Cultural competence": "Adapting the consultation style to respect and accommodate the patient's cultural, linguistic, and socioeconomic background. This includes using interpreters, providing culturally appropriate education materials, and being aware of cultural beliefs and practices that may influence medication use."
                }
              }
            }
          ]
        }
      ]
    }
  },
  "exam-infections-i": {
    "1": {
      "title": "Clinical Pharmacy — Infections I",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "A 28-year-old man presents with sudden onset of diplopia, dysphagia, and dysarthria. He reports no fever or confusion but develops progressive descending flaccid paralysis over 24 hours. The most likely diagnosis is:",
              "options": [
                "Tetanus",
                "Diphtheria",
                "Botulism",
                "Strychnine poisoning"
              ],
              "answer": "Botulism",
              "explanation": "Botulism causes descending flaccid paralysis with cranial nerve involvement and no fever or confusion, distinguishing it from tetanus and diphtheria."
            },
            {
              "stem": "A 22-year-old student develops abdominal cramps, fever, and bloody diarrhea 18 hours after eating undercooked chicken at a barbecue. Stool culture confirms Campylobacter jejuni. The most appropriate antimicrobial therapy is:",
              "options": [
                "Azithromycin",
                "Ciprofloxacin",
                "Metronidazole",
                "No antimicrobials needed"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin is the preferred agent for Campylobacter enteritis, particularly in severe or bloody cases, as per WHO guidelines."
            },
            {
              "stem": "A 10-year-old boy with sickle cell disease presents with acute right knee pain and fever. Blood cultures grow Salmonella species. The most likely organism responsible for his osteomyelitis is:",
              "options": [
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Salmonella enterica",
                "Pseudomonas aeruginosa"
              ],
              "answer": "Salmonella enterica",
              "explanation": "Salmonella is the most common cause of osteomyelitis in patients with sickle cell disease due to functional asplenia and increased susceptibility."
            },
            {
              "stem": "A 35-year-old woman presents with migratory swellings over her arm and back, lasting 2-3 days, associated with itching and redness. She recently returned from a 6-month stay in Cameroon. The most likely vector for her infection is:",
              "options": [
                "Anopheles mosquito",
                "Chrysops deerfly",
                "Culex mosquito",
                "Mansonia mosquito"
              ],
              "answer": "Chrysops deerfly",
              "explanation": "Chrysops deerfly is the vector for Loa loa filariasis, which presents with migratory subcutaneous swellings."
            },
            {
              "stem": "A 9-month-old infant presents with severe watery diarrhea, vomiting, and signs of dehydration after consuming contaminated formula. The mechanism of action of the causative organism's toxin involves:",
              "options": [
                "ADP ribosylation of Elongation Factor 2",
                "ADP ribosylation of inhibitory G proteins leading to reduced cAMP",
                "ADP ribosylation of stimulatory G proteins leading to elevated intracellular cAMP",
                "Formation of cation-selective pores in cell membranes"
              ],
              "answer": "ADP ribosylation of stimulatory G proteins leading to elevated intracellular cAMP",
              "explanation": "Cholera toxin ADP-ribosylates the stimulatory G protein (Gs), locking it in an active state and causing persistent elevation of cAMP, leading to chloride secretion and watery diarrhea."
            },
            {
              "stem": "A 4-year-old boy with a history of chickenpox presents with refusal to walk, fever, and pain over the right knee. Examination reveals warmth and tenderness without joint effusion. The most likely causative organism is:",
              "options": [
                "Salmonella",
                "Staphylococcus aureus",
                "Group A Streptococcus",
                "Haemophilus influenzae"
              ],
              "answer": "Staphylococcus aureus",
              "explanation": "Staphylococcus aureus is the most common cause of acute hematogenous osteomyelitis in children, particularly following varicella infection."
            },
            {
              "stem": "A 25-year-old man presents with fever, right knee pain, and rigors. Joint aspiration reveals purulent fluid with 120,000 WBC/mm³. The most likely cause of septic arthritis is:",
              "options": [
                "Neisseria gonorrhoeae",
                "Escherichia coli",
                "Parvovirus",
                "Staphylococcus aureus"
              ],
              "answer": "Neisseria gonorrhoeae",
              "explanation": "Neisseria gonorrhoeae is the most common cause of septic arthritis in sexually active adults, particularly in the absence of trauma."
            },
            {
              "stem": "A 7-year-old girl is treated for a carbuncle caused by MRSA sensitive to all antibiotics except erythromycin and oxacillin. The double disk diffusion test is positive. The best option to complete her antibiotic course is:",
              "options": [
                "Clindamycin",
                "Doxycycline",
                "Levofloxacin",
                "Linezolid"
              ],
              "answer": "Clindamycin",
              "explanation": "Clindamycin is appropriate for MRSA infections with inducible resistance ruled out by a negative D-test, as per antimicrobial stewardship principles."
            },
            {
              "stem": "A 65-year-old man with uncontrolled type 2 diabetes is bitten by a stray dog. He has no history of tetanus vaccination in the past 10 years. The most appropriate intervention includes:",
              "options": [
                "Wound debridement and washout only",
                "Amoxicillin-clavulanate plus tetanus toxoid-containing vaccine",
                "Ciprofloxacin plus clindamycin",
                "Moxifloxacin plus tetanus toxoid-containing vaccine"
              ],
              "answer": "Amoxicillin-clavulanate plus tetanus toxoid-containing vaccine",
              "explanation": "Amoxicillin-clavulanate covers typical dog bite pathogens, and tetanus vaccination is indicated due to incomplete immunization history."
            },
            {
              "stem": "A 21-year-old woman presents with multiple painless, skin-colored papules over her vulva and perianal area, with some cauliflower-shaped clusters. The most likely HPV type responsible is:",
              "options": [
                "HPV-1",
                "HPV-6",
                "HPV-16",
                "HPV-18"
              ],
              "answer": "HPV-6",
              "explanation": "HPV-6 and HPV-11 are the most common types associated with anogenital warts (condyloma acuminata)."
            },
            {
              "stem": "A 29-year-old man returns from a camping trip in Amboseli with a wild dog bite to his hand. He has received a full primary tetanus series and a booster 12 years ago. The most appropriate rabies post-exposure prophylaxis is:",
              "options": [
                "Wound debridement and washout only",
                "Five doses of IM rabies vaccine on days 0, 3, 7, 14, and 28 only",
                "Five doses of IM rabies vaccine plus human rabies immunoglobulin infiltrated into the wound",
                "Human rabies immunoglobulin infiltrated into the wound only"
              ],
              "answer": "Five doses of IM rabies vaccine plus human rabies immunoglobulin infiltrated into the wound",
              "explanation": "Rabies post-exposure prophylaxis requires both rabies vaccine and human rabies immunoglobulin infiltrated into the wound for category III exposures."
            },
            {
              "stem": "An 18-month-old boy presents with 4 days of severe watery diarrhea, vomiting, and dehydration. He has no blood in stool. In addition to oral rehydration solution, the most beneficial adjunctive therapy is:",
              "options": [
                "Ascorbic acid",
                "Cholecalciferol",
                "Thiamine",
                "Zinc"
              ],
              "answer": "Zinc",
              "explanation": "Zinc supplementation reduces the duration and severity of diarrhea in children, particularly in resource-limited settings, as per WHO guidelines."
            },
            {
              "stem": "A 32-year-old woman presents with 7 days of cramping abdominal pain and bloody diarrhea after returning from a family holiday. Stool culture is positive for Campylobacter jejuni. The most appropriate management is:",
              "options": [
                "Azithromycin",
                "Ciprofloxacin",
                "Metronidazole",
                "No antimicrobials needed"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin is the preferred agent for Campylobacter enteritis, particularly in severe or prolonged cases."
            },
            {
              "stem": "A 9-year-old boy with acute hematogenous osteomyelitis of the distal tibia shows no clinical improvement after 3 days of IV antibiotics. Imaging reveals a 1.5x1.5cm abscess. The most reliable method to monitor early treatment success is:",
              "options": [
                "White blood cell count",
                "MRI",
                "Erythrocyte sedimentation rate",
                "C-reactive protein"
              ],
              "answer": "C-reactive protein",
              "explanation": "C-reactive protein is the most expeditious marker for monitoring early response to treatment in osteomyelitis, with levels declining within 48-72 hours of effective therapy."
            },
            {
              "stem": "A 22-year-old sexually active woman presents with fever, joint pain, and a petechial rash with pustules over her arms. Tenosynovitis of the wrist is noted. The most likely diagnosis is:",
              "options": [
                "Gonococcal arthritis",
                "Meningococcal septicaemia",
                "Pustular psoriasis",
                "Reactive arthritis"
              ],
              "answer": "Gonococcal arthritis",
              "explanation": "Gonococcal arthritis presents with fever, migratory arthralgia, tenosynovitis, and dermatitis, particularly in sexually active individuals."
            },
            {
              "stem": "Which of the following statements is CORRECT regarding Vibrio cholerae infection?",
              "options": [
                "The organism is isolated from a blood sample.",
                "The natural reservoir of the organism is domestic animals.",
                "The LPS complex is the main virulence factor.",
                "An enterotoxin is the main virulence factor."
              ],
              "answer": "An enterotoxin is the main virulence factor.",
              "explanation": "Cholera toxin (an enterotoxin) is the primary virulence factor, causing ADP-ribosylation of Gs proteins and persistent cAMP elevation."
            },
            {
              "stem": "Each of the following agents is a recognized cause of diarrhea EXCEPT:",
              "options": [
                "Clostridium perfringens",
                "Enterococcus faecalis",
                "Shigella dysenteriae",
                "Vibrio cholerae",
                "Campylobacter jejuni"
              ],
              "answer": "Enterococcus faecalis",
              "explanation": "Enterococcus faecalis is not a recognized cause of diarrhea; it is a commensal organism of the gastrointestinal tract."
            },
            {
              "stem": "A 7-year-old girl is treated for a carbuncle caused by MRSA. The culture shows sensitivity to all antibiotics except erythromycin and oxacillin, with a positive double disk diffusion test. The best option to complete her antibiotic course is:",
              "options": [
                "Clindamycin",
                "Doxycycline",
                "Levofloxacin",
                "Linezolid"
              ],
              "answer": "Linezolid",
              "explanation": "Linezolid is recommended for MRSA infections with inducible clindamycin resistance (positive D-test) to avoid treatment failure."
            },
            {
              "stem": "A 4-year-old boy presents with intense perianal itching and irritability. Eggs with a flattened side are identified on scotch tape examination. The most likely organism is:",
              "options": [
                "Enterobius vermicularis",
                "Ascaris lumbricoides",
                "Entamoeba histolytica",
                "Trichuris trichiura"
              ],
              "answer": "Enterobius vermicularis",
              "explanation": "Enterobius vermicularis (pinworm) causes perianal itching, particularly at night, and eggs with a flattened side are diagnostic."
            },
            {
              "stem": "Pigs or dogs are the source of human infection by each of the following parasites EXCEPT:",
              "options": [
                "Echinococcus granulosus",
                "Trichinella spiralis",
                "Ascaris lumbricoides",
                "Taenia solium"
              ],
              "answer": "Ascaris lumbricoides",
              "explanation": "Ascaris lumbricoides is transmitted via fecal-oral route from contaminated food/water, not from pigs or dogs."
            },
            {
              "stem": "Which of the following is most likely to be a source of food poisoning bacteria?",
              "options": [
                "Frozen peas",
                "Pasteurised milk",
                "Tinned salmon",
                "Raw meat"
              ],
              "answer": "Raw meat",
              "explanation": "Raw meat is a common source of foodborne pathogens such as Salmonella, Campylobacter, and E. coli O157:H7."
            },
            {
              "stem": "The main symptom of Staphylococcus food poisoning is:",
              "options": [
                "Vomiting",
                "Diarrhoea",
                "Fever",
                "Abdominal pains"
              ],
              "answer": "Vomiting",
              "explanation": "Staphylococcus aureus food poisoning is characterized by rapid onset (1-6 hours) of severe nausea and vomiting due to preformed enterotoxins."
            },
            {
              "stem": "Escherichia coli is characterized by its virulence properties. All are types of E. coli EXCEPT:",
              "options": [
                "Enterohemorrhagic E. coli",
                "Enteropathogenic E. coli",
                "Enterotoxigenic E. coli",
                "Enterolysogenic E. coli"
              ],
              "answer": "Enterolysogenic E. coli",
              "explanation": "Enterolysogenic E. coli is not a recognized category; the main pathotypes are EHEC, EPEC, ETEC, EIEC, and EAEC."
            },
            {
              "stem": "Symptoms of typhoid fever develop 1-3 weeks after exposure to S. typhi. All of the following are major symptoms EXCEPT:",
              "options": [
                "Weight gain",
                "Headache",
                "High-grade fever",
                "Rashes"
              ],
              "answer": "Weight gain",
              "explanation": "Weight loss, not gain, is a common feature of typhoid fever due to anorexia and systemic illness."
            },
            {
              "stem": "One of the most common food-borne illnesses from undercooked poultry and eggs is:",
              "options": [
                "Trichinella",
                "Salmonella",
                "Clostridium perfringens",
                "Clostridium botulinum"
              ],
              "answer": "Salmonella",
              "explanation": "Salmonella is the most common cause of foodborne illness from undercooked poultry and eggs."
            },
            {
              "stem": "A patient with severe dehydration based on weight loss and clinical signs should be rehydrated with:",
              "options": [
                "Oral rehydration solution",
                "Intravenous normal saline",
                "Intravenous D5W",
                "Intravenous colloid solutions"
              ],
              "answer": "Intravenous normal saline",
              "explanation": "Intravenous normal saline is the preferred fluid for initial resuscitation in severe dehydration due to its isotonicity and rapid distribution."
            },
            {
              "stem": "Which of the following is true regarding oral rehydration therapy (ORT)?",
              "options": [
                "Requires hospitalization to administer",
                "Cannot be used in infants with infrequent vomiting",
                "Often ineffective",
                "Inexpensive"
              ],
              "answer": "Inexpensive",
              "explanation": "ORT is inexpensive, effective, and can be administered at home, making it ideal for resource-limited settings."
            },
            {
              "stem": "Which is NOT an advantage of low-osmolarity (rice-based) ORT over isotonic, traditional ORT?",
              "options": [
                "More effectively replenishes electrolytes",
                "Decreases stool frequency",
                "Decreases duration of diarrhea",
                "Decreases stool volume"
              ],
              "answer": "More effectively replenishes electrolytes",
              "explanation": "Low-osmolarity ORT decreases stool frequency, duration, and volume but does not more effectively replenish electrolytes compared to traditional ORT."
            },
            {
              "stem": "Which diarrhea category can be treated safely with antimotility agents?",
              "options": [
                "Empirical traveler's diarrhea (nonbloody)",
                "Dysentery",
                "EHEC",
                "Shigellosis"
              ],
              "answer": "Empirical traveler's diarrhea (nonbloody)",
              "explanation": "Antimotility agents (e.g., loperamide) may be used cautiously in nonbloody traveler's diarrhea but are contraindicated in dysentery, EHEC, and shigellosis."
            },
            {
              "stem": "An 8-year-old with cholera should be treated with:",
              "options": [
                "Ciprofloxacin",
                "Doxycycline",
                "TMP-SMX",
                "Antibiotic use is not indicated"
              ],
              "answer": "Ciprofloxacin",
              "explanation": "Antibiotics shorten the duration and reduce the severity of cholera; ciprofloxacin is the preferred agent in children."
            },
            {
              "stem": "Some of the more common causes of food poisoning include all these EXCEPT:",
              "options": [
                "Shigella",
                "Salmonella",
                "S. aureus",
                "V. cholerae"
              ],
              "answer": "V. cholerae",
              "explanation": "Vibrio cholerae is not a common cause of food poisoning; it causes cholera, a separate clinical entity."
            },
            {
              "stem": "All of the following are major complications of falciparum malaria infection EXCEPT:",
              "options": [
                "Seizures and coma",
                "Hypoglycemia",
                "Severe anemia",
                "Peritonitis"
              ],
              "answer": "Peritonitis",
              "explanation": "Peritonitis is not a recognized complication of falciparum malaria; complications include cerebral malaria, hypoglycemia, severe anemia, and acute kidney injury."
            },
            {
              "stem": "The drug of choice for the eradication of lice infestation (body, head, and crab lice) is:",
              "options": [
                "1% menthol",
                "Permethrin 1%",
                "Y-benzene hexachloride",
                "Sulfur ointment"
              ],
              "answer": "Permethrin 1%",
              "explanation": "Permethrin 1% is the first-line treatment for lice infestations due to its efficacy and safety profile."
            },
            {
              "stem": "Which of the following agents should be avoided in patients with glucose-6-phosphate dehydrogenase (G6PD) deficiency?",
              "options": [
                "Ivermectin",
                "Mefloquine",
                "Primaquine",
                "Albendazole"
              ],
              "answer": "Primaquine",
              "explanation": "Primaquine can cause hemolytic anemia in G6PD-deficient patients due to oxidative stress."
            },
            {
              "stem": "Black water fever is a special manifestation of malaria caused by:",
              "options": [
                "P. falciparum",
                "P. malariae",
                "P. ovale",
                "P. vivax"
              ],
              "answer": "P. falciparum",
              "explanation": "Black water fever, characterized by hemoglobinuria and renal failure, is associated with severe Plasmodium falciparum infection."
            },
            {
              "stem": "All of the following statements regarding Plasmodium falciparum are true EXCEPT:",
              "options": [
                "Causes more severe disease in pregnancy",
                "Is associated with recurrent relapses after initial treatment because of liver hypnozoites",
                "Is the only malarial parasite causing greater than 20% parasitaemia",
                "Is the only cause of cerebral malaria"
              ],
              "answer": "Is associated with recurrent relapses after initial treatment because of liver hypnozoites",
              "explanation": "P. falciparum does not form hypnozoites and does not cause relapses; this feature is characteristic of P. vivax and P. ovale."
            },
            {
              "stem": "Which of the following statements is true regarding amoebic liver abscess?",
              "options": [
                "Should be treated by diloxanide furoate alone",
                "Should be aspirated routinely",
                "Is associated with eosinophilia",
                "Should be treated using a combination of metronidazole and diloxanide"
              ],
              "answer": "Should be treated using a combination of metronidazole and diloxanide",
              "explanation": "Amoebic liver abscess requires metronidazole for the trophozoite stage followed by diloxanide furoate to eliminate intestinal carriage."
            },
            {
              "stem": "Subcutaneous nodules are a typical finding in all the following infections EXCEPT:",
              "options": [
                "Neurofibromatosis",
                "Hydatid disease",
                "Cysticercosis",
                "Onchocerciasis"
              ],
              "answer": "Neurofibromatosis",
              "explanation": "Neurofibromatosis is a genetic disorder, not an infectious cause of subcutaneous nodules."
            },
            {
              "stem": "All of the following are characteristic features of acute schistosomiasis EXCEPT:",
              "options": [
                "Fever",
                "Eosinophilia",
                "Myocarditis",
                "Incubation period of 4-6 weeks"
              ],
              "answer": "Myocarditis",
              "explanation": "Myocarditis is not a characteristic feature of acute schistosomiasis; the acute phase (Katayama fever) presents with fever, eosinophilia, and urticaria."
            },
            {
              "stem": "Effective malaria control interventions include all the following EXCEPT:",
              "options": [
                "Mass use of Fansidar chemoprophylaxis",
                "Use of pyrethroid impregnated mosquito nets",
                "Larviciding",
                "Eradication of mosquito breeding sites"
              ],
              "answer": "Mass use of Fansidar chemoprophylaxis",
              "explanation": "Mass chemoprophylaxis with Fansidar (sulfadoxine-pyrimethamine) is not recommended due to resistance and potential toxicity."
            },
            {
              "stem": "All of the following occur in Chagas' disease (American trypanosomiasis) EXCEPT:",
              "options": [
                "Lymphadenopathy",
                "Meningoencephalitis",
                "Calabar swelling",
                "Mega-oesophagus"
              ],
              "answer": "Calabar swelling",
              "explanation": "Calabar swelling is a feature of loiasis, not Chagas' disease."
            },
            {
              "stem": "Blindness is a recognized complication of all the following infections EXCEPT:",
              "options": [
                "Onchocerciasis",
                "Amoebiasis",
                "Cysticercosis",
                "Toxoplasmosis"
              ],
              "answer": "Amoebiasis",
              "explanation": "Amoebiasis does not cause blindness; onchocerciasis, cysticercosis, and toxoplasmosis can lead to visual impairment or blindness."
            },
            {
              "stem": "Which of the following may not present with fever and diarrhea?",
              "options": [
                "Malaria",
                "Giardiasis",
                "Campylobacter enteritis",
                "Brucellosis"
              ],
              "answer": "Giardiasis",
              "explanation": "Giardiasis typically presents with chronic diarrhea, malabsorption, and weight loss but is less commonly associated with fever."
            },
            {
              "stem": "Steroids are of benefit in the treatment of:",
              "options": [
                "Visceral leishmaniasis",
                "Escherichia coli septicaemia",
                "Cerebral malaria",
                "Severe typhoid fever"
              ],
              "answer": "Cerebral malaria",
              "explanation": "Dexamethasone is recommended in cerebral malaria to reduce cerebral edema and improve outcomes."
            },
            {
              "stem": "Which of the following parasites can cause rectal prolapse?",
              "options": [
                "Hookworm",
                "Ascaris",
                "Trichuris",
                "All of the above"
              ],
              "answer": "Trichuris",
              "explanation": "Trichuris trichiura (whipworm) can cause chronic inflammation and rectal prolapse, particularly in children with heavy infestations."
            },
            {
              "stem": "A 12-year-old patient with Salmonella enterocolitis with moderate symptoms should receive which of the following regimens?",
              "options": [
                "ORT + ciprofloxacin + loperamide",
                "ORT + ciprofloxacin",
                "ORT + azithromycin",
                "ORT"
              ],
              "answer": "ORT + azithromycin",
              "explanation": "Azithromycin is preferred for Salmonella enterocolitis in children due to its safety and efficacy against Salmonella species."
            },
            {
              "stem": "Intervention strategies for malaria include:",
              "options": [
                "Insecticide-treated bed net",
                "Indoor residual spraying with DDT",
                "Removal of mosquito breeding sites",
                "All of the above"
              ],
              "answer": "All of the above",
              "explanation": "All listed interventions are effective components of malaria control strategies."
            },
            {
              "stem": "Treatment of acute diarrhea includes:",
              "options": [
                "Oral rehydration and penicillin",
                "Oral rehydration, zinc supplementation",
                "Intravenous saline and penicillin",
                "Oral rehydration, energy-rich food, and zinc supplementation"
              ],
              "answer": "Oral rehydration, energy-rich food, and zinc supplementation",
              "explanation": "Oral rehydration solution replenishes fluids and electrolytes, zinc reduces diarrhea duration, and energy-rich food supports recovery."
            },
            {
              "stem": "Acute osteomyelitis is commonly caused by:",
              "options": [
                "Staph aureus",
                "S. pyogenes",
                "H. influenzae",
                "Salmonella"
              ],
              "answer": "Staph aureus",
              "explanation": "Staphylococcus aureus is the most common cause of acute osteomyelitis across all age groups."
            },
            {
              "stem": "Complication of amoebic dysentery includes all the following EXCEPT:",
              "options": [
                "Ameboma",
                "Intestinal perforation and peritonitis",
                "Extra intestinal lesions",
                "Peptic ulcer disease"
              ],
              "answer": "Peptic ulcer disease",
              "explanation": "Peptic ulcer disease is not a complication of amoebic dysentery; complications include ameboma, perforation, and extraintestinal abscesses."
            },
            {
              "stem": "All of the following are TRUE regarding acute osteomyelitis in a child EXCEPT:",
              "options": [
                "Diagnosis by X-ray is 8-10 days after onset",
                "There is diffuse tenderness at the site",
                "Antibiotic therapy should be at least for 4 weeks",
                "Salmonella is the most common cause"
              ],
              "answer": "Salmonella is the most common cause",
              "explanation": "Salmonella is not the most common cause of acute osteomyelitis in children; Staphylococcus aureus is the predominant pathogen."
            },
            {
              "stem": "Which among the following is NOT a complication of acute osteomyelitis?",
              "options": [
                "Malignancy",
                "Fracture of the affected bone",
                "Sepsis",
                "Chronicity"
              ],
              "answer": "Malignancy",
              "explanation": "Malignancy is not a recognized complication of acute osteomyelitis."
            },
            {
              "stem": "The most common cause of nongonococcal septic arthritis is:",
              "options": [
                "Staph aureus",
                "H. influenzae",
                "Pseudomonas",
                "Streptococcus"
              ],
              "answer": "Staph aureus",
              "explanation": "Staphylococcus aureus is the most common cause of nongonococcal septic arthritis."
            },
            {
              "stem": "Pseudomembranous colitis is caused by:",
              "options": [
                "Clostridium tetani",
                "Clostridium difficile",
                "Clostridium botulinum",
                "Clostridium perfringens"
              ],
              "answer": "Clostridium difficile",
              "explanation": "Clostridium difficile is the causative agent of pseudomembranous colitis, typically following antibiotic use."
            },
            {
              "stem": "Select the commonest organism causing osteomyelitis in children under 3 years:",
              "options": [
                "Haemophilus",
                "Staphylococcal",
                "Streptococcal",
                "Salmonella"
              ],
              "answer": "Staphylococcal",
              "explanation": "Staphylococcus aureus is the most common cause of osteomyelitis in children under 3 years."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 17-year-old boy presents with sudden onset of fever (103.3°F), fatigue, and pain in his right lower leg. He is unable to walk due to pain. Examination reveals swelling, point tenderness over the proximal medial tibia, and limited movement. Labs: Hb 12.5 g/dL, WBC 15,000/mm³, ESR 65 mm/h. A technetium bone scan shows increased uptake at the metaphysis of the tibia. Identify the most likely diagnosis.",
              "modelAnswer": "Acute hematogenous osteomyelitis of the tibia."
            },
            {
              "stem": "Outline the pharmacological and non-pharmacological management of the patient described above.",
              "modelAnswer": "Pharmacological: Empirical IV antibiotics (e.g., cloxacillin or cefazolin) for 4-6 weeks, tailored to culture results. Analgesia (paracetamol or NSAIDs) for pain control. Non-pharmacological: Rest, immobilization of the limb, and surgical debridement if abscess formation or failure to improve within 48-72 hours."
            },
            {
              "stem": "Identify the most important member of Enterobacteriaceae that causes each of the following diseases: (a) Childhood diarrhea, (b) Traveler's diarrhea, (c) Bacillary dysentery, (d) Hemorrhagic colitis or Hemolytic Uremic Syndrome (HUS).",
              "modelAnswer": "(a) Enteropathogenic E. coli (EPEC), (b) Enterotoxigenic E. coli (ETEC), (c) Shigella dysenteriae, (d) Enterohemorrhagic E. coli (EHEC, e.g., E. coli O157:H7)."
            },
            {
              "stem": "Identify 3 human worms (parasites) that can cause iron deficiency anemia and 1 parasite associated with pernicious anemia.",
              "modelAnswer": "Worms causing iron deficiency anemia: Hookworm (Necator americanus, Ancylostoma duodenale), Whipworm (Trichuris trichiura), Ascaris lumbricoides. Parasite associated with pernicious anemia: Fish tapeworm (Diphyllobothrium latum)."
            },
            {
              "stem": "Pablo, a 41-year-old security officer, is bitten by a neighbor’s dog while passing near the driveway. The dog’s vaccination history is unclear. Formulate an appropriate treatment plan for Pablo and include counseling points.",
              "modelAnswer": "Treatment plan: 1) Immediate wound cleansing and irrigation with soap and water. 2) Tetanus toxoid-containing vaccine if not up to date. 3) Rabies post-exposure prophylaxis: Human rabies immunoglobulin (HRIG) infiltrated into the wound + rabies vaccine on days 0, 3, 7, 14, and 28. 4) Empirical antimicrobial therapy (e.g., amoxicillin-clavulanate) for 5-7 days to cover Pasteurella, Capnocytophaga, and oral flora. Counseling: Advise on wound care, signs of infection, importance of completing rabies vaccination series, and avoiding contact with stray animals."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "BC is a 49-year-old obese woman presenting with a 1-week history of fever, confusion, delirium, abdominal pain, headache, anorexia, and diarrhea. She returned 10 days ago from Mathare slums, where some relatives were recovering from typhoid fever. Admission vitals: T 38.3°C, HR 60 bpm, BP stable. Exam: Splenomegaly, hepatomegaly. Labs: WBC 3.0 x 10⁶/μL, mildly elevated LFTs, pending blood cultures. Identify the most likely presumptive diagnosis and the probable causative agent. Why is her history, presentation, and labs consistent with this diagnosis? Illustrate three benefits of antimicrobial treatment in BC. Design an appropriate treatment plan for BC (include adjunctive and supportive therapy). Fourteen months after discharge, BC’s stool is still positive for the same microbial agent. Propose 4 therapeutic options to cure BC’s chronic carrier state. Outline 2 preventive measures against BC’s condition.",
              "modelAnswer": {
                "diagnosis": "Presumptive diagnosis: Typhoid fever (enteric fever) caused by Salmonella Typhi.",
                "consistency": [
                  "History: Recent travel to an endemic area with exposure to typhoid cases.",
                  "Clinical presentation: Fever, confusion, abdominal pain, diarrhea, and hepatosplenomegaly are classic features of typhoid fever.",
                  "Labs: Leukopenia (WBC 3.0 x 10⁶/μL) is typical in typhoid fever, and elevated LFTs suggest hepatic involvement.",
                  "Pending blood cultures: Salmonella Typhi is the likely causative agent."
                ],
                "benefits_of_antimicrobials": [
                  "Reduces mortality by 90% if treated early with appropriate antibiotics.",
                  "Shortens the duration of illness and reduces complications (e.g., intestinal perforation, hemorrhage).",
                  "Prevents the development of chronic carrier state in a subset of patients."
                ],
                "treatment_plan": {
                  "empirical_antibiotics": "IV ceftriaxone 2g q24h for 10-14 days (or until afebrile for 5-7 days), as fluoroquinolone resistance is common in endemic regions.",
                  "adjustment": "Switch to oral azithromycin 500mg q24h if sensitivities confirm susceptibility and clinical improvement is noted.",
                  "supportive_care": "Aggressive fluid resuscitation, antipyretics (paracetamol), and nutritional support. Monitor for complications (e.g., intestinal perforation, encephalopathy).",
                  "infection_control": "Contact precautions until 3 consecutive negative stool cultures are obtained."
                },
                "chronic_carrier_options": [
                  "Oral ciprofloxacin 500mg q12h for 28 days (first-line for chronic carriers).",
                  "Oral norfloxacin 400mg q12h for 28 days (alternative if ciprofloxacin-resistant).",
                  "Cholecystectomy (if gallstones are present) combined with antimicrobial therapy to eliminate the carrier state.",
                  "Oral amoxicillin 1g q6h for 6 weeks (if susceptible) or oral trimethoprim-sulfamethoxazole DS 160/800mg q12h for 6 weeks."
                ],
                "preventive_measures": [
                  "Consumption of safe water and food, particularly in endemic areas; avoid raw vegetables, unpeeled fruits, and street food.",
                  "Typhoid vaccination (inactivated or live attenuated) for travelers to endemic regions or high-risk populations."
                ]
              }
            },
            {
              "stem": "A 5-year-old boy is brought to the outpatient department with a history of vomiting after breakfast and fever (38.5°C). He is alert, well-nourished, and has no signs of dehydration. Social history reveals recent travel to Mwea. Identify the most likely diagnosis and causative agent. Justify your answer. Propose 3 diagnostic tests that would help confirm the diagnosis and elaborate on their utility. Compile an elaborate treatment plan for this patient (include dosing regimens). Illustrate 3 counseling points for the mother. The patient returns later with worsening symptoms, including a seizure and unconsciousness. Identify the most probable diagnosis and justify your answer. Design an appropriate treatment plan for this patient.",
              "modelAnswer": {
                "diagnosis_part1": "Most likely diagnosis: Acute gastroenteritis due to rotavirus infection.",
                "causative_agent": "Rotavirus is the most common cause of severe diarrhea in children under 5 years, particularly in resource-limited settings.",
                "justification": [
                  "Age: Rotavirus is most severe in children aged 6 months to 2 years.",
                  "Travel history: Increased exposure to contaminated water/food in Mwea.",
                  "Clinical presentation: Acute onset of vomiting and fever, typical of rotavirus gastroenteritis.",
                  "Absence of dehydration: Mild-moderate cases often present without dehydration."
                ],
                "diagnostic_tests": [
                  "Stool rotavirus antigen test: Rapid immunochromatographic assay to detect rotavirus antigen in stool (high sensitivity and specificity).",
                  "Stool culture: To rule out bacterial pathogens (e.g., Salmonella, Campylobacter) if bloody diarrhea or severe symptoms are present.",
                  "Electrolyte panel: To assess for hyponatremia, hypokalemia, or metabolic acidosis secondary to fluid losses."
                ],
                "treatment_plan": {
                  "rehydration": "Oral rehydration solution (ORS): 75 mL/kg over 4 hours for mild dehydration, followed by maintenance fluids (100 mL/kg/day for 24 hours).",
                  "antiemetics": "Ondansetron 0.15 mg/kg/dose (max 8 mg) as a single dose if persistent vomiting.",
                  "zinc_supplementation": "Zinc sulfate 20 mg/day for 10-14 days to reduce duration and severity of diarrhea.",
                  "antipyretics": "Paracetamol 15 mg/kg/dose every 4-6 hours as needed for fever (max 60 mg/kg/day).",
                  "diet": "Continue breastfeeding or age-appropriate diet; avoid dairy products temporarily if lactose intolerance is suspected."
                },
                "counseling_points": [
                  "Emphasize the importance of hand hygiene and safe water/food consumption to prevent recurrence.",
                  "Advise on signs of dehydration (e.g., reduced urine output, dry mucous membranes, lethargy) and when to seek medical attention.",
                  "Explain the role of zinc supplementation in reducing the duration of diarrhea and improving outcomes."
                ],
                "diagnosis_part2": "Most probable diagnosis: Rotavirus gastroenteritis with severe dehydration and electrolyte imbalance, complicated by febrile seizure and altered consciousness.",
                "justification_part2": [
                  "Seizure: Febrile seizures are common in children with rotavirus gastroenteritis due to rapid fluid shifts and electrolyte imbalances.",
                  "Unconsciousness: Suggests severe dehydration, hyponatremia, or metabolic acidosis leading to altered mental status.",
                  "Absence of neck stiffness or rash: Rules out meningitis or other intracranial pathologies."
                ],
                "treatment_plan_part2": {
                  "resuscitation": "IV normal saline 20 mL/kg bolus over 15-30 minutes, repeated if necessary, followed by maintenance fluids (D5 0.45% saline with 20 mEq/L KCl at 1.5x maintenance rate).",
                  "anticonvulsants": "IV lorazepam 0.1 mg/kg (max 4 mg) for seizure control if ongoing.",
                  "monitoring": "Frequent vital signs, neurological checks, and electrolyte monitoring (particularly sodium and potassium).",
                  "antimicrobials": "Not indicated unless bacterial co-infection is suspected (e.g., bloody diarrhea).",
                  "supportive_care": "Oxygen therapy if hypoxic, and gradual reintroduction of oral fluids once stable."
                }
              }
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Clinical Pharmacy — Infections I",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "A 45-year-old farmer presents with progressive muscle weakness starting in the upper limbs, followed by facial drooping and difficulty swallowing. He reports no fever but notes blurred vision. On examination, pupils are dilated and non-reactive. What is the most likely diagnosis?",
              "options": [
                "Tetanus",
                "Diphtheria",
                "Botulism",
                "Strychnine poisoning"
              ],
              "answer": "Botulism",
              "explanation": "Botulism presents with descending flaccid paralysis, cranial nerve palsies, and autonomic symptoms without fever, typically from toxin ingestion or wound contamination."
            },
            {
              "stem": "A 22-year-old student develops watery diarrhea and severe abdominal cramps 24 hours after eating undercooked chicken at a barbecue. Stool culture reveals curved, gram-negative rods. Which organism is most likely responsible?",
              "options": [
                "Salmonella enterica",
                "Campylobacter jejuni",
                "Escherichia coli O157:H7",
                "Staphylococcus aureus"
              ],
              "answer": "Campylobacter jejuni",
              "explanation": "Campylobacter is a common cause of foodborne illness after poultry consumption, often presenting with bloody diarrhea and culture yielding curved gram-negative rods."
            },
            {
              "stem": "A 6-year-old child with sickle cell disease presents with acute onset right knee pain and fever. Imaging reveals osteomyelitis. Which organism is most likely responsible?",
              "options": [
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Salmonella spp.",
                "Pseudomonas aeruginosa"
              ],
              "answer": "Salmonella spp.",
              "explanation": "In sickle cell disease, osteomyelitis is commonly caused by Salmonella due to functional asplenia and impaired opsonization."
            },
            {
              "stem": "A 28-year-old woman presents with multiple painless, cauliflower-like lesions on her vulva. PCR testing identifies HPV type 6. Which clinical feature is most consistent with this infection?",
              "options": [
                "Painful ulcerative lesions",
                "Cervical dysplasia on Pap smear",
                "Spontaneous resolution within 2 years",
                "Association with cervical cancer"
              ],
              "answer": "Spontaneous resolution within 2 years",
              "explanation": "HPV-6 and HPV-11 are low-risk types causing anogenital warts, which often resolve spontaneously within 2 years without progression to cancer."
            },
            {
              "stem": "A 35-year-old man sustains a bite from a stray dog in a rural area. He has no prior rabies vaccination. What is the recommended post-exposure prophylaxis regimen?",
              "options": [
                "Rabies vaccine only on days 0, 3, 7, 14, and 28",
                "Rabies vaccine plus human rabies immunoglobulin (RIG) infiltrated into the wound",
                "Human rabies immunoglobulin infiltrated into the wound only",
                "No intervention unless symptoms develop"
              ],
              "answer": "Rabies vaccine plus human rabies immunoglobulin (RIG) infiltrated into the wound",
              "explanation": "Post-exposure prophylaxis for unvaccinated individuals includes both rabies vaccine (days 0, 3, 7, 14, 28) and RIG infiltrated into the wound to neutralize virus at the site."
            },
            {
              "stem": "A 40-year-old woman presents with 5 days of bloody diarrhea, fever, and abdominal cramps after returning from a camping trip. Stool culture confirms Campylobacter jejuni. Which antibiotic is most appropriate for treatment?",
              "options": [
                "Metronidazole",
                "Ciprofloxacin",
                "Azithromycin",
                "No antibiotics indicated"
              ],
              "answer": "Azithromycin",
              "explanation": "Azithromycin is the preferred agent for Campylobacter enteritis due to increasing fluoroquinolone resistance; alternatives include erythromycin or clarithromycin."
            },
            {
              "stem": "A 10-year-old boy is admitted with profuse rice-water diarrhea after drinking contaminated water. Stool culture grows Vibrio cholerae. What is the mechanism of action of the cholera toxin?",
              "options": [
                "ADP ribosylation of elongation factor 2",
                "ADP ribosylation of inhibitory G proteins leading to reduced cAMP",
                "ADP ribosylation of stimulatory G proteins leading to elevated intracellular cAMP",
                "Formation of cation-selective pores in cell membranes"
              ],
              "answer": "ADP ribosylation of stimulatory G proteins leading to elevated intracellular cAMP",
              "explanation": "Cholera toxin ADP-ribosylates the stimulatory Gs protein, locking it in an active state and causing persistent elevation of cAMP, leading to chloride secretion and watery diarrhea."
            },
            {
              "stem": "A 30-year-old woman presents with migratory swellings on her arm and back, lasting 2–3 days each, associated with pruritus. She recently returned from Cameroon. Which vector is most likely responsible for her infection?",
              "options": [
                "Anopheles mosquito",
                "Chrysops deerfly",
                "Culex mosquito",
                "Simulium blackfly"
              ],
              "answer": "Chrysops deerfly",
              "explanation": "Chrysops deerflies are the vectors for Loa loa filariasis, causing migratory subcutaneous swellings known as Calabar swellings."
            },
            {
              "stem": "A 7-year-old boy with a history of chickenpox 2 weeks ago now refuses to bear weight on his right leg and has fever. Examination reveals warmth and tenderness over the distal femur. Which organism is most likely responsible?",
              "options": [
                "Staphylococcus aureus",
                "Streptococcus pyogenes",
                "Haemophilus influenzae",
                "Salmonella spp."
              ],
              "answer": "Staphylococcus aureus",
              "explanation": "Post-viral osteomyelitis is most commonly caused by Staphylococcus aureus, which can seed bone during transient bacteremia following viral infections."
            },
            {
              "stem": "A 14-year-old boy presents with fever, right knee pain, and swelling 10 days after a minor ankle sprain treated with a splint. Labs show elevated CRP and ESR. What is the next best step in management?",
              "options": [
                "Irrigation and debridement of the distal fibula",
                "Place in short leg walking cast for 3 weeks",
                "Begin oral antibiotics and follow up in 2 weeks",
                "Perform stress radiographs to assess ligament integrity"
              ],
              "answer": "Irrigation and debridement of the distal fibula",
              "explanation": "Acute osteomyelitis following trauma or splint use requires surgical debridement to remove necrotic bone and obtain cultures for targeted therapy."
            },
            {
              "stem": "A 25-year-old man presents with fever, right knee pain, and swelling. Synovial fluid analysis shows 50,000 WBC/mm³ with 90% neutrophils. Which organism is most likely responsible?",
              "options": [
                "Neisseria gonorrhoeae",
                "Staphylococcus aureus",
                "Escherichia coli",
                "Streptococcus pneumoniae"
              ],
              "answer": "Neisseria gonorrhoeae",
              "explanation": "Gonococcal septic arthritis is common in sexually active adults and typically presents with migratory polyarthralgia, tenosynovitis, and culture-negative synovial fluid."
            },
            {
              "stem": "A 22-year-old sexually active woman presents with fever, wrist tenosynovitis, and a pustular rash on her arms. Blood cultures are pending. What is the most likely diagnosis?",
              "options": [
                "Gonococcal arthritis",
                "Reactive arthritis",
                "Meningococcal sepsis",
                "Rheumatoid arthritis"
              ],
              "answer": "Gonococcal arthritis",
              "explanation": "Disseminated gonococcal infection classically presents with fever, tenosynovitis, dermatitis, and migratory polyarthralgia in sexually active individuals."
            },
            {
              "stem": "Which of the following is the most common cause of osteomyelitis in children under 3 years of age?",
              "options": [
                "Haemophilus influenzae",
                "Staphylococcus aureus",
                "Streptococcus pneumoniae",
                "Salmonella spp."
              ],
              "answer": "Staphylococcus aureus",
              "explanation": "Staphylococcus aureus is the leading cause of acute hematogenous osteomyelitis in children, particularly in those under 3 years old."
            },
            {
              "stem": "Which statement about Vibrio cholerae infection is correct?",
              "options": [
                "The organism is isolated from blood samples.",
                "The natural reservoir is domestic animals.",
                "The LPS complex is the main virulence factor.",
                "An enterotoxin is the main virulence factor."
              ],
              "answer": "An enterotoxin is the main virulence factor.",
              "explanation": "Cholera toxin, an A-B enterotoxin, is the primary virulence factor responsible for the massive secretory diarrhea characteristic of cholera."
            },
            {
              "stem": "Each of the following agents is a recognized cause of diarrhea EXCEPT:",
              "options": [
                "Clostridium perfringens",
                "Enterococcus faecalis",
                "Shigella dysenteriae",
                "Vibrio cholerae",
                "Campylobacter jejuni"
              ],
              "answer": "Enterococcus faecalis",
              "explanation": "Enterococcus faecalis is a commensal gut organism and not a recognized cause of infectious diarrhea."
            },
            {
              "stem": "A 7-year-old girl completes a 2-day course of vancomycin for a carbuncle caused by MRSA. The isolate is sensitive to clindamycin, doxycycline, and linezolid. Which agent is preferred for oral step-down therapy?",
              "options": [
                "Clindamycin",
                "Doxycycline",
                "Levofloxacin",
                "Linezolid"
              ],
              "answer": "Clindamycin",
              "explanation": "Clindamycin is preferred for oral step-down in susceptible MRSA skin infections due to excellent tissue penetration and oral bioavailability."
            },
            {
              "stem": "To reduce Clostridioides difficile infection after clindamycin use for skin infections, which antibiotic should be recommended for moderate purulent SSTIs?",
              "options": [
                "Continue clindamycin if D-test negative",
                "Use cephalexin instead of clindamycin",
                "Use linezolid instead of clindamycin",
                "Use trimethoprim/sulfamethoxazole instead of clindamycin"
              ],
              "answer": "Use trimethoprim/sulfamethoxazole instead of clindamycin",
              "explanation": "Trimethoprim/sulfamethoxazole is an effective alternative for CA-MRSA with lower risk of C. difficile infection compared to clindamycin."
            },
            {
              "stem": "A 65-year-old man with uncontrolled diabetes is bitten by a dog. He is allergic to sulfa drugs. Which antibiotic is most appropriate for prophylaxis?",
              "options": [
                "Amoxicillin-clavulanate",
                "Amoxicillin-clavulanate plus tetanus toxoid",
                "Ciprofloxacin plus clindamycin",
                "Moxifloxacin plus tetanus toxoid"
              ],
              "answer": "Amoxicillin-clavulanate",
              "explanation": "Amoxicillin-clavulanate provides broad coverage for dog bite pathogens including Pasteurella and anaerobes; sulfa allergy does not contraindicate its use."
            },
            {
              "stem": "A man sustains a human bite to the hand. After aggressive wound cleansing, what is the most appropriate next step?",
              "options": [
                "Withhold antimicrobials until signs of infection",
                "Administer penicillin plus dicloxacillin for 5 days",
                "Administer cefaclor for 5 days as prophylaxis",
                "Administer cephalexin as empirical therapy"
              ],
              "answer": "Administer penicillin plus dicloxacillin for 5 days",
              "explanation": "Human bites require prophylactic antibiotics covering Eikenella corrodens and oral anaerobes; penicillin plus dicloxacillin is a standard regimen."
            },
            {
              "stem": "The skin is very red, swollen, and demarcated with a clear line of infection. The most common cause is Streptococcus pyogenes. This describes:",
              "options": [
                "Erysipelas",
                "Furuncles",
                "Cellulitis",
                "Steven-Johnson syndrome"
              ],
              "answer": "Erysipelas",
              "explanation": "Erysipelas is a superficial skin infection characterized by well-demarcated erythema, edema, and warmth, most commonly caused by group A Streptococcus."
            },
            {
              "stem": "Complications of amoebic dysentery include all the following EXCEPT:",
              "options": [
                "Ameboma",
                "Intestinal perforation and peritonitis",
                "Extra-intestinal lesions (e.g., liver abscess)",
                "Peptic ulcer disease"
              ],
              "answer": "Peptic ulcer disease",
              "explanation": "Peptic ulcer disease is not a recognized complication of Entamoeba histolytica infection; complications include ameboma, perforation, and extraintestinal abscesses."
            },
            {
              "stem": "All of the following are true regarding acute osteomyelitis in a child EXCEPT:",
              "options": [
                "Diagnosis by X-ray is delayed 8–10 days after onset",
                "There is diffuse tenderness at the site",
                "Antibiotic therapy should be at least 4 weeks",
                "Salmonella is the most common cause"
              ],
              "answer": "Salmonella is the most common cause",
              "explanation": "Salmonella is not the most common cause of acute osteomyelitis in children; Staphylococcus aureus is the predominant pathogen."
            },
            {
              "stem": "Which is NOT a complication of acute osteomyelitis?",
              "options": [
                "Malignancy",
                "Fracture of the affected bone",
                "Sepsis",
                "Chronicity"
              ],
              "answer": "Malignancy",
              "explanation": "Malignancy is not a recognized complication of osteomyelitis; chronic osteomyelitis, fractures, and sepsis are well-documented complications."
            },
            {
              "stem": "The most common cause of nongonococcal septic arthritis is:",
              "options": [
                "Staphylococcus aureus",
                "Haemophilus influenzae",
                "Pseudomonas aeruginosa",
                "Streptococcus pneumoniae"
              ],
              "answer": "Staphylococcus aureus",
              "explanation": "Staphylococcus aureus is the leading cause of nongonococcal septic arthritis across all age groups."
            },
            {
              "stem": "Pseudomembranous colitis is caused by:",
              "options": [
                "Clostridium tetani",
                "Clostridium difficile",
                "Clostridium botulinum",
                "Clostridium perfringens"
              ],
              "answer": "Clostridium difficile",
              "explanation": "Clostridioides (formerly Clostridium) difficile is the causative agent of pseudomembranous colitis, typically following antibiotic disruption of normal flora."
            },
            {
              "stem": "A 4-year-old boy presents with perianal itching and irritability. Eggs with a flattened side are identified on scotch tape test. The organism is:",
              "options": [
                "Enterobius vermicularis",
                "Ascaris lumbricoides",
                "Entamoeba histolytica",
                "Trichuris trichiura"
              ],
              "answer": "Enterobius vermicularis",
              "explanation": "Enterobius vermicularis (pinworm) causes perianal itching and is diagnosed by identifying characteristic eggs on scotch tape test."
            },
            {
              "stem": "Pigs or dogs are the source of human infection by each of the following parasites EXCEPT:",
              "options": [
                "Echinococcus granulosus",
                "Trichinella spiralis",
                "Ascaris lumbricoides",
                "Taenia solium"
              ],
              "answer": "Ascaris lumbricoides",
              "explanation": "Ascaris lumbricoides is transmitted via fecal-oral route from contaminated soil or food, not from pigs or dogs."
            },
            {
              "stem": "Which of the following is most likely to be a source of food poisoning bacteria?",
              "options": [
                "Frozen peas",
                "Pasteurized milk",
                "Tinned salmon",
                "Raw meat"
              ],
              "answer": "Raw meat",
              "explanation": "Raw meat is a common source of foodborne pathogens such as Salmonella, Campylobacter, and E. coli O157:H7."
            },
            {
              "stem": "Which bacteria causes the greatest number of cases of food poisoning?",
              "options": [
                "Clostridium perfringens",
                "Listeria monocytogenes",
                "Staphylococcus aureus",
                "Salmonella spp."
              ],
              "answer": "Salmonella spp.",
              "explanation": "Salmonella is the leading bacterial cause of foodborne illness globally, responsible for more cases than Staphylococcus aureus or Clostridium perfringens."
            },
            {
              "stem": "The main symptom of Staphylococcus food poisoning is:",
              "options": [
                "Vomiting",
                "Diarrhea",
                "Fever",
                "Abdominal pain"
              ],
              "answer": "Vomiting",
              "explanation": "Staphylococcus aureus food poisoning is characterized by rapid onset vomiting due to preformed enterotoxins, often within 1–6 hours of ingestion."
            },
            {
              "stem": "Escherichia coli is characterized by virulence properties. All are types of E. coli EXCEPT:",
              "options": [
                "Enterohemorrhagic E. coli",
                "Enteropathogenic E. coli",
                "Enterotoxigenic E. coli",
                "Enterolysogenic E. coli"
              ],
              "answer": "Enterolysogenic E. coli",
              "explanation": "Enterolysogenic E. coli is not a recognized pathotype; the main E. coli pathotypes include EHEC, EPEC, ETEC, EAEC, and EIEC."
            },
            {
              "stem": "Symptoms of typhoid fever develop 1–3 weeks after exposure to S. Typhi. All of the following are major symptoms EXCEPT:",
              "options": [
                "Weight gain",
                "Headache",
                "High-grade fever",
                "Rose spots"
              ],
              "answer": "Weight gain",
              "explanation": "Weight gain is not a feature of typhoid fever; patients typically experience weight loss due to prolonged fever and anorexia."
            },
            {
              "stem": "One of the most common foodborne illnesses from undercooked poultry and eggs is:",
              "options": [
                "Trichinella spiralis",
                "Salmonella spp.",
                "Clostridium perfringens",
                "Clostridium botulinum"
              ],
              "answer": "Salmonella spp.",
              "explanation": "Salmonella is the leading cause of foodborne illness from poultry and eggs, often causing gastroenteritis or typhoid fever."
            },
            {
              "stem": "A patient with severe dehydration based on weight loss and clinical signs should be rehydrated with:",
              "options": [
                "Oral rehydration solution",
                "Intravenous normal saline",
                "Intravenous D5W",
                "Intravenous colloid solutions"
              ],
              "answer": "Intravenous normal saline",
              "explanation": "Severe dehydration requires rapid intravenous fluid resuscitation with isotonic crystalloids such as normal saline to restore intravascular volume."
            },
            {
              "stem": "Which of the following is true regarding oral rehydration therapy?",
              "options": [
                "Requires hospitalization to administer",
                "Cannot be used in infants with infrequent vomiting",
                "Often ineffective",
                "Inexpensive"
              ],
              "answer": "Inexpensive",
              "explanation": "Oral rehydration therapy is inexpensive, effective, and can be administered at home or in outpatient settings for mild to moderate dehydration."
            },
            {
              "stem": "Which is NOT an advantage of low-osmolarity (rice-based) ORT over isotonic ORT?",
              "options": [
                "More effectively replenishes electrolytes",
                "Decreases stool frequency",
                "Decreases duration of diarrhea",
                "Decreases stool volume"
              ],
              "answer": "More effectively replenishes electrolytes",
              "explanation": "Low-osmolarity ORS improves rehydration by reducing stool volume and duration but does not more effectively replenish electrolytes than standard ORS."
            },
            {
              "stem": "Which diarrhea category can be safely treated with antimotility agents?",
              "options": [
                "Empirical traveler's diarrhea (nonbloody)",
                "Dysentery",
                "EHEC infection",
                "Shigellosis"
              ],
              "answer": "Empirical traveler's diarrhea (nonbloody)",
              "explanation": "Antimotility agents (e.g., loperamide) may be used cautiously in nonbloody, afebrile traveler's diarrhea but are contraindicated in dysentery or bloody diarrhea."
            },
            {
              "stem": "An 8-year-old with cholera should be treated with:",
              "options": [
                "Ciprofloxacin",
                "Doxycycline",
                "TMP-SMX",
                "Antibiotic use is not indicated"
              ],
              "answer": "Ciprofloxacin",
              "explanation": "Antibiotics shorten the duration and reduce the volume of cholera diarrhea; ciprofloxacin is a first-line agent in children."
            },
            {
              "stem": "Some common causes of food poisoning include all these EXCEPT:",
              "options": [
                "Shigella",
                "Salmonella",
                "Staphylococcus aureus",
                "Vibrio cholerae"
              ],
              "answer": "Vibrio cholerae",
              "explanation": "While Vibrio cholerae causes epidemic cholera, it is not typically classified among common causes of food poisoning outbreaks in the same way as Shigella, Salmonella, or S. aureus."
            },
            {
              "stem": "All of the following are major complications of falciparum malaria EXCEPT:",
              "options": [
                "Seizures and coma",
                "Hypoglycemia",
                "Severe anemia",
                "Peritonitis"
              ],
              "answer": "Peritonitis",
              "explanation": "Peritonitis is not a recognized complication of Plasmodium falciparum malaria; complications include cerebral malaria, hypoglycemia, severe anemia, and renal failure."
            },
            {
              "stem": "The drug of choice for the eradication of lice infestation (body, head, and crab lice) is:",
              "options": [
                "1% menthol",
                "Permethrin 1%",
                "Y-benzene hexachloride",
                "Sulfur ointment"
              ],
              "answer": "Permethrin 1%",
              "explanation": "Permethrin 1% is the first-line topical pediculicide for head, body, and pubic lice due to efficacy and safety."
            },
            {
              "stem": "Which agent should be avoided in patients with glucose-6-phosphate dehydrogenase deficiency?",
              "options": [
                "Ivermectin",
                "Mefloquine",
                "Primaquine",
                "Albendazole"
              ],
              "answer": "Primaquine",
              "explanation": "Primaquine can cause hemolytic anemia in G6PD-deficient individuals due to oxidative stress on red blood cells."
            },
            {
              "stem": "Black water fever is a special manifestation of malaria caused by:",
              "options": [
                "Plasmodium falciparum",
                "Plasmodium malariae",
                "Plasmodium ovale",
                "Plasmodium vivax"
              ],
              "answer": "Plasmodium falciparum",
              "explanation": "Black water fever, characterized by hemoglobinuria and renal failure, is associated with severe Plasmodium falciparum malaria."
            },
            {
              "stem": "All of the following statements regarding Plasmodium falciparum are true EXCEPT:",
              "options": [
                "Causes more severe disease in pregnancy",
                "Is associated with recurrent relapses after initial treatment because of liver hypnozoites",
                "Is the only malarial parasite causing greater than 20% parasitemia",
                "Is the only cause of cerebral malaria"
              ],
              "answer": "Is associated with recurrent relapses after initial treatment because of liver hypnozoites",
              "explanation": "P. falciparum does not form hypnozoites; relapse is not a feature; hypnozoites are seen in P. vivax and P. ovale."
            },
            {
              "stem": "Which statement is true regarding amoebic liver abscess?",
              "options": [
                "Should be treated by diloxanide furoate alone",
                "Should be aspirated routinely",
                "Is associated with eosinophilia",
                "Should be treated using a combination of metronidazole and diloxanide"
              ],
              "answer": "Should be treated using a combination of metronidazole and diloxanide",
              "explanation": "Amoebic liver abscess requires metronidazole to kill trophozoites followed by diloxanide furoate to eradicate intestinal carriage."
            },
            {
              "stem": "Subcutaneous nodules are a typical finding in all the following infections EXCEPT:",
              "options": [
                "Neurofibromatosis",
                "Hydatid disease",
                "Cysticercosis",
                "Onchocerciasis"
              ],
              "answer": "Neurofibromatosis",
              "explanation": "Neurofibromatosis is a genetic disorder, not an infectious cause of subcutaneous nodules; hydatid cysts, cysticercosis, and onchocerciasis are infectious causes."
            },
            {
              "stem": "All of the following are characteristic features of acute schistosomiasis EXCEPT:",
              "options": [
                "Fever",
                "Eosinophilia",
                "Myocarditis",
                "Incubation period of 4–6 weeks"
              ],
              "answer": "Myocarditis",
              "explanation": "Acute schistosomiasis (Katayama fever) presents with fever, eosinophilia, and urticaria; myocarditis is not a typical feature."
            },
            {
              "stem": "Effective malaria control interventions include all the following EXCEPT:",
              "options": [
                "Mass use of Fansidar chemoprophylaxis",
                "Use of pyrethroid-impregnated mosquito nets",
                "Larviciding",
                "Eradication of mosquito breeding sites"
              ],
              "answer": "Mass use of Fansidar chemoprophylaxis",
              "explanation": "Mass chemoprophylaxis with Fansidar (sulfadoxine-pyrimethamine) is not recommended due to resistance and potential toxicity; targeted prophylaxis is preferred."
            },
            {
              "stem": "All of the following occur in Chagas' disease (American trypanosomiasis) EXCEPT:",
              "options": [
                "Lymphadenopathy",
                "Meningoencephalitis",
                "Calabar swelling",
                "Mega-esophagus"
              ],
              "answer": "Calabar swelling",
              "explanation": "Calabar swellings are characteristic of Loa loa infection, not Chagas disease; Chagas disease causes mega-esophagus, cardiomyopathy, and meningoencephalitis."
            },
            {
              "stem": "Blindness is a recognized complication of all the following infections EXCEPT:",
              "options": [
                "Onchocerciasis",
                "Amoebiasis",
                "Cysticercosis",
                "Toxoplasmosis"
              ],
              "answer": "Amoebiasis",
              "explanation": "Amoebiasis does not cause blindness; onchocerciasis (river blindness), cysticercosis (ocular cysticercosis), and toxoplasmosis (retinochoroiditis) can lead to visual impairment."
            },
            {
              "stem": "Which of the following may not present with fever and diarrhea?",
              "options": [
                "Malaria",
                "Giardiasis",
                "Campylobacter enteritis",
                "Brucellosis"
              ],
              "answer": "Giardiasis",
              "explanation": "Giardiasis often presents with chronic diarrhea without fever; other options commonly present with fever and diarrhea."
            },
            {
              "stem": "Steroids are of benefit in the treatment of:",
              "options": [
                "Visceral leishmaniasis",
                "Escherichia coli septicaemia",
                "Cerebral malaria",
                "Severe typhoid fever"
              ],
              "answer": "Cerebral malaria",
              "explanation": "Dexamethasone or other corticosteroids are used adjunctively in cerebral malaria to reduce intracranial pressure and improve outcomes."
            },
            {
              "stem": "Which parasite can cause rectal prolapse?",
              "options": [
                "Hookworm",
                "Ascaris lumbricoides",
                "Trichuris trichiura",
                "All of the above"
              ],
              "answer": "Trichuris trichiura",
              "explanation": "Heavy infection with Trichuris trichiura (whipworm) can cause chronic diarrhea and rectal prolapse due to inflammation and peristaltic strain."
            },
            {
              "stem": "A 12-year-old with Salmonella enterocolitis and moderate symptoms should receive which regimen?",
              "options": [
                "ORT + ciprofloxacin + loperamide",
                "ORT + ciprofloxacin",
                "ORT + azithromycin",
                "ORT"
              ],
              "answer": "ORT",
              "explanation": "Salmonella gastroenteritis typically does not require antibiotics unless severe or invasive; oral rehydration therapy is the mainstay of treatment."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 14-year-old boy presents with acute onset fever, chills, and right knee pain after a minor soccer injury. Examination reveals a warm, swollen joint with limited range of motion. Synovial fluid analysis shows 80,000 WBC/mm³ with 92% neutrophils. Blood cultures are pending. Identify the most likely diagnosis and outline the pharmacological and non-pharmacological management.",
              "modelAnswer": "Diagnosis: Septic arthritis (most likely due to Staphylococcus aureus).\n\nPharmacological management:\n- Empirical IV antibiotics: Ceftriaxone 2g q24h plus vancomycin 15–20 mg/kg q8–12h (to cover MRSA and gram-negatives).\n- Adjust therapy based on culture and sensitivity results (e.g., switch to flucloxacillin if MSSA confirmed).\n- Analgesia: Paracetamol 1g q6h PRN or ibuprofen 400mg q8h PRN for pain and inflammation.\n- Consider intra-articular corticosteroids only after infection is controlled.\n\nNon-pharmacological management:\n- Joint aspiration and irrigation to relieve pressure and obtain synovial fluid for culture.\n- Immobilization of the joint initially with splinting to reduce pain and prevent further injury.\n- Physical therapy after acute phase to restore range of motion and strength.\n- Monitor for complications such as osteomyelitis or systemic sepsis."
            },
            {
              "stem": "Identify the most important member of Enterobacteriaceae that causes each of the following diseases: (a) Childhood diarrhea, (b) Traveler's diarrhea, (c) Bacillary dysentery, (d) Hemorrhagic colitis or Hemolytic Uremic Syndrome (HUS).",
              "modelAnswer": "(a) Childhood diarrhea: Enteropathogenic Escherichia coli (EPEC)\n(b) Traveler's diarrhea: Enterotoxigenic Escherichia coli (ETEC)\n(c) Bacillary dysentery: Shigella dysenteriae\n(d) Hemorrhagic colitis or Hemolytic Uremic Syndrome (HUS): Enterohemorrhagic Escherichia coli (EHEC), particularly E. coli O157:H7"
            },
            {
              "stem": "Identify 3 human worms (parasites) that can cause iron deficiency anemia and 1 parasite associated with pernicious anemia.",
              "modelAnswer": "Parasites causing iron deficiency anemia:\n1. Hookworm (Necator americanus, Ancylostoma duodenale)\n2. Whipworm (Trichuris trichiura)\n3. Ascaris lumbricoides (in heavy infections)\n\nParasite associated with pernicious anemia:\n- Fish tapeworm (Diphyllobothrium latum) due to vitamin B12 deficiency from parasite absorption in the intestine."
            },
            {
              "stem": "Maria, a 38-year-old teacher, is bitten by her neighbor’s dog while walking home. The dog’s vaccination history is unknown. The wound is on her forearm and appears clean but deep. Formulate an appropriate treatment plan for Maria, including counseling points.",
              "modelAnswer": "Treatment plan:\n1. Immediate wound care: Cleanse thoroughly with soap and water, irrigate with normal saline, and debride devitalized tissue.\n2. Tetanus prophylaxis: Administer tetanus toxoid-containing vaccine if not up to date (Tdap or Td).\n3. Rabies post-exposure prophylaxis (PEP):\n   - Rabies vaccine: 5 doses (days 0, 3, 7, 14, 28) IM in deltoid.\n   - Human rabies immunoglobulin (RIG): 20 IU/kg infiltrated into and around the wound on day 0 (if anatomically feasible).\n4. Antibiotic prophylaxis: Amoxicillin-clavulanate 875/125mg PO q12h for 5–7 days to cover Pasteurella, Capnocytophaga, and anaerobes.\n\nCounseling points:\n- Avoid contact with stray animals and do not attempt to feed or touch wild animals.\n- Report any signs of infection (increased pain, redness, swelling, fever) immediately.\n- Complete the full course of rabies vaccine and RIG as scheduled.\n- Follow up in 48–72 hours for wound reassessment and to ensure adherence to PEP."
            },
            {
              "stem": "Match each clinical presentation with the causative parasite:\n1. Migratory subcutaneous swellings lasting 2–3 days\n2. Rectal prolapse in a child with chronic diarrhea\n3. Iron deficiency anemia in a farmer\n4. Vitamin B12 deficiency with megaloblastic anemia",
              "modelAnswer": "1. Migratory subcutaneous swellings lasting 2–3 days → Loa loa (Calabar swellings)\n2. Rectal prolapse in a child with chronic diarrhea → Trichuris trichiura (whipworm)\n3. Iron deficiency anemia in a farmer → Hookworm (Necator americanus or Ancylostoma duodenale)\n4. Vitamin B12 deficiency with megaloblastic anemia → Diphyllobothrium latum (fish tapeworm)"
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 50-year-old woman with a history of type 2 diabetes and hypertension presents to the emergency department with a 1-week history of fever, confusion, and abdominal pain. She returned 10 days ago from a rural area in Nyeri, where she stayed with relatives recovering from typhoid fever. On examination, she is febrile (38.8°C), tachycardic (110 bpm), and hypotensive (88/52 mmHg). Her abdomen is tender in the right upper quadrant. Labs reveal: WBC 2.8 × 10⁹/L, Hb 12.1 g/dL, platelets 110 × 10⁹/L, ALT 120 U/L, AST 150 U/L, total bilirubin 2.1 mg/dL, and CRP 240 mg/L. Blood cultures are pending. \n\nIdentify the most likely presumptive diagnosis and the probable causative agent. Explain why her history, clinical presentation, and laboratory results are consistent with this diagnosis. Design an appropriate treatment plan for her, including adjunctive and supportive therapy. Fourteen months after discharge, her stool remains positive for the same organism. Propose 4 therapeutic options to cure her chronic carrier state. Outline 2 preventive measures against this condition.",
              "modelAnswer": "**Presumptive diagnosis:** Typhoid fever (enteric fever) caused by *Salmonella Typhi*.\n\n**Consistency with history, presentation, and labs:**\n- Recent travel to an endemic area with exposure to typhoid cases.\n- Prolonged fever, confusion (encephalopathy), and abdominal pain (classic typhoid triad).\n- Relative bradycardia (though not always present), leukopenia, thrombocytopenia, and elevated liver enzymes suggest systemic infection.\n- Low-grade hyperbilirubinemia and transaminitis consistent with typhoid hepatitis.\n\n**Treatment plan:**\n1. **Antimicrobial therapy:**\n   - Empirical: IV ceftriaxone 2g q24h for 10–14 days (covers *S. Typhi* and *S. Paratyphi*).\n   - Adjust based on susceptibility: Oral azithromycin 500mg q24h for 7 days or oral ciprofloxacin 500mg q12h for 7–10 days if susceptible.\n2. **Supportive care:**\n   - IV fluids (normal saline or Ringer’s lactate) for hypotension and dehydration.\n   - Antipyretics: Paracetamol 1g q6h PRN (avoid NSAIDs due to bleeding risk).\n   - Monitor for complications: Intestinal perforation, hemorrhage, or encephalopathy.\n3. **Adjunctive therapy:**\n   - Consider dexamethasone 3mg/kg IV followed by 1mg/kg q6h for 48 hours in severe cases with encephalopathy.\n\n**Chronic carrier state management (14 months post-discharge, stool positive):**\n1. **Ciprofloxacin 500mg PO q12h for 28 days** (first-line for chronic carriage).\n2. **Azithromycin 500mg PO q24h for 21 days** (alternative for fluoroquinolone-resistant cases).\n3. **Amoxicillin 1g PO q6h for 28 days** (if susceptible and no contraindications).\n4. **Cholecystectomy** (if gallstones present, as chronic carriage often involves the gallbladder).\n\n**Preventive measures:**\n1. **Vaccination:** Administer typhoid conjugate vaccine (e.g., Typbar-TCV) to travelers and high-risk individuals; booster every 3–7 years depending on exposure risk.\n2. **Food and water hygiene:** Avoid raw or undercooked foods, unpeeled fruits, and untreated water; practice hand hygiene with soap and water."
            },
            {
              "stem": "A 5-year-old boy is brought to the outpatient department with a 1-day history of fever (38.5°C), vomiting after breakfast, and lethargy. He recently traveled to Mwea for a family function. He is well-nourished (20 kg), alert, and not dehydrated. Physical examination is unremarkable except for fever. \n\nIdentify the most likely diagnosis and causative agent. Justify your answer. Propose 3 diagnostic tests that would help confirm the diagnosis and explain their utility. Compile an elaborate treatment plan for this patient (include dosing regimens). Illustrate 3 counseling points for the mother regarding treatment. The child returns later that night with drowsiness, refusal to feed, and a seizure. Outline the most probable diagnosis and design an appropriate treatment plan.",
              "modelAnswer": "**Most likely diagnosis and causative agent:**\n- Diagnosis: Cerebral malaria caused by *Plasmodium falciparum*.\n- Justification: Sudden onset fever, lethargy, and recent travel to a malaria-endemic area (Mwea) strongly suggest malaria. Cerebral malaria is a severe manifestation with altered consciousness and seizures.\n\n**Diagnostic tests and utility:**\n1. **Thick and thin blood smears:** Gold standard for malaria diagnosis; identifies species and quantifies parasitemia.\n2. **Rapid diagnostic test (RDT) for malaria:** Detects *P. falciparum* HRP-2 antigen; provides rapid results but less sensitive at low parasitemia.\n3. **Complete blood count (CBC):** May show anemia, thrombocytopenia, or leukocytosis; supports diagnosis and guides management.\n\n**Treatment plan (for uncomplicated malaria):**\n- **Artemether-lumefantrine (AL):** 20 mg/120 mg tablets.\n  - Dose: 4 tablets (80 mg artemether/480 mg lumefantrine) stat, then 4 tablets 8 hours later, then 4 tablets q12h for 2 more days (total 6 doses).\n  - Take with fatty food to enhance absorption.\n- **Supportive care:**\n  - Antipyretics: Paracetamol 15 mg/kg/dose q6h PRN.\n  - Hydration: Oral rehydration solution or IV fluids if unable to tolerate oral intake.\n  - Monitor for hypoglycemia (especially with quinine-based regimens).\n\n**Counseling points for the mother:**\n1. **Complete the full course of antimalarials** even if symptoms improve to prevent recrudescence or resistance.\n2. **Return immediately** if the child develops confusion, seizures, inability to drink, or signs of dehydration.\n3. **Use insecticide-treated bed nets (ITNs)** and apply insect repellent to prevent future mosquito bites.\n\n**Later presentation (drowsiness, seizure, refusal to feed):**\n- **Most probable diagnosis:** Severe malaria with cerebral involvement (cerebral malaria).\n- **Treatment plan:**\n  1. **Emergency management:**\n     - Secure airway and oxygen if needed.\n     - Diazepam 0.3 mg/kg IV or PR for seizure control (max 10 mg/dose).\n     - IV artesunate 2.4 mg/kg stat, then at 12 and 24 hours (preferred for severe malaria).\n  2. **Supportive care:**\n     - IV fluids (normal saline or Ringer’s lactate) for hydration and electrolyte balance.\n     - Monitor blood glucose (hypoglycemia is common in severe malaria).\n     - Consider ICU admission for close monitoring of coma, seizures, or respiratory failure.\n  3. **Adjunctive therapy:**\n     - Dexamethasone is NOT recommended in cerebral malaria.\n     - Avoid blood transfusions unless severe anemia (Hb < 5 g/dL) or respiratory distress."
            }
          ]
        }
      ]
    }
  },
  "exam-infections-ii": {
    "1": {
      "title": "Clinical Pharmacy — Infections II",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "A 35-year-old healthcare worker presents with acute jaundice, fatigue, and dark urine 3 weeks after a needle-stick injury. Which viral hepatitis is most likely transmitted via this route?",
              "options": [
                "Hepatitis A",
                "Hepatitis B",
                "Hepatitis C",
                "Hepatitis E"
              ],
              "answer": "Hepatitis B",
              "explanation": "Hepatitis B is transmitted parenterally, sexually, and vertically, making it the most likely cause in this scenario."
            },
            {
              "stem": "Which of the following is the primary mechanism of action of tenofovir disoproxil fumarate (TDF) in HIV therapy?",
              "options": [
                "Inhibition of viral reverse transcriptase by incorporating into viral DNA",
                "Blockade of viral entry by binding to CCR5 co-receptor",
                "Inhibition of viral integrase preventing proviral DNA integration",
                "Inhibition of viral protease preventing maturation of new virions"
              ],
              "answer": "Inhibition of viral reverse transcriptase by incorporating into viral DNA",
              "explanation": "Tenofovir is a nucleotide reverse transcriptase inhibitor (NtRTI) that mimics natural nucleotides and terminates viral DNA synthesis."
            },
            {
              "stem": "A 28-year-old woman presents with a 5-day history of fever, headache, and neck stiffness. Lumbar puncture reveals CSF with 250 WBC/μL (80% lymphocytes), glucose 2.2 mmol/L (serum 4.5 mmol/L), and protein 1.8 g/L. Which organism is most likely responsible?",
              "options": [
                "Neisseria meningitidis",
                "Streptococcus pneumoniae",
                "Mycobacterium tuberculosis",
                "Herpes simplex virus"
              ],
              "answer": "Mycobacterium tuberculosis",
              "explanation": "The CSF profile (lymphocytic predominance, low glucose, elevated protein) is classic for tuberculous meningitis."
            },
            {
              "stem": "A 22-year-old male presents with dysuria and purulent urethral discharge. Gram stain shows intracellular gram-negative diplococci. Which antibiotic should be administered empirically?",
              "options": [
                "Doxycycline 100 mg orally twice daily for 7 days",
                "Ceftriaxone 500 mg IM as a single dose",
                "Azithromycin 1 g orally as a single dose",
                "Metronidazole 400 mg orally twice daily for 7 days"
              ],
              "answer": "Ceftriaxone 500 mg IM as a single dose",
              "explanation": "Gram-negative diplococci suggest Neisseria gonorrhoeae, which requires ceftriaxone for empirical treatment."
            },
            {
              "stem": "Which serological marker pattern indicates chronic hepatitis B infection?",
              "options": [
                "HBsAg positive, anti-HBc IgM positive, anti-HBs negative",
                "HBsAg negative, anti-HBc IgG positive, anti-HBs positive",
                "HBsAg positive, anti-HBc IgG positive, anti-HBs negative",
                "HBsAg negative, anti-HBc IgM positive, anti-HBs negative"
              ],
              "answer": "HBsAg positive, anti-HBc IgG positive, anti-HBs negative",
              "explanation": "Chronic HBV infection is characterized by persistent HBsAg positivity with anti-HBc IgG (indicating past exposure) and absence of anti-HBs (immunity)."
            },
            {
              "stem": "A 45-year-old man with chronic HCV infection (genotype 1) is started on sofosbuvir/velpatasvir. Which adverse effect is most commonly associated with this regimen?",
              "options": [
                "Peripheral neuropathy",
                "Bradycardia",
                "Headache",
                "Hemolytic anemia"
              ],
              "answer": "Headache",
              "explanation": "Sofosbuvir/velpatasvir is generally well-tolerated, with headache being the most commonly reported adverse effect."
            },
            {
              "stem": "Which of the following is the most significant risk factor for vertical transmission of HIV?",
              "options": [
                "Maternal CD4 count >500 cells/μL",
                "Maternal HIV viral load >1000 copies/mL",
                "Maternal use of efavirenz-based ART",
                "Maternal history of prior cesarean section"
              ],
              "answer": "Maternal HIV viral load >1000 copies/mL",
              "explanation": "A high maternal viral load is the strongest predictor of vertical HIV transmission, regardless of ART regimen."
            },
            {
              "stem": "A 30-year-old woman presents with a painless genital ulcer and inguinal lymphadenopathy. Serology shows VDRL positive and FTA-ABS positive. Which stage of syphilis is this?",
              "options": [
                "Primary syphilis",
                "Secondary syphilis",
                "Latent syphilis",
                "Tertiary syphilis"
              ],
              "answer": "Primary syphilis",
              "explanation": "A painless genital ulcer (chancre) with positive serology indicates primary syphilis."
            },
            {
              "stem": "Which of the following is the recommended post-exposure prophylaxis (PEP) regimen for HIV after a high-risk occupational exposure?",
              "options": [
                "Tenofovir/emtricitabine + raltegravir for 28 days",
                "Zidovudine/lamivudine + efavirenz for 21 days",
                "Abacavir/lamivudine + dolutegravir for 30 days",
                "Emtricitabine/tenofovir alafenamide + bictegravir for 21 days"
              ],
              "answer": "Tenofovir/emtricitabine + raltegravir for 28 days",
              "explanation": "The WHO-recommended PEP regimen is a 28-day course of tenofovir/emtricitabine (NRTIs) plus raltegravir (INSTI)."
            },
            {
              "stem": "A 50-year-old man with HBV-related cirrhosis develops hepatocellular carcinoma. Which viral hepatitis is most strongly associated with this malignancy?",
              "options": [
                "Hepatitis A",
                "Hepatitis B",
                "Hepatitis C",
                "Hepatitis D"
              ],
              "answer": "Hepatitis B",
              "explanation": "Chronic HBV infection is the leading viral cause of hepatocellular carcinoma globally."
            },
            {
              "stem": "Which of the following is the most appropriate initial treatment for a 2-month-old infant with a confirmed UTI?",
              "options": [
                "Amoxicillin/clavulanate 30 mg/kg/day divided every 12 hours",
                "Cefixime 8 mg/kg/day as a single daily dose",
                "Cotrimoxazole 6–10 mg/kg/day (trimethoprim component) divided every 12 hours",
                "Nitrofurantoin 5 mg/kg/day divided every 6 hours"
              ],
              "answer": "Cefixime 8 mg/kg/day as a single daily dose",
              "explanation": "Cefixime is a third-generation cephalosporin with good oral bioavailability and is recommended for pediatric UTI."
            },
            {
              "stem": "A 25-year-old man with HIV (CD4 120 cells/μL) presents with fever, cough, and dyspnea. Chest X-ray shows bilateral interstitial infiltrates. Which opportunistic infection is most likely?",
              "options": [
                "Cryptococcal meningitis",
                "Pneumocystis jirovecii pneumonia",
                "Toxoplasma gondii encephalitis",
                "Mycobacterium avium complex"
              ],
              "answer": "Pneumocystis jirovecii pneumonia",
              "explanation": "The clinical presentation and CD4 count are classic for Pneumocystis jirovecii pneumonia in HIV."
            },
            {
              "stem": "Which of the following is the primary mechanism of action of dolutegravir in HIV therapy?",
              "options": [
                "Inhibition of viral reverse transcriptase",
                "Inhibition of viral integrase",
                "Blockade of viral entry via CCR5 co-receptor",
                "Inhibition of viral protease"
              ],
              "answer": "Inhibition of viral integrase",
              "explanation": "Dolutegravir is an integrase strand transfer inhibitor (INSTI) that blocks integration of viral DNA into the host genome."
            },
            {
              "stem": "A 30-year-old woman presents with a 3-day history of fever, jaundice, and right upper quadrant pain. Serology shows IgM anti-HAV positive and IgG anti-HAV negative. What is the most appropriate management?",
              "options": [
                "Administer hepatitis A vaccine immediately",
                "Administer hepatitis A immune globulin within 2 weeks",
                "Start tenofovir for potential HBV co-infection",
                "Supportive care with hydration and rest"
              ],
              "answer": "Supportive care with hydration and rest",
              "explanation": "Acute hepatitis A is self-limiting; supportive care is the mainstay of management."
            },
            {
              "stem": "Which of the following is the recommended regimen for treating gonococcal urethritis in a non-pregnant adult?",
              "options": [
                "Ceftriaxone 500 mg IM single dose + azithromycin 1 g orally single dose",
                "Ceftriaxone 250 mg IM single dose + doxycycline 100 mg orally twice daily for 7 days",
                "Azithromycin 2 g orally single dose",
                "Ciprofloxacin 500 mg orally single dose"
              ],
              "answer": "Ceftriaxone 500 mg IM single dose + azithromycin 1 g orally single dose",
              "explanation": "Dual therapy with ceftriaxone (for gonorrhea) and azithromycin (for chlamydia) is recommended due to rising resistance."
            },
            {
              "stem": "A 40-year-old man with chronic HCV (genotype 3) is started on glecaprevir/pibrentasvir. Which adverse effect is most commonly associated with this regimen?",
              "options": [
                "Hyperglycemia",
                "Bradyarrhythmia",
                "Headache",
                "Hepatotoxicity"
              ],
              "answer": "Headache",
              "explanation": "Glecaprevir/pibrentasvir is generally well-tolerated, with headache being the most commonly reported adverse effect."
            },
            {
              "stem": "Which of the following is the most appropriate initial treatment for neurosyphilis?",
              "options": [
                "Benzathine penicillin G 2.4 million units IM weekly for 3 weeks",
                "Procaine penicillin G 1.2 million units IM daily for 14 days",
                "Ceftriaxone 2 g IV daily for 10–14 days",
                "Doxycycline 200 mg orally twice daily for 28 days"
              ],
              "answer": "Procaine penicillin G 1.2 million units IM daily for 14 days",
              "explanation": "Neurosyphilis requires aqueous penicillin G (IV or IM) for 10–14 days; procaine penicillin is an alternative if IV is unavailable."
            },
            {
              "stem": "A 28-year-old woman presents with a 1-week history of fever, malaise, and a maculopapular rash on her palms and soles. Serology shows VDRL positive and FTA-ABS positive. Which stage of syphilis is this?",
              "options": [
                "Primary syphilis",
                "Secondary syphilis",
                "Latent syphilis",
                "Tertiary syphilis"
              ],
              "answer": "Secondary syphilis",
              "explanation": "The maculopapular rash on palms and soles is characteristic of secondary syphilis."
            },
            {
              "stem": "Which of the following is the recommended first-line ART regimen for a treatment-naïve HIV patient with normal renal function?",
              "options": [
                "Tenofovir/emtricitabine + efavirenz",
                "Abacavir/lamivudine + dolutegravir",
                "Zidovudine/lamivudine + nevirapine",
                "Stavudine/lamivudine + atazanavir"
              ],
              "answer": "Abacavir/lamivudine + dolutegravir",
              "explanation": "Abacavir/lamivudine (NRTIs) + dolutegravir (INSTI) is a recommended first-line regimen due to high efficacy and low toxicity."
            },
            {
              "stem": "A 35-year-old man presents with fever, headache, and confusion. CSF analysis shows 500 WBC/μL (90% neutrophils), glucose 1.8 mmol/L (serum 4.2 mmol/L), and protein 2.5 g/L. Which organism is most likely responsible?",
              "options": [
                "Streptococcus pneumoniae",
                "Neisseria meningitidis",
                "Listeria monocytogenes",
                "Mycobacterium tuberculosis"
              ],
              "answer": "Streptococcus pneumoniae",
              "explanation": "The CSF profile (neutrophilic predominance, low glucose, elevated protein) is classic for bacterial meningitis, with S. pneumoniae being a common cause."
            },
            {
              "stem": "Which of the following is the most appropriate treatment for a 24-week pregnant woman with confirmed syphilis?",
              "options": [
                "Doxycycline 100 mg orally twice daily for 14 days",
                "Azithromycin 500 mg orally daily for 7 days",
                "Benzathine penicillin G 2.4 million units IM single dose",
                "Ceftriaxone 500 mg IM single dose"
              ],
              "answer": "Benzathine penicillin G 2.4 million units IM single dose",
              "explanation": "Penicillin is the only effective treatment for syphilis in pregnancy; alternatives are not recommended due to resistance or safety concerns."
            },
            {
              "stem": "A 45-year-old man with HIV (CD4 80 cells/μL) presents with odynophagia and white plaques on his tongue. Which antifungal is most appropriate for empirical treatment?",
              "options": [
                "Fluconazole 100 mg orally daily for 7–14 days",
                "Amphotericin B IV 0.3 mg/kg daily for 7 days",
                "Nystatin suspension 5 mL swish and swallow four times daily",
                "Caspofungin IV 50 mg daily for 7 days"
              ],
              "answer": "Fluconazole 100 mg orally daily for 7–14 days",
              "explanation": "Fluconazole is the preferred empirical treatment for oropharyngeal candidiasis in HIV."
            },
            {
              "stem": "Which of the following is the most significant risk factor for hepatocellular carcinoma in a patient with chronic HBV infection?",
              "options": [
                "Male sex",
                "Age >40 years",
                "High HBV DNA levels",
                "Presence of anti-HBs antibodies"
              ],
              "answer": "High HBV DNA levels",
              "explanation": "High HBV DNA levels (>2000 IU/mL) are strongly associated with an increased risk of hepatocellular carcinoma."
            },
            {
              "stem": "A 22-year-old woman presents with dysuria, frequency, and suprapubic pain. Urinalysis shows >100 WBC/HPF and positive nitrites. Which organism is most likely responsible?",
              "options": [
                "Staphylococcus saprophyticus",
                "Escherichia coli",
                "Klebsiella pneumoniae",
                "Proteus mirabilis"
              ],
              "answer": "Escherichia coli",
              "explanation": "E. coli is the most common cause of uncomplicated UTI, accounting for 75–95% of cases."
            },
            {
              "stem": "Which of the following is the recommended regimen for treating chlamydial urethritis in a non-pregnant adult?",
              "options": [
                "Doxycycline 100 mg orally twice daily for 7 days",
                "Azithromycin 1 g orally single dose",
                "Ceftriaxone 500 mg IM single dose",
                "Ciprofloxacin 500 mg orally twice daily for 3 days"
              ],
              "answer": "Azithromycin 1 g orally single dose",
              "explanation": "Azithromycin is the recommended first-line treatment for chlamydial infections due to its efficacy and convenience."
            },
            {
              "stem": "A 30-year-old man with HIV presents with a 2-week history of watery diarrhea and abdominal cramping. Stool microscopy shows acid-fast oocysts. Which organism is most likely responsible?",
              "options": [
                "Cryptosporidium parvum",
                "Giardia lamblia",
                "Entamoeba histolytica",
                "Isospora belli"
              ],
              "answer": "Cryptosporidium parvum",
              "explanation": "Acid-fast oocysts in stool are diagnostic of Cryptosporidium, a common cause of diarrhea in HIV."
            },
            {
              "stem": "Which of the following is the most appropriate initial treatment for a 6-month-old infant with confirmed UTI?",
              "options": [
                "Amoxicillin 20 mg/kg/day divided every 8 hours",
                "Cefixime 8 mg/kg/day as a single daily dose",
                "Cotrimoxazole 6–10 mg/kg/day (trimethoprim component) divided every 12 hours",
                "Nitrofurantoin 5 mg/kg/day divided every 6 hours"
              ],
              "answer": "Cefixime 8 mg/kg/day as a single daily dose",
              "explanation": "Cefixime is a third-generation cephalosporin with good oral bioavailability and is recommended for pediatric UTI."
            },
            {
              "stem": "A 25-year-old woman presents with a 3-day history of fever, jaundice, and right upper quadrant pain. Serology shows HBsAg positive, anti-HBc IgM positive, and anti-HBs negative. What is the most appropriate management?",
              "options": [
                "Administer hepatitis B immune globulin immediately",
                "Start tenofovir for acute hepatitis B infection",
                "Supportive care with hydration and rest",
                "Administer hepatitis B vaccine immediately"
              ],
              "answer": "Supportive care with hydration and rest",
              "explanation": "Acute hepatitis B is self-limiting; supportive care is the mainstay of management."
            },
            {
              "stem": "Which of the following is the recommended regimen for treating pelvic inflammatory disease (PID) in a non-pregnant woman?",
              "options": [
                "Ceftriaxone 500 mg IM single dose + doxycycline 100 mg orally twice daily for 14 days",
                "Ceftriaxone 250 mg IM single dose + azithromycin 1 g orally single dose",
                "Metronidazole 400 mg orally twice daily for 14 days",
                "Ciprofloxacin 500 mg orally twice daily for 14 days"
              ],
              "answer": "Ceftriaxone 500 mg IM single dose + doxycycline 100 mg orally twice daily for 14 days",
              "explanation": "This regimen provides coverage for Neisseria gonorrhoeae and Chlamydia trachomatis, the most common causes of PID."
            },
            {
              "stem": "A 40-year-old man with HIV (CD4 150 cells/μL) presents with fever, headache, and confusion. CSF analysis shows 200 WBC/μL (80% lymphocytes), glucose 2.5 mmol/L (serum 4.8 mmol/L), and protein 1.2 g/L. Which organism is most likely responsible?",
              "options": [
                "Cryptococcus neoformans",
                "Toxoplasma gondii",
                "Mycobacterium tuberculosis",
                "Herpes simplex virus"
              ],
              "answer": "Cryptococcus neoformans",
              "explanation": "The CSF profile (lymphocytic predominance, low glucose, elevated protein) is classic for cryptococcal meningitis in HIV."
            },
            {
              "stem": "Which of the following is the most appropriate initial treatment for a 24-week pregnant woman with confirmed gonococcal cervicitis?",
              "options": [
                "Ceftriaxone 500 mg IM single dose + azithromycin 1 g orally single dose",
                "Doxycycline 100 mg orally twice daily for 7 days",
                "Azithromycin 1 g orally single dose",
                "Ciprofloxacin 500 mg orally single dose"
              ],
              "answer": "Ceftriaxone 500 mg IM single dose + azithromycin 1 g orally single dose",
              "explanation": "Dual therapy with ceftriaxone (for gonorrhea) and azithromycin (for chlamydia) is recommended, with both drugs being safe in pregnancy."
            },
            {
              "stem": "A 30-year-old man presents with a 1-week history of fever, malaise, and a maculopapular rash on his trunk. Serology shows VDRL positive and FTA-ABS negative. Which stage of syphilis is this?",
              "options": [
                "Primary syphilis",
                "Secondary syphilis",
                "Latent syphilis",
                "Tertiary syphilis"
              ],
              "answer": "Secondary syphilis",
              "explanation": "The maculopapular rash on the trunk is characteristic of secondary syphilis."
            },
            {
              "stem": "Which of the following is the most significant risk factor for vertical transmission of HBV?",
              "options": [
                "Maternal HBeAg positivity",
                "Maternal HBsAg negativity",
                "Maternal anti-HBs positivity",
                "Maternal HBV DNA <2000 IU/mL"
              ],
              "answer": "Maternal HBeAg positivity",
              "explanation": "HBeAg positivity indicates high viral replication and is a strong predictor of vertical HBV transmission."
            },
            {
              "stem": "A 25-year-old woman presents with dysuria, frequency, and suprapubic pain. Urinalysis shows >100 WBC/HPF and positive nitrites. Which antibiotic is most appropriate for empirical treatment?",
              "options": [
                "Nitrofurantoin 100 mg orally twice daily for 5 days",
                "Ciprofloxacin 500 mg orally twice daily for 3 days",
                "Amoxicillin 500 mg orally three times daily for 7 days",
                "Metronidazole 400 mg orally twice daily for 7 days"
              ],
              "answer": "Nitrofurantoin 100 mg orally twice daily for 5 days",
              "explanation": "Nitrofurantoin is a first-line agent for uncomplicated UTI due to its efficacy and low resistance rates."
            },
            {
              "stem": "Which of the following is the recommended regimen for treating acute hepatitis C infection?",
              "options": [
                "Pegylated interferon alfa-2a + ribavirin for 24 weeks",
                "Sofosbuvir/ledipasvir for 8–12 weeks",
                "Tenofovir for 12 weeks",
                "Ribavirin monotherapy for 24 weeks"
              ],
              "answer": "Sofosbuvir/ledipasvir for 8–12 weeks",
              "explanation": "Direct-acting antivirals (DAAs) like sofosbuvir/ledipasvir are now the standard of care for acute HCV infection."
            },
            {
              "stem": "A 30-year-old man with HIV (CD4 200 cells/μL) presents with fever, cough, and dyspnea. Chest X-ray shows bilateral interstitial infiltrates. Which opportunistic infection is most likely?",
              "options": [
                "Pneumocystis jirovecii pneumonia",
                "Cryptococcal meningitis",
                "Toxoplasma gondii encephalitis",
                "Mycobacterium avium complex"
              ],
              "answer": "Pneumocystis jirovecii pneumonia",
              "explanation": "The clinical presentation and CD4 count are classic for Pneumocystis jirovecii pneumonia in HIV."
            },
            {
              "stem": "Which of the following is the most appropriate initial treatment for a 2-month-old infant with confirmed UTI?",
              "options": [
                "Amoxicillin 20 mg/kg/day divided every 8 hours",
                "Cefixime 8 mg/kg/day as a single daily dose",
                "Cotrimoxazole 6–10 mg/kg/day (trimethoprim component) divided every 12 hours",
                "Nitrofurantoin 5 mg/kg/day divided every 6 hours"
              ],
              "answer": "Cefixime 8 mg/kg/day as a single daily dose",
              "explanation": "Cefixime is a third-generation cephalosporin with good oral bioavailability and is recommended for pediatric UTI."
            },
            {
              "stem": "A 25-year-old woman presents with a 3-day history of fever, jaundice, and right upper quadrant pain. Serology shows HBsAg positive, anti-HBc IgM positive, and anti-HBs negative. What is the most appropriate management?",
              "options": [
                "Administer hepatitis B immune globulin immediately",
                "Start tenofovir for acute hepatitis B infection",
                "Supportive care with hydration and rest",
                "Administer hepatitis B vaccine immediately"
              ],
              "answer": "Supportive care with hydration and rest",
              "explanation": "Acute hepatitis B is self-limiting; supportive care is the mainstay of management."
            },
            {
              "stem": "Which of the following is the recommended regimen for treating chlamydial urethritis in a non-pregnant adult?",
              "options": [
                "Doxycycline 100 mg orally twice daily for 7 days",
                "Azithromycin 1 g orally single dose",
                "Ceftriaxone 500 mg IM single dose",
                "Ciprofloxacin 500 mg orally twice daily for 3 days"
              ],
              "answer": "Azithromycin 1 g orally single dose",
              "explanation": "Azithromycin is the recommended first-line treatment for chlamydial infections due to its efficacy and convenience."
            },
            {
              "stem": "A 30-year-old man with HIV presents with a 2-week history of watery diarrhea and abdominal cramping. Stool microscopy shows acid-fast oocysts. Which organism is most likely responsible?",
              "options": [
                "Cryptosporidium parvum",
                "Giardia lamblia",
                "Entamoeba histolytica",
                "Isospora belli"
              ],
              "answer": "Cryptosporidium parvum",
              "explanation": "Acid-fast oocysts in stool are diagnostic of Cryptosporidium, a common cause of diarrhea in HIV."
            },
            {
              "stem": "Which of the following is the most significant risk factor for hepatocellular carcinoma in a patient with chronic HBV infection?",
              "options": [
                "Male sex",
                "Age >40 years",
                "High HBV DNA levels",
                "Presence of anti-HBs antibodies"
              ],
              "answer": "High HBV DNA levels",
              "explanation": "High HBV DNA levels (>2000 IU/mL) are strongly associated with an increased risk of hepatocellular carcinoma."
            },
            {
              "stem": "A 22-year-old woman presents with dysuria, frequency, and suprapubic pain. Urinalysis shows >100 WBC/HPF and positive nitrites. Which organism is most likely responsible?",
              "options": [
                "Staphylococcus saprophyticus",
                "Escherichia coli",
                "Klebsiella pneumoniae",
                "Proteus mirabilis"
              ],
              "answer": "Escherichia coli",
              "explanation": "E. coli is the most common cause of uncomplicated UTI, accounting for 75–95% of cases."
            },
            {
              "stem": "Which of the following is the recommended regimen for treating pelvic inflammatory disease (PID) in a non-pregnant woman?",
              "options": [
                "Ceftriaxone 500 mg IM single dose + doxycycline 100 mg orally twice daily for 14 days",
                "Ceftriaxone 250 mg IM single dose + azithromycin 1 g orally single dose",
                "Metronidazole 400 mg orally twice daily for 14 days",
                "Ciprofloxacin 500 mg orally twice daily for 14 days"
              ],
              "answer": "Ceftriaxone 500 mg IM single dose + doxycycline 100 mg orally twice daily for 14 days",
              "explanation": "This regimen provides coverage for Neisseria gonorrhoeae and Chlamydia trachomatis, the most common causes of PID."
            },
            {
              "stem": "A 40-year-old man with HIV (CD4 150 cells/μL) presents with fever, headache, and confusion. CSF analysis shows 200 WBC/μL (80% lymphocytes), glucose 2.5 mmol/L (serum 4.8 mmol/L), and protein 1.2 g/L. Which organism is most likely responsible?",
              "options": [
                "Cryptococcus neoformans",
                "Toxoplasma gondii",
                "Mycobacterium tuberculosis",
                "Herpes simplex virus"
              ],
              "answer": "Cryptococcus neoformans",
              "explanation": "The CSF profile (lymphocytic predominance, low glucose, elevated protein) is classic for cryptococcal meningitis in HIV."
            },
            {
              "stem": "Which of the following is the most appropriate initial treatment for a 24-week pregnant woman with confirmed gonococcal cervicitis?",
              "options": [
                "Ceftriaxone 500 mg IM single dose + azithromycin 1 g orally single dose",
                "Doxycycline 100 mg orally twice daily for 7 days",
                "Azithromycin 1 g orally single dose",
                "Ciprofloxacin 500 mg orally single dose"
              ],
              "answer": "Ceftriaxone 500 mg IM single dose + azithromycin 1 g orally single dose",
              "explanation": "Dual therapy with ceftriaxone (for gonorrhea) and azithromycin (for chlamydia) is recommended, with both drugs being safe in pregnancy."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "List four opportunistic infections that can be prevented by co-trimoxazole preventive therapy (CPT) in HIV-positive patients.",
              "modelAnswer": "1. Pneumocystis jirovecii pneumonia (PCP)\n2. Toxoplasma gondii encephalitis\n3. Isosporiasis\n4. Certain bacterial infections (e.g., recurrent bacterial pneumonia, Salmonella bacteremia)"
            },
            {
              "stem": "A 56-year-old truck driver is admitted with a diagnosis of cryptococcal meningitis. He is started on amphotericin B. Outline the key recommendations for administration and monitoring of amphotericin B.",
              "modelAnswer": "1. **Administration**: Dilute amphotericin B in 5% dextrose (avoid saline) and infuse over 4–6 hours. Use a test dose (1 mg IV) to assess tolerance.\n2. **Monitoring**: Check serum electrolytes (especially potassium and magnesium) daily due to renal wasting. Monitor renal function (creatinine, BUN) and CBC for anemia/neutropenia.\n3. **Supportive care**: Pre-medicate with paracetamol, antihistamines, and corticosteroids to reduce infusion-related reactions.\n4. **Duration**: Continue amphotericin B for 2 weeks, followed by fluconazole for consolidation therapy."
            },
            {
              "stem": "Outline three indirect methods that can be used to assess adherence to antiretroviral therapy (ART) during routine clinic visits.",
              "modelAnswer": "1. **Pill counts**: Compare the number of pills dispensed with the number returned at the next visit.\n2. **Pharmacy refill records**: Review the frequency and timing of refills to identify gaps in therapy.\n3. **Patient self-report**: Use standardized questionnaires (e.g., Morisky Medication Adherence Scale) to assess missed doses."
            },
            {
              "stem": "Explain the current recommendations for preventing recurrent HBV infection after liver transplantation.",
              "modelAnswer": "1. **Pre-transplant**: Administer hepatitis B immune globulin (HBIG) and nucleos(t)ide analogs (e.g., tenofovir or entecavir) to reduce HBV DNA levels.\n2. **Post-transplant**: Continue long-term HBIG (lifelong) and nucleos(t)ide analogs (e.g., tenofovir) to prevent HBV recurrence.\n3. **Monitoring**: Regularly monitor HBV DNA levels and liver function tests to detect breakthrough infections."
            },
            {
              "stem": "Describe three goals of therapy for treating HCV infection.",
              "modelAnswer": "1. **Viral eradication**: Achieve sustained virologic response (SVR), defined as undetectable HCV RNA 12 weeks after completing therapy.\n2. **Prevent complications**: Reduce the risk of cirrhosis, hepatocellular carcinoma, and liver failure.\n3. **Improve quality of life**: Alleviate symptoms (e.g., fatigue, jaundice) and reduce extrahepatic manifestations (e.g., cryoglobulinemic vasculitis)."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 31-year-old man newly diagnosed with HIV was admitted with shortness of breath, cough, and generalized chest discomfort. Chest radiograph revealed diffuse bilateral opacities and a blood gas analysis demonstrated an arterial partial oxygen pressure (PaO2) of 8.0 kPa (normal range 11.0–14.0 kPa). Sputum culture was uninformative. A bronchoalveolar lavage was performed and transbronchial biopsies taken.\n\n(a) Identify the most likely clinical diagnosis and the causative agent.\n(b) Justify your answer in (a) above.\n(c) Propose 2 other tests that could be performed to support the diagnosis.\n(d) Design a comprehensive treatment plan for this patient including appropriate antimicrobial regimen, adjunctive treatment, and supportive therapy.\n(e) Assuming this patient was allergic to the first-line treatment for this condition, propose two other alternative pharmacological interventions (for moderate to severe infection) that you would consider for this infection.\n(f) Explain how you would monitor treatment in this patient.\n(g) Illustrate the ART regimen that you would recommend to be initiated in this patient and the exact timing of initiation of the regimen (justify your answer).",
              "modelAnswer": {
                "a": "Most likely diagnosis: Pneumocystis jirovecii pneumonia (PCP). Causative agent: Pneumocystis jirovecii (a fungus).",
                "b": "1. **Clinical presentation**: Shortness of breath, cough, and diffuse bilateral opacities on chest X-ray are classic for PCP.\n2. **Hypoxemia**: PaO2 of 8.0 kPa (severe hypoxemia) is typical in moderate-to-severe PCP.\n3. **CD4 count**: Newly diagnosed HIV with likely low CD4 count (<200 cells/μL) predisposes to PCP.\n4. **Diagnostic yield**: Sputum culture was uninformative, but bronchoalveolar lavage and transbronchial biopsy are highly sensitive for PCP.",
                "c": "1. **Induced sputum for Pneumocystis PCR**: Highly sensitive and specific for detecting P. jirovecii DNA.\n2. **Serum LDH levels**: Elevated LDH (>500 IU/L) supports the diagnosis of PCP.\n3. **Beta-D-glucan assay**: A non-invasive test with high sensitivity and specificity for fungal infections, including PCP.",
                "d": "**Antimicrobial regimen**: Trimethoprim-sulfamethoxazole (TMP-SMX) 15–20 mg/kg/day (TMP component) IV or orally in divided doses for 21 days.\n**Adjunctive therapy**: Prednisone 40 mg orally twice daily for 5 days, then 40 mg daily for 5 days, then 20 mg daily for 11 days (to reduce inflammation and improve oxygenation).\n**Supportive therapy**: Oxygen therapy to maintain SpO2 >90%, hydration, and nutritional support.\n**Monitoring**: Daily clinical assessment, oxygen saturation, and adverse effects (e.g., rash, hyperkalemia, nephrotoxicity).",
                "e": "1. **Clindamycin 600 mg IV every 8 hours + primaquine 30 mg orally daily**: Alternative regimen for moderate-to-severe PCP in patients intolerant to TMP-SMX.\n2. **Atovaquone 750 mg orally twice daily**: Alternative for mild-to-moderate PCP, especially in patients with sulfa allergies.",
                "f": "1. **Clinical response**: Monitor symptoms (cough, dyspnea, fever) and oxygen requirements.\n2. **Laboratory monitoring**: Check CBC, renal function, and electrolytes (TMP-SMX can cause hyperkalemia and nephrotoxicity).\n3. **Radiological monitoring**: Repeat chest X-ray at the end of treatment to assess resolution.\n4. **Virologic monitoring**: If HIV is newly diagnosed, monitor CD4 count and HIV viral load post-ART initiation.",
                "g": "**ART regimen**: Tenofovir/emtricitabine + dolutegravir (TDF/FTC/DTG).\n**Timing of initiation**: Start ART within 2 weeks of PCP diagnosis, but after the patient has stabilized (e.g., oxygen requirements are improving).\n**Justification**: Early ART initiation reduces mortality and improves immune recovery. TDF/FTC/DTG is a recommended first-line regimen due to high efficacy, low toxicity, and once-daily dosing. Avoid efavirenz due to potential drug interactions with TMP-SMX (e.g., rash)."
              }
            },
            {
              "stem": "D.S., a 23-year-old male army officer recently stationed in Lanet, complains of dysuria, meatal pain, and a profuse yellow urethral discharge for 2 days. He admits to extramarital sex with a sex worker during the past week. He is accompanied by his pregnant wife, C.S., who is asymptomatic. D.S. engages in vaginal sex, but there is no history of oral or anal sex with either partner. Intracellular gram-negative diplococci are seen on the Gram stain of D.S.’s urethral exudate.\n\n(a) Identify the most likely diagnosis and causative agent.\n(b) Explain your answer in (a) above.\n(c) Prepare the treatment plans for both C.S and D.S.\n(d) Outline three parameters that you would use to monitor response to treatment for both C.S and D.S.\n(e) Identify one antimicrobial drug that is effective for this condition but is contraindicated in C.S because of pregnancy. Give the reason for contraindication.\n(f) Assuming D.S presented before 72 hours elapsed after initial sexual contact with the sex worker, outline any other therapy that he would have benefited from (give the drug regimen and duration of therapy).\n(g) List two adverse effects associated with the therapy in (f) that you would watch out for.\n(h) D.S is diagnosed with primary syphilis 3 years later. Outline two possible complications of syphilis in D.S.",
              "modelAnswer": {
                "a": "Most likely diagnosis: Gonococcal urethritis. Causative agent: Neisseria gonorrhoeae.",
                "b": "1. **Clinical presentation**: Dysuria, meatal pain, and profuse yellow urethral discharge are classic symptoms of gonococcal urethritis.\n2. **Gram stain**: Intracellular gram-negative diplococci are diagnostic of N. gonorrhoeae.\n3. **Risk factors**: Recent unprotected sexual contact with a sex worker increases the likelihood of gonorrhea.",
                "c": "**Treatment for D.S.**: Ceftriaxone 500 mg IM single dose + azithromycin 1 g orally single dose (to cover potential chlamydial co-infection).\n**Treatment for C.S.**: Empirical treatment for chlamydia: Azithromycin 1 g orally single dose (since gonorrhea screening is negative and pregnancy precludes ceftriaxone).",
                "d": "1. **Clinical response**: Resolution of dysuria, meatal pain, and urethral discharge within 7 days.\n2. **Microbiological cure**: Repeat Gram stain or NAAT for N. gonorrhoeae and C. trachomatis 1–2 weeks post-treatment.\n3. **Partner notification and testing**: Ensure C.S. is tested and treated, and D.S. abstains from sexual contact until both are cured.",
                "e": "Ciprofloxacin 500 mg orally single dose. Contraindication: Pregnancy (risk of fetal cartilage damage and arthropathy).",
                "f": "Post-exposure prophylaxis (PEP) for gonorrhea: Ceftriaxone 500 mg IM single dose. Duration: Single dose.",
                "g": "1. **Injection site pain**: Ceftriaxone can cause local pain or induration at the injection site.\n2. **Hypersensitivity reactions**: Rare but possible, ranging from rash to anaphylaxis.",
                "h": "1. **Neurosyphilis**: Can cause meningitis, stroke, or cognitive impairment if untreated.\n2. **Cardiovascular syphilis**: Can lead to aortic aneurysm or valvular heart disease."
              }
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Clinical Pharmacy — Infections II",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 60,
          "questions": [
            {
              "stem": "A 28-year-old woman presents with a 3-day history of jaundice, dark urine, and fatigue. She reports recent consumption of raw oysters. Serology reveals anti-HAV IgM positive, HBsAg negative, anti-HBc IgM negative, anti-HCV negative. What is the most likely diagnosis?",
              "options": [
                "Acute hepatitis B",
                "Acute hepatitis C",
                "Acute hepatitis A",
                "Chronic hepatitis E"
              ],
              "answer": "Acute hepatitis A",
              "explanation": "Anti-HAV IgM positivity indicates acute hepatitis A infection, which is consistent with the clinical presentation and exposure history."
            },
            {
              "stem": "Which of the following is the most appropriate vaccination schedule for hepatitis A in a previously unvaccinated 12-month-old child according to WHO guidelines?",
              "options": [
                "Single dose at 12 months",
                "Two doses at 12 and 18 months",
                "Three doses at 6, 10, and 14 weeks",
                "Four doses at 2, 4, 6, and 12 months"
              ],
              "answer": "Two doses at 12 and 18 months",
              "explanation": "WHO recommends two doses of hepatitis A vaccine for children, with the first dose given at 12 months and the second dose 6–12 months later."
            },
            {
              "stem": "A 35-year-old man with HIV (CD4 count 180 cells/µL) is started on antiretroviral therapy (ART). He develops severe nausea, vomiting, and abdominal pain 2 weeks later. Laboratory tests show elevated serum amylase and lipase. Which antiretroviral is most likely responsible for this adverse effect?",
              "options": [
                "Efavirenz",
                "Tenofovir",
                "Dolutegravir",
                "Lamivudine"
              ],
              "answer": "Tenofovir",
              "explanation": "Tenofovir is associated with pancreatitis, particularly in patients with pre-existing risk factors or concurrent medications that increase risk."
            },
            {
              "stem": "A 45-year-old woman presents with a 1-week history of fever, headache, and confusion. Lumbar puncture reveals CSF with 250 WBC/µL (70% lymphocytes), glucose 1.8 mmol/L (serum glucose 5.2 mmol/L), protein 3.5 g/L, and negative India ink stain. Which pathogen is most likely responsible?",
              "options": [
                "Neisseria meningitidis",
                "Cryptococcus neoformans",
                "Listeria monocytogenes",
                "Herpes simplex virus"
              ],
              "answer": "Cryptococcus neoformans",
              "explanation": "The CSF profile (lymphocytic pleocytosis, low glucose, high protein) with a negative India ink stain suggests cryptococcal meningitis, especially in an immunocompromised patient."
            },
            {
              "stem": "A 22-year-old man presents with dysuria and a purulent urethral discharge. Gram stain shows intracellular gram-negative diplococci. Which antibiotic is the first-line treatment for this infection?",
              "options": [
                "Doxycycline 100 mg orally twice daily for 7 days",
                "Ceftriaxone 500 mg IM as a single dose",
                "Azithromycin 1 g orally as a single dose",
                "Metronidazole 500 mg orally twice daily for 7 days"
              ],
              "answer": "Ceftriaxone 500 mg IM as a single dose",
              "explanation": "Ceftriaxone is the first-line treatment for gonorrhea, and co-treatment for Chlamydia trachomatis with doxycycline or azithromycin is recommended."
            },
            {
              "stem": "A 30-year-old woman is diagnosed with primary syphilis. Which of the following is the most appropriate treatment according to WHO guidelines?",
              "options": [
                "Benzathine penicillin G 2.4 million units IM weekly for 2 weeks",
                "Doxycycline 100 mg orally twice daily for 14 days",
                "Ceftriaxone 1 g IM daily for 10 days",
                "Azithromycin 500 mg orally daily for 10 days"
              ],
              "answer": "Benzathine penicillin G 2.4 million units IM weekly for 2 weeks",
              "explanation": "Benzathine penicillin G is the preferred treatment for primary syphilis, with a single dose for early syphilis and weekly doses for late latent syphilis."
            },
            {
              "stem": "A 50-year-old man with chronic hepatitis B (HBsAg positive, HBeAg positive, HBV DNA 5 log10 IU/mL) is started on tenofovir. Which parameter should be monitored most closely during therapy?",
              "options": [
                "Serum potassium",
                "Renal function (eGFR)",
                "Hemoglobin levels",
                "Thyroid function"
              ],
              "answer": "Renal function (eGFR)",
              "explanation": "Tenofovir is nephrotoxic, and renal function (eGFR) should be monitored closely during therapy, especially in patients with pre-existing renal impairment."
            },
            {
              "stem": "A 25-year-old pregnant woman (28 weeks gestation) is diagnosed with hepatitis C virus (HCV) infection. Which of the following is the most appropriate next step?",
              "options": [
                "Start sofosbuvir/ledipasvir immediately",
                "Wait until postpartum to initiate treatment",
                "Perform HCV RNA testing to confirm active infection",
                "Administer pegylated interferon and ribavirin"
              ],
              "answer": "Perform HCV RNA testing to confirm active infection",
              "explanation": "HCV antibody testing alone cannot distinguish between past and current infection; HCV RNA testing is required to confirm active infection before treatment."
            },
            {
              "stem": "A 40-year-old man with HIV (CD4 count 120 cells/µL) presents with a 2-week history of cough, fever, and weight loss. Chest X-ray shows bilateral infiltrates. Sputum AFB stain is negative. Which of the following is the most likely diagnosis?",
              "options": [
                "Pneumocystis jirovecii pneumonia",
                "Tuberculosis",
                "Bacterial pneumonia",
                "Histoplasmosis"
              ],
              "answer": "Pneumocystis jirovecii pneumonia",
              "explanation": "The clinical presentation (subacute onset, bilateral infiltrates, low CD4 count) is highly suggestive of Pneumocystis jirovecii pneumonia in an HIV-infected patient."
            },
            {
              "stem": "A 35-year-old woman with a history of intravenous drug use presents with jaundice, fatigue, and elevated ALT/AST. Serology shows anti-HCV positive, HCV RNA positive, HBsAg negative, anti-HBc IgG positive. What is the most likely diagnosis?",
              "options": [
                "Chronic hepatitis B",
                "Acute hepatitis C",
                "Chronic hepatitis C",
                "Hepatitis D superinfection"
              ],
              "answer": "Chronic hepatitis C",
              "explanation": "Anti-HCV positivity with detectable HCV RNA indicates chronic hepatitis C infection, especially in the context of risk factors like intravenous drug use."
            },
            {
              "stem": "A 60-year-old man with a history of chronic hepatitis B presents with abdominal distension and ascites. Ultrasound reveals a liver mass. Which of the following is the most likely cause of his hepatocellular carcinoma?",
              "options": [
                "Hepatitis A virus",
                "Hepatitis B virus",
                "Hepatitis C virus",
                "Alcohol abuse"
              ],
              "answer": "Hepatitis B virus",
              "explanation": "Chronic hepatitis B infection is a leading cause of hepatocellular carcinoma worldwide, particularly in regions with high HBV prevalence."
            },
            {
              "stem": "A 28-year-old man presents with a painless genital ulcer and inguinal lymphadenopathy. Serology shows VDRL positive, RPR positive, and TPHA positive. Which stage of syphilis is most likely?",
              "options": [
                "Primary syphilis",
                "Secondary syphilis",
                "Latent syphilis",
                "Tertiary syphilis"
              ],
              "answer": "Primary syphilis",
              "explanation": "A painless genital ulcer (chancre) with positive serology for syphilis indicates primary syphilis."
            },
            {
              "stem": "A 30-year-old woman is diagnosed with pelvic inflammatory disease (PID). Which of the following is the most appropriate outpatient treatment regimen?",
              "options": [
                "Ceftriaxone 500 mg IM + doxycycline 100 mg orally twice daily for 14 days",
                "Ceftriaxone 250 mg IM + azithromycin 1 g orally weekly for 2 weeks",
                "Cefixime 400 mg orally + metronidazole 500 mg orally twice daily for 7 days",
                "Ciprofloxacin 500 mg orally twice daily for 14 days"
              ],
              "answer": "Ceftriaxone 500 mg IM + doxycycline 100 mg orally twice daily for 14 days",
              "explanation": "The CDC and WHO recommend ceftriaxone for gonococcal coverage plus doxycycline for Chlamydia trachomatis in the treatment of PID."
            },
            {
              "stem": "A 45-year-old man with HIV (CD4 count 50 cells/µL) presents with a 1-week history of fever, headache, and confusion. CSF analysis shows 500 WBC/µL (90% lymphocytes), glucose 1.5 mmol/L, protein 4.0 g/L, and positive cryptococcal antigen. Which of the following is the most appropriate initial antifungal therapy?",
              "options": [
                "Fluconazole 800 mg orally daily",
                "Amphotericin B deoxycholate 0.7 mg/kg IV daily",
                "Liposomal amphotericin B 3–4 mg/kg IV daily + flucytosine 25 mg/kg orally 4 times daily",
                "Caspofungin 70 mg IV loading dose, then 50 mg IV daily"
              ],
              "answer": "Liposomal amphotericin B 3–4 mg/kg IV daily + flucytosine 25 mg/kg orally 4 times daily",
              "explanation": "Liposomal amphotericin B plus flucytosine is the recommended initial therapy for cryptococcal meningitis in HIV-infected patients."
            },
            {
              "stem": "A 25-year-old woman presents with a 3-day history of dysuria, urinary frequency, and suprapubic pain. Urinalysis shows >100 WBC/HPF, positive nitrites, and positive leukocyte esterase. Which of the following is the most appropriate first-line treatment?",
              "options": [
                "Nitrofurantoin 100 mg orally twice daily for 3 days",
                "Ciprofloxacin 500 mg orally twice daily for 7 days",
                "Amoxicillin 500 mg orally three times daily for 5 days",
                "Trimethoprim-sulfamethoxazole 160/800 mg orally twice daily for 3 days"
              ],
              "answer": "Nitrofurantoin 100 mg orally twice daily for 3 days",
              "explanation": "Nitrofurantoin is a first-line treatment for uncomplicated urinary tract infections in women, with a 3-day course being standard."
            },
            {
              "stem": "A 35-year-old man with HIV (CD4 count 200 cells/µL) presents with a 2-week history of watery diarrhea and weight loss. Stool microscopy reveals acid-fast oocysts. Which of the following is the most likely pathogen?",
              "options": [
                "Giardia lamblia",
                "Cryptosporidium parvum",
                "Entamoeba histolytica",
                "Isospora belli"
              ],
              "answer": "Cryptosporidium parvum",
              "explanation": "Cryptosporidium parvum is a common cause of chronic diarrhea in HIV-infected patients with low CD4 counts and is identified by acid-fast staining of oocysts."
            },
            {
              "stem": "A 50-year-old man with chronic hepatitis B (HBsAg positive, HBeAg negative, HBV DNA 3 log10 IU/mL) is started on tenofovir. Which of the following is the most appropriate monitoring schedule for this patient?",
              "options": [
                "LFTs and HBV DNA every 3 months",
                "Renal function and HBV DNA every 6 months",
                "CBC and HBV DNA every 12 months",
                "Renal function and LFTs every 6 months"
              ],
              "answer": "Renal function and HBV DNA every 6 months",
              "explanation": "Patients on tenofovir should have renal function (eGFR) and HBV DNA monitored every 6 months to assess efficacy and safety."
            },
            {
              "stem": "A 28-year-old woman presents with a 1-week history of fever, rash, and arthralgia. She reports a tick bite 2 weeks ago. Serology shows positive IgM for Borrelia burgdorferi. Which of the following is the most appropriate treatment?",
              "options": [
                "Doxycycline 100 mg orally twice daily for 14 days",
                "Amoxicillin 500 mg orally three times daily for 21 days",
                "Ceftriaxone 2 g IV daily for 14 days",
                "Azithromycin 500 mg orally daily for 7 days"
              ],
              "answer": "Doxycycline 100 mg orally twice daily for 14 days",
              "explanation": "Doxycycline is the first-line treatment for early Lyme disease, with a 14-day course being standard."
            },
            {
              "stem": "A 40-year-old man with HIV (CD4 count 100 cells/µL) presents with a 1-month history of progressive dyspnea and dry cough. Chest X-ray shows bilateral interstitial infiltrates. Which of the following is the most likely diagnosis?",
              "options": [
                "Pneumocystis jirovecii pneumonia",
                "Tuberculosis",
                "Bacterial pneumonia",
                "Kaposi sarcoma"
              ],
              "answer": "Pneumocystis jirovecii pneumonia",
              "explanation": "The clinical presentation (progressive dyspnea, dry cough, bilateral interstitial infiltrates) in an HIV-infected patient with low CD4 count is highly suggestive of Pneumocystis jirovecii pneumonia."
            },
            {
              "stem": "A 30-year-old woman is diagnosed with acute hepatitis B (HBsAg positive, anti-HBc IgM positive, HBeAg positive). Which of the following is the most appropriate management?",
              "options": [
                "Supportive care only",
                "Tenofovir therapy for 4 weeks",
                "Pegylated interferon therapy for 48 weeks",
                "Lamivudine therapy for 12 months"
              ],
              "answer": "Supportive care only",
              "explanation": "Acute hepatitis B typically resolves spontaneously, and antiviral therapy is not routinely recommended unless the patient is severely ill or immunocompromised."
            },
            {
              "stem": "A 25-year-old man presents with a 2-week history of fever, night sweats, and weight loss. Chest X-ray shows a right upper lobe infiltrate. Sputum AFB stain is positive. Which of the following is the most appropriate treatment regimen?",
              "options": [
                "Isoniazid, rifampicin, pyrazinamide, and ethambutol for 2 months, then isoniazid and rifampicin for 4 months",
                "Isoniazid and rifampicin for 9 months",
                "Streptomycin, isoniazid, rifampicin, and ethambutol for 6 months",
                "Rifampicin, ethambutol, and pyrazinamide for 12 months"
              ],
              "answer": "Isoniazid, rifampicin, pyrazinamide, and ethambutol for 2 months, then isoniazid and rifampicin for 4 months",
              "explanation": "This is the standard WHO-recommended regimen for drug-susceptible tuberculosis, consisting of an intensive phase (2 months) and a continuation phase (4 months)."
            },
            {
              "stem": "A 35-year-old woman with HIV (CD4 count 150 cells/µL) presents with a 1-week history of fever, headache, and confusion. CSF analysis shows 200 WBC/µL (80% lymphocytes), glucose 2.0 mmol/L, protein 3.0 g/L, and positive India ink stain. Which of the following is the most likely diagnosis?",
              "options": [
                "Cryptococcal meningitis",
                "Tuberculous meningitis",
                "Bacterial meningitis",
                "Viral meningitis"
              ],
              "answer": "Cryptococcal meningitis",
              "explanation": "The CSF profile (lymphocytic pleocytosis, low glucose, high protein) with a positive India ink stain is diagnostic of cryptococcal meningitis."
            },
            {
              "stem": "A 40-year-old man presents with a 3-day history of fever, headache, and myalgia. He reports recent travel to a rural area with poor sanitation. Serology shows IgM positive for hepatitis E virus. Which of the following is the most likely mode of transmission?",
              "options": [
                "Parenteral transmission",
                "Sexual transmission",
                "Fecal-oral transmission",
                "Vector-borne transmission"
              ],
              "answer": "Fecal-oral transmission",
              "explanation": "Hepatitis E virus is primarily transmitted via the fecal-oral route, often through contaminated water or food in endemic regions."
            },
            {
              "stem": "A 28-year-old woman presents with a 1-week history of dysuria and vaginal discharge. Urinalysis shows >50 WBC/HPF, and vaginal swab shows clue cells. Which of the following is the most likely diagnosis?",
              "options": [
                "Urinary tract infection",
                "Bacterial vaginosis",
                "Candidiasis",
                "Trichomoniasis"
              ],
              "answer": "Bacterial vaginosis",
              "explanation": "Clue cells on vaginal swab are diagnostic of bacterial vaginosis, which can cause dysuria and vaginal discharge."
            },
            {
              "stem": "A 35-year-old man with HIV (CD4 count 80 cells/µL) presents with a 2-week history of fever, night sweats, and weight loss. Chest X-ray shows bilateral infiltrates. Sputum AFB stain is negative. Which of the following is the most likely diagnosis?",
              "options": [
                "Pneumocystis jirovecii pneumonia",
                "Tuberculosis",
                "Histoplasmosis",
                "Coccidioidomycosis"
              ],
              "answer": "Pneumocystis jirovecii pneumonia",
              "explanation": "The clinical presentation (fever, night sweats, weight loss, bilateral infiltrates) in an HIV-infected patient with low CD4 count is highly suggestive of Pneumocystis jirovecii pneumonia."
            },
            {
              "stem": "A 45-year-old woman with chronic hepatitis C (genotype 1) is started on sofosbuvir/ledipasvir. Which of the following is the most appropriate duration of therapy?",
              "options": [
                "8 weeks",
                "12 weeks",
                "16 weeks",
                "24 weeks"
              ],
              "answer": "12 weeks",
              "explanation": "For treatment-naïve patients with chronic hepatitis C genotype 1, sofosbuvir/ledipasvir is typically administered for 12 weeks."
            },
            {
              "stem": "A 30-year-old man presents with a 2-week history of fever, rash, and lymphadenopathy. Serology shows positive VDRL and FTA-ABS. Which of the following is the most likely diagnosis?",
              "options": [
                "Primary syphilis",
                "Secondary syphilis",
                "Latent syphilis",
                "Tertiary syphilis"
              ],
              "answer": "Secondary syphilis",
              "explanation": "Secondary syphilis presents with systemic symptoms (fever, rash, lymphadenopathy) and positive serology, indicating disseminated infection."
            },
            {
              "stem": "A 25-year-old woman presents with a 3-day history of dysuria and urinary frequency. Urinalysis shows >100 WBC/HPF and positive nitrites. She is allergic to sulfonamides. Which of the following is the most appropriate treatment?",
              "options": [
                "Nitrofurantoin 100 mg orally twice daily for 3 days",
                "Ciprofloxacin 500 mg orally twice daily for 3 days",
                "Amoxicillin 500 mg orally three times daily for 5 days",
                "Trimethoprim 200 mg orally twice daily for 3 days"
              ],
              "answer": "Ciprofloxacin 500 mg orally twice daily for 3 days",
              "explanation": "Ciprofloxacin is an appropriate alternative for urinary tract infections in patients with sulfonamide allergy."
            },
            {
              "stem": "A 40-year-old man with HIV (CD4 count 200 cells/µL) presents with a 1-month history of watery diarrhea and weight loss. Stool microscopy reveals acid-fast oocysts. Which of the following is the most appropriate treatment?",
              "options": [
                "Metronidazole 500 mg orally three times daily for 7 days",
                "Nitazoxanide 500 mg orally twice daily for 3 days",
                "Paromomycin 500 mg orally three times daily for 7 days",
                "Start antiretroviral therapy"
              ],
              "answer": "Start antiretroviral therapy",
              "explanation": "In HIV-infected patients with cryptosporidiosis, the most effective intervention is to initiate or optimize antiretroviral therapy to restore immune function."
            },
            {
              "stem": "A 35-year-old woman presents with a 1-week history of fever, headache, and confusion. Lumbar puncture reveals CSF with 100 WBC/µL (90% lymphocytes), glucose 2.5 mmol/L (serum glucose 5.0 mmol/L), protein 2.0 g/L, and negative Gram stain. Which of the following is the most likely diagnosis?",
              "options": [
                "Viral meningitis",
                "Bacterial meningitis",
                "Tuberculous meningitis",
                "Fungal meningitis"
              ],
              "answer": "Viral meningitis",
              "explanation": "The CSF profile (lymphocytic pleocytosis, normal glucose, normal protein) with a negative Gram stain is suggestive of viral meningitis."
            },
            {
              "stem": "A 28-year-old man presents with a 2-week history of fever, night sweats, and weight loss. Chest X-ray shows a right upper lobe cavity. Sputum AFB stain is positive. Which of the following is the most appropriate treatment regimen?",
              "options": [
                "Isoniazid, rifampicin, pyrazinamide, and ethambutol for 2 months, then isoniazid and rifampicin for 4 months",
                "Isoniazid and rifampicin for 9 months",
                "Streptomycin, isoniazid, rifampicin, and ethambutol for 6 months",
                "Rifampicin, ethambutol, and pyrazinamide for 12 months"
              ],
              "answer": "Isoniazid, rifampicin, pyrazinamide, and ethambutol for 2 months, then isoniazid and rifampicin for 4 months",
              "explanation": "This is the standard WHO-recommended regimen for drug-susceptible tuberculosis, consisting of an intensive phase (2 months) and a continuation phase (4 months)."
            },
            {
              "stem": "A 45-year-old woman with chronic hepatitis B (HBsAg positive, HBeAg negative, HBV DNA 4 log10 IU/mL) is started on tenofovir. Which of the following is the most appropriate monitoring schedule for this patient?",
              "options": [
                "LFTs and HBV DNA every 3 months",
                "Renal function and HBV DNA every 6 months",
                "CBC and HBV DNA every 12 months",
                "Renal function and LFTs every 6 months"
              ],
              "answer": "Renal function and HBV DNA every 6 months",
              "explanation": "Patients on tenofovir should have renal function (eGFR) and HBV DNA monitored every 6 months to assess efficacy and safety."
            },
            {
              "stem": "A 30-year-old man presents with a 1-week history of fever, rash, and arthralgia. He reports a tick bite 2 weeks ago. Serology shows positive IgM for Borrelia burgdorferi. Which of the following is the most appropriate treatment?",
              "options": [
                "Doxycycline 100 mg orally twice daily for 14 days",
                "Amoxicillin 500 mg orally three times daily for 21 days",
                "Ceftriaxone 2 g IV daily for 14 days",
                "Azithromycin 500 mg orally daily for 7 days"
              ],
              "answer": "Doxycycline 100 mg orally twice daily for 14 days",
              "explanation": "Doxycycline is the first-line treatment for early Lyme disease, with a 14-day course being standard."
            },
            {
              "stem": "A 35-year-old woman with HIV (CD4 count 100 cells/µL) presents with a 1-month history of progressive dyspnea and dry cough. Chest X-ray shows bilateral interstitial infiltrates. Which of the following is the most likely diagnosis?",
              "options": [
                "Pneumocystis jirovecii pneumonia",
                "Tuberculosis",
                "Bacterial pneumonia",
                "Kaposi sarcoma"
              ],
              "answer": "Pneumocystis jirovecii pneumonia",
              "explanation": "The clinical presentation (progressive dyspnea, dry cough, bilateral interstitial infiltrates) in an HIV-infected patient with low CD4 count is highly suggestive of Pneumocystis jirovecii pneumonia."
            },
            {
              "stem": "A 25-year-old man presents with a 3-day history of fever, headache, and myalgia. He reports recent travel to a rural area with poor sanitation. Serology shows IgM positive for hepatitis E virus. Which of the following is the most likely mode of transmission?",
              "options": [
                "Parenteral transmission",
                "Sexual transmission",
                "Fecal-oral transmission",
                "Vector-borne transmission"
              ],
              "answer": "Fecal-oral transmission",
              "explanation": "Hepatitis E virus is primarily transmitted via the fecal-oral route, often through contaminated water or food in endemic regions."
            },
            {
              "stem": "A 28-year-old woman presents with a 1-week history of dysuria and vaginal discharge. Urinalysis shows >50 WBC/HPF, and vaginal swab shows clue cells. Which of the following is the most likely diagnosis?",
              "options": [
                "Urinary tract infection",
                "Bacterial vaginosis",
                "Candidiasis",
                "Trichomoniasis"
              ],
              "answer": "Bacterial vaginosis",
              "explanation": "Clue cells on vaginal swab are diagnostic of bacterial vaginosis, which can cause dysuria and vaginal discharge."
            },
            {
              "stem": "A 35-year-old man with HIV (CD4 count 80 cells/µL) presents with a 2-week history of fever, night sweats, and weight loss. Chest X-ray shows bilateral infiltrates. Sputum AFB stain is negative. Which of the following is the most likely diagnosis?",
              "options": [
                "Pneumocystis jirovecii pneumonia",
                "Tuberculosis",
                "Histoplasmosis",
                "Coccidioidomycosis"
              ],
              "answer": "Pneumocystis jirovecii pneumonia",
              "explanation": "The clinical presentation (fever, night sweats, weight loss, bilateral infiltrates) in an HIV-infected patient with low CD4 count is highly suggestive of Pneumocystis jirovecii pneumonia."
            },
            {
              "stem": "A 45-year-old woman with chronic hepatitis C (genotype 1) is started on sofosbuvir/ledipasvir. Which of the following is the most appropriate duration of therapy?",
              "options": [
                "8 weeks",
                "12 weeks",
                "16 weeks",
                "24 weeks"
              ],
              "answer": "12 weeks",
              "explanation": "For treatment-naïve patients with chronic hepatitis C genotype 1, sofosbuvir/ledipasvir is typically administered for 12 weeks."
            },
            {
              "stem": "A 30-year-old man presents with a 2-week history of fever, rash, and lymphadenopathy. Serology shows positive VDRL and FTA-ABS. Which of the following is the most likely diagnosis?",
              "options": [
                "Primary syphilis",
                "Secondary syphilis",
                "Latent syphilis",
                "Tertiary syphilis"
              ],
              "answer": "Secondary syphilis",
              "explanation": "Secondary syphilis presents with systemic symptoms (fever, rash, lymphadenopathy) and positive serology, indicating disseminated infection."
            },
            {
              "stem": "A 25-year-old woman presents with a 3-day history of dysuria and urinary frequency. Urinalysis shows >100 WBC/HPF and positive nitrites. She is allergic to sulfonamides. Which of the following is the most appropriate treatment?",
              "options": [
                "Nitrofurantoin 100 mg orally twice daily for 3 days",
                "Ciprofloxacin 500 mg orally twice daily for 3 days",
                "Amoxicillin 500 mg orally three times daily for 5 days",
                "Trimethoprim 200 mg orally twice daily for 3 days"
              ],
              "answer": "Ciprofloxacin 500 mg orally twice daily for 3 days",
              "explanation": "Ciprofloxacin is an appropriate alternative for urinary tract infections in patients with sulfonamide allergy."
            },
            {
              "stem": "A 40-year-old man with HIV (CD4 count 200 cells/µL) presents with a 1-month history of watery diarrhea and weight loss. Stool microscopy reveals acid-fast oocysts. Which of the following is the most appropriate treatment?",
              "options": [
                "Metronidazole 500 mg orally three times daily for 7 days",
                "Nitazoxanide 500 mg orally twice daily for 3 days",
                "Paromomycin 500 mg orally three times daily for 7 days",
                "Start antiretroviral therapy"
              ],
              "answer": "Start antiretroviral therapy",
              "explanation": "In HIV-infected patients with cryptosporidiosis, the most effective intervention is to initiate or optimize antiretroviral therapy to restore immune function."
            },
            {
              "stem": "A 35-year-old woman presents with a 1-week history of fever, headache, and confusion. Lumbar puncture reveals CSF with 100 WBC/µL (90% lymphocytes), glucose 2.5 mmol/L (serum glucose 5.0 mmol/L), protein 2.0 g/L, and negative Gram stain. Which of the following is the most likely diagnosis?",
              "options": [
                "Viral meningitis",
                "Bacterial meningitis",
                "Tuberculous meningitis",
                "Fungal meningitis"
              ],
              "answer": "Viral meningitis",
              "explanation": "The CSF profile (lymphocytic pleocytosis, normal glucose, normal protein) with a negative Gram stain is suggestive of viral meningitis."
            },
            {
              "stem": "A 28-year-old man presents with a 2-week history of fever, night sweats, and weight loss. Chest X-ray shows a right upper lobe cavity. Sputum AFB stain is positive. Which of the following is the most appropriate treatment regimen?",
              "options": [
                "Isoniazid, rifampicin, pyrazinamide, and ethambutol for 2 months, then isoniazid and rifampicin for 4 months",
                "Isoniazid and rifampicin for 9 months",
                "Streptomycin, isoniazid, rifampicin, and ethambutol for 6 months",
                "Rifampicin, ethambutol, and pyrazinamide for 12 months"
              ],
              "answer": "Isoniazid, rifampicin, pyrazinamide, and ethambutol for 2 months, then isoniazid and rifampicin for 4 months",
              "explanation": "This is the standard WHO-recommended regimen for drug-susceptible tuberculosis, consisting of an intensive phase (2 months) and a continuation phase (4 months)."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "List four opportunistic infections that can be prevented by co-trimoxazole preventive therapy (CPT) in HIV-infected patients.",
              "modelAnswer": "1. Pneumocystis jirovecii pneumonia (PCP)\n2. Toxoplasma gondii encephalitis\n3. Isospora belli diarrhea\n4. Nocardiosis\n(Other acceptable answers: Recurrent bacterial infections, malaria in endemic areas, or other infections where local guidelines support CPT use.)"
            },
            {
              "stem": "A 55-year-old man with HIV (CD4 count 50 cells/µL) is diagnosed with cryptococcal meningitis. He is started on amphotericin B deoxycholate. Outline the key monitoring parameters and supportive care measures for this patient during the first week of therapy.",
              "modelAnswer": "1. **Renal function**: Monitor serum creatinine and electrolytes (especially potassium and magnesium) daily due to amphotericin B nephrotoxicity.\n2. **Hematologic parameters**: Check CBC for anemia and leukopenia.\n3. **Electrolyte supplementation**: Administer potassium and magnesium supplements as needed to prevent cardiac arrhythmias.\n4. **Hydration**: Ensure adequate IV fluids to maintain renal perfusion and reduce nephrotoxicity.\n5. **CSF pressure management**: Perform daily lumbar punctures to relieve increased intracranial pressure if symptomatic.\n6. **Adverse effects**: Monitor for infusion-related reactions (fever, chills, rigors) and premedicate with paracetamol and hydrocortisone if necessary.\n7. **Antifungal levels**: Consider therapeutic drug monitoring if available."
            },
            {
              "stem": "Outline three indirect methods that can be used to assess adherence to antiretroviral therapy (ART) in HIV-infected patients during routine clinic visits.",
              "modelAnswer": "1. **Pharmacy refill records**: Track the frequency and timeliness of medication refills.\n2. **Pill counts**: Compare the number of pills dispensed with the number returned at follow-up visits.\n3. **Patient self-reports**: Use standardized questionnaires or interviews to assess adherence, though these may be subject to recall bias."
            },
            {
              "stem": "Explain the current recommendations for preventing recurrent hepatitis B virus (HBV) infection after liver transplantation.",
              "modelAnswer": "1. **Pre-transplant**: Screen for HBV DNA and administer hepatitis B immune globulin (HBIG) perioperatively.\n2. **Post-transplant**: Administer long-term antiviral therapy (e.g., tenofovir or entecavir) to suppress HBV replication and prevent reinfection.\n3. **HBIG administration**: Continue HBIG for at least 6–12 months post-transplant, often in combination with antiviral therapy.\n4. **Monitoring**: Monitor HBV DNA levels, liver function tests, and HBsAg status regularly to detect breakthrough infections."
            },
            {
              "stem": "Describe three goals of therapy for treating hepatitis C virus (HCV) infection.",
              "modelAnswer": "1. **Viral eradication**: Achieve sustained virologic response (SVR), defined as undetectable HCV RNA 12 weeks after completing therapy, to prevent long-term complications (e.g., cirrhosis, hepatocellular carcinoma).\n2. **Prevent disease progression**: Reduce liver inflammation, fibrosis, and the risk of cirrhosis and liver failure.\n3. **Improve quality of life**: Alleviate symptoms (e.g., fatigue, jaundice) and reduce the risk of extrahepatic manifestations (e.g., cryoglobulinemic vasculitis)."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 32-year-old man newly diagnosed with HIV presents to the emergency department with a 2-week history of progressive shortness of breath, dry cough, and fever. He reports no prior medical history and has not started antiretroviral therapy. On examination, he is tachypneic (RR 28/min), hypoxic (SpO2 88% on room air), and febrile (38.5°C). Chest auscultation reveals bilateral crackles. Chest X-ray shows diffuse bilateral interstitial infiltrates. Arterial blood gas analysis demonstrates a PaO2 of 7.5 kPa (normal range 11.0–14.0 kPa). \n\n(a) Identify the most likely clinical diagnosis and the causative agent. (2 marks)\n(b) Justify your answer in (a) above. (4 marks)\n(c) Propose two other tests that could be performed to support the diagnosis. (2 marks)\n(d) Design a comprehensive treatment plan for this patient, including appropriate antimicrobial regimen, adjunctive treatment, and supportive therapy. (5 marks)\n(e) Assuming this patient was allergic to the first-line treatment for this condition, propose two other alternative pharmacological interventions for moderate-to-severe infection. (2 marks)\n(f) Explain how you would monitor treatment in this patient. (2 marks)\n(g) Illustrate the ART regimen that you would recommend to be initiated in this patient and the exact timing of initiation of the regimen. Justify your answer. (5 marks)",
              "modelAnswer": {
                "a": "Most likely clinical diagnosis: Pneumocystis jirovecii pneumonia (PCP). Causative agent: Pneumocystis jirovecii (formerly Pneumocystis carinii).",
                "b": "Justification:\n1. **Clinical presentation**: Progressive shortness of breath, dry cough, and fever in a patient with newly diagnosed HIV and no prior ART are classic for PCP.\n2. **Hypoxemia**: Severe hypoxia (PaO2 7.5 kPa) out of proportion to clinical findings is characteristic of PCP.\n3. **Chest X-ray**: Diffuse bilateral interstitial infiltrates are typical of PCP, though they may appear normal early in the disease.\n4. **Risk factors**: Newly diagnosed HIV with low CD4 count (not explicitly stated but implied by lack of ART) is a major risk factor for PCP.",
                "c": "Two other tests to support the diagnosis:\n1. **Induced sputum or bronchoalveolar lavage (BAL)**: Microscopy (e.g., Gomori methenamine silver stain) or PCR to identify Pneumocystis jirovecii.\n2. **Serum LDH levels**: Elevated lactate dehydrogenase (LDH) is often seen in PCP due to lung tissue damage and is a supportive diagnostic marker.",
                "d": "Comprehensive treatment plan:\n**Antimicrobial regimen**:\n- **First-line therapy**: Trimethoprim-sulfamethoxazole (TMP-SMX) 15–20 mg/kg/day IV (divided into 3–4 doses) for 21 days.\n- **Adjunctive therapy**: Prednisone 40 mg orally twice daily for 5 days, then 40 mg daily for 5 days, then 20 mg daily for 11 days (to reduce inflammation and improve oxygenation).\n\n**Supportive therapy**:\n- **Oxygen therapy**: Administer supplemental oxygen to maintain SpO2 >90%.\n- **Hydration and nutrition**: Ensure adequate IV fluids and nutritional support.\n- **Monitoring**: Continuous pulse oximetry, vital signs, and fluid balance.\n\n**Other considerations**:\n- **Prophylaxis**: Start PCP prophylaxis (e.g., TMP-SMX 960 mg orally daily) after completing acute therapy.\n- **ART initiation**: Delay ART for 2 weeks to reduce the risk of immune reconstitution inflammatory syndrome (IRIS).",
                "e": "Alternative pharmacological interventions for moderate-to-severe PCP (if allergic to TMP-SMX):\n1. **Clindamycin 600 mg IV every 6 hours + primaquine 30 mg orally daily**: Effective alternative for moderate-to-severe PCP, though primaquine requires G6PD testing.\n2. **Atovaquone 750 mg orally twice daily + azithromycin 500 mg orally daily**: Less effective than TMP-SMX but an option for mild-to-moderate cases or in patients intolerant to other therapies.",
                "f": "Monitoring treatment:\n1. **Clinical response**: Assess improvement in symptoms (e.g., dyspnea, cough) and oxygenation (SpO2, PaO2).\n2. **Laboratory parameters**: Monitor CBC, renal function, and electrolytes (especially potassium) during TMP-SMX therapy.\n3. **Radiologic response**: Repeat chest X-ray at the end of therapy to assess resolution of infiltrates.\n4. **Adverse effects**: Watch for drug-related toxicities (e.g., rash, hepatotoxicity, nephrotoxicity) and adjust therapy as needed.",
                "g": "ART regimen and timing:\n**Recommended ART regimen**: Dolutegravir (DTG) 50 mg orally daily + tenofovir disoproxil fumarate (TDF) 300 mg orally daily + lamivudine (3TC) 300 mg orally daily (DTG/3TC/TDF fixed-dose combination).\n\n**Timing of initiation**:\n- **Delay ART for 2 weeks** after starting PCP treatment to reduce the risk of immune reconstitution inflammatory syndrome (IRIS).\n- **Rationale**: Early ART initiation in the setting of acute PCP can precipitate severe IRIS, worsening respiratory status. Delaying ART allows stabilization of the patient's condition before immune recovery.\n\n**Justification**:\n1. **DTG/3TC/TDF**: This regimen is preferred due to its high efficacy, low pill burden, and favorable side effect profile (e.g., minimal drug interactions, low risk of mitochondrial toxicity).\n2. **Timing**: Delaying ART for 2 weeks balances the risks of IRIS with the benefits of early viral suppression. After 2 weeks, the risk of IRIS decreases, and ART can be safely initiated."
              }
            },
            {
              "stem": "A 24-year-old man presents to the emergency department with a 3-day history of dysuria, meatal pain, and a profuse yellow urethral discharge. He admits to unprotected sexual intercourse with a sex worker 1 week ago. On examination, he has a purulent urethral discharge, and a Gram stain of the discharge shows intracellular gram-negative diplococci. His pregnant wife (28 weeks gestation) is asymptomatic but accompanies him. \n\n(a) Identify the most likely diagnosis and causative agent. (2 marks)\n(b) Explain your answer in (a) above. (4 marks)\n(c) Prepare treatment plans for both the patient and his wife. (4 marks)\n(d) Outline three parameters that you would use to monitor response to treatment for both the patient and his wife. (3 marks)\n(e) Identify one antimicrobial drug that is effective for this condition but is contraindicated in the wife because of pregnancy. Give the reason for the contraindication. (2 marks)\n(f) Assuming the patient presented within 72 hours of sexual contact, outline any other therapy he would have benefited from. Include the drug regimen and duration of therapy. (3 marks)\n(g) List two adverse effects associated with the therapy in (f) that you would watch out for. (2 marks)\n(h) The patient is diagnosed with primary syphilis 3 years later. Outline two possible complications of syphilis in this patient. (2 marks)",
              "modelAnswer": {
                "a": "Most likely diagnosis: Gonorrhea (Neisseria gonorrhoeae infection). Causative agent: Neisseria gonorrhoeae.",
                "b": "Explanation:\n1. **Clinical presentation**: Dysuria, meatal pain, and purulent urethral discharge are classic symptoms of gonococcal urethritis.\n2. **Gram stain**: Intracellular gram-negative diplococci on Gram stain of urethral discharge are diagnostic of Neisseria gonorrhoeae.\n3. **Risk factors**: Unprotected sexual intercourse with a sex worker is a major risk factor for gonorrhea.\n4. **Incubation period**: Symptoms typically appear 2–7 days after exposure, consistent with the patient's history.",
                "c": "Treatment plans:\n**For the patient (D.S.)**:\n- **First-line therapy**: Ceftriaxone 500 mg IM as a single dose.\n- **Chlamydia co-treatment**: Azithromycin 1 g orally as a single dose (due to high prevalence of co-infection with Chlamydia trachomatis).\n\n**For the wife (C.S., pregnant)**:\n- **First-line therapy**: Azithromycin 1 g orally as a single dose (safe in pregnancy).\n- **Alternative**: Amoxicillin 500 mg orally three times daily for 7 days (if allergic to azithromycin).\n\n**Additional measures**:\n- **Partner notification**: Advise D.S. to inform all sexual partners for testing and treatment.\n- **Counseling**: Provide safe sex counseling and condom use education.",
                "d": "Parameters to monitor response to treatment:\n1. **Clinical improvement**: Resolution of dysuria, meatal pain, and urethral discharge within 3–7 days.\n2. **Microbiologic clearance**: Repeat Gram stain or nucleic acid amplification test (NAAT) 1–2 weeks post-treatment to confirm eradication of Neisseria gonorrhoeae.\n3. **Symptom resolution in wife**: Asymptomatic wife should be monitored for any signs of infection (e.g., vaginal discharge, dysuria) during follow-up.",
                "e": "Contraindicated drug in pregnancy: **Doxycycline**.\nReason: Doxycycline is contraindicated in pregnancy due to its association with fetal skeletal abnormalities and tooth discoloration.",
                "f": "Post-exposure prophylaxis (if presented within 72 hours):\n- **Regimen**: Ceftriaxone 500 mg IM as a single dose + azithromycin 1 g orally as a single dose.\n- **Duration**: Single-dose therapy (no extended duration required).\n- **Rationale**: Early administration of antibiotics can prevent infection if given within the incubation period.",
                "g": "Adverse effects to watch for with therapy in (f):\n1. **Ceftriaxone**: Hypersensitivity reactions (e.g., rash, anaphylaxis), injection site reactions, or rarely, biliary sludging.\n2. **Azithromycin**: Gastrointestinal upset (e.g., nausea, vomiting, diarrhea), QT prolongation (rare), or allergic reactions.",
                "h": "Possible complications of syphilis:\n1. **Neurosyphilis**: Can occur at any stage and may lead to meningitis, stroke, or cognitive decline.\n2. **Cardiovascular syphilis**: Can cause aortic aneurysms, aortic regurgitation, or coronary artery disease."
              }
            }
          ]
        }
      ]
    }
  },
  "exam-respiratory-renal": {
    "1": {
      "title": "Clinical Pharmacy — Respiratory & Renal",
      "variant": 1,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 65-year-old male with a 20-pack-year smoking history presents with chronic cough, sputum production, and dyspnea on exertion. Spirometry reveals an FEV1/FVC ratio of 0.65 and an FEV1 of 55% predicted. Which of the following is the most likely diagnosis?",
              "options": [
                "Asthma",
                "Chronic obstructive pulmonary disease (COPD)",
                "Interstitial lung disease",
                "Pulmonary embolism",
                "Heart failure"
              ],
              "answer": "Chronic obstructive pulmonary disease (COPD)",
              "explanation": "COPD is characterized by persistent respiratory symptoms and airflow limitation due to airway and/or alveolar abnormalities, typically caused by significant exposure to noxious particles or gases (e.g., smoking)."
            },
            {
              "stem": "Which of the following is the primary pathophysiological mechanism driving airflow limitation in COPD?",
              "options": [
                "Bronchial smooth muscle contraction",
                "Mucus gland hypertrophy and hypersecretion",
                "Destruction of lung parenchyma (emphysema)",
                "Chronic inflammation of the airways",
                "Allergic sensitization"
              ],
              "answer": "Destruction of lung parenchyma (emphysema)",
              "explanation": "Emphysema, a key component of COPD, involves the destruction of alveoli and lung parenchyma, leading to loss of elastic recoil and airflow limitation."
            },
            {
              "stem": "A 45-year-old female with a history of asthma presents with worsening symptoms despite using her salbutamol inhaler 3-4 times daily. She reports nighttime awakenings 3 times per week and reduced exercise tolerance. According to GINA guidelines, what is the most appropriate next step in her management?",
              "options": [
                "Add a leukotriene receptor antagonist",
                "Increase salbutamol dose to 6 puffs per day",
                "Start inhaled corticosteroids (ICS) as maintenance therapy",
                "Prescribe oral prednisolone for 7 days",
                "Refer for bronchial thermoplasty"
              ],
              "answer": "Start inhaled corticosteroids (ICS) as maintenance therapy",
              "explanation": "GINA guidelines recommend initiating ICS as maintenance therapy for patients with asthma symptoms occurring 3-4 times weekly or nighttime awakenings ≥3 times monthly."
            },
            {
              "stem": "Which of the following adverse effects is most commonly associated with long-term use of inhaled corticosteroids in asthma management?",
              "options": [
                "Osteoporosis",
                "Hyperglycemia",
                "Oral candidiasis",
                "Tachycardia",
                "Hypotension"
              ],
              "answer": "Oral candidiasis",
              "explanation": "Inhaled corticosteroids can cause local immunosuppression in the oropharynx, leading to oral candidiasis (thrush)."
            },
            {
              "stem": "A 50-year-old male with COPD (FEV1 40% predicted) is admitted with an acute exacerbation. Which of the following is the most appropriate initial pharmacological intervention?",
              "options": [
                "Oral prednisolone 30 mg daily for 5 days",
                "Intravenous theophylline loading dose",
                "Inhaled short-acting beta-agonist (SABA) + short-acting muscarinic antagonist (SAMA)",
                "Intravenous magnesium sulfate",
                "Oral codeine for cough suppression"
              ],
              "answer": "Inhaled short-acting beta-agonist (SABA) + short-acting muscarinic antagonist (SAMA)",
              "explanation": "SABA and SAMA are first-line bronchodilators for acute COPD exacerbations to relieve bronchospasm."
            },
            {
              "stem": "Which of the following statements about theophylline is FALSE?",
              "options": [
                "It has a narrow therapeutic index requiring therapeutic drug monitoring",
                "It is a first-line agent for COPD due to its bronchodilatory effects",
                "It can cause seizures and cardiac arrhythmias at toxic levels",
                "It has significant drug interactions with cytochrome P450 inducers/inhibitors",
                "It is metabolized hepatically and excreted renally"
              ],
              "answer": "It is a first-line agent for COPD due to its bronchodilatory effects",
              "explanation": "Theophylline is no longer a first-line agent for COPD due to its narrow therapeutic index, potential for toxicity, and numerous drug interactions."
            },
            {
              "stem": "A 60-year-old female with stage 3 CKD (eGFR 45 mL/min/1.73m²) presents with hypertension and edema. Which of the following diuretics is most appropriate for managing her fluid overload?",
              "options": [
                "Hydrochlorothiazide",
                "Furosemide",
                "Spironolactone",
                "Amiloride",
                "Mannitol"
              ],
              "answer": "Furosemide",
              "explanation": "Furosemide is a loop diuretic effective in patients with moderate to severe CKD (eGFR <60 mL/min/1.73m²) for managing fluid overload."
            },
            {
              "stem": "Which of the following is a key risk factor for the development of chronic kidney disease (CKD)?",
              "options": [
                "Hyperlipidemia",
                "Hypothyroidism",
                "Hypertension",
                "Osteoarthritis",
                "Migraine"
              ],
              "answer": "Hypertension",
              "explanation": "Hypertension is a major modifiable risk factor for CKD, contributing to glomerular damage and progressive renal dysfunction."
            },
            {
              "stem": "A 55-year-old male with COPD is prescribed ipratropium bromide via a metered-dose inhaler. Which of the following adverse effects is most likely to occur with this medication?",
              "options": [
                "Tachycardia",
                "Hyperkalemia",
                "Dry mouth",
                "Hypotension",
                "Constipation"
              ],
              "answer": "Dry mouth",
              "explanation": "Ipratropium bromide is an anticholinergic agent that commonly causes dry mouth due to its parasympatholytic effects."
            },
            {
              "stem": "Which of the following statements about smoking cessation therapy is TRUE?",
              "options": [
                "Varenicline is contraindicated in patients with a history of depression",
                "Bupropion is a nicotine receptor partial agonist",
                "Nicotine replacement therapy (NRT) is contraindicated in patients with cardiovascular disease",
                "Varenicline reduces nicotine cravings by acting as a partial agonist at α4β2 nicotinic acetylcholine receptors",
                "Bupropion is contraindicated in patients with a history of seizures"
              ],
              "answer": "Varenicline reduces nicotine cravings by acting as a partial agonist at α4β2 nicotinic acetylcholine receptors",
              "explanation": "Varenicline is a partial agonist at α4β2 nicotinic acetylcholine receptors, reducing nicotine cravings and withdrawal symptoms."
            },
            {
              "stem": "A 40-year-old female with asthma is prescribed a combination inhaler containing fluticasone and salmeterol. Which of the following statements best describes the rationale for this combination?",
              "options": [
                "Salmeterol provides rapid bronchodilation, while fluticasone reduces airway inflammation",
                "Fluticasone provides rapid bronchodilation, while salmeterol reduces airway inflammation",
                "The combination is more effective than either agent alone due to complementary mechanisms",
                "Salmeterol is a rescue medication, while fluticasone is a controller medication",
                "The combination is used only in patients with severe COPD"
              ],
              "answer": "The combination is more effective than either agent alone due to complementary mechanisms",
              "explanation": "Combining an inhaled corticosteroid (fluticasone) with a long-acting beta-agonist (salmeterol) provides both anti-inflammatory and bronchodilatory effects, improving asthma control."
            },
            {
              "stem": "Which of the following is the most appropriate spirometric finding in a patient with moderate asthma?",
              "options": [
                "FEV1/FVC ratio >0.80, FEV1 60% predicted",
                "FEV1/FVC ratio <0.70, FEV1 85% predicted",
                "FEV1/FVC ratio >0.80, FEV1 40% predicted",
                "FEV1/FVC ratio <0.70, FEV1 50% predicted",
                "FEV1/FVC ratio >0.70, FEV1 90% predicted"
              ],
              "answer": "FEV1/FVC ratio <0.70, FEV1 50% predicted",
              "explanation": "Moderate asthma is characterized by an FEV1/FVC ratio <0.70 and an FEV1 between 40-69% predicted."
            },
            {
              "stem": "A 70-year-old male with stage 4 CKD (eGFR 20 mL/min/1.73m²) is prescribed a medication that requires dose adjustment in renal impairment. Which of the following medications would NOT require dose adjustment in this patient?",
              "options": [
                "Metformin",
                "Vancomycin",
                "Digoxin",
                "Amlodipine",
                "Furosemide"
              ],
              "answer": "Amlodipine",
              "explanation": "Amlodipine is metabolized hepatically and does not require dose adjustment in renal impairment."
            },
            {
              "stem": "Which of the following is a key complication of chronic kidney disease (CKD) that requires monitoring and management?",
              "options": [
                "Hypercalcemia",
                "Hypophosphatemia",
                "Secondary hyperparathyroidism",
                "Hypokalemia",
                "Metabolic alkalosis"
              ],
              "answer": "Secondary hyperparathyroidism",
              "explanation": "Secondary hyperparathyroidism is a common complication of CKD due to impaired phosphate excretion and reduced vitamin D activation, leading to hyperphosphatemia and hypocalcemia."
            },
            {
              "stem": "A 55-year-old female with COPD is prescribed tiotropium bromide. Which of the following statements about tiotropium is TRUE?",
              "options": [
                "It is a short-acting beta-agonist",
                "It is administered via a metered-dose inhaler twice daily",
                "It is a long-acting muscarinic antagonist (LAMA)",
                "It is contraindicated in patients with glaucoma",
                "It has a rapid onset of action (within 5 minutes)"
              ],
              "answer": "It is a long-acting muscarinic antagonist (LAMA)",
              "explanation": "Tiotropium is a long-acting muscarinic antagonist (LAMA) used for maintenance bronchodilation in COPD."
            },
            {
              "stem": "Which of the following is the most appropriate first-line therapy for a patient presenting with an acute asthma exacerbation?",
              "options": [
                "Oral prednisolone 30 mg daily for 5 days",
                "Intravenous magnesium sulfate",
                "Inhaled short-acting beta-agonist (SABA) via nebulizer",
                "Oral theophylline",
                "Intramuscular adrenaline"
              ],
              "answer": "Inhaled short-acting beta-agonist (SABA) via nebulizer",
              "explanation": "SABA via nebulizer is the first-line therapy for acute asthma exacerbations to provide rapid bronchodilation."
            },
            {
              "stem": "A 60-year-old male with CKD stage 3 (eGFR 45 mL/min/1.73m²) is prescribed simvastatin for dyslipidemia. Which of the following monitoring parameters is most important in this patient?",
              "options": [
                "Serum potassium levels",
                "Liver function tests (LFTs)",
                "Serum magnesium levels",
                "Serum calcium levels",
                "Serum phosphate levels"
              ],
              "answer": "Liver function tests (LFTs)",
              "explanation": "Statins, including simvastatin, can cause hepatotoxicity, so LFTs should be monitored, especially in patients with CKD."
            },
            {
              "stem": "Which of the following is a key feature of the pathophysiology of asthma?",
              "options": [
                "Destruction of lung parenchyma",
                "Chronic neutrophilic inflammation",
                "Airway hyper-responsiveness",
                "Pulmonary hypertension",
                "Alveolar fibrosis"
              ],
              "answer": "Airway hyper-responsiveness",
              "explanation": "Airway hyper-responsiveness is a hallmark of asthma, leading to bronchoconstriction and symptoms such as wheezing and dyspnea."
            },
            {
              "stem": "A 45-year-old female with COPD is prescribed a combination of inhaled corticosteroids (ICS) and long-acting beta-agonists (LABA). Which of the following statements is TRUE regarding this combination?",
              "options": [
                "ICS alone is sufficient for managing COPD",
                "LABA alone is sufficient for managing COPD",
                "The combination reduces exacerbations and improves lung function in COPD",
                "The combination is contraindicated in patients with asthma",
                "The combination is only used in patients with severe asthma"
              ],
              "answer": "The combination reduces exacerbations and improves lung function in COPD",
              "explanation": "Combining ICS and LABA in COPD can reduce exacerbations and improve lung function, particularly in patients with frequent exacerbations or severe airflow limitation."
            },
            {
              "stem": "Which of the following is the most appropriate intervention for a patient with CKD who develops hyperkalemia (serum potassium 6.0 mEq/L)?",
              "options": [
                "Administer intravenous calcium gluconate",
                "Administer oral potassium supplements",
                "Administer intravenous insulin and glucose",
                "Administer oral sodium polystyrene sulfonate",
                "Administer intravenous furosemide"
              ],
              "answer": "Administer intravenous insulin and glucose",
              "explanation": "Intravenous insulin and glucose can rapidly shift potassium intracellularly, reducing serum potassium levels in hyperkalemia."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "List the key components of a comprehensive asthma management plan according to GINA guidelines.",
              "modelAnswer": "1. Assessment and monitoring of asthma control and risk factors.\n2. Patient education on asthma, its triggers, and the importance of adherence.\n3. Development of a personalized asthma action plan (including daily controller medications and rescue medications).\n4. Identification and avoidance of asthma triggers (e.g., allergens, smoke, cold air).\n5. Use of inhaled corticosteroids (ICS) as the cornerstone of maintenance therapy.\n6. Addition of long-acting beta-agonists (LABA) or other controllers (e.g., leukotriene modifiers) for patients not controlled on ICS alone.\n7. Regular follow-up and adjustment of therapy based on asthma control.\n8. Vaccination against influenza and pneumococcal disease.\n9. Management of comorbidities (e.g., allergic rhinitis, GERD).\n10. Smoking cessation support if applicable."
            },
            {
              "stem": "Outline the steps involved in the accurate use of a dry powder inhaler (DPI) for asthma management.",
              "modelAnswer": "1. Remove the cap and load the dose (if required).\n2. Hold the inhaler upright and exhale fully to empty the lungs.\n3. Seal lips tightly around the mouthpiece.\n4. Inhale deeply and forcefully through the mouth (do not inhale through the nose).\n5. Hold breath for 5-10 seconds to allow medication deposition in the lungs.\n6. Exhale slowly through the nose.\n7. Replace the cap and rinse mouth (if using corticosteroids) to reduce the risk of oral candidiasis.\n8. Clean the inhaler as per manufacturer instructions.\n9. Check the dose counter (if available) to ensure the correct number of doses remain.\n10. Store the inhaler in a dry place away from moisture."
            },
            {
              "stem": "What are the key complications of chronic obstructive pulmonary disease (COPD)?",
              "modelAnswer": "1. **Acute exacerbations**: Sudden worsening of symptoms (e.g., increased dyspnea, sputum volume, or purulence), often requiring hospitalization.\n2. **Respiratory failure**: Hypoxemia (PaO2 <60 mmHg) and/or hypercapnia (PaCO2 >50 mmHg), leading to acute or chronic respiratory failure.\n3. **Cor pulmonale**: Right ventricular hypertrophy and failure due to pulmonary hypertension from chronic hypoxia.\n4. **Secondary polycythemia**: Increased red blood cell production due to chronic hypoxia.\n5. **Pneumothorax**: Rupture of emphysematous bullae, leading to lung collapse.\n6. **Pulmonary hypertension**: Increased pulmonary artery pressure due to hypoxic vasoconstriction and vascular remodeling.\n7. **Infections**: Increased susceptibility to respiratory infections (e.g., pneumonia, bronchitis).\n8. **Cachexia and muscle wasting**: Due to increased metabolic demand and reduced nutritional intake.\n9. **Depression and anxiety**: Common due to the chronic and debilitating nature of the disease.\n10. **Osteoporosis**: Due to chronic steroid use, reduced mobility, and vitamin D deficiency."
            },
            {
              "stem": "What monitoring parameters are required for the effective follow-up of patients with asthma?",
              "modelAnswer": "1. **Symptom control**: Frequency of daytime/nighttime symptoms, reliever use, and activity limitation.\n2. **Lung function**: Spirometry (FEV1, FVC, FEV1/FVC ratio) and peak expiratory flow (PEF) monitoring.\n3. **Exacerbations**: Number and severity of acute exacerbations requiring oral corticosteroids or hospitalization.\n4. **Adherence**: Assessment of medication adherence and inhaler technique.\n5. **Side effects**: Monitoring for adverse effects of medications (e.g., oral candidiasis with ICS, tremor with SABA).\n6. **Comorbidities**: Assessment and management of conditions that may worsen asthma (e.g., allergic rhinitis, GERD, obesity).\n7. **Quality of life**: Impact of asthma on daily activities, work, and sleep.\n8. **Vaccination status**: Up-to-date influenza and pneumococcal vaccination.\n9. **Environmental triggers**: Identification and avoidance of triggers (e.g., allergens, smoke, occupational exposures).\n10. **Biomarkers**: Fractional exhaled nitric oxide (FeNO) in selected patients to assess eosinophilic inflammation."
            },
            {
              "stem": "Briefly discuss the management of a common cold.",
              "modelAnswer": "1. **Supportive care**: Rest, hydration, and symptomatic relief (e.g., analgesia for headache or sore throat).\n2. **Antipyretics/analgesics**: Paracetamol or NSAIDs (e.g., ibuprofen) for fever, headache, or myalgia.\n3. **Decongestants**: Oral (e.g., pseudoephedrine) or topical (e.g., oxymetazoline) for nasal congestion (use topical for ≤3 days to avoid rebound congestion).\n4. **Antihistamines**: First-generation (e.g., diphenhydramine) for rhinorrhea and sneezing, but may cause sedation.\n5. **Intranasal corticosteroids**: (e.g., fluticasone) for allergic rhinitis symptoms if present.\n6. **Antitussives**: (e.g., dextromethorphan) for dry, non-productive cough.\n7. **Expectorants**: (e.g., guaifenesin) for productive cough to thin mucus.\n8. **Avoid antibiotics**: Common cold is viral; antibiotics are ineffective and may contribute to resistance.\n9. **Zinc lozenges**: May reduce duration of symptoms if taken early.\n10. **Hand hygiene and infection control**: Prevent spread of the virus."
            },
            {
              "stem": "Briefly discuss the clinical presentation of chronic renal failure.",
              "modelAnswer": "1. **Early symptoms (often non-specific)**: Fatigue, weakness, malaise, and reduced exercise tolerance.\n2. **Fluid and electrolyte imbalances**: Edema, hypertension, hyperkalemia (palpitations, muscle weakness), metabolic acidosis (nausea, vomiting, hyperventilation).\n3. **Uremic symptoms**: Nausea, vomiting, anorexia, metallic taste in mouth, pruritus, and confusion (due to accumulation of uremic toxins).\n4. **Cardiovascular manifestations**: Hypertension, heart failure, pericarditis (chest pain, friction rub), and arrhythmias (due to electrolyte imbalances).\n5. **Hematological abnormalities**: Anemia (pallor, fatigue) due to reduced erythropoietin production, and bleeding tendencies (e.g., epistaxis, easy bruising).\n6. **Neurological symptoms**: Peripheral neuropathy (tingling, numbness), restless legs syndrome, and seizures (in advanced stages).\n7. **Gastrointestinal symptoms**: Anorexia, nausea, vomiting, and hiccups.\n8. **Dermatological manifestations**: Dry skin, pruritus, and uremic frost (crystallized urea on skin in advanced CKD).\n9. **Endocrine abnormalities**: Secondary hyperparathyroidism (bone pain, fractures), insulin resistance, and menstrual irregularities.\n10. **Laboratory findings**: Elevated serum creatinine and urea, hyperkalemia, metabolic acidosis, hypocalcemia, hyperphosphatemia, and anemia."
            },
            {
              "stem": "Briefly discuss the management of acute respiratory distress syndrome (ARDS).",
              "modelAnswer": "1. **Identify and treat the underlying cause**: Sepsis, pneumonia, trauma, or aspiration.\n2. **Supportive care**: Oxygen therapy (initially via nasal cannula or mask, escalate to high-flow nasal cannula or noninvasive ventilation if needed).\n3. **Mechanical ventilation**: Lung-protective ventilation (low tidal volume 6 mL/kg ideal body weight, plateau pressure ≤30 cm H2O) to avoid ventilator-induced lung injury.\n4. **Prone positioning**: For severe ARDS (PaO2/FiO2 <150 mmHg) to improve oxygenation.\n5. **Fluid management**: Conservative fluid strategy to avoid fluid overload (use diuretics if necessary).\n6. **Vasopressors**: (e.g., norepinephrine) for hypotension or shock.\n7. **Nutritional support**: Early enteral nutrition (preferred) or parenteral nutrition if enteral is contraindicated.\n8. **Sedation and analgesia**: To facilitate mechanical ventilation and reduce oxygen consumption.\n9. **Pharmacological interventions**: Consider neuromuscular blockade (e.g., cisatracurium) for severe ARDS to improve ventilator synchrony.\n10. **Monitoring**: Continuous monitoring of oxygenation (SpO2, PaO2/FiO2 ratio), hemodynamics, and complications (e.g., barotrauma, ventilator-associated pneumonia)."
            },
            {
              "stem": "Briefly discuss the management of acute renal failure (ARF).",
              "modelAnswer": "1. **Identify and treat the underlying cause**: Prerenal (e.g., hypovolemia, shock), intrinsic (e.g., acute tubular necrosis, glomerulonephritis), or postrenal (e.g., urinary obstruction).\n2. **Fluid resuscitation**: IV fluids (e.g., normal saline) for prerenal causes to restore renal perfusion.\n3. **Discontinue nephrotoxic drugs**: (e.g., NSAIDs, ACE inhibitors, aminoglycosides, contrast agents).\n4. **Monitor and correct electrolyte imbalances**: Hyperkalemia (e.g., insulin/glucose, calcium gluconate, sodium polystyrene sulfonate), metabolic acidosis (e.g., sodium bicarbonate), and hyperphosphatemia.\n5. **Diuretics**: Loop diuretics (e.g., furosemide) for fluid overload, but avoid in prerenal azotemia unless volume overload is present.\n6. **Renal replacement therapy (RRT)**: Indicated for severe hyperkalemia, metabolic acidosis, fluid overload, uremic symptoms, or refractory electrolyte imbalances.\n7. **Nutritional support**: Restrict protein intake (0.6-0.8 g/kg/day) in non-dialysis patients to reduce uremic toxin production; consider early enteral nutrition.\n8. **Monitoring**: Daily serum creatinine, urea, electrolytes, fluid balance, and urine output. Assess for complications (e.g., infections, bleeding).\n9. **Avoidance of further injury**: Ensure adequate hydration before procedures involving contrast agents; use isotonic saline or sodium bicarbonate for prophylaxis.\n10. **Follow-up**: Transition to chronic kidney disease management if ARF does not resolve."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "Mr. Barasa, a 45-year-old road works contractor, presents with a one-month history of daily cough, wheezing, dyspnea, and chest tightness. He reports nighttime symptoms twice weekly and uses his salbutamol inhaler for relief. He also occasionally uses oral salbutamol tablets and prednisolone tablets but experiences tremors and palpitations. Last night, his inhaler was ineffective, and he had a troublesome night.\n\n1. What condition is Mr. Barasa suffering from? (2 Marks)\n2. How would you classify the condition and why? (2 Marks)\n3. Giving examples, describe the classes of medication that Mr. Barasa would benefit from? (8 Marks)\n4. What interventions would you make with regards to his current medication? (3 Marks)\n5. What side effects would you counsel the patient on before starting them on your choice of medication? (5 Marks)",
              "modelAnswer": "### 1. Diagnosis\nMr. Barasa is suffering from **asthma**, characterized by chronic airway inflammation, reversible airflow limitation, and symptoms such as wheezing, dyspnea, chest tightness, and cough, which vary over time and intensity.\n\n### 2. Classification and Rationale\nMr. Barasa’s asthma is **moderate persistent** based on:\n- **Symptoms**: Daily symptoms (cough, wheezing, dyspnea) and nighttime awakenings ≥2 times per week.\n- **Lung function**: Likely reduced FEV1 (though spirometry results are not provided, his symptoms suggest airflow limitation).\n- **Impact on daily life**: Symptoms interfere with work and daily activities.\n- **Rescue medication use**: Frequent use of salbutamol inhaler (indicating poor control).\n\nAccording to GINA guidelines, moderate persistent asthma is defined by daily symptoms, nighttime awakenings ≥1 time per week, and some limitation in normal activity.\n\n### 3. Classes of Medication Beneficial for Mr. Barasa\nMr. Barasa would benefit from the following classes of medications, tailored to his moderate persistent asthma:\n\n#### **Controller Medications (Daily Use)**\n1. **Inhaled Corticosteroids (ICS)**:\n   - **Examples**: Fluticasone, budesonide, beclomethasone.\n   - **Rationale**: ICS are the cornerstone of asthma maintenance therapy, reducing airway inflammation and preventing exacerbations. For moderate persistent asthma, a low-to-medium dose ICS (e.g., fluticasone 100–250 mcg twice daily) is recommended.\n   - **Advantages**: Reduce symptoms, improve lung function, and decrease the risk of exacerbations.\n\n2. **Long-Acting Beta-Agonists (LABA)**:\n   - **Examples**: Salmeterol, formoterol.\n   - **Rationale**: LABAs are used in combination with ICS for patients not controlled on ICS alone. They provide sustained bronchodilation (e.g., salmeterol/fluticasone combination inhaler).\n   - **Advantages**: Improve symptom control and reduce exacerbations when used with ICS.\n\n3. **Leukotriene Receptor Antagonists (LTRA)**:\n   - **Examples**: Montelukast.\n   - **Rationale**: LTRA can be used as an alternative or add-on therapy for patients with mild-to-moderate asthma, particularly those with allergic components or exercise-induced symptoms.\n   - **Advantages**: Oral administration, useful for patients with poor inhaler technique.\n\n#### **Reliever Medication (As Needed)**\n4. **Short-Acting Beta-Agonists (SABA)**:\n   - **Examples**: Salbutamol (albuterol), terbutaline.\n   - **Rationale**: SABA provides rapid bronchodilation for acute symptom relief (e.g., salbutamol 100–200 mcg via metered-dose inhaler as needed).\n   - **Advantages**: Rapid onset of action (within minutes).\n\n#### **Additional Considerations**\n5. **Oral Corticosteroids (Short Burst)**:\n   - **Examples**: Prednisolone (20–40 mg daily for 5–7 days).\n   - **Rationale**: Used for acute exacerbations or severe symptoms unresponsive to inhaled therapy.\n   - **Advantages**: Rapid anti-inflammatory effects.\n\n6. **Biologics (if indicated)**:\n   - **Examples**: Omalizumab (anti-IgE), mepolizumab (anti-IL-5).\n   - **Rationale**: For severe asthma with specific phenotypes (e.g., allergic asthma or eosinophilic asthma) unresponsive to standard therapy.\n\n### 4. Interventions Regarding Current Medication\n1. **Discontinue oral salbutamol and prednisolone**: These are not recommended for routine use in asthma due to systemic side effects (e.g., tremors, palpitations, and long-term risks of oral corticosteroids).\n2. **Initiate ICS + LABA combination therapy**: Prescribe a fixed-dose combination inhaler (e.g., fluticasone/salmeterol 100/50 mcg twice daily) for maintenance therapy.\n3. **Provide a SABA inhaler for rescue use**: Prescribe salbutamol 100 mcg metered-dose inhaler, 1–2 puffs as needed for acute symptoms.\n4. **Educate on proper inhaler technique**: Ensure Mr. Barasa can demonstrate correct use of the metered-dose inhaler or dry powder inhaler.\n5. **Develop an asthma action plan**: Provide clear instructions on when to increase therapy (e.g., doubling ICS dose) or seek medical help during exacerbations.\n\n### 5. Side Effects to Counsel the Patient On\nBefore starting ICS + LABA combination therapy, counsel Mr. Barasa on the following side effects:\n\n#### **Inhaled Corticosteroids (ICS)**\n- **Oral candidiasis (thrush)**: Rinse mouth with water after each use and use a spacer device to reduce deposition in the oropharynx.\n- **Hoarseness or throat irritation**: Use a spacer and rinse mouth after inhalation.\n- **Systemic effects (rare with inhaled use)**: Adrenal suppression, osteoporosis, and cataracts with long-term high-dose use.\n\n#### **Long-Acting Beta-Agonists (LABA)**\n- **Tremors**: Due to beta-2 receptor stimulation in skeletal muscle.\n- **Palpitations or tachycardia**: Monitor heart rate; report if severe or persistent.\n- **Hypokalemia**: Rare but possible with high doses or in combination with other beta-agonists.\n- **Paradoxical bronchospasm**: Rare; discontinue and seek medical help if wheezing worsens after inhalation.\n\n#### **General Counseling Points**\n- **Adherence**: Emphasize the importance of daily use of controller medications, even when asymptomatic.\n- **Monitoring**: Teach him to monitor his symptoms and peak expiratory flow (PEF) to assess control.\n- **When to seek help**: Instruct him to seek medical attention if symptoms worsen, if rescue medication use increases, or if nighttime symptoms persist.\n- **Avoid triggers**: Identify and avoid triggers such as dust, smoke, cold air, and respiratory infections.\n- **Vaccinations**: Recommend annual influenza vaccination and pneumococcal vaccination (if not up to date)."
            },
            {
              "stem": "Catherine, a 50-year-old cook, presents with a 6-month history of cough, severe dyspnea, and production of copious amounts of sputum. On examination, she has cyanosis, tachypnea, digital clubbing, and uses accessory muscles to breathe. She sells githeri and uji to construction workers around her home.\n\n1. What is Catherine likely to be suffering from? (2 Marks)\n2. What are some of the investigations that you would request for Catherine? (5 Marks)\n3. What classes of medication would you recommend for Catherine? (8 Marks)\n4. What non-pharmacological interventions would you recommend for the patient? (5 Marks)",
              "modelAnswer": "### 1. Likely Diagnosis\nCatherine is likely suffering from **chronic obstructive pulmonary disease (COPD)**, specifically **chronic bronchitis with emphysema**. This is supported by:\n- **Chronic productive cough** for 6 months (meeting the definition of chronic bronchitis).\n- **Severe dyspnea** and **copious sputum production**.\n- **Cyanosis** (indicating hypoxia) and **use of accessory muscles** (indicating respiratory distress).\n- **Digital clubbing** (a sign of chronic hypoxia and lung disease).\n- **Occupational history**: Exposure to biomass fuel smoke (from cooking with githeri and uji for construction workers) is a significant risk factor for COPD.\n\n### 2. Investigations\nTo confirm the diagnosis and assess the severity of COPD, the following investigations are recommended:\n\n1. **Spirometry**:\n   - **FEV1/FVC ratio <0.70** (post-bronchodilator) confirms persistent airflow limitation.\n   - **FEV1 % predicted**: To classify the severity of COPD (e.g., mild: FEV1 ≥80%; moderate: 50–79%; severe: 30–49%; very severe: <30%).\n\n2. **Chest X-ray**:\n   - To rule out other conditions (e.g., pneumonia, lung cancer) and assess for signs of COPD (e.g., hyperinflation, flattened diaphragm, increased retrosternal space).\n\n3. **Arterial Blood Gas (ABG) Analysis**:\n   - To assess for **hypoxemia (PaO2 <60 mmHg)** and **hypercapnia (PaCO2 >50 mmHg)**, indicating respiratory failure.\n\n4. **Complete Blood Count (CBC)**:\n   - To assess for **polycythemia** (elevated hemoglobin/hematocrit due to chronic hypoxia).\n\n5. **Alpha-1 Antitrypsin (AAT) Levels**:\n   - If there is a family history of COPD or early-onset COPD, to rule out AAT deficiency.\n\n6. **Electrocardiogram (ECG)**:\n   - To assess for **cor pulmonale** (right ventricular hypertrophy or strain due to pulmonary hypertension).\n\n7. **Echocardiogram**:\n   - To evaluate cardiac function and assess for **pulmonary hypertension** or **right heart failure**.\n\n8. **Sputum Culture and Sensitivity**:\n   - To identify bacterial pathogens in the event of an acute exacerbation.\n\n9. **Pulse Oximetry**:\n   - To assess oxygen saturation (SpO2). A value <90% may indicate the need for long-term oxygen therapy (LTOT).\n\n10. **Body Mass Index (BMI) and Nutritional Assessment**:\n    - To assess for **cachexia** or malnutrition, common in advanced COPD.\n\n### 3. Classes of Medication Recommended for Catherine\nCatherine’s management should focus on **symptom relief, improving quality of life, reducing exacerbations, and slowing disease progression**. The following classes of medications are recommended:\n\n#### **Bronchodilators (Cornerstone of COPD Management)**\n1. **Long-Acting Muscarinic Antagonists (LAMA)**:\n   - **Examples**: Tiotropium, aclidinium.\n   - **Rationale**: LAMA provide sustained bronchodilation by blocking muscarinic receptors, reducing cholinergic-mediated bronchoconstriction. Tiotropium is preferred for maintenance therapy in COPD.\n   - **Advantages**: Once-daily dosing, reduces exacerbations, and improves symptoms and lung function.\n\n2. **Long-Acting Beta-Agonists (LABA)**:\n   - **Examples**: Formoterol, salmeterol, indacaterol.\n   - **Rationale**: LABA provide sustained bronchodilation by stimulating beta-2 receptors in the airways. Can be used alone or in combination with LAMA.\n   - **Advantages**: Improve symptoms, exercise tolerance, and reduce exacerbations.\n\n3. **Combination LAMA/LABA**:\n   - **Examples**: Tiotropium/olodaterol, umeclidinium/vilanterol.\n   - **Rationale**: Combination therapy may provide greater bronchodilation and symptom relief than monotherapy.\n\n#### **Inhaled Corticosteroids (ICS)**\n4. **ICS + LABA Combination**:\n   - **Examples**: Fluticasone/salmeterol, budesonide/formoterol.\n   - **Rationale**: ICS are added to LABA in patients with **frequent exacerbations** (e.g., ≥2 per year) or those with **asthma-COPD overlap (ACO)**. ICS reduce airway inflammation and exacerbations.\n   - **Caution**: ICS monotherapy is **not recommended** in COPD due to increased risk of pneumonia.\n\n#### **Phosphodiesterase-4 Inhibitors**\n5. **Roflumilast**:\n   - **Rationale**: For patients with **severe COPD (FEV1 <50% predicted)** and a history of **frequent exacerbations** (e.g., ≥2 per year), particularly with chronic bronchitis.\n   - **Mechanism**: Reduces inflammation by inhibiting phosphodiesterase-4.\n   - **Advantages**: Reduces exacerbations and improves lung function.\n   - **Side effects**: Diarrhea, weight loss, nausea, and psychiatric effects (e.g., insomnia, anxiety).\n\n#### **Mucolytics**\n6. **N-Acetylcysteine (NAC) or Carbocysteine**:\n   - **Rationale**: For patients with **chronic productive cough** to thin mucus and improve expectoration.\n   - **Advantages**: May reduce exacerbations in some patients.\n   - **Side effects**: Nausea, vomiting, and diarrhea.\n\n#### **Oxygen Therapy**\n7. **Long-Term Oxygen Therapy (LTOT)**:\n   - **Criteria**: For patients with **chronic hypoxemia (PaO2 <55 mmHg or <60 mmHg with cor pulmonale or polycythemia)**.\n   - **Rationale**: LTOT improves survival and quality of life in hypoxemic patients.\n   - **Administration**: 15–19 hours/day via nasal cannula or oxygen concentrator.\n\n#### **Vaccinations**\n8. **Influenza and Pneumococcal Vaccination**:\n   - **Rationale**: Reduces the risk of respiratory infections, which are a common trigger for COPD exacerbations.\n\n#### **Rescue Medications**\n9. **Short-Acting Beta-Agonists (SABA) or Short-Acting Muscarinic Antagonists (SAMA)**:\n   - **Examples**: Salbutamol (SABA), ipratropium (SAMA).\n   - **Rationale**: For acute symptom relief during exacerbations.\n   - **Advantages**: Rapid onset of action.\n\n### 4. Non-Pharmacological Interventions\nNon-pharmacological interventions are critical for managing COPD and improving Catherine’s quality of life:\n\n1. **Smoking Cessation**:\n   - **Intervention**: Provide counseling, nicotine replacement therapy (NRT), varenicline, or bupropion.\n   - **Rationale**: Smoking cessation is the **most effective intervention** to slow disease progression and reduce exacerbations.\n\n2. **Pulmonary Rehabilitation**:\n   - **Components**: Exercise training, education, nutritional counseling, and psychological support.\n   - **Benefits**: Improves exercise capacity, reduces dyspnea, and enhances quality of life.\n   - **Recommendation**: Refer Catherine to a pulmonary rehabilitation program.\n\n3. **Nutritional Support**:\n   - **Intervention**: Assess nutritional status and provide dietary counseling.\n   - **Rationale**: Malnutrition is common in advanced COPD and contributes to muscle wasting and weakness.\n   - **Recommendation**: High-calorie, high-protein diet with small, frequent meals. Consider nutritional supplements if needed.\n\n4. **Breathing Techniques and Physiotherapy**:\n   - **Interventions**: Pursed-lip breathing, diaphragmatic breathing, and airway clearance techniques (e.g., postural drainage, percussion).\n   - **Benefits**: Improves oxygenation, reduces dyspnea, and enhances mucus clearance.\n\n5. **Avoidance of Triggers**:\n   - **Intervention**: Identify and avoid environmental triggers (e.g., biomass fuel smoke, dust, cold air, respiratory infections).\n   - **Rationale**: Reduces exacerbations and symptom burden.\n   - **Recommendation**: Use a mask when cooking, ensure proper ventilation, and avoid exposure to smoke and pollutants.\n\n6. **Psychosocial Support**:\n   - **Intervention**: Provide counseling or support groups for anxiety and depression.\n   - **Rationale**: COPD can lead to significant psychological distress.\n   - **Recommendation**: Refer Catherine to a psychologist or support group if needed.\n\n7. **Hydration**:\n   - **Intervention**: Encourage adequate fluid intake.\n   - **Rationale**: Helps thin mucus and improve expectoration.\n\n8. **Regular Follow-Up**:\n   - **Intervention**: Schedule regular follow-up visits to assess symptoms, lung function, and medication adherence.\n   - **Rationale**: Ensures timely adjustments to therapy and early intervention for exacerbations.\n\n9. **End-of-Life Planning (if applicable)**:\n   - **Intervention**: Discuss advance care planning and palliative care options for advanced COPD.\n   - **Rationale**: Ensures Catherine’s preferences are respected and quality of life is optimized."
            },
            {
              "stem": "J.B., a 65-year-old male, presents with a 5-year history of a pulmonary condition characterized by cough, dyspnea, pursed-lip breathing, and speaks in short jerky sentences. He is on oxygen therapy and reports feeling comfortable only when on oxygen. On examination, he has barrel chest, reduced breath sounds, and prolonged expiratory phase.\n\n1. What could J.B. be suffering from? (Support your answer) (2 Marks)\n2. What risk factors are associated with this condition? (5 Marks)\n3. What medication should J.B. be using that would help to manage the disease and slow down the disease progression? (8 Marks)\n4. What parameters would you use as part of pharmaceutical care to monitor this patient in subsequent visits? (5 Marks)",
              "modelAnswer": "### 1. Likely Diagnosis and Supporting Evidence\nJ.B. is most likely suffering from **chronic obstructive pulmonary disease (COPD), specifically emphysema-predominant COPD**. This is supported by:\n- **Chronic cough and dyspnea** for 5 years.\n- **Pursed-lip breathing**: A compensatory mechanism to increase airway pressure and prevent airway collapse during expiration.\n- **Short jerky sentences**: Indicative of severe dyspnea and difficulty speaking in long sentences.\n- **Oxygen dependency**: Suggests chronic hypoxemia requiring long-term oxygen therapy (LTOT).\n- **Physical examination findings**: Barrel chest (due to hyperinflation), reduced breath sounds (due to loss of lung elastic recoil), and prolonged expiratory phase (due to airflow limitation).\n\nThe clinical presentation is consistent with **severe emphysema**, a subtype of COPD characterized by destruction of alveoli and loss of lung elastic recoil, leading to air trapping and hyperinflation.\n\n### 2. Risk Factors Associated with COPD\nThe risk factors associated with J.B.’s COPD include:\n\n1. **Smoking**: The primary risk factor for COPD, contributing to 80–90% of cases. Smoking causes oxidative stress, inflammation, and destruction of lung parenchyma.\n\n2. **Occupational Exposures**: Long-term exposure to dust, chemicals, and biomass fuel smoke (e.g., from cooking or heating) can contribute to COPD.\n\n3. **Air Pollution**: Exposure to indoor and outdoor air pollution (e.g., biomass fuel smoke, vehicle emissions, industrial pollutants) increases the risk of COPD.\n\n4. **Genetic Factors**: Alpha-1 antitrypsin (AAT) deficiency is a rare genetic condition that predisposes individuals to early-onset emphysema, particularly in non-smokers.\n\n5. **Age**: COPD is more common in individuals >40 years old due to cumulative exposure to risk factors and age-related decline in lung function.\n\n6. **Recurrent Respiratory Infections**: Chronic or recurrent respiratory infections (e.g., pneumonia, bronchitis) can accelerate lung damage and contribute to COPD.\n\n7. **Socioeconomic Status**: Low socioeconomic status is associated with higher exposure to risk factors (e.g., smoking, indoor air pollution) and limited access to healthcare.\n\n8. **Chronic Bronchitis**: A history of chronic bronchitis (productive cough for ≥3 months in 2 consecutive years) can progress to COPD.\n\n### 3. Medications to Manage J.B.’s COPD and Slow Disease Progression\nJ.B.’s management should focus on **symptom relief, reducing exacerbations, improving quality of life, and slowing disease progression**. The following medications are recommended:\n\n#### **Bronchodilators (Cornerstone of COPD Management)**\n1. **Long-Acting Muscarinic Antagonists (LAMA)**:\n   - **Examples**: Tiotropium (Spiriva), aclidinium (Eklira).\n   - **Rationale**: LAMA provide sustained bronchodilation by blocking muscarinic receptors, reducing cholinergic-mediated bronchoconstriction. Tiotropium is preferred for maintenance therapy in COPD.\n   - **Dose**: Tiotropium 18 mcg once daily via HandiHaler or Respimat.\n   - **Benefits**: Reduces exacerbations, improves symptoms, and lung function. Once-daily dosing improves adherence.\n\n2. **Long-Acting Beta-Agonists (LABA)**:\n   - **Examples**: Formoterol (Foradil), salmeterol (Serevent), indacaterol (Onbrez).\n   - **Rationale**: LABA provide sustained bronchodilation by stimulating beta-2 receptors in the airways. Can be used alone or in combination with LAMA.\n   - **Dose**: Formoterol 12 mcg twice daily or indacaterol 150 mcg once daily.\n   - **Benefits**: Improves symptoms, exercise tolerance, and reduces exacerbations.\n\n3. **Combination LAMA/LABA**:\n   - **Examples**: Tiotropium/olodaterol (Spiolto Respimat), umeclidinium/vilanterol (Anoro Ellipta).\n   - **Rationale**: Combination therapy may provide greater bronchodilation and symptom relief than monotherapy.\n   - **Dose**: Tiotropium/olodaterol 5/5 mcg once daily.\n   - **Benefits**: Superior to monotherapy in improving lung function and reducing exacerbations.\n\n#### **Inhaled Corticosteroids (ICS)**\n4. **ICS + LABA Combination**:\n   - **Examples**: Fluticasone/salmeterol (Seretide), budesonide/formoterol (Symbicort).\n   - **Rationale**: ICS are added to LABA in patients with **frequent exacerbations** (e.g., ≥2 per year) or those with **asthma-COPD overlap (ACO)**. ICS reduce airway inflammation and exacerbations.\n   - **Caution**: ICS monotherapy is **not recommended** in COPD due to increased risk of pneumonia.\n   - **Dose**: Fluticasone/salmeterol 500/50 mcg twice daily or budesonide/formoterol 400/12 mcg twice daily.\n   - **Benefits**: Reduces exacerbations and improves symptoms in patients with frequent exacerbations.\n\n#### **Phosphodiesterase-4 Inhibitors**\n5. **Roflumilast**:\n   - **Rationale**: For patients with **severe COPD (FEV1 <50% predicted)** and a history of **frequent exacerbations** (e.g., ≥2 per year), particularly with chronic bronchitis.\n   - **Mechanism**: Reduces inflammation by inhibiting phosphodiesterase-4.\n   - **Dose**: 500 mcg once daily.\n   - **Benefits**: Reduces exacerbations and improves lung function.\n   - **Side effects**: Diarrhea, weight loss, nausea, and psychiatric effects (e.g., insomnia, anxiety).\n   - **Caution**: Not recommended for patients with a history of depression or suicidal ideation.\n\n#### **Mucolytics**\n6. **N-Acetylcysteine (NAC)**:\n   - **Rationale**: For patients with **chronic productive cough** to thin mucus and improve expectoration.\n   - **Dose**: 600 mg once or twice daily.\n   - **Benefits**: May reduce exacerbations in some patients.\n   - **Side effects**: Nausea, vomiting, and diarrhea.\n\n#### **Oxygen Therapy**\n7. **Long-Term Oxygen Therapy (LTOT)**:\n   - **Criteria**: For patients with **chronic hypoxemia (PaO2 <55 mmHg or <60 mmHg with cor pulmonale or polycythemia)**.\n   - **Rationale**: LTOT improves survival and quality of life in hypoxemic patients.\n   - **Administration**: 15–19 hours/day via nasal cannula or oxygen concentrator.\n   - **Monitoring**: Regular ABG analysis to assess oxygenation and adjust oxygen flow rate.\n\n#### **Vaccinations**\n8. **Influenza and Pneumococcal Vaccination**:\n   - **Rationale**: Reduces the risk of respiratory infections, which are a common trigger for COPD exacerbations.\n   - **Recommendation**: Annual influenza vaccination and pneumococcal vaccination (if not up to date).\n\n#### **Rescue Medications**\n9. **Short-Acting Beta-Agonists (SABA) or Short-Acting Muscarinic Antagonists (SAMA)**:\n   - **Examples**: Salbutamol (SABA), ipratropium (SAMA).\n   - **Rationale**: For acute symptom relief during exacerbations.\n   - **Dose**: Salbutamol 100–200 mcg via metered-dose inhaler as needed or ipratropium 20–40 mcg via metered-dose inhaler as needed.\n   - **Benefits**: Rapid onset of action.\n\n### 4. Pharmaceutical Care Parameters for Monitoring J.B.\nPharmaceutical care for J.B. should focus on **assessing medication effectiveness, adherence, side effects, and disease progression**. The following parameters should be monitored in subsequent visits:\n\n#### **Clinical Parameters**\n1. **Symptom Control**:\n   - **Dyspnea**: Assess using the modified Medical Research Council (mMRC) dyspnea scale.\n   - **Cough and sputum production**: Frequency, volume, and color (e.g., purulent sputum may indicate infection).\n   - **Exacerbations**: Number and severity of acute exacerbations requiring medical intervention (e.g., oral corticosteroids, antibiotics, or hospitalization).\n\n2. **Lung Function**:\n   - **Spirometry**: FEV1, FVC, and FEV1/FVC ratio to assess airflow limitation and disease progression.\n   - **Peak Expiratory Flow (PEF)**: To monitor daily variability in airflow limitation.\n\n3. **Oxygenation**:\n   - **Arterial Blood Gas (ABG) Analysis**: PaO2, PaCO2, and pH to assess for hypoxemia, hypercapnia, and respiratory acidosis.\n   - **Pulse Oximetry**: SpO2 to monitor oxygen saturation.\n\n4. **Exercise Tolerance**:\n   - **6-Minute Walk Test (6MWT)**: To assess functional capacity and response to therapy.\n   - **Dyspnea during activities of daily living (ADLs)**: Monitor for improvement or worsening.\n\n#### **Medication-Related Parameters**\n5. **Adherence**:\n   - **Inhaler Technique**: Assess J.B.’s ability to use his inhalers correctly (e.g., metered-dose inhaler with spacer, dry powder inhaler).\n   - **Medication Adherence**: Review prescription refill history and patient-reported adherence.\n   - **Barriers to Adherence**: Identify and address barriers (e.g., cost, side effects, forgetfulness).\n\n6. **Side Effects**:\n   - **LAMA/LABA**: Monitor for dry mouth, constipation, urinary retention, tremors, palpitations, or paradoxical bronchospasm.\n   - **ICS**: Monitor for oral candidiasis, hoarseness, and systemic effects (e.g., adrenal suppression, osteoporosis) with long-term use.\n   - **Roflumilast**: Monitor for diarrhea, weight loss, nausea, insomnia, or psychiatric effects.\n   - **Oxygen Therapy**: Monitor for nasal dryness, skin irritation, or oxygen toxicity (rare with LTOT).\n\n7. **Drug Interactions**:\n   - **Review J.B.’s medication list** for potential interactions (e.g., beta-blockers, which can antagonize LABA effects).\n\n#### **Laboratory Parameters**\n8. **Renal and Hepatic Function**:\n   - **Serum creatinine and eGFR**: To assess renal function, particularly if J.B. is on medications that require dose adjustment in renal impairment (e.g., theophylline, certain antibiotics).\n   - **Liver function tests (LFTs)**: If J.B. is on medications metabolized hepatically (e.g., roflumilast, certain statins).\n\n9. **Electrolytes**:\n   - **Serum potassium**: To monitor for hypokalemia (e.g., with high-dose beta-agonists or diuretics).\n   - **Serum bicarbonate**: To assess for metabolic acidosis or alkalosis.\n\n10. **Infection Markers**:\n    - **CBC with differential**: To assess for leukocytosis or eosinophilia, which may indicate infection or inflammation.\n    - **C-reactive protein (CRP) or procalcitonin**: If an exacerbation is suspected, to differentiate between bacterial and viral causes.\n\n#### **Quality of Life and Functional Status**\n11. **Quality of Life Questionnaires**:\n    - **COPD Assessment Test (CAT)**: To assess the impact of COPD on J.B.’s health status.\n    - **St. George’s Respiratory Questionnaire (SGRQ)**: To assess symptoms, activity limitations, and psychosocial impact.\n\n12. **Nutritional Status**:\n    - **Body Mass Index (BMI)**: To assess for malnutrition or obesity.\n    - **Serum albumin or prealbumin**: To assess nutritional status.\n\n13. **Psychosocial Well-Being**:\n    - **Depression and Anxiety Screening**: Use tools like the Patient Health Questionnaire-9 (PHQ-9) or Generalized Anxiety Disorder-7 (GAD-7).\n    - **Social Support**: Assess J.B.’s support system and access to healthcare resources.\n\n#### **Immunization Status**\n14. **Vaccination Status**:\n    - **Influenza and pneumococcal vaccination**: Ensure J.B. is up to date.\n\n#### **Patient Education and Counseling**\n15. **Education on COPD and Medications**:\n    - Reinforce the importance of **adherence** to controller medications.\n    - Educate on **proper inhaler technique** and **cleaning of devices**.\n    - Discuss **symptom recognition** and **when to seek medical help** (e.g., worsening dyspnea, increased sputum purulence, or signs of respiratory failure).\n\n16. **Smoking Cessation Support**:\n    - If J.B. is still smoking, provide **counseling, nicotine replacement therapy (NRT), varenicline, or bupropion** to support cessation.\n\n17. **Pulmonary Rehabilitation**:\n    - Assess J.B.’s eligibility for **pulmonary rehabilitation** and refer if appropriate.\n\n#### **Follow-Up Schedule**\n18. **Frequency of Visits**:\n    - **Stable COPD**: Every 3–6 months.\n    - **During exacerbations**: More frequent visits to assess response to treatment.\n    - **After initiating new medications**: Follow up within 4–6 weeks to assess efficacy and side effects.\n\nBy monitoring these parameters, healthcare providers can optimize J.B.’s COPD management, reduce exacerbations, and improve his quality of life."
            }
          ]
        }
      ]
    },
    "2": {
      "title": "Clinical Pharmacy — Respiratory & Renal",
      "variant": 2,
      "sections": [
        {
          "letter": "A",
          "name": "Multiple Choice Questions",
          "marks": 20,
          "questions": [
            {
              "stem": "A 65-year-old male with a 20-pack-year smoking history presents with chronic cough, sputum production, and dyspnea on exertion. Spirometry reveals FEV1/FVC ratio of 0.65 and FEV1 55% predicted. Which of the following is the most likely diagnosis?",
              "options": [
                "Asthma",
                "Chronic bronchitis",
                "Chronic obstructive pulmonary disease (COPD)",
                "Bronchiectasis",
                "Interstitial lung disease"
              ],
              "answer": "Chronic obstructive pulmonary disease (COPD)",
              "explanation": "COPD is characterized by persistent airflow limitation due to chronic bronchitis and/or emphysema, with FEV1/FVC <0.70 and FEV1 <80% predicted."
            },
            {
              "stem": "Which of the following is the primary mechanism of action of inhaled corticosteroids in the management of asthma?",
              "options": [
                "Direct bronchodilation",
                "Inhibition of mast cell degranulation",
                "Reduction of airway inflammation",
                "Stimulation of beta-2 receptors",
                "Blockade of leukotriene receptors"
              ],
              "answer": "Reduction of airway inflammation",
              "explanation": "Inhaled corticosteroids reduce airway inflammation by suppressing eosinophilic infiltration, cytokine production, and mucus secretion."
            },
            {
              "stem": "A 45-year-old female with COPD (GOLD stage 3) reports persistent dyspnea despite maximal inhaled therapy. Which of the following is the most appropriate next step?",
              "options": [
                "Add oral theophylline",
                "Initiate long-term oxygen therapy",
                "Start oral prednisolone 30mg daily",
                "Add roflumilast",
                "Refer for lung volume reduction surgery"
              ],
              "answer": "Add roflumilast",
              "explanation": "Roflumilast, a PDE-4 inhibitor, is recommended for severe COPD with chronic bronchitis and a history of frequent exacerbations."
            },
            {
              "stem": "Which of the following adverse effects is most commonly associated with ipratropium bromide use?",
              "options": [
                "Hyperkalemia",
                "Oral candidiasis",
                "Dry mouth",
                "Tachycardia",
                "Hypotension"
              ],
              "answer": "Dry mouth",
              "explanation": "Antimuscarinic agents like ipratropium commonly cause dry mouth due to inhibition of salivary gland secretion."
            },
            {
              "stem": "A 30-year-old male with asthma uses salbutamol MDI 2 puffs as needed but reports increased nocturnal symptoms. Which of the following is the most appropriate adjustment to his therapy?",
              "options": [
                "Increase salbutamol to 4 puffs as needed",
                "Add oral prednisolone 10mg daily",
                "Initiate inhaled fluticasone 250mcg twice daily",
                "Switch to oral theophylline",
                "Add montelukast 10mg daily"
              ],
              "answer": "Initiate inhaled fluticasone 250mcg twice daily",
              "explanation": "Low-dose inhaled corticosteroids are the cornerstone of asthma maintenance therapy to reduce inflammation and prevent exacerbations."
            },
            {
              "stem": "Which of the following is a contraindication to the use of varenicline in smoking cessation?",
              "options": [
                "History of depression",
                "Severe renal impairment",
                "Concurrent use of nicotine replacement therapy",
                "History of seizures",
                "Age >65 years"
              ],
              "answer": "Severe renal impairment",
              "explanation": "Varenicline is primarily renally eliminated; dose adjustment is required in moderate-severe renal impairment, and it is contraindicated in severe impairment."
            },
            {
              "stem": "A 55-year-old male with COPD and cor pulmonale presents with worsening edema and dyspnea. Which of the following is the most appropriate diuretic to initiate?",
              "options": [
                "Hydrochlorothiazide",
                "Spironolactone",
                "Furosemide",
                "Amiloride",
                "Mannitol"
              ],
              "answer": "Furosemide",
              "explanation": "Loop diuretics like furosemide are preferred for fluid overload in cor pulmonale due to their potent natriuretic effect."
            },
            {
              "stem": "Which of the following is the primary goal of theophylline therapy in COPD?",
              "options": [
                "Bronchodilation",
                "Anti-inflammatory effect",
                "Mucolytic activity",
                "Antimicrobial prophylaxis",
                "Diuresis"
              ],
              "answer": "Bronchodilation",
              "explanation": "Theophylline provides bronchodilation via PDE-3 inhibition, though its use is limited by a narrow therapeutic index and drug interactions."
            },
            {
              "stem": "A 60-year-old female with stage 4 CKD (eGFR 20 mL/min/1.73m²) requires analgesia for osteoarthritis. Which of the following is the safest option?",
              "options": [
                "Ibuprofen 400mg TDS",
                "Naproxen 500mg BD",
                "Paracetamol 1g QDS",
                "Celecoxib 200mg OD",
                "Diclofenac 50mg BD"
              ],
              "answer": "Paracetamol 1g QDS",
              "explanation": "Paracetamol is preferred in CKD due to minimal renal elimination and lack of nephrotoxicity, unlike NSAIDs which can worsen renal function."
            },
            {
              "stem": "Which of the following is the most appropriate monitoring parameter for a patient on long-term inhaled corticosteroid therapy?",
              "options": [
                "Serum potassium levels",
                "Bone mineral density",
                "Serum theophylline levels",
                "24-hour urine protein",
                "Serum creatinine"
              ],
              "answer": "Bone mineral density",
              "explanation": "Long-term inhaled corticosteroids may increase osteoporosis risk; monitoring bone mineral density is recommended in high-risk patients."
            },
            {
              "stem": "A 40-year-old male with asthma reports using his salbutamol inhaler 4-5 times daily for symptom control. Which of the following best describes his asthma control?",
              "options": [
                "Well controlled",
                "Partly controlled",
                "Uncontrolled",
                "Requires step-down therapy",
                "Requires oral corticosteroids"
              ],
              "answer": "Uncontrolled",
              "explanation": "Using a SABA >2 times weekly indicates uncontrolled asthma, requiring step-up therapy (e.g., add inhaled corticosteroid)."
            },
            {
              "stem": "Which of the following is the primary mechanism of action of tiotropium in COPD?",
              "options": [
                "Beta-2 receptor agonism",
                "Leukotriene receptor antagonism",
                "Muscarinic receptor antagonism",
                "Corticosteroid receptor agonism",
                "Phosphodiesterase inhibition"
              ],
              "answer": "Muscarinic receptor antagonism",
              "explanation": "Tiotropium is a long-acting muscarinic antagonist (LAMA) that blocks M3 receptors, reducing bronchoconstriction."
            },
            {
              "stem": "A 50-year-old female with COPD (GOLD stage 2) develops acute exacerbation with purulent sputum. Which of the following is the most appropriate antibiotic choice?",
              "options": [
                "Amoxicillin",
                "Doxycycline",
                "Ciprofloxacin",
                "Clarithromycin",
                "Metronidazole"
              ],
              "answer": "Amoxicillin",
              "explanation": "Amoxicillin is a first-line option for acute exacerbation of COPD with purulent sputum, targeting common pathogens like H. influenzae."
            },
            {
              "stem": "Which of the following is a key adverse effect of systemic corticosteroids in asthma management?",
              "options": [
                "Hyperkalemia",
                "Hypoglycemia",
                "Osteoporosis",
                "Bradycardia",
                "Hypotension"
              ],
              "answer": "Osteoporosis",
              "explanation": "Prolonged systemic corticosteroid use increases osteoporosis risk due to reduced bone formation and increased resorption."
            },
            {
              "stem": "A 35-year-old male with CKD stage 3 (eGFR 45 mL/min/1.73m²) requires antihypertensive therapy. Which of the following is contraindicated?",
              "options": [
                "Amlodipine",
                "Enalapril",
                "Bisoprolol",
                "Hydrochlorothiazide",
                "Losartan"
              ],
              "answer": "Hydrochlorothiazide",
              "explanation": "Thiazide diuretics are ineffective in CKD stage 3 (eGFR <60 mL/min/1.73m²) and may worsen renal function; loop diuretics are preferred."
            },
            {
              "stem": "Which of the following is the primary indication for theophylline in asthma?",
              "options": [
                "Acute severe exacerbation",
                "Exercise-induced bronchospasm",
                "Mild persistent asthma",
                "Severe persistent asthma uncontrolled on inhaled corticosteroids",
                "Nocturnal asthma"
              ],
              "answer": "Severe persistent asthma uncontrolled on inhaled corticosteroids",
              "explanation": "Theophylline is a third-line add-on therapy for severe asthma not controlled on inhaled corticosteroids and LABA."
            },
            {
              "stem": "A 65-year-old male with COPD presents with acute confusion and tremor. His medications include tiotropium, salmeterol, and theophylline. Which of the following is the most likely cause?",
              "options": [
                "Tiotropium toxicity",
                "Salmeterol overdose",
                "Theophylline toxicity",
                "CO2 retention",
                "Hypoxemia"
              ],
              "answer": "Theophylline toxicity",
              "explanation": "Theophylline has a narrow therapeutic index; symptoms like tremor, confusion, and tachycardia suggest toxicity, often due to drug interactions or renal impairment."
            },
            {
              "stem": "Which of the following is the primary goal of smoking cessation pharmacotherapy?",
              "options": [
                "Complete nicotine replacement",
                "Prevent withdrawal symptoms",
                "Induce aversion to smoking",
                "Block nicotine receptors",
                "Stimulate dopamine release"
              ],
              "answer": "Prevent withdrawal symptoms",
              "explanation": "Smoking cessation pharmacotherapy (e.g., NRT, varenicline, bupropion) aims to reduce withdrawal symptoms and cravings."
            },
            {
              "stem": "A 50-year-old female with asthma reports using her inhaler correctly but still experiences symptoms. Spirometry shows FEV1 60% predicted. Which of the following is the most appropriate next step?",
              "options": [
                "Increase salbutamol dose",
                "Add oral prednisolone",
                "Initiate inhaled fluticasone/salmeterol combination",
                "Switch to oral theophylline",
                "Add montelukast"
              ],
              "answer": "Initiate inhaled fluticasone/salmeterol combination",
              "explanation": "For asthma not controlled on low-dose inhaled corticosteroids, adding a LABA (e.g., salmeterol) or increasing ICS dose is recommended."
            },
            {
              "stem": "Which of the following is the primary mechanism of action of bupropion in smoking cessation?",
              "options": [
                "Nicotine receptor agonism",
                "Dopamine and norepinephrine reuptake inhibition",
                "GABA receptor agonism",
                "Muscarinic receptor antagonism",
                "Leukotriene receptor antagonism"
              ],
              "answer": "Dopamine and norepinephrine reuptake inhibition",
              "explanation": "Bupropion reduces cravings and withdrawal symptoms by inhibiting dopamine and norepinephrine reuptake in the brain."
            }
          ]
        },
        {
          "letter": "B",
          "name": "Short Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "List FIVE key components of a comprehensive asthma management plan.",
              "modelAnswer": "1. Patient education on asthma, triggers, and medication use. 2. Written action plan for symptom control and exacerbation management. 3. Controller therapy (e.g., inhaled corticosteroids) for long-term control. 4. Reliever therapy (e.g., salbutamol) for acute symptoms. 5. Regular monitoring of symptoms, peak flow, and lung function. 6. Avoidance of triggers (e.g., allergens, smoke). 7. Annual influenza vaccination."
            },
            {
              "stem": "Outline the steps involved in the accurate use of a dry powder inhaler (DPI).",
              "modelAnswer": "1. Open the inhaler and load the dose (if required). 2. Exhale fully to empty lungs. 3. Seal lips around the mouthpiece. 4. Inhale deeply and forcefully to ensure powder dispersion. 5. Hold breath for 5-10 seconds to allow deposition. 6. Exhale slowly. 7. Close the inhaler and rinse mouth if using corticosteroids."
            },
            {
              "stem": "List FIVE complications of chronic kidney disease (CKD).",
              "modelAnswer": "1. Anemia (due to reduced erythropoietin). 2. Mineral and bone disorder (hyperphosphatemia, hypocalcemia, secondary hyperparathyroidism). 3. Cardiovascular disease (hypertension, heart failure, pericarditis). 4. Fluid and electrolyte imbalances (hyperkalemia, metabolic acidosis). 5. Uremia (nausea, pruritus, encephalopathy). 6. Malnutrition (due to protein-energy wasting)."
            },
            {
              "stem": "What are the key monitoring parameters for a patient on long-term inhaled corticosteroid therapy?",
              "modelAnswer": "1. Symptom control and lung function (FEV1, peak flow). 2. Adherence to therapy. 3. Adverse effects (e.g., oral candidiasis, hoarseness). 4. Bone mineral density (if high-dose or prolonged use). 5. Ophthalmic examination (cataracts, glaucoma risk). 6. Growth in children (if applicable)."
            },
            {
              "stem": "List FIVE risk factors for the development of chronic obstructive pulmonary disease (COPD).",
              "modelAnswer": "1. Tobacco smoking (primary risk factor). 2. Occupational exposure to dust, chemicals, or fumes. 3. Air pollution (indoor and outdoor). 4. Genetic factors (e.g., alpha-1 antitrypsin deficiency). 5. Recurrent respiratory infections. 6. Low socioeconomic status (linked to poor healthcare access)."
            },
            {
              "stem": "What are the clinical features of an acute exacerbation of COPD?",
              "modelAnswer": "1. Worsening dyspnea. 2. Increased sputum volume and/or purulence. 3. Increased cough. 4. Chest tightness. 5. Signs of respiratory distress (e.g., tachypnea, use of accessory muscles). 6. Hypoxemia and/or hypercapnia. 7. Possible fever (if infectious cause)."
            },
            {
              "stem": "Outline the management of a patient with stage 3 CKD (eGFR 30-59 mL/min/1.73m²).",
              "modelAnswer": "1. Blood pressure control (target <130/80 mmHg; ACEi/ARB preferred). 2. Glycemic control in diabetics (target HbA1c ~7%). 3. Dietary modifications (protein restriction, sodium/potassium/phosphate restriction). 4. Correction of anemia (erythropoietin-stimulating agents, iron supplementation). 5. Management of mineral and bone disorder (phosphate binders, vitamin D analogs). 6. Monitoring of renal function, electrolytes, and fluid balance. 7. Avoidance of nephrotoxic drugs (e.g., NSAIDs, aminoglycosides)."
            },
            {
              "stem": "What are the key adverse effects of theophylline therapy, and how can they be minimized?",
              "modelAnswer": "Key adverse effects: 1. Gastrointestinal (nausea, vomiting). 2. Cardiovascular (tachycardia, arrhythmias). 3. Neurological (tremor, seizures, insomnia). 4. Metabolic (hypokalemia, hyperglycemia). Minimization strategies: 1. Use lowest effective dose. 2. Monitor serum levels (target 10-20 mcg/mL). 3. Avoid drug interactions (e.g., ciprofloxacin, erythromycin). 4. Adjust dose in renal/hepatic impairment. 5. Educate patients on signs of toxicity."
            }
          ]
        },
        {
          "letter": "C",
          "name": "Long Answer Questions",
          "marks": 40,
          "questions": [
            {
              "stem": "A 68-year-old male with stage 4 CKD (eGFR 25 mL/min/1.73m²) is admitted to the hospital with uremic symptoms (nausea, pruritus, confusion) and fluid overload (pulmonary edema, bilateral leg edema). His medications include amlodipine 5 mg daily, metformin 500 mg BD, and atorvastatin 20 mg nocte. His blood pressure is 180/100 mmHg, and his serum potassium is 5.8 mEq/L.\n\n1. Outline the immediate management of this patient’s hyperkalemia and fluid overload.\n2. Discuss the adjustments required to his antihypertensive therapy.\n3. What long-term strategies would you recommend for managing his CKD?",
              "modelAnswer": {
                "1. Immediate management of hyperkalemia and fluid overload:\n   - **Hyperkalemia (K+ 5.8 mEq/L):**\n     - **Stabilize cardiac membrane:** Administer IV calcium gluconate 10% 10 mL over 2-5 minutes to antagonize the effects of hyperkalemia on cardiac conduction.\n     - **Shift potassium intracellularly:**\n       - Administer IV insulin 10 units with 50 mL of 50% dextrose to drive potassium into cells.\n       - Administer nebulized salbutamol 10-20 mg over 10 minutes to promote intracellular potassium shift.\n     - **Remove potassium from the body:**\n       - Administer oral sodium polystyrene sulfonate (SPS) 15-30 g or IV furosemide 40-80 mg to promote renal potassium excretion (if urine output is adequate).\n       - Consider hemodialysis if hyperkalemia is severe or refractory.\n   - **Fluid overload (pulmonary edema):**\n     - **Diuretics:** Administer IV furosemide 40-80 mg bolus, followed by continuous infusion if needed.\n     - **Oxygen therapy:** Administer high-flow oxygen to maintain SpO2 >94%.\n     - **Vasodilators:** Consider IV nitroglycerin or nitroprusside if hypertensive to reduce preload/afterload.\n     - **Monitoring:** Continuous cardiac monitoring, frequent reassessment of fluid status (weight, urine output, electrolytes), and fluid balance.\n\n2. Adjustments to antihypertensive therapy:\n   - **Discontinue metformin:** Metformin is contraindicated in CKD stage 4 due to the risk of lactic acidosis.\n   - **Optimize blood pressure control:**\n     - **ACE inhibitors/ARBs:** These are renoprotective but require careful monitoring of renal function and potassium levels. Continue if tolerated, but reduce dose if eGFR declines further.\n     - **Calcium channel blockers:** Amlodipine is safe in CKD but may require dose adjustment if renal function worsens.\n     - **Beta-blockers:** Consider adding a cardioselective beta-blocker (e.g., bisoprolol) if hypertension is uncontrolled or the patient has heart failure.\n     - **Diuretics:** Loop diuretics (e.g., furosemide) are preferred for volume control in CKD stage 4.\n   - **Avoid nephrotoxic drugs:** Discontinue or avoid NSAIDs, aminoglycosides, and other nephrotoxic agents.\n\n3. Long-term strategies for managing CKD:\n   - **Blood pressure control:** Target BP <130/80 mmHg using ACEi/ARB as first-line agents (monitor renal function and potassium).\n   - **Glycemic control:** Target HbA1c ~7% in diabetics, using agents safe in CKD (e.g., insulin, DPP-4 inhibitors like linagliptin).\n   - **Mineral and bone disorder (MBD) management:**\n     - **Phosphate binders:** Start if serum phosphate >4.5 mg/dL (e.g., sevelamer, calcium acetate).\n     - **Vitamin D analogs:** Use if 25-hydroxyvitamin D is low or parathyroid hormone (PTH) is elevated (e.g., calcitriol).\n     - **Calcimimetics:** Consider cinacalcet if PTH remains elevated despite phosphate control.\n   - **Anemia management:**\n     - **Erythropoiesis-stimulating agents (ESAs):** Use if Hb <10 g/dL (e.g., darbepoetin alfa).\n     - **Iron supplementation:** Ensure adequate iron stores (IV iron if oral ineffective).\n   - **Dietary modifications:**\n     - **Protein restriction:** 0.8 g/kg/day to reduce nitrogenous waste.\n     - **Sodium restriction:** <2 g/day to control blood pressure and fluid overload.\n     - **Potassium restriction:** If hyperkalemia is persistent.\n     - **Phosphate restriction:** Limit high-phosphate foods (e.g., dairy, nuts).\n   - **Monitoring:**\n     - **Renal function:** Serum creatinine, eGFR, and cystatin C every 3-6 months.\n     - **Electrolytes:** Sodium, potassium, bicarbonate, calcium, phosphate, and magnesium every 1-3 months.\n     - **Cardiovascular risk:** Lipid profile, HbA1c, and blood pressure every 3-6 months.\n     - **Bone health:** Bone mineral density (DEXA scan) if high risk of osteoporosis.\n   - **Patient education:**\n     - **Medication adherence:** Emphasize the importance of taking medications as prescribed.\n     - **Symptom recognition:** Teach the patient to recognize signs of fluid overload, hyperkalemia, and uremia.\n     - **Lifestyle modifications:** Encourage smoking cessation, regular exercise, and a balanced diet.\n   - **Advanced care planning:** Discuss options for renal replacement therapy (e.g., hemodialysis, peritoneal dialysis) and kidney transplantation if appropriate.": ""
              }
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
