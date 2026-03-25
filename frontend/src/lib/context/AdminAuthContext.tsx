"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

type Admin = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permissions: string[];
};

type AdminAuthContextType = {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminProfile = async () => {
    try {
      const res = await fetch(`${BASE}/admin/profile`, {
        credentials: "include",
      });

      if (!res.ok) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setAdmin(data.admin);
    } catch (err) {
      console.error(err);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE}/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setLoading(false);
        return false;
      }

      await fetchAdminProfile();
      router.push("/admin");
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BASE}/admin/logout`, {
        method: "POST",
        credentials: "include",
      });

      setAdmin(null);
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    if (!loading && !admin) {
      const adminProtected =
        pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");

      if (adminProtected) router.push("/admin/login");
    }
  }, [admin, loading, pathname]);

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside provider");
  return ctx;
}
