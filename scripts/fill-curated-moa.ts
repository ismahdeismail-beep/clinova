// Curated mechanism-of-action fill for drugs where OpenFDA has no clean
// mechanism section (vitamins, electrolytes, ophthalmics, older agents,
// topicals). Uses verified pharmacological knowledge — the same standard as
// the migration-000010 curated Artemether–Lumefantrine content.
//
// Resumable via storage/moa_curated_state.json. Usage:
//   npx tsx scripts/fill-curated-moa.ts
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const STATE_FILE = 'storage/moa_curated_state.json'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

const MOA: Record<string, string> = {
  Brimonidine: 'Selective α₂-adrenergic receptor agonist that reduces aqueous humour production and increases uveoscleral outflow, lowering intraocular pressure in open-angle glaucoma and ocular hypertension.',
  Fluorescein: 'Diagnostic dye used to detect corneal abrasions, foreign bodies and retinal vascular leakage; it emits yellow-green fluorescence when excited by blue light (cobalt blue filter), highlighting epithelial defects.',
  Cyclopentolate: 'Antimuscarinic (competitive muscarinic receptor antagonist) that blocks the sphincter pupillae and ciliary muscle cholinergic receptors, producing mydriasis and cycloplegia for ocular examination.',
  Tropicamide: 'Short-acting antimuscarinic that blocks cholinergic receptors of the iris sphincter and ciliary muscle, causing rapid mydriasis and cycloplegia for diagnostic retinal examination.',
  'Methylene Blue': 'Redox-active thiazine dye that serves as an electron acceptor; in methaemoglobinaemia it is reduced to leukomethylene blue by NADPH-dependent methaemoglobin reductase, which then reduces Fe³⁺ methaemoglobin back to functional Fe²⁺ haemoglobin.',
  Cefiderocol: 'Siderophore cephalosporin that exploits the bacterial iron-uptake system: it chelates ferric iron and is actively transported across the outer membrane via TonB-dependent siderophore receptors, then inhibits penicillin-binding proteins to block peptidoglycan synthesis, retaining activity against carbapenem-resistant Gram-negative bacteria.',
  Bosentan: 'Dual endothelin receptor antagonist (blocking both ETA and ETB receptors) that inhibits endothelin-1-mediated vasoconstriction and vascular proliferation, improving haemodynamics in pulmonary arterial hypertension.',
  Ambrisentan: 'Selective endothelin type A (ETA) receptor antagonist that blocks endothelin-1-induced vasoconstriction and smooth-muscle proliferation in pulmonary arterial hypertension.',
  Mexiletine: 'Class IB antiarrhythmic that blocks cardiac sodium channels, shortening action potential duration and suppressing ventricular arrhythmias; also blocks skeletal muscle sodium channels, reducing myotonia.',
  Flecainide: 'Class IC antiarrhythmic that blocks cardiac sodium channels with slow onset/offset kinetics, markedly slowing conduction velocity (QRS widening) and suppressing atrial and ventricular arrhythmias.',
  Disopyramide: 'Class IA antiarrhythmic that blocks sodium channels and prolongs action potential duration (QT prolongation); has significant antimuscarinic effects and negative inotropic action, used in hypertrophic cardiomyopathy and ventricular arrhythmias.',
  Procainamide: 'Class IA antiarrhythmic that blocks sodium channels, slows conduction and prolongs refractoriness; suppresses atrial and ventricular arrhythmias (can cause drug-induced lupus).',
  Midodrine: 'Prodrug converted to desglymidodrine, a selective α₁-adrenergic receptor agonist that causes arteriolar and venous vasoconstriction, raising standing blood pressure in orthostatic hypotension.',
  'Trifluoperazine': 'First-generation (typical) antipsychotic that blocks central dopamine D₂ receptors in the mesolimbic pathway, reducing positive symptoms of schizophrenia; high-potency with significant extrapyramidal risk.',
  Thioridazine: 'First-generation (typical) antipsychotic, a piperidine phenothiazine that blocks dopamine D₂ receptors with prominent antimuscarinic, antiadrenergic and QT-prolonging effects.',
  Perphenazine: 'First-generation (typical) antipsychotic (piperazine phenothiazine) that blocks dopamine D₂ receptors, treating schizophrenia; intermediate potency with dose-dependent extrapyramidal effects.',
  Fluphenazine: 'High-potency first-generation (typical) antipsychotic (piperazine phenothiazine) that blocks dopamine D₂ receptors; available as a long-acting decanoate depot for adherence.',
  Chlorpromazine: 'Low-potency first-generation (typical) antipsychotic (aliphatic phenothiazine) that blocks dopamine D₂ receptors and also antagonises histamine H₁, muscarinic, α₁-adrenergic and 5-HT₂A receptors, giving sedative, antiemetic and hypotensive effects.',
  Pimozide: 'Diphenylbutylpiperidine antipsychotic that blocks dopamine D₂ receptors; used for Tourette syndrome and refractory schizophrenia; prolongs QT interval.',
  'Haloperidol Decanoate': 'Long-acting depot ester of haloperidol, a butyrophenone antipsychotic that blocks dopamine D₂ receptors; slow release from intramuscular depot provides 4-weekly maintenance dosing.',
  Brexpiprazole: 'Atypical antipsychotic that acts as a partial agonist at dopamine D₂ and serotonin 5-HT1A receptors and an antagonist at 5-HT2A and α-adrenergic receptors, treating schizophrenia and major depressive disorder adjunct.',
  Nitrazepam: 'Benzodiazepine that potentiates GABA-A receptor chloride currents via the benzodiazepine binding site, producing sedation, hypnosis and anticonvulsant effects with a long half-life.',
  Oxazepam: 'Intermediate-acting benzodiazepine that enhances GABA-A receptor chloride conductance, producing anxiolysis and sedation; metabolised by direct glucuronidation (safe in hepatic impairment).',
  Temazepam: 'Intermediate-acting benzodiazepine hypnotic that potentiates GABA-A receptor-mediated inhibition, reducing sleep latency and promoting sleep.',
  Clonazepam: 'High-potency benzodiazepine that enhances GABA-A receptor chloride currents, producing anticonvulsant, anxiolytic and muscle-relaxant effects; used in epilepsy, panic disorder and myoclonus.',
  Buspirone: 'Partial agonist at serotonin 5-HT1A receptors (and weak dopamine D₂ antagonist) that reduces anxiety without sedation or dependence; onset of anxiolytic effect takes 1–2 weeks.',
  Diphenhydramine: 'First-generation antihistamine that competitively blocks histamine H₁ receptors; also crosses the blood–brain barrier to produce sedation, and has antimuscarinic and antiemetic effects.',
  Fexofenadine: 'Second-generation (non-sedating) peripherally selective histamine H₁ receptor antagonist used for allergic rhinitis and urticaria; does not cross the blood–brain barrier appreciably.',
  Levocetirizine: 'Active (R)-enantiomer of cetirizine, a second-generation peripherally selective histamine H₁ receptor antagonist for allergic rhinitis and chronic urticaria.',
  'Vitamin E': 'Fat-soluble antioxidant (α-tocopherol) that scavenges lipid peroxyl radicals, protecting cell membranes from oxidative damage; also modulates immune function and platelet aggregation.',
  'Alpha Tocopherol': 'Most biologically active form of vitamin E; acts as a chain-breaking antioxidant in lipid membranes, preventing free-radical-mediated peroxidation of polyunsaturated fatty acids.',
  'Vitamin K1': 'Phytonadione that serves as a cofactor for γ-glutamyl carboxylase, enabling activation of clotting factors II, VII, IX and X and proteins C and S; reverses warfarin anticoagulation.',
  Phytonadione: 'Vitamin K₁ that provides the cofactor for hepatic γ-carboxylation of vitamin K-dependent clotting factors (II, VII, IX, X), restoring coagulation in deficiency or warfarin overdose.',
  Niacin: 'Vitamin B₃; as nicotinamide adenine dinucleotide (NAD⁺) precursor it supports redox reactions; at high doses inhibits hepatic triglyceride synthesis and raises HDL by reducing apolipoprotein A-I catabolism (via HCA2 receptor).',
  Biotin: 'Water-soluble B vitamin that acts as a coenzyme for carboxylases (pyruvate carboxylase, acetyl-CoA carboxylase, propionyl-CoA carboxylase), essential for gluconeogenesis, fatty acid synthesis and amino acid catabolism.',
  'Ascorbic Acid': 'Vitamin C, a water-soluble antioxidant and cofactor for collagen hydroxylases, carnitine synthesis and neurotransmitter synthesis; enhances dietary iron absorption.',
  Riboflavin: 'Vitamin B₂ that forms the coenzymes FAD and FMN, essential for electron transport, fatty acid oxidation and redox reactions; also used (high dose) to reduce migraine frequency.',
  'Pantothenic Acid': 'Vitamin B₅ that forms coenzyme A, essential for fatty acid oxidation, Krebs cycle, steroid and acetylcholine synthesis.',
  Retinol: 'Vitamin A (retinoid) essential for rhodopsin regeneration in rod photoreceptors (vision), epithelial differentiation, immune function and reproduction; deficiency causes night blindness.',
  'Vitamin A': 'Fat-soluble vitamin; retinaldehyde forms the chromophore of rhodopsin for dark adaptation, while retinoic acid regulates epithelial differentiation and immune function.',
  Selenium: 'Trace element that is an essential component of selenoproteins including glutathione peroxidase, protecting cells from oxidative damage and supporting thyroid hormone metabolism.',
  'Magnesium Sulphate': 'Magnesium acts as a physiological calcium antagonist: it blocks voltage-gated calcium channels and NMDA receptors, reduces acetylcholine release at the neuromuscular junction (tocolytic, anticonvulsant in eclampsia) and corrects hypomagnesaemia.',
  'Magnesium Oxide': 'Magnesium salt that provides elemental magnesium (correction of hypomagnesaemia) and acts as an osmotic laxative/antacid via the alkaline oxide moiety.',
  'Calcium Lactate': 'Calcium salt that supplies elemental calcium for the correction of hypocalcaemia; calcium is essential for muscle contraction, nerve conduction, coagulation and bone mineralisation.',
  'Potassium Citrate': 'Alkalinising potassium salt that provides potassium and bicarbonate precursors; urinary alkalinisation raises citrate excretion, reducing calcium stone formation in renal lithiasis.',
  'Sodium Polystyrene': 'Cation-exchange resin that exchanges sodium ions for potassium in the gastrointestinal tract, lowering serum potassium in hyperkalaemia (delayed effect; largely replaced by newer agents).',
  'Sodium Polystyrene Sulfonate': 'Cation-exchange resin (Kayexalate) that binds potassium in exchange for sodium in the colon, reducing serum potassium in hyperkalaemia.',
  'Iron/Folic Acid': 'Combination haematinic: ferrous iron is absorbed and incorporated into haemoglobin; folic acid is reduced to tetrahydrofolate, a cofactor for DNA synthesis — together correcting iron-deficiency and megaloblastic anaemias (antenatal prophylaxis).',
  'Cyanocobalamin/Folic Acid': 'Vitamin B₁₂ is converted to methylcobalamin and adenosylcobalamin, cofactors for methionine synthase and methylmalonyl-CoA mutase; folic acid provides tetrahydrofolate for DNA synthesis — treating combined megaloblastic anaemia.',
  'L-Carnitine': 'Shuttles long-chain fatty acids across the mitochondrial inner membrane via carnitine palmitoyltransferase for β-oxidation; supplementation treats primary/secondary carnitine deficiency.',
  'Amino Acids': 'Provide substrate for protein synthesis, gluconeogenesis and neurotransmitter formation; used in parenteral nutrition and specific metabolic disorders.',
  'Trace Elements': 'Supply essential micronutrients (zinc, copper, manganese, selenium, chromium, molybdenum, iodine, iron) required as enzyme cofactors and for immune and antioxidant function, primarily in parenteral nutrition.',
  'Omega-3 Fatty Acids': 'Eicosapentaenoic (EPA) and docosahexaenoic (DHA) acids lower serum triglycerides by inhibiting hepatic VLDL synthesis and reduce inflammation via resolvin/protectin production.',
  'Multivitamin': 'Combination of vitamins and minerals supplying daily requirements; individual components act as enzyme cofactors, antioxidants and metabolic precursors.',
  Glucose: 'Simple hexose sugar that provides immediate cellular energy; intravenous dextrose corrects hypoglycaemia and reduces cerebral oedema when hypertonic (via osmotic effect).',
  Physostigmine: 'Reversible cholinesterase inhibitor that increases acetylcholine at central and peripheral muscarinic and nicotinic synapses; used as an antidote for anticholinergic toxicity and in myasthenia.',
  'Sodium Oxybate': 'Sodium salt of γ-hydroxybutyrate (GHB), a CNS depressant acting at GABA-B and GHB receptors that consolidates slow-wave sleep; used for narcolepsy with cataplexy and EDS.',
  Colistimethate: 'Prodrug of colistin, a polymyxin antibiotic that binds to lipopolysaccharide and phospholipids of the Gram-negative outer membrane, displacing calcium and magnesium to disrupt membrane integrity — bactericidal against multidrug-resistant Gram-negative bacilli.',
  Streptokinase: 'Fibrinolytic that binds plasminogen, converting it to plasmin, which degrades fibrin clots; used for acute MI, massive PE and ischaemic stroke (antigenic, one-time use).',
  'Omega-3 Fatty Acids (EPA/DHA)': 'Reduce hepatic VLDL/triglyceride synthesis and exert anti-inflammatory effects via eicosanoid modulation and resolvin production.',
  Progesterone: 'Natural progestogen that binds the progesterone receptor, transforming the oestrogen-primed endometrium to a secretory state; maintains pregnancy, regulates the menstrual cycle, and suppresses ovulation at high doses.',
  Granisetron: 'Selective serotonin 5-HT₃ receptor antagonist that blocks vagal afferent and central chemoreceptor-trigger-zone signalling, preventing chemotherapy- and radiotherapy-induced nausea and vomiting.',
  Dantrolene: 'Direct skeletal muscle relaxant that inhibits ryanodine receptor (RyR1)-mediated calcium release from the sarcoplasmic reticulum, uncoupling excitation–contraction; the specific antidote for malignant hyperthermia and neuroleptic malignant syndrome.',
  Nortriptyline: 'Secondary-amine tricyclic antidepressant that inhibits presynaptic reuptake of noradrenaline (and to a lesser extent serotonin), increasing synaptic monoamines; also blocks histamine, muscarinic and α₁-adrenergic receptors.',
  Trimipramine: 'Tricyclic antidepressant that inhibits monoamine reuptake with marked sedative and antimuscarinic properties; also used for insomnia and chronic pain.',
  Imipramine: 'Tricyclic antidepressant that blocks reuptake of noradrenaline and serotonin; also used for enuresis and neuropathic pain; prominent antimuscarinic and cardiotoxic (QT) effects.',
  Clomipramine: 'Tricyclic antidepressant with potent serotonin-reuptake inhibition (preferential); first-line for obsessive–compulsive disorder, with antimuscarinic and sedative effects.',
  Tiagabine: 'Selective GABA reuptake inhibitor that blocks GAT-1 GABA transporters on presynaptic neurons and glia, increasing synaptic GABA and enhancing inhibition; adjunctive therapy for partial seizures.',
  Ethosuximide: 'TCA-cycle-independent T-type calcium channel blocker in thalamic relay neurons, suppressing absence (petit mal) seizure generation.',
  Primidone: 'Anticonvulsant (barbiturate analogue) metabolised to phenobarbital and phenylethylmalonamide; enhances GABA-A receptor chloride currents, used in focal and generalised seizures and essential tremor.',
  Baclofen: 'GABA-B receptor agonist that inhibits excitatory neurotransmitter release in the spinal cord, reducing spasticity in multiple sclerosis and spinal cord injury.',
  Trihexyphenidyl: 'Centrally acting antimuscarinic that restores the dopamine–acetylcholine balance in the basal ganglia, reducing tremor and rigidity in Parkinson disease and drug-induced extrapyramidal symptoms.',
  Amantadine: 'Blocks the NMDA glutamate receptor (antiglutamatergic) and enhances dopamine release; used for influenza A prophylaxis/treatment and Parkinson disease (dyskinesia reduction).',
  Apomorphine: 'Non-selective dopamine receptor agonist (D1 and D2) used as a rapid rescue therapy for off-periods in advanced Parkinson disease; administered subcutaneously.',
  Benzonatate: 'Peripheral oral anaesthetic (related to tetracaine) that anaesthetises stretch receptors in the lungs and airways, reducing the cough reflex.',
  Dextromethorphan: 'Central antitussive that acts on sigma-1 and NMDA receptors in the medullary cough centre, raising the cough threshold; at higher doses has NMDA-antagonist (dissociative) effects.',
  'Codeine Phosphate': 'Prodrug O-demethylated by CYP2D6 to morphine, a μ-opioid receptor agonist that suppresses the medullary cough centre and provides analgesia; also has antitussive action.',
  'Clotrimazole Topical': 'Imidazole antifungal that inhibits fungal cytochrome P450 14α-demethylase, blocking ergosterol synthesis and disrupting fungal cell membrane integrity.',
  'Erythromycin Topical': 'Macrolide antibiotic that binds the 50S ribosomal subunit, inhibiting bacterial protein synthesis; topical use treats acne via antibacterial and anti-inflammatory effects.',
  'Hydrocortisone Topical': 'Short-acting topical corticosteroid that binds the glucocorticoid receptor, suppressing phospholipase A2, cytokine and prostaglandin production to reduce inflammation and pruritus in dermatoses.',
  'Urea Cream': 'Keratolytic humectant that hydrates the stratum corneum and dissolves intercellular keratin bonds, softening hyperkeratotic skin in xerosis, ichthyosis and hyperkeratotic dermatoses.',
  'Lidocaine Patch': 'Local anaesthetic (amide) that blocks voltage-gated sodium channels in peripheral nociceptors, preventing initiation and propagation of pain signals; used for post-herpetic neuralgia.',
  'Lidocaine/Epinephrine': 'Amide local anaesthetic (sodium-channel block) combined with a vasoconstrictor (α-adrenergic agonist) that reduces local blood flow, prolonging anaesthesia and reducing systemic toxicity.',
  Capsaicin: 'Activates TRPV1 receptors on C-fibre nociceptors; repeated exposure desensitises the neurons and depletes substance P, reducing neuropathic and musculoskeletal pain.',
  'Sunscreen SPF50': 'Physical/chemical UV filters that absorb or reflect ultraviolet A and B radiation, preventing UV-induced DNA damage, photoageing and skin cancer.',
  Orphenadrine: 'Centrally acting antimuscarinic with additional NMDA-antagonist and antihistamine properties; relieves skeletal muscle spasm and drug-induced parkinsonism.',
  Cyclobenzaprine: 'Centrally acting skeletal muscle relaxant structurally related to tricyclics; reduces tonic somatic motor activity via brainstem (noradrenergic/serotonergic) effects, relieving muscle spasm.',
  Ergotamine: 'Ergot alkaloid that agonises 5-HT1B/1D receptors causing cranial vasoconstriction and inhibits trigeminal neurogenic inflammation; used for acute migraine attacks.',
  'Azathioprine': 'Purine antimetabolite prodrug converted to 6-mercaptopurine, which is incorporated into DNA and inhibits de novo purine synthesis, suppressing lymphocyte proliferation; used in autoimmune disease and transplant rejection.',
  'Mycophenolic Acid': 'Selective, reversible inhibitor of inosine monophosphate dehydrogenase, blocking de novo guanine nucleotide synthesis in lymphocytes; used with calcineurin inhibitors for transplant maintenance and autoimmune disease.',
  Clomiphene: 'Selective oestrogen receptor modulator (SERM) that blocks hypothalamic oestrogen negative feedback, increasing GnRH → FSH/LH secretion and stimulating ovulation in anovulatory infertility.',
  Fludrocortisone: 'Synthetic mineralocorticoid that activates the mineralocorticoid receptor, increasing renal sodium reabsorption and potassium excretion; used for adrenal insufficiency and orthostatic hypotension.',
  Alprostadil: 'Prostaglandin E₁ analogue that relaxes vascular smooth muscle via EP receptor-mediated cAMP elevation (patent ductus arteriosus maintenance) and corpus cavernosum smooth muscle (erectile dysfunction).',
  Oxytocin: 'Synthetic posterior pituitary hormone that stimulates uterine smooth-muscle contraction via oxytocin receptors (Gq-coupled) and milk ejection via myoepithelial contraction.',
  'Edetate Calcium Disodium': 'Chelating agent that binds lead, forming a stable water-soluble complex excreted renally; used for lead poisoning (with dimercaprol in severe cases).',
  Sulfadiazine: 'Sulphonamide that competitively inhibits dihydropteroate synthase, blocking bacterial folate synthesis; used with pyrimethamine for toxoplasmosis and for nocardiosis.',
  Sulfamethoxazole: 'Sulphonamide that inhibits bacterial dihydropteroate synthase, blocking folate synthesis; in combination with trimethoprim (co-trimoxazole) provides sequential folate-pathway blockade.',
  Gemfibrozil: 'Fibric acid derivative (PPARα agonist) that increases lipoprotein lipase activity and hepatic fatty acid oxidation, lowering triglycerides and raising HDL.',
  Phenylephrine: 'Selective α₁-adrenergic receptor agonist causing vasoconstriction; used as a decongestant, mydriatic (without cycloplegia) and pressor in hypotension.',
  Baricitinib: 'Selective Janus kinase (JAK1/JAK2) inhibitor that blocks cytokine-receptor signalling (IL-6, IL-12/23, IFNs), reducing inflammation in rheumatoid arthritis and other immune-mediated diseases.',
  Prednisone: 'Prodrug converted to prednisolone, a glucocorticoid that binds the glucocorticoid receptor, suppressing cytokine gene transcription, phospholipase A2 and immune cell function — potent anti-inflammatory and immunosuppressive action.',
  Testosterone: 'Androgen that binds the androgen receptor, promoting virilisation, protein synthesis and spermatogenesis; used for male hypogonadism (replacement) and some breast cancer settings.',
  Ketorolac: 'Non-selective COX-1/COX-2 inhibitor (NSAID) that blocks prostaglandin synthesis, providing potent analgesic and anti-inflammatory effects; short-term use for moderate-to-severe pain.',
  Danazol: 'Synthetic attenuated androgen that suppresses pituitary gonadotropins and inhibits ovarian steroidogenesis, used for endometriosis and fibrocystic breast disease; also an anti-oestrogenic agent.',
  Bisacodyl: 'Stimulant (contact) laxative that activates colonic mucosal nerve plexuses, increasing peristalsis and luminal water/electrolyte secretion; acts within 6–12 hours.',
  Cholestyramine: 'Bile acid sequestrant (anion-exchange resin) that binds bile acids in the gut, interrupting enterohepatic circulation and forcing hepatic cholesterol conversion to bile acids — lowering LDL; also binds digoxin and thyroid hormone.',
  Sucralfate: 'Sucrose sulphate–aluminium complex that polymerises in acid to form a protective gel adherent to ulcer craters, and inhibits pepsin — a cytoprotective agent for peptic ulcer healing.',
  'Polyethylene Glycol': 'Osmotic laxative (non-absorbable polymer) that retains water in the colonic lumen, softening stool and stimulating evacuation; also used as bowel-preparation solution.',
  Docusate: 'Stool softener (surfactant) that lowers surface tension, allowing water and fats to penetrate the stool — a faecal softener, not a true stimulant.',
  'Glyburide': 'Second-generation sulphonylurea that binds the SUR1 subunit of the pancreatic KATP channel, closing it and depolarising β-cells to stimulate insulin secretion (insulin secretagogue).',
  Rosiglitazone: 'Thiazolidinedione that activates peroxisome proliferator-activated receptor-γ (PPARγ), increasing peripheral insulin sensitivity and glucose uptake; fluid retention and cardiovascular concerns limit use.',
  'Fluticasone Furoate': 'Potent inhaled/intranasal corticosteroid with high glucocorticoid-receptor affinity and prolonged residence time; suppresses airway inflammation in asthma and allergic rhinitis.',
  'Fluticasone Propionate': 'Inhaled/intranasal corticosteroid that binds the glucocorticoid receptor, reducing airway eosinophilia, cytokine release and mucus secretion in asthma and rhinitis.',
  Desoximetasone: 'Potent topical corticosteroid that suppresses inflammation via glucocorticoid-receptor-mediated inhibition of phospholipase A2, cytokine and prostaglandin synthesis.',
  'Bismuth Subsalicylate': 'Forms a protective coating on gastric mucosa, inhibits prostaglandin synthesis, and has antimicrobial action against H. pylori; used for diarrhoea, dyspepsia and as part of H. pylori triple therapy.',
  Melphalan: 'Nitrogen-mustard alkylating agent that cross-links DNA guanine bases, blocking replication and transcription — used in multiple myeloma and ovarian cancer.',
  Dacarbazine: 'Alkylating/antimetabolite prodrug activated by hepatic N-demethylation to a methylating species that forms DNA adducts; used in metastatic melanoma and Hodgkin lymphoma.',
  Daunorubicin: 'Anthracycline that intercalates DNA and inhibits topoisomerase II, blocking replication/transcription; generates reactive oxygen species; used in AML/ALL (cardiotoxic).',
  Procarbazine: 'Alkylating-like antineoplastic (MAO-inhibitor activity) that methylates DNA after hepatic activation; used in Hodgkin lymphoma (MOPP regimen).',
  Cytarabine: 'Antimetabolite (deoxycytidine analogue) phosphorylated to ara-CTP, which inhibits DNA polymerase and is incorporated into DNA, terminating chain elongation — cornerstone of AML therapy.',
  Mitomycin: 'Antitumour antibiotic that is bioreductively activated to a DNA cross-linking alkylator; used in gastric, pancreatic and bladder cancers.',
  Etoposide: 'Topoisomerase II inhibitor that traps the DNA–enzyme complex, causing double-strand breaks; cell-cycle specific (S/G2) — used in small-cell lung cancer, testicular cancer, lymphomas.',
  Flutamide: 'Non-steroidal antiandrogen that competitively blocks the androgen receptor in prostate tissue, inhibiting androgen-driven prostate cancer growth (with GnRH analogues).',
  Nilutamide: 'Non-steroidal antiandrogen that competitively antagonises the androgen receptor, used with surgical/medical castration for metastatic prostate cancer.',
  'Clomiphene Citrate': 'SERM that blocks hypothalamic oestrogen receptors, increasing GnRH pulse frequency and gonadotropin secretion to trigger ovulation.',
  'Prochlorperazine': 'Phenothiazine that blocks dopamine D₂ receptors in the chemoreceptor trigger zone, exerting potent antiemetic and antipsychotic effects.',
  'Sodium Hyaluronate': 'High-molecular-weight hyaluronic acid that restores viscoelasticity of synovial fluid and ocular surface, providing viscosupplementation in osteoarthritis and artificial tears.',
  'Amoxicillin/Clavulanate': 'Amoxicillin inhibits cell-wall peptidoglycan cross-linking by binding penicillin-binding proteins; clavulanate is a β-lactamase inhibitor that protects amoxicillin from hydrolysis by common resistance enzymes (ESBL-lite spectrum).',
  'Trimethoprim–Sulfamethoxazole': 'Sequential folate-pathway blockade: sulfamethoxazole inhibits dihydropteroate synthase and trimethoprim inhibits dihydrofolate reductase, producing synergistic bactericidal action.',
  'N-acetylcysteine': 'Provides cysteine for glutathione synthesis (antioxidant) and acts as a reducing agent; replenishes hepatic glutathione in paracetamol toxicity and reduces mucus viscosity.',
  'Rifampicin': 'Inhibits bacterial DNA-dependent RNA polymerase by binding the β-subunit, blocking transcription initiation — bactericidal against M. tuberculosis and other mycobacteria.',
  'Isoniazid': 'Prodrug activated by KatG catalase-peroxidase to a reactive species that inhibits mycolic acid synthesis (InhA enoyl-ACP reductase), killing actively dividing mycobacteria.',
  'Ethambutol': 'Inhibits arabinosyl transferase, blocking arabinogalactan synthesis in the mycobacterial cell wall; bacteriostatic against M. tuberculosis (optic neuritis risk).',
  'Pyrazinamide': 'Pyrazinoic acid (activated by mycobacterial pyrazinamidase) disrupts membrane energetics and fatty acid synthesis in the acidic phagosomal environment; sterilising action against semi-dormant bacilli.',
  'Streptomycin': 'Aminoglycoside that binds the 30S ribosomal subunit, causing misreading and inhibition of protein synthesis; first-line anti-TB in resistance protocols.',
  'Artemether–Lumefantrine': 'Artemether (artemisinin derivative) is activated by haem-iron to carbon-centred free radicals that alkylate parasite proteins and inhibit PfATP6; lumefantrine inhibits haem detoxification by binding free haem, preventing haemozoin polymerisation — synergistic 6-dose ACT.',
  'Dihydroartemisinin': 'Active metabolite of artemisinin derivatives; the endoperoxide bridge is cleaved by intra-parasitic haem-iron, generating free radicals that damage parasite proteins and membranes.',
  'Artemether': 'Artemisinin derivative activated by haem-derived iron to alkylating free radicals that inhibit parasite SERCA (PfATP6) and other proteins, producing rapid clearance of P. falciparum.',
  'Atovaquone': 'Selective inhibitor of the mitochondrial cytochrome bc1 complex, collapsing the parasite electron-transport chain and pyrimidine synthesis; used with proguanil for malaria.',
  'Proguanil': 'Biguanide that inhibits plasmodial dihydrofolate reductase (active metabolite cycloguanil); synergistic with atovaquone.',
  'Mefloquine': 'Quinoline-methanol antimalarial that inhibits haem detoxification in the parasite food vacuole (and disrupts parasite membranes), used for prophylaxis and treatment of chloroquine-resistant malaria.',
  'Primaquine': '8-aminoquinoline that generates reactive oxygen species via redox cycling, killing hypnozoites of P. vivax and P. ovale and gametocytes — the only drug that achieves radical cure of relapsing malaria.',
  'Tafenoquine': '8-aminoquinoline antimalarial (single-dose) that clears P. vivax hypnozoites via reactive oxygen species; requires G6PD screening.',
  'Piperaquine': 'Bisquinoline antimalarial that inhibits haem detoxification in the parasite food vacuole; combined with dihydroartemisinin (DHA–PPQ) as an ACT.',
  'Atovaquone/Proguanil': 'Synergistic antimalarial: atovaquone inhibits the parasite mitochondrial bc1 complex while proguanil/cycloguanil inhibits dihydrofolate reductase, blocking pyrimidine synthesis.',
  'Amphotericin B': 'Polyene antifungal that binds ergosterol in fungal cell membranes, forming pores that leak intracellular ions and kill the fungus; broad-spectrum, nephrotoxic.',
  'Liposomal Amphotericin B': 'Amphotericin B encapsulated in liposomes that preferentially deliver the polyene to fungal membranes while reducing renal toxicity and infusion reactions.',
  'Caspofungin': 'Echinocandin that non-competitively inhibits β-1,3-glucan synthase, blocking cell-wall glucan synthesis — fungicidal against Candida, fungistatic against Aspergillus.',
  'Flucytosine': 'Antimetabolite converted by fungal cytosine deaminase to 5-fluorouracil, which inhibits DNA and RNA synthesis; used with amphotericin B for cryptococcal meningitis.',
  'Colistin': 'Polymyxin antibiotic that disrupts Gram-negative outer and inner membranes via lipopolysaccharide binding, with detergent-like bactericidal action against MDR bacteria.',
  'Vancomycin': 'Glycopeptide that binds D-Ala-D-Ala precursors of peptidoglycan, blocking cell-wall cross-linking — bactericidal against Gram-positive organisms including MRSA.',
  'Teicoplanin': 'Glycopeptide antibiotic that inhibits peptidoglycan cross-linking by binding D-Ala-D-Ala; active against Gram-positive cocci including MRSA (once-daily dosing).',
  'Linezolid': 'Oxazolidinone that binds the 50S ribosomal subunit, preventing initiation complex formation — bacteriostatic against MRSA and VRE; MAO-inhibitor activity.',
  'Daptomycin': 'Lipopeptide that inserts into the Gram-positive cytoplasmic membrane in a calcium-dependent manner, causing rapid depolarisation and cell death — bactericidal.',
  'Tigecycline': 'Glycylcycline (minocycline derivative) that binds the 30S ribosomal subunit, blocking protein synthesis; broad-spectrum including MDR Gram-negatives (not Pseudomonas).',
  'Ertapenem': 'Carbapenem β-lactam that inhibits penicillin-binding proteins, blocking peptidoglycan synthesis; broad-spectrum including ESBL-producing Enterobacterales (once-daily).',
  'Meropenem': 'Carbapenem that inhibits penicillin-binding proteins, disrupting cell-wall synthesis; broad Gram-negative (including Pseudomonas) and Gram-positive coverage.',
  'Imipenem/Cilastatin': 'Carbapenem (imipenem) inhibits PBPs; cilastatin blocks renal dehydropeptidase-I, preventing imipenem degradation and nephrotoxicity.',
  'Cefepime': 'Fourth-generation cephalosporin that inhibits penicillin-binding proteins; enhanced activity against Gram-negative bacilli including Pseudomonas.',
  'Ceftazidime': 'Third-generation cephalosporin with potent anti-pseudomonal activity via penicillin-binding protein inhibition.',
  'Cefotaxime': 'Third-generation cephalosporin that inhibits PBPs, with broad Gram-negative and CNS penetration (meningitis).',
  'Ceftriaxone': 'Long-acting third-generation cephalosporin that inhibits penicillin-binding proteins; broad spectrum, once-daily dosing, good CSF penetration.',
  'Cefixime': 'Oral third-generation cephalosporin that inhibits cell-wall synthesis; used for gonorrhoea, typhoid and otitis media.',
  'Cefpodoxime': 'Oral third-generation cephalosporin prodrug (proxetil ester) that inhibits penicillin-binding proteins; broad-spectrum respiratory and urinary coverage.',
  'Cefuroxime': 'Second-generation cephalosporin that inhibits penicillin-binding proteins; good for respiratory, skin and surgical prophylaxis.',
  'Cefoxitin': 'Cephamycin (second-generation) that inhibits PBPs, with anaerobic coverage; used for surgical prophylaxis and pelvic infections.',
  'Cefazolin': 'First-generation cephalosporin that inhibits penicillin-binding proteins; the standard perioperative surgical prophylaxis agent.',
  'Cephalexin': 'First-generation cephalosporin that inhibits cell-wall synthesis; used for skin, soft tissue and urinary infections.',
  'Amikacin': 'Aminoglycoside that binds the 30S ribosomal subunit, causing mRNA misreading and protein-synthesis inhibition; bactericidal, used for serious MDR Gram-negative infections.',
  'Gentamicin': 'Aminoglycoside that binds the 30S ribosomal subunit, inducing mRNA misreading; concentration-dependent bactericidal activity against Gram-negatives.',
  'Tobramycin': 'Aminoglycoside that inhibits protein synthesis via 30S subunit binding; used for Pseudomonas infections and cystic fibrosis.',
  'Neomycin': 'Aminoglycoside that inhibits bacterial protein synthesis; used topically and for bowel decontamination (poorly absorbed).',
  'Doxycycline': 'Tetracycline that binds the 30S ribosomal subunit, blocking aminoacyl-tRNA binding and protein synthesis; broad-spectrum, anti-inflammatory (acne, malaria prophylaxis, rickettsia).',
  'Minocycline': 'Lipophilic tetracycline that inhibits 30S ribosomal protein synthesis; good CNS and tissue penetration, used for acne, MRSA and rickettsial infections.',
  'Tetracycline': 'Broad-spectrum antibiotic that binds the 30S ribosomal subunit, preventing aminoacyl-tRNA attachment and protein synthesis.',
  'Chloramphenicol': 'Broad-spectrum antibiotic that binds the 50S ribosomal subunit, inhibiting peptidyl transferase and protein synthesis; used for typhoid, meningitis and rickettsiosis (aplastic anaemia risk).',
  'Azithromycin': 'Macrolide that binds the 50S ribosomal subunit, blocking protein synthesis; broad-spectrum with long tissue half-life, anti-inflammatory and immunomodulatory effects.',
  'Clarithromycin': 'Macrolide that inhibits 50S ribosomal protein synthesis; used for respiratory infections and H. pylori eradication (CYP3A4 inhibitor).',
  'Erythromycin': 'Macrolide that binds the 50S ribosomal subunit, inhibiting protein synthesis; motilin-agonist (prokinetic) activity; used for respiratory, pertussis and campylobacter infections.',
  'Clindamycin': 'Lincosamide that binds the 50S ribosomal subunit, blocking peptide bond formation; bacteriostatic against Gram-positives and anaerobes; used in bone infections, MRSA and toxoplasmosis.',
  'Ciprofloxacin': 'Fluoroquinolone that inhibits DNA gyrase (topoisomerase II), blocking DNA replication; broad-spectrum including Pseudomonas and typhoid.',
  'Levofloxacin': 'Fluoroquinolone that inhibits DNA gyrase and topoisomerase IV, blocking bacterial DNA replication; broad respiratory and urinary coverage.',
  'Moxifloxacin': 'Fluoroquinolone that inhibits topoisomerase II/IV, with enhanced Gram-positive and atypical respiratory coverage.',
  'Ofloxacin': 'Fluoroquinolone that inhibits DNA gyrase; used for urinary, ocular and enteric infections.',
  'Norfloxacin': 'Fluoroquinolone that inhibits DNA gyrase; used primarily for urinary tract infections.',
  'Nitrofurantoin': 'Reduced by bacterial nitroreductases to reactive intermediates that damage DNA, ribosomal proteins and metabolic enzymes; urine-specific, used for uncomplicated UTI.',
  'Fosfomycin': 'Phosphonic acid derivative that inhibits MurA (UDP-N-acetylglucosamine enolpyruvyl transferase), blocking the first committed step of peptidoglycan synthesis; single-dose UTI therapy.',
  'Metronidazole': 'Nitroimidazole prodrug reduced intracellularly by anaerobic/fungal ferredoxin to reactive radicals that damage DNA; active against anaerobes and protozoa (amoeba, giardia, trichomonas).',
  'Tinidazole': 'Second-generation nitroimidazole with the same DNA-damaging mechanism as metronidazole but a longer half-life, allowing shorter courses.',
  'Trimethoprim': 'Selective inhibitor of bacterial dihydrofolate reductase, blocking tetrahydrofolate synthesis and DNA production; used alone or with sulfamethoxazole.',
  'Co-trimoxazole': 'Sulfamethoxazole + trimethoprim combination producing sequential folate-pathway blockade — synergistic bactericidal action against many Gram-positive/negative organisms, PCP and toxoplasmosis.',
  'Cotrimoxazole Prophylaxis': 'Low-dose co-trimoxazole maintaining sequential folate blockade to prevent PCP, toxoplasmosis and bacterial infections in HIV and immunocompromised patients.',
  'Piperacillin/Tazobactam': 'Piperacillin (ureidopenicillin) inhibits cell-wall synthesis; tazobactam is a β-lactamase inhibitor that protects piperacillin from ESBL enzymes — broad anti-pseudomonal coverage.',
  'Amoxicillin': 'Aminopenicillin that inhibits penicillin-binding proteins, blocking peptidoglycan cross-linking — bactericidal against Gram-positive and some Gram-negative organisms.',
  'Ampicillin': 'Aminopenicillin that inhibits cell-wall synthesis via penicillin-binding protein binding; extended Gram-negative spectrum versus benzylpenicillin.',
  'Benzylpenicillin': 'Penicillin G that binds penicillin-binding proteins, inhibiting peptidoglycan cross-linking; narrow-spectrum bactericidal against streptococci, meningococci and spirochaetes.',
  'Phenoxymethylpenicillin': 'Penicillin V, acid-stable oral penicillin that inhibits cell-wall synthesis; used for streptococcal pharyngitis and prophylaxis.',
  'Flucloxacillin': 'Isoxazolyl penicillinase-resistant penicillin that inhibits cell-wall synthesis; the agent of choice for staphylococcal (MSSA) infections.',
  'Cloxacillin': 'Penicillinase-resistant penicillin that inhibits penicillin-binding proteins; anti-staphylococcal (MSSA) agent.',
  'Dicloxacillin': 'Penicillinase-resistant penicillin for MSSA skin/soft-tissue infections; inhibits peptidoglycan cross-linking.',
  'Vancomycin': 'Binds D-Ala-D-Ala precursors, blocking transpeptidation and cell-wall synthesis in Gram-positive organisms.',
  'Daptomycin': 'Calcium-dependent insertion into the Gram-positive membrane causing depolarisation and rapid bactericidal lysis.',
  'Teicoplanin': 'Glycopeptide that inhibits peptidoglycan cross-linking; active against MRSA, enterococci and C. difficile.',
  'Linezolid': 'Binds 50S subunit preventing 70S initiation complex formation — inhibits protein synthesis in MRSA/VRE.',
  'Doxycycline': 'Inhibits 30S ribosomal aminoacyl-tRNA binding, blocking protein synthesis; anti-inflammatory and antimalarial properties.',
  'Tigecycline': '30S ribosomal inhibitor with broad-spectrum (including MDR) coverage; tissue-penetrant.',
  'Tetracycline': '30S ribosomal inhibitor blocking aminoacyl-tRNA attachment; broad-spectrum bacteriostatic.',
  'Chloramphenicol': '50S peptidyl-transferase inhibitor — broad-spectrum bacteriostatic with serious haematologic toxicity.',
  'Azithromycin': '50S ribosomal protein-synthesis inhibitor; long half-life, tissue concentration, immunomodulation.',
  'Clarithromycin': '50S ribosomal inhibitor; active against atypical pathogens and H. pylori.',
  'Erythromycin': '50S ribosomal inhibitor; motilin agonist.',
  'Clindamycin': '50S ribosomal inhibitor blocking peptide-bond formation; anti-toxin effect in streptococcal/staphylococcal toxic shock.',
  'Ciprofloxacin': 'DNA gyrase (topoisomerase II) inhibitor blocking DNA replication.',
  'Levofloxacin': 'Topoisomerase II/IV inhibitor; broad-spectrum fluoroquinolone.',
  'Moxifloxacin': 'Topoisomerase II/IV inhibitor with enhanced Gram-positive activity.',
  'Ofloxacin': 'DNA gyrase inhibitor; urinary and ocular use.',
  'Nitrofurantoin': 'Bacterial nitroreductase-generated reactive species damage DNA and enzymes in urine.',
  'Fosfomycin': 'MurA inhibitor blocking the first step of peptidoglycan synthesis.',
  'Metronidazole': 'Intracellular reduction generates DNA-damaging reactive radicals in anaerobes and protozoa.',
  'Tinidazole': 'DNA-damaging nitroimidazole with longer half-life.',
  'Trimethoprim': 'Bacterial dihydrofolate reductase inhibitor.',
  'Co-trimoxazole': 'Sequential folate blockade (sulphonamide + DHFR inhibitor).',
  'Piperacillin/Tazobactam': 'PBP inhibition + β-lactamase protection.',

  // Exact-name entries for drugs whose DB name differs from common aliases
  Ibuprofen: 'Non-selective COX-1/COX-2 inhibitor (NSAID) that reversibly blocks prostaglandin synthesis, providing analgesic, anti-inflammatory and antipyretic effects.',
  'Trimethoprim–Sulfamethoxazole (TMP–SMX)': 'Sequential folate-pathway blockade: sulfamethoxazole inhibits bacterial dihydropteroate synthase while trimethoprim inhibits dihydrofolate reductase, producing synergistic bactericidal action against a wide range of Gram-positive and Gram-negative organisms, PCP and toxoplasmosis.',
  'CEFTOBIPROLE MEDOCARIL SODIUM': 'Fifth-generation cephalosporin prodrug (medocaril ester) that inhibits penicillin-binding proteins, with activity against MRSA and broad Gram-negative coverage including Pseudomonas.',
  NITAZOXANIDE: 'Thiazolide antiprotozoal that inhibits pyruvate:ferredoxin oxidoreductase (PFOR)-dependent electron transfer, disrupting anaerobic energy metabolism in protozoa (cryptosporidium, giardia) and some helminths.',
  'DELAFLOXACIN MEGLUMINE': 'Fluoroquinolone that inhibits DNA gyrase and topoisomerase IV, blocking bacterial DNA replication; used for mycobacterial infections.',
  Permethrin: 'Synthetic pyrethroid that prolongs open sodium-channel activation in arthropod nerve membranes, causing repetitive firing, paralysis and death of scabies mites and lice.',
  'LEFAMULIN ACETATE': 'Pleuromutilin antibiotic that binds the 50S ribosomal subunit peptidyl transferase centre, inhibiting bacterial protein synthesis; used for Mycoplasma and zoonotic pneumonias.',
  PLAZOMICIN: 'Next-generation aminoglycoside (apramycin-derived) that binds the 30S ribosomal subunit causing mRNA misreading; engineered to evade common aminoglycoside-modifying enzymes for MDR Gram-negative infections.',
  'Benzoyl Peroxide': 'Oxidising agent that releases free oxygen radicals, killing Cutibacterium acnes and oxidising follicular keratin — comedolytic and antibacterial treatment for acne.',
  Calamine: 'Soothing zinc-oxide-based lotion with mild astringent and anti-pruritic properties, used topically for minor skin irritation and urticarial itching.',
  Loperamide: 'Synthetic opioid (piperidine) that activates μ-opioid receptors in the gut wall, inhibiting peristalsis and increasing intestinal transit time; does not cross the blood–brain barrier at therapeutic doses (antidiarrhoeal).',
  Methimazole: 'Thionamide that inhibits thyroid peroxidase, blocking iodide oxidation, organification and coupling — reducing thyroid hormone synthesis in hyperthyroidism (Graves disease).',
  Aspirin: 'Irreversibly acetylates and inactivates platelet and endothelial COX-1/COX-2, blocking thromboxane A2 and prostaglandin synthesis — antiplatelet, analgesic, anti-inflammatory and antipyretic effects.',
  'Nitrous Oxide': 'Inhalational anaesthetic/analgesic gas that inhibits NMDA receptors (and enhances GABA-A) in the CNS, providing rapid analgesia and amnesia with minimal cardiovascular depression.',
  Budesonide: 'Synthetic corticosteroid with high glucocorticoid-receptor affinity and extensive first-pass hepatic metabolism; suppresses airway and gut inflammation in asthma, COPD, IBD and allergic rhinitis.',
  'Magnesium Hydroxide': 'Alkaline magnesium salt (milk of magnesia) that neutralises gastric acid (antacid) and draws water into the intestinal lumen by osmosis, acting as a saline laxative.',
  'Polymyxin B': 'Polymyxin antibiotic that binds lipopolysaccharide and phospholipids of the Gram-negative outer membrane, disrupting membrane integrity — bactericidal against MDR Gram-negative bacteria (topical/ophthalmic use).',
  Senna: 'Stimulant (anthraquinone) laxative whose sennosides are activated by colonic bacteria to rhein-anthrone, stimulating colonic myenteric plexus and fluid secretion — effective within 6–12 hours.',
  Efavirenz: 'Non-nucleoside reverse transcriptase inhibitor (NNRTI) that binds the HIV-1 reverse transcriptase allosteric pocket, blocking DNA polymerase activity; component of first-line HIV regimens (CNS side effects).',
  Quinine: 'Quinoline alkaloid that inhibits haem detoxification in the Plasmodium food vacuole, accumulating toxic haem; also blocks skeletal muscle sodium channels (cramps) and is used for chloroquine-resistant falciparum malaria.',
  Chlorhexidine: 'Bisbiguanide antiseptic that binds negatively charged bacterial cell membranes, disrupting permeability and precipitating cytoplasmic contents — broad-spectrum bactericidal with persistent residual activity.',
  'Salicylic Acid': 'Keratolytic that dissolves intercellular cement in the stratum corneum and lowers skin pH, promoting desquamation; also has mild anti-inflammatory and comedolytic effects.',
  'Povidone-Iodine': 'Iodophor antiseptic that slowly releases free iodine, which oxidises and iodinates microbial proteins, lipids and nucleic acids — broad-spectrum bactericidal, fungicidal and virucidal.',
  Ipratropium: 'Short-acting antimuscarinic that competitively blocks bronchial M3 muscarinic receptors, reducing vagal cholinergic bronchoconstriction and mucus secretion — bronchodilator in COPD and asthma.',
  Lidocaine: 'Amide local anaesthetic and class IB antiarrhythmic that blocks voltage-gated sodium channels, preventing action-potential generation and propagation in nerves and cardiac tissue.',
  Cetirizine: 'Second-generation (non-sedating) histamine H₁ receptor antagonist for allergic rhinitis, urticaria and pruritus; minimal CNS penetration.',
  Adrenaline: 'Non-selective α- and β-adrenergic receptor agonist: α₁ vasoconstriction (anaphylaxis, adjunct to local anaesthetics), β₂ bronchodilation, β₁ inotropic/chronotropic cardiac stimulation; also used in cardiac arrest.',
  'Coal Tar': 'Keratolytic and antiproliferative agent that slows epidermal turnover and reduces inflammation in psoriasis, eczema and seborrhoeic dermatitis.',
  Minoxidil: 'Potassium-channel opener (prodrug, active sulfate) that hyperpolarises vascular smooth muscle causing vasodilation; topically prolongs the anagen hair-cycle phase and enlarges follicles for androgenetic alopecia.',
  'Cyanocobalamin (Vitamin B₁₂)': 'Vitamin B₁₂ converted to methylcobalamin and adenosylcobalamin — cofactors for methionine synthase (homocysteine remethylation) and methylmalonyl-CoA mutase; required for DNA synthesis, myelin and haematopoiesis.',
  Clobazam: 'Benzodiazepine (1,5-isomer) that enhances GABA-A receptor chloride currents, providing anticonvulsant and anxiolytic effects with less sedation than classic 1,4-benzodiazepines; adjunctive therapy in Lennox–Gastaut syndrome.',
  Pyrimethamine: 'Antifolate that selectively inhibits plasmodial dihydrofolate reductase; used with sulfadoxine or dapsone for malaria prophylaxis/treatment and with sulfadiazine for toxoplasmosis.',
  'Folic Acid (Vitamin B₉)': 'Folate reduced to tetrahydrofolate (THF), a one-carbon carrier essential for purine/thymidylate synthesis and amino-acid metabolism; prevents neural-tube defects and treats megaloblastic anaemia.',
  Thyroxine: 'Synthetic levothyroxine (T4) that is peripherally deiodinated to active T3, which binds nuclear thyroid-hormone receptors to regulate metabolism, growth and development — replacement therapy for hypothyroidism.',
  Clotrimazole: 'Imidazole antifungal that inhibits fungal cytochrome P450 14α-demethylase, blocking ergosterol synthesis and disrupting fungal cell-membrane integrity and function.',
  'Calcium Carbonate': 'Calcium salt that neutralises gastric acid (antacid) and provides elemental calcium; requires gastric acid for absorption (taken with meals).',
  Adenosine: 'Purine nucleoside that activates A1/A2A adenosine receptors, slowing AV nodal conduction and interrupting AV-reentrant tachycardias; also causes coronary vasodilation (stress testing).',
  Miconazole: 'Imidazole antifungal that inhibits 14α-demethylase, blocking ergosterol synthesis; used for vulvovaginal, oral and cutaneous candidiasis and dermatophyte infections.',
  Deferoxamine: 'Iron chelator that binds ferric iron (hexadentate), forming ferrioxamine excreted in urine and bile; used for acute iron poisoning and chronic transfusional iron overload.',
  Ethanol: 'CNS depressant that potentiates GABA-A receptors and inhibits NMDA receptors; as an antidote it competitively inhibits alcohol dehydrogenase, preventing toxic methanol/ethylene-glycol metabolite formation.',
  Bacitracin: 'Polypeptide antibiotic that inhibits bacterial cell-wall synthesis by blocking dephosphorylation of the bactoprenol carrier (C55-isoprenyl pyrophosphatase), preventing peptidoglycan precursor transport; topical use.',
  Ranitidine: 'Histamine H₂-receptor antagonist that blocks gastric parietal-cell acid secretion, used for peptic ulcer disease and GERD (largely withdrawn for NDMA impurities).',
  'Zinc Sulfate': 'Zinc salt that supplies elemental zinc — a cofactor for >300 enzymes, immune function, wound healing and epithelial integrity; treats zinc deficiency and adjunctively childhood diarrhoea.',
  Hydrocortisone: 'Short-acting glucocorticoid that binds the glucocorticoid receptor, suppressing phospholipase A2, cytokine and prostaglandin production — anti-inflammatory, immunosuppressive and mineralocorticoid (high-dose) actions.',
  'Activated Charcoal': 'High-surface-area adsorbent that binds drugs and toxins in the gastrointestinal lumen via van der Waals forces, reducing systemic absorption when given within 1 hour of ingestion.',
  'Hydrogen Peroxide': 'Oxidising antiseptic that releases nascent oxygen, disrupting microbial membranes and proteins; effervescent action mechanically debrides wounds.',
  Esomeprazole: 'Proton-pump inhibitor (S-enantiomer of omeprazole) that irreversibly inhibits the gastric H⁺/K⁺-ATPase pump, profoundly suppressing acid secretion for peptic ulcer and GERD.',
  Omeprazole: 'Proton-pump inhibitor that irreversibly inhibits the gastric H⁺/K⁺-ATPase (acid pump), suppressing basal and stimulated gastric acid secretion; prodrug activated in the acidic canaliculus.',
  Formoterol: 'Long-acting β₂-adrenergic agonist that relaxes bronchial smooth muscle (cAMP-mediated), providing 12-hour bronchodilation; rapid onset makes it suitable for maintenance and as-needed use.',
  Diclofenac: 'Non-selective COX inhibitor (NSAID) that blocks prostaglandin synthesis, providing potent analgesic, anti-inflammatory and antipyretic effects; used for arthritis, dysmenorrhoea and acute pain.',
  'Epinephrine Injection': 'Non-selective α- and β-adrenergic receptor agonist: α₁-mediated vasoconstriction (anaphylaxis, cardiac arrest), β₂-mediated bronchodilation and β₁-mediated inotropy/chronotropy; the first-line agent in anaphylaxis and cardiac arrest.',
}

const OVERRIDES: Record<string, string> = {
  // FDA returned a poor/short label — replace with the curated mechanism above.
  Cefiderocol: MOA.Cefiderocol,
  Bosentan: MOA.Bosentan,
}

async function main() {
  // Fetch all rows whose MOA is placeholder/empty
  const all: any[] = []
  for (let from = 0; from < 5000; from += 1000) {
    const { data } = await admin
      .from('drug_monographs')
      .select('id, generic_name, name, mechanism_of_action')
      .range(from, from + 999)
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < 1000) break
  }

  const state: { done: string[] } = fs.existsSync(STATE_FILE)
    ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
    : { done: [] }
  const done = new Set(state.done)

  const targets = all.filter((r) => {
    if (done.has(r.id)) return false
    const moa = r.mechanism_of_action || ''
    return !moa.trim() || moa.length < 60 || /refer to current/i.test(moa) || /Mechanism of action for/i.test(moa)
  })

  let ok = 0
  let skipped = 0
  for (const r of targets) {
    const name = r.generic_name || r.name
    const curated = MOA[name] || MOA[OVERRIDES[name] || ''] || MOA[name.replace(/\s+/g, ' ').trim()]
    if (!curated) {
      skipped++
      console.log(`[no-entry] ${name}`)
      done.add(r.id)
      continue
    }
    try {
      const { error } = await admin.from('drug_monographs').update({ mechanism_of_action: curated }).eq('id', r.id)
      if (error) throw error
      ok++
      console.log(`[ok] ${name}`)
    } catch (e: any) {
      console.log(`[err] ${name}: ${e.message}`)
    }
    done.add(r.id)
    fs.writeFileSync(STATE_FILE, JSON.stringify({ done: [...done] }, null, 2))
    await new Promise((r2) => setTimeout(r2, 100))
  }
  console.log(`\n[done] filled=${ok} no_entry=${skipped} total_targets=${targets.length}`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
