const q = 'phenytoin'
const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${q}"&limit=1`
const data = await (await fetch(url)).json()
const r = data?.results?.[0]
console.log('has warnings field:', Array.isArray(r?.warnings), '| items:', (r?.warnings || []).length)
console.log('warnings[0] len:', (r?.warnings?.[0] || '').length, '| sample:', JSON.stringify(String(r?.warnings?.[0] || '').slice(0, 150)))
console.log('other section keys:', Object.keys(r || {}).filter(k => /warn|precau|boxed/i.test(k)))
// simulate fdaArray
const raw = (r?.warnings || []).join(' ').replace(/\s+/g, ' ').trim()
const items = raw.split(/(?<=[.;])\s+(?=[A-Z])/).map(s => s.replace(/\[.*?\]/g, '').replace(/^\d+\s*/, '').trim()).filter(s => s.length > 15 && s.length < 600)
console.log('fdaArray items:', items.length, '| first:', items[0]?.slice(0, 100))
