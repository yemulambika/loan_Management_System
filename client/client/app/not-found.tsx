import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="mb-6 text-slate-300">
          The page you are looking for is not available.
        </p>
        <Link
          href="/login"
          className="inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}
