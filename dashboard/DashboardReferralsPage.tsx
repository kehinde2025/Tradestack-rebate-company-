import { Link } from 'react-router-dom';
import { ArrowUpRight, BarChart, LinkIcon } from '../components/Icons';

const stats = [
  { label: 'Total Referrals', value: '0' },
  { label: 'Active Traders', value: '0' },
  { label: 'Referral Earnings', value: '$0.00' },
];

export default function DashboardReferralsPage() {
  return (
    <section className="dashboard-page" aria-labelledby="dashboard-referrals-title">
      <header className="dashboard-page-header">
        <div>
          <span className="eyebrow accent">Referrals</span>
          <h1 id="dashboard-referrals-title">Referrals</h1>
        </div>
        <p>Invite other traders to TradeStack and track your referral activity.</p>
      </header>

      <div className="dashboard-page-card">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Your Referral Link</h2>
            <p>Coming soon</p>
          </div>
        </div>

        <div className="dashboard-referral-box">
          <span className="dashboard-referral-icon"><LinkIcon aria-hidden="true" /></span>
          <div>
            <strong>Your referral link will appear here.</strong>
            <p>Referral links and commission tracking are not yet connected in this frontend placeholder.</p>
          </div>
        </div>
      </div>

      <div className="dashboard-summary-grid dashboard-stat-grid">
        {stats.map(({ label, value }) => (
          <article key={label} className="dashboard-summary-card">
            <div className="dashboard-summary-card-top">
              <span>{label}</span>
              <span className="dashboard-summary-icon"><BarChart aria-hidden="true" /></span>
            </div>
            <strong className="dashboard-summary-value">{value}</strong>
            <span className="dashboard-summary-description">Placeholder</span>
          </article>
        ))}
      </div>

      <div className="dashboard-page-card" id="activity">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Referral Activity</h2>
            <p>Recent referrals and earnings</p>
          </div>
        </div>
        <div className="dashboard-table-wrap">
          <table className="dashboard-activity-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Referral</th>
                <th>Status</th>
                <th>Activity</th>
                <th>Earnings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <div className="dashboard-table-empty">
                    <BarChart aria-hidden="true" />
                    <strong>No referral activity yet.</strong>
                    <span>Your referral activity will appear here when it becomes available.</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="dashboard-actions-row">
          <Link to="/dashboard" className="button button-outline">Back to Overview <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
