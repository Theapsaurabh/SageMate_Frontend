import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/components/provider";
import UserLayoutClient from "./UserLayoutClient"; // 👈 client version

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SageMate - AI Therapy & Mental Health Support | 24/7 Online Counseling",
  description:
    "Get instant access to AI-powered therapy, emotional support, and mental wellness tools. Private, affordable, and available anytime. Start your healing journey today.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
         
          <UserLayoutClient>{children}</UserLayoutClient>
          
        </Providers>
      </body>
    </html>
  );
}
