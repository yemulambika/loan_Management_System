import { Receipt, DollarSign, Calendar } from 'lucide-react';

const Payments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Payments</h1>
        <p className="text-muted mt-1">Track and manage all loan payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Payments</p>
              <p className="text-2xl font-bold text-text-primary">$0</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted">This Month</p>
              <p className="text-2xl font-bold text-text-primary">$0</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Pending</p>
              <p className="text-2xl font-bold text-text-primary">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Payment ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Borrower</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">UTR Number</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td colSpan={5} className="text-center py-12 text-muted">
                  No payment records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;