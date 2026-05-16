"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import API from "@/services/api";
import "@/styles/sales.css";

type Lead = {
  _id: string;
  name?: string;
  fullName?: string;
  email?: string;
  createdAt?: string;
};

type FollowUpLoan = {
  _id: string;
  fullName?: string;
  status?: string;
  documents?: string[];
  salarySlip?: string;
  borrower?: {
    lastActive?: string;
  };
};

type ApiErrorResponse = {
  message?: string;
};

function SalesDashboardContent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [followUps, setFollowUps] = useState<FollowUpLoan[]>([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setError("");
      const leadsRes = await API.get<Lead[]>("/users/leads");
      const followRes = await API.get<FollowUpLoan[]>("/loan/followups");
      setLeads(leadsRes.data);
      setFollowUps(followRes.data);
    } catch (err) {
      const apiError = err as AxiosError<ApiErrorResponse>;
      setError(apiError.response?.data?.message || "Failed to fetch sales data");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const serverBase = API.defaults.baseURL?.replace("/api", "") || "";

  const deleteLoan = async (id: string) => {
    try {
      setError("");
      await API.delete(`/loan/${id}`);
      fetchData();
    } catch (err) {
      const apiError = err as AxiosError<ApiErrorResponse>;
      setError(apiError.response?.data?.message || "Failed to delete loan");
    }
  };

  const totalUsers = leads.length + followUps.length;
  const appliedLoans = followUps.filter((loan) => loan.status !== undefined).length;
  const conversionRate =
    totalUsers > 0 ? ((appliedLoans / totalUsers) * 100).toFixed(1) : "0.0";

  return (
    <div className="sales-container">
      <h1 className="sales-title">Sales Dashboard</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="sales-grid">
        <div className="sales-card">
          <h2 className="sales-card-title">New Leads</h2>
          <p className="sales-desc">Registered users who have not applied yet.</p>

          <table className="sales-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.fullName || lead.name}</td>
                  <td>{lead.email}</td>
                  <td>
                    {lead.createdAt
                      ? new Date(lead.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sales-card">
          <h2 className="sales-card-title">Follow Ups</h2>
          <p className="sales-desc">Loan application tracking section.</p>

          <table className="sales-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Documents</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {followUps
                .filter((loan) => loan.status)
                .map((loan) => (
                  <tr key={loan._id}>
                    <td>{loan.fullName}</td>
                    <td>
                      {loan.documents && loan.documents.length > 0
                        ? loan.documents.map((doc) => (
                            <div key={doc}>
                              <a href={`${serverBase}/${doc}`} target="_blank" rel="noreferrer">
                                View
                              </a>
                            </div>
                          ))
                        : loan.salarySlip
                          ? (
                              <a
                                href={`${serverBase}/${loan.salarySlip}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
                              </a>
                            )
                          : "-"}
                    </td>
                    <td>{loan.status}</td>
                    <td>
                      {loan.borrower?.lastActive
                        ? new Date(loan.borrower.lastActive).toLocaleDateString()
                        : ""}
                    </td>
                    <td>
                      <button className="btn-delete" onClick={() => deleteLoan(loan._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sales-metrics">
        <div className="metric-card">
          <h3>Registered Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="metric-card">
          <h3>Applied Loans</h3>
          <p>{appliedLoans}</p>
        </div>
        <div className="metric-card">
          <h3>Conversion Rate</h3>
          <p>{conversionRate}%</p>
        </div>
      </div>
    </div>
  );
}

export default function SalesDashboard() {
  return (
    <ProtectedRoute requiredRole="sales">
      <SalesDashboardContent />
    </ProtectedRoute>
  );
}
