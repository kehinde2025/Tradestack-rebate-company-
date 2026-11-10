import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  LinkIcon,
  Receipt,
  Shield,
  Sliders,
  Users,
  Wallet,
} from '../components/Icons';

const primaryItems = [
  { to: '/admin', label: 'Home', Icon: Home, end: true },
  { to: '/admin/users', label: 'Users', Icon: Users },
  { to: '/admin/brokers', label: 'Brokers', Icon: LinkIcon },
  { to: '/admin/cashback', label: 'Cashback', Icon: Wallet },
];

const moreItems = [
  { to: '/admin/broker-accounts', label: 'Broker Accounts', Icon: LinkIcon },
  { to: '/admin/broker-reports', label: 'Broker Reports', Icon: Receipt },
  { to: '/admin/transactions', label: 'Transactions', Icon: Receipt },
  { to: '/admin/verification', label: 'Verification', Icon: Shield },
  { to: '/admin/payouts', label: 'Payouts', Icon: Wallet },
  { to: '/admin/settings', label: 'Settings', Icon: Sliders },
];

export default function AdminMobileNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const moreActive = moreItems.some((item) => item.to === location.pathname);

  return (
    <nav className="admin-mobile-nav" aria-label="Admin mobile navigation">
      {moreOpen && (
        <div className="admin-mobile-more-panel" id="admin-mobile-more">
          {moreItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `admin-mobile-more-item${isActive ? ' active' : ''}`}
              onClick={() => setMoreOpen(false)}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      )}
      <div className="admin-mobile-nav-items">
        {primaryItems.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `admin-mobile-nav-item${isActive ? ' active' : ''}`}
            onClick={() => setMoreOpen(false)}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className={`admin-mobile-nav-item${moreActive ? ' active' : ''}${moreOpen ? ' expanded' : ''}`}
          aria-expanded={moreOpen}
          aria-controls="admin-mobile-more"
          onClick={() => setMoreOpen((open) => !open)}
        >
          <Sliders aria-hidden="true" />
          <span>More</span>
        </button>
      </div>
    </nav>
  );
}
