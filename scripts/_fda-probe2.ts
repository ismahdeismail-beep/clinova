const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"pyrazinamide"&limit=1`
const data = await (await fetch(url)).json()
const r = data?.results?.[0]
console.log('clinical_pharmacology len:', (r.clinical_pharmacology || []).map((x: string) => x.length).join(','))
console.log('CP sample:', JSON.stringify(String(r.clinical_pharmacology?.[0] || '').slice(0, 300)))
