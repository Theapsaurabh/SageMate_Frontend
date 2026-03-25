/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  Calendar,
  Heart,
 
  MessageSquare,
  Sparkles,
  Sun,
  Trophy,
  
  
  Activity,
  Target,
  ChevronRight,
  Zap,
  
  Video,
  BookOpen,
  Users,
  Phone,
  Star,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, isToday, isTomorrow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AnxietyGames } from "@/components/games/anxiety-games";
import { MoodForm } from "@/components/mood/mood-form";
import { ActivityLogger } from "@/components/activities/activity-logger";

// Mock data for new features
const mockTherapists = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    specialization: "Clinical Psychologist",
    rating: 4.9,
    patients: 245,
    experience: "8 years",
    avatar: "👩‍⚕️",
    isOnline: true,
    nextAvailable: "2:30 PM Today",
  },
  {
    id: "2",
    name: "Dr. Michael Rodriguez",
    specialization: "Cognitive Behavioral Therapy",
    rating: 4.8,
    patients: 189,
    experience: "6 years",
    avatar: "👨‍⚕️",
    isOnline: false,
    nextAvailable: "10:00 AM Tomorrow",
  },
];

const mockUpcomingSessions = [
  {
    id: "1",
    therapist: "Dr. Sarah Chen",
    date: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    duration: 50,
    type: "Video Call",
    status: "confirmed",
  },
  {
    id: "2",
    therapist: "Dr. Michael Rodriguez",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    duration: 50,
    type: "Voice Call",
    status: "confirmed",
  },
];

const mockCourses = [
  {
    id: "1",
    title: "Managing Anxiety & Stress",
    instructor: "Dr. Sarah Chen",
    progress: 75,
    duration: "4 weeks",
    lessons: 12,
    completedLessons: 9,
    category: "Anxiety",
    image: "🧘‍♀️",
  },
  {
    id: "2",
    title: "Mindfulness Meditation",
    instructor: "Dr. James Wilson",
    progress: 30,
    duration: "6 weeks",
    lessons: 18,
    completedLessons: 6,
    category: "Meditation",
    image: "🌿",
  },
  {
    id: "3",
    title: "Building Resilience",
    instructor: "Dr. Emily Davis",
    progress: 10,
    duration: "8 weeks",
    lessons: 24,
    completedLessons: 2,
    category: "Personal Growth",
    image: "💪",
  },
];

interface UpcomingActivity {
  _id: string;
  type: string;
  name: string;
  description?: string;
  duration: number;
  difficulty: number;
  scheduledFor: string;
  status: string;
  timestamp?: string;
}

// Client-only time display component
function CurrentTime() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-sm text-gray-500 dark:text-gray-500 font-mono">
      {currentTime || '--:--:--'}
    </p>
  );
}

// Client-only date display component
function CurrentDate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(format(new Date(), "EEEE, MMMM d, yyyy"));
  }, []);

  return (
    <p className="text-lg text-gray-600 dark:text-gray-400">
      {currentDate}
    </p>
  );
}

// Client-only greeting component
function DynamicGreeting() {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
      {greeting},
    </h1>
  );
}

export default function UserDashboard() {
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [isSavingMood, setIsSavingMood] = useState(false);
  const [showActivity, setShowActivityLogger] = useState(false);
  const [moodScore, setMoodScore] = useState<number | null>(null);
  const [upcomingActivities, setUpcomingActivities] = useState<UpcomingActivity[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [activityStats, setActivityStats] = useState<any>(null);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Mock data fetch - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      setActivitiesLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUpcomingActivities([]);
        setRecentActivities([]);
        setActivityStats({
          summary: {
            totalActivities: 12,
            upcomingCount: 2,
          },
          byType: [
            { type: 'meditation', count: 4, totalDuration: 60, avgDifficulty: 3 },
            { type: 'exercise', count: 3, totalDuration: 45, avgDifficulty: 6 },
            { type: 'journaling', count: 5, totalDuration: 25, avgDifficulty: 2 },
          ]
        });
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setActivitiesLoading(false);
        setStatsLoading(false);
      }
    };

    fetchData();
  }, []);

  const wellnessStats = [
    {
      title: "Mood Score",
      value: moodScore !== null ? `${moodScore}/10` : "Not set",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-200 dark:border-purple-800",
      description: "Today's average mood",
      trend: moodScore !== null ? "+2 from yesterday" : "Track your mood",
    },
    {
      title: "Therapy Sessions",
      value: "4",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-200 dark:border-blue-800",
      description: "This month",
      trend: "2 upcoming sessions",
    },
    {
      title: "Course Progress",
      value: "65%",
      icon: BookOpen,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-200 dark:border-green-800",
      description: "Overall completion",
      trend: "3 courses active",
    },
    {
      title: "Activities Completed",
      value: activityStats ? `${activityStats.summary.totalActivities}` : "0",
      icon: Trophy,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-200 dark:border-amber-800",
      description: "This week",
      trend: activityStats ? `${activityStats.summary.upcomingCount} upcoming` : "Loading...",
    },
  ];

  const quickActions = [
    {
      title: "My Therapist",
      description: "Chat or video call with your therapist",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-500",
      onClick: () => router.push("/user/id/therapist"),
    },
    {
      title: "Therapy Sessions",
      description: "View upcoming sessions",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      iconColor: "text-purple-500",
      onClick: () => router.push("/user/id/session"),
    },
    {
      title: "My Courses",
      description: "Continue your learning journey",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
      iconColor: "text-green-500",
      onClick: () => router.push("/user/id/course"),
    },
    {
      title: "Mood Tracking",
      description: "Log your current emotional state",
      icon: Heart,
      color: "from-rose-500 to-rose-600",
      iconColor: "text-rose-500",
      onClick: () => setShowMoodModal(true),
    },
  ];

  const handleMoodSubmit = async (data: { moodScore: number }) => {
    setIsSavingMood(true);
    try {
      setMoodScore(data.moodScore);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowMoodModal(false);
    } catch (error) {
      console.error("Error saving mood:", error);
    } finally {
      setIsSavingMood(false);
    }
  };

  const handleActivityLogged = () => {
    // Refresh activity data
    console.log("Activity logged");
  };

  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      meditation: "🧘",
      exercise: "💪",
      therapy: "💬",
      journaling: "📝",
      breathing: "🌬️",
      mindfulness: "🌿",
    };
    return icons[type] || "📋";
  };

  const getActivityTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      meditation: "Meditation",
      exercise: "Exercise",
      therapy: "Therapy",
      journaling: "Journaling",
      breathing: "Breathing",
      mindfulness: "Mindfulness",
    };
    return labels[type] || type;
  };

  const getSessionStatusBadge = (status: string) => {
    const variants = {
      confirmed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 p-4 md:p-6">
      <Container className="pt-16 md:pt-20 pb-8 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div className="space-y-2">
            <DynamicGreeting />
            <CurrentDate />
            <CurrentTime />
          </div>
          
          {/* Quick Stats Overview */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Day 7</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {activityStats ? activityStats.summary.totalActivities : 0} Activities
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="space-y-6">
          {/* Quick Actions Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <Card 
                  className="group cursor-pointer border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg"
                  onClick={action.onClick}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors transform group-hover:translate-x-1 duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats and Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Wellness Stats & My Therapist */}
            <div className="xl:col-span-2 space-y-6">
              {/* Wellness Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                          Wellness Overview
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Your weekly progress and statistics
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wellnessStats.map((stat, index) => {
                        const StatIcon = stat.icon;
                        return (
                          <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={cn(
                              "p-4 rounded-xl border-2 transition-all duration-300 group cursor-pointer",
                              stat.bgColor,
                              stat.borderColor
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                                  <StatIcon className={cn("w-5 h-5", stat.color)} />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {stat.title}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    {stat.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                              </p>
                              <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                                {stat.trend}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* My Therapist Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        My Therapist
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Connect with your mental health professional
                      </CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => router.push("/user/therapist")}
                    >
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockTherapists.map((therapist, index) => (
                        <motion.div
                          key={therapist.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors bg-white/50 dark:bg-gray-700/50"
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-4xl">{therapist.avatar}</div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {therapist.name}
                                </h3>
                                <Badge variant={therapist.isOnline ? "default" : "secondary"} className="text-xs">
                                  {therapist.isOnline ? "Online" : "Offline"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {therapist.specialization}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-amber-500" />
                                  <span>{therapist.rating}</span>
                                </div>
                                <span>•</span>
                                <span>{therapist.experience} experience</span>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" className="flex-1">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Chat
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Video className="w-4 h-4 mr-2" />
                                  Video Call
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/**My Upcoming Activity Section */}
              
               <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
>
  <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
          My Upcoming Activity
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Your next planned wellness actions
        </CardDescription>
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => router.push("/user/:id/my-activity")}
      >
        View All
      </Button>
    </CardHeader>

    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingActivities.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <p>No upcoming activities</p>
            <p className="text-sm mt-1">Schedule one to stay consistent 🌱</p>
          </div>
        ) : (
          upcomingActivities.map((activity, index) => (
            <motion.div
              key={activity._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors bg-white/50 dark:bg-gray-700/50"
            >
              <div className="flex items-start gap-4">
                {/* Emoji Icon */}
                <div className="text-4xl">
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {activity.name}
                    </h3>
                    <Badge 
                      variant="default"
                      className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {activity.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getActivityTypeLabel(activity.type)} • {activity.duration} min
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {format(new Date(activity.scheduledFor), "MMM d, h:mm a")}
                      </span>
                    </div>

                    <span>• Difficulty {activity.difficulty}/10</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1">
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </CardContent>
  </Card>
              </motion.div>


              {/* My Courses Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        My Courses
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Continue your learning journey
                      </CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => router.push("/user/courses")}
                    >
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors bg-white/50 dark:bg-gray-700/50 group cursor-pointer"
                          onClick={() => router.push(`/user/courses/${course.id}`)}
                        >
                          <div className="text-3xl flex-shrink-0">{course.image}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                {course.title}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {course.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              by {course.instructor} • {course.duration} • {course.lessons} lessons
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {course.progress}%
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Anxiety Games Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <AnxietyGames />
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Therapy Sessions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      Upcoming Sessions
                    </CardTitle>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300">
                      {mockUpcomingSessions.length}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockUpcomingSessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors bg-white/50 dark:bg-gray-700/50"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {session.therapist}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {format(session.date, "MMM d, yyyy 'at' h:mm a")}
                            </p>
                          </div>
                          <Badge className={getSessionStatusBadge(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{session.duration} min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {session.type === "Video Call" ? (
                                <Video className="w-4 h-4" />
                              ) : (
                                <Phone className="w-4 h-4" />
                              )}
                              <span>{session.type}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Join
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                    <Button 
                      variant="ghost" 
                      className="w-full" 
                      size="sm"
                      onClick={() => router.push('/user/sessions')}
                    >
                      View All Sessions
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Activity className="w-5 h-5 text-blue-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.length === 0 ? (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                          <p>No recent activities</p>
                          <p className="text-sm mt-1">Start logging activities to see them here</p>
                        </div>
                      ) : (
                        recentActivities.map((activity, index) => (
                          <motion.div
                            key={activity._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                          >
                            <div className="text-xl flex-shrink-0 mt-1">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {activity.name}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                <span>{getActivityTypeLabel(activity.type)}</span>
                                <span>•</span>
                                <span>{activity.duration} min</span>
                                <span>•</span>
                                <span>{activity.timestamp ? format(new Date(activity.timestamp), 'MMM d') : 'Recently'}</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        ))
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      className="w-full mt-4" 
                      size="sm"
                      onClick={() => setShowActivityLogger(true)}
                    >
                      Log New Activity
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Daily Motivation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-0 bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-xl">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-300" />
                        <span className="font-semibold">Daily Inspiration</span>
                      </div>
                      <p className="text-sm leading-relaxed">
                        Progress, not perfection. Every small step you take today is a victory in your mental health journey.
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/80">
                        <span>Your AI Therapist</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mood Tracking Modal */}
      <Dialog open={showMoodModal} onOpenChange={setShowMoodModal}>
        <DialogContent className="sm:max-w-[425px] border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              How are you feeling today?
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Take a moment to reflect on your current emotional state
            </DialogDescription>
          </DialogHeader>
          <MoodForm onSubmit={handleMoodSubmit} isLoading={isSavingMood} />
        </DialogContent>
      </Dialog>

      {/* Activity Logger */}
      <ActivityLogger
        open={showActivity}
        onOpenChange={setShowActivityLogger}
        onActivityLogged={handleActivityLogged}
      />
    </div>
  );
}