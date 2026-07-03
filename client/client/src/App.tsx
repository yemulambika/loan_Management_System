import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Dashboard from '@/pages/Dashboard';
import Customers from '@/pages/Customers';
import Loans from '@/pages/Loans';
import LoanApproval from '@/pages/LoanApproval';
import LoanDisbursement from '@/pages/LoanDisbursement';
import EMI from '@/pages/EMI';
import Payments from '@/pages/Payments';
import Transactions from '@/pages/Transactions';
import Reports from '@/pages/Reports';
import Analytics from '@/pages/Analytics';
import Employees from '@/pages/Employees';
import Settings from '@/pages/Settings';
import AuditLogs from '@/pages/AuditLogs';
import Support from '@/pages/Support';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="loans" element={<Loans />} />
        <Route path="loan-approval" element={<LoanApproval />} />
        <Route path="loan-disbursement" element={<LoanDisbursement />} />
        <Route path="emi" element={<EMI />} />
        <Route path="payments" element={<Payments />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="employees" element={<Employees />} />
        <Route path="settings" element={<Settings />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="support" element={<Support />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;