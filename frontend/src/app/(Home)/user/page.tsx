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
  MessageCircle,
  Video,
  BookOpen,
  Users2,
  GamepadIcon,
  Calendar,
  Activity
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

// Temporary mock hook - replace with your actual auth hook
const useSession = () => {
  return {
    isAuthenticated: false,
    loading: false,
    user: null
  };
};

interface EmotionType {
  value: number;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
  gradient: string;
}

export default function Home() {
  const { isAuthenticated, loading, user } = useSession();
  const router = useRouter();

  const emotions: EmotionType[] = [
    {
      value: 0,
      label: "😢 Struggling",
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50 border-indigo-200 dark:bg-indigo-500/20 dark:border-indigo-400/30",
      textColor: "text-indigo-700 dark:text-indigo-300",
      description: "Need immediate support",
      gradient: "from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-900/20 dark:via-blue-900/20 dark:to-purple-900/20"
    },
    {
      value: 25,
      label: "😔 Overwhelmed",
      color: "from-slate-500 to-blue-500",
      bgColor: "bg-slate-50 border-slate-200 dark:bg-slate-500/20 dark:border-slate-400/30",
      textColor: "text-slate-700 dark:text-slate-300",
      description: "Feeling stressed and anxious",
      gradient: "from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900/20 dark:via-blue-900/20 dark:to-cyan-900/20"
    },
    {
      value: 50,
      label: "😐 Managing",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/20 dark:border-emerald-400/30",
      textColor: "text-emerald-700 dark:text-emerald-300",
      description: "Coping but could use support",
      gradient: "from-emerald-50 via-teal-50 to-green-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-green-900/20"
    },
    {
      value: 75,
      label: "🙂 Stable",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 border-amber-200 dark:bg-amber-500/20 dark:border-amber-400/30",
      textColor: "text-amber-700 dark:text-amber-300",
      description: "Doing well, maintaining balance",
      gradient: "from-amber-50 via-orange-50 to-red-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20"
    },
    {
      value: 100,
      label: "😄 Thriving",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50 border-rose-200 dark:bg-rose-500/20 dark:border-rose-400/30",
      textColor: "text-rose-700 dark:text-rose-300",
      description: "Feeling positive and growing",
      gradient: "from-rose-50 via-pink-50 to-fuchsia-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-fuchsia-900/20"
    },
  ];

  // Support categories based on your requirements
  const supportCategories = [
    {
      id: "one-on-one",
      icon: MessageCircle,
      title: "1-on-1 Sessions",
      description: "Private sessions with licensed specialists",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-500/10",
      features: ["Video calls", "Personalized treatment", "Ongoing support"],
      action: "Book Session"
    },
    {
      id: "group-classes",
      icon: Users2,
      title: "Group Classes",
      description: "Learn and heal together in supportive groups",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-500/10",
      features: ["Weekly workshops", "Peer support", "Themed groups"],
      action: "Join Class"
    },
    {
      id: "recorded-courses",
      icon: Video,
      title: "Self-Paced Courses",
      description: "Access therapeutic content anytime",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-500/10",
      features: ["Video lessons", "Worksheets", "Progress tracking"],
      action: "Browse Courses"
    },
    {
      id: "community",
      icon: Users,
      title: "Community Support",
      description: "Connect with others facing similar challenges",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-500/10",
      features: ["Support groups", "Discussion forums", "Events"],
      action: "Join Community"
    },
    {
      id: "activities",
      icon: Activity,
      title: "Daily Activities",
      description: "Therapeutic exercises and challenges",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-500/10",
      features: ["Mindfulness", "Journaling", "Wellness challenges"],
      action: "Start Activities"
    },
    {
      id: "games",
      icon: GamepadIcon,
      title: "Therapeutic Games",
      description: "Engaging tools for mental wellness",
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-500/10",
      features: ["Mood tracking", "Stress relief", "Skill building"],
      action: "Play Games"
    }
  ];

  // Problem areas for specialist matching
  const problemAreas = [
    {
      id: "relationship",
      name: "Relationship Issues",
      icon: "💑",
      specialists: 45,
      description: "Couples, family, and interpersonal challenges"
    },
    {
      id: "career",
      name: "Career & Work Stress",
      icon: "💼",
      specialists: 32,
      description: "Burnout, career changes, workplace issues"
    },
    {
      id: "anxiety",
      name: "Anxiety & Stress",
      icon: "🌪️",
      specialists: 28,
      description: "Worry, panic attacks, general anxiety"
    },
    {
      id: "depression",
      name: "Depression & Mood",
      icon: "☁️",
      specialists: 36,
      description: "Low mood, motivation, emotional regulation"
    },
    {
      id: "student",
      name: "Student Challenges",
      icon: "🎓",
      specialists: 24,
      description: "Academic stress, career choices, time management"
    },
    {
      id: "personal-growth",
      name: "Personal Growth",
      icon: "🌱",
      specialists: 29,
      description: "Self-esteem, habits, life transitions"
    }
  ];

  const features = [
    {
      icon: Users2,
      title: "Multiple Support Formats",
      description: "Choose from 1-on-1, group classes, self-paced courses, and community support",
      color: "from-blue-500/20 to-cyan-500/20",
      delay: 0.2,
    },
    {
      icon: Shield,
      title: "Verified Specialists",
      description: "All therapists and coaches are licensed and background-checked",
      color: "from-emerald-500/20 to-green-500/20",
      delay: 0.4,
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule, available 24/7",
      color: "from-purple-500/20 to-violet-500/20",
      delay: 0.6,
    },
    {
      icon: BookOpen,
      title: "Evidence-Based Methods",
      description: "Proven therapeutic techniques and continuous progress tracking",
      color: "from-amber-500/20 to-orange-500/20",
      delay: 0.8,
    },
  ];

  const benefits = [
    "Match with specialists based on your specific needs",
    "Join supportive communities to combat loneliness",
    "Access therapeutic content anytime, anywhere",
    "Track your progress with interactive tools",
    "Choose from multiple affordable pricing options",
    "100% confidential and secure platform"
  ];

  const [emotion, setEmotion] = useState<number>(50);
  const [mounted, setMounted] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartJourney = () => {
    if (isAuthenticated) {
      router.push("/user/dashboard");
    } else {
      router.push("/user/login");
    }
  };

  // FIXED: This function now correctly handles problem selection
  const handleProblemSelect = (problemId: string) => {
    setSelectedProblem(problemId);
    if (isAuthenticated) {
      // User is logged in - go directly to filtered specialists
      router.push(`/user/specialists?problem=${problemId}`);
    } else {
      // User not logged in - go to login with redirect to specialists
      router.push(`/user/login?redirect=specialists&problem=${problemId}`);
    }
  };

  // FIXED: Corrected the routing logic
  const handleSupportCategory = (categoryId: string) => {
    if (isAuthenticated) {
      router.push(`/user/dashboard/${categoryId}`);
    } else {
      router.push(`/user/login?redirect=${categoryId}`);
    }
  };

  const currentEmotion = emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen overflow-hidden bg-gradient-to-br ${currentEmotion.gradient} transition-all duration-1000 ease-in-out`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute w-[800px] h-[800px] rounded-full blur-3xl top-1/4 -left-60 transition-all duration-1000 ease-in-out bg-gradient-to-r ${currentEmotion.color} opacity-20 dark:opacity-30`}
          />
          <div
            className={`absolute w-[600px] h-[600px] rounded-full blur-3xl bottom-1/4 -right-40 transition-all duration-1000 ease-in-out delay-300 bg-gradient-to-l ${currentEmotion.color} opacity-15 dark:opacity-25`}
          />
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
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative space-y-12 text-center max-w-6xl mx-auto w-full"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-4 rounded-2xl px-8 py-4 text-base border-2 border-primary/30 bg-white/80 dark:bg-background/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl hover:border-primary/50 transition-all duration-500 group cursor-pointer"
            onClick={handleStartJourney}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm" />
              </div>
              <span className="font-bold text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text">
                Comprehensive Mental Wellness Platform
              </span>
            </div>
            <Heart className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors duration-300 group-hover:scale-110" />
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight">
              <span className="block bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-primary dark:to-purple-400">
                Find Your
              </span>
              <span className="block bg-gradient-to-r from-purple-600 via-primary to-gray-900 bg-clip-text text-transparent dark:from-purple-400 dark:via-primary dark:to-white mt-4">
                Perfect Support
              </span>
            </h1>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                Personalized mental wellness with specialists, group classes, and community support
                <span className="font-semibold text-primary"> tailored to your needs</span>.
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

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto py-8"
          >
            {[
              { number: "200+", label: "Specialists", icon: Users },
              { number: "50+", label: "Group Classes", icon: Users2 },
              { number: "10K+", label: "Members Helped", icon: Heart }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center space-y-2 p-4 rounded-2xl bg-white/50 dark:bg-background/50 backdrop-blur-sm border border-gray-200/50 dark:border-muted/30"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Problem Area Selection */}
          <motion.div
            className="w-full max-w-6xl mx-auto space-y-8 py-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
                <Lightbulb className="w-6 h-6 text-primary" />
                <span className="font-semibold text-lg uppercase tracking-widest">
                  What would you like support with?
                </span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600" />
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                Choose your focus area to match with the right specialists and resources
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {problemAreas.map((problem) => (
                <motion.button
                  key={problem.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleProblemSelect(problem.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center backdrop-blur-sm ${
                    selectedProblem === problem.id
                      ? "bg-primary/10 border-primary/50 shadow-lg scale-105"
                      : "bg-white/70 border-gray-200/50 dark:bg-background/40 dark:border-muted/30 hover:border-primary/30"
                  }`}
                >
                  <div className="text-3xl mb-2">{problem.icon}</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {problem.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {problem.specialists} specialists
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Support Categories */}
          <motion.div
            className="w-full max-w-6xl mx-auto space-y-8 py-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
                <Users2 className="w-6 h-6 text-primary" />
                <span className="font-semibold text-lg uppercase tracking-widest">
                  Choose Your Support Style
                </span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600" />
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                Multiple ways to get support based on your preferences and needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportCategories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => handleSupportCategory(category.id)}
                >
                  <Card className="relative overflow-hidden border-2 border-gray-200/50 dark:border-muted/30 hover:border-primary/30 transition-all duration-500 h-full bg-white/80 dark:bg-background/80 backdrop-blur-xl shadow-xl hover:shadow-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${category.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                          <category.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                            {category.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg transition-colors duration-300">
                        {category.action}
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-center pt-8"
          >
            <button 
              onClick={handleStartJourney}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-12 py-6 text-xl font-bold text-white shadow-3xl hover:shadow-4xl transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] group-hover:bg-[length:100%_100%] transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center gap-4">
                <Heart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                {isAuthenticated ? "Go to Dashboard" : "Start Your Healing Journey"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-white/50 dark:to-background/80">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16 space-y-6">
            <h2 className="text-5xl font-black bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
              A comprehensive ecosystem for mental wellness with multiple support options
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="group relative overflow-hidden border-2 border-gray-200/50 dark:border-muted/30 hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 h-[220px] bg-white/80 dark:bg-background/80 backdrop-blur-xl shadow-xl hover:shadow-2xl">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                        <feature.icon className="w-6 h-6 text-primary dark:text-primary/90" />
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
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6"
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
    </div>
  );
}