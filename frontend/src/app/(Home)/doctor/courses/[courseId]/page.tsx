/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Layers,
  PlayCircle,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function CourseDetailsPage() {
  const router = useRouter();
  const { courseId } = useParams();
  const BASE = process.env.NEXT_PUBLIC_API_URL;

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------------------------------------------------
  // 🔥 FIXED ENDPOINT — your backend route is /doctor/course/:courseId
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (!BASE || !courseId) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${BASE}/doctor/course/${courseId}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          setCourse(data.course);
        } else {
          setCourse(null);
        }
      } catch (err) {
        console.error(err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [BASE, courseId]);

  // -----------------------------------------------------------------------
  // LOADING & NOT FOUND STATES
  // -----------------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400">
        Loading Course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Course Not Found
      </div>
    );
  }

  const modules = course.modules || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20 py-12 px-4">
      {/* FLOATING GRADIENT EFFECTS */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] rounded-full blur-3xl top-1/4 -left-60 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 dark:opacity-30" />
        <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl bottom-1/4 -right-40 bg-gradient-to-l from-cyan-500 to-blue-500 opacity-15 dark:opacity-25" />
      </div>

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="rounded-3xl bg-white/50 dark:bg-background/70 backdrop-blur-xl border border-gray-200/40 dark:border-white/10 shadow-xl p-8 md:p-12">
          {/* PREMIUM BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/30 bg-white/70 dark:bg-background/50 backdrop-blur-xl mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold">Premium Course</span>
          </motion.div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-cyan-400">
            {course.title}
          </h1>

          {/* THUMBNAIL */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            src={course.thumbnail}
            className="w-full h-80 object-cover rounded-2xl border mt-10 shadow-xl"
          />

          {/* DETAILS */}
          <div className="grid md:grid-cols-3 gap-6 mt-10 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="font-medium">
                Duration: {course.duration || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <span className="font-medium">
                Level: {course.level}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <PlayCircle className="w-5 h-5 text-cyan-500" />
              <span className="font-medium">
                Price: {course.price || 0}
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            {course.description}
          </p>
        </div>
      </motion.div>

      {/* MODULE SECTION */}
      <section className="max-w-6xl mx-auto mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-black flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent"
        >
          <Layers className="w-8 h-8 text-blue-500" /> Course Modules
        </motion.h2>

        {/* NO MODULES */}
        {modules.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-gray-500 text-lg"
          >
            No modules added yet.
          </motion.p>
        )}

        {/* MODULE LIST */}
        <div className="mt-8 grid gap-6">
          {modules.map((m: any, index: number) => (
            <motion.div
              key={m._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl p-6 bg-white/60 dark:bg-background/60 backdrop-blur-xl border border-gray-200/30 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              onClick={() =>
                router.push(`/doctor/courses/${course._id}/modules/${m._id}`)
              }
            >
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Layers className="w-5 h-5 text-blue-500" /> {m.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA: ADD MODULE */}
      <div className="max-w-6xl mx-auto mt-16 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold shadow-xl flex items-center gap-3 mx-auto"
          onClick={() =>
            router.push(`/doctor/courses/${course._id}/modules/create`)
          }
        >
          Add Module <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
