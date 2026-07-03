import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLoans, applyLoan } from '@/services/loanService';
import { FileText, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  SANCTIONED: 'bg-blue-100 text-blue-700',
  DISBURSED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
  CLOSED: 'bg-gray-100 text-gray-700',
};

const Loans = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    pan: '',
    dob: '',
    monthlySalary: '',
    employmentMode: '',
    amount: '',
    tenure: '',
  });

  const queryClient = useQueryClient();
  const { data: loans, isLoading } = useQuery({
    queryKey: ['loans'],
    queryFn: getLoans,
  });

  const applyMutation = useMutation({
    mutationFn: applyLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      toast.success('Loan application submitted!');
      setShowForm(false);
      setFormData({ fullName: '', pan: '', dob: '', monthlySalary: '', employmentMode: '', amount: '', tenure: '' });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyMutation.mutate({
      fullName: formData.fullName,
      pan: formData.pan,
      dob: formData.dob,
      monthlySalary: Number(formData.monthlySalary),
      employmentMode: formData.employmentMode,
      amount: Number(formData.amount),
      tenure: Number(formData.tenure),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">My Loans</h1>
          <p className="text-muted mt-1">Manage your loan applications</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Apply for Loan
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">New Loan Application</h3>
            <button onClick={() => setShowForm(false)} className="p-2 hover:bg-hover rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="label">PAN Number</label>
              <input type="text" value={formData.pan} onChange={(e) => setFormData({...formData, pan: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="label">Date of Birth</label>
              <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="label">Monthly Salary</label>
              <input type="number" value={formData.monthlySalary} onChange={(e) => setFormData({...formData, monthlySalary: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="label">Employment Mode</label>
              <select value={formData.employmentMode} onChange={(e) => setFormData({...formData, employmentMode: e.target.value})} className="input-field" required>
                <option value="">Select</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self Employed</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div>
              <label className="label">Loan Amount</label>
              <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="label">Tenure (months)</label>
              <input type="number" value={formData.tenure} onChange={(e) => setFormData({...formData, tenure: e.target.value})} className="input-field" required />
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={applyMutation.isPending} className="btn-primary">
                {applyMutation.isPending ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Applicant</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Tenure</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-12"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></td></tr>
              ) : loans?.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-muted">No loan applications found</td></tr>
              ) : (
                loans?.map((loan: any) => (
                  <tr key={loan._id} className="hover:bg-hover transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-text-primary">{loan.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-text-primary">${loan.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-muted">{loan.tenure} months</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${statusColors[loan.status] || 'bg-gray-100 text-gray-700'}`}>{loan.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">{new Date(loan.createdAt).toLocaleDateString()}</td>
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

export default Loans;