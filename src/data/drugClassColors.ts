/**
 * Drug Class Color System
 * Mirrors the DISEASE_CONFIG + COLOR_MAP pattern from ClinicalCasesScreen
 * Maps every major drug class to a color by medical system.
 */

export const DRUG_CLASS_CONFIG: Record<string, { color: string; subtitle: string }> = {
  // Cardiovascular — rose
  'ACE inhibitor': { color: 'rose', subtitle: 'Cardiovascular' },
  'ARB': { color: 'rose', subtitle: 'Cardiovascular' },
  'ARNI': { color: 'rose', subtitle: 'Cardiovascular' },
  'Beta-blocker': { color: 'rose', subtitle: 'Cardiovascular' },
  'Beta-blocker (cardioselective)': { color: 'rose', subtitle: 'Cardiovascular' },
  'Beta-blocker (non-selective)': { color: 'rose', subtitle: 'Cardiovascular' },
  'Statin': { color: 'rose', subtitle: 'Cardiovascular' },
  'Antiplatelet': { color: 'rose', subtitle: 'Cardiovascular' },
  'Cardiac glycoside': { color: 'rose', subtitle: 'Cardiovascular' },
  'Nitrate vasodilator': { color: 'rose', subtitle: 'Cardiovascular' },
  'Antiarrhythmic': { color: 'rose', subtitle: 'Cardiovascular' },
  'Calcium channel blocker (DHP)': { color: 'rose', subtitle: 'Cardiovascular' },
  'Calcium channel blocker (Non-DHP)': { color: 'rose', subtitle: 'Cardiovascular' },
  'Thiazide diuretic': { color: 'rose', subtitle: 'Cardiovascular' },
  'Loop diuretic': { color: 'rose', subtitle: 'Cardiovascular' },
  'Potassium-sparing diuretic': { color: 'rose', subtitle: 'Cardiovascular' },
  'Sinus node inhibitor': { color: 'rose', subtitle: 'Cardiovascular' },
  'Mineralocorticoid antagonist': { color: 'rose', subtitle: 'Cardiovascular' },
  'Anti-anginal': { color: 'rose', subtitle: 'Cardiovascular' },
  'Central alpha agonist': { color: 'rose', subtitle: 'Cardiovascular' },
  'Anticoagulant': { color: 'rose', subtitle: 'Haematology' },
  'LMWH': { color: 'rose', subtitle: 'Haematology' },
  'Factor Xa inhibitor': { color: 'rose', subtitle: 'Haematology' },
  'Vitamin K antagonist': { color: 'rose', subtitle: 'Haematology' },

  // Respiratory — sky
  'SABA': { color: 'sky', subtitle: 'Respiratory' },
  'LABA': { color: 'sky', subtitle: 'Respiratory' },
  'ICS': { color: 'sky', subtitle: 'Respiratory' },
  'LAMA': { color: 'sky', subtitle: 'Respiratory' },
  'Leukotriene receptor antagonist': { color: 'sky', subtitle: 'Respiratory' },
  'Methylxanthine': { color: 'sky', subtitle: 'Respiratory' },
  'Mucolytic': { color: 'sky', subtitle: 'Respiratory' },
  'Other respiratory': { color: 'sky', subtitle: 'Respiratory' },

  // Endocrine — amber
  'Biguanide': { color: 'amber', subtitle: 'Endocrine' },
  'Sulfonylurea': { color: 'amber', subtitle: 'Endocrine' },
  'Insulin': { color: 'amber', subtitle: 'Endocrine' },
  'Thyroid hormone': { color: 'amber', subtitle: 'Endocrine' },
  'Antithyroid': { color: 'amber', subtitle: 'Endocrine' },
  'Corticosteroid': { color: 'amber', subtitle: 'Endocrine' },
  'SGLT2 inhibitor': { color: 'amber', subtitle: 'Endocrine' },
  'DPP-4 inhibitor': { color: 'amber', subtitle: 'Endocrine' },
  'GLP-1 receptor agonist': { color: 'amber', subtitle: 'Endocrine' },
  'GLP-1 agonist': { color: 'amber', subtitle: 'Endocrine' },
  'Antidiabetic': { color: 'amber', subtitle: 'Endocrine' },
  'Alpha-glucosidase inhibitor': { color: 'amber', subtitle: 'Endocrine' },
  'Meglitinide': { color: 'amber', subtitle: 'Endocrine' },
  'Amylin analogue': { color: 'amber', subtitle: 'Endocrine' },
  'GIP/GLP-1 dual agonist': { color: 'amber', subtitle: 'Endocrine' },
  'Triple agonist (GIP/GLP-1/glucagon)': { color: 'amber', subtitle: 'Endocrine' },
  'HIF-PHI': { color: 'amber', subtitle: 'Endocrine' },
  'Potassium supplement': { color: 'amber', subtitle: 'Endocrine' },
  'Phosphate binder': { color: 'amber', subtitle: 'Endocrine' },
  'Vitamin D': { color: 'amber', subtitle: 'Endocrine' },
  'Parathyroid analogue': { color: 'amber', subtitle: 'Endocrine' },
  'Bone formation agent': { color: 'amber', subtitle: 'Endocrine' },
  'Antiresorptive': { color: 'amber', subtitle: 'Endocrine' },

  // CNS/Neuro — violet
  'Benzodiazepine': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Opioid analgesic': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Non-opioid analgesic': { color: 'violet', subtitle: 'CNS / Neurology' },
  'NSAID': { color: 'violet', subtitle: 'CNS / Neurology' },
  'COX-2 inhibitor': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Anticonvulsant': { color: 'violet', subtitle: 'CNS / Neurology' },
  'SSRI': { color: 'violet', subtitle: 'CNS / Neurology' },
  'TCA': { color: 'violet', subtitle: 'CNS / Neurology' },
  'SNRI': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Antidepressant (Other)': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Antidepressant (NDRI)': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Antidepressant (NaSSA)': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Antipsychotic (atypical)': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Antipsychotic (typical)': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Antiparkinsonian (dopaminergic)': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Dopamine agonist': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Cholinesterase inhibitor': { color: 'violet', subtitle: 'CNS / Neurology' },
  'NMDA antagonist': { color: 'violet', subtitle: 'CNS / Neurology' },
  'NMDA modulator': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Antiemetic': { color: 'violet', subtitle: 'CNS / Neurology' },
  '5-HT1F agonist (ditan)': { color: 'violet', subtitle: 'CNS / Neurology' },
  'CGRP receptor antagonist (gepant)': { color: 'violet', subtitle: 'CNS / Neurology' },
  '5-HT1B/1D agonist (triptan)': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Muscle relaxant (Depolarizing)': { color: 'violet', subtitle: 'CNS / Neurology' },
  'Muscle relaxant (Non-depolarizing)': { color: 'violet', subtitle: 'CNS / Neurology' },

  // GI/Hepatic — emerald
  'PPI': { color: 'emerald', subtitle: 'Gastrointestinal' },
  'H2 receptor antagonist': { color: 'emerald', subtitle: 'Gastrointestinal' },
  'Laxative': { color: 'emerald', subtitle: 'Gastrointestinal' },
  'Antidiarrheal': { color: 'emerald', subtitle: 'Gastrointestinal' },
  'Bile acid': { color: 'emerald', subtitle: 'Gastrointestinal' },
  'Aminosalicylate': { color: 'emerald', subtitle: 'Gastrointestinal' },

  // Anti-infective — red
  'Penicillin': { color: 'red', subtitle: 'Anti-infective' },
  'Cephalosporin': { color: 'red', subtitle: 'Anti-infective' },
  'Cephalosporin (5th gen)': { color: 'red', subtitle: 'Anti-infective' },
  'Cephalosporin (siderophore)': { color: 'red', subtitle: 'Anti-infective' },
  'Carbapenem': { color: 'red', subtitle: 'Anti-infective' },
  'Macrolide': { color: 'red', subtitle: 'Anti-infective' },
  'Fluoroquinolone': { color: 'red', subtitle: 'Anti-infective' },
  'Tetracycline': { color: 'red', subtitle: 'Anti-infective' },
  'Aminoglycoside': { color: 'red', subtitle: 'Anti-infective' },
  'Nitroimidazole': { color: 'red', subtitle: 'Anti-infective' },
  'Lincosamide': { color: 'red', subtitle: 'Anti-infective' },
  'Sulfonamide': { color: 'red', subtitle: 'Anti-infective' },
  'Urinary antiseptic': { color: 'red', subtitle: 'Anti-infective' },
  'Glycylcycline': { color: 'red', subtitle: 'Anti-infective' },
  'Lipopeptide': { color: 'red', subtitle: 'Anti-infective' },
  'Oxazolidinone': { color: 'red', subtitle: 'Anti-infective' },
  'Phosphonic acid antibiotic': { color: 'red', subtitle: 'Anti-infective' },
  'Polymyxin': { color: 'red', subtitle: 'Anti-infective' },
  'Antibiotic (non-systemic)': { color: 'red', subtitle: 'Anti-infective' },
  'Antibiotic (anti-tumor)': { color: 'red', subtitle: 'Anti-infective' },
  'Antifungal (Azole)': { color: 'red', subtitle: 'Anti-infective' },
  'Antifungal (Polyene)': { color: 'red', subtitle: 'Anti-infective' },
  'Antifungal (Echinocandin)': { color: 'red', subtitle: 'Anti-infective' },
  'Antifungal (Allylamine)': { color: 'red', subtitle: 'Anti-infective' },
  'Antifungal (Other)': { color: 'red', subtitle: 'Anti-infective' },
  'Triterpenoid antifungal': { color: 'red', subtitle: 'Anti-infective' },
  'Gwt1 inhibitor (antifungal)': { color: 'red', subtitle: 'Anti-infective' },
  'Antiviral (HSV)': { color: 'red', subtitle: 'Anti-infective' },
  'Antiviral (Influenza)': { color: 'red', subtitle: 'Anti-infective' },
  'Antiviral (HCV)': { color: 'red', subtitle: 'Anti-infective' },
  'Antiretroviral (NRTI)': { color: 'red', subtitle: 'Anti-infective' },
  'Antiretroviral (NNRTI)': { color: 'red', subtitle: 'Anti-infective' },
  'Antiretroviral (INSTI)': { color: 'red', subtitle: 'Anti-infective' },
  'Integrase inhibitor (INSTI)': { color: 'red', subtitle: 'Anti-infective' },
  'Antiretroviral (Protease inhibitor)': { color: 'red', subtitle: 'Anti-infective' },
  'Protease inhibitor (antiviral)': { color: 'red', subtitle: 'Anti-infective' },
  'Antiretroviral (Entry inhibitor)': { color: 'red', subtitle: 'Anti-infective' },
  'NtRTI': { color: 'red', subtitle: 'Anti-infective' },
  'Capsid inhibitor (antiretroviral)': { color: 'red', subtitle: 'Anti-infective' },
  'Terminase inhibitor (antiviral)': { color: 'red', subtitle: 'Anti-infective' },
  'Cap-dependent endonuclease inhibitor (antiviral)': { color: 'red', subtitle: 'Anti-infective' },
  'UL97 kinase inhibitor (antiviral)': { color: 'red', subtitle: 'Anti-infective' },
  'Nucleotide analogue (antiviral)': { color: 'red', subtitle: 'Anti-infective' },
  'Antimycobacterial': { color: 'red', subtitle: 'Anti-infective' },
  'Antileprotic': { color: 'red', subtitle: 'Anti-infective' },
  'Antiprotozoal': { color: 'red', subtitle: 'Anti-infective' },
  'Antimalarial': { color: 'red', subtitle: 'Anti-infective' },
  'Anthelmintic': { color: 'red', subtitle: 'Anti-infective' },
  'Monoclonal antibody (anti-SARS-CoV-2)': { color: 'red', subtitle: 'Anti-infective' },

  // Oncology/Immuno — indigo
  'Alkylating agent': { color: 'indigo', subtitle: 'Oncology' },
  'Antimetabolite': { color: 'indigo', subtitle: 'Oncology' },
  'Anthracycline': { color: 'indigo', subtitle: 'Oncology' },
  'Antimitotic (taxane/vinca)': { color: 'indigo', subtitle: 'Oncology' },
  'Vinca alkaloid': { color: 'indigo', subtitle: 'Oncology' },
  'Tyrosine kinase inhibitor': { color: 'indigo', subtitle: 'Oncology' },
  'Multikinase inhibitor': { color: 'indigo', subtitle: 'Oncology' },
  'Platinum': { color: 'indigo', subtitle: 'Oncology' },
  'Platinum agent': { color: 'indigo', subtitle: 'Oncology' },
  'Proteasome inhibitor': { color: 'indigo', subtitle: 'Oncology' },
  'PARP inhibitor': { color: 'indigo', subtitle: 'Oncology' },
  'Checkpoint inhibitor/Anti-VEGF combination': { color: 'indigo', subtitle: 'Oncology' },
  'Immunomodulator (IMiD)': { color: 'indigo', subtitle: 'Oncology' },
  'Topoisomerase inhibitor': { color: 'indigo', subtitle: 'Oncology' },
  'Antiandrogen': { color: 'indigo', subtitle: 'Oncology' },
  'Aromatase inhibitor': { color: 'indigo', subtitle: 'Oncology' },
  'Aromatase inhibitor (steroidal)': { color: 'indigo', subtitle: 'Oncology' },
  'SERM': { color: 'indigo', subtitle: 'Oncology' },
  'GnRH agonist': { color: 'indigo', subtitle: 'Oncology' },
  'Progestin': { color: 'indigo', subtitle: 'Oncology' },

  // Immunology/Biologics — green
  'Immunosuppressant': { color: 'green', subtitle: 'Immunology' },
  'mTOR inhibitor': { color: 'green', subtitle: 'Immunology' },
  'TNF-alpha inhibitor (mAb)': { color: 'green', subtitle: 'Immunology' },
  'TNF-alpha inhibitor (chimeric mAb)': { color: 'green', subtitle: 'Immunology' },
  'TNF-alpha inhibitor (fusion protein)': { color: 'green', subtitle: 'Immunology' },
  'Anti-IL6 receptor (mAb)': { color: 'green', subtitle: 'Immunology' },
  'Anti-IL17A (mAb)': { color: 'green', subtitle: 'Immunology' },
  'Anti-IL12/23 (mAb)': { color: 'green', subtitle: 'Immunology' },
  'Anti-CD20 (chimeric mAb)': { color: 'green', subtitle: 'Immunology' },
  'Anti-HER2 (mAb)': { color: 'green', subtitle: 'Immunology' },
  'Anti-VEGF (mAb)': { color: 'green', subtitle: 'Immunology' },
  'Anti-IgE mAb': { color: 'green', subtitle: 'Immunology' },
  'Anti-IL5 mAb': { color: 'green', subtitle: 'Immunology' },
  'Anti-IL5R mAb': { color: 'green', subtitle: 'Immunology' },
  'Anti-IL-5R monoclonal antibody': { color: 'green', subtitle: 'Immunology' },
  'Anti-IL-5 monoclonal antibody': { color: 'green', subtitle: 'Immunology' },
  'Anti-IL-12/23 monoclonal antibody': { color: 'green', subtitle: 'Immunology' },
  'Anti-ANGPTL3 monoclonal antibody': { color: 'green', subtitle: 'Immunology' },
  'Anti-TSLP monoclonal antibody': { color: 'green', subtitle: 'Immunology' },
  'Anti-sclerostin monoclonal antibody': { color: 'green', subtitle: 'Immunology' },
  'RANKL inhibitor': { color: 'green', subtitle: 'Immunology' },
  'PDE4 inhibitor': { color: 'green', subtitle: 'Immunology' },
  'JAK inhibitor': { color: 'green', subtitle: 'Immunology' },
  'JAK1 inhibitor': { color: 'green', subtitle: 'Immunology' },
  'JAK1/JAK2 inhibitor': { color: 'green', subtitle: 'Immunology' },
  'JAK3/TEC family kinase inhibitor': { color: 'green', subtitle: 'Immunology' },
  'Non-steroidal MRA': { color: 'green', subtitle: 'Immunology' },
  'Nrf2 activator': { color: 'green', subtitle: 'Immunology' },
  'Antisense oligonucleotide': { color: 'green', subtitle: 'Immunology' },
  'SMN2 splicing modifier': { color: 'green', subtitle: 'Immunology' },
  'Gene therapy (AAV vector)': { color: 'green', subtitle: 'Immunology' },

  // Pain/Musculoskeletal — orange
  'Muscle relaxant': { color: 'orange', subtitle: 'Musculoskeletal' },
  'Bisphosphonate': { color: 'orange', subtitle: 'Musculoskeletal' },

  // Toxicology/Antidote — yellow
  'Antidote': { color: 'yellow', subtitle: 'Toxicology' },
  'Chelator': { color: 'yellow', subtitle: 'Toxicology' },
  'Antidote (heparin)': { color: 'yellow', subtitle: 'Toxicology' },

  // Dermatology/Topical — slate
  'Topical corticosteroid': { color: 'slate', subtitle: 'Dermatology' },
  'Topical antifungal': { color: 'slate', subtitle: 'Dermatology' },
  'Antifungal (allylamine)': { color: 'slate', subtitle: 'Dermatology' },
  'Retinoid': { color: 'slate', subtitle: 'Dermatology' },
  'Antiseptic': { color: 'slate', subtitle: 'Dermatology' },
  'Topical antimicrobial': { color: 'slate', subtitle: 'Dermatology' },
  'Antipsoriatic': { color: 'slate', subtitle: 'Dermatology' },
  '5-alpha reductase inhibitor': { color: 'slate', subtitle: 'Dermatology' },
  '5-alpha-reductase inhibitor': { color: 'slate', subtitle: 'Dermatology' },

  // Ophthalmology — cyan
  'Antiglaucoma': { color: 'cyan', subtitle: 'Ophthalmology' },
  'Beta-blocker (ophthalmic)': { color: 'cyan', subtitle: 'Ophthalmology' },
  'Antibiotic (ophthalmic)': { color: 'cyan', subtitle: 'Ophthalmology' },
  'Corticosteroid (ophthalmic)': { color: 'cyan', subtitle: 'Ophthalmology' },
  'Anticholinergic (ophthalmic)': { color: 'cyan', subtitle: 'Ophthalmology' },
  'Diagnostic dye': { color: 'cyan', subtitle: 'Ophthalmology' },
  'Prostaglandin analogue': { color: 'cyan', subtitle: 'Ophthalmology' },

  // Allergy — pink
  'Antihistamine': { color: 'pink', subtitle: 'Allergy' },

  // Urology — teal
  'PDE-5 inhibitor': { color: 'teal', subtitle: 'Urology' },
  'Beta-3 agonist': { color: 'teal', subtitle: 'Urology' },
  'Antimuscarinic (Urology)': { color: 'teal', subtitle: 'Urology' },

  // Haematology — fuchsia
  'Hematopoietic growth factor': { color: 'fuchsia', subtitle: 'Haematology' },
  'Antifibrinolytic': { color: 'fuchsia', subtitle: 'Haematology' },
  'Hematologic agent': { color: 'fuchsia', subtitle: 'Haematology' },
  'TPO receptor agonist': { color: 'fuchsia', subtitle: 'Haematology' },
  'Growth factor': { color: 'fuchsia', subtitle: 'Haematology' },
  'Recombinant G-CSF (biosimilar)': { color: 'fuchsia', subtitle: 'Haematology' },

  // Nutrition — lime
  'Vitamin': { color: 'lime', subtitle: 'Nutrition' },
  'Mineral supplement': { color: 'lime', subtitle: 'Nutrition' },
  'Electrolyte': { color: 'lime', subtitle: 'Nutrition' },

  // Smoking cessation — emerald
  'Smoking cessation aid': { color: 'emerald', subtitle: 'Addiction Medicine' },

  // Anesthesia — violet
  'IV anaesthetic': { color: 'violet', subtitle: 'Anesthesia' },
  'General anaesthetic': { color: 'violet', subtitle: 'Anesthesia' },
  'Local anaesthetic': { color: 'violet', subtitle: 'Anesthesia' },
  'NMB agent': { color: 'violet', subtitle: 'Anesthesia' },
  'Neuromuscular blocking agent': { color: 'violet', subtitle: 'Anesthesia' },

  // Oxytocic — pink
  'Oxytocic': { color: 'pink', subtitle: 'OB/GYN' },
  'Prostaglandin': { color: 'pink', subtitle: 'OB/GYN' },

  // Antineoplastic fallback
  'Antineoplastic': { color: 'indigo', subtitle: 'Oncology' },

  // Scabicide
  'Scabicide/Pediculicide': { color: 'slate', subtitle: 'Dermatology' },
}

const DEFAULT_CONFIG = { color: 'slate', subtitle: 'Pharmacology' }

export const DRUG_CLASS_COLOR_MAP: Record<string, { bar: string; text: string; bg: string; badge: string; border: string; gradient: string }> = {
  rose:    { bar: 'bg-rose-500',    text: 'text-rose-600',    bg: 'bg-rose-50',    badge: 'bg-rose-100 text-rose-700',    border: 'border-rose-200/40',    gradient: 'from-rose-500/10 to-rose-500/20' },
  sky:     { bar: 'bg-sky-500',     text: 'text-sky-600',     bg: 'bg-sky-50',     badge: 'bg-sky-100 text-sky-700',     border: 'border-sky-200/40',     gradient: 'from-sky-500/10 to-sky-500/20' },
  amber:   { bar: 'bg-amber-500',   text: 'text-amber-600',   bg: 'bg-amber-50',   badge: 'bg-amber-100 text-amber-700', border: 'border-amber-200/40',   gradient: 'from-amber-500/10 to-amber-500/20' },
  teal:    { bar: 'bg-teal-500',    text: 'text-teal-600',    bg: 'bg-teal-50',    badge: 'bg-teal-100 text-teal-700',   border: 'border-teal-200/40',    gradient: 'from-teal-500/10 to-teal-500/20' },
  violet:  { bar: 'bg-violet-500',  text: 'text-violet-600',  bg: 'bg-violet-50',  badge: 'bg-violet-100 text-violet-700', border: 'border-violet-200/40', gradient: 'from-violet-500/10 to-violet-500/20' },
  emerald: { bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200/40', gradient: 'from-emerald-500/10 to-emerald-500/20' },
  red:     { bar: 'bg-red-500',     text: 'text-red-600',     bg: 'bg-red-50',     badge: 'bg-red-100 text-red-700',     border: 'border-red-200/40',     gradient: 'from-red-500/10 to-red-500/20' },
  indigo:  { bar: 'bg-indigo-500',  text: 'text-indigo-600',  bg: 'bg-indigo-50',  badge: 'bg-indigo-100 text-indigo-700', border: 'border-indigo-200/40', gradient: 'from-indigo-500/10 to-indigo-500/20' },
  orange:  { bar: 'bg-orange-500',  text: 'text-orange-600',  bg: 'bg-orange-50',  badge: 'bg-orange-100 text-orange-700', border: 'border-orange-200/40', gradient: 'from-orange-500/10 to-orange-500/20' },
  yellow:  { bar: 'bg-yellow-500',  text: 'text-yellow-600',  bg: 'bg-yellow-50',  badge: 'bg-yellow-100 text-yellow-700', border: 'border-yellow-200/40', gradient: 'from-yellow-500/10 to-yellow-500/20' },
  pink:    { bar: 'bg-pink-500',    text: 'text-pink-600',    bg: 'bg-pink-50',    badge: 'bg-pink-100 text-pink-700',    border: 'border-pink-200/40',    gradient: 'from-pink-500/10 to-pink-500/20' },
  cyan:    { bar: 'bg-cyan-500',    text: 'text-cyan-600',    bg: 'bg-cyan-50',    badge: 'bg-cyan-100 text-cyan-700',    border: 'border-cyan-200/40',    gradient: 'from-cyan-500/10 to-cyan-500/20' },
  green:   { bar: 'bg-green-500',   text: 'text-green-600',   bg: 'bg-green-50',   badge: 'bg-green-100 text-green-700',  border: 'border-green-200/40',   gradient: 'from-green-500/10 to-green-500/20' },
  slate:   { bar: 'bg-slate-500',   text: 'text-slate-600',   bg: 'bg-slate-50',   badge: 'bg-slate-100 text-slate-700',  border: 'border-slate-200/40',   gradient: 'from-slate-500/10 to-slate-500/20' },
  fuchsia: { bar: 'bg-fuchsia-500', text: 'text-fuchsia-600', bg: 'bg-fuchsia-50', badge: 'bg-fuchsia-100 text-fuchsia-700', border: 'border-fuchsia-200/40', gradient: 'from-fuchsia-500/10 to-fuchsia-500/20' },
  lime:    { bar: 'bg-lime-500',    text: 'text-lime-600',    bg: 'bg-lime-50',    badge: 'bg-lime-100 text-lime-700',    border: 'border-lime-200/40',    gradient: 'from-lime-500/10 to-lime-500/20' },
}

export function getDrugClassConfig(drugClass: string) {
  const cfg = DRUG_CLASS_CONFIG[drugClass]
    ?? DRUG_CLASS_CONFIG[drugClass.replace(/\s*\(.*\)$/, '')]
    ?? DEFAULT_CONFIG
  const colors = DRUG_CLASS_COLOR_MAP[cfg.color] ?? DRUG_CLASS_COLOR_MAP.slate
  return { ...cfg, ...colors }
}

export function getDrugClassColor(drugClass: string): string {
  const cfg = DRUG_CLASS_CONFIG[drugClass] ?? DEFAULT_CONFIG
  return DRUG_CLASS_COLOR_MAP[cfg.color]?.text ?? 'text-slate-600'
}

export function getDrugClassBadge(drugClass: string): string {
  const cfg = DRUG_CLASS_CONFIG[drugClass] ?? DEFAULT_CONFIG
  return DRUG_CLASS_COLOR_MAP[cfg.color]?.badge ?? 'bg-slate-100 text-slate-700'
}

export function getDrugClassGradient(drugClass: string): string {
  const cfg = DRUG_CLASS_CONFIG[drugClass] ?? DEFAULT_CONFIG
  return DRUG_CLASS_COLOR_MAP[cfg.color]?.gradient ?? 'from-slate-500/10 to-slate-500/20'
}
