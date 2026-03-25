"use client";
import { Ripple } from "@/components/ui/ripple";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Waves, 
  Heart, 
  Sparkles, 
  Lightbulb, 
  Clock,
  Shield,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
  Stethoscope,
  User,
  Brain,
  MessageCircle
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function CommonHomepage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userFeatures = [
    {
      icon: MessageCircle,
      title: "AI Chat Support",
      description: "24/7 compassionate AI companion for immediate emotional support",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Brain,
      title: "Personalized Insights",
      description: "AI-powered analysis of your emotional patterns and growth",
      color: "from-purple-500/20 to-violet-500/20",
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "Get support whenever you need it, no appointments needed",
      color: "from-emerald-500/20 to-green-500/20",
    },
  ];

  const doctorFeatures = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Efficiently manage and track your patients' progress",
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      icon: Stethoscope,
      title: "AI-Assisted Analysis",
      description: "Advanced tools to help analyze patient conversations and patterns",
      color: "from-rose-500/20 to-pink-500/20",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "HIPAA-compliant secure environment for patient data",
      color: "from-indigo-500/20 to-blue-500/20",
    },
  ];

  const benefits = [
    "Evidence-based therapeutic approaches",
    "Secure and confidential platform",
    "Real-time progress tracking",
    "Comprehensive analytics",
    "Easy-to-use interface",
    "Continuous platform updates"
  ];

  const handleUserLogin = () => {
    router.push("/login");
  };

  const handleDoctorLogin = () => {
    router.push("/doctor/login");
  };

  const handleUserSignup = () => {
    router.push("/signup");
  };

  const handleDoctorSignup = () => {
    router.push("/doctor/signup");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">Loading SageMate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Navigation */}
      
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center py-12 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[800px] h-[800px] rounded-full blur-3xl top-1/4 -left-60 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 dark:opacity-30" />
          <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl bottom-1/4 -right-40 bg-gradient-to-l from-purple-500 to-pink-500 opacity-15 dark:opacity-25" />
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
              AI-Powered Mental Health Platform
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
              <span className="block bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-primary dark:to-purple-400">
                Mental Health
              </span>
              <span className="block bg-gradient-to-r from-purple-600 via-primary to-gray-900 bg-clip-text text-transparent dark:from-purple-400 dark:via-primary dark:to-white mt-4">
                For Everyone
              </span>
            </h1>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                Bridging compassionate AI support with professional care. 
                <span className="font-semibold text-primary"> Join thousands</span> on their mental health journey.
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

          {/* Role Selection Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-8"
          >
            {/* User Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border-2 border-blue-200/50 dark:border-blue-500/30 p-8 cursor-pointer"
              onClick={handleUserSignup}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    I&apos;m a User
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Looking for emotional support and mental wellness guidance through our compassionate AI companion.
                </p>
                <ul className="space-y-3">
                  {userFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <feature.icon className="w-5 h-5 text-blue-500" />
                      <span>{feature.title}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full group/btn bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <span className="flex items-center justify-center gap-3">
                    Get Started as User
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Doctor Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-2 border-purple-200/50 dark:border-purple-500/30 p-8 cursor-pointer"
              onClick={handleDoctorSignup}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-300">
                    <Stethoscope className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    I&apos;m a Doctor
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Professional mental health provider looking to enhance patient care with AI-powered tools and insights.
                </p>
                <ul className="space-y-3">
                  {doctorFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <feature.icon className="w-5 h-5 text-purple-500" />
                      <span>{feature.title}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full group/btn bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <span className="flex items-center justify-center gap-3">
                    Join as Doctor
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Already have account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center space-y-4"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Already have an account? Choose your login:
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleUserLogin}
                className="px-8 py-3 rounded-2xl border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-500/10 transition-all duration-300"
              >
                User Login
              </button>
              <button 
                onClick={handleDoctorLogin}
                className="px-8 py-3 rounded-2xl border-2 border-purple-500 text-purple-600 dark:text-purple-400 font-semibold hover:bg-purple-500/10 transition-all duration-300"
              >
                Doctor Login
              </button>
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
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              One Platform, Complete Care
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
              SageMate brings together AI-powered support and professional care in one seamless ecosystem
            </p>
          </motion.div>
          
          {/* User Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              For <span className="text-blue-600">Users</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userFeatures.map((feature, index) => (
                <Card key={index} className="group relative overflow-hidden border-2 border-gray-200/50 dark:border-muted/30 hover:border-blue-300 dark:hover:border-blue-400/50 transition-all duration-500 h-[220px] bg-white/80 dark:bg-background/80 backdrop-blur-xl shadow-xl hover:shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
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
            </div>
          </motion.div>

          {/* Doctor Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              For <span className="text-purple-600">Doctors</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctorFeatures.map((feature, index) => (
                <Card key={index} className="group relative overflow-hidden border-2 border-gray-200/50 dark:border-muted/30 hover:border-purple-300 dark:hover:border-purple-400/50 transition-all duration-500 h-[220px] bg-white/80 dark:bg-background/80 backdrop-blur-xl shadow-xl hover:shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 transition-colors duration-300">
                        <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-background/50 backdrop-blur-sm border border-gray-200/50 dark:border-muted/30"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}