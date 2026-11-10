import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from '../components/Icons';

const placeholderContent: Record<string, { title: string; description: string }> = {
  brokers: {
    title: 'Broker Accounts',
    description: 'This section will allow you to manage supported broker accounts and review their connection status.',
  },
  rebates: {
    title: 'Rebates',
    description: 'Eligible rebate activity and its pending, approved, or paid status will appear here when available.',
  },
  transactions: {
    title: 'Transactions',
    description: 'This section will show available rebate-related transaction history once data is connected.',
  },
  earnings: {
    title: 'Earnings',
    description: 'This section will summarize eligible rebate activity when verified account data is available.',
  },
  settings: {
    title: 'Settings',
    description: 'Account profile, security, preferences, notifications, connected accounts, and account controls will be managed here.',
  },
};

export default function DashboardPlaceholder() {
  const location = useLocation();
  const section = location.pathname.split('/').filter(Boolean).at(-1) ?? 'settings';
  const content = placeholderContent[section] ?? placeholderContent.settings;

  return (
    <section className="dashboard-panel dashboard-placeholder" aria-labelledby="dashboard-placeholder-title">
      <span className="eyebrow accent">TRADESTACK DASHBOARD</span>
      <h2 id="dashboard-placeholder-title">{content.title}</h2>
      <p>{content.description}</p>
      <p className="dashboard-placeholder-note">This area is a frontend placeholder. No account or financial data is being loaded.</p>
      <Link to="/dashboard" className="button button-outline">Back to Overview <ArrowUpRight aria-hidden="true" /></Link>
    </section>
  );
}
