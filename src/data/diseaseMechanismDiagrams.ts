// Pathophysiology & mechanism diagrams in the visual style of Katzung,
// Guyton & Hall, and other clinical pharmacology texts. These show disease
// mechanisms and drug sites of action as signalling pathways / feedback
// loops rather than the treatment algorithms in diseaseDiagrams.ts.

export const SVG_ARROW_M = `<defs>
  <marker id="am" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/></marker>
  <marker id="amR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/></marker>
</defs>`

function mb(x: number, y: number, w: number, h: number, label: string, accent = '#3b82f6', tcolor = '#334155') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${accent}16" stroke="${accent}" stroke-width="1.6"/><text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle" font-size="10.5" font-weight="700" fill="${tcolor}">${label}</text>`
}
function tline(x1: number, y1: number, x2: number, y2: number, red = false, dash = false) {
  const col = red ? 'url(#amR)' : 'url(#am)'
  const d = dash ? ' stroke-dasharray="4 3"' : ''
  return `<path d="M ${x1} ${y1} L ${x2} ${y2}" stroke="${red ? '#ef4444' : '#64748b'}" stroke-width="1.6" marker-end="${col}"${d}/>`
}
function lab(x: number, y: number, text: string, color = '#64748b', size = 9.5, weight = 600) {
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}">${text}</text>`
}

// ── Hypertension: RAAS + SNS + baroreflex feedback loop ────────────────────
export const MECH_HTN = `<svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 20, 150, 40, '↓ Renal Perfusion', '#ef4444')}
${tline(95, 60, 95, 92)}
${mb(20, 92, 150, 40, 'Juxtaglomerular cells', '#3b82f6')}
${tline(170, 112, 240, 112)}
${mb(240, 92, 130, 40, 'Renin released', '#3b82f6')}
${tline(370, 112, 430, 112)}
${mb(430, 92, 110, 40, 'Angiotensin I', '#3b82f6')}
${tline(485, 132, 485, 168, false, true)}
${mb(430, 168, 110, 40, 'ACE (lung)', '#8b5cf6')}
${tline(430, 188, 360, 188)}
${mb(250, 168, 110, 40, 'Angiotensin II', '#8b5cf6')}
${tline(250, 188, 200, 188, true)}
${mb(40, 168, 150, 40, 'Aldosterone ↑', '#f59e0b')}
${tline(200, 208, 200, 240)}
${mb(40, 240, 150, 40, 'Na⁺/H₂O retention', '#f59e0b')}
${tline(200, 260, 280, 260)}
${mb(280, 240, 150, 40, '↑ Blood Volume', '#ef4444')}
${tline(430, 208, 430, 240, true)}
${mb(380, 240, 130, 40, 'Vasoconstriction', '#ef4444')}
${tline(355, 280, 280, 280)}
${mb(130, 280, 150, 36, '↑ Systemic VP → HTN', '#ef4444')}
${mb(40, 20, 150, 40, 'Sympathetic ↑', '#10b981')}
${tline(115, 60, 115, 90, false, true)}
${lab(20, 312, 'Baroreflex reset + RAAS/SNS overactivity sustain hypertension — drug targets: ACEi/ARB, CCB, thiazide, beta-blocker', '#64748b', 9, 600)}
</svg>`

// ── Heart Failure: forward failure & neurohormonal vicious cycle ───────────
export const MECH_HF = `<svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(30, 30, 160, 42, 'Myocardial injury / ↓ contractility', '#ef4444')}
${tline(110, 72, 110, 104)}
${mb(30, 104, 160, 42, '↓ Stroke Volume / CO', '#ef4444')}
${tline(110, 146, 110, 178, true)}
${mb(30, 178, 160, 42, '↓ Renal Perfusion', '#f59e0b')}
${tline(190, 199, 250, 199)}
${mb(250, 178, 130, 42, 'RAAS activation', '#3b82f6')}
${tline(315, 220, 315, 252)}
${mb(250, 252, 130, 42, 'Na⁺/H₂O retention', '#f59e0b')}
${tline(250, 273, 200, 273, true)}
${mb(60, 270, 130, 40, '↑ Preload / congestion', '#f59e0b')}
${tline(60, 270, 60, 220, true)}
${tline(200, 199, 200, 146, true)}
${mb(420, 104, 130, 42, 'SNS activation', '#10b981')}
${tline(420, 125, 380, 125, true)}
${tline(380, 125, 300, 125, true)}
${mb(200, 104, 90, 42, 'Tachycardia', '#10b981')}
${tline(200, 104, 200, 73, true)}
${lab(20, 312, 'Compensatory RAAS + SNS raise afterload & preload → adverse remodelling. GDMT breaks the cycle (ACEi/ARNI, BB, MRA, SGLT2i).', '#64748b', 9, 600)}
</svg>`

// ── Type 2 Diabetes: insulin resistance signalling failure ──────────────────
export const MECH_T2DM = `<svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 150, 40, 'Insulin receptor', '#3b82f6')}
${tline(95, 70, 95, 102)}
${mb(20, 102, 150, 40, 'IRS-1 / PI3K', '#3b82f6')}
${tline(170, 122, 240, 122)}
${mb(240, 102, 140, 40, 'GLUT4 translocation', '#10b981')}
${tline(310, 142, 310, 174)}
${mb(240, 174, 140, 40, 'Glucose uptake ↓', '#10b981')}
${tline(310, 214, 380, 214, true)}
${mb(380, 174, 150, 40, 'Hyperglycaemia', '#ef4444')}
${mb(20, 230, 150, 40, 'Insulin resistance', '#ef4444')}
${tline(95, 230, 95, 142, true, true)}
${lab(20, 300, 'Obesity/adipokines + genetic ↑ impair IRS-1 → GLUT4 fails → hepatic gluconeogenesis ↑. Targets: metformin (↓ gluconeogenesis),', '#64748b', 9, 600)}
${lab(20, 312, 'insulin sensitisers, SGLT2i, GLP-1 RA.', '#64748b', 9, 600)}
</svg>`

// ── Asthma: bronchoconstriction pathway & relaxation ───────────────────────
export const MECH_ASTHMA = `<svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 150, 40, 'Allergen / IgE', '#ef4444')}
${tline(95, 70, 95, 102)}
${mb(20, 102, 150, 40, 'Mast cell degranulation', '#ef4444')}
${tline(95, 142, 95, 174, true)}
${mb(20, 174, 150, 40, 'Leukotrienes, histamine', '#ef4444')}
${tline(170, 194, 240, 194)}
${mb(240, 174, 140, 40, 'Smooth muscle spasm', '#f59e0b')}
${tline(310, 214, 380, 214, true)}
${mb(380, 174, 150, 40, 'Bronchoconstriction', '#ef4444')}
${mb(240, 250, 140, 40, 'β₂-receptor', '#3b82f6')}
${tline(310, 250, 310, 214, false, true)}
${mb(380, 250, 150, 40, 'cAMP ↑ → relaxation', '#10b981')}
${tline(380, 250, 380, 214, false)}
${lab(20, 312, 'Inflammation → spasm; β₂-agonists ↑ cAMP (relax), anticholinergics block M3, leukotriene antagonists block CysLT1.', '#64748b', 9, 600)}
</svg>`

// ── NSAID / Pain: arachidonic acid cascade (COX-1 vs COX-2) ────────────────
export const MECH_NSAID = `<svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 160, 40, 'Phospholipids', '#64748b')}
${tline(100, 70, 100, 102)}
${mb(20, 102, 160, 40, 'Arachidonic acid (PLA₂)', '#64748b')}
${tline(100, 142, 100, 174, true)}
${mb(20, 174, 160, 40, 'COX-1 (constitutive)', '#3b82f6')}
${mb(220, 174, 160, 40, 'COX-2 (inducible)', '#8b5cf6')}
${tline(100, 214, 100, 246, true)}
${tline(300, 214, 300, 246, true)}
${mb(20, 246, 160, 40, 'TXA₂, PGs (housekeep)', '#3b82f6')}
${mb(220, 246, 160, 40, 'Inflam PGE₂, PGI₂', '#8b5cf6')}
${tline(100, 286, 180, 286, true)}
${tline(300, 286, 220, 286, true)}
${mb(180, 270, 200, 36, 'NSAIDs block both → analgesia + GI/renal ADR', '#ef4444')}
${lab(20, 312, 'Selective COX-2 inhibitors spare COX-1 (less GI bleed) but ↑ thrombotic risk; aspirin irreversibly inhibits platelet TXA₂.', '#64748b', 9, 600)}
</svg>`

// ── Coagulation: platelet plug & clot cascade (for anticoagulant teaching) ─
export const MECH_COAG = `<svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 160, 40, 'Vascular injury', '#ef4444')}
${tline(100, 70, 100, 102)}
${mb(20, 102, 160, 40, 'Tissue factor (TF)', '#8b5cf6')}
${tline(180, 122, 250, 122)}
${mb(250, 102, 150, 40, 'Extrinsic Xase (VIIa+TF)', '#8b5cf6')}
${tline(325, 142, 325, 174)}
${mb(250, 174, 150, 40, 'Xa (common pathway)', '#3b82f6')}
${tline(325, 214, 325, 246, true)}
${mb(250, 246, 150, 40, 'Thrombin (IIa)', '#3b82f6')}
${tline(325, 286, 400, 286, true)}
${mb(400, 262, 140, 40, 'Fibrin clot', '#ef4444')}
${mb(20, 174, 160, 40, 'Platelet adhesion', '#f59e0b')}
${tline(100, 214, 100, 246, true)}
${mb(20, 246, 160, 40, 'Platelet aggregation', '#f59e0b')}
${tline(180, 266, 250, 266, true)}
${lab(20, 312, 'Anticoagulants: heparins ↑ antithrombin; DOACs block Xa (apixaban) or IIa (dabigatran); warfarin ↓ II,VII,IX,X via vitamin K.', '#64748b', 9, 600)}
</svg>`

// ── Thyroid: HPT axis feedback (hypo/hyper) ────────────────────────────────
export const MECH_THYROID = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 150, 40, 'Hypothalamus TRH', '#3b82f6')}
${tline(95, 70, 95, 102)}
${mb(20, 102, 150, 40, 'Pituitary TSH', '#8b5cf6')}
${tline(95, 142, 95, 174, true)}
${mb(20, 174, 150, 40, 'Thyroid T₃/T₄', '#10b981')}
${tline(170, 194, 240, 194)}
${mb(240, 174, 150, 40, 'Metabolism ↑', '#10b981')}
${tline(315, 214, 315, 250, true)}
${mb(240, 250, 150, 40, 'Negative feedback', '#64748b')}
${tline(240, 270, 95, 270, true)}
${tline(95, 270, 95, 142, true, true)}
${lab(20, 292, 'Hyperthyroid: ↓TSH, ↑T₄. Hypothyroid: ↑TSH, ↓T₄. Graves = TSH-R Ab; hashimoto = autoimmune destruction.', '#64748b', 9, 600)}
</svg>`

// ── COPD: protease–antiprotease & small airway remodelling ─────────────────
export const MECH_COPD = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 160, 40, 'Cigarette smoke', '#ef4444')}
${tline(100, 70, 100, 102)}
${mb(20, 102, 160, 40, 'Neutrophil elastase ↑', '#ef4444')}
${tline(100, 142, 100, 174, true)}
${mb(20, 174, 160, 40, 'Alveolar destruction', '#ef4444')}
${tline(100, 214, 180, 214, true)}
${mb(180, 174, 160, 40, '↓ α₁-antitrypsin', '#f59e0b')}
${tline(260, 214, 200, 214, true)}
${mb(340, 174, 180, 40, 'Chronic inflammation', '#8b5cf6')}
${tline(430, 214, 430, 246, true)}
${mb(340, 246, 180, 40, 'Mucous hypersecretion', '#8b5cf6')}
${mb(20, 246, 160, 40, 'Emphysema + airflow limit', '#ef4444')}
${lab(20, 292, 'Smoking → protease/antiprotease imbalance + chronic bronchitis. LAMA/LABA dilate airways; ICS ↓ inflammation; O₂ if chronic hypoxaemia.', '#64748b', 9, 600)}
</svg>`

// ── Angina / Ischaemia: myocardial O₂ supply–demand mismatch ───────────────
export const MECH_ANGINA = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 160, 40, 'Atherosclerotic plaque', '#ef4444')}
${tline(100, 70, 100, 102)}
${mb(20, 102, 160, 40, 'Coronary stenosis', '#ef4444')}
${tline(100, 142, 100, 174, true)}
${mb(20, 174, 160, 40, '↓ O₂ supply', '#ef4444')}
${mb(220, 30, 160, 40, '↑ Demand (exertion)', '#f59e0b')}
${tline(300, 70, 300, 102)}
${mb(220, 102, 160, 40, 'Tachycardia / ↑Wk', '#f59e0b')}
${tline(300, 142, 300, 174, true)}
${mb(220, 174, 160, 40, '↑ O₂ demand', '#f59e0b')}
${tline(180, 214, 140, 214, true)}
${tline(380, 214, 300, 214, true)}
${mb(140, 196, 200, 40, 'Ischaemia → angina', '#ef4444')}
${lab(20, 292, 'Nitrates ↓ preload & dilate coronaries; beta-blockers ↓ HR & contractility; CCBs ↓ afterload. Revascularise if refractory.', '#64748b', 9, 600)}
</svg>`

// ── Peptic ulcer: acid–mucosal defence imbalance ───────────────────────────
export const MECH_PUD = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 160, 40, 'H. pylori / NSAIDs', '#ef4444')}
${tline(100, 70, 100, 102)}
${mb(20, 102, 160, 40, 'Gastrin ↑ / acid ↑', '#ef4444')}
${tline(100, 142, 100, 174, true)}
${mb(20, 174, 160, 40, 'Mucosal injury', '#ef4444')}
${mb(220, 30, 160, 40, '↓ Prostaglandin (NSAID)', '#f59e0b')}
${tline(300, 70, 300, 102)}
${mb(220, 102, 160, 40, '↓ HCO₃⁻ / mucus', '#f59e0b')}
${tline(300, 142, 300, 174, true)}
${mb(220, 174, 160, 40, 'Defence ↓', '#f59e0b')}
${tline(180, 214, 140, 214, true)}
${tline(380, 214, 300, 214, true)}
${mb(140, 196, 200, 40, 'Ulceration', '#ef4444')}
${lab(20, 292, 'PPIs ↓ H⁺/K⁺-ATPase (final acid step); H. pylori eradicated with PPI + 2 antibiotics; misoprostol restores prostaglandins.', '#64748b', 9, 600)}
</svg>`

// ── CKD: glomerular hypertension & nephron loss spiral ─────────────────────
export const MECH_CKD = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 160, 40, 'Diabetes / HTN', '#ef4444')}
${tline(100, 70, 100, 102)}
${mb(20, 102, 160, 40, 'Intraglomerular HTN', '#ef4444')}
${tline(100, 142, 100, 174, true)}
${mb(20, 174, 160, 40, 'Hyperfiltration', '#ef4444')}
${tline(100, 214, 180, 214, true)}
${mb(180, 174, 160, 40, 'Nephron loss', '#f59e0b')}
${tline(260, 214, 200, 214, true)}
${mb(20, 246, 160, 40, 'eGFR ↓ progressive', '#ef4444')}
${tline(100, 246, 100, 214, true, true)}
${mb(360, 174, 160, 40, 'Albuminuria', '#8b5cf6')}
${tline(360, 214, 340, 214, true)}
${lab(20, 292, 'ACEi/ARB ↓ intraglomerular pressure & albuminuria, slowing progression. Stage by eGFR; manage BP, glycaemia, complications.', '#64748b', 9, 600)}
</svg>`

// ── Depression: monoamine hypothesis & receptor down-regulation ────────────
export const MECH_DEPRESSION = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 160, 40, '↓ Serotonin (5-HT)', '#8b5cf6')}
${mb(20, 102, 160, 40, '↓ Noradrenaline', '#3b82f6')}
${tline(100, 142, 100, 174, true)}
${mb(20, 174, 160, 40, '↓ Monoamine signalling', '#64748b')}
${tline(180, 194, 240, 194, true)}
${mb(240, 174, 160, 40, '↓ Neurogenesis / BDNF', '#64748b')}
${tline(320, 214, 320, 246, true)}
${mb(240, 246, 160, 40, 'Depressive sx', '#ef4444')}
${mb(420, 102, 130, 40, 'SSRI ↑ 5-HT', '#10b981')}
${tline(420, 122, 380, 122, false, true)}
${lab(20, 292, 'SSRIs/SNRIs ↑ synaptic monoamines; therapeutic lag reflects receptor down-regulation & BDNF recovery, not immediate uptake block.', '#64748b', 9, 600)}
</svg>`

// ── Gout: urate crystal deposition cascade ─────────────────────────────────
export const MECH_GOUT = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 160, 40, '↑ Purine turnover', '#f59e0b')}
${tline(100, 70, 100, 102)}
${mb(20, 102, 160, 40, 'Hyperuricaemia', '#ef4444')}
${tline(100, 142, 100, 174, true)}
${mb(20, 174, 160, 40, 'Monosodium urate crystals', '#ef4444')}
${tline(100, 214, 180, 214, true)}
${mb(180, 174, 160, 40, 'Neutrophil influx', '#8b5cf6')}
${tline(260, 214, 200, 214, true)}
${mb(20, 246, 160, 40, 'Acute gout flare', '#ef4444')}
${mb(360, 102, 160, 40, 'Xanthine oxidase', '#3b82f6')}
${tline(440, 142, 440, 174, true)}
${mb(360, 174, 160, 40, 'Urate production', '#3b82f6')}
${tline(360, 174, 180, 174, true, true)}
${lab(20, 292, 'Allopurinol/febuxostat inhibit xanthine oxidase (↓ urate); colchicine/NSAIDs treat flares; uricosurics ↑ renal excretion.', '#64748b', 9, 600)}
</svg>`

// ── Sepsis: cytokine storm & vasodilation ──────────────────────────────────
export const MECH_SEPSIS = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 160, 40, 'Infection / PAMP', '#ef4444')}
${tline(100, 70, 100, 102)}
${mb(20, 102, 160, 40, 'Macrophage TLR激活', '#ef4444')}
${tline(100, 142, 100, 174, true)}
${mb(20, 174, 160, 40, 'TNF-α / IL-6 storm', '#ef4444')}
${tline(100, 214, 180, 214, true)}
${mb(180, 174, 160, 40, 'Endothelial injury', '#8b5cf6')}
${tline(260, 214, 200, 214, true)}
${mb(20, 246, 160, 40, 'Vasodilation → shock', '#ef4444')}
${mb(360, 102, 160, 40, 'Coagulation activation', '#f59e0b')}
${tline(440, 142, 440, 174, true)}
${mb(360, 174, 160, 40, 'Microthrombosis', '#f59e0b')}
${tline(360, 174, 180, 174, true, true)}
${lab(20, 292, 'Source control + early broad-spectrum antibiotics; fluid resuscitation, vasopressors (noradrenaline), and organ support per Sepsis-3.', '#64748b', 9, 600)}
</svg>`

// ── Asthma vs COPD quick comparison (mechanism axis) ───────────────────────
export const MECH_ASTHMA_COPD = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:system-ui,sans-serif}</style>${SVG_ARROW_M}
${mb(20, 30, 200, 40, 'ASTHMA: reversible', '#3b82f6')}
${mb(20, 86, 200, 40, 'Eosinophilic inflammation', '#3b82f6')}
${mb(20, 142, 200, 40, 'Smooth muscle hyperreactivity', '#3b82f6')}
${mb(20, 198, 200, 40, 'Reversible airflow limit', '#3b82f6')}
${mb(340, 30, 200, 40, 'COPD: progressive', '#ef4444')}
${mb(340, 86, 200, 40, 'Neutrophil + protease', '#ef4444')}
${mb(340, 142, 200, 40, 'Fixed airway remodelling', '#ef4444')}
${mb(340, 198, 200, 40, 'Irreversible airflow limit', '#ef4444')}
${lab(20, 292, 'Asthma responds to β₂-agonist & ICS; COPD needs LAMA/LABA ± ICS and smoking cessation. Overlap syndrome shares features.', '#64748b', 9, 600)}
</svg>`

export const PATHOPHYSIOLOGY_DIAGRAMS: Record<string, string> = {
  'dnote-htn': MECH_HTN,
  'dnote-hf': MECH_HF,
  'dnote-t2dm': MECH_T2DM,
  'dnote-t1dm': MECH_T2DM,
  'dnote-asthma': MECH_ASTHMA,
  'dnote-copd': MECH_COPD,
  'dnote-dvt-pe': MECH_COAG,
  'dnote-stroke': MECH_COAG,
  'dnote-thyroid': MECH_THYROID,
  'dnote-angina': MECH_ANGINA,
  'dnote-pud': MECH_PUD,
  'dnote-ckd': MECH_CKD,
  'dnote-depression': MECH_DEPRESSION,
  'dnote-gout': MECH_GOUT,
  'dnote-sepsis': MECH_SEPSIS,
  'dnote-neonatal-sepsis': MECH_SEPSIS,
}
