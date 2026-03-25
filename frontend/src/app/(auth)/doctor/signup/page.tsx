/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { doctorAuthApi } from "@/lib/api/doctor/doctorAuthApi";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Stethoscope, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Award,
  Calendar,
  FileText,
  Shield,
  CheckCircle2,
  Building,
  IdCard,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const specializations = [
  "Psychiatrist",
  "Clinical Psychologist",
  "Counseling Psychologist",
  "Therapist",
  "Psychotherapist",
  "Mental Health Counselor",
  "Addiction Specialist",
  "Child Psychologist",
  "Neuropsychologist",
  "Trauma Specialist",
  "Marriage and Family Therapist",
  "Other"
];

const qualifications = [
  "MD (Psychiatry)",
  "PhD (Psychology)",
  "PsyD",
  "MSc (Psychology)",
  "MA (Psychology)",
  "MSW",
  "LMHC",
  "LCSW",
  "LMFT",
  "Other"
];

const experienceYears = [
  "0-2 years",
  "3-5 years",
  "6-10 years",
  "11-15 years",
  "16-20 years",
  "20+ years"
];

const licenseTypes = [
  "State Medical License",
  "Board Certified",
  "Licensed Psychologist",
  "Licensed Clinical Social Worker",
  "Licensed Professional Counselor",
  "Other"
];

export default function DoctorSignup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    
    // Professional Information
    specialization: "",
    qualification: "",
    licenseNumber: "",
    licenseType: "",
    licenseState: "",
    experience: "",
    bio: "",
    
    // Practice Information
    practiceName: "",
    practiceAddress: "",
    practicePhone: "",
    website: "",
    
    // Availability
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    consultationFee: "",
    
    // Terms
    agreeToTerms: false,
    agreeToPrivacy: false,
    confirmCredentials: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: checked
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validate passwords match
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords don't match");
    return;
  }

  // Validate terms
  if (!formData.agreeToTerms || !formData.agreeToPrivacy || !formData.confirmCredentials) {
    alert("Please agree to all terms and confirm your credentials");
    return;
  }

  try {
    // Convert availability object → array of selected days
    const availabilityDays = Object.entries(formData.availability)
      .filter(([_, checked]) => checked)
      .map(([day]) => day);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      password: formData.password,

      specialization: formData.specialization,
      qualification: formData.qualification,
      licenseNumber: formData.licenseNumber,
      licenseType: formData.licenseType,
      experience: formData.experience,

      practiceName: formData.practiceName,
      practiceAddress: formData.practiceAddress,
      availability: availabilityDays,
      consultationFee: formData.consultationFee,
    };

    console.log("📨 Sending doctor register payload:", payload);

    const response = await doctorAuthApi.registerDoctor(payload);

    console.log("✅ Registration success:", response);

    router.push("/doctor/verification");

  } catch (error: any) {
    console.error("❌ Registration failed:", error);
    alert(error.message || "Registration failed. Try again.");
  }
};


  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && 
               formData.phone && formData.password && formData.confirmPassword;
      case 2:
        return formData.specialization && formData.qualification && 
               formData.licenseNumber && formData.licenseType && formData.experience;
      case 3:
        return formData.practiceName && formData.practiceAddress;
      case 4:
        return Object.values(formData.availability).some(day => day) && 
               formData.consultationFee && formData.agreeToTerms && 
               formData.agreeToPrivacy && formData.confirmCredentials;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 py-8">
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-4"
      >
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Join as a Professional
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your professional profile to start practicing on SageMate
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8 relative">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step >= stepNumber 
                    ? "bg-purple-600 border-purple-600 text-white" 
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400"
                }`}>
                  {step > stepNumber ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  step >= stepNumber ? "text-purple-600 dark:text-purple-400" : "text-gray-500"
                }`}>
                  {stepNumber === 1 && "Personal"}
                  {stepNumber === 2 && "Professional"}
                  {stepNumber === 3 && "Practice"}
                  {stepNumber === 4 && "Terms"}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
              <div 
                className="h-full bg-purple-600 transition-all duration-300"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Professional Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="doctor@clinic.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Create a password"
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirm your password"
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Professional Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  Professional Credentials
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialization" className="text-sm font-medium">
                      Specialization *
                    </Label>
                    <Select value={formData.specialization} onValueChange={(value) => handleInputChange("specialization", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification" className="text-sm font-medium">
                      Highest Qualification *
                    </Label>
                    <Select value={formData.qualification} onValueChange={(value) => handleInputChange("qualification", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualifications.map((qual) => (
                          <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licenseType" className="text-sm font-medium">
                      License Type *
                    </Label>
                    <Select value={formData.licenseType} onValueChange={(value) => handleInputChange("licenseType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        {licenseTypes.map((license) => (
                          <SelectItem key={license} value={license}>{license}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber" className="text-sm font-medium flex items-center gap-2">
                      <IdCard className="w-4 h-4" />
                      License Number *
                    </Label>
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                      placeholder="Enter your license number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseState" className="text-sm font-medium">
                    Licensing State/Region
                  </Label>
                  <Input
                    id="licenseState"
                    value={formData.licenseState}
                    onChange={(e) => handleInputChange("licenseState", e.target.value)}
                    placeholder="State or region where licensed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Years of Experience *
                  </Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceYears.map((exp) => (
                        <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Professional Bio
                  </Label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Briefly describe your professional background, approach, and specialties..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Practice Information */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-600" />
                  Practice Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="practiceName" className="text-sm font-medium flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Practice/Clinic Name *
                  </Label>
                  <Input
                    id="practiceName"
                    value={formData.practiceName}
                    onChange={(e) => handleInputChange("practiceName", e.target.value)}
                    placeholder="Enter your practice or clinic name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="practiceAddress" className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Practice Address *
                  </Label>
                  <textarea
                    id="practiceAddress"
                    value={formData.practiceAddress}
                    onChange={(e) => handleInputChange("practiceAddress", e.target.value)}
                    placeholder="Full practice address"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="practicePhone" className="text-sm font-medium">
                      Practice Phone
                    </Label>
                    <Input
                      id="practicePhone"
                      type="tel"
                      value={formData.practicePhone}
                      onChange={(e) => handleInputChange("practicePhone", e.target.value)}
                      placeholder="Practice phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium">
                      Website (Optional)
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Availability & Terms */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Availability & Terms
                </h3>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Availability Days *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(formData.availability).map(([day, checked]) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={checked}
                          onCheckedChange={(isChecked: boolean | "indeterminate") => handleAvailabilityChange(day, isChecked as boolean)}
                        />
                        <Label htmlFor={day} className="text-sm capitalize cursor-pointer">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultationFee" className="text-sm font-medium">
                    Consultation Fee (per session) *
                  </Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    value={formData.consultationFee}
                    onChange={(e) => handleInputChange("consultationFee", e.target.value)}
                    placeholder="Enter fee in your local currency"
                    required
                  />
                </div>

                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked: boolean | "indeterminate") => handleInputChange("agreeToTerms", checked)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms" className="text-purple-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/professional-standards" className="text-purple-600 hover:underline">
                        Professional Standards
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onCheckedChange={(checked: boolean | "indeterminate") => handleInputChange("agreeToPrivacy", checked)}
                    />
                    <Label htmlFor="agreeToPrivacy" className="text-sm cursor-pointer">
                      I agree to the{" "}
                      <Link href="/privacy" className="text-purple-600 hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      and understand how my data will be used
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="confirmCredentials"
                      checked={formData.confirmCredentials}
                      onCheckedChange={(checked: boolean | "indeterminate") => handleInputChange("confirmCredentials", checked)}
                    />
                    <Label htmlFor="confirmCredentials" className="text-sm cursor-pointer">
                      I confirm that all provided credentials are accurate and I am legally permitted to practice
                    </Label>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                        Credential Verification
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Your credentials will be verified within 2-3 business days. 
                        You&apos;ll receive email notification once your account is approved.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className={step === 1 ? "invisible" : ""}
              >
                Previous
              </Button>

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isStepValid()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Complete Registration
                </Button>
              )}
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have a professional account?{" "}
            <Link href="/doctor/login" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-semibold transition-colors">
              Sign in here
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}