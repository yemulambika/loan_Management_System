"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Zap,
  Check,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: "Easy Loan Application",
      description:
        "Apply for loans quickly with a simple and secure process.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: "Secure Data",
      description:
        "Your personal and financial information is protected with enterprise-grade security.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Fast Approval",
      description:
        "Get loan approvals in record time with our automated review process.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const benefits = [
    "Instant verification and approval",
    "Transparent terms and conditions",
    "24/7 customer support",
    "Multiple payment options",
    "Secure document storage",
    "Real-time application tracking",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">LMS</span>
            </div>
            <span className="text-xl font-bold">Loan Management</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2 rounded-lg text-white hover:bg-white/10 transition-all"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/borrower/register")}
              className="px-6 py-2 bg-primary hover:bg-primary-dark rounded-lg font-semibold transition-all"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Loan Management
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Apply, track, and manage your loans with a modern, intuitive
              platform. Get approvals faster with our intelligent system.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => router.push("/borrower/register")}
                className="px-8 py-3 bg-gradient-to-r from-primary to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center gap-2"
              >
                Get Started <span className="text-xl">→</span>
              </button>
              <button
                onClick={() => router.push("/login")}
                className="px-8 py-3 border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur-3xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10 flex items-center justify-center"
                  >
                    <div className="text-3xl">
                      {["💳", "📊", "⚡", "✅", "🔒", "📈"][i - 1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-slate-300">
              Experience the future of loan management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-white/10 hover:border-white/30 transition-all"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Everything You Need for Loan Management
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-400" />
                    </div>
                    <span className="text-lg text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-white/10">
              <div className="space-y-4">
                {["Fast", "Secure", "Reliable"].map((title, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="font-semibold mb-2">{title}</h4>
                    <p className="text-sm text-slate-400">
                      {["Process your loans in minutes, not days",
                        "Enterprise-grade security for all your data",
                        "99.9% uptime guarantee"][i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 to-blue-600/20 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of users managing their loans efficiently
          </p>
          <button
            onClick={() => router.push("/borrower/register")}
            className="px-8 py-4 bg-gradient-to-r from-primary to-blue-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all inline-flex items-center gap-2"
          >
            Create Your Account <span className="text-xl">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex justify-between items-center">
            <p className="text-slate-400 text-sm">© 2024 Loan Management System. All rights reserved.</p>
            <div className="flex gap-4">
              {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-slate-400 hover:text-white transition text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

