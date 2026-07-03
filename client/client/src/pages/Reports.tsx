import { PieChart } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Reports</h1>
        <p className="text-muted mt-1">Generate and download comprehensive reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Loan Report', 'Collection Report', 'Revenue Report', 'Risk Report', 'Customer Report', 'Payment Report'].map((report) => (
          <div key={report} className="card p-6 hover:shadow-soft transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <PieChart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">{report}</p>
                <p className="text-sm text-muted">Click to generate</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;