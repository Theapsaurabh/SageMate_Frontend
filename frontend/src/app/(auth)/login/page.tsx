/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  Brain,
  CheckCircle,
  Sparkles,
} from "lucide-react";

import { apiService } from "@/lib/api/user/userAuthApi";
import { useAuth } from "../../../lib/context/UserAuthContext"; // ✅ Import your context hook

export default function UserLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth(); // ✅ Access context login

  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await apiService.login(formData.email, formData.password);

      if (response.success) {
        const token = response.data.token;
        const user = response.data.patient;

        // ✅ Update global context instantly
        login(user, token);

        // ✅ Set cookie (optional backup)
        document.cookie = `token=${token}; path=/; max-age=604800;`;

        // ✅ Redirect properly
        const redirectTo = searchParams.get("redirect") || "/user";
        router.push(redirectTo);
      } else {
        alert(response.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => router.push("/user/forgot-password");
  const handleBackToHome = () => router.push("/");

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl top-1/4 -left-40 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 dark:opacity-30" />
          <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl bottom-1/4 -right-20 bg-gradient-to-l from-purple-500 to-pink-500 opacity-15 dark:opacity-25" />
        </div>

        <button
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 self-start"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-md"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-blue-500/20">
                <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SageMate
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back to Your Wellness Journey
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Continue your path to emotional well-being with personalized insights and compassionate support.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "24/7 AI emotional support",
              "Personalized mental health insights",
              "Secure and confidential platform",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
        >
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium">Your mental health matters</span>
        </motion.div>
      </div>

      {/* Right Panel (Form) */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md space-y-6 bg-white/80 dark:bg-background/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-200/50 dark:border-muted/30 shadow-2xl"
        >
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 rounded-2xl border-2 bg-transparent transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500/20"
                } text-gray-900 dark:text-white`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm font-medium">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-3 rounded-2xl border-2 bg-transparent transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500/20"
                } text-gray-900 dark:text-white`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm font-medium">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            <span className="px-2 text-sm text-gray-500">New to SageMate?</span>
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>

          {/* Signup */}
          <div className="text-center">
            <Link
              href="/signup"
              className="inline-block w-full py-3 rounded-2xl border-2 border-blue-500 text-blue-600 font-semibold hover:bg-blue-500/10 transition-all duration-300 hover:scale-105"
            >
              Create New Account
            </Link>
          </div>

          <div className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> Your data is securely encrypted
          </div>
        </motion.form>
      </div>
    </div>
  );
}
