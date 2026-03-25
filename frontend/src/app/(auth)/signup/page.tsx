/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Brain,
  Sparkles,
  Heart,
  Shield,
  CheckCircle,
  Contact,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiService } from "@/lib/api/user/userAuthApi";
import { useAuth } from "../../../lib/context/UserAuthContext"; // ✅ Import Context

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  allergies?: string;
  medicalHistory?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
}

export default function PatientSignupPage() {
  const router = useRouter();
  const { login } = useAuth(); // ✅ Context login function

  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    bloodGroup: "",
    allergies: "",
    medicalHistory: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    agreedToTerms: false,
    agreedToPrivacy: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (field: keyof SignupFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = (): boolean => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("First name and last name are required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.agreedToTerms || !formData.agreedToPrivacy) {
      setError("You must agree to the terms and privacy policy");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    setError("");
    if (validateStep1()) setCurrentStep(2);
  };

  // ✅ Signup and Auto-Login with Context
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const patientData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth)
          : undefined,
        bloodGroup: formData.bloodGroup || undefined,
        allergies: formData.allergies
          ? formData.allergies.split(",").map((a) => a.trim())
          : [],
        medicalHistory: formData.medicalHistory
          ? formData.medicalHistory.split(",").map((m) => m.trim())
          : [],
        emergencyContact:
          formData.emergencyContactName && formData.emergencyContactPhone
            ? {
                name: formData.emergencyContactName,
                phone: formData.emergencyContactPhone,
                relationship:
                  formData.emergencyContactRelationship || "Family",
              }
            : undefined,
        agreedToTerms: formData.agreedToTerms,
        agreedToPrivacy: formData.agreedToPrivacy,
      };

      const response = await apiService.register(patientData);

      if (response.success) {
        const user = response.data.patient;
        const token = response.data.token;

        // ✅ Store in context (so dashboard instantly recognizes user)
        login(user, token);
        document.cookie = `token=${token}; path=/; max-age=604800;`;

        alert("✅ Account created successfully!");
        router.push("/user"); // Redirect to dashboard
      } else {
        setError(response.message || "Signup failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 1 (Personal + Account Info)
  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      {/* First & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          required
          className="py-4 rounded-2xl border-2 dark:bg-gray-800/80"
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          required
          className="py-4 rounded-2xl border-2 dark:bg-gray-800/80"
        />
      </div>

      {/* Email */}
      <Input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        required
        className="py-4 rounded-2xl border-2 dark:bg-gray-800/80"
      />

      {/* Phone */}
      <Input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => handleInputChange("phone", e.target.value)}
        required
        className="py-4 rounded-2xl border-2 dark:bg-gray-800/80"
      />

      {/* Password */}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          required
          className="py-4 pl-12 pr-12 rounded-2xl border-2 dark:bg-gray-800/80"
        />
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          required
          className="py-4 pl-12 pr-12 rounded-2xl border-2 dark:bg-gray-800/80"
        />
        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showConfirmPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {/* Agreements */}
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) => handleInputChange("agreedToTerms", e.target.checked)}
            className="accent-violet-600"
          />
          I agree to the{" "}
          <Link href="/terms" className="text-violet-600 hover:underline">
            Terms of Service
          </Link>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={formData.agreedToPrivacy}
            onChange={(e) => handleInputChange("agreedToPrivacy", e.target.checked)}
            className="accent-violet-600"
          />
          I agree to the{" "}
          <Link href="/privacy" className="text-violet-600 hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <Button
        type="button"
        onClick={handleNextStep}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold"
      >
        Continue to Health Information
      </Button>
    </motion.div>
  );

  // Step 2 (Health Info)
  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">
        Health Information (Optional)
      </h3>

      <Input
        type="date"
        value={formData.dateOfBirth}
        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
        className="py-4 rounded-2xl border-2 dark:bg-gray-800/80"
      />

      <Select
        value={formData.bloodGroup}
        onValueChange={(v) => handleInputChange("bloodGroup", v)}
      >
        <SelectTrigger className="py-4 rounded-2xl border-2 dark:bg-gray-800/80">
          <SelectValue placeholder="Select blood group" />
        </SelectTrigger>
        <SelectContent>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
            <SelectItem key={g} value={g}>
              {g}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="Allergies (comma separated)"
        value={formData.allergies}
        onChange={(e) => handleInputChange("allergies", e.target.value)}
        className="py-4 rounded-2xl border-2 dark:bg-gray-800/80"
      />

      <Input
        type="text"
        placeholder="Medical History (comma separated)"
        value={formData.medicalHistory}
        onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
        className="py-4 rounded-2xl border-2 dark:bg-gray-800/80"
      />

      {/* Emergency Contact */}
      <div className="space-y-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-700">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Contact className="w-4 h-4 text-blue-600" />
          Emergency Contact
        </h4>
        <Input
          type="text"
          placeholder="Name"
          value={formData.emergencyContactName}
          onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
        />
        <Input
          type="tel"
          placeholder="Phone"
          value={formData.emergencyContactPhone}
          onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Relationship"
          value={formData.emergencyContactRelationship}
          onChange={(e) => handleInputChange("emergencyContactRelationship", e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep(1)}
          className="flex-1 py-4 rounded-2xl border-2"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 py-4 rounded-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition-all"
        >
          {loading ? "Creating Account..." : "Create Patient Account"}
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-rose-50 to-cyan-50 dark:from-indigo-950/30 dark:via-rose-950/20 dark:to-cyan-950/30">
      <Container className="flex flex-col items-center justify-center w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8 p-8 rounded-3xl bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-800/60 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-3">
              Begin Your Healing Journey
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              Create your Patient Account
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep} of 2 • Your mental health matters
            </p>
          </motion.div>

          {/* Form */}
          <Card className="w-full p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-gray-200/40 dark:border-gray-700/40">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 ? renderStep1() : renderStep2()}
              {error && (
                <div className="mt-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 text-center font-medium">
                  <Heart className="inline w-4 h-4 mr-2" />
                  {error}
                </div>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-violet-600 font-semibold hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}
