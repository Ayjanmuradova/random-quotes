import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function Button({ onClick, disabled, children, className = "" }: ButtonProps) {
  const { isDarkMode } = useTheme();

  return (
    <button
      
      onClick={onClick}
      disabled={disabled}
className={`py-2 px-3 rounded-md flex items-center gap-2 transition-all duration-300 disabled:opacity-50 z-10 ${
        isDarkMode 
          ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600" 
          : "bg-slate-900 hover:bg-slate-800 text-white" 
      } ${className}`}
    >
      {children}
    </button>
  );
}