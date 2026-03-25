"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { useAdminAuth } from "@/lib/context/AdminAuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);

    if (!success) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/admin");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600/20 p-4 rounded-full">
              <ShieldCheck className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Admin Login
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            Secure access to the SageMate Admin Console
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm text-blue-200">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-blue-300" />
              <input
                type="email"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-blue-200">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-blue-300" />
              <input
                type="password"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="•••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold text-lg transition-all disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in…
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-blue-300 text-xs mt-6">
          © {new Date().getFullYear()} SageMate Admin • Secure Access
        </p>
      </motion.div>
    </div>
  );
}
