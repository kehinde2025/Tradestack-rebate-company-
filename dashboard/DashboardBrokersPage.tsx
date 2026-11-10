import { Link } from 'react-router-dom';
import { ArrowUpRight, LinkIcon, Shield } from '../components/Icons';

export default function DashboardBrokersPage() {
  return (
    <section className="dashboard-page" aria-labelledby="dashboard-brokers-title">
      <header className="dashboard-page-header">
        <div>
          <span className="eyebrow accent">My Brokers</span>
          <h1 id="dashboard-brokers-title">Broker Accounts</h1>
        </div>
        <p>Manage your connected forex broker accounts.</p>
      </header>

      <div className="dashboard-page-card">
        <div className="dashboard-empty-state dashboard-empty-compact">
          <span className="dashboard-empty-icon"><LinkIcon aria-hidden="true" /></span>
          <strong>No broker accounts connected.</strong>
          <p>Connect an eligible broker account to start tracking your trading activity and rebate eligibility.</p>
          <Link to="/get-started" className="button button-primary">Connect Broker <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>

      <div className="dashboard-two-column">
        <article className="dashboard-panel" id="account-details">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Account Status</h2>
              <p>Current verification state</p>
            </div>
          </div>
          <div className="dashboard-info-list">
            <div><span>Status</span><strong>Not connected</strong></div>
            <div><span>Account Type</span><strong>Not set</strong></div>
            <div><span>Trading Platform</span><strong>Not set</strong></div>
            <div><span>Account Number</span><strong>Not available</strong></div>
            <div><span>Verification</span><strong>Pending</strong></div>
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Important Note</h2>
              <p>Frontend placeholder</p>
            </div>
          </div>
          <div className="dashboard-account-status">
            <span className="dashboard-status-icon"><Shield aria-hidden="true" /></span>
            <div>
              <strong>Verification Pending</strong>
              <p>Broker attribution and eligibility depend on the applicable broker/account arrangement and future verification.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
