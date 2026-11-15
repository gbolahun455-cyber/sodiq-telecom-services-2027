import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://euugkgnxdytamwgluegu.supabase.co';

const SUPABASE_ANON_KEY = 'sb_publishable_sPxHqe09IsQLmQWYCTa6Sg_brxzoppY';

export const supabase = createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);
