// Clinical text sanitizer — repairs mojibake, then strips Unicode symbols that
// carry no medical meaning (trend arrows, decorative bullets, micro signs,
// sub/superscripts) so AI-generated lab values and data always render as
// readable plain text. Shared by the server gateway (buffered outputs) and the
// client (streaming).

// ---------------------------------------------------------------------------
// Mojibake repair
//
// Content that was double-encoded (UTF-8 bytes misread as Windows-1252) shows
// garbled sequences like â€™ (apostrophe), â‰¥ (≥), Âµ (µ), â†‘ (↑).
// We rebuild the original Unicode character by re-interpreting the cp1252
// characters as the bytes they stand for. The mojibake strings are built
// programmatically from the cp1252 byte table so they match the real bytes
// found in corrupted files exactly.
// ---------------------------------------------------------------------------

// cp1252: byte -> character (only the bytes that differ from Latin-1)
const CP1252_CHAR: Record<number, string> = {
  0x80: '\u20AC', 0x82: '\u201A', 0x83: '\u0192', 0x84: '\u201E', 0x85: '\u2026',
  0x86: '\u2020', 0x87: '\u2021', 0x88: '\u02C6', 0x89: '\u2030', 0x8A: '\u0160',
  0x8B: '\u2039', 0x8C: '\u0152', 0x8E: '\u017D', 0x91: '\u2018', 0x92: '\u2019',
  0x93: '\u201C', 0x94: '\u201D', 0x95: '\u2022', 0x96: '\u2013', 0x97: '\u2014',
  0x98: '\u02DC', 0x99: '\u2122', 0x9A: '\u0161', 0x9B: '\u203A', 0x9C: '\u0153',
  0x9E: '\u017E', 0x9F: '\u0178',
}

// inverse: character -> byte
const CP1252_BYTE: Record<string, number> = {}
for (const [byte, ch] of Object.entries(CP1252_CHAR)) CP1252_BYTE[ch] = Number(byte)

function cp1252ByteOf(ch: string): number {
  return ch in CP1252_BYTE ? CP1252_BYTE[ch] : ch.charCodeAt(0) // 0xA0–0xFF map to themselves
}

function mojibakeFor(codePoint: number): string {
  const bytes = new TextEncoder().encode(String.fromCodePoint(codePoint))
  let s = ''
  for (const b of bytes) s += CP1252_CHAR[b] ?? String.fromCharCode(b)
  return s
}

// Unicode characters that appear as 3-byte UTF-8 (E2 xx xx) mojibake in the data
const TARGETS_3BYTE = [
  0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E, // quotes
  0x2013, 0x2014, // dashes
  0x2026, 0x2022, // ellipsis, bullet
  0x2009, 0x202F, 0x200B, // thin space, narrow nbsp, zero-width space
  0x2191, 0x2192, 0x2193, 0x2197, 0x2198, // arrows ↑ → ↓ ↗ ↘
  0x2265, 0x2264, 0x2248, 0x2260, // ≥ ≤ ≈ ≠
  0x2212, 0x221A, // minus, root
  0x207A, 0x207B, 0x207C, 0x207D, 0x207E, 0x207F, // superscripts ⁺ ⁻ ⁼ ⁽ ⁾ ⁿ
  0x2080, 0x2081, 0x2082, 0x2083, 0x2084, 0x2085, 0x2086, 0x2087, 0x2088, 0x2089, // subscripts ₀-₉
  0x2122, 0x2030, // ™ ‰
]

// Build replacements sorted by mojibake length (longest first)
const MOJI3_REPLACEMENTS: Array<[string, string]> = TARGETS_3BYTE.map(
  (cp): [string, string] => [mojibakeFor(cp), String.fromCodePoint(cp)]
).sort((a, b) => b[0].length - a[0].length)

function decodeMojibake(text: string): string {
  if (!text) return text
  let s = text
  // 3-byte family (E2 xx xx): exact string replacement, longest first
  for (const [moji, real] of MOJI3_REPLACEMENTS) {
    if (s.includes(moji)) s = s.split(moji).join(real)
  }
  // 2-byte family (C2/C3/CE/CF + continuation byte): scan char by char
  let out = ''
  let i = 0
  while (i < s.length) {
    const code = s.charCodeAt(i)
    if (code === 0xc2 || code === 0xc3 || code === 0xce || code === 0xcf) {
      const next = s[i + 1]
      if (next !== undefined) {
        const cont = cp1252ByteOf(next)
        if (cont >= 0x80 && cont <= 0xbf) {
          const decoded = ((code & 0x1f) << 6) | (cont & 0x3f)
          out += String.fromCharCode(decoded)
          i += 2
          continue
        }
      }
    }
    out += s[i]
    i++
  }
  s = out
  // Stray Â / Ã left over from partial decodes
  s = s.replace(/[\u00C2\u00C3]/g, '')
  // Thin space / narrow nbsp / nbsp from decodes → plain space
  s = s.replace(/[\u2009\u202F\u00A0]/g, ' ')
  return s
}

// ---------------------------------------------------------------------------
// Superscript / subscript flattening
// ---------------------------------------------------------------------------

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
 * - Repairs cp1252 mojibake (â‰¥ → ≥, Âµ → µ, â€™ → ' …)
 * - Normalizes ASCII >= / <= to proper ≥ / ≤
 * - Trend arrows (↑ ↓ ↗ ↘ → ←) become "elevated" / "decreased" / "to" / "from"
 * - Micro signs (µ μ) become renderable units (mcg, umol, uL)
 * - Decorative bullets / checkmarks / emoji are removed
 * - Sub/superscript digits are flattened to caret or plain digits
 */
export function sanitizeClinicalText(text: string): string {
  if (!text) return text
  return (
    decodeMojibake(text)
      // curly quotes → straight (after mojibake repair, before other ops)
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      // ASCII comparison operators → proper symbols (lab ranges, targets)
      .replace(/>=/g, '≥')
      .replace(/<=/g, '≤')
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

export { decodeMojibake }
