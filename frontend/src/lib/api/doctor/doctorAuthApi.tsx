/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:3001";

export class DoctorAuthApi {
  public baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // ---------------- CLEAR COOKIES ----------------
  clearAllCookies() {
    if (typeof document === "undefined") return;
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name =
        eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=localhost;path=/;`;
    }
  }

  // ---------------- BASE REQUEST WRAPPER ----------------
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include", // 🔥 VERY IMPORTANT for cookies
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const contentType = response.headers.get("content-type");

      let data = {};
      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Invalid response format");
      }

      if (!response.ok) {
        throw new Error((data as any).error || "Something went wrong");
      }

      return data;
    } catch (err: any) {
      throw new Error(err.message || "Network error");
    }
  }

  // ---------------- AUTH HEADER ----------------
  getAuthHeader(): HeadersInit {
  if (typeof window === "undefined") return {};

  const token = localStorage.getItem("doctorToken");

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`
  };
}

  // ---------------- AUTH APIs ----------------

  // REGISTER
  registerDoctor(data: any) {
    return this.request("/doctor/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // LOGIN
  async loginDoctor(email: string, password: string) {
    const data = await this.request("/doctor/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const token = (data as any)?.token;
    const doctor = (data as any)?.doctor;

    if (token) localStorage.setItem("doctorToken", token);
    if (doctor) localStorage.setItem("doctor", JSON.stringify(doctor));

    return data;
  }

  // LOGOUT
  async logoutDoctor() {
    await this.request("/doctor/logout", { method: "POST" });

    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctor");
    sessionStorage.clear();
    this.clearAllCookies();
  }

  // ---------------- PROFILE APIs ----------------

  getDoctorProfile() {
    return this.request("/doctor/profile", {
      method: "GET",
      headers: this.getAuthHeader(),
    });
  }

  updateDoctorProfile(data: any) {
    return this.request("/doctor/profile", {
      method: "PUT",
      headers: this.getAuthHeader(),
      body: JSON.stringify(data),
    });
  }
}

export const doctorAuthApi = new DoctorAuthApi();
