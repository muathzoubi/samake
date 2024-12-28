
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://xkddlojgsoerscijgcqc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZGRsb2pnc29lcnNjaWpnY3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyOTIxNTgsImV4cCI6MjA0Njg2ODE1OH0.3BFPvrxH4fbl5aKraIkoUVj64Rgp28sXeI3HgTNJnuQ'

export const supabase = createClient(supabaseUrl!, supabaseKey!);
        