"use client";
import { useTheme } from "next-themes";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ThemeWrapperProps {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);// State to track mobile menu open/close
  const { user, isLoading } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/user/quotes/liked", label: "Liked Quotes" },
    { href: "/user/quotes/new", label: "New Quote" },
    { href: "/user/quotes", label: "My Quotes" },
    { href: "/user/profile", label: "Profile" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="px-4 py-3 flex justify-between items-center border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        
        {/* Desktop nav links */}
        {!isLoading && user && (
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-emerald-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile: Logo / Brand placeholder on the left */}
        {(!user || isLoading) && (
          <span className="font-bold text-emerald-500 text-lg">QuoteApp</span>
        )}

        <div className="flex gap-4 items-center ml-auto">
          {!isLoading &&
            (user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-sm font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                  {user.name ?? user.email}
                </span>
                <Button asChild variant="outline" size="sm">
                  <a href="/auth/logout">Logout</a>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <a href="/auth/login">Login</a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href="/api/auth/signup">Sign Up</a>
                </Button>
              </div>
            ))}

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1 rounded-full bg-emerald-800 text-white text-sm font-bold"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === "dark" ? "☀️" : "🌙") : "🌙"}
          </button>

          {/* FIX: Mobile hamburger — only show when user is logged in */}
          {!isLoading && user && (
            <button
              className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileOpen && user && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium hover:text-emerald-500 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>
    </div>
  );
}