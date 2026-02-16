"use client"; 
import { UserProvider } from "@/context/UserContext";
import { QuotesProvider } from "@/context/QuotesContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import "./globals.css";


function ThemeWrapper({ children }) {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <body className={`${isDarkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"} transition-colors duration-300`}>
      <nav className={`p-4 flex justify-between items-center border-b ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}>
        <div className="flex gap-4 font-medium">
          <Link href="/" className="hover:text-emerald-500">🏠 Main page</Link>
          <Link href="/user/quotes" className="hover:text-emerald-500">❤️ My profile</Link>
        </div>
        <button 
          onClick={toggleTheme}
          className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-bold shadow-lg active:scale-95 transition-all"
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>
      {children}
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <UserProvider>
          <QuotesProvider>
            <ThemeWrapper>{children}</ThemeWrapper>
          </QuotesProvider>
        </UserProvider>
      </ThemeProvider>
    </html>
  );
}