/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Folder, PlayCircle, Layers } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export default function ModulesPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all modules of this course
  const fetchModules = async () => {
    try {
      const res = await fetch(`${BASE}/doctor/course/${courseId}/modules`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setModules(data.modules);
      }
    } catch (err) {
      console.error("Error fetching modules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [courseId]);

  const goToCreateModule = () => {
    router.push(`/doctor/course/${courseId}/module/create`);
  };

  const goToModuleDetails = (moduleId: string) => {
    router.push(`/doctor/course/${courseId}/module/${moduleId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
        <div className="animate-spin w-10 h-10 rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Course Modules
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg">
            Manage and create modules for your course
          </p>
        </div>

        <button
          onClick={goToCreateModule}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xl hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Module
        </button>
      </div>

      {/* MODULE LIST */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.length === 0 ? (
          <div className="col-span-2 text-center text-gray-600 dark:text-gray-400 text-xl py-20">
            No modules created yet. Start by adding a new module.
          </div>
        ) : (
          modules.map((module, index) => (
            <motion.div
              key={module._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Card
                onClick={() => goToModuleDetails(module._id)}
                className="group cursor-pointer border-2 border-transparent hover:border-blue-400/50 hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-white/70 dark:bg-gray-900/40 backdrop-blur-xl"
              >
                {/* TOP GRADIENT HEADER */}
                <div className="h-32 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 flex items-center justify-center">
                  <Layers className="w-14 h-14 text-white drop-shadow-xl opacity-80 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {module.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {module.description || "No description provided"}
                  </p>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <PlayCircle className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold">
                        {module.lessonCount || 0} Lessons
                      </span>
                    </div>

                    <Folder className="w-5 h-5 text-gray-500" />
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
