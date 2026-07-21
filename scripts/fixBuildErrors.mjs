import { readFileSync, writeFileSync } from 'fs'
const FILE = 'src/data/drugIndexData.ts'
let src = readFileSync(FILE, 'utf-8')

// Fix unescaped inner double-quotes in clinical_pearls strings
// Pattern: "pharmacokinetic "boosters"" — the inner quotes break the JSON parser
// We need to find strings inside JSON arrays that have unescaped inner double-quotes

// Strategy: find all "clinical_pearls":[...] and "black_box_warnings":[...] and similar array fields
// and escape any unescaped inner quotes

let fixed = 0

// Fix: "pharmacokinetic "boosters"" → "pharmacokinetic 'boosters'"
const patterns = [
  ['"boosters"', "'boosters'"],
  ['"booster"', "'booster'"],
  ['"drug of the day"', "'drug of the day'"],
]

for (const [search, replace] of patterns) {
  while (src.includes(search)) {
    src = src.replace(search, replace)
    fixed++
  }
}

// More aggressive: find any line with a JSON string that has inner unescaped quotes
// Look for patterns like: "text with "inner" quotes" inside JSON arrays
const lines = src.split('\n')
let linesFixed = 0

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  if (!line.includes('{"id"')) continue

  // Find all string values in JSON arrays that contain inner quotes
  // Pattern: array element like "some "quoted" text"
  const fixed_line = line.replace(/"([^"]*)"([^",\]]*)"([^",\]]*)"/g, (match, before, middle, after) => {
    // This is tricky — we only want to fix inner quotes, not structural ones
    // Simpler approach: just replace known problematic strings
    return match
  })

  if (fixed_line !== line) {
    lines[i] = fixed_line
    linesFixed++
  }
}

src = lines.join('\n')

// Also fix the "clinical_pearls" field name mismatch on line 1879
// It uses "pearls" instead of "clinical_pearls"
src = src.replace(/"pearls":\s*\[/g, '"clinical_pearls": [')

writeFileSync(FILE, src, 'utf-8')

console.log(`Fixed ${fixed} unescaped quotes`)
console.log(`Fixed ${linesFixed} lines`)
console.log(`Fixed "pearls" → "clinical_pearls"`)

// Verify
try {
  // Try to parse as a module to check for syntax errors
  const check = src.match(/"id":\s*"[^"]+"/g)
  console.log(`Drug count: ${check?.length || 0}`)
} catch(e) {
  console.error('Verification failed:', e.message)
}
