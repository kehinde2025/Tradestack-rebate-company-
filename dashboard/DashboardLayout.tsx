import { Outlet, useLocation } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardMobileNav from './DashboardMobileNav';
import DashboardSidebar from './DashboardSidebar';

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  brokers: 'Broker Accounts',
  cashback: 'Cashback',
  transactions: 'Transactions',
  referrals: 'Referrals',
  profile: 'Profile',
  settings: 'Settings',
  earnings: 'Cashback',
  rebates: 'Cashback',
};

export default function DashboardLayout() {
  const location = useLocation();
  const section = location.pathname.split('/').filter(Boolean).at(-1) ?? 'dashboard';

  return (
    <div className="dashboard-shell">
      <DashboardSidebar />
      <div className="dashboard-main">
        <DashboardHeader
          title={pageTitles[section] ?? 'Dashboard'}
        />
        <main className="dashboard-main-content">
          <Outlet />
        </main>
        <DashboardMobileNav />
      </div>
    </div>
  );
}
