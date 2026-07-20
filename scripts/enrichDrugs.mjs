/**
 * enrichDrugs.mjs — Adds enriched fields (MoA, brands, pregnancy, warnings,
 * overdose, PK, BBWs, pearls) to all 149 bundled drugs.
 *
 * Run: node scripts/enrichDrugs.mjs
 */
import { readFileSync, writeFileSync } from 'fs'

const FILE = 'src/data/drugIndexData.ts'
let src = readFileSync(FILE, 'utf-8')

// ── Helper: drug-class templates ────────────────────────────────────────────
const T = {
  // Generic template per drug class for mechanism_of_action
  moa: {
    'Penicillin': (n) => `Bactericidal: inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs), blocking transpeptidation and peptidoglycan cross-linking.${n.includes('Clavulanate') || n.includes('Clavulanic') ? ' Spectrum extended by beta-lactamase inhibitor.' : ''}`,
    'Cephalosporin': () => 'Bactericidal: inhibits bacterial cell wall synthesis via PBP binding, disrupting peptidoglycan cross-linking. Broad-spectrum activity.',
    'Macrolide': () => 'Bacteriostatic: binds to 50S ribosomal subunit, inhibiting bacterial protein synthesis by blocking peptide chain elongation.',
    'Fluoroquinolone': () => 'Bactericidal: inhibits DNA gyrase (topoisomerase II) and topoisomerase IV, preventing bacterial DNA replication and transcription.',
    'Tetracycline': () => 'Bacteriostatic: binds to 30S ribosomal subunit, inhibiting bacterial protein synthesis by blocking aminoacyl-tRNA binding to the ribosome. Also has anti-inflammatory effects.',
    'Nitroimidazole': () => 'Bactericidal: reduced intracellularly to reactive intermediates that damage bacterial DNA and proteins. Active against anaerobic bacteria and protozoa.',
    'Antifungal': () => 'Antifungal: inhibits fungal cytochrome P450 14α-demethylase, disrupting ergosterol synthesis and fungal cell membrane integrity.',
    'Antimalarial': () => 'Antimalarial: interferes with parasite metabolism and heme detoxification pathways, leading to parasite death.',
    'Antimycobacterial': () => 'Bactericidal: inhibits mycobacterial cell wall synthesis or nucleic acid synthesis.',
    'Antiviral': () => 'Antiviral: inhibits viral nucleic acid synthesis or viral enzyme activity, blocking viral replication.',
    'Antiretroviral': () => 'Antiretroviral: inhibits HIV viral replication by targeting reverse transcriptase, integrase, or protease enzymes.',
    'Aminoglycoside': () => 'Bactericidal: irreversibly binds 30S ribosomal subunit, causing mRNA misreading and inhibiting protein synthesis. Concentration-dependent killing.',
    'Lincosamide': () => 'Bacteriostatic: binds 50S ribosomal subunit, inhibiting protein synthesis by blocking peptide bond formation. Active against anaerobes and Gram-positive cocci.',
    'Sulfonamide': () => 'Bacteriostatic: inhibits bacterial dihydrofolate synthesis by competitive antagonism of PABA, blocking nucleic acid synthesis.',
    'Calcium channel blocker': () => 'Antihypertensive: blocks L-type calcium channels in vascular smooth muscle and cardiac myocytes, causing vasodilation and reduced peripheral vascular resistance.',
    'ACE inhibitor': () => 'ACE inhibitor: competitively inhibits angiotensin-converting enzyme, reducing angiotensin II formation, decreasing vasoconstriction and aldosterone secretion.',
    'ARB': () => 'Angiotensin II receptor blocker: selectively blocks AT1 receptors, reducing angiotensin II-mediated vasoconstriction and aldosterone secretion.',
    'Thiazide diuretic': () => 'Thiazide diuretic: inhibits Na+/Cl- cotransporter in distal convoluted tubule, increasing sodium and water excretion while reducing peripheral vascular resistance.',
    'Loop diuretic': () => 'Loop diuretic: inhibits Na+/K+/2Cl- cotransporter in the thick ascending loop of Henle, producing potent diuresis and vasodilation.',
    'Potassium-sparing diuretic': () => 'Potassium-sparing diuretic: competitive aldosterone antagonist in the collecting duct, inhibiting Na+/K+ exchange and reducing potassium excretion.',
    'Beta-blocker': () => 'Beta-blocker: blocks beta-adrenergic receptors, reducing heart rate, contractility, and myocardial oxygen demand.',
    'Statin': () => 'HMG-CoA reductase inhibitor: inhibits HMG-CoA reductase, reducing cholesterol biosynthesis. Also has pleiotropic anti-inflammatory effects.',
    'Cardiac glycoside': () => 'Cardiac glycoside: inhibits Na+/K+-ATPase, increasing intracellular Ca2+, enhancing myocardial contractility. Also has vagomimetic effects on AV node.',
    'Nitrate': () => 'Nitrate vasodilator: metabolized to NO activating guanylyl cyclase, increasing cGMP and causing venous and arterial vasodilation.',
    'Benzodiazepine': () => 'Benzodiazepine: potentiates GABA-A receptor activity by increasing chloride channel opening frequency. Anxiolytic, sedative, muscle relaxant, anticonvulsant.',
    'Antidepressant': () => 'Antidepressant: inhibits reuptake of serotonin and/or norepinephrine at presynaptic terminals, increasing monoamine availability in the synaptic cleft.',
    'SSRI': () => 'SSRI: selectively inhibits presynaptic serotonin (5-HT) reuptake, increasing synaptic serotonin availability. Minimal effect on NE or dopamine.',
    'Antipsychotic': () => 'Antipsychotic: postsynaptic dopamine D2 receptor antagonist in mesolimbic and mesocortical pathways. Atypical agents also block 5-HT2A receptors.',
    'Anticonvulsant': () => 'Anticonvulsant: stabilizes neuronal membranes by modulating ion channels or enhancing GABAergic transmission, reducing neuronal excitability.',
    'Dopaminergic': () => 'Dopaminergic: levodopa is converted to dopamine in the brain, restoring striatal dopamine levels in Parkinson disease.',
    'NSAID': () => 'NSAID: non-selective COX-1 and COX-2 inhibitor, reducing prostaglandin synthesis responsible for pain, inflammation, and fever.',
    'Opioid': () => 'Pure mu-opioid receptor agonist: activates mu-opioid receptors in the CNS and periphery, producing analgesia, sedation, and respiratory depression.',
    'PPI': () => 'Proton pump inhibitor: irreversibly binds H+/K+-ATPase in gastric parietal cells, blocking final step of gastric acid secretion. Profound, prolonged acid suppression.',
    'H2 receptor antagonist': () => 'H2-receptor antagonist: competitively blocks histamine H2 receptors on gastric parietal cells, reducing basal and stimulated gastric acid secretion.',
    'Antiemetic': () => 'Antiemetic: blocks dopamine D2, 5-HT3, or histamine receptors in the chemoreceptor trigger zone, suppressing nausea and vomiting.',
    '5-HT3 antagonist': () => '5-HT3 receptor antagonist: blocks serotonin type 3 receptors in CTZ and GI tract, suppressing nausea and vomiting.',
    'Antidiarrhoeal': () => 'Antidiarrheal: peripheral mu-opioid receptor agonist in gut wall, reducing GI motility and peristalsis. Inhibits fluid secretion and enhances absorption.',
    'Laxative': () => 'Laxative: promotes bowel evacuation by increasing stool water content, stimulating peristalsis, or softening stool consistency.',
    'Biguanide': () => 'Biguanide: activates AMP-kinase, reducing hepatic gluconeogenesis, increasing insulin sensitivity, and decreasing intestinal glucose absorption.',
    'Sulfonylurea': () => 'Sulfonylurea: blocks ATP-sensitive K+ channels on pancreatic beta cells, stimulating insulin secretion. Increases peripheral insulin sensitivity.',
    'Insulin': () => 'Insulin: exogenous insulin binds to insulin receptors on target cells, facilitating glucose uptake into cells, especially skeletal muscle and adipose tissue.',
    'Thyroid hormone': () => 'Synthetic T4 hormone: converted to T3 (active form) in peripheral tissues, normalizing metabolic rate and TSH levels.',
    'Corticosteroid': () => 'Corticosteroid: glucocorticoid receptor agonist, modulating transcription of pro-inflammatory and anti-inflammatory genes.',
    'SABA': () => 'Short-acting beta-2 agonist: selectively stimulates beta-2 receptors in bronchial smooth muscle, causing bronchodilation via increased cAMP.',
    'Anticholinergic': () => 'Anticholinergic bronchodilator: blocks muscarinic M3 receptors in bronchial smooth muscle, reducing vagally-mediated bronchoconstriction.',
    'Inhaled corticosteroid': () => 'Inhaled corticosteroid: glucocorticoid receptor agonist in airway epithelium, reducing airway inflammation, mucus production, and bronchial hyperresponsiveness.',
    'Methylxanthine': () => 'Methylxanthine: non-selective PDE inhibitor, increasing cAMP in bronchial smooth muscle. Also has anti-inflammatory and respiratory stimulant effects.',
    'Leukotriene receptor antagonist': () => 'Leukotriene receptor antagonist: selectively blocks CysLT1 receptors in airway, reducing leukotriene-mediated bronchoconstriction and inflammation.',
    'Mucolytic': () => 'Mucolytic: reduces mucus viscosity by breaking disulfide bonds in mucus glycoproteins, facilitating expectoration.',
    'Anticoagulant': () => 'Anticoagulant: potentiates antithrombin III activity, accelerating inactivation of clotting factors, reducing thrombus formation.',
    'Antiplatelet': () => 'Antiplatelet: inhibits platelet aggregation by blocking thromboxane A2 synthesis, ADP receptors, or other platelet activation pathways.',
    'Alkylating agent': () => 'Alkylating agent: cross-links DNA via alkylation, preventing DNA replication and transcription. Cell cycle non-specific.',
    'Antimetabolite': () => 'Antimetabolite: inhibits key enzymes in DNA/RNA synthesis pathways (folate metabolism, pyrimidine/purine synthesis), blocking cell division.',
    'SERM': () => 'Selective estrogen receptor modulator: competitively inhibits estrogen binding in breast tissue (antagonist). Partial agonist in bone and endometrium.',
    'Tyrosine kinase inhibitor': () => 'Tyrosine kinase inhibitor: selectively inhibits specific tyrosine kinase enzymes (e.g., BCR-ABL, EGFR), blocking cancer cell proliferation and inducing apoptosis.',
    'Anthracycline': () => 'Anthracycline: intercalates between DNA base pairs, inhibits topoisomerase II, and generates reactive oxygen species causing DNA damage.',
    'Taxane': () => 'Taxane: promotes microtubule polymerization and stabilization, preventing mitotic spindle breakdown, blocking cell division at G2/M phase.',
    'Immunosuppressant': () => 'Immunosuppressant: inhibits T-cell activation and proliferation by blocking cytokine production or purine metabolism.',
    'Calcineurin inhibitor': () => 'Calcineurin inhibitor: inhibits calcineurin phosphatase, blocking IL-2 transcription and T-cell activation.',
    'Antihistamine': () => 'Antihistamine: H1-receptor antagonist, blocking histamine-mediated allergic responses.',
    'Topical corticosteroid': () => 'Topical corticosteroid: glucocorticoid receptor agonist in skin cells, reducing pro-inflammatory cytokine production and immune cell migration.',
    'Oxytocic': () => 'Oxytocic: stimulates uterine smooth muscle contraction, used for induction of labor and prevention of postpartum hemorrhage.',
    'Prostaglandin': () => 'Prostaglandin analogue: stimulates uterine contractions and cervical ripening. Also has mucosal protective effects in the GI tract.',
    'Scabicide': () => 'Scabicide/pediculicide: disrupts sodium channel function in arthropod nerve cells, causing paralysis and death.',
    'Antiseptic': () => 'Antiseptic: disrupts microbial cell membranes and proteins, providing broad-spectrum antimicrobial action on skin and mucous membranes.',
    'Electrolyte': () => 'Electrolyte replenisher: provides essential electrolytes, correcting deficits and maintaining acid-base balance.',
    'Vitamin': () => 'Vitamin supplement: provides essential micronutrients required for normal metabolic function, enzyme activity, and cellular processes.',
    'Iron': () => 'Iron supplement: provides elemental iron essential for hemoglobin synthesis, myoglobin, and oxidative enzyme function.',
    'Anaesthetic': () => 'Anaesthetic agent: depresses CNS function, producing loss of consciousness and/or sensation.',
    'Local anaesthetic': () => 'Local anaesthetic: blocks voltage-gated sodium channels in nerve fibers, preventing impulse conduction and producing reversible loss of sensation.',
    'Muscle relaxant': () => 'Neuromuscular blocking agent: blocks transmission at the neuromuscular junction, producing skeletal muscle paralysis.',
    'Antidote': () => 'Antidote: reverses or neutralizes the toxic effects of specific drugs or poisons through direct binding or metabolic modulation.',
    'Anthelmintic': () => 'Anthelmintic: paralyses or kills parasitic worms by disrupting their neuromuscular function or metabolic pathways.',
  },
  // Default MOA for unknown drug classes
  defaultMoa: (cls) => `Pharmacological agent: acts through specific receptor or enzyme interactions to produce therapeutic effects. Drug class: ${cls}.`,

  // Brands per class — will be overridden for specific drugs
  brands: {
    'Penicillin': ['Generic Penicillin', 'Penicillin V', 'Penbritin'],
    'Cephalosporin': ['Generic Cephalosporin', 'Cefradine', 'Cephalexin'],
    'Macrolide': ['Generic Macrolide', 'Erythromycin', 'Clarithromycin'],
    'Fluoroquinolone': ['Generic Quinolone', 'Norfloxacin', 'Levofloxacin'],
    'Tetracycline': ['Tetracycline', 'Doxycycline', 'Oxytetracycline'],
    'Nitroimidazole': ['Metronidazole', 'Flagyl', 'Metrogyl'],
    'Antifungal': ['Generic Antifungal', 'Fluconazole', 'Ketoconazole'],
    'Antimalarial': ['Generic Antimalarial', 'Chloroquine', 'Quinine'],
    'Antimycobacterial': ['Generic Antimycobacterial', 'Rifampicin', 'Isoniazid'],
    'Antiviral': ['Generic Antiviral', 'Acyclovir', 'Valacyclovir'],
    'Antiretroviral': ['Generic ARV', 'Tenofovir', 'Lamivudine'],
    'Aminoglycoside': ['Gentamicin', 'Amikacin', 'Streptomycin'],
    'Lincosamide': ['Clindamycin', 'Dalacin C', 'Lincomycin'],
    'Calcium channel blocker': ['Nifedipine', 'Amlodipine', 'Verapamil'],
    'ACE inhibitor': ['Enalapril', 'Captopril', 'Lisinopril'],
    'ARB': ['Losartan', 'Valsartan', 'Candesartan'],
    'Thiazide diuretic': ['Hydrochlorothiazide', 'Chlortalidone', 'Indapamide'],
    'Loop diuretic': ['Furosemide', 'Bumetanide', 'Torsemide'],
    'Potassium-sparing diuretic': ['Spironolactone', 'Eplerenone', 'Amiloride'],
    'Beta-blocker': ['Atenolol', 'Metoprolol', 'Propranolol'],
    'Statin': ['Atorvastatin', 'Simvastatin', 'Rosuvastatin'],
    'Cardiac glycoside': ['Digoxin', 'Digitoxin', 'Lanoxin'],
    'Nitrate': ['Glyceryl Trinitrate', 'Isosorbide Dinitrate', 'Isosorbide Mononitrate'],
    'Benzodiazepine': ['Diazepam', 'Lorazepam', 'Alprazolam'],
    'Antidepressant': ['Amitriptyline', 'Imipramine', 'Clomipramine'],
    'SSRI': ['Fluoxetine', 'Sertraline', 'Citalopram'],
    'Antipsychotic': ['Haloperidol', 'Chlorpromazine', 'Risperidone'],
    'Anticonvulsant': ['Phenytoin', 'Carbamazepine', 'Valproate'],
    'NSAID': ['Ibuprofen', 'Diclofenac', 'Naproxen'],
    'Opioid': ['Morphine', 'Codeine', 'Fentanyl'],
    'PPI': ['Omeprazole', 'Pantoprazole', 'Esomeprazole'],
    'H2 receptor antagonist': ['Ranitidine', 'Famotidine', 'Nizatidine'],
    'Biguanide': ['Metformin', 'Glucophage', 'Fortamet'],
    'Sulfonylurea': ['Glibenclamide', 'Gliclazide', 'Glipizide'],
    'Insulin': ['Actrapid', 'Humulin', 'Novolin'],
    'Thyroid hormone': ['Levothyroxine', 'Eltroxin', 'Synthroid'],
    'Corticosteroid': ['Prednisolone', 'Dexamethasone', 'Hydrocortisone'],
    'Anticoagulant': ['Warfarin', 'Heparin', 'Enoxaparin'],
    'Antiplatelet': ['Aspirin', 'Clopidogrel', 'Ticagrelor'],
  },
  defaultBrands: ['Generic Brand'],
}

// ── Pregnancy categories per drug class ──────────────────────────────────────
const PREG = {
  'Penicillin': 'B', 'Cephalosporin': 'B', 'Macrolide': 'B', 'Fluoroquinolone': 'C',
  'Tetracycline': 'D', 'Nitroimidazole': 'B', 'Antifungal': 'C', 'Antimalarial': 'C',
  'Antimycobacterial': 'C', 'Antiviral': 'B', 'Antiretroviral': 'B', 'Aminoglycoside': 'C',
  'Lincosamide': 'B', 'Sulfonamide': 'C', 'Urinary antiseptic': 'B',
  'Calcium channel blocker': 'C', 'ACE inhibitor': 'D', 'ARB': 'D',
  'Thiazide diuretic': 'B', 'Loop diuretic': 'C', 'Potassium-sparing diuretic': 'C',
  'Beta-blocker': 'C', 'Statin': 'X', 'Cardiac glycoside': 'C', 'Nitrate': 'C',
  'Benzodiazepine': 'D', 'Antidepressant': 'C', 'SSRI': 'C', 'Antipsychotic': 'C',
  'Anticonvulsant': 'D', 'Dopaminergic': 'C', 'Analgesic': 'B', 'NSAID': 'C',
  'Opioid': 'C', 'PPI': 'C', 'H2 receptor antagonist': 'B',
  'Antiemetic': 'B', '5-HT3 antagonist': 'B', 'Antidiarrhoeal': 'C',
  'Laxative': 'B', 'Biguanide': 'B', 'Sulfonylurea': 'C',
  'Insulin': 'B', 'Thyroid hormone': 'A', 'Corticosteroid': 'C',
  'SABA': 'A', 'Anticholinergic bronchodilator': 'B', 'Inhaled corticosteroid': 'B',
  'Methylxanthine': 'C', 'Leukotriene receptor antagonist': 'B', 'Mucolytic': 'B',
  'Anticoagulant': 'C', 'Antiplatelet': 'C',
  'Alkylating agent': 'D', 'Antimetabolite': 'X', 'SERM': 'D',
  'Tyrosine kinase inhibitor': 'D', 'Anthracycline': 'D', 'Taxane': 'D',
  'Immunosuppressant': 'D', 'Calcineurin inhibitor': 'C', 'Antihistamine': 'B',
  'Topical corticosteroid': 'C', 'Scabicide': 'B', 'Antiparasitic': 'C',
  'Oxytocic': 'C', 'Prostaglandin': 'C', 'Ergot alkaloid': 'C',
  'Antiseptic': 'B', 'Electrolyte': 'A', 'Vitamin': 'A', 'Iron supplement': 'A',
  'Local anaesthetic': 'B', 'Depolarizing muscle relaxant': 'C',
  'Barbiturate': 'D', 'Barbiturate anaesthetic': 'C', 'Dissociative anaesthetic': 'C',
  'IV anaesthetic': 'C', 'Analgesic/Antipyretic': 'A',
  'Anthelmintic': 'C', 'Antiretroviral (NNRTI)': 'C',
}

// ── Specific overrides for each drug ─────────────────────────────────────────
// Format: [id]: { field: value, ... }
// Only includes non-generic data. Generic data computed by class.
const OVERRIDES = {
  'bundled-001': { moa: 'Bactericidal: inhibits bacterial cell wall synthesis by binding to PBPs.', brands: ['Amoxil', 'Moxatag', 'Trimox'], preg: 'B', pearls: ['Take with food to reduce GI upset', 'Complete full course'], bbw: [] },
  'bundled-002': { moa: 'Amoxicillin inhibits cell wall synthesis; clavulanic acid irreversibly inhibits beta-lactamase enzymes.', brands: ['Augmentin', 'Co-amoxiclav', 'Clavulin'], preg: 'B', pearls: ['Take on empty stomach for best absorption', 'Monitor LFTs in elderly'], bbw: [] },
  'bundled-003': { moa: 'Bactericidal: inhibits cell wall synthesis via PBP binding. Broad-spectrum with enhanced Gram-negative coverage.', brands: ['Rocephin', 'Epicephin', 'Triaxone'], preg: 'B', bbw: ['Do not mix with calcium-containing IV solutions in neonates — fatal precipitates reported'], pearls: ['Once-daily dosing simplifies outpatient therapy'] },
  'bundled-004': { moa: 'Bactericidal: inhibits cell wall synthesis via PBP binding. Resistant to many beta-lactamases.', brands: ['Suprax', 'Oroken', 'Cefspan'], preg: 'B', pearls: ['Oral option for step-down from IV ceftriaxone', 'Once-daily dosing'], bbw: [] },
  'bundled-005': { moa: 'Bacteriostatic: binds 50S ribosomal subunit, inhibiting protein synthesis. Also immunomodulatory.', brands: ['Zithromax', 'Azithrocin', 'Sumamed'], preg: 'B', pearls: ['Short 3-5 day course due to long tissue half-life', 'Single dose for chlamydia'], bbw: [] },
  'bundled-006': { moa: 'Bactericidal: inhibits DNA gyrase and topoisomerase IV, preventing DNA replication.', brands: ['Ciprobay', 'Cipro', 'Ciflox'], preg: 'C', bbw: ['Fluoroquinolones increase risk of tendinitis and tendon rupture', 'May exacerbate myasthenia gravis', 'Peripheral neuropathy potentially irreversible'], pearls: ['Absorption reduced by dairy, antacids, iron — separate by 2h', 'Excellent oral bioavailability'] },
  'bundled-007': { moa: 'Bacteriostatic: binds 30S ribosomal subunit, inhibiting protein synthesis. Also anti-inflammatory.', brands: ['Vibramycin', 'Doxylin', 'Oracea'], preg: 'D', pearls: ['Take with full glass of water, remain upright 30 min', 'Anti-inflammatory effects useful in rosacea'], bbw: [] },
  'bundled-008': { moa: 'Bactericidal: reduced intracellularly to reactive intermediates damaging bacterial DNA. Active against anaerobes and protozoa.', brands: ['Flagyl', 'Metrogyl', 'Rozex'], preg: 'B', bbw: [], pearls: ['IV and oral bioequivalent — switch when patient tolerates oral', 'Avoid alcohol during and 48h after therapy'] },
  'bundled-009': { moa: 'Antifungal: inhibits fungal CYP450 14A-demethylase, disrupting ergosterol synthesis.', brands: ['Canesten', 'Clotribet', 'Gyno-Daktarin'], preg: 'C', pearls: ['Apply sparingly', 'Continue 1-2 weeks after symptoms resolve'], bbw: [] },
  'bundled-010': { moa: 'Antifungal: inhibits fungal CYP450 14A-demethylase, blocking ergosterol synthesis.', brands: ['Diflucan', 'Flucort', 'Zocon'], preg: 'D', pearls: ['Excellent CSF penetration — DOC for cryptococcal meningitis', 'Single 150mg dose for vaginal candidiasis'], bbw: [] },
  'bundled-011': { moa: 'Artemether produces free radicals damaging parasite membranes; lumefantrine inhibits hemozoin formation. ACT.', brands: ['Coartem', 'Riamet', 'Lumether'], preg: 'C', pearls: ['Take with fatty meal to quadruple lumefantrine absorption', 'Complete 6-dose regimen'], bbw: [] },
  'bundled-012': { moa: 'Schizonticidal: interferes with parasite heme polymerization.', brands: ['Quinimax', 'Quinbiotic', 'Quinate'], preg: 'C', pearls: ['Always combine with doxycycline or clindamycin', 'Monitor blood glucose'], bbw: [] },
  'bundled-013': { moa: 'Bactericidal: inhibits bacterial DNA-dependent RNA polymerase.', brands: ['Rifadin', 'Rimactane', 'Rifampin'], preg: 'C', bbw: ['Severe hepatotoxicity — monitor LFTs'], pearls: ['Potent CYP3A4 inducer', 'Orange-red urine, sweat, tears — warn patients'] },
  'bundled-014': { moa: 'Bactericidal: inhibits mycolic acid synthesis, essential component of mycobacterial cell wall.', brands: ['INH', 'Isocid', 'Tibinide'], preg: 'C', bbw: ['Severe hepatitis may occur — discontinue if LFTs elevated'], pearls: ['Always co-administer pyridoxine 10-25mg/day'] },
  'bundled-015': { moa: 'Bacteriostatic: inhibits arabinosyl transferase, blocking arabinogalactan synthesis.', brands: ['Myambutol', 'Etapiam', 'Ebutol'], preg: 'C', pearls: ['Monthly visual acuity testing mandatory', 'Dose adjust in renal impairment'], bbw: [] },
  'bundled-016': { moa: 'Bactericidal: converted to pyrazinoic acid inside mycobacteria, disrupting membrane energetics.', brands: ['Zinamide', 'Pyrafat', 'PZA'], preg: 'C', pearls: ['Asymptomatic hyperuricemia common', 'Used only in 2-month intensive phase'], bbw: [] },
  'bundled-017': { moa: 'Antiviral: phosphorylated to acyclovir triphosphate which inhibits viral DNA polymerase.', brands: ['Zovirax', 'Acivir', 'Herpex'], preg: 'B', pearls: ['IV must be infused slowly over 1h', 'Dose adjust in renal impairment'], bbw: [] },
  'bundled-018': { moa: 'NtRTI: competitively inhibits HIV reverse transcriptase and incorporates into viral DNA causing chain termination.', brands: ['Viread', 'Tenof', 'Tenvir'], preg: 'B', bbw: ['Lactic acidosis and severe hepatomegaly reported'], pearls: ['TAF has better renal safety than TDF', 'Check renal function before starting'] },
  'bundled-019': { moa: 'NRTI: phosphorylated to active triphosphate which inhibits HIV reverse transcriptase.', brands: ['Epivir', 'Lamivir', 'Zeffix'], preg: 'C', bbw: ['Lactic acidosis and hepatomegaly reported'], pearls: ['Active against both HIV-1 and HBV', 'Part of fixed-dose combinations'] },
  'bundled-020': { moa: 'INSTI: inhibits HIV integrase, blocking viral DNA integration into host genome.', brands: ['Tivicay', 'Dolutegravir', 'Dovir'], preg: 'B', pearls: ['High genetic barrier to resistance', 'Double dose with rifampicin'], bbw: [] },
  'bundled-021': { moa: 'Bactericidal: irreversibly binds 30S ribosomal subunit, causing mRNA misreading.', brands: ['Garamycin', 'Genticyn', 'Refobacin'], preg: 'C', bbw: ['Aminoglycosides associated with nephrotoxicity and ototoxicity'], pearls: ['Once-daily dosing reduces toxicity', 'Monitor trough levels'] },
  'bundled-022': { moa: 'Bacteriostatic: binds 50S ribosomal subunit, inhibiting protein synthesis.', brands: ['Dalacin C', 'Clindacin', 'Cleocin'], preg: 'B', pearls: ['Excellent bone penetration', 'C. difficile risk — warn patients'], bbw: [] },
  'bundled-023': { moa: 'Bactericidal: reduced to reactive intermediates damaging bacterial DNA. Concentrated in urine.', brands: ['Furadantin', 'Macrobid', 'Macrodantin'], preg: 'B', pearls: ['Contraindicated if CrCl <30 mL/min', 'Short 3-5 day courses preferred'], bbw: [] },
  'bundled-024': { moa: 'Dihydropyridine CCB: blocks L-type calcium channels causing vasodilation.', brands: ['Norvasc', 'Amloc', 'Istin'], preg: 'C', pearls: ['Once-daily dosing', 'Edema less likely with combination ACEi/ARB'], bbw: [] },
  'bundled-025': { moa: 'ACE inhibitor: inhibits ACE, reducing angiotensin II formation.', brands: ['Renitec', 'Enace', 'Inhibace'], preg: 'D', bbw: ['DO NOT USE IN PREGNANCY'], pearls: ['Monitor K+ and Cr 1-2 weeks after starting'] },
  'bundled-026': { moa: 'ARB: selectively blocks AT1 receptors.', brands: ['Cozaar', 'Losatec', 'Lozab'], preg: 'D', bbw: ['DO NOT USE IN PREGNANCY'], pearls: ['Active metabolite 10-40x more potent than losartan', 'May reduce uric acid'] },
  'bundled-027': { moa: 'Thiazide diuretic: inhibits Na/Cl cotransporter in DCT.', brands: ['Hydrodiuril', 'Esidrix', 'Dichlotride'], preg: 'B', pearls: ['Take in morning to avoid nocturia', 'Low-dose minimizes metabolic side effects'], bbw: [] },
  'bundled-028': { moa: 'Loop diuretic: inhibits Na/K/2Cl cotransporter in thick ascending loop.', brands: ['Lasix', 'Frusid', 'Furoscar'], preg: 'C', pearls: ['Twice-daily due to short half-life', 'Variable oral bioavailability'], bbw: [] },
  'bundled-029': { moa: 'K-sparing diuretic: competitive aldosterone antagonist in collecting duct.', brands: ['Aldactone', 'Spiroctan', 'Verospiron'], preg: 'C', pearls: ['Monitor K+ and Cr after 1 week', 'Gynecomastia common in men'], bbw: [] },
  'bundled-030': { moa: 'Cardioselective beta-1 blocker: reduces heart rate, contractility, AV conduction.', brands: ['Concor', 'Cardicor', 'Bisocor'], preg: 'C', pearls: ['Once-daily due to long half-life', 'More cardioselective than atenolol'], bbw: [] },
  'bundled-031': { moa: 'Non-selective beta-blocker with alpha-1 blocking activity. Also antioxidant.', brands: ['Coreg', 'Dilatrend', 'Carvedix'], preg: 'C', pearls: ['Gold-standard beta-blocker in heart failure', 'Take with food'], bbw: [] },
  'bundled-032': { moa: 'HMG-CoA reductase inhibitor (statin). Also pleiotropic anti-inflammatory effects.', brands: ['Lipitor', 'Atorva', 'Torvast'], preg: 'X', pearls: ['Long half-life allows evening or morning dosing', 'Avoid grapefruit juice'], bbw: [] },
  'bundled-033': { moa: 'HMG-CoA reductase inhibitor (statin). Prodrug requiring hepatic activation.', brands: ['Zocor', 'Simvax', 'Vytorin'], preg: 'X', pearls: ['Take in evening (short half-life)', '80mg dose carries higher myopathy risk'], bbw: [] },
  'bundled-034': { moa: 'Cardiac glycoside: inhibits Na/K-ATPase, increasing myocardial contractility.', brands: ['Lanoxin', 'Digoxin', 'Cardoxin'], preg: 'C', pearls: ['Check level 6-8h post-dose', 'Hold if HR <60 bpm'], bbw: [] },
  'bundled-035': { moa: 'Nitrate vasodilator: metabolized to NO, increasing cGMP causing venodilation.', brands: ['Nitrostat', 'Nitro-Dur', 'Angised'], preg: 'C', bbw: ['DO NOT USE WITH PDE-5 INHIBITORS — severe hypotension'], pearls: ['If pain persists after 3 doses, seek emergency care'] },
  'bundled-036': { moa: 'Central alpha-2 agonist: reduces sympathetic outflow from CNS.', brands: ['Aldomet', 'Medopa', 'Dopamet'], preg: 'B', pearls: ['Preferred in pregnancy', 'Titrate slowly to minimize sedation'], bbw: [] },
  'bundled-037': { moa: 'Benzodiazepine: potentiates GABA-A activity. Anxiolytic, sedative, anticonvulsant.', brands: ['Valium', 'Diazemuls', 'Stesolid'], preg: 'D', bbw: ['Concurrent use with opioids may cause profound sedation, respiratory depression, coma, death'], pearls: ['Use shortest duration possible (<2-4 weeks)'] },
  'bundled-038': { moa: 'Benzodiazepine: potentiates GABA-A activity. Intermediate-acting.', brands: ['Ativan', 'Lorapam', 'Temesta'], preg: 'D', bbw: ['Concurrent use with opioids may cause profound sedation, respiratory depression, coma, death'], pearls: ['Preferred in elderly — no active metabolites'] },
  'bundled-039': { moa: 'TCA: inhibits reuptake of serotonin and norepinephrine.', brands: ['Elavil', 'Tryptanol', 'Amitrip'], preg: 'C', bbw: ['Antidepressants increase suicidal thinking in children, adolescents, young adults'], pearls: ['Highly lethal in overdose — limit prescription quantity'] },
  'bundled-040': { moa: 'SSRI: selectively inhibits serotonin reuptake.', brands: ['Prozac', 'Flutine', 'Floxtin'], preg: 'C', bbw: ['Antidepressants increase suicidal thinking in children, adolescents, young adults'], pearls: ['Very long half-life', 'Take in morning (activating)'] },
  'bundled-041': { moa: 'SSRI: selectively inhibits serotonin reuptake.', brands: ['Zoloft', 'Serlin', 'Stimuloton'], preg: 'C', bbw: ['Antidepressants increase suicidal thinking in children, adolescents, young adults'], pearls: ['Most activating SSRI — take in morning', 'Fewer drug interactions than other SSRIs'] },
  'bundled-042': { moa: 'Typical antipsychotic: D2 receptor antagonist.', brands: ['Haldol', 'Serenace', 'Haloper'], preg: 'C', bbw: ['Elderly with dementia-related psychosis at increased risk of death'], pearls: ['IM works 30-60 min for acute agitation'] },
  'bundled-043': { moa: 'Atypical antipsychotic: D2 and 5-HT2A antagonist.', brands: ['Risperdal', 'Risperin', 'Sizodon'], preg: 'C', bbw: ['Elderly with dementia-related psychosis at increased risk of death'], pearls: ['Active metabolite (paliperidone)', 'Dose adjust in renal impairment'] },
  'bundled-044': { moa: 'Anticonvulsant: blocks voltage-gated sodium channels.', brands: ['Tegretol', 'Carbatrol', 'Epitol'], preg: 'D', bbw: ['Serious dermatologic reactions (SJS/TEN) — discontinue at first rash'], pearls: ['Potent CYP3A4 inducer', 'HLA-B*1502 screening in Asians'] },
  'bundled-045': { moa: 'Anticonvulsant/mood stabilizer: increases GABA, blocks Na and Ca channels.', brands: ['Depakote', 'Epilim', 'Valparin'], preg: 'D', bbw: ['Fatal hepatotoxicity in children <2 on polytherapy'], pearls: ['Avoid in women of childbearing potential unless essential'] },
  'bundled-046': { moa: 'Anticonvulsant: blocks voltage-gated sodium channels.', brands: ['Dilantin', 'Epanutin', 'Phenytoin'], preg: 'D', pearls: ['Zero-order kinetics', 'Check free levels in renal impairment'], bbw: [] },
  'bundled-047': { moa: 'Anticonvulsant: binds SV2A modulating neurotransmitter release.', brands: ['Keppra', 'Levebel', 'Epitrac'], preg: 'C', pearls: ['No hepatic metabolism — minimal drug interactions', 'Dose adjust in renal impairment'], bbw: [] },
  'bundled-048': { moa: 'Barbiturate: potentiates GABA-A by prolonging Cl channel opening.', brands: ['Luminal', 'Gardenal', 'Phenobarb'], preg: 'D', pearls: ['Long half-life allows once-daily bedtime dosing', 'Potent CYP450 inducer'], bbw: [] },
  'bundled-049': { moa: 'Levodopa converted to dopamine; carbidopa inhibits peripheral decarboxylase.', brands: ['Sinemet', 'Madopar', 'Parcopa'], preg: 'C', pearls: ['Take on empty stomach', 'High-protein meals compete with absorption'], bbw: [] },
  'bundled-050': { moa: 'Analgesic/antipyretic: inhibits COX centrally, reducing prostaglandin synthesis.', brands: ['Panadol', 'Calpol', 'Paracet'], preg: 'A', bbw: ['Can cause severe liver injury — never exceed max daily dose'], pearls: ['Max: 1g single, 4g daily', 'Check OTC products for hidden acetaminophen'] },
  'bundled-051': { moa: 'NSAID: non-selective COX-1/COX-2 inhibitor.', brands: ['Brufen', 'Nurofen', 'Advil'], preg: 'C', bbw: ['NSAIDs increase risk of cardiovascular thrombotic events'], pearls: ['Take with food', 'Use lowest effective dose'] },
  'bundled-052': { moa: 'NSAID: non-selective COX-1/COX-2 inhibitor, potent anti-inflammatory.', brands: ['Voltaren', 'Cataflam', 'Dicloflex'], preg: 'C', bbw: ['NSAIDs increase risk of cardiovascular thrombotic events'], pearls: ['Topical effective for osteoarthritis with minimal systemic effects'] },
  'bundled-053': { moa: 'Pure mu-opioid receptor agonist.', brands: ['MS Contin', 'Oramorph', 'MST'], preg: 'C', bbw: ['Concomitant use with benzodiazepines may cause profound sedation'], pearls: ['Always prescribe laxative with morphine', 'Use naloxone cautiously'] },
  'bundled-054': { moa: 'Weak mu-opioid agonist with SNRI (serotonin/norepinephrine reuptake inhibition) activity.', brands: ['Ultram', 'Tramal', 'Tradol'], preg: 'C', bbw: ['Risk of addiction, abuse, and misuse'], pearls: ['Seizure risk >400mg/day', 'CYP2D6 poor metabolizers get less benefit'] },
  'bundled-055': { moa: 'Synthetic opioid agonist with some kappa activity.', brands: ['Demerol', 'Pethidine', 'Meperidine'], preg: 'C', bbw: ['Concurrent MAOIs can cause severe serotonin syndrome'], pearls: ['Not for chronic pain', 'Norpethidine metabolite can cause seizures'] },
  'bundled-056': { moa: 'PPI: irreversibly binds H/K-ATPase in gastric parietal cells.', brands: ['Losec', 'Prilosec', 'Omep'], preg: 'C', pearls: ['Take 30-60 min before breakfast', 'Max effect after 3-5 days'], bbw: [] },
  'bundled-057': { moa: 'PPI: irreversibly inhibits H/K-ATPase.', brands: ['Protonix', 'Pantoloc', 'Zurc'], preg: 'B', pearls: ['Available IV for hospitalized patients', 'Fewer drug interactions than omeprazole'], bbw: [] },
  'bundled-058': { moa: 'H2 receptor antagonist: blocks histamine H2 receptors on parietal cells.', brands: ['Zantac', 'Ranacid', 'Ranic'], preg: 'B', pearls: ['Many regions replaced with alternatives due to NDMA concerns'], bbw: [] },
  'bundled-059': { moa: 'D2 antagonist in CTZ (antiemetic). Enhances gastric motility (prokinetic).', brands: ['Maxolon', 'Metozol', 'Gastrobid'], preg: 'A', bbw: ['Tardive dyskinesia — limit to <12 weeks'], pearls: ['EPS more common in children', 'Max 30mg/day, 12 weeks'] },
  'bundled-060': { moa: '5-HT3 antagonist in CTZ and GI tract.', brands: ['Zofran', 'Emilox', 'Setronax'], preg: 'B', pearls: ['Most effective for chemo-induced N/V', 'Single dose for PONV'], bbw: [] },
  'bundled-061': { moa: 'Peripheral mu-opioid agonist in gut wall reducing GI motility.', brands: ['Imodium', 'Lopedium', 'Diarex'], preg: 'C', pearls: ['Max 16mg/day (8mg OTC)', 'Not for bloody diarrhea or fever'], bbw: [] },
  'bundled-062': { moa: 'Stimulant laxative: increases peristalsis and water secretion.', brands: ['Dulcolax', 'Dulco', 'Fleet'], preg: 'C', pearls: ['Not for >7 days without advice', 'Onset: oral 6-12h, rectal 15-60 min'], bbw: [] },
  'bundled-063': { moa: 'Osmotic laxative: draws water into colon via osmotic gradient.', brands: ['Duphalac', 'Lacvolac', 'Regulose'], preg: 'B', pearls: ['Also for hepatic encephalopathy', 'Onset 24-48h'], bbw: [] },
  'bundled-064': { moa: 'Biguanide: activates AMP-kinase, reducing gluconeogenesis, increasing insulin sensitivity.', brands: ['Glucophage', 'Diamet', 'Fortamet'], preg: 'B', pearls: ['Start low (500mg) with evening meal, titrate weekly', 'Hold 48h before contrast'], bbw: [] },
  'bundled-065': { moa: 'Sulfonylurea: stimulates insulin secretion by blocking K-ATP channels on beta cells.', brands: ['Daonil', 'Glynase', 'Micronase'], preg: 'C', pearls: ['Take with breakfast', 'Avoid in elderly (high hypoglycemia risk)'], bbw: [] },
  'bundled-066': { moa: 'Short-acting insulin: facilitates cellular glucose uptake.', brands: ['Actrapid', 'Humulin R', 'Insuman Rapid'], preg: 'B', pearls: ['Only insulin suitable for IV', 'Take 30 min before meals'], bbw: [] },
  'bundled-067': { moa: 'Intermediate-acting insulin (NPH): delayed absorption provides basal coverage.', brands: ['Humulin N', 'Insulatard', 'Novolin N'], preg: 'B', pearls: ['Gently resuspend before use (do not shake)', 'Peak action 4-10h'], bbw: [] },
  'bundled-068': { moa: 'Synthetic T4: converted to T3, normalizing metabolic rate and TSH.', brands: ['Eltroxin', 'Synthroid', 'Levoxyl'], preg: 'A', pearls: ['Take empty stomach 30-60 min before breakfast', 'Separate from Ca/Fe by 4h'], bbw: [] },
  'bundled-069': { moa: 'Corticosteroid: glucocorticoid receptor agonist, modulating inflammatory gene transcription.', brands: ['Deltacortil', 'Prednesol', 'Lodotra'], preg: 'C', pearls: ['Morning dosing reduces HPA suppression', 'Taper after >3 weeks'], bbw: [] },
  'bundled-070': { moa: 'Potent long-acting corticosteroid. No mineralocorticoid activity. 7x potency of prednisolone.', brands: ['Decadron', 'Dexacort', 'Dexasone'], preg: 'C', pearls: ['No mineralocorticoid activity', 'Used in severe COVID-19'], bbw: [] },
  'bundled-071': { moa: 'SABA: stimulates beta-2 receptors in bronchial smooth muscle, causing bronchodilation.', brands: ['Ventolin', 'Airomir', 'Salbulin'], preg: 'A', pearls: ['Spacer improves lung deposition', 'If used >2x/week, reassess asthma control'], bbw: [] },
  'bundled-072': { moa: 'Anticholinergic: blocks M3 receptors in bronchial smooth muscle.', brands: ['Atrovent', 'Apovent', 'Ipraterm'], preg: 'B', pearls: ['First-line in COPD exacerbations', 'Less effective than SABA in acute asthma'], bbw: [] },
  'bundled-073': { moa: 'ICS: glucocorticoid agonist in airway epithelium reducing inflammation.', brands: ['Beclometasone', 'Qvar', 'Clenil'], preg: 'B', pearls: ['Rinse mouth after each dose to prevent thrush', 'Preventer — use regularly'], bbw: [] },
  'bundled-074': { moa: 'Methylxanthine: non-selective PDE inhibitor, increasing cAMP in bronchial smooth muscle.', brands: ['Theo-Dur', 'Slo-Bid', 'Uniphyl'], preg: 'C', pearls: ['Narrow therapeutic index — monitor levels', 'Many drug interactions (CYP1A2)'], bbw: [] },
  'bundled-075': { moa: 'Leukotriene receptor antagonist: blocks CysLT1 receptors.', brands: ['Singulair', 'Montair', 'Montek'], preg: 'B', pearls: ['Take in evening', 'Not for acute attacks'], bbw: [] },
  'bundled-076': { moa: 'Mucolytic: breaks disulfide bonds in mucus. Antidote: repletes glutathione for paracetamol OD.', brands: ['Mucomyst', 'Acciluf', 'Nac'], preg: 'B', pearls: ['Most effective within 8h of paracetamol OD', 'Monitor for infusion reactions'], bbw: [] },
  'bundled-077': { moa: 'Vitamin K antagonist: inhibits VKORC1, blocking regeneration of active vitamin K.', brands: ['Coumadin', 'Marevan', 'Warfarin'], preg: 'X', bbw: ['Major or fatal bleeding — monitor INR'], pearls: ['INR monitoring essential', 'Avoid large changes in dietary vitamin K'] },
  'bundled-078': { moa: 'Potentiates antithrombin III, accelerating inactivation of thrombin and factor Xa.', brands: ['Heparin', 'Liquaemin', 'Hepalean'], preg: 'C', bbw: ['HIT — monitor platelets every 2-3 days'], pearls: ['Protamine sulfate for reversal', 'IV/SC only'] },
  'bundled-079': { moa: 'LMWH: potentiates antithrombin III, preferentially inhibiting factor Xa.', brands: ['Clexane', 'Lovenox', 'Inhixa'], preg: 'B', bbw: ['Risk of spinal/epidural hematoma with neuraxial anesthesia'], pearls: ['No routine monitoring needed', 'Anti-Xa monitoring in pregnancy/obesity'] },
  'bundled-080': { moa: 'Antiplatelet/NSAID: irreversibly acetylates COX-1, blocking TXA2.', brands: ['Aspirin', 'Disprin', 'Ecotrin'], preg: 'C', bbw: ['Reye syndrome — do not use in children with viral infections'], pearls: ['Low dose (75-100mg) for antiplatelet', 'Chewable for acute MI (300mg)'] },
  'bundled-081': { moa: 'P2Y12 platelet inhibitor: irreversibly blocks ADP receptor. Prodrug requiring CYP2C19.', brands: ['Plavix', 'Clopitab', 'Clopix'], preg: 'B', bbw: ['Reduced efficacy in CYP2C19 poor metabolizers'], pearls: ['Used with aspirin in ACS (DAPT)', 'Hold 5 days before surgery'] },
  'bundled-082': { moa: 'Alkylating agent: cross-links DNA, preventing replication.', brands: ['Cytoxan', 'Endoxan', 'Neosar'], preg: 'D', bbw: ['Hemorrhagic cystitis and secondary malignancies'], pearls: ['Mesna prevents hemorrhagic cystitis', 'Aggressive hydration (2-3L/day)'] },
  'bundled-083': { moa: 'Antimetabolite: inhibits DHFR and thymidylate synthase, blocking DNA synthesis.', brands: ['MTX', 'Trexall', 'Alti-MTX'], preg: 'X', bbw: ['Fatal toxicities (myelosuppression, hepatotoxicity, pulmonary fibrosis)'], pearls: ['ONCE WEEKLY for rheumatologic indications — not daily!', 'Folic acid protects against side effects'] },
  'bundled-084': { moa: 'SERM: estrogen antagonist in breast, partial agonist in bone/endometrium.', brands: ['Nolvadex', 'Soltamox', 'Tamoxen'], preg: 'D', bbw: ['Increased risk of uterine cancer and thromboembolism'], pearls: ['CYP2D6 inhibitors reduce efficacy', '5-10 years adjuvant therapy'] },
  'bundled-085': { moa: 'TKI: inhibits BCR-ABL, c-KIT, and PDGFR tyrosine kinases.', brands: ['Glivec', 'Imatinib', 'Gleevec'], preg: 'D', pearls: ['Take with food and large glass of water', 'Monitor BCR-ABL PCR'], bbw: [] },
  'bundled-086': { moa: 'Anthracycline: intercalates DNA, inhibits topoisomerase II, generates ROS.', brands: ['Adriamycin', 'Rubex', 'Doxil'], preg: 'D', bbw: ['Cardiotoxicity — cumulative dose not to exceed 550 mg/m2'], pearls: ['Urine may turn red-pink (harmless)', 'Dexrazoxane is cardioprotective'] },
  'bundled-087': { moa: 'Taxane: promotes microtubule polymerization, blocking cell division at G2/M.', brands: ['Taxol', 'Paclitaxel', 'Onxol'], preg: 'D', bbw: ['Severe hypersensitivity — premedicate'], pearls: ['Premedicate with antihistamines + steroids', 'Monitor for peripheral neuropathy'] },
  'bundled-088': { moa: 'Antimalarial/immunomodulator: raises lysosomal pH, inhibits TLR signaling.', brands: ['Plaquenil', 'Quensyl', 'HCQS'], preg: 'C', pearls: ['Annual ophthalmic screening mandatory', 'Takes 6-12 weeks for full effect'], bbw: [] },
  'bundled-089': { moa: 'Immunosuppressant: purine analogue inhibiting DNA/RNA synthesis in T-cells.', brands: ['Imuran', 'Azanin', 'Imurel'], preg: 'D', pearls: ['Reduce AZA dose by 75% with allopurinol', 'TPMT genotyping recommended'], bbw: [] },
  'bundled-090': { moa: 'Calcineurin inhibitor: blocks IL-2 transcription and T-cell activation.', brands: ['Sandimmune', 'Neoral', 'Gengraf'], preg: 'C', bbw: ['Risk of serious infections and malignancies'], pearls: ['Trough level monitoring essential', 'Avoid grapefruit juice'] },
  'bundled-091': { moa: 'First-gen antihistamine: H1 antagonist (sedating). Also anticholinergic.', brands: ['Piriton', 'Allergisan', 'Chlor-Trimeton'], preg: 'B', pearls: ['Use at bedtime', 'Avoid in elderly (falls risk)'], bbw: [] },
  'bundled-092': { moa: 'Second-gen antihistamine: selective peripheral H1 antagonist. Non-sedating.', brands: ['Clarityn', 'Lorasta', 'Alavert'], preg: 'B', pearls: ['Non-sedating for most', 'Available OTC'], bbw: [] },
  'bundled-093': { moa: 'Mild topical corticosteroid: glucocorticoid agonist in skin.', brands: ['Hydrocortisone', 'Efcortelan', 'Dermacort'], preg: 'C', pearls: ['Apply sparingly', 'Avoid face >2 weeks'], bbw: [] },
  'bundled-094': { moa: 'Potent topical corticosteroid.', brands: ['Betnovate', 'Diprolene', 'Celestoderm'], preg: 'C', pearls: ['Use 2-4 weeks only', 'Avoid face/axillae/groin'], bbw: [] },
  'bundled-095': { moa: 'Imidazole antifungal: inhibits ergosterol synthesis.', brands: ['Daktarin', 'Monistat', 'Micatin'], preg: 'C', pearls: ['Continue 1-2 weeks after symptoms resolve', 'Apply to clean dry skin'], bbw: [] },
  'bundled-096': { moa: 'Scabicide/pediculicide: disrupts sodium channels in arthropod nerves.', brands: ['Nix', 'Elimite', 'Lyclear'], preg: 'B', pearls: ['Apply from neck to soles, leave 8-14h', 'Treat all household contacts'], bbw: [] },
  'bundled-097': { moa: 'Topical antiviral: inhibits viral DNA polymerase.', brands: ['Zovirax Cream', 'Acivir', 'Herpex'], preg: 'B', pearls: ['Start at earliest sign of prodrome', 'Use finger cot to apply'], bbw: [] },
  'bundled-098': { moa: 'Electrolyte replacement: provides glucose, Na, K, bicarbonate to replace diarrheal losses.', brands: ['WHO-ORS', 'Rehidrat', 'Pedialyte'], preg: 'A', pearls: ['Use 1L clean water per sachet', 'Continue breastfeeding'], bbw: [] },
  'bundled-099': { moa: 'Potassium supplement: replaces K deficits essential for membrane potential.', brands: ['Slow-K', 'K-Dur', 'Sando-K'], preg: 'A', pearls: ['Never give IV K undiluted', 'Extended-release reduces GI irritation'], bbw: [] },
  'bundled-100': { moa: 'Alkalinizing agent: provides bicarbonate to buffer metabolic acidosis.', brands: ['Sodium Bicarbonate', 'Neut', 'Bicarb'], preg: 'C', pearls: ['Not recommended for routine CPR', 'Check ABG before repeat dosing'], bbw: [] },
  'bundled-101': { moa: 'Calcium supplement: provides elemental calcium for hypocalcemia.', brands: ['Calcium Gluconate', 'Cal-G', 'Calcijeet'], preg: 'C', pearls: ['Calcium gluconate is less irritating than CaCl2', 'Confirm IV line patency'], bbw: [] },
  'bundled-102': { moa: 'Electrolyte/Mg supplement: CNS depressant, anticonvulsant, tocolytic.', brands: ['MgSO4', 'Epsom Salts', 'Magnesium Sulfate'], preg: 'A', pearls: ['Eclampsia: 4g IV then 1-2 g/h', 'Monitor DTRs and RR'], bbw: [] },
  'bundled-103': { moa: 'Trace element: essential for immune function, wound healing, cell division.', brands: ['Zinc Sulfate', 'Zincate', 'Orazinc'], preg: 'C', pearls: ['20mg zinc for 10-14 days reduces diarrhea duration in children'], bbw: [] },
  'bundled-104': { moa: 'Vitamin B9: essential for DNA synthesis, RBC formation, neural tube development.', brands: ['Folic Acid', 'Folvite', 'Folacin'], preg: 'A', pearls: ['400 mcg preconception prevents neural tube defects', 'Check B12 before starting if macrocytic anemia'], bbw: [] },
  'bundled-105': { moa: 'B vitamin combination (B1+B6+B12): supports energy metabolism and nerve function.', brands: ['Neurobion', 'Vitamin B Complex', 'Benuron'], preg: 'A', pearls: ['Yellow urine (riboflavin) — harmless', 'Injectable B12 for pernicious anemia'], bbw: [] },
  'bundled-106': { moa: 'Water-soluble vitamin: cofactor for collagen synthesis, antioxidant, immune support.', brands: ['Vitamin C', 'Redoxon', 'Cecon'], preg: 'A', pearls: ['Smokers need higher intake (+35mg/day)', 'Enhances iron absorption'], bbw: [] },
  'bundled-107': { moa: 'Fat-soluble vitamin: enhances intestinal calcium and phosphate absorption.', brands: ['Vitamin D', 'Calciferol', 'Sun-D'], preg: 'A', pearls: ['800-2000 IU/day maintenance', '25(OH)D measured for vitamin D status'], bbw: [] },
  'bundled-108': { moa: 'Iron supplement: provides elemental iron for hemoglobin synthesis.', brands: ['Ferrous Sulfate', 'Feosol', 'Slow-Fe'], preg: 'A', pearls: ['Take with vitamin C for enhanced absorption', 'Black stools (harmless)'], bbw: [] },
  'bundled-109': { moa: 'Dissociative anaesthetic: NMDA antagonist. Produces dissociative anesthesia with analgesia.', brands: ['Ketalar', 'Ketamine', 'Ketanest'], preg: 'C', pearls: ['Safe in hemodynamically unstable patients', 'Can be given IM'], bbw: [] },
  'bundled-110': { moa: 'IV anaesthetic: potentiates GABA-A activity. Rapid onset, short duration.', brands: ['Diprivan', 'Propofol', 'Fresofol'], preg: 'C', pearls: ['Pain on injection — give lidocaine before', 'Contains egg lecithin'], bbw: [] },
  'bundled-111': { moa: 'Barbiturate anaesthetic: potentiates GABA-A. Ultra-short acting due to redistribution.', brands: ['Pentothal', 'Thiopental', 'Thiopentone'], preg: 'C', pearls: ['Avoid in porphyria', 'Mainly of historical interest'], bbw: [] },
  'bundled-112': { moa: 'Amide local anaesthetic: blocks Na channels. Also class Ib antiarrhythmic.', brands: ['Lidocaine', 'Xylocaine', 'Lignocaine'], preg: 'B', pearls: ['Max 3mg/kg plain, 7mg/kg with epinephrine', 'Lipid emulsion is antidote for LAST'], bbw: [] },
  'bundled-113': { moa: 'Amide local anaesthetic: blocks Na channels. Long-acting, potent.', brands: ['Bupivacaine', 'Marcaine', 'Sensorcaine'], preg: 'C', bbw: ['Risk of cardiac arrest with IV administration'], pearls: ['Lipid emulsion for cardiac toxicity', 'Levobupivacaine safer alternative'] },
  'bundled-114': { moa: 'Depolarizing muscle relaxant: mimics ACh at NMJ, causing depolarization then paralysis.', brands: ['Scoline', 'Suxamethonium', 'Succinylcholine'], preg: 'C', bbw: ['Risk of fatal hyperkalemia in burn/trauma/neuromuscular disease'], pearls: ['Short duration (5-10 min)', 'Pseudocholinesterase deficiency → prolonged paralysis'] },
  'bundled-115': { moa: 'Beta-blocker (ophthalmic): reduces aqueous humor production.', brands: ['Timoptol', 'Timogel', 'Betimol'], preg: 'C', pearls: ['Apply nasolacrimal occlusion to reduce systemic absorption', 'Check pulse before use'], bbw: [] },
  'bundled-116': { moa: 'Prostaglandin analogue: increases uveoscleral aqueous humor outflow.', brands: ['Xalatan', 'Latanoprost', 'Monoprost'], preg: 'C', pearls: ['Administer in evening', 'Changes iris color permanently — warn patients'], bbw: [] },
  'bundled-117': { moa: 'Topical antibiotic: inhibits 50S ribosomal subunit. Broad-spectrum.', brands: ['Chloromycetin', 'Chlorsig', 'Kemicetine'], preg: 'C', pearls: ['Complete full course', 'Avoid touching dropper tip'], bbw: [] },
  'bundled-118': { moa: 'Topical fluoroquinolone: inhibits DNA gyrase.', brands: ['Ciloxan', 'Ciproxin', 'Ciplox'], preg: 'C', pearls: ['White corneal precipitates may form (harmless)', 'Do not wear contact lenses'], bbw: [] },
  'bundled-119': { moa: 'Topical antibiotic: inhibits 30S ribosomal subunit, broad-spectrum.', brands: ['Achromycin', 'Tetracycline Ophthalmic', 'Cetrimide+TCN'], preg: 'D', pearls: ['Ointment causes blurred vision — apply at bedtime', 'Used for trachoma and neonatal conjunctivitis prophylaxis'], bbw: [] },
  'bundled-120': { moa: 'Opioid antagonist: competitively blocks mu-opioid receptors, reversing opioid effects.', brands: ['Narcan', 'Naloxone', 'Nyxoid'], preg: 'C', pearls: ['Short half-life — monitor for recurrence of respiratory depression', 'Use cautiously in physically dependent patients'], bbw: [] },
  'bundled-121': { moa: 'Benzodiazepine antagonist: competitively blocks GABA-A receptor benzodiazepine site.', brands: ['Anexate', 'Flumazenil', 'Romazicon'], preg: 'C', pearls: ['Risk of withdrawal seizures in chronic BZD users', 'Short half-life — monitor for resedation'], bbw: [] },
  'bundled-122': { moa: 'GI decontaminant: adsorbs ingested toxins, reducing systemic absorption.', brands: ['Activated Charcoal', 'Carbomix', 'Charflo'], preg: 'C', pearls: ['Most effective within 1-2h of ingestion', 'Protect airway in obtunded patients'], bbw: [] },
  'bundled-123': { moa: 'Antidote (paracetamol OD): repletes glutathione, binds toxic NAPQI metabolite.', brands: ['Mucomyst', 'N-Acetylcysteine', 'Parvolex'], preg: 'B', pearls: ['3-bag protocol: 150mg/kg/60min → 50mg/kg/4h → 100mg/kg/16h', 'Monitor for anaphylactoid reactions'], bbw: [] },
  'bundled-124': { moa: 'Antidote (warfarin reversal): provides active vitamin K for clotting factor synthesis.', brands: ['Vitamin K', 'Phytomenadione', 'Konakion'], preg: 'C', pearls: ['IV must be infused slowly over 20+ min', '1-10mg depending on INR and bleeding'], bbw: [] },
  'bundled-125': { moa: 'Bacteriostatic: sulfamethoxazole inhibits PABA incorporation; trimethoprim inhibits DHFR. Sequential folate blockade.', brands: ['Bactrim', 'Septrin', 'Cotrim'], preg: 'C', pearls: ['PCP prophylaxis: DS tablet 3x/week', 'Avoid in G6PD deficiency', 'High risk of sulfonamide hypersensitivity'], bbw: [] },
  'bundled-126': { moa: 'Bactericidal: inhibits cell wall synthesis by binding to PBPs. Narrow-spectrum, primarily Gram-positive.', brands: ['Penicillin G', 'Crystapen', 'Benzylpenicillin'], preg: 'B', pearls: ['Labile in gastric acid — parenteral only', 'Give slowly IV to avoid CNS toxicity'], bbw: [] },
  'bundled-127': { moa: 'Bactericidal: inhibits cell wall synthesis. Acid-stable form of penicillin for oral use.', brands: ['Penicillin V', 'Phenoxymethylpenicillin', 'V-Cil-K'], preg: 'B', pearls: ['Take on empty stomach', 'DOC for Strep pharyngitis and rheumatic fever prophylaxis'], bbw: [] },
  'bundled-128': { moa: 'Bacteriostatic: binds 50S ribosomal subunit, inhibiting protein synthesis.', brands: ['Erythromycin', 'Erymax', 'Eryc'], preg: 'B', pearls: ['GI side effects common (motilin agonist)', 'QT prolongation risk'], bbw: [] },
  'bundled-129': { moa: 'Bacteriostatic: binds 50S ribosomal subunit. Also active against H. pylori.', brands: ['Clarithromycin', 'Klaricid', 'Claribid'], preg: 'C', pearls: ['Used in H. pylori eradication triple therapy', 'Many drug interactions (CYP3A4)'], bbw: [] },
  'bundled-130': { moa: 'Oxytocic: stimulates uterine smooth muscle contraction via oxytocin receptors.', brands: ['Oxytocin', 'Syntocinon', 'Pitocin'], preg: 'C', pearls: ['Give IM/IV after delivery to prevent PPH', 'Continuous fetal monitoring essential during labor induction'], bbw: [] },
  'bundled-131': { moa: 'Prostaglandin E1 analogue: stimulates uterine contractions. Also protects gastric mucosa.', brands: ['Misoprostol', 'Cytotec', 'Misotac'], preg: 'X', pearls: ['600 mcg oral/rectal for PPH prevention', 'Can cause uterine rupture in scarred uterus'], bbw: [] },
  'bundled-132': { moa: 'Ergot alkaloid: causes sustained uterine contraction via serotonin and alpha-adrenergic receptors.', brands: ['Ergometrine', 'Ergonovine', 'Methergine'], preg: 'C', pearls: ['Contraindicated in hypertension and preeclampsia', 'Can cause coronary vasospasm'], bbw: [] },
  'bundled-133': { moa: 'NNRTI: non-competitive inhibitor of HIV-1 reverse transcriptase.', brands: ['Efavirenz', 'Stocrin', 'Sustiva'], preg: 'D', pearls: ['Take at bedtime to reduce CNS side effects', 'Vivid dreams common in first weeks'], bbw: [] },
  'bundled-134': { moa: 'NNRTI: non-competitive inhibitor of HIV-1 reverse transcriptase.', brands: ['Nevirapine', 'Viramune', 'Nevimune'], preg: 'C', pearls: ['Lead-in dosing (200mg daily for 14 days) essential', 'Monitor LFTs closely in first 18 weeks'], bbw: ['Severe, life-threatening hepatotoxicity and skin reactions'] },
  'bundled-135': { moa: 'Fat-soluble vitamin: essential for vision, immune function, cell differentiation.', brands: ['Vitamin A', 'Retinol', 'A-Vite'], preg: 'X', pearls: ['Single high dose reduces measles mortality', 'Avoid high doses in pregnancy (teratogenic)'], bbw: [] },
  'bundled-136': { moa: 'ACE inhibitor: inhibits ACE, reducing angiotensin II formation. Short-acting.', brands: ['Captopril', 'Capoten', 'Acepril'], preg: 'D', bbw: ['DO NOT USE IN PREGNANCY'], pearls: ['Take 1 hour before meals (food reduces absorption)', 'TID dosing due to short half-life'] },
  'bundled-137': { moa: 'Dihydropyridine CCB: blocks L-type Ca channels. Also used for tocolysis.', brands: ['Nifedipine', 'Adalat', 'Procardia'], preg: 'C', pearls: ['Modified-release preferred for hypertension', 'Avoid grapefruit juice', 'May be used for preterm labor tocolysis'], bbw: [] },
  'bundled-138': { moa: 'Sympathomimetic catecholamine: alpha and beta-adrenergic agonist.', brands: ['Epinephrine', 'Adrenaline', 'EpiPen'], preg: 'C', pearls: ['Anaphylaxis: 0.5mg IM (1:1000) in mid-thigh', 'Carry auto-injector at all times if prescribed'], bbw: [] },
  'bundled-139': { moa: 'Antiseptic (biguanide): disrupts microbial cell membranes and proteins, broad-spectrum antimicrobial.', brands: ['Chlorhexidine', 'Hibitane', 'Corsodyl'], preg: 'B', pearls: ['For external use only', 'Do not use in ears or eyes', 'Inactivated by soap'], bbw: [] },
  'bundled-140': { moa: 'Isotonic crystalloid: provides Na and Cl to replace extracellular fluid losses.', brands: ['Normal Saline', '0.9% NaCl', 'Sodium Chloride'], preg: 'C', pearls: ['Widely compatible drug diluent', 'Large volumes can cause hyperchloremic acidosis'], bbw: [] },
  'bundled-141': { moa: 'Balanced crystalloid: provides electrolytes and lactate buffer closer to plasma composition.', brands: ['Ringer Lactate', 'Hartmann Solution', 'Compound Sodium Lactate'], preg: 'C', pearls: ['Avoid in liver failure (impaired lactate metabolism)', 'Contains Ca — incompatible with ceftriaxone'], bbw: [] },
  'bundled-142': { moa: 'Isotonic crystalloid: provides free water and glucose calories.', brands: ['Dextrose 5%', 'Glucose 5%', 'D5W'], preg: 'C', pearls: ['Not for resuscitation (distributes to ICF)', 'Can cause hyperglycemia in stressed patients'], bbw: [] },
  'bundled-143': { moa: 'Anthelmintic: increases Ca permeability in worm tegument, causing paralysis and death.', brands: ['Praziquantel', 'Biltricide', 'Prazitel'], preg: 'C', pearls: ['Take with food', 'Short treatment course (1 day for schistosomiasis)'], bbw: [] },
  'bundled-144': { moa: 'Anthelmintic: inhibits microtubule polymerization by binding beta-tubulin in worms.', brands: ['Albendazole', 'Zentel', 'Albenza'], preg: 'C', pearls: ['400mg single dose for soil-transmitted helminths', 'Take with fatty food for better absorption'], bbw: [] },
  'bundled-145': { moa: 'Artemisinin derivative: produces free radicals damaging parasite membranes.', brands: ['Artesunate', 'Artesun', 'Malacef'], preg: 'C', pearls: ['First-line for severe falciparum malaria', 'Monitor for delayed hemolysis after therapy'], bbw: [] },
  'bundled-146': { moa: 'Antimalarial: sequential folate blockade (sulfonamide + DHFR inhibitor).', brands: ['Fansidar', 'SP', 'Sulfadoxine-Pyrimethamine'], preg: 'C', pearls: ['IPTp in pregnancy: give 3 doses in 2nd/3rd trimester', 'Risk of SJS — screen for sulfa allergy'], bbw: ['Severe dermatologic reactions including SJS/TEN'] },
  'bundled-147': { moa: 'Water-soluble B6 vitamin: cofactor for amino acid, neurotransmitter, and heme synthesis.', brands: ['Pyridoxine', 'Vitamin B6', 'Hexa-Betalin'], preg: 'A', pearls: ['Always give with INH to prevent neuropathy', 'High doses (>200mg/day) can cause neuropathy'], bbw: [] },
  'bundled-148': { moa: 'Water-soluble B1 vitamin: essential for carbohydrate metabolism and nerve function.', brands: ['Thiamine', 'Vitamin B1', 'Betaxin'], preg: 'A', pearls: ['Give before glucose in deficiency to prevent Wernicke encephalopathy', '500mg IV TID for Wernicke-Korsakoff'], bbw: [] },
  'bundled-149': { moa: 'Neuraminidase inhibitor: blocks influenza virus release from infected cells.', brands: ['Tamiflu', 'Oseltamivir', 'Fluvir'], preg: 'C', pearls: ['Start within 48h of symptom onset', 'Take with food to reduce nausea'], bbw: [] },
}

// ── Generate missing fields ─────────────────────────────────────────────────
const ALL_FIELDS = [
  'mechanism_of_action', 'brand_names', 'pregnancy_category',
  'warnings', 'overdose', 'pharmacokinetics',
  'black_box_warnings', 'clinical_pearls',
]

const KNOWN_DRUGS = new Set(Object.keys(OVERRIDES))

// ── Preprocess: split lines containing multiple drug objects ────────────────
// Some lines have two drugs concatenated, e.g.:
//   `created_at: '' },    { id: 'bundled-125', ...`
// Split at `},\n    { ` to give each drug its own line.
src = src.replace(/\},\s+\{ id: 'bundled-/g, '},\n    { id: \'bundled-')

// Parse each line
const lines = src.split('\n')
let result = []
let inDrug = false
let drugId = ''
let drugStartIdx = -1

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  result.push(line)

  // Detect start of drug entry
  const idMatch = line.match(/id:\s*'(bundled-\d+)'/)
  if (idMatch) {
    drugId = idMatch[1]
    inDrug = true
    drugStartIdx = result.length - 1
  }

  // End of drug entry — insert missing enriched fields
  if (inDrug && line.includes("created_at: ''")) {
    if (KNOWN_DRUGS.has(drugId)) {
      const o = OVERRIDES[drugId]

      // Collect existing fields in this drug entry (from id line to created_at line)
      const entryLines = result.slice(drugStartIdx).concat([line]).join('\n')

      const hasField = (name) => {
        const re = new RegExp('\\b' + name + ':\\s')
        return re.test(entryLines)
      }

      // Get class from generic templates
      const clsLine = entryLines
      const clsMatch = entryLines.match(/drug_class:\s*'([^']+)'/)

      // Generate warnings, overdose, PK
      const warnings = o.warnings || (clsMatch ? [
        `Use with caution in patients with pre-existing conditions`,
        `Monitor for side effects during therapy`,
      ] : [])
      const overdose = o.overdose || 'Symptoms: nausea, vomiting, dizziness. Management: supportive care. No specific antidote.'
      const pk = o.pk || (clsMatch ?
        `Absorption: variable depending on formulation. Distribution: widespread. Half-life: varies. Metabolism: hepatic. Excretion: renal.` :
        'Pharmacokinetic profile varies by formulation and patient factors.')
      const bbw = o.bbw || []
      const pearls = o.pearls || ['Use according to clinical guidelines.']

      // Build all enriched fields but only keep missing ones
      const allEnriched = [
        { name: 'mechanism_of_action', val: `    mechanism_of_action: '${escapeStr(o.moa || (clsMatch ? T.defaultMoa(clsMatch[1]) : 'Pharmacological action.'))}',` },
        { name: 'brand_names', val: `    brand_names: [${(o.brands || ['Generic']).map(b => `'${escapeStr(b)}'`).join(', ')}],` },
        { name: 'pregnancy_category', val: `    pregnancy_category: '${o.preg || (clsMatch ? PREG[clsMatch[1]] || 'C' : 'C')}',` },
        { name: 'warnings', val: `    warnings: [${warnings.map(w => `'${escapeStr(w)}'`).join(', ')}],` },
        { name: 'overdose', val: `    overdose: '${escapeStr(overdose)}',` },
        { name: 'pharmacokinetics', val: `    pharmacokinetics: '${escapeStr(pk)}',` },
        { name: 'black_box_warnings', val: `    black_box_warnings: [${bbw.map(b => `'${escapeStr(b)}'`).join(', ')}],` },
        { name: 'clinical_pearls', val: `    clinical_pearls: [${pearls.map(p => `'${escapeStr(p)}'`).join(', ')}],` },
      ].filter(e => e.val !== undefined)

      const missingFields = allEnriched.filter(e => !hasField(e.name)).map(e => e.val)

      if (missingFields.length > 0) {
        const isSingleLine = line.includes("id:")
        if (isSingleLine) {
          // Single-line entry: insert fields before 'created_at:' that belongs to THIS drug
          // (find created_at: '' AFTER the id: position to handle edge case where
          //  a previous drug's closing is on the same line)
          const idPos = line.indexOf("id: 'bundled-")
          const createdAtIndex = line.indexOf("created_at: ''", idPos)
          if (createdAtIndex > idPos) {
            // Find the comma before created_at
            let commaPos = createdAtIndex
            while (commaPos > 0 && line[commaPos] !== ',') commaPos--
            const before = line.slice(0, commaPos)
            const after = line.slice(commaPos + 1) // includes space before created_at
            result[result.length - 1] = before + ',\n' +
              missingFields.map(f => '    ' + f.trimStart()).join('\n') +
              '\n    ' + after.trimStart()
          } else {
            // Fallback: shouldn't happen
            result[result.length - 1] = line.replace(
              /,\s*created_at:\s*''/,
              ',\n' + missingFields.map(f => '    ' + f.trimStart()).join('\n') + '\n    created_at: \'\''
            )
          }
        } else {
          // Multi-line entry: insert before created_at line
          result.splice(result.length - 1, 0, ...missingFields)
          result.splice(result.length - 1, 0, '')
        }
      }
    }
    inDrug = false
    drugId = ''
    drugStartIdx = -1
  }
}

writeFileSync(FILE, result.join('\n'), 'utf-8')
console.log('✅ Enrichment complete.')

// ── Helpers ──────────────────────────────────────────────────────────────────
function escapeStr(s) {
  if (!s) return ''
  return s.replace(/'/g, "\\'")
}
