"use client";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function ThemeWrapper({ children, fontVars }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <body className={`${fontVars} antialiased ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-black"} transition-colors duration-300`}>
      <nav className="p-4 flex justify-between border-b border-slate-700">
        <div className="flex gap-4">
          <Link href="/" className="hover:text-emerald-500">🏠 Main page</Link>
          <Link href="/user/quotes" className="hover:text-emerald-500">❤️ My profile</Link>
        </div>
        <button 
          onClick={toggleTheme}
          className="px-3 py-1 rounded-full bg-emerald-500 text-white text-sm font-bold"
        >
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>
      {children}
    </body>
  );
}