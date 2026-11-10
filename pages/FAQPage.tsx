import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from '../components/Icons';

const faqCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    questions: [
      {
        question: 'What is TradeStack?',
        answer: 'TradeStack is a platform designed to help eligible forex traders connect supported broker accounts and track rebate activity in one place.',
      },
      {
        question: 'How do I get started?',
        answer: 'Create a TradeStack account, select a supported broker, and provide the account information required for verification.',
      },
      {
        question: 'Do I need a TradeStack account to track rebates?',
        answer: 'Yes. Your TradeStack account provides the place where connected accounts and rebate activity can be monitored.',
      },
    ],
  },
  {
    id: 'supported-brokers',
    title: 'Supported Brokers',
    questions: [
      {
        question: 'Which brokers does TradeStack support?',
        answer: 'TradeStack supports selected brokers. Visit the Supported Brokers page for the current list.',
      },
      {
        question: 'Can I connect more than one broker account?',
        answer: 'Support for multiple accounts depends on the account and platform configuration available through TradeStack.',
      },
      {
        question: 'How is my broker account verified?',
        answer: 'Submitted account information is checked against available broker information to determine whether the account can be associated with TradeStack.',
      },
    ],
  },
  {
    id: 'rebates',
    title: 'Rebates',
    questions: [
      {
        question: 'How much can I earn in rebates?',
        answer: 'TradeStack can return 50%–80% of eligible broker-generated commission to traders, depending on the applicable broker and account arrangement. 80% is the maximum customer rebate offered by TradeStack.',
      },
      {
        question: 'Is the rebate percentage the same for every broker?',
        answer: 'No. The applicable rebate percentage can vary depending on the broker and account arrangement.',
      },
      {
        question: 'How are rebates calculated?',
        answer: 'Eligible broker-generated commission is multiplied by the applicable TradeStack rebate percentage.',
      },
      {
        question: 'Does every trade generate a rebate?',
        answer: 'Not necessarily. Only trading activity that meets the applicable eligibility requirements is included.',
      },
      {
        question: 'When will my rebate appear?',
        answer: 'Rebate timing depends on the availability and processing of broker trading data and the applicable rebate process.',
      },
      {
        question: 'Why is my rebate pending?',
        answer: 'A rebate may remain pending while trading activity is being reconciled or processed.',
      },
      {
        question: 'Can my rebate amount change?',
        answer: 'Yes. Rebate calculations can depend on verified trading activity and applicable broker terms.',
      },
    ],
  },
  {
    id: 'trading-accounts-funds',
    title: 'Trading Accounts & Funds',
    questions: [
      {
        question: 'Does TradeStack hold my trading funds?',
        answer: 'No. Your trading funds remain with your broker. TradeStack is designed to track eligible trading activity and rebate information.',
      },
      {
        question: 'Do I trade through TradeStack?',
        answer: 'Your actual trades remain with your broker. TradeStack is focused on tracking eligible activity and rebate information.',
      },
      {
        question: 'Does TradeStack guarantee profits?',
        answer: 'No. TradeStack does not guarantee trading profits, returns, or trading performance.',
      },
    ],
  },
  {
    id: 'account-dashboard',
    title: 'Account & Dashboard',
    questions: [
      {
        question: 'What can I see in my dashboard?',
        answer: 'You can monitor connected accounts, trading activity, rebate amounts, rebate status, and related transaction history.',
      },
      {
        question: 'Can I see my previous rebate activity?',
        answer: 'Yes. Rebate history can be presented through your TradeStack account once the relevant activity has been processed.',
      },
      {
        question: 'What happens if my account information changes?',
        answer: 'You should update your account information when required so that verification and rebate tracking remain accurate.',
      },
    ],
  },
  {
    id: 'safety-transparency',
    title: 'Safety & Transparency',
    questions: [
      {
        question: 'Does TradeStack control my broker account?',
        answer: 'No. TradeStack does not control your broker account or trading funds.',
      },
      {
        question: 'Are rebates guaranteed?',
        answer: 'No. Rebate availability and amounts depend on eligible activity and applicable broker terms.',
      },
      {
        question: 'Where can I see the current supported brokers?',
        answer: 'Visit the Supported Brokers page for the current list.',
      },
    ],
  },
];

function slugForQuestion(question: string) {
  return question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function FAQPage() {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(
    faqCategories[0].questions[0].question,
  );

  return (
    <main className="faq-page">
      <section className="faq-page-hero">
        <div className="container faq-page-hero-inner">
          <span className="eyebrow accent">FAQ</span>
          <h1>Questions About TradeStack?</h1>
          <p>
            Find answers about supported brokers, account setup, rebate tracking, trading activity,
            and how TradeStack works.
          </p>
          <div className="faq-page-hero-actions">
            <Link to="/get-started" className="button button-primary">
              Get Started <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link to="/how-it-works" className="button button-outline">How It Works</Link>
          </div>
        </div>
      </section>

      <nav className="faq-category-nav container" aria-label="FAQ categories">
        {faqCategories.map(({ id, title }) => (
          <a key={id} href={`#${id}`}>{title}</a>
        ))}
      </nav>

      <div className="faq-categories container">
        {faqCategories.map(({ id, title, questions }) => (
          <section className="faq-category" id={id} key={id} aria-labelledby={`${id}-heading`}>
            <div className="faq-category-heading">
              <span className="eyebrow">TradeStack guide</span>
              <h2 id={`${id}-heading`}>{title}</h2>
            </div>
            <div className="faq-category-list">
              {questions.map(({ question, answer }) => {
                const isActive = activeQuestion === question;
                const answerId = `faq-answer-${slugForQuestion(question)}`;

                return (
                  <div className={`faq-item ${isActive ? 'active' : ''}`} key={question}>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={answerId}
                      onClick={() => setActiveQuestion(isActive ? null : question)}
                    >
                      <span>{question}</span>
                      <ChevronDown aria-hidden="true" />
                    </button>
                    <div id={answerId} hidden={!isActive}>
                      <p>{answer}</p>
                      {question === 'How are rebates calculated?' && (
                        <div className="rebate-formula" aria-label="Conceptual trader rebate calculation">
                          <div className="rebate-formula-term">
                            <span>01</span><strong>Eligible Broker Commission</strong>
                          </div>
                          <span className="rebate-formula-operator" aria-label="multiplied by">×</span>
                          <div className="rebate-formula-term">
                            <span>02</span><strong>Applicable Rebate Percentage (50%–80%)</strong>
                          </div>
                          <span className="rebate-formula-operator" aria-label="equals">=</span>
                          <div className="rebate-formula-term result">
                            <span>03</span><strong>Trader Rebate</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="faq-help-section">
        <div className="container">
          <div className="faq-help-card">
            <div>
              <span className="eyebrow">More information</span>
              <h2>Still Have Questions?</h2>
              <p>Explore how TradeStack works or get started with a supported broker.</p>
            </div>
            <div className="faq-help-actions">
              <Link to="/how-it-works" className="button button-outline">How It Works</Link>
              <Link to="/get-started" className="button button-primary">
                Get Started <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-final-cta">
        <div className="container">
          <div className="faq-final-cta-card">
            <span className="eyebrow">Get started</span>
            <h2>Ready to Start Tracking Your Rebates?</h2>
            <p>Create your TradeStack account and begin the setup process.</p>
            <Link to="/get-started" className="button button-primary">
              Get Started <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
