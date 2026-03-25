"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  Menu,
  X,
  LogOut,
  User as UserIcon,
  Home,
  Users,
  Calendar,
  ChartBar,
  MessageCircle,
  FileText,
  Stethoscope,
  Book,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/* ✅ Proper User Type */
type User = {
  name?: string;
  email?: string;
};

/* ✅ Typed Session Hook */
const useSession = (): {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  logout: () => Promise<void>;
} => {
  return {
    isAuthenticated: false,
    loading: false,
    user: null,
    logout: async () => {},
  };
};

export default function DoctorHeader() {
  const { user, loading, logout } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  type NavItem = {
    href: string;
    label: string;
    icon?: React.ElementType;
  };

  const doctorNavItems: NavItem[] = [
    { href: "/doctor/dashboard", label: "Dashboard", icon: Home },
    { href: "/doctor/patients", label: "Patients", icon: Users },
    { href: "/doctor/appointments", label: "Appointments", icon: Calendar },
    { href: "/doctor/messages", label: "Messages", icon: MessageCircle },
    { href: "/doctor/analytics", label: "Analytics", icon: ChartBar },
    { href: "/doctor/records", label: "Records", icon: FileText },
    { href: "/doctor/courses", label: "MyCourses", icon: Book },
  ];

  /* ✅ Scroll Effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ✅ Logout */
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
      setIsMenuOpen(false);
    }
  };

  /* ✅ FIXED FUNCTION (NO any) */
  const getUserName = () => {
    if (!user) return "Doctor";

    if (user.name) {
      return `Dr. ${user.name.split(" ")[0]}`;
    }

    if (user.email) {
      return user.email.split("@")[0];
    }

    return "Doctor";
  };

  /* ✅ Loading State */
  if (loading) {
    return (
      <header className="w-full fixed top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold">SageMate Doctor</span>
          <ThemeToggle />
        </div>
      </header>
    );
  }

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-sm border-b"
          : "bg-white/90 dark:bg-gray-900/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/doctor/dashboard" className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5" />
          <span className="font-bold">SageMate</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-4">
          {doctorNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span>{getUserName()}</span>

          <Button onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? "..." : "Logout"}
          </Button>

          <ThemeToggle />

          {/* Mobile Menu */}
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
    </header>
  );
}