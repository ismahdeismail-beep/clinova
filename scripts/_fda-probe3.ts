const probes = ['ibuprofen', 'omeprazole', 'aspirin']
for (const q of probes) {
  try {
    const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${q}"&limit=5`
    const data = await (await fetch(url)).json()
    const results = data?.results || []
    console.log(`\n${q}: ${results.length} results`)
    for (const r of results.slice(0, 3)) {
      const pkLen = (r.pharmacokinetics || []).map((x) => x.length)
      const cpLen = (r.clinical_pharmacology || []).map((x) => x.length)
      console.log(`  brand=${r.openfda?.brand_name?.[0] || '?'} pk=${JSON.stringify(pkLen)} clinical_pharm=${JSON.stringify(cpLen)}`)
    }
  } catch (e) { console.log(q, 'ERR', (e as Error).message.slice(0, 40)) }
  await new Promise(r2 => setTimeout(r2, 2000))
}
