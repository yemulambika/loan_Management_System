"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Form, Input, Button, message } from "antd";
import API from "@/services/api";
import "@/styles/login.css";

type LoginResponse = {
  token: string;
  role: string;
};

type ApiErrorResponse = {
  message?: string;
};

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await API.post<LoginResponse>("/auth/login", values);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      const role = res.data.role.trim().toLowerCase();

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
    <div className="login-container" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f6fa" }}>
      <div className="login-box" style={{ width: 400, padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2  className="login-title" style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter your email" }]}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
       
          <Form.Item>
            <Button type="default" block onClick={() => router.push("/register")}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
