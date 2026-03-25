/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Plus, Clock,  } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export default function ModuleDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = params.courseId as string;
  const moduleId = params.moduleId as string;

  const [moduleData, setModuleData] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch module + lessons
  const fetchModule = async () => {
    try {
      const res = await fetch(`${BASE}/doctor/course/${courseId}/modules`, {
        credentials: "include",
      });
      const allModules = await res.json();

      if (allModules.success) {
        const mod = allModules.modules.find((m: any) => m._id === moduleId);
        setModuleData(mod || null);
      }

      // Fetch lessons
      const lessonRes = await fetch(
        `${BASE}/doctor/course/${courseId}/module/${moduleId}/lessons`,
        { credentials: "include" }
      );

      const lessonData = await lessonRes.json();
      if (lessonData.success) {
        setLessons(lessonData.lessons);
      }
    } catch (err) {
      console.error("Error fetching module:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModule();
  }, [moduleId]);

  const goToAddLesson = () => {
    router.push(
      `/doctor/course/${courseId}/module/${moduleId}/lesson/create`
    );
  };

  const openLesson = (lessonId: string) => {
    router.push(
      `/doctor/course/${courseId}/module/${moduleId}/lesson/${lessonId}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!moduleData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Module not found
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {moduleData.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-3 text-lg max-w-2xl">
          {moduleData.description || "No description provided."}
        </p>

        <button
          onClick={goToAddLesson}
          className="mt-6 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xl hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Lesson
        </button>
      </div>

      {/* LESSON LIST */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {lessons.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-400 text-xl col-span-2 py-20 text-center">
            No lessons yet. Click &quot;Add Lesson&quot; to upload one.
          </div>
        ) : (
          lessons.map((lesson, index) => (
            <motion.div
              key={lesson._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className="group cursor-pointer overflow-hidden border-2 border-transparent hover:border-blue-400/50 hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white/70 dark:bg-gray-900/40 backdrop-blur-xl"
                onClick={() => openLesson(lesson._id)}
              >
                {/* VIDEO THUMBNAIL */}
                <div className="relative h-40 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 flex items-center justify-center">
                  <PlayCircle className="w-14 h-14 text-white drop-shadow-xl opacity-80 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <CardContent className="p-6 space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {lesson.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {lesson.description || "No description provided"}
                  </p>

                  <div className="flex items-center gap-3 pt-3 text-gray-700 dark:text-gray-300">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-sm">
                      {lesson.duration || "0:00"} minutes
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
