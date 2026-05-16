"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import API from "@/services/api";
import "@/styles/sanction.css";

type Loan = {
  _id: string;
  fullName?: string;
  amount?: number;
  tenure?: number;
  status?: string;
};

type ApiErrorResponse = {
  message?: string;
};

function SanctionDashboardContent() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [error, setError] = useState("");

  const fetchLoans = async () => {
    try {
      setError("");
      const res = await API.get<Loan[]>("/loan/pending");
      setLoans(res.data);
    } catch (err) {
      const apiError = err as AxiosError<ApiErrorResponse>;
      setError(apiError.response?.data?.message || "Failed to fetch pending loans");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLoans();
  }, []);

  const updateLoan = async (id: string, status: "SANCTIONED" | "REJECTED") => {
    const rejectionReason =
      status === "REJECTED" ? window.prompt("Enter rejection reason") : "";

    if (status === "REJECTED" && !rejectionReason?.trim()) {
      setError("Rejection reason is required");
      return;
    }

    try {
      setError("");
      await API.put(`/loan/${id}/status`, { status, rejectionReason });
      fetchLoans();
    } catch (err) {
      const apiError = err as AxiosError<ApiErrorResponse>;
      setError(apiError.response?.data?.message || "Failed to update loan");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Sanction Dashboard</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid gap-6">
        {loans.map((loan) => (
          <div key={loan._id} className="card">
            <h2 className="text-xl font-bold">{loan.fullName || "Borrower"}</h2>

            <p>Amount: Rs. {loan.amount || 0}</p>
            <p>Tenure: {loan.tenure || 0} Days</p>
            <p>Status: {loan.status}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => updateLoan(loan._id, "SANCTIONED")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Approve
              </button>

              <button
                onClick={() => updateLoan(loan._id, "REJECTED")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SanctionDashboard() {
  return (
    <ProtectedRoute requiredRole="sanction">
      <SanctionDashboardContent />
    </ProtectedRoute>
  );
}
