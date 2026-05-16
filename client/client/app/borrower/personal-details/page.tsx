"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AxiosError } from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import "@/styles/personal.css"; // new CSS file

type Loan = {
  _id: string;
  status: string;
  fullName?: string;
  amount?: number;
  totalRepayment?: number;
  paidAmount?: number;
};

type ApiErrorResponse = {
  message?: string;
};

function PersonalDetailsContent() {
  const router = useRouter();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    pan: "",
    dob: "",
    monthlySalary: "",
    employmentMode: "Salaried",
  });

  useEffect(() => {
    const fetchExistingLoan = async () => {
      try {
        const res = await API.get<Loan[]>("/loan/my-loans");
        setLoans(res.data || []);
      } catch {
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingLoan();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.post<Loan>("/loan/personal-details", form);
      localStorage.setItem("activeLoanId", res.data._id);
      alert("BRE Passed");
      router.push("/borrower/upload-documents");
    } catch (error) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      alert(apiError.response?.data?.message || "BRE validation failed");
    }
  };

  const formatCurrency = (value?: number) => {
    if (!value) return "Not selected yet";

    return `Rs. ${value.toLocaleString("en-IN")}`;
  };

  if (loading) {
    return (
      <div className="personal-container">
        <div className="personal-box">
          <div className="personal-content">
            <h1 className="personal-title">Personal Details</h1>
            <p className="personal-message">
              Checking your existing application...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loans.length > 0 && !showForm) {
    return (
      <div className="personal-container">
        <div className="personal-box">
          <div className="personal-content">
            <h1 className="personal-title">Loan Applications</h1>

            {loans.map((ln) => (
              <div key={ln._id} className="loan-status-card">
                <p>
                  <span>Status</span>
                  <strong>{ln.status}</strong>
                </p>
                <p>
                  <span>Loan Amount</span>
                  <strong>{formatCurrency(ln.amount)}</strong>
                </p>
                <p>
                  <span>Total Repayment</span>
                  <strong>{formatCurrency(ln.totalRepayment)}</strong>
                </p>
                <p>
                  <span>Paid Amount</span>
                  <strong>{formatCurrency(ln.paidAmount)}</strong>
                </p>
              </div>
            ))}

            {/* If latest loan has no amount, allow continuing application */}
            {loans[0] && !loans[0].amount && (
              <button
                type="button"
                className="personal-btn"
                onClick={() => router.push("/borrower/upload-documents")}
              >
                Continue Application
              </button>
            )}

            <button
              type="button"
              className="personal-btn personal-btn-secondary"
              onClick={() => setShowForm(true)}
            >
              Apply Another Loan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="personal-container">
      <div className="personal-box">
        <div className="personal-content">
          <h1 className="personal-title">Personal Details</h1>

          <form onSubmit={handleSubmit} className="personal-form">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="personal-input"
              onChange={handleChange}
            />

            <input
              type="text"
              name="pan"
              placeholder="PAN"
              className="personal-input"
              onChange={handleChange}
            />

            <input
              type="date"
              name="dob"
              className="personal-input"
              onChange={handleChange}
            />

            <input
              type="number"
              name="monthlySalary"
              placeholder="Monthly Salary"
              className="personal-input"
              onChange={handleChange}
            />

            <select
              name="employmentMode"
              className="personal-input"
              onChange={handleChange}
            >
              <option>Salaried</option>
              <option>Self-Employed</option>
              <option>Unemployed</option>
            </select>

            <button className="personal-btn">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default function PersonalDetailsPage() {
  return (
    <ProtectedRoute requiredRole="borrower">
      <PersonalDetailsContent />
    </ProtectedRoute>
  );
}
