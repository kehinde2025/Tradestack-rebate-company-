import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  BarChart,
  ChevronDown,
  Home,
  LinkIcon,
  Shield,
  Sliders,
  Users,
  Wallet,
} from '../components/Icons';
import { Logo } from '../components/Navbar';

const groups = [
  { id: 'users', label: 'Users', Icon: Users, links: [{ to: '/admin/users', label: 'Users' }, { to: '/admin/broker-accounts', label: 'Broker Accounts' }] },
  { id: 'brokers', label: 'Brokers', Icon: LinkIcon, links: [{ to: '/admin/brokers', label: 'Brokers' }, { to: '/admin/broker-reports', label: 'Broker Reports' }] },
  { id: 'cashback', label: 'Cashback', Icon: Wallet, links: [{ to: '/admin/cashback', label: 'Cashback' }, { to: '/admin/transactions', label: 'Transactions' }] },
  { id: 'operations', label: 'Operations', Icon: Shield, links: [{ to: '/admin/verification', label: 'Verification' }, { to: '/admin/payouts', label: 'Payouts' }] },
  { id: 'system', label: 'System', Icon: Sliders, links: [{ to: '/admin/settings', label: 'Settings' }] },
];

export default function AdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const initialGroup = groups.find((group) => group.links.some((item) => item.to === currentPath))?.id;
  const [expandedGroup, setExpandedGroup] = useState<string | undefined>(initialGroup);

  return (
    <aside className="admin-sidebar" aria-label="Admin sidebar">
      <div className="admin-sidebar-brand">
        <Logo />
        <span>Admin Console</span>
      </div>
      <nav className="admin-sidebar-nav" aria-label="Admin navigation">
        <span className="admin-nav-heading">Overview</span>
        <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
          <Home aria-hidden="true" />
          <span>Dashboard</span>
        </NavLink>

        {groups.map(({ id, label, Icon, links }) => {
          const isExpanded = expandedGroup === id;
          const containsActiveRoute = links.some((item) => item.to === currentPath);
          return (
            <section className="admin-nav-group" key={id}>
              <button
                type="button"
                className={`admin-nav-group-toggle${containsActiveRoute ? ' active' : ''}`}
                aria-expanded={isExpanded}
                aria-controls={`admin-nav-${id}`}
                onClick={() => setExpandedGroup(isExpanded ? undefined : id)}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
                <ChevronDown aria-hidden="true" className={isExpanded ? 'expanded' : undefined} />
              </button>
              {isExpanded && (
                <div className="admin-nav-submenu" id={`admin-nav-${id}`}>
                  {links.map(({ to, label: linkLabel }) => (
                    <Link
                      key={to}
                      to={to}
                      className={`admin-nav-sublink${to === currentPath ? ' active' : ''}`}
                    >
                      {linkLabel}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </nav>
      <div className="admin-sidebar-footer">
        <span className="admin-avatar" aria-hidden="true">A</span>
        <span><strong>Administrator</strong><small>Admin Console</small></span>
        <BarChart className="admin-sidebar-footer-icon" aria-hidden="true" />
      </div>
    </aside>
  );
}
