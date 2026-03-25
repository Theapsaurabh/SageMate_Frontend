// src/app/layout.tsx
import "@/app/globals.css";
import { Providers } from "@/components/provider";

export const metadata = {
  title: "SageMate",
  description: "AI Mental Health Platform",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* GLOBAL PROVIDER → wraps everything */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
