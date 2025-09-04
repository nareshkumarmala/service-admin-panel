import React from 'react';
import { Screen, User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AdminScreenRouterProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  user: User;
  onUpdateUser: (user: User) => void;
}

export function AdminScreenRouter({ currentScreen, onNavigate, user }: AdminScreenRouterProps) {
  // Dashboard Screen
  if (currentScreen === 'admin-dashboard') {
    const stats = {
      totalServiceCenters: 47,
      activeVehicles: 6000,
      monthlyRevenue: 2850000,
      greenCoinsIssued: 125000,
      systemHealth: 99.8,
      activeUsers: 156
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Service Centers</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{stats.totalServiceCenters}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">+3 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Vehicles</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.activeVehicles.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Fleet management</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Monthly Revenue</CardDescription>
              <CardTitle className="text-3xl text-purple-600">₹{(stats.monthlyRevenue / 100000).toFixed(1)}L</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Green Coins Issued</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">{stats.greenCoinsIssued.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Rewards program</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>System Health</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.systemHealth}%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">All systems operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Users</CardDescription>
              <CardTitle className="text-3xl text-indigo-600">{stats.activeUsers}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Currently online</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('admin-service-centers')}
                  className="h-20 flex-col space-y-2"
                >
                  <span className="text-2xl">🏢</span>
                  <span>Service Centers</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('admin-fleet')}
                  className="h-20 flex-col space-y-2"
                >
                  <span className="text-2xl">🚗</span>
                  <span>Fleet</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('admin-analytics')}
                  className="h-20 flex-col space-y-2"
                >
                  <span className="text-2xl">📈</span>
                  <span>Analytics</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('admin-system')}
                  className="h-20 flex-col space-y-2"
                >
                  <span className="text-2xl">⚡</span>
                  <span>System Health</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New service center approved</p>
                    <p className="text-xs text-gray-500">Premium Motors - 5 mins ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">System backup completed</p>
                    <p className="text-xs text-gray-500">15 mins ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Monthly report generated</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default screen for other admin features
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="admin-restricted">
            {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1).replace(/-/g, ' ')}
          </CardTitle>
          <CardDescription>
            Administrative feature ready for implementation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">
                {currentScreen === 'admin-service-centers' ? '🏢' :
                 currentScreen === 'admin-fleet' ? '🚗' :
                 currentScreen === 'admin-users' ? '👥' :
                 currentScreen === 'admin-analytics' ? '📈' :
                 currentScreen === 'admin-payments' ? '💳' :
                 currentScreen === 'admin-ads' ? '📢' :
                 currentScreen === 'admin-system' ? '⚡' :
                 currentScreen === 'admin-reports' ? '📋' : '⚙️'}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {currentScreen === 'admin-service-centers' ? 'Service Center Management' :
               currentScreen === 'admin-fleet' ? 'Fleet Management Dashboard' :
               currentScreen === 'admin-users' ? 'User Management System' :
               currentScreen === 'admin-analytics' ? 'Analytics & Reports' :
               currentScreen === 'admin-payments' ? 'Payment Management' :
               currentScreen === 'admin-ads' ? 'Advertisement Management' :
               currentScreen === 'admin-system' ? 'System Health Monitor' :
               currentScreen === 'admin-reports' ? 'Comprehensive Reports' : 'Admin Feature'}
            </h3>
            
            <p className="text-gray-600 mb-6">
              {currentScreen === 'admin-service-centers' ? 'Manage service center registrations, approvals, and monitoring.' :
               currentScreen === 'admin-fleet' ? 'Monitor 6000+ vehicles, track maintenance, and manage operations.' :
               currentScreen === 'admin-users' ? 'User accounts, permissions, and access control management.' :
               currentScreen === 'admin-analytics' ? 'Business intelligence, KPIs, and performance metrics.' :
               currentScreen === 'admin-payments' ? 'Financial transactions, billing, and revenue tracking.' :
               currentScreen === 'admin-ads' ? 'Manage advertisements, campaigns, and promotional content.' :
               currentScreen === 'admin-system' ? 'Monitor system performance, health checks, and maintenance.' :
               currentScreen === 'admin-reports' ? 'Generate detailed reports for business analysis.' : 
               'This administrative feature is ready for custom implementation.'}
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Feature Status</h4>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Architecture Ready</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Database Schema</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>API Endpoints</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={() => onNavigate('admin-dashboard')}
                  variant="outline"
                >
                  Back to Dashboard
                </Button>
                <Button 
                  onClick={() => alert('Feature implementation can be started based on your specific requirements')}
                >
                  Request Implementation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}