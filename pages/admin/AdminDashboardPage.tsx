import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart,
  LinkIcon,
  Receipt,
  Shield,
  Users,
  Wallet,
} from '../../components/Icons';

const summaryCards = [
  { label: 'Total Users', value: '0', detail: 'Registered users', Icon: Users, to: '/admin/users' },
  { label: 'Active Broker Accounts', value: '0', detail: 'Connected accounts', Icon: LinkIcon, to: '/admin/broker-accounts' },
  { label: 'Pending Verification', value: '0', detail: 'Accounts awaiting review', Icon: Shield, to: '/admin/verification' },
  { label: 'Pending Cashback', value: '$0.00', detail: 'Awaiting approval', Icon: Wallet, to: '/admin/cashback' },
];

const operationalQueues = [
  { label: 'Pending Broker Verifications', empty: 'No pending broker verifications.', to: '/admin/verification' },
  { label: 'Pending Cashback', empty: 'No cashback awaiting approval.', to: '/admin/cashback' },
  { label: 'Pending Payouts', empty: 'No pending payouts.', to: '/admin/payouts' },
  { label: 'Recent Broker Reports', empty: 'No broker reports available.', to: '/admin/broker-reports' },
];

const brokers = ['HFM', 'XM', 'IC Markets', 'Exness'];

export default function AdminDashboardPage() {
  return (
    <section className="admin-page admin-dashboard-overview" aria-labelledby="admin-dashboard-title">
      <header className="admin-page-heading admin-dashboard-heading">
        <div>
          <span className="eyebrow accent">Overview</span>
          <h2 id="admin-dashboard-title">Dashboard</h2>
        </div>
        <p>Monitor users, broker activity, cashback, and platform operations.</p>
      </header>

      <section className="admin-summary-grid" aria-label="Platform summary">
        {summaryCards.map(({ label, value, detail, Icon, to }) => (
          <Link to={to} className="admin-summary-card" key={label}>
            <div className="admin-summary-card-heading">
              <span>{label}</span>
              <span className="admin-overview-icon"><Icon aria-hidden="true" /></span>
            </div>
            <strong>{value}</strong>
            <small>{detail}</small>
          </Link>
        ))}
      </section>

      <section className="admin-dashboard-section" aria-labelledby="admin-operations-title">
        <div className="admin-section-heading">
          <div>
            <h2 id="admin-operations-title">Operations Overview</h2>
            <p>Queues requiring operational review</p>
          </div>
        </div>
        <div className="admin-operations-grid">
          {operationalQueues.map(({ label, empty, to }) => (
            <Link to={to} className="admin-operation-card" key={label}>
              <span>{label}</span>
              <strong>{empty}</strong>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="admin-dashboard-section" aria-labelledby="admin-activity-title">
        <div className="admin-section-heading">
          <div>
            <h2 id="admin-activity-title">Recent Activity</h2>
            <p>Latest user, broker, and platform events</p>
          </div>
          <Link to="/admin/transactions" className="admin-section-link">Transactions <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-activity-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Broker</th>
                <th>Activity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <div className="admin-activity-empty">
                    <Receipt aria-hidden="true" />
                    <strong>No recent activity</strong>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-dashboard-section" aria-labelledby="admin-brokers-title">
        <div className="admin-section-heading">
          <div>
            <h2 id="admin-brokers-title">Broker Overview</h2>
            <p>Supported forex brokers and current account activity</p>
          </div>
          <Link to="/admin/brokers" className="admin-section-link">Manage brokers <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="admin-broker-list">
          <div className="admin-broker-row admin-broker-table-heading" aria-hidden="true">
            <span>Broker</span>
            <span>Status</span>
            <span>Connected Accounts</span>
            <span>Trading Volume</span>
            <span>Cashback Activity</span>
          </div>
          {brokers.map((broker) => (
            <div className="admin-broker-row" key={broker}>
              <strong>{broker}</strong>
              <span data-label="Status"><i className="admin-broker-status-dot" /> Supported</span>
              <span data-label="Connected Accounts">0</span>
              <span data-label="Trading Volume">0.00 lots</span>
              <span className="admin-broker-activity-empty" data-label="Cashback Activity"><BarChart aria-hidden="true" /> No activity</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
