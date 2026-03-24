'use server';

import {NewQuoteSchema} from '@/lib/schemas';

export type NewQuoteFormState = {
  success: boolean;
  errors?: Record<string, string[]>; 
  data?: { author?: string; quote?: string }; 
};


export async function addQuote(
  currentState: NewQuoteFormState,
  formData: FormData
): Promise<NewQuoteFormState> {
 
  const rawData = {
    author: formData.get('author')?.toString() ?? '',
    quote: formData.get('quote')?.toString() ?? '',
  };

  const result = NewQuoteSchema.safeParse(rawData);
  

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors, 
      data:rawData,
    };
  }

  // data validation
  // store in DB (next lesson)
 return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
      });
    }, 2000);
  });
}