import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart,
  Home,
  LinkIcon,
  Receipt,
  Sliders,
  UserCircle,
  Wallet,
} from '../components/Icons';

const primaryItems = [
  { to: '/dashboard', label: 'Home', Icon: Home, end: true },
  { to: '/dashboard/brokers', label: 'Brokers', Icon: LinkIcon },
  { to: '/dashboard/cashback', label: 'Cashback', Icon: Wallet },
  { to: '/dashboard/referrals', label: 'Referrals', Icon: BarChart },
];

const moreItems = [
  { to: '/dashboard/transactions', label: 'Transactions', Icon: Receipt },
  { to: '/dashboard/profile', label: 'Profile', Icon: UserCircle },
  { to: '/dashboard/settings', label: 'Settings', Icon: Sliders },
];

export default function DashboardMobileNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const moreActive = ['/dashboard/transactions', '/dashboard/profile', '/dashboard/settings'].includes(location.pathname);

  return (
    <nav className="dashboard-mobile-nav" aria-label="Dashboard mobile navigation">
      {moreOpen && (
        <div className="dashboard-mobile-nav-panel" id="dashboard-mobile-more">
          {moreItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `dashboard-mobile-nav-panel-item${isActive ? ' active' : ''}`}
              onClick={() => setMoreOpen(false)}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
          <button
            type="button"
            className="dashboard-mobile-nav-panel-item dashboard-mobile-nav-logout"
            disabled
            title="Logout will be available when authentication is connected"
          >
            <UserCircle aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      )}

      <div className="dashboard-mobile-nav-inner">
        {primaryItems.map(({ to, label, Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) => `dashboard-mobile-nav-item${isActive ? ' active' : ''}`}
            onClick={() => setMoreOpen(false)}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className={`dashboard-mobile-nav-item${moreActive ? ' active' : ''}${moreOpen ? ' expanded' : ''}`}
          aria-expanded={moreOpen}
          aria-controls="dashboard-mobile-more"
          onClick={() => setMoreOpen((open) => !open)}
        >
          <Sliders aria-hidden="true" />
          <span>More</span>
        </button>
      </div>
    </nav>
  );
}
