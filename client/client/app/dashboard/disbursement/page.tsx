"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import API from "@/services/api";
import "@/styles/disbursement.css";

type Loan = {
  _id: string;
  fullName?: string;
  amount?: number;
  tenure?: number;
  totalRepayment?: number;
  status?: string;
};

type ApiErrorResponse = {
  message?: string;
};

function DisbursementDashboardContent() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLoans = async () => {
    try {
      setError("");
      const res = await API.get<Loan[]>("/loan/sanctioned");
      setLoans(res.data);
    } catch (err) {
      const apiError = err as AxiosError<ApiErrorResponse>;
      setError(
        apiError.response?.data?.message || "Failed to fetch sanctioned loans"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLoans();
  }, []);

  const disburseLoan = async (id: string) => {
    try {
      setError("");
      await API.put(`/loan/${id}/status`, {
        status: "DISBURSED",
      });
      fetchLoans();
    } catch (err) {
      const apiError = err as AxiosError<ApiErrorResponse>;
      setError(apiError.response?.data?.message || "Failed to disburse loan");
    }
  };

  const formatCurrency = (value = 0) => `Rs. ${value.toLocaleString("en-IN")}`;

  if (loading) {
    return <div className="p-8">Loading sanctioned loans...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Disbursement Dashboard</h1>

      {error && <p className="disbursement-error">{error}</p>}

      {loans.length === 0 && (
        <p className="disbursement-empty">
          No sanctioned loans available. Applied loans appear here only after
          Sanction approves them.
        </p>
      )}

      <div className="grid gap-6">
        {loans.map((loan) => (
          <div key={loan._id} className="card">
            <h2 className="text-xl font-bold">{loan.fullName || "Borrower"}</h2>

            <p>Loan Amount: {formatCurrency(loan.amount)}</p>
            <p>Tenure: {loan.tenure || 0} days</p>
            <p>Total Repayment: {formatCurrency(loan.totalRepayment)}</p>
            <p>Status: {loan.status}</p>

            <button
              onClick={() => disburseLoan(loan._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
            >
              Mark as Disbursed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DisbursementDashboard() {
  return (
    <ProtectedRoute requiredRole="disbursement">
      <DisbursementDashboardContent />
    </ProtectedRoute>
  );
}
