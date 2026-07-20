import { createClient } from '@supabase/supabase-js'

// Setup strict client instantiations using environment variables with fallbacks
export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL ||
  'https://yinhlshtdknojbaqfxax.supabase.co'

export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_MUwUW8lk3iLv3HUwsJNmxA_x_KmyckL'

// Throw descriptive developer warnings if keys are missing in build-time configuration
if (!supabaseAnonKey) {
  console.warn('Supabase publishable key is missing. Make sure to define NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your production environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

