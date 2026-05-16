"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/register.css";

type ApiErrorResponse = {
  message?: string;
};

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "borrower",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully");
      router.push("/login");
    } catch (error) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      alert(apiError.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      {/* Left side image */}
      <div className="register-left">
        <div className="overlay-text">
          <h1>Welcome to Loan Management</h1>
          <p>Track, Apply, and Manage your loans with ease.</p>
        </div>
      </div>

      {/* Right side form */}
      <div className="register-right">
        <form onSubmit={handleSubmit} className="form-box">
          <h2 className="form-title">Create Account</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input"
            onChange={handleChange}
            value={form.name}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            onChange={handleChange}
            value={form.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            onChange={handleChange}
            value={form.password}
          />

          <select
            name="role"
            className="input"
            onChange={handleChange}
            value={form.role}
          >
            <option value="admin">Admin</option>
            <option value="sales">Sales</option>
            <option value="sanction">Sanction</option>
            <option value="disbursement">Disbursement</option>
            <option value="collection">Collection</option>
            <option value="borrower">Borrower</option>
          </select>

          <button type="submit" className="btn-primary">
            Register
          </button>

          <p className="login-link">
            Already registered?{" "}
            <Link href="/login" className="login-btn">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
