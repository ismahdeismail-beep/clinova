import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function readJSON(path) {
  let text = readFileSync(path, 'utf8')
  // Remove invalid backslash escapes before parsing
  text = text.replace(/\\([^"\\/bfnrtu])/g, '$1')
  return JSON.parse(text)
}

// Reads a JSON fragment (no outer braces) by wrapping it
function readWrapped(path) {
  let text = readFileSync(path, 'utf8')
  text = text.replace(/\\([^"\\/bfnrtu])/g, '$1')
  return JSON.parse('{' + text + '}')
}

let main = readFileSync(join(root, 'src/data/examPrepPapers.ts'), 'utf8')
const eol = main.includes('\r\n') ? '\r\n' : '\n'
console.log('Line ending:', eol === '\r\n' ? 'CRLF' : 'LF')

// Serialize a variant the same way the file already does:
// JSON.stringify(v, null, 4) with every line indented by 4 more spaces.
function variantBody(vObj) {
  const json = JSON.stringify(vObj, null, 4)
  return json
    .split('\n')
    .map((l) => '    ' + l)
    .join(eol)
}

const units = [
  {
    id: 'pharm-general',
    getVariants: () => {
      const o = readWrapped(join(root, 'src/data/pharm-general-v2-v3.json'))
      return [o['pharm-general']['2'], o['pharm-general']['3']]
    },
  },
  {
    id: 'pharm-autonomic',
    getVariants: () => {
      const o = readWrapped(join(root, 'src/data/pharm-autonomic-v2-v3.json'))
      return [o['2'], o['3']]
    },
  },
  {
    id: 'pharm-autacoids-cns',
    getVariants: () => {
      const o = readJSON(join(root, 'scripts/out/pharm-autacoids-cns.json'))
      return [o['pharm-autacoids-cns']['2'], o['pharm-autacoids-cns']['3']]
    },
  },
  {
    id: 'pharm-cvs',
    getVariants: () => {
      const o = readJSON(join(root, 'scripts/out/pharm-cvs.json'))
      return [o['pharm-cvs']['2'], o['pharm-cvs']['3']]
    },
  },
  {
    id: 'pharm-resp-renal-git',
    getVariants: () => {
      const o = readJSON(join(root, 'scripts/out/exam-pharm-resp-renal-git.json'))
      const u = o['exam-pharm-resp-renal-git']
      // Drop the " Pharmacology" suffix so titles match variant 1 ("Respiratory, Renal & GIT")
      for (const k of Object.keys(u)) u[k].title = u[k].title.replace(/ Pharmacology$/, '')
      return [u['2'], u['3']]
    },
  },
  {
    id: 'pharm-chemo',
    getVariants: () => {
      const o = readJSON(join(root, 'scripts/out/exam-pharm-chemo.json'))
      return [o['exam-pharm-chemo']['2'], o['exam-pharm-chemo']['3']]
    },
  },
  {
    id: 'pharm-anticancer-endo',
    getVariants: () => {
      const o = readJSON(join(root, 'scripts/out/pharm-anticancer-endo.json'))
      return [o['pharm-anticancer-endo']['2'], o['pharm-anticancer-endo']['3']]
    },
  },
  {
    id: 'pharm-toxicology',
    getVariants: () => {
      const o = readJSON(join(root, 'scripts/out/pharm-toxicology.json'))
      return [o['pharm-toxicology']['2'], o['pharm-toxicology']['3']]
    },
  },
]

// Marker: end of variant 1 (`    }`) + end of the unit (`  },`)
const marker = eol + '    }' + eol + '  },'

let inserted = 0
for (const u of units) {
  const key = '  "' + u.id + '": {'
  const keyPos = main.indexOf(key)
  if (keyPos === -1) throw new Error('Unit not found: ' + u.id)

  const rel = main.slice(keyPos)
  const mIdx = rel.indexOf(marker)
  if (mIdx === -1) throw new Error('Cannot find variant-1 close for ' + u.id)

  const closePos = keyPos + mIdx // start of the eol before `    }`
  const beforeClose = main.slice(keyPos, closePos)
  if (beforeClose.includes('  "2":')) throw new Error(u.id + ' already contains variant 2')

  const [v2, v3] = u.getVariants()
  const insert =
    ',' +
    eol +
    '    "2": ' +
    variantBody(v2) +
    ',' +
    eol +
    '    "3": ' +
    variantBody(v3)

  const afterVar1 = closePos + (eol + '    }').length
  main = main.slice(0, afterVar1) + insert + main.slice(afterVar1)
  inserted++
  console.log(
    'Inserted variants 2&3 for ' +
      u.id +
      ' (v2: ' +
      (v2.sections || []).reduce((a, s) => a + (s.questions ? s.questions.length : 0), 0) +
      'q, v3: ' +
      (v3.sections || []).reduce((a, s) => a + (s.questions ? s.questions.length : 0), 0) +
      'q)'
  )
}

// Update the stale header comment (8 subjects -> 8 clinical-pharmacy + 8 pharmacology)
main = main.replace(
  '// 8 clinical-pharmacy subjects x 3 papers each (standard format A=30 / B=40 / C=30 = 100 marks).',
  '// 8 clinical-pharmacy subjects + 8 pharmacology subjects x 3 papers each (standard format A=30 / B=40 / C=30 = 100 marks).'
)

writeFileSync(join(root, 'src/data/examPrepPapers.ts'), main, 'utf8')
console.log('Done! Inserted variants for ' + inserted + ' units.')
