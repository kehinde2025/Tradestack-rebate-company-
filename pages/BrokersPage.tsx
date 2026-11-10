import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Shield,
} from '../components/Icons';

const brokers = [
  {
    name: 'HFM',
    wordmark: 'hfm',
    weight: 900,
    image: '/brokers/images/HFM-LOGO.PNG',
    note: 'Regulated multi-asset broker with high-volume FX pairs.',
  },
  {
    name: 'XM',
    wordmark: 'XM',
    weight: 900,
    image: '/brokers/images/XM-LOGO.png',
    note: 'Established broker with tiered spreads across major pairs.',
  },
  {
    name: 'IC Markets',
    wordmark: 'IC Markets',
    weight: 900,
    image: '/brokers/images/ICMARKET-LOGO.png',
    note: 'Raw-spread ECN pricing built for active traders.',
  },
];

const connectionSteps = [
  {
    number: '01',
    title: 'Choose a Supported Broker',
    description: 'Select a broker supported by TradeStack.',
  },
  {
    number: '02',
    title: 'Submit Your Account Details',
    description: 'Provide the account information required for verification.',
  },
  {
    number: '03',
    title: 'Account Verification',
    description: 'TradeStack verifies the submitted account information against available broker data.',
  },
  {
    number: '04',
    title: 'Start Tracking',
    description: 'Once eligible activity is confirmed, rebate activity can be tracked through your TradeStack account.',
  },
];

const eligibility = [
  {
    title: 'Supported Broker',
    description: 'Your account must belong to a broker currently supported by TradeStack.',
  },
  {
    title: 'Account Details',
    description: 'Your submitted account information must match the information used for verification.',
  },
  {
    title: 'Eligible Activity',
    description: 'Only eligible trading activity is included when calculating rebates.',
  },
  {
    title: 'Account Status',
    description: 'Your account must meet the applicable requirements for rebate tracking.',
  },
];

const faqs = [
  {
    question: 'Which brokers does TradeStack support?',
    answer: 'The currently listed supported brokers are HFM, XM, and IC Markets. Supported brokers and account eligibility may change over time.',
  },
  {
    question: 'Can I connect more than one broker account?',
    answer: 'You may be able to manage multiple eligible accounts from supported brokers, subject to verification and applicable terms.',
  },
  {
    question: 'What information do I need to provide?',
    answer: 'You will need to provide the account information required to verify your broker account. The exact information may depend on the account and verification process.',
  },
  {
    question: 'How is my broker account verified?',
    answer: 'TradeStack verifies submitted account information against available broker data. Verification is not instant and must be completed before eligible activity can be tracked.',
  },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="broker-page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function BrokersPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <main className="brokers-page">
      <section className="brokers-hero">
        <div className="container brokers-hero-inner">
          <span className="eyebrow accent">SUPPORTED BROKERS</span>
          <h1>Trade With a Supported Broker. <em>Track Your Rebates.</em></h1>
          <p>
            TradeStack supports selected forex brokers so eligible traders can connect their trading
            accounts and track rebate activity from one place.
          </p>
          <div className="brokers-hero-actions">
            <Link to="/get-started" className="button button-primary">
              Get Started <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link to="/how-it-works" className="button button-outline">How It Works</Link>
          </div>
        </div>
      </section>

      <section className="broker-page-section">
        <div className="container">
          <div className="broker-page-section-head">
            <SectionHeading eyebrow="Current partners" title="Supported Brokers" />
            <p>Account eligibility and available rebate terms depend on the applicable broker and account.</p>
          </div>
          <div className="supported-broker-grid">
            {brokers.map((broker) => (
              <article className="supported-broker-card" key={broker.name}>
                <div className="supported-broker-card-head">
                  <div className="supported-broker-asset">
                    <img
                      src={broker.image}
                      alt={`${broker.name} logo`}
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                        event.currentTarget.nextElementSibling?.classList.remove('is-hidden');
                      }}
                    />
                    <span
                      className="broker-wordmark is-hidden"
                      style={{ fontWeight: broker.weight }}
                      aria-hidden="true"
                    >
                      {broker.wordmark}
                    </span>
                  </div>
                  <span className="broker-supported-status"><span /> Supported</span>
                </div>
                <div className="supported-broker-copy">
                  <h3>{broker.name}</h3>
                  <p>{broker.note}</p>
                </div>
                <div className="supported-broker-details">
                  <span className="eyebrow">Account eligibility</span>
                  <p>Eligible accounts are subject to verification and applicable terms.</p>
                </div>
                <Link to="/get-started" className="supported-broker-link">
                  Get Started <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <p className="supported-broker-disclaimer">
            Broker names and marks belong to their respective owners. TradeStack is not affiliated
            with or endorsed by the brokers listed here unless stated otherwise.
          </p>
        </div>
      </section>

      <section className="broker-page-section broker-connection-section">
        <div className="container">
          <SectionHeading eyebrow="Getting connected" title="How Your Broker Account Connects" />
          <div className="broker-connection-grid">
            {connectionSteps.map(({ number, title, description }) => (
              <article className="broker-connection-card" key={number}>
                <span>{number}</span>
                <div className="how-step-rule" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="broker-page-section">
        <div className="container">
          <SectionHeading eyebrow="Account requirements" title="Before You Connect" />
          <div className="broker-eligibility-grid">
            {eligibility.map(({ title, description }) => (
              <article className="broker-eligibility-card" key={title}>
                <span className="broker-eligibility-mark" aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="broker-funds-section">
        <div className="container">
          <div className="broker-funds-card">
            <span className="broker-funds-icon"><Shield aria-hidden="true" /></span>
            <div>
              <span className="eyebrow">Important information</span>
              <h2>TradeStack Does Not Hold Your Trading Funds</h2>
              <p>
                Your trading capital remains with your broker. TradeStack is designed to track
                eligible trading activity and rebate information; it does not take custody of your
                trading funds.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="broker-page-section broker-faq-section">
        <div className="container broker-faq-layout">
          <div>
            <SectionHeading eyebrow="More about connecting" title="Broker Questions" />
            <p className="broker-faq-intro">
              Find out what to expect when you connect an eligible broker account.
            </p>
          </div>
          <div className="broker-faq-list">
            {faqs.map(({ question, answer }, index) => {
              const isActive = activeFaq === index;
              const answerId = `broker-faq-answer-${index}`;

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

      <section className="broker-final-cta">
        <div className="container">
          <div className="broker-final-cta-card">
            <span className="eyebrow">Get connected</span>
            <h2>Ready to Connect Your Broker?</h2>
            <p>Create your TradeStack account and start the setup process.</p>
            <Link to="/get-started" className="button button-primary">
              Get Started <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
