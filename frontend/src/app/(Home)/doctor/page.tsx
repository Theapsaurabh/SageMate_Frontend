"use client";
import { Ripple } from "@/components/ui/ripple";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ChartBar,
  Shield,
  MessageCircle,
  FileText,
  Brain,
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function DoctorHomepage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description:
        "Comprehensive tools to manage and track your patients' mental health journeys",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Advanced analytics and patterns detection from patient conversations",
      color: "from-purple-500/20 to-violet-500/20",
    },
    {
      icon: ChartBar,
      title: "Progress Tracking",
      description:
        "Monitor patient progress with detailed metrics and visual reports",
      color: "from-emerald-500/20 to-green-500/20",
    },
    {
      icon: MessageCircle,
      title: "Secure Messaging",
      description:
        "HIPAA-compliant communication platform for patient interactions",
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      icon: FileText,
      title: "Clinical Notes",
      description:
        "Organized digital records and session notes with AI-assisted summaries",
      color: "from-rose-500/20 to-pink-500/20",
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description:
        "Enterprise-grade security ensuring complete patient data protection",
      color: "from-indigo-500/20 to-blue-500/20",
    },
  ];

  const benefits = [
    "Reduce administrative workload by 40%",
    "AI-assisted patient analysis",
    "Real-time progress monitoring",
    "Secure telehealth capabilities",
    "Automated session summaries",
    "Integrated treatment planning",
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      specialty: "Clinical Psychologist",
      text: "SageMate has transformed how I manage my practice. The AI insights help me understand patient patterns I might have missed.",
      rating: 5,
    },
    {
      name: "Dr. Michael Rodriguez",
      specialty: "Psychiatrist",
      text: "The progress tracking features save me hours each week. My patients love the continuity of care between sessions.",
      rating: 5,
    },
  ];

  const handleLogin = () => {
    router.push("/doctor/login");
  };

  const handleSignup = () => {
    router.push("/doctor/signup");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">
            Loading Doctor Portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center py-12 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[800px] h-[800px] rounded-full blur-3xl top-1/4 -left-60 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 dark:opacity-30" />
          <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl bottom-1/4 -right-40 bg-gradient-to-l from-cyan-500 to-blue-500 opacity-15 dark:opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-transparent dark:from-background/95 dark:via-background/90 dark:to-transparent" />

          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        <Ripple className="opacity-25 dark:opacity-100" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative space-y-12 text-center max-w-6xl mx-auto w-full"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-2xl px-6 py-3 text-sm border-2 border-primary/30 bg-white/80 dark:bg-background/80 backdrop-blur-xl shadow-2xl"
          >
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="font-bold text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text">
              Professional Mental Health Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="block bg-gradient-to-r from-gray-900 via-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-cyan-400">
                Enhanced Care
              </span>
              <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-gray-900 bg-clip-text text-transparent dark:from-cyan-400 dark:via-blue-400 dark:to-white mt-4">
                Through AI
              </span>
            </h1>

            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                Empower your practice with AI-driven insights and streamline
                patient care.
                <span className="font-semibold text-blue-600">
                  {" "}
                  Join 500+ professionals
                </span>{" "}
                revolutionizing mental health.
              </p>

              <div className="flex flex-wrap justify-center gap-6 pt-4">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <button
              onClick={handleSignup}
              className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-3">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={handleLogin}
              className="px-12 py-4 rounded-2xl border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-500/10 transition-all duration-300"
            >
              Sign In to Account
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pt-12"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
              Trusted by mental health professionals worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">500+ Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-white/50 dark:to-background/80">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Designed for Modern Practices
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
              Everything you need to enhance patient care and grow your practice
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 border-gray-200/50 dark:border-muted/30 hover:border-blue-300 dark:hover:border-blue-400/50 transition-all duration-500 h-[280px] bg-white/80 dark:bg-background/80 backdrop-blur-xl shadow-xl hover:shadow-2xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-background/50 backdrop-blur-sm border border-gray-200/50 dark:border-muted/30"
              >
                <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white/50 to-blue-50 dark:from-background/80 dark:to-blue-900/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent dark:from-white dark:to-blue-400">
              Trusted by Professionals
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-background/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-200/50 dark:border-blue-500/30 shadow-xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-6 leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {testimonial.specialty}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of mental health professionals using SageMate to
            provide better care and grow their practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={handleSignup}
              className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-3">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={handleLogin}
              className="px-12 py-4 rounded-2xl border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-500/10 transition-all duration-300"
            >
              Sign In to Existing Account
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No credit card required • 30-day free trial • Setup in minutes
          </p>
        </motion.div>
      </section>
    </div>
  );
}
