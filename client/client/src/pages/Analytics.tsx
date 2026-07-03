const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
        <p className="text-muted mt-1">Business intelligence and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <h3 className="text-sm text-muted mb-2">Loan Growth</h3>
          <p className="text-3xl font-bold text-text-primary">+24%</p>
          <p className="text-sm text-success mt-1">vs last month</p>
        </div>
        <div className="stat-card">
          <h3 className="text-sm text-muted mb-2">Approval Rate</h3>
          <p className="text-3xl font-bold text-text-primary">78%</p>
          <p className="text-sm text-success mt-1">+5% vs last month</p>
        </div>
        <div className="stat-card">
          <h3 className="text-sm text-muted mb-2">Collection Efficiency</h3>
          <p className="text-3xl font-bold text-text-primary">92%</p>
          <p className="text-sm text-success mt-1">+2% vs last month</p>
        </div>
        <div className="stat-card">
          <h3 className="text-sm text-muted mb-2">Default Rate</h3>
          <p className="text-3xl font-bold text-text-primary">2.4%</p>
          <p className="text-sm text-success mt-1">-0.5% vs last month</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Loan Growth Trend</h3>
        <div className="h-80 flex items-center justify-center text-muted">
          Chart visualization will be displayed here
        </div>
      </div>
    </div>
  );
};

export default Analytics;