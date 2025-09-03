import React, { useState } from 'react';
import { User } from '../types';

interface AdminAuthFlowProps {
  onLogin: (user: User) => void;
  connectionStatus: string;
}

export function AdminAuthFlow({ onLogin, connectionStatus }: AdminAuthFlowProps) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate admin credentials
      if (phone === '8888888888' || phone === '9999999999') {
        const adminUser: User = {
          name: phone === '9999999999' ? 'Super Admin' : 'Admin User',
          email: 'admin@waypartner.com',
          phone,
          address: 'Admin Office',
          services: [],
          isLoggedIn: true,
          role: phone === '9999999999' ? 'super-admin' : 'admin'
        };
        onLogin(adminUser);
      } else {
        alert('Unauthorized access. Admin credentials required.');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">WayPartner Admin Panel</h1>
          <p className="text-sm text-red-600 font-medium">⚠️ INTERNAL USE ONLY</p>
          <p className="text-xs text-gray-500 mt-1">Authorized personnel only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter admin phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Authenticating...' : 'Access Admin Panel'}
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500 space-y-1">
          <p>Demo Credentials:</p>
          <p>• Admin: 8888888888</p>
          <p>• Super Admin: 9999999999</p>
        </div>

        {connectionStatus === 'error' && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Demo Mode: Admin panel working with sample data
            </p>
          </div>
        )}
      </div>
    </div>
  );
}