import 'dotenv/config'

import { createClient } from '@supabase/supabase-js'

 export const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_PUBLIC_ANON_KEY)