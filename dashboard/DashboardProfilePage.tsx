import { Link } from 'react-router-dom';
import { ArrowUpRight, UserCircle } from '../components/Icons';

export default function DashboardProfilePage() {
  return (
    <section className="dashboard-page" aria-labelledby="dashboard-profile-title">
      <header className="dashboard-page-header">
        <div>
          <span className="eyebrow accent">Profile</span>
          <h1 id="dashboard-profile-title">Profile</h1>
        </div>
        <p>Review your basic account details and member information.</p>
      </header>

      <div className="dashboard-two-column">
        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Account identity</p>
            </div>
          </div>
          <div className="dashboard-info-list">
            <div><span>Name</span><strong>Trader</strong></div>
            <div><span>Email</span><strong>member@tradestack.example</strong></div>
            <div><span>Country</span><strong>Not set</strong></div>
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Account Information</h2>
              <p>Registration status</p>
            </div>
          </div>
          <div className="dashboard-info-list">
            <div><span>Account Status</span><strong>Pending</strong></div>
            <div><span>Registration Date</span><strong>Not available</strong></div>
            <div><span>Member Type</span><strong>Trader</strong></div>
          </div>
        </article>
      </div>

      <div className="dashboard-actions-row">
        <Link to="/dashboard" className="button button-outline">Back to Overview <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
