'use server';

import { NewQuoteFormState } from '@/app/user/quotes/new/page';
import { NewQuoteSchema } from '@/lib/schemas';
import { Quote } from '@/types/quotes';
import { deleteQuote as deleteQuoteService,
  getQuoteById as getQuoteService,
  getQuotes as getQuotesService,
  createQuote, updateQuote , toggleLike} from '@/app/services/quotes';
import { revalidatePath } from 'next/cache'; 
import { auth0 } from '@/lib/auth0';

export async function addQuote(
  currentState: NewQuoteFormState,
  formData: FormData,
): Promise<NewQuoteFormState> {
  const session = await auth0.getSession();
  const user = session?.user;
  if (!user) {
    return { success: false, message: "You must be logged in to do this." };
  }
  const rawData = {
    author: formData.get('author') ?? '',
    quote: formData.get('quote') ?? '',
  };

  const result = NewQuoteSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      data: { ...(rawData as Partial<Quote>) },
    };
  }
  
  try {
    await createQuote(result.data, user.sub);
    revalidatePath('/user/my-quotes');
    return {
      success: true,
      data: result.data,
    };
  } catch (err) {
    console.error('An error occured when saving a new quote to database');
    return {
      success: false,
      message: 'An error occured when saving the quote, try again later.',
      data: result.data,
    };
  }
}

export async function getQuote(id: string) {
  return await getQuoteService(id);
}

export async function editQuote(
  id: string, 
  currentState: NewQuoteFormState,
  formData: FormData
): Promise<NewQuoteFormState> {
  const session = await auth0.getSession();
  const user = session?.user;
  if (!user) {
    return { success: false, message: "You must be logged in to edit a quote." };
  }
  const rawData = {
    author: formData.get('author')?.toString() ?? '',
    quote: formData.get('quote')?.toString() ?? '',
  };

  const result = NewQuoteSchema.safeParse(rawData);
  
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors, data: rawData };
  }

  try {
    const updated = await updateQuote(id, result.data, user.sub); 
    revalidatePath('/user/my-quotes');
    return { success: true, data: updated as Partial<Quote> };
  } catch (error: any) {
    console.error("Error updating quote:", error);
    return { 
      success: false, 
      message: error.message || 'An error occurred while updating the quote.', 
      data: rawData 
    };
  }
}
export async function removeQuote(id: string){
  const session = await auth0.getSession();
  const user = session?.user;
  if (!user) {
    return { success: false, message: "You must be logged in to delete a quote." };
  }
  try {
    await deleteQuoteService(id, user.sub);
    revalidatePath('/user/my-quotes');
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting quote:", error);
    return { 
      success: false, 
      message: error.message || 'An error occurred while deleting the quote.', 
    };
}
}
export async function fetchAllQuotes() {
  const session = await auth0.getSession();
  const userId = session?.user?.sub; 
  
  const quotes = await getQuotesService();
  
  return quotes.map((q: any) => {
    const likedByArray = Array.isArray(q.likedBy) ? q.likedBy : [];
    return {
      ...q,
      likeCount: likedByArray.length, 
      isLiked: userId ? likedByArray.includes(userId) : false 
    };
  });
}

export async function toggleQuoteLikeAction(quoteId: string) {
  const session = await auth0.getSession();
  const user = session?.user;
  if (!user) {
    return { success: false, message: "You must be logged in to like a quote." };
  }
  try {
    const isNowLiked = await toggleLike(quoteId, user.sub);
    revalidatePath('/'); 
    revalidatePath('/user/quotes');
    return { success: true, isLiked: isNowLiked };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.message 
    };
  }
}