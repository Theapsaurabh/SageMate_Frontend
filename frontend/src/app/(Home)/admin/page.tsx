/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  CheckCircle,
  Clock,
  Database,
  LogOut,
  Settings,
  List,
} from "lucide-react";

import { AdminAuthApi } from "../../../lib/api/admin/AdminauthApi";
import { AdminDoctorApi } from "../../../lib/api/admin/AdminDoctorManagementApi";

type Stat = {
  label: string;
  value: number | string;
  icon: React.ComponentType<any>;
  color?: string;
};

type DoctorPreview = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization?: string;
  createdAt?: string;
};

export default function AdminHomepage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Record<string, number | string> | null>(null);
  const [pending, setPending] = useState<DoctorPreview[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOverview();
    fetchPending();
  }, []);

  // SUMMARY
  const fetchOverview = async () => {
    try {
      setLoading(true);
      const data = await AdminAuthApi.getDashboardSummary();
      setStats({
        totalDoctors: data.totalDoctors,
        pendingDoctors: data.pendingDoctors,
        verifiedDoctors: data.verifiedDoctors,
        totalPatients: data.totalPatients,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // PENDING DOCTORS
  const fetchPending = async () => {
    try {
      setLoading(true);
      const data = await AdminDoctorApi.getDoctors("pending");

      setPending(data.doctors || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approveDoctor = async (id: string) => {
    if (!confirm("Approve this doctor?")) return;
    try {
      setActionLoading(id);
      await AdminDoctorApi.approve(id, );
      setPending((prev) => prev.filter((d) => d._id !== id));
      fetchOverview();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const rejectDoctor = async (id: string) => {
    const reason = prompt("Reason for rejection:") || "";
    if (!confirm("Reject this doctor?")) return;

    try {
      setActionLoading(id);
      await AdminDoctorApi.reject(id, reason);
      setPending((prev) => prev.filter((d) => d._id !== id));
      fetchOverview();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const logout = async () => {
    await AdminAuthApi.logout();
    router.push("/admin/login");
  };

  const statCards: Stat[] = [
    {
      label: "Total Doctors",
      value: stats?.totalDoctors ?? "—",
      icon: Database,
      color: "bg-gradient-to-r from-sky-500 to-cyan-500",
    },
    {
      label: "Pending",
      value: stats?.pendingDoctors ?? "—",
      icon: Clock,
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
    {
      label: "Verified",
      value: stats?.verifiedDoctors ?? "—",
      icon: CheckCircle,
      color: "bg-gradient-to-r from-emerald-500 to-green-500",
    },
    {
      label: "Patients",
      value: stats?.totalPatients ?? "—",
      icon: UserIcon,
      color: "bg-gradient-to-r from-violet-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Admin Console</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/dashboard")} className="px-4 py-2 rounded-md bg-white shadow text-sm hover:shadow-md">
            Go to Dashboard
          </button>

          <button onClick={logout} className="px-3 py-2 rounded-md bg-rose-500 text-white text-sm hover:opacity-95">
            <LogOut className="inline-block mr-2 w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        {error && <div className="p-3 bg-rose-50 text-rose-700 rounded">{error}</div>}

        {/* STAT CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statCards.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="p-4 rounded-lg bg-white/80 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                    <div className="mt-2 text-2xl font-semibold">{s.value}</div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* PENDING DOCTORS PREVIEW */}
        <section className="rounded-lg bg-white/80 p-4 shadow">
          <h2 className="text-lg font-medium mb-3">Pending Doctors</h2>

          {pending.length === 0 ? (
            <p className="text-muted-foreground">No pending doctors</p>
          ) : (
            <div className="divide-y">
              {pending.slice(0, 5).map((d) => (
                <div key={d._id} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {d.firstName} {d.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {d.email} {d.specialization ? `• ${d.specialization}` : ""}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      disabled={actionLoading === d._id}
                      onClick={() => approveDoctor(d._id)}
                      className="px-3 py-1 rounded-md bg-emerald-600 text-white text-sm"
                    >
                      {actionLoading === d._id ? "..." : "Approve"}
                    </button>

                    <button
                      disabled={actionLoading === d._id}
                      onClick={() => rejectDoctor(d._id)}
                      className="px-3 py-1 rounded-md bg-rose-500 text-white text-sm"
                    >
                      {actionLoading === d._id ? "..." : "Reject"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="text-sm text-muted-foreground py-6">
          © {new Date().getFullYear()} SageMate — Admin Console
        </footer>
      </main>
    </div>
  );
}
