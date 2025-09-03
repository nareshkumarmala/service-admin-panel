import React from 'react';
import { Screen, User } from '../types';

interface AdminScreenRouterProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  user: User;
  onLogin: (user: User) => void;
  onUpdateUser: (user: User) => void;
}

export function AdminScreenRouter({ currentScreen, onNavigate, user, onLogin }: AdminScreenRouterProps) {
  switch (currentScreen) {
    case 'admin-login':
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel Login</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">Internal use only</p>
            <button 
              onClick={() => {
                const adminUser = {
                  name: 'Admin User',
                  email: 'admin@waypartner.com',
                  phone: '8888888888',
                  address: 'Admin Office',
                  services: [],
                  isLoggedIn: true,
                  role: 'admin' as const
                };
                onLogin(adminUser);
              }}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Admin Login (Demo)
            </button>
          </div>
        </div>
      );
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Feature</h2>
            <p className="text-gray-600">This admin feature is under development</p>
          </div>
        </div>
      );
  }
}