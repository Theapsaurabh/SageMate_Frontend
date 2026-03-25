/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  PlayCircle,
  Clock,
  BookOpen,
  MoreVertical,
  Eye,
  Trash2,
  PenLine,
  Plus,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { courseApi  } from "@/lib/api/doctor/doctorCourseApi";

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // Fetch courses
  const loadCourses = async () => {
    try {
      const res = await courseApi.getDoctorCourses();
      setCourses(res.courses || []);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Delete handler
  const handleDelete = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await courseApi.deleteCourse(courseId);
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Filtered data
  const filtered = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your therapy courses.
          </p>
        </div>

        {/* Create Course Button */}
        <Button
          onClick={() => router.push("/doctor/courses/create")}
          className="flex gap-2 bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
          Create Course
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full mb-10 max-w-md">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <Card
            key={course._id}
            className="relative overflow-hidden hover:shadow-xl transition-all"
          >
            {/* 3 DOT MENU */}
            <div className="absolute top-3 right-3 z-20">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition">
                    <MoreVertical className="w-5 h-5 text-gray-700" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">

                  <DropdownMenuItem
                    onClick={() => router.push(`/doctor/courses/${course._id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" /> View Course
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/doctor/courses/edit/${course._id}`)
                    }
                  >
                    <PenLine className="w-4 h-4 mr-2" /> Edit Course
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDelete(course._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Thumbnail */}
            <div className="h-40 w-full bg-gray-200">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-500">
                  No Thumbnail
                </div>
              )}
            </div>

            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">
                {course.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" /> {course.duration || "N/A"}
                <BookOpen className="w-4 h-4" /> {course.modules?.length || 0} Modules
              </div>

              <div className="flex items-center justify-between">
                <Badge>{course.level}</Badge>
                <span className="font-semibold">₹{course.price}</span>
              </div>

              <Button
                onClick={() => router.push(`/doctor/courses/${course._id}`)}
                className="w-full flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <PlayCircle className="w-4 h-4" />
                View Course
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No courses found.</p>
      )}
    </div>
  );
}
