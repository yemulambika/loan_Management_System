"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import API from "@/services/api";
import "@/styles/collection.css";

type Loan = {
  _id: string;
  fullName?: string;
  totalRepayment?: number;
  paidAmount?: number;
};

type PaymentDraft = {
  utrNumber: string;
  amount: string;
};

type ApiErrorResponse = {
  message?: string;
};

function CollectionDashboardContent() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [payments, setPayments] = useState<Record<string, PaymentDraft>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLoans = async () => {
    try {
      setError("");
      const res = await API.get<Loan[]>("/loan/disbursed");
      setLoans(res.data);
    } catch (err) {
      const apiError = err as AxiosError<ApiErrorResponse>;
      setError(apiError.response?.data?.message || "Failed to fetch loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLoans();
  }, []);

  const updatePayment = (
    loanId: string,
    field: keyof PaymentDraft,
    value: string
  ) => {
    setPayments((current) => ({
      ...current,
      [loanId]: {
        utrNumber: "",
        amount: "",
        ...current[loanId],
        [field]: value,
      },
    }));
  };

  const addPayment = async (loanId: string) => {
    const payment = payments[loanId];
    const amount = Number(payment?.amount);

    if (!payment?.utrNumber || !amount || amount <= 0) {
      setError("Enter a valid UTR number and payment amount");
      return;
    }

    try {
      setError("");
      await API.post("/payment/add", {
        loanId,
        utrNumber: payment.utrNumber,
        amount,
      });
      setPayments((current) => ({
        ...current,
        [loanId]: { utrNumber: "", amount: "" },
      }));
      fetchLoans();
    } catch (err) {
      const apiError = err as AxiosError<ApiErrorResponse>;
      setError(apiError.response?.data?.message || "Failed to add payment");
    }
  };

  const formatCurrency = (value = 0) => `Rs. ${value.toLocaleString("en-IN")}`;

  if (loading) {
    return (
      <div className="collection-container">
        Loading collection loans...
      </div>
    );
  }

  return (
    <div className="collection-container">
      <h1 className="collection-title">Collection Dashboard</h1>

      {error && <p className="collection-error">{error}</p>}

      {loans.length === 0 && (
        <p className="collection-empty">
          No disbursed loans available for collection.
        </p>
      )}

      <div className="collection-grid">
        {loans.map((loan) => (
          <div key={loan._id} className="collection-card">
            <h2 className="collection-name">{loan.fullName || "Borrower"}</h2>

            <p className="collection-stats">
              Total Repayment: {formatCurrency(loan.totalRepayment)}
            </p>
            <p className="collection-stats">
              Paid Amount: {formatCurrency(loan.paidAmount)}
            </p>
            <p className="collection-stats">
              Outstanding:{" "}
              {formatCurrency((loan.totalRepayment || 0) - (loan.paidAmount || 0))}
            </p>

            <div className="collection-actions">
              <input
                className="collection-input"
                placeholder="UTR Number"
                value={payments[loan._id]?.utrNumber || ""}
                onChange={(e) =>
                  updatePayment(loan._id, "utrNumber", e.target.value)
                }
              />
              <input
                className="collection-input"
                placeholder="Amount"
                type="number"
                min="1"
                value={payments[loan._id]?.amount || ""}
                onChange={(e) =>
                  updatePayment(loan._id, "amount", e.target.value)
                }
              />
              <button className="btn-edit" onClick={() => addPayment(loan._id)}>
                Add Payment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CollectionDashboard() {
  return (
    <ProtectedRoute requiredRole="collection">
      <CollectionDashboardContent />
    </ProtectedRoute>
  );
}
