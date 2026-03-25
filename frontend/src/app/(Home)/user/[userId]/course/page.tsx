"use client";

import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  Calendar,
  BarChart3,
  Target,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Mock data for purchased courses
const mockPurchasedCourses = [
  {
    id: "1",
    title: "Managing Anxiety & Stress",
    instructor: "Dr. Sarah Chen",
    progress: 75,
    duration: "4 weeks",
    totalLessons: 12,
    completedLessons: 9,
    category: "Anxiety",
    difficulty: "Beginner",
    rating: 4.8,
    students: 1247,
    price: 99,
    purchaseDate: "2024-01-15",
    lastAccessed: "2024-01-28",
    image: "🧘‍♀️",
    description: "Learn practical techniques to manage anxiety and stress in daily life through evidence-based methods.",
    features: ["Daily exercises", "Progress tracking", "Community support", "Expert guidance"],
    status: "active",
  },
  {
    id: "2",
    title: "Mindfulness Meditation Mastery",
    instructor: "Dr. James Wilson",
    progress: 30,
    duration: "6 weeks",
    totalLessons: 18,
    completedLessons: 6,
    category: "Meditation",
    difficulty: "Beginner",
    rating: 4.9,
    students: 892,
    price: 129,
    purchaseDate: "2024-01-20",
    lastAccessed: "2024-01-25",
    image: "🌿",
    description: "Develop a consistent mindfulness practice to improve focus, reduce stress, and enhance emotional regulation.",
    features: ["Guided meditations", "Journal prompts", "Breathing exercises", "Mindful movement"],
    status: "active",
  },
  {
    id: "3",
    title: "Building Emotional Resilience",
    instructor: "Dr. Emily Davis",
    progress: 10,
    duration: "8 weeks",
    totalLessons: 24,
    completedLessons: 2,
    category: "Personal Growth",
    difficulty: "Intermediate",
    rating: 4.7,
    students: 567,
    price: 149,
    purchaseDate: "2024-01-25",
    lastAccessed: "2024-01-26",
    image: "💪",
    description: "Strengthen your ability to bounce back from challenges and build lasting emotional strength.",
    features: ["Resilience assessments", "Coping strategies", "Real-life scenarios", "Progress metrics"],
    status: "active",
  },
  {
    id: "4",
    title: "Cognitive Behavioral Therapy Basics",
    instructor: "Dr. Michael Rodriguez",
    progress: 0,
    duration: "5 weeks",
    totalLessons: 15,
    completedLessons: 0,
    category: "Therapy",
    difficulty: "Intermediate",
    rating: 4.6,
    students: 2341,
    price: 119,
    purchaseDate: "2024-01-30",
    lastAccessed: null,
    image: "🧠",
    description: "Understand and apply CBT principles to transform negative thought patterns and behaviors.",
    features: ["Thought records", "Behavioral experiments", "Skill worksheets", "Case studies"],
    status: "not-started",
  },
  {
    id: "5",
    title: "Sleep Science & Insomnia Management",
    instructor: "Dr. Amanda Park",
    progress: 100,
    duration: "3 weeks",
    totalLessons: 9,
    completedLessons: 9,
    category: "Sleep",
    difficulty: "Beginner",
    rating: 4.8,
    students: 678,
    price: 89,
    purchaseDate: "2023-12-10",
    lastAccessed: "2024-01-20",
    image: "😴",
    description: "Master the science of sleep and overcome insomnia with proven techniques and routines.",
    features: ["Sleep tracking", "Relaxation techniques", "Sleep hygiene", "Progress monitoring"],
    status: "completed",
  },
  {
    id: "6",
    title: "Social Anxiety Solutions",
    instructor: "Dr. Robert Kim",
    progress: 45,
    duration: "7 weeks",
    totalLessons: 21,
    completedLessons: 9,
    category: "Anxiety",
    difficulty: "Intermediate",
    rating: 4.5,
    students: 432,
    price: 139,
    purchaseDate: "2024-01-18",
    lastAccessed: "2024-01-27",
    image: "👥",
    description: "Overcome social anxiety and build confidence in social situations through gradual exposure.",
    features: ["Social scenarios", "Confidence building", "Exposure exercises", "Support community"],
    status: "active",
  },
];

const categories = [
  "All",
  "Anxiety",
  "Meditation",
  "Personal Growth",
  "Therapy",
  "Sleep",
  "Relationships",
];

const statusFilters = [
  { value: "all", label: "All Courses" },
  { value: "active", label: "In Progress" },
  { value: "not-started", label: "Not Started" },
  { value: "completed", label: "Completed" },
];

export default function UserCoursesPage() {
  const [courses, setCourses] = useState(mockPurchasedCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Filter courses based on search, category, and status
  useEffect(() => {
    setIsLoading(true);
    
    const filtered = mockPurchasedCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      
      const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Simulate API delay
    setTimeout(() => {
      setCourses(filtered);
      setIsLoading(false);
    }, 300);
  }, [searchQuery, selectedCategory, selectedStatus]);

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "bg-gray-200 dark:bg-gray-700";
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-amber-500";
    if (progress < 100) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { label: "In Progress", class: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
      "not-started": { label: "Not Started", class: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300" },
      completed: { label: "Completed", class: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
    };
    
    const config = variants[status as keyof typeof variants] || variants["not-started"];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      Beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      Advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    
    return <Badge className={colors[difficulty as keyof typeof colors] || colors.Beginner}>{difficulty}</Badge>;
  };

  const handleContinueCourse = (courseId: string) => {
    router.push(`/user/courses/${courseId}/learn`);
  };

  const handleViewDetails = (courseId: string) => {
    router.push(`/user/courses/${courseId}`);
  };

  // Calculate overall stats
  const totalCourses = mockPurchasedCourses.length;
  const completedCourses = mockPurchasedCourses.filter(c => c.status === "completed").length;
  const inProgressCourses = mockPurchasedCourses.filter(c => c.status === "active").length;
  const averageProgress = mockPurchasedCourses.reduce((acc, course) => acc + course.progress, 0) / totalCourses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
      <Container className="pt-20 pb-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Continue your mental wellness journey with your purchased courses
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalCourses}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedCourses}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{inProgressCourses}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{Math.round(averageProgress)}%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            />
          </div>

          {/* Category and Status Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedStatus === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(filter.value)}
                  className="rounded-full"
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading ? (
            // Loading Skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-pulse">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-300 dark:bg-gray-700 mb-4" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
                </CardContent>
                <CardFooter>
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                </CardFooter>
              </Card>
            ))
          ) : courses.length === 0 ? (
            // Empty State
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery || selectedCategory !== "All" || selectedStatus !== "all" 
                  ? "Try adjusting your search or filters"
                  : "You haven't purchased any courses yet"
                }
              </p>
              {!searchQuery && selectedCategory === "All" && selectedStatus === "all" && (
                <Button onClick={() => router.push("/courses")}>
                  Browse Courses
                </Button>
              )}
            </div>
          ) : (
            // Courses List
            courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{course.image}</div>
                      <div className="flex gap-1">
                        {getStatusBadge(course.status)}
                        {getDifficultyBadge(course.difficulty)}
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
                      {course.title}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {course.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mt-2">
                      <span>by {course.instructor}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={cn(
                            "h-2 rounded-full transition-all duration-500",
                            getProgressColor(course.progress)
                          )}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {course.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{course.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4">
                    <div className="flex gap-2 w-full">
                      <Button
                        onClick={() => handleContinueCourse(course.id)}
                        className="flex-1 flex items-center gap-2"
                        disabled={course.status === "completed"}
                      >
                        {course.status === "completed" ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Completed
                          </>
                        ) : course.status === "not-started" ? (
                          <>
                            <Play className="w-4 h-4" />
                            Start Course
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Continue
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleViewDetails(course.id)}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Call to Action */}
        {courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Card className="border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Sparkles className="w-12 h-12 mx-auto text-yellow-300" />
                  <h3 className="text-2xl font-bold">Continue Your Journey</h3>
                  <p className="text-blue-100 max-w-md mx-auto">
                    Keep learning and growing with your courses. Consistent practice leads to lasting change.
                  </p>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => router.push("/courses")}
                    className="mt-4"
                  >
                    Browse More Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </Container>
    </div>
  );
}