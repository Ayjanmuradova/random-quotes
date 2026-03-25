// src/app/services/quotes.ts
import { auth0 } from '@/lib/auth0';
import { Collections, getDb } from '@/lib/mongo';
import { NewQuoteInput, Quote } from '@/types/quotes';

export async function createQuote(quote: NewQuoteInput): Promise<Quote> {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const now = new Date();

  const doc = {
    likedBy: 0,
    createdAt: now,
    updatedAt: now,
    userId: user.sub,
    ...quote
  };

  await col.insertOne(doc);
  // MongoDB returns the inserted document with an _id field, but we want to return it in our Quote format
  return { 
    quote: doc.quote, 
    author: doc.author, 
    likedBy: doc.likedBy 
  };
}