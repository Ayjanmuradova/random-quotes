'use server';

import { z } from 'zod';



export type NewQuoteFormState = {
  success: boolean;
  errors?: Record<string, string[]>; 
  data?: { author?: string; quote?: string }; 
};

const NewQuoteSchema = z.object({
  author: z.string().trim()
    .min(2, { message: 'Author name must be at least 2 characters.' })
    .max(50, { message: 'Author name must be less than 50 characters.' }),
  quote: z.string().trim()
    .min(5, { message: 'Quote must be at least 5 characters.' })
    .max(300, { message: 'Quote must be less than 300 characters.' }),
});

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