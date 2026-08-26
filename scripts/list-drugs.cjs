const fs = require('fs')
const content = fs.readFileSync('src/data/drugIndexData.ts', 'utf8')
const nameRe = /name:\s*"([^"]+)"/g
const names = []
let m
while ((m = nameRe.exec(content)) !== null) names.push(m[1])
console.log('Total drugs:', names.length)
const clsRe = /drug_class_name:\s*"([^"]+)"/g
const classes = new Set()
while ((m = clsRe.exec(content)) !== null) classes.add(m[1])
console.log('Drug classes:', JSON.stringify([...classes]))
console.log('All names:', JSON.stringify(names))
