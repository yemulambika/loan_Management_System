"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import "@/styles/admin.css";

function AdminDashboardContent() {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-content">
        <h1 className="admin-title">Admin Dashboard</h1>

        <div className="admin-grid">
          <Link href="/dashboard/sales" className="admin-card">
            <h2 className="admin-card-title">Sales Module</h2>
          </Link>

          <Link href="/dashboard/sanction" className="admin-card">
            <h2 className="admin-card-title">Sanction Module</h2>
          </Link>

          <Link href="/dashboard/disbursement" className="admin-card">
            <h2 className="admin-card-title">Disbursement Module</h2>
          </Link>

          <Link href="/dashboard/collection" className="admin-card">
            <h2 className="admin-card-title">Collection Module</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
