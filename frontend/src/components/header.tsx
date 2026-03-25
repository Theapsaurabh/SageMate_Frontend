"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Menu, X, Heart, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function PublicHeader() {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Determine current route type
  const isHomePage = pathname === "/";
  const isDoctorRoute = pathname?.startsWith('/doctor/login');
  const isUserRoute = pathname?.startsWith('/login');
  
  // Define a type for navigation items
  type NavItem = {
    href: string;
    label: string;
    icon?: React.ElementType;
  };

  // Common nav items for public pages
  const publicNavItems: NavItem[] = [
    { href: "/", label: "Home", icon: Home },
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
    { href: "/crisis", label: "Crisis Support" },
    { href: "/contact", label: "Contact Us" }
  ];

  // Get appropriate nav items based on current page
  const getNavItems = () => {
    return publicNavItems;
  };

  const navItems = getNavItems();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const getAuthButtons = () => {
    if (isHomePage) {
      // Show both login options on home page
      return (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/login")}
            className="hidden sm:flex"
          >
             Login as User
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/doctor/login")}
            className="hidden sm:flex items-center gap-2"
          >
             Login as Doctor
          </Button>
        </div>
      );
    }

    if (isDoctorRoute) {
      // Show doctor login on doctor pages
      return (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/")}
            className="hidden sm:flex"
          >
            Back to Home
          </Button>
        </div>
      );
    }

    // User routes - show user login
    if (isUserRoute) {
      return (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/")}
            className="hidden sm:flex"
          >
            Back to Home
          </Button>
        </div>
      );
    }

    // Default to common login buttons
    return (
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/user/login")}
          className="hidden sm:flex"
        >
          User Login
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/doctor/login")}
          className="hidden sm:flex items-center gap-2"
        >
          Doctor Login
        </Button>
      </div>
    );
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SageMate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Auth Buttons */}
            {getAuthButtons()}

            {/* Get Started Button */}
            <Button
              onClick={handleGetStarted}
              className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Heart className="w-4 h-4" />
              Get Started
            </Button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 pt-4 pb-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                {/* Auth buttons for mobile */}
                <div className="space-y-2">
                  {isHomePage ? (
                    // Show both on home page
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          router.push("/user/login");
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-center"
                      >
                        User Login
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          router.push("/doctor/login");
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-center"
                      >
                        Doctor Login
                      </Button>
                    </>
                  ) : isDoctorRoute ? (
                    // Show doctor login on doctor pages
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          router.push("/doctor/login");
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-center"
                      >
                        Doctor Login
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          router.push("/");
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-center"
                      >
                        Back to Home
                      </Button>
                    </>
                  ) : isUserRoute ? (
                    // Show user login on user pages
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          router.push("/user/login");
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-center"
                      >
                        User Login
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          router.push("/");
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-center"
                      >
                        Back to Home
                      </Button>
                    </>
                  ) : (
                    // Default buttons
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          router.push("/user/login");
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-center"
                      >
                        User Login
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          router.push("/doctor/login");
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-center"
                      >
                        Doctor Login
                      </Button>
                    </>
                  )}
                </div>
                
                <Button
                  onClick={handleGetStarted}
                  className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}