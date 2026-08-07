// Clinical text sanitizer — strips Unicode symbols that carry no medical
// meaning (trend arrows, decorative bullets, micro signs, sub/superscripts)
// so AI-generated lab values and data always render as readable plain text.
// Shared by the server gateway (buffered outputs) and the client (streaming).

function normalizeSuperscripts(text: string): string {
  const map: Record<string, string> = {
    '\u2070': '0',
    '\u00B9': '1',
    '\u00B2': '2',
    '\u00B3': '3',
    '\u2074': '4',
    '\u2075': '5',
    '\u2076': '6',
    '\u2077': '7',
    '\u2078': '8',
    '\u2079': '9',
  }
  return text.replace(/[\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079]/g, (ch) => map[ch] ?? ch)
}

function normalizeSubscripts(text: string): string {
  const map: Record<string, string> = {
    '\u2080': '0',
    '\u2081': '1',
    '\u2082': '2',
    '\u2083': '3',
    '\u2084': '4',
    '\u2085': '5',
    '\u2086': '6',
    '\u2087': '7',
    '\u2088': '8',
    '\u2089': '9',
  }
  return text.replace(/[\u2080-\u2089]/g, (ch) => map[ch] ?? ch)
}

/**
 * Converts meaningless glyphs into medically meaningful plain text:
 * - Trend arrows (↑ ↓ ↗ ↘ → ←) become "elevated" / "decreased" / "to" / "from"
 * - Micro signs (µ μ) become renderable units (mcg, umol, uL)
 * - Decorative bullets / checkmarks / emoji are removed
 * - Sub/superscript digits are flattened to caret or plain digits
 */
export function sanitizeClinicalText(text: string): string {
  if (!text) return text
  return (
    text
      // micro signs in units — renderable spellings first (longest match wins)
      .replace(/µg|μg/g, 'mcg')
      .replace(/µmol|μmol/g, 'umol')
      .replace(/µl|μl|µL|μL/g, 'uL')
      .replace(/µm|μm/g, 'um')
      .replace(/µ|μ/g, 'u')
      // trend arrows → words
      .replace(/↑/g, 'elevated')
      .replace(/↓/g, 'decreased')
      .replace(/↗/g, 'increased')
      .replace(/↘/g, 'decreased')
      .replace(/→/g, ' to ')
      .replace(/←/g, ' from ')
      // decorative / non-medical glyphs
      .replace(/[✓✔✗✘℞]/g, (m) => (m === '℞' ? 'Rx' : ''))
      .replace(/[■□●○◆◇▲△▼▸▹►▶◄◀•·∙]/g, '')
      .replace(/[★☆✦✧]/g, '')
      .replace(/⚠️?/g, '')
      .replace(/‼️?|❕|❗/g, '')
      .replace(/ℓ/g, 'L')
      .replace(/[–—]/g, (m) => (m === '–' ? '-' : '-'))
      // flatten sub/superscript digits to plain notation
      .replace(/([\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079]+)/g, (m) => `^${normalizeSuperscripts(m)}`)
      .replace(/[\u2080-\u2089]+/g, (m) => normalizeSubscripts(m))
      .replace(/\s{2,}/g, ' ')
      .trim()
  )
}
