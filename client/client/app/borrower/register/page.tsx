"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { Form, Input, Button, Select, message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";

type ApiErrorResponse = {
  message?: string;
};

const { Option } = Select;

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setLoading(true);
    try {
      await register(values);
      message.success("Registration successful. Redirecting to login...");
      router.push("/login");
    } catch (error) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      message.error(apiError.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl mb-4">
              <UserPlus className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
            <p className="text-slate-600 mt-2">Join us to manage your loans</p>
          </div>

          {/* Form */}
          <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
            <Form.Item
              name="name"
              label={<span className="text-slate-700 font-medium">Full Name</span>}
              rules={[
                { required: true, message: "Please enter your name" },
              ]}
            >
              <Input
                prefix={<User size={18} className="text-slate-400" />}
                placeholder="John Doe"
                className="h-11 rounded-lg border-slate-200"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="text-slate-700 font-medium">Email Address</span>}
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
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
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password
                prefix={<Lock size={18} className="text-slate-400" />}
                placeholder="••••••••"
                className="h-11 rounded-lg border-slate-200"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label={<span className="text-slate-700 font-medium">Account Type</span>}
              initialValue="borrower"
              rules={[{ required: true, message: "Please select an account type" }]}
            >
              <Select className="rounded-lg">
                <Option value="borrower">Borrower</Option>
                <Option value="admin">Admin</Option>
                <Option value="sales">Sales Representative</Option>
                <Option value="sanction">Sanction Officer</Option>
                <Option value="disbursement">Disbursement Officer</Option>
                <Option value="collection">Collection Agent</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="h-11 rounded-lg font-semibold text-base bg-primary hover:bg-primary-dark"
              >
                <UserPlus size={18} className="inline mr-2" />
                Create Account
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

          {/* Login Link */}
          <p className="text-center text-slate-600 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:text-primary-dark">
              Sign in here
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
