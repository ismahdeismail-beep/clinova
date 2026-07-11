import { supabase } from '../src/lib/supabase.node';

async function diagnose() {
  console.log('--- Database Diagnostic: Specialty List ---');
  
  const { data, error } = await supabase
    .from('clinical_cases')
    .select('specialty');
    
  if (error) {
    console.error('Error fetching specialties:', error);
    return;
  }

  const specs = new Set(data.map(d => d.specialty));
  console.log('Unique specialties in Supabase:', Array.from(specs).sort());
}

diagnose();
