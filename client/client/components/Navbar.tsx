"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        LMS Dashboard
      </h1>

      <button
        onClick={logout}
        className="bg-white text-blue-600 px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </nav>
  );
}