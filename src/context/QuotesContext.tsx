"use client";
import { createContext, useState, useContext, useMemo, useEffect, ReactNode } from "react";
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
  handleNext: () => void;
  likedQuotes: Quote[];
}

const QuotesContext = createContext<QuotesContextProps | undefined>(undefined);

export const QuotesProvider = ({ children }: { children: ReactNode }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchAllQuotes().then((data) => {
      if (data && data.length > 0) {
        setQuotes(data);
      }
    });
  }, []);

  const handleLike = async () => {
    const quote = quotes[currentIndex];
    if (!quote || !quote._id) return;

    setQuotes((prev) =>
      prev.map((q, i) => {
        if (i === currentIndex) {
          const newIsLiked = !q.isLiked;
          return {
            ...q,
            isLiked: newIsLiked,
            likeCount: newIsLiked ? q.likeCount + 1 : q.likeCount - 1,
          };
        }
        return q;
      })
    );
    const result = await toggleQuoteLikeAction(quote._id);

    if (!result?.success) {
      alert("Please log in to like quotes! ");
      setQuotes((prev) =>
        prev.map((q, i) => {
          if (i === currentIndex) {
            const revertedIsLiked = !q.isLiked;
            return {
              ...q,
              isLiked: revertedIsLiked,
              likeCount: revertedIsLiked ? q.likeCount + 1 : q.likeCount - 1,
            };
          }
          return q;
        })
      );
    }
  };

  const handleNext = () => {
    if (quotes.length > 0) {
      setCurrentIndex(Math.floor(Math.random() * quotes.length));
    }
  };

  const currentQuote = quotes[currentIndex] || null;
  const likedQuotes = useMemo(() => quotes.filter((q) => q.isLiked), [quotes]);

  return (
    <QuotesContext.Provider value={{ currentQuote, handleLike, handleNext, likedQuotes }}>
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