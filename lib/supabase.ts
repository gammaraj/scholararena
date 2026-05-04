import { createClient, SupabaseClient } from '@supabase/supabase-js';

function getSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set');
  }
  return { supabaseUrl, supabaseAnonKey };
}

/** Browser-safe client (anon key, RLS enforced) */
export function getSupabaseClient(): SupabaseClient {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();
  return createClient(supabaseUrl, supabaseAnonKey);
}

/** Server-only admin client (service role, bypasses RLS).
 *  NEVER import this in client components. */
export function getAdminClient(): SupabaseClient {
  const { supabaseUrl } = getSupabaseEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
