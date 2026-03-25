"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { 
  Brain, 
  Heart, 
  MessageSquare, 
  Activity, 
  TrendingUp, 
  Calendar,
  Gamepad2,
  BarChart3,
  Users,
  Shield,
  Zap,
  Sparkles,
  Clock,
  Target,
  CheckCircle2,
  ArrowRight,
  Play,
  BookOpen,
  Video,
  Music,
  Headphones,
  Moon,
  Sun,
  GraduationCap,
  UserCheck,
  Bookmark,
  Clock4,
  Stethoscope,
  FileText,
  ClipboardList,
  Microscope
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const userFeatures = [
  {
    category: "Mental Health Support",
    items: [
      {
        icon: MessageSquare,
        title: "AI Therapy Sessions",
        description: "24/7 access to AI-powered therapy sessions for immediate support and guidance",
        benefits: ["Personalized responses", "Confidential & secure", "Available anytime", "Progress tracking"],
        status: "live",
        path: "/login",
        color: "from-purple-500 to-purple-600",
        iconColor: "text-purple-500"
      },
      {
        icon: GraduationCap,
        title: "Therapy Classes",
        description: "Structured therapy programs and classes for specific mental health challenges",
        benefits: ["CBT techniques", "DBT skills", "Mindfulness training", "Group sessions"],
        status: "live",
        path: "/login",
        color: "from-indigo-500 to-indigo-600",
        iconColor: "text-indigo-500"
      },
      {
        icon: UserCheck,
        title: "Connect with Professionals",
        description: "Connect with licensed therapists and psychiatrists for professional care",
        benefits: ["Licensed professionals", "Video sessions", "Clinical diagnosis", "Follow-up care"],
        status: "live",
        path: "/login",
        color: "from-blue-500 to-blue-600",
        iconColor: "text-blue-500"
      },
      {
        icon: Brain,
        title: "Mood Tracking",
        description: "Track your emotional wellbeing with daily mood assessments and insights",
        benefits: ["Visual mood charts", "Pattern recognition", "Progress tracking", "Trigger identification"],
        status: "live",
        path: "/login",
        color: "from-pink-500 to-pink-600",
        iconColor: "text-pink-500"
      },
    ]
  },
  {
    category: "Wellness Tools",
    items: [
      {
        icon: Activity,
        title: "Wellness Activities",
        description: "Curated mental wellness exercises including meditation, breathing, and mindfulness",
        benefits: ["Guided sessions", "Progress tracking", "Personalized recommendations", "Daily reminders"],
        status: "live",
        path: "/login",
        color: "from-emerald-500 to-emerald-600",
        iconColor: "text-emerald-500"
      },
      {
        icon: Gamepad2,
        title: "Anxiety Relief Games",
        description: "Interactive games designed to reduce anxiety and improve mental focus",
        benefits: ["Instant stress relief", "Cognitive exercises", "Fun & engaging", "Progress tracking"],
        status: "live",
        path: "/login",
        color: "from-orange-500 to-orange-600",
        iconColor: "text-orange-500"
      },
      {
        icon: BookOpen,
        title: "Therapeutic Journaling",
        description: "Digital journal with prompts for self-reflection and emotional processing",
        benefits: ["Private entries", "Therapeutic prompts", "Search & organize", "Mood correlation"],
        status: "coming-soon",
        path: "/login",
        color: "from-amber-500 to-amber-600",
        iconColor: "text-amber-500"
      },
    ]
  }
];

const doctorFeatures = [
  {
    category: "Practice Management",
    items: [
      {
        icon: Users,
        title: "Patient Dashboard",
        description: "Comprehensive overview of all your patients with real-time updates and progress tracking",
        benefits: ["Patient profiles", "Progress tracking", "Session history", "Treatment plans"],
        status: "live",
        path: "/doctor-login",
        color: "from-blue-500 to-blue-600",
        iconColor: "text-blue-500"
      },
      {
        icon: FileText,
        title: "Clinical Notes",
        description: "Secure digital clinical notes with templates for different therapy approaches",
        benefits: ["Custom templates", "Secure storage", "Easy search", "Progress tracking"],
        status: "live",
        path: "/doctor-login",
        color: "from-emerald-500 to-emerald-600",
        iconColor: "text-emerald-500"
      },
      {
        icon: ClipboardList,
        title: "Assessment Tools",
        description: "Standardized psychological assessments and diagnostic tools",
        benefits: ["PHQ-9, GAD-7", "Automated scoring", "Progress charts", "Export reports"],
        status: "live",
        path: "/doctor-login",
        color: "from-purple-500 to-purple-600",
        iconColor: "text-purple-500"
      },
    ]
  },
  {
    category: "Professional Tools",
    items: [
      {
        icon: Stethoscope,
        title: "Teletherapy Platform",
        description: "Secure video conferencing and messaging platform for remote sessions",
        benefits: ["HD video calls", "Secure messaging", "Screen sharing", "Session recording"],
        status: "live",
        path: "/doctor-login",
        color: "from-violet-500 to-violet-600",
        iconColor: "text-violet-500"
      },
      {
        icon: BarChart3,
        title: "Practice Analytics",
        description: "Comprehensive practice performance metrics and financial analytics",
        benefits: ["Revenue tracking", "Patient metrics", "Session analytics", "Performance insights"],
        status: "live",
        path: "/doctor-login",
        color: "from-teal-500 to-teal-600",
        iconColor: "text-teal-500"
      },
      {
        icon: Microscope,
        title: "Clinical Research",
        description: "Access to latest research and evidence-based treatment protocols",
        benefits: ["Journal access", "Treatment guidelines", "Research updates", "Clinical trials"],
        status: "coming-soon",
        path: "/doctor-login",
        color: "from-orange-500 to-orange-600",
        iconColor: "text-orange-500"
      },
    ]
  }
];

const platformStats = [
  { number: "10K+", label: "Users Helped" },
  { number: "500+", label: "Doctors Partnered" },
  { number: "95%", label: "Satisfaction Rate" },
  { number: "24/7", label: "Support Available" }
];

const therapyApproaches = [
  {
    name: "AI-Powered Support",
    description: "Advanced AI tools for immediate mental health support and guidance",
    icon: Brain,
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Professional Care",
    description: "Connect with licensed mental health professionals when needed",
    icon: Stethoscope,
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Evidence-Based Methods",
    description: "All tools built on proven therapeutic techniques and clinical research",
    icon: FileText,
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Complete Ecosystem",
    description: "Seamless integration between self-care tools and professional services",
    icon: Users,
    color: "from-orange-500 to-amber-500"
  }
];

export default function CommonFeaturesPage() {
  const [activeTab, setActiveTab] = useState<"user" | "doctor">("user");
  const router = useRouter();

  const features = activeTab === "user" ? userFeatures : doctorFeatures;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
                🏥 Complete Mental Health Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Features for
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Everyone</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Whether you&apos;re seeking mental health support or providing professional care, 
                SageMate offers comprehensive tools for your wellness journey.
              </p>
              
              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                <Button
                  variant={activeTab === "user" ? "default" : "outline"}
                  onClick={() => setActiveTab("user")}
                  className={cn(
                    "rounded-full px-6 transition-all duration-300",
                    activeTab === "user" &&
                      "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  )}
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  For Users
                </Button>
                <Button
                  variant={activeTab === "doctor" ? "default" : "outline"}
                  onClick={() => setActiveTab("doctor")}
                  className={cn(
                    "rounded-full px-6 transition-all duration-300",
                    activeTab === "doctor" &&
                      "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  )}
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  For Doctors
                </Button>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => router.push("/login")}
                >
                  Get Started as User
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => router.push("/doctor-login")}
                >
                  Join as Professional
                  <Stethoscope className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Platform Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20"
        >
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {platformStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </motion.div>
      </section>

      {/* Platform Approach Section */}
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Mental Health Approach
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Combining AI-powered tools with professional care for complete mental wellness support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {therapyApproaches.map((approach, index) => (
              <motion.div
                key={approach.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${approach.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <approach.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {approach.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {approach.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Navigation */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {features.map((category) => (
                  <Button
                    key={category.category}
                    variant="outline"
                    className="rounded-full px-6 transition-all duration-300"
                  >
                    {category.category}
                  </Button>
                ))}
              </div>

              {/* Features Grid */}
              <div className="space-y-12">
                {features.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                      {category.category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.items.map((feature, index) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: categoryIndex * 0.2 + index * 0.1 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <Card className="h-full border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl group">
                            <CardHeader className="pb-4">
                              <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                  <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <Badge 
                                  variant={feature.status === "live" ? "default" : "secondary"}
                                  className={cn(
                                    feature.status === "live" 
                                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                  )}
                                >
                                  {feature.status === "live" ? "Live" : "Coming Soon"}
                                </Badge>
                              </div>
                              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {feature.title}
                              </CardTitle>
                              <CardDescription className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                {feature.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <ul className="space-y-2 mb-6">
                                {feature.benefits.map((benefit, i) => (
                                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                              <div className="flex items-center justify-between">
                                <Button
                                  variant={feature.status === "live" ? "default" : "outline"}
                                  disabled={feature.status !== "live"}
                                  className={cn(
                                    "w-full",
                                    feature.status === "live" && 
                                      "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                  )}
                                  onClick={() => router.push(feature.path)}
                                >
                                  {feature.status === "live" ? "Get Started" : "Coming Soon"}
                                  <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                <UserCheck className="w-12 h-12 text-yellow-300" />
                <Stethoscope className="w-12 h-12 text-yellow-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join Our Community?
              </h2>
              <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                Whether you&apos;re seeking support or providing care, join thousands who trust SageMate for their mental wellness journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                  onClick={() => router.push("/login")}
                >
                  Get Started as User
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold"
                  onClick={() => router.push("/doctor-login")}
                >
                  Join as Professional
                  <Stethoscope className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-purple-200 mt-4">
                ✅ Free trial available • Secure platform • 24/7 support
              </p>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}