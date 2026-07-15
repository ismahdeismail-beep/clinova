export const SVG_ARROW = `<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"/></marker></defs>`

function box(x: number, y: number, w: number, h: number, label: string, accent = '#3b82f6') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${accent}18" stroke="${accent}" stroke-width="1.5"/><text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">${label}</text>`
}

function arrow(x1: number, y1: number, x2: number, y2: number) {
  return `<path d="M ${x1} ${y1} L ${x2} ${y2}" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#a)"/>`
}

export const HTN_RAAS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(10, 10, 100, 32, 'Kidney: Renin')}
${box(140, 10, 120, 32, 'Liver: Angiotensinogen')}
${box(290, 10, 120, 32, 'Angiotensin I')}
${box(10, 70, 120, 32, 'Lung ACE', '#8b5cf6')}
${box(160, 70, 120, 32, 'Angiotensin II')}
${box(310, 70, 100, 32, 'AT1 Receptor')}
${box(10, 130, 100, 40, 'Vasoconstriction', '#ef4444')}
${box(140, 130, 100, 40, 'Aldosterone ↑', '#f59e0b')}
${box(280, 130, 100, 40, 'Na⁺/H₂O Retention', '#f59e0b')}
${box(420, 80, 90, 60, 'BP ↑', '#ef4444')}
${arrow(110, 26, 138, 26)}
${arrow(260, 26, 288, 26)}
${arrow(70, 42, 70, 66)}
${arrow(130, 86, 158, 86)}
${arrow(280, 86, 308, 86)}
${arrow(70, 102, 10, 128)}
${arrow(220, 102, 190, 128)}
${arrow(360, 102, 330, 128)}
${arrow(430, 110, 465, 110)}
<text x="20" y="210" font-size="9" fill="#3b82f6" font-weight="bold">Drug Targets:</text>
<rect x="20" y="216" width="70" height="20" rx="4" fill="#3b82f618" stroke="#3b82f6" stroke-width="1"/><text x="55" y="230" text-anchor="middle" font-size="9" fill="#3b82f6">ACEi →↓ACE</text>
<rect x="100" y="216" width="70" height="20" rx="4" fill="#8b5cf618" stroke="#8b5cf6" stroke-width="1"/><text x="135" y="230" text-anchor="middle" font-size="9" fill="#8b5cf6">ARB →↓AT1</text>
<rect x="180" y="216" width="80" height="20" rx="4" fill="#10b98118" stroke="#10b981" stroke-width="1"/><text x="220" y="230" text-anchor="middle" font-size="9" fill="#10b981">CCB → Vasodilate</text>
<rect x="270" y="216" width="70" height="20" rx="4" fill="#f59e0b18" stroke="#f59e0b" stroke-width="1"/><text x="305" y="230" text-anchor="middle" font-size="9" fill="#f59e0b">Thiazide →↓Na⁺</text>
</svg>`

export const HF_GDMT_DIAGRAM = `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(10, 10, 120, 32, 'Heart Failure (HFrEF)', '#ef4444')}
${arrow(130, 26, 170, 26)}
${box(180, 10, 100, 32, 'EF ≤ 40%')}
${arrow(280, 26, 320, 26)}
${box(330, 10, 120, 32, 'Start GDMT Quadruple', '#10b981')}
${box(20, 65, 110, 36, 'ARNI / ACEi', '#3b82f6')}
${box(145, 65, 100, 36, 'Beta-Blocker', '#8b5cf6')}
${box(260, 65, 90, 36, 'MRA', '#f59e0b')}
${box(365, 65, 110, 36, 'SGLT2i', '#10b981')}
${arrow(75, 46, 75, 63)}
${arrow(195, 46, 195, 63)}
${arrow(305, 46, 305, 63)}
${arrow(420, 46, 420, 63)}
${box(100, 125, 90, 36, 'Add Diuretic', '#f97316')}
${box(220, 125, 100, 36, 'If congestion', '#f97316')}
${arrow(145, 101, 145, 123)}
${arrow(270, 101, 270, 123)}
${box(30, 180, 170, 36, 'Add Digoxin if AFib', '#a855f7')}
${box(230, 180, 150, 36, 'Consider ICD/CRT', '#a855f7')}
${arrow(105, 161, 85, 178)}
${arrow(270, 161, 290, 178)}
<text x="20" y="240" font-size="9" fill="#64748b">All four GDMT pillars reduce mortality in HFrEF — start simultaneously, titrate to target doses.</text>
</svg>`

export const DM_TREATMENT_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(180, 5, 130, 30, 'Diagnosis: T2DM', '#3b82f6')}
${arrow(245, 35, 245, 50)}
${box(140, 52, 190, 30, 'Lifestyle + Metformin', '#10b981')}
${arrow(245, 82, 245, 97)}
${box(90, 99, 100, 40, 'ASCVD / HF / CKD?', '#f59e0b')}
${box(280, 99, 120, 40, 'No ASCVD/HF/CKD', '#94a3b8')}
${arrow(190, 119, 155, 119)}
${arrow(280, 119, 270, 119)}
${box(20, 160, 110, 40, 'Add SGLT2i / GLP-1RA', '#3b82f6')}
${box(160, 160, 120, 40, 'Add DPP4i / SU / TZD', '#8b5cf6')}
${box(310, 160, 120, 40, 'Add Basal Insulin', '#ef4444')}
${arrow(75, 139, 55, 158)}
${arrow(220, 139, 210, 158)}
${arrow(370, 139, 370, 158)}
${box(40, 225, 130, 30, 'Target HbA1c < 7%', '#10b981')}
${box(200, 225, 140, 30, 'Avoid hypoglycaemia', '#f59e0b')}
${box(370, 225, 120, 30, 'Individualise goals', '#64748b')}
${arrow(105, 200, 105, 223)}
${arrow(270, 200, 270, 223)}
${arrow(430, 200, 430, 223)}
</svg>`

export const ASTHMA_STEPS = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(10, 5, 110, 30, 'Step 1: SABA PRN', '#94a3b8')}
${arrow(120, 20, 150, 20)}
${box(160, 5, 110, 30, 'Step 2: Low ICS', '#3b82f6')}
${arrow(270, 20, 300, 20)}
${box(310, 5, 120, 30, 'Step 3: Low ICS-LABA', '#8b5cf6')}
${arrow(200, 35, 200, 55)}
${box(160, 57, 120, 30, 'Step 4: Med ICS-LABA', '#f59e0b')}
${arrow(250, 72, 290, 72)}
${box(300, 57, 130, 30, 'Step 5: High ICS-LABA', '#ef4444')}
${arrow(365, 87, 365, 107)}
${box(260, 110, 180, 30, '+ Add-on: LAMA / LTRA / OCS', '#ef4444')}
${box(10, 110, 180, 30, 'Reliever: SABA / ICS-F', '#64748b')}
${box(10, 165, 180, 30, 'Assess: Adherence, Inhaler technique', '#f59e0b')}
${box(210, 165, 180, 30, 'Refer if uncontrolled on Step 4-5', '#ef4444')}
${arrow(100, 140, 100, 163)}
${arrow(300, 140, 300, 163)}
${box(120, 220, 260, 30, 'GINA 2023: ICS-formoterol as reliever at all steps', '#10b981')}
</svg>`

export const COPD_DIAGRAM = `<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'COPD Diagnosis (FEV1/FVC < 0.7)', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(120, 57, 110, 36, 'Group A: LAMA or LABA', '#10b981')}
${box(260, 57, 110, 36, 'Group E: LAMA+LABA + ICS', '#f59e0b')}
${arrow(175, 93, 145, 115)}
${arrow(315, 93, 315, 115)}
${box(80, 118, 130, 36, 'Exacerbations? Add ICS', '#8b5cf6')}
${box(240, 118, 150, 36, 'Refractory: Add Roflumilast/Azithro', '#ef4444')}
${box(80, 175, 310, 30, 'Non-pharm: Smoking cessation, Pulmonary rehab, Vaccination', '#64748b')}
${arrow(145, 154, 145, 173)}
${arrow(315, 154, 315, 173)}
</svg>`

export const EPILEPSY_DIAGRAM = `<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Epilepsy Diagnosis', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(40, 57, 130, 36, 'Focal Seizures', '#f59e0b')}
${box(200, 57, 130, 36, 'Generalised Seizures', '#f59e0b')}
${box(360, 57, 120, 36, 'Absence Seizures', '#f59e0b')}
${arrow(105, 93, 105, 115)}
${arrow(265, 93, 265, 115)}
${arrow(420, 93, 420, 115)}
${box(20, 118, 120, 36, '1st: Lamotrigine / Levetiracetam', '#10b981')}
${box(160, 118, 130, 36, '1st: Valproate / Lamotrigine', '#10b981')}
${box(310, 118, 130, 36, '1st: Ethosuximide / Valproate', '#10b981')}
${arrow(80, 154, 65, 175)}
${arrow(225, 154, 210, 175)}
${arrow(375, 154, 375, 175)}
${box(60, 178, 200, 30, 'Refractory? Add 2nd agent / Refer EEG monitoring', '#ef4444')}
${box(290, 178, 180, 30, 'Women: Avoid Valproate if childbearing', '#ef4444')}
</svg>`

export const TB_DIAGRAM = `<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Tuberculosis Diagnosis', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 140, 36, 'Intensive Phase (2 months)', '#f59e0b')}
${box(200, 57, 140, 36, 'Continuation Phase (4 months)', '#10b981')}
${box(370, 57, 100, 36, 'MDR-TB Regimen', '#ef4444')}
${arrow(100, 93, 60, 118)}
${arrow(270, 93, 250, 118)}
${arrow(420, 93, 420, 118)}
${box(10, 120, 150, 40, 'HRZE: Isoniazid + Rifampicin + Pyrazinamide + Ethambutol', '#3b82f6')}
${box(190, 120, 150, 40, 'HR: Isoniazid + Rifampicin', '#10b981')}
${box(360, 120, 140, 40, 'Fluoroquinolones + Injectable + 2nd-line', '#ef4444')}
<text x="20" y="195" font-size="9" fill="#64748b">Monitor LFTs monthly. Pyridoxine (B6) with INH to prevent peripheral neuropathy.</text>
<text x="20" y="210" font-size="9" fill="#64748b">Ensure DOT (Directly Observed Therapy) for all phases.</text>
</svg>`

export const MALARIA_DIAGRAM = `<svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Confirmed Malaria (+ RDT/Microscopy)', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 130, 36, 'Uncomplicated P. falciparum', '#10b981')}
${box(190, 57, 130, 36, 'Severe Malaria', '#ef4444')}
${box(350, 57, 130, 36, 'P. vivax / ovale / malariae', '#f59e0b')}
${arrow(95, 93, 75, 115)}
${arrow(255, 93, 255, 115)}
${arrow(415, 93, 415, 115)}
${box(10, 118, 150, 36, 'ACT (Artemether-Lumefantrine)', '#10b981')}
${box(180, 118, 140, 36, 'IV Artesunate x 24h → ACT', '#ef4444')}
${box(340, 118, 140, 36, 'ACT + Primaquine (G6PD?)', '#f59e0b')}
<text x="20" y="185" font-size="9" fill="#64748b">WHO 2023: First-line for uncomplicated malaria = ACT. Severe malaria = IV Artesunate.</text>
<text x="20" y="200" font-size="9" fill="#64748b">Primaquine for hypnozoite eradication in P. vivax/ovale ONLY after G6PD screening.</text>
</svg>`

export const HIV_DIAGRAM = `<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'HIV Diagnosis', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(60, 57, 150, 36, 'Start ART: TLD', '#10b981')}
${box(250, 57, 150, 36, 'If TB co-infection', '#f59e0b')}
${box(100, 115, 140, 36, 'TDF/TAF + 3TC + DTG', '#3b82f6')}
${box(270, 115, 140, 36, 'TLD + Rifampicin: DTG 50mg BD', '#f59e0b')}
${arrow(135, 93, 130, 113)}
${arrow(325, 93, 340, 113)}
${box(100, 175, 310, 30, 'Monitor: VL at 6mo, then annually. CD4 if VL suppressed.', '#64748b')}
${arrow(255, 151, 255, 173)}
<text x="20" y="225" font-size="9" fill="#64748b">WHO: Treat all HIV+ regardless of CD4. TLD preferred first-line.</text>
</svg>`

export const ACS_DIAGRAM = `<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'ACS Presentation', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 130, 36, 'STEMI: Emergency PCI', '#ef4444')}
${box(190, 57, 130, 36, 'NSTEMI: Risk stratify', '#f59e0b')}
${box(350, 57, 130, 36, 'Unstable Angina', '#f59e0b')}
${arrow(95, 93, 60, 115)}
${arrow(255, 93, 235, 115)}
${arrow(415, 93, 415, 115)}
${box(10, 118, 140, 36, 'Aspirin + P2Y12i + Heparin + PCI', '#3b82f6')}
${box(180, 118, 150, 36, 'Aspirin + P2Y12i + Anticoag ± PCI', '#3b82f6')}
${box(360, 118, 130, 36, 'Aspirin + P2Y12i + Anticoag', '#3b82f6')}
${box(80, 175, 340, 30, 'Long-term: DAPT 12mo + Statin (high-intensity) + BB + ACEi', '#10b981')}
${arrow(255, 154, 255, 173)}
</svg>`

export const SEPSIS_DIAGRAM = `<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Sepsis / Septic Shock', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(10, 57, 140, 36, 'Hour-1 Bundle', '#ef4444')}
${box(180, 57, 160, 36, 'Blood cultures + Lactate', '#f59e0b')}
${box(370, 57, 110, 36, 'Broad-spectrum ABx', '#3b82f6')}
${arrow(80, 93, 60, 115)}
${arrow(260, 93, 260, 115)}
${arrow(425, 93, 425, 115)}
${box(10, 118, 130, 36, 'Measure lactate, cultures, start IV fluids 30mL/kg', '#3b82f6')}
${box(170, 118, 160, 36, 'Start broad ABx within 1 hour', '#ef4444')}
${box(360, 118, 130, 36, 'Vasopressors if MAP <65', '#f59e0b')}
${box(80, 175, 340, 30, 'Re-assess: De-escalate ABx at 48h if cultures +', '#10b981')}
${arrow(255, 154, 255, 173)}
</svg>`
