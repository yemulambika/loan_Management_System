"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Form, Input, Button, message } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { Lock, Mail, LogIn } from "lucide-react";
import Link from "next/link";

type ApiErrorResponse = {
  message?: string;
};

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await login(values);
      const role = result.role.trim().toLowerCase();

      switch (role) {
        case "admin":
          router.push("/dashboard/admin");
          break;
        case "sales":
          router.push("/dashboard/sales");
          break;
        case "sanction":
          router.push("/dashboard/sanction");
          break;
        case "disbursement":
          router.push("/dashboard/disbursement");
          break;
        case "collection":
          router.push("/dashboard/collection");
          break;
        case "borrower":
          router.push("/borrower/personal-details");
          break;
        default:
          message.error("Unknown role");
      }
    } catch (error) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      message.error(apiError.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl mb-4">
              <Lock className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-600 mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
            <Form.Item
              name="email"
              label={<span className="text-slate-700 font-medium">Email Address</span>}
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                prefix={<Mail size={18} className="text-slate-400" />}
                placeholder="you@example.com"
                className="h-11 rounded-lg border-slate-200"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-slate-700 font-medium">Password</span>}
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                prefix={<Lock size={18} className="text-slate-400" />}
                placeholder="••••••••"
                className="h-11 rounded-lg border-slate-200"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="h-11 rounded-lg font-semibold text-base bg-primary hover:bg-primary-dark"
              >
                <LogIn size={18} className="inline mr-2" />
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">or</span>
            </div>
          </div>

          {/* Register Link */}
          <Button
            block
            className="h-11 rounded-lg font-semibold text-base border-slate-200"
            onClick={() => router.push("/borrower/register")}
          >
            Create Account
          </Button>

          {/* Footer */}
          <p className="text-center text-slate-600 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/borrower/register" className="text-primary font-semibold hover:text-primary-dark">
              Register here
            </Link>
          </p>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-8 text-white/80 text-sm">
          <p>Loan Management System © 2024</p>
        </div>
      </div>
    </div>
  );
}
