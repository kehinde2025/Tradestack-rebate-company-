import { Link } from 'react-router-dom';
import { Logo } from './Navbar';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div>
          <Logo />
          <p>Forex rebates, made clearer.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/brokers">Brokers</Link>
            <Link to="/rebates">Rebates</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div>
            <strong>Account</strong>
            <Link to="/login">Login</Link>
            <Link to="/get-started">Get Started</Link>
          </div>
          <div>
            <strong>Legal</strong>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/risk-disclosure">Risk Disclosure</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2025 TradeStack. Beta foundation.</span>
        <span className="footer-disclaimer">Trading involves risk. TradeStack does not guarantee profits or investment returns.</span>
      </div>
    </footer>
  );
}
