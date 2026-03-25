/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:3001";

class CourseApi {
  baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // ============================================================
  //                     AUTH HEADER
  // ============================================================
  getAuthHeader(): HeadersInit {
    if (typeof window === "undefined") return {};
    const token = localStorage.getItem("doctorToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // ============================================================
  //                     JSON REQUEST HANDLER
  // ============================================================
  async jsonRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...(options.headers || {}),
      },
      ...options,
    };

    const res = await fetch(url, config);

    let data: any = {};
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
  }

  // ============================================================
  //                   FORM-DATA REQUEST HANDLER
  // ============================================================
  async formRequest(endpoint: string, formData: FormData) {
    const url = `${this.baseUrl}${endpoint}`;

    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        ...this.getAuthHeader(),
        // ❗ DO NOT SET content-type (browser sets boundary automatically)
      },
      body: formData,
    });

    let data: any = {};
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    if (!res.ok) throw new Error(data.message || "Upload failed");
    return data;
  }

  // ============================================================
  //                        COURSE APIs
  // ============================================================

  createCourse(data: any) {
    return this.jsonRequest("/doctor/course", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  getDoctorCourses() {
    return this.jsonRequest("/doctor/courses/me", { method: "GET" });
  }

  getSingleCourse(courseId: string) {
    return this.jsonRequest(`/doctor/course/${courseId}`, { method: "GET" });
  }

  updateCourse(courseId: string, data: any) {
    return this.jsonRequest(`/doctor/course/${courseId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  deleteCourse(courseId: string) {
    return this.jsonRequest(`/doctor/course/${courseId}`, {
      method: "DELETE",
    });
  }

  // ============================================================
  //                        MODULE APIs
  // ============================================================

  createModule(courseId: string, data: any) {
    return this.jsonRequest(`/doctor/course/${courseId}/module`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  getCourseModules(courseId: string) {
    return this.jsonRequest(`/doctor/course/${courseId}/modules`, {
      method: "GET",
    });
  }

  updateModule(courseId: string, moduleId: string, data: any) {
    return this.jsonRequest(`/doctor/course/${courseId}/module/${moduleId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  deleteModule(courseId: string, moduleId: string) {
    return this.jsonRequest(`/doctor/course/${courseId}/module/${moduleId}`, {
      method: "DELETE",
    });
  }

  // ============================================================
  //                        LESSON APIs
  // ============================================================

  createLesson(
    courseId: string,
    moduleId: string,
    lessonData: {
      title: string;
      description?: string;
      duration?: string;
      order?: number;
      videoFile: File;
    }
  ) {
    const formData = new FormData();

    formData.append("title", lessonData.title);
    if (lessonData.description)
      formData.append("description", lessonData.description);
    if (lessonData.duration)
      formData.append("duration", lessonData.duration);
    if (lessonData.order !== undefined)
      formData.append("order", String(lessonData.order));

    // IMPORTANT FIELD NAME → backend uses "video"
    formData.append("video", lessonData.videoFile);

    return this.formRequest(
      `/doctor/course/${courseId}/module/${moduleId}/lesson`,
      formData
    );
  }

  getLessons(courseId: string, moduleId: string) {
    return this.jsonRequest(
      `/doctor/course/${courseId}/module/${moduleId}/lessons`,
      { method: "GET" }
    );
  }

  deleteLesson(courseId: string, moduleId: string, lessonId: string) {
    return this.jsonRequest(
      `/doctor/course/${courseId}/module/${moduleId}/lesson/${lessonId}`,
      { method: "DELETE" }
    );
  }
}

// ===========================
// EXPORT SINGLETON INSTANCE
// ===========================
export const courseApi = new CourseApi();
