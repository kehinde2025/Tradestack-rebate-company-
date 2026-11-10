import { Link } from 'react-router-dom';
import { ArrowUpRight, Shield } from '../components/Icons';

export default function DashboardSettingsPage() {
  return (
    <section className="dashboard-page" aria-labelledby="dashboard-settings-title">
      <header className="dashboard-page-header">
        <div>
          <span className="eyebrow accent">Settings</span>
          <h1 id="dashboard-settings-title">Settings</h1>
        </div>
        <p>Manage your TradeStack account preferences and controls.</p>
      </header>

      <div className="dashboard-two-column">
        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Account</h2>
              <p>Profile preferences</p>
            </div>
          </div>
          <div className="dashboard-info-list">
            <div><span>Preferred Name</span><strong>Trader</strong></div>
            <div><span>Language</span><strong>English</strong></div>
            <div><span>Time Zone</span><strong>UTC</strong></div>
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Security</h2>
              <p>Password and access</p>
            </div>
          </div>
          <div className="dashboard-info-list">
            <div><span>Password</span><strong>Update unavailable</strong></div>
            <div><span>Two-step Verification</span><strong>Not configured</strong></div>
            <div><span>Sessions</span><strong>Managed later</strong></div>
          </div>
        </article>
      </div>

      <div className="dashboard-two-column">
        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Notifications</h2>
              <p>Preference placeholders</p>
            </div>
          </div>
          <div className="dashboard-info-list">
            <div><span>Cashback alerts</span><strong>Off</strong></div>
            <div><span>Verification updates</span><strong>On</strong></div>
            <div><span>Newsletter</span><strong>Off</strong></div>
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Account Controls</h2>
              <p>Account access</p>
            </div>
          </div>
          <div className="dashboard-account-status dashboard-account-status-warning">
            <span className="dashboard-status-icon"><Shield aria-hidden="true" /></span>
            <div>
              <strong>Logout is in the Account menu</strong>
              <p>Logout will be available when authentication is connected.</p>
            </div>
          </div>
        </article>
      </div>

      <div className="dashboard-actions-row">
        <Link to="/dashboard" className="button button-outline">Back to Overview <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
