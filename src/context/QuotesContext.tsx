"use client";
import { createContext, useState, useContext, useMemo } from "react";
import { quotes as initialQuotes } from "@/quotes";
import { ReactNode } from "react";

interface QuoteType{
  quote: string;
  author: string;
  likeCount: number;
}

interface QuotesContextType {
  currentQuote: QuoteType | null;
  handleLike: () => void;
  handleNext: () => void; 
  likedQuotes: QuoteType[];
}

const QuotesContext = createContext<QuotesContextType | undefined>(undefined);

function setLikeCount () {
  return initialQuotes.map((q) => ({ ...q, likeCount: 0 }));
}

export const QuotesProvider = ({ children }: { children: ReactNode }) => {
  const [quotes, setQuotes] = useState(setLikeCount());
  const [currentIndex, setCurrentIndex] = useState(0);

  
  
  const handleLike = () => {
    setQuotes((prev) =>
      prev.map((q, i) => (i === currentIndex ? { ...q, likeCount: q.likeCount + 1 } : q))
    );
  };

  const handleNext = () => {
    setCurrentIndex(Math.floor(Math.random() * quotes.length));
  };

  const currentQuote = quotes[currentIndex] || null;
  const likedQuotes = useMemo(() => quotes.filter((q) => q.likeCount > 0), [quotes]);

  return (
    <QuotesContext.Provider value={{ currentQuote, handleLike, handleNext,  likedQuotes }}>
      {children}
    </QuotesContext.Provider>
  );
};

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (context === undefined) {
    throw new Error("useQuotes must be used within a QuotesProvider");
  }
  return context;
}