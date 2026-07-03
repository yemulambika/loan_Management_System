import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPendingLoans, updateLoanStatus } from '@/services/loanService';
import { CheckCircle, XCircle, Eye, X } from 'lucide-react';
import { toast } from 'sonner';

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  SANCTIONED: 'bg-blue-100 text-blue-700',
  REJECTED: 'bg-red-100 text-red-700',
};

const LoanApproval = () => {
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [remark, setRemark] = useState('');

  const queryClient = useQueryClient();
  const { data: loans } = useQuery({
    queryKey: ['pendingLoans'],
    queryFn: getPendingLoans,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateLoanStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingLoans'] });
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      toast.success(`Loan ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      setSelectedLoan(null);
      setAction(null);
      setRemark('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update loan status');
    },
  });

  const handleAction = () => {
    if (!selectedLoan || !action) return;
    const status = action === 'approve' ? 'SANCTIONED' : 'REJECTED';
    updateStatusMutation.mutate({ id: selectedLoan._id, status });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Loan Approval</h1>
        <p className="text-muted mt-1">Review and process pending loan applications</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Applicant</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Tenure</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Salary</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loans?.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-muted">No pending loans</td></tr>
              ) : (
                loans?.map((loan: any) => (
                  <tr key={loan._id} className="hover:bg-hover transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-text-primary">{loan.fullName}</p>
                        <p className="text-sm text-muted">PAN: {loan.pan || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-text-primary">${loan.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-muted">{loan.tenure} months</td>
                    <td className="px-6 py-4 text-sm text-muted">${loan.monthlySalary?.toLocaleString()}</td>
                    <td className="px-6 py-4"><span className={`badge ${statusColors.PENDING}`}>{loan.status}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => { setSelectedLoan(loan); setAction('approve'); }} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors" title="Approve"><CheckCircle className="w-5 h-5" /></button>
                        <button onClick={() => { setSelectedLoan(loan); setAction('reject'); }} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Reject"><XCircle className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLoan && action && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-text-primary">{action === 'approve' ? 'Approve Loan' : 'Reject Loan'}</h3>
              <button onClick={() => { setSelectedLoan(null); setAction(null); }} className="p-2 hover:bg-hover rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div><label className="label">Applicant</label><p className="text-sm text-muted">{selectedLoan.fullName}</p></div>
              <div><label className="label">Amount</label><p className="text-sm text-muted">${selectedLoan.amount?.toLocaleString()}</p></div>
              <div><label className="label">Remark</label><textarea value={remark} onChange={(e) => setRemark(e.target.value)} className="input-field" rows={3} placeholder="Enter your remark..." /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleAction} disabled={updateStatusMutation.isPending} className={`flex-1 ${action === 'approve' ? 'btn-primary' : 'btn-danger'}`}>
                {updateStatusMutation.isPending ? 'Processing...' : (action === 'approve' ? 'Approve' : 'Reject')}
              </button>
              <button onClick={() => { setSelectedLoan(null); setAction(null); }} className="flex-1 btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApproval;