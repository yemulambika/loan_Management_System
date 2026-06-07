"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const router = useRouter();
  const { isAuthenticated, role, loading, logout } = useAuth();

  const required = requiredRole?.toString().trim().toLowerCase();
  const isAdmin = role === "admin";
  const hasRequiredRole = required ? role === required : true;
  const authorized = !loading && isAuthenticated && (hasRequiredRole || isAdmin);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isAuthenticated || !authorized) {
      logout();
      router.push("/login");
    }
  }, [authorized, isAuthenticated, loading, logout, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
