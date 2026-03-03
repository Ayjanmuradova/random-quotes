"use client";
import QuoteCard from "@/components/QuoteCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className='min-h-dvh flex items-center bg-slate-900'>
      <QuoteCard /> 
    </main>
  );
}
<Link href="/user/quotes" className="text-white mt-4 underline text-sm">
  Quotes on my profile
</Link>