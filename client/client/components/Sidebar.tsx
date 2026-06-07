"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  CheckCircle,
  Banknote,
  Users,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    label: "Sales",
    href: "/dashboard/sales",
    icon: BarChart3,
    roles: ["admin", "sales"],
  },
  {
    label: "Sanction",
    href: "/dashboard/sanction",
    icon: CheckCircle,
    roles: ["admin", "sanction"],
  },
  {
    label: "Disbursement",
    href: "/dashboard/disbursement",
    icon: Banknote,
    roles: ["admin", "disbursement"],
  },
  {
    label: "Collection",
    href: "/dashboard/collection",
    icon: Users,
    roles: ["admin", "collection"],
  },
];

interface SidebarProps {
  role?: string;
}

export default function Sidebar({ role = "admin" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(role?.toLowerCase() || "admin")
  );

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-40 p-2 bg-primary text-white rounded-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white w-64 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-8">Navigation</h2>

          <nav className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                    active
                      ? "bg-primary text-white shadow-lg"
                      : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {active && <ChevronRight size={18} />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-700/50 rounded-lg text-sm text-gray-300">
          <p className="font-semibold mb-1">Role</p>
          <p className="capitalize">{role}</p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 top-16 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
