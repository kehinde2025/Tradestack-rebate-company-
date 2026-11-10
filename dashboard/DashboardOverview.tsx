import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart,
  LinkIcon,
  Receipt,
  Shield,
  Wallet,
} from '../components/Icons';

type SummaryCardProps = {
  title: string;
  value: string;
  description: string;
  Icon: typeof Wallet;
};

function SummaryCard({ title, value, description, Icon }: SummaryCardProps) {
  return (
    <article className="dashboard-summary-card">
      <div className="dashboard-summary-card-top">
        <span>{title}</span>
        <span className="dashboard-summary-icon"><Icon aria-hidden="true" /></span>
      </div>
      <strong className="dashboard-summary-value">{value}</strong>
      <span className="dashboard-summary-description">{description}</span>
    </article>
  );
}

const summaryCards: SummaryCardProps[] = [
  { title: 'Total Cashback', value: '$0.00', description: 'Lifetime cashback', Icon: Wallet },
  { title: 'Pending Cashback', value: '$0.00', description: 'Awaiting approval', Icon: Receipt },
  { title: 'Paid Cashback', value: '$0.00', description: 'Successfully paid', Icon: Shield },
  { title: 'Trading Volume', value: '0.00 lots', description: 'Eligible trading volume', Icon: BarChart },
];

export default function DashboardOverview() {
  return (
    <div className="dashboard-overview">
      <p className="dashboard-data-disclaimer">Dashboard figures are placeholders and do not represent verified account activity.</p>

      <section className="dashboard-summary-grid" aria-label="Rebate summary">
        {summaryCards.map((card) => <SummaryCard key={card.title} {...card} />)}
      </section>

      <div className="dashboard-content-grid dashboard-primary-grid">
        <section className="dashboard-panel" aria-labelledby="dashboard-brokers-title">
          <div className="dashboard-panel-heading">
            <div><h2 id="dashboard-brokers-title">Broker Accounts</h2><p>Supported broker connections</p></div>
            <Link to="/dashboard/brokers" className="dashboard-panel-link">View all <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className="dashboard-empty-state">
            <span className="dashboard-empty-icon"><LinkIcon aria-hidden="true" /></span>
            <strong>No broker accounts connected yet.</strong>
            <p>Connect a supported broker account to begin tracking eligible trading activity and rebates.</p>
            <Link to="/get-started" className="button button-primary">Connect Broker <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="dashboard-panel dashboard-status-panel" aria-labelledby="dashboard-status-title">
          <div className="dashboard-panel-heading">
            <div><h2 id="dashboard-status-title">Account Status</h2><p>Frontend status placeholder</p></div>
          </div>
          <div className="dashboard-account-status">
            <span className="dashboard-status-icon"><Shield aria-hidden="true" /></span>
            <div><strong>Verification Pending</strong><p>Your status remains pending until the required account and broker checks are available.</p></div>
          </div>
          <p className="dashboard-neutral-note">Broker attribution and eligibility are determined by applicable broker terms and future verification.</p>
        </section>
      </div>

      <div className="dashboard-content-grid dashboard-secondary-grid">
        <section className="dashboard-panel dashboard-activity-panel" aria-labelledby="dashboard-activity-title">
          <div className="dashboard-panel-heading">
            <div><h2 id="dashboard-activity-title">Recent Rebate Activity</h2><p>Eligible activity reported by connected brokers</p></div>
            <Link to="/dashboard/rebates" className="dashboard-panel-link">Rebates <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className="dashboard-table-wrap">
            <table className="dashboard-activity-table">
              <thead><tr><th>Date</th><th>Broker</th><th>Account</th><th>Volume</th><th>Eligible Commission</th><th>Rebate</th><th>Status</th></tr></thead>
              <tbody><tr><td colSpan={7}>
                <div className="dashboard-table-empty"><Receipt aria-hidden="true" /><strong>No rebate activity yet.</strong><span>Your eligible trading activity will appear here once your broker account is connected and verified.</span></div>
              </td></tr></tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-panel dashboard-rebate-overview" aria-labelledby="dashboard-rebate-overview-title">
          <div className="dashboard-panel-heading">
            <div><h2 id="dashboard-rebate-overview-title">Rebate Overview</h2><p>Performance preview</p></div>
          </div>
          <div className="dashboard-chart-empty">
            <div className="dashboard-chart-placeholder" aria-hidden="true" />
            <p>Your rebate activity will appear here after eligible trading activity is recorded.</p>
          </div>
          <div className="dashboard-period-summary">
            <div><span>Current period</span><strong>No data yet</strong></div>
            <div><span>Previous period</span><strong>No data yet</strong></div>
            <div><span>Total eligible volume</span><strong>0.00 lots</strong></div>
          </div>
          <div className="dashboard-rebate-metrics" aria-label="Rebate details placeholders">
            <div><span>Current rebate rate</span><strong>Not configured</strong></div>
            <div><span>Eligible commission</span><strong>No data yet</strong></div>
            <div><span>Customer rebate</span><strong>No data yet</strong></div>
          </div>
          <div className="dashboard-rebate-statuses" aria-label="Rebate status placeholders">
            <span>Pending <strong>No data</strong></span>
            <span>Approved <strong>No data</strong></span>
            <span>Paid <strong>No data</strong></span>
          </div>
          <p className="dashboard-neutral-note">Applicable customer rebate rates vary by broker and account arrangement and may range from 50% to a maximum of 80%. No individual rate is set here.</p>
        </section>
      </div>

    </div>
  );
}
