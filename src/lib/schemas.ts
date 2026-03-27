import { z } from 'zod';

export const NewQuoteSchema = z.object({
  author: z.string().trim()
    .min(2, { message: 'Author name must be at least 2 characters.' })
    .max(50, { message: 'Author name cannot exceed 50 characters.' }),
  quote: z.string().trim()
    .min(5, { message: 'Quote must be at least 5 characters.' })
    .max(300, { message: 'Quote cannot exceed 300 characters.' }),
});