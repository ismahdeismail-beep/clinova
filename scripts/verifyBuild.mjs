import { readFileSync } from 'fs'
const src = readFileSync('src/data/drugIndexData.ts', 'utf-8')
const lines = src.split('\n')
console.log('Total lines:', lines.length)

// Check for inner double-quote issues
let issues = 0
for (let i = 0; i < lines.length; i++) {
  const l = lines[i]
  if (l.includes('"boosters"') || l.includes('"booster"')) {
    console.log('Inner quotes at line', i + 1)
    issues++
  }
}
console.log('Inner quote issues:', issues)

// Check drug count
const drugCount = (src.match(/"id":\s*"[^"]+"/g) || []).length + (src.match(/\bid\s*:\s*'[^']+'/g) || []).length
console.log('Drug count:', drugCount)

// Try to verify by attempting dynamic import
try {
  const mod = await import('../src/data/drugIndexData.ts')
  console.log('Import successful, BUNDLED_DRUGS length:', mod.BUNDLED_DRUGS?.length)
} catch (e) {
  console.log('Import error:', e.message.substring(0, 200))
}
