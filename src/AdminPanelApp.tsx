import React, { useState, useEffect } from 'react';
import { Toaster } from "sonner";
import { Screen, User, Notification } from './types';
import { AdminDashboardLayout } from './components/AdminDashboardLayout';
import { AdminAuthFlow } from './components/AdminAuthFlow';
import { ErrorBoundaryWithLogging } from './components/ErrorLogging';
import { PostLaunchMonitoring } from './components/PostLaunchMonitoring';
import { supabaseConfig, testSupabaseConnection } from './lib/supabase-shared';

const ADMIN_NOTIFICATIONS: Notification[] = [
  { id: '1', message: 'New Service Center Registration - Premium Motors', time: '5 mins ago', read: false, type: 'business' },
  { id: '2', message: 'System Health Check: All services operational', time: '15 mins ago', read: false, type: 'system' },
  { id: '3', message: 'Monthly Revenue Report Generated', time: '1 hour ago', read: true, type: 'business' },
  { id: '4', message: 'Database Backup Completed Successfully', time: '2 hours ago', read: true, type: 'system' },
  { id: '5', message: 'Security Alert: Multiple login attempts detected', time: '3 hours ago', read: true, type: 'security' },
];

export default function AdminPanelApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('admin-login');
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('checking');
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
    address: '',
    services: [],
    isLoggedIn: false,
    role: 'admin'
  });

  const notifications = ADMIN_NOTIFICATIONS;
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  useEffect(() => {
    initializeAdminPanel();
  }, []);

  const initializeAdminPanel = async () => {
    try {
      console.log('🔒 WayPartner Admin Panel Initializing...', {
        isProduction: !supabaseConfig.isDemo,
        timestamp: new Date().toISOString(),
        environment: 'INTERNAL_ADMIN_ONLY'
      });
      
      setConnectionStatus('connecting');
      const connectionTest = await testSupabaseConnection();
      
      if (connectionTest.success) {
        setConnectionStatus('connected');
        console.log('✅ Admin Panel - Connected to database');
      } else {
        setConnectionStatus('error');
        console.error('❌ Admin database connection failed:', connectionTest);
      }

      // Check for existing admin session
      const adminSession = localStorage.getItem('waypartner_admin_session');
      if (adminSession) {
        try {
          const sessionData = JSON.parse(adminSession);
          if (sessionData.role === 'admin' || sessionData.role === 'super-admin') {
            setUser(sessionData);
            setCurrentScreen('admin-dashboard');
          }
        } catch (error) {
          console.error('Invalid admin session:', error);
          localStorage.removeItem('waypartner_admin_session');
        }
      }

      setAppReady(true);
    } catch (error) {
      console.error('Admin panel initialization error:', error);
      setConnectionStatus('error');
      setAppReady(true);
    }
  };

  const handleAdminLogin = async (adminUser: User) => {
    setUser(adminUser);
    setCurrentScreen('admin-dashboard');
    
    // Store admin session
    localStorage.setItem('waypartner_admin_session', JSON.stringify(adminUser));
    
    console.log('🔐 Admin logged in:', {
      user: adminUser.name,
      role: adminUser.role,
      timestamp: new Date().toISOString()
    });
  };

  const handleLogout = () => {
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
    
    localStorage.removeItem('waypartner_admin_session');
    console.log('🔓 Admin logged out');
  };

  if (!appReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
            <img 
              src="/waypartner-logo.png" 
              alt="WayPartner Admin" 
              className="w-12 h-12 object-contain animate-pulse filter invert"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h2>
          <p className="text-gray-600 mb-4">Loading administrative interface...</p>
          <div className="admin-restricted"></div>
          
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
              'bg-red-500'
            }`}></div>
            <span className="text-gray-500">
              {connectionStatus === 'connected' ? 'Database Connected' :
               connectionStatus === 'connecting' ? 'Connecting...' :
               'Demo Mode Active'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Show admin login screen
  if (!user.isLoggedIn) {
    return (
      <ErrorBoundaryWithLogging context="AdminLogin">
        <div className="min-h-screen bg-gray-50">
          <AdminAuthFlow
            onLogin={handleAdminLogin}
            connectionStatus={connectionStatus}
          />
          
          <Toaster 
            position="top-right"
            richColors
            expand={true}
            toastOptions={{
              className: 'font-medium',
              duration: 4000,
            }}
          />
          
          <PostLaunchMonitoring />
        </div>
      </ErrorBoundaryWithLogging>
    );
  }

  // Show admin dashboard
  return (
    <ErrorBoundaryWithLogging context="AdminDashboard">
      <div className="min-h-screen bg-gray-50">
        {connectionStatus === 'error' && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 relative z-50 mt-6">
            <div className="max-w-7xl mx-auto">
              <p className="text-sm text-yellow-800 text-center">
                ⚠️ <strong>Demo Mode:</strong> Admin panel working with sample data
              </p>
            </div>
          </div>
        )}

        <AdminDashboardLayout
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          user={user}
          onUpdateUser={setUser}
          onLogout={handleLogout}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          showNotifications={showNotifications}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          unreadCount={unreadCount}
        />
        
        <Toaster 
          position="top-right"
          richColors
          expand={true}
          visibleToasts={3}
          toastOptions={{
            className: 'font-medium',
            duration: 6000,
            style: {
              background: 'white',
              border: '1px solid #d1d5db',
              color: '#111827'
            }
          }}
        />
        
        <PostLaunchMonitoring />
        
        {/* Admin performance metrics (always visible in dev) */}
        {import.meta.env.DEV && (
          <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded text-xs z-50">
            <div className="font-semibold mb-1">Admin Panel (Dev)</div>
            <div>Environment: Internal</div>
            <div>Security: Active</div>
          </div>
        )}
      </div>
    </ErrorBoundaryWithLogging>
  );
}