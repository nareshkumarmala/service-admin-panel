export type Screen = 'admin-login' | 'admin-dashboard' | 'admin-service-centers' | 'admin-fleet' | 'admin-analytics' | 'admin-users' | 'admin-payments' | 'admin-reports' | 'admin-system' | 'admin-ads' | 'admin-settings' | 'system-health' | 'monitoring';

export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  services: string[];
  isLoggedIn: boolean;
  role?: 'admin' | 'super-admin';
  permissions?: string[];
  lastLogin?: string;
  loginId?: string;
  password?: string;
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  type?: 'system' | 'user' | 'service' | 'payment' | 'security';
}

export interface ServiceCenter {
  id: string;
  name: string;
  location: string;
  contact: string;
  email: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  registeredDate: string;
  vehiclesServiced: number;
  greenCoinsIssued: number;
  rating: number;
  services: string[];
  workingHours: string;
  address: string;
  gstNumber: string;
  ownerName: string;
  ownerPhone: string;
  monthlyRevenue: number;
  lastActive: string;
  approvalDate?: string;
  rejectionReason?: string;
}

export interface VehicleFleet {
  id: string;
  vehicleNumber: string;
  vehicleType: '2-wheeler' | '4-wheeler';
  ownerName: string;
  ownerPhone: string;
  registrationDate: string;
  lastServiceDate: string;
  totalKilometers: number;
  greenCoinsEarned: number;
  serviceCenterId: string;
  serviceCenterName: string;
  status: 'active' | 'inactive' | 'maintenance' | 'suspended';
  nextServiceDue: string;
  model: string;
  year: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
}

export interface AdminAnalytics {
  totalServiceCenters: number;
  activeServiceCenters: number;
  pendingServiceCenters: number;
  totalVehicles: number;
  totalGreenCoinsIssued: number;
  totalServicesCompleted: number;
  monthlyRevenue: number;
  dailyBookings: number;
  pendingApprovals: number;
  averageRating: number;
  topPerformingCenters: ServiceCenter[];
  recentActivity: AdminActivity[];
  systemHealth: SystemHealth;
}

export interface AdminActivity {
  id: string;
  type: 'service-center-registration' | 'vehicle-registration' | 'service-completion' | 'issue-reported' | 'payment-completed' | 'system-alert' | 'user-action';
  description: string;
  timestamp: string;
  serviceCenterId?: string;
  vehicleId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  actionTaken?: string;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  responseTime: number;
  errorRate: number;
  activeUsers: number;
  databaseConnections: number;
  memoryUsage: number;
  cpuUsage: number;
  lastBackup: string;
  alerts: SystemAlert[];
}

export interface SystemAlert {
  id: string;
  type: 'performance' | 'security' | 'database' | 'backup' | 'error';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface PaymentRecord {
  id: string;
  serviceCenterId: string;
  serviceCenterName: string;
  amount: number;
  type: 'commission' | 'penalty' | 'bonus' | 'refund';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionDate: string;
  paymentMethod: string;
  description: string;
  invoiceNumber?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'super-admin' | 'moderator' | 'support';
  permissions: string[];
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdDate: string;
  createdBy: string;
  department?: string;
  twoFactorEnabled: boolean;
}

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  targetUrl?: string;
  type: 'banner' | 'popup' | 'inline' | 'video';
  placement: 'dashboard' | 'booking' | 'fleet' | 'all';
  status: 'active' | 'inactive' | 'scheduled' | 'expired';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  budget: number;
  spent: number;
  createdBy: string;
  createdDate: string;
}