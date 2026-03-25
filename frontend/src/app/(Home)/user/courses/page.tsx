/* eslint-disable @typescript-eslint/no-explicit-any */
// app/courses/page.tsx
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
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Heart,
  Sparkles,
  Target,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Mock data for all available courses
const allCourses = [
  {
    id: "1",
    title: "Managing Anxiety & Stress",
    instructor: "Dr. Sarah Chen",
    instructorBio: "Clinical Psychologist, 8 years experience",
    duration: "4 weeks",
    totalLessons: 12,
    category: "Anxiety",
    difficulty: "Beginner",
    rating: 4.8,
    reviews: 1247,
    price: 99,
    originalPrice: 149,
    image: "🧘‍♀️",
    description: "Learn practical techniques to manage anxiety and stress in daily life through evidence-based methods and cognitive behavioral therapy.",
    features: ["Daily exercises", "Progress tracking", "Community support", "Expert guidance", "Lifetime access"],
    learningOutcomes: [
      "Identify anxiety triggers",
      "Develop coping strategies",
      "Build resilience",
      "Improve daily functioning"
    ],
    isFeatured: true,
    isBestseller: true,
    studentsEnrolled: 2847,
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    title: "Mindfulness Meditation Mastery",
    instructor: "Dr. James Wilson",
    instructorBio: "Mindfulness Expert, 6 years experience",
    duration: "6 weeks",
    totalLessons: 18,
    category: "Meditation",
    difficulty: "Beginner",
    rating: 4.9,
    reviews: 892,
    price: 129,
    originalPrice: 179,
    image: "🌿",
    description: "Develop a consistent mindfulness practice to improve focus, reduce stress, and enhance emotional regulation through guided meditations.",
    features: ["Guided meditations", "Journal prompts", "Breathing exercises", "Mindful movement", "Progress tracking"],
    learningOutcomes: [
      "Establish daily meditation habit",
      "Reduce stress levels",
      "Improve emotional awareness",
      "Enhance concentration"
    ],
    isFeatured: true,
    isBestseller: false,
    studentsEnrolled: 1563,
    lastUpdated: "2024-01-10",
  },
  {
    id: "3",
    title: "Building Emotional Resilience",
    instructor: "Dr. Emily Davis",
    instructorBio: "Resilience Coach, 7 years experience",
    duration: "8 weeks",
    totalLessons: 24,
    category: "Personal Growth",
    difficulty: "Intermediate",
    rating: 4.7,
    reviews: 567,
    price: 149,
    originalPrice: 199,
    image: "💪",
    description: "Strengthen your ability to bounce back from challenges and build lasting emotional strength through proven psychological techniques.",
    features: ["Resilience assessments", "Coping strategies", "Real-life scenarios", "Progress metrics", "Community forum"],
    learningOutcomes: [
      "Develop coping mechanisms",
      "Build mental toughness",
      "Handle setbacks effectively",
      "Maintain positive outlook"
    ],
    isFeatured: false,
    isBestseller: true,
    studentsEnrolled: 892,
    lastUpdated: "2024-01-20",
  },
  {
    id: "4",
    title: "Cognitive Behavioral Therapy Basics",
    instructor: "Dr. Michael Rodriguez",
    instructorBio: "CBT Specialist, 10 years experience",
    duration: "5 weeks",
    totalLessons: 15,
    category: "Therapy",
    difficulty: "Intermediate",
    rating: 4.6,
    reviews: 2341,
    price: 119,
    originalPrice: 159,
    image: "🧠",
    description: "Understand and apply CBT principles to transform negative thought patterns and behaviors in your daily life.",
    features: ["Thought records", "Behavioral experiments", "Skill worksheets", "Case studies", "Expert feedback"],
    learningOutcomes: [
      "Identify cognitive distortions",
      "Challenge negative thoughts",
      "Develop balanced thinking",
      "Apply CBT techniques"
    ],
    isFeatured: true,
    isBestseller: false,
    studentsEnrolled: 3124,
    lastUpdated: "2024-01-05",
  },
  {
    id: "5",
    title: "Sleep Science & Insomnia Management",
    instructor: "Dr. Amanda Park",
    instructorBio: "Sleep Specialist, 5 years experience",
    duration: "3 weeks",
    totalLessons: 9,
    category: "Sleep",
    difficulty: "Beginner",
    rating: 4.8,
    reviews: 678,
    price: 89,
    originalPrice: 129,
    image: "😴",
    description: "Master the science of sleep and overcome insomnia with proven techniques, relaxation methods, and sleep hygiene practices.",
    features: ["Sleep tracking", "Relaxation techniques", "Sleep hygiene", "Progress monitoring", "Support community"],
    learningOutcomes: [
      "Improve sleep quality",
      "Establish sleep routine",
      "Reduce insomnia symptoms",
      "Understand sleep science"
    ],
    isFeatured: false,
    isBestseller: false,
    studentsEnrolled: 1245,
    lastUpdated: "2024-01-12",
  },
  {
    id: "6",
    title: "Social Anxiety Solutions",
    instructor: "Dr. Robert Kim",
    instructorBio: "Social Anxiety Expert, 8 years experience",
    duration: "7 weeks",
    totalLessons: 21,
    category: "Anxiety",
    difficulty: "Intermediate",
    rating: 4.5,
    reviews: 432,
    price: 139,
    originalPrice: 189,
    image: "👥",
    description: "Overcome social anxiety and build confidence in social situations through gradual exposure and cognitive restructuring.",
    features: ["Social scenarios", "Confidence building", "Exposure exercises", "Support community", "Progress tracking"],
    learningOutcomes: [
      "Reduce social anxiety",
      "Build social confidence",
      "Improve communication skills",
      "Handle social situations"
    ],
    isFeatured: false,
    isBestseller: true,
    studentsEnrolled: 765,
    lastUpdated: "2024-01-18",
  },
  {
    id: "7",
    title: "Mind-Body Connection",
    instructor: "Dr. Lisa Thompson",
    instructorBio: "Integrative Therapist, 9 years experience",
    duration: "4 weeks",
    totalLessons: 12,
    category: "Holistic",
    difficulty: "Beginner",
    rating: 4.7,
    reviews: 321,
    price: 109,
    originalPrice: 149,
    image: "🌟",
    description: "Discover the powerful connection between mind and body through integrative approaches to mental wellness.",
    features: ["Yoga sequences", "Breathwork", "Mindfulness practices", "Body awareness", "Integration exercises"],
    learningOutcomes: [
      "Understand mind-body connection",
      "Practice integrative techniques",
      "Reduce physical tension",
      "Enhance body awareness"
    ],
    isFeatured: true,
    isBestseller: false,
    studentsEnrolled: 987,
    lastUpdated: "2024-01-22",
  },
  {
    id: "8",
    title: "Trauma Recovery & Healing",
    instructor: "Dr. Jennifer Martinez",
    instructorBio: "Trauma Specialist, 12 years experience",
    duration: "10 weeks",
    totalLessons: 30,
    category: "Trauma",
    difficulty: "Advanced",
    rating: 4.9,
    reviews: 189,
    price: 199,
    originalPrice: 299,
    image: "🕊️",
    description: "A comprehensive approach to trauma recovery using evidence-based techniques in a safe, supportive environment.",
    features: ["Trauma-informed techniques", "Safety planning", "Healing exercises", "Professional support", "Community"],
    learningOutcomes: [
      "Understand trauma responses",
      "Develop coping strategies",
      "Process traumatic experiences",
      "Build post-traumatic growth"
    ],
    isFeatured: false,
    isBestseller: false,
    studentsEnrolled: 456,
    lastUpdated: "2024-01-08",
  },
];

const categories = [
  "All",
  "Anxiety",
  "Meditation",
  "Personal Growth",
  "Therapy",
  "Sleep",
  "Holistic",
  "Trauma",
];

const difficultyLevels = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
];

const sortOptions = [
  "Most Popular",
  "Highest Rated",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
];

// Mock session hook - replace with your actual session context
const useSession = () => {
  return {
    isAuthenticated: false,
    user: { id: "user123", name: "John Doe" }
  };
};

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    Beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };
  return colors[difficulty as keyof typeof colors] || colors.Beginner;
};

// Loading Skeleton Component
const CourseCardSkeleton = () => (
  <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-pulse">
    <CardHeader className="pb-3">
      <div className="w-12 h-12 rounded-2xl bg-gray-300 dark:bg-gray-700 mb-3" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
    </CardContent>
    <CardFooter>
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full" />
    </CardFooter>
  </Card>
);

// Regular Course Card Component
const CourseCard = ({ course, index, onEnroll, onViewDetails, onToggleWishlist, isInWishlist }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.1 * index }}
    whileHover={{ scale: 1.02, y: -2 }}
  >
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {course.isBestseller && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-amber-500 text-white text-xs">Bestseller</Badge>
        </div>
      )}
      
      <button
        onClick={() => onToggleWishlist(course.id)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
      >
        <Heart 
          className={cn(
            "w-4 h-4",
            isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
          )} 
        />
      </button>

      <CardHeader className="pb-3">
        <div className="text-3xl mb-3">{course.image}</div>
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
          {course.title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
          by {course.instructor}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500 fill-current" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{course.duration}</span>
          </div>
          <Badge variant="secondary" className={cn("text-xs", getDifficultyColor(course.difficulty))}>
            {course.difficulty}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">${course.price}</span>
            {course.originalPrice && (
              <span className="text-xs text-gray-500 line-through">${course.originalPrice}</span>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              onClick={() => onEnroll(course.id)}
              className="flex items-center gap-1"
            >
              <Play className="w-3 h-3" />
              Enroll
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  </motion.div>
);

// Featured Course Card Component
const FeaturedCourseCard = ({ course, index, onEnroll, onViewDetails, onToggleWishlist, isInWishlist }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 backdrop-blur-sm relative overflow-hidden">
      {course.isBestseller && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-amber-500 text-white">Bestseller</Badge>
        </div>
      )}
      
      <button
        onClick={() => onToggleWishlist(course.id)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
      >
        <Heart 
          className={cn(
            "w-5 h-5",
            isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
          )} 
        />
      </button>

      <CardHeader className="pb-4">
        <div className="text-4xl mb-4">{course.image}</div>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
          {course.title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
          by {course.instructor}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <span>{course.rating}</span>
            <span>({course.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.studentsEnrolled.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
          <Badge variant="outline">{course.category}</Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">${course.price}</span>
            {course.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button 
            onClick={() => onEnroll(course.id)}
            className="flex-1 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Enroll Now
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onViewDetails(course.id)}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  </motion.div>
);

export default function AllCoursesPage() {
  const { isAuthenticated } = useSession();
  const router = useRouter();
  
  const [courses, setCourses] = useState(allCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Filter and sort courses
  useEffect(() => {
    setIsLoading(true);
    
    const filtered = allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      
      const matchesDifficulty = selectedDifficulty === "All Levels" || course.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort courses
    switch (sortBy) {
      case "Highest Rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Newest":
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Most Popular":
      default:
        filtered.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled);
        break;
    }

    // Simulate API delay
    setTimeout(() => {
      setCourses(filtered);
      setIsLoading(false);
    }, 300);
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const handleEnroll = (courseId: string) => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/courses/${courseId}`);
      return;
    }
    // Redirect to checkout or directly enroll based on your flow
    router.push(`/checkout?course=${courseId}`);
  };

  const handleViewDetails = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  const toggleWishlist = (courseId: string) => {
    setWishlist(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const featuredCourses = allCourses.filter(course => course.isFeatured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
      <Container className="pt-20 pb-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            <Sparkles className="w-3 h-3 mr-1" />
            Transform Your Mental Health
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Mental Wellness Courses
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Discover evidence-based courses designed by mental health professionals to help you build resilience, reduce stress, and improve your well-being.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{allCourses.length}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </motion.div>

        {/* Featured Courses */}
        {featuredCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Featured Courses
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Most popular courses chosen by our community
                </p>
              </div>
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.slice(0, 3).map((course, index) => (
                <FeaturedCourseCard 
                  key={course.id} 
                  course={course} 
                  index={index}
                  onEnroll={handleEnroll}
                  onViewDetails={handleViewDetails}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={wishlist.includes(course.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-lg"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Category:</span>
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

            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Level:</span>
              {difficultyLevels.map((level) => (
                <Button
                  key={level}
                  variant={selectedDifficulty === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(level)}
                  className="rounded-full"
                >
                  {level}
                </Button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1 text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {isLoading ? (
            // Loading Skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))
          ) : courses.length === 0 ? (
            // Empty State
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            // Courses List
            courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                onEnroll={handleEnroll}
                onViewDetails={handleViewDetails}
                onToggleWishlist={toggleWishlist}
                isInWishlist={wishlist.includes(course.id)}
              />
            ))
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-4">
                <Target className="w-12 h-12 mx-auto text-yellow-300" />
                <h3 className="text-2xl md:text-3xl font-bold">Start Your Mental Wellness Journey Today</h3>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                  Join thousands of students who have transformed their mental health with our evidence-based courses
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => router.push("/signup")}
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => router.push("/about")}
                    className="border-white text-white hover:bg-white/10"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}