# WayPartner Admin Panel

**🔒 INTERNAL USE ONLY - AUTHORIZED PERSONNEL**

Internal administrative dashboard for managing WayPartner service centers, fleet operations, and business analytics.

## Features

- **Service Center Management** - Approve/reject registrations
- **Fleet Dashboard** - Monitor 6000+ vehicles
- **User Management** - Handle service center accounts
- **Analytics & Reports** - Business intelligence and KPIs
- **Payment Management** - Revenue tracking and billing
- **Advertisement Management** - Campaign and promotion control
- **System Health Monitoring** - Infrastructure and performance
- **Security Features** - Access control and audit logging

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (port 5176)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

Copy `.env.example` to `.env` and configure:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Demo Credentials

**Admin Access:**
- Username: `admin` / Password: `waypartner2024`
- Username: `superadmin` / Password: `waypartner2024`

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Professional black/white theme
- **Charts:** Recharts for analytics
- **Database:** Supabase (optional - works with demo data)
- **Security:** Anti-SEO, access control, audit logging

## Key Dashboards

- **Admin Dashboard** - System overview and metrics
- **Service Centers** - Registration management and monitoring
- **Fleet Management** - Vehicle tracking and maintenance oversight
- **Analytics** - Business intelligence and performance metrics
- **User Management** - Account control and permissions
- **System Health** - Infrastructure monitoring and alerts

## Security Features

- **Anti-SEO:** Blocked from search engines (`robots.txt`, `noindex`)
- **Access Control:** Role-based permissions (admin/super-admin)
- **Audit Logging:** All actions tracked and logged
- **Session Management:** Secure admin session handling
- **Error Monitoring:** Comprehensive error tracking and reporting

## Deployment

Ready for internal deployment:

```bash
# Build for production (no source maps for security)
npm run build
```

**Security Notes:**
- Never deploy on public domains
- Use VPN/internal network access only
- Regular security audits required
- Monitor all admin activities

## Theme

Professional administrative interface:
- Black/white minimalist design
- High contrast for readability
- Clean data visualization
- Mobile responsive (internal use)

---

**⚠️ WARNING:** This admin panel contains sensitive business data and system controls. Access is restricted to authorized WayPartner personnel only.