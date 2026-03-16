"use client";
import { createContext, useState, useContext, useMemo } from "react";
import { quotes as initialQuotes } from "@/quotes";
import { ReactNode } from "react";

interface Quote{
  quote: string;
  author: string;
  likeCount: number;
  isLiked?: boolean;
}

interface QuotesContextProps {
  currentQuote: Quote | null;
  handleLike: () => void;
  handleNext: () => void; 
  likedQuotes: Quote[];
}

const QuotesContext = createContext<QuotesContextProps| undefined>(undefined);

function initializeQuotes () {
  return initialQuotes.map((q) => ({
     ...q, 
     likeCount: 0 ,
     isLiked: false
    }));
}

export const QuotesProvider = ({ children }: { children: ReactNode }) => {
  const [quotes, setQuotes] = useState(initializeQuotes());
  const [currentIndex, setCurrentIndex] = useState(0);

  
  
  const handleLike = () => {
    setQuotes((prev) =>
      prev.map((q, i) => {
        if (i === currentIndex) {
          const newIsLiked = !q.isLiked; // Beğenme durumunu tersine çevir
          return { 
            ...q, 
            isLiked: newIsLiked,
            // Like sayısını güncelle (beğenildiyse artır, beğenilmediyse azalt)
            likeCount: newIsLiked ? q.likeCount + 1 : q.likeCount - 1 
          };
        }
        return q;
      })
    );
  };

  const handleNext = () => {
    setCurrentIndex(Math.floor(Math.random() * quotes.length));
  };

  const currentQuote = quotes[currentIndex] || null;
  const likedQuotes = useMemo(() => quotes.filter((q) => q.isLiked), [quotes]);

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