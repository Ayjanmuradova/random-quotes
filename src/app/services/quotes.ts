import { Collections, getDb } from '@/lib/mongo';
import { NewQuoteInput, Quote } from '@/types/quotes';
import { ObjectId } from 'mongodb';

async function getQuotesCollection() {
  const db = await getDb();
  return db.collection(Collections.quotes);
}

export async function createQuote(quote: NewQuoteInput, userId: string): Promise<Quote> {
  
  const col = await getQuotesCollection();
  const now = new Date().toISOString();;

  const doc = {
    likedBy: [],
    createdAt: now,
    updatedAt: now,
    userId: userId,
    ...quote
  };

  await col.insertOne(doc);
  // MongoDB returns the inserted document with an _id field, but we want to return it in our Quote format
  return { 
    quote: doc.quote, 
    author: doc.author, 
    likedBy: doc.likedBy,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  };
}

export async function updateQuote (id: string, updateData: NewQuoteInput, userId: string): Promise<Quote> {

  const col = await getQuotesCollection();

  const existingQuote = await col.findOne({ _id: new ObjectId(id) });
  if (!existingQuote) {
    throw new Error("Quote not found");
  }
  if (existingQuote.userId !== userId) {
    throw new Error("Unauthorized");
  }

  const now = new Date().toISOString();;
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { 
      quote: updateData.quote,
      author: updateData.author,
      updatedAt: now
     } }
  );
  return { 
    quote: updateData.quote,
    author: updateData.author,
    likedBy: existingQuote.likedBy,
    createdAt: existingQuote.createdAt,
    updatedAt: now
  };
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  const col = await getQuotesCollection();
  const quote = await col.findOne({ _id: new ObjectId(id) });
  
  if (!quote) return null;
  
  return {
    _id: quote._id.toString(),
    author: quote.author,
    quote: quote.quote,
    userId: quote.userId,
    likedBy: quote.likedBy,
    createdAt: quote.createdAt,
    updatedAt: quote.updatedAt
  };
}

export async function deleteQuote(id: string, userId: string):Promise<boolean>{

 const col = await getQuotesCollection();

  const existingQuote = await col.findOne({ _id: new ObjectId(id) });
  if (!existingQuote) {
    throw new Error("Quote not found");
  }
  if (existingQuote.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await col.deleteOne({ _id: new ObjectId(id) });
  return true;
}

export async function getQuotes(){
 const col = await getQuotesCollection();
  const allQuotes = await col.find().sort({ createdAt: -1 }).toArray();
  return allQuotes.map(q => ({
    _id: q._id.toString(),
    quote: q.quote,
    author: q.author,
    userId: q.userId,
    likedBy: q.likedBy || [],
    createdAt: q.createdAt,
    updatedAt: q.updatedAt
  }));
}

export async function toggleLike(id: string, userId: string){
  const col = await getQuotesCollection();
  const quote = await col.findOne({ _id: new ObjectId(id) });
  if (!quote) {
    throw new Error("Quote not found");
  }

  const likedByArray= Array.isArray(quote.likedBy) ? quote.likedBy : [];
  const hasLiked = likedByArray.includes(userId);

  if (hasLiked) {
    await col.updateOne(
      { _id: new ObjectId(id) },
      { $pull: { likedBy: userId } }
    );
  } else {
    await col.updateOne(
      { _id: new ObjectId(id) },
      { $addToSet: { likedBy: userId } }
    );
    return true;
  }
}