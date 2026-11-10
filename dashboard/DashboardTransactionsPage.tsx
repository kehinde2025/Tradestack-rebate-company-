import { Link } from 'react-router-dom';
import { ArrowUpRight, Receipt } from '../components/Icons';

export default function DashboardTransactionsPage() {
  return (
    <section className="dashboard-page" aria-labelledby="dashboard-transactions-title">
      <header className="dashboard-page-header">
        <div>
          <span className="eyebrow accent">Transactions</span>
          <h1 id="dashboard-transactions-title">Transactions</h1>
        </div>
        <p>View your TradeStack account and cashback transaction history.</p>
      </header>

      <div className="dashboard-page-card">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Recent Activity</h2>
            <p>Transaction history placeholder</p>
          </div>
        </div>

        <div className="dashboard-table-wrap">
          <table className="dashboard-activity-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Broker</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6}>
                  <div className="dashboard-table-empty">
                    <Receipt aria-hidden="true" />
                    <strong>No transactions yet.</strong>
                    <span>Your TradeStack account activity will appear here when verified data is available.</span>
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
