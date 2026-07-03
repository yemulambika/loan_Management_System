import { useQuery } from '@tanstack/react-query';
import { Users, FileText, Clock, XCircle, DollarSign, CreditCard, AlertTriangle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { getDashboardStats } from '@/services/dashboardService';
import { getLoans } from '@/services/loanService';
import StatCard from '@/components/dashboard/StatCard';
import LoanChart from '@/components/dashboard/LoanChart';
import RecentActivity from '@/components/dashboard/RecentActivity';

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  });

  const { data: loans } = useQuery({
    queryKey: ['loans'],
    queryFn: getLoans,
  });

  const statCards = [
    { title: 'Total Customers', value: stats?.totalCustomers || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active Loans', value: stats?.activeLoans || 0, icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Pending Loans', value: stats?.pendingLoans || 0, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { title: 'Rejected Loans', value: stats?.rejectedLoans || 0, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { title: 'Total Revenue', value: `$${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'EMI Collected', value: `$${(stats?.emiCollected || 0).toLocaleString()}`, icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Overdue Payments', value: stats?.overduePayments || 0, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Default Loans', value: stats?.defaultLoans || 0, icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-muted mt-1">Welcome back! Here's your loan management overview.</p>
      </div>

      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LoanChart />
            <RecentActivity />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;