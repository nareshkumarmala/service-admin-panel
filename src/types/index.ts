export type Screen = 
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-service-centers'
  | 'admin-fleet'
  | 'admin-users'
  | 'admin-analytics'
  | 'admin-payments'
  | 'admin-ads'
  | 'admin-system'
  | 'admin-reports';

export interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  services: string[];
  isLoggedIn: boolean;
  role?: 'admin' | 'super-admin';
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type?: 'business' | 'system' | 'security';
}