"use client";
import { createContext, useState, useContext, useMemo, useEffect, useCallback, ReactNode } from "react";
import { fetchAllQuotes, toggleQuoteLikeAction } from "@/app/actions/quoteActions";

interface Quote {
  _id?: string;
  quote: string;
  author: string;
  likeCount: number;
  isLiked?: boolean;
}

interface QuotesContextProps {
  currentQuote: Quote | null;
  handleLike: () => void;
  toggleLikeById: (id: string) => void;
  handleNext: () => void;
  likedQuotes: Quote[];
  isLoading: boolean;
}

const QuotesContext = createContext<QuotesContextProps | undefined>(undefined);

export const QuotesProvider = ({ children }: { children: ReactNode }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllQuotes().then((data) => {
      if (data && data.length > 0) {
        setQuotes(data);
        setCurrentIndex(Math.floor(Math.random() * data.length));
      }
    })
    .finally(() => setIsLoading(false));
  }, []);

  const applyOptimisticToggle = useCallback(
  (predicate: (q: Quote)=> boolean, revert = false) => {
    setQuotes((prev) =>
      prev.map((q) => {
        if (!predicate(q)) 
          return q;
          const newIsLiked = revert ? !q.isLiked : !q.isLiked;
          return {
            ...q,
            isLiked: newIsLiked,
            likeCount: newIsLiked ? q.likeCount + 1 : q.likeCount - 1,
          };
        }));
  }, []
  );

  const handleLike = useCallback( async () => {
    const quote = quotes[currentIndex];
    if (!quote?._id) return;

    const id = quote._id;
    const wasLiked = quote.isLiked;

    setQuotes((prev) =>
      prev.map((q, i) => {
        if (i !== currentIndex) return q; 
          const newIsLiked = !wasLiked;
          return {
            ...q,
            isLiked: newIsLiked,
            likeCount: newIsLiked ? q.likeCount + 1 : q.likeCount - 1};
          })
    );
    const result = await toggleQuoteLikeAction(id);

    if (!result?.success) {
      setQuotes((prev) =>
        prev.map((q, i) => {
          if (i !== currentIndex)  return q; {
            return {
              ...q,
              isLiked: wasLiked,
              likeCount: wasLiked ? q.likeCount + 1 : q.likeCount - 1,
            };
          }
          })
      );
    }
  }, [quotes, currentIndex]);

  const toggleLikeById = useCallback ( async (id: string) => {
    const target = quotes.find((q)=> q._id === id);
    if (!target) return;
    const wasLiked = target.isLiked;

    setQuotes((prev) =>
      prev.map((q) => {
        if (q._id !== id) return q;
          const newIsLiked = !wasLiked;
          return {
            ...q,
            isLiked: newIsLiked,
            likeCount: newIsLiked ? q.likeCount + 1 : q.likeCount - 1,
          };
        })    
      );
    
    const result = await toggleQuoteLikeAction(id);
    if (!result?.success) {
      setQuotes((prev) =>
        prev.map((q) => {
          if (q._id === id) return q;
            return {
              ...q,
              isLiked: wasLiked,
              likeCount: wasLiked ? q.likeCount + 1 : q.likeCount - 1,
            };
        })
      );
    }
  }, [quotes]);


  const handleNext = useCallback(() => {
    if (quotes.length > 1) {
      let next;
      do{
        next = Math.floor(Math.random() * quotes.length);
      } while (next === currentIndex && quotes.length > 1);
      setCurrentIndex(next);
    }
  }, [quotes.length, currentIndex]);

  const currentQuote = quotes[currentIndex] ?? null;
  const likedQuotes = useMemo(() => quotes.filter((q) => q.isLiked), [quotes]);

  return (
    <QuotesContext.Provider value={{ currentQuote, handleLike, toggleLikeById, handleNext, likedQuotes, isLoading }}>
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