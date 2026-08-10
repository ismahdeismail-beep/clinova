import { supabase } from '../src/lib/supabase.node';

async function diagnose() {
  console.log('--- Database Diagnostic: Clinical Cases ---');
  
  // Total count
  const { count: total } = await supabase
    .from('clinical_cases')
    .select('*', { count: 'exact', head: true });
  console.log(`Total rows in clinical_cases: ${total}`);

  // Count by status
  const { data: byStatus } = await supabase
    .from('clinical_cases')
    .select('status, count(*)', { count: 'exact' });
  console.log('Counts by status:', byStatus);

  // Count by unit_id (integrated unit)
  const { data: byUnit } = await supabase
    .from('clinical_cases')
    .select('unit_id, count(*)')
    .group('unit_id');
  console.log('Counts by unit_id:', byUnit);

  // Specialties
  const { data: bySpecialty } = await supabase
    .from('clinical_cases')
    .select('specialty, count(*)')
    .group('specialty');
  console.log('Counts by specialty:', bySpecialty);
}

diagnose();
