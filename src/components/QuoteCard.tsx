"use client";

import { useQuotes } from "@/context/QuotesContext";  
import { Subtitle } from "./Subtitle";  
import { Body2 } from "./Body2";  
import { Button } from "./Button";
import { useTheme } from "@/context/ThemeContext";

export default function QuoteCard () {
  const { currentQuote, handleLike, handleNext } = useQuotes();
  const { isDarkMode } = useTheme();
  
  if (!currentQuote) return null;
  
  return (
    
    <div className={`relative max-w-md w-full mx-auto p-10 pt-24 rounded-xl flex flex-col gap-4 shadow-xl transition-all duration-300 border ${
      isDarkMode 
        ? "bg-slate-800 border-slate-700 text-white" 
        : "bg-white border-slate-200 text-slate-900"
    }`}>
      <div className="mt-2 flex flex-col gap-2">
      <Subtitle title={currentQuote.quote} />
      <Body2>--{currentQuote.author}</Body2>
      </div>
      
        <Button 
          onClick={handleLike} 
          className="absolute top-8 right-6 flex items-center justify-center gap-2 px-2 py-2 hover:scale-105 transition-transform active:scale-90"
        >
         <span className="text-l leading-none flex items-center">{currentQuote.likeCount > 0 ? "❤️" : "🤍"}</span> 
          <span className="text-sm font-medium leading-none flex justify-end">Like </span>
        </Button>
        <div className="flex justify-center">
        <Button onClick={handleNext}>Next Quote</Button>
      </div>
      

    </div>
  );
}