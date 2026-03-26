'use server';

import { NewQuoteFormState } from '@/app/user/quotes/new/page';
import { NewQuoteSchema } from '@/lib/schemas';
import { Quote } from '@/types/quotes';
import { createQuote, updateQuote, getQuoteById as getQuoteService } from '../services/quotes';
import { deleteQuote as deleteQuoteService } from '@/app/services/quotes';
import { revalidatePath } from 'next/cache'; 
import {getQuotes as  getQuotesService } from '@/app/services/quotes';

export async function addQuote(
  currentState: NewQuoteFormState,
  formData: FormData,
): Promise<NewQuoteFormState> {
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
    await createQuote(result.data);
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
  const rawData = {
    author: formData.get('author')?.toString() ?? '',
    quote: formData.get('quote')?.toString() ?? '',
  };

  const result = NewQuoteSchema.safeParse(rawData);
  
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors, data: rawData };
  }

  try {
    const updated = await updateQuote(id, result.data); 
    return { success: true, data: updated };
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
  try {
    await deleteQuoteService(id);
    revalidatePath('/user/quotes');
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
  return await getQuotesService();}