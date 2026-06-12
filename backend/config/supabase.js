import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws';

// Fix for Node 20 without native WebSocket
global.WebSocket = ws;

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase credentials not found in environment variables.");
}

export const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');
