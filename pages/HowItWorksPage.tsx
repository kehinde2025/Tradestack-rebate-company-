import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart,
  Check,
  ChevronDown,
  LinkIcon,
  Receipt,
  Shield,
  Wallet,
} from '../components/Icons';

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Create your TradeStack account and provide the details needed to connect your eligible trading account.',
  },
  {
    number: '02',
    title: 'Connect Your Broker Account',
    description: 'Select a supported broker and submit your trading account details for verification.',
  },
  {
    number: '03',
    title: 'Trade Normally',
    description: 'Continue trading with your broker as usual. Your trading funds remain with the broker.',
  },
  {
    number: '04',
    title: 'Track Your Rebates',
    description: 'TradeStack processes eligible trading activity and lets you monitor rebate status and earnings from your dashboard.',
  },
];

const rebateStages = [
  'Broker',
  'Trading Activity',
  'TradeStack Reconciliation',
  'Eligible Lots',
  'Rebate Calculation',
  'Rebate Status',
];

const features = [
  {
    title: 'Trading Volume',
    description: 'Track the trading volume associated with your connected accounts.',
    icon: BarChart,
  },
  {
    title: 'Rebate Earnings',
    description: 'See calculated rebate amounts and historical earnings.',
    icon: Wallet,
  },
  {
    title: 'Pending Rebates',
    description: 'Monitor rebates that are still being processed.',
    icon: Receipt,
  },
  {
    title: 'Paid Rebates',
    description: 'Review rebates that have been completed.',
    icon: Check,
  },
  {
    title: 'Connected Accounts',
    description: 'Keep track of your supported broker accounts.',
    icon: LinkIcon,
  },
  {
    title: 'Transaction History',
    description: 'Review your rebate-related activity in one place.',
    icon: Receipt,
  },
];

const faqs = [
  {
    question: 'How are rebates calculated?',
    answer: 'Rebates are calculated from eligible trading activity using the applicable broker and partner terms. Rates and eligibility can vary by broker, account type, and region.',
  },
  {
    question: 'Do I need to change how I trade?',
    answer: 'No. You continue trading with your broker as usual. Your trading decisions and funds remain with your broker.',
  },
  {
    question: 'When do rebates appear?',
    answer: 'Eligible activity appears after the relevant broker data is available and reconciled. Processing times and rebate status can vary.',
  },
  {
    question: 'Does TradeStack hold my trading funds?',
    answer: 'No. Your trading funds stay in your broker account. TradeStack tracks eligible activity and rebate information.',
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
    <div className="how-section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function HowItWorksPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="how-page">
      <section className="how-hero">
        <div className="container how-hero-inner">
          <span className="eyebrow accent">HOW TRADESTACK WORKS</span>
          <h1>Trade Forex. Earn Your Rebates. <em>Track Everything.</em></h1>
          <p>
            TradeStack helps eligible forex traders connect supported broker accounts, track trading
            activity, and monitor rebate earnings in one place.
          </p>
          <div className="how-hero-actions">
            <Link to="/get-started" className="button button-primary">
              Get Started <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link to="/brokers" className="button button-outline">
              View Supported Brokers
            </Link>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <SectionHeading eyebrow="A simple process" title="How TradeStack Works" />
          <div className="how-steps">
            {steps.map(({ number, title, description }) => (
              <article className="how-step-card" key={number}>
                <span className="how-step-number">{number}</span>
                <div className="how-step-rule" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section how-rebate-section">
        <div className="container">
          <SectionHeading
            eyebrow="The rebate process"
            title="From Trading Activity to Rebate"
            description="TradeStack uses broker trading data to identify eligible activity and calculate rebates according to the applicable terms."
          />
          <div className="rebate-flow" aria-label="Rebate process">
            {rebateStages.map((stage, index) => (
              <div className="rebate-flow-item" key={stage}>
                <div className="rebate-flow-card">
                  <span>0{index + 1}</span>
                  <strong>{stage}</strong>
                </div>
                {index < rebateStages.length - 1 && (
                  <span className="rebate-flow-arrow" aria-hidden="true">
                    <ArrowRight />
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="rebate-flow-note">
            Eligibility, calculation, and processing depend on broker data and applicable terms. Rebates are not instant or guaranteed.
          </p>
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <SectionHeading eyebrow="Your dashboard" title="Everything You Need in One Place" />
          <div className="how-features">
            {features.map(({ title, description, icon: Icon }) => (
              <article className="how-feature-card" key={title}>
                <span className="how-feature-icon"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section how-trust-section">
        <div className="container">
          <div className="how-trust-card">
            <span className="how-trust-icon"><Shield aria-hidden="true" /></span>
            <div>
              <span className="eyebrow">Your funds, your broker</span>
              <h2>Your Trading Funds Stay With Your Broker</h2>
              <p>
                TradeStack does not hold your trading capital. Your trading funds remain in your
                broker account. TradeStack is designed to track eligible activity and rebate
                information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section how-brokers-section">
        <div className="container">
          <div className="how-brokers-card">
            <div>
              <span className="eyebrow">Supported broker accounts</span>
              <h2>Trade With Supported Brokers</h2>
              <p>Connect an eligible account with one of TradeStack&apos;s supported brokers.</p>
            </div>
            <Link to="/brokers" className="button button-outline">
              View Supported Brokers <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="how-section how-faq-section">
        <div className="container how-faq-layout">
          <SectionHeading
            eyebrow="Good to know"
            title="Frequently Asked Questions"
            description="A few details about eligible activity, rebates, and your broker account."
          />
          <div className="how-faq-list">
            {faqs.map(({ question, answer }, index) => {
              const isActive = activeFaq === index;
              const answerId = `how-faq-answer-${index}`;

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

      <section className="how-final-cta">
        <div className="container">
          <div className="how-final-cta-card">
            <span className="eyebrow">Your next step</span>
            <h2>Ready to Start Tracking Your Rebates?</h2>
            <p>Create your TradeStack account and get started.</p>
            <Link to="/get-started" className="button button-primary">
              Get Started <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
