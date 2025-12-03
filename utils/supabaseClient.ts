import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../config/supabase.config';

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
};

// Create Supabase client only if configured, otherwise return null
export const supabase: SupabaseClient | null = isSupabaseConfigured() 
  ? createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey) 
  : null;

