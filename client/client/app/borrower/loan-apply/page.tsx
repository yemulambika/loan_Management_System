"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import LoanCalculator from "@/components/LoanCalculator";
import ProtectedRoute from "@/components/ProtectedRoute";
import API from "@/services/api";
import "@/styles/borrower.css";

type ApiErrorResponse = {
  message?: string;
};

function LoanApplyContent() {
  const [amount, setAmount] = useState(50000);
  const [tenure, setTenure] = useState(30);

  const applyLoan = async () => {
    try {
      await API.post("/loan/apply", {
        amount,
        tenure,
      });
      alert("Loan Applied Successfully");
    } catch (error) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      alert(apiError.response?.data?.message || "Failed to apply for loan");
    }
  };

  return (
    <div className="borrower-container">
      <div className="borrower-box">
        <h1 className="borrower-title">Apply Loan</h1>

        <div className="borrower-field">
          <label className="borrower-label">Loan Amount: ₹{amount}</label>
          <input
            type="range"
            min="50000"
            max="500000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="borrower-slider"
          />
        </div>

        <div className="borrower-field">
          <label className="borrower-label">Tenure: {tenure} days</label>
          <input
            type="range"
            min="30"
            max="365"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="borrower-slider"
          />
        </div>

        <LoanCalculator amount={amount} tenure={tenure} />

        <button onClick={applyLoan} className="borrower-btn">
          Apply Loan
        </button>
      </div>
    </div>
  );
}

export default function LoanApplyPage() {
  return (
    <ProtectedRoute requiredRole="borrower">
      <LoanApplyContent />
    </ProtectedRoute>
  );
}
