const fs = require('fs')
const path = require('path')

const keysDir = path.join(__dirname, 'out', 'answer-keys')
const parsedDir = path.join(__dirname, 'out', 'parsed-papers')

const keyFiles = fs.readdirSync(keysDir).filter((f) => f.endsWith('.json'))

let allOk = true
for (const kf of keyFiles) {
  const key = JSON.parse(fs.readFileSync(path.join(keysDir, kf), 'utf8'))
  const parsedPath = path.join(parsedDir, `${key.code}.json`)
  if (!fs.existsSync(parsedPath)) {
    console.log(`[MISSING PARSED] ${kf} -> ${key.code}.json`)
    allOk = false
    continue
  }
  const paper = JSON.parse(fs.readFileSync(parsedPath, 'utf8'))
  const s = paper.sections
  const ok =
    key.a && key.a.length === s.A.length &&
    key.b && key.b.length === s.B.length &&
    key.c && key.c.length === s.C.length
  const status = ok ? 'OK  ' : 'FAIL'
  console.log(
    `${status} ${key.code} key(${key.a ? key.a.length : '?'}/${key.b ? key.b.length : '?'}/${key.c ? key.c.length : '?'}) paper(${s.A.length}/${s.B.length}/${s.C.length})`
  )
  if (!ok) {
    allOk = false
    if (key.a && key.a.length !== s.A.length) console.log(`   a: ${key.a.length} vs ${s.A.length}`)
    if (key.b && key.b.length !== s.B.length) console.log(`   b: ${key.b.length} vs ${s.B.length}`)
    if (key.c && key.c.length !== s.C.length) console.log(`   c: ${key.c.length} vs ${s.C.length}`)
  }
}

// Cross-check: every answer in section A must exactly match an option in the parsed paper
console.log('\n--- A-answer option matching ---')
for (const kf of keyFiles) {
  const key = JSON.parse(fs.readFileSync(path.join(keysDir, kf), 'utf8'))
  const paper = JSON.parse(fs.readFileSync(path.join(parsedDir, `${key.code}.json`), 'utf8'))
  if (!key.a) continue
  let mismatches = 0
  key.a.forEach((qa, i) => {
    const opts = paper.sections.A[i].options || []
    if (!opts.includes(qa.answer)) {
      mismatches++
      console.log(`${key.code} A${i + 1}: ANSWER NOT IN OPTIONS -> "${qa.answer}"`)
      console.log(`   options: ${JSON.stringify(opts)}`)
    }
  })
  console.log(`${key.code}: ${mismatches === 0 ? 'all A answers match an option' : mismatches + ' mismatch(es)'}`)
  if (mismatches > 0) allOk = false
}

process.exit(allOk ? 0 : 1)
