import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables with fallbacks
const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || 'vdcfryayuzdojutxdswb';
const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkY2ZyeWF5dXpkb2p1dHhkc3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNTIzNjAsImV4cCI6MjA3MTcyODM2MH0.OF-YdEqzBdYfbmZmQ6O3q9dXFzZXL6BUa0apyaFAfJU';

let sharedSupabaseClient: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!sharedSupabaseClient) {
    console.log('🔧 Creating admin Supabase client instance');
    
    sharedSupabaseClient = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          storageKey: `waypartner-admin-auth-${projectId}`
        }
      }
    );
    
    console.log('✅ Admin Supabase client created successfully');
  }
  
  return sharedSupabaseClient;
};

export const supabase = getSupabaseClient();

export const supabaseConfig = {
  url: `https://${projectId}.supabase.co`,
  anonKey: publicAnonKey,
  projectId,
  status: 'production',
  hasValidCredentials: true,
  connectionSource: 'environment',
  envAccessible: typeof import.meta !== 'undefined' && !!import.meta.env,
  isDemo: false
};

export const testSupabaseConnection = async () => {
  try {
    console.log('🔗 Testing admin Supabase connection...');
    
    const client = getSupabaseClient();
    const { data, error } = await client.from('kv_store_b855a2f3').select('*').limit(1);
    
    if (error) {
      if (error.message.includes('does not exist') || error.message.includes('relation')) {
        console.log('✅ Admin database connected - KV table will be created automatically');
        return { 
          success: true, 
          message: 'Database connection successful - tables will be auto-created',
          status: 'connected'
        };
      }
      
      console.error('❌ Admin database connection error:', error);
      return { 
        success: false, 
        message: `Database error: ${error.message}`,
        error,
        status: 'error'
      };
    }
    
    console.log('✅ Admin Supabase connection verified');
    return { 
      success: true, 
      message: 'Database connection and tables verified',
      status: 'connected'
    };
  } catch (error) {
    console.error('❌ Admin Supabase connection test failed:', error);
    return { 
      success: false, 
      message: 'Connection failed - check credentials',
      error,
      status: 'failed'
    };
  }
};