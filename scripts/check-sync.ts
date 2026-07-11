import { supabase } from '../src/lib/supabase.node';

async function checkSync() {
  console.log('--- Database Diagnostic: User Local Storage Sync ---');
  
  const { data, error } = await supabase
    .from('user_local_storage')
    .select('*')
    .limit(10);
    
  if (error) {
    console.error('Error fetching user_local_storage:', error);
    return;
  }

  console.log('Persisted memory rows:', data.length);
  if (data.length > 0) {
    console.log('Sample entry:', data[0]);
  } else {
    console.log('No memory entries found in Supabase.');
  }
}
checkSync();
