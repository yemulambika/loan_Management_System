import { Users } from 'lucide-react';

const Employees = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Employees</h1>
        <p className="text-muted mt-1">Manage employee accounts and roles</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Role</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td colSpan={4} className="text-center py-12 text-muted">
                  No employees found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;