import { Link } from 'react-router-dom';
import { ArrowUpRight, Receipt, Shield, Wallet } from '../components/Icons';

const summaryCards = [
  { label: 'Total Cashback', value: '$0.00', detail: 'Lifetime cashback', Icon: Wallet },
  { label: 'Pending Cashback', value: '$0.00', detail: 'Awaiting approval', Icon: Receipt },
  { label: 'Approved Cashback', value: '$0.00', detail: 'Eligible and approved', Icon: Shield },
  { label: 'Paid Cashback', value: '$0.00', detail: 'Successfully paid', Icon: Wallet },
];

export default function DashboardCashbackPage() {
  return (
    <section className="dashboard-page" aria-labelledby="dashboard-cashback-title">
      <header className="dashboard-page-header">
        <div>
          <span className="eyebrow accent">Cashback</span>
          <h1 id="dashboard-cashback-title">Cashback</h1>
        </div>
        <p>Track cashback generated from your eligible forex trading activity.</p>
      </header>

      <div className="dashboard-summary-grid">
        {summaryCards.map(({ label, value, detail, Icon }) => (
          <article key={label} className="dashboard-summary-card">
            <div className="dashboard-summary-card-top">
              <span>{label}</span>
              <span className="dashboard-summary-icon"><Icon aria-hidden="true" /></span>
            </div>
            <strong className="dashboard-summary-value">{value}</strong>
            <span className="dashboard-summary-description">{detail}</span>
          </article>
        ))}
      </div>

      <div className="dashboard-page-card" id="activity">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Cashback Activity</h2>
            <p>Eligible activity and status</p>
          </div>
          <Link to="/dashboard/transactions" className="dashboard-panel-link">Transactions <ArrowUpRight aria-hidden="true" /></Link>
        </div>

        <div className="dashboard-table-wrap">
          <table className="dashboard-activity-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Broker</th>
                <th>Account</th>
                <th>Volume</th>
                <th>Eligible Commission</th>
                <th>Rate</th>
                <th>Cashback</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className="dashboard-table-empty">
                    <Receipt aria-hidden="true" />
                    <strong>No cashback activity yet.</strong>
                    <span>Your eligible trading activity and cashback will appear here after your broker account is connected and verified.</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-panel dashboard-note-panel">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Rebate Model</h2>
            <p>Customer-facing rate guidance</p>
          </div>
        </div>
        <p className="dashboard-neutral-note">
          TradeStack can return 50%–80% of eligible broker-generated commission to traders, depending on the applicable broker and account arrangement. 80% is the maximum customer rebate offered by TradeStack.
        </p>
        <div className="dashboard-formula-stack" aria-label="Rebate calculation formula">
          <span>Eligible Broker Commission</span>
          <span className="operator">×</span>
          <span>TradeStack Rebate Percentage (50%–80%)</span>
          <span className="operator">=</span>
          <span>Trader Rebate</span>
        </div>
      </div>
    </section>
  );
}
