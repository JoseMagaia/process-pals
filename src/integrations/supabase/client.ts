// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lyokwiidrahekqjzkevn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5b2t3aWlkcmFoZWtxanprZXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMzk0NDMsImV4cCI6MjA1MzcxNTQ0M30.5kJ95LcWrWGzJwp-nKeF7z-ODGgQei3NsfIq_luRxug";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);