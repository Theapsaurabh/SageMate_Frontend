/* AdminAuthApi.ts */

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export const AdminAuthApi = {
  // ---------------- LOGIN ----------------
  login: async (email: string, password: string) => {
    const res = await fetch(`${BASE}/admin/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.error || "Login failed");
    }

    return res.json();
  },

  // ---------------- LOGOUT ----------------
  logout: async () => {
    const res = await fetch(`${BASE}/admin/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Logout failed");

    return true;
  },

  // ---------------- GET PROFILE ----------------
  getProfile: async () => {
    const res = await fetch(`${BASE}/admin/profile`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Unauthorized");

    return res.json();
  },

  // ---------------- DASHBOARD SUMMARY ----------------
  getDashboardSummary: async () => {
    const res = await fetch(`${BASE}/admin/dashboard/summary`, {
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.error || "Failed to load dashboard data");
    }

    return res.json();
  },
};
