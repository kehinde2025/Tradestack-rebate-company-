import { Bell, UserCircle } from '../components/Icons';

export default function AdminHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="admin-header">
      <div className="admin-mobile-brand">
        <span className="logo-mark" aria-hidden="true"><i /><i /><i /></span>
        <span>Trade<span className="logo-accent">Stack</span><small>Admin</small></span>
      </div>
      <div className="admin-header-copy">
        <span className="admin-header-brand">TradeStack Admin</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="admin-header-actions">
        <button type="button" aria-label="Notifications are not connected yet" title="Notifications are not connected yet" disabled>
          <Bell aria-hidden="true" />
        </button>
        <span className="admin-header-user"><UserCircle aria-hidden="true" /><span>Admin</span></span>
      </div>
    </header>
  );
}
