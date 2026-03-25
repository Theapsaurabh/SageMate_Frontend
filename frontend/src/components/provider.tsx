"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../lib/context/UserAuthContext";
import { DoctorAuthProvider } from "@/lib/context/DoctorAuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* Patient Auth */}
      <AuthProvider>

        {/* Doctor Auth */}
        <DoctorAuthProvider>
          {children}
        </DoctorAuthProvider>

      </AuthProvider>
    </ThemeProvider>
  );
}
