import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase credentials missing! The SaaS backend cannot start. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are present in your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
