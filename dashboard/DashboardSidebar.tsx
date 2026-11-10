import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  BarChart,
  ChevronDown,
  Home,
  LinkIcon,
  UserCircle,
  Wallet,
} from '../components/Icons';
import { Logo } from '../components/Navbar';

const groups = [
  {
    id: 'brokers',
    label: 'Brokers',
    Icon: LinkIcon,
    links: [
      { to: '/dashboard/brokers', label: 'My Brokers', end: true },
      { to: '/dashboard/brokers#account-details', label: 'Broker Accounts' },
    ],
  },
  {
    id: 'cashback',
    label: 'Cashback',
    Icon: Wallet,
    links: [
      { to: '/dashboard/cashback', label: 'Cashback Overview', end: true },
      { to: '/dashboard/cashback#activity', label: 'Cashback Activity' },
      { to: '/dashboard/transactions', label: 'Transactions', end: true },
    ],
  },
  {
    id: 'referrals',
    label: 'Referrals',
    Icon: BarChart,
    links: [
      { to: '/dashboard/referrals', label: 'Referral Overview', end: true },
      { to: '/dashboard/referrals#activity', label: 'Referral Activity' },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    Icon: UserCircle,
    links: [
      { to: '/dashboard/profile', label: 'Profile', end: true },
      { to: '/dashboard/settings', label: 'Settings', end: true },
    ],
  },
];

export default function DashboardSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const initialExpanded = groups.find((group) =>
    group.links.some((item) => item.to.split('#')[0] === currentPath),
  )?.id;
  const [expandedGroup, setExpandedGroup] = useState<string | undefined>(initialExpanded);

  useEffect(() => {
    const activeGroup = groups.find((group) =>
      group.links.some((item) => item.to.split('#')[0] === currentPath),
    )?.id;
    if (activeGroup) setExpandedGroup(activeGroup);
  }, [currentPath]);

  return (
    <aside className="dashboard-sidebar" aria-label="Dashboard sidebar">
        <div className="dashboard-sidebar-brand">
          <Logo />
          <span>Forex Cashback</span>
        </div>
        <nav className="dashboard-sidebar-nav" aria-label="Dashboard navigation">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => `dashboard-nav-link${isActive ? ' active' : ''}`}
          >
            <Home aria-hidden="true" />
            <span>Overview</span>
          </NavLink>

          {groups.map(({ id, label, Icon, links }) => {
            const containsActiveRoute = links.some((item) => item.to.split('#')[0] === currentPath);
            const isExpanded = expandedGroup === id;

            return (
              <section className="dashboard-nav-group" key={id}>
                <button
                  type="button"
                  className={`dashboard-nav-group-toggle${containsActiveRoute ? ' active' : ''}`}
                  aria-expanded={isExpanded}
                  aria-controls={`dashboard-nav-${id}`}
                  onClick={() => setExpandedGroup(isExpanded ? undefined : id)}
                >
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                  <ChevronDown aria-hidden="true" className={isExpanded ? 'expanded' : undefined} />
                </button>
                {isExpanded && (
                  <div className="dashboard-nav-submenu" id={`dashboard-nav-${id}`}>
                    {links.map(({ to, label: linkLabel }) => {
                      const [path, hash] = to.split('#');
                      const isActive = currentPath === path && (hash ? location.hash === `#${hash}` : !location.hash);
                      return (
                      <Link
                        key={`${to}-${linkLabel}`}
                        to={to}
                        className={`dashboard-nav-sublink${isActive ? ' active' : ''}`}
                      >
                        {linkLabel}
                      </Link>
                      );
                    })}
                    {id === 'account' && (
                      <button
                        type="button"
                        className="dashboard-nav-sublink dashboard-nav-logout"
                        disabled
                        title="Logout will be available when authentication is connected"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </nav>
        <div className="dashboard-sidebar-profile">
          <span className="dashboard-profile-avatar" aria-hidden="true">TS</span>
          <span><strong>Trader</strong><small>TradeStack Member</small></span>
        </div>
    </aside>
  );
}
