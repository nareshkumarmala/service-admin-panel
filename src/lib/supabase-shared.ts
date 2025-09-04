// Supabase configuration for admin panel
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_PROJECT_ID 
    ? `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co` 
    : '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  isDemo: !import.meta.env.VITE_SUPABASE_PROJECT_ID || !import.meta.env.VITE_SUPABASE_ANON_KEY
};

export async function testSupabaseConnection() {
  try {
    if (supabaseConfig.isDemo) {
      console.log('📝 Admin Demo Mode: Supabase credentials not configured');
      return { success: false, error: 'Demo mode - no credentials' };
    }

    // Simple fetch test to Supabase
    const response = await fetch(`${supabaseConfig.url}/rest/v1/`, {
      headers: {
        'apikey': supabaseConfig.anonKey,
        'Authorization': `Bearer ${supabaseConfig.anonKey}`
      }
    });

    if (response.ok) {
      console.log('✅ Admin Panel - Supabase connection successful');
      return { success: true };
    } else {
      console.log('❌ Admin Panel - Supabase connection failed:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.log('❌ Admin Panel - Supabase connection error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}