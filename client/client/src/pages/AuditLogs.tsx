import { ScrollText } from 'lucide-react';

const AuditLogs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Audit Logs</h1>
        <p className="text-muted mt-1">Track all system activities and changes</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Timestamp</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">User</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Action</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td colSpan={4} className="text-center py-12 text-muted">
                  No audit logs found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;