import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gbqgxpttakblmdaqfoux.supabase.co";

const supabaseKey = "sb_publishable_ZzTs6zOoA-sSB9-Y5C3JyQ_jhyptfhX";

export const supabase = createClient(supabaseUrl, supabaseKey);
