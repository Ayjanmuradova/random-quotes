"use client";
import QuoteCard from "@/components/QuoteCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className='min-h-[80vh] flex flex-col items-center justify-center gap-6'>
      <QuoteCard /> 
      <Link href="/user/quotes" className="text-emerald-500 hover:text-emerald-600 transition-colors underline text-sm font-medium">
  Quotes on my profile
</Link>
    </main>
  );
}
