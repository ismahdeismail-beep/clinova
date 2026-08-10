import { supabase } from '../src/lib/supabase.node';

async function check() {
  const { data } = await supabase
    .from('clinical_cases')
    .select('unit_id, specialty')
    .limit(5);
  console.log(data);
}
check();
