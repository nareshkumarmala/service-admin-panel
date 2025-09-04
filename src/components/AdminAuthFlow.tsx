import React, { useState } from 'react';
import { User } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface AdminAuthFlowProps {
  onLogin: (user: User) => void;
  connectionStatus: string;
}

export function AdminAuthFlow({ onLogin, connectionStatus }: AdminAuthFlowProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo admin accounts
      const adminAccounts = {
        'admin': {
          password: 'waypartner2024',
          user: {
            name: 'Admin User',
            email: 'admin@waypartner.com',
            phone: '+91 9999999999',
            address: 'WayPartner HQ, Hyderabad',
            services: ['System Administration', 'User Management', 'Reports'],
            isLoggedIn: true,
            role: 'admin' as const
          }
        },
        'superadmin': {
          password: 'waypartner2024',
          user: {
            name: 'Super Admin',
            email: 'superadmin@waypartner.com',
            phone: '+91 8888888888',
            address: 'WayPartner HQ, Hyderabad',
            services: ['Full System Access', 'Security Management', 'Infrastructure'],
            isLoggedIn: true,
            role: 'super-admin' as const
          }
        }
      };

      const account = adminAccounts[username as keyof typeof adminAccounts];
      
      if (account && account.password === password) {
        onLogin(account.user);
      } else {
        alert('Invalid credentials. Use admin/waypartner2024 or superadmin/waypartner2024');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-2 border-red-200">
          <CardHeader className="text-center bg-red-50">
            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
              <img 
                src="/waypartner-logo.png" 
                alt="WayPartner Admin" 
                className="w-12 h-12 object-contain filter invert"
              />
            </div>
            <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-2">
              🔒 Admin Panel
            </CardTitle>
            <CardDescription className="text-red-600 font-semibold">
              INTERNAL USE ONLY - AUTHORIZED ACCESS REQUIRED
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                {loading ? 'Authenticating...' : 'Admin Sign In'}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Demo Admin Accounts:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="font-medium">Standard Admin</p>
                    <p className="text-gray-600">Username: admin</p>
                    <p className="text-gray-600">Password: waypartner2024</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="font-medium">Super Admin</p>
                    <p className="text-gray-600">Username: superadmin</p>
                    <p className="text-gray-600">Password: waypartner2024</p>
                  </div>
                </div>
              </div>
            </div>

            {connectionStatus === 'error' && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Demo Mode: Admin panel working with sample data
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-700 text-center">
                🔒 This is an internal administrative interface.
                <br />Unauthorized access is prohibited and monitored.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}