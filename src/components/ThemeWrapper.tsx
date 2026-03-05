"use client";
import { useTheme } from "next-themes";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import {type ReactNode, useEffect, useState } from "react";

interface ThemeWrapperProps {
  children: ReactNode;
  fontVars: string;
}

export default function ThemeWrapper({ children, fontVars }: ThemeWrapperProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const user = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <body className={`${fontVars} antialiased bg-white text-black dark:bg-slate-900 dark:text-white transition-colors duration-300`}>
      <nav className="p-4 flex justify-between border-b border-slate-700">
        <div className="flex gap-4">
          <Link href="/" className="hover:text-emerald-500">🏠 Main page</Link>
          <Link href="/user/quotes" className="hover:text-emerald-500">❤️ My profile</Link>
          
        </div>
        <div className="flex gap-6 items-center">
          {user ? (
            
            <span className="text-sm font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
              👤 user
            </span>
          ) : (
           
            <Link 
              href="/user/profile/login" 
              className="hover:text-emerald-500 font-medium transition-colors flex items-center gap-1"
            >
              🔐 Login
            </Link>
          )}
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-1 rounded-full bg-emerald-800 text-white text-sm font-bold"
        >
          {mounted ? (theme === "dark" ? "☀️ Light" : "🌙 Dark") : "🌙 Dark"}
        </button>
        </div>
      </nav>
      
      {children}
    
    </body>
  );
}