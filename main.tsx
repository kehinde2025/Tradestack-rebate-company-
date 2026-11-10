import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import {
  DashboardBrokersPage,
  DashboardCashbackPage,
  DashboardLayout,
  DashboardOverview,
  DashboardProfilePage,
  DashboardReferralsPage,
  DashboardSettingsPage,
  DashboardTransactionsPage,
} from './dashboard';
import SiteLayout from './layouts/SiteLayout';
import BrokersPage from './pages/BrokersPage';
import FAQPage from './pages/FAQPage';
import GetStartedPage from './pages/GetStartedPage';
import HowItWorksPage from './pages/HowItWorksPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RebatesPage from './pages/RebatesPage';
import AdminBrokersPage from './pages/admin/AdminBrokersPage';
import AdminCashbackPage from './pages/admin/AdminCashbackPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminTransactionsPage from './pages/admin/AdminTransactionsPage';
import BrokerAccountsPage from './pages/admin/BrokerAccountsPage';
import BrokerReportsPage from './pages/admin/BrokerReportsPage';
import PayoutsPage from './pages/admin/PayoutsPage';
import UsersPage from './pages/admin/UsersPage';
import VerificationPage from './pages/admin/VerificationPage';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/brokers" element={<BrokersPage />} />
          <Route path="/rebates" element={<RebatesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="brokers" element={<DashboardBrokersPage />} />
          <Route path="cashback" element={<DashboardCashbackPage />} />
          <Route path="transactions" element={<DashboardTransactionsPage />} />
          <Route path="referrals" element={<DashboardReferralsPage />} />
          <Route path="profile" element={<DashboardProfilePage />} />
          <Route path="settings" element={<DashboardSettingsPage />} />
          <Route path="rebates" element={<DashboardCashbackPage />} />
          <Route path="earnings" element={<DashboardCashbackPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="broker-accounts" element={<BrokerAccountsPage />} />
          <Route path="brokers" element={<AdminBrokersPage />} />
          <Route path="broker-reports" element={<BrokerReportsPage />} />
          <Route path="cashback" element={<AdminCashbackPage />} />
          <Route path="transactions" element={<AdminTransactionsPage />} />
          <Route path="verification" element={<VerificationPage />} />
          <Route path="payouts" element={<PayoutsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
