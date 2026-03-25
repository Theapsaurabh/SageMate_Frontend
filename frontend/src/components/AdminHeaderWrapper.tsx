"use client";

import { usePathname } from "next/navigation";
import AdminHeader from "./adminHeader";

export default function AdminHeaderWrapper() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (!isAdminRoute) return null;

  return <AdminHeader />;
}
