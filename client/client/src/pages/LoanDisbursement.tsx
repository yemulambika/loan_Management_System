import { useQuery } from '@tanstack/react-query';
import { getSanctionedLoans, updateLoanStatus } from '@/services/loanService';
import { DollarSign, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const LoanDisbursement = () => {
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const { data: loans } = useQuery({
    queryKey: ['sanctionedLoans'],
    queryFn: getSanctionedLoans,
  });

  const handleDisburse = async () => {
    if (!selectedLoan) return;
    try {
      await updateLoanStatus(selectedLoan._id, 'DISBURSED');
      toast.success('Loan disbursed successfully');
      setSelectedLoan(null);
    } catch (error) {
      toast.error('Failed to disburse loan');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Loan Disbursement</h1>
        <p className="text-muted mt-1">Process sanctioned loans for disbursement</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Applicant</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Tenure</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loans?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-muted">
                    No sanctioned loans pending disbursement
                  </td>
                </tr>
              ) : (
                loans?.map((loan: any) => (
                  <tr key={loan._id} className="hover:bg-hover transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-text-primary">{loan.fullName}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-text-primary">${loan.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-muted">{loan.tenure} months</td>
                    <td className="px-6 py-4">
                      <span className="badge badge-info">{loan.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedLoan(loan)}
                        className="btn-primary flex items-center gap-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        Disburse
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-text-primary mb-4">Confirm Disbursement</h3>
            <div className="space-y-3">
              <div>
                <label className="label">Applicant</label>
                <p className="text-sm text-muted">{selectedLoan.fullName}</p>
              </div>
              <div>
                <label className="label">Amount</label>
                <p className="text-sm text-muted">${selectedLoan.amount?.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleDisburse} className="flex-1 btn-primary">
                Confirm Disbursement
              </button>
              <button onClick={() => setSelectedLoan(null)} className="flex-1 btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanDisbursement;