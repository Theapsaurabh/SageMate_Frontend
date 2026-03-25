/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { doctorAuthApi } from "../../lib/api/doctor/doctorAuthApi"; 

// --------------------- TYPES -------------------------
interface DoctorAuthContextType {
  doctor: any | null;
  token: string | null;
  loading: boolean;
  login: (data: any) => void;
  logout: () => Promise<void>;
}

// --------------------- CONTEXT ------------------------
const DoctorAuthContext = createContext<DoctorAuthContextType | undefined>(undefined);

// --------------------- PROVIDER ------------------------
export const DoctorAuthProvider = ({ children }: { children: ReactNode }) => {
  const [doctor, setDoctor] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load doctor session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("doctorToken");
    const savedDoctor = localStorage.getItem("doctor");

    if (savedToken && savedDoctor) {
      setToken(savedToken);
      setDoctor(JSON.parse(savedDoctor));
    }

    setLoading(false);
  }, []);

  // --------------------- LOGIN ------------------------
  // Called after login request success
  const login = (data: any) => {
    setDoctor(data.doctor);
    setToken(data.token);

    localStorage.setItem("doctorToken", data.token);
    localStorage.setItem("doctor", JSON.stringify(data.doctor));
  };

  // --------------------- LOGOUT ------------------------
  const logout = async () => {
    try {
      await doctorAuthApi.logoutDoctor(); // ✅ Corrected API call
    } finally {
      localStorage.removeItem("doctorToken");
      localStorage.removeItem("doctor");

      setDoctor(null);
      setToken(null);

      router.replace("/doctor/login");
    }
  };

  return (
    <DoctorAuthContext.Provider
      value={{ doctor, token, loading, login, logout }}
    >
      {children}
    </DoctorAuthContext.Provider>
  );
};

// --------------------- HOOK ------------------------
export const useDoctorAuth = (): DoctorAuthContextType => {
  const context = useContext(DoctorAuthContext);

  if (!context) {
    throw new Error("useDoctorAuth must be used within a DoctorAuthProvider");
  }

  return context;
};
