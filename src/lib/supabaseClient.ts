import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xucmqhptxczcslvgzyvi.supabase.co';
const supabaseAnonKey = 'sb_publishable_lyKSeZK-y9zITBaZCKcbwg_XuZDSuPy';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
