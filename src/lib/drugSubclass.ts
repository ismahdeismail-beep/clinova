// Pharmacological subclass classification for the Kenya Drug Index (KDI).
//
// The app's 17 browse categories ("Anti-infectives", "Cardiovascular", ...)
// each hold dozens to 150+ monographs (e.g. 152 anti-infectives), so browsing
// dumps a long flat list. This module adds an ATC-style subclass layer beneath
// each category (e.g. Anti-infectives → Penicillins / Cephalosporins /
// Carbapenems / Macrolides ...) using ordered keyword rules over the drug's own
// name/class data — mirroring the drugCategory.ts pattern. Subclass counts are
// ALWAYS derived at render time, never hardcoded.

import { getDrugCategory, type CategoryTarget, type TherapeuticCategory } from './drugCategory'

export interface SubclassRule {
  /** Display name of the subclass, e.g. "Penicillins" */
  subclass: string
  /** Keywords matched against name / generic_name / drug_class / brand_names */
  keywords: string[]
}

// Per-category ordered rules. First match wins; rules are ordered most-specific
// first (e.g. antimalarials before sulfonamides so sulfadoxine lands correctly,
// ICS before LABA so steroid-combo inhalers classify as corticosteroids).
export const SUBCLASS_GROUPS: Record<TherapeuticCategory, SubclassRule[]> = {
  'Anti-infectives': [
    {
      subclass: 'Penicillins',
      keywords: [
        'penicillin', 'amoxicillin', 'ampicillin', 'cloxacillin', 'flucloxacillin',
        'dicloxacillin', 'oxacillin', 'nafcillin', 'piperacillin', 'ticarcillin',
        'carbenicillin', 'mezlocillin', 'azlocillin',
      ],
    },
    {
      subclass: 'Cephalosporins',
      keywords: ['cephalosporin', 'cef', 'cepha'],
    },
    {
      subclass: 'Carbapenems',
      keywords: ['carbapenem', 'penem'],
    },
    {
      subclass: 'Macrolides',
      keywords: ['macrolide', 'thromycin', 'fidaxomicin', 'spiramycin', 'solithromycin', 'telithromycin'],
    },
    {
      subclass: 'Aminoglycosides',
      keywords: [
        'aminoglycoside', 'gentamicin', 'amikacin', 'tobramycin', 'streptomycin',
        'neomycin', 'kanamycin', 'netilmicin', 'paromomycin', 'plazomicin', 'sisomicin',
      ],
    },
    {
      subclass: 'Tetracyclines',
      keywords: [
        'tetracycline', 'doxycycline', 'minocycline', 'lymecycline', 'limecycline',
        'tigecycline', 'eravacycline', 'sarecycline', 'omadacycline', 'demeclocycline',
        'oxytetracycline',
      ],
    },
    {
      subclass: 'Fluoroquinolones',
      keywords: ['fluoroquinolone', 'quinolone', 'floxacin', 'nalidixic'],
    },
    {
      subclass: 'Antimalarials',
      keywords: [
        'antimalarial', 'artemether', 'lumefantrine', 'artesunate', 'artemisinin',
        'dihydroartemisinin', 'piperaquine', 'quinine', 'chloroquine', 'hydroxychloroquine',
        'amodiaquine', 'mefloquine', 'primaquine', 'proguanil', 'atovaquone',
        'pyrimethamine', 'sulfadoxine',
      ],
    },
    {
      subclass: 'Sulfonamides & folate inhibitors',
      keywords: [
        'sulfonamide', 'sulphonamide', 'sulfamethoxazole', 'sulfadiazine',
        'co-trimoxazole', 'cotrimoxazole', 'trimethoprim', 'sulfa', 'sulpha',
      ],
    },
    {
      subclass: 'Anti-MRSA agents',
      keywords: [
        'glycopeptide', 'vancomycin', 'teicoplanin', 'dalbavancin', 'oritavancin',
        'telavancin', 'linezolid', 'tedizolid', 'daptomycin', 'streptogramin',
        'quinupristin', 'dalfopristin',
      ],
    },
    {
      subclass: 'Antivirals (HIV)',
      keywords: [
        'antiretroviral', 'abacavir', 'lamivudine', 'zidovudine', 'stavudine',
        'tenofovir', 'efavirenz', 'nevirapine', 'etravirine', 'rilpivirine',
        'dolutegravir', 'raltegravir', 'bictegravir', 'elvitegravir', 'cabotegravir',
        'lopinavir', 'ritonavir', 'atazanavir', 'darunavir', 'fosamprenavir',
        'indinavir', 'nelfinavir', 'saquinavir', 'maraviroc', 'enfuvirtide',
        'lenacapavir', 'fostemsavir', 'ibalizumab', 'reverse transcriptase',
        'integrase', 'protease inhibitor', 'hiv',
      ],
    },
    {
      subclass: 'Antivirals (herpes, flu & other)',
      keywords: [
        'aciclovir', 'acyclovir', 'valaciclovir', 'valacyclovir', 'famciclovir',
        'ganciclovir', 'valganciclovir', 'foscarnet', 'brivudine', 'oseltamivir',
        'zanamivir', 'baloxavir', 'remdesivir', 'nirmatrelvir', 'molnupiravir',
        'favipiravir', 'entecavir', 'sofosbuvir', 'ledipasvir', 'daclatasvir',
        'ribavirin', 'glecaprevir', 'pibrentasvir', 'voxilaprevir', 'velpatasvir',
        'hepatitis', 'antiviral',
      ],
    },
    {
      subclass: 'Antifungals (azoles)',
      keywords: [
        'azole', 'triazole', 'conazole', 'fluconazole', 'itraconazole', 'ketoconazole',
        'voriconazole', 'posaconazole', 'miconazole', 'clotrimazole', 'isavuconazole',
        'oteseconazole', 'ravuconazole', 'sertaconazole', 'econazole', 'ibrexafungerp',
      ],
    },
    {
      subclass: 'Antifungals (polyenes & other)',
      keywords: [
        'amphotericin', 'nystatin', 'caspofungin', 'micafungin', 'anidulafungin',
        'rezafungin', 'echinocandin', 'terbinafine', 'griseofulvin', 'flucytosine',
        'allylamine', 'antifungal', 'antimycotic',
      ],
    },
    {
      subclass: 'Antituberculars & antileprosy',
      keywords: [
        'antitubercular', 'tuberculosis', 'isoniazid', 'rifampicin', 'rifampin',
        'rifabutin', 'rifapentine', 'ethambutol', 'pyrazinamide', 'bedaquiline',
        'delamanid', 'pretomanid', 'clofazimine', 'cycloserine', 'ethionamide',
        'capreomycin', 'dapsone', 'antileprosy', 'leprosy', 'rifamycin',
      ],
    },
    {
      subclass: 'Anthelmintics',
      keywords: [
        'anthelmintic', 'antihelmintic', 'albendazole', 'mebendazole', 'ivermectin',
        'praziquantel', 'niclosamide', 'diethylcarbamazine', 'levamisole', 'pyrantel',
        'suramin', 'benzimidazole',
      ],
    },
    {
      subclass: 'Nitroimidazoles & antiprotozoals',
      keywords: [
        'nitroimidazole', 'metronidazole', 'tinidazole', 'ornidazole', 'secnidazole',
        'nitazoxanide', 'antiprotozoal', 'pentamidine',
      ],
    },
    {
      subclass: 'Other antibiotics',
      keywords: [
        'clindamycin', 'lincomycin', 'lincosamide', 'chloramphenicol', 'polymyxin',
        'colistin', 'colistimethate', 'bacitracin', 'fosfomycin', 'fusidic',
        'mupirocin', 'retapamulin', 'nitrofuran', 'nitrofurantoin', 'furazolidone',
        'antibiotic', 'antibacterial', 'antimicrobial',
      ],
    },
    {
      subclass: 'Antiseptics & disinfectants',
      keywords: [
        'antiseptic', 'disinfectant', 'chlorhexidine', 'povidone-iodine', 'cetrimide',
        'hydrogen peroxide', 'potassium permanganate', 'benzalkonium', 'iodine',
      ],
    },
  ],

  Cardiovascular: [
    {
      subclass: 'ACE inhibitors',
      keywords: [
        'ace inhibitor', 'captopril', 'enalapril', 'lisinopril', 'perindopril',
        'ramipril', 'quinapril', 'fosinopril', 'moexipril', 'trandolapril',
        'imidapril', 'delapril', 'benazepril', 'cilazapril', 'zofenopril',
      ],
    },
    {
      subclass: 'Angiotensin receptor blockers',
      keywords: [
        'angiotensin receptor blocker', 'arb', 'losartan', 'valsartan', 'telmisartan',
        'irbesartan', 'candesartan', 'olmesartan', 'azilsartan', 'eprosartan', 'sacubitril',
      ],
    },
    {
      subclass: 'Beta-blockers',
      keywords: [
        'beta-blocker', 'beta blocker', 'beta-adrenergic', 'atenolol', 'metoprolol',
        'propranolol', 'carvedilol', 'bisoprolol', 'labetalol', 'nebivolol', 'sotalol',
        'timolol', 'pindolol', 'acebutolol', 'nadolol', 'celiprolol', 'betaxolol', 'esmolol',
      ],
    },
    {
      subclass: 'Calcium channel blockers',
      keywords: [
        'calcium channel', 'amlodipine', 'nifedipine', 'felodipine', 'verapamil',
        'diltiazem', 'nimodipine', 'isradipine', 'lercanidipine', 'lacidipine',
        'cilnidipine', 'nicardipine', 'nitrendipine',
      ],
    },
    {
      subclass: 'Diuretics',
      keywords: [
        'diuretic', 'furosemide', 'frusemide', 'torsemide', 'bumetanide',
        'hydrochlorothiazide', 'chlorthalidone', 'indapamide', 'metolazone',
        'bendroflumethiazide', 'spironolactone', 'eplerenone', 'amiloride',
        'triamterene', 'mannitol', 'thiazide', 'loop diuretic', 'osmotic diuretic',
      ],
    },
    {
      subclass: 'Statins & lipid-lowering',
      keywords: [
        'statin', 'atorvastatin', 'simvastatin', 'rosuvastatin', 'pravastatin',
        'fluvastatin', 'lovastatin', 'pitavastatin', 'ezetimibe', 'fenofibrate',
        'gemfibrozil', 'bempedoic acid', 'lomitapide', 'evolocumab', 'alirocumab',
        'inclisiran', 'pcsk9', 'cholestyramine', 'lipid-lowering', 'omega-3', 'omega 3',
      ],
    },
    {
      subclass: 'Antiarrhythmics',
      keywords: [
        'antiarrhythmic', 'amiodarone', 'flecainide', 'procainamide', 'disopyramide',
        'propafenone', 'dronedarone', 'mexiletine', 'adenosine', 'quinidine', 'lidocaine',
      ],
    },
    {
      subclass: 'Nitrates & anti-anginals',
      keywords: [
        'nitrate', 'nitroglycerin', 'nitroglycerine', 'isosorbide', 'ranolazine',
        'ivabradine', 'nicorandil', 'trimetazidine', 'anti-anginal', 'antianginal', 'angina',
      ],
    },
    {
      subclass: 'Inotropes & vasopressors',
      keywords: [
        'inotrope', 'digoxin', 'dobutamine', 'dopamine', 'milrinone', 'adrenaline',
        'epinephrine', 'noradrenaline', 'norepinephrine', 'vasopressor', 'pressor',
        'metaraminol', 'omecamtiv', 'levosimendan', 'midodrine', 'cardiac glycoside',
        'vasopressin', 'phenylephrine', 'terlipressin',
      ],
    },
    {
      subclass: 'Alpha-blockers & central agents',
      keywords: [
        'alpha-blocker', 'alpha blocker', 'alpha-adrenergic', 'alpha-1', 'doxazosin',
        'prazosin', 'terazosin', 'tamsulosin', 'alfuzosin', 'clonidine', 'methyldopa',
        'moxonidine', 'guanfacine', 'central alpha', 'sympatholytic', 'urapidil',
      ],
    },
    {
      subclass: 'Vasodilators & PAH agents',
      keywords: [
        'vasodilator', 'hydralazine', 'minoxidil', 'nitroprusside', 'diazoxide',
        'bosentan', 'ambrisentan', 'macitentan', 'riociguat', 'selexipag', 'epoprostenol',
        'iloprost', 'treprostinil', 'sildenafil', 'tadalafil', 'vardenafil',
        'pulmonary hypertension', 'endothelin', 'prostacyclin',
      ],
    },
    {
      subclass: 'Thrombolytics',
      keywords: [
        'thrombolytic', 'fibrinolytic', 'alteplase', 'streptokinase', 'tenecteplase',
        'reteplase', 'urokinase', 'tissue plasminogen', 'clot lysis',
      ],
    },
    {
      subclass: 'Antiplatelets',
      keywords: [
        'antiplatelet', 'aspirin cardiovascular', 'clopidogrel', 'ticagrelor',
        'prasugrel', 'ticlopidine', 'dipyridamole', 'cilostazol', 'glycoprotein iib/iiia',
        'abciximab', 'eptifibatide', 'tirofiban', 'cangrelor',
      ],
    },
    {
      subclass: 'Anticoagulants',
      keywords: [
        'anticoagulant', 'heparin', 'enoxaparin', 'dalteparin', 'tinzaparin',
        'fondaparinux', 'warfarin', 'dabigatran', 'rivaroxaban', 'apixaban', 'edoxaban',
      ],
    },
    {
      subclass: 'Anticoagulant reversal & haemostatics',
      keywords: [
        'andexanet', 'idarucizumab', 'aminocaproic', 'tranexamic', 'antifibrinolytic',
        'protamine', 'vitamin k reversal', 'haemostatic', 'hemostatic',
      ],
    },
    {
      subclass: 'Immunosuppressants & transplant agents',
      keywords: [
        'cyclosporine', 'ciclosporin', 'mycophenolate', 'mycophenolic', 'sirolimus',
        'tacrolimus', 'immunosuppress',
      ],
    },
    {
      subclass: 'Other cardiovascular agents',
      keywords: [
        'cardiovascular', 'antihypertensive', 'heart failure', 'vericiguat', 'cardiac',
      ],
    },
  ],

  'Central Nervous System': [
    {
      subclass: 'Antidepressants (SSRIs & SNRIs)',
      keywords: [
        'ssri', 'snri', 'serotonin', 'fluoxetine', 'sertraline', 'citalopram',
        'escitalopram', 'paroxetine', 'fluvoxamine', 'venlafaxine', 'duloxetine',
        'milnacipran', 'levomilnacipran', 'desvenlafaxine', 'vortioxetine', 'vilazodone',
      ],
    },
    {
      subclass: 'Antidepressants (tricyclics & others)',
      keywords: [
        'tricyclic', 'amitriptyline', 'nortriptyline', 'imipramine', 'clomipramine',
        'doxepin', 'trimipramine', 'desipramine', 'protriptyline', 'mirtazapine',
        'bupropion', 'trazodone', 'nefazodone', 'mianserin', 'agomelatine',
        'monoamine oxidase inhibitor', 'maoi', 'phenelzine', 'tranylcypromine',
        'isocarboxazid', 'moclobemide', 'antidepressant', 'brexanolone', 'zuranolone',
        'esketamine', 'reboxetine', 'tianeptine', 'adenosylmethionine',
      ],
    },
    {
      subclass: 'Antipsychotics',
      keywords: [
        'antipsychotic', 'chlorpromazine', 'haloperidol', 'fluphenazine', 'perphenazine',
        'trifluoperazine', 'thioridazine', 'zuclopenthixol', 'flupentixol',
        'risperidone', 'olanzapine', 'quetiapine', 'aripiprazole', 'clozapine',
        'paliperidone', 'ziprasidone', 'lurasidone', 'cariprazine', 'brexpiprazole',
        'amisulpride', 'sulpiride', 'loxapine', 'asenapine', 'pimozide',
        'phenothiazine', 'butyrophenone', 'blonanserin', 'iloperidone', 'pimavanserin',
        'xanomeline',
      ],
    },
    {
      subclass: 'Mood stabilisers & antiepileptics',
      keywords: [
        'mood stabiliser', 'mood stabilizer', 'lithium', 'valproate', 'valproic',
        'divalproex', 'carbamazepine', 'oxcarbazepine', 'lamotrigine', 'topiramate',
        'phenytoin', 'fosphenytoin', 'levetiracetam', 'gabapentin', 'pregabalin',
        'phenobarbital', 'phenobarbitone', 'primidone', 'ethosuximide', 'zonisamide',
        'lacosamide', 'eslicarbazepine', 'perampanel', 'brivaracetam', 'vigabatrin',
        'tiagabine', 'rufinamide', 'antiepileptic', 'anticonvulsant', 'anti-epileptic',
        'cannabidiol', 'cenobamate', 'fenfluramine', 'ganaxolone', 'stiripentol',
      ],
    },
    {
      subclass: 'Anxiolytics & hypnotics',
      keywords: [
        'benzodiazepine', 'diazepam', 'lorazepam', 'alprazolam', 'clonazepam',
        'nitrazepam', 'temazepam', 'oxazepam', 'bromazepam', 'clobazam', 'midazolam',
        'flunitrazepam', 'chlordiazepoxide', 'triazolam', 'flurazepam', 'quazepam',
        'prazepam', 'remimazolam', 'hydroxyzine',
      ],
    },
    {
      subclass: 'Sedatives & hypnotics (non-benzodiazepine)',
      keywords: [
        'zolpidem', 'zopiclone', 'eszopiclone', 'zaleplon', 'barbiturate',
        'thiopental', 'thiopentone', 'chloral hydrate', 'promethazine', 'triclofos',
        'melatonin', 'ramelteon', 'buspirone', 'sedative', 'hypnotic',
        'daridorexant', 'lemorexant', 'lemborexant', 'suvorexant', 'orexin', 'oxybate',
      ],
    },
    {
      subclass: 'Anti-Parkinson agents',
      keywords: [
        'parkinson', 'levodopa', 'l-dopa', 'carbidopa', 'benserazide', 'entacapone',
        'tolcapone', 'ropinirole', 'pramipexole', 'rotigotine', 'apomorphine',
        'selegiline', 'rasagiline', 'safinamide', 'amantadine', 'trihexyphenidyl',
        'benztropine', 'procyclidine', 'biperiden', 'opicapone', 'pergolide',
      ],
    },
    {
      subclass: 'Antimigraine agents',
      keywords: [
        'migraine', 'triptan', 'sumatriptan', 'rizatriptan', 'zolmitriptan',
        'naratriptan', 'eletriptan', 'almotriptan', 'frovatriptan', 'ergotamine',
        'dihydroergotamine', 'pizotifen', 'flunarizine', 'propranolol migraine',
        'erenumab', 'galcanezumab', 'fremanezumab', 'eptinezumab', 'gepant',
        'rimegepant', 'ubrogepant', 'lasmiditan',
      ],
    },
    {
      subclass: 'Stimulants & ADHD agents',
      keywords: [
        'stimulant', 'amphetamine', 'methylphenidate', 'dexmethylphenidate',
        'lisdexamfetamine', 'dexamfetamine', 'atomoxetine', 'guanfacine',
        'clonidine adhd', 'modafinil', 'armodafinil', 'adhd', 'attention deficit',
        'analeptic', 'caffeine', 'theophylline stimulant', 'pemoline', 'pitolisant',
        'solriamfetol',
      ],
    },
    {
      subclass: 'Drugs for dementia & cognition',
      keywords: [
        'dementia', 'alzheimer', 'donepezil', 'rivastigmine', 'galantamine',
        'memantine', 'tacrine', 'acetylcholinesterase inhibitor', 'cholinesterase inhibitor', 'cognition',
      ],
    },
    {
      subclass: 'Antispastics & neuromuscular agents',
      keywords: [
        'antispastic', 'baclofen', 'tizanidine', 'dantrolene', 'tolperisone',
        'eperisone', 'botulinum', 'botox', 'spasticity', 'muscle relaxant',
        'central muscle', 'cerebral palsy',
      ],
    },
    {
      subclass: 'Addiction & substance-use agents',
      keywords: [
        'acamprosate', 'disulfiram', 'varenicline', 'naltrexone', 'bupropion smoking',
        'nicotine', 'addiction', 'dependence', 'alcohol', 'smoking cessation',
      ],
    },
  ],

  Analgesics: [
    {
      subclass: 'Opioids',
      keywords: [
        'opioid', 'opiate', 'morphine', 'codeine', 'dihydrocodeine', 'fentanyl',
        'pethidine', 'meperidine', 'tramadol', 'oxycodone', 'hydrocodone', 'hydromorphone',
        'buprenorphine', 'methadone', 'nalbuphine', 'pentazocine', 'tapentadol',
        'papaveretum', 'dipipanone', 'dextropropoxyphene', 'remifentanil', 'sufentanil',
        'alfentanil', 'heroin substitute', 'opioid agonist', 'opioid antagonist',
        'naloxone', 'naltrexone', 'morphine-like', 'levorphanol', 'meptazinol', 'tilidine',
        'butorphanol', 'cebranopadol', 'oliceridine', 'difelikefalin',
      ],
    },
    {
      subclass: 'NSAIDs',
      keywords: [
        'nsaid', 'nonsteroidal', 'non-steroidal', 'ibuprofen', 'diclofenac',
        'naproxen', 'indomethacin', 'indometacin', 'ketoprofen', 'ketorolac',
        'piroxicam', 'meloxicam', 'celecoxib', 'etoricoxib', 'parecoxib', 'flurbiprofen',
        'fenoprofen', 'mefenamic', 'naproxen', 'sulindac', 'tenoxicam', 'nimesulide',
        'diclofenac', 'loxoprofen', 'aceclofenac', 'coxib', 'salicylate', 'aspirin',
      ],
    },
    {
      subclass: 'Paracetamol & other simple analgesics',
      keywords: [
        'paracetamol', 'acetaminophen', 'phenacetin', 'metamizole', 'dipyrone',
        'nefopam', 'flupirtine', 'simple analgesic',
      ],
    },
    {
      subclass: 'Antimigraine agents (triptans & ergots)',
      keywords: [
        'migraine', 'triptan', 'sumatriptan', 'rizatriptan', 'zolmitriptan',
        'naratriptan', 'eletriptan', 'almotriptan', 'frovatriptan', 'ergotamine',
        'dihydroergotamine',
      ],
    },
    {
      subclass: 'Muscle relaxants & antispastics',
      keywords: [
        'muscle relaxant', 'antispastic', 'baclofen', 'tizanidine', 'cyclobenzaprine',
        'orphenadrine', 'dantrolene', 'tolperisone', 'eperisone', 'carisoprodol',
      ],
    },
    {
      subclass: 'Topical & local analgesics',
      keywords: [
        'topical analgesic', 'local analgesic', 'capsaicin', 'lidocaine', 'lignocaine',
        'prilocaine', 'emla', 'menthol',
      ],
    },
    {
      subclass: 'Other analgesics',
      keywords: ['analgesic', 'analgesia', 'pain relief', 'pain management'],
    },
  ],

  Gastrointestinal: [
    {
      subclass: 'Proton pump inhibitors',
      keywords: [
        'proton pump inhibitor', 'ppi', 'omeprazole', 'esomeprazole', 'lansoprazole',
        'pantoprazole', 'rabeprazole', 'dexlansoprazole', 'ilaprazole', 'prazole',
      ],
    },
    {
      subclass: 'H2 antagonists',
      keywords: [
        'h2 antagonist', 'h2-receptor', 'h2 blocker', 'cimetidine', 'ranitidine',
        'famotidine', 'nizatidine', 'roxatidine',
      ],
    },
    {
      subclass: 'Antacids & alginates',
      keywords: [
        'antacid', 'alginate', 'aluminium hydroxide', 'aluminum hydroxide',
        'magnesium hydroxide', 'magnesium trisilicate', 'calcium carbonate',
        'sodium bicarbonate', 'hydrotalcite', 'simethicone antacid', 'magaldrate',
      ],
    },
    {
      subclass: 'Antiemetics & prokinetics',
      keywords: [
        'antiemetic', 'anti-emetic', 'prokinetic', 'metoclopramide', 'domperidone',
        'ondansetron', 'granisetron', 'palonosetron', 'dolasetron', 'aprepitant',
        'fosaprepitant', 'netupitant', 'cyclizine', 'prochlorperazine', 'hyoscine',
        'scopolamine', 'dimenhydrinate', 'promethazine antiemetic', 'setron',
        'neurokinin', 'cinnarizine',
      ],
    },
    {
      subclass: 'Laxatives',
      keywords: [
        'laxative', 'senna', 'bisacodyl', 'lactulose', 'polyethylene glycol',
        'macrogol', 'magnesium sulfate laxative', 'magnesium sulphate',
        'docusate', 'glycerin laxative', 'glycerol laxative', 'psyllium', 'ispaghula',
        'methylcellulose laxative', 'linaclotide', 'prucalopride', 'osmotic laxative',
        'stimulant laxative', 'bulk-forming', 'sorbitol laxative', 'constipation',
        'lactitol', 'lubiprostone', 'plecanatide', 'tenapanor', 'sodium picosulfate',
        'glycerol suppository', 'glycerin suppository', 'secretagogue',
      ],
    },
    {
      subclass: 'Antidiarrhoeals',
      keywords: [
        'antidiarrhoeal', 'antidiarrheal', 'loperamide', 'diphenoxylate', 'racecadotril',
        'attapulgite', 'kaolin', 'bismuth', 'diarrhoea', 'diarrhea', 'oral rehydration',
        'eluxadoline',
      ],
    },
    {
      subclass: 'Antispasmodics (GI)',
      keywords: [
        'antispasmodic', 'hyoscine butylbromide', 'buscopan', 'mebeverine',
        'dicyclomine', 'dicycloverine', 'propantheline', 'otilonium', 'pinaverium',
        'trimebutine', 'peppermint oil', 'alverine', 'irritable bowel',
      ],
    },
    {
      subclass: 'Ulcer protectants & other GI agents',
      keywords: [
        'sucralfate', 'bismuth subsalicylate', 'bismuth subcitrate', 'misoprostol',
        'carbenoxolone', 'colloidal bismuth', 'mesalazine', 'mesalamine',
        'sulfasalazine', 'olsalazine', 'balsalazide', 'infliximab gi', 'adalimumab gi',
        'vedolizumab', 'ustekinumab gi', 'anti-ulcer', 'ulcer',
      ],
    },
    {
      subclass: 'Other gastrointestinal agents',
      keywords: [
        'gastrointestinal', 'gastric', 'digestive', 'intestinal', 'bowel', 'biliary',
        'cholestyramine', 'colestyramine', 'ursodeoxycholic', 'ursodiol',
        'pancreatic enzymes', 'pancreatin', 'lipase', 'rapacurium', 'vonoprazan',
        'ammonia-lowering',
      ],
    },
  ],

  Respiratory: [
    {
      subclass: 'Inhaled corticosteroids',
      keywords: [
        'inhaled corticosteroid', 'ics', 'beclometasone', 'beclomethasone',
        'budesonide', 'fluticasone', 'mometasone', 'ciclesonide', 'flunisolide',
        'triamcinolone inhaled',
      ],
    },
    {
      subclass: 'Beta-2 agonists (short-acting)',
      keywords: ['salbutamol', 'albuterol', 'terbutaline', 'fenoterol', 'short-acting', 'saba'],
    },
    {
      subclass: 'Beta-2 agonists (long-acting)',
      keywords: [
        'long-acting', 'laba', 'formoterol', 'salmeterol', 'indacaterol',
        'olodaterol', 'vilanterol', 'arformoterol', 'bambuterol', 'clenbuterol',
        'salmeterol', 'beta-2 agonist', 'beta2 agonist',
      ],
    },
    {
      subclass: 'Antimuscarinics (anticholinergics)',
      keywords: [
        'antimuscarinic', 'anticholinergic', 'ipratropium', 'tiotropium',
        'umeclidinium', 'aclidinium', 'glycopyrronium', 'glycopyrrolate', 'muscarinic',
      ],
    },
    {
      subclass: 'Leukotriene modifiers & mast-cell stabilisers',
      keywords: [
        'leukotriene', 'montelukast', 'zafirlukast', 'zileuton', 'cromoglicate',
        'cromolyn', 'nedocromil', 'ketotifen', 'mast cell',
      ],
    },
    {
      subclass: 'Antihistamines',
      keywords: [
        'antihistamine', 'chlorphenamine', 'chlorpheniramine', 'cetirizine',
        'loratadine', 'desloratadine', 'fexofenadine', 'levocetirizine', 'diphenhydramine',
        'hydroxyzine', 'promethazine', 'clemastine', 'brompheniramine',
        'cyproheptadine', 'dimethindene', 'bilastine', 'rupatadine', 'histamine h1',
        'antiallergic', 'anti-allergic',
      ],
    },
    {
      subclass: 'Antitussives & mucolytics',
      keywords: [
        'antitussive', 'cough', 'dextromethorphan', 'pholcodine', 'codeine cough',
        'noscapine', 'butamirate', 'mucolytic', 'acetylcysteine', 'carbocisteine',
        'carbocysteine', 'erdosteine', 'bromhexine', 'ambroxol', 'guaifenesin',
        'expectorant', 'demulcent', 'benzonatate', 'gefapixant', 'nebulised saline',
        'nebulized saline',
      ],
    },
    {
      subclass: 'Biologics & targeted asthma agents',
      keywords: [
        'omalizumab', 'mepolizumab', 'benralizumab', 'reslizumab', 'tezepelumab',
        'dupilumab', 'itepekimab', 'biologic respiratory', 'monoclonal antibody respiratory',
        'interstitial lung',
      ],
    },
    {
      subclass: 'Respiratory stimulants & other agents',
      keywords: [
        'respiratory stimulant', 'theophylline', 'aminophylline', 'doxofylline',
        'xanthine', 'caffeine respiratory', 'nikethamide', 'analeptic respiratory',
        'ensifentrine', 'roflumilast',
      ],
    },
    {
      subclass: 'Other respiratory agents',
      keywords: [
        'respiratory', 'inhaled', 'inhaler', 'bronchodilator', 'pulmonary', 'nasal',
        'nepidemnib', 'pirtobrutinib',
      ],
    },
  ],

  'Anticoagulants': [
    {
      subclass: 'Heparins',
      keywords: [
        'heparin', 'enoxaparin', 'dalteparin', 'tinzaparin', 'nadroparin',
        'bemiparin', 'fondaparinux', 'low molecular weight heparin', 'lmwh',
      ],
    },
    {
      subclass: 'Vitamin K antagonists',
      keywords: ['warfarin', 'coumarin', 'nicoumalone', 'acenocoumarol', 'phenindione', 'anticoagulant vitamin k', 'vitamin k antagonist'],
    },
    {
      subclass: 'Direct oral anticoagulants',
      keywords: [
        'doac', 'noac', 'direct oral anticoagulant', 'novel oral anticoagulant',
        'dabigatran', 'rivaroxaban', 'apixaban', 'edoxaban', 'betrixaban',
      ],
    },
    {
      subclass: 'Antiplatelets',
      keywords: [
        'antiplatelet', 'aspirin antiplatelet', 'clopidogrel', 'ticagrelor',
        'prasugrel', 'ticlopidine', 'dipyridamole', 'cilostazol', 'glycoprotein iib/iiia',
        'abciximab', 'eptifibatide', 'tirofiban', 'cangrelor', 'platelet',
      ],
    },
    {
      subclass: 'Thrombolytics',
      keywords: [
        'thrombolytic', 'fibrinolytic', 'streptokinase', 'alteplase', 'tenecteplase',
        'reteplase', 'urokinase', 'tissue plasminogen', 'clot lysis',
      ],
    },
    {
      subclass: 'Antithrombin agents & other',
      keywords: [
        'antithrombin', 'argatroban', 'bivalirudin', 'lepirudin', 'desirudin',
        'protamine', 'thrombopoietin', 'romiplostim', 'eltrombopag', 'aviptadil',
      ],
    },
  ],

  Oncology: [
    {
      subclass: 'Alkylating agents',
      keywords: [
        'alkylating', 'cyclophosphamide', 'ifosfamide', 'melphalan', 'chlorambucil',
        'busulfan', 'carmustine', 'lomustine', 'temozolomide', 'dacarbazine',
        'streptozocin', 'nitrosourea', 'oxaliplatin', 'cisplatin', 'carboplatin',
        'platin', 'mustine', 'bendamustine', 'thiotepa', 'procarbazine',
      ],
    },
    {
      subclass: 'Antimetabolites',
      keywords: [
        'antimetabolite', 'methotrexate', 'pemetrexed', 'pralatrexate', '5-fu',
        'fluorouracil', 'capecitabine', 'gemcitabine', 'cytarabine', 'fludarabine',
        'cladribine', 'clofarabine', 'azacitidine', 'decitabine', 'mercaptopurine',
        '6-mercaptopurine', 'thioguanine', 'nelarabine', 'hydroxyurea', 'hydroxycarbamide',
        'trifluridine', 'tipiracil',
      ],
    },
    {
      subclass: 'Antitumour antibiotics',
      keywords: [
        'antitumour antibiotic', 'antitumor antibiotic', 'doxorubicin', 'daunorubicin',
        'epirubicin', 'idarubicin', 'mitoxantrone', 'bleomycin', 'mitomycin',
        'dactinomycin', 'actinomycin', 'valrubicin', 'anthracycline', 'plicamycin',
      ],
    },
    {
      subclass: 'Taxanes & vinca alkaloids',
      keywords: [
        'taxane', 'paclitaxel', 'docetaxel', 'cabazitaxel', 'nab-paclitaxel',
        'vinca', 'vincristine', 'vinblastine', 'vinorelbine', 'vindesine', 'vinflunine',
      ],
    },
    {
      subclass: 'Kinase inhibitors & targeted therapy',
      keywords: [
        'kinase inhibitor', 'imatinib', 'dasatinib', 'nilotinib', 'erlotinib',
        'gefitinib', 'afatinib', 'osimertinib', 'crizotinib', 'ceritinib',
        'alectinib', 'lorlatinib', 'sorafenib', 'sunitinib', 'pazopanib',
        'axitinib', 'cabozantinib', 'lenvatinib', 'vandetanib', 'regorafenib',
        'ibrutinib', 'acalabrutinib', 'zanubrutinib', 'idelalisib', 'palbociclib',
        'ribociclib', 'abemaciclib', 'everolimus', 'temsirolimus', 'vemurafenib',
        'dabrafenib', 'trametinib', 'cobimetinib', 'binimetinib', 'trastuzumab',
        'pertuzumab', 'cetuximab', 'panitumumab', 'rituximab', 'bevacizumab',
        'nivolumab', 'pembrolizumab', 'atezolizumab', 'durvalumab', 'avelumab',
        'monoclonal antibody oncology', 'immunotherapy', 'checkpoint inhibitor',
        'targeted therapy', 'mab oncology', 'infliximab oncology',
      ],
    },
    {
      subclass: 'Hormonal agents & antihormones',
      keywords: [
        'tamoxifen', 'toremifene', 'raloxifene', 'anastrozole', 'letrozole',
        'exemestane', 'fulvestrant', 'bicalutamide', 'flutamide', 'nilutamide',
        'enzalutamide', 'apalutamide', 'darolutamide', 'abiraterone', 'goserelin',
        'leuprolide', 'leuprorelin', 'triptorelin', 'histrelin', 'degarelix',
        'megestrol', 'medroxyprogesterone oncology', 'serm', 'aromatase inhibitor',
        'lhrh', 'gnrh', 'antiandrogen', 'anti-androgen', 'cyproterone',
      ],
    },
    {
      subclass: 'Topoisomerase inhibitors',
      keywords: [
        'topoisomerase', 'irinotecan', 'topotecan', 'etoposide', 'teniposide',
        'camptothecin', 'epipodophyllotoxin', 'doxorubicin topoisomerase',
      ],
    },
    {
      subclass: 'Miscellaneous antineoplastics',
      keywords: [
        'antineoplastic', 'chemotherapy', 'l-asparaginase', 'asparaginase',
        'pegaspargase', 'bortezomib', 'carfilzomib', 'ixazomib', 'thalidomide',
        'lenalidomide', 'pomalidomide', 'anagrelide', 'arsenic trioxide',
        'trabectedin', 'eribulin', 'pemetrexed misc', 'altretamine', 'dactinomycin misc',
        'bevacizumab misc', 'cancer', 'tumour', 'tumor', 'leukaemia', 'leukemia',
        'lymphoma', 'myeloma',
      ],
    },
  ],

  'Immunology': [
    {
      subclass: 'Corticosteroids (systemic)',
      keywords: [
        'prednisolone', 'prednisone', 'hydrocortisone systemic', 'dexamethasone systemic',
        'betamethasone systemic', 'methylprednisolone', 'triamcinolone systemic',
        'cortisone', 'fludrocortisone', 'corticosteroid', 'glucocorticoid', 'steroid',
      ],
    },
    {
      subclass: 'DMARDs (disease-modifying antirheumatic drugs)',
      keywords: [
        'dmard', 'methotrexate dmard', 'sulfasalazine dmard', 'hydroxychloroquine dmard',
        'leflunomide', 'azathioprine', 'cyclosporine', 'ciclosporin', 'tacrolimus',
        'mycophenolate', 'mycophenolic', 'gold', 'aurothiomalate', 'penicillamine',
        'antirheumatic', 'anti-rheumatic',
      ],
    },
    {
      subclass: 'Biologic DMARDs & targeted agents',
      keywords: [
        'biologic', 'biological', 'infliximab', 'etanercept', 'adalimumab',
        'certolizumab', 'golimumab', 'abatacept', 'rituximab immunology', 'tocilizumab',
        'sarilumab', 'secukinumab', 'ustekinumab', 'brodalumab', 'ixekizumab',
        'guselkumab', 'tildrakizumab', 'risankizumab', 'anakinra', 'canakinumab',
        'belimumab', 'upadacitinib', 'tofacitinib', 'baricitinib', 'filgotinib',
        'jak inhibitor', 'monoclonal antibody immunology', 'tnf inhibitor',
      ],
    },
    {
      subclass: 'Immunosuppressants (transplant & autoimmunity)',
      keywords: [
        'immunosuppressant', 'azathioprine transplant', 'mycophenolate transplant',
        'sirolimus', 'rapamycin', 'everolimus transplant', 'tacrolimus transplant',
        'cyclosporine transplant', 'ciclosporin transplant', 'belatacept', 'basiliximab',
        'antithymocyte', 'mofetil', 'transplant',
      ],
    },
    {
      subclass: 'Immunoglobulins & vaccines',
      keywords: [
        'immunoglobulin', 'vaccine', 'immunisation', 'immunization', 'antivenom',
        'immunosera', 'antiserum', 'antitoxin', 'rabies immunoglobulin',
        'tetanus immunoglobulin', 'passive immunity',
      ],
    },
    {
      subclass: 'Immunostimulants & interferons',
      keywords: [
        'immunostimulant', 'interferon', 'peginterferon', 'interleukin', 'bcg',
        'levamisole immunostimulant', 'pidotimod', 'immunomodulator', 'immunostimulatory',
      ],
    },
  ],

  Dermatology: [
    {
      subclass: 'Topical corticosteroids',
      keywords: [
        'topical corticosteroid', 'topical steroid', 'hydrocortisone topical',
        'betamethasone topical', 'clobetasol', 'clobetasone', 'mometasone topical',
        'fluticasone topical', 'triamcinolone topical', 'fluocinolone', 'fludroxycortide',
        'flurandrenolide', 'diflucortolone', 'halcinonide', 'beclometasone topical',
        'desonide', 'desoximetasone', 'emollient steroid',
      ],
    },
    {
      subclass: 'Antifungals (topical)',
      keywords: [
        'clotrimazole topical', 'miconazole topical', 'ketoconazole topical',
        'econazole topical', 'sertaconazole topical', 'terbinafine topical',
        'nystatin topical', 'amorolfine', 'ciclopirox', 'tolnaftate', 'undecylenic',
        'griseofulvin topical', 'benzoic acid', 'salicylic acid antifungal',
      ],
    },
    {
      subclass: 'Antibacterials (topical)',
      keywords: [
        'mupirocin topical', 'fusidic topical', 'gentamicin topical', 'neomycin topical',
        'bacitracin topical', 'polymyxin topical', 'retapamulin topical',
        'silver sulfadiazine', 'topical antibiotic', 'framycetin', 'chloramphenicol topical',
      ],
    },
    {
      subclass: 'Antivirals (topical)',
      keywords: [
        'aciclovir topical', 'acyclovir topical', 'penciclovir', 'docosanol',
        'topical antiviral', 'podophyllotoxin', 'imiquimod', 'sinecatechins',
      ],
    },
    {
      subclass: 'Acne & rosacea agents',
      keywords: [
        'acne', 'benzoyl peroxide', 'isotretinoin', 'tretinoin', 'adapalene',
        'tazarotene', 'clindamycin topical acne', 'erythromycin topical acne',
        'salicylic acid acne', 'azelaic acid', 'sulfur acne', 'rosacea',
        'topical retinoid', 'retinoid',
      ],
    },
    {
      subclass: 'Eczema, psoriasis & emollients',
      keywords: [
        'eczema', 'psoriasis', 'emollient', 'calcipotriol', 'calcipotriene',
        'calcineurin inhibitor topical', 'pimecrolimus', 'tacrolimus topical',
        'coal tar', 'dithranol', 'salicylic acid psoriasis', 'urea topical', 'petroleum jelly',
        'paraffin', 'cetomacrogol', 'aqueous cream',
      ],
    },
    {
      subclass: 'Antiseborrheic & antidandruff agents',
      keywords: [
        'antidandruff', 'dandruff', 'seborrheic', 'seborrhoeic', 'selenium sulfide',
        'zinc pyrithione', 'ketoconazole shampoo', 'salicylic acid dandruff', 'ciclopirox dandruff',
      ],
    },
    {
      subclass: 'Hair & nail preparations',
      keywords: [
        'minoxidil topical', 'finasteride', 'dutasteride', 'hair loss', 'alopecia',
        'nail lacquer', 'ciclopirox nail', 'amorolfine nail', 'keratin',
      ],
    },
    {
      subclass: 'Other dermatologicals',
      keywords: [
        'calamine', 'zinc oxide', 'cetrimide topical', 'chlorhexidine topical',
        'ichthammol', 'sunscreen', 'sunblock', 'scabicide', 'scabies', 'permethrin',
        'benzyl benzoate', 'crotamiton', 'lindane', 'malathion topical', 'pediculicide',
        'lice', 'wart', 'cryotherapy', 'cantharidin', 'dermatological',
      ],
    },
  ],

  'Renal/Electrolytes': [
    {
      subclass: 'Potassium & potassium-sparing agents',
      keywords: ['potassium', 'kcl', 'potassium-sparing', 'spironolactone renal', 'eplerenone renal'],
    },
    {
      subclass: 'Calcium & calcium-modifying agents',
      keywords: [
        'calcium gluconate', 'calcium carbonate renal', 'calcium chloride',
        'calcium lactate', 'calcium citrate', 'calcium supplement', 'calcimimetic', 'cinacalcet',
      ],
    },
    {
      subclass: 'Magnesium & other electrolytes',
      keywords: [
        'magnesium sulfate', 'magnesium sulphate', 'magnesium chloride', 'magnesium oxide',
        'sodium chloride', 'sodium bicarbonate renal', 'phosphate', 'phosphate binder',
        'sevelamer', 'lanthanum', 'sucroferric', 'electrolyte', 'sodium phosphate',
        'potassium phosphate', 'bicarbonate',
      ],
    },
    {
      subclass: 'Fluid & dialysis agents',
      keywords: [
        'dialysis', 'peritoneal', 'haemodialysis', 'hemodialysis', 'intravenous fluid',
        'iv fluid', 'ringer', 'ringer\'s', 'lactate', 'dextrose', 'glucose iv',
        'normal saline', 'hypertonic saline', 'plasma expander', 'colloid', 'gelatin fluid', 'starch fluid',
      ],
    },
    {
      subclass: 'Renal bone disease & metabolic agents',
      keywords: [
        'renal bone', 'calcitriol', 'alfacalcidol', 'paricalcitol', 'doxercalciferol',
        'vitamin d renal', 'cinacalcet renal', 'hyperphosphataemia', 'hyperphosphatemia',
        'hypocalcaemia', 'hypocalcemia',
      ],
    },
    {
      subclass: 'Diuretics & carbonic anhydrase inhibitors',
      keywords: ['acetazolamide', 'carbonic anhydrase'],
    },
    {
      subclass: 'Antigout agents',
      keywords: [
        'antigout', 'gout', 'urate', 'uric acid', 'xanthine oxidase', 'allopurinol',
        'febuxostat', 'colchicine', 'probenecid', 'lesinurad', 'pegloticase',
      ],
    },
  ],

  'Nutrition/Vitamins': [
    {
      subclass: 'Iron & haematinics',
      keywords: [
        'iron', 'ferrous', 'ferric', 'ferric carboxymaltose', 'ferrous sulfate',
        'ferrous sulphate', 'ferrous fumarate', 'ferrous gluconate', 'iron dextran',
        'iron sucrose', 'haematinic', 'hematinic', 'carbonyl iron', 'iron polymaltose',
      ],
    },
    {
      subclass: 'Folic acid & B-vitamins',
      keywords: [
        'folic acid', 'folate', 'folinic acid', 'calcium folinate', 'vitamin b',
        'cyanocobalamin', 'hydroxocobalamin', 'b12', 'thiamine', 'riboflavin',
        'pyridoxine', 'biotin', 'niacin', 'pantothenic', 'cobalamin', 'vitamin b1',
        'vitamin b2', 'vitamin b6', 'vitamin b12', 'b-complex', 'b complex',
      ],
    },
    {
      subclass: 'Vitamin A, D & fat-soluble vitamins',
      keywords: [
        'vitamin a', 'retinol', 'beta-carotene', 'vitamin d', 'calciferol',
        'ergocalciferol', 'colecalciferol', 'cholecalciferol', 'calcitriol supplement',
        'alfacalcidol supplement', 'vitamin e', 'tocopherol', 'vitamin k', 'phytonadione',
        'menadiol', 'fat-soluble vitamin',
      ],
    },
    {
      subclass: 'Vitamin C & antioxidants',
      keywords: [
        'vitamin c', 'ascorbic acid', 'sodium ascorbate', 'calcium ascorbate',
        'antioxidant', 'zinc vitamin', 'selenium supplement',
      ],
    },
    {
      subclass: 'Trace elements & minerals',
      keywords: [
        'zinc sulfate', 'zinc sulphate', 'zinc gluconate', 'zinc supplement', 'copper',
        'selenium', 'chromium', 'manganese', 'molybdenum', 'fluoride', 'iodine supplement',
        'trace element', 'electrolyte trace',
      ],
    },
    {
      subclass: 'Enteral & parenteral nutrition',
      keywords: [
        'enteral', 'parenteral nutrition', 'tpn', 'amino acid', 'amino acids',
        'total parenteral', 'lipid emulsion', 'intralipid', 'soya oil', 'feed', 'supplement drink',
      ],
    },
    {
      subclass: 'Other nutritional supplements',
      keywords: [
        'nutritional', 'nutrition', 'supplement', 'multivitamin', 'cod liver oil',
        'omega-3', 'omega 3', 'fish oil', 'glucosamine', 'probiotic', 'protein supplement',
        'essential amino', 'branched-chain', 'nutritional support',
      ],
    },
  ],

  Endocrine: [
    {
      subclass: 'Insulins',
      keywords: [
        'insulin', 'glargine', 'lispro', 'aspart', 'glulisine', 'detemir', 'degludec',
        'isophane', 'biphasic', 'pre-mixed insulin', 'short-acting insulin',
        'intermediate-acting insulin', 'long-acting insulin', 'rapid-acting',
      ],
    },
    {
      subclass: 'Oral antidiabetics',
      keywords: [
        'oral antidiabetic', 'metformin', 'biguanide', 'sulphonylurea', 'sulfonylurea',
        'glibenclamide', 'glyburide', 'glimepiride', 'gliclazide', 'glipizide',
        'gliquidone', 'chlorpropamide', 'tolbutamide', 'pioglitazone', 'rosiglitazone',
        'thiazolidinedione', 'sitagliptin', 'vildagliptin', 'saxagliptin', 'linagliptin',
        'dpp-4', 'dpp4', 'empagliflozin', 'dapagliflozin', 'canagliflozin', 'ertugliflozin',
        'sglt2', 'sglt-2', 'sodium-glucose', 'exenatide', 'liraglutide', 'dulaglutide',
        'semaglutide', 'lixisenatide', 'glp-1', 'glp1', 'acarbose', 'miglitol',
        'alpha-glucosidase', 'repaglinide', 'nateglinide', 'meglitinide', 'diabetes',
        'glycaemic', 'glycemic', 'hypoglycaemic', 'hypoglycemic',
      ],
    },
    {
      subclass: 'Thyroid hormones',
      keywords: [
        'thyroid', 'thyroxine', 'levothyroxine', 'liothyronine', 'liotrix',
        'triiodothyronine', 'hypothyroidism',
      ],
    },
    {
      subclass: 'Antithyroid agents',
      keywords: [
        'antithyroid', 'carbimazole', 'methimazole', 'propylthiouracil', 'ptu',
        'hyperthyroidism', 'grave', 'iodine radioactive',
      ],
    },
    {
      subclass: 'Bisphosphonates & bone agents',
      keywords: [
        'bisphosphonate', 'alendronate', 'risedronate', 'ibandronate', 'zoledronate',
        'zoledronic', 'pamidronate', 'clodronate', 'etidronate', 'tiludronate',
        'teriparatide', 'denosumab', 'raloxifene bone', 'strontium', 'romosozumab',
        'osteoporosis',
      ],
    },
    {
      subclass: 'Sex hormones & contraceptives',
      keywords: [
        'contraceptive', 'oral contraceptive', 'ethinylestradiol', 'ethinyl estradiol',
        'levonorgestrel', 'norethisterone', 'norethindrone', 'desogestrel', 'gestodene',
        'drospirenone', 'medroxyprogesterone', 'progesterone', 'oestrogen', 'estrogen',
        'oestradiol', 'estradiol', 'conjugated estrogen', 'testosterone', 'danazol',
        'progestin', 'hormone replacement', 'combined hormonal', 'emergency contraceptive',
        'mifepristone', 'ulipristal', 'clomifene', 'clomiphene', 'sex hormone',
        'finasteride', 'dutasteride', '5-alpha reductase',
      ],
    },
    {
      subclass: 'Gonadotropins & reproductive agents',
      keywords: [
        'gonadotropin', 'hcg', 'fsh', 'luteinising', 'luteinizing', 'menotropin',
        'urofollitropin', 'follitropin', 'chorionic', 'buserelin', 'nafarelin',
        'ganirelix', 'cetrorelix', 'cabergoline', 'bromocriptine', 'dostinex',
        'ovulation', 'fertility', 'prolactin',
      ],
    },
    {
      subclass: 'Uterotonics & labour agents',
      keywords: [
        'oxytocin', 'ergometrine', 'ergonovine', 'methylergometrine', 'carboprost',
        'dinoprostone', 'misoprostol obstetric', 'prostaglandin obstetric',
        'uterotonic', 'tocolytic', 'atosiban', 'nifedipine tocolytic', 'indomethacin tocolytic',
        'labour', 'labor', 'postpartum haemorrhage', 'postpartum hemorrhage',
      ],
    },
    {
      subclass: 'Pituitary & other endocrine agents',
      keywords: [
        'pituitary', 'desmopressin', 'vasopressin endocrine', 'antidiuretic',
        'glucagon', 'growth hormone', 'somatropin', 'octreotide', 'lanreotide',
        'pasireotide', 'somatostatin', 'corticotropin', 'acth', 'adrenal insufficiency',
        'hydrocortisone endocrine', 'fludrocortisone endocrine', 'metabolic agent',
        'oxandrolone', 'stanozolol', 'anabolic',
      ],
    },
  ],

  Anaesthesia: [
    {
      subclass: 'General anaesthetics (intravenous)',
      keywords: [
        'general anaesthetic', 'general anesthetic', 'propofol', 'thiopental',
        'thiopentone', 'etomidate', 'ketamine', 'methohexital', 'midazolam anaesthesia',
        'iv anaesthetic', 'intravenous anaesthetic', 'induction agent',
      ],
    },
    {
      subclass: 'General anaesthetics (inhalational)',
      keywords: [
        'inhalational', 'sevoflurane', 'isoflurane', 'desflurane', 'halothane',
        'enflurane', 'nitrous oxide', 'methoxyflurane', 'volatile anaesthetic',
      ],
    },
    {
      subclass: 'Local anaesthetics',
      keywords: [
        'local anaesthetic', 'local anesthetic', 'lidocaine', 'lignocaine',
        'bupivacaine', 'ropivacaine', 'procaine', 'prilocaine', 'mepivacaine',
        'levobupivacaine', 'articaine', 'cinchocaine', 'amethocaine', 'tetracaine',
        'benzocaine', 'eutectic', 'emla',
      ],
    },
    {
      subclass: 'Neuromuscular blockers',
      keywords: [
        'neuromuscular blocker', 'suxamethonium', 'succinylcholine', 'atracurium',
        'cisatracurium', 'rocuronium', 'vecuronium', 'pancuronium', 'mivacurium',
        'tubocurarine', 'muscle relaxant anaesthesia',
      ],
    },
    {
      subclass: 'Anaesthesia adjuncts & reversal agents',
      keywords: [
        'neostigmine', 'pyridostigmine', 'glycopyrrolate anaesthesia', 'atropine anaesthesia',
        'sugammadex', 'flumazenil anaesthesia', 'naloxone anaesthesia', 'dexmedetomidine',
        'sedation', 'premedication',
      ],
    },
  ],

  Ophthalmology: [
    {
      subclass: 'Glaucoma agents',
      keywords: [
        'glaucoma', 'latanoprost', 'travoprost', 'bimatoprost', 'tafluprost',
        'dorzolamide', 'brinzolamide', 'carbonic anhydrase inhibitor ocular',
        'timolol ocular', 'betaxolol ocular', 'pilocarpine', 'brimonidine',
        'apraclonidine', 'prostaglandin analogue ocular', 'intraocular pressure',
        'open-angle', 'miotic',
      ],
    },
    {
      subclass: 'Mydriatics & cycloplegics',
      keywords: [
        'mydriatic', 'cycloplegic', 'tropicamide', 'atropine ocular', 'cyclopentolate',
        'homatropine', 'phenylephrine ocular',
      ],
    },
    {
      subclass: 'Ocular anti-infectives',
      keywords: [
        'ocular antibiotic', 'eye infection', 'chloramphenicol ocular', 'gentamicin ocular',
        'ofloxacin ocular', 'ciprofloxacin ocular', 'moxifloxacin ocular',
        'tobramycin ocular', 'neomycin ocular', 'polymyxin ocular', 'fusidic ocular',
        'aciclovir ocular', 'acyclovir ocular', 'ganciclovir ocular', 'natamycin',
        'amphotericin ocular', 'viral conjunctivitis',
      ],
    },
    {
      subclass: 'Ocular anti-inflammatories',
      keywords: [
        'ocular steroid', 'dexamethasone ocular', 'prednisolone ocular',
        'fluorometholone', 'loteprednol', 'rimexolone', 'ketorolac ocular',
        'diclofenac ocular', 'flurbiprofen ocular', 'indomethacin ocular',
        'cyclosporine ocular', 'tacrolimus ocular', 'nsaid ocular', 'uveitis',
      ],
    },
    {
      subclass: 'Lubricants & other ocular agents',
      keywords: [
        'artificial tears', 'lubricant', 'carbomer', 'hypromellose', 'hyaluronic ocular',
        'sodium hyaluronate', 'carmellose', 'polyvinyl alcohol ocular', 'glycerin ocular',
        'eye drop', 'eye drops', 'ocular', 'ophthalmic', 'ophthalmological',
        'dry eye', 'cataract', 'fluorescein',
      ],
    },
  ],

  'Toxicology/Antidotes': [
    {
      subclass: 'Opioid reversal',
      keywords: ['naloxone', 'naltrexone reversal', 'opioid antagonist toxicology'],
    },
    {
      subclass: 'Poison-specific antidotes',
      keywords: [
        'n-acetylcysteine', 'acetylcysteine toxicology', 'pralidoxime', 'obidoxime',
        'dimercaprol', 'bal', 'succimer', 'dmps', 'deferoxamine', 'desferrioxamine',
        'deferasirox', 'sodium thiosulfate', 'sodium nitrite', 'methylene blue',
        'flumazenil', 'fomepizole', 'calcium edetate', 'edetate', 'penicillamine toxicology',
        'antivenom', 'antivenin', 'digoxin immune fab', 'digibind', 'glucarpidase',
        'phytonadione toxicology', 'vitamin k toxicology', 'prothrombin complex',
        'antidote', 'chelation', 'chelat',
      ],
    },
    {
      subclass: 'Anticholinergic reversal & general',
      keywords: [
        'atropine toxicology', 'physostigmine', 'activated charcoal', 'poison',
        'overdose', 'toxicology', 'cholinesterase reactivator', 'organophosphate',
        'nerve agent',
      ],
    },
  ],

  General: [
    {
      subclass: 'Benzodiazepines & related (general)',
      keywords: ['benzodiazepine', 'diazepam', 'lorazepam', 'midazolam', 'clonazepam', 'alprazolam'],
    },
    {
      subclass: 'Antimuscarinics & anticholinergics (general)',
      keywords: ['antimuscarinic', 'anticholinergic', 'atropine', 'hyoscine', 'scopolamine', 'propantheline'],
    },
    {
      subclass: 'Sympathomimetics & vasoactive agents',
      keywords: ['sympathomimetic', 'adrenergic', 'epinephrine', 'adrenaline', 'noradrenaline', 'norepinephrine', 'isoprenaline', 'isoproterenol', 'phenylephrine', 'ephedrine', 'pseudoephedrine', 'vasoactive', 'inotrope general'],
    },
    {
      subclass: 'Anti-inflammatory agents',
      keywords: ['anti-inflammatory', 'antiinflammatory', 'anti inflammatory'],
    },
    {
      subclass: 'Other general agents',
      keywords: [
        'therapeutic agent', 'pharmaceutical', 'drug', 'agent', 'general',
      ],
    },
  ],
}

// Builds the search haystack used for subclass classification.
function buildHaystack(m: CategoryTarget): string {
  return [
    m.drug_class_name,
    m.drug_class,
    m.name,
    m.generic_name,
  ]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase())
    .join(' ')
}

/** Subclass label for a drug, e.g. "Penicillins" or "Other" when no rule matched. */
export function getDrugSubclass(m: CategoryTarget, category?: TherapeuticCategory): string {
  const haystack = buildHaystack(m)
  if (haystack) {
    const group = category ?? getDrugCategory(m)
    for (const rule of SUBCLASS_GROUPS[group]) {
      for (const kw of rule.keywords) {
        if (haystack.includes(kw)) return rule.subclass
      }
    }
  }
  return 'Other'
}

/** Ordered subclass list for a category (for rendering chips in stable order). */
export function getSubclassesForCategory(category: TherapeuticCategory): string[] {
  return SUBCLASS_GROUPS[category].map((r) => r.subclass)
}

