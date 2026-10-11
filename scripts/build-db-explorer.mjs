import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const env = Object.fromEntries(
  readFileSync(process.cwd() + '/.env', 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1)]),
)
const { SUPABASE_ACCESS_TOKEN: token, SUPABASE_PROJECT_REF: ref } = env
const sql = async (query) => {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 300)}`)
  return res.json()
}

const cols = await sql(`
  select table_name, column_name, data_type, udt_name, is_nullable, column_default, ordinal_position
  from information_schema.columns where table_schema='public'
  order by table_name, ordinal_position`)
const pks = await sql(`
  select tc.table_name, kcu.column_name
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu
    on tc.constraint_name=kcu.constraint_name and tc.table_schema=kcu.table_schema
  where tc.constraint_type='PRIMARY KEY' and tc.table_schema='public'`)
const fks = await sql(`
  select tc.table_name as from_table, kcu.column_name as from_col,
         ccu.table_name as to_table, ccu.column_name as to_col
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu
    on tc.constraint_name=kcu.constraint_name and tc.table_schema=kcu.table_schema
  join information_schema.constraint_column_usage ccu
    on tc.constraint_name=ccu.constraint_name and tc.table_schema=ccu.table_schema
  where tc.constraint_type='FOREIGN KEY' and tc.table_schema='public'`)
const rls = await sql(`
  select relname as table_name, relrowsecurity as rls
  from pg_class where relkind='r' and relnamespace='public'::regnamespace`)
const rows = await sql(`
  select relname as table_name, n_live_tup as approx_rows
  from pg_stat_user_tables where schemaname='public'`)

const pkSet = new Set(pks.map((r) => `${r.table_name}.${r.column_name}`))
const rlsMap = Object.fromEntries(rls.map((r) => [r.table_name, r.rls]))
const rowMap = Object.fromEntries(rows.map((r) => [r.table_name, Number(r.approx_rows)]))
const fkOutMap = {}
const fkInMap = {}
for (const fk of fks) {
  ;(fkOutMap[fk.from_table] ||= []).push(fk)
  ;(fkInMap[fk.to_table] ||= []).push(fk)
}

const tables = {}
for (const c of cols) {
  const t = (tables[c.table_name] ||= {
    name: c.table_name,
    columns: [],
    rls: !!rlsMap[c.table_name],
    rows: rowMap[c.table_name] ?? 0,
  })
  t.columns.push({
    name: c.column_name,
    type:
      c.data_type === 'ARRAY'
        ? c.udt_name.replace(/^_/, '') + '[]'
        : c.data_type === 'USER-DEFINED'
          ? c.udt_name
          : c.data_type,
    nullable: c.is_nullable === 'YES',
    def: c.column_default,
    pk: pkSet.has(`${c.table_name}.${c.column_name}`),
    fk: (fkOutMap[c.table_name] || []).find((f) => f.from_col === c.column_name) || null,
  })
}
const tableArr = Object.values(tables).sort((a, b) => a.name.localeCompare(b.name))

const mermaid = ['erDiagram']
for (const t of tableArr) {
  const lines = t.columns
    .slice(0, 60)
    .map(
      (c) =>
        `    ${c.type.replace(/[^a-zA-Z0-9_]/g, '_')} ${c.name}${c.pk ? ' PK' : c.fk ? ' FK' : ''}`,
    )
  mermaid.push(`  "${t.name}" {`, ...lines, '  }')
}
for (const fk of fks)
  mermaid.push(`  "${fk.from_table}" }o--|| "${fk.to_table}" : "${fk.from_col}"`)

const payload = {
  ref,
  generatedAt: new Date().toISOString(),
  tables: tableArr,
  fks,
  mermaid: mermaid.join('\n'),
}

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Clinova DB Explorer · ${ref}</title>
<style>
:root{--bg:#0b1020;--panel:#141a2e;--panel2:#1b2338;--fg:#e8ecf7;--mut:#8b97b8;--acc:#4ea1ff;--ok:#37d399;--warn:#f6c445;--line:#26304a}
*{box-sizing:border-box}body{margin:0;font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--bg);color:var(--fg)}
header{padding:14px 18px;border-bottom:1px solid var(--line);display:flex;gap:16px;align-items:center;flex-wrap:wrap;position:sticky;top:0;background:var(--bg);z-index:5}
h1{font-size:15px;margin:0;font-weight:700} .mut{color:var(--mut)}
.stat{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:4px 10px}
.layout{display:flex;height:calc(100vh - 56px)}
aside{width:320px;min-width:220px;border-right:1px solid var(--line);display:flex;flex-direction:column}
#search{margin:10px;padding:9px 11px;background:var(--panel2);border:1px solid var(--line);border-radius:8px;color:var(--fg);font:inherit}
#tables{overflow:auto;flex:1;padding:0 6px 20px}
.t{padding:7px 10px;border-radius:7px;cursor:pointer;display:flex;justify-content:space-between;gap:8px}
.t:hover{background:var(--panel2)} .t.active{background:#1d3355;outline:1px solid var(--acc)}
.t .n{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.t .r{color:var(--mut);font-size:11px}
main{flex:1;overflow:auto;padding:16px 20px}
.tabs{display:flex;gap:8px;margin-bottom:14px}
.tab{padding:6px 12px;border:1px solid var(--line);border-radius:8px;background:var(--panel);cursor:pointer}
.tab.active{background:var(--acc);color:#04122b;border-color:var(--acc);font-weight:700}
table{border-collapse:collapse;width:100%;background:var(--panel);border:1px solid var(--line);border-radius:10px;overflow:hidden}
th,td{text-align:left;padding:7px 10px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--mut);font-weight:600;background:var(--panel2);position:sticky;top:0}
tr:last-child td{border-bottom:0}
.badge{display:inline-block;padding:1px 7px;border-radius:999px;font-size:11px;border:1px solid var(--line)}
.PK{background:#173d2c;color:var(--ok);border-color:#1f6a4c}.FK{background:#3a2f12;color:var(--warn);border-color:#6a5a1f}
.type{color:#9ecbff}.nl{color:var(--mut)}
#erd{background:#fff;border-radius:10px;padding:10px;overflow:auto;height:78vh}
#erd svg{max-width:none!important}.zoom{display:flex;gap:8px;align-items:center;margin-bottom:10px}
a{color:var(--acc)}
</style></head><body>
<header>
  <h1>🗄️ Clinova DB Explorer</h1>
  <span class="stat">project <b>${ref}</b></span>
  <span class="stat">${tableArr.length} tables</span>
  <span class="stat">${cols.length} columns</span>
  <span class="stat">${fks.length} FKs</span>
  <span class="stat mut">generated ${new Date().toLocaleString()}</span>
  <a href="https://supabase.com/dashboard/project/${ref}/editor" target="_blank" rel="noreferrer">open Supabase Studio ↗</a>
</header>
<div class="layout">
  <aside><input id="search" placeholder="Filter tables…" autocomplete="off"/><div id="tables"></div></aside>
  <main>
    <div class="tabs">
      <div class="tab active" data-tab="cols">Columns</div>
      <div class="tab" data-tab="erd">ER diagram</div>
      <div class="tab" data-tab="rels">Relationships</div>
    </div>
    <div id="view"></div>
  </main>
</div>
<script id="data" type="application/json">${JSON.stringify(payload).replace(/</g, '\\u003c')}</script>
<script>
const D=JSON.parse(document.getElementById('data').textContent);
const $=s=>document.querySelector(s), el=(t,c,k)=>{const n=document.createElement(t);if(c)n.className=c;if(k!==undefined)n.textContent=k;return n};
const esc=s=>String(s??'')
let sel=D.tables[0]?.name, tab='cols';

function renderList(){
  const q=($('#search').value||'').toLowerCase();
  const box=$('#tables'); box.textContent='';
  D.tables.filter(t=>t.name.includes(q)).forEach(t=>{
    const row=el('div','t'+(t.name===sel?' active':''));
    row.appendChild(el('div','n',t.name));
    const m=el('div','r'); m.appendChild(el('span',null,(t.rows||0).toLocaleString()+' ~rows '));
    if(t.rls){const b=el('span','badge','RLS');b.style.marginLeft='6px';m.appendChild(b)}
    row.appendChild(m);
    row.onclick=()=>{sel=t.name;renderList();renderView()};
    box.appendChild(row);
  });
}
function renderCols(){
  const t=D.tables.find(x=>x.name===sel); if(!t)return;
  const frag=document.createDocumentFragment();
  const h=el('h2',null,t.name); h.style.fontSize='16px'; frag.appendChild(h);
  const meta=el('div','mut','~'+(t.rows||0).toLocaleString()+' rows · RLS '+(t.rls?'enabled':'disabled')+' · '+t.columns.length+' columns');
  meta.style.margin='4px 0 12px'; frag.appendChild(meta);
  const tb=el('table'); const thead=el('thead'); const tr=el('tr');
  ;['#','column','type','null','default','keys'].forEach(x=>tr.appendChild(el('th',null,x))); thead.appendChild(tr); tb.appendChild(thead);
  const tbody=el('tbody');
  t.columns.forEach((c,i)=>{const r=el('tr');
    r.appendChild(el('td','mut',i+1));
    const cn=el('td'); cn.appendChild(el('b',null,c.name)); r.appendChild(cn);
    r.appendChild(el('td','type',c.type));
    r.appendChild(el('td','nl',c.nullable?'yes':'no'));
    r.appendChild(el('td','mut',c.def?String(c.def).slice(0,40):'—'));
    const k=el('td'); if(c.pk)k.appendChild(el('span','badge PK','PK'));
    if(c.fk)k.appendChild(el('span','badge FK','FK→ '+c.fk.to_table+'.'+c.fk.to_col)); r.appendChild(k);
    tbody.appendChild(r)});
  tb.appendChild(tbody); frag.appendChild(tb); return frag;
}
function renderRels(){
  const frag=document.createDocumentFragment();
  const tb=el('table'); const thead=el('thead'); const tr=el('tr');
  ;['from','column','→','to','column'].forEach(x=>tr.appendChild(el('th',null,x))); thead.appendChild(tr); tb.appendChild(thead);
  const tbody=el('tbody');
  D.fks.forEach(f=>{const r=el('tr');
    r.appendChild(el('td',null,f.from_table)); r.appendChild(el('td','type',f.from_col));
    r.appendChild(el('td','mut','→')); r.appendChild(el('td',null,f.to_table)); r.appendChild(el('td','type',f.to_col));
    tbody.appendChild(r)});
  tb.appendChild(tbody); frag.appendChild(tb); return frag;
}
let mermaidLoaded=false;
function renderErd(host){
  host.innerHTML='<div class="zoom"><span class="mut">zoom</span><input id="zz" type="range" min="30" max="300" value="90"></div><div id="erd"></div>';
  const src=el('div','mermaid',D.mermaid); document.querySelector('#erd').appendChild(src);
  $('#zz').oninput=e=>{src.style.transformOrigin='0 0';src.style.transform='scale('+(e.target.value/100)+')'};
  if(!mermaidLoaded){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
    s.onload=()=>{mermaid.initialize({startOnLoad:false,theme:'default'});mermaid.run({nodes:document.querySelectorAll('.mermaid')});mermaidLoaded=true};
    s.onerror=()=>{document.querySelector('#erd').textContent='Mermaid CDN unreachable — see the Relationships tab instead.'};
    document.head.appendChild(s)}
}
function renderView(){
  const v=$('#view'); v.textContent='';
  if(tab==='cols')v.appendChild(renderCols());
  else if(tab==='rels')v.appendChild(renderRels());
  else renderErd(v);
}
document.querySelectorAll('.tab').forEach(x=>x.onclick=()=>{
  tab=x.dataset.tab;
  document.querySelectorAll('.tab').forEach(y=>y.classList.toggle('active',y===x));
  renderView();
});
$('#search').oninput=renderList;
renderList();renderView();
</script></body></html>`

const out = process.cwd() + '/docs/db-explorer.html'
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, html)
console.log(
  'wrote',
  out,
  `(${(html.length / 1024).toFixed(0)} KB) · ${tableArr.length} tables · ${fks.length} FKs`,
)
