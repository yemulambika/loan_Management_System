"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import API from "@/services/api";
import "@/styles/borrower.css";

type Loan = {
  status?: string;
  amount?: number;
  totalRepayment?: number;
  paidAmount?: number;
};

function BorrowerStatusContent() {
  const [loan, setLoan] = useState<Loan | null>(null);

  const fetchStatus = async () => {
    const res = await API.get<Loan | null>("/loan/my-loan");
    setLoan(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStatus();
  }, []);

  if (!loan) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="container-box max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Loan Status</h1>

        <p>Status: {loan.status}</p>
        <p>Loan Amount: Rs. {loan.amount || 0}</p>
        <p>Total Repayment: Rs. {loan.totalRepayment || 0}</p>
        <p>Paid Amount: Rs. {loan.paidAmount || 0}</p>
      </div>
    </div>
  );
}

export default function BorrowerStatusPage() {
  return (
    <ProtectedRoute requiredRole="borrower">
      <BorrowerStatusContent />
    </ProtectedRoute>
  );
}
