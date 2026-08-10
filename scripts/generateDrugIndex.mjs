/**
 * generateDrugIndex.mjs — Drug Index Generator
 * Reads existing drugIndexData.ts (149 drugs), merges 370+ new drugs,
 * auto-enriches all 8 enhanced fields using class-based templates.
 *
 * Usage: node scripts/generateDrugIndex.mjs
 * Output: overwrites src/data/drugIndexData.ts
 */
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const DRUG_FILE = path.resolve('src/data/drugIndexData.ts')

// ══════════════════════════════════════════════════════════════════
// 1. DRUG TEMPLATES
// ══════════════════════════════════════════════════════════════════

const MOA = {
  Penicillin: (n) => `Bactericidal: inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs), blocking transpeptidation and peptidoglycan cross-linking.${n.includes('Clavulanate') || n.includes('Tazobactam') ? ' Combined with beta-lactamase inhibitor for extended spectrum.' : ''}`,
  Cephalosporin: () => 'Bactericidal: inhibits bacterial cell wall synthesis via PBP binding, disrupting peptidoglycan cross-linking. Broad-spectrum activity.',
  Carbapenem: () => 'Bactericidal: inhibits cell wall synthesis via PBP binding with exceptional stability against most beta-lactamases including ESBL and AmpC. Broadest spectrum beta-lactam.',
  Macrolide: () => 'Bacteriostatic: binds to 50S ribosomal subunit, inhibiting bacterial protein synthesis by blocking peptide chain elongation. Also has immunomodulatory effects.',
  Fluoroquinolone: () => 'Bactericidal: inhibits DNA gyrase (topoisomerase II) and topoisomerase IV, preventing bacterial DNA replication and transcription.',
  Tetracycline: () => 'Bacteriostatic: binds to 30S ribosomal subunit, inhibiting bacterial protein synthesis by blocking aminoacyl-tRNA binding. Also has anti-inflammatory effects.',
  Aminoglycoside: () => 'Bactericidal: irreversibly binds 30S ribosomal subunit, causing mRNA misreading and inhibiting protein synthesis. Concentration-dependent killing with post-antibiotic effect.',
  Nitroimidazole: () => 'Bactericidal: reduced intracellularly to reactive intermediates that damage bacterial DNA and proteins. Active against anaerobes and protozoa.',
  Lincosamide: () => 'Bacteriostatic: binds 50S ribosomal subunit, inhibiting protein synthesis by blocking peptide bond formation. Active against anaerobes and Gram-positive cocci.',
  Sulfonamide: () => 'Bacteriostatic: inhibits bacterial dihydrofolate synthesis by competitive antagonism of PABA, blocking nucleic acid synthesis.',
  'Antifungal (Azole)': () => 'Antifungal: inhibits fungal CYP450 14A-demethylase, disrupting ergosterol synthesis and fungal cell membrane integrity.',
  'Antifungal (Polyene)': () => 'Antifungal: binds to ergosterol in fungal cell membranes, forming pores that cause leakage of cytoplasmic contents and cell death.',
  'Antifungal (Echinocandin)': () => 'Antifungal: inhibits beta-(1,3)-D-glucan synthase, disrupting fungal cell wall synthesis. Active against Candida and Aspergillus.',
  Antimalarial: (n) => `Antimalarial: ${n.includes('ACT') || n.includes('Artemether') || n.includes('Artesunate') || n.includes('DHA') ? 'artemisinin derivative produces free radicals damaging parasite membranes.' : 'interferes with parasite heme detoxification and metabolism.'}`,
  Antimycobacterial: () => 'Bactericidal: inhibits mycobacterial cell wall synthesis or nucleic acid synthesis. Used in combination therapy for TB.',
  'Antiviral (HSV)': () => 'Antiviral: phosphorylated to active triphosphate which competitively inhibits viral DNA polymerase, blocking viral DNA synthesis.',
  'Antiretroviral (NRTI)': () => 'NRTI: phosphorylated to active triphosphate which competitively inhibits HIV reverse transcriptase and causes chain termination.',
  'Antiretroviral (NNRTI)': () => 'NNRTI: non-competitively binds to HIV reverse transcriptase at a hydrophobic pocket, causing conformational change that inhibits enzyme activity.',
  'Antiretroviral (Protease inhibitor)': () => 'Protease inhibitor: competitively inhibits HIV protease, preventing cleavage of viral polyproteins, producing immature non-infectious viral particles.',
  'Antiretroviral (INSTI)': () => 'INSTI: inhibits HIV integrase, blocking the strand transfer step of viral DNA integration into the host genome.',
  'ACE inhibitor': () => 'ACE inhibitor: competitively inhibits angiotensin-converting enzyme, reducing angiotensin II formation, decreasing vasoconstriction and aldosterone secretion.',
  ARB: () => 'ARB: selectively blocks AT1 angiotensin II receptors, reducing angiotensin II-mediated vasoconstriction and aldosterone secretion.',
  'Calcium channel blocker (DHP)': () => 'Dihydropyridine CCB: blocks L-type calcium channels in vascular smooth muscle, causing arterial vasodilation and reduced peripheral vascular resistance.',
  'Calcium channel blocker (Non-DHP)': () => 'Non-dihydropyridine CCB: blocks L-type calcium channels in cardiac myocytes and vascular smooth muscle, reducing heart rate, AV conduction, and contractility.',
  'Beta-blocker': (n) => `Beta-blocker: blocks beta-adrenergic receptors, reducing heart rate, contractility, and myocardial oxygen demand.${n.includes('Carvedilol') || n.includes('Labetalol') ? ' Also has alpha-1 blocking activity.' : ''}`,
  'Thiazide diuretic': () => 'Thiazide diuretic: inhibits Na+/Cl- cotransporter in distal convoluted tubule, increasing sodium and water excretion while reducing peripheral vascular resistance.',
  'Loop diuretic': () => 'Loop diuretic: inhibits Na+/K+/2Cl- cotransporter in thick ascending loop of Henle, producing potent diuresis and venodilation.',
  'Potassium-sparing diuretic': () => 'Potassium-sparing diuretic: competitive aldosterone antagonist in collecting duct, inhibiting Na+/K+ exchange.',
  Statin: () => 'HMG-CoA reductase inhibitor: inhibits HMG-CoA reductase, reducing hepatic cholesterol biosynthesis. Also has pleiotropic anti-inflammatory and plaque-stabilizing effects.',
  Anticoagulant: (n) => `Anticoagulant: inhibits coagulation factors.${n.includes('Heparin') || n.includes('Enoxaparin') ? ' Potentiates antithrombin III.' : n.includes('Warfarin') ? ' Vitamin K antagonist: inhibits VKORC1.' : n.includes('Rivaroxaban') || n.includes('Apixaban') ? ' Direct factor Xa inhibitor.' : ' Direct thrombin inhibitor.'}`,
  Antiplatelet: (n) => `Antiplatelet: inhibits platelet aggregation.${n.includes('Aspirin') ? ' Irreversibly acetylates COX-1, blocking TXA2.' : ' P2Y12 ADP receptor antagonist.'}`,
  'Cardiac glycoside': () => 'Cardiac glycoside: inhibits Na+/K+-ATPase, increasing intracellular Ca2+, enhancing myocardial contractility. Vagomimetic effects on AV node.',
  Nitrate: () => 'Nitrate vasodilator: metabolized to NO activating guanylyl cyclase, increasing cGMP and causing venous and arterial vasodilation.',
  Benzodiazepine: () => 'Benzodiazepine: potentiates GABA-A receptor activity by increasing chloride channel opening frequency. Anxiolytic, sedative, muscle relaxant, anticonvulsant.',
  'Antidepressant (SSRI)': () => 'SSRI: selectively inhibits presynaptic serotonin (5-HT) reuptake, increasing synaptic serotonin availability. Minimal effect on norepinephrine or dopamine.',
  'Antidepressant (SNRI)': () => 'SNRI: inhibits reuptake of both serotonin and norepinephrine, increasing their synaptic availability.',
  'Antidepressant (TCA)': () => 'TCA: inhibits reuptake of serotonin and norepinephrine at presynaptic terminals. Also has anticholinergic and antihistaminergic effects.',
  'Antipsychotic (Typical)': () => 'Typical antipsychotic: postsynaptic dopamine D2 receptor antagonist in mesolimbic and mesocortical pathways.',
  'Antipsychotic (Atypical)': () => 'Atypical antipsychotic: D2 and 5-HT2A receptor antagonist. Additional affinities vary by agent.',
  Anticonvulsant: (n) => `Anticonvulsant: ${n.includes('Phenytoin') || n.includes('Carbamazepine') || n.includes('Lamotrigine') ? 'stabilizes neuronal membranes by blocking voltage-gated sodium channels.' : n.includes('Valproate') ? 'increases GABA synthesis and blocks Na and Ca channels.' : n.includes('Levetiracetam') ? 'binds synaptic vesicle protein SV2A, modulating neurotransmitter release.' : n.includes('Topiramate') ? 'blocks Na channels, enhances GABA-A, antagonizes AMPA receptors.' : n.includes('Gabapentin') || n.includes('Pregabalin') ? 'binds alpha-2-delta subunit of Ca channels.' : 'modulates ion channels or GABAergic transmission.'}`,
  Dopaminergic: () => 'Dopaminergic: levodopa converted to dopamine in the brain, restoring striatal dopamine. Carbidopa inhibits peripheral decarboxylation.',
  Opioid: (n) => `${n.includes('Buprenorphine') ? 'Partial' : 'Pure'} mu-opioid receptor agonist. Produces analgesia, sedation, and respiratory depression.${n.includes('Tramadol') || n.includes('Tapentadol') ? ' Also inhibits norepinephrine reuptake.' : ''}`,
  NSAID: () => 'NSAID: non-selective COX-1 and COX-2 inhibitor, reducing prostaglandin synthesis responsible for pain, inflammation, and fever.',
  'Analgesic/Antipyretic': () => 'Analgesic and antipyretic: inhibits COX centrally in the CNS, reducing prostaglandin synthesis. Weak peripheral anti-inflammatory activity.',
  PPI: () => 'PPI: irreversibly binds H+/K+-ATPase in gastric parietal cells, blocking the final step of gastric acid secretion. Produces profound and prolonged acid suppression.',
  Biguanide: () => 'Biguanide: activates AMP-kinase in hepatocytes, reducing hepatic gluconeogenesis, increasing insulin sensitivity, decreasing intestinal glucose absorption.',
  Sulfonylurea: () => 'Sulfonylurea: blocks ATP-sensitive K+ channels on pancreatic beta cells, stimulating insulin secretion. Also increases peripheral insulin sensitivity.',
  Insulin: (n) => `Insulin: exogenous insulin binds to insulin receptors on target cells, facilitating glucose uptake.${n.includes('Glargine') ? ' Steady basal insulin without pronounced peak.' : n.includes('Lispro') || n.includes('Aspart') ? ' Rapid-acting analogue for mealtime coverage.' : n.includes('Regular') ? ' Short-acting, suitable for IV use.' : n.includes('NPH') ? ' Intermediate-acting with delayed absorption.' : ''}`,
  Thyroid: () => 'Synthetic levothyroxine (T4): converted to active T3 in peripheral tissues, normalizing metabolic rate and TSH levels.',
  Corticosteroid: (n) => `Corticosteroid: glucocorticoid receptor agonist, modulating transcription of pro-inflammatory and anti-inflammatory genes.${n.includes('Dexamethasone') ? ' Potent, long-acting, no mineralocorticoid activity.' : n.includes('Hydrocortisone') ? ' Short-acting with significant mineralocorticoid activity.' : ''}`,
  SABA: () => 'SABA: selectively stimulates beta-2 adrenergic receptors in bronchial smooth muscle, causing bronchodilation via increased cAMP. Rapid onset 5-15 min.',
  Anticholinergic: () => 'Anticholinergic bronchodilator: blocks muscarinic M3 receptors in bronchial smooth muscle, reducing vagally-mediated bronchoconstriction.',
  Methylxanthine: () => 'Methylxanthine: non-selective PDE inhibitor, increasing cAMP in bronchial smooth muscle. Also has anti-inflammatory and respiratory stimulant effects.',
  'Antihistamine (1st gen)': () => 'First-generation antihistamine: competitive H1 receptor antagonist with significant CNS penetration causing sedation. Also has anticholinergic effects.',
  'Antihistamine (2nd gen)': () => 'Second-generation antihistamine: selective peripheral H1 antagonist with minimal CNS penetration. Non-sedating.',
  Alkylating: () => 'Alkylating agent: cross-links DNA via alkylation at guanine N7 position, preventing DNA replication and transcription. Cell cycle non-specific.',
  Antimetabolite: (n) => `Antimetabolite: inhibits key enzymes in DNA/RNA synthesis pathways.${n.includes('Methotrexate') ? ' Inhibits DHFR and thymidylate synthase.' : n.includes('Capecitabine') ? ' Prodrug converted to 5-FU.' : ''}`,
  Anthracycline: () => 'Anthracycline: intercalates between DNA base pairs, inhibits topoisomerase II, and generates ROS causing DNA damage and lipid peroxidation.',
  Taxane: () => 'Taxane: promotes microtubule polymerization and stabilization, preventing mitotic spindle breakdown, blocking cell division at G2/M phase.',
  TKI: (n) => `TKI: selectively inhibits specific tyrosine kinases.${n.includes('Imatinib') ? ' Targets BCR-ABL, c-KIT, PDGFR.' : n.includes('Gefitinib') ? ' EGFR inhibitor.' : ' Multi-kinase inhibitor.'}`,
  Immunosuppressant: (n) => `Immunosuppressant: suppresses immune response.${n.includes('Azathioprine') ? ' Purine analogue inhibiting DNA/RNA synthesis in T-cells.' : n.includes('Mycophenolate') ? ' Inhibits IMPDH, blocking de novo purine synthesis in lymphocytes.' : n.includes('Cyclophosphamide') ? ' Alkylating agent with immunosuppressant effects.' : ' Inhibits T-cell activation.'}`,
  Calcineurin: () => 'Calcineurin inhibitor: inhibits calcineurin phosphatase, blocking IL-2 transcription and T-cell activation.',
  Scabicide: () => 'Scabicide/pediculicide: disrupts sodium channel function in arthropod nerve cells, causing paralysis and death.',
  Anthelmintic: (n) => `Anthelmintic: ${n.includes('Albendazole') ? 'binds beta-tubulin, inhibiting microtubule polymerization in worms.' : n.includes('Praziquantel') ? 'increases Ca2+ permeability in schistosome membranes, causing paralysis.' : n.includes('Ivermectin') ? 'glutamate-gated Cl channel agonist, causing paralysis.' : n.includes('Diethylcarbamazine') ? 'alters microfilarial surface antigens, promoting immune clearance.' : 'paralyses or kills parasitic worms.'}`,
  Antidote: (n) => `Antidote: ${n.includes('Naloxone') ? 'reverses opioid overdose by blocking mu receptors.' : n.includes('Flumazenil') ? 'reverses benzodiazepine effects.' : n.includes('NAC') ? 'repletes glutathione for paracetamol OD.' : n.includes('Charcoal') ? 'adsorbs ingested toxins.' : n.includes('Atropine') ? 'blocks muscarinic effects of organophosphate poisoning.' : n.includes('Pralidoxime') ? 'reactivates cholinesterase.' : 'neutralizes specific drug/toxic effects.'}`,
  Electrolyte: () => 'Electrolyte replenisher: provides essential electrolytes, correcting deficits and maintaining acid-base balance.',
  Vitamin: (n) => `Vitamin supplement: provides ${n} essential for normal metabolic function, enzyme activity, and cellular processes.`,
  'Local anaesthetic': () => 'Local anaesthetic: blocks voltage-gated sodium channels in nerve fibers, preventing impulse conduction.',
  Antiemetic: (n) => `Antiemetic: ${n.includes('Ondansetron') ? '5-HT3 antagonist' : n.includes('Metoclopramide') ? 'D2 antagonist with prokinetic effects' : n.includes('Prochlorperazine') ? 'D2 antagonist' : 'blocks D2, 5-HT3, or H1 receptors in CTZ'}. Suppresses nausea and vomiting.`,
  Laxative: (n) => `Laxative: ${n.includes('Bisacodyl') ? 'Stimulant: increases peristalsis.' : n.includes('Lactulose') ? 'Osmotic: draws water into colon.' : n.includes('Senna') ? 'Stimulant: increases peristalsis.' : 'promotes bowel evacuation.'}`,
  SGLT2: () => 'SGLT2 inhibitor: inhibits sodium-glucose cotransporter-2 in proximal renal tubule, reducing glucose reabsorption causing glucosuria.',
  DPP4: () => 'DPP-4 inhibitor: inhibits dipeptidyl peptidase-4, increasing endogenous GLP-1 levels, enhancing glucose-dependent insulin secretion.',
  Bisphosphonate: () => 'Bisphosphonate: binds to hydroxyapatite in bone, inhibiting osteoclast-mediated bone resorption. Reduces bone turnover and fracture risk.',
  Antigout: (n) => `Antigout: ${n.includes('Allopurinol') ? 'inhibits xanthine oxidase, reducing uric acid production.' : n.includes('Colchicine') ? 'binds tubulin, inhibiting microtubule polymerization and neutrophil chemotaxis.' : 'reduces uric acid or inflammation in gout.'}`,
  'Urinary antiseptic': () => 'Bactericidal: reduced to reactive intermediates damaging bacterial DNA. Concentrated in urine providing selective urinary tract activity.',
  'GBS': () => 'Group B Streptococcus: bactericidal, inhibits cell wall synthesis. Used specifically for GBS prophylaxis in pregnancy.',
  Antiprotozoal: () => 'Antiprotozoal: interferes with protozoal metabolic pathways or DNA synthesis.',
  ADHD: (n) => `CNS stimulant: ${n.includes('Methylphenidate') ? 'blocks dopamine and norepinephrine reuptake.' : n.includes('Atomoxetine') ? 'selective norepinephrine reuptake inhibitor.' : 'increases dopamine and norepinephrine levels.'}`,
}
const MOA_DEFAULT = (cls) => `Pharmacological agent: acts through specific receptor or enzyme interactions to produce therapeutic effects. Drug class: ${cls}.`

/** PK templates */
const PK = {
  Penicillin: 'Absorption: variable oral (acid-labile). Distribution: widespread, limited CNS. Half-life: 0.5-1.5h. Excretion: renal (active tubular secretion).',
  Cephalosporin: 'Absorption: 40-95% oral. Distribution: widespread, variable CNS. Half-life: 1-8h. Excretion: renal.',
  Carbapenem: 'Absorption: IV only. Distribution: widespread. Half-life: ~1h. Excretion: renal.',
  Macrolide: 'Absorption: 37-90% oral. Distribution: extensive tissue penetration, concentrates in macrophages. Half-life: 2-68h. Metabolism: hepatic (CYP3A4). Excretion: biliary/fecal.',
  Fluoroquinolone: 'Absorption: excellent oral (70-95%). Distribution: widespread, excellent tissue penetration. Half-life: 3-20h. Excretion: renal.',
  Tetracycline: 'Absorption: 60-100% oral (decreased by dairy/antacids). Half-life: 6-24h. Excretion: renal and fecal.',
  Aminoglycoside: 'Absorption: negligible oral (IV/IM only). Distribution: extracellular fluid, minimal CSF. Half-life: 2-3h. Excretion: renal (glomerular filtration).',
  Nitroimidazole: 'Absorption: >90% oral. Distribution: widespread including CSF. Half-life: 6-8h. Metabolism: hepatic. Excretion: renal (60-80%).',
  Lincosamide: 'Absorption: 90% oral. Distribution: widespread including bone. Half-life: 2-4h. Metabolism: hepatic. Excretion: renal and biliary.',
  Sulfonamide: 'Absorption: good oral. Distribution: widespread. Half-life: 6-12h. Metabolism: hepatic. Excretion: renal.',
  'Antifungal (Azole)': 'Absorption: variable. Distribution: widespread. Half-life: 6-40h. Metabolism: hepatic (CYP450). Excretion: renal and fecal.',
  'Antifungal (Polyene)': 'Absorption: negligible oral (IV/topical only). Distribution: minimal systemic. Half-life: 24h. Excretion: renal (slow).',
  'Antifungal (Echinocandin)': 'Absorption: IV only. Half-life: 9-40h. Distribution: widespread. Metabolism: hepatic (hydrolysis). Excretion: fecal.',
  Antimalarial: 'Absorption: variable oral. Distribution: widespread. Half-life: 4h-21 days. Metabolism: hepatic (CYP450). Excretion: renal and fecal.',
  Antimycobacterial: 'Absorption: good oral. Distribution: widespread including CSF. Half-life: 3-6h. Metabolism: hepatic. Excretion: renal and biliary.',
  'Antiviral (HSV)': 'Absorption: 15-80% oral (varies by agent). Half-life: 2-3h. Excretion: renal (glomerular filtration + tubular secretion).',
  'Antiretroviral (NRTI)': 'Absorption: 60-90% oral. Distribution: widespread. Half-life: 3-7h intracellular longer. Excretion: renal.',
  'Antiretroviral (NNRTI)': 'Absorption: 50-90% oral. Distribution: widespread including CSF. Half-life: 25-45h. Metabolism: hepatic (CYP2B6, 3A4). Excretion: renal and fecal.',
  'Antiretroviral (Protease inhibitor)': 'Absorption: variable (boosted with ritonavir). Half-life: 3-15h. Metabolism: hepatic (CYP3A4). Excretion: fecal.',
  'Antiretroviral (INSTI)': 'Absorption: good oral. Half-life: 11-14h. Metabolism: hepatic (UGT1A1). Excretion: fecal.',
  'Antiretroviral (NtRTI)': 'Absorption: good oral. Distribution: widespread. Half-life: 17h. Excretion: renal.',
  'ACE inhibitor': 'Absorption: variable (prodrugs require hepatic activation). Half-life: 2-12h. Metabolism: hepatic. Excretion: renal.',
  ARB: 'Absorption: 33-80% oral. Half-life: 6-24h. Metabolism: hepatic. Excretion: renal/biliary.',
  'Beta-blocker': 'Absorption: variable oral. Half-life: 3-24h. Metabolism: hepatic. Excretion: renal.',
  'Calcium channel blocker (DHP)': 'Absorption: 64-90% oral. Half-life: 30-50h (amlodipine), 2-5h (nifedipine). Metabolism: hepatic (CYP3A4).',
  'Calcium channel blocker (Non-DHP)': 'Absorption: good oral. Half-life: 3-8h. Metabolism: hepatic (CYP3A4).',
  'Thiazide diuretic': 'Absorption: variable. Half-life: 6-15h. Excretion: renal.',
  'Loop diuretic': 'Absorption: 50-60% oral. Half-life: 1-2h. Metabolism: hepatic. Excretion: renal.',
  'Potassium-sparing diuretic': 'Absorption: good oral. Half-life: 1-4h. Metabolism: hepatic.',
  Statin: 'Absorption: variable. High hepatic first-pass. Half-life: 1-20h. Metabolism: hepatic (CYP450). Excretion: fecal.',
  Anticoagulant: (n) => `${n.includes('Warfarin') ? 'Absorption: excellent. Half-life: 40h. Metabolism: CYP2C9. Excretion: renal.' : n.includes('Heparin') ? 'Absorption: IV/SC only. Half-life: 1-2h. Excretion: renal.' : n.includes('Enoxaparin') ? 'Absorption: SC. Half-life: 3-7h. Excretion: renal.' : n.includes('Rivaroxaban') || n.includes('Apixaban') ? 'Absorption: 66-80% oral. Half-life: 5-12h. Metabolism: CYP3A4. Excretion: renal/fecal.' : 'Absorption: good oral. Half-life: 10-17h. Excretion: renal.'}`,
  Antiplatelet: (n) => `${n.includes('Aspirin') ? 'Absorption: good. Half-life: 15-20 min (platelet effects lifelong). Excretion: renal.' : n.includes('Clopidogrel') ? 'Absorption: good (prodrug). Half-life: 6h. Metabolism: CYP2C19. Excretion: renal.' : n.includes('Ticagrelor') ? 'Absorption: good. Half-life: 7-9h. Metabolism: CYP3A4. Excretion: biliary.' : 'Absorption: good (prodrug). Half-life: 7h. Metabolism: hepatic.'}`,
  'Cardiac glycoside': 'Absorption: 60-80% oral. Vd large. Half-life: 36-48h. Metabolism: minimal. Excretion: renal (unchanged).',
  Nitrate: 'Absorption: sublingual/oral/IV/transdermal. Half-life: 2-5 min (sublingual). Metabolism: hepatic first-pass.',
  Benzodiazepine: (n) => `${n.includes('Diazepam') ? 'Half-life: 20-80h (long). Metabolism: CYP2C19, 3A4.' : n.includes('Lorazepam') ? 'Half-life: 10-20h (intermediate). Metabolism: glucuronidation.' : n.includes('Alprazolam') ? 'Half-life: 6-12h (short). Metabolism: CYP3A4.' : n.includes('Clonazepam') ? 'Half-life: 20-40h. Metabolism: CYP3A4.' : 'Half-life: 6-80h. Metabolism: hepatic.'}`,
  'Antidepressant (SSRI)': (n) => `${n.includes('Fluoxetine') ? 'Half-life: 4-6 days (long). Metabolism: CYP2D6.' : n.includes('Sertraline') ? 'Half-life: 24h. Metabolism: hepatic.' : n.includes('Citalopram') || n.includes('Escitalopram') ? 'Half-life: 30h. Metabolism: CYP2C19, 3A4.' : n.includes('Paroxetine') ? 'Half-life: 21h. Metabolism: CYP2D6.' : 'Half-life: 21-96h. Metabolism: hepatic.'}`,
  'Antidepressant (SNRI)': (n) => `${n.includes('Venlafaxine') ? 'Half-life: 5-11h (parent), 11h (metabolite).' : n.includes('Duloxetine') ? 'Half-life: 12h. Metabolism: CYP1A2, 2D6.' : 'Half-life: 11-12h.'}`,
  'Antidepressant (TCA)': 'Absorption: good oral. Half-life: 8-80h. Metabolism: hepatic. Excretion: renal.',
  'Antipsychotic (Typical)': (n) => `${n.includes('Haloperidol') ? 'Half-life: 14-26h (oral), 21h (IM).' : 'Half-life: 12-30h. Metabolism: hepatic.'}`,
  'Antipsychotic (Atypical)': (n) => `${n.includes('Olanzapine') ? 'Half-life: 21-54h. Metabolism: CYP1A2.' : n.includes('Risperidone') ? 'Half-life: 20h (active metabolite 24h).' : n.includes('Quetiapine') ? 'Half-life: 6-7h.' : n.includes('Aripiprazole') ? 'Half-life: 75h.' : n.includes('Clozapine') ? 'Half-life: 8-12h. Metabolism: CYP1A2.' : 'Half-life: 7-75h. Metabolism: hepatic.'}`,
  Anticonvulsant: (n) => `${n.includes('Phenytoin') ? 'Half-life: 7-42h (zero-order). Metabolism: CYP2C9.' : n.includes('Carbamazepine') ? 'Half-life: 12-65h (autoinduction). Metabolism: CYP3A4.' : n.includes('Valproate') ? 'Half-life: 9-16h. Metabolism: hepatic.' : n.includes('Levetiracetam') ? 'Half-life: 6-8h. Excretion: renal 66%.' : n.includes('Lamotrigine') ? 'Half-life: 25-33h (glucuronidation).' : n.includes('Topiramate') ? 'Half-life: 19-25h.' : n.includes('Gabapentin') ? 'Half-life: 5-7h (saturable absorption). Excretion: renal.' : n.includes('Pregabalin') ? 'Half-life: 6h. Excretion: renal.' : n.includes('Oxcarbazepine') ? 'Half-life: 2h (active metabolite 9h).' : n.includes('Clobazam') ? 'Half-life: 36-42h.' : n.includes('Ethosuximide') ? 'Half-life: 30-60h.' : n.includes('Vigabatrin') ? 'Half-life: 5-7h. Excretion: renal.' : 'Half-life: 5-60h.'}`,
  Opioid: (n) => `${n.includes('Morphine') ? 'Half-life: 2-4h. Metabolism: glucuronidation.' : n.includes('Fentanyl') ? 'Half-life: 3-12h. Metabolism: CYP3A4.' : n.includes('Codeine') ? 'Half-life: 3h (prodrug, CYP2D6).' : n.includes('Buprenorphine') ? 'Half-life: 20-70h. Metabolism: CYP3A4.' : n.includes('Methadone') ? 'Half-life: 24-36h. Metabolism: CYP3A4, 2B6.' : n.includes('Tramadol') ? 'Half-life: 6-8h. Metabolism: CYP2D6.' : n.includes('Oxycodone') ? 'Half-life: 3-5h. Metabolism: CYP3A4, 2D6.' : 'Half-life: 3-70h.'}`,
  PPI: 'Absorption: delayed-release enteric-coated. Half-life: 1-2h. Metabolism: CYP2C19, 3A4. Excretion: renal.',
  Biguanide: 'Absorption: 50-60% oral. Half-life: 4-8h. Excretion: renal (active tubular secretion, unchanged).',
  Sulfonylurea: 'Absorption: good. Half-life: 2-24h. Metabolism: CYP2C9. Excretion: renal.',
  Insulin: (n) => `${n.includes('Glargine') ? 'Onset: 1-2h, flat, duration 20-24h.' : n.includes('Detemir') ? 'Onset: 1-2h, duration 16-24h.' : n.includes('Degludec') ? 'Onset: 30-60 min, duration >42h.' : n.includes('Lispro') ? 'Onset: 5-15 min, duration 3-5h.' : n.includes('Aspart') ? 'Onset: 5-15 min, duration 3-5h.' : n.includes('Regular') ? 'Onset: 30-60 min, duration 5-8h.' : n.includes('NPH') ? 'Onset: 1-2h, peak 4-10h, duration 12-18h.' : 'Onset/half-life varies by formulation.'}`,
  Corticosteroid: (n) => `${n.includes('Dexamethasone') ? 'Half-life: 36-54h (biological).' : n.includes('Hydrocortisone') ? 'Half-life: 1-2h (biological 8-12h).' : n.includes('Prednisolone') ? 'Half-life: 2-4h (biological 12-36h).' : 'Half-life: 2-54h.'}`,
  SABA: 'Absorption: inhaled. Onset: 5-15 min, duration 4-6h. Metabolism: hepatic (COMT).',
  Anticholinergic: 'Absorption: inhaled. Onset: 30-60 min. Half-life: 3-4h. Excretion: minimal systemic.',
  Methylxanthine: 'Absorption: good oral. Half-life: 3-12h (non-smokers). Metabolism: CYP1A2. Excretion: renal.',
  'Antihistamine (1st gen)': 'Absorption: good. Half-life: 4-8h. Distribution: widespread including CNS. Metabolism: hepatic.',
  'Antihistamine (2nd gen)': 'Absorption: good. Half-life: 12-27h. Distribution: peripheral, limited CNS. Metabolism: hepatic (CYP450).',
  Alkylating: 'Absorption: oral/IV. Half-life: 3-12h. Metabolism: CYP450. Excretion: renal.',
  Antimetabolite: (n) => `${n.includes('Methotrexate') ? 'Half-life: 3-10h (low dose). Excretion: renal 90%.' : n.includes('Capecitabine') ? 'Half-life: 0.5-1h (prodrug).' : n.includes('Gemcitabine') ? 'Half-life: 0.5-1.5h. Excretion: renal.' : 'Half-life: 0.5-10h. Excretion: renal.'}`,
  Anthracycline: 'Absorption: IV only. Half-life: 20-48h (terminal). Metabolism: hepatic. Excretion: biliary.',
  Taxane: 'Absorption: IV only. Half-life: 5-20h. Metabolism: CYP2C8, 3A4. Excretion: biliary.',
  TKI: 'Absorption: good oral. Half-life: 18-40h. Metabolism: CYP3A4. Excretion: fecal.',
  Immunosuppressant: (n) => `${n.includes('Azathioprine') ? 'Half-life: 0.5-2h (active metabolite longer). Metabolism: XO.' : n.includes('Mycophenolate') ? 'Half-life: 8-16h.' : n.includes('Cyclophosphamide') ? 'Half-life: 3-12h. Metabolism: CYP2B6.' : n.includes('Tacrolimus') ? 'Half-life: 12-24h. Metabolism: CYP3A4.' : n.includes('Cyclosporine') ? 'Half-life: 8-24h. Metabolism: CYP3A4.' : 'Half-life: 8-24h. Metabolism: hepatic.'}`,
  Antiemetic: (n) => `${n.includes('Ondansetron') ? 'Half-life: 3-6h. Metabolism: CYP1A2, 3A4, 2D6.' : n.includes('Metoclopramide') ? 'Half-life: 4-6h.' : n.includes('Domperidone') ? 'Half-life: 7h. Metabolism: CYP3A4.' : 'Half-life: 3-12h.'}`,
  Laxative: 'Absorption: minimal (acts locally in GI tract). Onset: 6-48h depending on agent.',
  Scabicide: 'Absorption: minimal topical. Half-life: systemically ~12h. Excretion: renal.',
  SGLT2: 'Absorption: good oral. Half-life: 12-15h. Metabolism: glucuronidation. Excretion: renal (mostly).',
  DPP4: 'Absorption: good oral. Half-life: 12-24h. Excretion: renal (mostly unchanged).',
  Bisphosphonate: 'Absorption: very low oral (0.6-1.5%). Incorporate into bone. Half-life: years (skeletal). Excretion: renal.',
  Antigout: (n) => `${n.includes('Allopurinol') ? 'Half-life: 1-2h (active metabolite 14-30h). Excretion: renal.' : n.includes('Colchicine') ? 'Half-life: 20-40h. Metabolism: CYP3A4. Excretion: fecal.' : 'Half-life: 2-30h.'}`,
  'Urinary antiseptic': 'Absorption: good oral. Distribution: concentrated in urine. Half-life: 0.5-1h. Excretion: renal.',
}
const PK_DEFAULT = 'Absorption: variable depending on route. Distribution: widespread. Half-life: varies. Metabolism: hepatic. Excretion: renal.'

/** BBW templates */
const BBW = {
  NSAID: ['NSAIDs increase risk of serious cardiovascular thrombotic events, MI, and stroke (fatal).', 'Increased risk of serious GI adverse events including bleeding, ulceration, and perforation.'],
  Anticoagulant: ['Increases risk of major or fatal bleeding. Monitor for signs of bleeding.'],
  Antiplatelet: ['Increases risk of bleeding, including major and fatal bleeding.'],
  Fluoroquinolone: ['Fluoroquinolones increase risk of tendinitis and tendon rupture.', 'May exacerbate myasthenia gravis.', 'Peripheral neuropathy potentially irreversible.'],
  Tetracycline: ['Use in children <8 years may cause permanent tooth discoloration and bone growth inhibition.'],
  Aminoglycoside: ['Aminoglycosides associated with nephrotoxicity and ototoxicity. Monitor renal function and drug levels.'],
  'ACE inhibitor': ['DO NOT USE IN PREGNANCY. ACE inhibitors cause fetal injury and death.'],
  ARB: ['DO NOT USE IN PREGNANCY. ARBs cause fetal injury and death.'],
  Statin: ['May cause myopathy and rhabdomyolysis. Increased risk with higher doses and interacting drugs.'],
  'Antidepressant (SSRI)': ['Antidepressants increase risk of suicidal thinking and behavior in children, adolescents, and young adults.'],
  'Antidepressant (TCA)': ['Antidepressants increase risk of suicidal thinking and behavior.', 'TCAs are highly lethal in overdose - limit prescription quantity.'],
  'Antipsychotic (Typical)': ['Elderly with dementia-related psychosis at increased risk of death.'],
  'Antipsychotic (Atypical)': ['Elderly with dementia-related psychosis at increased risk of death.'],
  Opioid: ['Concomitant use with benzodiazepines may cause profound sedation, respiratory depression, coma, and death.', 'Risk of addiction, abuse, and misuse.'],
  Benzodiazepine: ['Concomitant use with opioids may cause profound sedation, respiratory depression, coma, and death.'],
  Antimycobacterial: ['Severe hepatotoxicity - monitor LFTs. Discontinue if signs of hepatic injury.'],
  'Antiretroviral (NRTI)': ['Lactic acidosis and severe hepatomegaly with steatosis, including fatal cases, reported.'],
  Nitrate: ['DO NOT USE WITH PDE-5 INHIBITORS - severe hypotension, MI, or death.'],
  PPI: ['Long-term use increases risk of osteoporosis-related fractures, C. difficile, and hypomagnesemia.'],
  Alkylating: (n) => [`${n || 'Alkylating agent'} may cause hemorrhagic cystitis, secondary malignancies, and cardiotoxicity.`],
  Anthracycline: ['Cardiotoxicity risk - cumulative dose limited; monitor LVEF.'],
  Antimetabolite: (n) => [`${n || 'Antimetabolite'} - potent agent with risk of fatal toxicities including myelosuppression, hepatotoxicity, and pulmonary fibrosis.`],
  TKI: ['May cause hepatotoxicity, QT prolongation, and severe fluid retention.'],
  Calcineurin: ['Increased risk of serious infections, malignancies, and nephrotoxicity.'],
  Immunosuppressant: ['Increased risk of serious infections and malignancies.'],
  SGLT2: ['May cause diabetic ketoacidosis (euglycemic DKA). Discontinue before surgery.'],
  Laxative: (n) => [`${n.includes('Bisacodyl') ? 'Prolonged use may cause atonic colon, electrolyte imbalance.' : n.includes('Lactulose') || n.includes('Macrogol') ? 'Generally well tolerated but monitor electrolytes with prolonged use.' : 'Use beyond 1 week without medical advice is not recommended.'}`],
}
const BBW_DEFAULT = []

/** Contraindications per class */
function classCI(cls) {
  const map = {
    Penicillin: ['Hypersensitivity to penicillins', 'Previous immediate hypersensitivity to beta-lactams'],
    Cephalosporin: ['Hypersensitivity to cephalosporins', 'Previous immediate hypersensitivity to penicillins (~5% cross-reactivity)'],
    Carbapenem: ['Hypersensitivity to carbapenems', 'Previous severe hypersensitivity to beta-lactams'],
    Macrolide: ['Hypersensitivity', 'Pre-existing QT prolongation', 'Severe hepatic impairment'],
    Fluoroquinolone: ['Hypersensitivity', 'History of tendon disorder', 'Myasthenia gravis', 'Children <18y (except specific)'],
    Tetracycline: ['Pregnancy', 'Children <8 years', 'Severe hepatic impairment'],
    Aminoglycoside: ['Hypersensitivity', 'Myasthenia gravis'],
    Sulfonamide: ['Hypersensitivity', 'Severe hepatic impairment', 'Porphyria'],
    'ACE inhibitor': ['History of angioedema', 'Pregnancy', 'Concomitant aliskiren in diabetes'],
    ARB: ['Pregnancy', 'Concomitant aliskiren in diabetes'],
    'Beta-blocker': ['Severe bradycardia', 'Advanced AV block', 'Cardiogenic shock', 'Severe asthma'],
    Statin: ['Active liver disease', 'Pregnancy', 'Breastfeeding'],
    NSAID: ['Active PUD', 'Severe heart failure', 'Severe renal impairment', 'CABG setting', 'Hypersensitivity (aspirin triad)'],
    Analgesic: ['Hypersensitivity', 'Severe hepatic impairment'],
    Opioid: ['Significant respiratory depression', 'Acute severe asthma', 'Paralytic ileus', 'Concomitant MAOI'],
    PPI: ['Hypersensitivity', 'Concomitant rilpivirine'],
    Benzodiazepine: ['Severe respiratory insufficiency', 'Myasthenia gravis', 'Sleep apnea', 'Severe hepatic impairment'],
    Anticonvulsant: ['Hypersensitivity', 'Severe hepatic impairment (some)'],
    Corticosteroid: ['Systemic fungal infection', 'Concurrent live vaccines'],
    SABA: ['Hypersensitivity', 'Tachyarrhythmia (caution)'],
    Biguanide: ['eGFR <30', 'Acute/chronic metabolic acidosis', 'Severe hepatic impairment', 'Acute decompensated HF'],
    Insulin: ['Hypoglycemia', 'Hypersensitivity'],
    Antiemetic: ['GI obstruction', 'Pheochromocytoma', 'Hypersensitivity'],
    Alkylating: ['Severe bone marrow suppression', 'Active infection', 'Pregnancy'],
    Antimetabolite: ['Severe bone marrow suppression', 'Pregnancy', 'Severe hepatic/renal impairment'],
    Antipsychotic: ['Severe CNS depression', 'Comatose states'],
    Calcineurin: ['Hypersensitivity', 'Severe renal impairment', 'Uncontrolled hypertension'],
  }
  return map[cls] || ['Hypersensitivity to active substance or excipients', 'Severe hepatic impairment']
}

/** Side effects per class */
function classSE(cls) {
  const map = {
    Penicillin: ['Diarrhea', 'Nausea', 'Vomiting', 'Skin rash', 'Urticaria', 'C. difficile diarrhea (prolonged)'],
    Cephalosporin: ['Diarrhea', 'Nausea', 'Skin rash', 'Abnormal LFTs'],
    Macrolide: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 'Dysgeusia', 'QT prolongation'],
    Fluoroquinolone: ['Nausea', 'Diarrhea', 'Headache', 'Dizziness', 'Insomnia', 'QT prolongation'],
    Tetracycline: ['GI upset', 'Photosensitivity', 'Esophageal irritation', 'Tooth discoloration'],
    Aminoglycoside: ['Nephrotoxicity', 'Ototoxicity (vestibular/cochlear)', 'Neuromuscular blockade'],
    Nitroimidazole: ['Nausea', 'Metallic taste', 'Headache', 'Disulfiram-like reaction with alcohol'],
    'ACE inhibitor': ['Dry cough', 'Hyperkalemia', 'Acute kidney injury', 'Angioedema (rare)', 'Hypotension'],
    ARB: ['Hyperkalemia', 'Dizziness', 'Hypotension'],
    'Beta-blocker': ['Bradycardia', 'Fatigue', 'Cold extremities', 'Dizziness', 'Bronchospasm'],
    'Calcium channel blocker (DHP)': ['Peripheral edema', 'Headache', 'Flushing', 'Dizziness', 'Palpitations'],
    Statin: ['Myalgia', 'Arthralgia', 'Increased transaminases', 'Headache'],
    'Thiazide diuretic': ['Hypokalemia', 'Hyperuricemia', 'Hyponatremia', 'Hyperglycemia'],
    'Loop diuretic': ['Hypokalemia', 'Dehydration', 'Hypotension', 'Ototoxicity'],
    'Potassium-sparing diuretic': ['Hyperkalemia', 'Gynecomastia', 'Menstrual irregularities'],
    Anticoagulant: ['Bleeding', 'Bruising', 'Hematoma', 'HIT (heparins)'],
    Antiplatelet: ['Bleeding', 'Bruising', 'Epistaxis'],
    'Cardiac glycoside': ['Nausea', 'Vomiting', 'Arrhythmias', 'Visual disturbances', 'Confusion'],
    Nitrate: ['Headache', 'Flushing', 'Dizziness', 'Hypotension', 'Reflex tachycardia'],
    NSAID: ['GI upset', 'GI bleeding', 'Increased BP', 'Renal impairment', 'Fluid retention'],
    Analgesic: ['Nausea', 'Rash', 'Hepatotoxicity (overdose)'],
    Opioid: ['Nausea', 'Vomiting', 'Constipation', 'Sedation', 'Respiratory depression', 'Pruritus', 'Urinary retention'],
    PPI: ['Headache', 'GI upset', 'Abnormal LFTs', 'Hypomagnesemia'],
    Benzodiazepine: ['Sedation', 'Dizziness', 'Ataxia', 'Amnesia', 'Paradoxical reactions', 'Dependence'],
    Anticonvulsant: ['Dizziness', 'Sedation', 'Ataxia', 'Nystagmus', 'Rash', 'Abnormal LFTs'],
    Corticosteroid: ['Weight gain', 'Increased appetite', 'Insomnia', 'Osteoporosis', 'Hyperglycemia', 'Immunosuppression'],
    SABA: ['Tremor', 'Tachycardia', 'Palpitations', 'Headache', 'Hypokalemia'],
    Biguanide: ['Diarrhea', 'Nausea', 'Metallic taste', 'Lactic acidosis (rare)', 'B12 deficiency'],
    Sulfonylurea: ['Hypoglycemia', 'Weight gain', 'GI upset'],
    Insulin: ['Hypoglycemia', 'Weight gain', 'Injection site reactions', 'Lipodystrophy'],
    Antiemetic: ['Drowsiness', 'Dry mouth', 'EPS (metoclopramide)', 'QT prolongation (ondansetron)'],
    'Antihistamine (1st gen)': ['Sedation', 'Dry mouth', 'Blurred vision', 'Urinary retention', 'Constipation'],
    'Antihistamine (2nd gen)': ['Headache', 'Dry mouth', 'Fatigue'],
    Alkylating: ['Myelosuppression', 'Nausea/vomiting', 'Alopecia', 'Hemorrhagic cystitis'],
    Antimetabolite: ['Myelosuppression', 'Mucositis', 'Nausea/vomiting', 'Hepatotoxicity'],
    Anthracycline: ['Myelosuppression', 'Cardiotoxicity', 'Alopecia', 'Nausea/vomiting'],
    Antipsychotic: ['EPS (typical)', 'Weight gain (atypical)', 'QT prolongation', 'Sedation'],
    Immunosuppressant: ['Increased infection risk', 'Myelosuppression', 'GI upset'],
    Calcineurin: ['Nephrotoxicity', 'Hypertension', 'Tremor', 'Increased infection risk'],
    Anthelmintic: ['Abdominal pain', 'Nausea', 'Headache', 'Dizziness'],
    Scabicide: ['Local irritation', 'Pruritus', 'Stinging'],
    Antimalarial: ['Nausea', 'Headache', 'Dizziness', 'Abdominal pain'],
    Electrolyte: ['GI upset', 'Phlebitis (IV)', 'Electrolyte imbalance with rapid administration'],
    Vitamin: ['Generally well tolerated', 'GI upset with high doses'],
    Local: ['Local pain', 'Hematoma', 'CNS toxicity (seizures)', 'Cardiac toxicity'],
    SGLT2: ['Genitourinary infections', 'Dehydration', 'DKA (rare)', 'Increased urination'],
    DPP4: ['Upper respiratory infection', 'Headache', 'GI upset', 'Pancreatitis (rare)'],
    Bisphosphonate: ['GI upset (oral)', 'Flu-like reaction (IV)', 'Osteonecrosis jaw (rare)', 'Atypical femur fracture'],
    Antigout: ['GI upset', 'Rash', 'Hypersensitivity (allopurinol)'],
    'Urinary antiseptic': ['GI upset', 'Brown urine', 'Pulmonary fibrosis (chronic)', 'Peripheral neuropathy'],
  }
  return map[cls] || ['Headache', 'Nausea', 'Dizziness', 'Fatigue', 'GI upset']
}

/** Warnings per class */
function classWarnings(cls) {
  const map = {
    Penicillin: ['Use with caution in renal impairment (CrCl <30 requires dose adjustment)', 'Extended use may lead to C. difficile'],
    Cephalosporin: ['Renal impairment dose adjustment', 'C. difficile risk with prolonged therapy'],
    Fluoroquinolone: ['Tendinitis risk (>60y, steroids)', 'Peripheral neuropathy', 'CNS effects', 'Myasthenia gravis exacerbation'],
    Tetracycline: ['Tooth discoloration <8 years', 'Photosensitivity', 'Esophageal ulceration risk'],
    Aminoglycoside: ['Nephrotoxicity - monitor levels', 'Ototoxicity may be irreversible', 'Neuromuscular blockade caution'],
    'ACE inhibitor': ['Angioedema - discontinue if facial swelling', 'Monitor K+ and Cr at 1-2 weeks'],
    ARB: ['Monitor K+ and Cr', 'Bilateral renal artery stenosis caution'],
    Beta: ['Do not abruptly discontinue - rebound risk', 'Mask hypoglycemia symptoms'],
    Statin: ['Myopathy/rhabdomyolysis risk', 'Monitor LFTs', 'Avoid in pregnancy'],
    NSAID: ['Cardiovascular thrombotic risk - lowest effective dose', 'GI bleeding risk', 'Renal impairment'],
    Opioid: ['Respiratory depression - titrate carefully', 'Constipation - prescribe bowel regimen', 'Risk of opioid use disorder'],
    Anticonvulsant: ['Suicidal thoughts/behavior risk', 'Do not abruptly discontinue'],
    Corticosteroid: ['HPA axis suppression', 'Osteoporosis', 'Hyperglycemia', 'Live vaccine avoidance'],
    Benzodiazepine: ['Risk of dependence and withdrawal', 'Paradoxical reactions', 'Elderly falls risk'],
    Anticoagulant: ['Bleeding risk - monitor signs', 'Neuraxial anesthesia caution (LMWH)'],
    Antipsychotic: ['EPS (typical)', 'Metabolic syndrome (atypical)', 'QT prolongation', 'NMS risk'],
    PPI: ['Osteoporosis-related fractures (long-term)', 'C. difficile risk', 'Hypomagnesemia'],
    Biguanide: ['Lactic acidosis risk (rare)', 'Hold 48h before IV contrast', 'Monitor B12 levels'],
    Sulfonylurea: ['Hypoglycemia - elderly, renal impairment', 'Weight gain'],
    Alkylating: ['Myelosuppression - monitor CBC', 'Hemorrhagic cystitis', 'Secondary malignancies'],
    Anthracycline: ['Cardiotoxicity - cumulative dose limit 550 mg/m2', 'Myelosuppression', 'Extravasation'],
    Antimetabolite: ['Myelosuppression', 'Mucositis', 'Hepatotoxicity', 'Pulmonary toxicity (MTX)'],
    Calcineurin: ['Nephrotoxicity - monitor levels', 'Hypertension', 'Infection/malignancy risk'],
  }
  return map[cls] || ['Use with caution in patients with renal or hepatic impairment', 'Monitor for adverse effects']
}

/** Overdose management */
function getOverdose(cls, n) {
  if (n.includes('Paracetamol') || n.includes('Acetaminophen')) return 'Symptoms: nausea, vomiting, abdominal pain within 24h. Hepatotoxicity 24-72h. Management: N-acetylcysteine (NAC) specific antidote. Measure serum level at 4h; plot on nomogram. Activated charcoal within 2h.'
  if (n.includes('Digoxin') || n.includes('Digitoxin')) return 'Symptoms: bradycardia, AV block, ventricular arrhythmias, visual disturbances, nausea. Management: digoxin-specific Fab antibodies. Hold digoxin, keep K+ 4-5.5 mEq/L. Correct K+, Mg+.'
  if (classIncludes(cls, 'Opioid')) return 'Symptoms: respiratory depression, miosis, sedation progressing to coma. Management: airway support, naloxone IV/IM/IN. Titrate to reverse respiratory depression. Monitor for renarcotization (half-life mismatch).'
  if (classIncludes(cls, 'Benzodiazepine')) return 'Symptoms: sedation, ataxia, slurred speech, respiratory depression (rare monotherapy). Management: supportive care, flumazenil (caution - withdrawal seizures).'
  if (n.includes('Amitriptyline') || n.includes('Imipramine')) return 'Symptoms: anticholinergic toxidrome, widened QRS, seizures, arrhythmias. Management: NaHCO3 for QRS >100ms, benzodiazepines for seizures. Highly lethal - limit Rx quantity.'
  if (classIncludes(cls, 'Beta-blocker')) return 'Symptoms: bradycardia, hypotension, seizures, hypoglycemia, bronchospasm. Management: glucagon (bypasses blocked receptor), atropine, pacing.'
  if (n.includes('Lithium')) return 'Symptoms: tremor, ataxia, confusion, seizures, coma, arrhythmias. Management: hemodialysis for severe toxicity, normal saline, supportive care.'
  if (n.includes('Iron') && !n.includes('Iron supplement')) return 'Symptoms: vomiting, diarrhea, GI bleeding, metabolic acidosis, liver failure. Management: whole bowel irrigation, IV desferrioxamine.'
  if (n.includes('Warfarin')) return 'Symptoms: bleeding, ecchymoses. Management: vitamin K (oral/IV), fresh frozen plasma or PCC for life-threatening bleeding. Hold warfarin, monitor INR.'
  if (classIncludes(cls, 'Anticoagulant')) return 'Symptoms: bleeding risk. Management: supportive care. Specific reversal agents: protamine (heparin/LMWH), andexanet alfa (rivaroxaban/apixaban), idarucizumab (dabigatran), vitamin K/PCC (warfarin).'
  if (n.includes('Aspirin') || n.includes('Acetylsalicylic')) return 'Symptoms: tinnitus, hyperventilation, metabolic acidosis, hypoglycemia. Management: activated charcoal, NaHCO3 (alkaline diuresis), hemodialysis for severe toxicity.'
  if (classIncludes(cls, 'SSRI') || classIncludes(cls, 'SNRI')) return 'Symptoms: serotonin syndrome (agitation, hyperthermia, clonus, hyperreflexia). Management: supportive care, cyproheptadine, benzodiazepines for agitation.'
  if (classIncludes(cls, 'Calcium channel') && !n.includes('DHP')) return 'Symptoms: bradycardia, hypotension, hyperglycemia, seizures. Management: IV calcium, high-dose insulin euglycemic therapy, vasopressors.'
  return 'Symptoms: nausea, vomiting, dizziness, dose-related adverse effects. Management: discontinue drug, provide supportive care. No specific antidote.'
}

function classIncludes(cls, kw) { return cls ? cls.toLowerCase().includes(kw.toLowerCase()) : false }

/** Pearls */
const PEARLS = {
  Penicillin: ['Complete full course of therapy'],
  ACEi: ['Monitor K+ and Cr 1-2 weeks after starting', 'Dry cough may resolve spontaneously'],
  ARB: ['Better tolerated than ACEi (no cough)', 'Monitor K+ and renal function'],
  Beta: ['Do not abruptly discontinue (rebound hypertension)', 'Cardioselective safer in asthma/COPD'],
  Statin: ['Evening dosing for short-acting agents', 'Avoid grapefruit juice with atorvastatin/simvastatin'],
  PPI: ['Take 30-60 min before first meal', 'Use lowest dose, shortest duration'],
  Biguanide: ['Start low (500mg) with evening meal', 'Hold 48h before IV contrast'],
  Opioid: ['Prescribe bowel regimen (stimulant + stool softener)', 'Use lowest effective dose shortest duration'],
  Insulin: ['Rotate injection sites', 'Unopened: 2-8C; in-use: room temp <28 days'],
  SABA: ['>2x/week use indicates poor asthma control - escalate therapy', 'Spacer improves deposition'],
  Anticoagulant: ['INR monitoring essential (warfarin)', 'No routine monitoring (DOACs)'],
  Antiplatelet: ['Aspirin 75-100mg for antiplatelet effect', 'Hold before surgery per protocol'],
  Anticonvulsant: ['Titrate slowly', 'Do not abruptly discontinue', 'Check drug levels where available'],
  Antipsychotic: ['Monitor weight, glucose, lipids regularly', 'QTc monitoring recommended'],
  SGLT2: ['Check for ketones even with normal glucose (euglycemic DKA)', 'Hold before surgery'],
  Tetracycline: ['Take with full glass water, upright 30 min', 'Avoid dairy 2h before/after'],
  Fluoroquinolone: ['Separate from dairy/antacids/iron by 2h', 'Excellent oral bioavailability'],
  Aminoglycoside: ['Once-daily dosing reduces nephrotoxicity', 'Monitor trough levels'],
  Corticosteroid: ['Morning dosing reduces HPA suppression', 'Taper after >3 weeks'],
  Anthelmintic: ['Treat all household contacts for intestinal helminths', 'Repeat dose in 2 weeks if indicated'],
  Scabicide: ['Apply neck to soles, leave 8-14h', 'Treat all household contacts', 'Wash bedding in hot water'],
  Antimalarial: ['Complete full course', 'ACT preferred for P. falciparum'],
  Antiemetic: ['Metoclopramide max 12 weeks (tardive dyskinesia)', 'Ondansetron most effective for chemo N/V'],
  Antihistamine: ['Use 1st gen at bedtime', 'Avoid 1st gen in elderly (falls)'],
}
const PEARLS_DEFAULT = ['Clinical response varies based on patient factors', 'Monitor therapeutic response and adjust dose accordingly']

// ------------------------------------------------------------------
// 4. PREGNANCY CATEGORIES
// ------------------------------------------------------------------

const PREG = {
  Penicillin: 'B', Cephalosporin: 'B', Carbapenem: 'B', Macrolide: 'B',
  Fluoroquinolone: 'C', Tetracycline: 'D', Aminoglycoside: 'D',
  Nitroimidazole: 'B', Lincosamide: 'B', Sulfonamide: 'C',
  'Antifungal (Azole)': 'C', 'Antifungal (Polyene)': 'B', 'Antifungal (Echinocandin)': 'C',
  Antimalarial: 'C', Antimycobacterial: 'C',
  'Antiviral (HSV)': 'B', 'Antiviral (Influenza)': 'C',
  'Antiretroviral (NRTI)': 'C', 'Antiretroviral (NNRTI)': 'C', 'Antiretroviral (Protease inhibitor)': 'C',
  'Antiretroviral (INSTI)': 'B', 'Antiretroviral (NtRTI)': 'B',
  'Calcium channel blocker (DHP)': 'C', 'Calcium channel blocker (Non-DHP)': 'C',
  'ACE inhibitor': 'D', ARB: 'D', 'Thiazide diuretic': 'B', 'Loop diuretic': 'C',
  'Potassium-sparing diuretic': 'C', 'Beta-blocker': 'C', Statin: 'X',
  'Cardiac glycoside': 'C', Nitrate: 'C', Benzodiazepine: 'D',
  'Antidepressant (SSRI)': 'C', 'Antidepressant (SNRI)': 'C', 'Antidepressant (TCA)': 'C',
  'Antipsychotic (Typical)': 'C', 'Antipsychotic (Atypical)': 'C',
  Anticonvulsant: 'D', Opioid: 'C', NSAID: 'C', 'Analgesic/Antipyretic': 'B',
  PPI: 'B', Biguanide: 'B', Sulfonylurea: 'C',
  Insulin: 'B', Corticosteroid: 'C', SABA: 'A',
  Anticholinergic: 'B', Methylxanthine: 'C',
  'Antihistamine (1st gen)': 'B', 'Antihistamine (2nd gen)': 'B',
  Alkylating: 'D', Antimetabolite: 'X', Anthracycline: 'D', Taxane: 'D',
  TKI: 'D', Immunosuppressant: 'D', Calcineurin: 'C',
  Scabicide: 'B', Anthelmintic: 'C', Antiprotozoal: 'C',
  Electrolyte: 'A', Vitamin: 'A', 'Local anaesthetic': 'B',
  SGLT2: 'C', DPP4: 'B', Bisphosphonate: 'C', Antigout: 'C',
  'Urinary antiseptic': 'B', Antiemetic: 'B', Anticoagulant: 'C', Antiplatelet: 'C',
}
const PREG_DEFAULT = 'C'

// ------------------------------------------------------------------
// 5. NEW DRUG DEFINITIONS
// ------------------------------------------------------------------
// [id, name, generic_name, drug_class, drug_class_name,
//  doseAdult, doseAdultAlt?, monitoring?, counselling?,
//  brands_override? (array), preg_override?,
//  warnings_override? (array), pearls_override? (array)]
// =================================================================

const NEW_DRUGS = [
  // -- Penicillins -----------------------------------------------
  ['new-001', 'Ampicillin', 'Ampicillin trihydrate', 'Penicillin', 'Anti-infectives - Penicillins',
   '250-500mg PO/IV every 6h; max 4g/day', '', 'Renal function, CBC', 'Take on empty stomach. Complete full course.',
   ['Pentrexil', 'Ampicin', 'Ampisyn']],
  ['new-002', 'Cloxacillin', 'Cloxacillin sodium', 'Penicillin', 'Anti-infectives - Penicillins',
   '250-500mg PO every 6h; 500mg-1g IV every 6h', '500mg-1g IV every 6h', 'Renal function, LFTs',
   'Take on empty stomach. Report jaundice.', ['Orbenin', 'Cloxapen', 'Klox']],
  ['new-003', 'Flucloxacillin', 'Flucloxacillin sodium', 'Penicillin', 'Anti-infectives - Penicillins',
   '250-500mg PO every 6h', '', 'LFTs (cholestatic jaundice risk)', 'Take on empty stomach. Report yellow eyes/skin, dark urine.',
   ['Floxapen', 'Staphylex', 'Flucloxin']],
  ['new-004', 'Piperacillin/Tazobactam', 'Piperacillin + Tazobactam', 'Penicillin', 'Anti-infectives - Penicillins',
   '4g/0.5g IV every 8h', '', 'Renal function, CBC, LFTs', 'IV only. Monitor for bleeding.',
   ['Tazocin', 'Zosyn', 'Piptaz']],
  ['new-005', 'Benzathine Penicillin G', 'Benzathine benzylpenicillin', 'Penicillin', 'Anti-infectives - Penicillins',
   '1.2-2.4 million units IM single dose', '', 'Monitor for Jarisch-Herxheimer reaction', 'IM only - do NOT give IV. Shake vial thoroughly.',
   ['Bicillin', 'Benzapen', 'Pendepon']],
  ['new-006', 'Procaine Penicillin G', 'Procaine benzylpenicillin', 'Penicillin', 'Anti-infectives - Penicillins',
   '0.6-1.2 million units IM daily', '', 'Injection site reactions', 'IM only - accidental IV may cause severe neurovascular reaction.',
   ['Procillin', 'Ayermycillin', 'Duracilin']],
  ['new-007', 'Penicillin V', 'Phenoxymethylpenicillin', 'Penicillin', 'Anti-infectives - Penicillins',
   '250-500mg PO every 6h', '', 'Renal function', 'Take on empty stomach.',
   ['Penicillin VK', 'Pen-Vee-K', 'Apopen']],

  // -- Cephalosporins --------------------------------------------
  ['new-008', 'Cefuroxime', 'Cefuroxime axetil', 'Cephalosporin', 'Anti-infectives - Cephalosporins',
   '250-500mg PO twice daily; 1.5g IV every 8h', '', 'Renal function', 'Take with food. Complete course.',
   ['Zinacef', 'Ceftin', 'Zefu']],
  ['new-009', 'Ceftazidime', 'Ceftazidime pentahydrate', 'Cephalosporin', 'Anti-infectives - Cephalosporins',
   '1-2g IV every 8h', '', 'Renal function, CBC', 'IV only. Dose adjust in renal impairment.',
   ['Fortum', 'Tazidime', 'Ceptaz']],
  ['new-010', 'Cefotaxime', 'Cefotaxime sodium', 'Cephalosporin', 'Anti-infectives - Cephalosporins',
   '1-2g IV/IM every 6-8h', '', 'Renal function, CBC', 'IV/IM. Complete full course.',
   ['Claforan', 'Cefotax', 'Taxim']],
  ['new-011', 'Cefepime', 'Cefepime hydrochloride', 'Cephalosporin', 'Anti-infectives - Cephalosporins',
   '1-2g IV every 8-12h', '', 'Renal function, CBC', '4th gen cephalosporin - broadest Gram-negative coverage.',
   ['Maxipime', 'Cepim', 'Ampel']],
  ['new-012', 'Cefaclor', 'Cefaclor monohydrate', 'Cephalosporin', 'Anti-infectives - Cephalosporins',
   '250-500mg PO every 8h', '', 'Renal function', 'Take on empty stomach.',
   ['Ceclor', 'Distaclor', 'Keflor']],
  ['new-013', 'Cefadroxil', 'Cefadroxil monohydrate', 'Cephalosporin', 'Anti-infectives - Cephalosporins',
   '500mg-1g PO twice daily', '', 'Renal function', 'Once/twice daily dosing.',
   ['Duricef', 'Cefamox', 'Kefadrox']],
  ['new-014', 'Cefpodoxime', 'Cefpodoxime proxetil', 'Cephalosporin', 'Anti-infectives - Cephalosporins',
   '100-400mg PO twice daily', '', 'Renal function', 'Take with food for better absorption.',
   ['Vantin', 'Cefodox', 'Orelox']],

  // -- Carbapenems -----------------------------------------------
  ['new-015', 'Meropenem', 'Meropenem trihydrate', 'Carbapenem', 'Anti-infectives - Carbapenems',
   '500mg-1g IV every 8h', '', 'Renal function, CBC', 'IV over 15-30 min. Lower seizure risk than imipenem.',
   ['Meronem', 'Merrem', 'Meropen']],
  ['new-016', 'Imipenem/Cilastatin', 'Imipenem + Cilastatin', 'Carbapenem', 'Anti-infectives - Carbapenems',
   '500mg/500mg IV every 6-8h', '', 'Renal function, seizure monitoring', 'IV only. Cilastatin prevents renal metabolism.',
   ['Primaxin', 'Tienam', 'Imipen']],
  ['new-017', 'Ertapenem', 'Ertapenem sodium', 'Carbapenem', 'Anti-infectives - Carbapenems',
   '1g IV/IM once daily', '', 'Renal function', 'Once-daily. Not active against Pseudomonas.',
   ['Invanz', 'Ertapen']],

  // -- Macrolides ------------------------------------------------
  ['new-018', 'Clarithromycin', 'Clarithromycin', 'Macrolide', 'Anti-infectives - Macrolides',
   '250-500mg PO twice daily', '', 'LFTs, QT interval', 'Potent CYP3A4 inhibitor. Many drug interactions.',
   ['Klacid', 'Biaxin', 'Claribid'], 'C'],
  ['new-019', 'Erythromycin', 'Erythromycin base/stearate', 'Macrolide', 'Anti-infectives - Macrolides',
   '250-500mg PO every 6h; 500mg-1g IV every 6h', '', 'LFTs, QT interval, hearing (high dose)', 'Take on empty stomach. GI upset common.',
   ['Erymax', 'Eryc', 'Erythrocin']],
  ['new-020', 'Roxithromycin', 'Roxithromycin', 'Macrolide', 'Anti-infectives - Macrolides',
   '150mg PO twice daily or 300mg once daily', '', 'LFTs', 'Better GI tolerability than erythromycin.',
   ['Rulide', 'Roxid', 'Romycin']],
  ['new-021', 'Spiramycin', 'Spiramycin', 'Macrolide', 'Anti-infectives - Macrolides',
   '1.5-3 million IU PO every 12h', '', 'LFTs', 'Used in toxoplasmosis in pregnancy. No CYP3A4 interaction.',
   ['Rovamycine', 'Spiramycin']],

  // -- Fluoroquinolones ------------------------------------------
  ['new-022', 'Levofloxacin', 'Levofloxacin hemihydrate', 'Fluoroquinolone', 'Anti-infectives - Fluoroquinolones',
   '250-750mg PO once daily', '', 'Renal function, QT interval', 'Avoid dairy/antacids/iron 2h before/after.',
   ['Levaquin', 'Cravit', 'Tavanic']],
  ['new-023', 'Moxifloxacin', 'Moxifloxacin HCl', 'Fluoroquinolone', 'Anti-infectives - Fluoroquinolones',
   '400mg PO once daily', '', 'LFTs, QT interval', 'Active against anaerobes. Avoid in pre-existing QT prolongation.',
   ['Avelox', 'Moxi', 'Vigamox (ophthalmic)']],
  ['new-024', 'Ofloxacin', 'Ofloxacin', 'Fluoroquinolone', 'Anti-infectives - Fluoroquinolones',
   '200-400mg PO twice daily', '', 'Renal function, QT interval', 'Take with water.',
   ['Floxin', 'Tarivid', 'Oflo']],
  ['new-025', 'Norfloxacin', 'Norfloxacin', 'Fluoroquinolone', 'Anti-infectives - Fluoroquinolones',
   '400mg PO twice daily (UTI)', '', 'Renal function', 'Concentrated in urine. Primarily for UTIs.',
   ['Noroxin', 'Utinor', 'Norflo']],

  // -- Tetracyclines ---------------------------------------------
  ['new-026', 'Tetracycline', 'Tetracycline HCl', 'Tetracycline', 'Anti-infectives - Tetracyclines',
   '250-500mg PO every 6h', '', 'Renal function, LFTs', 'Take on empty stomach. Avoid dairy/antacids/iron.',
   ['Achromycin', 'Tetracyn', 'Sumycin']],
  ['new-027', 'Minocycline', 'Minocycline HCl', 'Tetracycline', 'Anti-infectives - Tetracyclines',
   '100mg PO twice daily', '', 'LFTs, vestibular function', 'Vestibular side effects (dizziness, ataxia) common.',
   ['Minocin', 'Dynacin', 'Minol']],
  ['new-028', 'Tigecycline', 'Tigecycline', 'Tetracycline', 'Anti-infectives - Tetracyclines',
   '100mg IV then 50mg IV every 12h', '', 'LFTs, CBC, INR', 'IV only. Broad MDR coverage. Increased mortality warning.',
   ['Tygacil', 'Tigex']],

  // -- Aminoglycosides -------------------------------------------
  ['new-029', 'Amikacin', 'Amikacin sulfate', 'Aminoglycoside', 'Anti-infectives - Aminoglycosides',
   '15-20mg/kg IV/IM once daily', '7.5mg/kg every 12h (conventional)', 'Renal function, drug levels (peak/trough), audiometry',
   'IV over 30-60 min. Monitor for hearing loss.', ['Amikin', 'Amika', 'Amikac']],
  ['new-030', 'Streptomycin', 'Streptomycin sulfate', 'Aminoglycoside', 'Anti-infectives - Aminoglycosides',
   '15mg/kg IM once daily (max 1g)', '', 'Renal function, audiometry, vestibular', 'IM only. Always in combination for TB.',
   ['Streptomycin']],
  ['new-031', 'Tobramycin', 'Tobramycin sulfate', 'Aminoglycoside', 'Anti-infectives - Aminoglycosides',
   '5-7mg/kg IV/IM once daily', '', 'Renal function, drug levels, audiometry', 'Inhaled form for cystic fibrosis.',
   ['Tobrex', 'Nebcin', 'Tobi']],
  ['new-032', 'Neomycin', 'Neomycin sulfate', 'Aminoglycoside', 'Anti-infectives - Aminoglycosides',
   '500mg-1g PO every 6h (bowel prep); topical as directed', '', 'Renal function', 'Oral for bowel decontamination, hepatic encephalopathy.',
   ['Neomycin', 'Mycifradin']],

  // -- Sulfonamides ----------------------------------------------
  ['new-033', 'Co-trimoxazole', 'Trimethoprim + Sulfamethoxazole', 'Sulfonamide', 'Anti-infectives - Sulfonamides',
   '960mg (800/160mg) PO twice daily', '', 'Renal function, CBC, LFTs', 'Take with water. Report rash immediately.',
   ['Bactrim', 'Septrin', 'Septran']],
  ['new-034', 'Sulfadiazine', 'Sulfadiazine', 'Sulfonamide', 'Anti-infectives - Sulfonamides',
   '1-2g PO every 6h (loading) then 500mg-1g every 6h', '', 'Renal function, CBC, urine output', 'Maintain high fluid intake.',
   ['Sulfadiazine', 'Microsulfon']],

  // -- Antifungals -----------------------------------------------
  ['new-035', 'Ketoconazole', 'Ketoconazole', 'Antifungal (Azole)', 'Anti-infectives - Antifungals (Azoles)',
   '200-400mg PO once daily; topical as directed', '', 'LFTs, adrenal function', 'Potent CYP3A4/5 inhibitor. Avoid antacids 2h.',
   ['Nizoral', 'Ketomed', 'Fungoral']],
  ['new-036', 'Itraconazole', 'Itraconazole', 'Antifungal (Azole)', 'Anti-infectives - Antifungals (Azoles)',
   '100-200mg PO once daily (capsules with food)', '', 'LFTs, cardiac function', 'Capsules: take with food. Solution: empty stomach.',
   ['Sporanox', 'Itrazol', 'Canditral']],
  ['new-037', 'Voriconazole', 'Voriconazole', 'Antifungal (Azole)', 'Anti-infectives - Antifungals (Azoles)',
   '6mg/kg IV every 12h x2 loading then 4mg/kg every 12h; PO 200-400mg twice daily', '', 'LFTs, renal, visual function',
   'Visual disturbances (photophobia) common. Take on empty stomach.', ['Vfend', 'Voricon']],
  ['new-038', 'Amphotericin B', 'Amphotericin B deoxycholate', 'Antifungal (Polyene)', 'Anti-infectives - Antifungals (Polyenes)',
   '0.5-1mg/kg IV daily; liposomal 3-5mg/kg IV daily', '', 'Renal function (daily), K+, Mg+, CBC, LFTs',
   'IV over 2-6h. Premedicate for infusion reactions.', ['Fungizone', 'Ambisome (liposomal)']],
  ['new-039', 'Nystatin', 'Nystatin', 'Antifungal (Polyene)', 'Anti-infectives - Antifungals (Polyenes)',
   'Oral suspension: 400,000-600,000 units 4 times daily', '', 'None (minimal systemic absorption)', 'Swish and swallow for oral thrush.',
   ['Mycostatin', 'Nilstat', 'Nystop']],
  ['new-040', 'Griseofulvin', 'Griseofulvin', 'Antifungal (Other)', 'Anti-infectives - Antifungals (Other)',
   '500mg-1g daily (microsize)', '', 'LFTs, CBC', 'Take with fatty meal. Complete 4-8 week course.',
   ['Grifulvin', 'Fulvicin', 'Grisovin']],
  ['new-041', 'Terbinafine', 'Terbinafine HCl', 'Antifungal (Allylamine)', 'Anti-infectives - Antifungals (Allylamines)',
   '250mg PO once daily; topical as directed', '', 'LFTs (oral therapy)', 'Oral for dermatophyte infections. Complete 6-12 weeks.',
   ['Lamisil', 'Terbifine', 'Fungisil']],
  ['new-042', 'Caspofungin', 'Caspofungin acetate', 'Antifungal (Echinocandin)', 'Anti-infectives - Antifungals (Echinocandins)',
   '70mg IV loading then 50mg IV daily', '', 'LFTs, infusion reactions', 'IV only. First-line for invasive candidiasis.',
   ['Cancidas']],
  // -- Antivirals ------------------------------------------------
  ['new-043', 'Valacyclovir', 'Valacyclovir HCl', 'Antiviral (HSV)', 'Anti-infectives - Antivirals (HSV/VZV)',
   '500mg-1g PO twice daily (HSV); 1g three times daily (VZV)', '', 'Renal function', 'Prodrug of acyclovir. Start at earliest sign of outbreak.',
   ['Valtrex', 'Valcivir', 'Valax']],
  ['new-044', 'Ganciclovir', 'Ganciclovir sodium', 'Antiviral (HSV)', 'Anti-infectives - Antivirals (CMV/HSV)',
   '5mg/kg IV every 12h x14-21d (induction); 5mg/kg daily (maintenance)', '', 'CBC, renal function',
   'Significant myelosuppression.', ['Cytovene', 'Cymevene']],
  ['new-045', 'Valganciclovir', 'Valganciclovir HCl', 'Antiviral (HSV)', 'Anti-infectives - Antivirals (CMV/HSV)',
   '900mg PO twice daily (induction); 900mg daily (maintenance)', '', 'CBC, renal function', 'Oral prodrug of ganciclovir. Take with food.',
   ['Valcyte']],
  ['new-046', 'Oseltamivir', 'Oseltamivir phosphate', 'Antiviral (Influenza)', 'Anti-infectives - Antivirals (Influenza)',
   '75mg PO twice daily x5 days', '75mg once daily (prophylaxis)', 'Renal function', 'Start within 48h of symptom onset.',
   ['Tamiflu', 'Oselta', 'Fluvir']],
  ['new-047', 'Ribavirin', 'Ribavirin', 'Antiviral (HCV)', 'Anti-infectives - Antivirals (HCV/RSV)',
   '800-1200mg daily divided (HCV); aerosolized (RSV)', '', 'CBC (hemolytic anemia), pregnancy test monthly',
   'Teratogenic. Strict contraception required.', ['Rebetol', 'Copegus', 'Virazole']],
  ['new-048', 'Famciclovir', 'Famciclovir', 'Antiviral (HSV)', 'Anti-infectives - Antivirals (HSV/VZV)',
   '250-500mg PO three times daily', '', 'Renal function', 'Prodrug of penciclovir.',
   ['Famvir']],
  ['new-049', 'Zanamivir', 'Zanamivir', 'Antiviral (Influenza)', 'Anti-infectives - Antivirals (Influenza)',
   '10mg (2 inhalations) twice daily x5 days', '', 'Respiratory function', 'Inhaled only. Caution in asthma/COPD.',
   ['Relenza']],

  // -- Antiretrovirals -------------------------------------------
  ['new-050', 'Efavirenz', 'Efavirenz', 'Antiretroviral (NNRTI)', 'Anti-infectives - Antiretrovirals (NNRTIs)',
   '600mg PO once daily (empty stomach, bedtime)', '', 'LFTs, lipids, pregnancy test', 'Bedtime dosing reduces CNS effects. Teratogenic 1st trimester.',
   ['Sustiva', 'Stocrin', 'Efavir'], 'D'],
  ['new-051', 'Nevirapine', 'Nevirapine', 'Antiretroviral (NNRTI)', 'Anti-infectives - Antiretrovirals (NNRTIs)',
   '200mg PO once daily x14d lead-in then 200mg twice daily', '', 'LFTs, skin reactions (SJS/TEN)', 'Lead-in dose reduces rash risk.',
   ['Viramune', 'Nevimune']],
  ['new-052', 'Lopinavir/Ritonavir', 'Lopinavir + Ritonavir', 'Antiretroviral (Protease inhibitor)', 'Anti-infectives - Antiretrovirals (PIs)',
   '400mg/100mg PO twice daily', '', 'LFTs, lipids, glucose, ECG', 'Ritonavir boosts lopinavir via CYP3A4 inhibition. Take with food.',
   ['Kaletra', 'Aluvia', 'Lopimune']],
  ['new-053', 'Atazanavir', 'Atazanavir sulfate', 'Antiretroviral (Protease inhibitor)', 'Anti-infectives - Antiretrovirals (PIs)',
   '300mg + ritonavir 100mg PO once daily', '', 'LFTs, bilirubin, lipids, ECG (PR prolongation)',
   'Benign unconjugated hyperbilirubinemia common. Take with food.', ['Reyataz', 'Atazor']],
  ['new-054', 'Darunavir', 'Darunavir ethanolate', 'Antiretroviral (Protease inhibitor)', 'Anti-infectives - Antiretrovirals (PIs)',
   '800mg + ritonavir 100mg PO once daily', '', 'LFTs, lipids, glucose', 'Always boosted with ritonavir. High genetic barrier.',
   ['Prezista', 'Daruvir', 'Darnav']],
  ['new-055', 'Raltegravir', 'Raltegravir potassium', 'Antiretroviral (INSTI)', 'Anti-infectives - Antiretrovirals (INSTIs)',
   '400mg PO twice daily', '', 'LFTs, CK, lipids', 'No food restriction.',
   ['Isentress']],
  ['new-056', 'Emtricitabine', 'Emtricitabine', 'Antiretroviral (NRTI)', 'Anti-infectives - Antiretrovirals (NRTIs)',
   '200mg PO once daily', '', 'Renal function, HBV serology', 'Active against HIV-1 and HBV. Usually in FDC.',
   ['Emtriva']],
  ['new-057', 'Abacavir', 'Abacavir sulfate', 'Antiretroviral (NRTI)', 'Anti-infectives - Antiretrovirals (NRTIs)',
   '300mg PO twice daily or 600mg once daily', '', 'HLA-B*5701 screening, LFTs, lipids',
   'Screen for HLA-B*5701 before use. Hypersensitivity risk in positive patients.', ['Ziagen']],
  ['new-058', 'Zidovudine', 'Zidovudine (AZT)', 'Antiretroviral (NRTI)', 'Anti-infectives - Antiretrovirals (NRTIs)',
   '300mg PO twice daily', '', 'CBC (anemia/neutropenia), LFTs', 'Monitor Hb and ANC closely. Macrocytic anemia dose-limiting.',
   ['Retrovir', 'Zidovir']],
  ['new-059', 'Rilpivirine', 'Rilpivirine HCl', 'Antiretroviral (NNRTI)', 'Anti-infectives - Antiretrovirals (NNRTIs)',
   '25mg PO once daily', '', 'LFTs, lipids, ECG (QT)', 'Must take with meal (≥400 kcal). Not for VL >100,000 copies/mL.',
   ['Edurant']],
  ['new-060', 'Etravirine', 'Etravirine', 'Antiretroviral (NNRTI)', 'Anti-infectives - Antiretrovirals (NNRTIs)',
   '200mg PO twice daily (after meals)', '', 'LFTs, skin reactions', 'Active against NNRTI-resistant HIV. No lead-in dose.',
   ['Intelence']],
  ['new-061', 'Maraviroc', 'Maraviroc', 'Antiretroviral (Entry inhibitor)', 'Anti-infectives - Antiretrovirals (Entry inhibitors)',
   '300mg PO twice daily', '', 'LFTs, tropism assay (CCR5)', 'Treats only CCR5-tropic HIV. Tropism assay required before start.',
   ['Celsentri', 'Selzentry']],

  // -- Antimalarials ---------------------------------------------
  ['new-062', 'Chloroquine', 'Chloroquine phosphate', 'Antimalarial', 'Anti-infectives - Antimalarials',
   '600mg base PO loading then 300mg base at 6, 24, 48h', '', 'ECG (QT), retinal (long-term), G6PD',
   'Take with food. Increasing resistance in P. falciparum.', ['Nivaquine', 'Chloroquine', 'Malarex']],
  ['new-063', 'Mefloquine', 'Mefloquine HCl', 'Antimalarial', 'Anti-infectives - Antimalarials',
   '250mg PO once weekly (prophylaxis)', '', 'LFTs, neuropsychiatric symptoms', 'Contraindicated in psychiatric disorders. Vivid dreams common.',
   ['Lariam', 'Mefliam']],
  ['new-064', 'Primaquine', 'Primaquine phosphate', 'Antimalarial', 'Anti-infectives - Antimalarials',
   '15mg base PO daily x14d (radical cure P. vivax)', '', 'G6PD level (MANDATORY), Hb, CBC',
   'Test G6PD before use. Causes hemolysis in G6PD deficiency.', ['Primaquine']],
  ['new-065', 'Artesunate IV', 'Artesunate (artemisinin derivative)', 'Antimalarial', 'Anti-infectives - Antimalarials',
   '2.4mg/kg IV at 0, 12, 24, 48h (severe malaria)', '', 'CBC (late hemolysis risk), glucose, parasitemia',
   'Switch to oral ACT once tolerated. Monitor hemolysis ~2-3 weeks after.', ['Artesunate', 'Malacef', 'Arsumax']],
  ['new-066', 'DHA/Piperaquine', 'Dihydroartemisinin + Piperaquine', 'Antimalarial', 'Anti-infectives - Antimalarials',
   '3 tablets PO once daily x3 days (weight-based)', '', 'ECG (QT), parasitemia', 'Complete 3-day course. Take after food.',
   ['Eurartesim', 'Duo-Cotecxin', 'Artekin']],

  // -- Antimycobacterials ----------------------------------------
  ['new-067', 'Rifabutin', 'Rifabutin', 'Antimycobacterial', 'Anti-infectives - Antimycobacterials',
   '300mg PO once daily', '', 'LFTs, CBC, uveitis (long-term)', 'Less CYP3A4 induction than rifampicin. Orange body fluids.',
   ['Mycobutin', 'Ansamycin']],
  ['new-068', 'Bedaquiline', 'Bedaquiline fumarate', 'Antimycobacterial', 'Anti-infectives - Antimycobacterials',
   '400mg PO once daily x2w then 200mg three times weekly', '', 'ECG (QT - boxed warning), LFTs',
   'MDR-TB drug. Monitor QT closely.', ['Sirturo']],
  ['new-069', 'Delamanid', 'Delamanid', 'Antimycobacterial', 'Anti-infectives - Antimycobacterials',
   '100mg PO twice daily', '', 'ECG (QT), LFTs', 'MDR-TB drug. Use in combination.',
   ['Deltyba']],

  // -- Antivirals (new) ------------------------------------------
  ['new-070', 'Sofosbuvir', 'Sofosbuvir', 'Antiviral (HCV)', 'Anti-infectives - Antivirals (HCV)',
   '400mg PO once daily (with other DAAs)', '', 'HCV RNA, LFTs', 'Part of DAA combination for HCV. Well tolerated.',
   ['Sovaldi']],
  ['new-071', 'Daclatasvir', 'Daclatasvir', 'Antiviral (HCV)', 'Anti-infectives - Antivirals (HCV)',
   '60mg PO once daily (with sofosbuvir)', '', 'HCV RNA', 'NS5A inhibitor. Used with sofosbuvir for HCV.',
   ['Daklinza']],

  // -- ACE inhibitors --------------------------------------------
  ['new-072', 'Captopril', 'Captopril', 'ACE inhibitor', 'Cardiovascular - ACE Inhibitors',
   '12.5-25mg PO 2-3 times daily (max 450mg/day)', '', 'Renal function, K+, BP', 'Take 1h before meals (food reduces absorption). Monitor K+ and Cr.',
   ['Capoten', 'Capto', 'Acepril']],
  ['new-073', 'Lisinopril', 'Lisinopril', 'ACE inhibitor', 'Cardiovascular - ACE Inhibitors',
   '5-40mg PO once daily', '', 'Renal function, K+, BP', 'Once-daily. Not a prodrug - no hepatic activation needed.',
   ['Zestril', 'Prinivil', 'Lisinor']],
  ['new-074', 'Ramipril', 'Ramipril', 'ACE inhibitor', 'Cardiovascular - ACE Inhibitors',
   '2.5-10mg PO once daily (max 20mg/day)', '', 'Renal function, K+, BP', 'Starting dose 2.5mg daily. Titrate up. Monitor K+ and Cr.',
   ['Altace', 'Tritace', 'Ramipres']],
  ['new-075', 'Perindopril', 'Perindopril erbumine', 'ACE inhibitor', 'Cardiovascular - ACE Inhibitors',
   '4-8mg PO once daily (max 16mg/day)', '', 'Renal function, K+, BP', 'Long-acting. Take once daily.',
   ['Coversyl', 'Aceon', 'Perindo']],

  // -- ARBs ------------------------------------------------------
  ['new-076', 'Valsartan', 'Valsartan', 'ARB', 'Cardiovascular - ARBs',
   '80-320mg PO once daily', '', 'Renal function, K+, BP', 'Once-daily. Can be taken with or without food.',
   ['Diovan', 'Valza', 'Valsacor']],
  ['new-077', 'Candesartan', 'Candesartan cilexetil', 'ARB', 'Cardiovascular - ARBs',
   '8-32mg PO once daily', '', 'Renal function, K+, BP', 'Once-daily. Prodrug requires hepatic activation.',
   ['Atacand', 'Candar', 'Blopress']],
  ['new-078', 'Irbesartan', 'Irbesartan', 'ARB', 'Cardiovascular - ARBs',
   '150-300mg PO once daily', '', 'Renal function, K+, BP', 'Once-daily. Food does not affect absorption.',
   ['Avapro', 'Irbetan', 'Aprovel']],
  ['new-079', 'Telmisartan', 'Telmisartan', 'ARB', 'Cardiovascular - ARBs',
   '40-80mg PO once daily', '', 'Renal function, K+, BP', 'Also has PPAR-gamma agonist activity. Monitor K+ and Cr.',
   ['Micardis', 'Telma', 'Telmikind']],

  // -- Calcium channel blockers ----------------------------------
  ['new-080', 'Nifedipine (SR)', 'Nifedipine (sustained release)', 'Calcium channel blocker (DHP)', 'Cardiovascular - Calcium Channel Blockers',
   '30-90mg PO once daily (SR)', '', 'BP, HR, edema', 'SR formulation only. Avoid grapefruit juice. Ankle edema common.',
   ['Adalat SR', 'Procardia', 'Nifecard']],
  ['new-081', 'Diltiazem', 'Diltiazem HCl', 'Calcium channel blocker (Non-DHP)', 'Cardiovascular - Calcium Channel Blockers',
   '120-360mg PO daily (SR)', '', 'BP, HR, ECG (AV block)', 'Non-DHP - caution with beta-blockers (bradycardia).',
   ['Cardizem', 'Tildiem', 'Dilzem']],
  ['new-082', 'Verapamil', 'Verapamil HCl', 'Calcium channel blocker (Non-DHP)', 'Cardiovascular - Calcium Channel Blockers',
   '120-480mg PO daily (divided or SR)', '', 'BP, HR, ECG, LFTs', 'Constipation common. Avoid grapefruit juice. CYP3A4 interactions.',
   ['Isoptin', 'Calan', 'Veracor']],

  // -- Beta-blockers ---------------------------------------------
  ['new-083', 'Atenolol', 'Atenolol', 'Beta-blocker', 'Cardiovascular - Beta-blockers',
   '25-100mg PO once daily', '', 'BP, HR, renal function (dose adjust in impairment)', 'Once-daily. Cardioselective but water soluble.',
   ['Tenormin', 'Aten', 'Hypoten']],
  ['new-084', 'Metoprolol', 'Metoprolol tartrate/succinate', 'Beta-blocker', 'Cardiovascular - Beta-blockers',
   '50-200mg PO once daily (SR); 25-100mg twice daily (tartrate)', '', 'BP, HR', 'Cardioselective. Take with or immediately after food.',
   ['Lopressor', 'Toprol XL', 'Betaloc']],
  ['new-085', 'Propranolol', 'Propranolol HCl', 'Beta-blocker', 'Cardiovascular - Beta-blockers',
   '40-320mg PO daily (divided doses or SR)', '', 'BP, HR, blood glucose (may mask hypoglycemia)', 'Non-selective. Avoid in asthma. Also for migraine prophylaxis.',
   ['Inderal', 'Propran', 'Beta-nol']],
  ['new-086', 'Nebivolol', 'Nebivolol HCl', 'Beta-blocker', 'Cardiovascular - Beta-blockers',
   '2.5-10mg PO once daily', '', 'BP, HR', 'Cardioselective with NO-mediated vasodilation. Fewer side effects.',
   ['Nebilet', 'Bystolic', 'Nebivol']],
  ['new-087', 'Labetalol', 'Labetalol HCl', 'Beta-blocker', 'Cardiovascular - Beta-blockers',
   '100-800mg PO twice daily; 20-80mg IV', '', 'BP, HR, LFTs', 'Alpha + beta blocker. Preferred in hypertension in pregnancy.',
   ['Trandate', 'Labetalol']],

  // -- Diuretics -------------------------------------------------
  ['new-088', 'Chlortalidone', 'Chlortalidone', 'Thiazide diuretic', 'Cardiovascular - Diuretics',
   '12.5-25mg PO once daily', '', 'K+, Na+, glucose, uric acid', 'Longer half-life than HCTZ (24-48h). Good HTN agent.',
   ['Hygroton', 'Thalitone']],
  ['new-089', 'Indapamide', 'Indapamide', 'Thiazide diuretic', 'Cardiovascular - Diuretics',
   '1.25-2.5mg PO once daily', '', 'K+, Na+, uric acid', 'Metabolically neutral at low doses. Once-daily.',
   ['Natrilix', 'Lozol', 'Indapa']],
  ['new-090', 'Amiloride', 'Amiloride HCl', 'Potassium-sparing diuretic', 'Cardiovascular - Diuretics',
   '5-10mg PO once daily', '', 'K+, renal function', 'Distal tubule Na channel blocker. Avoid K supplements.',
   ['Midamor', 'Amilco']],
  ['new-091', 'Mannitol', 'Mannitol', 'Loop diuretic', 'Cardiovascular - Diuretics (Osmotic)',
   '0.25-1g/kg IV as 15-20% solution', '', 'Serum osmolality, Na+, K+, renal function, urine output',
   'IV only. Osmotic diuretic for cerebral edema, raised ICP.', ['Osmitrol', 'Mannitol IV']],
  ['new-092', 'Eplerenone', 'Eplerenone', 'Potassium-sparing diuretic', 'Cardiovascular - Diuretics',
   '25-50mg PO once daily', '', 'K+, renal function, BP', 'More selective for aldosterone receptor than spironolactone. Less gynecomastia.',
   ['Inspra', 'Eplerenon']],

  // -- Statins ---------------------------------------------------
  ['new-093', 'Rosuvastatin', 'Rosuvastatin calcium', 'Statin', 'Cardiovascular - Statins',
   '5-40mg PO once daily', '', 'LFTs, lipids, CK (if symptoms)', 'Potent statin. Avoid 40mg in Asian patients. Fewer CYP interactions.',
   ['Crestor', 'Rosuvas', 'Rovista']],
  ['new-094', 'Pravastatin', 'Pravastatin sodium', 'Statin', 'Cardiovascular - Statins',
   '10-40mg PO once daily', '', 'LFTs, lipids', 'Least CYP interaction of statins. Hydrophilic - less muscle symptoms.',
   ['Pravachol', 'Lipostat', 'Pravas']],
  ['new-095', 'Fluvastatin', 'Fluvastatin sodium', 'Statin', 'Cardiovascular - Statins',
   '20-80mg PO once daily (evening)', '', 'LFTs, lipids', 'Short half-life. Take in evening.',
   ['Lescol', 'Fluvastatin']],
  ['new-096', 'Pitavastatin', 'Pitavastatin', 'Statin', 'Cardiovascular - Statins',
   '1-4mg PO once daily', '', 'LFTs, lipids', 'Minimal CYP metabolism. Lower drug interaction potential.',
   ['Livalo', 'Pitava']],

  // -- Anticoagulants --------------------------------------------
  ['new-097', 'Rivaroxaban', 'Rivaroxaban', 'Anticoagulant', 'Cardiovascular - Anticoagulants',
   '20mg PO once daily (AF); 15mg twice daily x21d then 20mg daily (DVT/PE)', '', 'Renal function, LFTs, bleeding signs',
   'Direct Xa inhibitor. No routine monitoring. Take with food.', ['Xarelto', 'Rivarox']],
  ['new-098', 'Apixaban', 'Apixaban', 'Anticoagulant', 'Cardiovascular - Anticoagulants',
   '5mg PO twice daily (AF); 10mg twice daily x7d then 5mg twice daily (DVT/PE)', '', 'Renal function, LFTs, bleeding signs',
   'Direct Xa inhibitor. No routine monitoring.', ['Eliquis', 'Apixor']],
  ['new-099', 'Dabigatran', 'Dabigatran etexilate', 'Anticoagulant', 'Cardiovascular - Anticoagulants',
   '150mg PO twice daily (AF); 150mg twice daily (DVT/PE)', '', 'Renal function (CrCl), bleeding signs',
   'Direct thrombin inhibitor. Keep in original bottle. Idarucizumab is reversal agent.', ['Pradaxa', 'Dabigatran']],
  ['new-100', 'Edoxaban', 'Edoxaban', 'Anticoagulant', 'Cardiovascular - Anticoagulants',
   '60mg PO once daily', '', 'Renal function (CrCl), bleeding signs', 'Direct Xa inhibitor. Once-daily dosing.',
   ['Savaysa', 'Lixiana']],
  ['new-101', 'Dalteparin', 'Dalteparin sodium', 'Anticoagulant', 'Cardiovascular - Anticoagulants (LMWH)',
   '200 IU/kg SC once daily (DVT/PE); 5000 IU SC once daily (prophylaxis)', '', 'Platelets (HIT), anti-Xa if needed',
   'LMWH. No routine monitoring.', ['Fragmin']],

  // -- Antiplatelets ---------------------------------------------
  ['new-102', 'Ticagrelor', 'Ticagrelor', 'Antiplatelet', 'Cardiovascular - Antiplatelets',
   '180mg PO loading then 90mg twice daily', '', 'Bleeding signs, dyspnea (common)', 'Reversible P2Y12 inhibitor. Not a prodrug. Avoid aspirin >100mg.',
   ['Brilinta', 'Ticagrelor']],
  ['new-103', 'Prasugrel', 'Prasugrel HCl', 'Antiplatelet', 'Cardiovascular - Antiplatelets',
   '60mg PO loading then 10mg once daily', '', 'Bleeding signs', 'More potent than clopidogrel. Contraindicated in CVA history.',
   ['Effient', 'Prasugrel']],
  ['new-104', 'Dipyridamole', 'Dipyridamole', 'Antiplatelet', 'Cardiovascular - Antiplatelets',
   '75-100mg PO 3-4 times daily; 200mg twice daily (SR with aspirin)', '', 'Bleeding signs, headache', 'Also coronary vasodilator (stress test).',
   ['Persantine', 'Dipyridamole']],
  // -- Antiarrhythmics -------------------------------------------
  ['new-105', 'Amiodarone', 'Amiodarone HCl', 'Cardiac glycoside', 'Cardiovascular - Antiarrhythmics',
   '200mg PO three times daily x1w then 200mg twice daily x1w then 200mg daily (maintenance)', '',
   'LFTs, thyroid, PFTs, ECG (QT), ocular, CXR', 'Loading required. Many toxicities: thyroid, pulmonary, hepatic, ocular, skin.',
   ['Cordarone', 'Amio', 'Pacerone']],
  ['new-106', 'Sotalol', 'Sotalol HCl', 'Antiarrhythmic', 'Cardiovascular - Antiarrhythmics',
   '80-160mg PO twice daily', '', 'ECG (QT, HR), renal function', 'Both beta-blocker and class III antiarrhythmic. QT prolongation risk.',
   ['Betapace', 'Sotalex']],
  ['new-107', 'Flecainide', 'Flecainide acetate', 'Antiarrhythmic', 'Cardiovascular - Antiarrhythmics',
   '50-150mg PO twice daily', '', 'ECG (QRS, PR), renal function', 'Class Ic. Contraindicated in CAD (CAST trial).',
   ['Tambocor', 'Flecainide']],
  ['new-108', 'Adenosine', 'Adenosine', 'Antiarrhythmic', 'Cardiovascular - Antiarrhythmics',
   '6mg rapid IV push, then 12mg if needed', '', 'ECG monitoring, BP', 'Very short half-life (<10s). Flushing, chest pain common.',
   ['Adenocard', 'Adenoscan']],

  // -- Other Cardiovascular --------------------------------------
  ['new-109', 'Hydralazine', 'Hydralazine HCl', 'Vasodilator', 'Cardiovascular - Vasodilators',
   '25-100mg PO 2-4 times daily', '', 'BP, HR, ANA (with long-term for lupus risk)', 'Direct arteriolar vasodilator. Can cause reflex tachycardia.',
   ['Apresoline', 'Hydralazine']],
  ['new-110', 'Clonidine', 'Clonidine HCl', 'Centrally-acting antihypertensive', 'Cardiovascular - Antihypertensives',
   '0.05-0.3mg PO twice daily; also patch', '', 'BP, HR', 'Central alpha-2 agonist. Rebound HTN with abrupt stop. Also ADHD, opioid withdrawal.',
   ['Catapres', 'Clonidine', 'Dixarit']],
  ['new-111', 'Methyldopa', 'Methyldopa', 'Centrally-acting antihypertensive', 'Cardiovascular - Antihypertensives',
   '250-500mg PO 2-3 times daily (max 3g/day)', '', 'BP, LFTs, CBC', 'DOC for hypertension in pregnancy. May cause positive Coombs test.',
   ['Aldomet', 'Medopa', 'Dopamet']],
  ['new-112', 'Doxazosin', 'Doxazosin mesylate', 'Alpha-blocker', 'Cardiovascular - Antihypertensives',
   '1-8mg PO once daily (bedtime)', '', 'BP (postural), BPH symptoms', 'Alpha-1 blocker. First-dose syncope risk - start low, at bedtime.',
   ['Cardura', 'Doxacor', 'Doxadura']],
  ['new-113', 'Tamsulosin', 'Tamsulosin HCl', 'Alpha-blocker', 'Urology - Alpha-blockers',
   '0.4mg PO once daily (30 min after same meal daily)', '', 'BP (postural), BPH symptoms', 'Alpha-1a selective (prostate). Less BP effect. Floppy iris syndrome (cataract surgery).',
   ['Flomax', 'Tamsulosin', 'Urimax']],
  ['new-114', 'Finasteride', 'Finasteride', '5-alpha-reductase inhibitor', 'Urology - 5-ARIs',
   '5mg PO once daily (BPH); 1mg PO once daily (alopecia)', '', 'PSA levels (adjust), BPH symptoms', 'Reduces DHT. May reduce PSA by 50%. Teratogenic - women should not handle crushed tablets.',
   ['Proscar', 'Propecia', 'Finpecia']],
  ['new-115', 'Mirabegron', 'Mirabegron', 'Antimuscarinic (Urology)', 'Urology - Overactive Bladder',
   '25-50mg PO once daily', '', 'BP (increases BP), urinary retention', 'Beta-3 agonist. Alternative to anticholinergics for OAB.',
   ['Betmiga', 'Myrbetriq']],

  // -- SSRIs -----------------------------------------------------
  ['new-116', 'Citalopram', 'Citalopram HBr', 'Antidepressant (SSRI)', 'CNS - Antidepressants (SSRIs)',
   '20-40mg PO once daily (max 40mg/day)', '', 'ECG (QT at >40mg), LFTs', 'QT prolongation at high doses - max 40mg/day. Good tolerability.',
   ['Celexa', 'Cipramil', 'Celapram']],
  ['new-117', 'Escitalopram', 'Escitalopram oxalate', 'Antidepressant (SSRI)', 'CNS - Antidepressants (SSRIs)',
   '10-20mg PO once daily', '', 'LFTs, ECG (QT minimal)', 'S-enantiomer of citalopram. Fewer drug interactions.',
   ['Lexapro', 'Cipralex', 'Esitalo']],
  ['new-118', 'Paroxetine', 'Paroxetine HCl', 'Antidepressant (SSRI)', 'CNS - Antidepressants (SSRIs)',
   '20-50mg PO once daily (morning)', '', 'LFTs, weight, sexual function', 'Most sedating SSRI. Significant withdrawal syndrome. Higher anticholinergic.',
   ['Paxil', 'Seroxat', 'Aropax']],

  // -- SNRIs -----------------------------------------------------
  ['new-119', 'Venlafaxine', 'Venlafaxine HCl', 'Antidepressant (SNRI)', 'CNS - Antidepressants (SNRIs)',
   '37.5-225mg PO once daily (ER) or 2-3 times daily (IR)', '', 'BP (may increase), LFTs, ECG', 'Dual reuptake inhibitor. Dose-dependent HTN risk. Withdrawal syndrome significant.',
   ['Effexor', 'Venlafaxine', 'Venfax']],
  ['new-120', 'Duloxetine', 'Duloxetine HCl', 'Antidepressant (SNRI)', 'CNS - Antidepressants (SNRIs)',
   '30-60mg PO once daily (max 120mg/day)', '', 'LFTs, BP, urinary hesitancy', 'Also indicated for neuropathic pain, fibromyalgia, chronic MSK pain.',
   ['Cymbalta', 'Dulox', 'Duzela']],
  ['new-121', 'Mirtazapine', 'Mirtazapine', 'Antidepressant (Other)', 'CNS - Antidepressants (Other)',
   '15-45mg PO once daily (bedtime)', '', 'LFTs, weight, CBC (neutropenia rare)', 'Alpha-2 antagonist. Sedating at low doses (H1 block), activating at high doses. Appetite stimulation useful.',
   ['Remeron', 'Mirtaz', 'Mirtapine']],
  ['new-122', 'Bupropion', 'Bupropion HCl', 'Antidepressant (Other)', 'CNS - Antidepressants (Other)',
   '150-300mg PO once daily (SR); 150-450mg daily (divided, IR)', '', 'BP, seizure risk', 'NDRI - no sexual side effects. Contraindicated in seizures, eating disorders. Also smoking cessation.',
   ['Wellbutrin', 'Zyban', 'Bupron']],
  ['new-123', 'Trazodone', 'Trazodone HCl', 'Antidepressant (Other)', 'CNS - Antidepressants (Other)',
   '50-300mg PO once daily (bedtime for sleep; divided for depression)', '', 'ECG (QT), priapism (rare but urgent)', 'Sedating antidepressant. Often used at low doses for insomnia. Risk of priapism.',
   ['Desyrel', 'Trazodone', 'Trittico']],

  // -- Antipsychotics --------------------------------------------
  ['new-124', 'Olanzapine', 'Olanzapine', 'Antipsychotic (Atypical)', 'CNS - Antipsychotics (Atypicals)',
   '5-20mg PO once daily (bedtime)', '', 'Weight, glucose, lipids, LFTs', 'Weight gain and metabolic syndrome risk most significant among atypicals.',
   ['Zyprexa', 'Olanzapine', 'Oleanz']],
  ['new-125', 'Quetiapine', 'Quetiapine fumarate', 'Antipsychotic (Atypical)', 'CNS - Antipsychotics (Atypicals)',
   '50-800mg PO daily (divided or IR; once daily XR)', '', 'Weight, glucose, lipids, LFTs, BP', 'Dose-dependent: low dose (25-100mg) for sleep; high dose for antipsychotic. QTc risk.',
   ['Seroquel', 'Quetiapine', 'Q-pin']],
  ['new-126', 'Aripiprazole', 'Aripiprazole', 'Antipsychotic (Atypical)', 'CNS - Antipsychotics (Atypicals)',
   '10-30mg PO once daily', '', 'Weight, glucose, lipids, EPS', 'Partial D2 agonist - lower EPS, less metabolic. Also for bipolar, autism irritability.',
   ['Abilify', 'Aripiprazole', 'Arip MT']],
  ['new-127', 'Clozapine', 'Clozapine', 'Antipsychotic (Atypical)', 'CNS - Antipsychotics (Atypicals)',
   '12.5-100mg PO once daily (slow titrate; max 900mg/day)', '', 'CBC (mandatory ANC monitoring - agranulocytosis), weight, glucose, LFTs, ECG',
   'Treatment-resistant schizophrenia. REMS program required. Fatal agranulocytosis risk - monitor ANC weekly.', ['Clozaril', 'Clozapine', 'Leponex']],

  // -- Mood Stabilizers ------------------------------------------
  ['new-128', 'Lithium', 'Lithium carbonate', 'Mood stabilizer', 'CNS - Mood Stabilizers',
   '300-600mg PO 2-3 times daily (dose to level 0.6-1.2 mEq/L)', '', 'Li levels (q3 months), thyroid, renal, ECG',
   'Narrow therapeutic index. Monitor levels 12h post-dose. Hydrate well. Toxicity: tremor, ataxia, confusion.', ['Lithicarb', 'Lithium', 'Camcolit']],


  // -- Other CNS (Anticonvulsants continued, Antiparkinsonian) ---
  ['new-129', 'Lamotrigine', 'Lamotrigine', 'Anticonvulsant', 'CNS - Anticonvulsants',
   '25-400mg PO daily (slow titrate - 25mg/2w)', '', 'LFTs, skin reactions (SJS/TEN)', 'Titrate slowly over weeks. SJS/TEN risk with rapid titration. Mood stabilizer also.',
   ['Lamictal', 'Lamotrigine', 'Lamitor']],
  ['new-130', 'Topiramate', 'Topiramate', 'Anticonvulsant', 'CNS - Anticonvulsants',
   '25-400mg PO twice daily (slow titrate)', '', 'LFTs, renal function, visual symptoms', 'Weight loss side effect. Word finding difficulty. Acute glaucoma risk. Also migraine.',
   ['Topamax', 'Topiramate', 'Topamac']],
  ['new-131', 'Gabapentin', 'Gabapentin', 'Anticonvulsant', 'CNS - Anticonvulsants',
   '300-1200mg PO three times daily (titrate from 300mg daily)', '', 'Renal function (dose adjust), CNS (sedation)', 'Saturable absorption. Also neuropathic pain, restless legs. No hepatic metabolism.',
   ['Neurontin', 'Gabapentin', 'Gabatin']],
  ['new-132', 'Pregabalin', 'Pregabalin', 'Anticonvulsant', 'CNS - Anticonvulsants',
   '75-300mg PO twice daily', '', 'Renal function (dose adjust), CNS (sedation)', 'Linear PK (better than gabapentin). Also for neuropathic pain, fibromyalgia, GAD.',
   ['Lyrica', 'Pregabalin', 'Pregeb']],
  ['new-133', 'Oxcarbazepine', 'Oxcarbazepine', 'Anticonvulsant', 'CNS - Anticonvulsants',
   '300-1200mg PO twice daily', '', 'LFTs, Na (hyponatremia risk), renal', 'Better tolerated than carbamazepine. Hyponatremia risk in elderly. Also bipolar.',
   ['Trileptal', 'Oxcarbazepine', 'Oxetol']],
  ['new-134', 'Clobazam', 'Clobazam', 'Anticonvulsant', 'CNS - Anticonvulsants',
   '5-20mg PO twice daily', '', 'LFTs, sedation', 'Benzodiazepine anticonvulsant. Less tolerance than other BZDs. Lennox-Gastaut.',
   ['Frisium', 'Onfi', 'Clobazam']],
  ['new-135', 'Vigabatrin', 'Vigabatrin', 'Anticonvulsant', 'CNS - Anticonvulsants',
   '500mg-1.5g PO twice daily', '', 'Visual field testing (mandatory), LFTs, CBC', 'Irreversible GABA transaminase inhibitor. Permanent visual field loss risk. REMS.',
   ['Sabril', 'Vigabatrin']],
  ['new-136', 'Ethosuximide', 'Ethosuximide', 'Anticonvulsant', 'CNS - Anticonvulsants',
   '250-750mg PO twice daily', '', 'LFTs, CBC, renal', 'DOC for absence seizures. Not effective for GTC or partial seizures.',
   ['Zarontin', 'Ethosuximide']],

  // -- Antiparkinsonian ------------------------------------------
  ['new-137', 'Pramipexole', 'Pramipexole diHCl', 'Dopaminergic', 'CNS - Antiparkinsonian (Dopamine agonists)',
   '0.125-1.5mg PO three times daily (slow titrate)', '', 'Renal function, impulse control behaviors', 'Dopamine agonist. Risk of impulse control disorders (gambling, hypersexuality).',
   ['Mirapex', 'Pramipexole', 'Pexola']],
  ['new-138', 'Ropinirole', 'Ropinirole HCl', 'Dopaminergic', 'CNS - Antiparkinsonian (Dopamine agonists)',
   '0.25-8mg PO three times daily (slow titrate)', '', 'BP, impulse control behaviors', 'Dopamine agonist. Also for restless legs syndrome.',
   ['Requip', 'Ropinirole', 'Ropin']],
  ['new-139', 'Benztropine', 'Benztropine mesylate', 'Anticholinergic', 'CNS - Antiparkinsonian (Anticholinergics)',
   '0.5-2mg PO twice daily', '', 'Mental status (elderly), urinary retention, glaucoma', 'Anticholinergic for EPS from antipsychotics. Avoid in elderly (cognitive decline).',
   ['Cogentin', 'Benztropine']],
  ['new-140', 'Trihexyphenidyl', 'Trihexyphenidyl HCl', 'Anticholinergic', 'CNS - Antiparkinsonian (Anticholinergics)',
   '1-5mg PO 3-4 times daily (slow titrate)', '', 'Mental status, urinary retention, glaucoma', 'Anticholinergic for EPS and Parkinsonism.',
   ['Artane', 'Trihexyphenidyl', 'Pacitane']],

  // -- NSAIDs/Analgesics -----------------------------------------
  ['new-141', 'Celecoxib', 'Celecoxib', 'COX-2 inhibitor', 'CNS - NSAIDs (COX-2 selective)',
   '100-200mg PO once or twice daily', '', 'LFTs, renal, BP, CV risk', 'COX-2 selective - less GI bleeding. Increased CV risk. Sulfonamide allergy cross-reaction.',
   ['Celebrex', 'Celecoxib', 'Celcoxx']],
  ['new-142', 'Indomethacin', 'Indomethacin', 'NSAID', 'CNS - NSAIDs',
   '25-50mg PO 2-3 times daily (max 200mg/day)', '', 'Renal, GI, LFTs, BP', 'Potent anti-inflammatory. High GI toxicity. Also for patent ductus arteriosus closure.',
   ['Indocin', 'Indomethacin', 'Indocid']],
  ['new-143', 'Piroxicam', 'Piroxicam', 'NSAID', 'CNS - NSAIDs',
   '10-20mg PO once daily', '', 'Renal, GI, LFTs, BP', 'Long half-life (50h). Once-daily dosing. High GI risk.',
   ['Feldene', 'Piroxicam', 'Pirox']],
  ['new-144', 'Meloxicam', 'Meloxicam', 'NSAID', 'CNS - NSAIDs',
   '7.5-15mg PO once daily', '', 'Renal, GI, LFTs, BP', 'Preferential COX-2. Less GI toxicity than traditional NSAIDs.',
   ['Mobic', 'Meloxicam', 'Melox']],
  ['new-145', 'Ketorolac', 'Ketorolac tromethamine', 'NSAID', 'CNS - NSAIDs',
   '10mg PO every 6h; 15-30mg IV/IM every 6h (max 5 days)', '', 'Renal, GI bleeding, coagulation', 'Potent IV/IM. Limit to 5 days (GI/renal toxicity). Not for chronic pain.',
   ['Toradol', 'Ketorolac', 'Ketanov']],
  ['new-146', 'Etoricoxib', 'Etoricoxib', 'COX-2 inhibitor', 'CNS - NSAIDs (COX-2 selective)',
   '60-120mg PO once daily', '', 'BP, renal, LFTs, CV risk', 'Highly selective COX-2. Once-daily. Contraindicated in uncontrolled HTN.',
   ['Arcoxia', 'Etoricoxib', 'Etocox']],

  // -- Opioids (additional) --------------------------------------
  ['new-147', 'Fentanyl', 'Fentanyl citrate', 'Opioid', 'CNS - Opioids',
   '12-100mcg/h transdermal patch (every 72h); 25-100mcg IV/IM', '', 'Respiratory rate, sedation, bowel function',
   'Potent synthetic opioid. Patches for opioid-tolerant only. Do not apply heat over patch.', ['Duragesic', 'Fentanyl', 'Durogesic']],
  ['new-148', 'Buprenorphine', 'Buprenorphine HCl', 'Opioid', 'CNS - Opioids',
   '0.3-0.6mg IV/IM every 6-8h (analgesia); 2-24mg sublingual daily (OUD)', '', 'Respiratory rate, LFTs, urine drug screen',
   'Partial agonist. Ceiling effect on respiratory depression. Also OUD treatment (with naloxone).', ['Buprenex', 'Subutex', 'Suboxone']],
  ['new-149', 'Methadone', 'Methadone HCl', 'Opioid', 'CNS - Opioids',
   '2.5-10mg PO every 8-12h (analgesia); 20-120mg daily (OUD maintenance)', '', 'ECG (QT prolongation - risk), respiratory rate',
   'Long half-life 24-36h. QT prolongation risk. OUD treatment requires special licensing.', ['Methadone', 'Dolophine', 'Methadose']],
  ['new-150', 'Oxycodone', 'Oxycodone HCl', 'Opioid', 'CNS - Opioids',
   '5-15mg PO every 4-6h (IR); 10-80mg twice daily (SR)', '', 'Respiratory rate, sedation, bowel function',
   'High oral bioavailability. Often abused. SR formulation must be swallowed whole.', ['OxyContin', 'Percocet', 'Oxynorm']],
  ['new-151', 'Tapentadol', 'Tapentadol HCl', 'Opioid', 'CNS - Opioids',
   '50-100mg PO every 4-6h (IR); 50-250mg twice daily (SR)', '', 'Respiratory rate, BP, sedation, bowel function',
   'Mu agonist + NRI. Less nausea than pure opioids. Seizure risk at high doses.', ['Nucynta', 'Tapentadol', 'Palexia']],

  // -- PPIs ------------------------------------------------------
  ['new-152', 'Lansoprazole', 'Lansoprazole', 'PPI', 'GI - Proton Pump Inhibitors',
   '15-30mg PO once daily (before breakfast)', '', 'LFTs, Mg (prolonged use)', 'Take before breakfast. Available OTC. Max effect 3-5 days.',
   ['Prevacid', 'Lansoprazole', 'Lanzol']],
  ['new-153', 'Rabeprazole', 'Rabeprazole sodium', 'PPI', 'GI - Proton Pump Inhibitors',
   '20mg PO once daily (before breakfast)', '', 'LFTs', 'Fastest onset of action among PPIs. Fewer CYP2C19 interactions.',
   ['Aciphex', 'Rabeprazole', 'Pariet']],
  ['new-154', 'Dexlansoprazole', 'Dexlansoprazole', 'PPI', 'GI - Proton Pump Inhibitors',
   '30-60mg PO once daily', '', 'LFTs', 'Dual delayed-release technology. Can take without regard to meals.',
   ['Dexilant', 'Dexlansoprazole']],

  // -- Antiemetics (additional) ----------------------------------
  ['new-155', 'Domperidone', 'Domperidone', 'Antiemetic', 'GI - Antiemetics',
   '10mg PO three times daily (before meals, max 30mg/day)', '', 'ECG (QT - black box), LFTs, prolactin',
   'Peripheral D2 antagonist. Less CNS than metoclopramide. QT prolongation risk - ECG monitoring.', ['Motilium', 'Domperidone', 'Domerid']],
  ['new-156', 'Prochlorperazine', 'Prochlorperazine', 'Antiemetic', 'GI - Antiemetics',
   '5-10mg PO every 6-8h; 12.5mg IM', '', 'EPS, sedation', 'Phenothiazine antiemetic. EPS risk (acute dystonia).',
   ['Compazine', 'Prochlorperazine', 'Stemetil']],
  ['new-157', 'Cyclizine', 'Cyclizine HCl', 'Antiemetic', 'GI - Antiemetics',
   '50mg PO up to 3 times daily', '', 'Sedation, dry mouth', 'Antihistamine antiemetic. DOC for motion sickness, post-op N/V.',
   ['Valoid', 'Cyclizine', 'Marezine']],

  // -- Laxatives (additional) ------------------------------------
  ['new-158', 'Senna', 'Senna (sennosides)', 'Laxative', 'GI - Laxatives (Stimulant)',
   '15-30mg PO once daily (max 60mg/day)', '', 'Electrolytes (prolonged use)', 'Stimulant laxative. Onset 6-12h. Can discolor urine.',
   ['Senokot', 'Senna', 'Ex-Lax']],
  ['new-159', 'Macrogol', 'Polyethylene glycol (PEG)', 'Laxative', 'GI - Laxatives (Osmotic)',
   '13-26g PO once daily (dissolved in water)', '', 'Electrolytes (prolonged use)', 'Osmotic laxative. Onset 24-48h. Also for bowel prep.',
   ['Movicol', 'Miralax', 'PEG']],
  ['new-160', 'Docusate Sodium', 'Docusate sodium', 'Laxative', 'GI - Laxatives (Stool Softeners)',
   '100-200mg PO once daily', '', 'None significant', 'Stool softener. Not strong for constipation. Onset 12-72h.',
   ['Colace', 'Docusate', 'Dioctyl']],

  // -- IBD drugs -------------------------------------------------
  ['new-161', 'Mesalazine', 'Mesalazine (5-ASA)', 'Antiemetic', 'GI - IBD (5-ASAs)',
   '400mg-1g PO 2-4 times daily', '', 'Renal function, CBC, LFTs', 'DOC for UC. Various formulations release in different GI segments. Mesalamine enema/suppository.',
   ['Asacol', 'Pentasa', 'Salofalk']],
  ['new-162', 'Sulfasalazine', 'Sulfasalazine', 'Antiemetic', 'GI - IBD (5-ASAs)',
   '500mg-1g PO 2-4 times daily (enteric-coated)', '', 'CBC, LFTs, renal function, semen analysis', 'Contains sulfa component. Can cause reversible oligospermia. Also for RA.',
   ['Salazopyrin', 'Sulfasalazine', 'Azulfidine']],

  // -- Endocrine: Diabetes ---------------------------------------
  ['new-163', 'Glipizide', 'Glipizide', 'Sulfonylurea', 'Endocrine - Diabetes (Sulfonylureas)',
   '2.5-20mg PO once daily (before breakfast)', '', 'Blood glucose, HbA1c, weight', 'Short-acting sulfonylurea. Take 30 min before breakfast.',
   ['Glucotrol', 'Glipizide', 'Minidiab']],
  ['new-164', 'Glimepiride', 'Glimepiride', 'Sulfonylurea', 'Endocrine - Diabetes (Sulfonylureas)',
   '1-6mg PO once daily (with breakfast)', '', 'Blood glucose, HbA1c, weight', 'Once-daily sulfonylurea. Long duration of action.',
   ['Amaryl', 'Glimepiride', 'Glimer']],
  ['new-165', 'Pioglitazone', 'Pioglitazone HCl', 'Insulin', 'Endocrine - Diabetes (TZDs)',
   '15-45mg PO once daily', '', 'LFTs, weight, fluid status (HF risk)', 'PPAR-gamma agonist. Bladder cancer risk warning. Fluid retention - caution in HF.',
   ['Actos', 'Pioglitazone', 'Pioz']],

  // -- SGLT2 inhibitors ------------------------------------------
  ['new-166', 'Dapagliflozin', 'Dapagliflozin', 'SGLT2', 'Endocrine - Diabetes (SGLT2i)',
   '10mg PO once daily', '', 'eGFR, blood glucose, genital infections', 'Also indicated for HF and CKD (independent of diabetes). Euglycemic DKA risk.',
   ['Farxiga', 'Dapagliflozin', 'Dapa']],
  ['new-167', 'Empagliflozin', 'Empagliflozin', 'SGLT2', 'Endocrine - Diabetes (SGLT2i)',
   '10-25mg PO once daily', '', 'eGFR, blood glucose, genital infections', 'CV mortality benefit (EMPA-REG). Also for HF. Euglycemic DKA risk.',
   ['Jardiance', 'Empagliflozin', 'Empa']],
  ['new-168', 'Canagliflozin', 'Canagliflozin', 'SGLT2', 'Endocrine - Diabetes (SGLT2i)',
   '100-300mg PO once daily (before first meal)', '', 'eGFR, blood glucose, genital infections', 'Also CV benefit (CANVAS). Amputation risk (increased). Take before first meal.',
   ['Invokana', 'Canagliflozin', 'Cana']],
  ['new-169', 'Sitagliptin', 'Sitagliptin phosphate', 'DPP4', 'Endocrine - Diabetes (DPP-4i)',
   '100mg PO once daily', '', 'Renal function (dose adjust), LFTs', 'Well tolerated. Weight neutral. Pancreatitis risk (rare).',
   ['Januvia', 'Sitagliptin', 'Sita']],
  ['new-170', 'Acarbose', 'Acarbose', 'Antidiabetic', 'Endocrine - Diabetes (Alpha-glucosidase inhibitors)',
   '25-100mg PO three times daily (with first bite of each meal)', '', 'LFTs (high dose), blood glucose', 'Alpha-glucosidase inhibitor. GI side effects (flatulence, diarrhea) limit use.',
   ['Precose', 'Acarbose', 'Glucobay']],

  // -- Insulins --------------------------------------------------
  ['new-171', 'Insulin Glargine', 'Insulin glargine (rDNA origin)', 'Insulin', 'Endocrine - Diabetes (Insulins)',
   '10-80 units SC once daily (dose individualized)', '', 'Blood glucose, HbA1c, injection sites', 'Basal insulin. Clear solution. Do not mix with other insulins. Duration 20-24h.',
   ['Lantus', 'Toujeo', 'Basaglar']],
  ['new-172', 'Insulin Detemir', 'Insulin detemir (rDNA origin)', 'Insulin', 'Endocrine - Diabetes (Insulins)',
   '0.1-0.4 units/kg SC once or twice daily', '', 'Blood glucose, HbA1c, injection sites', 'Basal insulin. Clear. Duration 16-24h. Less weight gain than NPH.',
   ['Levemir', 'Insulin Detemir']],
  ['new-173', 'Insulin Degludec', 'Insulin degludec (rDNA origin)', 'Insulin', 'Endocrine - Diabetes (Insulins)',
   '10-50 units SC once daily (dose individualized)', '', 'Blood glucose, HbA1c, injection sites', 'Ultra-long basal. Duration >42h. Flexible dosing (any time of day).',
   ['Tresiba', 'Insulin Degludec']],
  ['new-174', 'Insulin Lispro', 'Insulin lispro (rDNA origin)', 'Insulin', 'Endocrine - Diabetes (Insulins)',
   'Dose within 15 min before or after meals (dose individualized)', '', 'Blood glucose, HbA1c, injection sites', 'Rapid-acting analogue. Onset 5-15 min. Duration 3-5h.',
   ['Humalog', 'Insulin Lispro', 'Admelog']],
  ['new-175', 'Insulin Aspart', 'Insulin aspart (rDNA origin)', 'Insulin', 'Endocrine - Diabetes (Insulins)',
   'Dose within 15 min before or after meals (dose individualized)', '', 'Blood glucose, HbA1c, injection sites', 'Rapid-acting analogue. Onset 5-15 min. Duration 3-5h.',
   ['NovoRapid', 'Novolog', 'Insulin Aspart']],
  ['new-176', 'Insulin Regular', 'Regular insulin (rDNA origin)', 'Insulin', 'Endocrine - Diabetes (Insulins)',
   'Dose 30-60 min before meals (IV for emergencies)', '', 'Blood glucose, K+ (with IV)', 'Short-acting. Only insulin suitable for IV. Onset 30-60 min.',
   ['Humulin R', 'Novolin R', 'Actrapid']],
  ['new-177', 'Insulin NPH', 'NPH insulin (isophane)', 'Insulin', 'Endocrine - Diabetes (Insulins)',
   '0.1-0.4 units/kg SC once or twice daily', '', 'Blood glucose, HbA1c, injection sites', 'Intermediate-acting. Cloudy suspension - resuspend gently. Peak 4-10h.',
   ['Humulin N', 'Novolin N', 'Insulatard']],

  // -- Thyroid ---------------------------------------------------
  ['new-178', 'Liothyronine', 'Liothyronine sodium (T3)', 'Thyroid', 'Endocrine - Thyroid Agents',
   '5-25mcg PO once or twice daily (titrate)', '', 'TSH, FT4, FT3, HR, weight', 'Synthetic T3. Short half-life (1 day). Used in myxedema coma, suppressive therapy.',
   ['Cytomel', 'Liothyronine', 'Triostat']],
  ['new-179', 'Carbimazole', 'Carbimazole', 'Antithyroid', 'Endocrine - Thyroid Agents (Antithyroid)',
   '20-60mg PO once daily (titrate to maintenance 5-20mg)', '', 'CBC (agranulocytosis), LFTs, TFTs', 'Prodrug of methimazole. Agranulocytosis risk - warn patient about sore throat, fever.',
   ['Neo-Mercazole', 'Carbimazole', 'Thyrozol']],
  ['new-180', 'Propylthiouracil', 'Propylthiouracil (PTU)', 'Antithyroid', 'Endocrine - Thyroid Agents (Antithyroid)',
   '100-300mg PO three times daily (titrate to maintenance 50-100mg/day)', '', 'LFTs (hepatotoxicity risk - boxed warning), CBC, TFTs',
   'First-line only in 1st trimester pregnancy. Hepatotoxicity risk - monitor LFTs.', ['PTU', 'Propylthiouracil']],

  // -- Respiratory -----------------------------------------------
  ['new-181', 'Terbutaline', 'Terbutaline sulfate', 'SABA', 'Respiratory - SABAs',
   '2.5-5mg PO three times daily; 0.25-0.5mg SC; inhaled as needed', '', 'HR, tremor, K+', 'SABA. Also used in obstetrics (tocolysis). Tremor common.',
   ['Bricanyl', 'Terbutaline', 'Terbulin']],
  ['new-182', 'Budesonide', 'Budesonide', 'Inhaled corticosteroid', 'Respiratory - ICS',
   '100-800mcg inhaled daily (divided doses)', '', 'Oral thrush, dysphonia', 'ICS. Rinse mouth after use. Also for Crohn disease (oral/entocort).',
   ['Pulmicort', 'Budesonide', 'Rhinocort']],
  ['new-183', 'Fluticasone', 'Fluticasone propionate', 'Inhaled corticosteroid', 'Respiratory - ICS',
   '100-500mcg inhaled twice daily', '', 'Oral thrush, dysphonia, adrenal suppression (high dose)', 'Potent ICS. Available as standalone and in combination inhalers.',
   ['Flovent', 'Flixotide', 'Fluticasone']],
  ['new-184', 'Salmeterol', 'Salmeterol xinafoate', 'LABA', 'Respiratory - LABAs',
   '25-50mcg inhaled twice daily', '', 'HR, tremor, K+', 'LABA. Never use as monotherapy in asthma - always with ICS. Duration 12h.',
   ['Serevent', 'Salmeterol']],
  ['new-185', 'Formoterol', 'Formoterol fumarate', 'LABA', 'Respiratory - LABAs',
   '12-24mcg inhaled twice daily', '', 'HR, tremor, K+', 'LABA with rapid onset. Duration 12h. Always use with ICS in asthma.',
   ['Foradil', 'Formoterol', 'Oxis']],
  ['new-186', 'Tiotropium', 'Tiotropium bromide', 'LAMA', 'Respiratory - LAMAs',
   '18mcg inhaled once daily (capsule); 5mcg once daily (Respimat)', '', 'Dry mouth, glaucoma (avoid contact with eyes)', 'Long-acting anticholinergic. DOC for COPD. Duration 24h+.',
   ['Spiriva', 'Tiotropium', 'Tiova']],
  ['new-187', 'Cetirizine', 'Cetirizine HCl', 'Antihistamine (2nd gen)', 'Allergy/Immunology - Antihistamines',
   '10mg PO once daily', '', 'LFTs, renal function (dose adjust)', 'Non-sedating. Active metabolite of hydroxyzine.',
   ['Zyrtec', 'Cetirizine', 'Zilergy']],
  ['new-188', 'Fexofenadine', 'Fexofenadine HCl', 'Antihistamine (2nd gen)', 'Allergy/Immunology - Antihistamines',
   '120-180mg PO once daily', '', 'Renal function', 'Non-sedating. No CNS penetration. Take with water (not fruit juice).',
   ['Allegra', 'Fexofenadine', 'Telfast']],
  ['new-189', 'Hydroxyzine', 'Hydroxyzine HCl/pamoate', 'Antihistamine (1st gen)', 'Allergy/Immunology - Antihistamines',
   '25-100mg PO 3-4 times daily', '', 'CNS (sedation), urinary retention, glaucoma', 'Sedating antihistamine. Also anxiolytic, antiemetic. Avoid in elderly.',
   ['Atarax', 'Vistaril', 'Hydroxyzine']],
  ['new-190', 'Promethazine', 'Promethazine HCl', 'Antihistamine (1st gen)', 'Allergy/Immunology - Antihistamines',
   '12.5-50mg PO/IM/IV every 4-6h', '', 'CNS (sedation), EPS (children), respiratory depression', 'Sedating antihistamine/antiemetic. Tissue necrosis with intra-arterial injection.',
   ['Phenergan', 'Promethazine', 'Promet']],
  ['new-191', 'Sodium Cromoglycate', 'Sodium cromoglicate', 'Other respiratory', 'Respiratory - Mast Cell Stabilizers',
   '2-4 puffs inhaled 3-4 times daily; eye drops as needed', '', 'None significant', 'Mast cell stabilizer. Prophylactic use only - not for acute attacks.',
   ['Intal', 'Cromolyn', 'Nalcrom']],


  // -- Oncology (additional) -------------------------------------
  ['new-192', 'Capecitabine', 'Capecitabine', 'Antimetabolite', 'Oncology - Antimetabolites',
   '1250mg/m2 PO twice daily x14d, then 7d rest (cycles)', '', 'CBC, LFTs, renal, hand-foot syndrome monitoring',
   'Oral prodrug of 5-FU. Hand-foot syndrome (palmar-plantar erythrodysesthesia).', ['Xeloda', 'Capecitabine', 'Capcitab']],
  ['new-193', 'Gemcitabine', 'Gemcitabine HCl', 'Antimetabolite', 'Oncology - Antimetabolites',
   '1000-1250mg/m2 IV weekly x7w then 1w rest', '', 'CBC (myelosuppression), LFTs, renal, pulmonary', 'Pyrimidine analogue. Pancreatic cancer standard. Infusion time affects efficacy.',
   ['Gemzar', 'Gemcitabine', 'Gempower']],
  ['new-194', 'Fluorouracil', 'Fluorouracil (5-FU)', 'Antimetabolite', 'Oncology - Antimetabolites',
   '400-600mg/m2 IV push (various regimens)', '', 'CBC, LFTs, mucositis, hand-foot', 'Antimetabolite. DPD deficiency risk - can cause fatal toxicity.',
   ['Adrucil', '5-FU', 'Efudex (topical)']],
  ['new-195', 'Cisplatin', 'Cisplatin', 'Platinum', 'Oncology - Platinums',
   '50-100mg/m2 IV every 3-4 weeks', '', 'Renal function (pre/post hydration), CBC, electrolytes (Mg, K), audiometry',
   'Nephrotoxic - aggressive hydration required. Highly emetogenic. Peripheral neuropathy.', ['Platinol', 'Cisplatin', 'Cisplatine']],
  ['new-196', 'Carboplatin', 'Carboplatin', 'Platinum', 'Oncology - Platinums',
   'AUC 4-6 IV every 3-4 weeks (Calvert formula)', '', 'CBC (thrombocytopenia dose-limiting), renal function', 'Less nephrotoxic than cisplatin but more myelosuppressive. Dose by AUC.',
   ['Paraplatin', 'Carboplatin', 'Carbotin']],
  ['new-197', 'Oxaliplatin', 'Oxaliplatin', 'Platinum', 'Oncology - Platinums',
   '85-130mg/m2 IV every 2-3 weeks', '', 'CBC, LFTs, acute neuropathy (cold-triggered), chronic neuropathy', 'Cold-triggered dysesthesia. Chronic neuropathy dose-limiting. FOLFOX regimen.',
   ['Eloxatin', 'Oxaliplatin', 'Oxalip']],
  ['new-198', 'Vincristine', 'Vincristine sulfate', 'Vinca alkaloid', 'Oncology - Vinca Alkaloids',
   '1.4mg/m2 IV push (weekly, max 2mg/dose)', '', 'CBC, LFTs, neuro exam (peripheral neuropathy)', 'FATAL if given intrathecally. Vinca only IV. Dose-limiting peripheral neuropathy.',
   ['Oncovin', 'Vincristine', 'Vincristin']],
  ['new-199', 'Vinblastine', 'Vinblastine sulfate', 'Vinca alkaloid', 'Oncology - Vinca Alkaloids',
   '6mg/m2 IV push (weekly, titrate to WBC)', '', 'CBC (myelosuppression dose-limiting), LFTs', 'Myelosuppression dose-limiting (esp WBC). Used in Hodgkin lymphoma.',
   ['Velban', 'Vinblastine']],
  ['new-200', 'Etoposide', 'Etoposide', 'Topoisomerase inhibitor', 'Oncology - Topoisomerase II Inhibitors',
   '50-100mg/m2 IV daily x5 days; 100-200mg PO daily x5 days (cycles)', '', 'CBC (myelosuppression), LFTs, renal, BP (hypotension during IV)', 'Topo II inhibitor. PO bioavailability variable. Hypotension with IV infusion.',
   ['Vepesid', 'Etoposide', 'Etopos']],
  ['new-201', 'Letrozole', 'Letrozole', 'Aromatase inhibitor', 'Oncology - Aromatase Inhibitors',
   '2.5mg PO once daily', '', 'Bone density (osteoporosis), lipids, LFTs', 'Aromatase inhibitor - postmenopausal breast cancer. Joint pain common. Better than tamoxifen.',
   ['Femara', 'Letrozole', 'Letro']],
  ['new-202', 'Anastrozole', 'Anastrozole', 'Aromatase inhibitor', 'Oncology - Aromatase Inhibitors',
   '1mg PO once daily', '', 'Bone density, lipids, LFTs', 'Aromatase inhibitor. Postmenopausal breast cancer.',
   ['Arimidex', 'Anastrozole', 'Anastro']],
  ['new-203', 'Bicalutamide', 'Bicalutamide', 'Antiandrogen', 'Oncology - Antiandrogens',
   '50mg PO once daily', '', 'LFTs, bone density, glucose/lipids', 'Antiandrogen for prostate cancer. Used with GnRH agonist. Gynecomastia common.',
   ['Casodex', 'Bicalutamide', 'Bicamide']],
  ['new-204', 'Leuprolide', 'Leuprolide acetate', 'GnRH agonist', 'Oncology - GnRH Agonists',
   '3.75mg IM monthly; 22.5mg IM every 3 months; 11.25mg every 3 months', '', 'PSA, bone density, glucose, lipids, mood',
   'GnRH agonist. Initial flare then suppression. Used in prostate cancer, endometriosis.', ['Lupron', 'Leuprolide', 'Eligard']],
  ['new-205', 'Goserelin', 'Goserelin acetate', 'GnRH agonist', 'Oncology - GnRH Agonists',
   '3.6mg SC every 28 days; 10.8mg SC every 12 weeks', '', 'Bone density, glucose, lipids', 'GnRH agonist implant. Breast (premenopausal) and prostate cancer.',
   ['Zoladex', 'Goserelin']],
  ['new-206', 'Bleomycin', 'Bleomycin sulfate', 'Antibiotic (anti-tumor)', 'Oncology - Cytotoxic Antibiotics',
   '10-20 units/m2 IV/IM weekly', '', 'PFTs (pulmonary fibrosis risk - boxed), CXR, renal function (dose adjust)', 'Pulmonary fibrosis is dose-limiting. Cumulative max 400 units. Test dose for lymphoma.',
   ['Blenoxane', 'Bleomycin']],
]

// ------------------------------------------------------------------
// 6. Immunosuppressants, Rheumatology, Anthelmintics, Antidotes, Misc
// ------------------------------------------------------------------

const NEW_DRUGS_2 = [
  ['new-207', 'Mycophenolate', 'Mycophenolate mofetil/sodium', 'Immunosuppressant', 'Immunology - Immunosuppressants',
   '500-1500mg PO twice daily', '', 'CBC, LFTs, pregnancy test (teratogenic), renal function',
   'Teratogenic - strict contraception. Also for lupus nephritis. Diarrhea common.', ['CellCept', 'Myfortic', 'Mycophenolate']],
  ['new-208', 'Tacrolimus', 'Tacrolimus', 'Calcineurin', 'Immunology - Calcineurin Inhibitors',
   '0.03-0.15mg/kg PO twice daily (dose to trough level 5-20 ng/mL)', '', 'Trough level, renal function, BP, glucose, K+, Mg',
   'Narrow therapeutic index. Trough monitoring essential. Avoid grapefruit. Nephrotoxic.', ['Prograf', 'Tacrolimus', 'Advagraf']],
  ['new-209', 'Sirolimus', 'Sirolimus (rapamycin)', 'mTOR inhibitor', 'Immunology - mTOR Inhibitors',
   '2-6mg PO once daily (dose to trough level)', '', 'Trough level, lipids (cholesterol/triglycerides), LFTs, pulmonary',
   'mTOR inhibitor. Hyperlipidemia common. Monitor for pulmonary toxicity.', ['Rapamune', 'Sirolimus']],
  ['new-210', 'Leflunomide', 'Leflunomide', 'Immunosuppressant', 'Rheumatology - DMARDs',
   '100mg PO once daily x3 days loading then 10-20mg once daily', '', 'LFTs, CBC, BP, pregnancy test (teratogenic - boxed)',
   'Disease-modifying antirheumatic drug. Teratogenic. Cholestyramine washout if stopping for pregnancy.', ['Arava', 'Leflunomide', 'Lefra']],
  ['new-211', 'Allopurinol', 'Allopurinol', 'Antigout', 'Rheumatology - Antigout',
   '100-300mg PO once daily (max 800mg/day)', '', 'LFTs, renal function, uric acid', 'Xanthine oxidase inhibitor. Reduce AZA/6-MP dose by 75%. Hypersensitivity syndrome (rare).',
   ['Zyloprim', 'Allopurinol', 'Allohexal']],
  ['new-212', 'Colchicine', 'Colchicine', 'Antigout', 'Rheumatology - Antigout',
   '0.6-1.2mg PO at onset then 0.6mg 1h later (acute); 0.6mg 1-2x daily (prophylaxis)', '', 'CBC, LFTs, renal function (dose adjust)', 'Narrow therapeutic index. GI toxicity dose-limiting. Drug interactions (CYP3A4, P-gp).',
   ['Colcrys', 'Colchicine', 'Colchin']],
  ['new-213', 'Febuxostat', 'Febuxostat', 'Antigout', 'Rheumatology - Antigout',
   '40-80mg PO once daily', '', 'LFTs, uric acid, CV risk', 'Non-purine XO inhibitor. CV risk concern (CARES trial). Avoid with AZA/6-MP.',
   ['Uloric', 'Febuxostat', 'Febucare']],
  ['new-214', 'Sulfasalazine (rheum)', 'Sulfasalazine', 'Immunosuppressant', 'Rheumatology - DMARDs',
   '500mg-1g PO twice daily (enteric-coated)', '', 'CBC, LFTs, renal function, semen analysis', 'DMARD for RA. Can cause oligospermia (reversible). GI upset common.',
   ['Salazopyrin EN', 'Sulfasalazine', 'Azulfidine']],
  ['new-215', 'Hydroxychloroquine (ref)', 'Hydroxychloroquine sulfate', 'Immunosuppressant', 'Rheumatology - DMARDs',
   '200-400mg PO once daily (max 6.5mg/kg/day)', '', 'Retinal exam (annual - boxed), LFTs, CBC', 'Annual retinal screening mandatory. Takes 6-12 weeks for effect.',
   ['Plaquenil', 'Quensyl', 'HCQS']],

  // -- Anthelmintics ---------------------------------------------
  ['new-216', 'Albendazole', 'Albendazole', 'Anthelmintic', 'Anti-infectives - Anthelmintics',
   '400mg PO twice daily (most infections); dose varies by indication', '', 'LFTs (hepatotoxicity), CBC, pregnancy test (teratogenic)',
   'Broad-spectrum anthelmintic. Take with fatty meal for enhanced absorption.', ['Zentel', 'Albenza', 'Albazole']],
  ['new-217', 'Mebendazole', 'Mebendazole', 'Anthelmintic', 'Anti-infectives - Anthelmintics',
   '100mg PO twice daily x3 days (pinworm/roundworm); 500mg single dose (some)', '', 'LFTs (rare), CBC', 'Poor oral absorption. Acts locally in GI tract. Complete course.',
   ['Vermox', 'Mebendazole', 'Ovex']],
  ['new-218', 'Praziquantel', 'Praziquantel', 'Anthelmintic', 'Anti-infectives - Anthelmintics',
   '20-25mg/kg PO three times daily x1 day (schistosomiasis); varies by infection', '', 'LFTs, neurocysticercosis (with steroids)', 'DOC for schistosomiasis. Bitter taste - crush tablets in food.',
   ['Biltricide', 'Praziquantel', 'Distocide']],
  ['new-219', 'Ivermectin', 'Ivermectin', 'Anthelmintic', 'Anti-infectives - Anthelmintics',
   '150-200mcg/kg PO single dose (onchocerciasis/scabies); repeated if needed', '', 'LFTs, Mazzotti reaction (pruritus, fever, adenitis)', 'DOC for onchocerciasis, strongyloides. Mass drug administration for scabies.',
   ['Stromectol', 'Mectizan', 'Ivercid']],
  ['new-220', 'Diethylcarbamazine', 'Diethylcarbamazine citrate', 'Anthelmintic', 'Anti-infectives - Anthelmintics',
   '1-2mg/kg PO three times daily x14-21d', '', 'CBC, LFTs, Mazzotti reaction management', 'For lymphatic filariasis. Mazzotti reaction common - antihistamine/steroid premedication.',
   ['Hetrazan', 'DEC', 'Diethylcarbamazine']],
  ['new-221', 'Niclosamide', 'Niclosamide', 'Anthelmintic', 'Anti-infectives - Anthelmintics',
   '500mg PO single dose (tapeworm); 500mg twice daily x3 days (Hymenolepis)', '', 'LFTs (minimal)', 'Taenicide. Chew tablets thoroughly. Take on empty stomach.',
   ['Niclocide', 'Niclosamide', 'Yomesan']],

  // -- Antidotes -------------------------------------------------
  ['new-222', 'Naloxone', 'Naloxone HCl', 'Antidote', 'Emergency - Antidotes',
   '0.4-2mg IV/IM/IN every 2-3 min PRN (titrate to respiratory rate)', '', 'Respiratory rate, HR, BP, withdrawal symptoms',
   'Short half-life (30-60 min). Monitor for renarcotization. Use caution in dependence.', ['Narcan', 'Naloxone', 'Nyxoid']],
  ['new-223', 'Flumazenil', 'Flumazenil', 'Antidote', 'Emergency - Antidotes',
   '0.2mg IV over 30s then 0.3mg every 1min PRN (max 3mg)', '', 'Seizures (withdrawal in chronic BZD users)', 'Risk of withdrawal seizures in chronic BZD users. Short half-life.',
   ['Anexate', 'Flumazenil', 'Romazicon']],
  ['new-224', 'N-Acetylcysteine', 'Acetylcysteine (NAC)', 'Antidote', 'Emergency - Antidotes',
   '150mg/kg IV over 60min then 50mg/kg over 4h then 100mg/kg over 16h', '', 'Infusion reactions (anaphylactoid - flushing, wheezing)', 'DOC for paracetamol OD. Most effective within 8h. 3-bag protocol.',
   ['Mucomyst', 'Acetadote', 'Parvolex']],
  ['new-225', 'Activated Charcoal', 'Activated charcoal', 'Antidote', 'Emergency - Antidotes',
   '25-100g PO single dose (adult); 1g/kg (child)', '', 'Airway protection (aspiration risk)', 'Most effective within 1h of ingestion. Not for corrosive, HC, Li, Fe, alcohol.',
   ['Charcoal', 'Carbomix', 'Charcodote']],
  ['new-226', 'Atropine', 'Atropine sulfate', 'Antidote', 'Emergency - Antidotes (Organophosphate)',
   '0.5-2mg IV every 3-5 min PRN (bradycardia); 1-2mg IV every 5-10 min (OP poisoning)', '', 'HR, BP, anticholinergic side effects (dry mouth, blurry vision, urinary retention)',
   'Blocks muscarinic effects of organophosphates. In OP poisoning - large doses needed (10-20mg+).', ['Atropine', 'Atropen', 'Isopto Atropine']],
  ['new-227', 'Pralidoxime', 'Pralidoxime chloride (2-PAM)', 'Antidote', 'Emergency - Antidotes (Organophosphate)',
   '1-2g IV over 15-30 min, then 500mg/h infusion (OP poisoning)', '', 'BP (hypertension), HR, muscle strength', 'Reactivates cholinesterase. Most effective within 24h. Used with atropine for OP poisoning.',
   ['Protopam', '2-PAM', 'Pralidoxime']],

  // -- Local Anaesthetics ---------------------------------------
  ['new-228', 'Lidocaine', 'Lidocaine HCl', 'Local anaesthetic', 'Anaesthetics - Local',
   '1-5mg/kg (max 300mg plain; 500mg with epi) local infiltration; 1-1.5mg/kg IV bolus (arrhythmia)', '',
   'ECG (arrhythmia treatment), CNS toxicity signs', 'Amide LA. Also class Ib antiarrhythmic. Lipid emulsion for LAST.',
   ['Xylocaine', 'Lidocaine', 'Lignocaine']],
  ['new-229', 'Bupivacaine', 'Bupivacaine HCl', 'Local anaesthetic', 'Anaesthetics - Local',
   'Up to 2mg/kg (max 175mg) local/regional', '', 'ECG, CNS toxicity, motor block level',
   'Long-acting amide LA. Cardiotoxicity more significant than lidocaine. Levobupivacaine safer.', ['Marcaine', 'Sensorcaine', 'Bupivacaine']],

  // -- General Anaesthetics -------------------------------------
  ['new-230', 'Propofol', 'Propofol', 'General anaesthetic', 'Anaesthetics - General',
   '1-2mg/kg IV bolus (induction); 25-75mcg/kg/min IV infusion (maintenance)', '', 'BP, RR, HR, depth of anaesthesia',
   'Rapid onset/offset. Pain on injection. Contains egg lecithin - use caution with egg allergy.', ['Diprivan', 'Propofol', 'Fresofol']],
  ['new-231', 'Ketamine', 'Ketamine HCl', 'General anaesthetic', 'Anaesthetics - General',
   '1-2mg/kg IV (induction); 0.5mg/kg IV (maintenance); 4-5mg/kg IM', '', 'HR, BP (increases), emergence reactions',
   'NMDA antagonist. Dissociative anaesthesia with analgesia. Preserves respiratory drive.', ['Ketalar', 'Ketamine', 'Ketanest']],
  ['new-232', 'Sevoflurane', 'Sevoflurane', 'General anaesthetic', 'Anaesthetics - General (Inhaled)',
   '0.5-4% inhaled (titrated to effect)', '', 'HR, BP, RR, end-tidal gas monitoring', 'Sweet-smelling inhaled anaesthetic. Preferred for inhalation induction (children). Low pungency.',
   ['Sevorane', 'Sevoflurane', 'Ultane']],
  ['new-233', 'Suxamethonium', 'Suxamethonium (succinylcholine)', 'Muscle relaxant (Depolarizing)', 'Anaesthetics - Muscle Relaxants',
   '0.5-1.5mg/kg IV (intubation dose)', '', 'HR (bradycardia), K+ (hyperkalemia risk), masseter spasm',
   'Depolarizing NMBD. Short duration (5-10 min). Hyperkalemia risk in burns, trauma, neuromuscular disease.', ['Scoline', 'Suxamethonium', 'Anectine']],
  ['new-234', 'Rocuronium', 'Rocuronium bromide', 'Muscle relaxant (Non-depolarizing)', 'Anaesthetics - Muscle Relaxants',
   '0.6-1.2mg/kg IV (intubation dose); 0.1-0.2mg/kg IV maintenance', '', 'HR (mild vagolytic), depth of block monitor',
   'Non-depolarizing NMBD. Rapid onset (60-90s). Reversed with sugammadex.', ['Zemuron', 'Rocuronium', 'Esmeron']],
  ['new-235', 'Neostigmine', 'Neostigmine methylsulfate', 'Antidote', 'Anaesthetics - Reversal Agents',
   '0.03-0.07mg/kg IV (given with glycopyrrolate 0.01mg/kg)', '', 'HR (bradycardia - give with anticholinergic), muscle strength',
   'Reverses non-depolarizing NMBD. Always co-administer glycopyrrolate to block muscarinic side effects.', ['Prostigmin', 'Neostigmine']],

  // -- Electrolytes, Vitamins, Nutritional -----------------------
  ['new-236', 'ORS', 'Oral rehydration salts', 'Electrolyte', 'Nutritional - Electrolytes',
   'As needed based on dehydration severity (WHO plan A/B/C)', '', 'Hydration status, electrolytes', 'WHO formulation 1L water. Continue breastfeeding. Give frequent small volumes.',
   ['WHO-ORS', 'Rehidrat', 'Pedialyte']],
  ['new-237', 'Potassium Chloride', 'Potassium chloride', 'Electrolyte', 'Nutritional - Electrolytes',
   '20-60mEq/day PO (divided); 10-40mEq/h IV (max 10mEq/h peripheral)', '', 'K+ level, ECG, renal function',
   'NEVER give IV K as undiluted bolus (fatal). Slow-K extended-release reduces GI irritation.', ['Slow-K', 'K-Dur', 'Sando-K']],
  ['new-238', 'Magnesium Sulfate', 'Magnesium sulfate', 'Electrolyte', 'Nutritional - Electrolytes',
   '4g IV over 5 min (eclampsia); 2-6g IV single dose (hypomagnesemia); 1-2g IV over 1h', '',
   'DTRs (patellar reflex), RR (respiratory rate), urine output, Mg level',
   'DOC for eclampsia/severe preeclampsia. Monitor reflexes hourly. Antidote: calcium gluconate.', ['MgSO4', 'Magnesium Sulfate', 'Epsom Salts']],
  ['new-239', 'Calcium Gluconate', 'Calcium gluconate', 'Electrolyte', 'Nutritional - Electrolytes',
   '1-2g IV over 10-20 min (hypocalcemia); 1-2g IV over 2-5 min (hyperkalemia emergency)', '',
   'Ca level, ECG, IV site (extravasation - tissue necrosis)', 'Less irritating than CaCl. Can give peripherally. Monitor IV site.',
   ['Calcium Gluconate', 'Cal-G', 'Calcijeet']],
  ['new-240', 'Sodium Bicarbonate', 'Sodium bicarbonate', 'Electrolyte', 'Nutritional - Electrolytes',
   '50-150mEq IV over 30-60 min (metabolic acidosis); 50mEq IV push (cardiac arrest, per ACLS)', '',
   'ABG, Na+, K+, Ca++ (decreased ionized Ca)', 'Check ABG before repeat dosing. Not recommended for routine CPR. Extravasation injury risk.',
   ['Sodium Bicarbonate', 'Neut', 'Bicarb']],
  ['new-241', 'Zinc Sulfate', 'Zinc sulfate', 'Vitamin', 'Nutritional - Minerals',
   '20mg PO once daily x10-14d (pediatric diarrhea); 10-30mg elemental Zn daily (deficiency)', '',
   'Zn levels, Cu levels (prolonged use)', '20mg zinc for 10-14 days reduces diarrhea duration in children. Can cause GI upset.',
   ['Zinc Sulfate', 'Zincate', 'Orazinc']],
  ['new-242', 'Vitamin A', 'Retinol (vitamin A)', 'Vitamin', 'Nutritional - Vitamins',
   '50000-200000 IU PO (measles treatment); 10000-25000 IU daily (deficiency)', '',
   'LFTs (toxicity at high dose), pregnancy (teratogenic high dose)', 'Measles: 2 doses (day 1, 2). Teratogenic in high doses in pregnancy.',
   ['Vitamin A', 'Retinol', 'Aquasol A']],
  ['new-243', 'Vitamin K', 'Phytomenadione (vitamin K1)', 'Vitamin', 'Nutritional - Vitamins',
   '1-10mg IM/IV/PO (anticoagulant reversal); 1mg IM (neonatal prophylaxis)', '', 'INR (for warfarin reversal)', 'IV can cause anaphylaxis - give slow. IM for neonatal prophylaxis.',
   ['Konakion', 'AquaMEPHYTON', 'Vitamin K1']],
  ['new-244', 'Ferrous Sulfate', 'Iron (ferrous sulfate)', 'Vitamin', 'Nutritional - Iron Supplements',
   '200-300mg PO 2-3 times daily (iron deficiency anemia)', '', 'Hb, ferritin, CBC, stool color (black - harmless)', 'Take with vitamin C for enhanced absorption. Black stools (harmless). Avoid with dairy/tea.',
   ['Ferrous Sulfate', 'Feosol', 'Slow-Fe']],
  ['new-245', 'Folic Acid', 'Folic acid', 'Vitamin', 'Nutritional - Vitamins',
   '400-1000mcg PO once daily (general); 5mg PO once daily (pregnancy, deficiency)', '', 'Hb, MCV, folate levels, B12 level (exclude B12 deficiency)', '400mcg preconception prevents neural tube defects. Check B12 before treating macrocytic anemia.',
   ['Folic Acid', 'Folvite', 'Folacin']],

  // -- More Cardiovascular ----------------------------------------
  ['new-246', 'Sacubitril/Valsartan', 'Sacubitril + Valsartan', 'ARNI', 'Cardiovascular - ARNI',
   '24/26mg PO twice daily, titrate to 49/51mg twice daily, then 97/103mg twice daily', '', 'BP, K+, renal function',
   'Neprilysin inhibitor + ARB. HFrEF reduction. Angioedema risk. Avoid with ACEi within 36h.', ['Entresto']],
  ['new-247', 'Ivabradine', 'Ivabradine HCl', 'Sinus node inhibitor', 'Cardiovascular - Heart Rate',
   '2.5-7.5mg PO twice daily (titrated to HR 50-60 bpm)', '', 'HR, ECG, visual symptoms (phosphenes)', 'Pure HR reduction. HFrEF and inappropriate sinus tachy. Avoid with verapamil/diltiazem.',
   ['Procoralan', 'Corlanor', 'Ivabrad']],
  ['new-248', 'Eplerenone', 'Eplerenone', 'Mineralocorticoid antagonist', 'Cardiovascular - MRA',
   '25-50mg PO once daily', '', 'K+, renal function (CrCl >50), BP', 'Selective MRA. HFrEF benefit (EPHESUS). Less gynecomastia than spironolactone.',
   ['Inspra', 'Eplerenone', 'Epicar']],
  ['new-249', 'Ranolazine', 'Ranolazine', 'Anti-anginal', 'Cardiovascular - Anti-anginals',
   '500-1000mg PO twice daily', '', 'ECG (QT prolongation), LFTs', 'Anti-anginal for chronic angina. QT prolongation. Metabolized by CYP3A.',
   ['Ranexa', 'Ranolazine', 'Corzona']],
  ['new-250', 'Digoxin (pure)', 'Digoxin', 'Cardiac glycoside', 'Cardiovascular - Cardiac Glycosides',
   '0.125-0.25mg PO once daily (dose to level 0.5-2 ng/mL)', '', 'Digoxin level, ECG, K+, Mg+, Ca++, renal function',
   'Narrow therapeutic index. Level monitoring essential. Toxicity: nausea, arrhythmias, visual disturbances.', ['Lanoxin', 'Digoxin', 'Cardixin']],

  // -- More CNS ---------------------------------------------------
  ['new-251', 'Pramipexole', 'Pramipexole diHCl', 'Dopamine agonist', 'CNS - Parkinsonism (DA Agonists)',
   '0.125-1.5mg PO three times daily (slow titrate), up to 4.5mg/day', '', 'CBC, LFTs, impulse control behaviors, orthostatic BP',
   'Dopamine agonist for Parkinson\'s. Risk of impulse control disorders (gambling, hypersexuality).', ['Mirapex', 'Sifrol', 'Pramipexole']],
  ['new-252', 'Ropinirole', 'Ropinirole HCl', 'Dopamine agonist', 'CNS - Parkinsonism (DA Agonists)',
   '0.25-8mg PO three times daily (slow titrate)', '', 'LFTs, impulse control behaviors, orthostatic BP',
   'Dopamine agonist. Also for restless legs syndrome. Titrate over weeks.', ['Requip', 'Ropark', 'Ropinirole']],
  ['new-253', 'Rivastigmine', 'Rivastigmine tartrate', 'Cholinesterase inhibitor', 'CNS - Alzheimer\'s',
   '1.5-6mg PO twice daily (capsules); 4.6-13.3mg/24h transdermal', '', 'LFTs, GI tolerability, HR', 'ChE inhibitor for Alzheimer\'s and Parkinson\'s dementia. Transdermal patches reduce GI side effects.',
   ['Exelon', 'Rivastigmine', 'Prometax']],
  ['new-254', 'Memantine', 'Memantine HCl', 'NMDA antagonist', 'CNS - Alzheimer\'s',
   '5-20mg PO once daily (slow titrate over weeks)', '', 'LFTs, renal function (dose adjust)', 'NMDA antagonist for moderate-severe Alzheimer\'s. Well tolerated. Can combine with donepezil.',
   ['Ebixa', 'Namenda', 'Memantine', 'Axura']],
  ['new-255', 'Gabapentin', 'Gabapentin', 'Anticonvulsant', 'CNS - Anticonvulsants (AEDs)',
   '300-600mg PO three times daily (titrate over 1-3 weeks); max 3600mg/day', '', 'LFTs, renal function (dose adjust CrCl)', 'Neuropathic pain, seizures, restless legs. Renal elimination. No significant CYP interactions.',
   ['Neurontin', 'Gabapentin', 'Gabin', 'Gabantin']],
  ['new-256', 'Pregabalin', 'Pregabalin', 'Anticonvulsant', 'CNS - Anticonvulsants (AEDs)',
   '75-300mg PO twice daily (neuropathic pain); 150-600mg daily (seizures)', '', 'LFTs, renal function, CNS depression', 'Structural analogue of GABA. Neuropathic pain, fibromyalgia, GAD, seizures. Schedule V.',
   ['Lyrica', 'Pregabalin', 'Pregaba', 'Gabex']],

  // -- Antidepressants (additional) --------------------------------
  ['new-257', 'Bupropion', 'Bupropion HCl', 'Antidepressant (NDRI)', 'CNS - Antidepressants',
   '100-300mg PO once daily (SR); 150-450mg daily (XL)', '', 'BP, HR, LFTs, seizure risk', 'NDRI antidepressant. Also smoking cessation. Seizure risk at high doses. No sexual side effects.',
   ['Wellbutrin', 'Zyban', 'Bupropion', 'Buprex']],
  ['new-258', 'Mirtazapine', 'Mirtazapine', 'Antidepressant (NaSSA)', 'CNS - Antidepressants',
   '15-45mg PO once daily at bedtime', '', 'LFTs, weight gain, CBC (neutropenia rare)', 'NaSSA. Appetite stimulation and sedation useful. Weight gain common. No sexual dysfunction.',
   ['Remeron', 'Mirtazapine', 'Mirtin', 'Axit']],
  ['new-259', 'Venlafaxine', 'Venlafaxine HCl', 'Antidepressant (SNRI)', 'CNS - Antidepressants',
   '37.5-225mg PO once daily (XR formulation)', '', 'BP (dose-dependent increase), LFTs, HR', 'SNRI. Discontinuation syndrome common - taper slowly. BP increase at higher doses.',
   ['Effexor XR', 'Venlafaxine', 'Venfax', 'Alventa']],
  ['new-260', 'Duloxetine', 'Duloxetine HCl', 'Antidepressant (SNRI)', 'CNS - Antidepressants',
   '30-120mg PO once daily', '', 'BP, LFTs (hepatotoxicity risk), HR', 'SNRI. Also for neuropathic pain, fibromyalgia, chronic MSK pain. Avoid heavy alcohol.',
   ['Cymbalta', 'Duloxetine', 'Dulox', 'Duxetin']],

  // -- Antipsychotics (additional) --------------------------------
  ['new-261', 'Aripiprazole', 'Aripiprazole', 'Antipsychotic (atypical)', 'CNS - Antipsychotics',
   '5-30mg PO once daily (range varies by indication)', '', 'LFTs, glucose, lipids, weight, EPS', 'Partial DA agonist. Lower metabolic side effect. Akathisia common. Depot available.',
   ['Abilify', 'Aripiprazole', 'Arip MT', 'Aristada']],
  ['new-262', 'Paliperidone', 'Paliperidone', 'Antipsychotic (atypical)', 'CNS - Antipsychotics',
   '3-12mg PO once daily (ER tablets)', '', 'LFTs, glucose, lipids, weight, prolactin', 'Active metabolite of risperidone. Once-daily dosing. Prolactin elevation. Depot formulation.',
   ['Invega', 'Paliperidone', 'Paliper']],

  // -- Respiratory biologics --------------------------------------
  ['new-263', 'Omalizumab', 'Omalizumab', 'Anti-IgE mAb', 'Respiratory - Biologics',
   '150-375mg SC every 2-4 weeks (dose by IgE level and weight)', '', 'CBC, IgE, injection site, anaphylaxis risk (rare)',
   'Anti-IgE for moderate-severe allergic asthma and chronic urticaria. SC injection. Refrigerate.', ['Xolair', 'Omalizumab']],
  ['new-264', 'Mepolizumab', 'Mepolizumab', 'Anti-IL5 mAb', 'Respiratory - Biologics',
   '100mg SC every 4 weeks', '', 'CBC (eosinophil count), injection site', 'Anti-IL5 for severe eosinophilic asthma. SC injection. Reduces exacerbations.',
   ['Nucala', 'Mepolizumab']],
  ['new-265', 'Benralizumab', 'Benralizumab', 'Anti-IL5R mAb', 'Respiratory - Biologics',
   '30mg SC every 4 weeks x3 then every 8 weeks', '', 'CBC (eosinophil count), injection site', 'Anti-IL5R for severe eosinophilic asthma. Depletes eosinophils. Every 8 week maintenance.',
   ['Fasenra', 'Benralizumab']],

  // -- GI (additional) --------------------------------------------
  ['new-266', 'Ursodeoxycholic Acid', 'Ursodeoxycholic acid (UDCA)', 'Bile acid', 'GI - Gallstone dissolution',
   '8-12mg/kg/day PO divided 2-3 times daily', '', 'LFTs, bilirubin, ultrasound', 'For primary biliary cholangitis (PBC). Also gallstone dissolution (non-surgical).',
   ['Ursofalk', 'Ursodiol', 'Actigall', 'UDCA']],
  ['new-267', 'Octreotide', 'Octreotide acetate', 'Somatostatin analogue', 'GI - Somatostatin Analogues',
   '50-500mcg SC/IV every 8-12h (variceal bleed); 20-40mg IM depot monthly (acromegaly/GEP NETs)', '',
   'Glucose (hypo/hyperglycemia), LFTs, gallbladder US', 'Somatostatin analogue. Variceal bleed, acromegaly, NETs, secretory diarrhea. Gallstones with long use.',
   ['Sandostatin', 'Octreotide', 'Somatostatin']],
  ['new-268', 'Rifaximin', 'Rifaximin', 'Antibiotic (non-systemic)', 'GI - Non-systemic Antibiotics',
   '200-550mg PO 2-3 times daily (indication-dependent)', '', 'LFTs, C. difficile (prolonged)', 'Non-systemic rifamycin. Traveler\'s diarrhea, IBS-D, hepatic encephalopathy, SIBO.',
   ['Xifaxan', 'Rifaximin', 'Rifacol', 'Normix']],
  ['new-269', 'Budesonide', 'Budesonide', 'Corticosteroid (topical GI)', 'GI - IBD',
   '9mg PO once daily (Crohn\'s/UC ileocecal); 3mg three times daily (Eosinophilic esophagitis)', '',
   'Symptoms, LFTs, adrenal suppression (prolonged)', 'High first-pass - low systemic bioavailability. For mild-moderate ileocecal Crohn\'s and UC.',
   ['Entocort EC', 'Budesonide', 'Uceris']],
  ['new-270', 'Mesalazine', 'Mesalazine (5-ASA)', 'Aminosalicylate', 'GI - IBD',
   '1-4g PO once daily (pH-dependent release); 1g PR daily (rectal foam/suppository)', '', 'CBC, LFTs, renal function (interstitial nephritis rare)', '5-ASA for UC and Crohn\'s colitis. Multiple formulations (Asacol, Pentasa, Mezavant). Monitor renal.',
   ['Asacol', 'Pentasa', 'Mezavant', 'Salofalk']],

  // -- Renal/Urology ----------------------------------------------
  ['new-271', 'Tamsulosin', 'Tamsulosin HCl', 'Alpha-1 blocker', 'Urology - BPH',
   '0.4mg PO once daily (30 min after same meal)', '', 'BP (orthostatic hypotension), LUTS symptom score', 'Selective alpha-1a blocker. First-line for BPH. Floppy iris syndrome during cataract surgery.',
   ['Flomax', 'Tamsulosin', 'Tamset', 'Urimax']],
  ['new-272', 'Finasteride', 'Finasteride', '5-alpha reductase inhibitor', 'Urology - BPH/Hair Loss',
   '5mg PO once daily (BPH); 1mg PO once daily (hair loss)', '', 'PSA (decreases by ~50%), LUTS symptom score', '5-ARI for BPH. Takes 6-12 months for effect. Sexual side effects. Do not handle crushed by women.',
   ['Proscar', 'Propecia', 'Finasteride', 'Finax']],
  ['new-273', 'Sildenafil', 'Sildenafil citrate', 'PDE-5 inhibitor', 'Urology - ED/PAH',
   '25-100mg PO 1h before sexual activity (ED); 20mg PO three times daily (PAH)', '', 'BP (contraindicated with nitrates), vision (rare NAION)', 'PDE-5i for ED and PAH. Do NOT use with nitrates (hypotension). Duration ~4h.',
   ['Viagra', 'Revatio', 'Sildenafil', 'Sildigra']],
  ['new-274', 'Tadalafil', 'Tadalafil', 'PDE-5 inhibitor', 'Urology - ED/BPH/PAH',
   '5-20mg PO PRN (ED up to 36h); 5mg once daily (BPH/ED); 40mg once daily (PAH)', '',
   'BP (no nitrates), vision, hearing loss', 'Long-lasting PDE-5i (36h). Daily 5mg for BPH + ED. No nitrates. Back pain/myalgia.',
   ['Cialis', 'Adcirca', 'Tadalafil', 'Tadli']],
  ['new-275', 'Mirabegron', 'Mirabegron', 'Beta-3 agonist', 'Urology - OAB',
   '25-50mg PO once daily', '', 'BP (increase), HR, LUTS symptom score', 'Beta-3 agonist for overactive bladder. Contraindicated with severe/uncontrolled HTN.',
   ['Myrbetriq', 'Mirabegron', 'Betmiga']],

  // -- Endocrine (additional) -------------------------------------
  ['new-276', 'Teriparatide', 'Teriparatide (PTH 1-34)', 'Bone formation agent', 'Endocrinology - Osteoporosis',
   '20mcg SC once daily (max lifetime 24 months)', '', 'Serum Ca (hypercalcemia risk), bone density (DXA)', 'Recombinant PTH. Anabolic for osteoporosis. Black box: osteosarcoma in rats. Max 2 years.',
   ['Forteo', 'Teriparatide', 'Forsteo']],
  ['new-277', 'Desmopressin', 'Desmopressin acetate', 'Vasopressin analogue', 'Endocrinology - Antidiuretic',
   '0.1-0.4mg PO 1-3 times daily (DI); 0.2-0.4mg PO bedtime (nocturia/NE)', '', 'Na+ (hyponatremia), urine osmolality, fluid restriction',
   'Synthetic ADH. Diabetes insipidus, nocturia, nocturnal enuresis, hemophilia A/vWD. Fluid restriction.', ['Minirin', 'DDAVP', 'Desmopressin', 'Nocturin']],
  ['new-278', 'Bromocriptine', 'Bromocriptine mesylate', 'Dopamine agonist', 'Endocrinology - Prolactin',
   '1.25-15mg PO 1-3 times daily (hyperprolactinemia); 2.5mg PO twice daily (Parkinson\'s)', '',
   'LFTs, BP (orthostatic), prolactin level', 'Ergot dopamine agonist. Hyperprolactinemia, acromegaly, Parkinson\'s. Monitor for fibrosis.',
   ['Parlodel', 'Bromocriptine', 'Cycloset']],
  ['new-279', 'Cabergoline', 'Cabergoline', 'Dopamine agonist', 'Endocrinology - Prolactin',
   '0.25-1mg PO twice weekly (hyperprolactinemia)', '', 'LFTs, pregnancy test, prolactin level, cardiac echo (fibrosis risk)', 'DOC for prolactinoma. Weekly dosing. More effective and better tolerated than bromocriptine.',
   ['Dostinex', 'Cabergoline', 'Cabaser']],
  ['new-280', 'Calcitonin', 'Salmon calcitonin', 'Antiresorptive', 'Endocrinology - Osteoporosis',
   '100-200 IU SC/IM once daily (osteoporosis); 200-400 IU intranasal daily', '',
   'Serum Ca, bone density, nasal mucosa (nasal spray)', 'Antiresorptive for osteoporosis (rarely first-line). Paget\'s disease, hypercalcemia. IM/SC/IN.',
   ['Miacalcin', 'Calcitonin', 'Fortical']],

  // -- Antidiabetics (additional) ----------------------------------
  ['new-281', 'Acarbose', 'Acarbose', 'Alpha-glucosidase inhibitor', 'Endocrinology - Antidiabetics',
   '25-100mg PO with meals (3 times daily)', '', 'LFTs, HbA1c, FBG', 'Delays carb absorption. Postprandial glucose reduction. Flatulence common.',
   ['Glucobay', 'Precose', 'Acarbose']],
  ['new-282', 'Repaglinide', 'Repaglinide', 'Meglitinide', 'Endocrinology - Antidiabetics',
   '0.5-4mg PO with each meal (up to 4x/day, skip if skipping meal)', '', 'FBG, HbA1c, LFTs', 'Rapid-acting insulin secretagogue. Take with meals - skip dose if no meal. Hypoglycemia risk.',
   ['NovoNorm', 'Prandin', 'Repaglinide']],
  ['new-283', 'Liraglutide', 'Liraglutide', 'GLP-1 agonist', 'Endocrinology - Antidiabetics',
   '0.6-1.8mg SC once daily (diabetes); 3mg SC once daily (weight loss)', '', 'HbA1c, weight, LFTs (pancreatitis), HR (slight increase)',
   'GLP-1 RA for T2DM and obesity. Daily SC injection. GI side effects. Thyroid C-cell warning.', ['Victoza', 'Saxenda', 'Liraglutide']],
  ['new-284', 'Semaglutide', 'Semaglutide', 'GLP-1 agonist', 'Endocrinology - Antidiabetics',
   '0.25-1mg SC once weekly (Ozempic); 2.4mg SC once weekly (Wegovy weight loss); 3-14mg PO daily (Rybelsus)', '',
   'HbA1c, weight, LFTs (pancreatitis), fundoscopy (retinopathy)', 'Once-weekly GLP-1 RA. Weight loss benefit. Retinopathy concern (SUSTAIN-6). GI effects.',
   ['Ozempic', 'Wegovy', 'Rybelsus', 'Semaglutide']],
  ['new-285', 'Empagliflozin', 'Empagliflozin', 'SGLT2 inhibitor', 'Endocrinology - Antidiabetics',
   '10-25mg PO once daily', '', 'HbA1c, weight, renal function, LFTs, genital mycotic infections',
   'SGLT2i for T2DM and HFpEF/HFrEF. CV and renal benefit (EMPA-REG). Euglycemic DKA risk.', ['Jardiance', 'Empagliflozin', 'Jardianz']],
  ['new-286', 'Dapagliflozin', 'Dapagliflozin', 'SGLT2 inhibitor', 'Endocrinology - Antidiabetics',
   '5-10mg PO once daily', '', 'HbA1c, weight, renal function, LFTs', 'SGLT2i for T2DM, HFrEF, CKD (DAPA-HF, DAPA-CKD). Fournier\'s gangrene alert.',
   ['Farxiga', 'Dapagliflozin', 'Dapaglu']],
  ['new-287', 'Canagliflozin', 'Canagliflozin', 'SGLT2 inhibitor', 'Endocrinology - Antidiabetics',
   '100-300mg PO once daily before first meal', '', 'HbA1c, weight, renal function, LFTs, amputations (monitor)', 'SGLT2i. CANVAS: amputations (monitor feet). CV benefit. Euglycemic DKA.',
   ['Invokana', 'Canagliflozin', 'Canas']],

  // -- Oncology (targeted) ----------------------------------------
  ['new-288', 'Imatinib', 'Imatinib mesylate', 'Tyrosine kinase inhibitor', 'Oncology - TKIs',
   '100-600mg PO once daily (indication-dependent)', '', 'CBC, LFTs, ECG (QT), thyroid, weight', 'BCR-ABL TKI for CML, Ph+ ALL, GIST. Fluid retention. CYP3A4 substrate.',
   ['Gleevec', 'Glivec', 'Imatinib', 'Imatib']],
  ['new-289', 'Dasatinib', 'Dasatinib monohydrate', 'Tyrosine kinase inhibitor', 'Oncology - TKIs',
   '100-140mg PO once daily (CML); 70mg twice daily (Ph+ ALL)', '', 'CBC, LFTs, ECG (QT), pleural effusion', '2nd gen BCR-ABL TKI. Effective for most imatinib-resistant mutations. Pleural effusion common.',
   ['Sprycel', 'Dasatinib', 'Dasanix']],
  ['new-290', 'Nilotinib', 'Nilotinib HCl monohydrate', 'Tyrosine kinase inhibitor', 'Oncology - TKIs',
   '300-400mg PO twice daily on empty stomach', '', 'CBC, LFTs, ECG (QT - boxed), lipids, glucose, pancreatic enzymes',
   '2nd gen BCR-ABL TKI. QT prolongation (boxed). Take on empty stomach - no food 2h before/1h after.', ['Tasigna', 'Nilotinib', 'Nilox']],
  ['new-291', 'Sorafenib', 'Sorafenib tosylate', 'Multikinase inhibitor', 'Oncology - TKIs',
   '400mg PO twice daily on empty stomach', '', 'BP (HTN), LFTs, CBC, electrolytes, hand-foot skin reaction',
   'Multikinase TKI (VEGFR, PDGFR, Raf). HCC and RCC. Hand-foot skin reaction. Diarrhea common.', ['Nexavar', 'Sorafenib', 'Soranib']],
  ['new-292', 'Sunitinib', 'Sunitinib malate', 'Multikinase inhibitor', 'Oncology - TKIs',
   '50mg PO once daily x4 weeks on, 2 weeks off', '', 'BP (HTN), LFTs, CBC, electrolytes, thyroid, LVEJ', 'Multikinase TKI (VEGFR, PDGFR, KIT). RCC, GIST, pNET. Yellow skin discoloration.',
   ['Sutent', 'Sunitinib', 'Sunitix']],
  ['new-293', 'Anastrozole (onc)', 'Anastrozole', 'Aromatase inhibitor', 'Oncology - Endocrine Therapy',
   '1mg PO once daily', '', 'Bone density (DXA), lipids, LFTs, joint symptoms', 'Aromatase inhibitor for postmenopausal breast cancer. Joint stiffness common. Fracture risk.',
   ['Arimidex', 'Anastrozole', 'Anastrol']],

  // -- Biologics (Rheumatology/Immunology) ------------------------
  ['new-294', 'Adalimumab', 'Adalimumab', 'TNF-alpha inhibitor (mAb)', 'Rheumatology - Biologics',
   '40mg SC every 2 weeks', '', 'TB screen (before start), LFTs, CBC, injection site', 'TNFi for RA, PsA, AS, IBD, HS, uveitis, psoriasis. SC injection. TB reactivation risk.',
   ['Humira', 'Adalimumab', 'Amgevita', 'Hyrimoz']],
  ['new-295', 'Infliximab', 'Infliximab', 'TNF-alpha inhibitor (chimeric mAb)', 'Rheumatology - Biologics',
   '3-10mg/kg IV at 0, 2, 6 weeks then every 8 weeks', '', 'TB screen (before start), LFTs, CBC, infusion reactions',
   'Chimeric TNFi. IV infusion. Crohn\'s, UC, RA, PsA, AS. Infusion reactions. TB screening required.', ['Remicade', 'Inflectra', 'Remsima', 'Flixabi']],
  ['new-296', 'Etanercept', 'Etanercept', 'TNF-alpha inhibitor (fusion protein)', 'Rheumatology - Biologics',
   '25mg SC twice weekly or 50mg SC once weekly', '', 'TB screen (before start), CBC, LFTs, injection site',
   'TNFi fusion protein. RA, PsA, AS, psoriasis. SC injection. Lower risk of TB than mAbs.', ['Enbrel', 'Etanercept', 'Benepali', 'Erelzi']],
  ['new-297', 'Tocilizumab', 'Tocilizumab', 'Anti-IL6 receptor (mAb)', 'Rheumatology - Biologics',
   '162mg SC weekly; 4-8mg/kg IV every 4 weeks (max 800mg)', '', 'LFTs, CBC (neutropenia), lipids, TB screen',
   'IL-6R inhibitor for RA, GCA, cytokine release syndrome. Monitor LFTs, lipids, neutropenia.', ['Actemra', 'RoActemra', 'Tocilizumab']],
  ['new-298', 'Secukinumab', 'Secukinumab', 'Anti-IL17A (mAb)', 'Rheumatology - Biologics',
   '150-300mg SC weekly x4 then monthly', '', 'TB screen, CBC, LFTs, injection site', 'IL-17A inhibitor for psoriasis, PsA, AS. SC injection. IBD exacerbation (caution).',
   ['Cosentyx', 'Secukinumab']],
  ['new-299', 'Ustekinumab', 'Ustekinumab', 'Anti-IL12/23 (mAb)', 'Rheumatology - Biologics',
   '45-90mg SC (or IV for Crohn\'s) at week 0, 4, then every 12 weeks', '', 'TB screen, LFTs, CBC, injection site',
   'IL-12/23 inhibitor for psoriasis, PsA, Crohn\'s. SC injection every 12 weeks maintenance.', ['Stelara', 'Ustekinumab']],
  ['new-300', 'Rituximab', 'Rituximab', 'Anti-CD20 (chimeric mAb)', 'Oncology/Rheumatology - Biologics',
   '375mg/m2 IV weekly x4 (RA: 1000mg IV day 1, 15)', '', 'CBC, LFTs, HBV/HCV screen, infusion reactions, PML (rare)',
   'CD20 B-cell depleter. NHL, CLL, RA, vasculitis, pemphigus. Infusion reactions. HBV reactivation.', ['Rituxan', 'MabThera', 'Rituximab', 'Truxima']],
  ['new-301', 'Trastuzumab', 'Trastuzumab', 'Anti-HER2 (mAb)', 'Oncology - Targeted Therapy',
   '4mg/kg IV loading then 2mg/kg weekly; or 8mg/kg loading then 6mg/kg every 3 weeks', '',
   'LVEJ/echo (cardiotoxicity - boxed), CBC, LFTs', 'HER2+ breast and gastric cancer. Cardiotoxicity (LVEF monitoring). SC formulation available.',
   ['Herceptin', 'Trastuzumab', 'Kanjinti', 'Ogivri']],
  ['new-302', 'Bevacizumab', 'Bevacizumab', 'Anti-VEGF (mAb)', 'Oncology - Targeted Therapy',
   '5-15mg/kg IV every 2-3 weeks (indication-dependent)', '', 'BP (HTN), urine protein, bleeding, wound healing', 'Anti-VEGF for multiple cancers (CRC, NSCLC, RCC, etc.). HTN, proteinuria, bleeding risk.',
   ['Avastin', 'Bevacizumab', 'Mvasi', 'Zirabev']],
  ['new-303', 'Pembrolizumab', 'Pembrolizumab', 'Anti-PD1 (mAb)', 'Oncology - Immunotherapy',
   '200mg IV every 3 weeks or 400mg every 6 weeks', '', 'LFTs, thyroid, cortisol, skin, pulmonary (pneumonitis), colitis', 'PD-1 checkpoint inhibitor. Multiple cancers. Immune-related AEs (pneumonitis, colitis, hepatitis).',
   ['Keytruda', 'Pembrolizumab']],
  ['new-304', 'Nivolumab', 'Nivolumab', 'Anti-PD1 (mAb)', 'Oncology - Immunotherapy',
   '240mg IV every 2 weeks or 480mg every 4 weeks', '', 'LFTs, thyroid, cortisol, skin, pulmonary, renal', 'PD-1 checkpoint inhibitor. Melanoma, NSCLC, RCC, Hodgkin\'s. irAEs management important.',
   ['Opdivo', 'Nivolumab']],

  // -- Immunomodulators (additional) ------------------------------
  ['new-305', 'Lenalidomide', 'Lenalidomide', 'Immunomodulator (IMiD)', 'Oncology - Immunomodulators',
   '5-25mg PO once daily x21 days every 28 days', '', 'CBC (myelosuppression), LFTs, thyroid, pregnancy (teratogenic - REMS)',
   'IMiD for multiple myeloma, MDS, mantle cell. Teratogenic - strict contraception. Thrombosis prophylaxis.', ['Revlimid', 'Lenalidomide', 'Lenlide']],
  ['new-306', 'Bortezomib', 'Bortezomib', 'Proteasome inhibitor', 'Oncology - Proteasome Inhibitors',
   '1.3mg/m2 SC/IV on days 1, 4, 8, 11 (21-day cycles)', '', 'CBC, LFTs, peripheral neuropathy, cardiac function',
   'Proteasome inhibitor for multiple myeloma, mantle cell. Peripheral neuropathy common. SC preferred.', ['Velcade', 'Bortezomib', 'Bortecad']],
  ['new-307', 'Thalidomide', 'Thalidomide', 'Immunomodulator (IMiD)', 'Oncology - Immunomodulators',
   '100-400mg PO once daily (dose varies by indication)', '', 'CBC, LFTs, pregnancy test (boxed - teratogenic), nerve conduction',
   'IMiD for multiple myeloma, ENL. Boxed: severe teratogen. Neuropathy common. Strict REMS.', ['Thalomid', 'Thalidomide', 'Talidex']],

  // -- Anti-infectives (additional) --------------------------------
  ['new-308', 'Daptomycin', 'Daptomycin', 'Lipopeptide antibiotic', 'Anti-infectives - Lipopeptides',
   '4-6mg/kg IV once daily (skin); 6-10mg/kg IV once daily (bacteremia/endocarditis)', '',
   'CK (muscle toxicity - weekly), CBC, LFTs', 'MRSA, VRE. Inactivated by surfactant (not for pneumonia). Monitor CK weekly.',
   ['Cubicin', 'Daptomycin', 'Dapcin']],
  ['new-309', 'Tigecycline', 'Tigecycline', 'Glycylcycline', 'Anti-infectives - Glycylcyclines',
   '100mg IV loading then 50mg IV every 12h', '', 'LFTs, CBC, LFTs (all-cause mortality warning)', 'Broad-spectrum including MDR. Boxed: all-cause mortality increase. Not for HAP/VAP.',
   ['Tygacil', 'Tigecycline', 'Tigecin']],
  ['new-310', 'Colistin', 'Colistimethate sodium (polymyxin E)', 'Polymyxin', 'Anti-infectives - Polymyxins',
   '2.5-5mg/kg IV divided (dose by CBA), 12hly; adjust for renal', '', 'Renal function (nephrotoxicity), K+, Na+, neurologic toxicity',
   'Last-resort for MDR Gram-negative. Nephrotoxicity and neurotoxicity. CBA dosing.', ['Coly-Mycin M', 'Colistin', 'Colomycin']],
  ['new-311', 'Fidaxomicin', 'Fidaxomicin', 'Macrolide (non-systemic)', 'Anti-infectives - C. difficile',
   '200mg PO twice daily x10 days', '', 'Stool frequency, consistency, C. difficile testing', 'DOC for C. difficile (narrow spectrum, less recurrence). Minimal systemic absorption.',
   ['Dificid', 'Fidaxomicin', 'Fidaxo']],
  ['new-312', 'Terbinafine', 'Terbinafine HCl', 'Antifungal (allylamine)', 'Anti-infectives - Antifungals (Allylamines)',
   '250mg PO once daily x2-6 weeks (dermatophyte onychomycosis)', '', 'LFTs (hepatotoxicity risk), CBC, taste disturbance',
   'DOC for dermatophyte onychomycosis. Terbinafine resistance emerging. Hepatotoxicity (rare).', ['Lamisil', 'Terbinafine', 'Terbinor', 'Fungifin']],
  ['new-313', 'Griseofulvin', 'Griseofulvin microsize', 'Antifungal', 'Anti-infectives - Antifungals',
   '500mg-1g PO once daily (microsize) with fatty meal', '', 'LFTs, CBC, pregnancy test (teratogenic)', 'Deposits in keratin. Tinea capitis (DOC in children). Teratogenic. CYP inducer.',
   ['Gris-PEG', 'Fulvicin', 'Griseofulvin', 'Grisovin']],
  ['new-314', 'Nitazoxanide', 'Nitazoxanide', 'Antiprotozoal', 'Anti-infectives - Antiprotozoals',
   '500mg PO twice daily x3 days (most indications)', '', 'LFTs, CBC', 'Cryptosporidium, Giardia. Broad-spectrum antiprotozoal. Take with food.',
   ['Alinia', 'Nitazoxanide', 'NTZ']],
  ['new-315', 'Miltefosine', 'Miltefosine', 'Antiprotozoal', 'Anti-infectives - Antiprotozoals',
   '50-150mg PO divided daily x28 days (dose by weight)', '', 'LFTs, renal, CBC, pregnancy test (teratogenic)', 'DOC for cutaneous and visceral leishmaniasis. Teratogenic. GI side effects common.',
   ['Impavido', 'Miltefosine', 'Miltex']],

  // -- Drugs for substance use disorders --------------------------
  ['new-316', 'Methadone', 'Methadone HCl', 'Opioid agonist', 'Psychiatry - Opioid Dependence',
   '10-40mg PO daily (initial OAT); titrate by 5-10mg weekly based on withdrawal', '',
   'ECG (QT prolongation), respiratory rate, urine drug screen', 'Full mu agonist for OUD. QT prolongation (dose-dependent). Long half-life (24-36h).',
   ['Methadone', 'Methadose', 'Dolophine']],
  ['new-317', 'Buprenorphine', 'Buprenorphine HCl', 'Opioid partial agonist', 'Psychiatry - Opioid Dependence',
   '4-24mg SL once daily (OAT induction/maintenance)', '', 'LFTs, urine drug screen, respiratory rate (ceiling effect)',
   'Partial mu agonist for OUD. Ceiling effect reduces OD risk. Combined with naloxone (Suboxone).', ['Suboxone', 'Subutex', 'Buprenorphine', 'Buvidal']],
  ['new-318', 'Naltrexone', 'Naltrexone HCl', 'Opioid antagonist', 'Psychiatry - Alcohol/Opioid Dependence',
   '50mg PO once daily (alcohol/opioid dependence); 380mg IM monthly (Vivitrol)', '', 'LFTs (hepatotoxicity), urine drug screen',
   'Mu antagonist for alcohol and opioid dependence. Requires opioid-free period (7-14d).', ['ReVia', 'Vivitrol', 'Naltrexone', 'Naltrel']],
  ['new-319', 'Disulfiram', 'Disulfiram', 'Aldehyde dehydrogenase inhibitor', 'Psychiatry - Alcohol Dependence',
   '125-500mg PO once daily', '', 'LFTs, alcohol abstinence (severe reaction with EtOH)', 'Aversive therapy for alcohol dependence. Severe reaction with EtOH (flushing, vomiting, hypotension).',
   ['Antabuse', 'Disulfiram', 'Esperal']],
  ['new-320', 'Acamprosate', 'Acamprosate calcium', 'NMDA modulator', 'Psychiatry - Alcohol Dependence',
   '666mg PO three times daily', '', 'LFTs, renal function (dose adjust), alcohol craving', 'Reduces alcohol craving. Maintains abstinence. Caution in renal impairment.',
   ['Campral', 'Acamprosate', 'Aotal']],

  // -- Vitamins & supplements (additional) ------------------------
  ['new-321', 'Vitamin B12', 'Cyanocobalamin (vitamin B12)', 'Vitamin', 'Nutritional - Vitamins',
   '1000-2000mcg PO once daily (maintenance); 1000mcg IM monthly (deficiency/pernicious anemia)', '',
   'Hb, MCV, B12 level, reticulocyte count', 'IM for pernicious anemia, PO for maintenance. Check folate/B12 before treating anemia.',
   ['Vitamin B12', 'Cyanocobalamin', 'Neurobion', 'Bedoc']],
  ['new-322', 'Vitamin C', 'Ascorbic acid (vitamin C)', 'Vitamin', 'Nutritional - Vitamins',
   '200-1000mg PO once daily (general); 1-3g IV (deficiency/post-op/scurvy)', '', 'None significant at standard doses (high dose: renal, GI)',
   'Water-soluble antioxidant. Scurvy prevention/treatment. Enhances iron absorption. High dose may cause diarrhea.',
   ['Vitamin C', 'Ascorbic Acid', 'Celin', 'Redoxon']],
  ['new-323', 'Vitamin D3', 'Cholecalciferol (vitamin D3)', 'Vitamin', 'Nutritional - Vitamins',
   '400-2000 IU PO once daily (maintenance); 50000 IU PO weekly x8 weeks (deficiency)', '',
   '25-OH D level, Ca, PO4, ALP', 'Bone health, immune function. Deficiency common. Toxicity risk with very high doses.',
   ['Vitamin D3', 'Cholecalciferol', 'D-Cure', 'Ostelin']],
  ['new-324', 'Pyridoxine', 'Pyridoxine (vitamin B6)', 'Vitamin', 'Nutritional - Vitamins',
   '25-100mg PO once daily (general); 25mg/kg IV with isoniazid OD', '', 'None at standard doses (neuropathy with chronic high dose)', 'ISONIAZID OD: 1g IV pyridoxine per 1g INH ingested. Also for morning sickness.',
   ['Vitamin B6', 'Pyridoxine', 'Hexobion']],

  // -- Antiviral (additional - more HIV/HBV) ----------------------
  ['new-325', 'Tenofovir Disoproxil', 'Tenofovir disoproxil fumarate (TDF)', 'NtRTI', 'Anti-infectives - Antivirals (HIV/HBV)',
   '300mg PO once daily (with food)', '', 'Renal function (CrCl, urine protein, phosphate), bone density, HIV/HBV viral load',
   'Nucleotide RTI. HIV and HBV. Renal toxicity (proximal tubulopathy). Bone loss. Always with food.', ['Viread', 'Tenofovir', 'Tenolam']],
  ['new-326', 'Tenofovir Alafenamide', 'Tenofovir alafenamide (TAF)', 'NtRTI', 'Anti-infectives - Antivirals (HIV/HBV)',
   '25mg PO once daily (HIV); 25mg PO once daily (HBV)', '', 'Renal function, LFTs, lipids (higher than TDF), viral load',
   'Newer TDF prodrug. Better renal and bone profile. Higher lipid effects. Component in Descovy, Genvoya.', ['Descovy', 'Vemlidy', 'TAF']],
  ['new-327', 'Dolutegravir', 'Dolutegravir sodium', 'Integrase inhibitor (INSTI)', 'Anti-infectives - Antivirals (HIV)',
   '50mg PO once daily (treatment-naive) or twice daily (with certain NNRTIs/boosted PIs)', '',
   'LFTs, renal function, HIV viral load, CD4, psychiatric symptoms', 'DOC for first-line HIV (INSTI). High barrier to resistance. Neural tube defects warning (periconceptional).',
   ['Tivicay', 'Dolutegravir', 'Dolutegra']],
  ['new-328', 'Raltegravir', 'Raltegravir potassium', 'Integrase inhibitor (INSTI)', 'Anti-infectives - Antivirals (HIV)',
   '400mg PO twice daily', '', 'LFTs, CK, renal function, HIV viral load, CD4', 'First INSTI approved. Twice daily dosing. Well tolerated. Low drug interaction profile.',
   ['Isentress', 'Raltegravir', 'Raltegrid']],
  ['new-329', 'Efavirenz', 'Efavirenz', 'NNRTI', 'Anti-infectives - Antivirals (HIV)',
   '600mg PO once daily (take on empty stomach at bedtime)', '', 'LFTs, HIV viral load, CD4, lipids, CNS side effects',
   'NNRTI. CNS side effects (vivid dreams, dizziness) often resolve in 2-4 weeks. Teratogenic.', ['Sustiva', 'Efavirenz', 'Stocrin']],

  // -- Antimalarials (additional) ---------------------------------
  ['new-330', 'Quinine', 'Quinine sulfate', 'Antimalarial', 'Anti-infectives - Antimalarials',
   '600-650mg PO three times daily x7 days (uncomplicated malaria; with doxycycline/clindamycin)', '',
   'CBC (hemolysis in G6PD), LFTs, glucose (hypoglycemia), ECG (QT)', 'DOC for severe malaria (IV) and uncomplicated (PO + combo). Cinchonism. G6PD caution.',
   ['Quinine Sulfate', 'Quinin', 'Quina']],
  ['new-331', 'Primaquine', 'Primaquine phosphate', 'Antimalarial', 'Anti-infectives - Antimalarials',
   '30mg PO once daily x14 days (P. vivax hypnozoite eradication)', '',
   'G6PD screening (boxed - hemolytic anemia), Hb, reticulocyte count', 'Hypnozoite eradication in P. vivax/ovale. G6PD deficiency - contraindicated (hemolysis).',
   ['Primaquine', 'Primaquin', 'Prima']],
  ['new-332', 'Proguanil', 'Proguanil HCl', 'Antimalarial', 'Anti-infectives - Antimalarials',
   '100mg PO once daily (prophylaxis; with atovaquone as Malarone)', '', 'LFTs, CBC, malaria prophylaxis compliance',
   'Component of atovaquone-proguanil (Malarone). Prophylaxis and treatment. Well tolerated.', ['Malarone', 'Proguanil', 'Paludrine']],

  // -- Antituberculars (additional) --------------------------------
  ['new-333', 'Bedaquiline', 'Bedaquiline fumarate', 'Antimycobacterial', 'Anti-infectives - Antituberculars (MDR-TB)',
   '400mg PO once daily x2 weeks then 200mg three times weekly x22 weeks', '',
   'ECG (QT - boxed), LFTs, treatment adherence', 'For MDR-TB. ATP synthase inhibitor. QT prolongation (boxed). WHO essential.',
   ['Sirturo', 'Bedaquiline']],
  ['new-334', 'Delamanid', 'Delamanid', 'Antimycobacterial', 'Anti-infectives - Antituberculars (MDR-TB)',
   '100mg PO twice daily x24 weeks', '', 'ECG (QT), LFTs, treatment adherence', 'For MDR-TB. Nitro-dihydro-imidazooxazole derivative. QT prolongation.',
   ['Deltyba', 'Delamanid']],
  ['new-335', 'Linezolid (TB)', 'Linezolid', 'Oxazolidinone', 'Anti-infectives - Antituberculars (MDR-TB)',
   '600mg PO/IV once daily (MDR-TB dosing - may be lower than standard)', '',
   'CBC (myelosuppression - weekly), LFTs, vision/neuropathy (with long-term use)', 'Also used in MDR-TB (longer courses). Myelosuppression and neuropathy with prolonged use.',
   ['Zyvoxid', 'Linezolid', 'Linospan']],

  // -- Chemotherapy (additional) ----------------------------------
  ['new-336', 'Carboplatin', 'Carboplatin', 'Platinum agent', 'Oncology - Platinum Agents',
   'AUC 5-6 IV every 3-4 weeks (Calvert formula dosing)', '', 'CBC (myelosuppression - platelets), renal function, LFTs',
   'Second-gen platinum. Less nephro/neurotoxic than cisplatin. Calvert formula dosing (AUC).', ['Paraplatin', 'Carboplatin', 'Carbotec']],
  ['new-337', 'Oxaliplatin', 'Oxaliplatin', 'Platinum agent', 'Oncology - Platinum Agents',
   '85mg/m2 IV every 2 weeks (FOLFOX); 130mg/m2 every 3 weeks', '', 'CBC, LFTs, neurologic exam (peripheral neuropathy - cold-triggered)',
   'Third-gen platinum for CRC. Cold-induced peripheral neuropathy. No significant nephrotoxicity.', ['Eloxatin', 'Oxaliplatin', 'Oxalip']],
  ['new-338', 'Doxorubicin', 'Doxorubicin HCl', 'Anthracycline', 'Oncology - Anthracyclines',
   '45-75mg/m2 IV every 3 weeks (max cumulative 450-550mg/m2)', '',
   'LVEJ/echo (cardiotoxicity - boxed), CBC (myelosuppression), LFTs', 'Anthracycline. Boxed: cardiotoxicity (cumulative). Extravasation - vesicant. Urine turns red.',
   ['Adriamycin', 'Doxorubicin', 'Rubex', 'Caelyx (liposomal)']],
  ['new-339', 'Cyclophosphamide (onc)', 'Cyclophosphamide', 'Alkylating agent', 'Oncology - Alkylating Agents',
   '400-1000mg/m2 IV every 2-4 weeks (dose varies)', '', 'CBC (myelosuppression), urinalysis (hemorrhagic cystitis), LFTs',
   'Alkylating agent. Boxed: hemorrhagic cystitis (mesna prophylaxis), myelosuppression, malignancy risk.', ['Cytoxan', 'Endoxan', 'Cyclophosphamide']],
  ['new-340', 'Methotrexate (onc)', 'Methotrexate sodium', 'Antimetabolite', 'Oncology - Antimetabolites',
   '20-40mg/m2 IV/IM weekly (breast/leukemia/Lymphoma); high-dose protocols', '',
   'CBC (myelosuppression), LFTs, renal, mucositis, pleural effusion (leucovorin rescue)',
   'DHFR inhibitor. High-dose requires leucovorin rescue. Hepatotoxicity. Boxed: for onc use.',    ['Trexall', 'Methotrexate', 'MTX', 'Metoject']],

  // -- Vitamins/Nutrition (additional) ----------------------------
  ['new-341', 'Thiamine (supp)', 'Thiamine (vitamin B1)', 'Vitamin', 'Nutritional - Vitamins',
   '100mg PO once daily (general); 500mg IV three times daily x3-5d (Wernicke)', '',
   'CBC, electrolytes (re-feeding syndrome)', 'Wernicke-Korsakoff: give BEFORE glucose. Refeeding syndrome monitoring.',
   ['Thiamine', 'Vitamin B1', 'Betaxin', 'Benerva']],
  ['new-342', 'Riboflavin', 'Riboflavin (vitamin B2)', 'Vitamin', 'Nutritional - Vitamins',
   '10-100mg PO once daily', '', 'None significant (excess excreted in urine - yellow)', 'Migraine prophylaxis (400mg daily). Urine turns bright yellow.',
   ['Riboflavin', 'Vitamin B2', 'Ribofilm']],
  ['new-343', 'Ascorbic Acid (supp)', 'Ascorbic acid (vitamin C)', 'Vitamin', 'Nutritional - Vitamins',
   '200-1000mg PO once daily; 1-3g IV (deficiency/post-op)', '', 'Renal (high dose oxalate stones), GI (diarrhea)',
   'Scurvy prevention/treatment. Iron absorption enhancer. Antioxidant.', ['Vitamin C', 'Ascorbic Acid', 'Celin']],
  ['new-344', 'Vitamin E', 'Alpha-tocopherol (vitamin E)', 'Vitamin', 'Nutritional - Vitamins',
   '100-400 IU PO once daily', '', 'Bleeding risk (high dose), LFTs', 'Fat-soluble antioxidant. Bleeding risk at high doses (>800 IU).',
   ['Vitamin E', 'Alpha-tocopherol', 'Aquasol E']],
  ['new-345', 'Niacin', 'Niacin (vitamin B3)', 'Vitamin', 'Nutritional - Vitamins',
   '500-2000mg PO once daily (dyslipidemia); 20-50mg daily (deficiency)', '',
   'LFTs (hepatotoxicity with SR), glucose, uric acid', 'Niacin flush common (prostaglandin-mediated). Take aspirin 30min before to reduce.',
   ['Niaspan', 'Niacin', 'Vitamin B3', 'Enduracin']],

  // -- Misc (EENT, etc.) ------------------------------------------
  ['new-346', 'Latanoprost', 'Latanoprost', 'Prostaglandin analogue', 'Ophthalmology - Glaucoma',
   '1 drop in affected eye(s) once daily (evening)', '', 'IOP, iris color change, eyelash growth', 'DOC for open-angle glaucoma. Iris hyperpigmentation (permanent). Evening dosing.',
   ['Xalatan', 'Latanoprost', 'Latacris']],
  ['new-347', 'Timolol', 'Timolol maleate', 'Beta-blocker (ophthalmic)', 'Ophthalmology - Glaucoma',
   '1 drop in affected eye(s) twice daily', '', 'IOP, HR (bradycardia), BP (systemic absorption)', 'Non-selective beta-blocker eye drops. Systemic effects possible (bradycardia, bronchospasm).',
   ['Timoptic', 'Timolol', 'Timoftol']],
  ['new-348', 'Prednisolone (ophth)', 'Prednisolone acetate', 'Corticosteroid (ophthalmic)', 'Ophthalmology - Anti-inflammatory',
   '1-2 drops in affected eye(s) every 1-4h (then taper)', '', 'IOP (steroid response), corneal healing, cataract', 'Ophthalmic steroid. IOP monitoring required. Caution in HSV keratitis.',
   ['Pred Forte', 'Prednisolone', 'Omnipred']],
  ['new-349', 'Chloramphenicol (ophth)', 'Chloramphenicol', 'Antibiotic (ophthalmic)', 'Ophthalmology - Anti-infectives',
   'Apply 0.5% ointment to eye 2-4 times daily; 0.5% eye drops 2-6 times daily', '',
   'Vision, aplastic anemia (rare with topical)', 'Broad-spectrum ophthalmic ABx. Rare aplastic anemia. OTC in many countries.',
   ['Chloromycetin', 'Chloramphenicol', 'Spersanicol']],
  ['new-350', 'Tropicamide', 'Tropicamide', 'Anticholinergic (ophthalmic)', 'Ophthalmology - Mydriatics',
   '1-2 drops 0.5-1% 15-20 min before exam', '', 'IOP (angle-closure risk), photophobia', 'Short-acting mydriatic for fundoscopy. Blurred vision, photophobia for 4-6h.',
   ['Mydriacyl', 'Tropicamide', 'Mydrilate']],
  ['new-351', 'Fluorescein', 'Fluorescein sodium', 'Diagnostic dye', 'Ophthalmology - Diagnostics',
   '1 drop 2% solution (topical); 500mg IV (angiography)', '', 'Corneal staining, allergic reaction (IV - rare)', 'Corneal abrasion detection (Wood\'s lamp). IV for angiography - nausea common.',
   ['Fluorescein', 'Fluoret', 'Fluorescite']],

  // -- Antiseptics/Disinfectants ----------------------------------
  ['new-352', 'Povidone-Iodine', 'Povidone-iodine', 'Antiseptic', 'Surgical - Antiseptics',
   'Apply 5-10% solution to skin/surgical site; 7.5% surgical scrub', '', 'Skin irritation, thyroid function (prolonged use, large areas)',
   'Broad-spectrum antiseptic. More effective than chlorhexidine for some uses. Iodine allergy caution.', ['Betadine', 'Povidone-Iodine', 'Wokadine']],
  ['new-353', 'Chlorhexidine', 'Chlorhexidine gluconate', 'Antiseptic', 'Surgical - Antiseptics',
   '0.12% mouthwash (oral); 2-4% surgical scrub; 0.5% in alcohol (prep)', '',
   'Skin irritation, ototoxicity (avoid in ears), anaphylaxis (rare)', 'DOC surgical hand prep. Alcohol combination for pre-op skin. Avoid eyes/ears.',
   ['Hibiclens', 'Chlorhexidine', 'Corsodyl', 'Peridex']],
  ['new-354', 'Silver Sulfadiazine', 'Silver sulfadiazine', 'Topical antimicrobial', 'Dermatology - Burn Wound',
   'Apply 1% cream to burn/wound once or twice daily', '', 'Wound healing, CBC (neutropenia rare), renal function', 'DOC for burn wound prophylaxis. Avoid on face, avoid in sulfa allergy. Cream.',
   ['Silvadene', 'Flamazine', 'Silver Sulfadiazine', 'Sildimac']],

  // -- Antineoplastics (additional hormones) ----------------------
  ['new-355', 'Tamoxifen', 'Tamoxifen citrate', 'SERM', 'Oncology - Hormonal Therapy',
   '20-40mg PO once daily', '', 'LFTs, endometrial thickening (ultrasound - annual), vision, CBC',
   'SERM for breast cancer. Endometrial cancer risk (boxed). Hot flashes. DVT risk.', ['Nolvadex', 'Tamoxifen', 'Soltamox']],
  ['new-356', 'Exemestane', 'Exemestane', 'Aromatase inhibitor (steroidal)', 'Oncology - Hormonal Therapy',
   '25mg PO once daily after food', '', 'Bone density (DXA), lipids, LFTs, joint symptoms', 'Steroidal AI. Postmenopausal breast cancer. Take after food. Joint stiffness.',
   ['Aromasin', 'Exemestane', 'Exemestan']],
  ['new-357', 'Megestrol Acetate', 'Megestrol acetate', 'Progestin', 'Oncology - Hormonal Therapy/Appetite',
   '40-160mg PO once daily (breast cancer); 400-800mg PO daily (appetite stimulation)', '',
   'Glucose, weight, adrenal suppression (chronic)', 'Progestin for breast/endometrial cancer. Appetite stimulant. Adrenal suppression risk.',
   ['Megace', 'Megestrol', 'Magestin']],

  // -- Haematology (additional) -----------------------------------
  ['new-358', 'Heparin (UFH)', 'Unfractionated heparin', 'Anticoagulant', 'Haematology - Anticoagulants',
   '5000 IU IV bolus then 12-18 IU/kg/h infusion (titrate to aPTT 1.5-2.5x control)', '',
   'aPTT (q6h), CBC (platelets - HIT), K+ (aldosterone suppression)', 'Parenteral anticoagulant. HIT risk (monitor platelets). Protamine reversal.',
   ['Heparin', 'Unfractionated Heparin', 'Hep-lock']],
  ['new-359', 'Enoxaparin', 'Enoxaparin sodium', 'LMWH', 'Haematology - Anticoagulants',
   '40mg SC once daily (prophylaxis); 1mg/kg SC twice daily (treatment)', '',
   'CBC (platelets - HIT, lower risk than UFH), anti-Xa (if needed)', 'LMWH. OD prophylaxis, BD treatment. Lower HIT risk. Protamine partial reversal.',
   ['Lovenox', 'Clexane', 'Enoxaparin', 'Inhixa']],
  ['new-360', 'Fondaparinux', 'Fondaparinux sodium', 'Factor Xa inhibitor', 'Haematology - Anticoagulants',
   '2.5mg SC once daily (prophylaxis); 5-10mg SC once daily (treatment, weight-based)', '',
   'CBC, renal function (CrCl <30 contraindicated), anti-Xa', 'Synthetic factor Xa inhibitor. No HIT risk. No antidote (Andexxa partial).',
   ['Arixtra', 'Fondaparinux', 'Fonda']],
  ['new-361', 'Protamine Sulfate', 'Protamine sulfate', 'Antidote (heparin)', 'Haematology - Reversal Agents',
   '1mg IV per 100 IU UFH (given over 10 min, max 50mg)', '', 'BP (hypotension), HR, aPTT, bleeding signs',
   'Reverses UFH. Partial reversal of LMWH. Anaphylaxis risk (fish allergy). Monitor aPTT.',
   ['Protamine', 'Protamine Sulfate']],
  ['new-362', 'Tranexamic Acid', 'Tranexamic acid', 'Antifibrinolytic', 'Haematology - Haemostasis',
   '1g IV over 10 min (trauma/menorrhagia); 500mg-1g PO three times daily (menorrhagia)', '',
   'Bleeding signs, DVT risk (caution with hypercoagulable states)', 'Antifibrinolytic. CRASH-2: reduced mortality in trauma. Also menorrhagia, dental.',
   ['Cyklokapron', 'Tranexamic Acid', 'TXA', 'Hexakapron']],
  ['new-363', 'Filgrastim', 'Filgrastim (G-CSF)', 'Growth factor', 'Haematology - Growth Factors',
   '5mcg/kg SC/IV once daily (neutropenia)', '', 'CBC (ANC), bone pain, LFTs, splenic rupture (rare)',
   'G-CSF for chemotherapy-induced neutropenia. Bone pain common. Monitor ANC.', ['Neupogen', 'Filgrastim', 'G-CSF', 'Nivestim']],
  ['new-364', 'Erythropoietin', 'Epoetin alfa (EPO)', 'Growth factor', 'Haematology - Growth Factors',
   '50-150 IU/kg SC/IV three times weekly (dose to Hb 10-12 g/dL)', '', 'Hb (weekly), BP (HTN), iron stores, thrombotic events (boxed)',
   'EPO for anemia of CKD, chemotherapy. Boxed: DVT/CV events. Hb target <12 g/dL.', ['Epogen', 'Procrit', 'Erythropoietin', 'Eprex']],
]
// ══════════════════════════════════════════════════════════════════
// 7. MAIN: Merge + Enrich + Output
// ══════════════════════════════════════════════════════════════════

function enrichDrug(row, override) {
  const name = row[1]
  const drugClass = row[3]
  const drugClassName = row[4]
  const cls = drugClass
  const id = row[0]

  const d = {
    id,
    name,
    generic_name: row[2],
    drug_class: drugClass,
    drug_class_id: null,
    drug_class_name: drugClassName,
    indications: classCI(cls).slice(0, 1),
    contraindications: classCI(cls),
    side_effects: classSE(cls),
    dosage: { adult: row[5] || '' },
    interactions: [],
    monitoring: row[7] || '',
    patient_counselling: row[8] || '',
  }

  if (row[6]) d.dosage.adult_alternative = row[6]

  const moaFn = MOA[cls]
  d.mechanism_of_action = moaFn ? moaFn(name) : MOA_DEFAULT(cls)

  const brandsOverride = row[9]
  d.brand_names = (brandsOverride && brandsOverride.length > 0) ? brandsOverride : [name]
  d.pregnancy_category = row[10] || PREG[cls] || PREG_DEFAULT
  d.warnings = classWarnings(cls)
  d.overdose = getOverdose(cls, name)

  const pkVal = PK[cls]
  d.pharmacokinetics = typeof pkVal === 'function' ? pkVal(name) : (pkVal || PK_DEFAULT)

  const bbwVal = BBW[cls]
  if (Array.isArray(bbwVal)) {
    d.black_box_warnings = bbwVal
  } else if (typeof bbwVal === 'function') {
    d.black_box_warnings = bbwVal(name)
  } else {
    d.black_box_warnings = []
  }

  const pearlsKey = detectPearlKey(cls)
  const pearlsArr = pearlsKey ? PEARLS[pearlsKey] : null
  if (Array.isArray(pearlsArr)) {
    d.clinical_pearls = pearlsArr
  } else {
    d.clinical_pearls = PEARLS_DEFAULT
  }

  d.created_at = ''
  return d
}

function detectPearlKey(cls) {
  const keys = Object.keys(PEARLS)
  for (const k of keys) {
    if (cls.toLowerCase().includes(k.toLowerCase())) return k
    if (k.toLowerCase().includes(cls.toLowerCase())) return k
  }
  if (cls.includes('Penicillin')) return 'Penicillin'
  if (cls.includes('Cephalosporin')) return 'Penicillin'
  if (cls.includes('Macrolide')) return 'Penicillin'
  if (cls.includes('Aminoglycoside')) return 'Aminoglycoside'
  if (cls.includes('Fluoroquinolone')) return 'Fluoroquinolone'
  if (cls.includes('Tetracycline')) return 'Tetracycline'
  if (cls.includes('ACE')) return 'ACEi'
  if (cls.includes('ARB')) return 'ARB'
  if (cls.includes('Beta')) return 'Beta'
  if (cls.includes('Statin')) return 'Statin'
  if (cls.includes('PPI')) return 'PPI'
  if (cls.includes('Biguanide')) return 'Biguanide'
  if (cls.includes('Opioid')) return 'Opioid'
  if (cls.includes('Insulin')) return 'Insulin'
  if (cls.includes('SABA')) return 'SABA'
  if (cls.includes('Anticoag')) return 'Anticoagulant'
  if (cls.includes('Antiplatelet')) return 'Antiplatelet'
  if (cls.includes('Anticonvuls')) return 'Anticonvulsant'
  if (cls.includes('Antipsych')) return 'Antipsychotic'
  if (cls.includes('SGLT')) return 'SGLT2'
  if (cls.includes('Antiemetic')) return 'Antiemetic'
  if (cls.includes('Scabicide') || cls.includes('Permethrin')) return 'Scabicide'
  if (cls.includes('Corticosteroid')) return 'Corticosteroid'
  if (cls.includes('Anthelmintic')) return 'Anthelmintic'
  if (cls.includes('Antimalarial')) return 'Antimalarial'
  return null
}

function renderDrug(d) {
  const dosageObj = { adult: d.dosage.adult || '' }
  if (d.dosage.adult_alternative) dosageObj.adult_alternative = d.dosage.adult_alternative

  return JSON.stringify({
    id: d.id,
    name: d.name,
    generic_name: d.generic_name,
    drug_class: d.drug_class,
    drug_class_id: d.drug_class_id,
    drug_class_name: d.drug_class_name,
    indications: d.indications,
    contraindications: d.contraindications,
    side_effects: d.side_effects,
    dosage: dosageObj,
    interactions: d.interactions,
    monitoring: d.monitoring,
    patient_counselling: d.patient_counselling,
    mechanism_of_action: d.mechanism_of_action,
    brand_names: d.brand_names,
    warnings: d.warnings,
    pregnancy_category: d.pregnancy_category,
    overdose: d.overdose,
    pharmacokinetics: d.pharmacokinetics,
    black_box_warnings: d.black_box_warnings,
    clinical_pearls: d.clinical_pearls,
    created_at: d.created_at,
  })
}

// ══════════════════════════════════════════════════════════════════
// 8. EXECUTE
// ══════════════════════════════════════════════════════════════════

console.log('Reading existing drugIndexData.ts...')
let src = ''
try {
  src = readFileSync(DRUG_FILE, 'utf-8')
} catch {
  console.log('No existing file found, starting from scratch.')
  src = `import type { DrugMonograph } from '../services/drugMonograph.service';\n\nexport const BUNDLED_DRUGS: DrugMonograph[] = [];\n`
}

// Find existing entries
const existingIds = new Set()
const idRegex = /id:\s*'([^']+)'/g
let mtch
while ((mtch = idRegex.exec(src)) !== null) {
  existingIds.add(mtch[1])
}
// Also match JSON format IDs from previous runs
const idRegexJson = /"id":"([^"]+)"/g
while ((mtch = idRegexJson.exec(src)) !== null) {
  existingIds.add(mtch[1])
}
console.log('Found ' + existingIds.size + ' existing drugs.')

// Enrich new drugs
const allNew = [...NEW_DRUGS, ...NEW_DRUGS_2]
let addedCount = 0
let skipCount = 0
const newEntries = []

for (const row of allNew) {
  const id = row[0]
  if (existingIds.has(id)) {
    skipCount++
    continue
  }
  const enriched = enrichDrug(row)
  newEntries.push(enriched)
  addedCount++
}

console.log('Added ' + addedCount + ' new drugs. Skipped ' + skipCount + ' duplicates.')

// Build output: extract existing array content, append new entries
let output = `import type { DrugMonograph } from '../services/drugMonograph.service';\n\nexport const BUNDLED_DRUGS: DrugMonograph[] = [\n`

const idx = src.indexOf('export const BUNDLED_DRUGS: DrugMonograph[] = [')
if (idx >= 0) {
  const afterExport = src.substring(idx)
  const eqIdx = afterExport.indexOf('= [')
  const bracketStart = afterExport.indexOf('[', eqIdx)
  let depth = 0
  let bEnd = bracketStart
  for (let i = bracketStart; i < afterExport.length; i++) {
    if (afterExport[i] === '[') depth++
    if (afterExport[i] === ']') {
      depth--
      if (depth === 0) {
        bEnd = i + 1
        break
      }
    }
  }
  const oldArray = afterExport.substring(bracketStart + 1, bEnd - 1).trim()
  if (oldArray.length > 2) {
    output += oldArray
    if (!oldArray.endsWith(',')) output += ','
  }
}

for (const d of newEntries) {
  output += '    ' + renderDrug(d) + ',\n'
}

output += '];\n'

writeFileSync(DRUG_FILE, output, 'utf-8')
console.log('Wrote ' + DRUG_FILE + ' with ' + (existingIds.size + addedCount) + ' total drugs.')
console.log('Done!')

