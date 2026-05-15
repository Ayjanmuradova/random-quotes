import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function Button({
  onClick,
  disabled,
  children,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-3 rounded-md flex items-center gap-2 transition-all duration-300 disabled:opacity-50 z-10 text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:border dark:border-slate-600${className}`}
    >
      {children}
    </button>
  );
}
