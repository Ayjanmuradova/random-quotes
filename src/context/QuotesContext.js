"use client";
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { quotes as initialQuotes } from "@/quotes";

const QuotesContext = createContext();

export const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setQuotes(initialQuotes.map((q) => ({ ...q, likeCount: 0 })));
    setIsLoaded(true);
  }, []);

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
    <QuotesContext.Provider value={{ currentQuote, handleLike, handleNext, isLoaded, likedQuotes }}>
      {children}
    </QuotesContext.Provider>
  );
};

export const useQuotes = () => useContext(QuotesContext);