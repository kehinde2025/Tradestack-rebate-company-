import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart,
  Check,
  ChevronDown,
  Receipt,
  Shield,
  Wallet,
} from '../components/Icons';

const rebateSteps = [
  {
    number: '01',
    title: 'Trade',
    description: 'Trade normally through an eligible account with a supported broker.',
  },
  {
    number: '02',
    title: 'Activity Recorded',
    description: 'Eligible trading activity is recorded through available broker reporting.',
  },
  {
    number: '03',
    title: 'Activity Reconciled',
    description: 'TradeStack processes and reconciles the available trading data.',
  },
  {
    number: '04',
    title: 'Rebate Calculated',
    description: 'Eligible broker-generated commission and the applicable TradeStack rebate percentage determine the rebate amount.',
  },
  {
    number: '05',
    title: 'Rebate Status Updated',
    description: 'Your dashboard shows the current status of your rebate activity.',
  },
];

const metrics = [
  { label: 'Total Rebates', value: '$1,284.00', note: 'Illustrative total', accent: true },
  { label: 'Pending', value: '$396.00', note: 'Illustrative amount' },
  { label: 'Paid', value: '$888.00', note: 'Illustrative amount' },
  { label: 'Trading Volume', value: '184.6K', note: 'Illustrative volume' },
];

const activity = [
  { broker: 'HFM', amount: '+$182', status: 'Pending' },
  { broker: 'XM', amount: '+$214', status: 'Paid' },
  { broker: 'IC Markets', amount: '+$98', status: 'Pending' },
];

const trackableItems = [
  {
    title: 'Trading Volume',
    description: 'Monitor eligible trading volume associated with your connected accounts.',
    icon: BarChart,
  },
  {
    title: 'Pending Rebates',
    description: 'See rebate amounts that are still being processed.',
    icon: Receipt,
  },
  {
    title: 'Paid Rebates',
    description: 'Review rebates that have completed processing.',
    icon: Check,
  },
  {
    title: 'Rebate History',
    description: 'Review historical rebate activity over time.',
    icon: BarChart,
  },
  {
    title: 'Connected Accounts',
    description: 'Keep track of your broker accounts connected to TradeStack.',
    icon: Wallet,
  },
  {
    title: 'Transactions',
    description: 'Review rebate-related account activity.',
    icon: Receipt,
  },
];

const rebateStatuses = [
  {
    title: 'Pending',
    description: 'Activity has been recorded but the rebate has not completed processing.',
    className: 'pending',
  },
  {
    title: 'Processing',
    description: 'Rebate information is currently being reconciled or processed.',
    className: 'processing',
  },
  {
    title: 'Paid',
    description: 'The rebate has completed processing.',
    className: 'paid',
  },
];

const faqs = [
  {
    question: 'How are rebates calculated?',
    answer: 'TradeStack can return 50%–80% of eligible broker-generated commission to traders. The exact percentage depends on the applicable broker and account arrangement.',
  },
  {
    question: 'When does a rebate become available?',
    answer: 'Activity is reflected after relevant broker data is available and reconciled. Timing can vary based on reporting and processing.',
  },
  {
    question: 'Why is my rebate pending?',
    answer: 'Pending means activity has been recorded but the rebate has not completed processing. It may still be subject to reconciliation and applicable broker terms.',
  },
  {
    question: 'Can rebate amounts change?',
    answer: 'Displayed amounts may change as activity is reconciled or when applicable account, trading, or broker terms are applied.',
  },
  {
    question: 'Where can I see my rebate history?',
    answer: 'Your rebate-related activity and historical records can be reviewed in your TradeStack dashboard.',
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="rebates-section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function RebateDashboard() {
  return (
    <div className="rebate-dashboard" aria-label="Illustrative TradeStack rebate dashboard">
      <div className="rebate-dashboard-top">
        <div>
          <span className="eyebrow">Account overview</span>
          <h3>Rebate activity</h3>
        </div>
        <span className="rebate-example-label">Illustrative values</span>
      </div>
      <div className="rebate-dashboard-metrics">
        {metrics.map(({ label, value, note, accent }) => (
          <div className={`rebate-dashboard-metric ${accent ? 'accent' : ''}`} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{note}</small>
          </div>
        ))}
      </div>
      <div className="rebate-dashboard-activity">
        <div className="rebate-dashboard-activity-heading">
          <strong>Recent activity</strong>
          <span>Example entries</span>
        </div>
        {activity.map(({ broker, amount, status }) => (
          <div className="rebate-dashboard-activity-row" key={broker}>
            <span>{broker}</span>
            <strong>{amount}</strong>
            <span className={`rebate-example-status ${status.toLowerCase()}`}>{status}</span>
          </div>
        ))}
      </div>
      <p className="rebate-dashboard-disclaimer">
        Interface illustration only. These example values do not represent actual or guaranteed user earnings.
      </p>
    </div>
  );
}

export default function RebatesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="rebates-page">
      <section className="rebates-hero">
        <div className="container rebates-hero-inner">
          <span className="eyebrow accent">FOREX REBATES</span>
          <h1>Turn Eligible Trading Activity Into <em>Rebates You Can Track.</em></h1>
          <p>
            TradeStack helps eligible traders monitor trading activity, calculated rebates,
            pending rebates, and completed rebate history from one place.
          </p>
          <div className="rebates-hero-actions">
            <Link to="/get-started" className="button button-primary">
              Get Started <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link to="/how-it-works" className="button button-outline">How It Works</Link>
          </div>
        </div>
      </section>

      <section className="rebates-section">
        <div className="container">
          <SectionHeading eyebrow="The process" title="How Rebates Work" />
          <div className="rebate-steps">
            {rebateSteps.map(({ number, title, description }) => (
              <article className="rebate-step-card" key={number}>
                <span>{number}</span>
                <div className="how-step-rule" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rebates-section rebate-preview-section">
        <div className="container rebate-preview-layout">
          <div>
            <SectionHeading
              eyebrow="Your dashboard"
              title="See Your Rebate Activity Clearly"
              description="Review eligible activity and the rebate status reported for your connected accounts."
            />
            <div className="rebate-preview-points">
              <span><Check aria-hidden="true" />Activity and volume</span>
              <span><Check aria-hidden="true" />Pending and paid status</span>
              <span><Check aria-hidden="true" />Historical account records</span>
            </div>
          </div>
          <RebateDashboard />
        </div>
      </section>

      <section className="rebates-section">
        <div className="container">
          <SectionHeading eyebrow="Your account view" title="Track What Matters" />
          <div className="rebate-track-grid">
            {trackableItems.map(({ title, description, icon: Icon }) => (
              <article className="rebate-track-card" key={title}>
                <span className="rebate-track-icon"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rebates-section rebate-calculation-section">
        <div className="container">
          <div className="rebate-calculation-layout">
            <SectionHeading
              eyebrow="Applicable terms vary"
              title="Earn Up to 80% Back"
              description="TradeStack can return 50%–80% of eligible broker-generated commission to traders, depending on the applicable broker and account arrangement."
            />
            <div className="rebate-formula" aria-label="Conceptual rebate calculation">
              <div className="rebate-formula-term">
                <span>01</span><strong>Eligible Broker Commission</strong>
              </div>
              <span className="rebate-formula-operator" aria-label="multiplied by">×</span>
              <div className="rebate-formula-term">
                <span>02</span><strong>TradeStack Rebate Percentage (50%–80%)</strong>
              </div>
              <span className="rebate-formula-operator" aria-label="equals">=</span>
              <div className="rebate-formula-term result">
                <span>03</span><strong>Trader Rebate</strong>
              </div>
            </div>
          </div>
          <p className="rebate-calculation-note">
            Rebate availability depends on eligible activity and applicable broker terms. The percentage varies by arrangement, and no specific rebate amount is guaranteed.
          </p>
        </div>
      </section>

      <section className="rebates-section">
        <div className="container">
          <SectionHeading eyebrow="Status at a glance" title="Understand Your Rebate Status" />
          <div className="rebate-status-grid">
            {rebateStatuses.map(({ title, description, className }) => (
              <article className={`rebate-status-card ${className}`} key={title}>
                <span className="rebate-status-indicator" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rebate-funds-section">
        <div className="container">
          <div className="rebate-funds-card">
            <span className="rebate-funds-icon"><Shield aria-hidden="true" /></span>
            <div>
              <span className="eyebrow">Important information</span>
              <h2>Your Trading Funds Stay With Your Broker</h2>
              <p>
                TradeStack does not hold your trading capital. Your trading funds remain with your
                broker. TradeStack is designed to track eligible trading activity and rebate
                information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rebates-section rebate-faq-section">
        <div className="container rebate-faq-layout">
          <div>
            <SectionHeading eyebrow="Helpful details" title="Rebate Questions" />
            <p className="rebate-faq-intro">
              Learn how eligible activity, applicable terms, and processing affect your rebate records.
            </p>
          </div>
          <div className="rebate-faq-list">
            {faqs.map(({ question, answer }, index) => {
              const isActive = activeFaq === index;
              const answerId = `rebate-faq-answer-${index}`;

              return (
                <div className={`faq-item ${isActive ? 'active' : ''}`} key={question}>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={answerId}
                    onClick={() => setActiveFaq(isActive ? null : index)}
                  >
                    <span>{question}</span>
                    <ChevronDown aria-hidden="true" />
                  </button>
                  <p id={answerId} hidden={!isActive}>{answer}</p>
                </div>
              );
            })}
            <Link to="/faq" className="faq-link">
              View All FAQs <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="rebate-final-cta">
        <div className="container">
          <div className="rebate-final-cta-card">
            <span className="eyebrow">Get started</span>
            <h2>Start Tracking Your Rebates</h2>
            <p>Create your TradeStack account and connect an eligible supported broker account.</p>
            <div className="rebate-final-cta-actions">
              <Link to="/get-started" className="button button-primary">
                Get Started <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link to="/brokers" className="button button-outline">View Supported Brokers</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
