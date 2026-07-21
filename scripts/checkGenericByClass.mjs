import { readFileSync } from 'fs'
const src = readFileSync('src/data/drugIndexData.ts', 'utf-8')
const lines = src.split('\n')
const classCounts = {}
for (const l of lines) {
  if (l.includes('Pharmacological agent')) {
    const m = l.match(/"drug_class":\s*"([^"]+)"/)
    if (m) {
      const dc = m[1]
      classCounts[dc] = (classCounts[dc] || 0) + 1
    }
  }
}
Object.entries(classCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(v, 'x', k))
