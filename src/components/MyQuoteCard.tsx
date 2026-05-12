"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { removeQuote } from "@/app/actions/quoteActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MyQuoteCardProps {
  id: string;
  quote: string;
  author: string;
}

export default function MyQuoteCard({ id, quote, author }: MyQuoteCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if(!confirm("Are you sure you want to delete this quote?"))
      return;

    setIsDeleting(true);
    setError(null);

    try{
      const result = await removeQuote(id);
      if(result?.success){
        setIsDeleted(true);
        setTimeout(()=> router.refresh(), 400);
      }else{
        setError(result?.message || "Failed to delete quote.");
      }
      } catch {
        setError("An unexpected error occured.");
      } finally{
        setIsDeleting(false);
      }
    };
    if(isDeleted){
      return null;
  }

  return (
    <Card className={`p-6 flex flex-col justify-between gap-4 shadow-md bg-white dark:bg-slate-800 border-slate-200
     dark:border-slate-700 transition-all duration-300 hover:shadow-lg ${isDeleting ? "opacity-40 scale-95 pointer-events-none" : "opacity-100"}`}>
      <div className="flex flex-col gap-2">
        <p className="text-lg italic text-slate-900 dark:text-white break-words">"{quote}"</p>
        <p className="text-sm text-end font-medium text-slate-500 dark:text-slate-400">-- {author}</p>
      </div>
      
      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <Button variant="outline" size="sm" asChild>
         
          <Link href={`/user/quotes/${id}/edit`}>Edit</Link>
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Card>
  );
}