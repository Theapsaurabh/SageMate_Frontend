"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDoctorAuth } from "@/lib/context/DoctorAuthContext";
import DoctorHeader from "@/components/DoctorHeader";
import { Footer } from "@/components/footer";

export default function DoctorAuthGuard({ children }: { children: React.ReactNode }) {
  const { doctor, loading } = useDoctorAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !doctor) {
      router.replace("/doctor/login?redirect=/doctor");
    }
  }, [doctor, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
