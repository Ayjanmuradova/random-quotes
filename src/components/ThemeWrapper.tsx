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
  const { user, isLoading } = useUser(); // Get the user object and loading state from Auth0

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="p-4 flex justify-between border-slate-700">
        {!isLoading && user && (
          <div className="flex gap-6 items-center">
            <Link href="/" className="hover:text-emerald-500">
              Main page
            </Link>
            <Link href="/user/quotes/new" className="hover:text-emerald-500">
              New Quote
            </Link>
            <Link href="/user/quotes" className="hover:text-emerald-500">
              ❤️ Liked Quotes
            </Link>
            <Link href="/user/profile" className="hover:text-emerald-500">
              {" "}
              Profile
            </Link>
          </div>
        )}

        <div className="flex gap-6 items-center">
          {!isLoading &&
            (user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                   {user.name}
                </span>
                <Button asChild variant="outline" size="sm">
                  <a href="/auth/logout">Logout </a>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="sm">
                  <a href="/auth/login">Login</a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href="/api/auth/signup">Sign Up</a>
                </Button>
              </div>
            ))}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1 rounded-full bg-emerald-800 text-white text-sm font-bold"
          >
            {mounted ? (theme === "dark" ? "☀️ Light" : "🌙 Dark") : "🌙 Dark"}
          </button>
        </div>
      </nav>

      <main className="flex-1">{children}</main>
    </div>
  );
}
