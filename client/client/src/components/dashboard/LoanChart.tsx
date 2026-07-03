import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getLoans } from '@/services/loanService';

const COLORS = ['#0052CC', '#2563EB', '#16A34A', '#F59E0B', '#DC2626'];

const LoanChart = () => {
  const { data: loans } = useQuery({
    queryKey: ['loans'],
    queryFn: getLoans,
  });

  const monthlyData = loans?.reduce((acc: Record<string, any>, loan: any) => {
    const month = new Date(loan.createdAt).toLocaleMonthString('short', { month: 'short' });
    if (!acc[month]) acc[month] = { month, count: 0, amount: 0 };
    acc[month].count += 1;
    acc[month].amount += loan.amount || 0;
    return acc;
  }, {}) || {};

  const chartData = Object.values(monthlyData);

  const statusData = loans?.reduce((acc: Record<string, any>, loan: any) => {
    if (!acc[loan.status]) acc[loan.status] = { name: loan.status, value: 0 };
    acc[loan.status].value += 1;
    return acc;
  }, {}) || {};
  const pieData = Object.values(statusData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Monthly Loan Applications</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.08)' }}
            />
            <Bar dataKey="count" fill="#0052CC" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Loan Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LoanChart;