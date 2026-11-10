import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, Shield } from '../components/Icons';

function LoginSubmitButton({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <button className="button button-primary login-submit" type="submit" disabled={isLoading} aria-busy={isLoading}>
      {isLoading ? 'Signing In…' : 'Sign In'}
      {!isLoading && <ArrowUpRight aria-hidden="true" />}
    </button>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="login-page">
      <section className="login-section">
        <div className="container login-container">
          <div className="login-intro">
            <span className="eyebrow accent">YOUR TRADESTACK ACCOUNT</span>
            <h1>Welcome Back</h1>
            <p>Sign in to access your TradeStack rebate dashboard and review your connected accounts and activity.</p>
          </div>

          <div className="login-layout">
            <section className="login-card" aria-labelledby="login-form-title">
              <div className="login-card-heading">
                <h2 id="login-form-title">Sign in to TradeStack</h2>
                <p>Enter your account details to continue.</p>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-field">
                  <label htmlFor="login-email">Email address</label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="login-field">
                  <label htmlFor="login-password">Password</label>
                  <div className="login-password-input">
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Eye aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="login-form-options">
                  <label className="login-remember">
                    <input type="checkbox" name="remember" />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="login-forgot-link">Forgot password?</Link>
                </div>

                <div className="login-error-slot" role="alert" aria-live="polite" />
                <LoginSubmitButton />
              </form>

              <p className="login-signup-prompt">
                Don&apos;t have a TradeStack account? <Link to="/get-started">Get Started</Link>
              </p>
            </section>

            <aside className="login-trust-panel">
              <span className="login-trust-icon"><Shield aria-hidden="true" /></span>
              <span className="eyebrow">A clearer view of your rebates</span>
              <h2>Your trading stays with your broker.</h2>
              <p>
                Your trading funds remain with your broker. TradeStack helps track eligible broker
                activity and rebates.
              </p>
              <div className="login-trust-divider" />
              <p className="login-trust-note">
                Rebates depend on verified broker activity and the applicable broker and account
                arrangement.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
