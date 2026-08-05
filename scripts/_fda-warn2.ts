const q = 'phenytoin'
const data = await (await fetch(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${q}"&limit=1`)).json()
const r = data?.results?.[0]
const raw = (r?.warnings_and_cautions || []).join(' ').replace(/\s+/g, ' ').trim()
console.log('warnings_and_cautions len:', raw.length)
console.log('sample:', JSON.stringify(raw.slice(0, 250)))
const items = raw.split(/(?<=[.;])\s+(?=[A-Z])/).map(s => s.replace(/\[.*?\]/g, '').replace(/^\d+\s*/, '').trim()).filter(s => s.length > 15 && s.length < 600)
console.log('fdaArray items:', items.length, '| first:', items[0]?.slice(0, 110))
