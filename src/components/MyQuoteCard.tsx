import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { removeQuote } from "@/app/actions/quoteActions";

interface MyQuoteCardProps {
  id: string;
  quote: string;
  author: string;
}

export default function MyQuoteCard({ id, quote, author }: MyQuoteCardProps) {
 
  const deleteAction = removeQuote.bind(null, id);

  return (
    <Card className="p-6 flex flex-col justify-between gap-4 shadow-md bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg">
      <div className="flex flex-col gap-2">
        <p className="text-lg italic text-slate-900 dark:text-white break-words">"{quote}"</p>
        <p className="text-sm text-end font-medium text-slate-500 dark:text-slate-400">-- {author}</p>
      </div>
      
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <Button variant="outline" size="sm" asChild>
         
          <Link href={`/user/quotes/${id}/edit`}>Edit</Link>
        </Button>

        <form action={deleteAction}>
          <Button variant="destructive" size="sm" type="submit">
            Delete
          </Button>
        </form>
      </div>
    </Card>
  );
}