/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

 export class ApiService {
  public baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  
  clearAllCookies() {
    if (typeof document === "undefined") return;
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=localhost;path=/;`;
    }

    console.log("✅ All cookies cleared");
  }

  
  public async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include",
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const contentType = response.headers.get("content-type");

      let data: any = {};
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error: any) {
      console.error("❌ API request failed:", error);
      throw new Error(error.message || "Network error");
    }
  }

  // Helper for JWT header
  public getAuthHeader(): { Authorization?: string } {
    if (typeof window === "undefined") return {};
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  //  REGISTER
  async register(patientData: any) {
    return this.request("/user/signup", {
      method: "POST",
      body: JSON.stringify(patientData),
    });
  }

  // LOGIN
  async login(email: string, password: string) {
    const data = await this.request("/user/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const token = data?.data?.token;
    const patient = data?.data?.patient;

    if (token && patient) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(patient));
    }

    return data;
  }

  //  FORGOT PASSWORD
  async forgotPassword(email: string) {
    return this.request("/user/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  //  RESET PASSWORD
  async changePassword(currentPassword: string, newPassword: string) {
    return this.request("/user/reset-password", {
      method: "POST",
      headers: this.getAuthHeader(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  //  FETCH PROFILE
  async getProfile() {
    return this.request("/user/profile", {
      method: "GET",
      headers: this.getAuthHeader(),
    });
  }

  //  UPDATE PROFILE
  async updateProfile(profileData: any) {
    return this.request("/user/profile-update", {
      method: "PUT",
      headers: this.getAuthHeader(),
      body: JSON.stringify(profileData),
    });
  }

  //  LOGOUT
  async handleLogout() {
    try {
      await fetch(`${this.baseUrl}/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      sessionStorage.clear();
      this.clearAllCookies();

      console.log(" Logged out successfully");
      return true;
    } catch (error) {
      console.error(" Logout failed:", error);
      return false;
    }
  }
}

export const apiService = new ApiService();
