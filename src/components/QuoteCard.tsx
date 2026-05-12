"use client";

import { useQuotes } from "@/context/QuotesContext";  
import { Subtitle } from "./Subtitle";  
import { Body2 } from "./Body2";  
import { Button } from "@/components/ui/button";
import { Card } from  "@/components/ui/card";



export default function QuoteCard () {
  const { currentQuote, handleLike, handleNext, isLoading } = useQuotes();
  
  if (isLoading){
  return (
    
    <Card className="relative max-w-md w-full mx-auto p-8 pt-20 rounded-xl shadow-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 animate-pulse">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-3" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-6" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4 ml-auto" />
      </Card>
  );
  }

  if(!currentQuote){
     return (
      <Card className="max-w-md w-full mx-auto p-8 rounded-xl shadow-xl border bg-white dark:bg-slate-800 text-center">
        <p className="text-slate-500">No quotes yet. Add your first one!</p>
      </Card>
    );
  }
    return(
      <Card className="relative max-w-md w-full mx-auto p-6 sm:p-10 pt-20 sm:pt-24 rounded-xl flex flex-col gap-4 shadow-xl transition-all duration-300 border bg-white border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
        <Button
        onClick={handleLike}
        className="absolute top-6 right-4 sm:top-8 sm:right-6 flex items-center justify-center gap-2 px-3 py-2 transition-all duration-200 min-w-[90px]"
        aria-label={currentQuote.isLiked ? "Unlike this quote" : "Like this quote"}
      >
        <span className="text-base leading-none">{currentQuote.isLiked ? "❤️" : "🤍"}</span>
        <span className="text-sm font-medium leading-none">
          {currentQuote.isLiked ? "Liked" : "Like"} {currentQuote.likeCount}
        </span>
      </Button>  

      <div className="flex flex-col gap-2 break-words mt-2">
        <Subtitle title={`"${currentQuote.quote}"`} />
        <Body2 className="text-end">— {currentQuote.author}</Body2>
      </div>
   
        <div className="flex justify-center pt-2">
        <Button onClick={handleNext}>Next Quote </Button>
      </div>
      

    </Card>
  );
}