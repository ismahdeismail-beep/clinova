import { readFileSync } from 'fs';

const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN || 'sbp_de2b20ed0c7a23fc113bb5672db0d143a7e20816';
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'bveztrtykjburdhewcdy';

const SQL = `
ALTER TABLE knowledge_graph_nodes
  ADD CONSTRAINT uq_kg_nodes UNIQUE (entity_type, entity_id);
ALTER TABLE knowledge_graph_relationships
  ADD CONSTRAINT uq_kg_rels UNIQUE (source_node_id, target_node_id, relationship_type);
ALTER TABLE disease_monographs
  ADD CONSTRAINT uq_dm_disease UNIQUE (disease_id);
`;

async function main() {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: SQL }),
    }
  );
  if (!res.ok) {
    console.error('❌ FAILED', res.status, await res.text());
    process.exit(1);
  }
  console.log('✅ Unique constraints added.');
}

main();
