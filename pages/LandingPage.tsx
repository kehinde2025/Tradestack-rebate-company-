import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart,
  Bell,
  Check,
  ChevronDown,
  Eye,
  Receipt,
  Shield,
  Sliders,
  Wallet,
} from '../components/Icons';

const brokers = [
  { name: 'HFM', wordmark: 'hfm', weight: 900, Image: '/brokers/images/HFM-LOGO.PNG', note: 'Regulated multi-asset broker with high-volume FX pairs.' },
  { name: 'XM', wordmark: 'XM', weight: 900, Image: '/brokers/images/XM-LOGO.png', note: 'Established broker with tiered spreads across major pairs.' },
  { name: 'IC Markets', wordmark: 'IC Markets', weight: 900, Image: '/brokers/images/ICMARKET-LOGO.png', note: 'Raw-spread ECN pricing built for active traders.' },
];

const steps = [
  ['01', 'Choose a supported broker', 'Compare the available broker options and choose the account relationship that suits you.'],
  ['02', 'Connect an eligible account', 'Link your eligible broker account to your TradeStack profile.'],
  ['03', 'Trade as you normally do', 'Your trading relationship and funds remain directly with your broker.'],
  ['04', 'Track eligible rebates', 'TradeStack reports qualifying activity and displays applicable rebate status.'],
];

const benefits = [
  { title: 'Track activity', description: 'Keep eligible trading activity visible in one clear, account-level view.', icon: BarChart },
  { title: 'Understand rebates', description: 'See how broker-specific terms affect your rebate status.', icon: Eye },
  { title: 'Manage accounts', description: 'Keep eligible relationships from multiple supported brokers organised.', icon: Sliders },
  { title: 'Track payments', description: 'Monitor pending, processed, and paid rebate records over time.', icon: Wallet },
];

const faqs = [
  ['What is a forex rebate?', 'A forex rebate is a broker-related benefit that may be credited when eligible trading activity meets the applicable broker and partner terms. It is separate from trading profit and does not change the market risk of trading.'],
  ['How does TradeStack work?', 'You choose a supported broker, connect an eligible account, trade with that broker, and use TradeStack to track reported qualifying activity and the related rebate status.'],
  ['Does TradeStack hold my trading funds?', 'No. TradeStack does not hold customer trading capital. Your funds and trading relationship remain with the broker.'],
  ['Which brokers are supported?', 'The initial supported broker categories are HFM, XM, and IC Markets. Eligibility, account types, and availability may vary by broker and region.'],
  ['How are rebates calculated?', 'Applicable rebates vary by broker, account type, trading activity, and partner terms. TradeStack will show the relevant status and details when available.'],
  ['When are rebates paid?', 'Timing and payment mechanics depend on the applicable broker-side rebate terms. TradeStack is designed to show the status clearly; it does not promise a fixed payment schedule.'],
  ['Can I have multiple broker accounts?', 'You may be able to manage multiple eligible accounts from supported brokers within one TradeStack account, subject to verification and applicable terms.'],
  ['Does TradeStack guarantee trading profits?', 'No. TradeStack does not guarantee trading profits, investment returns, or any particular financial outcome. Trading involves risk.'],
];

function Button({
  children,
  to,
  variant = 'primary',
  className = '',
  external = false,
}: {
  children: React.ReactNode;
  to: string;
  variant?: 'primary' | 'outline' | 'text';
  className?: string;
  external?: boolean;
}) {
  const content = (
    <>
      {children}
      {variant !== 'text' && <ArrowUpRight aria-hidden="true" />}
    </>
  );
  if (external) {
    return <a className={`button button-${variant} ${className}`} href={to}>{content}</a>;
  }
  return <Link className={`button button-${variant} ${className}`} to={to}>{content}</Link>;
}

function SectionIntro({
  eyebrow,
  title,
  children,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`section-intro intro-${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="status-pill"><span />Beta platform, built for clarity</div>
          <h1>Trade forex.<br /><em>Track your rebates.</em></h1>
          <p className="hero-lede">
            Connect an eligible account with a supported broker, keep trading the way you already do,
            and follow qualifying rebate activity in one dashboard — earned, pending, and paid.
          </p>
          <div className="hero-actions">
            <Button to="/get-started">Get started</Button>
            <Button to="/how-it-works" variant="outline">How it works <ArrowRight aria-hidden="true" /></Button>
          </div>
          <div className="hero-note">
            <Shield aria-hidden="true" />
            <span>Trading funds remain with your broker. TradeStack never takes custody.</span>
          </div>
        </div>
        <DashboardPreview />
      </div>
    </section>
  );
}

function DashboardPreview() {
  const nav = [
    { label: 'Overview', icon: BarChart, active: true },
    { label: 'Accounts', icon: Wallet },
    { label: 'Rebates', icon: ArrowUpRight },
    { label: 'Transactions', icon: Receipt },
    { label: 'Settings', icon: Sliders },
  ];
  const metrics = [
    { label: 'Total rebates', value: '$1,284.00', note: 'Current period', accent: true },
    { label: 'Pending', value: '$396.00', note: 'Awaiting confirmation' },
    { label: 'Paid', value: '$888.00', note: 'Broker-reported' },
    { label: 'Trading volume', value: '$184.6K', note: 'Current period' },
  ];
  const activity = [
    { broker: 'HFM', amount: '+$182.00', status: 'Pending' },
    { broker: 'XM', amount: '+$214.00', status: 'Paid' },
    { broker: 'IC Markets', amount: '+$98.00', status: 'Pending' },
  ];

  return (
    <div className="preview-wrap" aria-label="TradeStack dashboard preview">
      <div className="preview-glow" />
      <div className="dashboard-preview">
        <div className="dash-topbar">
          <div className="mini-logo"><span className="logo-mark"><i /><i /><i /></span>TradeStack</div>
          <div className="dash-top-actions">
            <span className="dash-icon-btn"><Bell aria-hidden="true" /><span className="dash-dot" /></span>
            <span className="dash-avatar">JD</span>
          </div>
        </div>
        <div className="dash-body">
          <aside className="dash-sidebar">
            {nav.map(({ label, icon: Icon, active }) => (
              <span key={label} className={active ? 'side-active' : ''}><Icon aria-hidden="true" /> {label}</span>
            ))}
          </aside>
          <div className="dash-content">
            <div className="dash-heading">
              <div><small>Overview</small><h3>Good morning, Jordan</h3></div>
              <span className="demo-tag">Live view</span>
            </div>

            <div className="metric-grid">
              {metrics.map(({ label, value, note, accent }) => (
                <div className={`metric-card ${accent ? 'accent' : ''}`} key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{note}</small>
                </div>
              ))}
            </div>

            <div className="chart-card">
              <div className="chart-head">
                <span>Rebate activity</span>
                <small>Last 30 days</small>
              </div>
              <div className="chart">
                <svg viewBox="0 0 500 130" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 103 C35 96 42 111 75 91 S116 92 142 77 S184 86 211 57 S252 78 278 64 S315 72 345 33 S380 55 407 39 S450 53 500 12" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path d="M0 103 C35 96 42 111 75 91 S116 92 142 77 S184 86 211 57 S252 78 278 64 S315 72 345 33 S380 55 407 39 S450 53 500 12 V130 H0Z" fill="currentColor" opacity=".08" />
                </svg>
              </div>
            </div>

            <div className="recent-row">
              <span>Recent rebate activity</span>
              <span className="muted">View all <ArrowRight aria-hidden="true" /></span>
            </div>
            <div className="activity-list">
              {activity.map(({ broker, amount, status }) => (
                <div key={broker}>
                  <span>{broker}</span>
                  <strong>{amount}</strong>
                  <small className={status === 'Paid' ? 'status-paid' : 'status-pending'}>{status}</small>
                </div>
              ))}
            </div>

            <div className="account-strip">
              <span>4 connected accounts</span>
              <span className="account-strip-tags">
                <em>HFM</em><em>XM</em><em>IC Markets</em>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrokerSection() {
  return (
    <section className="broker-section" id="brokers">
      <div className="container broker-layout">
        <div className="broker-intro">
          <span className="eyebrow">Supported brokers</span>
          <h2>One clear view.<br /><span>Multiple relationships.</span></h2>
          <p>Connect eligible accounts from supported broker partners and keep every relationship organised in one place.</p>
        </div>
        <div className="broker-cards">
          {brokers.map((broker) => (
            <div className="broker-card" key={broker.name}>
              <div className="broker-asset">
                <img
                  src={broker.Image}
                  alt={`${broker.name} logo`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('is-hidden');
                  }}
                />
                <span className={`broker-wordmark is-hidden`} style={{ fontWeight: broker.weight }} aria-hidden="true">
                  {broker.wordmark}
                </span>
              </div>
              <div className="broker-copy">
                <span className="broker-name">{broker.name}</span>
                <p>{broker.note}</p>
              </div>
              <Link to="/brokers" className="broker-link">View broker <ArrowUpRight aria-hidden="true" /></Link>
            </div>
          ))}
        </div>
        <div className="broker-footnote">
          Broker names and marks belong to their respective owners. TradeStack is not affiliated with or endorsed by the brokers listed here unless stated otherwise.
        </div>
        <div className="broker-cta">
          <Link to="/brokers" className="button button-outline">View all brokers</Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section how-section" id="how-it-works">
      <div className="container">
        <SectionIntro eyebrow="How it works" title="Simple by design." align="center">
          A straightforward way to keep your broker rebate activity visible, without moving your trading funds.
        </SectionIntro>
        <div className="steps-grid">
          {steps.map(([number, title, description]) => (
            <div className="step" key={number}>
              <span className="step-number">{number}</span>
              <div className="step-rule" />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <div className="funds-callout">
          <Shield aria-hidden="true" />
          <div>
            <strong>Your trading relationship stays with your broker.</strong>
            <span>TradeStack tracks eligible rebate activity; it does not hold customer trading capital.</span>
          </div>
          <Link to="/how-it-works" className="learn-link">See how it works <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section benefits-section" id="rebates">
      <div className="container benefits-grid">
        <SectionIntro eyebrow="A clearer way to track" title="Rebates, without the guesswork.">
          Monitor eligible broker activity, understand rebate details, and review status over time.
        </SectionIntro>
        <div className="benefit-list">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div className="benefit" key={title}>
              <span className="benefit-icon"><Icon aria-hidden="true" /></span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <Check aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="rebate-links">
          <Link to="/rebates" className="button button-outline">Learn about rebates</Link>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="principles-section">
      <div className="container">
        <div className="principles-head">
          <SectionIntro eyebrow="Why TradeStack" title="Clarity is a feature.">
            A product foundation built around transparent tracking and broker-specific context.
          </SectionIntro>
          <span className="principles-stamp">TRD<br /><b>01</b></span>
        </div>
        <div className="principles-grid">
          <div>
            <span className="principle-index">01</span>
            <h3>Transparent by default</h3>
            <p>See the status of eligible activity and understand what is pending, processed, or paid.</p>
          </div>
          <div>
            <span className="principle-index">02</span>
            <h3>Broker-specific context</h3>
            <p>Broker, account type, trading activity, and partner terms all matter. We keep that context visible.</p>
          </div>
          <div>
            <span className="principle-index">03</span>
            <h3>Built around your accounts</h3>
            <p>Keep multiple eligible broker relationships organised without blending their individual terms.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <SectionIntro eyebrow="Questions, answered" title="The important details.">
          Still exploring? Here are the basics about TradeStack and eligible forex rebates.
        </SectionIntro>
        <div className="faq-list">
          {faqs.slice(0, 4).map(([question, answer], index) => (
            <div className={`faq-item ${active === index ? 'active' : ''}`} key={question}>
              <button onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}>
                <span>{question}</span>
                <ChevronDown aria-hidden="true" />
              </button>
              {active === index && <p>{answer}</p>}
            </div>
          ))}
          <Link to="/faq" className="faq-link">View all FAQs <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta" id="get-started">
      <div className="cta-orbit orbit-one" />
      <div className="cta-orbit orbit-two" />
      <div className="container final-cta-inner">
        <span className="eyebrow">The next step is simple</span>
        <h2>Make every eligible trade count.</h2>
        <p>TradeStack helps traders track forex rebates connected to qualifying activity and keeps that status clear over time.</p>
        <Link to="/get-started" className="button button-primary">Get Started<ArrowUpRight aria-hidden="true" /></Link>
        <small>Eligibility and rebate terms vary by broker and account.</small>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <BrokerSection />
      <HowItWorks />
      <Benefits />
      <Principles />
      <FAQ />
      <FinalCta />
    </main>
  );
}