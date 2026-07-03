import { Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getLoans } from '@/services/loanService';

const Customers = () => {
  const { data: loans } = useQuery({
    queryKey: ['loans'],
    queryFn: getLoans,
  });

  const uniqueCustomers = loans?.reduce((acc: any[], loan: any) => {
    if (!acc.find((c) => c.borrower === loan.borrower)) {
      acc.push({
        id: loan.borrower,
        name: loan.fullName,
        email: loan.borrower,
        loanCount: 1,
        totalAmount: loan.amount,
      });
    } else {
      const existing = acc.find((c) => c.borrower === loan.borrower);
      existing.loanCount += 1;
      existing.totalAmount += loan.amount;
    }
    return acc;
  }, []) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Customers</h1>
        <p className="text-muted mt-1">Manage and view all customer profiles</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Active Loans</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Total Borrowed</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {uniqueCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-muted">
                    No customers found
                  </td>
                </tr>
              ) : (
                uniqueCustomers.map((customer: any) => (
                  <tr key={customer.id} className="hover:bg-hover transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-text-primary">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">{customer.email}</td>
                    <td className="px-6 py-4">
                      <span className="badge badge-info">{customer.loanCount}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-text-primary">
                      ${customer.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary hover:text-primary/80 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;