import React from 'react';
import { Screen, User, Notification } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

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
  const menuItems = [
    { screen: 'admin-dashboard' as Screen, label: 'Dashboard', icon: '📊', color: 'text-blue-600' },
    { screen: 'admin-service-centers' as Screen, label: 'Service Centers', icon: '🏢', color: 'text-green-600' },
    { screen: 'admin-fleet' as Screen, label: 'Fleet Management', icon: '🚛', color: 'text-purple-600' },
    { screen: 'admin-users' as Screen, label: 'User Management', icon: '👥', color: 'text-indigo-600' },
    { screen: 'admin-analytics' as Screen, label: 'Analytics', icon: '📈', color: 'text-orange-600' },
    { screen: 'admin-payments' as Screen, label: 'Payments & Revenue', icon: '💰', color: 'text-yellow-600' },
    { screen: 'admin-ads' as Screen, label: 'Ads Management', icon: '📱', color: 'text-pink-600' },
    { screen: 'admin-system' as Screen, label: 'System Health', icon: '⚙️', color: 'text-gray-600' },
    { screen: 'admin-reports' as Screen, label: 'Reports', icon: '📋', color: 'text-red-600' }
  ];

  const stats = {
    totalServiceCenters: 145,
    activeVehicles: 6000,
    totalUsers: 25000,
    monthlyRevenue: 12500000,
    systemHealth: 98.5,
    activeAds: 23
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-200`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img 
              src="/waypartner-logo.png" 
              alt="WayPartner Admin" 
              className="w-8 h-8 object-contain"
            />
            {sidebarOpen && (
              <div>
                <span className="font-bold text-gray-900">Admin Panel</span>
                <div className="text-xs text-red-600 font-semibold">INTERNAL USE</div>
              </div>
            )}
          </div>
          
          {sidebarOpen && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600">{user.role}</p>
              <p className="text-xs text-red-600 font-semibold mt-1">🔒 RESTRICTED ACCESS</p>
            </div>
          )}
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.screen}
                variant={currentScreen === item.screen ? "default" : "ghost"}
                onClick={() => onNavigate(item.screen)}
                className={`w-full justify-start text-left ${
                  currentScreen === item.screen 
                    ? "bg-black text-white" 
                    : "hover:bg-gray-100"
                } ${!sidebarOpen ? 'px-2' : ''}`}
              >
                <span className={`text-lg ${item.color}`}>{item.icon}</span>
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </Button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onToggleSidebar}
                variant="ghost"
                className="p-2"
              >
                {sidebarOpen ? '◀' : '▶'}
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  🔒 WayPartner Admin Dashboard
                </h1>
                <p className="text-sm text-red-600 font-semibold">INTERNAL USE ONLY</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={onToggleNotifications}
                variant="ghost"
                className="relative"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>

              <Button onClick={onLogout} variant="outline">
                🔓 Admin Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {currentScreen === 'admin-dashboard' ? (
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  🔒 Administrative Overview
                </h2>
                <p className="text-gray-600">
                  Internal dashboard for WayPartner operations management
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardDescription>Service Centers</CardDescription>
                    <CardTitle className="text-3xl text-blue-600">{stats.totalServiceCenters}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">+8 new this month</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardDescription>Active Vehicles</CardDescription>
                    <CardTitle className="text-3xl text-green-600">{stats.activeVehicles.toLocaleString()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Fleet management</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-2">
                    <CardDescription>Total Users</CardDescription>
                    <CardTitle className="text-3xl text-purple-600">{stats.totalUsers.toLocaleString()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">+1.2K this month</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="pb-2">
                    <CardDescription>Monthly Revenue</CardDescription>
                    <CardTitle className="text-3xl text-yellow-600">₹{(stats.monthlyRevenue / 1000000).toFixed(1)}M</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">+15% growth</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardDescription>System Health</CardDescription>
                    <CardTitle className="text-3xl text-green-600">{stats.systemHealth}%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">All systems operational</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-pink-500">
                  <CardHeader className="pb-2">
                    <CardDescription>Active Ads</CardDescription>
                    <CardTitle className="text-3xl text-pink-600">{stats.activeAds}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Marketing campaigns</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Administrative Quick Actions</CardTitle>
                  <CardDescription>Frequently used admin operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {menuItems.slice(0, 8).map((action) => (
                      <Button
                        key={action.screen}
                        onClick={() => onNavigate(action.screen)}
                        variant="outline"
                        className="h-20 flex-col space-y-2 hover:bg-gray-50"
                      >
                        <span className={`text-2xl ${action.color}`}>{action.icon}</span>
                        <span className="text-xs text-center">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-8">
                <span className="text-6xl mb-4 block">🔒</span>
                <h2 className="text-2xl font-bold mb-4">Admin Feature In Development</h2>
                <p className="text-gray-600 mb-6">
                  {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1).replace('-', ' ')} 
                  feature is ready for implementation.
                </p>
                <Button
                  onClick={() => onNavigate('admin-dashboard')}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  ← Back to Admin Dashboard
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Admin Notifications</h3>
              <Button onClick={onToggleNotifications} variant="ghost" size="sm">
                ✕
              </Button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-lg border ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
                {notification.type && (
                  <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                    notification.type === 'security' ? 'bg-red-100 text-red-800' :
                    notification.type === 'system' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {notification.type}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}