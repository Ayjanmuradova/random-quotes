import { useTheme } from "@/context/ThemeContext";
export function Button({ onClick, disabled, children, className = "" }) {
  const { isDarkMode } = useTheme();

  return (
    <button
      //className='bg-slate-800 p-2 mt-10 rounded-md hover:bg-slate-800/50 disabled:bg-gray-400'
      onClick={onClick}
      disabled={disabled}
className={`py-2 px-3 rounded-md flex items-center gap-2 transition-all duration-300 disabled:opacity-50 z-10 ${
        isDarkMode 
          ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600" // Karanlık mod için şık bir gri ve kenarlık
          : "bg-slate-900 hover:bg-slate-800 text-white" // Aydınlık mod için koyu renk
      } ${className}`}
    >
      {children}
    </button>
  );
}