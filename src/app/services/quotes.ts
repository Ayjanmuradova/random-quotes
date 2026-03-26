// src/app/services/quotes.ts
import { auth0 } from '@/lib/auth0';
import { Collections, getDb } from '@/lib/mongo';
import { NewQuoteInput, Quote } from '@/types/quotes';
import { ObjectId } from 'mongodb';

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

export async function updateQuote (id: string, updtateData: NewQuoteInput): Promise<Quote> {
  const session = await auth0.getSession();
  const user = session?.user;
  if(!user) {
    throw new Error("Unauthorized");
  }

  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const existingQuote = await col.findOne({ _id: new ObjectId(id) });
  if (!existingQuote) {
    throw new Error("Quote not found");
  }
  if (existingQuote.userId !== user.sub) {
    throw new Error("Unauthorized");
  }

  const now = new Date();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { 
      quote: updtateData.quote,
      author: updtateData.author,
      updatedAt: now
     } }
  );
  return { 
    quote: updtateData.quote,
    author: updtateData.author,
    likedBy: existingQuote.likedBy
  };
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  const db = await getDb();
  const col = db.collection(Collections.quotes);
  const quote = await col.findOne({ _id: new ObjectId(id) });
  
  if (!quote) return null;
  
  return {
    _id: quote._id.toString(),
    author: quote.author,
    quote: quote.quote,
    userId: quote.userId,
    likedBy: quote.likedBy
  };
}

export async function deleteQuote(id: string):Promise<boolean>{
  const session = await auth0.getSession();
  const user = session?.user;
  if(!user) {
    throw new Error("Unauthorized");
  }

  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const existingQuote = await col.findOne({ _id: new ObjectId(id) });
  if (!existingQuote) {
    throw new Error("Quote not found");
  }
  if (existingQuote.userId !== user.sub) {
    throw new Error("Unauthorized");
  }

  await col.deleteOne({ _id: new ObjectId(id) });
  return true;
}

export async function getQuotes(){
  const db = await getDb();
  const col = db.collection(Collections.quotes);
  const allQuotes = await col.find().sort({ createdAt: -1 }).toArray();
  return allQuotes.map(q => ({
    _id: q._id.toString(),
    quote: q.quote,
    author: q.author,
    userId: q.userId,
    likedBy: q.likedBy || 0,
  }));
}