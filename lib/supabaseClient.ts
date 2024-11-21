import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ewgfcthxzmabkcvaklsn.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'YOUR_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey); 