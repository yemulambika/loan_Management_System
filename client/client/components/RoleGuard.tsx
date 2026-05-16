"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    const normalizedRole = role?.toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map((item) => item.toLowerCase());

    if (!normalizedRole || !normalizedAllowedRoles.includes(normalizedRole)) {
      router.push("/login");
    }
  }, [allowedRoles, router]);

  return <>{children}</>;
}
