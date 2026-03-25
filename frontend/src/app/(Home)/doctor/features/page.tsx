"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { 
  Stethoscope, 
  Users, 
  FileText, 
  BarChart3, 
  Calendar,
  MessageSquare,
  Shield,
  Brain,
  Heart,
  Activity,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Play,
  Video,
  BookOpen,
  Settings,
  Eye,
  Download,
  GraduationCap,
  UserCheck,
  ClipboardList,
  
  Microscope,
  Target,
  Clock,
  Star,
  Award,
  Zap,
  Users2,
  BookmarkPlus,
  CalendarDays,
  ChartBar,
  FileCheck,
  BookText,
  VideoIcon,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Doctor features mapped to user features
const features = [
  {
    category: "Therapy Services", // User: "Mental Health"
    items: [
      {
        // User: "AI Therapy Sessions" -> Doctor: "Conduct Therapy Sessions"
        icon: MessageSquare,
        title: "Conduct Therapy Sessions",
        description: "Provide professional therapy sessions through secure video, audio, or chat platforms",
        benefits: ["Secure video calls", "Session notes", "Progress tracking", "Patient communication"],
        status: "live",
        path: "/doctor/sessions",
        color: "from-purple-500 to-purple-600",
        iconColor: "text-purple-500"
      },
      {
        // User: "Therapy Classes" -> Doctor: "Teach Therapy Classes"
        icon: GraduationCap,
        title: "Teach Therapy Classes",
        description: "Create and conduct structured therapy programs and group sessions for patients",
        benefits: ["Class management", "Student progress", "Materials upload", "Group sessions"],
        status: "live",
        path: "/doctor/classes",
        color: "from-indigo-500 to-indigo-600",
        iconColor: "text-indigo-500"
      },
      {
        // User: "Psychiatrist Connect" -> Doctor: "Provide Psychiatric Care"
        icon: UserCheck,
        title: "Provide Psychiatric Care",
        description: "Offer psychiatric evaluations, diagnosis, and medication management services",
        benefits: ["Clinical diagnosis", "Medication management", "Treatment plans", "Follow-up care"],
        status: "live",
        path: "/doctor/psychiatric-care",
        color: "from-blue-500 to-blue-600",
        iconColor: "text-blue-500"
      },
      {
        // User: "Book Therapy Session" -> Doctor: "Manage Session Bookings"
        icon: CalendarDays,
        title: "Manage Session Bookings",
        description: "Handle appointment scheduling, availability, and session management",
        benefits: ["Calendar management", "Booking approvals", "Session reminders", "Rescheduling"],
        status: "live",
        path: "/doctor/bookings",
        color: "from-green-500 to-green-600",
        iconColor: "text-green-500"
      },
      {
        // User: "Mood Tracking" -> Doctor: "Monitor Patient Mood"
        icon: Brain,
        title: "Monitor Patient Progress",
        description: "Track and analyze patient mood patterns, progress, and treatment outcomes",
        benefits: ["Progress charts", "Mood analytics", "Treatment response", "Alert system"],
        status: "live",
        path: "/doctor/patient-progress",
        color: "from-pink-500 to-pink-600",
        iconColor: "text-pink-500"
      },
      {
        // User: "Wellness Activities" -> Doctor: "Assign Wellness Activities"
        icon: Activity,
        title: "Assign Wellness Activities",
        description: "Create and assign therapeutic exercises, meditation, and mindfulness practices",
        benefits: ["Activity library", "Custom assignments", "Progress tracking", "Feedback system"],
        status: "live",
        path: "/doctor/activities",
        color: "from-emerald-500 to-emerald-600",
        iconColor: "text-emerald-500"
      }
    ]
  },
  {
    category: "Clinical Management", // User: "Tools & Games"
    items: [
      {
        // User: "Anxiety Relief Games" -> Doctor: "Prescribe Therapeutic Games"
        icon: Target,
        title: "Prescribe Therapeutic Exercises",
        description: "Assign evidence-based therapeutic games and exercises for patient anxiety relief",
        benefits: ["Exercise library", "Patient engagement", "Progress monitoring", "Effectiveness tracking"],
        status: "live",
        path: "/doctor/therapeutic-exercises",
        color: "from-orange-500 to-orange-600",
        iconColor: "text-orange-500"
      },
      {
        // User: "Therapeutic Journaling" -> Doctor: "Review Patient Journals"
        icon: BookText,
        title: "Review Patient Journals",
        description: "Access and provide feedback on patient therapeutic journal entries",
        benefits: ["Secure access", "Journal prompts", "Progress insights", "Private feedback"],
        status: "coming-soon",
        path: "/doctor/journals",
        color: "from-amber-500 to-amber-600",
        iconColor: "text-amber-500"
      },
      {
        // User: "Sound Therapy" -> Doctor: "Prescribe Sound Therapy"
        icon: VideoIcon,
        title: "Prescribe Media Therapy",
        description: "Recommend therapeutic soundscapes, music, and guided meditation to patients",
        benefits: ["Media library", "Custom prescriptions", "Usage tracking", "Effectiveness reports"],
        status: "coming-soon",
        path: "/doctor/media-therapy",
        color: "from-rose-500 to-rose-600",
        iconColor: "text-rose-500"
      }
    ]
  },
  {
    category: "Patient Analytics", // User: "Analytics & Progress"
    items: [
      {
        // User: "Progress Insights" -> Doctor: "Generate Patient Insights"
        icon: TrendingUp,
        title: "Generate Patient Insights",
        description: "Create detailed progress reports and treatment insights for your patients",
        benefits: ["Automated reports", "Progress trends", "Treatment effectiveness", "Outcome measures"],
        status: "live",
        path: "/doctor/patient-insights",
        color: "from-cyan-500 to-cyan-600",
        iconColor: "text-cyan-500"
      },
      {
        // User: "Therapy Analytics" -> Doctor: "Clinical Analytics"
        icon: ChartBar,
        title: "Clinical Performance Analytics",
        description: "Track therapy effectiveness and clinical outcomes across your patient base",
        benefits: ["Treatment success rates", "Patient outcomes", "Session analytics", "Practice metrics"],
        status: "live",
        path: "/doctor/clinical-analytics",
        color: "from-teal-500 to-teal-600",
        iconColor: "text-teal-500"
      },
      {
        // User: "Session Scheduling" -> Doctor: "Practice Schedule Management"
        icon: Calendar,
        title: "Practice Schedule Management",
        description: "Manage your clinical schedule, appointments, and patient sessions efficiently",
        benefits: ["Smart scheduling", "Availability settings", "Session types", "Waitlist management"],
        status: "live",
        path: "/doctor/schedule",
        color: "from-violet-500 to-violet-600",
        iconColor: "text-violet-500"
      }
    ]
  },
  {
    category: "Professional Network", // User: "Professional Support"
    items: [
      {
        // User: "Therapist Network" -> Doctor: "Professional Network"
        icon: Users2,
        title: "Professional Collaboration",
        description: "Connect with other mental health professionals for referrals and consultations",
        benefits: ["Secure messaging", "Case discussions", "Referral network", "Peer support"],
        status: "live",
        path: "/doctor/network",
        color: "from-sky-500 to-sky-600",
        iconColor: "text-sky-500"
      },
      {
        // User: "Crisis Resources" -> Doctor: "Crisis Management"
        icon: Shield,
        title: "Crisis Management Tools",
        description: "Access tools and protocols for managing patient crises and emergencies",
        benefits: ["Crisis protocols", "Emergency contacts", "Safety planning", "Resource directory"],
        status: "live",
        path: "/doctor/crisis-management",
        color: "from-red-500 to-red-600",
        iconColor: "text-red-500"
      },
      {
        // User: "Guided Therapy Sessions" -> Doctor: "Create Guided Sessions"
        icon: Video,
        title: "Create Guided Sessions",
        description: "Develop pre-recorded therapy sessions and educational content for patients",
        benefits: ["Content creation", "Patient access", "Progress tracking", "Supplemental materials"],
        status: "coming-soon",
        path: "/doctor/guided-sessions",
        color: "from-lime-500 to-lime-600",
        iconColor: "text-lime-500"
      }
    ]
  }
];

const practiceStats = [
  { number: "500+", label: "Active Doctors" },
  { number: "50K+", label: "Patients Served" },
  { number: "98%", label: "Satisfaction Rate" },
  { number: "24/7", label: "Platform Access" }
];

const clinicalTools = [
  {
    name: "AI-Assisted Treatment Planning",
    description: "Smart tools to help create personalized treatment plans based on patient data",
    icon: Brain,
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Evidence-Based Protocols",
    description: "Access to proven treatment protocols and clinical guidelines",
    icon: FileText,
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Outcome Measurement",
    description: "Track treatment progress and clinical outcomes with standardized tools",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Clinical Decision Support",
    description: "AI-powered insights to support diagnosis and treatment decisions",
    icon: Target,
    color: "from-orange-500 to-amber-500"
  }
];

export default function DoctorFeaturesPage() {
  const [activeCategory, setActiveCategory] = useState("Therapy Services");

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
                🏥 Professional Practice Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Provide Exceptional
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Mental Health Care</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Everything you need to manage your practice and deliver outstanding patient care. 
                From therapy sessions to clinical analytics, we provide the tools to excel in your practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Start Your Practice
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                  <Play className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Practice Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20"
        >
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {practiceStats.map((stat, index) => (
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

      {/* Clinical Tools Section */}
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Clinical Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Powered by AI and built on evidence-based practices to enhance your clinical work
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {clinicalTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <Container>
          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((category) => (
              <Button
                key={category.category}
                variant={activeCategory === category.category ? "default" : "outline"}
                onClick={() => setActiveCategory(category.category)}
                className={cn(
                  "rounded-full px-6 transition-all duration-300",
                  activeCategory === category.category &&
                    "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                )}
              >
                {category.category}
              </Button>
            ))}
          </motion.div>

          {/* Features Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features
                .find(cat => cat.category === activeCategory)
                ?.items.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
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
                            asChild
                          >
                            <Link href={feature.path}>
                              {feature.status === "live" ? "Start Using" : "Coming Soon"}
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800/50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Start Your Digital Practice
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Simple setup process to get your practice running in no time
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                icon: UserCheck,
                title: "Verify Credentials",
                description: "Complete professional verification and credential setup",
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                icon: Settings,
                title: "Setup Practice",
                description: "Configure your practice settings, specialties, and availability",
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                icon: Users,
                title: "Accept Patients",
                description: "Start accepting new patients or import existing ones",
                color: "from-green-500 to-emerald-500"
              },
              {
                step: "04",
                icon: Stethoscope,
                title: "Begin Practicing",
                description: "Start using all clinical tools and seeing patients",
                color: "from-orange-500 to-amber-500"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="text-center relative"
              >
                {/* Connecting line for desktop */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-100 dark:from-gray-600 dark:to-gray-800 -z-10" />
                )}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  STEP {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
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
              <Stethoscope className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of mental health professionals using our platform to enhance patient care and streamline their practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                  asChild
                >
                  <Link href="/doctor/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold"
                  asChild
                >
                  <Link href="/doctor/demo">
                    Schedule Demo
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-purple-200 mt-4">
                ✅ 30-day free trial • No credit card required
              </p>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}