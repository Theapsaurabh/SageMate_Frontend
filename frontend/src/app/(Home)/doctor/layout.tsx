"use client";

import DoctorHeader from "@/components/DoctorHeader";
import { Footer } from "@/components/footer";
import { useDoctorAuth } from "@/lib/context/DoctorAuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const { doctor, loading } = useDoctorAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !doctor) {
      router.replace("/doctor/login?redirect=/doctor");
    }
  }, [doctor, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!doctor) return null;

  return (
    <>
      <DoctorHeader />
      <main className="min-h-screen pt-16 lg:pt-20">{children}</main>
      <Footer />
    </>
  );
}
