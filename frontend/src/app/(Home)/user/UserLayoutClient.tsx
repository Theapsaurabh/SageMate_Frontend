"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/context/UserAuthContext";
import UserHeader from "@/components/UserHeader";

export default function UserLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/user");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <UserHeader />
      <main className="min-h-screen pt-16 lg:pt-20">{children}</main>
    </>
  );
}
