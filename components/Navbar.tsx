import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from './Icons';

export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="TradeStack home">
      <span className="logo-mark"><i /><i /><i /></span>
      <span>Trade<span className="logo-accent">Stack</span></span>
    </Link>
  );
}

function Button({
  children,
  to,
  variant = 'primary',
}: {
  children: React.ReactNode;
  to: string;
  variant?: 'primary' | 'outline' | 'text';
}) {
  return (
    <Link className={`button button-${variant}`} to={to}>
      {children}
      {variant !== 'text' && <ArrowUpRight aria-hidden="true" />}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links: [string, string][] = [
    ['/how-it-works', 'How It Works'],
    ['/brokers', 'Brokers'],
    ['/rebates', 'Rebates'],
    ['/faq', 'FAQ'],
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className={`desktop-nav ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link key={href} to={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <div className="mobile-actions">
            <Button to="/login" variant="text">Login</Button>
            <Button to="/get-started">Get Started</Button>
          </div>
        </nav>
        <div className="header-actions">
          <Link to="/login" className="login-link">Login</Link>
          <Button to="/get-started">Get Started</Button>
        </div>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
