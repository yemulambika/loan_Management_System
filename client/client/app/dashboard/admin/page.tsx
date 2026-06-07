"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { BarChart3, CheckCircle, Banknote, Users, ArrowRight } from "lucide-react";

const modules = [
  {
    title: "Sales Module",
    description: "Manage and track loan applications from customers",
    icon: BarChart3,
    href: "/dashboard/sales",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Sanction Module",
    description: "Review and approve loan applications",
    icon: CheckCircle,
    href: "/dashboard/sanction",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Disbursement Module",
    description: "Manage loan disbursement and fund transfers",
    icon: Banknote,
    href: "/dashboard/disbursement",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Collection Module",
    description: "Track loan payments and collections",
    icon: Users,
    href: "/dashboard/collection",
    color: "from-orange-500 to-orange-600",
  },
];

function AdminDashboardContent() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar role="admin" />
      
      <div className="flex-1 lg:ml-64">
        <Navbar />
        
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 text-lg">
              Manage all loan management modules from here
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group"
                >
                  <div className="h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105">
                    {/* Gradient Header */}
                    <div className={`h-24 bg-gradient-to-r ${module.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20 bg-pattern"></div>
                      <div className="absolute right-0 top-0 w-32 h-32 opacity-10 transform translate-x-8 -translate-y-8">
                        <Icon size={120} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {module.title}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {module.description}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${module.color} text-white group-hover:scale-110 transition-transform`}>
                          <Icon size={24} />
                        </div>
                      </div>

                      {/* Link */}
                      <div className="flex items-center text-primary font-semibold mt-6 group-hover:gap-3 transition-all">
                        <span>Access Module</span>
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Modules", value: "4", color: "from-blue-500 to-blue-600" },
              { label: "Active Users", value: "24", color: "from-green-500 to-green-600" },
              { label: "Pending Tasks", value: "12", color: "from-orange-500 to-orange-600" },
              { label: "Success Rate", value: "98%", color: "from-purple-500 to-purple-600" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}
              >
                <p className="text-sm font-medium opacity-90">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </main>
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
