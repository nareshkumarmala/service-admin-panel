import React from 'react';
import { Screen, User, Notification } from '../types';

interface AdminDashboardLayoutProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  notifications: Notification[];
  showNotifications: boolean;
  onToggleNotifications: () => void;
  unreadCount: number;
}

export function AdminDashboardLayout({
  currentScreen,
  onNavigate,
  user,
  onLogout,
  sidebarOpen,
  onToggleSidebar,
  notifications,
  showNotifications,
  onToggleNotifications,
  unreadCount
}: AdminDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ☰
            </button>
            <h1 className="text-xl font-semibold text-gray-900">WayPartner Admin Panel</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleNotifications}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              🔔
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Admin: {user.name}</span>
              <button
                onClick={onLogout}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Admin Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <nav className="p-4 space-y-2">
              <button
                onClick={() => onNavigate('admin-dashboard')}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  currentScreen === 'admin-dashboard' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('admin-service-centers')}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  currentScreen === 'admin-service-centers' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50'
                }`}
              >
                Service Centers
              </button>
              <button
                onClick={() => onNavigate('admin-fleet')}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  currentScreen === 'admin-fleet' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50'
                }`}
              >
                Fleet Management
              </button>
              <button
                onClick={() => onNavigate('admin-analytics')}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  currentScreen === 'admin-analytics' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => onNavigate('admin-system')}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  currentScreen === 'admin-system' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50'
                }`}
              >
                System Health
              </button>
            </nav>
          </aside>
        )}

        {/* Admin Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg p-6 min-h-96 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {currentScreen.replace('admin-', '').charAt(0).toUpperCase() + 
               currentScreen.replace('admin-', '').slice(1).replace('-', ' ')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-600">Total Service Centers</h3>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-600">Active Vehicles</h3>
                <p className="text-2xl font-bold text-gray-900">6,000</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-600">Monthly Revenue</h3>
                <p className="text-2xl font-bold text-gray-900">₹25L</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-sm font-medium text-gray-600">Green Coins Issued</h3>
                <p className="text-2xl font-bold text-gray-900">125K</p>
              </div>
            </div>
            <p className="text-gray-600">
              Admin panel for managing the WayPartner platform. Full functionality will be implemented based on requirements.
            </p>
          </div>
        </main>
      </div>

      {/* Admin Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Admin Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}