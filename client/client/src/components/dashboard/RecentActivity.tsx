import { useQuery } from '@tanstack/react-query';
import { getLoans } from '@/services/loanService';
import { Clock } from 'lucide-react';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  SANCTIONED: 'bg-blue-100 text-blue-700',
  DISBURSED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
  CLOSED: 'bg-gray-100 text-gray-700',
};

const RecentActivity = () => {
  const { data: loans } = useQuery({
    queryKey: ['loans'],
    queryFn: getLoans,
  });

  const recentLoans = loans?.slice(-5).reverse() || [];

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Loan Applications</h3>
      <div className="space-y-4">
        {recentLoans.length === 0 ? (
          <p className="text-muted text-center py-8">No recent activity</p>
        ) : (
          recentLoans.map((loan: any) => (
            <div key={loan._id} className="flex items-center justify-between p-4 bg-background rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{loan.fullName}</p>
                  <p className="text-sm text-muted">
                    ${loan.amount?.toLocaleString()} • {loan.tenure} months
                  </p>
                </div>
              </div>
              <span className={`badge ${statusColors[loan.status] || 'bg-gray-100 text-gray-700'}`}>
                {loan.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;