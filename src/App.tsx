import React, { useState, useEffect, Suspense } from 'react';
import { Toaster } from "sonner";
import { Screen, User, Notification } from './types';
import { AdminScreenRouter } from './components/AdminScreenRouter';
import { AdminDashboardLayout } from './components/AdminDashboardLayout';
import { AdminAuthFlow } from './components/AdminAuthFlow';
import { ErrorBoundaryWithLogging } from './components/ErrorLogging';
import { PostLaunchMonitoring } from './components/PostLaunchMonitoring';
import { supabaseConfig, testSupabaseConnection } from './lib/supabase-shared';
// Fixed logo import path
const wayPartnerLogo = '/waypartner-logo.png';

// Admin-specific notifications
const ADMIN_NOTIFICATIONS: Notification[] = [
  { id: '1', message: 'Service Center Registration Pending - ABC Motors', time: '5 mins ago', read: false },
  { id: '2', message: 'System Health Alert - High Memory Usage', time: '12 mins ago', read: false },
  { id: '3', message: 'New Fleet Registration - 25 vehicles', time: '30 mins ago', read: true },
  { id: '4', message: 'Payment Verification Required - ₹15,000', time: '1 hour ago', read: true },
  { id: '5', message: 'Weekly Report Generated Successfully', time: '2 hours ago', read: true },
];

export default function AdminPanelApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('admin-login');
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Admin panel starts with sidebar open
  const [appReady, setAppReady] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('checking');
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
    address: '',
    services: [],
    isLoggedIn: false,
    role: 'admin' // Default to admin role
  });

  const notifications = ADMIN_NOTIFICATIONS;
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  // Initialize admin app
  useEffect(() => {
    initializeAdminApp();
  }, []);

  const initializeAdminApp = async () => {
    try {
      console.log('🔒 WayPartner Admin Panel Initializing...', {
        isProduction: !supabaseConfig.isDemo,
        supabaseUrl: supabaseConfig.url,
        timestamp: new Date().toISOString(),
        internalUseOnly: true
      });
      
      // Version verification
      console.log('🔄 Admin Panel Version: 2.1.0-ADMIN-PANEL');
      console.log('⚠️ INTERNAL USE ONLY - SEO BLOCKED');
      
      // Test Supabase connection
      setConnectionStatus('connecting');
      const connectionTest = await testSupabaseConnection();
      
      if (connectionTest.success) {
        setConnectionStatus('connected');
        console.log('✅ Admin Panel - Connected to database');
      } else {
        setConnectionStatus('error');
        console.error('❌ Admin Panel - Database connection failed');
      }

      setAppReady(true);
    } catch (error) {
      console.error('Admin Panel initialization error:', error);
      setConnectionStatus('error');
      setAppReady(true);
    }
  };

  const handleAdminLogin = async (loggedInUser: User) => {
    // Validate admin credentials
    const adminPhone = loggedInUser.phone;
    let adminRole: 'admin' | 'super-admin' = 'admin';
    let hasAccess = false;

    // Admin access validation
    if (adminPhone === '8888888888') {
      adminRole = 'admin';
      hasAccess = true;
    } else if (adminPhone === '9999999999') {
      adminRole = 'super-admin';
      hasAccess = true;
    }

    if (!hasAccess) {
      throw new Error('Unauthorized access. Admin credentials required.');
    }

    const adminUser = {
      ...loggedInUser,
      role: adminRole,
      permissions: adminRole === 'super-admin' ? ['all'] : ['admin-panel', 'analytics', 'users', 'reports']
    };

    setUser(adminUser);
    setCurrentScreen('admin-dashboard');
    
    // Log admin access
    console.log('🔐 Admin Panel Access Granted:', {
      user: adminUser.name,
      role: adminRole,
      permissions: adminUser.permissions,
      timestamp: new Date().toISOString()
    });

    // Store admin session
    try {
      localStorage.setItem('waypartner_admin_session', JSON.stringify({
        userId: adminUser.phone,
        role: adminRole,
        loginTime: new Date().toISOString()
      }));
    } catch (error) {
      console.warn('Could not store admin session:', error);
    }
  };

  const handleAdminLogout = () => {
    setUser({
      name: '',
      email: '',
      phone: '',
      address: '',
      services: [],
      isLoggedIn: false,
      role: 'admin'
    });
    setCurrentScreen('admin-login');
    setSidebarOpen(true);
    setShowNotifications(false);
    
    // Clear admin session
    try {
      localStorage.removeItem('waypartner_admin_session');
      localStorage.removeItem('waypartner_session_token');
      console.log('🔓 Admin session cleared');
    } catch (error) {
      console.warn('Could not clear admin session:', error);
    }
  };

  // Show loading screen while admin app initializes
  if (!appReady) {
    return (
      <ErrorBoundaryWithLogging context="admin_panel_startup">
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
              <img 
                src={wayPartnerLogo} 
                alt="WayPartner Admin" 
                className="w-12 h-12 object-contain filter invert animate-pulse"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h2>
            <p className="text-gray-600 mb-4">Initializing internal management system...</p>
            
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' : 
                connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
                'bg-red-500'
              }`}></div>
              <span className="text-gray-500">
                {connectionStatus === 'connected' ? 'Database Connected' :
                 connectionStatus === 'connecting' ? 'Connecting to Database...' :
                 'Connection Failed - Demo Mode'}
              </span>
            </div>
            
            <div className="mt-4 text-xs text-red-600 font-medium">
              ⚠️ INTERNAL USE ONLY
            </div>
          </div>
        </div>
      </ErrorBoundaryWithLogging>
    );
  }

  // Show admin login screen
  if (currentScreen === 'admin-login') {
    return (
      <ErrorBoundaryWithLogging context="admin_login">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
          {/* Connection status for admin */}
          {connectionStatus === 'error' && (
            <div className="bg-red-900 border-b border-red-800 px-4 py-2">
              <div className="max-w-4xl mx-auto">
                <p className="text-sm text-red-200 text-center">
                  ⚠️ <strong>Demo Mode:</strong> Admin panel working with sample data
                </p>
              </div>
            </div>
          )}
          
          <AdminAuthFlow
            onLogin={handleAdminLogin}
            connectionStatus={connectionStatus}
          />
          
          <Toaster 
            position="top-right"
            theme="dark"
            richColors
            expand={true}
            toastOptions={{
              className: 'font-medium',
              duration: 4000,
            }}
          />
        </div>
      </ErrorBoundaryWithLogging>
    );
  }

  // Show admin dashboard with full layout
  return (
    <ErrorBoundaryWithLogging context="admin_dashboard">
      <div className="min-h-screen bg-gray-50">
        {/* Connection status indicator for admin */}
        {connectionStatus === 'error' && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-2 relative z-50">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <p className="text-sm text-red-800">
                  ⚠️ <strong>Demo Mode:</strong> Admin panel using sample data
                </p>
                <button
                  onClick={() => setCurrentScreen('admin-system')}
                  className="text-xs text-red-700 hover:text-red-900 underline"
                >
                  System Settings →
                </button>
              </div>
            </div>
          </div>
        )}

        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading admin dashboard...</p>
            </div>
          </div>
        }>
          <AdminDashboardLayout
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            user={user}
            onUpdateUser={setUser}
            onLogout={handleAdminLogout}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            notifications={notifications}
            showNotifications={showNotifications}
            onToggleNotifications={() => setShowNotifications(!showNotifications)}
            unreadCount={unreadCount}
          />
        </Suspense>
        
        {/* Enhanced toast notifications for admin */}
        <Toaster 
          position="top-right"
          theme="light"
          richColors
          expand={true}
          visibleToasts={5}
          toastOptions={{
            className: 'font-medium border border-gray-200',
            duration: 6000,
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
              color: '#374151'
            }
          }}
        />
        
        {/* Admin Panel Watermark */}
        <div className="fixed bottom-4 left-4 text-xs text-gray-400 pointer-events-none">
          Admin Panel v2.1.0 | Internal Use Only
        </div>
      </div>
    </ErrorBoundaryWithLogging>
  );
}