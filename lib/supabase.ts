import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Sunucu tarafı Supabase istemcisi.
 *
 * service_role anahtarı kullanır — RLS'i baypas eder, bu yüzden bu dosya
 * ASLA bir client component'ten import edilmemeli. Sadece server action'lar,
 * route handler'lar ve server component'ler kullanabilir.
 */
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Env değişkenleri yoksa null döner; çağıran taraf varsayılan JSON içeriğine düşer.
  // Böylece Supabase kurulmadan da site normal çalışmaya devam eder.
  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
