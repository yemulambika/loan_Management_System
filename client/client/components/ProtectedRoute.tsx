"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")?.toString().trim().toLowerCase();

    if (!token) {
      router.push("/login");
      return;
    }

    const required = requiredRole?.toString().trim().toLowerCase();
    const isAdmin = role === "admin";
    const hasRequiredRole = required ? role === required : true;

    if (!hasRequiredRole && !isAdmin) {
      // User doesn't have required role and is not admin, redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      router.push("/login");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthorized(true);
    setLoading(false);
  }, [requiredRole, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-slate-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-slate-600">Loading...</p>
      </div>
    </div>;
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
