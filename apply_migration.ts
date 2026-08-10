import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function applyMigration() {
    const migrationPath = path.join('supabase', 'migrations', '000004_drug_classes.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('Applying migration...');
    const { error } = await client.rpc('exec_sql', { sql });
    
    if (error) {
        // If rpc not enabled, try direct postgrest call (if supported by schema, otherwise manual)
        console.error('RPC execution failed (do you have exec_sql enabled?):', error.message);
        console.log('Manual intervention required: Run the SQL in the Supabase Dashboard SQL Editor.');
    } else {
        console.log('Migration applied successfully.');
    }
}

applyMigration();
