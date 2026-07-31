import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const files = [
  join(root, 'scripts/out/exam-pharm-chemo.json'),
  join(root, 'scripts/out/exam-pharm-resp-renal-git.json'),
  join(root, 'scripts/out/pharm-autonomic.json'),
]

for (const fp of files) {
  let text = readFileSync(fp, 'utf8')
  const before = text.length
  // Remove invalid backslash escapes: a backslash followed by any char that isn't " \ / b f n r t u
  text = text.replace(/\\([^"\\\/bfnrtu])/g, '$1')
  writeFileSync(fp, text, 'utf8')
  console.log(`Fixed ${fp} (${before} -> ${text.length} chars)`)
}
