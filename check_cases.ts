import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkCases() {
    const { count, error } = await client
        .from('clinical_cases')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published');
        
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Count of published clinical cases:', count);
    }
}

checkCases();
