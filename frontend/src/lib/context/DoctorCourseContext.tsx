/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { courseApi } from "@/lib/api/doctor/doctorCourseApi";

// ---------------------- TYPES -------------------------
interface CourseType {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  thumbnail?: string;
}

interface ModuleType {
  _id: string;
  title: string;
  description?: string;
  order: number;
}

interface LessonType {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  duration?: string;
  order: number;
}

interface DoctorCourseContextType {
  courses: CourseType[];
  selectedCourse: CourseType | null;
  modules: ModuleType[];
  lessons: LessonType[];

  loading: boolean;
  error: string | null;

  // Actions
  loadCourses: () => Promise<void>;
  loadModules: (courseId: string) => Promise<void>;
  loadLessons: (courseId: string, moduleId: string) => Promise<void>;

  selectCourse: (course: CourseType | null) => void;

  // Create actions
  createCourse: (data: any) => Promise<void>;
  createModule: (courseId: string, data: any) => Promise<void>;
  createLesson: (
    courseId: string,
    moduleId: string,
    data: any
  ) => Promise<void>;
}

// ---------------------- CONTEXT -------------------------
const DoctorCourseContext = createContext<
  DoctorCourseContextType | undefined
>(undefined);

// ---------------------- PROVIDER -------------------------
export const DoctorCourseProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [lessons, setLessons] = useState<LessonType[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-load courses on mount
  useEffect(() => {
    loadCourses();
  }, []);

  // ---------------------- LOAD COURSES -------------------------
  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await courseApi.getDoctorCourses();
      setCourses(res.courses || res.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- LOAD MODULES -------------------------
  const loadModules = async (courseId: string) => {
    try {
      setLoading(true);
      const res = await courseApi.getCourseModules(courseId);
      setModules(res.modules || res.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- LOAD LESSONS -------------------------
  const loadLessons = async (courseId: string, moduleId: string) => {
    try {
      setLoading(true);
      const res = await courseApi.getLessons(courseId, moduleId);
      setLessons(res.lessons || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- SELECT COURSE -------------------------
  const selectCourse = (course: CourseType | null) => {
    setSelectedCourse(course);
  };

  // ---------------------- CREATE COURSE -------------------------
  const createCourse = async (data: any) => {
    setLoading(true);
    try {
      await courseApi.createCourse(data);
      await loadCourses();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- CREATE MODULE -------------------------
  const createModule = async (courseId: string, data: any) => {
    setLoading(true);
    try {
      await courseApi.createModule(courseId, data);
      await loadModules(courseId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- CREATE LESSON -------------------------
  const createLesson = async (
    courseId: string,
    moduleId: string,
    data: any
  ) => {
    setLoading(true);
    try {
      await courseApi.createLesson(courseId, moduleId, data);
      await loadLessons(courseId, moduleId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- VALUE -------------------------
  const value: DoctorCourseContextType = {
    courses,
    selectedCourse,
    modules,
    lessons,

    loading,
    error,

    loadCourses,
    loadModules,
    loadLessons,

    selectCourse,

    createCourse,
    createModule,
    createLesson,
  };

  return (
    <DoctorCourseContext.Provider value={value}>
      {children}
    </DoctorCourseContext.Provider>
  );
};

// ---------------------- HOOK -------------------------
export const useDoctorCourse = (): DoctorCourseContextType => {
  const context = useContext(DoctorCourseContext);
  if (!context)
    throw new Error(
      "useDoctorCourse must be used inside DoctorCourseProvider"
    );
  return context;
};
