import { Bell, UserCircle } from '../components/Icons';

export default function DashboardHeader({
  title,
}: {
  title: string;
}) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-mobile-brand">
        <span className="logo-mark" aria-hidden="true"><i /><i /><i /></span>
        <span>Trade<span className="logo-accent">Stack</span></span>
      </div>
      <div className="dashboard-header-copy">
        <h1>{title}</h1>
        <p>Overview of your TradeStack rebate activity.</p>
      </div>
      <div className="dashboard-header-actions">
        <button
          type="button"
          className="dashboard-icon-button"
          aria-label="Notifications are not connected yet"
          title="Notifications are not connected yet"
          disabled
        >
          <Bell aria-hidden="true" />
        </button>
        <button
          type="button"
          className="dashboard-profile-button"
          aria-label="Account controls are not connected yet"
          title="Account controls are not connected yet"
          disabled
        >
          <UserCircle aria-hidden="true" />
          <span>Trader</span>
        </button>
      </div>
    </header>
  );
}
