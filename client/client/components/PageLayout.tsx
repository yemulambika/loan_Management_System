"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  role?: string;
  title?: string;
  description?: string;
}

export default function PageLayout({
  children,
  role = "admin",
  title,
  description,
}: PageLayoutProps) {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar role={role} />

      <div className="flex-1 lg:ml-64">
        <Navbar />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {title && (
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                {title}
              </h1>
              {description && (
                <p className="text-slate-600 text-lg">{description}</p>
              )}
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
