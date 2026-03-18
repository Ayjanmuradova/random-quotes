"use client";

import { useQuotes } from "@/context/QuotesContext";  
import { Subtitle } from "./Subtitle";  
import { Body2 } from "./Body2";  
import { Button } from "@/components/ui/button";
import { Card } from  "@/components/ui/card";



export default function QuoteCard () {
  const { currentQuote, handleLike, handleNext } = useQuotes();
  
  
  if (!currentQuote) return null;
  
  return (
    
    <Card className="relative max-w-md w-full mx-auto p-10 pt-24 rounded-xl flex flex-col gap-4 shadow-xl transition-all duration-300 border bg-white border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
      <div className="mt-2 flex flex-col gap-2">
      <Subtitle title={currentQuote.quote} />
      <Body2 className="text-end">--{currentQuote.author}</Body2>
      </div>
      
        <Button 
          onClick={handleLike} 
          className="absolute top-8 right-6 flex items-center justify-center gap-2 px-2 py-2 transition-all duration-200 min-w-[90px]"
        >
         <span className="text-l leading-none">{currentQuote.isLiked ? "❤️" : "🤍"}</span> 
          <span className="text-sm font-medium leading-none">{currentQuote.isLiked ? "Liked" : "Like"} {currentQuote.likeCount}</span>
        </Button>
        <div className="flex justify-center">
        <Button onClick={handleNext}>Next Quote</Button>
      </div>
      

    </Card>
  );
}