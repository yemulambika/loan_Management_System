const Transactions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Transactions</h1>
        <p className="text-muted mt-1">View and manage all financial transactions</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Transaction ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td colSpan={5} className="text-center py-12 text-muted">
                  No transactions found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;