/* eslint-disable @typescript-eslint/no-explicit-any */
/* AdminDoctorApi.ts */

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export const AdminDoctorApi = {
  // ---------------- 1. Get doctors with status filter ----------------
  getDoctors: async (status: string = "all") => {
    const res = await fetch(`${BASE}/admin/doctors?status=${status}`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to load doctors");

    return res.json();
  },

  // ---------------- 2. Approve doctor ----------------
  approve: async (doctorId: string) => {
    const res = await fetch(`${BASE}/admin/doctors/${doctorId}/approve`, {
      method: "PUT",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to approve doctor");

    return res.json();
  },

  // ---------------- 3. Reject doctor ----------------
  reject: async (doctorId: string, reason?: string) => {
    const res = await fetch(`${BASE}/admin/doctors/${doctorId}/reject`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });

    if (!res.ok) throw new Error("Failed to reject doctor");

    return res.json();
  },

  // ---------------- 4. Suspend doctor ----------------
  suspend: async (doctorId: string) => {
    const res = await fetch(`${BASE}/admin/doctors/${doctorId}/suspend`, {
      method: "PUT",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to suspend doctor");

    return res.json();
  },

  // ---------------- 5. Activate doctor ----------------
  activate: async (doctorId: string) => {
    const res = await fetch(`${BASE}/admin/doctors/${doctorId}/activate`, {
      method: "PUT",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to activate doctor");

    return res.json();
  },

  // ---------------- 6. View doctor profile ----------------
  getProfile: async (doctorId: string) => {
    const res = await fetch(`${BASE}/admin/doctors/${doctorId}/profile`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to load doctor profile");

    return res.json();
  },

  // ---------------- 7. Update doctor ----------------
  update: async (doctorId: string, updates: any) => {
    const res = await fetch(`${BASE}/admin/doctors/${doctorId}/update`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error("Failed to update doctor");

    return res.json();
  },

  // ---------------- 8. View courses ----------------
  getCourses: async (doctorId: string) => {
    const res = await fetch(`${BASE}/admin/doctors/${doctorId}/courses`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to load courses");

    return res.json();
  },

  // ---------------- 9. View patients ----------------
  getPatients: async (doctorId: string) => {
    const res = await fetch(`${BASE}/admin/doctors/${doctorId}/patients`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to load patients");

    return res.json();
  },
};
