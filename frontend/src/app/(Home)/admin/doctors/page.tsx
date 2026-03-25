/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useAdminAuth } from "@/lib/context/AdminAuthContext";
import { AdminDoctorApi } from "../../../../lib/api/admin/AdminDoctorManagementApi";

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  qualification: string;
  experience: number;
  hospital: string;
  verificationStatus: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function DoctorsManagement() {
  const { admin, loading: authLoading } = useAdminAuth();
  const searchParams = useSearchParams();

  const initialFilter = (searchParams.get("filter") || "pending") as
    | "all"
    | "pending"
    | "approved"
    | "rejected";

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] =
    useState<"all" | "pending" | "approved" | "rejected">(initialFilter);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch doctors only after admin is validated
  useEffect(() => {
    if (!authLoading && admin) loadDoctors();
  }, [filter, admin, authLoading]);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const data = await AdminDoctorApi.getDoctors(filter);
      setDoctors(data.doctors);
    } catch (err) {
      console.error("Fetch Doctors Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (
  doctorId: string,
  status: "approved" | "rejected"
) => {
  try {
    if (status === "approved") {
      await AdminDoctorApi.approve(doctorId);
    } else {
      await AdminDoctorApi.reject(doctorId, "Rejected by admin");
    }

    await loadDoctors(); // Refresh UI
  } catch (err) {
    console.error("Verification Error:", err);
  }
};


  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.firstName} ${doctor.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "rejected":
        return "text-rose-600 bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400";
      default:
        return "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400";
    }
  };

  if (loading || authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500">Loading doctors...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Doctors Management</h1>
          <p className="text-gray-500">Review and verify doctors</p>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2">
            {["all", "pending", "approved", "rejected"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`px-4 py-2 rounded-xl ${
                  filter === s
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search doctors..."
              className="pl-10 pr-4 py-2 border rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor._id}
              className="rounded-2xl border shadow hover:shadow-lg transition"
            >
              <CardContent className="p-5 space-y-4">
                {/* Name & Status */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {doctor.specialization}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      doctor.verificationStatus
                    )}`}
                  >
                    {doctor.verificationStatus}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> {doctor.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {doctor.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {doctor.hospital}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {doctor.experience} years
                  </p>
                </div>

                {/* Approve/Reject */}
                {doctor.verificationStatus === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() =>
                        handleVerification(doctor._id, "approved")
                      }
                      className="flex-1 bg-green-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleVerification(doctor._id, "rejected")
                      }
                      className="flex-1 bg-red-600 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                    >
                      <UserX className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-20">
            <Shield className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="text-xl font-semibold mt-4">No Doctors Found</h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try a different search term."
                : "No doctors in this category yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
