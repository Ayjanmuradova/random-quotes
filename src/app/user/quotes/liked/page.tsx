"use client";
import { useQuotes } from "@/context/QuotesContext";
import { useUser} from "@auth0/nextjs-auth0/client";

export default function UserQuotesPage() {
  const { likedQuotes, toggleLikeById } = useQuotes();
  const { user, isLoading } = useUser();
  

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }
  return (
    <main className="p-10 max-w-3xl mx-auto">
      
      <section className="mb-8 p-6 rounded-3xl border bg-white border-slate-200 shadow-xl dark:bg-slate-800 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-emerald-500 text-sm font-medium">Member</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm opacity-80">
          <p>📧 {user.email}</p>
        </div>
      </section>

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        ❤️ Liked Quotes: <span className="text-sm bg-emerald-500/20 text-black-500 px-2 py-0.5 rounded-full">{likedQuotes.length}</span>
      </h2>
      
      <div className="space-y-4">
        {likedQuotes.map((item) => (
          <div key={item._id} className="flex justify-start gap-4 items-start p-6 rounded-2xl border bg-white border-slate-100 shadow-sm dark:bg-slate-800 dark:border-slate-700 hover:shadow-lg">
            <button 
              onClick={() => toggleLikeById(item._id as string)} 
              className="mt-1 text-red-500 hover:text-slate-400 transition-colors shrink-0"
              title="Remove from Liked Quotes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
            
            <div>
            <p className="italic text-lg mb-2">"{item.quote}"</p>
            <p className="text-sm opacity-60">— {item.author}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}