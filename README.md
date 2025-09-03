# 🔒 WayPartner Admin Panel

**Internal administration and management platform**

## ⚠️ INTERNAL USE ONLY

This application is designed exclusively for internal WayPartner team members and is **NOT** accessible to the public. SEO is intentionally blocked to prevent search engine indexing.

## 🎯 Overview

WayPartner Admin Panel is a comprehensive internal management system for overseeing the entire WayPartner ecosystem including service centers, fleet management, payments, system health, and business analytics.

## 🔐 Access Control

### Authentication Requirements
- **Admin Access**: Phone `8888888888` 
- **Super Admin Access**: Phone `9999999999`
- **Two-Factor Authentication**: Recommended for production
- **Session Management**: Automatic timeout and security logging

### Role-Based Permissions
- **Admin**: Service center management, fleet analytics, reports
- **Super Admin**: Full system access, user management, system settings
- **Moderator**: Limited access to specific modules (future)
- **Support**: Read-only access to customer data (future)

## ✨ Core Features

### 📊 Dashboard & Analytics
- **Real-time System Metrics** - Live performance monitoring
- **Business Intelligence** - Revenue, growth, KPI tracking
- **Service Center Performance** - Ratings, volumes, efficiency
- **Fleet Analytics** - 6000+ vehicle management overview

### 🏢 Service Center Management
- **Registration Approval Workflow** - Review and approve new centers
- **Performance Monitoring** - Track service quality and metrics
- **Status Management** - Activate, suspend, or manage centers
- **Communication Tools** - Direct messaging and notifications

### 🚗 Fleet Management
- **Vehicle Registry** - Complete database of 6000+ vehicles
- **Service History Tracking** - Maintenance records and scheduling
- **Green Coins Management** - Reward system administration
- **Performance Analytics** - Usage patterns and optimization

### 💰 Payment & Financial Management
- **Commission Tracking** - Service center earnings and payouts
- **Revenue Analytics** - Monthly, quarterly, annual reports
- **Payment Processing** - Automated and manual payment handling
- **Financial Reporting** - Comprehensive business reports

### 🏥 System Health & Monitoring
- **Real-time System Status** - Server health and performance
- **Database Monitoring** - Connection pools, query performance
- **Error Tracking** - Comprehensive error logging and alerts
- **Backup Management** - Automated backup scheduling and verification

### 📱 Advertisement Management
- **Ad Campaign Creation** - Create and manage promotional content
- **Placement Control** - Target specific app sections
- **Performance Tracking** - Click-through rates and impressions
- **Budget Management** - Campaign spending and ROI tracking

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Professional Black/White Theme)
- **UI Components**: Custom admin-focused components
- **Backend**: Supabase (same as service center app)
- **Error Tracking**: Built-in error logging system
- **Deployment**: Vercel (separate from service center app)

## 📁 Project Structure

```
src/
├── components/          # Admin-specific components
│   ├── AdminDashboard.tsx       # Main admin dashboard
│   ├── AdminServiceCenters.tsx  # Service center management
│   ├── AdminFleetManagement.tsx # Fleet oversight
│   ├── AdminPayments.tsx        # Financial management
│   ├── AdminReports.tsx         # Business reporting
│   ├── AdminSystemHealth.tsx    # System monitoring
│   ├── AdminAdsManagement.tsx   # Advertisement control
│   ├── ErrorLogging.tsx         # Error tracking system
│   └── PostLaunchMonitoring.tsx # System monitoring
├── styles/             # Professional admin styling
├── types/              # Admin-specific TypeScript definitions
└── lib/                # Admin utilities and configurations

public/
├── robots.txt          # SEO blocked - disallow all
└── favicon.ico         # Simple admin favicon
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Admin credentials from WayPartner team
- Supabase admin access

### Installation

```bash
# Clone the admin panel repository
git clone https://github.com/waypartner/admin-panel-app.git
cd admin-panel-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server (admin port)
npm run dev
```

### Environment Variables

```env
# Supabase Configuration (Admin Access)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Panel Configuration
VITE_ADMIN_PANEL_MODE=true
VITE_INTERNAL_USE_ONLY=true

# Error Tracking (Optional)
VITE_SENTRY_DSN=your_sentry_dsn
VITE_LOG_ROCKET_APP_ID=your_logrocket_id
```

## 🎨 Design System

### Professional Theme
- **Primary Colors**: Black (#000000), White (#ffffff)
- **Neutral Grays**: #f8f9fa, #e9ecef, #dee2e6, #6c757d
- **Status Colors**: Blue (info), Green (success), Yellow (warning), Red (error)
- **Typography**: Clean, professional, optimized for data density

### Component Standards
- **Cards**: Subtle shadows and borders for content separation
- **Tables**: Alternating row colors, sortable headers, pagination
- **Forms**: Consistent spacing, validation feedback, accessibility
- **Buttons**: Primary (black), Secondary (outlined), Destructive (red)

## 📊 Key Metrics Dashboard

### System Overview
- **Total Service Centers**: 45+ active centers
- **Fleet Size**: 6000+ vehicles (2000 2-wheelers, 4000 4-wheelers)
- **Monthly Revenue**: ₹25L+ platform revenue
- **Green Coins Issued**: 125,000+ rewards distributed
- **Daily Operations**: 85+ bookings per day

### Performance Indicators
- **System Uptime**: 99.9% availability target
- **Response Time**: <500ms average API response
- **Error Rate**: <0.5% acceptable error threshold
- **User Satisfaction**: 4.5+ average service rating

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start admin development server (port 5176)
npm run build    # Create production build
npm run preview  # Preview production build
npm run deploy   # Deploy admin panel to production
```

### Security Guidelines

- **Never commit credentials** to version control
- **Use environment variables** for all sensitive data
- **Regular security audits** of admin access logs
- **Two-factor authentication** for production access
- **VPN requirements** for remote admin access (production)

## 🚀 Deployment

### Production Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel (admin subdomain)
vercel --prod
```

### Deployment Configuration

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "env": {
    "VITE_INTERNAL_USE_ONLY": "true"
  }
}
```

## 🏥 System Health Monitoring

### Real-time Monitoring
- **Application Performance**: Response times, error rates
- **Database Health**: Connection pools, query performance
- **Server Resources**: CPU, memory, disk usage
- **Network Status**: Connectivity and latency monitoring

### Alerting System
- **Critical Alerts**: System downtime, database failures
- **Performance Alerts**: High response times, resource usage
- **Business Alerts**: Payment failures, service disruptions
- **Security Alerts**: Unauthorized access attempts

## 📈 Business Intelligence

### Revenue Analytics
- **Daily Revenue Tracking**: Real-time income monitoring
- **Service Center Performance**: Top and bottom performers
- **Growth Metrics**: Month-over-month growth analysis
- **Forecasting**: Predictive revenue projections

### Operational Analytics
- **Service Efficiency**: Average service completion times
- **Customer Satisfaction**: Rating trends and feedback analysis
- **Fleet Utilization**: Vehicle usage patterns and optimization
- **Geographic Performance**: Regional service center analysis

## 🔐 Security & Compliance

### Access Control
- **Role-based permissions** for different admin levels
- **Session timeouts** for inactive users
- **Login attempt monitoring** and brute force protection
- **Audit logs** for all admin actions

### Data Protection
- **Encrypted data storage** for sensitive information
- **Secure data transmission** with HTTPS/TLS
- **Regular backups** with encryption at rest
- **GDPR compliance** for user data handling

## 🆘 Emergency Procedures

### System Downtime
1. **Immediate notification** to admin team
2. **Rollback procedures** to last stable version
3. **Communication plan** for service centers
4. **Recovery time objectives** under 30 minutes

### Data Recovery
- **Automated backups** every 6 hours
- **Point-in-time recovery** up to 7 days
- **Disaster recovery plan** with geographic redundancy
- **Regular recovery testing** monthly

## 📞 Internal Support

### Technical Support
- **Primary Contact**: DevOps Team
- **Emergency Hotline**: Internal Slack #admin-support
- **Documentation**: Confluence Wiki
- **Training**: New admin onboarding program

### Business Support
- **Operations Manager**: For business logic questions
- **Finance Team**: For payment and revenue queries
- **Legal Team**: For compliance and regulatory issues

---

**🔒 CONFIDENTIAL - INTERNAL USE ONLY | Professional Admin Interface | Production-Ready**