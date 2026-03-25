"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Activity,
  BarChart3,
  Settings,
  Stethoscope,
  MessageCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminAuth } from "@/lib/context/AdminAuthContext";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

interface StatsData {
  totalDoctors: number;
  pendingDoctors: number;
  verifiedDoctors: number;
  totalUsers: number;
  activeSessions: number;
}

export default function AdminDashboardPage() {
  const { admin, loading: authLoading } = useAdminAuth();
  const router = useRouter();

  const [stats, setStats] = useState<StatsData>({
    totalDoctors: 0,
    pendingDoctors: 0,
    verifiedDoctors: 0,
    totalUsers: 0,
    activeSessions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && admin) {
      fetchStats();
    }
  }, [admin, authLoading]);

  const fetchStats = async () => {
  try {
    const res = await fetch(`${BASE}/admin/dashboard`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch dashboard stats");
      return;
    }

    const data = await res.json();

    // ✅ Proper mapping from backend → frontend
    setStats({
      totalDoctors: data.totalDoctors,
      pendingDoctors: data.pendingDoctors,
      verifiedDoctors: data.approvedDoctors, // backend uses "approvedDoctors"
      totalUsers: data.totalPatients,         // backend uses "totalPatients"
      activeSessions: data.activeSessions,
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
  }

  setLoading(false);
};


  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p>Loading Admin Dashboard…</p>
        </div>
      </div>
    );
  }

  // If admin is not logged in, your context middleware already redirects
  if (!admin) return null;

  // --- Stat Cards ---
  const statCards = [
    {
      title: "Total Doctors",
      value: stats.totalDoctors,
      icon: Stethoscope,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Pending Verification",
      value: stats.pendingDoctors,
      icon: UserCheck,
      color: "from-amber-500 to-orange-500",
      change: "+5",
      trend: "up",
    },
    {
      title: "Verified Doctors",
      value: stats.verifiedDoctors,
      icon: UserCheck,
      color: "from-emerald-500 to-green-500",
      change: "+8%",
      trend: "up",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-purple-500 to-pink-500",
      change: "+23%",
      trend: "up",
    },
    {
      title: "Active Sessions",
      value: stats.activeSessions,
      icon: Activity,
      color: "from-indigo-500 to-blue-500",
      change: "-3%",
      trend: "down",
    },
    {
      title: "AI Conversations",
      value: "1.2k",
      icon: MessageCircle,
      color: "from-rose-500 to-red-500",
      change: "+45%",
      trend: "up",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {admin.firstName}!
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => (
            <Card
              key={stat.title}
              className="relative overflow-hidden rounded-2xl border bg-white dark:bg-gray-800 shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p
                      className={`flex items-center gap-1 text-sm font-semibold ${
                        stat.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      {stat.change}
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-xl text-white bg-gradient-to-br ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Verify Doctors",
                href: "/admin/doctors/pending",
                icon: UserCheck,
              },
              {
                title: "View All Doctors",
                href: "/admin/doctors",
                icon: Stethoscope,
              },
              {
                title: "Manage Users",
                href: "/admin/users",
                icon: Users,
              },
              {
                title: "System Settings",
                href: "/admin/settings",
                icon: Settings,
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="p-5 rounded-xl bg-white dark:bg-gray-800 border cursor-pointer hover:shadow-md transition"
                onClick={() => router.push(item.href)}
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-6 h-6 text-blue-600" />
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
