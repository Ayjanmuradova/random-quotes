"use client";
import QuoteCard from "@/components/QuoteCard";
import Link from "next/link";

export default function HomeClient() {
  return (
    <div className='flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4'>
      <QuoteCard /> 
      <Link href="/user/quotes" className="text-emerald-500 hover:text-emerald-600 transition-colors underline text-sm font-medium">
  View my quotes →
</Link>
    </div>
  );
}
