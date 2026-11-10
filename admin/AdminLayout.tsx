import { Outlet, useLocation } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminMobileNav from './AdminMobileNav';
import AdminSidebar from './AdminSidebar';

const routeDetails: Record<string, { title: string; description: string }> = {
  admin: { title: 'Dashboard', description: 'Monitor users, broker activity, cashback, and platform operations.' },
  users: { title: 'Users', description: 'Review TradeStack user accounts.' },
  'broker-accounts': { title: 'Broker Accounts', description: 'Review user-submitted forex broker accounts.' },
  brokers: { title: 'Brokers', description: 'Manage the supported broker catalogue.' },
  'broker-reports': { title: 'Broker Reports', description: 'Review broker-provided reporting when available.' },
  cashback: { title: 'Cashback', description: 'Review eligible cashback activity and status.' },
  transactions: { title: 'Transactions', description: 'Review TradeStack transaction records.' },
  verification: { title: 'Verification', description: 'Review pending account and broker verification.' },
  payouts: { title: 'Payouts', description: 'Review payout records and their statuses.' },
  settings: { title: 'Settings', description: 'Manage admin dashboard preferences.' },
};

export default function AdminLayout() {
  const location = useLocation();
  const section = location.pathname.split('/').filter(Boolean).at(-1) ?? 'admin';
  const details = routeDetails[section] ?? routeDetails.admin;

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title={details.title} description={details.description} />
        <main className="admin-main-content">
          <Outlet />
        </main>
        <AdminMobileNav />
      </div>
    </div>
  );
}
