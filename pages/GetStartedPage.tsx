import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Eye, Shield } from '../components/Icons';
import { supportedBrokerConfigs, type BrokerConfig } from '../brokers/brokerConfig';

type OnboardingStep = 1 | 2 | 3 | 4 | 5;
type OnboardingPath = 'open-new' | 'link-existing' | null;
type NotSureAnswer = 'yes' | 'no' | null;
type BrokerView = 'select' | 'setup' | 'details';
type FieldName = 'fullName' | 'email' | 'password' | 'confirmPassword' | 'accountNumber' | 'accountName' | 'brokerEmail';
type OnboardingErrors = Record<string, string>;

type AccountDetails = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

type BrokerDetails = {
  accountType: string;
  tradingPlatform: string;
  brokerEmail: string;
  accountHolderName: string;
  accountNumber: string;
  authorizedContact: boolean;
};

const stepNames = ['Account', 'Verify', 'Path', 'Broker', 'Done'];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function maskAccountNumber(value: string) {
  return `••••••${value.slice(-4)}`;
}

function Field({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  helperText,
  autoComplete,
  passwordVisible,
  onTogglePassword,
}: {
  id: string;
  label: string;
  name: FieldName;
  value: string;
  onChange: (name: FieldName, value: string) => void;
  placeholder: string;
  type?: string;
  error?: string;
  helperText?: string;
  autoComplete?: string;
  passwordVisible?: boolean;
  onTogglePassword?: () => void;
}) {
  const errorId = `${id}-error`;
  const helperId = `${id}-help`;
  const describedBy = [helperText ? helperId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className="signup-field">
      <label htmlFor={id}>{label}</label>
      <div className={onTogglePassword ? 'signup-password-input' : undefined}>
        <input
          id={id}
          name={name}
          type={passwordVisible ? 'text' : type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(name, event.currentTarget.value)}
        />
        {onTogglePassword && (
          <button
            type="button"
            className="signup-password-toggle"
            aria-label={passwordVisible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            aria-pressed={passwordVisible}
            onClick={onTogglePassword}
          >
            <Eye aria-hidden="true" />
          </button>
        )}
      </div>
      {helperText && <span className="signup-field-help" id={helperId}>{helperText}</span>}
      {error && <span className="signup-field-error" id={errorId}>{error}</span>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="signup-field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.currentTarget.value)}
      >
        <option value="">Select an option</option>
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
      {error && <span className="signup-field-error" id={errorId}>{error}</span>}
    </div>
  );
}

function StepHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <header className="signup-page-heading">
      <span className="eyebrow accent">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{children}</p>
    </header>
  );
}

function CardHeading({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="signup-card-heading">
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function ChoiceCard({
  title,
  description,
  cta,
  onSelect,
  selected = false,
}: {
  title: string;
  description: string;
  cta: string;
  onSelect: () => void;
  selected?: boolean;
}) {
  return (
    <button
      className={`onboarding-choice-card ${selected ? 'selected' : ''}`}
      type="button"
      onClick={onSelect}
    >
      <strong>{title}</strong>
      <span>{description}</span>
      <span className="onboarding-choice-cta">{cta} <ArrowUpRight aria-hidden="true" /></span>
    </button>
  );
}

function validateAccount(account: AccountDetails): OnboardingErrors {
  const errors: OnboardingErrors = {};
  if (!account.fullName.trim()) errors.fullName = 'Enter your full name.';
  if (!account.email.trim()) errors.email = 'Enter your email address.';
  else if (!isValidEmail(account.email)) errors.email = 'Enter a valid email address.';
  if (!account.password) errors.password = 'Create a password.';
  else if (account.password.length < 8) errors.password = 'Use at least 8 characters.';
  if (!account.confirmPassword) errors.confirmPassword = 'Confirm your password.';
  else if (account.password !== account.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  if (!account.acceptedTerms) errors.acceptedTerms = 'Agree to the Terms of Service and Privacy Policy to continue.';
  return errors;
}

export default function GetStartedPage() {
  const [account, setAccount] = useState<AccountDetails>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  });
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [onboardingPath, setOnboardingPath] = useState<OnboardingPath>(null);
  const [notSureAnswer, setNotSureAnswer] = useState<NotSureAnswer>(null);
  const [diagnosticSelection, setDiagnosticSelection] = useState('');
  const [showDecisionHelp, setShowDecisionHelp] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<BrokerConfig | null>(null);
  const [brokerView, setBrokerView] = useState<BrokerView>('select');
  const [brokerDetails, setBrokerDetails] = useState<BrokerDetails>({
    accountType: '',
    tradingPlatform: '',
    brokerEmail: '',
    accountHolderName: '',
    accountNumber: '',
    authorizedContact: false,
  });
  const [partnerLinkOpened, setPartnerLinkOpened] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending'>('pending');
  const [verificationNotice, setVerificationNotice] = useState('');
  const [errors, setErrors] = useState<OnboardingErrors>({});
  const [accountAttempted, setAccountAttempted] = useState(false);
  const [brokerAttempted, setBrokerAttempted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSetupDetails, setShowSetupDetails] = useState(false);

  function updateAccount(name: FieldName, value: string) {
    const nextAccount = { ...account, [name]: value };
    setAccount(nextAccount);
    if (accountAttempted) setErrors(validateAccount(nextAccount));
  }

  function updateBrokerDetail(name: keyof BrokerDetails, value: string | boolean) {
    const nextDetails = { ...brokerDetails, [name]: value };
    setBrokerDetails(nextDetails);
    if (brokerAttempted) setErrors(validateBrokerDetails(nextDetails));
  }

  function validateBrokerDetails(details: BrokerDetails): OnboardingErrors {
    const nextErrors: OnboardingErrors = {};
    if (!details.accountType) nextErrors.accountType = 'Choose an account type or select “I don’t know”.';
    if (!details.tradingPlatform) nextErrors.tradingPlatform = 'Choose a platform or select “I don’t know”.';
    if (!details.accountHolderName.trim()) nextErrors.accountHolderName = 'Enter the account holder name.';
    if (!details.accountNumber.trim()) nextErrors.accountNumber = 'Enter your broker account number.';
    if (onboardingPath === 'link-existing' && !details.brokerEmail.trim()) nextErrors.brokerEmail = 'Enter the email used with your broker.';
    else if (details.brokerEmail && !isValidEmail(details.brokerEmail)) nextErrors.brokerEmail = 'Enter a valid email address.';
    if (onboardingPath === 'open-new' && !partnerLinkOpened) {
      nextErrors.partnerLinkOpened = 'Confirm that you have opened an account or continue when you are ready.';
    }
    return nextErrors;
  }

  function handleAccountSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAccountAttempted(true);
    const nextErrors = validateAccount(account);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setAccount((previous) => ({ ...previous, password: '', confirmPassword: '' }));
      setVerificationStatus('pending');
      setCurrentStep(2);
    }
  }

  function handleVerifyContinue() {
    setVerificationStatus('pending');
    setCurrentStep(3);
    setErrors({});
  }

  function choosePath(path: Exclude<OnboardingPath, null>) {
    setOnboardingPath(path);
    setNotSureAnswer(null);
    setShowDecisionHelp(false);
    setShowDiagnostic(false);
    setSelectedBroker(null);
    setBrokerView('select');
    setErrors({});
    setCurrentStep(4);
  }

  function selectBroker(broker: BrokerConfig) {
    setSelectedBroker(broker);
    setBrokerView('setup');
    setPartnerLinkOpened(false);
    setBrokerDetails({
      accountType: '',
      tradingPlatform: '',
      brokerEmail: '',
      accountHolderName: account.fullName,
      accountNumber: '',
      authorizedContact: false,
    });
    setBrokerAttempted(false);
    setErrors({});
  }

  function submitBrokerDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBrokerAttempted(true);
    const nextErrors = validateBrokerDetails(brokerDetails);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setVerificationStatus('pending');
      setCurrentStep(5);
    }
  }

  function goBackToPath() {
    setCurrentStep(3);
    setSelectedBroker(null);
    setBrokerView('select');
    setErrors({});
  }

  function stepIndicatorComplete(step: OnboardingStep) {
    if (step >= currentStep) return false;
    if (step === 2) return false;
    return true;
  }

  const brokerSelectOptions = supportedBrokerConfigs.filter((broker) => (
    onboardingPath !== 'link-existing' || broker.existingAccountLinkingSupported
  ));

  return (
    <main className="signup-page">
      <section className="signup-section">
        <div className="container signup-container signup-wizard-container">
          <ol className="onboarding-progress" aria-label="Onboarding progress">
            {stepNames.map((name, index) => {
              const step = (index + 1) as OnboardingStep;
              const isCurrent = step === currentStep;
              const isComplete = stepIndicatorComplete(step);
              return (
                <li
                  className={`onboarding-progress-step ${isComplete ? 'complete' : ''} ${isCurrent ? 'current' : ''}`}
                  key={name}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span className="onboarding-progress-marker">{isComplete ? <Check aria-hidden="true" /> : step}</span>
                  <span>{name}</span>
                </li>
              );
            })}
          </ol>

          {currentStep === 1 && (
            <>
              <StepHeading eyebrow="STEP 1 · ACCOUNT" title="Create your TradeStack account">
                Create your account to start setting up your broker connection and rebate eligibility.
              </StepHeading>
              <section className="signup-card signup-wizard-card" aria-labelledby="signup-form-heading">
                <CardHeading title="Account details">
                  Your details remain in this browser session; account creation is not connected yet.
                </CardHeading>
                <form className="signup-form" noValidate onSubmit={handleAccountSubmit}>
                  <Field id="signup-full-name" label="Full Name" name="fullName" placeholder="Enter your full name" value={account.fullName} error={errors.fullName} autoComplete="name" onChange={updateAccount} />
                  <Field id="signup-email" label="Email" name="email" type="email" placeholder="Enter your email address" value={account.email} error={errors.email} autoComplete="email" onChange={updateAccount} />
                  <Field id="signup-password" label="Password" name="password" type="password" placeholder="Create a password" value={account.password} error={errors.password} helperText="Use at least 8 characters." autoComplete="new-password" passwordVisible={showPassword} onTogglePassword={() => setShowPassword((visible) => !visible)} onChange={updateAccount} />
                  <Field id="signup-confirm-password" label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm your password" value={account.confirmPassword} error={errors.confirmPassword} autoComplete="new-password" passwordVisible={showConfirmPassword} onTogglePassword={() => setShowConfirmPassword((visible) => !visible)} onChange={updateAccount} />
                  <div className="signup-terms-field">
                    <label htmlFor="signup-terms">
                      <input
                        id="signup-terms"
                        type="checkbox"
                        checked={account.acceptedTerms}
                        aria-invalid={Boolean(errors.acceptedTerms)}
                        aria-describedby={errors.acceptedTerms ? 'signup-terms-error' : undefined}
                        onChange={(event) => {
                          const acceptedTerms = event.currentTarget.checked;
                          const nextAccount = { ...account, acceptedTerms };
                          setAccount(nextAccount);
                          if (accountAttempted) setErrors(validateAccount(nextAccount));
                        }}
                      />
                      <span>I agree to the TradeStack <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.</span>
                    </label>
                    {errors.acceptedTerms && <span className="signup-field-error" id="signup-terms-error">{errors.acceptedTerms}</span>}
                  </div>
                  <button className="button button-primary signup-submit" type="submit">Continue <ArrowUpRight aria-hidden="true" /></button>
                </form>
                <p className="signup-login-prompt">Already have an account? <Link to="/login">Sign In</Link></p>
              </section>
            </>
          )}

          {currentStep === 2 && (
            <>
              <StepHeading eyebrow="STEP 2 · VERIFY" title="Verify your email">
                TradeStack will use email verification to confirm your account.
              </StepHeading>
              <section className="signup-card signup-wizard-card" aria-labelledby="verify-heading">
                <div className="onboarding-email-summary">
                  <span>Email</span><strong>{account.email}</strong>
                </div>
                <div className="onboarding-verification-status" role="status">
                  <span className="onboarding-status-dot" />
                  <span><strong>Email status: Pending</strong><small>No verification has been completed in this frontend-only flow.</small></span>
                </div>
                <p className="onboarding-neutral-notice">
                  Email delivery and verification are not connected yet. No email has been sent and continuing here will not verify your address.
                </p>
                {verificationNotice && <p className="onboarding-neutral-notice" role="status">{verificationNotice}</p>}
                <div className="onboarding-actions">
                  <button type="button" className="button button-outline" onClick={() => { setCurrentStep(1); setErrors({}); }}>Back</button>
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={() => setVerificationNotice('Resending will be available when email delivery is connected. No email has been sent.')}
                  >
                    Resend Verification Email
                  </button>
                  <button type="button" className="button button-primary" onClick={handleVerifyContinue}>Continue (status stays pending) <ArrowUpRight aria-hidden="true" /></button>
                </div>
              </section>
            </>
          )}

          {currentStep === 3 && (
            <>
              {!showDecisionHelp && (
                <>
                  <StepHeading eyebrow="STEP 3 · PATH" title="How do you want to connect your broker?">
                    Choose one of the two account connection paths, or get help deciding.
                  </StepHeading>
                  <div className="onboarding-choice-grid onboarding-path-grid">
                    <ChoiceCard
                      title="I need a broker account"
                      description="Open a new account through a TradeStack-supported broker and set it up for eligible rebates."
                      cta="Open New"
                      selected={onboardingPath === 'open-new'}
                      onSelect={() => choosePath('open-new')}
                    />
                    <ChoiceCard
                      title="I already have a broker account"
                      description="Connect an existing broker account and follow the broker's required attribution process."
                      cta="Link Existing"
                      selected={onboardingPath === 'link-existing'}
                      onSelect={() => choosePath('link-existing')}
                    />
                    <ChoiceCard
                      title="I'm not sure"
                      description="Answer a few quick questions and we'll point you to the right option."
                      cta="Help Me Decide"
                      onSelect={() => {
                        setShowDecisionHelp(true);
                        setShowDiagnostic(false);
                        setNotSureAnswer(null);
                        setErrors({});
                      }}
                    />
                  </div>
                  <div className="onboarding-actions onboarding-nav-actions">
                    <button type="button" className="button button-outline" onClick={() => setCurrentStep(2)}>Back</button>
                  </div>
                </>
              )}

              {showDecisionHelp && !showDiagnostic && (
                <section className="signup-card signup-wizard-card" aria-labelledby="decision-heading">
                  <span className="eyebrow accent">STEP 3 · DECISION HELP</span>
                  <div className="signup-card-heading signup-wizard-heading">
                    <h1 id="decision-heading">Do you already have a forex trading account?</h1>
                    <p>Let&apos;s point you in the right direction.</p>
                  </div>
                  <div className="onboarding-choice-grid">
                    <ChoiceCard
                      title="I'm already trading"
                      description="You already have a live account with a broker."
                      cta="Yes"
                      selected={notSureAnswer === 'yes'}
                      onSelect={() => { setNotSureAnswer('yes'); setShowDiagnostic(true); setErrors({}); }}
                    />
                    <ChoiceCard
                      title="I'm new to forex"
                      description="You haven't opened a forex trading account yet."
                      cta="No"
                      selected={notSureAnswer === 'no'}
                      onSelect={() => { setNotSureAnswer('no'); setShowDiagnostic(true); setErrors({}); }}
                    />
                  </div>
                  <div className="onboarding-actions onboarding-nav-actions">
                    <button type="button" className="button button-outline" onClick={() => { setShowDecisionHelp(false); setNotSureAnswer(null); }}>Back</button>
                  </div>
                </section>
              )}

              {showDecisionHelp && showDiagnostic && (
                <section className="signup-card signup-wizard-card" aria-labelledby="diagnostic-heading">
                  <span className="eyebrow accent">STEP 3 · DECISION HELP</span>
                  <div className="signup-card-heading signup-wizard-heading">
                    <h1 id="diagnostic-heading">{notSureAnswer === 'yes' ? 'You already trade' : "New to forex — we'll walk you through it"}</h1>
                    <p>{notSureAnswer === 'yes' ? "What's holding you back?" : "What's on your mind?"}</p>
                  </div>
                  <div className="onboarding-diagnostic-list">
                    {notSureAnswer === 'yes' ? (
                      <>
                        <ChoiceCard title="Will this affect my trading conditions?" description="Learn how connecting your broker account to TradeStack relates to your trading conditions." cta="Trading Conditions" selected={diagnosticSelection === 'conditions'} onSelect={() => setDiagnosticSelection('conditions')} />
                        <ChoiceCard title="How does TradeStack work?" description="Understand how broker rebates work and what joining TradeStack involves." cta="How TradeStack Works" selected={diagnosticSelection === 'how-it-works'} onSelect={() => setDiagnosticSelection('how-it-works')} />
                        <ChoiceCard title="How much could I receive?" description="See an illustrative rebate estimate based on eligible trading activity. Any rebate depends on eligible activity and applicable terms." cta="Rebate Estimate" selected={diagnosticSelection === 'estimate'} onSelect={() => setDiagnosticSelection('estimate')} />
                      </>
                    ) : (
                      <>
                        <ChoiceCard title="How does TradeStack work?" description="Learn how broker rebates work and what joining TradeStack involves." cta="How TradeStack Works" selected={diagnosticSelection === 'how-it-works'} onSelect={() => setDiagnosticSelection('how-it-works')} />
                        <ChoiceCard title="How does TradeStack actually work?" description="Understand how TradeStack connects traders, brokers, and eligible rebates." cta="Is TradeStack Legitimate?" selected={diagnosticSelection === 'legitimacy'} onSelect={() => setDiagnosticSelection('legitimacy')} />
                        <ChoiceCard title="How much could I receive?" description="See an illustrative rebate estimate based on eligible trading activity. Any rebate depends on eligible activity and applicable terms." cta="Rebate Estimate" selected={diagnosticSelection === 'estimate'} onSelect={() => setDiagnosticSelection('estimate')} />
                      </>
                    )}
                  </div>
                  <div className="onboarding-actions onboarding-nav-actions">
                    <button type="button" className="button button-outline" onClick={() => { setShowDiagnostic(false); setDiagnosticSelection(''); }}>Back</button>
                    <button
                      type="button"
                      className="button button-primary"
                      onClick={() => choosePath(notSureAnswer === 'yes' ? 'link-existing' : 'open-new')}
                    >
                      {notSureAnswer === 'yes' ? 'Link My Existing Account' : 'Open a New Broker Account'} <ArrowUpRight aria-hidden="true" />
                    </button>
                  </div>
                </section>
              )}
            </>
          )}

          {currentStep === 4 && selectedBroker === null && (
            <>
              <StepHeading eyebrow="STEP 4 · BROKER" title="Choose your broker">
                {onboardingPath === 'open-new'
                  ? 'Select a supported broker to open a new account through TradeStack.'
                  : 'Select the broker where you already trade.'}
              </StepHeading>
              {brokerSelectOptions.length > 0 ? (
                <div className="onboarding-broker-grid">
                  {brokerSelectOptions.map((broker) => (
                    <article className="onboarding-broker-card" key={broker.name}>
                      <span className="onboarding-broker-mark" aria-hidden="true">{broker.name.slice(0, 1)}</span>
                      <h2>{broker.name}</h2>
                      <p>{broker.description}</p>
                      <button type="button" className="button button-primary" onClick={() => selectBroker(broker)}>
                        {onboardingPath === 'open-new' ? 'Choose Broker' : 'Link Existing Account'} <ArrowUpRight aria-hidden="true" />
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="onboarding-neutral-notice" role="status">Existing account linking is not currently configured for a supported broker.</p>
              )}
              <div className="onboarding-actions onboarding-nav-actions">
                <button type="button" className="button button-outline" onClick={goBackToPath}>Back</button>
              </div>
            </>
          )}

          {currentStep === 4 && selectedBroker && brokerView === 'setup' && (
            <section className="signup-card signup-wizard-card" aria-labelledby="broker-setup-heading">
              <span className="eyebrow accent">STEP 4 · {onboardingPath === 'open-new' ? 'OPEN NEW' : 'LINK EXISTING'}</span>
              <div className="signup-card-heading signup-wizard-heading">
                <h1 id="broker-setup-heading">
                  {onboardingPath === 'open-new' ? `Set up your ${selectedBroker.name} account` : `Link your existing ${selectedBroker.name} account`}
                </h1>
                <p>
                  {onboardingPath === 'open-new'
                    ? 'Follow the steps to open a new broker account. Account association depends on the broker and its terms.'
                    : "We'll guide you through the steps required to connect your existing account to TradeStack."}
                </p>
              </div>

              {onboardingPath === 'open-new' ? (
                <div className="onboarding-setup-step">
                  <span className="onboarding-setup-number">1</span>
                  <div className="onboarding-setup-copy">
                    <h2>Open your broker account</h2>
                    <p>{selectedBroker.newAccountInstructions}</p>
                    {selectedBroker.partnerUrl ? (
                      <a className="button button-primary" href={selectedBroker.partnerUrl} target="_blank" rel="noreferrer">
                        Open {selectedBroker.name} Account <ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : (
                      <>
                        <button type="button" className="button button-primary" disabled>
                          Open {selectedBroker.name} Account <ArrowUpRight aria-hidden="true" />
                        </button>
                        <p className="onboarding-neutral-notice">
                          The partner account URL is not configured yet. TradeStack will provide it when broker settings are available; no external link has been created.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="onboarding-setup-step">
                  <span className="onboarding-setup-number">1</span>
                  <div className="onboarding-setup-copy">
                    <h2>Link your broker account</h2>
                    <p>Follow the broker-specific instructions below to request or confirm TradeStack as your referral/IB where supported.</p>
                    <p className="onboarding-neutral-notice">{selectedBroker.existingAccountInstructions}</p>
                    <p className="onboarding-neutral-notice">The broker controls its own attribution rules. TradeStack cannot promise that an existing account can be re-attributed or automatically connected.</p>
                  </div>
                </div>
              )}

              <div className="onboarding-actions">
                <button type="button" className="button button-outline" onClick={() => { setSelectedBroker(null); setBrokerView('select'); }}>Back to Brokers</button>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => { setPartnerLinkOpened(true); setBrokerView('details'); setErrors({}); }}
                >
                  {onboardingPath === 'open-new' ? "I've Opened My Account" : 'Continue to Account Details'} <ArrowUpRight aria-hidden="true" />
                </button>
              </div>
            </section>
          )}

          {currentStep === 4 && selectedBroker && brokerView === 'details' && (
            <section className="signup-card signup-wizard-card" aria-labelledby="broker-details-heading">
              <span className="eyebrow accent">STEP 4 · ACCOUNT DETAILS</span>
              <div className="signup-card-heading signup-wizard-heading">
                <h1 id="broker-details-heading">{onboardingPath === 'open-new' ? 'Enter your new account details' : 'Enter your existing account details'}</h1>
                <p>{selectedBroker.name} account · Do not enter your broker password or trading credentials.</p>
              </div>
              <form className="signup-form" noValidate onSubmit={submitBrokerDetails}>
                <SelectField
                  id="broker-account-type"
                  label="Account Type"
                  value={brokerDetails.accountType}
                  options={[...selectedBroker.accountTypes, "I don't know"]}
                  error={errors.accountType}
                  onChange={(value) => updateBrokerDetail('accountType', value)}
                />
                <SelectField
                  id="broker-trading-platform"
                  label="Trading Platform"
                  value={brokerDetails.tradingPlatform}
                  options={[...selectedBroker.tradingPlatforms, "I don't know"]}
                  error={errors.tradingPlatform}
                  onChange={(value) => updateBrokerDetail('tradingPlatform', value)}
                />
                <Field
                  id="broker-email"
                  label={onboardingPath === 'link-existing' ? 'Email used with broker' : 'Email used with broker (if required)'}
                  name="brokerEmail"
                  type="email"
                  placeholder="Enter the email used with this broker"
                  value={brokerDetails.brokerEmail}
                  error={errors.brokerEmail}
                  autoComplete="email"
                  onChange={(_name, value) => updateBrokerDetail('brokerEmail', value)}
                />
                <Field id="broker-account-holder" label="Account Holder Name" name="accountName" placeholder="Enter the name on your broker account" value={brokerDetails.accountHolderName} error={errors.accountHolderName} autoComplete="name" onChange={(name, value) => updateBrokerDetail('accountHolderName', value)} />
                <Field id="broker-account-number" label="Broker Account Number" name="accountNumber" placeholder="Enter your broker account number" value={brokerDetails.accountNumber} error={errors.accountNumber} autoComplete="off" onChange={(_name, value) => updateBrokerDetail('accountNumber', value)} />
                {onboardingPath === 'link-existing' && (
                  <div className="signup-terms-field">
                    <label htmlFor="broker-authorize-contact">
                      <input
                        id="broker-authorize-contact"
                        type="checkbox"
                        checked={brokerDetails.authorizedContact}
                        onChange={(event) => updateBrokerDetail('authorizedContact', event.currentTarget.checked)}
                      />
                      <span>I authorize TradeStack to contact my broker if necessary to verify my account connection.</span>
                    </label>
                  </div>
                )}
                {errors.partnerLinkOpened && <p className="signup-field-error" role="alert">{errors.partnerLinkOpened}</p>}
                <p className="onboarding-funds-note"><Shield aria-hidden="true" />Your trading funds remain with your broker. Rebate eligibility and account attribution depend on verified activity and applicable broker terms.</p>
                <div className="onboarding-actions">
                  <button type="button" className="button button-outline" onClick={() => { setBrokerView('setup'); setErrors({}); }}>Back</button>
                  <button type="submit" className="button button-primary">
                    {onboardingPath === 'open-new' ? 'Submit Setup' : 'Submit Link Request'} <ArrowUpRight aria-hidden="true" />
                  </button>
                </div>
              </form>
            </section>
          )}

          {currentStep === 5 && (
            <section className="signup-card signup-wizard-card onboarding-done-card" aria-labelledby="done-heading">
              <span className="eyebrow accent">STEP 5 · DONE</span>
              <div className="onboarding-done-mark"><Check aria-hidden="true" /></div>
              <div className="signup-card-heading signup-wizard-heading">
                <h1 id="done-heading">You&apos;re all set</h1>
                <p>Your broker connection details are ready for verification.</p>
              </div>
              <p className="onboarding-neutral-notice">
                This frontend-only confirmation is held in the current page session; no account details have been sent to a server or broker.
              </p>
              <dl className="onboarding-summary">
                <div><dt>Broker</dt><dd>{selectedBroker?.name}</dd></div>
                <div><dt>Connection type</dt><dd>{onboardingPath === 'open-new' ? 'New Account' : 'Existing Account'}</dd></div>
                <div><dt>Account number</dt><dd>{maskAccountNumber(brokerDetails.accountNumber)}</dd></div>
                <div><dt>Verification status</dt><dd><span className="onboarding-status">{verificationStatus === 'pending' ? 'Pending Verification' : verificationStatus}</span></dd></div>
              </dl>
              <div className="onboarding-actions onboarding-done-actions">
                <Link to="/dashboard" className="button button-primary">Go to Dashboard <ArrowUpRight aria-hidden="true" /></Link>
                <button type="button" className="button button-outline" onClick={() => setShowSetupDetails((visible) => !visible)}>
                  {showSetupDetails ? 'Hide Setup Details' : 'View Setup Details'}
                </button>
              </div>
              {showSetupDetails && (
                <div className="onboarding-setup-details">
                  <h2>Setup details</h2>
                  <p>{selectedBroker?.name} · {onboardingPath === 'open-new' ? 'New Account' : 'Existing Account'}</p>
                  {brokerDetails.accountType && <p>Account type: {brokerDetails.accountType}</p>}
                  {brokerDetails.tradingPlatform && <p>Platform: {brokerDetails.tradingPlatform}</p>}
                  {onboardingPath === 'link-existing' && <p>Broker attribution is subject to the broker&apos;s rules. No connection has been independently verified yet.</p>}
                  {onboardingPath === 'open-new' && <p>Partner link status: {partnerLinkOpened ? 'User indicated they opened an account' : 'Not opened in this session'}.</p>}
                </div>
              )}
              <Link to="/" className="onboarding-home-link">Back to Home</Link>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
