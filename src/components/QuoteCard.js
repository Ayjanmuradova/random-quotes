"use client";

import { useQuotes } from "@/context/QuotesContext";  
import { Subtitle } from "./Subtitle";  
import { Body2 } from "./Body2";  
import { Button } from "./Button";

export default function QuoteCard () {
  const { currentQuote, handleLike, handleNext } = useQuotes();
  if (!currentQuote) return null;
  return (
    <div className='w-md mx-auto bg-slate-700 p-10 rounded-md flex flex-col gap-4 text-white'>
      <Subtitle title={currentQuote.quote} />
      <Body2>--{currentQuote.author}</Body2>
      
      <div className="flex gap-4">
        <Button onClick={handleLike} className="absolute top-6 left-6 text-2xl hover:scale-125 transition-transform active:scale-90">
          {currentQuote.likeCount > 0 ? "❤️" : "🤍"}
        <span className="ml-1 text-xs text-slate-400 align-middle">
          
        </span>Like </Button>
        <Button onClick={handleNext}>Next Quote</Button>
      </div>
    </div>
  );
}