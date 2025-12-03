// Supabase Configuration
// Reads from environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
// These are defined in .env file (see .env.example for template)

// Vite exposes env variables via import.meta.env
// Variables must be prefixed with VITE_ to be exposed to client code
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const SUPABASE_CONFIG = {
  url: supabaseUrl || '',
  anonKey: supabaseAnonKey || ''
};

// Note: The anon key is safe to expose in your frontend code.
// It's designed to be public and is protected by Row Level Security (RLS) in Supabase.

