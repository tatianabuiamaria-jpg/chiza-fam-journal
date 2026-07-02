import { createClient } from "@supabase/supabase-js";

// These come from your Supabase project settings -> API
// Add them in Vercel: Project Settings -> Environment Variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
