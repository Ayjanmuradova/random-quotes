import { auth0 } from "@/lib/auth0";
import { getQuotes } from "@/app/services/quotes";
import MyQuoteCard from "@/components/MyQuoteCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function QuotesPage() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user?.sub) {
    return <div className="p-10 text-center text-slate-500">Please log in to see your quotes.</div>;
  }

  const myQuotes = await getQuotes(user.sub);

  return (
    <main className="p-10 max-w-4xl mx-auto min-h-[80vh]">
    
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-bold flex items-center gap-3 tracking-tight">
          My Created Quotes 
          <span className="text-sm bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full">
            {myQuotes.length}
          </span>
        </h1>
        <Button asChild>
          <Link href="/user/quotes/new">Add New Quote</Link>
        </Button>
      </div>
    
      <div className="space-y-4">
        {myQuotes.length === 0 ? (
          <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-300 rounded-2xl dark:border-slate-700 bg-slate-50 dark:bg-slate-900/20">
            You haven't added any quotes yet. Click the "Add New Quote" button to start!
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2"> 
            {myQuotes.map((item) => (
              <MyQuoteCard 
                key={item._id} 
                id={item._id as string} 
                quote={item.quote} 
                author={item.author} 
              />
            ))}
          </div>
        )}
      </div>

    </main>
  );
}