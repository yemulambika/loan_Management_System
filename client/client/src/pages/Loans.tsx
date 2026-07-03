import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyLoan, personalDetails, uploadDocuments, applyLoan } from '@/services/loanService';
import { FileText, Plus, Check, Clock } from 'lucide-react';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  SANCTIONED: 'bg-blue-100 text-blue-700',
  DISBURSED: 'bg-green-100 text-green-600',
  REJECTED: 'bg-red-100 text-red-700',
  CLOSED: 'bg-gray-100 text-gray-700',
};

const statusLabels: Record<string, string> = {
  DRAFT: 'Draft - Complete Personal Details',
  PENDING: 'Pending Approval - Awaiting Sanction Officer Review',
  SANCTIONED: 'Approved - Awaiting Disbursement',
  DISBURSED: 'Disbursed - Active Loan',
  REJECTED: 'Rejected',
  CLOSED: 'Closed - Fully Repaid',
};

type Step = 'personal-details' | 'documents' | 'loan-details' | 'status';

const Loans = () => {
  const [step, setStep] = useState<Step>('status');
  const [personalData, setPersonalData] = useState({
    fullName: '',
    pan: '',
    dob: '',
    monthlySalary: '',
    employmentMode: '',
  });
  const [loanData, setLoanData] = useState({
    amount: '',
    tenure: '',
  });

  const queryClient = useQueryClient();
  const { data: loan, isLoading } = useQuery({
    queryKey: ['myLoan'],
    queryFn: getMyLoan,
  });

  const personalMutation = useMutation({
    mutationFn: personalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myLoan'] });
      toast.success('Personal details saved! Please upload documents.');
      setStep('documents');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to save personal details');
    },
  });

  const documentMutation = useMutation({
    mutationFn: uploadDocuments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myLoan'] });
      toast.success('Documents uploaded! Now set loan amount.');
      setStep('loan-details');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upload documents');
    },
  });

  const applyMutation = useMutation({
    mutationFn: applyLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myLoan'] });
      toast.success('Loan application submitted!');
      setStep('status');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    },
  });

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    personalMutation.mutate({
      fullName: personalData.fullName,
      pan: personalData.pan,
      dob: personalData.dob,
      monthlySalary: Number(personalData.monthlySalary),
      employmentMode: personalData.employmentMode,
    });
  };

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const files = (e.target as HTMLFormElement).querySelectorAll('input[type="file"]')[0] as HTMLInputElement;
    if (files?.files) {
      Array.from(files.files).forEach(file => formData.append('documents', file));
    }
    formData.append('loanId', loan?._id || '');
    documentMutation.mutate(formData);
  };

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyMutation.mutate({
      amount: Number(loanData.amount),
      tenure: Number(loanData.tenure),
      loanId: loan?._id,
    } as any);
  };

  const renderStatusTimeline = () => {
    if (!loan) return null;
    
    const timelineSteps = [
      { status: 'DRAFT', label: 'Personal Details', completed: !!loan.fullName },
      { status: 'DRAFT', label: 'Document Upload', completed: loan.documents && loan.documents.length > 0 },
      { status: 'PENDING', label: 'Pending Review', completed: loan.status !== 'DRAFT' },
      { status: 'SANCTIONED', label: 'Sanction Approved', completed: ['SANCTIONED', 'DISBURSED', 'CLOSED'].includes(loan.status) },
      { status: 'DISBURSED', label: 'Loan Disbursed', completed: ['DISBURSED', 'CLOSED'].includes(loan.status) },
      { status: 'CLOSED', label: 'Loan Closed', completed: loan.status === 'CLOSED' },
    ];

    return (
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Application Progress</h3>
        <div className="flex items-center justify-between">
          {timelineSteps.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.completed ? 'bg-primary' : 'bg-gray-200'
              }`}>
                {item.completed ? <Check className="w-5 h-5 text-white" /> : <Clock className="w-5 h-5 text-gray-500" />}
              </div>
              <span className="text-xs mt-2 text-center">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <span className={`badge ${statusColors[loan.status] || 'bg-gray-100 text-gray-700'}`}>
            {statusLabels[loan.status] || loan.status}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">My Loans</h1>
          <p className="text-muted mt-1">Complete your loan application in steps</p>
        </div>
        <button onClick={() => setStep('personal-details')} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {loan ? 'Apply New Loan' : 'Start Application'}
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : step === 'personal-details' ? (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Step 1: Personal Details</h3>
          <form onSubmit={handlePersonalSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input type="text" value={personalData.fullName} onChange={(e) => setPersonalData({...personalData, fullName: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="label">PAN Number</label>
              <input type="text" value={personalData.pan} onChange={(e) => setPersonalData({...personalData, pan: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="label">Date of Birth</label>
              <input type="date" value={personalData.dob} onChange={(e) => setPersonalData({...personalData, dob: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="label">Monthly Salary</label>
              <input type="number" value={personalData.monthlySalary} onChange={(e) => setPersonalData({...personalData, monthlySalary: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="label">Employment Mode</label>
              <select value={personalData.employmentMode} onChange={(e) => setPersonalData({...personalData, employmentMode: e.target.value})} className="input-field" required>
                <option value="">Select</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self Employed</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={personalMutation.isPending} className="btn-primary">
                {personalMutation.isPending ? 'Saving...' : 'Save & Continue'}
              </button>
            </div>
          </form>
        </div>
      ) : step === 'documents' ? (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Step 2: Upload Documents</h3>
          <form onSubmit={handleDocumentSubmit} className="space-y-4">
            <div>
              <label className="label">Salary Slip / Documents</label>
              <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="input-field" required />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={documentMutation.isPending} className="btn-primary">
                {documentMutation.isPending ? 'Uploading...' : 'Upload & Continue'}
              </button>
              <button type="button" onClick={() => setStep('status')} className="btn-secondary">
                Skip for now
              </button>
            </div>
          </form>
        </div>
      ) : step === 'loan-details' ? (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Step 3: Loan Details</h3>
          <form onSubmit={handleLoanSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Loan Amount</label>
              <input type="number" value={loanData.amount} onChange={(e) => setLoanData({...loanData, amount: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="label">Tenure (months)</label>
              <input type="number" value={loanData.tenure} onChange={(e) => setLoanData({...loanData, tenure: e.target.value})} className="input-field" required />
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={applyMutation.isPending} className="btn-primary">
                {applyMutation.isPending ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {renderStatusTimeline()}
          {loan && (
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
                    <tr className="hover:bg-hover transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium text-text-primary">{loan.fullName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-text-primary">${loan.amount?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4 text-sm text-muted">{loan.tenure || 0} months</td>
                      <td className="px-6 py-4">
                        <span className={`badge ${statusColors[loan.status] || 'bg-gray-100 text-gray-700'}`}>{loan.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">{loan.createdAt ? new Date(loan.createdAt).toLocaleDateString() : '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Loans;