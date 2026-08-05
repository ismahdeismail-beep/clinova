const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"pyrazinamide"&limit=1`
const res = await fetch(url)
const data = await res.json()
const r = data?.results?.[0]
if (!r) { console.log('no result'); process.exit(0) }
const keys = Object.keys(r).filter(k => !['openfda'].includes(k))
console.log('label sections:', keys.join(', '))
console.log('pharmacokinetics len:', (r.pharmacokinetics || []).map((x: string) => x.length).join(','))
console.log('PK sample:', JSON.stringify(r.pharmacokinetics?.[0]?.slice(0, 200)))
console.log('\ndescription first 200:', JSON.stringify(String(r.description?.[0] || '').slice(0, 200)))
