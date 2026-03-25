"use client";

import AdminHeaderWrapper from "@/components/AdminHeaderWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeaderWrapper />
      <main className="min-h-screen pt-16 lg:pt-20">{children}</main>
    </>
  );
}
