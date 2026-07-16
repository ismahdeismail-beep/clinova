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
${box(140, 130, 100, 40, 'Aldosterone â†‘', '#f59e0b')}
${box(280, 130, 100, 40, 'Naâº/Hâ‚‚O Retention', '#f59e0b')}
${box(420, 80, 90, 60, 'BP â†‘', '#ef4444')}
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
<rect x="20" y="216" width="70" height="20" rx="4" fill="#3b82f618" stroke="#3b82f6" stroke-width="1"/><text x="55" y="230" text-anchor="middle" font-size="9" fill="#3b82f6">ACEi â†’â†“ACE</text>
<rect x="100" y="216" width="70" height="20" rx="4" fill="#8b5cf618" stroke="#8b5cf6" stroke-width="1"/><text x="135" y="230" text-anchor="middle" font-size="9" fill="#8b5cf6">ARB â†’â†“AT1</text>
<rect x="180" y="216" width="80" height="20" rx="4" fill="#10b98118" stroke="#10b981" stroke-width="1"/><text x="220" y="230" text-anchor="middle" font-size="9" fill="#10b981">CCB â†’ Vasodilate</text>
<rect x="270" y="216" width="70" height="20" rx="4" fill="#f59e0b18" stroke="#f59e0b" stroke-width="1"/><text x="305" y="230" text-anchor="middle" font-size="9" fill="#f59e0b">Thiazide â†’â†“Naâº</text>
</svg>`

export const HF_GDMT_DIAGRAM = `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(10, 10, 120, 32, 'Heart Failure (HFrEF)', '#ef4444')}
${arrow(130, 26, 170, 26)}
${box(180, 10, 100, 32, 'EF â‰¤ 40%')}
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
<text x="20" y="240" font-size="9" fill="#64748b">All four GDMT pillars reduce mortality in HFrEF â€” start simultaneously, titrate to target doses.</text>
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
${box(180, 118, 140, 36, 'IV Artesunate x 24h â†’ ACT', '#ef4444')}
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
${box(180, 118, 150, 36, 'Aspirin + P2Y12i + Anticoag Â± PCI', '#3b82f6')}
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

export const HTN_EMERGENCY_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 5, 180, 30, 'SBP/DBP >180/120 + Organ Damage', '#ef4444')}
${arrow(245, 35, 245, 55)}
${box(150, 57, 90, 32, 'Neurological', '#8b5cf6')}
${box(260, 57, 90, 32, 'Cardiovascular', '#3b82f6')}
${box(370, 57, 80, 32, 'Renal', '#f59e0b')}
${arrow(195, 89, 155, 109)}
${arrow(305, 89, 305, 109)}
${arrow(410, 89, 410, 109)}
${box(10, 112, 140, 32, 'Encephalopathy / Stroke', '#8b5cf6')}
${box(170, 112, 140, 32, 'Pulm. Oedema / ACS', '#3b82f6')}
${box(330, 112, 100, 32, 'Acute Renal Fail', '#f59e0b')}
${box(110, 160, 260, 30, '↓ MAP 20-25% in 1st hour', '#ef4444')}
${arrow(245, 144, 245, 158)}
${box(20, 205, 100, 36, 'Labetalol IV', '#3b82f6')}
${box(140, 205, 100, 36, 'Nicardipine IV', '#8b5cf6')}
${box(260, 205, 100, 36, 'Nitroprusside IV', '#f59e0b')}
${box(380, 205, 110, 36, 'Nitroglycerin IV', '#10b981')}
${arrow(170, 190, 70, 203)}
${arrow(245, 190, 190, 203)}
${arrow(320, 190, 310, 203)}
${arrow(380, 190, 435, 203)}
${box(80, 255, 340, 20, 'Then ↓ to 160/100 over 2-6 hrs → transition oral agents', '#64748b')}
${arrow(245, 241, 245, 253)}
</svg>`

export const AHF_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 170, 30, 'Acute Heart Failure', '#ef4444')}
${arrow(245, 35, 245, 52)}
${box(30, 55, 110, 32, 'Warm & Wet', '#3b82f6')}
${box(160, 55, 110, 32, 'Cold & Wet', '#f59e0b')}
${box(290, 55, 110, 32, 'Cold & Dry', '#8b5cf6')}
${box(420, 55, 80, 32, 'Cardiogenic', '#ef4444')}
${arrow(85, 87, 75, 109)}
${arrow(215, 87, 215, 109)}
${arrow(345, 87, 345, 109)}
${arrow(460, 87, 460, 109)}
${box(10, 112, 120, 36, 'IV Furosemide + Vasodilator', '#3b82f6')}
${box(145, 112, 110, 36, 'IV Furosemide + NIV', '#f59e0b')}
${box(270, 112, 110, 36, 'Inotrope + Vasopressor', '#8b5cf6')}
${box(395, 112, 110, 36, 'Dobutamine / IABP', '#ef4444')}
${arrow(70, 148, 70, 172)}
${arrow(200, 148, 200, 172)}
${arrow(325, 148, 325, 172)}
${arrow(450, 148, 450, 172)}
${box(40, 175, 140, 30, 'CPAP/BiPAP if SpO₂<90', '#10b981')}
${box(200, 175, 160, 30, 'Target: ↓ preload + afterload', '#10b981')}
${box(380, 175, 120, 30, 'Escalate if refractory', '#ef4444')}
${box(60, 220, 380, 30, 'Once stable → Optimise GDMT: ARNI + BB + MRA + SGLT2i', '#10b981')}
${arrow(245, 205, 245, 218)}
<text x="20" y="268" font-size="9" fill="#64748b">Diuresis first, then reclassify and escalate. Daily weights, strict I/O.</text>
</svg>`

export const AFIB_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 150, 30, 'New AF Diagnosis', '#3b82f6')}
${arrow(245, 35, 245, 55)}
${box(15, 58, 120, 32, 'CHA₂DS₂-VASc ≥2', '#ef4444')}
${box(160, 58, 120, 32, 'CHA₂DS₂-VASc <2', '#10b981')}
${box(310, 58, 90, 32, 'Valvular AF?', '#f59e0b')}
${arrow(75, 90, 75, 112)}
${arrow(220, 90, 220, 112)}
${arrow(355, 90, 355, 112)}
${box(10, 115, 130, 32, 'Anticoagulate: DOAC', '#ef4444')}
${box(160, 115, 120, 32, 'No OAC needed', '#10b981')}
${box(300, 115, 120, 32, 'Warfarin only', '#f59e0b')}
${box(130, 165, 120, 30, 'Rate Control', '#8b5cf6')}
${box(270, 165, 120, 30, 'Rhythm Control', '#3b82f6')}
${arrow(190, 147, 165, 163)}
${arrow(330, 147, 345, 163)}
${box(10, 210, 130, 36, 'BB / CCB / Digoxin', '#8b5cf6')}
${box(160, 210, 130, 36, 'Amiodarone / Flecainide', '#3b82f6')}
${box(310, 210, 100, 36, 'Catheter Ablation', '#10b981')}
${arrow(75, 195, 75, 208)}
${arrow(225, 195, 225, 208)}
${arrow(360, 195, 360, 208)}
${box(100, 258, 300, 18, 'Target resting HR <110 bpm (lenient) or <80 (strict)', '#64748b')}
</svg>`

export const ANGINA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 170, 30, 'Stable Angina (exertional chest pain)', '#3b82f6')}
${arrow(245, 35, 245, 55)}
${box(120, 57, 120, 32, '1st Line: Beta-Blocker', '#10b981')}
${box(270, 57, 120, 32, '+ Sublingual GTN PRN', '#f59e0b')}
${arrow(180, 89, 180, 112)}
${arrow(330, 89, 330, 112)}
${box(100, 115, 150, 32, 'Symptoms controlled?', '#f59e0b')}
${arrow(175, 147, 135, 168)}
${arrow(250, 147, 310, 168)}
${box(30, 170, 140, 32, 'Continue titrate to HR 55-65', '#10b981')}
${box(190, 170, 160, 32, 'Add: CCB or Long-acting Nitrate', '#8b5cf6')}
${arrow(270, 202, 175, 222)}
${box(10, 225, 160, 32, 'Refractory → Consider Ranolazine', '#ef4444')}
${box(200, 225, 160, 32, 'Revascularise if: LMD / 3VD', '#ef4444')}
${box(390, 115, 110, 32, 'Risk Factors', '#64748b')}
${arrow(445, 147, 445, 172)}
${box(390, 175, 110, 32, 'Statin + Stop smoking', '#64748b')}
<text x="20" y="268" font-size="9" fill="#64748b">GTN: 0.4 mg SL, max 3 doses/15 min. Beta-blocker to resting HR 55-65 bpm.</text>
</svg>`

export const DVT_PE_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 150, 30, 'Suspected VTE', '#ef4444')}
${arrow(245, 35, 245, 55)}
${box(30, 58, 130, 32, 'DVT Presentation', '#3b82f6')}
${box(190, 58, 130, 32, 'PE Presentation', '#ef4444')}
${box(350, 58, 120, 32, 'Wells Score ≥2?', '#f59e0b')}
${arrow(95, 90, 75, 110)}
${arrow(255, 90, 255, 110)}
${arrow(410, 90, 410, 110)}
${box(10, 113, 130, 32, 'US Compression → DVT', '#3b82f6')}
${box(160, 113, 130, 32, 'CTPA → PE confirmed', '#ef4444')}
${box(310, 113, 120, 32, 'D-dimer first if low', '#f59e0b')}
${box(130, 160, 220, 30, 'Anticoagulate: DOAC preferred', '#10b981')}
${arrow(245, 143, 245, 158)}
${box(30, 205, 120, 36, 'Rivaroxaban', '#3b82f6')}
${box(170, 205, 120, 36, 'Apixaban', '#8b5cf6')}
${box(310, 205, 120, 36, 'LMWH → Warfarin', '#f59e0b')}
${arrow(90, 190, 90, 203)}
${arrow(230, 190, 230, 203)}
${arrow(370, 190, 370, 203)}
${box(380, 245, 120, 30, 'Massive PE → Tenecteplase', '#ef4444')}
<text x="20" y="268" font-size="9" fill="#64748b">Provoked VTE: 3 months. Unprovoked: 6-12 months then reassess. Recurrent: indefinite.</text>
</svg>`

export const HLD_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 170, 30, 'Hyperlipidaemia / ↑LDL-C', '#3b82f6')}
${arrow(245, 35, 245, 55)}
${box(100, 57, 110, 32, 'ASCVD risk ↑', '#ef4444')}
${box(240, 57, 120, 32, 'No ASCVD', '#10b981')}
${arrow(155, 89, 120, 112)}
${arrow(300, 89, 300, 112)}
${box(10, 115, 120, 36, 'High-intensity Statin', '#ef4444')}
${box(150, 115, 140, 36, 'Moderate-intensity Statin', '#f59e0b')}
${box(310, 115, 100, 36, 'LDL-C Target', '#8b5cf6')}
${arrow(70, 151, 70, 175)}
${arrow(220, 151, 220, 175)}
${box(10, 178, 120, 30, 'Target <1.4 mmol/L', '#ef4444')}
${box(150, 178, 130, 30, 'Target <2.6 mmol/L', '#f59e0b')}
${box(300, 178, 120, 30, '<1.8 if high risk', '#8b5cf6')}
${box(110, 225, 280, 30, 'Add Ezetimibe → PCSK9i if not at target', '#8b5cf6')}
${arrow(245, 208, 245, 223)}
${box(100, 260, 300, 18, 'TG >2.3 → Fenofibrate / Omega-3. FH → cascade screen.', '#64748b')}
</svg>`

export const CAP_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(165, 5, 160, 30, 'Community Acquired Pneumonia', '#3b82f6')}
${arrow(245, 35, 245, 55)}
${box(20, 58, 100, 32, 'CURB-65 0-1', '#10b981')}
${box(140, 58, 100, 32, 'CURB-65 2', '#f59e0b')}
${box(260, 58, 100, 32, 'CURB-65 3-5', '#ef4444')}
${box(380, 58, 100, 32, 'ICU criteria', '#ef4444')}
${arrow(70, 90, 70, 112)}
${arrow(190, 90, 190, 112)}
${arrow(310, 90, 310, 112)}
${arrow(430, 90, 430, 112)}
${box(10, 115, 120, 32, 'Oral: Amox / Doxy', '#10b981')}
${box(150, 115, 120, 32, 'Oral: Amox-DClav + Macrolide', '#f59e0b')}
${box(290, 115, 120, 32, 'IV: Ceftriaxone + Macrolide', '#ef4444')}
${box(420, 115, 80, 32, 'ICU Protocol', '#ef4444')}
${arrow(70, 147, 70, 170)}
${arrow(210, 147, 210, 170)}
${arrow(350, 147, 350, 170)}
${arrow(460, 147, 460, 170)}
${box(10, 173, 130, 30, '5-7 days oral Rx', '#10b981')}
${box(160, 173, 130, 30, '5-7 days, reassess', '#f59e0b')}
${box(310, 173, 120, 30, 'IV → PO switch Day 3', '#ef4444')}
${box(100, 218, 300, 30, 'Blood cultures before ABx. Reassess 48-72h. Follow-up CXR 6wks.', '#64748b')}
<text x="20" y="268" font-size="9" fill="#64748b">Atypical cover (macrolide or doxycycline) in ALL patients. WHO AWaRe: stewardship for Watch agents.</text>
</svg>`

export const BRONCHITIS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 5, 180, 30, 'Acute Cough (1-3 weeks)', '#3b82f6')}
${arrow(245, 35, 245, 55)}
${box(150, 57, 90, 32, 'Bronchitis vs Pneumonia?', '#f59e0b')}
${arrow(195, 89, 155, 112)}
${arrow(240, 89, 330, 112)}
${box(10, 115, 140, 32, 'Bronchitis: no focal signs', '#10b981')}
${box(170, 115, 140, 32, 'Pneumonia: focal crackles', '#ef4444')}
${box(330, 115, 120, 32, 'CXR: normal = bronchitis', '#f59e0b')}
${arrow(80, 147, 80, 170)}
${arrow(240, 147, 240, 170)}
${box(10, 173, 140, 36, 'Supportive: Honey, DXM', '#10b981')}
${box(170, 173, 140, 36, 'Treat pneumonia per CAP', '#ef4444')}
${box(330, 173, 140, 36, 'Pertussis? → Azithromycin', '#8b5cf6')}
${arrow(80, 209, 80, 230)}
${arrow(240, 209, 240, 230)}
${box(30, 233, 120, 30, 'No antibiotics needed', '#10b981')}
${box(170, 233, 160, 30, 'Antibiotics per CURB-65', '#ef4444')}
<text x="20" y="273" font-size="9" fill="#64748b">Cough may persist 1-3 weeks (up to 6 weeks). Sputum colour ≠ bacterial infection.</text>
</svg>`

export const PLEURAL_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(165, 5, 160, 30, 'Pleural Effusion (CXR / US)', '#3b82f6')}
${arrow(245, 35, 245, 55)}
${box(160, 57, 170, 30, 'Diagnostic Thoracentesis → Light Criteria', '#f59e0b')}
${arrow(245, 87, 155, 109)}
${arrow(245, 87, 330, 109)}
${box(10, 112, 140, 32, 'Transudate', '#10b981')}
${box(170, 112, 140, 32, 'Exudate', '#ef4444')}
${box(330, 112, 120, 32, 'PF/Serum Protein >0.5', '#f59e0b')}
${arrow(80, 144, 80, 167)}
${arrow(240, 144, 195, 167)}
${arrow(390, 144, 420, 167)}
${box(10, 170, 130, 32, 'Tx: HF / Cirrhosis', '#10b981')}
${box(155, 170, 120, 32, 'Pneumonia / TB / Malignancy', '#ef4444')}
${box(300, 170, 110, 32, 'PF/LDH >0.6 or >2/3', '#f59e0b')}
${box(430, 170, 80, 32, 'Malignancy', '#8b5cf6')}
${arrow(80, 202, 80, 225)}
${arrow(215, 202, 215, 225)}
${arrow(470, 202, 470, 225)}
${box(10, 228, 130, 30, 'Diuretics (Furosemide)', '#10b981')}
${box(160, 228, 140, 30, 'Cultures + Cytology + pH', '#ef4444')}
${box(320, 228, 100, 30, 'Pleurodesis', '#f59e0b')}
<text x="20" y="270" font-size="9" fill="#64748b">pH <7.2 + glucose <2.2 mmol/L → chest tube. ADA >40 U/L → suspect TB.</text>
</svg>`

export const ILD_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(165, 5, 160, 30, 'Progressive Dyspnoea + Velcro Crackles', '#3b82f6')}
${arrow(245, 35, 245, 55)}
${box(150, 57, 170, 30, 'HRCT Chest → Pattern Assessment', '#f59e0b')}
${arrow(245, 87, 130, 109)}
${arrow(245, 87, 350, 109)}
${box(10, 112, 120, 32, 'UIP Pattern (IPF)', '#ef4444')}
${box(150, 112, 130, 32, 'NSIP / OP / Other', '#8b5cf6')}
${box(300, 112, 130, 32, 'Indeterminate HRCT', '#f59e0b')}
${arrow(70, 144, 70, 167)}
${arrow(215, 144, 215, 167)}
${arrow(365, 144, 365, 167)}
${box(10, 170, 130, 36, 'Pirfenidone / Nintedanib', '#ef4444')}
${box(155, 170, 120, 36, 'Treat cause / Immunosuppress', '#8b5cf6')}
${box(295, 170, 130, 36, 'Biopsy + MDD review', '#f59e0b')}
${arrow(70, 206, 70, 230)}
${arrow(215, 206, 215, 230)}
${box(10, 233, 130, 30, 'Avoid steroids in IPF', '#ef4444')}
${box(155, 233, 130, 30, 'CTD-ILD → MMF', '#8b5cf6')}
${box(310, 170, 110, 36, 'Lung Tx if FVC↓10%', '#10b981')}
${arrow(365, 206, 365, 233)}
<text x="20" y="273" font-size="9" fill="#64748b">FVC/DLCO q3-6mo. Pirfenidone: monitor LFTs monthly. Nintedanib: manage diarrhoea.</text>
</svg>`

export const T1DM_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Autoimmune β-cell destruction', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(150, 57, 170, 30, 'Absolute Insulin Deficiency', '#ef4444')}
${arrow(235, 87, 235, 107)}
${box(100, 109, 140, 32, 'Basal-Bolus Regimen', '#3b82f6')}
${arrow(170, 141, 110, 163)}
${arrow(170, 141, 290, 163)}
${box(20, 165, 150, 36, 'Long-Acting (Basal)', '#8b5cf6')}
${box(200, 165, 150, 36, 'Rapid-Acting (Bolus)', '#10b981')}
${box(20, 207, 150, 28, 'Glargine / Detemir', '#8b5cf6')}
${box(200, 207, 150, 28, 'Lispro / Aspart', '#10b981')}
${box(380, 109, 120, 32, 'Kenya Context', '#f97316')}
${arrow(440, 141, 440, 163)}
${box(370, 165, 140, 36, 'Insulin access/storage', '#f97316')}
${box(370, 207, 140, 28, 'Cold chain challenges', '#f97316')}
<text x="20" y="258" font-size="9" fill="#64748b">Kenya: Common brands — Mixtard 30/70, Insuman, Humalog. Cold chain & storage remain barriers.</text>
</svg>`

export const DKA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(140, 5, 200, 30, 'DKA Triad', '#ef4444')}
${arrow(180, 35, 100, 57)}
${arrow(240, 35, 240, 57)}
${arrow(300, 35, 380, 57)}
${box(30, 59, 110, 28, 'BG >11 mmol/L', '#ef4444')}
${box(185, 59, 110, 28, 'Ketones ≥3 mmol/L', '#f59e0b')}
${box(340, 59, 100, 28, 'pH <7.3', '#8b5cf6')}
${arrow(85, 87, 120, 109)}
${arrow(240, 87, 240, 109)}
${arrow(390, 87, 360, 109)}
${box(10, 111, 120, 32, 'IV Fluids 0.9% NaCl', '#3b82f6')}
${box(160, 111, 140, 32, 'IV Insulin 0.1 U/kg/h', '#3b82f6')}
${box(320, 111, 130, 32, 'K+ Monitoring', '#f59e0b')}
${arrow(70, 143, 70, 165)}
${arrow(230, 143, 230, 165)}
${arrow(385, 143, 385, 165)}
${box(10, 167, 130, 32, '1L first hour', '#3b82f6')}
${box(160, 167, 140, 32, 'Add K+ when <5.5', '#f59e0b')}
${box(320, 167, 130, 32, 'SC when pH>7.3', '#10b981')}
${box(100, 220, 280, 30, 'Kenya: Common in new-onset T1DM, delayed presentation', '#f97316')}
<text x="20" y="268" font-size="9" fill="#64748b">Transition to SC insulin when pH >7.3, HCO3 >18, patient alert & eating.</text>
</svg>`

export const HHS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(150, 5, 170, 30, 'HHS (Hyperosmolar State)', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(140, 57, 190, 30, 'Glucose >33 mmol/L + Osmolality >320', '#f59e0b')}
${arrow(235, 87, 130, 109)}
${arrow(235, 87, 340, 109)}
${box(30, 111, 170, 32, 'Aggressive IV Fluids', '#3b82f6')}
${box(250, 111, 160, 32, 'Low-Dose Insulin', '#8b5cf6')}
${arrow(115, 143, 115, 165)}
${arrow(330, 143, 330, 165)}
${box(20, 167, 190, 32, '0.9% NaCl 1-1.5L first hr', '#3b82f6')}
${box(250, 167, 160, 32, '0.05-0.1 U/kg/h only', '#8b5cf6')}
${box(60, 215, 160, 36, 'vs DKA: No ketosis', '#10b981')}
${box(280, 215, 160, 36, 'vs DKA: Higher mortality', '#ef4444')}
<text x="20" y="270" font-size="9" fill="#64748b">HHS: More dehydration (8-12L deficit), slower onset, T2DM patients with residual insulin.</text>
</svg>`

export const THYROID_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(200, 5, 110, 30, 'TSH → FT4', '#3b82f6')}
${arrow(130, 35, 80, 57)}
${arrow(300, 35, 370, 57)}
${box(20, 59, 150, 36, 'Hyperthyroidism', '#ef4444')}
${box(310, 59, 150, 36, 'Hypothyroidism', '#8b5cf6')}
${arrow(95, 95, 95, 117)}
${arrow(385, 95, 385, 117)}
${box(10, 119, 150, 28, 'Suppressed TSH', '#ef4444')}
${box(310, 119, 150, 28, 'Elevated TSH', '#8b5cf6')}
${arrow(95, 147, 95, 169)}
${arrow(385, 147, 385, 169)}
${box(10, 171, 160, 36, 'Carbimazole / PTU', '#10b981')}
${box(310, 171, 160, 36, 'Levothyroxine', '#10b981')}
${box(10, 215, 160, 28, '+ Propranolol for symptoms', '#f59e0b')}
${box(310, 215, 160, 28, '1.6 mcg/kg/day', '#f59e0b')}
${box(120, 255, 230, 20, 'Kenya: Iodine deficiency, goitre prevalence', '#f97316')}
</svg>`

export const ADRENAL_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'HPA Axis', '#3b82f6')}
${arrow(235, 35, 140, 57)}
${arrow(235, 35, 330, 57)}
${box(80, 59, 130, 32, 'Hypothalamus CRH', '#8b5cf6')}
${box(280, 59, 130, 32, 'Pituitary ACTH', '#8b5cf6')}
${arrow(145, 91, 145, 113)}
${arrow(345, 91, 345, 113)}
${box(90, 115, 110, 32, 'Adrenal: Cortisol', '#f59e0b')}
${arrow(145, 147, 145, 169)}
${box(50, 171, 190, 32, 'ACTH Stim Test → Confirm', '#3b82f6')}
${arrow(145, 203, 100, 225)}
${arrow(145, 203, 250, 225)}
${box(20, 227, 130, 28, 'Hydrocortisone', '#10b981')}
${box(190, 227, 130, 28, 'Fludrocortisone', '#10b981')}
${box(350, 115, 140, 48, 'Crisis: IV HC\n100mg bolus\nthen 50mg q8h', '#ef4444')}
<text x="20" y="270" font-size="9" fill="#64748b">Kenya: TB is a significant cause of adrenal insufficiency. Sick-day rules essential.</text>
</svg>`

export const PUD_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(140, 5, 200, 30, 'Peptic Ulcer Disease', '#ef4444')}
${arrow(170, 35, 100, 57)}
${arrow(270, 35, 330, 57)}
${box(20, 59, 140, 32, 'H. pylori (60-80%)', '#f59e0b')}
${box(280, 59, 110, 32, 'NSAIDs', '#f59e0b')}
${arrow(90, 91, 200, 113)}
${arrow(335, 91, 270, 113)}
${box(140, 115, 200, 32, 'Triple Therapy × 14 days', '#10b981')}
${arrow(240, 147, 130, 169)}
${arrow(240, 147, 350, 169)}
${box(50, 171, 150, 32, 'PPI + Amox + Clari', '#3b82f6')}
${box(280, 171, 150, 32, 'Breath test at 4 weeks', '#8b5cf6')}
<text x="20" y="230" font-size="9" fill="#64748b">Kenya: High H. pylori prevalence. Clarithromycin resistance rising — consider quadruple therapy.</text>
<text x="20" y="245" font-size="9" fill="#64748b">Quadruple: PPI + Bismuth + Metronidazole + Tetracycline if macrolide resistance suspected.</text>
<text x="20" y="260" font-size="9" fill="#64748b">Gastric ulcers: repeat OGD at 6-8 weeks to confirm healing and exclude malignancy.</text>
</svg>`

export const GERD_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'GERD Symptoms', '#3b82f6')}
${arrow(235, 35, 130, 57)}
${arrow(235, 35, 340, 57)}
${box(50, 59, 150, 32, 'Alarm Features?', '#ef4444')}
${box(290, 59, 110, 32, 'No Alarms', '#10b981')}
${arrow(125, 91, 125, 113)}
${arrow(345, 91, 345, 113)}
${box(50, 115, 150, 32, 'EGD + Biopsy', '#ef4444')}
${box(270, 115, 150, 32, 'PPI Trial 4-8 wks', '#3b82f6')}
${arrow(125, 147, 125, 169)}
${arrow(345, 147, 345, 169)}
${box(40, 171, 170, 36, 'Lifestyle → PPI → Fundo', '#8b5cf6')}
${box(270, 171, 150, 36, 'Step down if controlled', '#10b981')}
${box(80, 225, 330, 28, 'Lifestyle: Weight loss, elevate HOB, avoid triggers', '#f59e0b')}
<text x="20" y="268" font-size="9" fill="#64748b">Barrett oesophagus: surveillance OGD every 3-5 years. Dysphagia/weight loss = urgent endoscopy.</text>
</svg>`

export const HEPATITIS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Viral Hepatitis', '#3b82f6')}
${arrow(100, 35, 50, 57)}
${arrow(170, 35, 170, 57)}
${arrow(235, 35, 300, 57)}
${arrow(310, 35, 370, 57)}
${box(10, 59, 70, 24, 'HAV', '#10b981')}
${box(110, 59, 70, 24, 'HBV', '#ef4444')}
${box(250, 59, 70, 24, 'HCV', '#f59e0b')}
${box(340, 59, 70, 24, 'HDV', '#8b5cf6')}
${arrow(40, 83, 40, 105)}
${arrow(145, 83, 145, 105)}
${arrow(285, 83, 285, 105)}
${box(5, 107, 70, 24, 'Self-limited', '#10b981')}
${box(80, 107, 130, 32, 'Chronic if >6mo', '#ef4444')}
${box(220, 107, 130, 32, 'Chronic 75-85%', '#f59e0b')}
${arrow(145, 139, 100, 161)}
${arrow(145, 139, 200, 161)}
${box(30, 163, 120, 32, 'Tenofovir 300mg', '#3b82f6')}
${box(170, 163, 120, 32, 'Entecavir 0.5mg', '#3b82f6')}
${arrow(285, 139, 340, 161)}
${box(290, 163, 140, 32, 'DAA: SOF/VEL ×12wk', '#10b981')}
${box(100, 215, 280, 28, 'Kenya: HBV prevalence ~2%. Birth dose + 3-dose vaccination key.', '#f97316')}
<text x="20" y="260" font-size="9" fill="#64748b">HBV: Tenofovir or entecavir first-line. HCV: Sofosbuvir/Velpatasvir cures >95%. Screen contacts.</text>
</svg>`

export const IBD_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'IBD Diagnosis', '#3b82f6')}
${arrow(110, 35, 60, 57)}
${arrow(330, 35, 370, 57)}
${box(10, 59, 120, 32, 'Crohn\'s Disease', '#8b5cf6')}
${box(320, 59, 100, 32, 'Ulcerative Colitis', '#8b5cf6')}
${arrow(70, 91, 70, 113)}
${arrow(370, 91, 370, 113)}
${box(10, 115, 120, 24, 'Skip lesions', '#f59e0b')}
${box(320, 115, 100, 24, 'Continuous', '#f59e0b')}
${arrow(70, 139, 200, 161)}
${arrow(370, 139, 300, 161)}
${box(140, 163, 200, 32, 'Treatment Ladder', '#3b82f6')}
${arrow(240, 195, 240, 215)}
${box(50, 217, 120, 28, '5-ASA', '#10b981')}
${box(185, 217, 80, 28, 'Steroids', '#f59e0b')}
${box(280, 217, 80, 28, 'Azathioprine', '#8b5cf6')}
${box(375, 217, 80, 28, 'Anti-TNF', '#ef4444')}
<text x="20" y="260" font-size="9" fill="#64748b">Kenya: Rising incidence in Africa. Biosimilar infliximab access improving. Screen TB before anti-TNF.</text>
</svg>`

export const IBS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(150, 5, 170, 30, 'Rome IV Criteria', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(150, 57, 170, 30, 'IBS Diagnosis', '#3b82f6')}
${arrow(120, 87, 70, 109)}
${arrow(235, 87, 235, 109)}
${arrow(340, 87, 400, 109)}
${box(10, 111, 100, 32, 'IBS-D', '#ef4444')}
${box(175, 111, 100, 32, 'IBS-C', '#8b5cf6')}
${box(350, 111, 100, 32, 'IBS-M', '#f59e0b')}
${arrow(60, 143, 60, 165)}
${arrow(225, 143, 225, 165)}
${arrow(400, 143, 400, 165)}
${box(10, 167, 110, 32, 'Loperamide', '#ef4444')}
${box(170, 167, 110, 32, 'Prucalopride', '#8b5cf6')}
${box(350, 167, 100, 32, 'Dietitian', '#10b981')}
${box(120, 215, 230, 30, 'Low-FODMAP Diet (50-80% response)', '#10b981')}
${box(120, 255, 230, 20, 'Amitriptyline 10-25mg nocte', '#8b5cf6')}
<text x="20" y="250" font-size="9" fill="#64748b">Rome: pain ≥1d/wk × 3mo + ≥2 of: defecation-related, stool freq, stool form change.</text>
</svg>`

export const PANCREATITIS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Acute Pancreatitis', '#ef4444')}
${arrow(170, 35, 100, 57)}
${arrow(300, 35, 380, 57)}
${box(20, 59, 140, 32, 'Gallstones (40%)', '#f59e0b')}
${box(320, 59, 110, 32, 'Alcohol (30%)', '#f59e0b')}
${arrow(235, 35, 235, 57)}
${box(160, 59, 130, 32, 'Severity Scoring', '#3b82f6')}
${arrow(235, 91, 100, 113)}
${arrow(235, 91, 370, 113)}
${box(20, 115, 150, 32, 'Ranson / APACHE II', '#3b82f6')}
${box(310, 115, 140, 32, 'CRP at 48-72h', '#8b5cf6')}
${arrow(95, 147, 200, 169)}
${arrow(380, 147, 300, 169)}
${box(140, 171, 200, 32, 'Supportive Care', '#10b981')}
${arrow(240, 203, 130, 225)}
${arrow(240, 203, 350, 225)}
${box(50, 227, 150, 32, 'IVF + Analgesia + NBM', '#3b82f6')}
${box(280, 227, 150, 32, 'ERCP if cholangitis', '#f59e0b')}
<text x="20" y="275" font-size="9" fill="#64748b">Kenya: Gallstone disease common. Alcohol-related pancreatitis rising. Lactated Ringer preferred.</text>
</svg>`

export const CKD_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'CKD: eGFR <60 + albuminuria', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(10, 57, 110, 36, 'G1-G2 (≥60)', '#10b981')}
${box(130, 57, 110, 36, 'G3a (45-59)', '#f59e0b')}
${box(250, 57, 110, 36, 'G3b (30-44)', '#f59e0b')}
${box(370, 57, 80, 36, 'G4 (15-29)', '#ef4444')}
${box(460, 57, 50, 36, 'G5\n<15', '#ef4444')}
${arrow(65, 93, 65, 115)}
${arrow(185, 93, 185, 115)}
${arrow(305, 93, 305, 115)}
${arrow(410, 93, 410, 115)}
${arrow(485, 93, 485, 115)}
${box(10, 118, 120, 36, 'ACEi + SGLT2i', '#10b981')}
${box(140, 118, 110, 36, 'ACEi + SGLT2i', '#f59e0b')}
${box(260, 118, 120, 36, '+ ESA + binder', '#f59e0b')}
${box(390, 118, 120, 36, 'RRT planning', '#ef4444')}
${box(10, 175, 150, 36, 'Anaemia: EPO (KEMSA)', '#8b5cf6')}
${box(170, 175, 140, 36, 'CKD-MBD: Sevelamer', '#8b5cf6')}
${box(320, 175, 120, 36, 'Acidosis: NaHCO₃', '#8b5cf6')}
${arrow(70, 154, 70, 173)}
${arrow(195, 154, 230, 173)}
${arrow(320, 154, 380, 173)}
${box(140, 235, 120, 30, 'Dialysis (limited)', '#ef4444')}
${box(280, 235, 120, 30, 'Transplant (KNH)', '#8b5cf6')}
<text x="20" y="270" font-size="9" fill="#64748b">Kenya: Limited dialysis centres, KNH transplant programme, KEMSA EPO access.</text>
</svg>`

export const AKI_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'AKI: Cr ↑ or UO <0.5', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(10, 57, 120, 36, 'Prerenal (60%)', '#3b82f6')}
${box(150, 57, 130, 36, 'Intrinsic', '#f59e0b')}
${box(300, 57, 120, 36, 'Postrenal', '#8b5cf6')}
${arrow(70, 93, 50, 115)}
${arrow(215, 93, 185, 115)}
${arrow(360, 93, 360, 115)}
${box(10, 118, 110, 36, 'IV fluids 0.9%', '#3b82f6')}
${box(130, 118, 110, 36, 'Na/FeNa workup', '#f59e0b')}
${box(250, 118, 120, 36, 'US: hydronephrosis', '#8b5cf6')}
${box(10, 175, 130, 36, 'Sepsis, gastro', '#ef4444')}
${box(150, 175, 130, 36, 'Herbal, NSAIDs', '#ef4444')}
${arrow(65, 154, 55, 173)}
${arrow(215, 154, 215, 173)}
${box(300, 175, 200, 36, 'RRT if AEIOU', '#ef4444')}
<text x="20" y="235" font-size="9" fill="#64748b">Kenya: Sepsis, gastroenteritis, herbal remedies, NSAIDs are common AKI causes.</text>
<text x="20" y="250" font-size="9" fill="#64748b">AEIOU: Acidosis, Electrolytes, Intoxication, Overload, Uraemia → dialysis indications.</text>
</svg>`

export const NEPHROTIC_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Nephrotic Syndrome', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(10, 57, 150, 32, 'Proteinuria >3.5g/d', '#ef4444')}
${box(170, 57, 100, 32, 'Oedema', '#f59e0b')}
${box(280, 57, 100, 32, 'Albumin <30', '#f59e0b')}
${box(390, 57, 110, 32, 'Hyperlipidaemia', '#8b5cf6')}
${arrow(85, 89, 85, 110)}
${arrow(220, 89, 220, 110)}
${arrow(330, 89, 330, 110)}
${arrow(445, 89, 445, 110)}
${box(140, 112, 130, 32, 'Renal Biopsy', '#f59e0b')}
${arrow(205, 144, 205, 160)}
${box(20, 162, 120, 36, 'MCD (children)', '#10b981')}
${box(150, 162, 120, 36, 'FSGS (adults)', '#f59e0b')}
${box(280, 162, 120, 36, 'Membranous', '#ef4444')}
${arrow(80, 198, 80, 218)}
${arrow(210, 198, 210, 218)}
${arrow(340, 198, 340, 218)}
${box(30, 220, 100, 32, 'Steroids 95%', '#10b981')}
${box(140, 220, 120, 32, 'Steroids ± IS', '#f59e0b')}
${box(270, 220, 120, 32, 'Rituximab', '#ef4444')}
<text x="20" y="270" font-size="9" fill="#64748b">Kenya: Malaria-associated nephropathy, HIVAN are important secondary causes.</text>
</svg>`

export const STROKE_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Acute Stroke', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(20, 57, 130, 36, 'Ischaemic (85%)', '#3b82f6')}
${box(170, 57, 120, 36, 'Haemorrhagic', '#ef4444')}
${box(310, 57, 110, 36, 'NIHSS Score', '#f59e0b')}
${arrow(85, 93, 65, 115)}
${arrow(230, 93, 200, 115)}
${arrow(365, 93, 365, 115)}
${box(10, 118, 130, 36, 'CT Brain (exclude H)', '#f59e0b')}
${box(150, 118, 130, 36, 'CT angiography', '#f59e0b')}
${box(290, 118, 120, 36, 'tPA <4.5h?', '#10b981')}
${arrow(75, 154, 50, 175)}
${arrow(215, 154, 180, 175)}
${arrow(350, 154, 350, 175)}
${box(10, 178, 120, 36, 'Antiplatelet', '#3b82f6')}
${box(140, 178, 130, 36, 'Thrombectomy LVO', '#10b981')}
${box(280, 178, 120, 36, 'Prevent 2°', '#8b5cf6')}
<text x="20" y="240" font-size="9" fill="#64748b">Kenya: HTN is leading stroke cause. Limited tPA availability in public hospitals.</text>
<text x="20" y="255" font-size="9" fill="#64748b">Secondary prevention: DAPT 21d, statin 80mg, BP <130/80, anticoag for AF.</text>
</svg>`

export const DEPRESSION_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Depression (MDD)', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(160, 57, 130, 30, 'PHQ-9 Screening', '#f59e0b')}
${arrow(225, 87, 225, 105)}
${box(10, 107, 110, 36, 'Mild (5-9)', '#10b981')}
${box(130, 107, 110, 36, 'Moderate (10-14)', '#f59e0b')}
${box(250, 107, 110, 36, 'Mod-Severe (15-19)', '#ef4444')}
${box(370, 107, 110, 36, 'Severe (≥20)', '#ef4444')}
${arrow(65, 143, 50, 165)}
${arrow(185, 143, 165, 165)}
${arrow(305, 143, 305, 165)}
${arrow(425, 143, 425, 165)}
${box(10, 168, 110, 36, 'CBT / watchful', '#10b981')}
${box(130, 168, 120, 36, 'SSRI (fluoxetine)', '#3b82f6')}
${box(260, 168, 110, 36, 'SSRI + CBT', '#8b5cf6')}
${box(380, 168, 120, 36, 'SSRI → SNRI/TCA', '#ef4444')}
<text x="20" y="230" font-size="9" fill="#64748b">Kenya: Limited mental health workforce, stigma, common SSRIs on KEMSA list.</text>
<text x="20" y="245" font-size="9" fill="#64748b">Monitor SI weeks 1-4. Reassess at 6-8 weeks: switch/augment if inadequate response.</text>
</svg>`

export const PARKINSON_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(150, 5, 160, 30, 'PD: Bradykinesia + Rigidity + Tremor', '#3b82f6')}
${arrow(230, 35, 230, 55)}
${box(100, 57, 150, 36, 'Levodopa / Carbidopa', '#10b981')}
${arrow(175, 93, 175, 115)}
${box(20, 118, 130, 36, 'Young (<65): DA agonist', '#8b5cf6')}
${box(170, 118, 140, 36, 'Older: Levodopa first', '#10b981')}
${arrow(85, 154, 60, 175)}
${arrow(240, 154, 240, 175)}
${box(10, 178, 130, 36, 'Add if wearing-off', '#f59e0b')}
${box(150, 178, 140, 36, 'Motor fluctuations', '#ef4444')}
${arrow(75, 214, 75, 232)}
${arrow(220, 214, 220, 232)}
${box(10, 234, 100, 30, 'Entacapone', '#f59e0b')}
${box(120, 234, 90, 30, 'MAO-B inh', '#f59e0b')}
${box(220, 234, 100, 30, 'DA agonist', '#8b5cf6')}
<text x="20" y="275" font-size="9" fill="#64748b">Kenya: Levodopa available. Limited specialist neurology access outside major centres.</text>
</svg>`

export const BIPOLAR_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Bipolar Disorder', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 130, 36, 'Mania (≥7 days)', '#ef4444')}
${box(180, 57, 130, 36, 'Hypomania', '#f59e0b')}
${box(330, 57, 110, 36, 'Depression', '#8b5cf6')}
${arrow(95, 93, 95, 115)}
${arrow(245, 93, 245, 115)}
${arrow(385, 93, 385, 115)}
${box(10, 118, 140, 36, 'Mood stab + Atypical AP', '#ef4444')}
${box(160, 118, 140, 36, 'Lithium (maintenance)', '#10b981')}
${box(310, 118, 140, 36, 'Lamotrigine / Li', '#8b5cf6')}
${arrow(80, 154, 65, 175)}
${arrow(230, 154, 215, 175)}
${arrow(380, 154, 380, 175)}
${box(10, 178, 120, 36, 'Lithium + Valproate', '#3b82f6')}
${box(140, 178, 130, 36, 'Li + Olanzapine', '#3b82f6')}
${box(280, 178, 140, 36, 'Target level 0.6-1.2', '#10b981')}
<text x="20" y="235" font-size="9" fill="#64748b">Kenya: Valproate more available than lithium. Lithium anti-suicide benefit.</text>
<text x="20" y="250" font-size="9" fill="#64748b">Lithium narrow therapeutic index: monitor levels, TSH, renal function regularly.</text>
</svg>`

export const SCHIZOPHRENIA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Schizophrenia', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(10, 57, 130, 36, 'Positive symptoms', '#ef4444')}
${box(160, 57, 130, 36, 'Negative symptoms', '#f59e0b')}
${box(310, 57, 130, 36, 'Cognitive symptoms', '#8b5cf6')}
${arrow(75, 93, 75, 115)}
${arrow(225, 93, 225, 115)}
${arrow(375, 93, 375, 115)}
${box(10, 118, 140, 36, 'Haloperidol / Chlorpromazine', '#3b82f6')}
${box(160, 118, 130, 36, 'Risperidone / Olanzapine', '#10b981')}
${box(300, 118, 130, 36, 'Clozapine (refractory)', '#ef4444')}
${arrow(80, 154, 60, 175)}
${arrow(225, 154, 185, 175)}
${arrow(365, 154, 365, 175)}
${box(10, 178, 130, 36, 'Depot for adherence', '#f59e0b')}
${box(150, 178, 140, 36, 'FBC weekly (clozapine)', '#ef4444')}
${box(300, 178, 140, 36, 'Trial ≥2 failed → Cloz', '#ef4444')}
<text x="20" y="240" font-size="9" fill="#64748b">Kenya: Depot antipsychotics improve adherence in resource-limited settings.</text>
<text x="20" y="255" font-size="9" fill="#64748b">Monitor AIMS q6mo (tardive dyskinesia), prolactin, glucose, weight regularly.</text>
</svg>`

export const ANXIETY_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Anxiety Disorders', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(10, 57, 100, 36, 'GAD', '#f59e0b')}
${box(120, 57, 110, 36, 'Panic Disorder', '#f59e0b')}
${box(240, 57, 120, 36, 'Social Phobia', '#f59e0b')}
${box(370, 57, 120, 36, 'Specific Phobia', '#f59e0b')}
${arrow(60, 93, 60, 115)}
${arrow(175, 93, 175, 115)}
${arrow(300, 93, 300, 115)}
${arrow(430, 93, 430, 115)}
${box(20, 118, 220, 36, 'SSRI (sertraline/escitalopram)', '#10b981')}
${box(260, 118, 150, 36, '+ CBT referral', '#8b5cf6')}
${arrow(130, 154, 100, 175)}
${arrow(335, 154, 260, 175)}
${box(20, 178, 200, 36, 'Benzodiazepine SHORT TERM', '#ef4444')}
${box(240, 178, 150, 36, 'If inadequate 6-8wk', '#f59e0b')}
<text x="20" y="235" font-size="9" fill="#64748b">Kenya: Limited CBT access — medication-first approach is common practice.</text>
<text x="20" y="250" font-size="9" fill="#64748b">Max benzo 2-4 weeks. Warn about dependence. Venlafaxine alternative if SSRI fails.</text>
</svg>`

export const ALZHEIMER_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Alzheimer Disease', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(100, 57, 150, 36, 'Progressive cognitive decline', '#f59e0b')}
${arrow(175, 93, 175, 115)}
${box(20, 118, 130, 36, 'MMSE / MoCA assess', '#3b82f6')}
${arrow(85, 154, 85, 175)}
${box(10, 178, 140, 36, 'Mild-Moderate', '#10b981')}
${box(160, 178, 140, 36, 'Moderate-Severe', '#ef4444')}
${arrow(80, 214, 60, 235)}
${arrow(230, 214, 215, 235)}
${box(10, 237, 130, 30, 'Donepezil 5-10mg', '#10b981')}
${box(150, 237, 130, 30, '+ Memantine 5-20mg', '#ef4444')}
${box(300, 118, 130, 36, 'MRI: temporal atrophy', '#8b5cf6')}
${arrow(400, 154, 400, 175)}
${box(320, 178, 140, 36, 'BPSD: assess qvisit', '#f59e0b')}
<text x="20" y="275" font-size="9" fill="#64748b">Kenya: Underdiagnosed, limited specialist access. Avoid anticholinergics.</text>
</svg>`

export const MIGRAINE_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Migraine', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(20, 57, 130, 36, 'Acute Treatment', '#ef4444')}
${box(180, 57, 140, 36, 'Prophylaxis (≥4/mo)', '#8b5cf6')}
${arrow(85, 93, 60, 115)}
${arrow(250, 93, 250, 115)}
${box(10, 118, 120, 36, 'NSAID (mild)', '#10b981')}
${box(140, 118, 120, 36, 'Triptan (mod-sev)', '#f59e0b')}
${arrow(70, 154, 70, 175)}
${arrow(200, 154, 200, 175)}
${box(10, 178, 110, 36, 'Aspirin 900mg', '#10b981')}
${box(130, 178, 120, 36, 'Sumatriptan 50-100', '#f59e0b')}
${arrow(250, 93, 290, 115)}
${box(330, 118, 110, 36, 'Propranolol', '#3b82f6')}
${box(450, 118, 60, 36, 'AT', '#8b5cf6')}
${arrow(385, 154, 385, 175)}
${arrow(480, 154, 480, 175)}
${box(330, 178, 110, 36, 'Amitriptyline', '#8b5cf6')}
${box(450, 178, 60, 36, 'TP', '#8b5cf6')}
${box(10, 235, 200, 30, 'Refractory: CGRP mAb (erenumab)', '#ef4444')}
<text x="20" y="270" font-size="9" fill="#64748b">Kenya: Common triggers, limited triptan access. Limit triptans <10d/mo (MOH).</text>
</svg>`

export const UTI_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 8, 190, 28, 'Dysuria + Frequency + Urgency', '#3b82f6')}
${arrow(250, 36, 250, 46)}
${box(130, 48, 240, 28, 'Urinalysis: Nitrites + Leucocyte Esterase', '#f59e0b')}
${arrow(250, 76, 250, 86)}
${box(165, 88, 170, 28, 'Urine Culture + Sensitivity', '#3b82f6')}
${arrow(180, 116, 95, 128)}
${arrow(320, 116, 410, 128)}
${box(20, 130, 150, 34, 'Uncomplicated Cystitis', '#10b981')}
${box(330, 130, 160, 34, 'Pyelonephritis / Complicated', '#ef4444')}
${arrow(95, 164, 95, 176)}
${arrow(410, 164, 410, 176)}
${box(10, 178, 170, 34, 'Nitrofurantoin MR 100mg BID x 5d', '#10b981')}
${box(310, 178, 190, 34, 'Ceftriaxone 1-2g IV +/- Gentamicin', '#ef4444')}
<text x="20" y="235" font-size="9" fill="#64748b">KENYA: E. coli nitrofurantoin resistance <15%. TMP-SMX resistance >30%. KEMSA stocks nitrofurantoin and ceftriaxone.</text>
<text x="20" y="250" font-size="9" fill="#64748b">Treat asymptomatic bacteriuria in pregnancy only. Avoid fluoroquinolones for uncomplicated cystitis (WHO AWaRe Watch).</text>
</svg>`

export const MENINGITIS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(140, 8, 220, 28, 'Fever + Headache + Neck Stiffness', '#ef4444')}
${arrow(250, 36, 250, 46)}
${box(170, 48, 140, 28, 'Lumbar Puncture', '#3b82f6')}
${arrow(250, 76, 250, 86)}
${box(50, 88, 400, 28, 'CSF: WBC, Protein, Glucose, Gram stain + Culture', '#f59e0b')}
${arrow(250, 116, 250, 128)}
${box(40, 130, 420, 34, 'Ceftriaxone 2g IV q12h + Vancomycin + Dexamethasone', '#10b981')}
${arrow(200, 164, 125, 176)}
${arrow(300, 164, 380, 176)}
${box(30, 178, 190, 28, 'Duration: 7-14 days by pathogen', '#8b5cf6')}
${box(280, 178, 200, 28, '+ Ampicillin if age >50 / immunocomp.', '#f97316')}
<text x="20" y="235" font-size="9" fill="#64748b">KENYA: S. pneumoniae and N. meningitidis most common. Hib vaccine has reduced H. influenzae meningitis in vaccinated children.</text>
<text x="20" y="250" font-size="9" fill="#64748b">Give dexamethasone before or with first antibiotic dose. CT head before LP if raised ICP suspected.</text>
</svg>`

export const GONORRHOEA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(145, 8, 210, 28, 'Urethritis / Cervicitis + Discharge', '#ef4444')}
${arrow(250, 36, 250, 46)}
${box(140, 48, 200, 28, 'Gram Stain + NAAT (Diagnosis)', '#3b82f6')}
${arrow(250, 76, 250, 86)}
${box(50, 88, 400, 34, 'Ceftriaxone 500mg IM + Azithromycin 2g PO (single doses)', '#10b981')}
${arrow(180, 122, 115, 134)}
${arrow(320, 122, 360, 134)}
${box(20, 136, 190, 28, 'Screen: Chlamydia, HIV, Syphilis', '#f59e0b')}
${box(250, 136, 220, 28, 'Partner Notification + Treatment', '#f59e0b')}
${arrow(115, 164, 120, 176)}
${arrow(360, 164, 360, 176)}
${box(30, 178, 180, 28, 'Test of Cure (pharyngeal)', '#8b5cf6')}
${box(260, 178, 200, 28, 'Retest at 3 months (reinfection)', '#8b5cf6')}
<text x="20" y="228" font-size="9" fill="#64748b">KENYA: Syndromic management — treat empirically based on symptoms. Rising AMR: culture + susceptibility where available.</text>
<text x="20" y="243" font-size="9" fill="#64748b">Chlamydia co-infection in 20-40%. Azithromycin 2g covers both. Re-testing at 3 months essential due to high reinfection rates.</text>
</svg>`

export const TYPHOID_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(135, 8, 230, 28, 'Prolonged Fever + Headache + Bradycardia', '#ef4444')}
${arrow(250, 36, 250, 46)}
${box(160, 48, 180, 28, 'Blood Culture (Gold Standard)', '#3b82f6')}
${arrow(200, 76, 95, 88)}
${arrow(300, 76, 400, 88)}
${box(20, 90, 150, 34, 'Uncomplicated (Oral)', '#10b981')}
${box(330, 90, 160, 34, 'Severe / Complicated (IV)', '#ef4444')}
${arrow(95, 124, 95, 136)}
${arrow(410, 124, 410, 136)}
${box(10, 138, 170, 34, 'Azithromycin 1g then 500mg x 6d', '#10b981')}
${box(310, 138, 190, 34, 'Ceftriaxone 2g IV x 10-14 days', '#ef4444')}
${arrow(95, 172, 95, 184)}
${arrow(410, 172, 410, 184)}
${box(20, 186, 160, 28, 'Stool C&S x 3 neg to clear', '#f59e0b')}
${box(320, 186, 170, 28, 'Watch: Perforation, Haemorrhage', '#ef4444')}
<text x="20" y="240" font-size="9" fill="#64748b">KENYA: Endemic. MDR typhoid widespread — avoid ciprofloxacin. Typhoid conjugate vaccine (TCV) recommended from 6 months.</text>
<text x="20" y="255" font-size="9" fill="#64748b">Widal test has limited value — blood culture remains gold standard. Relative bradycardia (Faget sign) is classic.</text>
</svg>`

export const CHILD_PNA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Child: Cough + Tachypnoea + Fever', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 120, 36, 'Non-Severe', '#10b981')}
${box(180, 57, 120, 36, 'Severe', '#f59e0b')}
${box(330, 57, 130, 36, 'Very Severe', '#ef4444')}
${arrow(90, 93, 60, 115)}
${arrow(240, 93, 220, 115)}
${arrow(395, 93, 395, 115)}
${box(10, 118, 140, 36, 'Oral Amoxicillin 25-50mg/kg TDS', '#10b981')}
${box(170, 118, 160, 36, 'IM Ampicillin 50mg/kg + Gentamicin', '#f59e0b')}
${box(350, 118, 140, 36, 'IV Ampicillin + Gentamicin', '#ef4444')}
${box(60, 175, 180, 30, 'SpO2 <90% → Oxygen (target >=92%)', '#8b5cf6')}
${arrow(310, 154, 310, 173)}
<text x="20" y="225" font-size="9" fill="#64748b">KENYA: IMCI implementation nationwide. PCV-10 in routine immunisation since 2011. Leading cause of under-5 mortality.</text>
</svg>`

export const NEONATAL_SEPSIS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Neonate <28 Days: Suspect Sepsis', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(20, 57, 140, 40, 'Risk Factors', '#f59e0b')}
${box(190, 57, 140, 40, 'Clinical Signs', '#f59e0b')}
${box(360, 57, 130, 40, 'Investigations', '#3b82f6')}
${arrow(90, 97, 90, 118)}
${arrow(260, 97, 260, 118)}
${arrow(425, 97, 425, 118)}
${box(10, 120, 150, 36, 'PROM, Maternal Fever, Prematurity', '#f59e0b')}
${box(180, 120, 150, 36, 'Temp Instability, Poor Feeding', '#f59e0b')}
${box(350, 120, 140, 36, 'Blood Culture, CRP, FBC', '#3b82f6')}
${arrow(235, 156, 235, 175)}
${box(80, 177, 180, 40, 'IV Ampicillin 50mg/kg + Gentamicin 5mg/kg OD', '#10b981')}
${box(300, 177, 170, 40, 'Cefotaxime 50mg/kg q8h (alternative)', '#8b5cf6')}
<text x="20" y="237" font-size="9" fill="#64748b">KENYA: Leading cause of neonatal death. KEMSA supplies ampicillin + gentamicin. Newborn unit protocols.</text>
</svg>`

export const PREECLAMPSIA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(150, 5, 170, 30, 'BP ≥140/90 + Proteinuria (≥20wk)', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(60, 57, 160, 36, 'MgSO4 Seizure Prophylaxis', '#f59e0b')}
${box(270, 57, 160, 36, 'Antihypertensives', '#3b82f6')}
${arrow(140, 93, 105, 115)}
${arrow(350, 93, 350, 115)}
${box(10, 118, 180, 36, 'Load 4g IV 15-20min → 1g/h', '#f59e0b')}
${box(220, 118, 140, 36, 'Nifedipine 10mg PO', '#3b82f6')}
${box(390, 118, 110, 36, 'Labetalol IV', '#3b82f6')}
${arrow(235, 154, 235, 175)}
${box(100, 177, 160, 40, 'Only Definitive Tx = Delivery', '#ef4444')}
${box(300, 177, 160, 40, 'Aspirin 150mg from 12-16wk', '#10b981')}
<text x="20" y="237" font-size="9" fill="#64748b">KENYA: Leading cause of maternal mortality. MgSO4 on KEMSA EML. MOH protocol.</text>
</svg>`

export const MENOPAUSE_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, '12mo Amenorrhoea', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(160, 57, 140, 36, 'Vasomotor Symptoms', '#f59e0b')}
${arrow(235, 93, 235, 113)}
${box(60, 115, 140, 40, 'HRT: Oestrogen + Progestogen', '#10b981')}
${box(250, 115, 150, 40, 'Non-Hormonal Alternatives', '#8b5cf6')}
${arrow(130, 155, 100, 177)}
${arrow(325, 155, 325, 177)}
${box(10, 180, 180, 36, 'Oestradiol 1-2mg + MPA 10mg 12d/mo', '#10b981')}
${box(220, 180, 150, 36, 'Venlafaxine 37.5-75mg', '#8b5cf6')}
${box(220, 225, 150, 30, 'Gabapentin 300-900mg', '#8b5cf6')}
${box(30, 225, 160, 30, 'Monitor: BMD, Mammogram, BP', '#64748b')}
<text x="20" y="267" font-size="9" fill="#64748b">KENYA: Limited HRT awareness. Herbal remedies common. Start within 10yr of menopause.</text>
</svg>`

export const ANAPHYLAXIS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(150, 5, 170, 30, 'Acute Onset: Skin + Resp + CV/GI', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(100, 57, 180, 36, 'IM Adrenaline 0.3-0.5mg Anterolateral Thigh', '#ef4444')}
${arrow(190, 93, 130, 115)}
${arrow(290, 93, 350, 115)}
${box(10, 118, 180, 36, 'Repeat q5-15min if no response', '#f59e0b')}
${box(220, 118, 150, 36, 'IV Fluids + Antihistamine', '#3b82f6')}
${box(400, 118, 100, 36, 'Corticosteroid', '#8b5cf6')}
${arrow(235, 154, 235, 175)}
${box(80, 177, 200, 40, 'Observe 6-12h (Biphasic Reaction Risk)', '#f59e0b')}
${box(320, 177, 140, 40, 'Child: 0.01mg/kg', '#8b5cf6')}
<text x="20" y="237" font-size="9" fill="#64748b">KENYA: Common triggers: food (groundnuts, seafood), drugs, insect stings. Adrenaline availability limited.</text>
</svg>`

export const CARDIAC_ARREST_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Unresponsive + No Breathing', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(160, 57, 150, 30, 'CPR 30:2 → AED → Shock', '#f59e0b')}
${arrow(235, 87, 235, 107)}
${box(50, 109, 140, 40, 'Shockable (VF/VT)', '#ef4444')}
${box(310, 109, 150, 40, 'Non-Shockable (PEA/Asystole)', '#8b5cf6')}
${arrow(120, 149, 80, 170)}
${arrow(385, 149, 385, 170)}
${box(10, 172, 160, 36, 'Defib 200J + Amiodarone 300mg', '#ef4444')}
${box(210, 172, 160, 36, 'Adrenaline 1mg IV q3-5min', '#8b5cf6')}
${arrow(235, 208, 235, 228)}
${box(60, 230, 200, 30, 'ROSC → Post-Arrest Care (TTM)', '#10b981')}
${box(300, 230, 180, 30, '4 Hs & 4 Ts Reversible Causes', '#f59e0b')}
<text x="20" y="275" font-size="9" fill="#64748b">KENYA: BLS training expanding. AED availability limited outside Nairobi. Adrenaline on KEMSA list.</text>
</svg>`

export const STATUS_EPILEPTICUS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Seizure >5 Minutes', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(140, 57, 180, 36, 'Benzodiazepine (within 5min)', '#f59e0b')}
${arrow(230, 93, 160, 115)}
${arrow(310, 93, 370, 115)}
${box(10, 118, 150, 36, 'Midazolam IM / Diazepam PR', '#f59e0b')}
${box(190, 118, 160, 36, 'IV Phenytoin / Levetiracetam', '#3b82f6')}
${arrow(235, 154, 235, 175)}
${box(80, 177, 180, 40, 'Refractory: Propofol / Thiopental → ICU', '#ef4444')}
${box(310, 177, 160, 40, 'EEG Monitoring Required', '#8b5cf6')}
<text x="20" y="237" font-size="9" fill="#64748b">KENYA: Common causes: febrile seizures, cerebral malaria, TB meningitis, AED adherence gaps.</text>
</svg>`

export const SNAKE_BITE_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Snake Bite Envenoming', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(50, 57, 140, 40, 'Neurotoxic (Cobra/Mamba)', '#8b5cf6')}
${box(310, 57, 140, 40, 'Haemotoxic (Viper)', '#ef4444')}
${arrow(120, 97, 80, 118)}
${arrow(380, 97, 380, 118)}
${box(10, 120, 160, 36, 'Pressure Immobilisation Bandage', '#8b5cf6')}
${box(200, 120, 140, 36, '20WBCT Bedside Test', '#f59e0b')}
${box(370, 120, 140, 36, 'Monitor for Bleeding', '#ef4444')}
${arrow(235, 156, 235, 175)}
${box(60, 177, 180, 40, 'Polyvalent Antivenom IV 1-2 Vials', '#10b981')}
${box(290, 177, 180, 40, 'Tetanus Prophylaxis + Wound Care', '#f59e0b')}
<text x="20" y="237" font-size="9" fill="#64748b">KENYA: Common: puff adder, black mamba, spitting cobra. KEMSA antivenom stockouts common.</text>
</svg>`

export const OSTEOARTHRITIS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 5, 160, 30, 'Joint Pain + Stiffness + Crepitus', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(40, 57, 150, 36, 'Non-Pharmacological', '#10b981')}
${box(200, 57, 150, 36, 'Pharmacological', '#f59e0b')}
${box(390, 57, 110, 36, 'Surgical', '#8b5cf6')}
${arrow(115, 93, 80, 115)}
${arrow(275, 93, 250, 115)}
${arrow(445, 93, 445, 115)}
${box(10, 118, 160, 36, 'Exercise + Weight Loss + Physio', '#10b981')}
${box(180, 118, 150, 36, 'Paracetamol / NSAIDs PO/Topical', '#f59e0b')}
${box(380, 118, 120, 36, 'Joint Replacement', '#8b5cf6')}
${arrow(235, 154, 235, 175)}
${box(120, 177, 180, 40, 'Intra-Articular Corticosteroids (rescue)', '#f59e0b')}
${box(340, 177, 160, 40, 'Glucosamine: No clear benefit', '#64748b')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Common in elderly. Herbal remedies widely used. KEMSA supplies paracetamol, ibuprofen, diclofenac gel.</text>
</svg>`

export const RHEUM_ARTHRITIS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 5, 160, 30, 'Symmetrical Polyarthritis + AM Stiffness', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(40, 57, 130, 36, 'Diagnosis: RF + Anti-CCP + CRP/ESR + XR', '#3b82f6')}
${arrow(235, 93, 235, 113)}
${box(90, 115, 180, 36, 'DMARD (MTX 15-25mg weekly + folic)', '#10b981')}
${box(300, 115, 180, 36, 'NSAIDs + Prednisolone (bridge)', '#f59e0b')}
${arrow(180, 151, 130, 173)}
${arrow(390, 151, 390, 173)}
${box(20, 176, 200, 36, 'Triple: MTX + SSZ + HCQ', '#10b981')}
${box(250, 176, 190, 36, 'Biologic: TNFi / Rituximab', '#8b5cf6')}
${arrow(235, 212, 235, 232)}
${box(60, 235, 220, 30, 'Monitor: DAS28, ESR, CRP, XR hands/feet', '#64748b')}
<text x="20" y="275" font-size="9" fill="#64748b">KENYA: Low diagnosis rate. MTX + folic KEMSA supplied. Biologics limited — mostly Nairobi.</text>
</svg>`

export const GOUT_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Acute Monoarthritis (1st MTP)', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 130, 36, 'Acute: Colchicine / NSAID', '#f59e0b')}
${box(200, 57, 140, 36, 'Chronic: ULT (Allopurinol)', '#10b981')}
${box(380, 57, 120, 36, 'Lifestyle', '#3b82f6')}
${arrow(95, 93, 70, 115)}
${arrow(270, 93, 250, 115)}
${arrow(440, 93, 440, 115)}
${box(10, 118, 140, 36, 'Colchicine 1mg stat → 0.5mg 1h later', '#f59e0b')}
${box(180, 118, 160, 36, 'Start 100mg daily ↑ to 300mg x 6mo', '#10b981')}
${box(380, 118, 120, 36, 'Reduce purines, alcohol', '#3b82f6')}
${arrow(235, 154, 235, 175)}
${box(120, 177, 170, 40, 'Corticosteroid (if CI to NSAID/colchicine)', '#f59e0b')}
${box(340, 177, 150, 40, 'Target: UA <360 µmol/L (<300 if tophi)', '#64748b')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Increasing. Associated with hypertension, CKD, metabolic syndrome. Allopurinol on KEMSA list.</text>
</svg>`

export const OSTEOPOROSIS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Silent: Low BMD → Fragility Fx', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(50, 57, 150, 36, 'Screening: DXA (T-score <= -2.5)', '#3b82f6')}
${box(260, 57, 150, 36, 'FRAX Risk Calculator', '#f59e0b')}
${arrow(235, 93, 235, 113)}
${box(50, 115, 160, 36, 'Bisphosphonate: Alendronate 70mg weekly', '#10b981')}
${box(260, 115, 140, 36, 'Vitamin D 800IU + Ca 1g daily', '#f59e0b')}
${box(440, 115, 60, 36, 'Denosumab', '#8b5cf6')}
${arrow(235, 151, 235, 173)}
${box(90, 176, 200, 36, 'Monitor: DXA q2yr + renal function', '#64748b')}
${box(330, 176, 150, 36, 'Lifestyle: weight-bearing exercise', '#10b981')}
<text x="20" y="235" font-size="9" fill="#64748b">KENYA: Under-diagnosed. Risk: menopause, steroid use, low calcium intake. KEMSA: alendronate, calcium, vitamin D.</text>
</svg>`

export const LOW_BACK_PAIN_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Low Back Pain >6 weeks', '#f59e0b')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 140, 36, 'Non-Specific (90%)', '#10b981')}
${box(190, 57, 140, 36, 'Red Flags → Urgent', '#ef4444')}
${box(370, 57, 130, 36, 'Radiculopathy', '#3b82f6')}
${arrow(100, 93, 70, 115)}
${arrow(260, 93, 250, 115)}
${arrow(435, 93, 435, 115)}
${box(10, 118, 150, 36, 'Stay active + NSAID + Paracetamol', '#10b981')}
${box(190, 118, 150, 36, 'Cauda Equina → MRI + Surgery', '#ef4444')}
${box(370, 118, 130, 36, 'Neuro exam + MRI → Surgery vs conservative', '#3b82f6')}
${arrow(235, 154, 235, 175)}
${box(70, 177, 200, 40, 'Chronic: Physio + CBT + TENS + ADL advice', '#f59e0b')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Common cause of disability. Heavy manual labour, prolonged bending risk factors. KEMSA supplies NSAIDs.</text>
</svg>`

export const CONTACT_DERM_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Pruritic Rash at Contact Site', '#f59e0b')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 140, 36, 'Irritant (acute)', '#f59e0b')}
${box(190, 57, 140, 36, 'Allergic (delayed >24h)', '#3b82f6')}
${box(370, 57, 130, 36, 'Patch Test', '#8b5cf6')}
${arrow(100, 93, 70, 115)}
${arrow(260, 93, 250, 115)}
${arrow(435, 93, 435, 115)}
${box(10, 118, 150, 36, 'Avoid irritant + Emollient', '#f59e0b')}
${box(190, 118, 150, 36, 'Topical CS + Allergen Avoidance', '#3b82f6')}
${box(380, 118, 120, 36, 'Patch test results', '#8b5cf6')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'Severe: Prednisolone 20-40mg PO tapering', '#ef4444')}
${box(310, 177, 170, 40, 'Chronic: Emollients + steroid-sparing', '#f59e0b')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Common: hair dyes, topical traditional medicines, nickel jewellery, rubber. Patch test limited.</text>
</svg>`

export const PSORIASIS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Plaques + Scaling + Nail changes', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 140, 36, 'Mild: Topical', '#10b981')}
${box(190, 57, 140, 36, 'Moderate: Phototherapy', '#f59e0b')}
${box(370, 57, 130, 36, 'Severe: Systemic/Biologic', '#ef4444')}
${arrow(100, 93, 70, 115)}
${arrow(260, 93, 250, 115)}
${arrow(435, 93, 435, 115)}
${box(10, 118, 150, 36, 'CS cream + Calcipotriol', '#10b981')}
${box(190, 118, 150, 36, 'UVB Narrowband', '#f59e0b')}
${box(370, 118, 130, 36, 'MTX / Ciclosporin / Biologic', '#ef4444')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'Screen: PsA (30% develop arthritis)', '#f59e0b')}
${box(310, 177, 170, 40, 'Monitor: assess PASI + DLQI', '#64748b')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Underdiagnosed. HIV-associated severe psoriasis seen. Topicals available; UVB limited. MTX KEMSA supplied.</text>
</svg>`

export const ACNE_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(170, 5, 130, 30, 'Acne Vulgaris (Comedones + Lesions)', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 130, 36, 'Mild', '#10b981')}
${box(190, 57, 130, 36, 'Moderate', '#f59e0b')}
${box(370, 57, 130, 36, 'Severe / Cystic', '#ef4444')}
${arrow(95, 93, 70, 115)}
${arrow(255, 93, 250, 115)}
${arrow(435, 93, 435, 115)}
${box(10, 118, 140, 36, 'Topical Retinoid / BPO', '#10b981')}
${box(180, 118, 150, 36, 'Topical + Oral AB (Doxycycline)', '#f59e0b')}
${box(370, 118, 130, 36, 'Isotretinoin 0.5-1mg/kg', '#ef4444')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'Maintain: Topical retinoid + sunscreen', '#10b981')}
${box(310, 177, 170, 40, 'Isotretinoin: monitor LFTs, lipids, psych', '#ef4444')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Common. Topical tretinoin and doxycycline available. Isotretinoin requires specialist approval.</text>
</svg>`

export const HEARING_LOSS_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 5, 160, 30, 'Hearing Loss (Conductive vs Sensorineural)', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 140, 36, 'Conductive', '#10b981')}
${box(200, 57, 140, 36, 'Sensorineural', '#8b5cf6')}
${box(380, 57, 120, 36, 'Mixed', '#f59e0b')}
${arrow(100, 93, 70, 115)}
${arrow(270, 93, 250, 115)}
${arrow(440, 93, 440, 115)}
${box(10, 118, 150, 36, 'Wax removal / Myringotomy', '#10b981')}
${box(200, 118, 150, 36, 'Hearing Aid / Cochlear Implant', '#8b5cf6')}
${box(380, 118, 120, 36, 'Treat both components', '#f59e0b')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'Rinne + Weber Tuning Fork Tests', '#3b82f6')}
${box(310, 177, 170, 40, 'Audiometry → Refer to ENT', '#f59e0b')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Chronic otitis media common in children. Noise-induced hearing loss in industry. Limited audiology services.</text>
</svg>`

export const OTITIS_MEDIA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(160, 5, 150, 30, 'Ear Pain + Fever (child 6-24mo)', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(140, 57, 190, 36, 'O/E: Bulging TM Reduced Mobility', '#f59e0b')}
${arrow(235, 93, 235, 113)}
${box(60, 115, 150, 36, 'Observation 48h (mild)', '#10b981')}
${box(260, 115, 160, 36, 'Amoxicillin 50mg/kg TDS x 5-7d', '#3b82f6')}
${arrow(180, 151, 125, 173)}
${arrow(340, 151, 340, 173)}
${box(20, 176, 200, 36, 'Paracetamol + Analgesic Ear Drops', '#10b981')}
${box(260, 176, 180, 36, 'Amoxicillin-Clavulanate if failed 72h', '#f59e0b')}
<text x="20" y="233" font-size="9" fill="#64748b">KENYA: Common post-URTI. IMCI includes AOM diagnosis. KEMSA supplies amoxicillin. Watch for mastoiditis.</text>
</svg>`

export const BREAST_CA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(140, 5, 190, 30, 'Breast Lump + Skin/Tethered Changes', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 130, 36, 'Triple Assessment', '#3b82f6')}
${box(190, 57, 140, 36, 'Staging', '#f59e0b')}
${box(370, 57, 130, 36, 'Treatment', '#10b981')}
${arrow(95, 93, 65, 115)}
${arrow(260, 93, 250, 115)}
${arrow(435, 93, 435, 115)}
${box(10, 118, 140, 36, 'CBE + USS/Mammo + Biopsy', '#3b82f6')}
${box(180, 118, 150, 36, 'CT/MRI + PET (if high risk)', '#f59e0b')}
${box(370, 118, 130, 36, 'Surgery + Radiotherapy', '#10b981')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'Tamoxifen for ER+ (5-10yr)', '#10b981')}
${box(310, 177, 170, 40, 'Chemo: AC → Paclitaxel (TNM stage)', '#ef4444')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Most common female cancer. Late presentation common. KEMSA: tamoxifen, doxorubicin, paclitaxel.</text>
</svg>`

export const PROSTATE_CA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(140, 5, 190, 30, 'Prostate Cancer (often asymptomatic)', '#3b82f6')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 130, 36, 'Screening', '#3b82f6')}
${box(190, 57, 140, 36, 'Diagnosis', '#f59e0b')}
${box(370, 57, 130, 36, 'Grading + Staging', '#ef4444')}
${arrow(95, 93, 65, 115)}
${arrow(260, 93, 250, 115)}
${arrow(435, 93, 435, 115)}
${box(10, 118, 140, 36, 'PSA + DRE', '#3b82f6')}
${box(180, 118, 150, 36, 'TRUS-guided Biopsy', '#f59e0b')}
${box(370, 118, 130, 36, 'Gleason + TNM + PSA level', '#ef4444')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'Localised: Surgery / Radiotherapy / AS', '#10b981')}
${box(310, 177, 170, 40, 'Metastatic: ADT + Antiandrogen', '#f59e0b')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Second most common male cancer. Late presentation. KEMSA: bicalutamide, leuprolide.</text>
</svg>`

export const CERVICAL_CA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(130, 5, 210, 30, 'HPV → CIN → Cervical Cancer', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 130, 36, 'Screening', '#10b981')}
${box(190, 57, 140, 36, 'Diagnosis + Staging', '#f59e0b')}
${box(370, 57, 130, 36, 'Management', '#3b82f6')}
${arrow(95, 93, 65, 115)}
${arrow(260, 93, 250, 115)}
${arrow(435, 93, 435, 115)}
${box(10, 118, 140, 36, 'Pap Smear / HPV DNA / VIA', '#10b981')}
${box(180, 118, 150, 36, 'Colposcopy + Biopsy', '#f59e0b')}
${box(370, 118, 130, 36, 'Stage I-IV: Surgery + RT + Chemo', '#3b82f6')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'HPV Vaccine (9-14yr) for prevention', '#10b981')}
${box(310, 177, 170, 40, 'Advanced: Cisplatin + RT (chemoradiation)', '#ef4444')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Most common cancer in women. HPV vaccine in national schedule (girls 10-14yr). VIA widely used.</text>
</svg>`

export const LYMPHOMA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 5, 160, 30, 'Painless Lymphadenopathy + B Symptoms', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 140, 36, 'Hodgkin (Reed-Sternberg)', '#3b82f6')}
${box(190, 57, 140, 36, 'Non-Hodgkin (B-cell > T)', '#f59e0b')}
${box(370, 57, 130, 36, 'Diagnosis + Staging', '#8b5cf6')}
${arrow(100, 93, 70, 115)}
${arrow(260, 93, 250, 115)}
${arrow(435, 93, 435, 115)}
${box(10, 118, 150, 36, 'Excision Biopsy + IHC', '#3b82f6')}
${box(180, 118, 150, 36, 'PET-CT (Ann Arbor Staging)', '#f59e0b')}
${box(370, 118, 130, 36, 'ABVD / R-CHOP', '#ef4444')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'Hodgkin: ABVD x 2-6 cycles (± RT)', '#10b981')}
${box(310, 177, 170, 40, 'NHL: R-CHOP x 6 cycles (IPI risk)', '#f59e0b')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: HIV-associated NHL common. Hodgkin bimodal age distribution. KEMSA: chemo agents limited.</text>
</svg>`

export const LEUKAEMIA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 5, 160, 30, 'Fatigue + Bruising + Fever + Pancytopenia', '#ef4444')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 130, 36, 'AML / ALL (Acute)', '#ef4444')}
${box(190, 57, 140, 36, 'CLL / CML (Chronic)', '#f59e0b')}
${box(370, 57, 130, 36, 'Peripheral Blood + BM', '#3b82f6')}
${arrow(95, 93, 65, 115)}
${arrow(260, 93, 250, 115)}
${arrow(435, 93, 435, 115)}
${box(10, 118, 140, 36, 'Blasts >20% → Urgent', '#ef4444')}
${box(180, 118, 150, 36, 'CML: TKI (Imatinib)', '#10b981')}
${box(370, 118, 130, 36, 'BM Aspirate + Flow', '#3b82f6')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'ALL: Vincristine + Prednisolone + L-asparaginase', '#ef4444')}
${box(310, 177, 170, 40, 'AML: Cytarabine + Daunorubicin (7+3)', '#ef4444')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: ALL most common childhood cancer. KEMSA: imatinib, cytarabine, vincristine.</text>
</svg>`

export const HEADACHE_MIGRAINE_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 5, 160, 30, 'Recurrent Throbbing HA + Nausea + Photo/Aura', '#f59e0b')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 140, 36, 'Acute Treatment', '#3b82f6')}
${box(200, 57, 140, 36, 'Preventive (≥4/month)', '#10b981')}
${box(380, 57, 120, 36, 'Lifestyle', '#f59e0b')}
${arrow(100, 93, 70, 115)}
${arrow(270, 93, 250, 115)}
${arrow(440, 93, 440, 115)}
${box(10, 118, 150, 36, 'Sumatriptan 50-100mg PO/SC', '#3b82f6')}
${box(190, 118, 160, 36, 'Propranolol 40-80mg BID', '#10b981')}
${box(380, 118, 120, 36, 'Avoid triggers + Sleep', '#f59e0b')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'NSAIDs + Metoclopramide (mild-mod)', '#3b82f6')}
${box(310, 177, 170, 40, 'Amitriptyline / Topiramate / CGRPi', '#10b981')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Underdiagnosed. Sumatriptan available but limited. Prophylaxis often with propranolol or amitriptyline.</text>
</svg>`

export const DYSPHAGIA_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 5, 160, 30, 'Dysphagia (difficulty swallowing)', '#f59e0b')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 140, 36, 'Oropharyngeal', '#8b5cf6')}
${box(200, 57, 140, 36, 'Oesophageal', '#f59e0b')}
${box(380, 57, 120, 36, 'Investigations', '#3b82f6')}
${arrow(100, 93, 70, 115)}
${arrow(270, 93, 250, 115)}
${arrow(440, 93, 440, 115)}
${box(10, 118, 150, 36, 'Stroke / Neuromuscular → SALT', '#8b5cf6')}
${box(190, 118, 150, 36, 'Liquid vs Solid → OGD + Manometry', '#f59e0b')}
${box(380, 118, 120, 36, 'OGD + Barium Swallow', '#3b82f6')}
${box(10, 168, 150, 36, 'Aspiration pneumonia risk', '#ef4444')}
${box(190, 168, 150, 36, 'Achalasia: POEM / Heller myotomy', '#10b981')}
${box(380, 168, 120, 36, 'OGD with Biopsy', '#3b82f6')}
<text x="20" y="226" font-size="9" fill="#64748b">KENYA: Oesophageal cancer common (corridor). Plummer-Vinson syndrome (IDA + web) seen.</text>
</svg>`

export const CONSTIPATION_DIAGRAM = `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif;font-size:10px;fill:#334155}</style>${SVG_ARROW}
${box(155, 5, 160, 30, 'Constipation (<3 BMs/wk + straining)', '#f59e0b')}
${arrow(235, 35, 235, 55)}
${box(30, 57, 140, 36, 'Lifestyle (first-line)', '#10b981')}
${box(200, 57, 140, 36, 'Pharmacological', '#3b82f6')}
${box(380, 57, 120, 36, 'Red Flags → Investigate', '#ef4444')}
${arrow(100, 93, 70, 115)}
${arrow(270, 93, 250, 115)}
${arrow(440, 93, 440, 115)}
${box(10, 118, 150, 36, 'Fibre 20-30g + Fluids + Exercise', '#10b981')}
${box(190, 118, 150, 36, 'Senna / Bisacodyl / Lactulose', '#3b82f6')}
${box(380, 118, 120, 36, 'Weight loss, PR bleed, FHx CRC', '#ef4444')}
${arrow(235, 154, 235, 175)}
${box(60, 177, 200, 40, 'PEG 3350 (Macrogol) for faecal impaction', '#3b82f6')}
<text x="20" y="238" font-size="9" fill="#64748b">KENYA: Underacknowledged. Low-fibre diet, inadequate hydration. Opioid-induced constipation in palliative care.</text>
</svg>`