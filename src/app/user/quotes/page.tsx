"use client";
import { useQuotes } from "@/context/QuotesContext";
import { useUser } from "@/context/UserContext";


export default function UserQuotesPage() {
  const { likedQuotes } = useQuotes();
  const { name, email } = useUser();
  

  

  return (
    <main className="p-10 max-w-3xl mx-auto">
      
      <section className="mb-8 p-6 rounded-3xl border bg-white border-slate-200 shadow-xl dark:bg-slate-800 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            {name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-emerald-500 text-sm font-medium">User</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm opacity-80">
          <p>📧 {email}</p>
        </div>
      </section>

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        ❤️ Liked Quotes: <span className="text-sm bg-emerald-500/20 text-black-500 px-2 py-0.5 rounded-full">{likedQuotes.length}</span>
      </h2>
      
      <div className="space-y-4">
        {likedQuotes.map((item, index) => (
          <div key={index} className="p-6 rounded-2xl border bg-white border-slate-100 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <p className="italic text-lg mb-2">"{item.quote}"</p>
            <p className="text-sm opacity-60">— {item.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}