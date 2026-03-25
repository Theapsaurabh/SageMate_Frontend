"use client";

import DoctorAuthGuard from "../DoctorAuthGuard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Users,
  Calendar,
  MessageCircle,
  BarChart3,
  FileText,
  Bell,
  Search,
  Filter,
  Plus,
  Clock,
  Star,
  TrendingUp,
  Eye,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastSession: string;
  status: "active" | "pending" | "completed";
  nextAppointment?: string;
  progress: number;
  avatar: string;
}

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: "video" | "in-person" | "chat";
  status: "scheduled" | "completed" | "cancelled";
  duration: string;
}

function DashboardContent() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setMounted(true);
  }, []);

  const patients: Patient[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      age: 28,
      lastSession: "2 days ago",
      status: "active",
      nextAppointment: "Tomorrow, 10:00 AM",
      progress: 75,
      avatar: "SJ",
    },
    {
      id: "2",
      name: "Michael Chen",
      age: 35,
      lastSession: "1 week ago",
      status: "active",
      nextAppointment: "Today, 2:00 PM",
      progress: 60,
      avatar: "MC",
    },
    {
      id: "3",
      name: "Emily Davis",
      age: 42,
      lastSession: "3 days ago",
      status: "pending",
      progress: 30,
      avatar: "ED",
    },
    {
      id: "4",
      name: "Robert Wilson",
      age: 31,
      lastSession: "2 weeks ago",
      status: "completed",
      progress: 90,
      avatar: "RW",
    },
  ];

  const appointments: Appointment[] = [
    {
      id: "1",
      patientName: "Michael Chen",
      time: "Today, 2:00 PM",
      type: "video",
      status: "scheduled",
      duration: "45 mins",
    },
    {
      id: "2",
      patientName: "Sarah Johnson",
      time: "Tomorrow, 10:00 AM",
      type: "in-person",
      status: "scheduled",
      duration: "60 mins",
    },
    {
      id: "3",
      patientName: "New Patient",
      time: "Friday, 11:00 AM",
      type: "video",
      status: "scheduled",
      duration: "30 mins",
    },
  ];

  const stats = [
    {
      title: "Total Patients",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Sessions This Week",
      value: "18",
      change: "+5%",
      trend: "up",
      icon: Calendar,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Patient Satisfaction",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: Star,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "AI Insights Generated",
      value: "156",
      change: "+23%",
      trend: "up",
      icon: BarChart3,
      color: "from-purple-500 to-pink-500",
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
        <p className="text-gray-600 dark:text-gray-300">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      {/* ---------------- HEADER ---------------- */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Doctor Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Welcome back, Doctor
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 rounded-2xl border bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </Button>

              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                DR
              </div>
            </div>
          </div>

          {/* NAV TABS */}
          <nav className="flex space-x-8 mt-6">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "patients", label: "Patients", icon: Users },
              { id: "appointments", label: "Appointments", icon: Calendar },
              { id: "messages", label: "Messages", icon: MessageCircle },
              { id: "reports", label: "Reports", icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 px-1 border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="p-6 max-w-7xl mx-auto">

        {/* ---------- Stats Cards ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg bg-white/70 dark:bg-gray-800/70 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {stat.value}
                        </p>
                        <div
                          className={`flex items-center gap-1 mt-1 text-sm ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span>{stat.change}</span>
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} text-white`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ---------- Recent Patients ---------- */}
          <div className="lg:col-span-2 space-y-6">

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Patients
              </h2>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>

                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4" />
                  Add Patient
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {patients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg border-0 bg-white/70 dark:bg-gray-800/70">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">

                        {/* Left */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold">
                            {patient.avatar}
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {patient.name}
                            </h3>

                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                              <span>{patient.age} years</span>
                              <span>•</span>
                              <span>Last: {patient.lastSession}</span>
                            </div>

                            {patient.nextAppointment && (
                              <div className="flex items-center gap-2 mt-2 text-sm text-purple-600 dark:text-purple-400">
                                <Clock className="w-4 h-4" />
                                <span>{patient.nextAppointment}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-4">

                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{
                                    width: `${patient.progress}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {patient.progress}%
                              </span>
                            </div>

                            <Badge
                              className={
                                patient.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30"
                                  : patient.status === "pending"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30"
                              }
                            >
                              {patient.status}
                            </Badge>
                          </div>

                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* ---------- AI Insights ---------- */}
            <Card className="border-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <BarChart3 className="w-5 h-5" />
                  AI Insights & Analytics
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">
                      85%
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Treatment Success Rate
                    </p>
                  </div>

                  <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">
                      12
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Active Treatments
                    </p>
                  </div>

                  <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">
                      4.8
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Avg Rating
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* ---------- Appointments Column ---------- */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Upcoming Appointments</h2>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4" />
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 bg-white/70 dark:bg-gray-800/70">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-xl ${
                                appointment.type === "video"
                                  ? "bg-blue-100 text-blue-600"
                                  : appointment.type === "in-person"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-purple-100 text-purple-600"
                              }`}
                            >
                              {appointment.type === "video"
                                ? "📹"
                                : appointment.type === "in-person"
                                ? "👤"
                                : "💬"}
                            </div>

                            <div>
                              <h4 className="font-semibold">
                                {appointment.patientName}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {appointment.time}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <Badge
                              className={
                                appointment.status === "scheduled"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30"
                                  : appointment.status === "completed"
                                  ? "bg-gray-100 text-gray-800 dark:bg-gray-900/30"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30"
                              }
                            >
                              {appointment.status}
                            </Badge>

                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {appointment.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          Reschedule
                        </Button>

                        <Button
                          size="sm"
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                        >
                          Start Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default function DoctorDashboardPage() {
  return (
    <DoctorAuthGuard>
      <DashboardContent />
    </DoctorAuthGuard>
  );
}
